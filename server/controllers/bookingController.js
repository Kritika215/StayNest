import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

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
        message: "All booking details are required",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (endDate <= startDate) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }

    if (Number(guests) > Number(property.guests)) {
      return res.status(400).json({
        message: `Maximum ${property.guests} guests allowed`,
      });
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const nights = Math.ceil(
      (endDate - startDate) / millisecondsPerDay
    );

    const totalPrice = nights * Number(property.price);

    const booking = await Booking.create({
      property: propertyId,
      user: req.user._id,
      checkIn: startDate,
      checkOut: endDate,
      guests: Number(guests),
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Failed to create booking",
    });
  }
};


export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};