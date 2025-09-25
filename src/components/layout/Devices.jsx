import React, { useState, useEffect } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { fetchAllDevices, fetchDeviceById } from "../../../services/apiService";

function Devices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevicesData = async () => {
      try {
        const response = await fetchAllDevices();
        setDevices(response);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevicesData();
  }, []);

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
            <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
              <option>Location</option>
              <option>Mandaue City</option>
              <option>Lapu-lapu City</option>
            </select>
          </div>

          <div className="px-4">
            <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="px-4">
            <input
              type="date"
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
            />
          </div>

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
              <th className="p-3">Owner</th>
              <th className="p-3">Pairing Code</th>
              <th className="p-3">Paired At</th>
              <th className="p-3">Registered At</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {devices?.map((d, index) => (
              <tr
                key={d.device_id || index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{d.id}</td>
                <td className="p-3">{d.device_nickname}</td>
                <td className="p-3">{d.owner}</td>
                <td className="p-3">{d.pairing_code}</td>
                <td className="p-3">{d.paired_at}</td>
                <td className="p-3">{d.register_at}</td>
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
