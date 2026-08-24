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
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    price: "",
    guests: "",
    bedrooms: "",
    beds: "",
    bathrooms: "",
    category: "",
    image: "",
    amenities: "",
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/properties/${id}`
      );

      const property = response.data.property;

      setFormData({
        title: property.title || "",
        description: property.description || "",
        location: property.location || "",
        city: property.city || "",
        price: property.price || "",
        guests: property.guests || "",
        bedrooms: property.bedrooms || "",
        beds: property.beds || "",
        bathrooms: property.bathrooms || "",
        category: property.category || "",
        image:
          property.image ||
          property.images?.[0] ||
          "",
        amenities:
          property.amenities?.join(", ") || "",
      });
    } catch (err) {
      console.error(
        "Fetch property error:",
        err
      );

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        city: formData.city,
        price: Number(formData.price),
        guests: Number(formData.guests),
        bedrooms: Number(formData.bedrooms),
        beds: Number(formData.beds),
        bathrooms: Number(formData.bathrooms),
        category: formData.category,
        image: formData.image,
        amenities: formData.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await api.put(
        `/properties/${id}`,
        payload
      );

      setSuccess(
        "Property updated successfully!"
      );

      setTimeout(() => {
        navigate("/my-properties");
      }, 800);
    } catch (err) {
      console.error(
        "Update property error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to update property."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

          <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 h-[600px] animate-pulse rounded-3xl bg-gray-200" />

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* BACK */}

        <Link
          to="/my-properties"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Back to my properties
        </Link>

        {/* HEADER */}

        <div className="mt-7">

          <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
            Host dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Edit Property
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the details of your StayNest listing.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >

          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-2xl bg-green-50 p-4 text-sm font-medium text-green-700">
              {success}
            </div>
          )}

          {/* TITLE */}

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Property title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Beautiful mountain villa"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Describe your property..."
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
            />
          </div>

          {/* LOCATION */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Mall Road"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Manali"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
              />
            </div>

          </div>

          {/* PRICE + GUESTS */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Price per night
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
                placeholder="2500"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Maximum guests
              </label>

              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                required
                placeholder="4"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
              />
            </div>

          </div>

          {/* ROOMS */}

          <div className="mt-5 grid gap-5 sm:grid-cols-3">

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Bedrooms
              </label>

              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Beds
              </label>

              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                min="0"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Bathrooms
              </label>

              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
              />
            </div>

          </div>

          {/* CATEGORY */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
            >
              <option value="">
                Select category
              </option>

              <option value="Apartment">
                Apartment
              </option>

              <option value="Villa">
                Villa
              </option>

              <option value="House">
                House
              </option>

              <option value="Cabin">
                Cabin
              </option>

              <option value="Hotel">
                Hotel
              </option>

              <option value="Resort">
                Resort
              </option>

            </select>
          </div>

          {/* IMAGE */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-700">
              Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Property preview"
                className="mt-4 h-48 w-full rounded-2xl object-cover"
              />
            )}
          </div>

          {/* AMENITIES */}

          <div className="mt-5">
            <label className="text-sm font-semibold text-gray-700">
              Amenities
            </label>

            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="WiFi, Parking, Kitchen, Pool"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F]"
            />

            <p className="mt-2 text-xs text-gray-400">
              Separate amenities using commas.
            </p>
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={saving}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E07A5F] py-3.5 text-sm font-bold text-white transition hover:bg-[#D96D52] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />

            {saving
              ? "Saving changes..."
              : "Save changes"}
          </button>

        </form>

      </div>

    </main>
  );
}

export default EditProperty;