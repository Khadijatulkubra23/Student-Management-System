import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserPlus,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/students",
      icon: Users,
    },
    ...(user?.role === "admin"
      ? [
          {
            name: "Add Student",
            path: "/students/add",
            icon: UserPlus,
          },
        ]
      : []),
    {
      name: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-[#171717] p-2 text-white shadow-lg lg:hidden"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#171717] text-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8892f]">
            <GraduationCap size={23} />
          </div>

          <div>
            <h1 className="text-lg font-bold">Student Manager</h1>
            <p className="text-xs text-stone-400">
              Management System
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#e8892f] text-white"
                      : "text-stone-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-4 rounded-lg bg-white/5 p-3">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name || "User"}
            </p>

            <p className="truncate text-xs text-stone-400">
              {user?.email || "user@example.com"}
            </p>

            <span className="mt-2 inline-block rounded-full bg-[#e8892f]/20 px-2 py-1 text-xs font-medium capitalize text-[#f2a65a]">
              {user?.role || "user"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-stone-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;