import ApplicationSingleton from "@/app/app";
import { NextResponse } from "next/server";
import {
  type PreTrainedModel,
  type Processor,
  RawImage,
} from "@xenova/transformers";
import { cosineSimilarity } from "./util";

type Input = {
  query_image: string;
  ans_image: string;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Get the two images from the form data
    const query_image = formData.get("query_image") as File;
    const ans_image = formData.get("ans_image") as File;

    // Create Blobs from the images
    const query_image_blob = new Blob([query_image], {
      type: query_image.type,
    });
    const ans_image_blob = new Blob([ans_image], { type: ans_image.type });

    const [processor, vision_model]: [Processor, PreTrainedModel] =
      await ApplicationSingleton.getInstance();

    // Read the two images as raw images
    const rawImageQuery = await RawImage.fromBlob(query_image_blob);
    const rawImageAns = await RawImage.fromBlob(ans_image_blob);

    // Tokenize the two images
    const tokenizedImageQuery = await processor(rawImageQuery);
    const tokenizedImageAns = await processor(rawImageAns);

    // Encode the two images
    const { image_embeds: embedsQuery } = await vision_model(
      tokenizedImageQuery
    );
    const { image_embeds: embedsAns } = await vision_model(tokenizedImageAns);

    const similarity = cosineSimilarity(
      Object.values(embedsQuery.data),
      Object.values(embedsAns.data)
    );

    return new NextResponse(JSON.stringify({ okay: "okay", similarity }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
