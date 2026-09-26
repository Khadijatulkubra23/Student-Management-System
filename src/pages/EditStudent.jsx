import { useEffect, useState } from "react";
import { ArrowLeft, Save, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditStudent = () => {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`);

        const student = response.data.student || response.data;

        setFormData({
          name: student.name || "",
          email: student.email || "",
          phone: student.phone || "",
          course: student.course || "",
          department: student.department || "",
          gender: student.gender || "",
          dateOfBirth: student.dateOfBirth
            ? student.dateOfBirth.split("T")[0]
            : "",
          address: student.address || "",
        });
      } catch (error) {
        console.error("Failed to fetch student:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load student."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course.trim() ||
      !formData.department.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);

      await api.put(`/students/${id}`, formData);

      navigate(`/students/${id}`);
    } catch (error) {
      console.error("Failed to update student:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update student."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-100 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl py-20 text-center text-stone-500">
          Loading student information...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-100 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => navigate(`/students/${id}`)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-[#e8892f]"
        >
          <ArrowLeft size={18} />
          Back to Student Details
        </button>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#e8892f]">
            Student Management
          </p>

          <h1 className="text-3xl font-bold text-stone-900">
            Edit Student
          </h1>

          <p className="mt-2 text-stone-500">
            Update the student's information below.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

          <div className="flex items-center gap-4 border-b border-stone-200 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-[#e8892f]">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className="font-bold text-stone-900">
                Student Information
              </h2>

              <p className="text-sm text-stone-500">
                Edit the student's details.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">

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
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
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
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
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
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
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
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
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
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
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
                  className="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>

            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => navigate(`/students/${id}`)}
                className="rounded-lg border border-stone-300 px-5 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#e8892f] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#d97706] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {saving ? "Updating..." : "Update Student"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
};

export default EditStudent;