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
  Home,
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
        const response = await api.get(`/properties/${id}`);
        setProperty(response.data.property);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Property not found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="mt-8 h-[400px] rounded-3xl bg-gray-200" />
          <div className="mt-8 h-8 w-2/3 rounded bg-gray-200" />
          <div className="mt-4 h-5 w-1/3 rounded bg-gray-200" />
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Property not found
          </h1>

          <p className="mt-2 text-gray-500">
            This property may have been removed or doesn't exist.
          </p>

          <Link
            to="/explore"
            className="mt-6 inline-flex rounded-full bg-[#1F2937] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Explore
          </Link>
        </div>
      </main>
    );
  }

  const image =
    property.image ||
    property.images?.[0] ||
    "";

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* Top */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">

        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#E07A5F]"
        >
          <ArrowLeft size={18} />
          Back to Explore
        </Link>

        {/* Title */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">

              {property.category && (
                <span className="rounded-full bg-[#F4EFEA] px-3 py-1 text-xs font-semibold text-[#E07A5F]">
                  {property.category}
                </span>
              )}

              {property.rating && (
                <span className="flex items-center gap-1 text-sm font-medium">
                  <Star size={15} fill="currentColor" />
                  {property.rating}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {property.title}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-gray-500">
              <MapPin size={17} />
              <span>
                {property.location}, {property.city}, {property.country}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-gray-50"
          >
            <Heart size={18} />
            Save
          </button>

        </div>
      </section>

      {/* Image */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-3xl bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={property.title}
              className="h-[280px] w-full object-cover sm:h-[400px] lg:h-[520px]"
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* Left */}
          <div>

            {/* Host */}
            <div className="border-b border-gray-200 pb-7">

              <h2 className="text-2xl font-bold text-gray-900">
                {property.guests} guests · {property.bedrooms} bedrooms ·{" "}
                {property.beds} beds · {property.bathrooms} bathrooms
              </h2>

              <p className="mt-2 text-gray-500">
                Entire {property.category || "property"} hosted by{" "}
                <span className="font-medium text-gray-900">
                  {property.host?.name || "StayNest Host"}
                </span>
              </p>

            </div>

            {/* Description */}
            <div className="border-b border-gray-200 py-8">

              <h2 className="text-xl font-bold text-gray-900">
                About this place
              </h2>

              <p className="mt-4 max-w-3xl whitespace-pre-line leading-7 text-gray-600">
                {property.description}
              </p>

            </div>

            {/* Features */}
            <div className="border-b border-gray-200 py-8">

              <h2 className="text-xl font-bold text-gray-900">
                Property features
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <Feature
                  icon={<Users size={22} />}
                  title={`${property.guests} guests`}
                  text="Maximum guests"
                />

                <Feature
                  icon={<BedDouble size={22} />}
                  title={`${property.beds} beds`}
                  text={`${property.bedrooms} bedrooms`}
                />

                <Feature
                  icon={<Bath size={22} />}
                  title={`${property.bathrooms} bathrooms`}
                  text="Available"
                />

                <Feature
                  icon={<Home size={22} />}
                  title={property.category || "Property"}
                  text="Entire place"
                />

              </div>

            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="py-8">

                <h2 className="text-xl font-bold text-gray-900">
                  What this place offers
                </h2>

                <div className="mt-5 flex flex-wrap gap-3">

                  {property.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700"
                    >
                      {amenity}
                    </span>
                  ))}

                </div>

              </div>
            )}

          </div>

          {/* Booking Card */}
          <aside>

            <div className="sticky top-28 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">

              <div className="flex items-end justify-between">

                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{Number(property.price).toLocaleString("en-IN")}
                  </span>

                  <span className="ml-1 text-sm text-gray-500">
                    / night
                  </span>
                </div>

                {property.rating && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={15} fill="currentColor" />
                    <span className="font-semibold">
                      {property.rating}
                    </span>
                  </div>
                )}

              </div>

              <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200">

                <div className="border-r border-gray-200 p-3">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Check in
                  </p>
                  <p className="mt-1 text-sm text-gray-800">
                    Add date
                  </p>
                </div>

                <div className="p-3">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Check out
                  </p>
                  <p className="mt-1 text-sm text-gray-800">
                    Add date
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-xl bg-[#E07A5F] px-5 py-3.5 font-semibold text-white transition hover:bg-[#d9684d]"
              >
                Reserve
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                You won't be charged yet
              </p>

              <div className="mt-6 border-t border-gray-100 pt-5 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    ₹{Number(property.price).toLocaleString("en-IN")} × 1 night
                  </span>

                  <span>
                    ₹{Number(property.price).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 font-semibold">
                  <span>Total</span>

                  <span>
                    ₹{Number(property.price).toLocaleString("en-IN")}
                  </span>
                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4EFEA] text-[#E07A5F]">
        {icon}
      </div>

      <div>
        <p className="font-medium text-gray-900">
          {title}
        </p>

        <p className="text-sm text-gray-500">
          {text}
        </p>
      </div>

    </div>
  );
}

export default PropertyDetails;