import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Devices from "./Devices";
import Reviews from "./Reviews";
import Feedback from "./Feedback";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar
        collapsed={collapsed}
        onCollapse={() => setCollapsed((prev) => !prev)}
        activePath={location.pathname}
      />
      <div
        className="flex-1 flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, #F1FEEB 0%, #D6F0F7 50%, #D2F2E1 100%)",
        }}
      >
        <Header
          collapsed={collapsed}
          onMenuClick={() => setCollapsed((prev) => !prev)}
        />

        {/* Routes */}
        <Routes>
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Users */}
          <Route path="users" element={<Users />} />

          {/* Devices */}
          <Route path="devices" element={<Devices />} />

          {/* Reviews */}
          <Route path="reviews" element={<Reviews />} />

          {/* Feedback */}
          <Route path="feedback" element={<Feedback />} />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
