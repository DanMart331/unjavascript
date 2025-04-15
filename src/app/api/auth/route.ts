import connectMongoDB from "../../../../config/mongodb";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  await connectMongoDB();
 
  const user = await User.findOne({username});
  if (!user) return NextResponse.json({ message: "Invalid credentials" });

  const isMatch = await (password == user.password);
  if (!isMatch) return NextResponse.json({message: "Invalid Credentials" });

  return NextResponse.json({ message: "User logged in successfully" }, { status: 201 });
}