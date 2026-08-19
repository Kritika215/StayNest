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
  console.log("PROPERTY:", {
    id: _id,
    title,
  });
  
  const propertyImage =
    image || (images && images.length > 0 ? images[0] : "");

  return (
    <article className="group w-full">

      {/* Image */}
      <Link
        to={`/property/${_id}`}
        className="relative block overflow-hidden rounded-2xl bg-gray-100"
      >

        <div className="aspect-[4/3] w-full overflow-hidden">

          {propertyImage ? (
            <img
              src={propertyImage}
              alt={title}
              className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}

        </div>


        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart
            size={19}
            strokeWidth={2}
          />
        </button>


        {/* Category */}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
            {category}
          </span>
        )}

      </Link>


      {/* Information */}
      <div className="pt-4">

        <div className="flex items-start justify-between gap-3">

          <Link
            to={`/property/${_id}`}
            className="min-w-0"
          >

            <h3 className="truncate text-base font-semibold text-gray-900 transition group-hover:text-[#E07A5F]">
              {title}
            </h3>

          </Link>


          {rating && (
            <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-gray-900">

              <Star
                size={15}
                fill="currentColor"
              />

              <span>{rating}</span>

            </div>
          )}

        </div>


        {/* Location */}
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">

          <MapPin size={14} />

          <span className="truncate">
            {location}
          </span>

        </div>


        {/* Guests */}
        {guests && (
          <p className="mt-1 text-sm text-gray-500">
            {guests} guests
          </p>
        )}


        {/* Price */}
        <div className="mt-3">

          <span className="text-base font-semibold text-gray-900">
            ₹{Number(price).toLocaleString("en-IN")}
          </span>

          <span className="ml-1 text-sm text-gray-500">
            night
          </span>

        </div>

      </div>

    </article>
  );
}

export default PropertyCard;