import connectMongoDB from "../../../../../config/mongodb";
import Item from "../../../models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
  params: { id: string };
}

// GET item by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  await connectMongoDB();
  const item = await Item.findOne({ _id: id });
  return NextResponse.json({ item }, { status: 200 });
}

// PUT (update) item
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  const { owner, title, description, rating } = await request.json(); // include rating
  await connectMongoDB();
  const updatedItem = await Item.findByIdAndUpdate(
    id,
    { owner, title, description, rating }, // include it here too
    { new: true }
  );
  return NextResponse.json(updatedItem, { status: 200 });
}

// DELETE item
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }
  await connectMongoDB();
  const deletedItem = await Item.findByIdAndDelete(id);

  if (!deletedItem) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}