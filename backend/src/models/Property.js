import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["1BHK", "2BHK", "3BHK", "SHOP", "VILLA", "PLOT"],
      required: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD", "RESERVED"],
      default: "AVAILABLE",
    },
    images: {
      type: [String], // array of image URLs
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
