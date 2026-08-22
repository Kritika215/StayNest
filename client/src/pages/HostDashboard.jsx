import { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Trash2,
  MapPin,
  IndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function HostDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState("");

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/properties/my");

      setProperties(response.data.properties || []);
    } catch (err) {
      console.error("Failed to fetch host properties:", err);

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
      setDeleteLoading(propertyId);

      await api.delete(`/properties/${propertyId}`);

      setProperties((current) =>
        current.filter(
          (property) => property._id !== propertyId
        )
      );
    } catch (err) {
      console.error("Delete property error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete property."
      );
    } finally {
      setDeleteLoading("");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-[#E07A5F]">
              Host dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Manage your properties
            </h1>

            <p className="mt-2 text-gray-500">
              Create and manage the stays you host on StayNest.
            </p>

          </div>

          <Link
            to="/create-property"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E07A5F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
          >
            <Plus size={17} />
            Add property
          </Link>

        </div>


        {/* STATS */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EFEA] text-[#E07A5F]">
                <Building2 size={19} />
              </div>

              <div>

                <p className="text-xs font-medium text-gray-400">
                  Total properties
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900">
                  {properties.length}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <p className="text-xs font-medium text-gray-400">
              Active listings
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {properties.length}
            </p>

          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <p className="text-xs font-medium text-gray-400">
              Average price
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              ₹
              {properties.length > 0
                ? Math.round(
                    properties.reduce(
                      (sum, property) =>
                        sum + Number(property.price || 0),
                      0
                    ) / properties.length
                  ).toLocaleString("en-IN")
                : "0"}
            </p>

          </div>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
            {error}
          </div>
        )}


        {/* LOADING */}

        {loading && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-3xl bg-white p-4"
              >
                <div className="h-52 rounded-2xl bg-gray-200" />

                <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />

                <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />

                <div className="mt-4 h-10 rounded-xl bg-gray-200" />
              </div>
            ))}

          </div>
        )}


        {/* EMPTY */}

        {!loading && !error && properties.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">

            <Building2
              size={42}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No properties yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Start hosting by adding your first property to StayNest.
            </p>

            <Link
              to="/create-property"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white"
            >
              <Plus size={17} />
              Create property
            </Link>

          </div>
        )}


        {/* PROPERTY LIST */}

        {!loading && !error && properties.length > 0 && (
          <div className="mt-10">

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-xl font-bold text-gray-900">
                Your listings
              </h2>

              <span className="text-sm text-gray-500">
                {properties.length}{" "}
                {properties.length === 1
                  ? "property"
                  : "properties"}
              </span>

            </div>


            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {properties.map((property) => {

                const propertyImage =
                  property.image ||
                  property.images?.[0] ||
                  "";

                return (
                  <article
                    key={property._id}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >

                    {/* IMAGE */}

                    <Link
                      to={`/property/${property._id}`}
                      className="block overflow-hidden"
                    >

                      {propertyImage ? (
                        <img
                          src={propertyImage}
                          alt={property.title}
                          className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-56 items-center justify-center bg-gray-100 text-sm text-gray-400">
                          No image
                        </div>
                      )}

                    </Link>


                    {/* CONTENT */}

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <Link
                            to={`/property/${property._id}`}
                            className="block truncate text-lg font-bold text-gray-900 hover:text-[#E07A5F]"
                          >
                            {property.title}
                          </Link>

                          <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-gray-500">
                            <MapPin
                              size={14}
                              className="shrink-0"
                            />

                            {property.location}
                          </p>

                        </div>

                        {property.category && (
                          <span className="shrink-0 rounded-full bg-[#F4EFEA] px-2.5 py-1 text-[10px] font-semibold text-[#E07A5F]">
                            {property.category}
                          </span>
                        )}

                      </div>


                      <div className="mt-4 flex items-center justify-between">

                        <div className="flex items-center gap-1">

                          <IndianRupee size={15} />

                          <span className="font-bold text-gray-900">
                            {Number(
                              property.price || 0
                            ).toLocaleString("en-IN")}
                          </span>

                          <span className="text-xs text-gray-400">
                            / night
                          </span>

                        </div>

                        <span className="text-xs text-gray-500">
                          {property.guests || 0} guests
                        </span>

                      </div>


                      {/* ACTIONS */}

                      <div className="mt-5 flex gap-2">

                        <Link
                          to={`/property/${property._id}`}
                          className="flex-1 rounded-xl border border-gray-200 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          View
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(property._id)
                          }
                          disabled={
                            deleteLoading === property._id
                          }
                          className="flex items-center justify-center rounded-xl border border-red-100 px-4 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>

          </div>
        )}

      </div>

    </main>
  );
}

export default HostDashboard;