import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Register data:", formData);

    // Backend registration will be added later
    navigate("/login");
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F4EFEA] px-6 py-12">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT */}

        <div className="hidden min-h-[700px] bg-[#E07A5F] p-12 text-white lg:flex lg:flex-col lg:justify-between">

          <Link
            to="/"
            className="text-2xl font-bold"
          >
            StayNest
          </Link>

          <div>

            <h1 className="text-5xl font-bold leading-tight">
              Make room
              <br />
              for more
              <br />
              adventures.
            </h1>

            <p className="mt-6 max-w-md leading-7 text-white/80">
              Create your StayNest account and discover unique homes,
              memorable experiences and beautiful destinations.
            </p>

          </div>

          <p className="text-sm text-white/60">
            Travel. Stay. Remember.
          </p>

        </div>


        {/* RIGHT */}

        <div className="flex items-center justify-center p-8 sm:p-12">

          <div className="w-full max-w-md">

            <div className="mb-8">

              <p className="text-sm font-semibold uppercase tracking-wider text-[#E07A5F]">
                Get started
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Join StayNest and start exploring.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Kritika Sharma"
                    required
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                  />

                </div>

              </div>


              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                  />

                </div>

              </div>


              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    minLength={6}
                    required
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-[#E07A5F] focus:ring-4 focus:ring-[#E07A5F]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>


              {/* Terms */}

              <div className="flex items-start gap-3">

                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[#E07A5F]"
                />

                <p className="text-xs leading-5 text-gray-500">
                  I agree to the StayNest terms and privacy policy.
                </p>

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#E07A5F] py-3.5 font-semibold text-white transition hover:bg-[#d9684c] hover:shadow-lg"
              >
                Create account
              </button>

            </form>


            {/* Login */}

            <p className="mt-8 text-center text-sm text-gray-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#E07A5F] hover:underline"
              >
                Sign in
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Register;