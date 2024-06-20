import express from "express";
import { item } from "../models/items.js";

const router = express.Router();

router.get("/items", async (req, res) => {
  try {
    const items = await item.find();
    res.status(200).send({
      status: "success",
      message: "Items listed successfully",
      data: items,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Items could not be fetched",
      data: error.message,
    });
  }
});

router.post("/addItems", async (req, res) => {
  try {
    const addedItem = new item(req.body);
    await addedItem.save();
    res.status(200).send({
      status: "success",
      message: "Item added successfully",
      data: addedItem,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Item could not be added",
      data: error.message,
    });
  }
});

router.put("/updateItems/:id", async (req, res) => {
  try {
    await item.findByIdAndUpdate(req.params.id, req.body);
    const updatedItem = await item.findById(req.params.id);
    if (!updatedItem) {
      return res.status(404).send({
        status: "error",
        message: "Item not found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Item could not be updated",
      data: error.message,
    });
  }
});

router.delete("/deleteItem/:id", async (req, res) => {
  try {
    const deletedItem = await item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send({
        status: "error",
        message: "Item not found",
      });
    }
    res.status(200).send({
      status: "success",
      message: "Item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Item could not be deleted",
      data: error.message,
    });
  }
});

export default router;
