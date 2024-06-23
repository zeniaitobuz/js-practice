import express from "express";
import { item } from "../models/items.js";
import { user as userModel } from "../models/user.js";
import bcrypt from "bcrypsjs";
import mongoose from "mongoose";

const router = express.Router();

router.post("/add-edit-user/:actionType", async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const { actionType } = req.params;

    const isExistingUser = await userModel.findOne({ email });
    const userId = isExistingUser?._id || new mongoose.Types.ObjectId();

    if (isExistingUser && actionType === "add") {
      res.status(403);
      return next(new Error("Email already taken!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const addEditdata = {
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    };

    const response = await userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          ...addEditdata,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (!response) {
      res.status(500);
      return next(new Error("Failed to update user details!"));
    }

    res.status(200).json({
      data: {
        name: response.name,
        email: response.email,
        phoneNumber: response.phoneNumber,
      },
      message:
        actionType === "add"
          ? "User added successfully!"
          : "User updated successfully!",
      success: true,
    });
  } catch (error) {
    next(new Error("User cannot be added"));
  }
});

router.get("/items", async (req, res, next) => {
  try {
    const items = await item.find();
    res.status(200).send({
      status: "success",
      message: "Items listed successfully",
      data: items,
    });
  } catch (error) {
    next(new Error("Items could not be fetched"));
  }
});

router.post("/addItems", async (req, res, next) => {
  try {
    const addedItem = new item(req.body);
    await addedItem.save();
    res.status(200).send({
      status: "success",
      message: "Item added successfully",
      data: addedItem,
    });
  } catch (error) {
    next(new Error("Item could not be added"));
  }
});

router.put("/updateItems/:id", async (req, res, next) => {
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
    next(new Error("Item could not be updated"));
  }
});

router.delete("/deleteItem/:id", async (req, res, next) => {
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
    next(new Error("Item could not be deleted"));
  }
});

export default router;
