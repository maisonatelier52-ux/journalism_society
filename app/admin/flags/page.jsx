

// // app/admin/flags/page.jsx
// "use client";

// import { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import {
//   FiAlertTriangle, FiEye, FiCheckCircle, FiXCircle,
//   FiClock, FiMail, FiRefreshCw, FiChevronLeft, FiChevronRight,
//   FiTrash2, FiSearch, FiInfo, FiMessageSquare, FiArrowRight,
//   FiEdit2, FiSave, FiX,
// } from "react-icons/fi";
// import adminAPI from "@/services/adminApi";

// // ── Constants ───────────────────────────────────────────────
// const STATUS_CONFIG = {
//   pending:   { label: "Pending",   color: "#b45309", bg: "#fffbeb", border: "#fde68a", icon: FiClock },
//   reviewing: { label: "Reviewing", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", icon: FiEye },
//   resolved:  { label: "Resolved",  color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", icon: FiCheckCircle },
//   dismissed: { label: "Dismissed", color: "#6b7280", bg: "#f3f4f6", border: "#e5e7eb", icon: FiXCircle },
// };

// const CATEGORY_COLORS = {
//   "Factual Error":       { bg: "#fef2f2", text: "#b91c1c", icon: "📝" },
//   "Date Inaccuracy":     { bg: "#fffbeb", text: "#b45309", icon: "📅" },
//   "Name / Entity Error": { bg: "#eff6ff", text: "#1d4ed8", icon: "👤" },
//   "Missing Information": { bg: "#faf5ff", text: "#7e22ce", icon: "❓" },
//   "Document Error":      { bg: "#f0fdf4", text: "#15803d", icon: "📄" },
//   "Other":               { bg: "#f3f4f6", text: "#374151", icon: "📌" },
// };

// // ── Helpers ─────────────────────────────────────────────────
// const formatDate = (date) => {
//   if (!date) return "N/A";
//   return new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit", month: "short", year: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   });
// };

// const formatRelativeTime = (date) => {
//   if (!date) return "N/A";
//   const diffMs = new Date() - new Date(date);
//   const diffMins = Math.floor(diffMs / 60000);
//   const diffHours = Math.floor(diffMs / 3600000);
//   const diffDays = Math.floor(diffMs / 86400000);
//   if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
//   if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
//   if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
//   return formatDate(date);
// };

// // ── Detail Modal ─────────────────────────────────────────────
// function FlagDetailModal({ flag, onClose, onStatusChange, onDelete }) {
//   const [notes, setNotes] = useState(flag.adminNotes || "");
//   const [resolution, setResolution] = useState(flag.resolution || "");
//   const [savingNotes, setSavingNotes] = useState(false);
//   const [updatingStatus, setUpdatingStatus] = useState(false);
//   const [currentStatus, setCurrentStatus] = useState(flag.status);

//   const statusConfig = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.pending;
//   const categoryColor = CATEGORY_COLORS[flag.category] || CATEGORY_COLORS["Other"];

//   const handleSaveNotes = async () => {
//     setSavingNotes(true);
//     try {
//       await adminAPI.updateFlagNotes(flag._id, { adminNotes: notes, resolution });
//       alert("Notes saved successfully.");
//     } catch {
//       alert("Failed to save notes.");
//     } finally {
//       setSavingNotes(false);
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     setUpdatingStatus(true);
//     try {
//       await adminAPI.updateFlagStatus(flag._id, newStatus, notes, resolution);
//       setCurrentStatus(newStatus);
//       onStatusChange(flag._id, newStatus);
//     } catch {
//       alert("Failed to update status.");
//     } finally {
//       setUpdatingStatus(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm("Delete this flag report permanently?")) return;
//     try {
//       await adminAPI.deleteFlag(flag._id);
//       onDelete(flag._id);
//       onClose();
//     } catch {
//       alert("Failed to delete flag.");
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-[#f5f0e8] rounded-lg border-t-4 border-[#b8974a] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-[#f5f0e8] border-b border-[#e4ddd0] p-4 sm:p-6 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-[#ede8dc] flex items-center justify-center">
//               <FiAlertTriangle size={20} className="text-[#b8974a]" />
//             </div>
//             <div>
//               <h3 className="font-playfair font-bold text-lg sm:text-xl text-[#1e2d4a]">
//                 Flag Report Details
//               </h3>
//               <p className="font-mono-dm text-xs text-[#9a8870]">{flag.flagId}</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer p-1">
//             <FiX size={18} />
//           </button>
//         </div>

//         <div className="p-4 sm:p-6 space-y-5">
//           {/* Docket reference */}
//           <div className="bg-gradient-to-r from-[#ede8dc] to-[#f5f0e8] p-4 rounded-lg border border-[#d4c8b4]">
//             <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-2 flex items-center gap-2">
//               <FiEye size={12} /> Related Docket
//             </p>
//             <Link
//               href={`/dockets/${flag.docketId}`}
//               target="_blank"
//               className="font-mono-dm text-base font-semibold text-[#b8974a] hover:underline inline-flex items-center gap-2 cursor-pointer"
//             >
//               {flag.docketNumber}
//               <FiArrowRight size={12} />
//             </Link>
//             {flag.docketTitle && (
//               <p className="font-playfair font-semibold text-sm text-[#1e2d4a] mt-2">
//                 {flag.docketTitle}
//               </p>
//             )}
//           </div>

//           {/* Meta grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
//               <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1">Category</p>
//               <span
//                 className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono-dm uppercase rounded-full"
//                 style={{ background: categoryColor.bg, color: categoryColor.text }}
//               >
//                 {categoryColor.icon} {flag.category}
//               </span>
//             </div>
//             <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
//               <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1">Reported</p>
//               <p className="font-garamond text-sm text-[#1e2d4a]">
//                 {formatDate(flag.reportedAt)}
//               </p>
//             </div>
//             <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
//               <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1">Status</p>
//               <span
//                 className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-dm uppercase rounded-full"
//                 style={{
//                   background: STATUS_CONFIG[currentStatus]?.bg,
//                   color: STATUS_CONFIG[currentStatus]?.color,
//                   border: `1px solid ${STATUS_CONFIG[currentStatus]?.border}`,
//                 }}
//               >
//                 {currentStatus}
//               </span>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="bg-white p-4 rounded-lg border border-[#e4ddd0]">
//             <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-2 flex items-center gap-2">
//               <FiMessageSquare size={12} /> Description
//             </p>
//             <p className="font-garamond text-sm text-[#4a4035] whitespace-pre-wrap leading-relaxed">
//               {flag.description}
//             </p>
//           </div>

//           {/* Contact */}
//           {flag.contactEmail && (
//             <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
//               <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1 flex items-center gap-1">
//                 <FiMail size={11} /> Contact Email
//               </p>
//               <a
//                 href={`mailto:${flag.contactEmail}`}
//                 className="font-garamond text-sm text-[#b8974a] hover:underline"
//               >
//                 {flag.contactEmail}
//               </a>
//             </div>
//           )}

//           {/* Admin notes */}
//           <div className="space-y-3">
//             <div>
//               <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1.5">
//                 Admin Notes
//               </label>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 rows={3}
//                 className="w-full bg-white border border-[#d4c8b4] p-3 font-garamond text-sm text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y"
//                 placeholder="Internal notes for the editorial team…"
//               />
//             </div>
//             <div>
//               <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1.5">
//                 Resolution (shown if resolved)
//               </label>
//               <textarea
//                 value={resolution}
//                 onChange={(e) => setResolution(e.target.value)}
//                 rows={2}
//                 className="w-full bg-white border border-[#d4c8b4] p-3 font-garamond text-sm text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y"
//                 placeholder="Describe what was corrected…"
//               />
//             </div>
//             <button
//               onClick={handleSaveNotes}
//               disabled={savingNotes}
//               className="flex items-center gap-2 font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-[#f5f0e8] px-4 py-2 hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 cursor-pointer"
//             >
//               <FiSave size={12} />
//               {savingNotes ? "Saving…" : "Save Notes"}
//             </button>
//           </div>

//           {/* Status actions */}
//           <div className="pt-4 border-t border-[#e4ddd0]">
//             <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-3">Change Status</p>
//             <div className="flex flex-wrap gap-2">
//               {Object.entries(STATUS_CONFIG).map(([status, cfg]) => {
//                 const Icon = cfg.icon;
//                 if (status === currentStatus) return null;
//                 return (
//                   <button
//                     key={status}
//                     onClick={() => handleStatusChange(status)}
//                     disabled={updatingStatus}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-dm uppercase border rounded-lg transition-all disabled:opacity-50 cursor-pointer hover:shadow-sm"
//                     style={{
//                       background: cfg.bg,
//                       color: cfg.color,
//                       borderColor: cfg.border,
//                     }}
//                   >
//                     <Icon size={12} />
//                     Mark {cfg.label}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Delete */}
//           <div className="pt-2 border-t border-[#e4ddd0] flex justify-end">
//             <button
//               onClick={handleDelete}
//               className="flex items-center gap-2 font-mono-dm text-xs tracking-widest uppercase bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors cursor-pointer"
//             >
//               <FiTrash2 size={12} /> Delete This Flag
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main Page ────────────────────────────────────────────────
// export default function AdminFlagsPage() {
//   const [flags, setFlags] = useState([]);
//   const [stats, setStats] = useState({
//     pending: 0, reviewing: 0, resolved: 0, dismissed: 0, total: 0,
//   });
//   const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 20 });
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedFlag, setSelectedFlag] = useState(null);
//   const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
//   const [deletingAll, setDeletingAll] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch flags from API
//   const fetchFlags = useCallback(async (page = 1) => {
//     setLoading(true);
//     try {
//       const data = await adminAPI.getFlags({
//         status: statusFilter,
//         page,
//         limit: 20,
//       });
//       setFlags(data.flags || []);
//       setStats(data.stats || { pending: 0, reviewing: 0, resolved: 0, dismissed: 0, total: 0 });
//       setPagination(data.pagination || { page: 1, pages: 1, total: 0, limit: 20 });
//     } catch (error) {
//       console.error("Error fetching flags:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [statusFilter]);

//   useEffect(() => {
//     setCurrentPage(1);
//     fetchFlags(1);
//   }, [statusFilter]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     fetchFlags(page);
//   };

//   // Client-side search filter
//   const filteredFlags = flags.filter((flag) => {
//     if (!searchTerm) return true;
//     const term = searchTerm.toLowerCase();
//     return (
//       flag.docketNumber?.toLowerCase().includes(term) ||
//       flag.docketTitle?.toLowerCase().includes(term) ||
//       flag.description?.toLowerCase().includes(term) ||
//       flag.category?.toLowerCase().includes(term) ||
//       flag.flagId?.toLowerCase().includes(term)
//     );
//   });

//   // Handlers passed to detail modal
//   const handleStatusChange = (flagId, newStatus) => {
//     setFlags((prev) =>
//       prev.map((f) => (f._id === flagId ? { ...f, status: newStatus } : f))
//     );
//     // Refresh stats
//     fetchFlags(currentPage);
//   };

//   const handleDelete = (flagId) => {
//     setFlags((prev) => prev.filter((f) => f._id !== flagId));
//     setStats((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
//   };

//   const handleDeleteAll = async () => {
//     setDeletingAll(true);
//     try {
//       await adminAPI.deleteAllFlags();
//       setFlags([]);
//       setStats({ pending: 0, reviewing: 0, resolved: 0, dismissed: 0, total: 0 });
//       setPagination({ page: 1, pages: 1, total: 0, limit: 20 });
//       setShowDeleteAllModal(false);
//     } catch {
//       alert("Failed to delete all flags.");
//     } finally {
//       setDeletingAll(false);
//     }
//   };

//   // Quick status change from table (without opening modal)
//   const quickStatusChange = async (flagId, newStatus) => {
//     try {
//       await adminAPI.updateFlagStatus(flagId, newStatus);
//       handleStatusChange(flagId, newStatus);
//     } catch {
//       alert("Failed to update status.");
//     }
//   };

//   const statCards = [
//     { label: "Pending",   value: stats.pending,   status: "pending",   color: "#b45309", bg: "#fffbeb" },
//     { label: "Reviewing", value: stats.reviewing, status: "reviewing", color: "#1d4ed8", bg: "#eff6ff" },
//     { label: "Resolved",  value: stats.resolved,  status: "resolved",  color: "#15803d", bg: "#f0fdf4" },
//     { label: "Dismissed", value: stats.dismissed, status: "dismissed", color: "#6b7280", bg: "#f3f4f6" },
//     { label: "Total",     value: stats.total,     status: "all",       color: "#1e2d4a", bg: "#ede8dc" },
//   ];

//   return (
//     <div className="admin-page">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <div>
//           <h1 className="font-playfair font-black text-2xl sm:text-3xl text-[#1e2d4a] mb-1">
//             Flag Reports
//           </h1>
//           <p className="font-garamond text-sm sm:text-base text-[#7a6e5e]">
//             Review and manage user-reported errors and issues
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => fetchFlags(currentPage)}
//             className="flex items-center gap-2 bg-[#1e2d4a] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono-dm hover:bg-[#2a3f6a] transition-colors rounded-lg cursor-pointer"
//           >
//             <FiRefreshCw size={14} /> Refresh
//           </button>
//           {stats.total > 0 && (
//             <button
//               onClick={() => setShowDeleteAllModal(true)}
//               className="flex items-center gap-2 bg-red-600 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono-dm hover:bg-red-700 transition-colors rounded-lg cursor-pointer"
//             >
//               <FiTrash2 size={14} /> Delete All
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
//         {statCards.map((card) => (
//           <button
//             key={card.label}
//             onClick={() => setStatusFilter(card.status)}
//             className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
//               statusFilter === card.status
//                 ? "border-[#1e2d4a] shadow-md bg-white"
//                 : "border-[#e4ddd0] hover:border-[#b8974a] bg-white hover:shadow-sm"
//             }`}
//           >
//             <p className="font-playfair font-black text-2xl sm:text-3xl" style={{ color: card.color }}>
//               {card.value}
//             </p>
//             <div className="flex items-center gap-1.5 mt-1">
//               <div className="w-2 h-2 rounded-full" style={{ background: card.color }} />
//               <p className="font-mono-dm text-[0.65rem] sm:text-xs uppercase tracking-wider text-[#9a8870]">
//                 {card.label}
//               </p>
//             </div>
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="mb-4">
//         <div className="relative">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={16} />
//           <input
//             type="text"
//             placeholder="Search by docket number, title, category, or Flag ID…"
//             className="w-full pl-10 pr-4 py-2 border border-[#d4c8b4] rounded-lg font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] bg-white"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="border border-[#d4c8b4] bg-white rounded-lg overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[900px]">
//             <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
//               <tr>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Flag ID</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Reported</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Docket</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Category</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Description</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Status</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-12">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8974a]" />
//                       <p className="font-garamond text-[#9a8870]">Loading flag reports…</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredFlags.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-12">
//                     <div className="flex flex-col items-center gap-2">
//                       <FiCheckCircle size={40} className="text-[#c4b89a]" />
//                       <p className="font-playfair text-lg text-[#c4b89a]">All clear!</p>
//                       <p className="font-garamond text-sm text-[#9a8870]">
//                         {searchTerm ? "No matching flag reports found." : "No flag reports found."}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredFlags.map((flag) => {
//                   const statusConfig = STATUS_CONFIG[flag.status] || STATUS_CONFIG.pending;
//                   const StatusIcon = statusConfig.icon;
//                   const categoryColor = CATEGORY_COLORS[flag.category] || CATEGORY_COLORS["Other"];

//                   return (
//                     <tr
//                       key={flag._id}
//                       className="border-b border-[#e4ddd0] hover:bg-[#faf6ee] transition-colors"
//                     >
//                       {/* Flag ID */}
//                       <td className="py-3 px-4">
//                         <span className="font-mono-dm text-xs font-semibold text-[#b8974a]">
//                           {flag.flagId}
//                         </span>
//                       </td>

//                       {/* Reported */}
//                       <td className="py-3 px-4">
//                         <div className="flex flex-col">
//                           <span className="font-mono-dm text-xs font-medium text-[#b8974a]">
//                             {formatRelativeTime(flag.reportedAt)}
//                           </span>
//                           <span className="font-mono-dm text-[0.6rem] text-[#9a8870] mt-0.5">
//                             {formatDate(flag.reportedAt)}
//                           </span>
//                           {flag.contactEmail && (
//                             <span className="flex items-center gap-1 mt-1">
//                               <FiMail size={10} className="text-[#9a8870]" />
//                               <span className="font-mono-dm text-[0.55rem] text-[#9a8870] truncate max-w-[120px]">
//                                 {flag.contactEmail}
//                               </span>
//                             </span>
//                           )}
//                         </div>
//                       </td>

//                       {/* Docket */}
//                       <td className="py-3 px-4">
//                         <Link
//                           href={`/dockets/${flag.docketId}`}
//                           target="_blank"
//                           className="font-mono-dm text-sm font-semibold text-[#b8974a] hover:underline inline-flex items-center gap-1 cursor-pointer"
//                         >
//                           {flag.docketNumber}
//                           <FiEye size={10} />
//                         </Link>
//                         {flag.docketTitle && (
//                           <p className="font-garamond text-xs text-[#7a6e5e] line-clamp-1 mt-0.5 max-w-[160px]">
//                             {flag.docketTitle}
//                           </p>
//                         )}
//                       </td>

//                       {/* Category */}
//                       <td className="py-3 px-4">
//                         <span
//                           className="inline-flex items-center gap-1.5 px-2 py-1 text-[0.65rem] font-mono-dm uppercase rounded-full whitespace-nowrap"
//                           style={{ background: categoryColor.bg, color: categoryColor.text }}
//                         >
//                           {categoryColor.icon} {flag.category}
//                         </span>
//                       </td>

//                       {/* Description */}
//                       <td className="py-3 px-4">
//                         <p className="font-garamond text-sm text-[#1e2d4a] line-clamp-2 max-w-[260px]">
//                           {flag.description}
//                         </p>
//                       </td>

//                       {/* Status */}
//                       <td className="py-3 px-4">
//                         <span
//                           className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-mono-dm font-medium uppercase rounded-full whitespace-nowrap"
//                           style={{
//                             background: statusConfig.bg,
//                             color: statusConfig.color,
//                             border: `1px solid ${statusConfig.border}`,
//                           }}
//                         >
//                           <StatusIcon size={10} />
//                           {statusConfig.label}
//                         </span>
//                       </td>

//                       {/* Actions */}
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-1">
//                           {/* View Detail */}
//                           <button
//                             onClick={() => setSelectedFlag(flag)}
//                             className="p-1.5 text-[#b8974a] hover:text-[#1e2d4a] hover:bg-[#ede8dc] rounded transition-all cursor-pointer"
//                             title="View Details"
//                           >
//                             <FiInfo size={15} />
//                           </button>

//                           {/* Quick status buttons */}
//                           {flag.status === "pending" && (
//                             <button
//                               onClick={() => quickStatusChange(flag._id, "reviewing")}
//                               className="p-1.5 text-[#1d4ed8] hover:bg-[#eff6ff] rounded transition-all cursor-pointer"
//                               title="Mark as Reviewing"
//                             >
//                               <FiEye size={15} />
//                             </button>
//                           )}
//                           {(flag.status === "pending" || flag.status === "reviewing") && (
//                             <>
//                               <button
//                                 onClick={() => quickStatusChange(flag._id, "resolved")}
//                                 className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-all cursor-pointer"
//                                 title="Mark as Resolved"
//                               >
//                                 <FiCheckCircle size={15} />
//                               </button>
//                               <button
//                                 onClick={() => quickStatusChange(flag._id, "dismissed")}
//                                 className="p-1.5 text-gray-400 hover:bg-gray-100 rounded transition-all cursor-pointer"
//                                 title="Dismiss"
//                               >
//                                 <FiXCircle size={15} />
//                               </button>
//                             </>
//                           )}
//                           {/* Delete */}
//                           <button
//                             onClick={async () => {
//                               if (!confirm("Delete this flag permanently?")) return;
//                               try {
//                                 await adminAPI.deleteFlag(flag._id);
//                                 handleDelete(flag._id);
//                               } catch {
//                                 alert("Failed to delete.");
//                               }
//                             }}
//                             className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-all cursor-pointer"
//                             title="Delete Flag"
//                           >
//                             <FiTrash2 size={15} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       {!loading && pagination.pages > 1 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
//           <div className="text-sm text-[#9a8870] font-mono-dm">
//             Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
//             {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reports
//           </div>
//           <div className="flex gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//               className="flex items-center gap-1 px-3 py-1.5 border border-[#c4b89a] rounded-lg text-[#7a6e5e] hover:bg-[#ede8dc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
//             >
//               <FiChevronLeft size={14} /> Previous
//             </button>
//             <div className="flex gap-1">
//               {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
//                 const pageNum = i + 1;
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => handlePageChange(pageNum)}
//                     className={`w-8 h-8 rounded-lg font-mono-dm text-sm transition-colors cursor-pointer ${
//                       currentPage === pageNum
//                         ? "bg-[#1e2d4a] text-white"
//                         : "text-[#7a6e5e] hover:bg-[#ede8dc]"
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//             </div>
//             <button
//               disabled={currentPage === pagination.pages}
//               onClick={() => handlePageChange(currentPage + 1)}
//               className="flex items-center gap-1 px-3 py-1.5 border border-[#c4b89a] rounded-lg text-[#7a6e5e] hover:bg-[#ede8dc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
//             >
//               Next <FiChevronRight size={14} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Detail Modal */}
//       {selectedFlag && (
//         <FlagDetailModal
//           flag={selectedFlag}
//           onClose={() => setSelectedFlag(null)}
//           onStatusChange={handleStatusChange}
//           onDelete={handleDelete}
//         />
//       )}

//       {/* Delete All Confirm Modal */}
//       {showDeleteAllModal && (
//         <div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           onClick={() => !deletingAll && setShowDeleteAllModal(false)}
//         >
//           <div
//             className="bg-[#f5f0e8] rounded-lg border-t-4 border-red-500 max-w-md w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
//                   <FiTrash2 size={24} className="text-red-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-playfair font-bold text-xl text-[#1e2d4a]">
//                     Delete All Reports
//                   </h3>
//                   <p className="font-garamond text-sm text-[#7a6e5e]">
//                     This action cannot be undone
//                   </p>
//                 </div>
//               </div>
//               <p className="font-garamond text-[#7a6e5e] mb-4">
//                 Are you sure you want to delete all{" "}
//                 <strong className="text-red-600">{stats.total}</strong> flag reports?
//               </p>
//               <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
//                 <p className="font-mono-dm text-xs text-red-600">
//                   ⚠️ This will permanently remove all flag reports from the database.
//                 </p>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowDeleteAllModal(false)}
//                   disabled={deletingAll}
//                   className="flex-1 font-mono-dm text-xs tracking-widest uppercase border-2 border-[#c4b89a] text-[#7a6e5e] py-2.5 rounded-lg hover:bg-[#ede8dc] transition-colors disabled:opacity-50 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteAll}
//                   disabled={deletingAll}
//                   className="flex-1 font-mono-dm text-xs tracking-widest uppercase bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
//                 >
//                   {deletingAll ? "Deleting…" : "Yes, Delete All"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// app/admin/flags/page.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FiAlertTriangle, FiEye, FiCheckCircle, FiXCircle,
  FiClock, FiMail, FiRefreshCw, FiChevronLeft, FiChevronRight,
  FiTrash2, FiSearch, FiInfo, FiMessageSquare, FiArrowRight,
  FiEdit2, FiSave, FiX, FiFileText,
} from "react-icons/fi";
import adminAPI from "@/services/adminApi";

// ── Constants ────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:   { label: "Pending",   color: "#b45309", bg: "#fffbeb", border: "#fde68a", icon: FiClock },
  reviewing: { label: "Reviewing", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", icon: FiEye },
  resolved:  { label: "Resolved",  color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", icon: FiCheckCircle },
  dismissed: { label: "Dismissed", color: "#6b7280", bg: "#f3f4f6", border: "#e5e7eb", icon: FiXCircle },
};

const CATEGORY_COLORS = {
  "Factual Error":       { bg: "#fef2f2", text: "#b91c1c", icon: "📝" },
  "Date Inaccuracy":     { bg: "#fffbeb", text: "#b45309", icon: "📅" },
  "Name / Entity Error": { bg: "#eff6ff", text: "#1d4ed8", icon: "👤" },
  "Missing Information": { bg: "#faf5ff", text: "#7e22ce", icon: "❓" },
  "Document Error":      { bg: "#f0fdf4", text: "#15803d", icon: "📄" },
  "Other":               { bg: "#f3f4f6", text: "#374151", icon: "📌" },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const formatRelativeTime = (date) => {
  if (!date) return "N/A";
  const diffMs    = new Date() - new Date(date);
  const diffMins  = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays  = Math.floor(diffMs / 86400000);
  if (diffMins  < 60) return `${diffMins} min${diffMins   !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays  < 7)  return `${diffDays} day${diffDays   !== 1 ? "s" : ""} ago`;
  return formatDate(date);
};

// ── Resolve & Log Correction Modal ───────────────────────────────────────────
function ResolveCorrectionModal({ flag, onClose, onResolved }) {
  const [form, setForm] = useState({
    type: "Correction",
    description: "",
    resolution: "",
    adminNotes: flag.adminNotes || "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description.trim()) {
      setErrors({ description: "Please describe what was corrected." });
      return;
    }
    setLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token    = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/corrections/admin/resolve-flag/${flag._id}`, {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          Authorization:   `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed");

      onResolved(flag._id, "resolved");
      onClose();
    } catch (err) {
      alert(err.message || "Failed to resolve. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[600] p-4" onClick={onClose}>
      <div
        className="bg-[#f5f0e8] rounded-lg border-t-4 border-[#2d6a4f] max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1e2d4a] p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2d6a4f] flex items-center justify-center">
              <FiFileText size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-lg text-[#f5f0e8]">Resolve & Log Correction</h3>
              <p className="font-mono-dm text-xs text-[#6a7a94]">{flag.flagId} · {flag.docketNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#5a6e8a] hover:text-[#f5f0e8] cursor-pointer p-1">
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Original flag description */}
          <div className="bg-[#ede8dc] border border-[#d4c8b4] p-3 rounded">
            <p className="font-mono-dm text-[0.52rem] uppercase tracking-[0.12em] text-[#9a8870] mb-1.5">
              Original Flag Report
            </p>
            <p className="font-garamond text-sm text-[#4a4035] leading-relaxed">{flag.description}</p>
          </div>

          {/* Correction type */}
          <div>
            <label className="font-mono-dm text-[0.52rem] uppercase tracking-[0.14em] text-[#9a8870] block mb-1.5">
              Correction Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-sm text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] cursor-pointer"
            >
              <option>Correction</option>
              <option>Clarification</option>
              <option>Update</option>
            </select>
          </div>

          {/* What was corrected (public correction log entry) */}
          <div>
            <label className="font-mono-dm text-[0.52rem] uppercase tracking-[0.14em] text-[#9a8870] block mb-1.5">
              Description of Correction <span className="text-red-500">*</span>
              <span className="normal-case ml-1 text-[#b8974a]">(shown publicly in Corrections page)</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({}); }}
              rows={3}
              className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-sm text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y"
              placeholder="e.g. Timeline date corrected from 14 March to 15 March per exhibit documentation."
            />
            {errors.description && (
              <p className="font-mono-dm text-[0.54rem] text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Internal resolution note */}
          <div>
            <label className="font-mono-dm text-[0.52rem] uppercase tracking-[0.14em] text-[#9a8870] block mb-1.5">
              Resolution Note (internal)
            </label>
            <textarea
              value={form.resolution}
              onChange={(e) => setForm({ ...form, resolution: e.target.value })}
              rows={2}
              className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-sm text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y"
              placeholder="Internal note for the editorial team…"
            />
          </div>

          {/* Info box */}
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-3 flex gap-2">
            <FiCheckCircle size={14} className="text-[#15803d] flex-shrink-0 mt-0.5" />
            <p className="font-garamond text-sm text-[#15803d]">
              This will mark the flag as <strong>Resolved</strong> and add a public entry to the Corrections &amp; Clarifications log.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="font-mono-dm text-[0.58rem] tracking-[0.1em] uppercase border border-[#c4b89a] text-[#7a6e5e] px-4 py-2 hover:bg-[#ede8dc] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="font-mono-dm text-[0.58rem] tracking-[0.1em] uppercase bg-[#2d6a4f] text-white px-5 py-2 hover:bg-[#1e4a35] transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              <FiCheckCircle size={12} />
              {loading ? "Saving…" : "Resolve & Log →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function FlagDetailModal({ flag, onClose, onStatusChange, onDelete }) {
  const [notes,          setNotes]          = useState(flag.adminNotes || "");
  const [resolution,     setResolution]     = useState(flag.resolution || "");
  const [savingNotes,    setSavingNotes]    = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [currentStatus,  setCurrentStatus]  = useState(flag.status);
  const [showResolveModal, setShowResolveModal] = useState(false);

  const statusConfig  = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.pending;
  const categoryColor = CATEGORY_COLORS[flag.category] || CATEGORY_COLORS["Other"];

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    try {
      await adminAPI.updateFlagNotes(flag._id, { adminNotes: notes, resolution });
      alert("Notes saved successfully.");
    } catch {
      alert("Failed to save notes.");
    } finally {
      setSavingNotes(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === "resolved") {
      // Open the resolve+correction modal instead of direct status change
      setShowResolveModal(true);
      return;
    }
    setUpdatingStatus(true);
    try {
      await adminAPI.updateFlagStatus(flag._id, newStatus, notes, resolution);
      setCurrentStatus(newStatus);
      onStatusChange(flag._id, newStatus);
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleResolvedFromModal = (flagId, newStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange(flagId, newStatus);
    setShowResolveModal(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this flag report permanently?")) return;
    try {
      await adminAPI.deleteFlag(flag._id);
      onDelete(flag._id);
      onClose();
    } catch {
      alert("Failed to delete flag.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div
          className="bg-[#f5f0e8] rounded-lg border-t-4 border-[#b8974a] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#f5f0e8] border-b border-[#e4ddd0] p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ede8dc] flex items-center justify-center">
                <FiAlertTriangle size={20} className="text-[#b8974a]" />
              </div>
              <div>
                <h3 className="font-playfair font-bold text-lg sm:text-xl text-[#1e2d4a]">Flag Report Details</h3>
                <p className="font-mono-dm text-xs text-[#9a8870]">{flag.flagId}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer p-1">
              <FiX size={18} />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            {/* Docket reference */}
            <div className="bg-gradient-to-r from-[#ede8dc] to-[#f5f0e8] p-4 rounded-lg border border-[#d4c8b4]">
              <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-2 flex items-center gap-2">
                <FiEye size={12} /> Related Docket
              </p>
              <Link
                href={`/dockets/${flag.docketId}`}
                target="_blank"
                className="font-mono-dm text-base font-semibold text-[#b8974a] hover:underline inline-flex items-center gap-2 cursor-pointer"
              >
                {flag.docketNumber}
                <FiArrowRight size={12} />
              </Link>
              {flag.docketTitle && (
                <p className="font-playfair font-semibold text-sm text-[#1e2d4a] mt-2">{flag.docketTitle}</p>
              )}
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
                <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1">Category</p>
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono-dm uppercase rounded-full"
                  style={{ background: categoryColor.bg, color: categoryColor.text }}
                >
                  {categoryColor.icon} {flag.category}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
                <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1">Reported</p>
                <p className="font-garamond text-sm text-[#1e2d4a]">{formatDate(flag.reportedAt)}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
                <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1">Status</p>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-dm uppercase rounded-full"
                  style={{
                    background: STATUS_CONFIG[currentStatus]?.bg,
                    color:      STATUS_CONFIG[currentStatus]?.color,
                    border:     `1px solid ${STATUS_CONFIG[currentStatus]?.border}`,
                  }}
                >
                  {currentStatus}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 rounded-lg border border-[#e4ddd0]">
              <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-2 flex items-center gap-2">
                <FiMessageSquare size={12} /> Description
              </p>
              <p className="font-garamond text-sm text-[#4a4035] whitespace-pre-wrap leading-relaxed">
                {flag.description}
              </p>
            </div>

            {/* Contact */}
            {flag.contactEmail && (
              <div className="bg-white p-3 rounded-lg border border-[#e4ddd0]">
                <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-1 flex items-center gap-1">
                  <FiMail size={11} /> Contact Email
                </p>
                <a href={`mailto:${flag.contactEmail}`} className="font-garamond text-sm text-[#b8974a] hover:underline">
                  {flag.contactEmail}
                </a>
              </div>
            )}

            {/* Admin notes */}
            <div className="space-y-3">
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1.5">Admin Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-[#d4c8b4] p-3 font-garamond text-sm text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y"
                  placeholder="Internal notes for the editorial team…"
                />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1.5">
                  Resolution (shown if resolved)
                </label>
                <textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-[#d4c8b4] p-3 font-garamond text-sm text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y"
                  placeholder="Describe what was corrected…"
                />
              </div>
              <button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="flex items-center gap-2 font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-[#f5f0e8] px-4 py-2 hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <FiSave size={12} />
                {savingNotes ? "Saving…" : "Save Notes"}
              </button>
            </div>

            {/* Status actions */}
            <div className="pt-4 border-t border-[#e4ddd0]">
              <p className="font-mono-dm text-xs uppercase text-[#9a8870] mb-3">Change Status</p>
              <div className="flex flex-wrap gap-2">
                {/* Special "Resolve & Log Correction" button */}
                {(currentStatus === "pending" || currentStatus === "reviewing") && (
                  <button
                    onClick={() => setShowResolveModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-dm uppercase border rounded-lg transition-all cursor-pointer hover:shadow-sm bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0] font-semibold"
                  >
                    <FiCheckCircle size={12} />
                    Resolve &amp; Log Correction
                  </button>
                )}
                {Object.entries(STATUS_CONFIG).map(([status, cfg]) => {
                  const Icon = cfg.icon;
                  if (status === currentStatus || status === "resolved") return null;
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={updatingStatus}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-dm uppercase border rounded-lg transition-all disabled:opacity-50 cursor-pointer hover:shadow-sm"
                      style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}
                    >
                      <Icon size={12} />
                      Mark {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delete */}
            <div className="pt-2 border-t border-[#e4ddd0] flex justify-end">
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 font-mono-dm text-xs tracking-widest uppercase bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors cursor-pointer"
              >
                <FiTrash2 size={12} /> Delete This Flag
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resolve + log correction sub-modal */}
      {showResolveModal && (
        <ResolveCorrectionModal
          flag={flag}
          onClose={() => setShowResolveModal(false)}
          onResolved={handleResolvedFromModal}
        />
      )}
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminFlagsPage() {
  const [flags,       setFlags]       = useState([]);
  const [stats,       setStats]       = useState({ pending: 0, reviewing: 0, resolved: 0, dismissed: 0, total: 0 });
  const [pagination,  setPagination]  = useState({ page: 1, pages: 1, total: 0, limit: 20 });
  const [statusFilter,setStatusFilter]= useState("all");
  const [searchTerm,  setSearchTerm]  = useState("");
  const [loading,     setLoading]     = useState(true);
  const [selectedFlag,setSelectedFlag]= useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFlags = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const data = await adminAPI.getFlags({ status: statusFilter, page, limit: 20 });
      setFlags(data.flags || []);
      setStats(data.stats || { pending: 0, reviewing: 0, resolved: 0, dismissed: 0, total: 0 });
      setPagination(data.pagination || { page: 1, pages: 1, total: 0, limit: 20 });
    } catch (error) {
      console.error("Error fetching flags:", error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
    fetchFlags(1);
  }, [statusFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchFlags(page);
  };

  const filteredFlags = flags.filter((flag) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      flag.docketNumber?.toLowerCase().includes(term) ||
      flag.docketTitle?.toLowerCase().includes(term)  ||
      flag.description?.toLowerCase().includes(term)  ||
      flag.category?.toLowerCase().includes(term)     ||
      flag.flagId?.toLowerCase().includes(term)
    );
  });

  const handleStatusChange = (flagId, newStatus) => {
    setFlags((prev) => prev.map((f) => f._id === flagId ? { ...f, status: newStatus } : f));
    fetchFlags(currentPage);
  };

  const handleDelete = (flagId) => {
    setFlags((prev) => prev.filter((f) => f._id !== flagId));
    setStats((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    try {
      await adminAPI.deleteAllFlags();
      setFlags([]);
      setStats({ pending: 0, reviewing: 0, resolved: 0, dismissed: 0, total: 0 });
      setPagination({ page: 1, pages: 1, total: 0, limit: 20 });
      setShowDeleteAllModal(false);
    } catch {
      alert("Failed to delete all flags.");
    } finally {
      setDeletingAll(false);
    }
  };

  const quickStatusChange = async (flagId, newStatus) => {
    if (newStatus === "resolved") {
      // Can't quick-resolve — must use the modal to log a correction
      const flag = flags.find((f) => f._id === flagId);
      if (flag) setSelectedFlag(flag);
      return;
    }
    try {
      await adminAPI.updateFlagStatus(flagId, newStatus);
      handleStatusChange(flagId, newStatus);
    } catch {
      alert("Failed to update status.");
    }
  };

  const statCards = [
    { label: "Pending",   value: stats.pending,   status: "pending",   color: "#b45309", bg: "#fffbeb" },
    { label: "Reviewing", value: stats.reviewing, status: "reviewing", color: "#1d4ed8", bg: "#eff6ff" },
    { label: "Resolved",  value: stats.resolved,  status: "resolved",  color: "#15803d", bg: "#f0fdf4" },
    { label: "Dismissed", value: stats.dismissed, status: "dismissed", color: "#6b7280", bg: "#f3f4f6" },
    { label: "Total",     value: stats.total,     status: "all",       color: "#1e2d4a", bg: "#ede8dc" },
  ];

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-playfair font-black text-2xl sm:text-3xl text-[#1e2d4a] mb-1">Flag Reports</h1>
          <p className="font-garamond text-sm sm:text-base text-[#7a6e5e]">
            Review and manage user-reported errors. Resolving a flag automatically logs a public correction.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => fetchFlags(currentPage)}
            className="flex items-center gap-2 bg-[#1e2d4a] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono-dm hover:bg-[#2a3f6a] transition-colors rounded-lg cursor-pointer"
          >
            <FiRefreshCw size={14} /> Refresh
          </button>
          {stats.total > 0 && (
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono-dm hover:bg-red-700 transition-colors rounded-lg cursor-pointer"
            >
              <FiTrash2 size={14} /> Delete All
            </button>
          )}
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-3 mb-5 flex items-start gap-3">
        <FiFileText size={16} className="text-[#15803d] flex-shrink-0 mt-0.5" />
        <p className="font-garamond text-sm text-[#15803d]">
          <strong>Tip:</strong> When you resolve a flag using "Resolve &amp; Log Correction", it automatically creates a public entry in the{" "}
          <Link href="/corrections" target="_blank" className="underline hover:text-[#0f5132]">Corrections &amp; Clarifications</Link> page.
        </p>
      </div>

      {/* Stats Cards */}
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
            <p className="font-playfair font-black text-2xl sm:text-3xl" style={{ color: card.color }}>
              {card.value}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ background: card.color }} />
              <p className="font-mono-dm text-[0.65rem] sm:text-xs uppercase tracking-wider text-[#9a8870]">
                {card.label}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={16} />
          <input
            type="text"
            placeholder="Search by docket number, title, category, or Flag ID…"
            className="w-full pl-10 pr-4 py-2 border border-[#d4c8b4] rounded-lg font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#d4c8b4] bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
              <tr>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Flag ID</th>
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
                  <td colSpan="7" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8974a]" />
                      <p className="font-garamond text-[#9a8870]">Loading flag reports…</p>
                    </div>
                  </td>
                </tr>
              ) : filteredFlags.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <FiCheckCircle size={40} className="text-[#c4b89a]" />
                      <p className="font-playfair text-lg text-[#c4b89a]">All clear!</p>
                      <p className="font-garamond text-sm text-[#9a8870]">
                        {searchTerm ? "No matching flag reports found." : "No flag reports found."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredFlags.map((flag) => {
                  const statusConfig  = STATUS_CONFIG[flag.status] || STATUS_CONFIG.pending;
                  const StatusIcon    = statusConfig.icon;
                  const categoryColor = CATEGORY_COLORS[flag.category] || CATEGORY_COLORS["Other"];
                  return (
                    <tr key={flag._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee] transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono-dm text-xs font-semibold text-[#b8974a]">{flag.flagId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-mono-dm text-xs font-medium text-[#b8974a]">
                            {formatRelativeTime(flag.reportedAt)}
                          </span>
                          <span className="font-mono-dm text-[0.6rem] text-[#9a8870] mt-0.5">
                            {formatDate(flag.reportedAt)}
                          </span>
                          {flag.contactEmail && (
                            <span className="flex items-center gap-1 mt-1">
                              <FiMail size={10} className="text-[#9a8870]" />
                              <span className="font-mono-dm text-[0.55rem] text-[#9a8870] truncate max-w-[120px]">
                                {flag.contactEmail}
                              </span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/dockets/${flag.docketId}`}
                          target="_blank"
                          className="font-mono-dm text-sm font-semibold text-[#b8974a] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          {flag.docketNumber}
                          <FiEye size={10} />
                        </Link>
                        {flag.docketTitle && (
                          <p className="font-garamond text-xs text-[#7a6e5e] line-clamp-1 mt-0.5 max-w-[160px]">
                            {flag.docketTitle}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2 py-1 text-[0.65rem] font-mono-dm uppercase rounded-full whitespace-nowrap"
                          style={{ background: categoryColor.bg, color: categoryColor.text }}
                        >
                          {categoryColor.icon} {flag.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-garamond text-sm text-[#1e2d4a] line-clamp-2 max-w-[260px]">
                          {flag.description}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-mono-dm font-medium uppercase rounded-full whitespace-nowrap"
                          style={{ background: statusConfig.bg, color: statusConfig.color, border: `1px solid ${statusConfig.border}` }}
                        >
                          <StatusIcon size={10} />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedFlag(flag)}
                            className="p-1.5 text-[#b8974a] hover:text-[#1e2d4a] hover:bg-[#ede8dc] rounded transition-all cursor-pointer"
                            title="View Details"
                          >
                            <FiInfo size={15} />
                          </button>
                          {flag.status === "pending" && (
                            <button
                              onClick={() => quickStatusChange(flag._id, "reviewing")}
                              className="p-1.5 text-[#1d4ed8] hover:bg-[#eff6ff] rounded transition-all cursor-pointer"
                              title="Mark as Reviewing"
                            >
                              <FiEye size={15} />
                            </button>
                          )}
                          {(flag.status === "pending" || flag.status === "reviewing") && (
                            <>
                              {/* Green check = opens resolve+correction modal */}
                              <button
                                onClick={() => { setSelectedFlag(flag); }}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-all cursor-pointer"
                                title="Resolve & Log Correction"
                              >
                                <FiCheckCircle size={15} />
                              </button>
                              <button
                                onClick={() => quickStatusChange(flag._id, "dismissed")}
                                className="p-1.5 text-gray-400 hover:bg-gray-100 rounded transition-all cursor-pointer"
                                title="Dismiss"
                              >
                                <FiXCircle size={15} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={async () => {
                              if (!confirm("Delete this flag permanently?")) return;
                              try {
                                await adminAPI.deleteFlag(flag._id);
                                handleDelete(flag._id);
                              } catch {
                                alert("Failed to delete.");
                              }
                            }}
                            className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-all cursor-pointer"
                            title="Delete Flag"
                          >
                            <FiTrash2 size={15} />
                          </button>
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
      {!loading && pagination.pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="text-sm text-[#9a8870] font-mono-dm">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reports
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#c4b89a] rounded-lg text-[#7a6e5e] hover:bg-[#ede8dc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <FiChevronLeft size={14} /> Previous
            </button>
            <div className="flex gap-1">
              {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg font-mono-dm text-sm transition-colors cursor-pointer ${
                      currentPage === pageNum ? "bg-[#1e2d4a] text-white" : "text-[#7a6e5e] hover:bg-[#ede8dc]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              disabled={currentPage === pagination.pages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#c4b89a] rounded-lg text-[#7a6e5e] hover:bg-[#ede8dc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedFlag && (
        <FlagDetailModal
          flag={selectedFlag}
          onClose={() => setSelectedFlag(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}

      {/* Delete All Confirm Modal */}
      {showDeleteAllModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => !deletingAll && setShowDeleteAllModal(false)}
        >
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
                Are you sure you want to delete all{" "}
                <strong className="text-red-600">{stats.total}</strong> flag reports?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="font-mono-dm text-xs text-red-600">
                  ⚠️ This will permanently remove all flag reports from the database.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteAllModal(false)}
                  disabled={deletingAll}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase border-2 border-[#c4b89a] text-[#7a6e5e] py-2.5 rounded-lg hover:bg-[#ede8dc] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAll}
                  disabled={deletingAll}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deletingAll ? "Deleting…" : "Yes, Delete All"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}