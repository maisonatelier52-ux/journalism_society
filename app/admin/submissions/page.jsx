
// app/admin/submissions/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiEye, FiArrowRight } from "react-icons/fi";
import adminAPI from "@/services/adminApi";

const statusColors = {
  pending: { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  under_review: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  approved: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  rejected: { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  published: { bg: "#f0fdf4", text: "#2d6a4f", border: "#bbf7d0" },
};

const formatDate = (date) => new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function SubmissionsPage() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";
  
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getSubmissions(statusFilter);
      setSubmissions(response.submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a] mb-2">Submissions</h1>
      <p className="font-garamond text-[#7a6e5e] mb-6 md:mb-8">Review and manage Right of Reply submissions</p>

      <div className="border border-[#d4c8b4] bg-white overflow-x-auto">
        <div className="min-w-[600px] md:min-w-full">
          <table className="w-full">
            <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
              <tr>
                <th className="text-left py-3 px-3 md:px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Respondent</th>
                <th className="text-left py-3 px-3 md:px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Title</th>
                <th className="text-left py-3 px-3 md:px-4 font-mono-dm text-xs text-[#9a8870] uppercase hidden sm:table-cell">Source</th>
                <th className="text-left py-3 px-3 md:px-4 font-mono-dm text-xs text-[#9a8870] uppercase hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-3 md:px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Status</th>
                <th className="text-left py-3 px-3 md:px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 font-garamond text-[#9a8870]">No submissions found</td>
                </tr>
              ) : (
                submissions.map((sub) => {
                  const status = statusColors[sub.status] || statusColors.pending;
                  return (
                    <tr key={sub._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee]">
                      <td className="py-3 px-3 md:px-4">
                        <p className="font-playfair font-semibold text-sm text-[#1e2d4a]">{sub.respondentName}</p>
                      </td>
                      <td className="py-3 px-3 md:px-4">
                        <p className="font-garamond text-sm text-[#1e2d4a]">{sub.responseTitle?.slice(0, 40)}</p>
                      </td>
                      <td className="py-3 px-3 md:px-4 hidden sm:table-cell">
                        <p className="font-garamond text-sm text-[#7a6e5e]">{sub.claimSource}</p>
                      </td>
                      <td className="py-3 px-3 md:px-4 hidden md:table-cell">
                        <p className="font-mono-dm text-xs text-[#9a8870]">{formatDate(sub.submittedAt)}</p>
                      </td>
                      <td className="py-3 px-3 md:px-4">
                        <span className="inline-block px-2 py-1 text-xs font-mono-dm whitespace-nowrap" style={{ background: status.bg, color: status.text, border: `1px solid ${status.border}` }}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 md:px-4">
                        <Link href={`/admin/submissions/${sub._id}`} className="flex items-center gap-1 text-[#b8974a] hover:text-[#1e2d4a]">
                          <FiEye size={14} />
                          <span className="font-mono-dm text-xs">Review</span>
                          <FiArrowRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}