import { Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div className="sm:col-span-2">

            <Link
              to="/"
              className="text-xl font-bold text-gray-900"
            >
              Stay<span className="text-[#E07A5F]">Nest</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Discover beautiful stays, unique homes and memorable
              experiences for your next adventure.
            </p>

          </div>


          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Explore
            </h3>

            <div className="mt-3 space-y-2.5">

              <Link
                to="/"
                className="block text-sm text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>

              <Link
                to="/explore"
                className="block text-sm text-gray-500 hover:text-gray-900"
              >
                Explore stays
              </Link>

              <Link
                to="/create-property"
                className="block text-sm text-gray-500 hover:text-gray-900"
              >
                Become a host
              </Link>

            </div>
          </div>


          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Connect
            </h3>

            <div className="mt-3 flex gap-3">

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                <Github size={17} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                <Linkedin size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                <Instagram size={17} />
              </a>

            </div>
          </div>

        </div>


        <div className="mt-8 border-t border-gray-100 pt-6">

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} StayNest. Built for learning and portfolio purposes.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;