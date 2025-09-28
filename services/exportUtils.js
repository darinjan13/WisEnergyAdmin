import { jsPDF } from "jspdf"; // For PDF export
import "jspdf-autotable"; // autoTable plugin for tables in PDFs
import PizZip from "pizzip"; // For DOCX export
import Docxtemplater from "docxtemplater"; // For DOCX export

// Helper function to compute summary statistics
const getSummaryStats = (data) => {
  if (
    !data ||
    !Array.isArray(data.users) ||
    !Array.isArray(data.devices) ||
    !Array.isArray(data.reviews) ||
    !Array.isArray(data.feedback)
  ) {
    throw new Error("Invalid or missing data arrays");
  }

  return {
    reportDateTime: new Date().toISOString().split("T")[0], // e.g., "2025-09-27"
    totalUsers: data.users.length,
    totalDevices: (data.devices || []).filter(
      (device) => (device.status || "").toLowerCase() === "paired"
    ).length,
    averageRating:
      data.reviews.length > 0
        ? (
            data.reviews.reduce(
              (acc, review) => acc + (review.rating || 0),
              0
            ) / data.reviews.length
          ).toFixed(2)
        : "N/A",
    totalFeedback: data.feedback.length,
  };
};

// PDF Export using jsPDF
export const exportToPDF = (data) => {
  try {
    // Validate input data
    if (
      !data ||
      !Array.isArray(data.users) ||
      !Array.isArray(data.devices) ||
      !Array.isArray(data.feedback)
    ) {
      throw new Error("Invalid or missing data arrays");
    }

    const doc = new jsPDF();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // Set up PDF font and size
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Title of the report
    doc.text("WisEnergy Analytics Report", 20, 20);

    // Summary statistics
    const stats = getSummaryStats(data);
    doc.text(`Summary as of: ${stats.reportDateTime}`, 20, 30);
    doc.text(`Total Users: ${stats.totalUsers}`, 20, 40);
    doc.text(`Total Devices: ${stats.totalDevices}`, 20, 50);
    doc.text(`Average Rating: ${stats.averageRating}`, 20, 60);
    doc.text(`Total Feedback: ${stats.totalFeedback}`, 20, 70);

    // Users Table
    doc.autoTable({
      startY: 80,
      head: [
        [
          "ID",
          "First Name",
          "Last Name",
          "Email",
          "Location",
          "Role",
          "Date Created",
          "Date Modified",
        ],
      ],
      body: data.users.map((user) => [
        user.uid || "N/A",
        user.first_name || "N/A",
        user.last_name || "N/A",
        user.email || "N/A",
        user.location || "N/A",
        user.role || "N/A",
        user.created_at || "N/A",
        user.dateModified || "N/A",
      ]),
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10 },
    });

    // Devices Table
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [
        [
          "ID",
          "Device Name",
          "Owner",
          "Pairing Code",
          "Paired At",
          "Registered At",
          "Status",
        ],
      ],
      body: data.devices.map((device) => [
        device.id || "N/A",
        device.deviceName || "N/A",
        device.owner || "N/A",
        device.pairingCode || "N/A",
        device.pairedAt || "N/A",
        device.registeredAt || "N/A",
        device.status || "N/A",
      ]),
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10 },
    });

    // Feedback Table
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["ID", "Type", "Message", "Email", "Date Created", "Status"]],
      body: data.feedback.map((feedback) => [
        feedback.id || "N/A",
        feedback.type || "N/A",
        feedback.message || "N/A",
        feedback.email || "N/A",
        feedback.dateCreated || "N/A",
        feedback.status || "N/A",
      ]),
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10 },
    });

    // Save the generated PDF with a unique filename
    doc.save(`wisenergy_analytics_report_${timestamp}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error(`Failed to generate PDF report: ${error.message}`);
  }
};

// DOCX Export using docxtemplater
export const exportToDOCX = async (data) => {
  try {
    // Initialize default arrays if data is missing or invalid
    if (
      !data ||
      !Array.isArray(data.users) ||
      !Array.isArray(data.devices) ||
      !Array.isArray(data.reviews) ||
      !Array.isArray(data.feedback)
    ) {
      console.warn("Invalid data detected, initializing default arrays");
      data = {
        users: data?.users ?? [],
        devices: data?.devices ?? [],
        reviews: data?.reviews ?? [],
        feedback: data?.feedback ?? [],
      };
    }

    // Log data for debugging
    console.log("Data passed to template:", JSON.stringify(data, null, 2));

    // Fetch the DOCX template
    const response = await fetch("/assets/template.docx", { method: "GET" });
    console.log("Fetch status:", response.status);
    console.log("Fetch Content-Type:", response.headers.get("Content-Type"));

    // Log response text for debugging
    const responseText = await response.clone().text();
    console.log(
      "Fetch response text:",
      responseText.substring(0, 200) + (responseText.length > 200 ? "..." : "")
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch DOCX template: ${response.status} ${response.statusText}`
      );
    }

    // Check if response is likely a ZIP file (DOCX) even if Content-Type is missing
    const isZipFile = responseText.startsWith("PK");
    if (
      !isZipFile &&
      !response.headers
        .get("Content-Type")
        ?.includes(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    ) {
      throw new Error(
        `Fetched file is not a valid DOCX file (Content-Type: ${
          response.headers.get("Content-Type") || "none"
        })`
      );
    }

    // Get arrayBuffer
    const arrayBuffer = await response.arrayBuffer();
    console.log("ArrayBuffer size:", arrayBuffer.byteLength);
    if (arrayBuffer.byteLength === 0) {
      throw new Error("Fetched DOCX template is empty");
    }

    // Log first few bytes of arrayBuffer to verify ZIP header
    const uint8Array = new Uint8Array(arrayBuffer.slice(0, 4));
    console.log(
      "ArrayBuffer first bytes:",
      Array.from(uint8Array)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );

    // Load the template into PizZip
    let zip;
    try {
      zip = new PizZip(arrayBuffer);
    } catch (zipError) {
      console.error("PizZip error details:", zipError);
      throw new Error("Invalid DOCX template: Not a valid ZIP file");
    }

    // Prepare data for the template
    const templateData = {
      reportDateTime: getSummaryStats(data).reportDateTime,
      totalUsers: getSummaryStats(data).totalUsers,
      totalDevices: getSummaryStats(data).totalDevices,
      averageRating: getSummaryStats(data).averageRating,
      totalFeedback: getSummaryStats(data).totalFeedback,
      users: data.users,
      devices: data.devices,
      reviews: data.reviews,
      feedback: data.feedback,
    };

    // Log template data
    console.log("Template data:", JSON.stringify(templateData, null, 2));

    // Initialize Docxtemplater with zip and options
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document with data
    try {
      doc.render(templateData);
    } catch (renderError) {
      console.error("Template render error:", renderError);
      throw new Error("Failed to render template: " + renderError.message);
    }

    // Generate the DOCX file
    const buffer = doc.getZip().generate({ type: "arraybuffer" });
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Create download link with unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `wisenergy_analytics_report_${timestamp}.docx`;
    link.click();
  } catch (error) {
    console.error("Error generating DOCX:", error);
    throw new Error(`Failed to generate DOCX report: ${error.message}`);
  }
};
