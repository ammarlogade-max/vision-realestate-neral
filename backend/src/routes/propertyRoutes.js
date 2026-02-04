import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protectAdmin from "../middleware/authMiddleware.js";
import {
  getAllProperties,
  getAdminProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  markPropertySold,
} from "../controllers/propertyController.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getAllProperties);

/* ADMIN */
router.get("/admin", protectAdmin, getAdminProperties);
router.get("/admin/:id", protectAdmin, getPropertyById); // ✅ REQUIRED
router.post("/admin", protectAdmin, upload.array("images", 10), createProperty);
router.put("/admin/:id", protectAdmin, upload.array("images", 10), updateProperty);
router.delete("/admin/:id", protectAdmin, deleteProperty);
router.patch("/admin/:id/sold", protectAdmin, markPropertySold);

export default router;
