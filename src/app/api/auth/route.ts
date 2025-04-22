import connectMongoDB from "../../../../config/mongodb";
import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { genSalt, hash, compareSync } from "bcrypt-ts";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);  
  console.log(hashPassword);
  await connectMongoDB();
 
  const user = await User.findOne({username});
  if (!user) return NextResponse.json({ message: "Invalid credentials" });

  const isMatch = await compareSync(password, user.password);
  if (!isMatch){
    console.log("Fail");
    return NextResponse.json({message: "Invalid Credentials" });
  } 

  console.log("Success");
  return NextResponse.json({ message: "User logged in successfully" }, { status: 201 });
  
}