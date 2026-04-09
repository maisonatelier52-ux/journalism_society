
// app/document-room/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import documentsAPI from "@/services/documentsApi";
import { FiSearch, FiFileText, FiDownload, FiCalendar, FiTag, FiCheck, FiX } from "react-icons/fi";

/* ── GOOGLE FONTS (consistent with dockets) ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
    html { font-family: 'EB Garamond', Georgia, serif; }
    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm { font-family: 'DM Mono', monospace; }
    .document-row:hover { background-color: #ede8dc; }
    .document-row:hover .download-arrow { opacity: 1; transform: translateX(4px); }
    .download-arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
    @media (max-width: 640px) {
      .download-arrow { opacity: 1; }
    }
    input[type="text"]::placeholder { color: #9a8870; font-style: italic; }
    input[type="text"]:focus { outline: none; }
    
    /* Custom scrollbar for table container */
    .table-container::-webkit-scrollbar {
      height: 6px;
    }
    .table-container::-webkit-scrollbar-track {
      background: #e4ddd0;
      border-radius: 3px;
    }
    .table-container::-webkit-scrollbar-thumb {
      background: #b8974a;
      border-radius: 3px;
    }
    .table-container::-webkit-scrollbar-thumb:hover {
      background: #1e2d4a;
    }
  `}</style>
);

function fmtDate(iso) {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// Toast notification component
function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded shadow-lg ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    } text-white`}>
      {type === "success" ? <FiCheck size={16} /> : <FiX size={16} />}
      <span className="font-mono-dm text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 text-white opacity-70 hover:opacity-100">
        <FiX size={14} />
      </button>
    </div>
  );
}

/* ── COMPONENT ── */
export default function DocumentRoomPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setType] = useState("All");
  const [sortBy, setSort] = useState("newest");
  const [downloading, setDownloading] = useState(null);
  const [toast, setToast] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch documents from API
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await documentsAPI.getAllDocuments();
      const docs = Array.isArray(data) ? data : (data.documents || []);
      setDocuments(docs);
    } catch (error) {
      console.error("Error fetching documents:", error);
      showToast("Failed to load documents", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownload = async (doc, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!doc || !doc.fileUrl) {
      showToast("No file URL available", "error");
      return;
    }

    setDownloading(doc._id || doc.id);

    try {
      let fileUrl = doc.fileUrl;
      if (fileUrl.startsWith('/')) {
        fileUrl = `${API_BASE_URL}${fileUrl}`;
      }
      
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.fileName || doc.title || 'document';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      showToast(`"${doc.title}" downloaded successfully!`, "success");
    } catch (error) {
      console.error("Download error:", error);
      showToast(`Failed to download: ${error.message}`, "error");
    } finally {
      setDownloading(null);
    }
  };

  // Get unique types from fetched documents
  const typeList = useMemo(() => {
    const types = ["All", ...new Set(documents.map(d => d.type).filter(Boolean))];
    return types;
  }, [documents]);

  // Filter and sort documents
  const filtered = useMemo(() => {
    let l = [...documents];
    if (search.trim()) {
      const q = search.toLowerCase();
      l = l.filter(d => 
        d.title?.toLowerCase().includes(q) || 
        d.documentId?.toLowerCase().includes(q) ||
        d.sourceDocketNumber?.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "All") l = l.filter(d => d.type === typeFilter);
    l.sort((a, b) => sortBy === "newest" 
      ? new Date(b.createdAt || b.publishedDate) - new Date(a.createdAt || a.publishedDate)
      : new Date(a.createdAt || a.publishedDate) - new Date(b.createdAt || b.publishedDate));
    return l;
  }, [documents, search, typeFilter, sortBy]);

  const counts = {
    total: documents.length,
    byType: documents.reduce((acc, d) => {
      acc[d.type] = (acc[d.type] || 0) + 1;
      return acc;
    }, {})
  };

  const clearAll = () => { setSearch(""); setType("All"); };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
      <FontStyle />
      <Header />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {/* Page Header */}
        <div className="pt-8 sm:pt-10 pb-6 sm:pb-8">
          <p className="font-mono-dm text-xs tracking-widest uppercase mb-3 sm:mb-4" style={{ color: "#9a8870" }}>
            Public Record <span className="mx-2 opacity-40">/</span> Document Room
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="font-playfair leading-none">
              <span className="block font-black text-4xl sm:text-5xl md:text-6xl" style={{ color: "#1e2d4a" }}>Document</span>
              <span className="block font-normal italic text-4xl sm:text-5xl md:text-6xl" style={{ color: "#b8974a" }}>Room</span>
            </h1>
            <p className="font-garamond italic text-sm sm:text-base max-w-xs leading-relaxed" style={{ color: "#7a6e5e" }}>
              Full public records, exhibits, and supporting documents from every docket.
            </p>
          </div>

          {/* Stat Strip - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 border-b border-[#d4c8b4] pb-4 sm:pb-6">
            {[
              { label: "Total Documents", val: counts.total, accent: "#1e2d4a" },
              { label: "Response Dockets", val: counts.byType["Response Docket"] || 0, accent: "#2d6a4f" },
              { label: "Regulatory Docs", val: (counts.byType["Regulatory Document"] || 0) + (counts.byType["Benchmark"] || 0), accent: "#b8974a" },
              { label: "Evidence & Records", val: (counts.byType["Evidence"] || 0) + (counts.byType["Institutional Record"] || 0) + (counts.byType["Public Record"] || 0), accent: "#7a6e5e" },
            ].map(s => (
              <div key={s.label} className="pr-4 sm:pr-8 pb-2 sm:pb-0">
                <div className="mb-2 sm:mb-3 h-0.5" style={{ background: s.accent }} />
                <div className="font-playfair font-black text-3xl sm:text-4xl md:text-5xl leading-none" style={{ color: s.accent }}>{s.val}</div>
                <div className="font-mono-dm text-[0.55rem] sm:text-xs tracking-widest uppercase mt-1 sm:mt-2" style={{ color: "#9a8870" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter / Search Bar - Responsive */}
        <div className="mb-4" style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "12px 16px" }}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
            {/* Search input */}
            <div className="flex-1 min-w-[200px] relative">
              <div className="flex items-center gap-2 pb-1" style={{ borderBottom: "1.5px solid #1e2d4a" }}>
                <FiSearch size={14} className="text-[#9a8870] flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by title, document ID, or docket ID…"
                  className="bg-transparent w-full py-1.5 font-garamond text-sm"
                  style={{ color: "#1e2d4a" }}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-[#9a8870] hover:text-[#1e2d4a] text-lg leading-none flex-shrink-0">×</button>
                )}
              </div>
            </div>

            <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

            {/* Type filter chips - scrollable on mobile */}
            <div className="flex items-center gap-1 flex-nowrap overflow-x-auto pb-1 md:pb-0" style={{ scrollbarWidth: "thin" }}>
              <span className="font-mono-dm text-xs tracking-widest uppercase mr-1 flex-shrink-0" style={{ color: "#9a8870" }}>Type</span>
              {typeList.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="font-mono-dm text-[0.6rem] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1 border transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
                  style={typeFilter === t
                    ? { background: "#1e2d4a", color: "#f5f0e8", borderColor: "#1e2d4a" }
                    : { background: "transparent", color: "#7a6e5e", borderColor: "#c4b89a" }
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

            {/* Sort order + reset */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono-dm text-xs uppercase tracking-wider flex-shrink-0" style={{ color: "#9a8870" }}>Sort:</span>
                <div className="flex gap-1">
                  <button onClick={() => setSort("newest")} className={`px-1.5 py-0.5 transition-colors text-xs ${sortBy === "newest" ? "text-[#1e2d4a] font-medium" : "text-[#9a8870] hover:text-[#1e2d4a]"}`}>Latest</button>
                  <span className="text-[#9a8870]">·</span>
                  <button onClick={() => setSort("oldest")} className={`px-1.5 py-0.5 transition-colors text-xs ${sortBy === "oldest" ? "text-[#1e2d4a] font-medium" : "text-[#9a8870] hover:text-[#1e2d4a]"}`}>Oldest</button>
                </div>
              </div>
              {(search || typeFilter !== "All") && (
                <button
                  onClick={clearAll}
                  className="font-mono-dm text-xs tracking-wider uppercase px-2 py-1 border border-dashed transition-colors"
                  style={{ color: "#b8974a", borderColor: "#b8974a" }}
                >
                  Reset
                </button>
              )}
              <span className="font-mono-dm text-xs uppercase tracking-wider hidden sm:inline" style={{ color: "#9a8870" }}>
                {filtered.length} of {documents.length}
              </span>
            </div>
          </div>
        </div>

        {/* Document List - With Horizontal Scroll on Mobile */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-20 border border-[#d4c8b4]">
            <p className="font-playfair italic text-xl sm:text-2xl mb-2" style={{ color: "#c4b89a" }}>No documents found</p>
            <p className="font-garamond text-sm sm:text-base" style={{ color: "#9a8870" }}>Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="mt-4">
            {/* Responsive Table Container with Horizontal Scroll */}
            <div className="table-container overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: "touch" }}>
              {/* Minimum width ensures proper layout on mobile */}
              <div style={{ minWidth: "800px" }}>
                {/* Header */}
                <div className="grid grid-cols-12 gap-3 sm:gap-4 pb-3 border-b-2 mb-0" style={{ borderColor: "#1e2d4a" }}>
                  <span className="col-span-5 font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Document Title</span>
                  <span className="col-span-2 font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Type</span>
                  <span className="col-span-2 font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Docket</span>
                  <span className="col-span-2 font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Date</span>
                  <span className="col-span-1 font-mono-dm text-xs tracking-widest uppercase text-right" style={{ color: "#9a8870" }}>Action</span>
                </div>

                {filtered.map(doc => (
                  <div
                    key={doc._id || doc.id}
                    className="document-row grid grid-cols-12 gap-3 sm:gap-4 py-3 sm:py-4 border-b cursor-pointer transition-colors"
                    style={{ borderColor: "#d4c8b4" }}
                    onClick={() => window.location.href = `/document-room/${doc._id || doc.id}`}
                  >
                    {/* Title */}
                    <div className="col-span-5">
                      <div className="font-playfair font-bold text-sm sm:text-base leading-snug" style={{ color: "#1e2d4a" }}>{doc.title}</div>
                      <div className="font-mono-dm text-[0.65rem] sm:text-xs mt-0.5 sm:mt-1" style={{ color: "#9a8870" }}>{doc.documentId || doc.id}</div>
                    </div>
                    {/* Type badge */}
                    <div className="col-span-2 flex items-center">
                      <span className="font-mono-dm text-[0.6rem] sm:text-xs tracking-wider uppercase px-1.5 sm:px-2 py-0.5 border whitespace-nowrap" style={{ color: "#7a6e5e", borderColor: "#c4b89a" }}>
                        {doc.type}
                      </span>
                    </div>
                    {/* Docket ID */}
                    <div className="col-span-2 flex items-center">
                      <span className="font-mono-dm text-xs text-[#b8974a] truncate">{doc.sourceDocketNumber || "—"}</span>
                    </div>
                    {/* Date */}
                    <div className="col-span-2 flex items-center">
                      <span className="font-mono-dm text-xs whitespace-nowrap" style={{ color: "#9a8870" }}>{fmtDate(doc.createdAt || doc.publishedDate)}</span>
                    </div>
                    {/* Download */}
                    <div className="col-span-1 flex items-center justify-end">
                      <button
                        onClick={(e) => handleDownload(doc, e)}
                        disabled={downloading === (doc._id || doc.id)}
                        className="download-arrow cursor-pointer flex items-center gap-1 pe-2"
                        style={{ color: "#b8974a", background: "none", border: "none" }}
                      >
                        {downloading === (doc._id || doc.id) ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#b8974a] border-t-transparent"></div>
                        ) : (
                          <>
                            <FiDownload size={14} />
                            <span className="font-mono-dm text-xs hidden sm:inline">Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile result count */}
            <div className="mt-3 text-center sm:hidden">
              <span className="font-mono-dm text-xs text-[#9a8870]">
                {filtered.length} of {documents.length} documents
              </span>
            </div>
          </div>
        )}

        {/* Bottom CTA - Responsive */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2" style={{ borderColor: "#1e2d4a" }}>
          <div className="text-center sm:text-left">
            <div className="font-playfair font-bold text-lg sm:text-xl mb-1" style={{ color: "#1e2d4a" }}>Missing a document?</div>
            <p className="font-garamond italic text-sm sm:text-base" style={{ color: "#9a8870" }}>Submit a Right of Reply and we'll add all exhibits to the Document Room.</p>
          </div>
          <Link href="/submit" className="font-mono-dm text-xs tracking-widest uppercase px-5 sm:px-6 py-3 sm:py-3.5 flex items-center gap-2 text-[#f5f0e8] hover:opacity-90 transition-opacity whitespace-nowrap" style={{ background: "#1e2d4a" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Submit a Reply
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
