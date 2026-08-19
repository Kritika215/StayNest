import { Search, MapPin, CalendarDays, Users } from "lucide-react";

function SearchBar() {
  return (
    <div className="mx-auto mt-8 flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-2 shadow-xl shadow-black/5 md:flex-row">

      {/* Location */}
      <div className="flex flex-1 items-center gap-3 rounded-2xl px-5 py-4 transition hover:bg-gray-50">
        <MapPin className="text-[#E07A5F]" size={21} />

        <div>
          <p className="text-xs font-semibold text-gray-900">
            Location
          </p>

          <input
            type="text"
            placeholder="Where are you going?"
            className="mt-1 w-full bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="hidden w-px bg-gray-200 md:block" />

      {/* Check in */}
      <div className="flex flex-1 items-center gap-3 rounded-2xl px-5 py-4 transition hover:bg-gray-50">
        <CalendarDays className="text-[#E07A5F]" size={21} />

        <div>
          <p className="text-xs font-semibold text-gray-900">
            Check in
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Add date
          </p>
        </div>
      </div>

      <div className="hidden w-px bg-gray-200 md:block" />

      {/* Guests */}
      <div className="flex flex-1 items-center gap-3 rounded-2xl px-5 py-4 transition hover:bg-gray-50">
        <Users className="text-[#E07A5F]" size={21} />

        <div>
          <p className="text-xs font-semibold text-gray-900">
            Guests
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Add guests
          </p>
        </div>
      </div>

      {/* Search */}
      <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#E07A5F] px-7 py-4 font-semibold text-white transition hover:bg-[#d9684c]">
        <Search size={19} />
        Search
      </button>
    </div>
  );
}

export default SearchBar;