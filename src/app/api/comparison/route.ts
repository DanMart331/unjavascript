import mongoose from "mongoose";
import connectMongoDB from "../../../../config/mongodb";
import Comparison from "../../models/comparisonSchema";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";


// POST: Create new comparison
export async function POST(request: Request) {
  try {
    const { major, college1, college2, user } = await request.json();
    if (!major || !college1 || !college2 || !user) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    await connectMongoDB();
    const newComparison = await Comparison.create({ major, college1, college2, user });
    return NextResponse.json(newComparison, { status: 201 });
  } catch (error) {
    console.error("POST /api/comparison error:", error);
    return NextResponse.json({ message: "Failed to create comparison", error }, { status: 500 });
  }
}

// GET: Retrieve all comparisons
export async function GET() {
    await connectMongoDB();
    const comparisons = await Comparison.find();
    return NextResponse.json({ comparisons }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  // const { id } = params;

  const { id } = await request.json();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }
  await connectMongoDB();
  const deletedItem = await Comparison.findByIdAndDelete(id);

  if (!deletedItem) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}