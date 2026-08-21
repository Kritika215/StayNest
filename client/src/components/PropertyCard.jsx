import { useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

function PropertyCard({
  _id,
  title,
  location,
  price,
  rating,
  image,
  images,
  category,
  guests,
}) {
  const [liked, setLiked] = useState(false);

  const propertyImage =
    image || (images?.length > 0 ? images[0] : "");

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLiked((prev) => !prev);
  };

  return (
    <article className="group min-w-0">

      {/* IMAGE */}
      <div className="relative">

        <Link
          to={`/property/${_id}`}
          className="block overflow-hidden rounded-2xl bg-gray-100"
        >
          <div className="aspect-[4/3] w-full">

            {propertyImage ? (
              <img
                src={propertyImage}
                alt={title || "Property"}
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No image available
              </div>
            )}

          </div>
        </Link>

        {/* CATEGORY */}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-800 shadow-sm backdrop-blur">
            {category}
          </span>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          onClick={toggleWishlist}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white ${
            liked ? "text-[#E07A5F]" : "text-gray-700"
          }`}
          aria-label={
            liked ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <Heart
            size={17}
            strokeWidth={2}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

      </div>


      {/* CONTENT */}
      <div className="pt-3">

        {/* TITLE + RATING */}
        <div className="flex items-start justify-between gap-3">

          <Link
            to={`/property/${_id}`}
            className="min-w-0 flex-1"
          >
            <h3 className="truncate text-[15px] font-semibold leading-5 text-gray-900 transition group-hover:text-[#E07A5F]">
              {title || "Untitled property"}
            </h3>
          </Link>

          {rating !== undefined && rating !== null && (
            <div className="flex shrink-0 items-center gap-1 text-xs font-medium text-gray-800">

              <Star
                size={13}
                fill="currentColor"
                strokeWidth={1.5}
              />

              <span>
                {Number(rating).toFixed(1)}
              </span>

            </div>
          )}

        </div>


        {/* LOCATION */}
        {location && (
          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">

            <MapPin
              size={13}
              className="shrink-0"
            />

            <span className="truncate">
              {location}
            </span>

          </div>
        )}


        {/* GUESTS */}
        {guests && (
          <p className="mt-1 text-xs text-gray-500">
            {guests} guests
          </p>
        )}


        {/* PRICE */}
        <div className="mt-2.5 flex items-baseline">

          <span className="text-[15px] font-semibold text-gray-900">
            ₹{Number(price || 0).toLocaleString("en-IN")}
          </span>

          <span className="ml-1 text-xs text-gray-500">
            night
          </span>

        </div>

      </div>

    </article>
  );
}

export default PropertyCard;