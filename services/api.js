// services/api.js
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a separate instance for file uploads
const fileApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Submission API with file upload support
export const submissionAPI = {
  // Submit a new docket with files
  submitDocket: async (formData) => {
    // Create FormData object for file upload
    const formDataToSend = new FormData();
    
    // Append all text fields
    formDataToSend.append("respondentName", formData.respondentName);
    formDataToSend.append("respondentType", formData.respondentType);
    formDataToSend.append("respondentRole", formData.respondentRole);
    formDataToSend.append("contactEmail", formData.contactEmail);
    formDataToSend.append("contactPhone", formData.contactPhone);
    formDataToSend.append("claimSource", formData.claimSource);
    formDataToSend.append("claimUrl", formData.claimUrl);
    formDataToSend.append("claimDate", formData.claimDate);
    formDataToSend.append("claimSummary", formData.claimSummary);
    formDataToSend.append("claimCategory", formData.claimCategory);
    formDataToSend.append("responseTitle", formData.responseTitle);
    formDataToSend.append("responseBody", formData.responseBody);
    formDataToSend.append("responseType", formData.responseType);
    formDataToSend.append("requestedAction", formData.requestedAction);
    formDataToSend.append("consentAccurate", formData.consentAccurate);
    formDataToSend.append("consentPublish", formData.consentPublish);
    formDataToSend.append("consentContact", formData.consentContact);
    formDataToSend.append("status", "pending");
    formDataToSend.append("submittedAt", new Date().toISOString());
    
    // Append timeline as JSON string
    formDataToSend.append("timeline", JSON.stringify(formData.timeline));
    
    // Append files
    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((file, index) => {
        formDataToSend.append(`files`, file.file, file.name);
      });
    }
    
    const response = await fileApi.post("/submissions", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get all submissions (admin)
  getAllSubmissions: async () => {
    const response = await api.get("/submissions");
    return response.data;
  },
};

// Dockets API
export const docketsAPI = {
  getAllDockets: async () => {
    const response = await api.get("/dockets");
    return response.data;
  },
  getDocketById: async (id) => {
    const response = await api.get(`/dockets/${id}`);
    return response.data;
  },
};

// Documents API
export const documentsAPI = {
  getAllDocuments: async () => {
    const response = await api.get("/documents");
    return response.data;
  },
  getDocumentById: async (id) => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },
  uploadDocument: async (file, metadata) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", JSON.stringify(metadata));
    
    const response = await fileApi.post("/documents/upload", formData);
    return response.data;
  },
};

// Media API
export const mediaAPI = {
  getAllMedia: async () => {
    const response = await api.get("/media");
    return response.data;
  },
  submitMediaCitation: async (data) => {
    const response = await api.post("/media", data);
    return response.data;
  },
};

export const searchAPI = {
  search: async (query) => {
    const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};

export default api;