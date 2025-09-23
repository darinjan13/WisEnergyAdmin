import React, { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";

function Feedback() {
  const [feedback] = useState([
    {
      id: "00001",
      type: "Bug Report",
      message: "How to purchase?",
      email: "sample@gmail.com",
      location: "Mandaue City",
      created: "2025-03-14",
      status: "Resolved",
    },
    {
      id: "00002",
      type: "Suggestion",
      message: "How to purchase?",
      email: "sample@gmail.com",
      location: "Mandaue City",
      created: "2025-03-14",
      status: "Open",
    },
    {
      id: "00003",
      type: "Question",
      message: "How to purchase?",
      email: "sample@gmail.com",
      location: "Mandaue City",
      created: "2025-03-14",
      status: "Open",
    },
    {
      id: "00006",
      type: "Bug Report",
      message: "How to purchase?",
      email: "sample@gmail.com",
      location: "Lapu-lapu City",
      created: "2025-03-14",
      status: "Reviewed",
    },
    {
      id: "00008",
      type: "Suggestion",
      message: "How to purchase?",
      email: "sample@gmail.com",
      location: "Lapu-lapu City",
      created: "2025-03-14",
      status: "In Progress",
    },
  ]);

  const statusColors = {
    Open: "bg-blue-100 text-blue-600",
    Resolved: "bg-green-100 text-green-600",
    Reviewed: "bg-yellow-100 text-yellow-600",
    "In Progress": "bg-pink-100 text-pink-600",
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Feedback</h1>

      {/* Filter bar */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3 mb-6">
        <div className="flex items-center divide-x divide-gray-200">
          <div className="flex items-center gap-2 px-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter By</span>
          </div>

          {/* Type Filter */}
          <div className="px-4">
            <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
              <option>Type</option>
              <option>Bug Report</option>
              <option>Suggestion</option>
              <option>Question</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="px-4">
            <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
              <option>Status</option>
              <option>Open</option>
              <option>Resolved</option>
              <option>Reviewed</option>
              <option>In Progress</option>
            </select>
          </div>

          {/* Date Created */}
          <div className="px-4">
            <input
              type="date"
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
            />
          </div>

          {/* Reset Filter */}
          <div className="px-4">
            <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium">
              <RotateCcw className="w-4 h-4" />
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-200 text-left text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Message</th>
              <th className="p-3">Email</th>
              <th className="p-3">Location</th>
              <th className="p-3">Date Created</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((f) => (
              <tr
                key={f.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{f.id}</td>
                <td className="p-3">{f.type}</td>
                <td className="p-3">{f.message}</td>
                <td className="p-3">{f.email}</td>
                <td className="p-3">{f.location}</td>
                <td className="p-3">{f.created}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[f.status]
                    }`}
                  >
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <p>Showing 1-{feedback.length} of 78</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            &lt;
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
