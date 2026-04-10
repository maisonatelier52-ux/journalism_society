// utils/fileUrl.js
// ─────────────────────────────────────────────────────────────────────────────
// NEW FILE — create this at: src/utils/fileUrl.js  (or utils/fileUrl.js)
//
// WHY THIS IS NEEDED:
// Old files (before Cloudinary) had local paths:  /uploads/submissions/file.pdf
// New files (after Cloudinary) have full URLs:    https://res.cloudinary.com/...
//
// Before, the frontend always did:  `${API_BASE}${fileUrl}`
// That still works for old paths, but breaks for new Cloudinary URLs because
// it produces: "https://backend.onrender.comhttps://res.cloudinary.com/..."
//
// This helper detects which type of URL it is and returns the correct one.
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Resolves a fileUrl to a usable absolute URL.
 *
 * @param {string} fileUrl - Could be "/uploads/submissions/file.pdf" OR
 *                           "https://res.cloudinary.com/..."
 * @returns {string} Always returns a full https:// URL
 */
export const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) return "";

  // Already a full URL (Cloudinary, S3, or any https://) → use as-is
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    return fileUrl;
  }

  // Local path like /uploads/submissions/file.pdf → prepend backend URL
  return `${API_BASE}${fileUrl}`;
};

export default resolveFileUrl;