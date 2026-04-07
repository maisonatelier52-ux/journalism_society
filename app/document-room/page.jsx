// // app/document-room/page.jsx
// "use client";

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// /* ── GOOGLE FONTS (consistent with dockets) ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
//     html { font-family: 'EB Garamond', Georgia, serif; }
//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm { font-family: 'DM Mono', monospace; }
//     .document-row:hover { background-color: #ede8dc; }
//     .document-row:hover .download-arrow { opacity: 1; transform: translateX(4px); }
//     .download-arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
//     @media (max-width: 640px) {
//       .download-arrow { opacity: 1; }
//     }
//     input[type="text"]::placeholder { color: #9a8870; font-style: italic; }
//     input[type="text"]:focus { outline: none; }
//   `}</style>
// );

// /* ── SAMPLE DATA (documents) ── */
// const ALL_DOCUMENTS = [
//   {
//     id: "DOC-001",
//     title: "Healthcare Providers Alliance — Full Response Docket (JS-2026-003)",
//     type: "Response Docket",
//     date: "2026-03-22",
//     fileUrl: "/documents/js-2026-003-full-docket.pdf",
//     checksum: "sha256:3f8a9b2c...e4d5",
//     preview: "Full response including exhibits, legal review, and regulatory correspondence."
//   },
//   {
//     id: "DOC-002",
//     title: "Kerala Clinical Establishments Act — 2012 Amendment (Full Text)",
//     type: "Regulatory Document",
//     date: "2024-01-15",
//     fileUrl: "/documents/kerala-clinical-act-amendment.pdf",
//     checksum: "sha256:7d2f1a8e...b9c3",
//     preview: "Official government gazette notification of the 2012 amendment to the Kerala Clinical Establishments Act."
//   },
//   {
//     id: "DOC-003",
//     title: "NABH Standard Rate Card — Diagnostic Procedures, 2024 Edition",
//     type: "Benchmark",
//     date: "2024-03-10",
//     fileUrl: "/documents/nabh-rate-card-2024.pdf",
//     checksum: "sha256:1e4f6a2b...c8d9",
//     preview: "Standard reference rates for diagnostic procedures as published by NABH."
//   },
//   {
//     id: "DOC-004",
//     title: "HPA Kerala Chapter — Membership Register (Redacted)",
//     type: "Institutional Record",
//     date: "2025-12-01",
//     fileUrl: "/documents/hpa-membership-register.pdf",
//     checksum: "sha256:5a8c3b2d...f1e0",
//     preview: "Redacted membership list of the HPA Kerala Chapter as of December 2025."
//   },
//   {
//     id: "DOC-005",
//     title: "Kerala Health Dept. Show-Cause Notice to HPA (17 March 2026)",
//     type: "Regulatory Document",
//     date: "2026-03-17",
//     fileUrl: "/documents/health-dept-notice.pdf",
//     checksum: "sha256:9d4c2f6e...a7b8",
//     preview: "Official show-cause notice issued by the Kerala Health Department to HPA Kerala Chapter."
//   },
//   {
//     id: "DOC-006",
//     title: "Independent Legal Review — Krishnaswamy & Associates (HPA Response)",
//     type: "Legal Analysis",
//     date: "2026-03-21",
//     fileUrl: "/documents/legal-review-krishnaswamy.pdf",
//     checksum: "sha256:2b7e5a1c...d3f4",
//     preview: "Independent legal review commissioned by HPA regarding the billing circular cited in the article."
//   },
//   {
//     id: "DOC-007",
//     title: "The Malabar Record — 'Inside the Billing Cartel' (15 March 2026)",
//     type: "Original Claim",
//     date: "2026-03-15",
//     fileUrl: "/documents/malabar-record-article.pdf",
//     checksum: "sha256:4c8a2f9b...e6d7",
//     preview: "Full text of the investigative article that prompted the HPA response."
//   },
//   {
//     id: "DOC-008",
//     title: "Patient Feedback Survey Results — HPA Member Hospitals (2024–2025)",
//     type: "Evidence",
//     date: "2026-02-28",
//     fileUrl: "/documents/patient-feedback-survey.pdf",
//     checksum: "sha256:6a1e4c8d...b2f3",
//     preview: "Aggregate results of patient satisfaction and billing transparency surveys."
//   },
//   {
//     id: "DOC-009",
//     title: "Journalism Society — Right of Reply Guidelines",
//     type: "Policy Document",
//     date: "2025-06-10",
//     fileUrl: "/documents/ror-guidelines.pdf",
//     checksum: "sha256:0f3a7c2e...d9b1",
//     preview: "Official guidelines for submitting a Right of Reply docket."
//   },
//   {
//     id: "DOC-010",
//     title: "Kerala STC Safety Inspection Records (2025)",
//     type: "Evidence",
//     date: "2025-11-20",
//     fileUrl: "/documents/stc-inspection-records.pdf",
//     checksum: "sha256:8b4d2f1e...c7a9",
//     preview: "Inspection records from the Kerala State Transport Corporation's 2025 safety audit."
//   },
//   {
//     id: "DOC-011",
//     title: "Calicut University Admissions Data (Anonymised) — 2024-2025",
//     type: "Institutional Record",
//     date: "2025-08-15",
//     fileUrl: "/documents/university-admissions-data.pdf",
//     checksum: "sha256:3c7a5e2b...f8d4",
//     preview: "Anonymised admission data for the 2024-2025 academic year."
//   },
//   {
//     id: "DOC-012",
//     title: "MLA Asset Declaration — Beypore Constituency (2025)",
//     type: "Public Record",
//     date: "2025-12-20",
//     fileUrl: "/documents/mla-asset-declaration.pdf",
//     checksum: "sha256:7e2a1c5d...b6f9",
//     preview: "Annual asset declaration filed by the elected representative."
//   },
// ];

// const TYPE_LIST = ["All", ...Array.from(new Set(ALL_DOCUMENTS.map(d => d.type)))];

// function fmtDate(iso) {
//   return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// }

// /* ── COMPONENT ── */
// export default function DocumentRoomPage() {
//   const [search, setSearch] = useState("");
//   const [typeFilter, setType] = useState("All");
//   const [sortBy, setSort] = useState("newest");

//   const filtered = useMemo(() => {
//     let l = [...ALL_DOCUMENTS];
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       l = l.filter(d => d.title.toLowerCase().includes(q) || d.id.toLowerCase().includes(q));
//     }
//     if (typeFilter !== "All") l = l.filter(d => d.type === typeFilter);
//     l.sort((a, b) => sortBy === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
//     return l;
//   }, [search, typeFilter, sortBy]);

//   const counts = {
//     total: ALL_DOCUMENTS.length,
//     byType: ALL_DOCUMENTS.reduce((acc, d) => {
//       acc[d.type] = (acc[d.type] || 0) + 1;
//       return acc;
//     }, {})
//   };

//   const clearAll = () => { setSearch(""); setType("All"); };

//   return (
//     <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
//       <FontStyle />

//       {/* ─── TOP NAV BAR (same as dockets) ─── */}
//     <Header/>

//       {/* ── MAIN CONTENT ── */}
//       <main className="max-w-6xl mx-auto px-6 pb-20">

//         {/* ── PAGE HEADER ── */}
//         <div className="pt-10 pb-8">
//           <p className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: "#9a8870" }}>
//             Public Record <span className="mx-2 opacity-40">/</span> Document Room
//           </p>
//           <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
//             <h1 className="font-playfair leading-none">
//               <span className="block font-black text-5xl md:text-6xl" style={{ color: "#1e2d4a" }}>Document</span>
//               <span className="block font-normal italic text-5xl md:text-6xl" style={{ color: "#b8974a" }}>Room</span>
//             </h1>
//             <p className="font-garamond italic text-base max-w-xs leading-relaxed" style={{ color: "#7a6e5e" }}>
//               Full public records, exhibits, and supporting documents from every docket.
//             </p>
//           </div>

//           {/* ── STAT STRIP ── */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-[#d4c8b4]">
//             {[
//               { label: "Total Documents", val: counts.total, accent: "#1e2d4a" },
//               { label: "Response Dockets", val: counts.byType["Response Docket"] || 0, accent: "#2d6a4f" },
//               { label: "Regulatory Docs", val: (counts.byType["Regulatory Document"] || 0) + (counts.byType["Benchmark"] || 0), accent: "#b8974a" },
//               { label: "Evidence & Records", val: (counts.byType["Evidence"] || 0) + (counts.byType["Institutional Record"] || 0) + (counts.byType["Public Record"] || 0), accent: "#7a6e5e" },
//             ].map(s => (
//               <div key={s.label} className="pr-8 pb-6">
//                 <div className="mb-3 h-0.5" style={{ background: s.accent }} />
//                 <div className="font-playfair font-black text-5xl leading-none" style={{ color: s.accent }}>{s.val}</div>
//                 <div className="font-mono-dm text-xs tracking-widest uppercase mt-2" style={{ color: "#9a8870" }}>{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── FILTER / SEARCH BAR ── */}
//         <div className="mb-2" style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "14px 20px" }}>
//           <div className="flex items-center gap-4 flex-wrap">
//             {/* Search input */}
//             <div className="flex items-center gap-2 flex-1 min-w-52" style={{ borderBottom: "1.5px solid #1e2d4a" }}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="2" className="flex-shrink-0">
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="Search by title or document ID…"
//                 className="bg-transparent w-full py-1.5 font-garamond text-sm"
//                 style={{ color: "#1e2d4a" }}
//               />
//               {search && (
//                 <button onClick={() => setSearch("")} className="text-[#9a8870] hover:text-[#1e2d4a] text-lg leading-none">×</button>
//               )}
//             </div>

//             <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

//             {/* Type filter chips */}
//             <div className="flex items-center gap-1 flex-wrap">
//               <span className="font-mono-dm text-xs tracking-widest uppercase mr-1" style={{ color: "#9a8870" }}>Type</span>
//               {TYPE_LIST.map(t => (
//                 <button
//                   key={t}
//                   onClick={() => setType(t)}
//                   className="font-mono-dm text-xs tracking-wider uppercase px-3 py-1 border transition-all"
//                   style={typeFilter === t
//                     ? { background: "#1e2d4a", color: "#f5f0e8", borderColor: "#1e2d4a" }
//                     : { background: "transparent", color: "#7a6e5e", borderColor: "#c4b89a" }
//                   }
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>

//             <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

//             {/* Sort order + reset */}
//             <div className="flex items-center gap-3 ml-auto">
//               <div className="flex items-center gap-1 font-mono-dm text-xs uppercase tracking-wider" style={{ color: "#9a8870" }}>
//                 <span>Sort:</span>
//                 <button onClick={() => setSort("newest")} className={`px-1.5 transition-colors ${sortBy === "newest" ? "text-[#1e2d4a] font-medium" : "hover:text-[#1e2d4a]"}`}>Latest</button>
//                 <span className="opacity-30">·</span>
//                 <button onClick={() => setSort("oldest")} className={`px-1.5 transition-colors ${sortBy === "oldest" ? "text-[#1e2d4a] font-medium" : "hover:text-[#1e2d4a]"}`}>Oldest</button>
//               </div>
//               {(search || typeFilter !== "All") && (
//                 <button
//                   onClick={clearAll}
//                   className="font-mono-dm text-xs tracking-wider uppercase px-3 py-1 border border-dashed transition-colors"
//                   style={{ color: "#b8974a", borderColor: "#b8974a" }}
//                 >
//                   Reset
//                 </button>
//               )}
//               <span className="font-mono-dm text-xs uppercase tracking-wider" style={{ color: "#9a8870" }}>
//                 {filtered.length} of {ALL_DOCUMENTS.length}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ── DOCUMENT LIST (4 fields: Title, Type, Date, Open/Download) ── */}
//         {filtered.length === 0 ? (
//           <div className="text-center py-20 border border-[#d4c8b4]">
//             <p className="font-playfair italic text-2xl mb-2" style={{ color: "#c4b89a" }}>No documents found</p>
//             <p className="font-garamond text-base" style={{ color: "#9a8870" }}>Try adjusting your filters.</p>
//           </div>
//         ) : (
//           <div className="mt-4">
//             {/* Header */}
//             <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 mb-0" style={{ borderColor: "#1e2d4a" }}>
//               <span className="col-span-6 font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Document Title</span>
//               <span className="col-span-2 font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Type</span>
//               <span className="col-span-2 font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Date</span>
//               <span className="col-span-2 font-mono-dm text-xs tracking-widest uppercase text-right" style={{ color: "#9a8870" }}>Action</span>
//             </div>

//             {filtered.map(doc => (
//               <Link
//                 key={doc.id}
//                 href={`/document-room/${doc.id}`}
//                 className="document-row grid grid-cols-12 gap-4 py-4 border-b cursor-pointer transition-colors no-underline"
//                 style={{ borderColor: "#d4c8b4", textDecoration: "none", color: "inherit" }}
//               >
//                 {/* Title */}
//                 <div className="col-span-6">
//                   <div className="font-playfair font-bold text-[10px] md:text-base leading-snug" style={{ color: "#1e2d4a" }}>{doc.title}</div>
//                   <div className="font-mono-dm text-[8px] md:text-xs mt-1" style={{ color: "#9a8870" }}>{doc.id}</div>
//                 </div>
//                 {/* Type badge */}
//                 <div className="col-span-2 flex items-center">
//                   <span className="font-mono-dm text-[7px] md:text-xs tracking-wider uppercase px-1 md:px-2 py-0.5 border" style={{ color: "#7a6e5e", borderColor: "#c4b89a" }}>
//                     {doc.type}
//                   </span>
//                 </div>
//                 {/* Date */}
//                 <div className="col-span-2 flex items-center">
//                   <span className="font-mono-dm text-[7px] md:text-xs" style={{ color: "#9a8870" }}>{fmtDate(doc.date)}</span>
//                 </div>
//                 {/* Open/Download */}
//                 <div className="col-span-2 flex items-center justify-end gap-3">
//                   <span className="font-mono-dm text-[7px] md:text-xs uppercase tracking-wider px-1 md:px-2 py-1" style={{ color: "#1e2d4a", border: "1px solid #c4b89a", background: "transparent" }}>
//                     Open
//                   </span>
//                   <span className="download-arrow" style={{ color: "#b8974a" }}>
//                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                       <polyline points="7 10 12 15 17 10" />
//                       <line x1="12" y1="15" x2="12" y2="3" />
//                     </svg>
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* ── BOTTOM CTA ── */}
//         <div className="mt-16 pt-8 flex items-center justify-between flex-wrap gap-5 border-t-2" style={{ borderColor: "#1e2d4a" }}>
//           <div>
//             <div className="font-playfair font-bold text-xl mb-1" style={{ color: "#1e2d4a" }}>Missing a document?</div>
//             <p className="font-garamond italic text-base" style={{ color: "#9a8870" }}>Submit a Right of Reply and we'll add all exhibits to the Document Room.</p>
//           </div>
//           <Link href="#" className="font-mono-dm text-xs tracking-widest uppercase px-6 py-3.5 flex items-center gap-2.5 text-[#f5f0e8] hover:opacity-90 transition-opacity" style={{ background: "#1e2d4a" }}>
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
//             Submit a Reply
//           </Link>
//         </div>
//       </main>

//       {/* ── FOOTER ── */}
//      <Footer/>
//     </div>
//   );
// }





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
