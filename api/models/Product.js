import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    product_image: {
      type: [String],
    },
    product_gallery: {
      type: [String],
    },
    product_tags: {
      type: String,
    },
    product_notes: {
      type: String,
    },
    author: {
      type: String,
    },
    categories: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema)