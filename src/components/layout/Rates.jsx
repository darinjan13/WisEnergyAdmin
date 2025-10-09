import React, { useEffect, useState } from "react";
import { Filter, RotateCcw, Plus, Edit2, Trash2 } from "lucide-react";
import RateModal from "./RateModal";
import ConfirmModal from "./ConfirmModal";
import { useSearch } from "../SearchContext";
import {
  fetchAllRates,
  addOrUpdateRate,
  deleteRate,
} from "../../../services/apiService";

function Rates() {
  const { searchQuery } = useSearch();

  const [showRateModal, setShowRateModal] = useState(false);
  const [editRate, setEditRate] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [rates, setRates] = useState([]);
  const [filteredRates, setFilteredRates] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRates = async () => {
      setLoading(true);
      const data = await fetchAllRates();
      setRates(data || []);
      setFilteredRates(data || []);
      setLoading(false);
    };
    loadRates();
  }, []);

  // Extract available years dynamically
  const availableYears = Array.from(new Set(rates.map((r) => r.year))).sort(
    (a, b) => b - a
  );

  // 🧩 Filter Logic — FIXED MONTH FILTER
  useEffect(() => {
    let filtered = [...rates];

    if (cityFilter) filtered = filtered.filter((r) => r.city === cityFilter);
    if (yearFilter) filtered = filtered.filter((r) => String(r.year) === yearFilter);

    if (monthFilter) {
      // Extract just month (MM) part from filter
      const monthOnly = monthFilter.split("-")[1];
      filtered = filtered.filter((r) => {
        const rMonth = r.month.includes("-") ? r.month.split("-")[1] : r.month;
        return rMonth === monthOnly;
      });
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.city?.toLowerCase().includes(q) ||
          String(r.rate).includes(q) ||
          String(r.year).includes(q) ||
          String(r.month).includes(q)
      );
    }

    setFilteredRates(filtered);
  }, [rates, cityFilter, yearFilter, monthFilter, searchQuery]);

  const handleResetFilters = () => {
    setCityFilter("");
    setYearFilter("");
    setMonthFilter("");
    setFilteredRates(rates);
  };

  const handleSubmit = async (formData) => {
    const payload = {
      city: formData.city,
      year: parseInt(formData.month.split("-")[0]),
      month: formData.month.split("-")[1],
      rate: parseFloat(formData.rate),
    };
    const res = await addOrUpdateRate(payload);

    if (res.success) {
      const updated = await fetchAllRates();
      setRates(updated);
      setShowRateModal(false);
      setEditRate(null);
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { city, month } = deleteTarget;
    const [year, m] = month.split("-");
    const res = await deleteRate(city, year, m);

    if (res.success) {
      setRates((prev) => prev.filter((x) => x.id !== deleteTarget.id));
    } else {
      alert(res.message);
    }
    setDeleteTarget(null);
    setShowConfirmModal(false);
  };

  return (
    <>
      <RateModal
        isOpen={showRateModal}
        onClose={() => {
          setShowRateModal(false);
          setEditRate(null);
        }}
        onSubmit={handleSubmit}
        initialData={editRate}
        mode={editRate ? "edit" : "create"}
      />

      <div className="p-6">
        <h1 className="text-2xl font-bold mt-0 mb-3">Electricity Rates</h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between rounded-lg py-3 mb-4">
          <div className="flex flex-wrap items-center gap-4 bg-white rounded-lg shadow px-4 py-3 w-full lg:w-auto">
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
                className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none"
              >
                <option value="">All Cities</option>
                <option value="Mandaue City">Mandaue City</option>
                <option value="Lapu-Lapu City">Lapu-Lapu City</option>
              </select>
            </div>

            {/* Year Dropdown */}
            <div className="px-2">
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none"
              >
                <option value="">All Years</option>
                {availableYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* 🗓️ Month Picker (clickable calendar) */}
            <div className="px-2 flex items-center gap-2">
              <div
                className="border rounded-md px-2 py-1 text-sm text-gray-700 bg-white cursor-pointer hover:border-green-500 transition-all"
                onClick={() => document.getElementById("month").showPicker?.()}
              >
                {monthFilter
                  ? new Date(monthFilter).toLocaleString("default", { month: "long" })
                  : "Select Month"}
                <input
                  id="month"
                  type="month"
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
              </div>
            </div>

            {/* Reset Button */}
            <div className="px-2">
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Add Button */}
          <div className="mt-3 lg:mt-0 lg:ml-auto">
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
          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading...</p>
          ) : filteredRates.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No rates found.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-200 text-left text-gray-700">
                  <th className="p-3">ID</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Year</th>
                  <th className="p-3">Month</th>
                  <th className="p-3">Rate (₱/kWh)</th>
                  <th className="p-3">Date Created</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRates.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3">{r.id}</td>
                    <td className="p-3">{r.city}</td>
                    <td className="p-3">{r.year}</td>
                    <td className="p-3">
                      {r.month.includes("-")
                        ? r.month.split("-")[1]
                        : r.month}
                    </td>
                    <td className="p-3">{r.rate}</td>
                    <td className="p-3">{r.set_at?.split(" ")[0]}</td>
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
                          setDeleteTarget(r);
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
          )}
        </div>

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => {
            setDeleteTarget(null);
            setShowConfirmModal(false);
          }}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete the rate for ${deleteTarget?.city} (${deleteTarget?.month})?`}
        />
      </div>
    </>
  );
}

export default Rates;
