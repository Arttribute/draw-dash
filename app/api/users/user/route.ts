import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const user = await User.findById(id);
    return new NextResponse(JSON.stringify(user), {
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

    const updatedUser = await User.findByIdAndUpdate(id, detailsToUpdate, {
      new: true,
    });
    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
