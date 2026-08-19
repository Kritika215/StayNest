import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

function Home() {
  return (
    <main>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F4EFEA]">

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-[#E07A5F] shadow-sm">
              ✦ Discover your next escape
            </span>

            <h1 className="mt-7 text-5xl font-bold tracking-tight text-[#1F2937] md:text-7xl">
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


      {/* Properties */}
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

          <button className="hidden rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50 md:block">
            View all →
          </button>

        </div>


        {/* Property Cards */}
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;