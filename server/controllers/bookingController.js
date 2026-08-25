import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

// ========================================
// CREATE BOOKING
// ========================================

export const createBooking = async (req, res) => {
  try {
    const {
      property,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    } = req.body;

    if (!property || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        message: "All booking details are required",
      });
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (startDate >= endDate) {
      return res.status(400).json({
        message: "Check-out date must be after check-in date",
      });
    }

    // Check for overlapping active bookings
    const existingBooking = await Booking.findOne({
      property,
      status: { $ne: "cancelled" },
      checkIn: { $lt: endDate },
      checkOut: { $gt: startDate },
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "This property is already booked for these dates",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      property,
      checkIn: startDate,
      checkOut: endDate,
      guests,
      totalPrice,
      status: "confirmed",
    });

    const populatedBooking = await Booking.findById(
      booking._id
    ).populate("property");

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Failed to create booking",
    });
  }
};


// ========================================
// GET MY BOOKINGS
// ========================================

export const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate(
        "property",
        "title location city price image images"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(
      "Get my bookings error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};


// ========================================
// CANCEL BOOKING
// ========================================

export const cancelBooking = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const booking =
      await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only booking owner can cancel
    if (
      booking.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to cancel this booking",
      });
    }

    // Already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    // Cancel booking
    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      message:
        "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Cancel booking error:",
      error
    );

    res.status(500).json({
      message: "Failed to cancel booking",
    });
  }
};

// GET HOST BOOKINGS
export const getHostBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "property",
        match: { host: req.user._id },
        select:
          "title location city image images price",
      })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const hostBookings = bookings.filter(
      (booking) => booking.property
    );

    res.status(200).json({
      count: hostBookings.length,
      bookings: hostBookings,
    });
  } catch (error) {
    console.error(
      "Get host bookings error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch host bookings",
    });
  }
};


// UPDATE BOOKING STATUS
export const updateBookingStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !["confirmed", "cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({
        message: "Invalid booking status",
      });
    }

    const booking =
      await Booking.findById(id).populate(
        "property"
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (
      !booking.property ||
      booking.property.host.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to update this booking",
      });
    }

    booking.status = status;

    await booking.save();

    res.status(200).json({
      message:
        "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Update booking status error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update booking status",
    });
  }
};