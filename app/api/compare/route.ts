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
    // const { query_image, ans_image }: Input = await request.json();

    // TODO: upload to bucket and get the URL

    const [processor, vision_model]: [Processor, PreTrainedModel] =
      await ApplicationSingleton.getInstance();

    // Read the two images
    const rawImageQuery = await RawImage.read(
      "https://img.freepik.com/free-vector/grunge-floral-background_1048-7366.jpg?size=626&ext=jpg&ga=GA1.1.407704436.1720632020&semt=ais_hybrid"
    );
    const rawImageAns = await RawImage.read(
      "https://img.freepik.com/free-photo/yellow-throated-sericornis-sericornis-citreogularis-illustrated-by-elizabeth-gould_53876-65174.jpg?size=626&ext=jpg&ga=GA1.1.407704436.1720632020&semt=sph"
    );

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
