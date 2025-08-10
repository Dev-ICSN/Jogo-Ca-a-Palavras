import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;