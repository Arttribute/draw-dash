import {
  AutoProcessor,
  CLIPVisionModelWithProjection,
  type PreTrainedModel,
  type Processor,
} from "@xenova/transformers";

// Use the Singleton pattern to enable lazy construction of the pipeline.
// NOTE: We wrap the class in a function to prevent code duplication.
const S = () =>
  class ApplicationSingleton {
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
  };

let ApplicationSingleton;
if (process.env.NODE_ENV !== "production") {
  // When running in development mode, attach the pipeline to the
  // global object so that it's preserved between hot reloads.
  // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
  if (!(global as any).ApplicationSingleton) {
    (global as any).ApplicationSingleton = S();
  }
  ApplicationSingleton = (global as any).ApplicationSingleton;
} else {
  ApplicationSingleton = S();
}
export default ApplicationSingleton as any;
