import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateProperty() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    country: "India",
    price: "",
    rating: "",
    reviews: "",
    image: "",
    category: "",
    guests: "",
    bedrooms: "",
    beds: "",
    bathrooms: "",
    amenities: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating) || 0,
        reviews: Number(form.reviews) || 0,
        guests: Number(form.guests),
        bedrooms: Number(form.bedrooms),
        beds: Number(form.beds),
        bathrooms: Number(form.bathrooms),
        amenities: form.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await api.post("/properties", data);

      navigate("/explore");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to create property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4EFEA] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
            Become a host
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            List your property
          </h1>

          <p className="mt-2 text-gray-500">
            Add your property details and start welcoming guests.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl bg-white p-6 shadow-lg sm:p-8"
        >

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">

            <Input
              label="Property title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Luxury Villa"
            />

            <Input
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Villa"
            />

            <Input
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Candolim Beach"
            />

            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Goa"
            />

            <Input
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
            />

            <Input
              label="Price per night"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="4500"
            />

            <Input
              label="Guests"
              name="guests"
              type="number"
              value={form.guests}
              onChange={handleChange}
            />

            <Input
              label="Bedrooms"
              name="bedrooms"
              type="number"
              value={form.bedrooms}
              onChange={handleChange}
            />

            <Input
              label="Beds"
              name="beds"
              type="number"
              value={form.beds}
              onChange={handleChange}
            />

            <Input
              label="Bathrooms"
              name="bathrooms"
              type="number"
              value={form.bathrooms}
              onChange={handleChange}
            />

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Image URL
            </label>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your property..."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amenities
            </label>

            <input
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              placeholder="WiFi, Pool, Kitchen, Garden"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#E07A5F] px-5 py-3.5 font-semibold text-white transition hover:bg-[#d9684d] disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create property"}
          </button>

        </form>
      </div>
    </main>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={["title", "city", "price", "guests"].includes(name)}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
      />
    </div>
  );
}

export default CreateProperty;