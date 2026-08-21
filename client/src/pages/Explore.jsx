import { useEffect, useState } from "react";
import { Filter, Search, X } from "lucide-react";

import PropertyCard from "../components/PropertyCard";
import api from "../api/axios";

function Explore() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [guests, setGuests] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const params = {};

      if (search.trim()) params.search = search.trim();
      if (city.trim()) params.city = city.trim();
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (guests) params.guests = guests;

      const response = await api.get("/properties", { params });

      setProperties(response.data.properties || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setGuests("");

    setTimeout(() => {
      fetchProperties();
    }, 0);
  };

  const hasFilters =
    search ||
    city ||
    category ||
    minPrice ||
    maxPrice ||
    guests;

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* ================= HEADER ================= */}
      <section className="border-b border-gray-100 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E07A5F]">
              Explore
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find your perfect stay
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              Search through beautiful properties and find a place
              that feels like home.
            </p>

          </div>


          {/* SEARCH */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by property, city or location..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/10"
              />

            </div>

            <button
              type="submit"
              className="h-12 rounded-xl bg-[#E07A5F] px-6 text-sm font-semibold text-white transition hover:bg-[#d96c50]"
            >
              Search
            </button>

          </form>

        </div>

      </section>


      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* FILTER HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-gray-900">
              {loading ? "Finding stays..." : `${properties.length} stays`}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Refine your search using the filters below.
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <X size={15} />
              Clear filters
            </button>
          )}

        </div>


        {/* ================= FILTERS ================= */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">

          <div className="mb-4 flex items-center gap-2">

            <Filter
              size={17}
              className="text-[#E07A5F]"
            />

            <h2 className="text-sm font-semibold text-gray-900">
              Filters
            </h2>

          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {/* CITY */}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-[#E07A5F]"
            />


            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#E07A5F]"
            >
              <option value="">All categories</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Hotel">Hotel</option>
              <option value="Cabin">Cabin</option>
            </select>


            {/* MIN PRICE */}
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min price"
              min="0"
              className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-[#E07A5F]"
            />


            {/* MAX PRICE */}
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max price"
              min="0"
              className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-[#E07A5F]"
            />


            {/* GUESTS */}
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#E07A5F]"
            >
              <option value="">Guests</option>
              <option value="1">1+ guest</option>
              <option value="2">2+ guests</option>
              <option value="4">4+ guests</option>
              <option value="6">6+ guests</option>
              <option value="8">8+ guests</option>
            </select>

          </div>


          <button
            type="button"
            onClick={fetchProperties}
            className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 sm:w-auto"
          >
            Apply filters
          </button>

        </div>


        {/* ================= LOADING ================= */}
        {loading && (
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="aspect-[4/3] rounded-2xl bg-gray-200" />

                <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />

                <div className="mt-2 h-3.5 w-1/2 rounded bg-gray-200" />

                <div className="mt-2 h-3.5 w-1/3 rounded bg-gray-200" />
              </div>
            ))}

          </div>
        )}


        {/* ================= RESULTS ================= */}
        {!loading && properties.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                {...property}
              />
            ))}

          </div>
        )}


        {/* ================= EMPTY ================= */}
        {!loading && properties.length === 0 && (
          <div className="mt-10 rounded-3xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">

            <div className="mx-auto max-w-md">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EFEA] text-[#E07A5F]">
                <Search size={22} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No stays found
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Try changing your search or removing some filters.
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-[#E07A5F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d96c50]"
                >
                  Clear filters
                </button>
              )}

            </div>

          </div>
        )}

      </section>

    </main>
  );
}

export default Explore;