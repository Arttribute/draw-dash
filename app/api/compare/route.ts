import ApplicationSingleton from "@/app/app";
import { NextResponse } from "next/server";
import {
  type PreTrainedModel,
  type Processor,
  RawImage,
} from "@xenova/transformers";
import { cosineSimilarity } from "./util";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Get the two image URLs from the form data
    const query_image = formData.get("query_image") as string;
    const ans_image = formData.get("ans_image") as string;

    const [processor, vision_model]: [Processor, PreTrainedModel] =
      await ApplicationSingleton.getInstance();

    // Read the two images as raw images
    const rawImageQuery = await RawImage.fromURL(query_image);
    const rawImageAns = await RawImage.fromURL(query_image);

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
