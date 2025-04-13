// src/models/itemSchema.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for your item
export interface IItem extends Document {
  owner?: string;
  title: string;
  description?: string;
  url?: string;
  rating?: number;
}

// Define schema using the interface and types
const itemSchema = new Schema<IItem>({
  owner: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  rating: {
    type: Number, // ✅ leave off "required: false"
  },
});

const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);

export default Item;
