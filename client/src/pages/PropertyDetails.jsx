import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Heart,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/properties/${id}`);
        setProperty(response.data.property);
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setError("Property not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8]">
        <div className="mx-auto max-w-7xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-5 w-24 rounded bg-gray-200" />

          <div className="mt-6 h-[280px] rounded-3xl bg-gray-200 sm:h-[420px] lg:h-[520px]" />

          <div className="mt-8 h-8 w-2/3 rounded bg-gray-200" />

          <div className="mt-4 h-5 w-1/3 rounded bg-gray-200" />

          <div className="mt-10 h-40 rounded-2xl bg-gray-200" />
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FAFAF8] px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Property not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This property may have been removed or the link is incorrect.
          </p>

          <button
            onClick={() => navigate("/explore")}
            className="mt-6 rounded-full bg-[#E07A5F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d96c50]"
          >
            Back to Explore
          </button>
        </div>
      </main>
    );
  }

  const propertyImages =
    property.images?.length > 0
      ? property.images
      : property.image
        ? [property.image]
        : [];

  const amenities = Array.isArray(property.amenities)
    ? property.amenities
    : [];

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* BACK */}
        <Link
          to="/explore"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Back to Explore
        </Link>


        {/* IMAGE GALLERY */}
        <section className="overflow-hidden rounded-3xl bg-gray-100">

          {propertyImages.length === 0 ? (
            <div className="flex h-[280px] items-center justify-center text-gray-400 sm:h-[420px]">
              No images available
            </div>
          ) : propertyImages.length === 1 ? (
            <img
              src={propertyImages[0]}
              alt={property.title}
              className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[520px]"
            />
          ) : (
            <div className="grid h-[420px] grid-cols-1 gap-2 sm:grid-cols-2 lg:h-[520px]">

              <img
                src={propertyImages[0]}
                alt={property.title}
                className="h-full w-full object-cover"
              />

              <div className="hidden grid-cols-2 gap-2 sm:grid">

                {propertyImages.slice(1, 5).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${property.title} ${index + 2}`}
                    className="h-full w-full object-cover"
                  />
                ))}

              </div>

            </div>
          )}

        </section>


        {/* MAIN CONTENT */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">

          {/* LEFT */}
          <div>

            {/* TITLE */}
            <div className="border-b border-gray-200 pb-7">

              <div className="flex flex-wrap items-start justify-between gap-4">

                <div className="min-w-0">

                  {property.category && (
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#E07A5F]">
                      {property.category}
                    </span>
                  )}

                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                    {property.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">

                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} />
                      {property.location}
                    </span>

                    {property.rating && (
                      <span className="flex items-center gap-1 font-medium text-gray-800">
                        <Star
                          size={15}
                          fill="currentColor"
                        />
                        {Number(property.rating).toFixed(1)}

                        {property.reviews !== undefined && (
                          <span className="font-normal text-gray-500">
                            ({property.reviews} reviews)
                          </span>
                        )}
                      </span>
                    )}

                  </div>

                </div>

                <button
                  type="button"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <Heart size={19} />
                </button>

              </div>

            </div>


            {/* HOST */}
            <div className="border-b border-gray-200 py-7">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4EFEA] text-lg font-bold text-[#E07A5F]">
                  {property.host?.name?.charAt(0)?.toUpperCase() || "H"}
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Hosted by
                  </p>

                  <p className="font-semibold text-gray-900">
                    {property.host?.name || "StayNest Host"}
                  </p>
                </div>

              </div>

            </div>


            {/* PROPERTY INFO */}
            <div className="border-b border-gray-200 py-7">

              <h2 className="text-xl font-bold text-gray-900">
                About this place
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                {property.description ||
                  "Enjoy a comfortable and memorable stay at this beautiful property."}
              </p>

            </div>


            {/* DETAILS */}
            <div className="border-b border-gray-200 py-7">

              <h2 className="text-xl font-bold text-gray-900">
                Property details
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

                <Detail
                  icon={<Users size={19} />}
                  label="Guests"
                  value={property.guests}
                />

                <Detail
                  icon={<BedDouble size={19} />}
                  label="Bedrooms"
                  value={property.bedrooms}
                />

                <Detail
                  icon={<BedDouble size={19} />}
                  label="Beds"
                  value={property.beds}
                />

                <Detail
                  icon={<Bath size={19} />}
                  label="Bathrooms"
                  value={property.bathrooms}
                />

              </div>

            </div>


            {/* AMENITIES */}
            {amenities.length > 0 && (
              <div className="py-7">

                <h2 className="text-xl font-bold text-gray-900">
                  What this place offers
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EFEA] text-[#E07A5F]">
                        <Check size={15} />
                      </span>

                      {amenity}
                    </div>
                  ))}

                </div>

              </div>
            )}

          </div>


          {/* BOOKING CARD */}
          <aside className="lg:sticky lg:top-28 lg:self-start">

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-baseline gap-1">

                <span className="text-2xl font-bold text-gray-900">
                  ₹{Number(property.price || 0).toLocaleString("en-IN")}
                </span>

                <span className="text-sm text-gray-500">
                  / night
                </span>

              </div>

              {property.rating && (
                <div className="mt-2 flex items-center gap-1 text-sm">

                  <Star
                    size={14}
                    fill="currentColor"
                  />

                  <span className="font-medium">
                    {Number(property.rating).toFixed(1)}
                  </span>

                  <span className="text-gray-500">
                    · {property.reviews || 0} reviews
                  </span>

                </div>
              )}

              <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200">

                <div className="border-r border-gray-200 p-3">

                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <CalendarDays size={14} />
                    Check in
                  </div>

                  <p className="mt-1 text-sm text-gray-400">
                    Add date
                  </p>

                </div>

                <div className="p-3">

                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <CalendarDays size={14} />
                    Check out
                  </div>

                  <p className="mt-1 text-sm text-gray-400">
                    Add date
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-[#E07A5F] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d96c50]"
              >
                Reserve
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                You won't be charged yet
              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">

      <div className="text-[#E07A5F]">
        {icon}
      </div>

      <p className="mt-3 text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900">
        {value || "—"}
      </p>

    </div>
  );
}

export default PropertyDetails;