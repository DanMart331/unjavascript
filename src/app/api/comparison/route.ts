import connectMongoDB from "../../../../config/mongodb";
import Item from "../../models/itemSchema";
import { NextResponse } from "next/server";

// POST: Create new comparison
export async function POST(request: Request) {
  try {
    const { major, college1, college2 } = await request.json();
    if (!major || !college1 || !college2) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    await connectMongoDB();
    const newItem = await Item.create({ major, college1, college2 });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("POST /api/items error:", error);
    return NextResponse.json({ message: "Failed to create item", error }, { status: 500 });
  }
}

// GET: Retrieve all comparisons
export async function GET() {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items }, { status: 200 });
}