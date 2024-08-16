import {
  RawImage,
  AutoProcessor,
  CLIPVisionModelWithProjection,
  type PreTrainedModel,
  type Processor,
  env,
} from "@xenova/transformers";

// Skip local model check
env.allowLocalModels = false;

const cosineSimilarity = (
  query_embeds: Float32Array,
  ans_embeds: Float32Array
) => {
  if (query_embeds.length !== ans_embeds.length) {
    throw new Error("Embeddings must be of the same length");
  }

  let dotProduct = 0;
  let normQuery = 0;
  let normAns = 0;

  for (let i = 0; i < query_embeds.length; ++i) {
    const queryValue = query_embeds[i];
    const dbValue = ans_embeds[i];

    dotProduct += queryValue * dbValue;
    normQuery += queryValue * queryValue;
    normAns += dbValue * dbValue;
  }

  return dotProduct / (Math.sqrt(normQuery) * Math.sqrt(normAns));
};

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static model_id = "Xenova/clip-vit-base-patch16";
  static processor: Promise<Processor> | null = null;
  static vision_model: Promise<PreTrainedModel> | null = null;

  static async getInstance() {
    if (this.processor === null) {
      this.processor = AutoProcessor.from_pretrained(this.model_id);
    }

    if (this.vision_model === null) {
      this.vision_model = CLIPVisionModelWithProjection.from_pretrained(
        this.model_id,
        {
          quantized: false,
        }
      );
    }

    return Promise.all([this.processor, this.vision_model]);
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  // Retrieve the classification pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.

  const [processor, vision_model] = await PipelineSingleton.getInstance();

  const { query_image, ans_image } = event.data;

  // Read the two images as raw images
  const rawImageQuery = await RawImage.fromURL(query_image);

  const rawImageAns = await RawImage.fromURL(ans_image);

  // Tokenize the two images
  const tokenizedImageQuery = await processor(rawImageQuery);
  const tokenizedImageAns = await processor(rawImageAns);

  // Encode the two images
  const { image_embeds: embedsQuery } = await vision_model(tokenizedImageQuery);
  const { image_embeds: embedsAns } = await vision_model(tokenizedImageAns);

  // Directly convert the embeddings to Float32Array for memory efficiency
  const queryEmbedsArray = new Float32Array(
    Object.values(embedsQuery.data) as number[]
  );
  const ansEmbedsArray = new Float32Array(
    Object.values(embedsAns.data) as number[]
  );

  const similarity = cosineSimilarity(queryEmbedsArray, ansEmbedsArray);

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: similarity,
  });
});
