import { useState } from "react";
import {
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setOpen(false);

    navigate("/login");

    window.location.reload();
  };

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-[#E07A5F]"
        : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}

        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Stay<span className="text-[#E07A5F]">Nest</span>
        </Link>


        {/* DESKTOP NAV */}

        <div className="hidden items-center gap-7 md:flex">

          <NavLink
            to="/"
            className={navClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={navClass}
          >
            Explore
          </NavLink>

          {token && (
            <Link
              to="/create-property"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Become a host
            </Link>
          )}

          {token && (
            <Link
              to="/my-bookings"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              My Bookings
            </Link>
          )}

        </div>


        {/* DESKTOP ACTIONS */}

        <div className="hidden items-center gap-3 md:flex">

          {!token ? (
            <>
              <Link
                to="/login"
                className="flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <UserCircle size={18} />
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-[#E07A5F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d96c50]"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 rounded-full bg-[#F4EFEA] px-4 py-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E07A5F] text-xs font-bold text-white">
                  {user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>

                <span className="max-w-[120px] truncate text-sm font-medium text-gray-700">
                  {user?.name || "User"}
                </span>

              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          )}

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </nav>


      {/* MOBILE MENU */}

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-3 md:hidden">

          <div className="flex flex-col">

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-[#F4EFEA] text-[#E07A5F]"
                    : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>


            <NavLink
              to="/explore"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-[#F4EFEA] text-[#E07A5F]"
                    : "text-gray-700"
                }`
              }
            >
              Explore
            </NavLink>


            {token && (
              <Link
                to="/create-property"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700"
              >
                Become a host
              </Link>
            )}


            {token && (
              <Link
                to="/my-bookings"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700"
              >
                My Bookings
              </Link>
            )}


            <div className="my-2 border-t border-gray-100" />


            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl bg-[#E07A5F] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-3">

                  <p className="text-xs text-gray-400">
                    Signed in as
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {user?.name || "User"}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;