import React, { useEffect, useState } from "react";
import { Users, Plug, Star, MessageSquare } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";

function Dashboard() {
  const api = axios.create({
    baseURL: "https://wisenergy-backend.onrender.com",
  });
  // Mock data (replace with API/DB later)
  const [totalUsers, setTotalUsers] = useState(0);
  const activeDevices = 123;
  const avgRating = 4.23;
  const totalFeedback = 123;

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await api.get("/users");
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    fetchTotalUsers();
  }, []);

  const feedbackTypeData = [
    { name: "Bug Reports", value: 50 },
    { name: "Others", value: 30 },
  ];

  const deviceStatusData = [
    { name: "Active", value: 70 },
    { name: "Inactive", value: 30 },
  ];

  const ratingDistribution = [
    { name: "1 Star", value: 1 },
    { name: "2 Star", value: 2 },
    { name: "3 Star", value: 3 },
    { name: "4 Star", value: 4 },
    { name: "5 Star", value: 5 },
  ];

  const COLORS = ["#43A866", "#90D6B0"];

  return (
    <div className="p-6 space-y-4">
      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-[#24924B] text-white rounded-lg p-6 shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg">Total Users</h3>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
          <Users className="w-10 h-10 opacity-80" />
        </div>

        {/* Active Devices */}
        <div className="bg-[#72C090] text-white rounded-lg p-6 shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg">Active Devices</h3>
            <p className="text-3xl font-bold">{activeDevices}</p>
          </div>
          <Plug className="w-10 h-10 opacity-80" />
        </div>

        {/* Average Rating */}
        <div className="bg-[#A5D6A7] text-white rounded-lg p-6 shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg">Average Rating</h3>
            <p className="text-3xl font-bold">{avgRating}</p>
          </div>
          <Star className="w-10 h-10 opacity-80" />
        </div>

        {/* Total Feedback */}
        <div className="bg-[#43A866] text-white rounded-lg p-6 shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg">Total Feedback</h3>
            <p className="text-3xl font-bold">{totalFeedback}</p>
          </div>
          <MessageSquare className="w-10 h-10 opacity-80" />
        </div>
      </div>

      {/* Tables and Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: Reviews + Feedback */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-3">Recent Reviews</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-200 text-left">
                  <th className="p-2">ID</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Date Submitted</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">5 ⭐</td>
                  <td className="p-2">Great app!</td>
                  <td className="p-2">user1@mail.com</td>
                  <td className="p-2">2025-09-20</td>
                </tr>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">5 ⭐</td>
                  <td className="p-2">Great app!</td>
                  <td className="p-2">user1@mail.com</td>
                  <td className="p-2">2025-09-20</td>
                </tr>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">5 ⭐</td>
                  <td className="p-2">Great app!</td>
                  <td className="p-2">user1@mail.com</td>
                  <td className="p-2">2025-09-20</td>
                </tr>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">5 ⭐</td>
                  <td className="p-2">Great app!</td>
                  <td className="p-2">user1@mail.com</td>
                  <td className="p-2">2025-09-20</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recent Feedback */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-3">Recent Feedback</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-200 text-left">
                  <th className="p-2">ID</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Date Submitted</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Bug</td>
                  <td className="p-2">App crashed</td>
                  <td className="p-2">user2@mail.com</td>
                  <td className="p-2">2025-09-19</td>
                  <td className="p-2">Open</td>
                </tr>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Bug</td>
                  <td className="p-2">App crashed</td>
                  <td className="p-2">user2@mail.com</td>
                  <td className="p-2">2025-09-19</td>
                  <td className="p-2">Open</td>
                </tr>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Bug</td>
                  <td className="p-2">App crashed</td>
                  <td className="p-2">user2@mail.com</td>
                  <td className="p-2">2025-09-19</td>
                  <td className="p-2">Open</td>
                </tr>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Bug</td>
                  <td className="p-2">App crashed</td>
                  <td className="p-2">user2@mail.com</td>
                  <td className="p-2">2025-09-19</td>
                  <td className="p-2">Open</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Charts in one card */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
          {/* Feedback Type Breakdown */}
          <div>
            <h3 className="font-semibold mb-2">Feedback Type Breakdown</h3>
            <ResponsiveContainer width="100%" height={118}>
              <PieChart>
                <Pie
                  data={feedbackTypeData}
                  dataKey="value"
                  outerRadius={55}
                  label
                >
                  {feedbackTypeData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Device Status Overview */}
          <div>
            <h3 className="font-semibold mb-2">Device Status Overview</h3>
            <ResponsiveContainer width="100%" height={118}>
              <PieChart>
                <Pie
                  data={deviceStatusData}
                  dataKey="value"
                  outerRadius={55}
                  label
                >
                  {deviceStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Rating Distribution */}
          <div>
            <h3 className="font-semibold mb-2">Rating Distribution</h3>
            <ResponsiveContainer width="100%" height={118}>
              <BarChart data={ratingDistribution}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#43A866" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
