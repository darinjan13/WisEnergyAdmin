import React, { useEffect, useState } from "react";
import { exportToPDF, exportToDOCX } from "../../../services/exportUtils"; // Import export functions
import {
  fetchAllDevices,
  fetchAllFeedbacks,
  fetchAllReviews,
  fetchAllUsers,
} from "../../../services/apiService";

function Exports() {
  const [fileType, setFileType] = useState("pdf");
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [devices, setDevices] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await fetchAllUsers();
      setUsers(result);
    };
    fetchUsers();
    const fetchAllFeedback = async () => {
      const response = await fetchAllFeedbacks();
      setFeedback(response);
    };
    fetchAllFeedback();
    const fetchDevicesData = async () => {
      try {
        const response = await fetchAllDevices();
        setDevices(response);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevicesData();
    const fetchAllReview = async () => {
      const response = await fetchAllReviews();
      setReviews(response);
      setFilteredReviews(response); // Initialize filteredReviews with all reviews
    };
    fetchAllReview();
  }, []);

  const handleExport = () => {
    const data = {
      users,
      devices,
      reviews,
      feedback,
    };

    switch (fileType) {
      case "pdf":
        exportToPDF(data); // Export to PDF
        break;
      case "docx":
        exportToDOCX(data); // Export to DOCX
        break;
      default:
        alert("Invalid file type");
    }
  };

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-4">Export Reports</h1>
      <div className="mb-4">
        <label htmlFor="fileType" className="mr-2">
          Choose file type:
        </label>
        <select
          id="fileType"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="pdf">PDF</option>
          <option value="docx">DOCX</option>
        </select>
      </div>
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Export
      </button>
    </div>
  );
}

export default Exports;
