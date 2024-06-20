import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  distributor: String,
});

export const item = mongoose.model("itemSchema", itemSchema);
