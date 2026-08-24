import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getHostBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE BOOKING
router.post(
  "/",
  authMiddleware,
  createBooking
);

// MY BOOKINGS
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

// HOST BOOKINGS
router.get(
  "/host",
  authMiddleware,
  getHostBookings
);

// UPDATE BOOKING STATUS
router.put(
  "/:id/status",
  authMiddleware,
  updateBookingStatus
);

export default router;
