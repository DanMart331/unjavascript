import User, { IUser } from "@/app/models/userSchema";
import { RootFilterQuery } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/mongodb";
import { genSalt, hash} from "bcrypt-ts";

export async function PUT(request: NextRequest) {
  const { password, username , preferredSchools} = await request.json();
  await connectMongoDB();

  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  const filter:RootFilterQuery<IUser> = {
    "username" : username
  }
  const updatedItem = await User.findOneAndUpdate(filter, {
    $set:{"password" : hashPassword}
  });
  return NextResponse.json(updatedItem, { status: 200 });
}