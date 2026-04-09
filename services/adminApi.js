
// services/adminApi.js
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const adminAPI = {
  // Auth
  login: async (email, password) => {
    const response = await api.post("/admin/login", { email, password });
    return response.data;
  },
  
  // Verify token (optional, for checking if token is still valid)
  verifyToken: async () => {
    const response = await api.get("/admin/verify");
    return response.data;
  },
  
  // Dashboard
  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },
  
  // Submissions
  getSubmissions: async (status = null) => {
    const url = status && status !== "all" ? `/admin/submissions?status=${status}` : "/admin/submissions";
    const response = await api.get(url);
    return response.data;
  },
  
  getSubmission: async (id) => {
    const response = await api.get(`/admin/submissions/${id}`);
    return response.data;
  },
  
  updateSubmissionStatus: async (id, status, reviewNotes = "") => {
    const response = await api.patch(`/admin/submissions/${id}/status`, { status, reviewNotes });
    return response.data;
  },
  
  rejectSubmission: async (id, reviewNotes = "") => {
    const response = await api.post(`/admin/submissions/${id}/reject`, { reviewNotes });
    return response.data;
  },
  
  createDocket: async (data) => {
    const response = await api.post("/admin/create-docket", data);
    return response.data;
  },
  
  // Dockets
  getDockets: async () => {
    const response = await api.get("/admin/dockets");
    return response.data;
  },
  
  getDocket: async (id) => {
    const response = await api.get(`/admin/dockets/${id}`);
    return response.data;
  },
  
  updateDocket: async (id, data) => {
    const response = await api.patch(`/admin/dockets/${id}`, data);
    return response.data;
  },
  
  deleteDocket: async (id) => {
    const response = await api.delete(`/admin/dockets/${id}`);
    return response.data;
  },
  
  // Media
  getMedia: async (status = null) => {
    const url = status && status !== "all" ? `/admin/media?status=${status}` : "/admin/media";
    const response = await api.get(url);
    return response.data;
  },
  
  getPendingMedia: async () => {
    const response = await api.get("/admin/media/pending");
    return response.data;
  },
  
  approveMedia: async (id) => {
    const response = await api.post(`/admin/media/${id}/approve`);
    return response.data;
  },
  
  rejectMedia: async (id, reason = "") => {
    const response = await api.post(`/admin/media/${id}/reject`, { reason });
    return response.data;
  },
  
  // Documents
  getDocuments: async () => {
    const response = await api.get("/admin/documents");
    return response.data;
  },
  
  uploadDocument: async (formData) => {
    const response = await api.post("/admin/documents/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  
  deleteDocument: async (id) => {
    const response = await api.delete(`/admin/documents/${id}`);
    return response.data;
  },

  getMediaSubmissions: async (status = null) => {
    const url = status ? `/admin/media-submissions?status=${status}` : "/admin/media-submissions";
    const response = await api.get(url);
    return response.data;
  },

  approveMediaSubmission: async (id, data) => {
    const response = await api.post(`/admin/media-submissions/${id}/approve`, data);
    return response.data;
  },

  rejectMediaSubmission: async (id, reason) => {
    const response = await api.post(`/admin/media-submissions/${id}/reject`, { reason });
    return response.data;
  },

  // Create media directly (admin)
  createMediaDirect: async (data) => {
    const response = await api.post("/admin/media/create", data);
    return response.data;
  },

  // Delete media
  deleteMedia: async (id) => {
    const response = await api.delete(`/admin/media/${id}`);
    return response.data;
  },

  // Upload exhibit file
  uploadExhibit: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await api.post("/admin/upload-exhibit", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Create docket directly (admin)
  createAdminDocket: async (data) => {
    const response = await api.post("/admin/create-docket-direct", data);
    return response.data;
  },

  // Get media by docket
  getMediaByDocket: async (docketId) => {
    const response = await api.get(`/admin/media/by-docket/${docketId}`);
    return response.data;
  },

  // Update media
  updateMedia: async (id, data) => {
    const response = await api.patch(`/admin/media/${id}`, data);
    return response.data;
  },

  // Full docket update
  updateDocketFull: async (id, data) => {
    const response = await api.patch(`/admin/dockets/${id}/full`, data);
    return response.data;
  },

  // Press Releases
  getPressReleases: async () => {
    const response = await api.get("/admin/press-releases");
    return response.data;
  },

  getPressRelease: async (id) => {
    const response = await api.get(`/admin/press-releases/${id}`);
    return response.data;
  },

  createPressRelease: async (data) => {
    const response = await api.post("/admin/press-releases", data);
    return response.data;
  },

  updatePressRelease: async (id, data) => {
    const response = await api.patch(`/admin/press-releases/${id}`, data);
    return response.data;
  },

  deletePressRelease: async (id) => {
    const response = await api.delete(`/admin/press-releases/${id}`);
    return response.data;
  },

  // Upload press release image
  uploadPressReleaseImage: async (formData) => {
    const response = await api.post("/admin/press-releases/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getActivityLog: async () => {
    const response = await api.get("/admin/activity-log");
    return response.data;
  },

  clearActivityLog: async () => {
    const response = await api.delete("/admin/activity-log");
    return response.data;
  },

    // ── Flags ─────────────────────────────────────────────────
  /**
   * Get all flag reports with optional filters.
   * @param {Object} opts - { status, docketId, page, limit }
   */
  getFlags: async ({ status, docketId, page = 1, limit = 20 } = {}) => {
    const params = new URLSearchParams();
    if (status && status !== "all") params.append("status", status);
    if (docketId) params.append("docketId", docketId);
    params.append("page", page);
    params.append("limit", limit);
    const response = await api.get(`/flags/admin?${params.toString()}`);
    return response.data;
  },
 
  /** Get a single flag by ID */
  getFlag: async (id) => {
    const response = await api.get(`/flags/admin/${id}`);
    return response.data;
  },
 
  /**
   * Update the status of a flag.
   * @param {string} id
   * @param {string} status - "pending" | "reviewing" | "resolved" | "dismissed"
   * @param {string} [adminNotes]
   * @param {string} [resolution]
   */
  updateFlagStatus: async (id, status, adminNotes = "", resolution = "") => {
    const response = await api.patch(`/flags/admin/${id}/status`, {
      status,
      adminNotes,
      resolution,
    });
    return response.data;
  },
 
  /** Update admin notes / resolution without changing status */
  updateFlagNotes: async (id, { adminNotes, resolution }) => {
    const response = await api.patch(`/flags/admin/${id}`, { adminNotes, resolution });
    return response.data;
  },
 
  /** Delete a single flag */
  deleteFlag: async (id) => {
    const response = await api.delete(`/flags/admin/${id}`);
    return response.data;
  },
 
  /** Delete ALL flags (or all flags for a specific docket) */
  deleteAllFlags: async (docketId = null) => {
    const url = docketId
      ? `/flags/admin?docketId=${docketId}`
      : "/flags/admin";
    const response = await api.delete(url);
    return response.data;
  },
 
  /** Get flag stats only */
  getFlagStats: async () => {
    const response = await api.get("/flags/admin/stats");
    return response.data;
  },
};

export default adminAPI;