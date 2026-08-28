import { useEffect, useState } from "react";
import { CalendarDays, MapPin, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // FETCH MY BOOKINGS
  // ============================

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view your bookings.");
          return;
        }

        const response = await api.get("/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error("Fetch bookings error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load your bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ============================
  // CANCEL BOOKING
  // ============================

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (err) {
      console.error("Cancel booking error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to cancel booking."
      );
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl bg-gray-200"
              />
            ))}
          </div>

        </div>
      </main>
    );
  }

  // ============================
  // PAGE
  // ============================

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
          Your trips
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          My Bookings
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your upcoming and previous stays.
        </p>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* NO BOOKINGS */}

        {!error && bookings.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow-sm">

            <CalendarDays
              size={40}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Find a beautiful place and book your next stay.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-flex rounded-xl bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
            >
              Explore stays
            </Link>

          </div>
        )}

        {/* BOOKINGS */}

        {!error && bookings.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">

            {bookings.map((booking) => {
              const property = booking.property;

              const image =
                property?.image ||
                property?.images?.[0] ||
                "";

              const status =
                booking.status || "confirmed";

              return (
                <article
                  key={booking._id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                >

                  <div className="flex flex-col sm:flex-row">

                    {/* IMAGE */}

                    {image ? (
                      <img
                        src={image}
                        alt={property?.title || "Property"}
                        className="h-56 w-full object-cover sm:h-auto sm:w-48"
                      />
                    ) : (
                      <div className="flex h-56 w-full items-center justify-center bg-gray-100 text-sm text-gray-400 sm:h-auto sm:w-48">
                        No image
                      </div>
                    )}

                    {/* DETAILS */}

                    <div className="flex-1 p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <h2 className="font-bold text-gray-900">
                            {property?.title || "Property"}
                          </h2>

                          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                            <MapPin size={14} />

                            {property?.location ||
                              property?.city ||
                              "Location"}
                          </p>

                        </div>

                        {/* STATUS */}

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            status === "cancelled"
                              ? "bg-red-50 text-red-600"
                              : status === "pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {status}
                        </span>

                      </div>

                      {/* BOOKING INFO */}

                      <div className="mt-5 space-y-2 text-sm text-gray-600">

                        <p>
                          <strong>Check-in:</strong>{" "}
                          {booking.checkIn
                            ? new Date(
                                booking.checkIn
                              ).toLocaleDateString("en-IN")
                            : "N/A"}
                        </p>

                        <p>
                          <strong>Check-out:</strong>{" "}
                          {booking.checkOut
                            ? new Date(
                                booking.checkOut
                              ).toLocaleDateString("en-IN")
                            : "N/A"}
                        </p>

                        <p>
                          <strong>Guests:</strong>{" "}
                          {booking.guests || 1}
                        </p>

                      </div>

                      {/* PRICE + CANCEL */}

                      <div className="mt-5 flex items-center justify-between">

                        <span className="font-bold text-gray-900">
                          ₹
                          {Number(
                            booking.totalPrice ||
                              booking.price ||
                              0
                          ).toLocaleString("en-IN")}
                        </span>

                        {status !== "cancelled" && (
                          <button
                            type="button"
                            onClick={() =>
                              cancelBooking(booking._id)
                            }
                            className="flex items-center gap-1.5 rounded-xl border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                          >
                            <XCircle size={15} />
                            Cancel
                          </button>
                        )}

                      </div>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>

    </main>
  );
}

export default MyBookings;