import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-stone-100">
      <Sidebar />

      <div className="min-h-screen lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;