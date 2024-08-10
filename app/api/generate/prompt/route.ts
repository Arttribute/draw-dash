import OpenAI from "openai";
import { NextResponse } from "next/server";
import { create } from "domain";

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: API_KEY,
});

const imagePrompt = `You are an assistant whose goal is to generate consice interesting image prompts for a game where the player is challenged to sketch the image generated by the prompt designed to output JSON.
    Please return the result in the following JSON format: { "image_prompt":" interesting consise image prompt"}. Note that each image prompt should be unique `;

export async function POST(request: Request) {
  try {
    const requestbody = await request.json();
    const { input } = requestbody;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: imagePrompt,
        },
        { role: "user", content: input },
      ],
      temperature: 1,
      max_tokens: 1600,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.8,
    });

    return new NextResponse(response.choices[0].message.content, {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
