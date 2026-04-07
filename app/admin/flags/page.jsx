// app/admin/flags/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FiAlertTriangle, FiEye, FiCheckCircle, FiXCircle, 
  FiClock, FiMail, FiRefreshCw, FiChevronLeft, FiChevronRight,
  FiTrash2, FiSearch, FiInfo, FiMessageSquare, FiArrowRight
} from "react-icons/fi";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "#b45309", bg: "#fffbeb", border: "#fde68a", icon: FiClock },
  reviewing: { label: "Reviewing", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", icon: FiEye },
  resolved: { label: "Resolved", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", icon: FiCheckCircle },
  dismissed: { label: "Dismissed", color: "#6b7280", bg: "#f3f4f6", border: "#e5e7eb", icon: FiXCircle },
};

const CATEGORY_COLORS = {
  "Factual Error": { bg: "#fef2f2", text: "#b91c1c", icon: "📝" },
  "Date Inaccuracy": { bg: "#fffbeb", text: "#b45309", icon: "📅" },
  "Name / Entity Error": { bg: "#eff6ff", text: "#1d4ed8", icon: "👤" },
  "Missing Information": { bg: "#faf5ff", text: "#7e22ce", icon: "❓" },
  "Document Error": { bg: "#f0fdf4", text: "#15803d", icon: "📄" },
  "Other": { bg: "#f3f4f6", text: "#374151", icon: "📌" },
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", { 
    day: "2-digit", month: "short", year: "numeric", 
    hour: "2-digit", minute: "2-digit" 
  });
};

const formatRelativeTime = (date) => {
  if (!date) return "N/A";
  const diffMs = new Date() - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  return formatDate(date);
};

export default function AdminFlagsPage() {
  const [flags, setFlags] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });

  useEffect(() => {
    fetchFlags();
    fetchStats();
  }, [statusFilter, pagination.page]);

  const fetchFlags = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/flags/admin/flags?status=${statusFilter}&page=${pagination.page}&limit=20`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      const data = await response.json();
      if (data.success) {
        setFlags(data.flags);
        setPagination(prev => ({ ...prev, total: data.pagination.total, pages: data.pagination.pages }));
      }
    } catch (error) {
      console.error("Error fetching flags:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/flags/admin/flags/stats/summary`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateFlagStatus = async (id, status, adminNotes = "", resolution = "") => {
    setUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/flags/admin/flags/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ status, adminNotes, resolution }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchFlags();
        await fetchStats();
        if (selectedFlag?._id === id) {
          setSelectedFlag(data.flag);
        }
      }
    } catch (error) {
      console.error("Error updating flag:", error);
      alert("Failed to update flag status");
    } finally {
      setUpdating(false);
    }
  };

  const deleteAllFlags = async () => {
    setDeletingAll(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/flags/admin/flags`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      const data = await response.json();
      if (data.success) {
        await fetchFlags();
        await fetchStats();
        setShowDeleteAllModal(false);
        alert(`✅ Successfully deleted ${data.deletedCount} flag reports.`);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error deleting all flags:", error);
      alert("❌ Failed to delete flag reports");
    } finally {
      setDeletingAll(false);
    }
  };

  const handleStatusChange = async (flag, newStatus) => {
    if (newStatus === "resolved") {
      const resolution = prompt("Enter resolution notes (how was this issue addressed?):");
      if (resolution === null) return;
      await updateFlagStatus(flag._id, newStatus, flag.adminNotes, resolution);
    } else if (newStatus === "dismissed") {
      const reason = prompt("Enter reason for dismissal:");
      if (reason === null) return;
      await updateFlagStatus(flag._id, newStatus, reason, "");
    } else {
      await updateFlagStatus(flag._id, newStatus);
    }
  };

  const handleViewDetails = (flag) => {
    setSelectedFlag(flag);
    setShowDetailModal(true);
  };

  const getDocketId = (docket) => {
    if (!docket) return "";
    if (typeof docket === "object" && docket._id) return docket._id;
    if (typeof docket === "string") return docket;
    return "";
  };

  // Filter flags by search term
  const filteredFlags = flags.filter(flag => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      flag.docketNumber?.toLowerCase().includes(term) ||
      flag.docketTitle?.toLowerCase().includes(term) ||
      flag.description?.toLowerCase().includes(term) ||
      flag.category?.toLowerCase().includes(term)
    );
  });

  const statCards = stats ? [
    { label: "Pending", value: stats.pending, status: "pending", color: "#b45309", bg: "#fffbeb" },
    { label: "Reviewing", value: stats.reviewing, status: "reviewing", color: "#1d4ed8", bg: "#eff6ff" },
    { label: "Resolved", value: stats.resolved, status: "resolved", color: "#15803d", bg: "#f0fdf4" },
    { label: "Dismissed", value: stats.dismissed, status: "dismissed", color: "#6b7280", bg: "#f3f4f6" },
    { label: "Total", value: stats.total, status: "all", color: "#1e2d4a", bg: "#ede8dc" },
  ] : [];

  return (
    <div className="admin-page">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-playfair font-black text-2xl sm:text-3xl text-[#1e2d4a] mb-1">Flag Reports</h1>
          <p className="font-garamond text-sm sm:text-base text-[#7a6e5e]">Review and manage user-reported errors and issues</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { fetchFlags(); fetchStats(); }}
            className="flex items-center gap-2 bg-[#1e2d4a] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono-dm hover:bg-[#2a3f6a] transition-colors rounded-lg cursor-pointer"
          >
            <FiRefreshCw size={14} /> Refresh
          </button>
          {stats?.total > 0 && (
            <button 
              onClick={() => setShowDeleteAllModal(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono-dm hover:bg-red-700 transition-colors rounded-lg cursor-pointer"
            >
              <FiTrash2 size={14} /> Delete All
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {statCards.map((card) => (
          <button
            key={card.label}
            onClick={() => setStatusFilter(card.status)}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
              statusFilter === card.status 
                ? "border-[#1e2d4a] shadow-md bg-white" 
                : "border-[#e4ddd0] hover:border-[#b8974a] bg-white hover:shadow-sm"
            }`}
          >
            <p className="font-playfair font-black text-2xl sm:text-3xl" style={{ color: card.color }}>{card.value}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ background: card.color }} />
              <p className="font-mono-dm text-[0.65rem] sm:text-xs uppercase tracking-wider text-[#9a8870]">{card.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={16} />
          <input
            type="text"
            placeholder="Search by docket number, title, or description..."
            className="w-full pl-10 pr-4 py-2 border border-[#d4c8b4] rounded-lg font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Flags Table - Responsive */}
      <div className="border border-[#d4c8b4] bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
              <tr>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Reported</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Docket</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Category</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Description</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Status</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#b8974a] border-t-transparent"></div>
                      <span className="font-garamond text-[#9a8870]">Loading reports...</span>
                    </div>
                   </td>
                 </tr>
              ) : filteredFlags.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <FiCheckCircle size={40} className="text-[#c4b89a]" />
                      <p className="font-playfair text-lg text-[#c4b89a]">All clear!</p>
                      <p className="font-garamond text-sm text-[#9a8870]">
                        {searchTerm ? "No matching flag reports found" : "No flag reports found"}
                      </p>
                    </div>
                   </td>
                 </tr>
              ) : (
                filteredFlags.map((flag) => {
                  const statusConfig = STATUS_CONFIG[flag.status] || STATUS_CONFIG.pending;
                  const StatusIcon = statusConfig.icon;
                  const categoryColor = CATEGORY_COLORS[flag.category] || CATEGORY_COLORS["Other"];
                  const docketIdString = getDocketId(flag.docketId);
                  
                  return (
                    <tr key={flag._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee] transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-mono-dm text-xs font-medium text-[#b8974a]">{formatRelativeTime(flag.reportedAt)}</span>
                          <span className="font-mono-dm text-[0.6rem] text-[#9a8870] mt-0.5">{formatDate(flag.reportedAt)}</span>
                          {flag.contactEmail && (
                            <span className="flex items-center gap-1 mt-1">
                              <FiMail size={10} className="text-[#9a8870]" />
                              <span className="font-mono-dm text-[0.55rem] text-[#9a8870] truncate max-w-[120px]">{flag.contactEmail}</span>
                            </span>
                          )}
                        </div>
                       </td>
                      <td className="py-3 px-4">
                        {docketIdString ? (
                          <Link href={`/dockets/${docketIdString}`} target="_blank" className="font-mono-dm text-sm font-semibold text-[#b8974a] hover:underline inline-flex items-center gap-1 cursor-pointer">
                            {flag.docketNumber}
                            <FiEye size={10} />
                          </Link>
                        ) : (
                          <span className="font-mono-dm text-sm text-[#9a8870]">{flag.docketNumber}</span>
                        )}
                        <p className="font-garamond text-xs text-[#7a6e5e] line-clamp-1 mt-1">{flag.docketTitle}</p>
                       </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[0.65rem] font-mono-dm uppercase rounded-full" 
                          style={{ background: categoryColor.bg, color: categoryColor.text }}>
                          <span>{categoryColor.icon}</span>
                          {flag.category}
                        </span>
                       </td>
                      <td className="py-3 px-4">
                        <p className="font-garamond text-sm text-[#1e2d4a] line-clamp-2 max-w-[300px]">{flag.description}</p>
                       </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-mono-dm font-medium uppercase rounded-full"
                          style={{ background: statusConfig.bg, color: statusConfig.color, border: `1px solid ${statusConfig.border}` }}>
                          <StatusIcon size={10} />
                          {statusConfig.label}
                        </span>
                       </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(flag)}
                            className="p-1.5 text-[#b8974a] hover:text-[#1e2d4a] hover:bg-[#ede8dc] rounded transition-all cursor-pointer"
                            title="View Details"
                          >
                            <FiInfo size={16} />
                          </button>
                          {flag.status === "pending" && (
                            <button
                              onClick={() => handleStatusChange(flag, "reviewing")}
                              className="p-1.5 text-[#1d4ed8] hover:bg-[#eff6ff] rounded transition-all cursor-pointer"
                              title="Mark as Reviewing"
                            >
                              <FiEye size={16} />
                            </button>
                          )}
                          {(flag.status === "pending" || flag.status === "reviewing") && (
                            <>
                              <button
                                onClick={() => handleStatusChange(flag, "resolved")}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-all cursor-pointer"
                                title="Mark as Resolved"
                              >
                                <FiCheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => handleStatusChange(flag, "dismissed")}
                                className="p-1.5 text-gray-400 hover:bg-gray-100 rounded transition-all cursor-pointer"
                                title="Dismiss"
                              >
                                <FiXCircle size={16} />
                              </button>
                            </>
                          )}
                        </div>
                       </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="text-sm text-[#9a8870] font-mono-dm">
            Showing {((pagination.page - 1) * 20) + 1} to {Math.min(pagination.page * 20, pagination.total)} of {pagination.total} reports
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={pagination.page === 1}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#c4b89a] rounded-lg text-[#7a6e5e] hover:bg-[#ede8dc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <FiChevronLeft size={14} /> Previous
            </button>
            <div className="flex gap-1">
              {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                let pageNum;
                if (pagination.pages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.pages - 2) {
                  pageNum = pagination.pages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                    className={`w-8 h-8 rounded-lg font-mono-dm text-sm transition-colors cursor-pointer ${
                      pagination.page === pageNum
                        ? "bg-[#1e2d4a] text-white"
                        : "text-[#7a6e5e] hover:bg-[#ede8dc]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
              disabled={pagination.page === pagination.pages}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#c4b89a] rounded-lg text-[#7a6e5e] hover:bg-[#ede8dc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedFlag && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-[#f5f0e8] rounded-lg border-t-4 border-[#b8974a] max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#f5f0e8] border-b border-[#e4ddd0] p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ede8dc] flex items-center justify-center">
                  <FiAlertTriangle size={20} className="text-[#b8974a]" />
                </div>
                <h3 className="font-playfair font-bold text-lg sm:text-xl text-[#1e2d4a]">Flag Report Details</h3>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5">
              {/* Docket Info */}
              <div className="bg-gradient-to-r from-[#ede8dc] to-[#f5f0e8] p-4 rounded-lg border border-[#d4c8b4]">
                <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-2 flex items-center gap-2">
                  <FiEye size={12} /> Related Docket
                </p>
                <Link href={`/dockets/${getDocketId(selectedFlag.docketId)}`} target="_blank" 
                  className="font-mono-dm text-base font-semibold text-[#b8974a] hover:underline inline-flex items-center gap-2 cursor-pointer">
                  {selectedFlag.docketNumber}
                  <FiArrowRight size={12} />
                </Link>
                <p className="font-playfair font-semibold text-sm text-[#1e2d4a] mt-2">{selectedFlag.docketTitle}</p>
              </div>

              {/* Report Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
                  <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1 flex items-center gap-1">
                    <span>🏷️</span> Category
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono-dm uppercase rounded-full" 
                    style={{ background: CATEGORY_COLORS[selectedFlag.category]?.bg || "#f3f4f6", 
                             color: CATEGORY_COLORS[selectedFlag.category]?.text || "#374151" }}>
                    <span>{CATEGORY_COLORS[selectedFlag.category]?.icon || "📌"}</span>
                    {selectedFlag.category}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
                  <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1 flex items-center gap-1">
                    <span>⏰</span> Reported
                  </p>
                  <p className="font-garamond text-sm text-[#1e2d4a]">{formatDate(selectedFlag.reportedAt)}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-4 rounded-lg border border-[#e4ddd0]">
                <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-2 flex items-center gap-2">
                  <FiMessageSquare size={12} /> Description
                </p>
                <p className="font-garamond text-sm text-[#4a4035] whitespace-pre-wrap leading-relaxed">{selectedFlag.description}</p>
              </div>

              {/* Contact Email */}
              {selectedFlag.contactEmail && (
                <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
                  <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1 flex items-center gap-1">
                    <FiMail size={12} /> Contact Email
                  </p>
                  <a href={`mailto:${selectedFlag.contactEmail}`} className="font-garamond text-sm text-[#b8974a] hover:underline cursor-pointer">
                    {selectedFlag.contactEmail}
                  </a>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2 flex items-center gap-2">
                  <FiMessageSquare size={12} /> Admin Notes
                </label>
                <textarea
                  value={selectedFlag.adminNotes || ""}
                  onChange={(e) => setSelectedFlag({ ...selectedFlag, adminNotes: e.target.value })}
                  className="w-full border border-[#d4c8b4] rounded-lg p-3 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] bg-white resize-none"
                  rows={3}
                  placeholder="Add internal notes about this report..."
                />
              </div>

              {/* Resolution */}
              {selectedFlag.status === "resolved" && selectedFlag.resolution && (
                <div className="bg-[#f0fdf4] p-3 rounded-lg border border-[#bbf7d0]">
                  <p className="font-mono-dm text-xs uppercase text-[#15803d] mb-1 flex items-center gap-2">
                    <FiCheckCircle size={12} /> Resolution
                  </p>
                  <p className="font-garamond text-sm text-[#15803d]">{selectedFlag.resolution}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-[#e4ddd0]">
                <button
                  onClick={async () => {
                    await updateFlagStatus(selectedFlag._id, selectedFlag.status, selectedFlag.adminNotes);
                    alert("Notes saved!");
                  }}
                  disabled={updating}
                  className="flex-1 min-w-[120px] font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-white py-2.5 rounded-lg hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Save Notes
                </button>
                {selectedFlag.status === "pending" && (
                  <button
                    onClick={() => handleStatusChange(selectedFlag, "reviewing")}
                    className="flex-1 min-w-[120px] font-mono-dm text-xs tracking-widest uppercase border-2 border-[#1d4ed8] text-[#1d4ed8] py-2.5 rounded-lg hover:bg-[#eff6ff] transition-colors cursor-pointer"
                  >
                    Start Review
                  </button>
                )}
                {(selectedFlag.status === "pending" || selectedFlag.status === "reviewing") && (
                  <>
                    <button
                      onClick={() => handleStatusChange(selectedFlag, "resolved")}
                      className="flex-1 min-w-[120px] font-mono-dm text-xs tracking-widest uppercase bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedFlag, "dismissed")}
                      className="flex-1 min-w-[120px] font-mono-dm text-xs tracking-widest uppercase border-2 border-gray-400 text-gray-600 py-2.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteAllModal(false)}>
          <div className="bg-[#f5f0e8] rounded-lg border-t-4 border-red-500 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FiTrash2 size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-xl text-[#1e2d4a]">Delete All Reports</h3>
                  <p className="font-garamond text-sm text-[#7a6e5e]">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="font-garamond text-[#7a6e5e] mb-4">
                Are you sure you want to delete all <strong className="text-red-600">{stats?.total || 0}</strong> flag reports?
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="font-mono-dm text-xs text-red-600">
                  ⚠️ This will permanently remove all flag reports from the database.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteAllModal(false)}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase border-2 border-[#c4b89a] text-[#7a6e5e] py-2.5 rounded-lg hover:bg-[#ede8dc] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteAllFlags}
                  disabled={deletingAll}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deletingAll ? "Deleting..." : "Yes, Delete All"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}