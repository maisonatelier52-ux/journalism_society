// services/docketsApi.js
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const docketsAPI = {
  // Get all dockets
  getAllDockets: async () => {
    const response = await api.get("/dockets");
    return response.data;
  },

  // Get single docket by ID
  getDocketById: async (id) => {
    const response = await api.get(`/dockets/${id}`);
    return response.data;
  },
};

export default docketsAPI;