import { Search, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("search", location.trim());
    }

    if (guests) {
      params.set("guests", guests);
    }

    navigate(`/explore?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex max-w-4xl flex-col gap-2 rounded-3xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-900/5 sm:flex-row sm:items-center sm:rounded-full"
    >

      {/* LOCATION */}
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3 sm:rounded-full">

        <MapPin
          size={19}
          className="shrink-0 text-[#E07A5F]"
        />

        <div className="min-w-0 flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Where
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search destinations"
            className="mt-0.5 w-full border-0 bg-transparent p-0 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>

      </div>


      <div className="hidden h-9 w-px bg-gray-200 sm:block" />


      {/* GUESTS */}
      <div className="flex items-center gap-3 rounded-2xl px-4 py-3 sm:w-44 sm:rounded-full">

        <Users
          size={19}
          className="shrink-0 text-[#E07A5F]"
        />

        <div className="min-w-0 flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Guests
          </label>

          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="mt-0.5 w-full border-0 bg-transparent p-0 text-sm text-gray-900 outline-none"
          >
            <option value="">Any guests</option>
            <option value="1">1+ guest</option>
            <option value="2">2+ guests</option>
            <option value="4">4+ guests</option>
            <option value="6">6+ guests</option>
            <option value="8">8+ guests</option>
          </select>
        </div>

      </div>


      {/* SEARCH BUTTON */}
      <button
        type="submit"
        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#E07A5F] px-6 text-sm font-semibold text-white transition hover:bg-[#d96c50] sm:w-auto sm:rounded-full"
      >
        <Search size={17} />
        <span>Search</span>
      </button>

    </form>
  );
}

export default SearchBar;