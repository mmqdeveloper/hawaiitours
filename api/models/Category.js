import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    parentCategory: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Category", CategorySchema);
