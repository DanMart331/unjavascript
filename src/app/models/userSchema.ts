// src/models/itemSchema.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// TypeScript interface for your item
export interface IUser extends Document {
  username: string;
  password: string;
}

// Define schema using the interface and types
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;