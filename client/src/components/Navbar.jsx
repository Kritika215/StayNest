import { useState } from "react";
import { Menu, Heart, UserRound, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMobileOpen(false);

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E07A5F] text-white">
            <span className="text-lg font-bold">
              S
            </span>
          </div>

          <span className="text-xl font-bold tracking-tight text-[#1F2937] sm:text-2xl">
            StayNest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-[#E07A5F]"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="text-sm font-medium text-gray-700 transition hover:text-[#E07A5F]"
          >
            Explore
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-[#E07A5F]"
          >
            Experiences
          </Link>

          {token && (
            <Link
              to="/create-property"
              className="text-sm font-medium text-gray-700 transition hover:text-[#E07A5F]"
            >
              Become a Host
            </Link>
          )}

        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 sm:flex">

          <Link
            to="/wishlist"
            className="rounded-full p-2.5 text-gray-700 transition hover:bg-gray-100 hover:text-[#E07A5F]"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>

          {token ? (
            <>

              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 transition hover:bg-gray-50"
              >
                <UserRound size={18} />

                <span className="max-w-24 truncate text-sm font-medium text-gray-700">
                  {user?.name || "Profile"}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-full bg-[#1F2937] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Logout
              </button>

            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#1F2937] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Sign in
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full p-2.5 text-gray-700 transition hover:bg-gray-100 sm:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 sm:hidden">

          <div className="flex flex-col gap-1">

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>

            <Link
              to="/explore"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Explore
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ❤️ Wishlist
            </Link>

            {token && (
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                👤 Profile
              </Link>
            )}

            {token ? (
              <button
                onClick={handleLogout}
                className="mt-2 rounded-xl bg-[#1F2937] px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-xl bg-[#1F2937] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Sign in
              </Link>
            )}

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;