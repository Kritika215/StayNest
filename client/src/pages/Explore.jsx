import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import api from "../api/axios";

function Explore() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    guests: "",
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const params = {};

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params[key] = value;
        }
      });

      const response = await api.get("/properties", {
        params,
      });

      setProperties(response.data.properties || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      city: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      guests: "",
    });

    setTimeout(() => {
      fetchProperties();
    }, 0);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* Header */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
            Explore
          </p>

          <div className="mt-2 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Find your perfect stay
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Search beautiful homes and unique stays that match your plans.
              </p>
            </div>

            <button
              onClick={() => setMobileFilters(true)}
              className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm md:hidden"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

          </div>

        </div>
      </section>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">

        {/* Desktop Filters */}
        <aside className="hidden w-64 shrink-0 md:block">

          <div className="sticky top-28 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="font-semibold text-gray-900">
                Filters
              </h2>

              <button
                onClick={clearFilters}
                className="text-xs font-medium text-[#E07A5F] hover:underline"
              >
                Clear
              </button>

            </div>

            <FilterContent
              filters={filters}
              handleChange={handleChange}
            />

            <button
              onClick={handleSearch}
              className="mt-6 w-full rounded-xl bg-[#1F2937] px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Apply filters
            </button>

          </div>

        </aside>

        {/* Main */}
        <section className="min-w-0 flex-1">

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mb-8 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:flex-row"
          >

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search by destination or property..."
                className="w-full rounded-xl bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-[#E07A5F]/20"
              />

            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d96c50]"
            >
              Search
            </button>

          </form>

          {/* Result count */}
          {!loading && (
            <div className="mb-6 flex items-center justify-between">

              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">
                  {properties.length}
                </span>{" "}
                {properties.length === 1 ? "stay" : "stays"} found
              </p>

            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

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

          {/* Empty */}
          {!loading && properties.length === 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EFEA]">
                <Search className="text-[#E07A5F]" size={24} />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-gray-900">
                No stays found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Try changing your search or removing some filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-full bg-[#1F2937] px-5 py-2.5 text-sm font-medium text-white"
              >
                Clear filters
              </button>

            </div>
          )}

          {/* Properties */}
          {!loading && properties.length > 0 && (
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">

              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  {...property}
                />
              ))}

            </div>
          )}

        </section>

      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[100] md:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilters(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-semibold text-gray-900">
                Filters
              </h2>

              <button
                onClick={() => setMobileFilters(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <FilterContent
              filters={filters}
              handleChange={handleChange}
            />

            <button
              onClick={() => {
                setMobileFilters(false);
                fetchProperties();
              }}
              className="mt-6 w-full rounded-xl bg-[#1F2937] px-4 py-3 font-semibold text-white"
            >
              Apply filters
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

function FilterContent({ filters, handleChange }) {
  return (
    <div className="mt-6 space-y-5">

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          City
        </label>

        <input
          name="city"
          value={filters.city}
          onChange={handleChange}
          placeholder="e.g. Goa"
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E07A5F]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#E07A5F]"
        >
          <option value="">All categories</option>
          <option value="Villa">Villa</option>
          <option value="Cabin">Cabin</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Cottage">Cottage</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Price per night
        </label>

        <div className="grid grid-cols-2 gap-2">

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min ₹"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E07A5F]"
          />

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max ₹"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E07A5F]"
          />

        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Guests
        </label>

        <select
          name="guests"
          value={filters.guests}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#E07A5F]"
        >
          <option value="">Any number</option>
          <option value="1">1+ guests</option>
          <option value="2">2+ guests</option>
          <option value="4">4+ guests</option>
          <option value="6">6+ guests</option>
          <option value="8">8+ guests</option>
        </select>
      </div>

    </div>
  );
}

export default Explore;