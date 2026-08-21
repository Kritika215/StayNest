import { useState } from "react";
import { ArrowLeft, Check, ImagePlus, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  });

  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD AMENITY
  // =========================

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (!value) return;

    if (amenities.includes(value)) {
      setAmenityInput("");
      return;
    }

    setAmenities((prev) => [...prev, value]);
    setAmenityInput("");
  };

  // =========================
  // REMOVE AMENITY
  // =========================

  const removeAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.filter((item) => item !== amenity)
    );
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.city ||
      !formData.price ||
      !formData.category ||
      !formData.guests ||
      !formData.bedrooms ||
      !formData.beds ||
      !formData.bathrooms
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const propertyData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        city: formData.city.trim(),
        country: formData.country.trim(),

        price: Number(formData.price),

        rating: formData.rating
          ? Number(formData.rating)
          : 0,

        reviews: formData.reviews
          ? Number(formData.reviews)
          : 0,

        image: formData.image.trim(),

        images: formData.image.trim()
          ? [formData.image.trim()]
          : [],

        category: formData.category,

        guests: Number(formData.guests),
        bedrooms: Number(formData.bedrooms),
        beds: Number(formData.beds),
        bathrooms: Number(formData.bathrooms),

        amenities,
      };

      const response = await api.post(
        "/properties",
        propertyData
      );

      console.log("Property created:", response.data);

      setSuccess("Property created successfully!");

      // Redirect to property details after creation
      setTimeout(() => {
        if (response.data?.property?._id) {
          navigate(
            `/property/${response.data.property._id}`
          );
        } else {
          navigate("/explore");
        }
      }, 800);

    } catch (err) {
      console.error("Create property error:", err);

      if (err.response?.status === 401) {
        setError(
          "You must be logged in to create a property."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to create property. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* ================= HEADER ================= */}

      <section className="border-b border-gray-100 bg-white">

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="mt-7">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E07A5F]">
              Become a host
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              List your property
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Tell travelers about your place and create a beautiful
              listing on StayNest.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FORM ================= */}

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ================= BASIC INFO ================= */}

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

            <div className="border-b border-gray-100 pb-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
                Step 1
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Basic information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Give your property a name and describe what makes it special.
              </p>

            </div>


            <div className="mt-6 space-y-5">

              {/* TITLE */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Property title
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Peaceful Rishikesh Cabin"
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Description
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your property, surroundings and what guests can expect..."
                  className="mt-2 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>

            </div>

          </div>


          {/* ================= LOCATION ================= */}

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

            <div className="border-b border-gray-100 pb-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
                Step 2
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Location
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Where is your property located?
              </p>

            </div>


            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {/* LOCATION */}

              <div className="sm:col-span-2">

                <label className="text-sm font-semibold text-gray-800">
                  Location
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Tapovan"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>


              {/* CITY */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  City
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Rishikesh"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>


              {/* COUNTRY */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="India"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>

            </div>

          </div>


          {/* ================= PROPERTY DETAILS ================= */}

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

            <div className="border-b border-gray-100 pb-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
                Step 3
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Property details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add information that helps guests understand your stay.
              </p>

            </div>


            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {/* CATEGORY */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Category
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Villa">
                    Villa
                  </option>

                  <option value="Apartment">
                    Apartment
                  </option>

                  <option value="Cabin">
                    Cabin
                  </option>

                  <option value="House">
                    House
                  </option>

                  <option value="Cottage">
                    Cottage
                  </option>

                  <option value="Hotel">
                    Hotel
                  </option>

                </select>

              </div>


              {/* GUESTS */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Guests
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <input
                  type="number"
                  min="1"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="e.g. 4"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>


              {/* PRICE */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Price / night
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="2800"
                    className="mt-2 w-full rounded-2xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                  />

                </div>

              </div>


              {/* BEDROOMS */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Bedrooms
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <input
                  type="number"
                  min="1"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="1"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>


              {/* BEDS */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Beds
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <input
                  type="number"
                  min="1"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  placeholder="2"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>


              {/* BATHROOMS */}

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Bathrooms
                  <span className="text-[#E07A5F]"> *</span>
                </label>

                <input
                  type="number"
                  min="1"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="1"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>

            </div>

          </div>


          {/* ================= IMAGE ================= */}

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

            <div className="border-b border-gray-100 pb-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
                Step 4
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Property photo
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add an image URL for your property.
              </p>

            </div>


            <div className="mt-6">

              <label className="text-sm font-semibold text-gray-800">
                Image URL
              </label>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">

                <div className="relative flex-1">

                  <ImagePlus
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-2xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                  />

                </div>

              </div>


              {/* IMAGE PREVIEW */}

              {formData.image && (
                <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100">

                  <img
                    src={formData.image}
                    alt="Property preview"
                    className="h-64 w-full object-cover sm:h-80"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                </div>
              )}

            </div>

          </div>


          {/* ================= AMENITIES ================= */}

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

            <div className="border-b border-gray-100 pb-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#E07A5F]">
                Step 5
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Amenities
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add useful features available at your property.
              </p>

            </div>


            <div className="mt-6">

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  value={amenityInput}
                  onChange={(e) =>
                    setAmenityInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAmenity();
                    }
                  }}
                  placeholder="e.g. WiFi"
                  className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

                <button
                  type="button"
                  onClick={addAmenity}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  <Plus size={17} />
                  Add
                </button>

              </div>


              {amenities.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F4EFEA] px-3.5 py-2 text-sm font-medium text-gray-800"
                    >

                      {amenity}

                      <button
                        type="button"
                        onClick={() =>
                          removeAmenity(amenity)
                        }
                        className="text-gray-500 transition hover:text-red-500"
                        aria-label={`Remove ${amenity}`}
                      >
                        <X size={14} />
                      </button>

                    </span>
                  ))}

                </div>
              )}

            </div>

          </div>


          {/* ================= OPTIONAL RATING ================= */}

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

            <div className="border-b border-gray-100 pb-5">

              <h2 className="text-xl font-bold text-gray-900">
                Additional information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                These fields are optional for now.
              </p>

            </div>


            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Rating
                </label>

                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="4.8"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>


              <div>

                <label className="text-sm font-semibold text-gray-800">
                  Reviews
                </label>

                <input
                  type="number"
                  min="0"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                  placeholder="59"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                />

              </div>

            </div>

          </div>


          {/* ================= ERROR ================= */}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">

              <p className="text-sm font-medium text-red-600">
                {error}
              </p>

            </div>
          )}


          {/* ================= SUCCESS ================= */}

          {success && (
            <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">

                <Check
                  size={17}
                  className="text-green-600"
                />

              </div>

              <p className="text-sm font-medium text-green-700">
                {success}
              </p>

            </div>
          )}


          {/* ================= SUBMIT ================= */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>


            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl bg-[#E07A5F] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#D96D52] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Creating property..."
                : "Create property"}

            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default CreateProperty;