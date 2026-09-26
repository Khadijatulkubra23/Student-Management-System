import { useState } from "react";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    department: "",
    gender: "",
    dateOfBirth: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "email",
      "phone",
      "course",
      "department",
    ];

    const missingField = requiredFields.some(
      (field) => !formData[field].trim()
    );

    if (missingField) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/students", formData);

      navigate("/students");
    } catch (error) {
      console.error("Failed to add student:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add student. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/students")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#e8892f]"
        >
          <ArrowLeft size={18} />
          Back to Students
        </button>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#e8892f]">
            Student Management
          </p>

          <h1 className="text-3xl font-bold text-stone-900">
            Add Student
          </h1>

          <p className="mt-2 text-stone-500">
            Add a new student to the management system.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-stone-200 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-[#e8892f]">
              <UserPlus size={22} />
            </div>

            <div>
              <h2 className="font-bold text-stone-900">
                Student Information
              </h2>

              <p className="text-sm text-stone-500">
                Enter the student's details below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Phone *
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XX XXXXXXX"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Course *
                </label>

                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Department *
                </label>

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-stone-700">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/students")}
                className="rounded-lg border border-stone-300 px-5 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#e8892f] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#d97706] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddStudent;