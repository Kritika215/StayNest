import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="sm:col-span-2">

            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-gray-900"
            >
              Stay<span className="text-[#E07A5F]">Nest</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Discover beautiful stays, unique homes and memorable
              experiences for your next adventure.
            </p>

          </div>


          {/* EXPLORE */}
          <div>

            <h3 className="text-sm font-semibold text-gray-900">
              Explore
            </h3>

            <div className="mt-4 space-y-3">

              <Link
                to="/"
                className="block text-sm text-gray-500 transition hover:text-[#E07A5F]"
              >
                Home
              </Link>

              <Link
                to="/explore"
                className="block text-sm text-gray-500 transition hover:text-[#E07A5F]"
              >
                Explore stays
              </Link>

              <Link
                to="/create-property"
                className="block text-sm text-gray-500 transition hover:text-[#E07A5F]"
              >
                Become a host
              </Link>

            </div>

          </div>


          {/* CONNECT */}
          <div>

            <h3 className="text-sm font-semibold text-gray-900">
              Connect
            </h3>

            <div className="mt-4 flex gap-3">

              {/* GitHub */}
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-xs font-bold text-gray-600 transition hover:bg-[#E07A5F] hover:text-white"
              >
                GH
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-xs font-bold text-gray-600 transition hover:bg-[#E07A5F] hover:text-white"
              >
                in
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-xs font-bold text-gray-600 transition hover:bg-[#E07A5F] hover:text-white"
              >
                IG
              </a>

            </div>

          </div>

        </div>


        {/* BOTTOM */}
        <div className="mt-10 border-t border-gray-100 pt-6">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} StayNest. All rights reserved.
            </p>

            <p className="text-xs text-gray-400">
              Built for learning and portfolio purposes.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;