import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    country: "",
    price: "",
    rating: "",
    reviews: "",
    guests: "",
    bedrooms: "",
    beds: "",
    bathrooms: "",
    category: "",
    image: "",
    amenities: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const propertyData = {
        ...formData,
        price: Number(formData.price),
        rating: formData.rating ? Number(formData.rating) : 0,
        reviews: formData.reviews ? Number(formData.reviews) : 0,
        guests: Number(formData.guests),
        bedrooms: Number(formData.bedrooms),
        beds: Number(formData.beds),
        bathrooms: Number(formData.bathrooms),

        amenities: formData.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await api.post(
        "/properties",
        propertyData
      );

      console.log("Property created:", response.data);

      navigate(`/property/${response.data.property._id}`);

    } catch (error) {
      console.error("Create property error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to create property."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
            Become a host
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            List your property
          </h1>

          <p className="mt-3 text-gray-500">
            Share your place with guests looking for their next stay.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8"
        >

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <FormSection title="Basic information">

            <Input
              label="Property title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Beautiful villa near the beach"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Tell guests what makes your property special..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E07A5F]"
              >
                <option value="">Select category</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Cabin">Cabin</option>
                <option value="Cottage">Cottage</option>
              </select>
            </div>

          </FormSection>

          {/* Location */}
          <FormSection title="Location">

            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Baga Beach"
              required
            />

            <div className="grid gap-5 sm:grid-cols-2">

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Goa"
                required
              />

              <Input
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="India"
                required
              />

            </div>

          </FormSection>

          {/* Property Details */}
          <FormSection title="Property details">

            <div className="grid gap-5 sm:grid-cols-2">

              <Input
                label="Price per night (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="5000"
                required
              />

              <Input
                label="Guests"
                name="guests"
                type="number"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                placeholder="4"
                required
              />

              <Input
                label="Bedrooms"
                name="bedrooms"
                type="number"
                min="1"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="2"
                required
              />

              <Input
                label="Beds"
                name="beds"
                type="number"
                min="1"
                value={formData.beds}
                onChange={handleChange}
                placeholder="3"
                required
              />

              <Input
                label="Bathrooms"
                name="bathrooms"
                type="number"
                min="1"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="2"
                required
              />

            </div>

          </FormSection>

          {/* Image */}
          <FormSection title="Property image">

            <Input
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/property.jpg"
              required
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Property preview"
                className="h-56 w-full rounded-2xl object-cover"
              />
            )}

          </FormSection>

          {/* Amenities */}
          <FormSection title="Amenities">

            <Input
              label="Amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="WiFi, Pool, Parking, AC"
            />

            <p className="text-xs text-gray-400">
              Separate amenities with commas.
            </p>

          </FormSection>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-[#E07A5F] px-5 py-3.5 font-semibold text-white transition hover:bg-[#d96c50] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating property..." : "Publish property"}
          </button>

        </form>

      </div>

    </main>
  );
}

function FormSection({ title, children }) {
  return (
    <section className="border-b border-gray-100 py-7 first:pt-0 last:border-0">

      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <div className="space-y-5">
        {children}
      </div>

    </section>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
      />

    </div>
  );
}

export default CreateProperty;