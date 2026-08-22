import { useEffect, useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-[#E07A5F]"
        : "text-gray-600 hover:text-gray-900"
    }`;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setOpen(false);

    navigate("/login");
  };

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

        <div className="hidden items-center gap-8 md:flex">

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

          {user && (
            <Link
              to="/create-property"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Become a host
            </Link>
          )}

        </div>


        {/* DESKTOP ACTIONS */}

        <div className="hidden items-center gap-3 md:flex">

          {!user ? (
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
              <Link
                to="/host-dashboard"
                className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-3">

                <div className="flex h-9 items-center gap-2 rounded-full bg-[#F4EFEA] px-4">

                  <UserCircle
                    size={18}
                    className="text-[#E07A5F]"
                  />

                  <span className="text-sm font-semibold text-gray-800">
                    Hi, {user.name || "User"}
                  </span>

                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                >
                  Logout
                </button>

              </div>
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

            {user && (
              <>
                <Link
                  to="/create-property"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700"
                >
                  Become a host
                </Link>

                <Link
                  to="/host-dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700"
                >
                  Dashboard
                </Link>
              </>
            )}

            <div className="my-2 border-t border-gray-100" />

            {!user ? (
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
                <div className="rounded-xl bg-[#F4EFEA] px-4 py-3 text-sm font-semibold text-gray-800">
                  Hi, {user.name || "User"}
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-2 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700"
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