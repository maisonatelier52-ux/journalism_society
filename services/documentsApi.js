// services/documentsApi.js
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const documentsAPI = {
  // Get all documents
  getAllDocuments: async () => {
    const response = await api.get("/documents");
    return response.data;
  },

  // Get document by ID
  getDocumentById: async (id) => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },

  // Get documents by docket ID
  getDocumentsByDocket: async (docketId) => {
    const response = await api.get(`/documents/by-docket/${docketId}`);
    return response.data;
  },
  
  // Download document directly
  downloadDocument: async (id) => {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default documentsAPI;