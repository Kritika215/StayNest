import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Share2,
  Star,
  Users,
  Wifi,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [liked, setLiked] = useState(false);

  // Booking states
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingGuests, setBookingGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  // ============================
  // FETCH PROPERTY
  // ============================

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/properties/${id}`);

        setProperty(response.data.property);
      } catch (err) {
        console.error("Failed to fetch property:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load this property."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // ============================
  // BOOK PROPERTY
  // ============================

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setBookingMessage(
        "Please select check-in and check-out dates."
      );
      return;
    }

    if (checkOut <= checkIn) {
      setBookingMessage(
        "Check-out must be after check-in."
      );
      return;
    }

    try {
      setBookingLoading(true);
      setBookingMessage("");

      const response = await api.post("/bookings", {
        propertyId: property._id,
        checkIn,
        checkOut,
        guests: Number(bookingGuests),
      });

      setBookingMessage(
        response.data.message ||
          "Booking successful!"
      );

      setCheckIn("");
      setCheckOut("");
      setBookingGuests(1);
    } catch (err) {
      console.error("Booking error:", err);

      setBookingMessage(
        err.response?.data?.message ||
          "Booking failed. Please login and try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse">

            <div className="h-6 w-32 rounded bg-gray-200" />

            <div className="mt-8 h-[300px] rounded-3xl bg-gray-200 sm:h-[430px] lg:h-[560px]" />

            <div className="mt-8 h-8 w-2/3 rounded bg-gray-200" />

            <div className="mt-4 h-5 w-1/3 rounded bg-gray-200" />

          </div>
        </div>
      </main>
    );
  }

  // ============================
  // ERROR
  // ============================

  if (error || !property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-4">

        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-gray-900">
            Property not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error ||
              "This property may have been removed."}
          </p>

          <Link
            to="/explore"
            className="mt-6 inline-flex rounded-full bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
          >
            Explore stays
          </Link>

        </div>

      </main>
    );
  }

  const propertyImage =
    property.image ||
    property.images?.[0] ||
    "";

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* ============================
          TOP BAR
      ============================ */}

      <section className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft size={17} />
            Back to explore
          </Link>

          <div className="flex gap-2">

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50"
              aria-label="Share property"
            >
              <Share2 size={17} />
            </button>

            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white transition ${
                liked
                  ? "border-red-200 text-red-500"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Wishlist"
            >
              <Heart
                size={18}
                fill={
                  liked
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

          </div>

        </div>

        {/* ============================
            TITLE
        ============================ */}

        <div className="mt-7">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              {property.category && (
                <span className="text-sm font-semibold uppercase tracking-widest text-[#E07A5F]">
                  {property.category}
                </span>
              )}

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {property.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">

                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />

                  {property.location}

                  {property.city &&
                    `, ${property.city}`}
                </span>

                {property.rating !== undefined &&
                  property.rating !== null && (
                    <span className="flex items-center gap-1 font-medium text-gray-800">

                      <Star
                        size={15}
                        fill="currentColor"
                      />

                      {Number(
                        property.rating
                      ).toFixed(1)}

                    </span>
                  )}

                {property.reviews !== undefined &&
                  property.reviews !== null && (
                    <span>
                      {property.reviews} reviews
                    </span>
                  )}

              </div>

            </div>

          </div>

        </div>

        {/* ============================
            PROPERTY IMAGE
        ============================ */}

        <div className="mt-8 overflow-hidden rounded-3xl bg-gray-100">

          {propertyImage ? (
            <img
              src={propertyImage}
              alt={property.title}
              className="h-[280px] w-full object-cover sm:h-[430px] lg:h-[560px]"
            />
          ) : (
            <div className="flex h-[280px] items-center justify-center text-gray-400 sm:h-[430px] lg:h-[560px]">
              No image available
            </div>
          )}

        </div>

      </section>

      {/* ============================
          MAIN CONTENT
      ============================ */}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* ============================
              LEFT CONTENT
          ============================ */}

          <div>

            {/* HOST */}

            <div className="flex items-center justify-between border-b border-gray-200 pb-7">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  {property.category ||
                    "Stay"}{" "}
                  hosted on StayNest
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {property.guests || 0} guests ·{" "}
                  {property.bedrooms || 0} bedrooms ·{" "}
                  {property.beds || 0} beds ·{" "}
                  {property.bathrooms || 0} bathrooms
                </p>

              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F4EFEA] text-lg font-bold text-[#E07A5F]">

                {property.host?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "H"}

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="border-b border-gray-200 py-8">

              <h2 className="text-xl font-bold text-gray-900">
                About this place
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                {property.description ||
                  "A beautiful place to stay and enjoy your trip."}
              </p>

            </div>

            {/* DETAILS */}

            <div className="border-b border-gray-200 py-8">

              <h2 className="text-xl font-bold text-gray-900">
                What this place offers
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Users size={19} />
                  {property.guests || 0} guests
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <BedDouble size={19} />
                  {property.beds || 0} beds
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <BedDouble size={19} />
                  {property.bedrooms || 0} bedrooms
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Bath size={19} />
                  {property.bathrooms || 0} bathrooms
                </div>

              </div>

            </div>

            {/* AMENITIES */}

            {property.amenities?.length > 0 && (
              <div className="py-8">

                <h2 className="text-xl font-bold text-gray-900">
                  Amenities
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  {property.amenities.map(
                    (amenity, index) => (
                      <div
                        key={`${amenity}-${index}`}
                        className="flex items-center gap-3 rounded-xl bg-white p-4 text-sm text-gray-700"
                      >

                        <Wifi
                          size={17}
                          className="text-gray-500"
                        />

                        {amenity}

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          </div>

          {/* ============================
              BOOKING CARD
          ============================ */}

          <aside>

            <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-200/40">

              {/* PRICE */}

              <div className="flex items-baseline justify-between">

                <div>

                  <span className="text-2xl font-bold text-gray-900">
                    ₹
                    {Number(
                      property.price || 0
                    ).toLocaleString("en-IN")}
                  </span>

                  <span className="ml-1 text-sm text-gray-500">
                    / night
                  </span>

                </div>

                {property.rating !== undefined &&
                  property.rating !== null && (
                    <div className="flex items-center gap-1 text-sm font-medium">

                      <Star
                        size={14}
                        fill="currentColor"
                      />

                      {Number(
                        property.rating
                      ).toFixed(1)}

                    </div>
                  )}

              </div>

              {/* LOCATION / GUESTS */}

              <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200">

                <div className="border-r border-gray-200 p-4">

                  <p className="text-[11px] font-semibold uppercase text-gray-400">
                    Location
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-gray-800">
                    {property.city ||
                      property.location ||
                      "Not specified"}
                  </p>

                </div>

                <div className="p-4">

                  <p className="text-[11px] font-semibold uppercase text-gray-400">
                    Max guests
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {property.guests || 1}
                  </p>

                </div>

              </div>

              {/* DATES */}

              <div className="mt-4 grid grid-cols-2 gap-2">

                <div>

                  <label className="text-xs font-semibold text-gray-600">
                    Check-in
                  </label>

                  <input
                    type="date"
                    value={checkIn}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setCheckIn(e.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E07A5F]"
                  />

                </div>

                <div>

                  <label className="text-xs font-semibold text-gray-600">
                    Check-out
                  </label>

                  <input
                    type="date"
                    value={checkOut}
                    min={
                      checkIn ||
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setCheckOut(e.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E07A5F]"
                  />

                </div>

              </div>

              {/* GUESTS */}

              <div className="mt-3">

                <label className="text-xs font-semibold text-gray-600">
                  Guests
                </label>

                <select
                  value={bookingGuests}
                  onChange={(e) =>
                    setBookingGuests(
                      Number(e.target.value)
                    )
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E07A5F]"
                >

                  {Array.from(
                    {
                      length:
                        property.guests || 1,
                    },
                    (_, index) =>
                      index + 1
                  ).map((number) => (
                    <option
                      key={number}
                      value={number}
                    >
                      {number}{" "}
                      {number === 1
                        ? "guest"
                        : "guests"}
                    </option>
                  ))}

                </select>

              </div>

              {/* RESERVE BUTTON */}

              <button
                type="button"
                disabled={
                  bookingLoading ||
                  !checkIn ||
                  !checkOut
                }
                onClick={handleBooking}
                className="mt-5 w-full rounded-2xl bg-[#E07A5F] py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#D96D52] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >

                {bookingLoading
                  ? "Booking..."
                  : "Reserve"}

              </button>

              {/* BOOKING MESSAGE */}

              {bookingMessage && (
                <div
                  className={`mt-3 rounded-xl p-3 text-center text-sm font-medium ${
                    bookingMessage
                      .toLowerCase()
                      .includes("success")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {bookingMessage}
                </div>
              )}

              <p className="mt-3 text-center text-xs text-gray-400">
                You won't be charged until your booking is confirmed.
              </p>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default PropertyDetails;