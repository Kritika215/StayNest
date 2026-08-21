import { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("staynest_wishlist") || "[]"
    );

    setWishlist(saved);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(
      (property) => property._id !== id
    );

    setWishlist(updated);

    localStorage.setItem(
      "staynest_wishlist",
      JSON.stringify(updated)
    );
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4EFEA] text-[#E07A5F]">
              <Heart size={20} fill="currentColor" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Wishlist
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Your saved stays in one place.
              </p>
            </div>

          </div>

        </div>


        {wishlist.length === 0 ? (

          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

            <Heart
              size={40}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Save properties you love and come back to them later.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-flex rounded-full bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52]"
            >
              Explore stays
            </Link>

          </div>

        ) : (

          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

            {wishlist.map((property) => (

              <article
                key={property._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >

                <Link
                  to={`/property/${property._id}`}
                  className="block"
                >

                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">

                    {property.image ? (
                      <img
                        src={property.image}
                        alt={property.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                      </div>
                    )}

                  </div>

                </Link>


                <div className="p-4">

                  <div className="flex items-start justify-between gap-3">

                    <Link
                      to={`/property/${property._id}`}
                      className="min-w-0"
                    >
                      <h3 className="truncate font-semibold text-gray-900">
                        {property.title}
                      </h3>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        {property.location}
                      </p>
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromWishlist(property._id)
                      }
                      className="shrink-0 text-gray-400 transition hover:text-red-500"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <p className="mt-3 text-sm font-semibold text-gray-900">
                    ₹{Number(property.price || 0).toLocaleString("en-IN")}
                    <span className="ml-1 font-normal text-gray-500">
                      / night
                    </span>
                  </p>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default Wishlist;