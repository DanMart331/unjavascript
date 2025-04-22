// src/models/itemSchema.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for your item
export interface IUser extends Document {
  major: string;
  college1: string;
  college2: string;
}

// Define schema using the interface and types
const userSchema = new Schema<IUser>({
  major: {
    type: String,
  },
  college1: {
    type: String,
  },
  college2: {
    type: String,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;