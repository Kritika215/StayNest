import express from "express";

import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProperties);

router.get("/:id", getPropertyById);

router.post(
  "/",
  authMiddleware,
  createProperty
);

router.put(
  "/:id",
  authMiddleware,
  updateProperty
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProperty
);

export default router;