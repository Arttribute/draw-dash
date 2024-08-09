import { NextResponse } from "next/server";

const API_KEY = process.env.ASTRIA_API_KEY;
export const revalidate = 0;

export async function POST(request: Request) {
  const { textToImageObject, modelId } = await request.json();

  try {
    const formData = new FormData();
    Object.keys(textToImageObject).forEach((key) => {
      if (textToImageObject[key] !== undefined) {
        formData.append(`prompt[${key}]`, textToImageObject[key]);
      }
    });
    const promptRes = await fetch(
      `https://api.astria.ai/tunes/${modelId}/prompts`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
        },
        body: formData,
      }
    );
    const text2ImageResponse = await promptRes.json();

    return new NextResponse(JSON.stringify(text2ImageResponse), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
