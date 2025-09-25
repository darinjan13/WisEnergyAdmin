import axios from "axios";

const api = axios.create({
  baseURL: "https://wisenergy-backend.onrender.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching total users:", error);
  }
};

export const fetchAllDevices = async () => {
  try {
    const response = await api.get("/devices");
    console.log("Fetched devices data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching total devices:", error);
  }
};

export const fetchDeviceById = async (id) => {
  try {
    const response = await api.get(`/devices/${id}`); // fetch details of one device
    return response.data;
  } catch (error) {
    console.error(`Error fetching device ${id}:`, error);
  }
};

export const fetchAllReviews = async () => {
  try {
    const response = await api.get("/reviews");
    console.log("Fetched reviews data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching total devices:", error);
  }
};

export const fetchAllFeedbacks = async () => {
  try {
    const response = await api.get("/feedback");
    console.log("Fetched feedback data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching total devices:", error);
  }
};
