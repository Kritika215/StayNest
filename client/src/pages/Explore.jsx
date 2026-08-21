import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import api from "../api/axios";

function Explore() {
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [guests, setGuests] = useState("");

  const search = searchParams.get("search") || "";
  const city = searchParams.get("city") || "";

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (city) params.set("city", city);
      if (category) params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (guests) params.set("guests", guests);

      const response = await api.get(
        `/properties?${params.toString()}`
      );

      setProperties(response.data.properties || []);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      setError("Unable to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [search, city, category, minPrice, maxPrice, guests]);

  const clearFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setGuests("");
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* ================= HEADER ================= */}

      <section className="border-b border-gray-100 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
            Discover
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore stays
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Find beautiful homes and unique stays for your next adventure.
          </p>

          <SearchBar />

        </div>

      </section>


      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">


          {/* ================= FILTERS ================= */}

          <aside className="h-fit rounded-3xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">
                <SlidersHorizontal size={17} />

                <h2 className="font-semibold text-gray-900">
                  Filters
                </h2>
              </div>

              {(category || minPrice || maxPrice || guests) && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-[#E07A5F] hover:underline"
                >
                  Clear
                </button>
              )}

            </div>


            {/* CATEGORY */}

            <div className="mt-6">

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#E07A5F]"
              >
                <option value="">All categories</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Cabin">Cabin</option>
                <option value="House">House</option>
                <option value="Cottage">Cottage</option>
                <option value="Hotel">Hotel</option>
              </select>

            </div>


            {/* PRICE */}

            <div className="mt-6">

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Price per night
              </label>

              <div className="mt-2 grid grid-cols-2 gap-2">

                <input
                  type="number"
                  placeholder="Min ₹"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E07A5F]"
                />

                <input
                  type="number"
                  placeholder="Max ₹"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E07A5F]"
                />

              </div>

            </div>


            {/* GUESTS */}

            <div className="mt-6">

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Guests
              </label>

              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#E07A5F]"
              >
                <option value="">Any number</option>
                <option value="1">1+ guest</option>
                <option value="2">2+ guests</option>
                <option value="3">3+ guests</option>
                <option value="4">4+ guests</option>
                <option value="5">5+ guests</option>
                <option value="6">6+ guests</option>
              </select>

            </div>

          </aside>


          {/* ================= RESULTS ================= */}

          <div className="min-w-0">

            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  {loading
                    ? "Finding stays..."
                    : `${properties.length} ${
                        properties.length === 1 ? "stay" : "stays"
                      } found`}
                </h2>

                {(search || city) && (
                  <p className="mt-1 text-sm text-gray-500">
                    {search && `Search: "${search}"`}
                    {search && city && " · "}
                    {city && `Location: ${city}`}
                  </p>
                )}

              </div>

            </div>


            {/* LOADING */}

            {loading && (
              <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse"
                  >
                    <div className="aspect-[4/3] rounded-2xl bg-gray-200" />

                    <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />

                    <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />

                    <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
                  </div>
                ))}

              </div>
            )}


            {/* ERROR */}

            {!loading && error && (
              <div className="rounded-3xl bg-red-50 p-10 text-center">

                <h3 className="font-semibold text-red-700">
                  Something went wrong
                </h3>

                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>

                <button
                  onClick={fetchProperties}
                  className="mt-5 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Try again
                </button>

              </div>
            )}


            {/* EMPTY */}

            {!loading && !error && properties.length === 0 && (
              <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                  <X size={20} className="text-gray-400" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  No stays found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Try changing your search or removing some filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-[#E07A5F] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Clear filters
                </button>

              </div>
            )}


            {/* PROPERTY GRID */}

            {!loading && !error && properties.length > 0 && (
              <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">

                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    {...property}
                  />
                ))}

              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Explore;