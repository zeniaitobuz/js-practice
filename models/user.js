import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export const user = mongoose.model("userSchema", userSchema);
