import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import api from "../api/axios";

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties");

        setProperties(response.data.properties || []);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setError("Unable to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="bg-[#FAFAF8]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#F4EFEA]">

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E07A5F]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#E07A5F]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">

          {/* Hero content */}
          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-[#E07A5F] shadow-sm sm:px-4 sm:text-sm">
              ✦ Discover your next escape
            </span>

            <h1 className="mt-6 text-[2.7rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#1F2937] sm:text-5xl md:text-6xl lg:text-[4.5rem]">

              Find a place

              <br />

              <span className="text-[#E07A5F]">
                you'll love to stay.
              </span>

            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
              Discover beautiful homes, unique stays and unforgettable
              experiences curated for your next adventure.
            </p>

          </div>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
            <SearchBar />
          </div>

        </div>
      </section>


      {/* ================= PROPERTIES ================= */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        {/* Section heading */}
        <div className="mb-8 sm:mb-10">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E07A5F]">
            Explore stays
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Popular places to stay
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Handpicked stays loved by our community.
              </p>
            </div>

            {!loading && !error && properties.length > 0 && (
              <Link
                to="/explore"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[#E07A5F] transition hover:gap-2.5 sm:flex"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            )}

          </div>

        </div>


        {/* ================= LOADING ================= */}
        {loading && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
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


        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-10 text-center sm:px-8">

            <p className="font-semibold text-red-600">
              {error}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Make sure your backend server is running.
            </p>

          </div>
        )}


        {/* ================= EMPTY ================= */}
        {!loading && !error && properties.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-14 text-center shadow-sm sm:px-8">

            <div className="mx-auto max-w-md">

              <h3 className="text-xl font-semibold text-gray-900">
                No stays available
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                There aren't any properties available right now.
                Check back soon for new stays.
              </p>

              <Link
                to="/create-property"
                className="mt-6 inline-flex rounded-full bg-[#E07A5F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d96c50]"
              >
                Add a property
              </Link>

            </div>

          </div>
        )}


        {/* ================= PROPERTY CARDS ================= */}
        {!loading && !error && properties.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  {...property}
                />
              ))}

            </div>

            {/* Mobile view all */}
            <div className="mt-10 flex justify-center sm:hidden">

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
              >
                View all stays
                <ArrowRight size={16} />
              </Link>

            </div>
          </>
        )}

      </section>

    </main>
  );
}

export default Home;