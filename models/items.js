import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    distributor: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export const item = mongoose.model("itemSchema", itemSchema);
