// src/models/itemSchema.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for your item
export interface IComparison extends Document {
  major: string;
  college1: string;
  college2: string;
}

// Define schema using the interface and types
const comparisonSchema = new Schema<IComparison>({
  major: {
    type: String,
    required: true,
  },
  college1: {
    type: String,
    required: true,
  },
  college2: {
    type: String,
    required: true,
  },
});

const Comparison: Model<IComparison> =
  mongoose.models.Comparison || mongoose.model<IComparison>("Comparison", comparisonSchema);

export default Comparison;