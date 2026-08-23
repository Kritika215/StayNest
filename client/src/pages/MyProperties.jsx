import { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  MapPin,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/properties/my-properties"
      );

      setProperties(response.data.properties || []);
    } catch (err) {
      console.error("Failed to fetch properties:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your properties."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/properties/${id}`);

      setProperties((prev) =>
        prev.filter(
          (property) => property._id !== id
        )
      );
    } catch (err) {
      console.error("Delete property error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to delete property."
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white"
              >
                <div className="h-56 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
              Host dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Properties
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Manage the properties you have listed on StayNest.
            </p>
          </div>

          <Link
            to="/create-property"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E07A5F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
          >
            <Plus size={17} />
            Add Property
          </Link>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5">

            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchMyProperties}
              className="mt-3 text-sm font-semibold text-red-700 underline"
            >
              Try again
            </button>

          </div>
        )}


        {/* EMPTY */}

        {!error && properties.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EFEA] text-[#E07A5F]">
              <Plus size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No properties yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              You haven't listed any properties yet.
              Create your first listing and start hosting.
            </p>

            <Link
              to="/create-property"
              className="mt-6 inline-flex rounded-xl bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
            >
              Create Property
            </Link>

          </div>
        )}


        {/* PROPERTY GRID */}

        {!error && properties.length > 0 && (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {properties.map((property) => {

              const propertyImage =
                property.image ||
                property.images?.[0] ||
                "";

              return (
                <article
                  key={property._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  {/* IMAGE */}

                  <div className="relative">

                    {propertyImage ? (
                      <img
                        src={propertyImage}
                        alt={
                          property.title ||
                          "Property"
                        }
                        className="h-56 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-56 items-center justify-center bg-gray-100 text-sm text-gray-400">
                        No image available
                      </div>
                    )}

                    {property.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                        {property.category}
                      </span>
                    )}

                  </div>


                  {/* CONTENT */}

                  <div className="p-5">

                    <h2 className="truncate text-lg font-bold text-gray-900">
                      {property.title ||
                        "Untitled property"}
                    </h2>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span className="truncate">
                        {property.location ||
                          property.city ||
                          "Location unavailable"}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">

                      <span className="flex items-center gap-1.5">
                        <Users size={14} />
                        {property.guests || 0} guests
                      </span>

                    </div>

                    <div className="mt-4">

                      <span className="text-lg font-bold text-gray-900">
                        ₹
                        {Number(
                          property.price || 0
                        ).toLocaleString("en-IN")}
                      </span>

                      <span className="ml-1 text-xs text-gray-500">
                        / night
                      </span>

                    </div>


                    {/* ACTIONS */}

                    <div className="mt-5 flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/edit-property/${property._id}`
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            property._id
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
                        aria-label="Delete property"
                      >
                        <Trash2 size={16} />
                      </button>

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

export default MyProperties;