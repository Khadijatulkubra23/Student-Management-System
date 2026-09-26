import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      setMessage(
        "If an account with this email exists, password reset instructions have been sent."
      );
      setEmail("");
    } catch (error) {
      console.error("Forgot password error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171717] px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#e8892f] text-white shadow-lg">
            <LockKeyhole size={27} />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Forgot Password?
          </h1>

          <p className="mt-3 text-stone-400">
            Enter your email address and we'll help you reset your
            password.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
          {message && (
            <div className="mb-6 flex gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle
                size={19}
                className="mt-0.5 shrink-0"
              />

              <p>{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="mb-2 block text-sm font-semibold text-stone-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-stone-300 bg-stone-50 py-3 pl-10 pr-4 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-[#e8892f] px-5 py-3 font-semibold text-white transition hover:bg-[#d97706] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          <div className="mt-6 border-t border-stone-200 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-[#e8892f]"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;