import React, { useEffect, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { fetchAllFeedbacks } from "../../../services/apiService";
import { useSearch } from "../SearchContext";

function Feedback() {
  const { searchQuery } = useSearch();
  const [feedback, setFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [dateCreatedFilter, setDateCreatedFilter] = useState("");
  const [dateModifiedFilter, setDateModifiedFilter] = useState("");

  const statusColors = {
    Open: "bg-blue-100 text-blue-600",
    Resolved: "bg-green-100 text-green-600",
    Reviewed: "bg-yellow-100 text-yellow-600",
    "In Progress": "bg-pink-100 text-pink-600",
  };

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const response = await fetchAllFeedbacks();
        // Ensure all items have a date_modified field
        const withModified = response.map((f) => ({
          ...f,
          date_modified: f.date_modified || "",
        }));
        setFeedback(withModified);
        setFilteredFeedback(withModified);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    loadFeedback();
  }, []);

  useEffect(() => {
    let filtered = feedback;

    if (typeFilter) {
      filtered = filtered.filter((f) => f.type === typeFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((f) => f.status === statusFilter);
    }

    if (dateCreatedFilter) {
      const filterDate = new Date(dateCreatedFilter);
      filtered = filtered.filter((f) => {
        const date = new Date(f.date_created);
        return date.toDateString() === filterDate.toDateString();
      });
    }

    // Date Modified filter
    if (dateModifiedFilter) {
      const filterDate = new Date(dateModifiedFilter);
      filtered = filtered.filter((f) => {
        if (!f.date_modified) return false; // skip if not modified yet
        const date = new Date(f.date_modified);
        return date.toDateString() === filterDate.toDateString();
      });
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.id.toLowerCase().includes(q) ||
          f.type?.toLowerCase().includes(q) ||
          f.message?.toLowerCase().includes(q) ||
          f.email?.toLowerCase().includes(q) ||
          f.status?.toLowerCase().includes(q) ||
          f.date_created?.toLowerCase().includes(q) ||
          f.date_modified?.toLowerCase().includes(q)
      );
    }

    setFilteredFeedback(filtered);
  }, [feedback, typeFilter, statusFilter, dateFilter, searchQuery]);

  // Reset all filters
  const handleResetFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
    setDateCreatedFilter("");
    setDateModifiedFilter("");
    setFilteredFeedback(feedback);
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setFeedback((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status: newStatus,
              date_modified: new Date().toISOString().split("T")[0],
            }
          : f
      )
    );
  };

  return (
    <div className="p-6">
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
          {/* Date Modified Filter */}
          <div className="px-4">
            <label
              htmlFor="dateModified"
              className="font-semibold text-sm text-gray-700 mr-2"
            >
              Date Modified
            </label>
            <input
              type="date"
              id="dateModified"
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
              value={dateModifiedFilter}
              onChange={(e) => setDateModifiedFilter(e.target.value)}
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
              <th className="p-3">Date Modified</th>
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
                  {f.date_modified ? f.date_modified : "-"}
                </td>
                <td className="p-3">
                  <select
                    value={f.status}
                    onChange={(e) => handleStatusChange(f.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[f.status]
                    }`}
                  >
                    <option value="Open">Open</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="In Progress">In Progress</option>
                  </select>
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
