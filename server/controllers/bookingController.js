import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

// ========================================
// CREATE BOOKING
// ========================================

export const createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    // Validate required fields
    if (
      !propertyId ||
      !checkIn ||
      !checkOut ||
      !guests
    ) {
      return res.status(400).json({
        message: "All booking fields are required",
      });
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      isNaN(checkInDate.getTime()) ||
      isNaN(checkOutDate.getTime())
    ) {
      return res.status(400).json({
        message: "Invalid booking dates",
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        message:
          "Check-out date must be after check-in date",
      });
    }

    // Find property
    const property = await Property.findById(
      propertyId
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Validate guests
    if (
      Number(guests) < 1 ||
      Number(guests) > Number(property.guests)
    ) {
      return res.status(400).json({
        message: `Maximum ${property.guests} guests allowed`,
      });
    }

    // Check for overlapping bookings
    const existingBooking =
      await Booking.findOne({
        property: propertyId,
        status: {
          $ne: "cancelled",
        },
        checkIn: {
          $lt: checkOutDate,
        },
        checkOut: {
          $gt: checkInDate,
        },
      });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "This property is already booked for the selected dates",
      });
    }

    // Calculate number of nights
    const millisecondsPerDay =
      1000 * 60 * 60 * 24;

    const nights = Math.ceil(
      (checkOutDate - checkInDate) /
        millisecondsPerDay
    );

    // Calculate total price
    const totalPrice =
      nights * Number(property.price);

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      property: propertyId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: Number(guests),
      totalPrice,
      status: "confirmed",
    });

    // Populate property details
    await booking.populate(
      "property",
      "title location city price image images"
    );

    res.status(201).json({
      message: "Booking successful!",
      booking,
    });
  } catch (error) {
    console.error(
      "Create booking error:",
      error
    );

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