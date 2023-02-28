import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    listProduct: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
