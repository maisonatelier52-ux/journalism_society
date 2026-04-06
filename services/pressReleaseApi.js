// services/pressReleaseApi.js
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const pressReleaseAPI = {
  // Get all press releases
  getAllPressReleases: async () => {
    const response = await api.get("/press-releases");
    return response.data;
  },

  // Get single press release by ID
  getPressReleaseById: async (id) => {
    const response = await api.get(`/press-releases/${id}`);
    return response.data;
  },

  // Get press releases by category
  getPressReleasesByCategory: async (category) => {
    const response = await api.get(`/press-releases?category=${category}`);
    return response.data;
  },
};

export default pressReleaseAPI;