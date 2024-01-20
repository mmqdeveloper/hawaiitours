import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: [String],
    },
    sku:{
      type: String,
    },
    categories: {
      type: [String],
    },
    tags: {
      type: String,
    },
    author: {
      type: String,
    },
    badge: {
      type: String,
    },
    commission_rate: {
      type: Number,
    },
    product_notes: {
      type: String,
    },
    pickup: {
      type: String,
    },
    hero_image: {
      type: String,
    },
    seo_title: {
      type: String,
    },
    meta_desc: {
      type: String,
    },
    keyphrase: {
      type: String,
    },
    vendor: {
      type: String,
    },
    api: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema)