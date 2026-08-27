
import { useEffect, useState } from "react";
import { Star, Trash2 } from "lucide-react";
import api from "../api/axios";

function Reviews({ propertyId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  let currentUser = null;

  try {
    currentUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    currentUser = null;
  }

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/reviews/property/${propertyId}`
      );

      setReviews(response.data.reviews || []);
      setAverageRating(response.data.averageRating || 0);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setError(
        err.response?.data?.message ||
        "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Please login to leave a review.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    try {
      setSubmitting(true);

      await api.post(
        "/reviews",
        {
          property: propertyId,
          rating: Number(rating),
          comment: comment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComment("");
      setRating(5);
      setSuccess("Review added successfully!");

      await fetchReviews();
    } catch (err) {
      console.error("Create review error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to add review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      "Delete your review?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchReviews();
    } catch (err) {
      console.error("Delete review error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to delete review."
      );
    }
  };

  return (
    <section className="border-t border-gray-200 py-8">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Reviews
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {reviews.length}{" "}
            {reviews.length === 1
              ? "review"
              : "reviews"}
          </p>
        </div>

        {reviews.length > 0 && (
          <div className="flex items-center gap-2">

            <Star
              size={18}
              fill="currentColor"
              className="text-[#E07A5F]"
            />

            <span className="font-bold text-gray-900">
              {Number(averageRating).toFixed(1)}
            </span>

            <span className="text-sm text-gray-500">
              average
            </span>

          </div>
        )}

      </div>

      {token && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-gray-100 bg-white p-5"
        >

          <h3 className="font-semibold text-gray-900">
            Share your experience
          </h3>

          <div className="mt-4">

            <label className="text-sm font-medium text-gray-700">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Very good</option>
              <option value={3}>3 - Good</option>
              <option value={2}>2 - Fair</option>
              <option value={1}>1 - Poor</option>
            </select>

          </div>

          <div className="mt-4">

            <label className="text-sm font-medium text-gray-700">
              Comment
            </label>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              rows={4}
              maxLength={500}
              placeholder="How was your stay?"
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
            />

          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 rounded-xl bg-[#E07A5F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Submitting..."
              : "Submit review"}
          </button>

        </form>
      )}

      {!token && (
        <p className="mt-5 rounded-xl bg-[#F4EFEA] p-4 text-sm text-gray-600">
          Login to share your experience.
        </p>
      )}

      {loading ? (
        <div className="mt-6 space-y-4">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-white"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white p-6 text-center">
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first to review this property.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">

          {reviews.map((review) => {

            const isOwner =
              currentUser &&
              String(review.user?._id) === String(currentUser._id);

            return (
              <article
                key={review._id}
                className="rounded-2xl border border-gray-100 bg-white p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4EFEA] font-bold text-[#E07A5F]">
                      {review.user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.user?.name || "User"}
                      </p>

                      <div className="mt-1 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <Star
                              key={star}
                              size={14}
                              fill={
                                star <= review.rating
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                star <= review.rating
                                  ? "text-[#E07A5F]"
                                  : "text-gray-300"
                              }
                            />
                          )
                        )}
                      </div>
                    </div>

                  </div>

                  {isOwner && (
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(review._id)
                      }
                      className="text-gray-400 transition hover:text-red-500"
                      title="Delete review"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}

                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {review.comment}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString("en-IN")}
                </p>

              </article>
            );
          })}

        </div>
      )}

    </section>
  );
}

export default Reviews;

