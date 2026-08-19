import express from "express";

import {
  getProperties,
  getProperty,
  createProperty,
} from "../controllers/propertyController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// Public
router.get("/", getProperties);

router.get("/:id", getProperty);


// Protected - logged-in user
router.post("/", protect, createProperty);

export default router;