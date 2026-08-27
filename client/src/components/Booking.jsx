import { useState } from "react";
import {
  CalendarDays,
  Users,
  IndianRupee,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Booking({ property }) {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const calculateNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference = end - start;

    if (difference <= 0) {
      return 0;
    }

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const nights = calculateNights();

  const pricePerNight = Number(property?.price || 0);

  const totalPrice = nights * pricePerNight;

 const handleBooking = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  if (!checkIn || !checkOut) {
    setError("Please select check-in and check-out dates.");
    return;
  }

  if (nights <= 0) {
    setError("Check-out date must be after check-in date.");
    return;
  }

  if (guests < 1) {
    setError("At least 1 guest is required.");
    return;
  }

  if (
    property?.guests &&
    guests > Number(property.guests)
  ) {
    setError(
      `Maximum ${property.guests} guests allowed.`
    );
    return;
  }

  try {
    setLoading(true);

    const response = await api.post(
      "/bookings",
      {
        property: property._id,
        checkIn,
        checkOut,
        guests,
        totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSuccess(
      response.data.message ||
        "Booking created successfully!"
    );

    setCheckIn("");
    setCheckOut("");
    setGuests(1);

    setTimeout(() => {
      navigate("/my-bookings");
    }, 1200);

  } catch (error) {
    console.error("Booking error:", error);

    setError(
      error.response?.data?.message ||
        "Unable to create booking. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-lg sm:p-6">

      {/* PRICE */}

      <div className="mb-6 flex items-baseline gap-1">

        <span className="text-2xl font-bold text-gray-900">
          ₹{pricePerNight.toLocaleString("en-IN")}
        </span>

        <span className="text-sm text-gray-500">
          / night
        </span>

      </div>


      <form
        onSubmit={handleBooking}
        className="space-y-4"
      >

        {/* DATES */}

        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-300 sm:grid-cols-2">

          {/* CHECK IN */}

          <div className="border-b border-gray-300 p-4 sm:border-b-0 sm:border-r">

            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-700">
              <CalendarDays size={15} />
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
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            />

          </div>


          {/* CHECK OUT */}

          <div className="p-4">

            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-700">
              <CalendarDays size={15} />
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
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
            />

          </div>

        </div>


        {/* GUESTS */}

        <div className="rounded-2xl border border-gray-300 p-4">

          <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-700">
            <Users size={15} />
            Guests
          </label>

          <select
            value={guests}
            onChange={(e) =>
              setGuests(Number(e.target.value))
            }
            className="w-full bg-transparent text-sm text-gray-700 outline-none"
          >

            {Array.from(
              {
                length: Math.min(
                  Number(property?.guests || 10),
                  10
                ),
              },
              (_, index) => index + 1
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


        {/* ERROR */}

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}


        {/* SUCCESS */}

        {success && (
          <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
            {success}
          </div>
        )}


        {/* PRICE SUMMARY */}

        {nights > 0 && (
          <div className="space-y-3 border-t border-gray-100 pt-5">

            <div className="flex justify-between text-sm text-gray-600">

              <span>
                ₹{pricePerNight.toLocaleString("en-IN")} ×{" "}
                {nights}{" "}
                {nights === 1
                  ? "night"
                  : "nights"}
              </span>

              <span>
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>

            </div>


            <div className="flex items-center justify-between border-t border-gray-100 pt-3">

              <span className="font-semibold text-gray-900">
                Total
              </span>

              <span className="flex items-center font-bold text-gray-900">

                <IndianRupee size={16} />

                {totalPrice.toLocaleString("en-IN")}

              </span>

            </div>

          </div>
        )}


        {/* BOOK BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E07A5F] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#d96c50] disabled:cursor-not-allowed disabled:opacity-60"
        >

          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Booking...
            </>
          ) : (
            "Reserve your stay"
          )}

        </button>


        <p className="text-center text-xs text-gray-400">
          You won't be charged until your booking is confirmed.
        </p>

      </form>

    </div>
  );
}

export default Booking;