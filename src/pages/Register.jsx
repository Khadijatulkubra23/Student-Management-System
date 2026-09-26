import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } =
      formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4 py-8">

      <div className="w-full max-w-md rounded-2xl border border-stone-800 bg-[#171717] p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8892f] text-white shadow-lg">
            <UserRound size={28} />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-stone-400">
            Register for the Student Management System
          </p>

        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-stone-300">
              Full Name
            </label>

            <div className="relative">

              <UserRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-stone-700 bg-[#111111] py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-stone-600 focus:border-[#e8892f] focus:ring-2 focus:ring-orange-500/10"
              />

            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-stone-300">
              Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-stone-700 bg-[#111111] py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-stone-600 focus:border-[#e8892f] focus:ring-2 focus:ring-orange-500/10"
              />

            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-stone-300">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-stone-700 bg-[#111111] py-3 pl-10 pr-12 text-white outline-none transition placeholder:text-stone-600 focus:border-[#e8892f] focus:ring-2 focus:ring-orange-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-[#e8892f]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-stone-300">
              Confirm Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
              />

              <input
                type={
                  showConfirmPassword ? "text" : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-stone-700 bg-[#111111] py-3 pl-10 pr-12 text-white outline-none transition placeholder:text-stone-600 focus:border-[#e8892f] focus:ring-2 focus:ring-orange-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-[#e8892f]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#e8892f] py-3 font-semibold text-white transition hover:bg-[#d97706] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-[#e8892f] transition hover:text-[#f2a65a]"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;