import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Search,
  Users,
  UserPlus,
  Building2,
} from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
    totalCourses: 0,
    recentStudents: [],
    overview: [],
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/students/stats");

        setStats({
          totalStudents: response.data.totalStudents || 0,
          totalDepartments: response.data.totalDepartments || 0,
          totalCourses: response.data.totalCourses || 0,
          recentStudents: response.data.recentStudents || [],
          overview: response.data.overview || [],
        });
      } catch (error) {
        console.error("Failed to fetch dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      navigate("/students");
      return;
    }

    navigate(`/students?search=${encodeURIComponent(search.trim())}`);
  };

  const chartData = useMemo(() => {
    if (stats.overview.length === 0) return [];

    const sorted = [...stats.overview].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    return sorted.slice(-8);
  }, [stats.overview]);

  const chartWidth = 700;
  const chartHeight = 280;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  const maxCount =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => item.count), 1)
      : 1;

  const points = chartData.map((item, index) => {
    const x =
      chartData.length === 1
        ? chartWidth / 2
        : paddingLeft +
          (index / (chartData.length - 1)) * plotWidth;

    const y =
      paddingTop +
      plotHeight -
      (item.count / maxCount) * plotHeight;

    return {
      ...item,
      x,
      y,
    };
  });

  const linePath =
    points.length > 0
      ? points
          .map((point, index) =>
            index === 0
              ? `M ${point.x} ${point.y}`
              : `L ${point.x} ${point.y}`
          )
          .join(" ")
      : "";

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${
          paddingTop + plotHeight
        } L ${points[0].x} ${paddingTop + plotHeight} Z`
      : "";

  const monthName = (month) => {
    return new Date(2000, month - 1, 1).toLocaleString("en-US", {
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold capitalize text-[#d97706]">
                {user?.role || "user"}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
              Welcome back, {user?.name || "User"} 👋
            </h1>

            <p className="mt-1 text-sm text-stone-500">
              Here's what's happening with your student management
              system.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="relative w-full lg:max-w-sm"
          >
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full rounded-lg border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 outline-none transition focus:border-[#e8892f] focus:ring-2 focus:ring-orange-100"
            />
          </form>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">Total Students</p>

                <p className="mt-2 text-3xl font-bold text-stone-900">
                  {loading ? "—" : stats.totalStudents}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#e8892f]">
                <Users size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">
                  Recent Registrations
                </p>

                <p className="mt-2 text-3xl font-bold text-stone-900">
                  {loading ? "—" : stats.recentStudents.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#e8892f]">
                <UserPlus size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">Departments</p>

                <p className="mt-2 text-3xl font-bold text-stone-900">
                  {loading ? "—" : stats.totalDepartments}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#e8892f]">
                <Building2 size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">Total Courses</p>

                <p className="mt-2 text-3xl font-bold text-stone-900">
                  {loading ? "—" : stats.totalCourses}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#e8892f]">
                <BookOpen size={23} />
              </div>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="mb-8 rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8892f] text-white">
                  <GraduationCap size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-stone-900">
                    Administrator Access
                  </h2>

                  <p className="mt-1 text-sm text-stone-600">
                    You can add, edit, and delete student records.
                  </p>
                </div>
              </div>

              <Link
                to="/students/add"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e8892f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d97706]"
              >
                <UserPlus size={17} />
                Add Student
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-stone-900">
                Student Overview
              </h2>

              <p className="mt-1 text-sm text-stone-500">
                Student registrations over time
              </p>
            </div>

            {chartData.length === 0 ? (
              <div className="flex h-72 items-center justify-center text-sm text-stone-400">
                No registration data available yet.
              </div>
            ) : (
              <div className="w-full overflow-hidden">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="h-72 w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="chartFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#e8892f"
                        stopOpacity="0.25"
                      />
                      <stop
                        offset="100%"
                        stopColor="#e8892f"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {[0, 1, 2, 3].map((line) => {
                    const y =
                      paddingTop +
                      (plotHeight / 3) * line;

                    const value = Math.round(
                      maxCount - (maxCount / 3) * line
                    );

                    return (
                      <g key={line}>
                        <line
                          x1={paddingLeft}
                          x2={chartWidth - paddingRight}
                          y1={y}
                          y2={y}
                          stroke="#e7e5e4"
                          strokeWidth="1"
                          strokeDasharray="4 5"
                        />

                        <text
                          x="8"
                          y={y + 4}
                          fill="#a8a29e"
                          fontSize="11"
                        >
                          {value}
                        </text>
                      </g>
                    );
                  })}

                  <path
                    d={areaPath}
                    fill="url(#chartFill)"
                  />

                  <path
                    d={linePath}
                    fill="none"
                    stroke="#e8892f"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {points.map((point, index) => (
                    <g key={`${point.year}-${point.month}-${index}`}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="6"
                        fill="white"
                        stroke="#e8892f"
                        strokeWidth="3"
                      />

                      <text
                        x={point.x}
                        y={chartHeight - 10}
                        textAnchor="middle"
                        fill="#78716c"
                        fontSize="11"
                      >
                        {monthName(point.month)}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-stone-900">
                  Recent Registrations
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Recently added students
                </p>
              </div>

              <Link
                to="/students"
                className="text-sm font-semibold text-[#e8892f] hover:text-[#d97706]"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {stats.recentStudents.length === 0 ? (
                <p className="py-8 text-center text-sm text-stone-400">
                  No students registered yet.
                </p>
              ) : (
                stats.recentStudents.map((student) => (
                  <Link
                    key={student._id}
                    to={`/students/${student._id}`}
                    className="flex items-center justify-between rounded-lg p-3 transition hover:bg-stone-50"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-[#e8892f]">
                        {student.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-stone-900">
                          {student.name}
                        </p>

                        <p className="truncate text-xs text-stone-500">
                          {student.course}
                        </p>
                      </div>
                    </div>

                    <span className="ml-3 shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      Active
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;