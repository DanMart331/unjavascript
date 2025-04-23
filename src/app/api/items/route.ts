import connectMongoDB from "../../../../config/mongodb";
import Item from "../../models/itemSchema";
import { NextResponse } from "next/server";

// POST: Create review
export async function POST(request: Request) {
  try {
    const { owner, title, description, rating } = await request.json();
    if (!owner || !title || !description || rating === 0) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectMongoDB();
    const newItem = await Item.create({ owner, title, description, rating });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("POST /api/items error:", error);
    return NextResponse.json({ message: "Failed to create item", error }, { status: 500 });
  }
}

// GET: Return all items
export async function GET() {
  await connectMongoDB();
  const items = await Item.find();
  return NextResponse.json({ items }, { status: 200 });
}