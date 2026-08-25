import { useEffect, useState } from "react";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Home,
  Users,
  BedDouble,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function MyProperties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/properties/my-properties");

      setProperties(response.data.properties || []);
    } catch (err) {
      console.error("Failed to fetch my properties:", err);

      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }

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
      setDeletingId(propertyId);

      await api.delete(`/properties/${propertyId}`);

      setProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
    } catch (err) {
      console.error("Delete property error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete property."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-10 w-72 animate-pulse rounded bg-gray-200" />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl bg-white"
              >
                <div className="h-56 animate-pulse bg-gray-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-10 animate-pulse rounded bg-gray-200" />
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
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E07A5F]">
              Host dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Properties
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage the places you have listed on StayNest.
            </p>
          </div>

          <Link
            to="/create-property"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E07A5F] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#D96D52] hover:shadow-md"
          >
            <Plus size={18} />
            Add property
          </Link>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* EMPTY STATE */}
        {!error && properties.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4EFEA] text-[#E07A5F]">
              <Home size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No properties listed
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Start hosting by adding your first property to StayNest.
            </p>

            <Link
              to="/create-property"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
            >
              <Plus size={17} />
              Create property
            </Link>
          </div>
        )}

        {/* PROPERTY GRID */}
        {!error && properties.length > 0 && (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {properties.map((property) => {
              const image =
                property.image ||
                property.images?.[0] ||
                "";

              return (
                <article
                  key={property._id}
                  className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* IMAGE */}
                  <Link to={`/properties/${property._id}`}>
                    <div className="relative h-56 overflow-hidden bg-gray-100">

                      {image ? (
                        <img
                          src={image}
                          alt={property.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          No image available
                        </div>
                      )}

                      {property.category && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
                          {property.category}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* CONTENT */}
                  <div className="p-5">

                    <Link to={`/properties/${property._id}`}>
                      <h2 className="truncate text-lg font-bold text-gray-900 transition hover:text-[#E07A5F]">
                        {property.title || "Untitled property"}
                      </h2>
                    </Link>

                    <p className="mt-2 flex items-center gap-1.5 truncate text-sm text-gray-500">
                      <MapPin size={15} />
                      {property.location ||
                        property.city ||
                        "Location not specified"}
                    </p>

                    {/* DETAILS */}
                    <div className="mt-5 flex flex-wrap gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">

                      <span className="flex items-center gap-1.5">
                        <Users size={14} />
                        {property.guests || 0} guests
                      </span>

                      <span className="flex items-center gap-1.5">
                        <BedDouble size={14} />
                        {property.beds || 0} beds
                      </span>

                      <span>
                        {property.bathrooms || 0} baths
                      </span>

                    </div>

                    {/* PRICE + ACTIONS */}
                    <div className="mt-5 flex items-center justify-between">

                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ₹
                          {Number(
                            property.price || 0
                          ).toLocaleString("en-IN")}
                        </span>

                        <span className="ml-1 text-xs text-gray-400">
                          / night
                        </span>
                      </div>

                      <div className="flex items-center gap-2">

                        <Link
                          to={`/edit-property/${property._id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-[#E07A5F] hover:bg-[#F4EFEA] hover:text-[#E07A5F]"
                          title="Edit property"
                        >
                          <Pencil size={15} />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(property._id)
                          }
                          disabled={
                            deletingId === property._id
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete property"
                        >
                          <Trash2 size={15} />
                        </button>

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

export default MyProperties;