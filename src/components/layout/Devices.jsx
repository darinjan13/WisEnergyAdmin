import React, { useState, useEffect } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { fetchAllDevices } from "../../../services/apiService";
import { useSearch } from "../SearchContext"; // adjust path if deeper

function Devices() {
  const { searchQuery } = useSearch();
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState(""); // Start date filter
  const [endDateFilter, setEndDateFilter] = useState(""); // End date filter
  const [statusFilter, setStatusFilter] = useState(""); // Status filter

  useEffect(() => {
    const fetchDevicesData = async () => {
      try {
        const response = await fetchAllDevices();
        setDevices(response);
        setFilteredDevices(response); // Initialize filteredDevices with all devices
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevicesData();
  }, []);

  useEffect(() => {
    let filtered = devices;

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((d) => d.status === statusFilter);
    }

    // Date filter
    if (startDateFilter && endDateFilter) {
      const start = new Date(startDateFilter);
      const end = new Date(endDateFilter);
      filtered = filtered.filter((d) => {
        const date = new Date(d.register_at?.split("T")[0]);
        return date >= start && date <= end;
      });
    }

    // 🔍 Global search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.id.toLowerCase().includes(q) ||
          d.device_nickname?.toLowerCase().includes(q) ||
          d.owner?.toLowerCase().includes(q) ||
          d.pairing_code?.toLowerCase().includes(q) ||
          d.status?.toLowerCase().includes(q)
      );
    }

    setFilteredDevices(filtered);
  }, [devices, statusFilter, startDateFilter, endDateFilter, searchQuery]);

  // Reset all filters
  const handleResetFilters = () => {
    setStatusFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Devices</h1>

      {/* Filter bar */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3 mb-6">
        <div className="flex items-center divide-x divide-gray-200">
          <div className="flex items-center gap-2 px-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter By</span>
          </div>

          <div className="px-4">
            <select
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="paired">Paired</option>
              <option value="unpaired">Unpaired</option>
            </select>
          </div>

          {/* Start Date Filter with Text */}
          <div className="px-2">
            <label
              htmlFor="startDate"
              className="font-semibold text-sm text-gray-700 mr-2"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
            />
          </div>

          {/* End Date Filter with Text */}
          <div className="px-2">
            <label
              htmlFor="endDate"
              className="font-semibold text-sm text-gray-700 mr-2"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
            />
          </div>

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

      {/* Devices Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-200 text-left text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Device Name</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Pairing Code</th>
              <th className="p-3">Paired At</th>
              <th className="p-3">Registered At</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((d, index) => (
              <tr
                key={d.device_id || index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{d.id}</td>
                <td className="p-3">{d.device_nickname}</td>
                <td className="p-3">{d.owner}</td>
                <td className="p-3">{d.pairing_code}</td>
                <td className="p-3">{d.paired_at?.split("T")[0]}</td>
                <td className="p-3">{d.register_at?.split("T")[0]}</td>
                <td className="p-3">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <p>
          Showing 1-{filteredDevices.length} of {filteredDevices.length}
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

export default Devices;
