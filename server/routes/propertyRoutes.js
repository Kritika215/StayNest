import express from "express";

import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
} from "../controllers/propertyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all properties
router.get("/", getProperties);

// GET my properties
router.get(
  "/my-properties",
  authMiddleware,
  getMyProperties
);

// GET single property
router.get("/:id", getProperty);

// CREATE property
router.post("/", authMiddleware, createProperty);

// UPDATE property
router.put("/:id", authMiddleware, updateProperty);

// DELETE property
router.delete("/:id", authMiddleware, deleteProperty);

export default router;