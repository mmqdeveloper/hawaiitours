import mongoose from "mongoose";
const ResourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    product: {
      type: [String],
      default: [],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Resource", ResourceSchema);
