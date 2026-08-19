import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import api from "../api/axios";

function Explore() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const params = {};

      if (search) params.search = search;
      if (city) params.city = city;
      if (category) params.category = category;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await api.get("/properties", {
        params,
      });

      setProperties(response.data.properties);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setCategory("");
    setMaxPrice("");

    setTimeout(() => {
      fetchProperties();
    }, 0);
  };

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <section className="border-b border-gray-100 bg-[#F4EFEA]">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
            Explore StayNest
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1F2937] md:text-5xl">
            Find your perfect stay
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Search beautiful homes, apartments and unique stays across India.
          </p>

        </div>

      </section>


      {/* Search + Filters */}
      <section className="sticky top-20 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">

        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 lg:flex-row"
          >

            {/* Search */}
            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search destination or stay..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20"
              />

            </div>


            {/* City */}
            <div className="relative">

              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 w-full min-w-[170px] appearance-none rounded-xl border border-gray-200 bg-white pl-11 pr-8 outline-none focus:border-[#E07A5F]"
              >

                <option value="">All cities</option>
                <option value="Goa">Goa</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Manali">Manali</option>
                <option value="Shimla">Shimla</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Alleppey">Alleppey</option>
                <option value="Udaipur">Udaipur</option>
                <option value="Rishikesh">Rishikesh</option>

              </select>

            </div>


            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 min-w-[170px] rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-[#E07A5F]"
            >

              <option value="">All types</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Cottage">Cottage</option>
              <option value="Cabin">Cabin</option>
              <option value="House">House</option>

            </select>


            {/* Price */}
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-12 min-w-[170px] rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-[#E07A5F]"
            >

              <option value="">Any price</option>
              <option value="3000">Under ₹3,000</option>
              <option value="4000">Under ₹4,000</option>
              <option value="5000">Under ₹5,000</option>
              <option value="7000">Under ₹7,000</option>

            </select>


            {/* Search Button */}
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1F2937] px-6 font-medium text-white transition hover:bg-[#374151]"
            >
              <SlidersHorizontal size={18} />
              Search
            </button>

          </form>


          {/* Clear */}
          {(search || city || category || maxPrice) && (
            <button
              onClick={clearFilters}
              className="mt-3 text-sm font-medium text-[#E07A5F] hover:underline"
            >
              Clear all filters
            </button>
          )}

        </div>

      </section>


      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-gray-900">
            {loading
              ? "Finding stays..."
              : `${properties.length} stays found`}
          </h2>

          <p className="mt-1 text-gray-500">
            Discover places you'll love.
          </p>

        </div>


        {/* Loading */}
        {loading && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse">

                <div className="h-64 rounded-2xl bg-gray-200" />

                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />

                <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />

              </div>
            ))}

          </div>
        )}


        {/* Results */}
        {!loading && properties.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                {...property}
              />
            ))}

          </div>
        )}


        {/* No results */}
        {!loading && properties.length === 0 && (
          <div className="rounded-3xl bg-gray-50 px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <Search className="text-gray-400" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900">
              No stays found
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[#E07A5F] px-6 py-3 text-sm font-medium text-white hover:bg-[#d9684b]"
            >
              Clear filters
            </button>

          </div>
        )}

      </section>

    </main>
  );
}

export default Explore;