import express from "express";
import {
  createProduct,
  deleteProduct,
  getListProduct,
  getInfoProduct,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.delete("/:id", deleteProduct);
router.get("/:id", getInfoProduct);
router.put("/:id", updateProduct);
router.post("/", createProduct);
router.get("/", getListProduct);

export default router;
