import express from "express";
import multer from "multer";
import Image from "../models/imageModel.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Admin Image Upload API
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!req.file) {
      return res.status(400).send({ success: false, message: "Please upload an image" });
    }
    const imageUrl = "images/" + req.file.filename;
    const newImage = new Image({ title, category, imageUrl });
    await newImage.save();
    res.status(201).send({ success: true, message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error uploading image", error });
  }
});

// Get All Images
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).send({ success: true, images });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching images", error });
  }
});
// Get Images by Category
router.get("/images/:category", async (req, res) => {
  try {
    const images = await Image.find({ category: req.params.category });
    res.status(200).send({ success: true, images });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching images", error });
  }
});

// Delete Image API
router.delete("/images/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).send({ success: false, message: "Image not found" });
    }

    // Try to remove file from disk if it exists
    if (image.imageUrl && fs.existsSync(image.imageUrl)) {
      try {
        fs.unlinkSync(image.imageUrl);
      } catch (err) {
        console.log("Could not delete file from disk:", err.message);
      }
    }

    await Image.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting image", error: error.message });
  }
});

export default router;
