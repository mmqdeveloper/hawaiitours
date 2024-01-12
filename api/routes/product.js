import express from "express";
import {
  countByCity,
  countByType,
  createProduct,
  deleteProduct,
  getProduct,
  getProductCategory,
  getProducts,
  updateProduct,
} from "../controllers/product.js";
import Product from "../models/Product.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createProduct);

//UPDATE
router.put("/:id", verifyAdmin, updateProduct);
//DELETE
router.delete("/:id", verifyAdmin, deleteProduct);
//GET

router.get("/find/:id", getProduct);
//GET ALL

router.get("/", getProducts);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/category/:id", getProductCategory);

export default router;
