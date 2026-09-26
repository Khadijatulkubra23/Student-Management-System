import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Students = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [searchParams, setSearchParams] = useSearchParams();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/students", {
        params: {
          search,
          page: currentPage,
          limit: 8,
        },
      });

      setStudents(response.data.students || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalStudents(response.data.totalStudents || 0);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, currentPage]);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);
    setCurrentPage(1);

    setSearchParams({
      ...(value ? { search: value } : {}),
      page: "1",
    });
  };

  const handleDelete = async () => {
    if (!deleteStudentId || !isAdmin) return;

    try {
      setDeleting(true);

      await api.delete(`/students/${deleteStudentId}`);

      setDeleteStudentId(null);

      if (students.length === 1 && currentPage > 1) {
        setCurrentPage((page) => page - 1);
      } else {
        fetchStudents();
      }
    } catch (error) {
      console.error("Failed to delete student:", error);
    } finally {
      setDeleting(false);
    }
  };

  const getStatus = () => {
    return "Active";
  };

  return (
    <div className="min-h-screen bg-stone-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              Students
            </h1>

            <p className="mt-1 text-sm text-stone-500">
              Manage and view registered students
            </p>
          </div>

          {isAdmin && (
            <Link
              to="/students/add"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e8892f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]"
            >
              <Plus size={18} />
              Add Student
            </Link>
          )}
        </div>

        <div className="mb-6 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="relative max-w-md">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search students..."
              className="w-full rounded-lg border border-stone-300 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-900 outline-none transition focus:border-[#e8892f] focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="border-b border-stone-200 bg-stone-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-stone-500"
                    >
                      Loading students...
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-sm text-stone-500"
                    >
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr
                      key={student._id}
                      className="transition hover:bg-stone-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-[#e8892f]">
                            {student.name?.charAt(0)?.toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-stone-900">
                              {student.name}
                            </p>

                            <p className="text-xs text-stone-500">
                              {student.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-stone-600">
                        {student.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-stone-600">
                        {student.course}
                      </td>

                      <td className="px-6 py-4 text-sm text-stone-600">
                        {student.department}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          {getStatus(student)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/students/${student._id}`}
                            className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 hover:text-[#e8892f]"
                            title="View Student"
                          >
                            <Eye size={18} />
                          </Link>

                          {isAdmin && (
                            <>
                              <Link
                                to={`/students/${student._id}/edit`}
                                className="rounded-lg p-2 text-stone-500 transition hover:bg-orange-50 hover:text-[#e8892f]"
                                title="Edit Student"
                              >
                                <Pencil size={18} />
                              </Link>

                              <button
                                onClick={() =>
                                  setDeleteStudentId(student._id)
                                }
                                className="rounded-lg p-2 text-stone-500 transition hover:bg-red-50 hover:text-red-600"
                                title="Delete Student"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && students.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-stone-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-stone-500">
                Showing {students.length} of {totalStudents} students
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                  className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-lg bg-[#e8892f] px-3 py-2 text-sm font-semibold text-white">
                  {currentPage}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                  className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteStudentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-900">
                Delete Student
              </h2>

              <button
                onClick={() => setDeleteStudentId(null)}
                className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm leading-6 text-stone-600">
              Are you sure you want to delete this student? This
              action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteStudentId(null)}
                className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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

export default Students;