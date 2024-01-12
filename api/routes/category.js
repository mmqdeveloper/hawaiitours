import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
  updateCategoryAvailability,
} from "../controllers/category.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:add", verifyAdmin, createCategory);

//UPDATE
router.put("/availability/:id", updateCategoryAvailability);
router.put("/:id", verifyAdmin, updateCategory);

//DELETE
router.delete("/:id", verifyAdmin, deleteCategory);

//GET
router.get("/:id", getCategory);

//GET ALL
router.get("/", getCategories);

export default router;
