import { useEffect, useState } from "react";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    country: "",
    price: "",
    category: "",
    guests: "",
    bedrooms: "",
    beds: "",
    bathrooms: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/properties/${id}`);

        const property = response.data.property;

        setForm({
          title: property.title || "",
          description: property.description || "",
          location: property.location || "",
          city: property.city || "",
          country: property.country || "",
          price: property.price || "",
          category: property.category || "",
          guests: property.guests || "",
          bedrooms: property.bedrooms || "",
          beds: property.beds || "",
          bathrooms: property.bathrooms || "",
          image:
            property.image ||
            property.images?.[0] ||
            "",
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

    fetchProperty();
  }, [id]);

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

      await api.put(`/properties/${id}`, {
        ...form,
        price: Number(form.price),
        guests: Number(form.guests),
        bedrooms: Number(form.bedrooms),
        beds: Number(form.beds),
        bathrooms: Number(form.bathrooms),
      });

      navigate(`/property/${id}`);
    } catch (err) {
      console.error("Update property error:", err);

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
      <main className="min-h-screen bg-[#FAFAF8] px-4 py-12">
        <div className="mx-auto max-w-3xl animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-8 h-[500px] rounded-3xl bg-gray-200" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        <Link
          to="/host-dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <div className="mt-6">

          <p className="text-sm font-semibold uppercase tracking-widest text-[#E07A5F]">
            Manage listing
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Edit property
          </h1>

          <p className="mt-2 text-gray-500">
            Update your property information.
          </p>

        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* BASIC INFO */}

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Basic information
            </h2>

            <div className="mt-5 space-y-4">

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Property title"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your property"
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

            </div>
          </div>

          {/* LOCATION */}

          <div className="border-t border-gray-100 pt-6">

            <h2 className="text-lg font-bold text-gray-900">
              Location
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

            </div>

          </div>

          {/* PROPERTY DETAILS */}

          <div className="border-t border-gray-100 pt-6">

            <h2 className="text-lg font-bold text-gray-900">
              Property details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="Price per night"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              >
                <option value="">Select category</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Cabin">Cabin</option>
                <option value="Hotel">Hotel</option>
                <option value="Resort">Resort</option>
              </select>

              <input
                name="guests"
                type="number"
                min="1"
                value={form.guests}
                onChange={handleChange}
                placeholder="Guests"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

              <input
                name="bedrooms"
                type="number"
                min="0"
                value={form.bedrooms}
                onChange={handleChange}
                placeholder="Bedrooms"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

              <input
                name="beds"
                type="number"
                min="0"
                value={form.beds}
                onChange={handleChange}
                placeholder="Beds"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

              <input
                name="bathrooms"
                type="number"
                min="0"
                value={form.bathrooms}
                onChange={handleChange}
                placeholder="Bathrooms"
                required
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              />

            </div>

          </div>

          {/* IMAGE */}

          <div className="border-t border-gray-100 pt-6">

            <div className="flex items-center gap-2">
              <ImagePlus size={19} />
              <h2 className="text-lg font-bold text-gray-900">
                Property image
              </h2>
            </div>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="mt-5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
            />

            {form.image && (
              <img
                src={form.image}
                alt="Property preview"
                className="mt-4 h-56 w-full rounded-2xl object-cover"
              />
            )}

          </div>

          {/* SUBMIT */}

          <div className="border-t border-gray-100 pt-6">

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E07A5F] py-3.5 text-sm font-bold text-white transition hover:bg-[#D96D52] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />

              {saving
                ? "Saving changes..."
                : "Save changes"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default EditProperty;