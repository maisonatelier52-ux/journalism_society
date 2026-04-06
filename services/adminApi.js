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

export const adminAPI = {
  // Auth
  login: async (email, password) => {
    const response = await api.post("/admin/login", { email, password });
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
// Add this inside the adminAPI object
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

// Delete media
deleteMedia: async (id) => {
  const response = await api.delete(`/admin/media/${id}`);
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

};

export default adminAPI;