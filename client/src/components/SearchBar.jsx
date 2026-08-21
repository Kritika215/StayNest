import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (city) {
      params.set("city", city);
    }

    if (guests) {
      params.set("guests", guests);
    }

    navigate(`/explore?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto mt-10 w-full max-w-4xl"
    >
      <div className="rounded-3xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-200/40">

        <div className="grid gap-2 md:grid-cols-[1.5fr_1fr_1fr_auto]">

          {/* SEARCH */}
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 transition focus-within:bg-gray-50">

            <Search
              size={19}
              className="shrink-0 text-gray-400"
            />

            <div className="min-w-0 flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Where do you want to stay?"
                className="mt-1 w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>

          </div>


          {/* CITY */}
          <div className="rounded-2xl px-4 py-3 transition focus-within:bg-gray-50">

            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Location
            </label>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm text-gray-700 outline-none"
            >
              <option value="">Anywhere</option>
              <option value="Goa">Goa</option>
              <option value="Rishikesh">Rishikesh</option>
              <option value="Manali">Manali</option>
              <option value="Shimla">Shimla</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Delhi">Delhi</option>
            </select>

          </div>


          {/* GUESTS */}
          <div className="rounded-2xl px-4 py-3 transition focus-within:bg-gray-50">

            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Guests
            </label>

            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm text-gray-700 outline-none"
            >
              <option value="">Any guests</option>
              <option value="1">1+ guest</option>
              <option value="2">2+ guests</option>
              <option value="3">3+ guests</option>
              <option value="4">4+ guests</option>
              <option value="5">5+ guests</option>
              <option value="6">6+ guests</option>
            </select>

          </div>


          {/* BUTTON */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#E07A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96D52] hover:shadow-md"
          >
            <Search size={17} />
            <span className="md:hidden lg:inline">
              Search
            </span>
          </button>

        </div>

      </div>

      {/* MOBILE FILTER HINT */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400 md:hidden">
        <SlidersHorizontal size={13} />
        Search and discover your perfect stay
      </div>

    </form>
  );
}

export default SearchBar;