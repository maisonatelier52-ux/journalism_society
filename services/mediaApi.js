// services/mediaApi.js
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const mediaAPI = {
  getAllMedia: async () => {
    const response = await api.get("/media");
    return response.data;
  },

  getMediaByDocket: async (docketId) => {
    const response = await api.get(`/media/by-docket/${docketId}`);
    return response.data;
  },

  // User submissions go to /media POST → MediaSubmission model → pending
  submitCitation: async (data) => {
    const response = await api.post("/media", data);
    return response.data;
  },
  
};

export default mediaAPI;