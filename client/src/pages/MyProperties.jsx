import { useEffect, useState } from "react";
import {
  Edit,
  MapPin,
  Plus,
  Trash2,
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

      setProperties(
        response.data.properties || []
      );
    } catch (err) {
      console.error(
        "Failed to fetch properties:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load your properties."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/properties/${propertyId}`
      );

      setProperties((prev) =>
        prev.filter(
          (property) =>
            property._id !== propertyId
        )
      );
    } catch (err) {
      console.error(
        "Delete property error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Unable to delete property."
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {[1, 2, 3, 4].map((item) => (
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

        {/* HEADER */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
              Host dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              My Properties
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage the stays you have listed on StayNest.
            </p>
          </div>

          <Link
            to="/create-property"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E07A5F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
          >
            <Plus size={17} />
            Add property
          </Link>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!error && properties.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EFEA] text-[#E07A5F]">
              <Plus size={25} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No properties yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start hosting by adding your first property.
            </p>

            <Link
              to="/create-property"
              className="mt-6 inline-flex rounded-xl bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white"
            >
              Create property
            </Link>

          </div>
        )}

        {/* PROPERTIES */}

        {!error && properties.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">

            {properties.map((property) => {

              const image =
                property.image ||
                property.images?.[0] ||
                "";

              return (
                <article
                  key={property._id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                >

                  {/* IMAGE */}

                  {image ? (
                    <img
                      src={image}
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

                  {/* CONTENT */}

                  <div className="p-5">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h2 className="truncate text-lg font-bold text-gray-900">
                          {property.title ||
                            "Untitled property"}
                        </h2>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                          <MapPin size={14} />

                          {property.location ||
                            property.city ||
                            "Location not specified"}
                        </p>

                      </div>

                      {property.category && (
                        <span className="shrink-0 rounded-full bg-[#F4EFEA] px-3 py-1 text-xs font-semibold text-[#E07A5F]">
                          {property.category}
                        </span>
                      )}

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      <div>
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

                      <span className="text-xs text-gray-500">
                        {property.guests || 0} guests
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
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
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