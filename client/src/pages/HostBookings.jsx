import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Users,
  Check,
  X,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function HostBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchHostBookings();
  }, []);

  const fetchHostBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/bookings/host");

      setBookings(response.data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch host bookings:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load booking requests."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      setUpdatingId(bookingId);

      const response = await api.put(
        `/bookings/${bookingId}/status`,
        { status }
      );

      const updatedBooking = response.data.booking;

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? updatedBooking || {
                ...booking,
                status,
              }
            : booking
        )
      );
    } catch (err) {
      console.error("Update booking status error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to update booking."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700";

      case "cancelled":
        return "bg-red-50 text-red-600";

      case "rejected":
        return "bg-red-50 text-red-600";

      case "pending":
      default:
        return "bg-yellow-50 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-10 w-72 animate-pulse rounded bg-gray-200" />

          <div className="mt-10 space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-3xl bg-gray-200"
              />
            ))}
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E07A5F]">
            Host dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Booking Requests
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage reservations for your properties.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!error && bookings.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4EFEA] text-[#E07A5F]">
              <CalendarDays size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No booking requests
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              When guests book one of your properties,
              their reservations will appear here.
            </p>

            <Link
              to="/my-properties"
              className="mt-6 inline-flex rounded-xl bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
            >
              View my properties
            </Link>

          </div>
        )}

        {/* BOOKINGS */}
        {!error && bookings.length > 0 && (
          <div className="mt-10 space-y-5">

            {bookings.map((booking) => {
              const property = booking.property;

              const image =
                property?.image ||
                property?.images?.[0] ||
                "";

              const status =
                booking.status || "pending";

              const guest =
                booking.user || booking.guest;

              return (
                <article
                  key={booking._id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row">

                    {/* IMAGE */}
                    <div className="h-56 w-full shrink-0 bg-gray-100 lg:h-auto lg:w-64">

                      {image ? (
                        <img
                          src={image}
                          alt={
                            property?.title ||
                            "Property"
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          No image
                        </div>
                      )}

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-6">

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {property?.title ||
                              "Property"}
                          </h2>

                          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                            <MapPin size={15} />
                            {property?.location ||
                              property?.city ||
                              "Location"}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                            status
                          )}`}
                        >
                          {status === "pending" && (
                            <Clock size={13} />
                          )}

                          {status}
                        </span>

                      </div>

                      {/* GUEST */}
                      <div className="mt-6 rounded-2xl bg-[#FAFAF8] p-4">

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Guest
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                          {guest?.name ||
                            guest?.username ||
                            "Guest"}
                        </p>

                        {guest?.email && (
                          <p className="mt-1 text-sm text-gray-500">
                            {guest.email}
                          </p>
                        )}

                      </div>

                      {/* BOOKING DETAILS */}
                      <div className="mt-5 grid gap-4 sm:grid-cols-3">

                        <div>
                          <p className="text-xs font-semibold uppercase text-gray-400">
                            Check-in
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {booking.checkIn
                              ? new Date(
                                  booking.checkIn
                                ).toLocaleDateString()
                              : "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase text-gray-400">
                            Check-out
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {booking.checkOut
                              ? new Date(
                                  booking.checkOut
                                ).toLocaleDateString()
                              : "-"}
                          </p>
                        </div>

                        <div>
                          <p className="flex items-center gap-1 text-xs font-semibold uppercase text-gray-400">
                            <Users size={13} />
                            Guests
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {booking.guests || 1}
                          </p>
                        </div>

                      </div>

                      {/* BOTTOM */}
                      <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                          <p className="text-xs text-gray-400">
                            Booking amount
                          </p>

                          <p className="mt-1 text-xl font-bold text-gray-900">
                            ₹
                            {Number(
                              booking.totalPrice ||
                                booking.price ||
                                0
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>

                        {/* ACTIONS */}
                        {status === "pending" && (
                          <div className="flex gap-2">

                            <button
                              type="button"
                              disabled={
                                updatingId ===
                                booking._id
                              }
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "confirmed"
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Check size={16} />

                              {updatingId ===
                              booking._id
                                ? "Updating..."
                                : "Accept"}
                            </button>

                            <button
                              type="button"
                              disabled={
                                updatingId ===
                                booking._id
                              }
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "rejected"
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <X size={16} />
                              Reject
                            </button>

                          </div>
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

export default HostBookings;