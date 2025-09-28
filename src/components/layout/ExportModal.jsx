import React, { useState } from "react";
import { exportToPDF, exportToDOCX } from "../../../services/exportUtils"; // Assuming export utilities are imported

function ExportModal({ onClose, data }) {
  const [fileType, setFileType] = useState("pdf");

  const handleExport = () => {
    switch (fileType) {
      case "pdf":
        exportToPDF(data);
        break;
      case "docx":
        exportToDOCX(data);
        break;
      default:
        alert("Invalid file type");
    }
    onClose(); // Close the modal after export
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Generate Report</h2>
        <div className="modal-content">
          <label htmlFor="fileType">Choose file type:</label>
          <select
            id="fileType"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
          </select>
          <div className="modal-actions">
            <button onClick={handleExport}>Export</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;
