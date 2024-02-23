import mongoose from "mongoose";
const ResourceSchema = new mongoose.Schema(
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
    calendar:{
      type: Date,
    },
    product: {
      type: String,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Resource", ResourceSchema);
