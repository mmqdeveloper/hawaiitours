import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategorys,
  updateCategory,
  updateCategoryAvailability,
} from "../controllers/category.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:productid", verifyAdmin, createCategory);

//UPDATE
router.put("/availability/:id", updateCategoryAvailability);
router.put("/:id", verifyAdmin, updateCategory);
//DELETE
router.delete("/:id/:productid", verifyAdmin, deleteCategory);
//GET

router.get("/:id", getCategory);
//GET ALL

router.get("/", getCategorys);

export default router;
