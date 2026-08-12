import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g. "Darawaja", "Divaan"
    },
    imageUrl: {
      type: String,
      required: true, // path to image
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
