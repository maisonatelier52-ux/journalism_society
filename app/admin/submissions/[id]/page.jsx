// app/admin/submissions/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiFileText, FiDownload, FiCheckCircle, FiXCircle, FiMail, FiCalendar, FiUser } from "react-icons/fi";
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
        <Link href="/admin/submissions" className="font-mono-dm text-sm text-[#b8974a] mt-4 inline-block">← Back</Link>
      </div>
    );
  }

  const status = statusColors[submission.status] || statusColors.pending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/submissions" className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a]">
          <FiArrowLeft size={16} /> Back to Submissions
        </Link>
        <div className="flex gap-3">
            {
                submission.status !== "published" && (
                    <>
                    <select onChange={(e) => handleStatusUpdate(e.target.value)} value={submission.status}
                    className="font-mono-dm text-xs border border-[#c4b89a] bg-white px-3 py-2 rounded focus:outline-none focus:border-[#1e2d4a] text-gray-800 cursor-pointer">
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                    </>
                )
            }
          {submission.status === "pending" && (
            <>
              <button onClick={handleApprove} className="flex items-center gap-2 bg-[#2d6a4f] text-white px-4 py-2 text-xs font-mono-dm uppercase hover:bg-[#1f5a3f] cursor-pointer">
                <FiCheckCircle size={14} /> Approve & Create Docket
              </button>
              <button onClick={handleReject} disabled={actionLoading} className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 text-xs font-mono-dm uppercase hover:bg-red-50 cursor-pointer">
                <FiXCircle size={14} /> Reject
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-[#d4c8b4] bg-white p-6">
            <h2 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-4">{submission.responseTitle}</h2>
            <div className="font-garamond text-[#5a5040] leading-relaxed whitespace-pre-wrap">
              {submission.responseBody}
            </div>
          </div>

          {submission.timeline && submission.timeline.length > 0 && (
            <div className="border border-[#d4c8b4] bg-white p-6">
              <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Timeline</h3>
              <div className="space-y-4">
                {submission.timeline.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-24"><span className="font-mono-dm text-xs text-[#b8974a]">{item.date}</span></div>
                    <div><p className="font-playfair font-semibold text-sm text-[#1e2d4a]">{item.event}</p><p className="font-garamond text-sm text-[#7a6e5e]">{item.detail}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="border border-[#d4c8b4] bg-white p-5">
            <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Respondent Information</h3>
            <div className="space-y-3">
              <div><p className="font-mono-dm text-xs text-[#9a8870]">Name / Organisation</p><p className="font-garamond text-gray-500">{submission.respondentName}</p></div>
              <div><p className="font-mono-dm text-xs text-[#9a8870]">Type</p><p className="font-garamond text-gray-500">{submission.respondentType}</p></div>
              <div><p className="font-mono-dm text-xs text-[#9a8870]">Contact</p><p className="font-garamond flex items-center gap-1 text-gray-500"><FiMail size={12} /> {submission.contactEmail}</p></div>
              <div><p className="font-mono-dm text-xs text-[#9a8870]">Submitted</p><p className="font-garamond flex items-center gap-1 text-gray-500"><FiCalendar size={12} /> {formatDate(submission.submittedAt)}</p></div>
            </div>
          </div>

          <div className="border border-[#d4c8b4] bg-white p-5">
            <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Claim Information</h3>
            <div className="space-y-3">
              <div><p className="font-mono-dm text-xs text-[#9a8870]">Source</p><p className="font-garamond text-gray-500">{submission.claimSource}</p></div>
              <div><p className="font-mono-dm text-xs text-[#9a8870]">Date</p><p className="font-garamond text-gray-500">{submission.claimDate}</p></div>
              <div><p className="font-mono-dm text-xs text-[#9a8870]">Summary</p><p className="font-garamond text-sm text-gray-500">{submission.claimSummary}</p></div>
            </div>
          </div>

          {submission.files && submission.files.length > 0 && (
            <div className="border border-[#d4c8b4] bg-white p-5">
                <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Attached Files</h3>
                {submission.files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-[#ede8dc] mb-2">
                    <div className="flex items-center gap-2">
                    <FiFileText size={14} className="text-[#b8974a]" />
                    <span className="font-garamond text-sm text-gray-500">{file.originalName}</span>
                    </div>
                    {/* FIXED: Remove /api from the URL - use direct static serving */}
                    <a 
                    href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/submissions/${file.filename}`} 
                    download 
                    className="text-[#b8974a] hover:text-[#1e2d4a]"
                    >
                    <FiDownload size={14} />
                    </a>
                </div>
                ))}
            </div>
            )}

          {submission.adminNotes && (
            <div className="border border-[#d4c8b4] bg-[#fffbeb] p-5">
              <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Admin Notes</p>
              <p className="font-garamond text-sm text-gray-500">{submission.adminNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}