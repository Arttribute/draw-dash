import dbConnect from "@/lib/dbConnect";
import Creation from "@/models/Creation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const creations = await Creation.find()
      .populate("owner")
      .sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(creations), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { creationData } = await request.json();

    const newCreation = await Creation.create(creationData);
    return new NextResponse(JSON.stringify(newCreation), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
