import { useState } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateProperty() {
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
    rating: "",
    reviews: "",
    image: "",
  });

  const [amenity, setAmenity] = useState("");
  const [amenities, setAmenities] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addAmenity = () => {
    const value = amenity.trim();

    if (!value) return;

    if (!amenities.includes(value)) {
      setAmenities([...amenities, value]);
    }

    setAmenity("");
  };

  const removeAmenity = (value) => {
    setAmenities(amenities.filter((item) => item !== value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...form,
        price: Number(form.price),
        guests: Number(form.guests),
        bedrooms: Number(form.bedrooms),
        beds: Number(form.beds),
        bathrooms: Number(form.bathrooms),
        rating: form.rating ? Number(form.rating) : 0,
        reviews: form.reviews ? Number(form.reviews) : 0,
        amenities,
      };

      const response = await api.post("/properties", payload);

      const createdProperty = response.data.property;

      navigate(`/property/${createdProperty._id}`);
    } catch (error) {
      console.error("Create property error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to create property."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/10";

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back
        </Link>


        <div className="mt-7">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E07A5F]">
            Become a host
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add your property
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Share your space with travelers looking for their next
            memorable stay.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          {/* BASIC INFO */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-bold text-gray-900">
              Basic information
            </h2>

            <div className="mt-6 grid gap-5">

              <label className="text-sm font-medium text-gray-700">
                Property title

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Beautiful beach house"
                  required
                  className={inputClass}
                />
              </label>

              <label className="text-sm font-medium text-gray-700">
                Description

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell guests about your property..."
                  rows={5}
                  required
                  className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/10"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">

                <label className="text-sm font-medium text-gray-700">
                  Category

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="House">House</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Cabin">Cabin</option>
                  </select>
                </label>

                <label className="text-sm font-medium text-gray-700">
                  Price per night

                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="2500"
                    required
                    className={inputClass}
                  />
                </label>

              </div>

            </div>

          </section>


          {/* LOCATION */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-bold text-gray-900">
              Location
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {["location", "city", "country"].map((field) => (
                <label
                  key={field}
                  className="text-sm font-medium capitalize text-gray-700"
                >
                  {field}

                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    required
                    className={inputClass}
                  />
                </label>
              ))}

            </div>

          </section>


          {/* DETAILS */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-bold text-gray-900">
              Property details
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

              {[
                ["guests", "Guests"],
                ["bedrooms", "Bedrooms"],
                ["beds", "Beds"],
                ["bathrooms", "Bathrooms"],
              ].map(([name, label]) => (
                <label
                  key={name}
                  className="text-sm font-medium text-gray-700"
                >
                  {label}

                  <input
                    name={name}
                    type="number"
                    min="1"
                    value={form[name]}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </label>
              ))}

            </div>

          </section>


          {/* IMAGE */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-bold text-gray-900">
              Property image
            </h2>

            <label className="mt-6 block text-sm font-medium text-gray-700">
              Image URL

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/property.jpg"
                className={inputClass}
              />
            </label>

          </section>


          {/* AMENITIES */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-bold text-gray-900">
              Amenities
            </h2>

            <div className="mt-5 flex gap-2">

              <input
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                placeholder="WiFi, Pool, Parking..."
                className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-[#E07A5F]"
              />

              <button
                type="button"
                onClick={addAmenity}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4EFEA] text-[#E07A5F]"
              >
                <Plus size={18} />
              </button>

            </div>

            {amenities.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">

                {amenities.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-full bg-[#F4EFEA] px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {item}

                    <button
                      type="button"
                      onClick={() => removeAmenity(item)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}

              </div>
            )}

          </section>


          {/* ERROR */}
          {error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}


          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#E07A5F] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d96c50] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating property..." : "Create property"}
          </button>

        </form>

      </div>

    </main>
  );
}

export default CreateProperty;