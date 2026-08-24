
import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Users, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios";

function HostBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, {
        status,
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status }
            : booking
        )
      );
    } catch (err) {
      console.error("Booking status error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to update booking."
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

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

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
          Host dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Booking Requests
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage guests who have requested to stay at your properties.
        </p>

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {!error && bookings.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow-sm">
            <CalendarDays
              size={42}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No booking requests
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Booking requests for your properties will appear here.
            </p>
          </div>
        )}

        {!error && bookings.length > 0 && (
          <div className="mt-10 space-y-5">

            {bookings.map((booking) => {
              const property = booking.property;
              const guest = booking.user;

              const image =
                property?.image ||
                property?.images?.[0] ||
                "";

              const status =
                booking.status || "pending";

              return (
                <article
                  key={booking._id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row">

                    {image ? (
                      <img
                        src={image}
                        alt={property?.title || "Property"}
                        className="h-56 w-full object-cover lg:h-auto lg:w-64"
                      />
                    ) : (
                      <div className="flex h-56 w-full items-center justify-center bg-gray-100 text-sm text-gray-400 lg:h-auto lg:w-64">
                        No image
                      </div>
                    )}

                    <div className="flex-1 p-6">

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h2 className="text-lg font-bold text-gray-900">
                            {property?.title || "Property"}
                          </h2>

                          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                            <MapPin size={14} />
                            {property?.location ||
                              property?.city ||
                              "Location"}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            status === "confirmed"
                              ? "bg-green-50 text-green-700"
                              : status === "cancelled"
                              ? "bg-red-50 text-red-600"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {status}
                        </span>

                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <div>
                          <p className="text-xs font-semibold uppercase text-gray-400">
                            Guest
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {guest?.name || "Guest"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase text-gray-400">
                            Check-in
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {new Date(
                              booking.checkIn
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase text-gray-400">
                            Check-out
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {new Date(
                              booking.checkOut
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase text-gray-400">
                            Guests
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-800">
                            <Users size={14} />
                            {booking.guests}
                          </p>
                        </div>

                      </div>

                      <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                          <p className="text-xs text-gray-400">
                            Total booking value
                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-900">
                            ₹
                            {Number(
                              booking.totalPrice ||
                                booking.price ||
                                0
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>

                        {status === "pending" && (
                          <div className="flex gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                updateBookingStatus(
                                  booking._id,
                                  "confirmed"
                                )
                              }
                              className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                              <CheckCircle size={16} />
                              Confirm
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateBookingStatus(
                                  booking._id,
                                  "cancelled"
                                )
                              }
                              className="flex items-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                            >
                              <XCircle size={16} />
                              Decline
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

