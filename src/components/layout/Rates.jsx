import React, { useEffect, useState } from "react";
import { Filter, RotateCcw, Plus, Edit2, Trash2 } from "lucide-react";
import RateModal from "./RateModal";
import ConfirmModal from "./ConfirmModal";
import { useSearch } from "../SearchContext";

function Rates() {
  const { searchQuery } = useSearch();

  const [showRateModal, setShowRateModal] = useState(false);
  const [editRate, setEditRate] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  // Sample data
  const [rates, setRates] = useState([
    {
      id: "0001",
      city: "Mandaue City",
      month: "2025-09",
      rate: 12.34,
      created_at: "2025-09-01",
    },
    {
      id: "0002",
      city: "Lapu-Lapu City",
      month: "2025-09",
      rate: 11.89,
      created_at: "2025-09-01",
    },
  ]);
  const [filteredRates, setFilteredRates] = useState(rates);

  // Filter states
  const [cityFilter, setCityFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    let filtered = rates;

    // Apply filters
    if (cityFilter) {
      filtered = filtered.filter((r) => r.city === cityFilter);
    }
    if (monthFilter) {
      filtered = filtered.filter((r) => r.month === monthFilter);
    }

    // 🔍 Global search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.city?.toLowerCase().includes(q) ||
          r.month?.toLowerCase().includes(q) ||
          String(r.rate).includes(q)
      );
    }

    setFilteredRates(filtered);
  }, [rates, cityFilter, monthFilter, searchQuery]);

  // Reset filters
  const handleResetFilters = () => {
    setCityFilter("");
    setMonthFilter("");
    setFilteredRates(rates);
  };

  return (
    <>
      {/* Modal */}
      <RateModal
        isOpen={showRateModal}
        onClose={() => setShowRateModal(false)}
        onSubmit={(formData) => {
          if (editRate) {
            // Update existing rate
            setRates((prev) =>
              prev.map((r) =>
                r.id === editRate.id ? { ...r, ...formData } : r
              )
            );
          } else {
            // Add new rate
            const newRate = {
              id: String(rates.length + 1).padStart(4, "0"),
              ...formData,
              created_at: new Date().toISOString().split("T")[0],
            };
            setRates((prev) => [...prev, newRate]);
          }
          setShowRateModal(false);
        }}
        initialData={editRate}
        mode={editRate ? "edit" : "create"}
      />

      {/* Page Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mt-0 mb-3">Electricity Rates</h1>

        {/* Filter bar */}
        <div className="flex items-center justify-between rounded-lg py-3 mb-2">
          <div className="flex items-center gap-4 bg-white rounded-lg shadow px-4 py-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filter By
              </span>
            </div>

            {/* City Filter */}
            <div className="px-2">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none"
              >
                <option value="">City</option>
                <option value="Mandaue City">Mandaue City</option>
                <option value="Lapu-Lapu City">Lapu-Lapu City</option>
              </select>
            </div>

            {/* Month Filter */}
            <div className="px-2">
              <label
                htmlFor="month"
                className="font-semibold text-sm text-gray-700 mr-2"
              >
                Month
              </label>
              <input
                id="month"
                type="month"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none"
              />
            </div>

            {/* Reset */}
            <div className="px-2">
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filter
              </button>
            </div>
          </div>

          {/* Plus button */}
          <div className="ml-auto">
            <button
              onClick={() => {
                setEditRate(null);
                setShowRateModal(true);
              }}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#43A866] text-white hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-200 text-left text-gray-700">
                <th className="p-3">ID</th>
                <th className="p-3">City</th>
                <th className="p-3">Month</th>
                <th className="p-3">Rate (₱/kWh)</th>
                <th className="p-3">Date Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRates?.map((r) => (
                <tr
                  key={r.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{r.id}</td>
                  <td className="p-3">{r.city}</td>
                  <td className="p-3">{r.month}</td>
                  <td className="p-3">{r.rate}</td>
                  <td className="p-3">{r.created_at}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditRate(r);
                        setShowRateModal(true);
                      }}
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget(r); // store the rate to delete
                        setShowConfirmModal(true);
                      }}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmModal
            isOpen={showConfirmModal}
            onClose={() => {
              setDeleteTarget(null);
              setShowConfirmModal(false);
            }}
            onConfirm={() => {
              setRates((prev) => prev.filter((x) => x.id !== deleteTarget.id));
              setDeleteTarget(null);
              setShowConfirmModal(false);
            }}
            message={`Are you sure you want to delete the rate for ${deleteTarget?.city} (${deleteTarget?.month})?`}
          />
        </div>
      </div>
    </>
  );
}

export default Rates;
