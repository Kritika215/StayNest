import { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await api.get("/properties/my-properties");

      setProperties(response.data.properties || []);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "Unable to load your properties."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/properties/${id}`);

      setProperties((prev) =>
        prev.filter((property) => property._id !== id)
      );

      setMessage("Property deleted successfully.");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to delete property."
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-gray-200"
              />
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
              Host dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              My Properties
            </h1>

            <p className="mt-2 text-gray-500">
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


        {/* MESSAGE */}

        {message && (
          <div className="mt-6 rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm">
            {message}
          </div>
        )}


        {/* EMPTY */}

        {properties.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-12 text-center">

            <h2 className="text-xl font-semibold text-gray-900">
              No properties yet
            </h2>

            <p className="mt-2 text-gray-500">
              Start hosting your first property.
            </p>

            <Link
              to="/create-property"
              className="mt-6 inline-flex rounded-xl bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white"
            >
              Create Property
            </Link>

          </div>
        ) : (

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {properties.map((property) => {

              const image =
                property.image ||
                property.images?.[0] ||
                "";

              return (
                <article
                  key={property._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >

                  {image ? (
                    <img
                      src={image}
                      alt={property.title}
                      className="h-52 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-gray-100 text-sm text-gray-400">
                      No image
                    </div>
                  )}

                  <div className="p-5">

                    <h2 className="truncate text-lg font-semibold text-gray-900">
                      {property.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {property.location}
                    </p>

                    <p className="mt-3 font-semibold text-gray-900">
                      ₹{Number(property.price || 0).toLocaleString("en-IN")}
                      <span className="ml-1 text-xs font-normal text-gray-500">
                        / night
                      </span>
                    </p>


                    <div className="mt-5 flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/edit-property/${property._id}`
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(property._id)
                        }
                        className="flex items-center justify-center rounded-xl border border-red-100 px-4 py-2.5 text-red-500 transition hover:bg-red-50"
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