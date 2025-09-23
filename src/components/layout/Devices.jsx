import React, { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";

function Devices() {
  const [devices] = useState([
    {
      id: "00001",
      deviceName: "Twinky",
      email: "sample@gmail.com",
      pairingCode: "ABC123",
      pairedAt: "2025-03-14",
      registeredAt: "2025-03-14",
      status: "Active",
    },
    {
      id: "00002",
      deviceName: "Rosie",
      email: "sample@gmail.com",
      pairingCode: "XYZ789",
      pairedAt: "2025-03-14",
      registeredAt: "2025-03-14",
      status: "Inactive",
    },
  ]);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Devices</h1>

      {/* Filter bar */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3 mb-6">
        {/* Left side: Filter options */}
        <div className="flex items-center divide-x divide-gray-200">
          <div className="flex items-center gap-2 px-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter By</span>
          </div>

          {/* Location */}
          <div className="px-4">
            <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
              <option>Location</option>
              <option>Mandaue City</option>
              <option>Lapu-lapu City</option>
            </select>
          </div>

          {/* Status */}
          <div className="px-4">
            <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Date Registered */}
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

      {/* Devices Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-200 text-left text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Device Name</th>
              <th className="p-3">Email (Owner)</th>
              <th className="p-3">Pairing Code</th>
              <th className="p-3">Paired At</th>
              <th className="p-3">Registered At</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr
                key={d.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{d.id}</td>
                <td className="p-3">{d.deviceName}</td>
                <td className="p-3">{d.email}</td>
                <td className="p-3">{d.pairingCode}</td>
                <td className="p-3">{d.pairedAt}</td>
                <td className="p-3">{d.registeredAt}</td>
                <td className="p-3">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <p>Showing 1-{devices.length} of 78</p>
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
