import React, { useEffect, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { fetchAllReviews } from "../../../services/apiService";

function Reviews() {
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchAllReview = async () => {
      const response = await fetchAllReviews();
      setReviews(response);
    };
    fetchAllReview();
  }, []);

  // Helper to render stars
  const renderStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

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
            <select className="bg-transparent text-sm text-gray-700 focus:outline-none">
              <option>Rating</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
              <option>2 Stars</option>
              <option>1 Star</option>
            </select>
          </div>

          {/* Date Filter */}
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
            {reviews?.map((r) => (
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
        <p>Showing 1-{reviews?.length} of 78</p>
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
