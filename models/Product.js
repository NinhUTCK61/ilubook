import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
    isNew: {
      type: Boolean,
    },

    quantity: {
      type: Number,
    },
    description: {
      type: String,
    },
    shipping: {
      type: String,
    },
    listDiffImg: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
