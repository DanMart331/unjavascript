import connectMongoDB from "../../../../config/mongodb";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password, type } = await request.json();
  await connectMongoDB();

  await User.create({ username, password, type });
  return NextResponse.json({ message: "User added successfully" }, { status: 201 });  
}

export async function GET() {
    await connectMongoDB();
    const items = await User.find();
    return NextResponse.json({ items });
  }