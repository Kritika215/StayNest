import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

// ============================
// CREATE BOOKING
// ============================

export const createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    if (!propertyId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        message: "All booking fields are required",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (end <= start) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }

    if (Number(guests) > property.guests) {
      return res.status(400).json({
        message: `Maximum ${property.guests} guests allowed`,
      });
    }

    // Calculate number of nights
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const nights = Math.ceil(
      (end - start) / millisecondsPerDay
    );

    const totalPrice =
      nights * Number(property.price);

    const booking = await Booking.create({
      property: propertyId,
      user: req.user._id,
      checkIn: start,
      checkOut: end,
      guests: Number(guests),
      totalPrice,
    });

    const populatedBooking =
      await Booking.findById(booking._id)
        .populate("property")
        .populate("user", "name email");

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


// ============================
// GET MY BOOKINGS
// ============================

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};