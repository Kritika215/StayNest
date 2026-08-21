import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("/bookings/my");

        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);

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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-8 h-48 rounded-3xl bg-gray-200" />
          <div className="mt-5 h-48 rounded-3xl bg-gray-200" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E07A5F]">
            Your trips
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your upcoming and previous stays.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!error && bookings.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">

            <CalendarDays
              size={42}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No bookings yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              You haven't booked a stay yet. Explore our properties
              and find your next destination.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-flex rounded-full bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
            >
              Explore stays
            </Link>

          </div>
        )}

        {/* BOOKINGS */}

        {!error && bookings.length > 0 && (
          <div className="mt-10 space-y-5">

            {bookings.map((booking) => {

              const property = booking.property;

              if (!property) return null;

              const propertyImage =
                property.image ||
                property.images?.[0] ||
                "";

              return (
                <div
                  key={booking._id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                >

                  <div className="grid md:grid-cols-[240px_1fr]">

                    {/* IMAGE */}

                    <Link
                      to={`/property/${property._id}`}
                      className="block h-52 overflow-hidden bg-gray-100 md:h-full"
                    >

                      {propertyImage ? (
                        <img
                          src={propertyImage}
                          alt={property.title}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          No image
                        </div>
                      )}

                    </Link>

                    {/* DETAILS */}

                    <div className="p-6">

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F]">
                            {booking.status}
                          </p>

                          <Link
                            to={`/property/${property._id}`}
                            className="mt-1 block text-xl font-bold text-gray-900 hover:text-[#E07A5F]"
                          >
                            {property.title}
                          </Link>

                          <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                            <MapPin size={15} />
                            {property.location}
                            {property.city &&
                              `, ${property.city}`}
                          </p>

                        </div>

                        <div className="sm:text-right">

                          <p className="text-xs text-gray-400">
                            Total
                          </p>

                          <p className="mt-1 text-xl font-bold text-gray-900">
                            ₹
                            {Number(
                              booking.totalPrice || 0
                            ).toLocaleString("en-IN")}
                          </p>

                        </div>

                      </div>

                      {/* BOOKING INFO */}

                      <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Check-in
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {formatDate(booking.checkIn)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Check-out
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {formatDate(booking.checkOut)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Guests
                          </p>

                          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-800">
                            <Users size={15} />
                            {booking.guests}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </main>
  );
}

export default MyBookings;