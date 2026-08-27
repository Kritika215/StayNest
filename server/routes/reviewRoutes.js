import express from "express";

import {
  createReview,
  getPropertyReviews,
  deleteReview,
} from "../controllers/reviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET reviews for a property
router.get(
  "/property/:propertyId",
  getPropertyReviews
);

// CREATE review
router.post(
  "/",
  authMiddleware,
  createReview
);

// DELETE own review
router.delete(
  "/:id",
  authMiddleware,
  deleteReview
);

export default router;