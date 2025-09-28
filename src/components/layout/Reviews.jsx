import React, { useEffect, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { fetchAllReviews } from "../../../services/apiService";
import { useSearch } from "../SearchContext";
function Reviews() {
  const { searchQuery } = useSearch();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(""); // Filter for rating
  const [dateFilter, setDateFilter] = useState(""); // Filter for date
  const renderStars = (count) => {
    const filled = "★".repeat(count);
    const empty = "☆".repeat(5 - count);
    return filled + empty;
  };
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetchAllReviews();
        setReviews(response);
        setFilteredReviews(response);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    loadReviews();
  }, []);

  useEffect(() => {
    let filtered = reviews;

    // Rating filter
    if (ratingFilter) {
      const ratingValue = parseInt(ratingFilter[0], 10);
      filtered = filtered.filter((r) => r.rating === ratingValue);
    }

    // Date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((r) => {
        const date = new Date(r.created_at);
        return date.toDateString() === filterDate.toDateString();
      });
    }

    // 🔍 Global search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.message?.toLowerCase().includes(q) ||
          r.email?.toLowerCase().includes(q) ||
          String(r.rating).includes(q) ||
          r.created_at?.toLowerCase().includes(q)
      );
    }

    setFilteredReviews(filtered);
  }, [reviews, ratingFilter, dateFilter, searchQuery]);

  // Reset all filters
  const handleResetFilters = () => {
    setRatingFilter("");
    setDateFilter("");
    setFilteredReviews(reviews); // Reset to all reviews
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>

      {/* Filter bar */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3 mb-6">
        <div className="flex items-center divide-x divide-gray-200">
          <div className="flex items-center gap-2 px-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter By</span>
          </div>

          {/* Rating Filter */}
          <div className="px-4">
            <select
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">Rating</option>
              <option value="5 Stars">5 Stars</option>
              <option value="4 Stars">4 Stars</option>
              <option value="3 Stars">3 Stars</option>
              <option value="2 Stars">2 Stars</option>
              <option value="1 Star">1 Star</option>
            </select>
          </div>

          {/* Date Filter */}
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

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-200 text-left text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Message</th>
              <th className="p-3">Email</th>
              <th className="p-3">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews?.map((r) => (
              <tr
                key={r.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{r.id}</td>
                <td className="p-3">{renderStars(r.rating)}</td>
                <td className="p-3">{r.message}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <p>
          Showing 1-{filteredReviews?.length} of {filteredReviews?.length}
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

export default Reviews;
