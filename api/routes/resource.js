import express from "express";
import {
  createResource,
  deleteResource,
  getResource,
  getCategories,
  updateResource,
  updateResourceAvailability,
} from "../controllers/resource.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:add", verifyAdmin, createResource);

//UPDATE
router.put("/availability/:id", updateResourceAvailability);
router.put("/:id", verifyAdmin, updateResource);

//DELETE
router.delete("/:id", verifyAdmin, deleteResource);

//GET
router.get("/:id", getResource);

//GET ALL
router.get("/", getCategories);

export default router;
