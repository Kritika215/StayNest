import { useEffect, useState } from "react";
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

        setProperties(response.data.properties);
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
    <main>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#F4EFEA]">

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-[#E07A5F] shadow-sm">
              ✦ Discover your next escape
            </span>

           <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-5xl md:mt-7 md:text-6xl lg:text-7xl">
              Find a place
              <br />

              <span className="text-[#E07A5F]">
                you'll love to stay.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
              Discover beautiful homes, unique stays and unforgettable
              experiences curated for your next adventure.
            </p>

          </div>

          <SearchBar />

        </div>

      </section>


      {/* ================= PROPERTIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
              Explore stays
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Popular places to stay
            </h2>

            <p className="mt-3 text-gray-500">
              Handpicked stays loved by our community.
            </p>

          </div>

        </div>


        {/* ================= LOADING ================= */}

        {loading && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse">

                <div className="h-64 rounded-2xl bg-gray-200" />

                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />

                <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />

                <div className="mt-2 h-4 w-1/3 rounded bg-gray-200" />

              </div>
            ))}

          </div>
        )}


        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-8 text-center">

            <p className="font-medium text-red-600">
              {error}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Make sure your backend server is running.
            </p>

          </div>
        )}


        {/* ================= EMPTY ================= */}

        {!loading && !error && properties.length === 0 && (
          <div className="rounded-2xl bg-gray-50 p-12 text-center">

            <h3 className="text-xl font-semibold text-gray-900">
              No stays available
            </h3>

            <p className="mt-2 text-gray-500">
              Check back soon for new properties.
            </p>

          </div>
        )}


        {/* ================= PROPERTY CARDS ================= */}

        {!loading && !error && properties.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                {...property}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Home;