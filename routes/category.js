import express from "express";
import {
  createCategory,
  getListCategory,
  searchCategory,
  deleteCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/delete-category", deleteCategory);
router.get("/search", searchCategory);
router.post("/", createCategory);
router.get("/", getListCategory);

export default router;
