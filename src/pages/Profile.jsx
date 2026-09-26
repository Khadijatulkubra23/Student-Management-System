import { Mail, Shield, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const name = user?.name || "User";
  const email = user?.email || "user@example.com";
  const role = user?.role || "user";

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
            My Profile
          </h1>

          <p className="mt-2 text-stone-500">
            View your account information.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="bg-[#171717] px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e8892f] text-3xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>

              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-[#f2a65a]">
                  Account Profile
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  {name}
                </h2>

                <p className="mt-1 text-stone-400">
                  {email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-stone-500">
                  <User size={18} />
                  <span className="text-sm font-medium">
                    Full Name
                  </span>
                </div>

                <p className="font-semibold text-stone-900">
                  {name}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-stone-500">
                  <Mail size={18} />
                  <span className="text-sm font-medium">
                    Email Address
                  </span>
                </div>

                <p className="break-all font-semibold text-stone-900">
                  {email}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 sm:col-span-2">
                <div className="mb-3 flex items-center gap-2 text-stone-500">
                  <Shield size={18} />
                  <span className="text-sm font-medium">
                    Account Role
                  </span>
                </div>

                <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold capitalize text-[#d97706]">
                  {role}
                </span>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-orange-100 bg-orange-50 p-5">
              <h3 className="font-semibold text-stone-900">
                Student Manager Account
              </h3>

              <p className="mt-1 text-sm leading-6 text-stone-600">
                Your account is connected to the Student Management
                System. Your available actions depend on your assigned
                account role.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;