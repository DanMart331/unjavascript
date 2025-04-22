import connectMongoDB from "../../../../config/mongodb";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { genSalt, hash } from "bcrypt-ts";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);  
  await connectMongoDB();

  await User.create({ username, password: hashPassword });
  return NextResponse.json({ message: "User added successfully" }, { status: 201 });  
}

export async function GET() {
    await connectMongoDB();
    const items = await User.find();
    return NextResponse.json({ items });
  }
