// app/admin/submissions/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiFileText, FiDownload, FiCheckCircle, FiXCircle, FiMail, FiCalendar, FiUser, FiExternalLink } from "react-icons/fi";
import adminAPI from "@/services/adminApi";

const statusColors = {
  pending: { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  under_review: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  approved: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  rejected: { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  published: { bg: "#f0fdf4", text: "#2d6a4f", border: "#bbf7d0" },
};

const formatDate = (date) => new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function SubmissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchSubmission();
  }, [params.id]);

  const fetchSubmission = async () => {
    try {
      const response = await adminAPI.getSubmission(params.id);
      setSubmission(response.submission);
    } catch (error) {
      console.error("Error fetching submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!confirm("Approve this submission? You will be taken to create docket page.")) return;
    router.push(`/admin/create-docket/${submission._id}`);
  };

  const handleReject = async () => {
    const reason = prompt("Enter rejection reason:");
    if (reason === null) return;
    
    setActionLoading(true);
    try {
      await adminAPI.rejectSubmission(submission._id, reason);
      await fetchSubmission();
      alert("Submission rejected");
    } catch (error) {
      alert("Failed to reject submission");
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    const notes = prompt(`Update to ${newStatus}. Add notes (optional):`);
    if (notes === null) return;
    
    setActionLoading(true);
    try {
      await adminAPI.updateSubmissionStatus(submission._id, newStatus, notes);
      await fetchSubmission();
      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="text-center py-20">
        <p className="font-playfair text-xl text-[#1e2d4a]">Submission not found</p>
        <Link href="/admin/submissions" className="font-mono-dm text-sm text-[#b8974a] mt-4 inline-block hover:underline cursor-pointer">← Back</Link>
      </div>
    );
  }

  const status = statusColors[submission.status] || statusColors.pending;

  return (
    <div className="admin-page">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <Link href="/admin/submissions" className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer">
          <FiArrowLeft size={16} /> Back to Submissions
        </Link>
        <div className="flex gap-3">
          {submission.status !== "published" && submission.status !== "rejected" && (
            <>
              <select 
                onChange={(e) => handleStatusUpdate(e.target.value)} 
                value={submission.status}
                className="font-mono-dm text-xs border border-[#c4b89a] bg-white px-3 py-2 rounded focus:outline-none focus:border-[#1e2d4a] text-gray-800 cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </>
          )}
          {submission.status === "pending" && (
            <>
              <button 
                onClick={handleApprove} 
                className="flex items-center gap-2 bg-[#2d6a4f] text-white px-4 py-2 text-xs font-mono-dm uppercase hover:bg-[#1f5a3f] transition-colors cursor-pointer rounded"
              >
                <FiCheckCircle size={14} /> Approve & Create Docket
              </button>
              <button 
                onClick={handleReject} 
                disabled={actionLoading} 
                className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 text-xs font-mono-dm uppercase hover:bg-red-50 transition-colors cursor-pointer rounded"
              >
                <FiXCircle size={14} /> Reject
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Response Title & Status */}
          <div className="border border-[#d4c8b4] bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <h2 className="font-playfair font-bold text-xl text-[#1e2d4a]">{submission.responseTitle}</h2>
              <span className="inline-block px-3 py-1 text-xs font-mono-dm rounded-full" style={{ background: status.bg, color: status.text, border: `1px solid ${status.border}` }}>
                {submission.status.replace("_", " ")}
              </span>
            </div>
            <div className="font-garamond text-[#5a5040] leading-relaxed whitespace-pre-wrap">
              {submission.responseBody}
            </div>
          </div>

          {/* Claim Information - with URL */}
          <div className="border border-[#d4c8b4] bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4 flex items-center gap-2">
              <FiExternalLink size={16} className="text-[#b8974a]" /> Claim Information
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Source / Publication</p>
                  <p className="font-garamond text-base text-[#1e2d4a]">{submission.claimSource}</p>
                </div>
                <div>
                  <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Claim Date</p>
                  <p className="font-garamond text-base text-[#1e2d4a]">{submission.claimDate}</p>
                </div>
              </div>
              {submission.claimUrl && (
                <div>
                  <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Claim URL</p>
                  <a 
                    href={submission.claimUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-garamond text-sm text-[#b8974a] hover:underline break-all inline-flex items-center gap-1 cursor-pointer"
                  >
                    {submission.claimUrl}
                    <FiExternalLink size={12} />
                  </a>
                </div>
              )}
              <div>
                <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Claim Summary</p>
                <p className="font-garamond text-sm text-[#5a5040] leading-relaxed">{submission.claimSummary}</p>
              </div>
              {submission.claimCategory && (
                <div>
                  <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Category</p>
                  <span className="inline-block px-2 py-1 text-xs font-mono-dm uppercase bg-[#1e2d4a] text-[#f5f0e8] rounded">
                    {submission.claimCategory}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          {submission.timeline && submission.timeline.length > 0 && (
            <div className="border border-[#d4c8b4] bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Timeline</h3>
              <div className="space-y-4">
                {submission.timeline.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 pb-3 border-b border-[#e4ddd0] last:border-0">
                    <div className="flex-shrink-0 sm:w-28">
                      <span className="font-mono-dm text-sm text-[#b8974a]">{item.date}</span>
                    </div>
                    <div>
                      <p className="font-playfair font-semibold text-sm text-[#1e2d4a]">{item.event}</p>
                      <p className="font-garamond text-sm text-[#7a6e5e]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Respondent Information */}
          <div className="border border-[#d4c8b4] bg-white p-4 sm:p-5 rounded-lg shadow-sm">
            <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4 flex items-center gap-2">
              <FiUser size={16} className="text-[#b8974a]" /> Respondent
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-mono-dm text-xs text-[#9a8870]">Name / Organisation</p>
                <p className="font-garamond text-base text-[#1e2d4a]">{submission.respondentName}</p>
              </div>
              <div>
                <p className="font-mono-dm text-xs text-[#9a8870]">Type</p>
                <p className="font-garamond text-base text-[#1e2d4a]">{submission.respondentType}</p>
              </div>
              {submission.respondentRole && (
                <div>
                  <p className="font-mono-dm text-xs text-[#9a8870]">Role</p>
                  <p className="font-garamond text-base text-[#1e2d4a]">{submission.respondentRole}</p>
                </div>
              )}
              <div>
                <p className="font-mono-dm text-xs text-[#9a8870] flex items-center gap-1"><FiMail size={10} /> Contact Email</p>
                <a href={`mailto:${submission.contactEmail}`} className="font-garamond text-base text-[#b8974a] hover:underline cursor-pointer">
                  {submission.contactEmail}
                </a>
              </div>
              {submission.contactPhone && (
                <div>
                  <p className="font-mono-dm text-xs text-[#9a8870]">Contact Phone</p>
                  <p className="font-garamond text-base text-[#1e2d4a]">{submission.contactPhone}</p>
                </div>
              )}
              <div className="pt-2 border-t border-[#e4ddd0]">
                <p className="font-mono-dm text-xs text-[#9a8870] flex items-center gap-1"><FiCalendar size={10} /> Submitted</p>
                <p className="font-garamond text-sm text-[#7a6e5e]">{formatDate(submission.submittedAt)}</p>
              </div>
            </div>
          </div>

          {/* Response Details */}
          <div className="border border-[#d4c8b4] bg-white p-4 sm:p-5 rounded-lg shadow-sm">
            <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-3">Response Details</h3>
            <div className="space-y-2">
              <div>
                <p className="font-mono-dm text-xs text-[#9a8870]">Response Type</p>
                <p className="font-garamond text-base text-[#1e2d4a]">{submission.responseType || "Not specified"}</p>
              </div>
              <div>
                <p className="font-mono-dm text-xs text-[#9a8870]">Requested Action</p>
                <p className="font-garamond text-base text-[#1e2d4a]">{submission.requestedAction || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Attached Files */}
          {submission.files && submission.files.length > 0 && (
            <div className="border border-[#d4c8b4] bg-white p-4 sm:p-5 rounded-lg shadow-sm">
              <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-3 flex items-center gap-2">
                <FiFileText size={16} className="text-[#b8974a]" /> Attached Files ({submission.files.length})
              </h3>
              <div className="space-y-2">
                {submission.files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-[#ede8dc] rounded hover:bg-[#e4ddd0] transition-colors">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FiFileText size={14} className="text-[#b8974a] flex-shrink-0" />
                      <span className="font-garamond text-sm text-[#1e2d4a] truncate">{file.originalName}</span>
                    </div>
                    <a 
                      href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/submissions/${file.filename}`} 
                      download 
                      className="text-[#b8974a] hover:text-[#1e2d4a] transition-colors p-1 cursor-pointer"
                      title="Download"
                    >
                      <FiDownload size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Notes */}
          {submission.adminNotes && (
            <div className="border border-[#d4c8b4] bg-[#fffbeb] p-4 sm:p-5 rounded-lg">
              <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Admin Notes</p>
              <p className="font-garamond text-sm text-[#5a5040]">{submission.adminNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}