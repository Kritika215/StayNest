import { useState } from "react";
import { Menu, Heart, UserRound, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E07A5F] text-white shadow-sm">
            <span className="text-lg font-bold">
              S
            </span>
          </div>

          <span className="text-xl font-bold tracking-tight text-[#1F2937] sm:text-2xl">
            StayNest
          </span>
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">

          <Link
            to="/"
            className="text-sm font-medium text-gray-900 transition hover:text-[#E07A5F]"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="text-sm font-medium text-gray-600 transition hover:text-[#E07A5F]"
          >
            Explore
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-[#E07A5F]"
          >
            Experiences
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-[#E07A5F]"
          >
            Become a Host
          </Link>

        </div>


        {/* Desktop Right */}
        <div className="hidden items-center gap-2 md:flex">

          <Link
            to="/wishlist"
            className="rounded-full p-2.5 transition hover:bg-gray-100"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>

          <Link
            to="/profile"
            className="rounded-full border border-gray-200 p-2.5 transition hover:bg-gray-50"
            aria-label="Profile"
          >
            <UserRound size={20} />
          </Link>

          <Link
            to="/login"
            className="ml-1 rounded-full bg-[#1F2937] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#374151]"
          >
            Sign in
          </Link>

        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full p-2.5 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </nav>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">

          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Home
              </Link>

              <Link
                to="/explore"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Explore
              </Link>

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Experiences
              </Link>

              <Link to="/create-property" className="text-sm font-medium text-gray-600 transition hover:text-[#E07A5F]"
              >
               Become a Host
              </Link>
            </div>


            <div className="mt-4 grid grid-cols-2 gap-3">

              <Link
                to="/wishlist"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium"
              >
                <Heart size={18} />
                Wishlist
              </Link>

              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium"
              >
                <UserRound size={18} />
                Profile
              </Link>

            </div>


            <Link
              to="/login"
              onClick={closeMenu}
              className="mt-3 block rounded-xl bg-[#1F2937] py-3 text-center text-sm font-medium text-white"
            >
              Sign in
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;