import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Star,
  Users,
  BedDouble,
  Bath,
  Wifi,
  Check,
} from "lucide-react";
import api from "../api/axios";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/properties/${id}`);

        console.log("PROPERTY DETAILS:", response.data);

        setProperty(response.data.property);
      } catch (err) {
        console.error("Property details error:", err);

        setError(
          err.response?.data?.message || "Unable to load property."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-[450px] rounded-3xl bg-gray-200" />

          <div className="mt-8 h-8 w-2/3 rounded bg-gray-200" />

          <div className="mt-4 h-5 w-1/3 rounded bg-gray-200" />
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl">🏡</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Property not found
          </h1>

          <p className="mt-2 text-gray-500">
            {error || "This property may no longer be available."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-[#E07A5F] px-6 py-3 font-medium text-white transition hover:bg-[#cf6b51]"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const propertyImage =
    property.image ||
    (property.images?.length > 0 ? property.images[0] : "");

  return (
    <main className="bg-white">

      {/* Back */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to stays
        </Link>
      </div>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">

        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-100">

          {propertyImage ? (
            <img
              src={propertyImage}
              alt={property.title}
              className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[520px]"
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center text-gray-400 sm:h-[400px] lg:h-[520px]">
              No image available
            </div>
          )}

          <button
            type="button"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
          >
            <Heart size={20} />
          </button>

        </div>

        {/* Details */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* Left */}
          <div>

            {/* Category */}
            {property.category && (
              <span className="inline-flex rounded-full bg-[#F4EFEA] px-4 py-2 text-sm font-semibold text-[#E07A5F]">
                {property.category}
              </span>
            )}

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {property.title}
            </h1>

            {/* Location + Rating */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">

              <div className="flex items-center gap-1.5">
                <MapPin size={17} />
                <span>
                  {property.location}, {property.city}, {property.country}
                </span>
              </div>

              {property.rating && (
                <div className="flex items-center gap-1">
                  <Star
                    size={16}
                    fill="currentColor"
                  />
                  <span className="font-semibold text-gray-900">
                    {property.rating}
                  </span>

                  {property.reviews && (
                    <span>
                      ({property.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

            </div>

            <div className="my-8 border-t border-gray-200" />

            {/* Property stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

              <div className="rounded-2xl bg-gray-50 p-5">
                <Users size={20} />
                <p className="mt-3 text-sm text-gray-500">
                  Guests
                </p>
                <p className="font-semibold">
                  {property.guests}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <BedDouble size={20} />
                <p className="mt-3 text-sm text-gray-500">
                  Bedrooms
                </p>
                <p className="font-semibold">
                  {property.bedrooms}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <BedDouble size={20} />
                <p className="mt-3 text-sm text-gray-500">
                  Beds
                </p>
                <p className="font-semibold">
                  {property.beds}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <Bath size={20} />
                <p className="mt-3 text-sm text-gray-500">
                  Bathrooms
                </p>
                <p className="font-semibold">
                  {property.bathrooms}
                </p>
              </div>

            </div>

            {/* Description */}
            <div className="mt-10">

              <h2 className="text-2xl font-bold text-gray-900">
                About this place
              </h2>

              <p className="mt-4 max-w-3xl whitespace-pre-line leading-7 text-gray-600">
                {property.description}
              </p>

            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-900">
                  What this place offers
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EFEA]">
                        <Check size={16} />
                      </div>

                      {amenity}
                    </div>
                  ))}

                </div>

              </div>
            )}

          </div>

          {/* Booking Card */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">

              <div className="flex items-end justify-between">

                <div>
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{Number(property.price).toLocaleString("en-IN")}
                  </span>

                  <span className="ml-1 text-gray-500">
                    / night
                  </span>
                </div>

                {property.rating && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={15} fill="currentColor" />
                    {property.rating}
                  </div>
                )}

              </div>

              <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200">

                <div className="border-r border-gray-200 p-4">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Check in
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    Add date
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Check out
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    Add date
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-xl bg-[#E07A5F] py-4 font-semibold text-white transition hover:bg-[#cf6b51]"
              >
                Reserve
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                You won't be charged yet
              </p>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default PropertyDetails;