import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

// ========================================
// CREATE REVIEW
// ========================================

export const createReview = async (req, res) => {
  try {
    const { property, rating, comment } = req.body;

    if (!property || !rating || !comment) {
      return res.status(400).json({
        message: "Rating and comment are required",
      });
    }

    // User must have stayed/booked this property
    const booking = await Booking.findOne({
      user: req.user._id,
      property,
      status: "confirmed",
    });

    if (!booking) {
      return res.status(403).json({
        message: "You can review only properties you have booked",
      });
    }

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      property,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this property",
      });
    }

    const review = await Review.create({
      property,
      user: req.user._id,
      rating: Number(rating),
      comment,
    });

    const populatedReview = await Review.findById(review._id)
      .populate("user", "name email");

    res.status(201).json({
      message: "Review added successfully",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Create review error:", error);

    // Duplicate index protection
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already reviewed this property",
      });
    }

    res.status(500).json({
      message: "Failed to add review",
    });
  }
};


// ========================================
// GET PROPERTY REVIEWS
// ========================================

export const getPropertyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      property: req.params.propertyId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        : 0;

    res.status(200).json({
      count: reviews.length,
      averageRating: Number(averageRating.toFixed(1)),
      reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    res.status(500).json({
      message: "Failed to fetch reviews",
    });
  }
};


// ========================================
// DELETE OWN REVIEW
// ========================================

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not authorized to delete this review",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    res.status(500).json({
      message: "Failed to delete review",
    });
  }
};