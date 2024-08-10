import dbConnect from "@/lib/dbConnect";
import Creation from "@/models/Creation";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const creation = await Creation.findById(id);
    return new NextResponse(JSON.stringify(creation), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const { detailsToUpdate } = await request.json();

    const updatedCreation = await Creation.findByIdAndUpdate(
      id,
      detailsToUpdate,
      {
        new: true,
      }
    );
    return new NextResponse(JSON.stringify(updatedCreation), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
