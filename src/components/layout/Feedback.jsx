import React, { useEffect, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { fetchAllFeedbacks } from "../../../services/apiService";

function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [typeFilter, setTypeFilter] = useState(""); // Type filter
  const [statusFilter, setStatusFilter] = useState(""); // Status filter
  const [dateFilter, setDateFilter] = useState(""); // Date filter

  const statusColors = {
    Open: "bg-blue-100 text-blue-600",
    Resolved: "bg-green-100 text-green-600",
    Reviewed: "bg-yellow-100 text-yellow-600",
    "In Progress": "bg-pink-100 text-pink-600",
  };

  useEffect(() => {
    const fetchAllFeedback = async () => {
      const response = await fetchAllFeedbacks();
      setFeedback(response);
      setFilteredFeedback(response); // Initialize filteredFeedback with all feedback
    };
    fetchAllFeedback();
  }, []);

  useEffect(() => {
    let filtered = feedback;

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter((f) => f.type === typeFilter);
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((f) => f.status === statusFilter);
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((f) => {
        const feedbackDate = new Date(f.date_created);
        return feedbackDate.toDateString() === filterDate.toDateString(); // Only matches the selected date
      });
    }

    setFilteredFeedback(filtered);
  }, [typeFilter, statusFilter, dateFilter, feedback]);

  // Reset all filters
  const handleResetFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
    setDateFilter("");
    setFilteredFeedback(feedback); // Reset to all feedback
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
            <select
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Type</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Question">Question</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="px-4">
            <select
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Open">Open</option>
              <option value="Resolved">Resolved</option>
              <option value="Reviewed">Reviewed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          {/* Date Created Filter */}
          <div className="px-4">
            <label
              htmlFor="dateCreated"
              className="font-semibold text-sm  text-gray-700 mr-2"
            >
              Date Created
            </label>
            <input
              type="date"
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          {/* Reset Filter */}
          <div className="px-4">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium"
            >
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
              <th className="p-3">Date Created</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedback?.map((f) => (
              <tr
                key={f.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{f.id}</td>
                <td className="p-3">{f.type}</td>
                <td className="p-3">{f.message}</td>
                <td className="p-3">{f.email}</td>
                <td className="p-3">{f.date_created}</td>
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
        <p>
          Showing 1-{filteredFeedback?.length} of {filteredFeedback?.length}
        </p>
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
