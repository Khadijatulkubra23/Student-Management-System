import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Failed to fetch student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    if (!isAdmin) return;

    try {
      setDeleting(true);

      await api.delete(`/students/${id}`);

      navigate("/students");
    } catch (error) {
      console.error("Failed to delete student:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-stone-500">Loading student...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-stone-100 p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/students"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[#e8892f]"
          >
            <ArrowLeft size={18} />
            Back to Students
          </Link>

          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-stone-900">
              Student not found
            </h2>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = student.enrollmentDate
    ? new Date(student.enrollmentDate).toLocaleDateString()
    : "Not provided";

  const formattedDob = student.dateOfBirth
    ? new Date(student.dateOfBirth).toLocaleDateString()
    : "Not provided";

  return (
    <div className="min-h-screen bg-stone-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/students"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-[#e8892f]"
        >
          <ArrowLeft size={18} />
          Back to Students
        </Link>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="bg-[#171717] px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e8892f] text-2xl font-bold text-white">
                  {student.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {student.name}
                  </h1>

                  <p className="mt-1 text-sm text-stone-400">
                    {student.course}
                  </p>

                  <span className="mt-3 inline-flex rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
                    Active
                  </span>
                </div>
              </div>

              {isAdmin && (
                <div className="flex gap-3">
                  <Link
                    to={`/students/${student._id}/edit`}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
                  >
                    <Edit size={17} />
                    Edit
                  </Link>

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
            <section className="rounded-xl border border-stone-200 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-[#e8892f]">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-stone-900">
                    Personal Information
                  </h2>
                  <p className="text-xs text-stone-500">
                    Student contact details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail className="mt-0.5 text-stone-400" size={18} />
                  <div>
                    <p className="text-xs text-stone-500">Email</p>
                    <p className="text-sm font-medium text-stone-800">
                      {student.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="mt-0.5 text-stone-400" size={18} />
                  <div>
                    <p className="text-xs text-stone-500">Phone</p>
                    <p className="text-sm font-medium text-stone-800">
                      {student.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <User className="mt-0.5 text-stone-400" size={18} />
                  <div>
                    <p className="text-xs text-stone-500">Gender</p>
                    <p className="text-sm font-medium text-stone-800">
                      {student.gender || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Calendar className="mt-0.5 text-stone-400" size={18} />
                  <div>
                    <p className="text-xs text-stone-500">
                      Date of Birth
                    </p>
                    <p className="text-sm font-medium text-stone-800">
                      {formattedDob}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="mt-0.5 text-stone-400" size={18} />
                  <div>
                    <p className="text-xs text-stone-500">Address</p>
                    <p className="text-sm font-medium text-stone-800">
                      {student.address || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-stone-200 p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-[#e8892f]">
                  <Calendar size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-stone-900">
                    Academic Information
                  </h2>
                  <p className="text-xs text-stone-500">
                    Student academic details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-stone-500">Course</p>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {student.course}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-stone-500">Department</p>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {student.department}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-stone-500">
                    Enrollment Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-stone-800">
                    {formattedDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-stone-500">Student ID</p>
                  <p className="mt-1 break-all text-sm font-semibold text-stone-800">
                    {student._id}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-stone-900">
              Delete Student
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-stone-900">
                {student.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;