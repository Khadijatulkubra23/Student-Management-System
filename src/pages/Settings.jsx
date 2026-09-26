import {
  ArrowLeft,
  Bell,
  Lock,
  Moon,
  Shield,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className="min-h-screen bg-stone-100 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#e8892f]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#e8892f]">
            Account
          </p>

          <h1 className="text-3xl font-bold text-stone-900">
            Settings
          </h1>

          <p className="mt-2 text-stone-500">
            Manage your account and application preferences.
          </p>
        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-[#e8892f]">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-stone-900">
                    Account
                  </h2>

                  <p className="text-sm text-stone-500">
                    Manage your account preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-stone-200">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-stone-50"
              >
                <div>
                  <p className="font-semibold text-stone-900">
                    Profile
                  </p>

                  <p className="mt-1 text-sm text-stone-500">
                    View your profile information.
                  </p>
                </div>

                <span className="text-sm font-medium text-[#e8892f]">
                  View
                </span>
              </button>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-[#e8892f]">
                  <Bell size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-stone-900">
                    Notifications
                  </h2>

                  <p className="text-sm text-stone-500">
                    Control how you receive notifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 px-6 py-5">
              <div>
                <p className="font-semibold text-stone-900">
                  Email Notifications
                </p>

                <p className="mt-1 text-sm text-stone-500">
                  Receive important account and system updates.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  notifications
                    ? "bg-[#e8892f]"
                    : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    notifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-[#e8892f]">
                  <Moon size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-stone-900">
                    Appearance
                  </h2>

                  <p className="text-sm text-stone-500">
                    Customize your application appearance.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 px-6 py-5">
              <div>
                <p className="font-semibold text-stone-900">
                  Dark Mode
                </p>

                <p className="mt-1 text-sm text-stone-500">
                  Use a darker interface throughout the application.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  darkMode
                    ? "bg-[#e8892f]"
                    : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    darkMode
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-[#e8892f]">
                  <Shield size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-stone-900">
                    Security
                  </h2>

                  <p className="text-sm text-stone-500">
                    Manage your account security.
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-stone-200">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-stone-50"
              >
                <Lock
                  size={19}
                  className="text-stone-500"
                />

                <div>
                  <p className="font-semibold text-stone-900">
                    Reset Password
                  </p>

                  <p className="mt-1 text-sm text-stone-500">
                    Go to the password recovery page.
                  </p>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Settings;