import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    price: "",
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    category: "",
    image: "",
    amenities: "",
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${id}`);
      const property = response.data.property;

      setForm({
        title: property.title || "",
        description: property.description || "",
        location: property.location || "",
        city: property.city || "",
        price: property.price || "",
        guests: property.guests || 1,
        bedrooms: property.bedrooms || 1,
        beds: property.beds || 1,
        bathrooms: property.bathrooms || 1,
        category: property.category || "",
        image:
          property.image ||
          property.images?.[0] ||
          "",
        amenities:
          property.amenities?.join(", ") || "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load property."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await api.put(`/properties/${id}`, {
        title: form.title,
        description: form.description,
        location: form.location,
        city: form.city,
        price: Number(form.price),
        guests: Number(form.guests),
        bedrooms: Number(form.bedrooms),
        beds: Number(form.beds),
        bathrooms: Number(form.bathrooms),
        category: form.category,
        image: form.image,
        amenities: form.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      setMessage("Property updated successfully.");

      setTimeout(() => {
        navigate("/my-properties");
      }, 800);
    } catch (err) {
      console.error("Update error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update property."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
          <div className="mt-8 h-[600px] animate-pulse rounded-3xl bg-gray-200" />
        </div>
      </main>
    );
  }

  if (error && !form.title) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            Unable to load property
          </h1>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <Link
            to="/my-properties"
            className="mt-5 inline-flex rounded-xl bg-[#E07A5F] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to My Properties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* HEADER */}

        <Link
          to="/my-properties"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Back to My Properties
        </Link>

        <div className="mt-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
            Host dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Edit Property
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update your property information.
          </p>
        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* TITLE */}

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Property title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
            />
          </div>


          {/* DESCRIPTION */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
            />
          </div>


          {/* LOCATION */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                City
              </label>

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />
            </div>

          </div>


          {/* PRICE / CATEGORY */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Price per night
              </label>

              <input
                type="number"
                name="price"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              >
                <option value="">Select category</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Hotel">Hotel</option>
                <option value="Cabin">Cabin</option>
                <option value="Cottage">Cottage</option>
              </select>
            </div>

          </div>


          {/* GUEST DETAILS */}

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Guests
              </label>

              <input
                type="number"
                name="guests"
                min="1"
                value={form.guests}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Bedrooms
              </label>

              <input
                type="number"
                name="bedrooms"
                min="1"
                value={form.bedrooms}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Beds
              </label>

              <input
                type="number"
                name="beds"
                min="1"
                value={form.beds}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Bathrooms
              </label>

              <input
                type="number"
                name="bathrooms"
                min="1"
                value={form.bathrooms}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />
            </div>

          </div>


          {/* IMAGE */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-700">
              Image URL
            </label>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
            />
          </div>


          {/* AMENITIES */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-700">
              Amenities
            </label>

            <input
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              placeholder="WiFi, Parking, Kitchen, Pool"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
            />

            <p className="mt-1 text-xs text-gray-400">
              Separate amenities with commas.
            </p>
          </div>


          {/* ERROR */}

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}


          {/* SUCCESS */}

          {message && (
            <div className="mt-5 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
              {message}
            </div>
          )}


          {/* BUTTON */}

          <button
            type="submit"
            disabled={saving}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E07A5F] py-3.5 text-sm font-bold text-white transition hover:bg-[#D96D52] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

            {saving
              ? "Saving changes..."
              : "Save Changes"}
          </button>

        </form>

      </div>

    </main>
  );
}

export default EditProperty;