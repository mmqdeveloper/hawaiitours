import express from "express";
import { createPermissionCategory, getAllPermissionCategories, updatePermissionCategory } from "../controllers/role_permission.js";


const router = express.Router();

router.get("/permission-category", getAllPermissionCategories);
router.post("/permission-category", createPermissionCategory);
router.put("/permission-category/:id", updatePermissionCategory);

export default router;