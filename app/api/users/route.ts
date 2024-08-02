import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

type Fields = {
  web3Address: string;
  email?: string;
};

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find().sort({
      createdAt: -1,
    });
    return new NextResponse(JSON.stringify(users), {
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
    const { web3Address, email }: Fields = await request.json();

    const existingUser = await User.findOne({ web3Address });
    if (existingUser) {
      return new NextResponse(JSON.stringify(existingUser), {
        status: 200,
      });
    }

    const user = await User.create({
      web3Address,
      email,
    });

    return new NextResponse(JSON.stringify(user), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
