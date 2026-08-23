import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE BOOKING
router.post(
  "/",
  authMiddleware,
  createBooking
);

// GET MY BOOKINGS
router.get(
  "/my",
  authMiddleware,
  getMyBookings
);

// CANCEL BOOKING
router.delete(
  "/:id",
  authMiddleware,
  cancelBooking
);

export default router;