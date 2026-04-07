
// "use client";

// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import { useState, useMemo } from "react";

// /* ── GOOGLE FONTS injected once ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
//     html { font-family: 'EB Garamond', Georgia, serif; }
//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm { font-family: 'DM Mono', monospace; }
//     .row-hover:hover { background-color: #ede8dc; }
//     .row-hover:hover .arrow-icon { opacity: 1; transform: translateX(4px); }
//     .arrow-icon { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
//     input[type="text"]::placeholder { color: #9a8870; font-style: italic; }
//     input[type="text"]:focus { outline: none; }
//   `}</style>
// );

// /* ── DATA ── */
// const ALL_DOCKETS = [
//   { id: "JS-2026-001", title: "Right of Reply: Example Corp. on Alleged Financial Misreporting", summary: "Full corporate response to claims published on 14 March 2026, including verified exhibits, corrected financial timeline, and three independent auditor statements.", date: "2026-03-18", type: "Corporate", status: "Open", exhibits: 12, respondent: "Example Corp." },
//   { id: "JS-2026-002", title: "City Council Response to Infrastructure Funding Report", summary: "Official council reply disputing figures cited in a regional outlet's investigation into infrastructure budget allocation.", date: "2026-03-19", type: "Government", status: "Open", exhibits: 7, respondent: "Kozhikode City Council" },
//   { id: "JS-2026-003", title: "Healthcare Providers Alliance — Response to Billing Practices Claim", summary: "Detailed rebuttal with patient records summary, regulatory correspondence, and compliance certificates.", date: "2026-03-22", type: "Industry Body", status: "Open", exhibits: 19, respondent: "HPA Kerala Chapter" },
//   { id: "JS-2026-004", title: "Prof. Rajan Menon: Correction to Peer-Review Plagiarism Allegation", summary: "Academic response with annotated source comparison documents and university ethics board findings.", date: "2026-02-28", type: "Individual", status: "Closed", exhibits: 5, respondent: "Prof. Rajan Menon" },
//   { id: "JS-2026-005", title: "State Transport Corp. Reply to Safety Violations Report", summary: "Formal government body response disputing the scope of reported safety violations with inspection records.", date: "2026-02-14", type: "Government", status: "Closed", exhibits: 9, respondent: "Kerala STC" },
//   { id: "JS-2026-006", title: "Merchant Association on Market Price Manipulation Claim", summary: "Industry body rebuttal with pricing data, wholesale records, and commodity board correspondence.", date: "2026-02-05", type: "Industry Body", status: "Closed", exhibits: 6, respondent: "Kozhikode Merchant Assoc." },
//   { id: "JS-2026-007", title: "NGO Response to Fund Misuse Allegations", summary: "Nonprofit organisation's structured reply with complete audited accounts and donor communication logs.", date: "2026-01-30", type: "NGO", status: "Open", exhibits: 14, respondent: "Nilambur Relief Trust" },
//   { id: "JS-2026-008", title: "Film Producer Right of Reply: Box Office Fraud Claim", summary: "Producer's documented response to allegations of theatrical booking manipulation, with ticket data.", date: "2026-01-22", type: "Individual", status: "Closed", exhibits: 3, respondent: "V. Krishnadas Productions" },
//   { id: "JS-2026-009", title: "University Admissions Office: Response to Caste Bias Report", summary: "Institutional response with anonymised admission data, policy documents, and committee minutes.", date: "2026-01-10", type: "Institution", status: "Under Review", exhibits: 21, respondent: "Calicut University" },
//   { id: "JS-2026-010", title: "Tech Startup Rebuttal to Data Privacy Breach Report", summary: "Startup's formal reply with security audit logs, CERT-In correspondence, and independent forensic summary.", date: "2025-12-18", type: "Corporate", status: "Closed", exhibits: 8, respondent: "Kozhitech Pvt. Ltd." },
//   { id: "JS-2026-011", title: "Elected Representative Response to Corruption Allegation", summary: "MLA's documented reply with asset declarations, bank statements, and public records cross-reference.", date: "2025-12-05", type: "Government", status: "Under Review", exhibits: 16, respondent: "MLA, Beypore Constituency" },
//   { id: "JS-2026-012", title: "School Management Reply to Mid-Day Meal Quality Report", summary: "Institution's rebuttal with supplier contracts, inspection records, and parent committee minutes.", date: "2025-11-28", type: "Institution", status: "Closed", exhibits: 4, respondent: "GHSS Feroke" },
// ];

// const STATUS_LIST = ["All", "Open", "Under Review", "Closed"];
// const TYPE_LIST   = ["All", ...Array.from(new Set(ALL_DOCKETS.map(d => d.type)))];

// function fmtDate(iso) {
//   return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// }

// const STATUS_STYLE = {
//   "Open":         { dot: "bg-green-600",  text: "text-green-700",  border: "border-green-300",  bg: "bg-green-50"  },
//   "Under Review": { dot: "bg-amber-500",  text: "text-amber-700",  border: "border-amber-300",  bg: "bg-amber-50"  },
//   "Closed":       { dot: "bg-stone-400",  text: "text-stone-500",  border: "border-stone-300",  bg: "bg-stone-100" },
// };

// /* ── COMPONENT ── */
// export default function DocketsPage() {
//   const [search, setSearch]           = useState("");
//   const [statusFilter, setStatus]     = useState("All");
//   const [typeFilter, setType]         = useState("All");
//   const [sortBy, setSort]             = useState("newest");
//   const [view, setView]               = useState("list");

//   const filtered = useMemo(() => {
//     let l = [...ALL_DOCKETS];
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       l = l.filter(d => d.title.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.respondent.toLowerCase().includes(q));
//     }
//     if (statusFilter !== "All") l = l.filter(d => d.status === statusFilter);
//     if (typeFilter   !== "All") l = l.filter(d => d.type   === typeFilter);
//     l.sort((a, b) => sortBy === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
//     return l;
//   }, [search, statusFilter, typeFilter, sortBy]);

//   const counts = {
//     total:  ALL_DOCKETS.length,
//     open:   ALL_DOCKETS.filter(d => d.status === "Open").length,
//     review: ALL_DOCKETS.filter(d => d.status === "Under Review").length,
//     closed: ALL_DOCKETS.filter(d => d.status === "Closed").length,
//   };

//   const clearAll = () => { setSearch(""); setStatus("All"); setType("All"); };

//   return (
//     <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
//       <FontStyle />

     
//         {/* ─── TOP NAV BAR ─── */}
//       <Header/>

//       {/* ── MAIN CONTENT ── */}
//       <main className="max-w-6xl mx-auto px-6 pb-20">

//         {/* ── PAGE HEADER ── */}
//         <div className="pt-10 pb-8">
//           {/* Breadcrumb */}
//           <p className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: "#9a8870" }}>
//             Public Record <span className="mx-2 opacity-40">/</span> Dockets
//           </p>

//           {/* Title row */}
//           <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
//             <h1 className="font-playfair leading-none">
//               <span className="block font-black text-5xl md:text-6xl" style={{ color: "#1e2d4a" }}>Right of Reply</span>
//               <span className="block font-normal italic text-5xl md:text-6xl" style={{ color: "#b8974a" }}>Dockets</span>
//             </h1>
//             <p className="font-garamond italic text-base max-w-xs leading-relaxed" style={{ color: "#7a6e5e" }}>
//               Each docket is a permanent, detailed public record — the claim, the response, and all supporting evidence.
//             </p>
//           </div>

//           {/* ── STAT STRIP ── */}
//           <div className="grid grid-cols-4 gap-0 border-b border-[#d4c8b4]">
//             {[
//               { label: "Total Dockets", val: counts.total,  accent: "#1e2d4a" },
//               { label: "Open",          val: counts.open,   accent: "#2d6a4f" },
//               { label: "Under Review",  val: counts.review, accent: "#b8974a" },
//               { label: "Closed",        val: counts.closed, accent: "#7a6e5e" },
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
//                 placeholder="Search by title, ID, or organization…"
//                 className="bg-transparent w-full py-1.5 font-garamond text-sm"
//                 style={{ color: "#1e2d4a" }}
//               />
//               {search && (
//                 <button onClick={() => setSearch("")} className="text-[#9a8870] hover:text-[#1e2d4a] text-lg leading-none">×</button>
//               )}
//             </div>

//             {/* Vertical divider */}
//             <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

//             {/* Sort: status chips */}
//             <div className="flex items-center gap-1">
//               <span className="font-mono-dm text-xs tracking-widest uppercase mr-1" style={{ color: "#9a8870" }}>Sort</span>
//               {STATUS_LIST.map(s => (
//                 <button
//                   key={s}
//                   onClick={() => setStatus(s)}
//                   className="font-mono-dm text-xs tracking-wider uppercase px-3 py-1 border transition-all"
//                   style={statusFilter === s
//                     ? { background: "#1e2d4a", color: "#f5f0e8", borderColor: "#1e2d4a" }
//                     : { background: "transparent", color: "#7a6e5e", borderColor: "#c4b89a" }
//                   }
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>

//             <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

//             {/* View toggle + sort order */}
//             <div className="flex items-center gap-3 ml-auto">
//               {/* Sort order */}
//               <div className="flex items-center gap-1 font-mono-dm text-xs uppercase tracking-wider" style={{ color: "#9a8870" }}>
//                 <span>Sort:</span>
//                 <button onClick={() => setSort("newest")} className={`px-1.5 transition-colors ${sortBy === "newest" ? "text-[#1e2d4a] font-medium" : "hover:text-[#1e2d4a]"}`}>Latest</button>
//                 <span className="opacity-30">·</span>
//                 <button onClick={() => setSort("oldest")} className={`px-1.5 transition-colors ${sortBy === "oldest" ? "text-[#1e2d4a] font-medium" : "hover:text-[#1e2d4a]"}`}>Oldest</button>
//               </div>
//               {/* List / Grid toggle */}
//               <div className="flex border border-[#c4b89a] overflow-hidden">
//                 <button
//                   onClick={() => setView("list")}
//                   className="px-2.5 py-1.5 flex items-center transition-colors"
//                   style={view === "list" ? { background: "#1e2d4a", color: "#f5f0e8" } : { color: "#9a8870" }}
//                 >
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
//                 </button>
//                 <button
//                   onClick={() => setView("grid")}
//                   className="px-2.5 py-1.5 flex items-center transition-colors"
//                   style={view === "grid" ? { background: "#1e2d4a", color: "#f5f0e8" } : { color: "#9a8870" }}
//                 >
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── TYPE FILTER ROW ── */}
//         <div className="flex items-center gap-2 flex-wrap mb-6 pt-3">
//           <span className="font-mono-dm text-xs tracking-widest uppercase mr-1" style={{ color: "#9a8870" }}>Filter:</span>
//           {TYPE_LIST.map(t => (
//             <button
//               key={t}
//               onClick={() => setType(t)}
//               className="font-mono-dm text-xs tracking-wider uppercase px-3 py-1 border transition-all"
//               style={typeFilter === t
//                 ? { background: "#1e2d4a", color: "#f5f0e8", borderColor: "#1e2d4a" }
//                 : { background: "transparent", color: "#7a6e5e", borderColor: "#c4b89a" }
//               }
//             >
//               {t}
//             </button>
//           ))}
//           {(search || statusFilter !== "All" || typeFilter !== "All") && (
//             <button
//               onClick={clearAll}
//               className="font-mono-dm text-xs tracking-wider uppercase px-3 py-1 border border-dashed transition-colors"
//               style={{ color: "#b8974a", borderColor: "#b8974a" }}
//             >
//               Reset Filters
//             </button>
//           )}
//           <span className="ml-auto font-mono-dm text-xs uppercase tracking-wider" style={{ color: "#9a8870" }}>
//             {filtered.length} of {ALL_DOCKETS.length} dockets
//           </span>
//         </div>

//         {/* ── EMPTY STATE ── */}
//         {filtered.length === 0 && (
//           <div className="text-center py-20 border border-[#d4c8b4]">
//             <p className="font-playfair italic text-2xl mb-2" style={{ color: "#c4b89a" }}>No records found</p>
//             <p className="font-garamond text-base" style={{ color: "#9a8870" }}>Try adjusting your filters.</p>
//           </div>
//         )}

//         {/* ── LIST VIEW ── */}
//         {view === "list" && filtered.length > 0 && (
//           <div>
//             {/* Column headers */}
//             <div className="grid gap-x-6 pb-2 border-b-2 mb-0" style={{ gridTemplateColumns: "110px 1fr 90px", borderColor: "#1e2d4a" }}>
//               {["Docket ID", "Category", "Filed ↓"].map(h => (
//                 <span key={h} className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>{h}</span>
//               ))}
//             </div>

//             {filtered.map(d => {
//               const st = STATUS_STYLE[d.status];
//               return (
//                 <a
//                   key={d.id}
//                   href={`/dockets/${d.id}`}
//                   className="row-hover grid gap-x-6 py-4 border-b cursor-pointer transition-colors no-underline block"
//                   style={{ gridTemplateColumns: "110px 1fr 90px", borderColor: "#d4c8b4", textDecoration: "none", color: "inherit" }}
//                 >
//                   {/* ID + status */}
//                   <div className="flex flex-col gap-2 pt-0.5">
//                     <span className="font-mono-dm text-xs font-medium tracking-wider" style={{ color: "#1e2d4a" }}>{d.id}</span>
//                     <span className={`inline-flex items-center gap-1.5 font-mono-dm text-xs tracking-wider uppercase px-2 py-0.5 border self-start ${st.text} ${st.bg} ${st.border}`}>
//                       <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
//                       {d.status}
//                     </span>
//                   </div>

//                   {/* Title + meta */}
//                   <div>
//                     <div className="font-playfair font-bold text-base leading-snug mb-1.5" style={{ color: "#1e2d4a" }}>{d.title}</div>
//                     <div className="flex items-center gap-3 flex-wrap">
//                       <span className="font-garamond italic text-sm" style={{ color: "#7a6e5e" }}>{d.respondent}</span>
//                       <span className="font-mono-dm text-xs tracking-wider uppercase px-2 py-0.5 border" style={{ color: "#9a8870", borderColor: "#c4b89a" }}>{d.type}</span>
//                       <span className="font-mono-dm text-xs" style={{ color: "#b8b0a0" }}>{d.exhibits} exhibits</span>
//                     </div>
//                   </div>

//                   {/* Date + arrow */}
//                   <div className="text-right pt-0.5 flex flex-col items-end gap-2">
//                     <span className="font-mono-dm text-xs" style={{ color: "#9a8870" }}>{fmtDate(d.date)}</span>
//                     <span className="arrow-icon font-mono-dm text-sm" style={{ color: "#b8974a" }}>→</span>
//                   </div>
//                 </a>
//               );
//             })}
//           </div>
//         )}

//         {/* ── GRID VIEW ── */}
//         {view === "grid" && filtered.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {filtered.map(d => {
//               const st = STATUS_STYLE[d.status];
//               return (
//                 <a
//                   key={d.id}
//                   href={`/dockets/${d.id}`}
//                   className="flex flex-col gap-3 p-6 border cursor-pointer transition-all hover:-translate-y-0.5 no-underline"
//                   style={{ background: "#faf6ee", borderColor: "#d4c8b4", textDecoration: "none", color: "inherit", boxShadow: "none" }}
//                   onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(30,45,74,0.08)"}
//                   onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
//                 >
//                   <div className="flex items-start justify-between">
//                     <span className="font-mono-dm text-xs tracking-wider px-2 py-0.5 text-[#f5f0e8]" style={{ background: "#1e2d4a" }}>{d.id}</span>
//                     <span className={`inline-flex items-center gap-1.5 font-mono-dm text-xs tracking-wider uppercase px-2 py-0.5 border ${st.text} ${st.bg} ${st.border}`}>
//                       <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
//                       {d.status}
//                     </span>
//                   </div>
//                   <div className="border-t pt-3" style={{ borderColor: "#1e2d4a" }}>
//                     <div className="font-playfair font-bold text-base leading-snug mb-2" style={{ color: "#1e2d4a" }}>{d.title}</div>
//                     <p className="font-garamond text-sm leading-relaxed line-clamp-3" style={{ color: "#7a6e5e" }}>{d.summary}</p>
//                   </div>
//                   <div className="mt-auto pt-3 flex items-end justify-between border-t" style={{ borderColor: "#e4ddd0" }}>
//                     <div>
//                       <div className="font-garamond italic text-xs" style={{ color: "#9a8870" }}>{d.respondent}</div>
//                       <div className="font-mono-dm text-xs mt-0.5" style={{ color: "#b8b0a0" }}>{fmtDate(d.date)} · {d.exhibits} exhibits</div>
//                     </div>
//                     <span className="font-mono-dm text-xs tracking-wider uppercase px-2 py-0.5 border" style={{ color: "#9a8870", borderColor: "#c4b89a" }}>{d.type}</span>
//                   </div>
//                 </a>
//               );
//             })}
//           </div>
//         )}

//         {/* ── BOTTOM CTA ── */}
//         {filtered.length > 0 && (
//           <div className="mt-16 pt-8 flex items-center justify-between flex-wrap gap-5 border-t-2" style={{ borderColor: "#1e2d4a" }}>
//             <div>
//               <div className="font-playfair font-bold text-xl mb-1" style={{ color: "#1e2d4a" }}>Have a right of reply?</div>
//               <p className="font-garamond italic text-base" style={{ color: "#9a8870" }}>Submit a response and add it to the public record.</p>
//             </div>
//             <a href="#" className="font-mono-dm text-xs tracking-widest uppercase px-6 py-3.5 flex items-center gap-2.5 text-[#f5f0e8] hover:opacity-90 transition-opacity" style={{ background: "#1e2d4a" }}>
//               <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
//               Submit a Reply
//             </a>
//           </div>
//         )}
//       </main>

//       {/* ── FOOTER ── */}
//       <Footer/>
//     </div>
//   );
// }


// app/dockets/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import docketsAPI from "@/services/docketsApi";

/* ── GOOGLE FONTS injected once ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
    html { font-family: 'EB Garamond', Georgia, serif; }
    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm { font-family: 'DM Mono', monospace; }
    .row-hover:hover { background-color: #ede8dc; }
    .row-hover:hover .arrow-icon { opacity: 1; transform: translateX(4px); }
    .arrow-icon { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
    input[type="text"]::placeholder { color: #9a8870; font-style: italic; }
    input[type="text"]:focus { outline: none; }
    
    /* Custom scrollbar */
    .table-scroll::-webkit-scrollbar {
      height: 4px;
    }
    .table-scroll::-webkit-scrollbar-track {
      background: #e4ddd0;
      border-radius: 2px;
    }
    .table-scroll::-webkit-scrollbar-thumb {
      background: #b8974a;
      border-radius: 2px;
    }
    .filter-scroll::-webkit-scrollbar {
      height: 2px;
    }
  `}</style>
);

const STATUS_LIST = ["All", "Open", "Under Review", "Closed"];

function fmtDate(iso) {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_STYLE = {
  "Open":         { dot: "bg-green-600",  text: "text-green-700",  border: "border-green-300",  bg: "bg-green-50"  },
  "Under Review": { dot: "bg-amber-500",  text: "text-amber-700",  border: "border-amber-300",  bg: "bg-amber-50"  },
  "Closed":       { dot: "bg-stone-400",  text: "text-stone-500",  border: "border-stone-300",  bg: "bg-stone-100" },
};

export default function DocketsPage() {
  const [dockets, setDockets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("All");
  const [typeFilter, setType] = useState("All");
  const [sortBy, setSort] = useState("newest");
  const [view, setView] = useState("list");

  useEffect(() => {
    fetchDockets();
  }, []);

  const fetchDockets = async () => {
    setLoading(true);
    try {
      const data = await docketsAPI.getAllDockets();
      setDockets(data);
    } catch (error) {
      console.error("Error fetching dockets:", error);
    } finally {
      setLoading(false);
    }
  };

  const typeList = useMemo(() => {
    const types = ["All", ...new Set(dockets.map(d => d.respondent?.type || d.type || "Other"))];
    return types;
  }, [dockets]);

  const filtered = useMemo(() => {
    let l = [...dockets];
    if (search.trim()) {
      const q = search.toLowerCase();
      l = l.filter(d => 
        d.response?.title?.toLowerCase().includes(q) || 
        d.docketId?.toLowerCase().includes(q) || 
        d.respondent?.name?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") l = l.filter(d => d.status === statusFilter);
    if (typeFilter !== "All") l = l.filter(d => d.respondent?.type === typeFilter || d.type === typeFilter);
    l.sort((a, b) => sortBy === "newest" 
      ? new Date(b.publishedDate || b.filedDate) - new Date(a.publishedDate || a.filedDate)
      : new Date(a.publishedDate || a.filedDate) - new Date(b.publishedDate || b.filedDate));
    return l;
  }, [dockets, search, statusFilter, typeFilter, sortBy]);

  const counts = {
    total: dockets.length,
    open: dockets.filter(d => d.status === "Open").length,
    review: dockets.filter(d => d.status === "Under Review").length,
    closed: dockets.filter(d => d.status === "Closed").length,
  };

  const clearAll = () => { setSearch(""); setStatus("All"); setType("All"); };

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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        {/* Page Header */}
        <div className="pt-6 sm:pt-10 pb-6 sm:pb-8">
          <p className="font-mono-dm text-[0.6rem] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4" style={{ color: "#9a8870" }}>
            Public Record <span className="mx-2 opacity-40">/</span> Dockets
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="font-playfair leading-none">
              <span className="block font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: "#1e2d4a" }}>Right of Reply</span>
              <span className="block font-normal italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: "#b8974a" }}>Dockets</span>
            </h1>
            <p className="font-garamond italic text-sm sm:text-base max-w-xs leading-relaxed" style={{ color: "#7a6e5e" }}>
              Each docket is a permanent, detailed public record — the claim, the response, and all supporting evidence.
            </p>
          </div>

          {/* Stats Strip - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 border-b border-[#d4c8b4] pb-4 sm:pb-6">
            {[
              { label: "Total Dockets", val: counts.total, accent: "#1e2d4a" },
              { label: "Open", val: counts.open, accent: "#2d6a4f" },
              { label: "Under Review", val: counts.review, accent: "#b8974a" },
              { label: "Closed", val: counts.closed, accent: "#7a6e5e" },
            ].map(s => (
              <div key={s.label} className="pr-4 sm:pr-8">
                <div className="mb-2 sm:mb-3 h-0.5" style={{ background: s.accent }} />
                <div className="font-playfair font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none" style={{ color: s.accent }}>{s.val}</div>
                <div className="font-mono-dm text-[0.55rem] sm:text-xs tracking-widest uppercase mt-1 sm:mt-2" style={{ color: "#9a8870" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="mb-4" style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "12px 16px" }}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
            {/* Search input */}
            <div className="flex-1 min-w-[180px]">
              <div className="flex items-center gap-2 pb-1" style={{ borderBottom: "1.5px solid #1e2d4a" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="2" className="flex-shrink-0">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by title, ID, or organization…"
                  className="bg-transparent w-full py-1.5 font-garamond text-sm"
                  style={{ color: "#1e2d4a" }}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-[#9a8870] hover:text-[#1e2d4a] text-lg leading-none flex-shrink-0">×</button>
                )}
              </div>
            </div>

            <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

            {/* Status chips - scrollable on mobile */}
            <div className="flex items-center gap-1 flex-nowrap overflow-x-auto pb-1 md:pb-0" style={{ scrollbarWidth: "thin" }}>
              <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase mr-1 flex-shrink-0" style={{ color: "#9a8870" }}>Status</span>
              {STATUS_LIST.map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className="font-mono-dm text-[0.55rem] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1 border transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
                  style={statusFilter === s
                    ? { background: "#1e2d4a", color: "#f5f0e8", borderColor: "#1e2d4a" }
                    : { background: "transparent", color: "#7a6e5e", borderColor: "#c4b89a" }
                  }
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

            {/* View toggle + sort order */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono-dm text-xs uppercase tracking-wider flex-shrink-0" style={{ color: "#9a8870" }}>Sort:</span>
                <div className="flex gap-1">
                  <button onClick={() => setSort("newest")} className={`px-1.5 py-0.5 transition-colors text-xs ${sortBy === "newest" ? "text-[#1e2d4a] font-medium" : "text-[#9a8870] hover:text-[#1e2d4a]"}`}>Latest</button>
                  <span className="text-[#9a8870]">·</span>
                  <button onClick={() => setSort("oldest")} className={`px-1.5 py-0.5 transition-colors text-xs ${sortBy === "oldest" ? "text-[#1e2d4a] font-medium" : "text-[#9a8870] hover:text-[#1e2d4a]"}`}>Oldest</button>
                </div>
              </div>
              <div className="flex border border-[#c4b89a] overflow-hidden">
                <button
                  onClick={() => setView("list")}
                  className="px-2 py-1.5 flex items-center transition-colors cursor-pointer"
                  style={view === "list" ? { background: "#1e2d4a", color: "#f5f0e8" } : { color: "#9a8870" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
                <button
                  onClick={() => setView("grid")}
                  className="px-2 py-1.5 flex items-center transition-colors cursor-pointer"
                  style={view === "grid" ? { background: "#1e2d4a", color: "#f5f0e8" } : { color: "#9a8870" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Type Filter Row - scrollable on mobile */}
        <div className="flex items-center gap-1.5 flex-nowrap overflow-x-auto pb-2 mb-4 pt-2" style={{ scrollbarWidth: "thin" }}>
          <span className="font-mono-dm text-[0.6rem] tracking-widest uppercase mr-1 flex-shrink-0" style={{ color: "#9a8870" }}>Filter:</span>
          {typeList.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className="font-mono-dm text-[0.55rem] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1 border transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
              style={typeFilter === t
                ? { background: "#1e2d4a", color: "#f5f0e8", borderColor: "#1e2d4a" }
                : { background: "transparent", color: "#7a6e5e", borderColor: "#c4b89a" }
              }
            >
              {t}
            </button>
          ))}
          {(search || statusFilter !== "All" || typeFilter !== "All") && (
            <button
              onClick={clearAll}
              className="font-mono-dm text-[0.55rem] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1 border border-dashed transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
              style={{ color: "#b8974a", borderColor: "#b8974a" }}
            >
              Reset Filters
            </button>
          )}
          <span className="hidden sm:block ml-auto font-mono-dm text-xs uppercase tracking-wider flex-shrink-0" style={{ color: "#9a8870" }}>
            {filtered.length} of {dockets.length} dockets
          </span>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 sm:py-20 border border-[#d4c8b4]">
            <p className="font-playfair italic text-xl sm:text-2xl mb-2" style={{ color: "#c4b89a" }}>No records found</p>
            <p className="font-garamond text-sm sm:text-base" style={{ color: "#9a8870" }}>Try adjusting your filters.</p>
          </div>
        )}

        {/* List View with Horizontal Scroll on Mobile */}
        {view === "list" && filtered.length > 0 && (
          <>
            <div className="table-scroll overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              <div style={{ minWidth: "650px" }}>
                <div className="grid gap-x-4 sm:gap-x-6 pb-2 border-b-2 mb-0" style={{ gridTemplateColumns: "100px 1fr 80px", borderColor: "#1e2d4a" }}>
                  {["Docket ID", "Category", "Filed ↓"].map(h => (
                    <span key={h} className="font-mono-dm text-[0.6rem] sm:text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>{h}</span>
                  ))}
                </div>

                {filtered.map(d => {
                  const st = STATUS_STYLE[d.status];
                  const displayTitle = d.response?.title || d.title || "Untitled";
                  const respondentName = d.respondent?.name || d.respondent || "Unknown";
                  const docketType = d.respondent?.type || d.type || "Other";
                  const exhibitCount = d.exhibits?.length || 0;
                  const filedDate = d.publishedDate || d.filedDate || d.createdAt;

                  return (
                    <Link
                      key={d._id}
                      href={`/dockets/${d._id}`}
                      className="row-hover grid gap-x-4 sm:gap-x-6 py-3 sm:py-4 border-b cursor-pointer transition-colors no-underline"
                      style={{ gridTemplateColumns: "100px 1fr 80px", borderColor: "#d4c8b4", textDecoration: "none", color: "inherit" }}
                    >
                      <div className="flex flex-col gap-1.5 pt-0.5">
                        <span className="font-mono-dm text-[0.65rem] sm:text-xs font-medium tracking-wider" style={{ color: "#1e2d4a" }}>{d.docketId}</span>
                        <span className={`inline-flex items-center gap-1 font-mono-dm text-[0.55rem] sm:text-xs tracking-wider uppercase px-1.5 sm:px-2 py-0.5 border self-start ${st.text} ${st.bg} ${st.border}`}>
                          <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${st.dot}`} />
                          {d.status}
                        </span>
                      </div>

                      <div>
                        <div className="font-playfair font-bold text-[0.85rem] sm:text-base leading-snug mb-1 sm:mb-1.5" style={{ color: "#1e2d4a" }}>{displayTitle}</div>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                          <span className="font-garamond italic text-[0.7rem] sm:text-sm" style={{ color: "#7a6e5e" }}>{respondentName}</span>
                          <span className="font-mono-dm text-[0.55rem] sm:text-xs tracking-wider uppercase px-1.5 sm:px-2 py-0.5 border" style={{ color: "#9a8870", borderColor: "#c4b89a" }}>{docketType}</span>
                          <span className="font-mono-dm text-[0.6rem] sm:text-xs" style={{ color: "#b8b0a0" }}>{exhibitCount} exhibits</span>
                        </div>
                      </div>

                      <div className="text-right pt-0.5 flex flex-col items-end gap-1 sm:gap-2">
                        <span className="font-mono-dm text-[0.6rem] sm:text-xs" style={{ color: "#9a8870" }}>{fmtDate(filedDate)}</span>
                        <span className="arrow-icon font-mono-dm text-xs sm:text-sm" style={{ color: "#b8974a" }}>→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Mobile result count */}
            <div className="mt-3 text-center sm:hidden">
              <span className="font-mono-dm text-xs text-[#9a8870]">
                {filtered.length} of {dockets.length} dockets
              </span>
            </div>
          </>
        )}

        {/* Grid View */}
        {view === "grid" && filtered.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filtered.map(d => {
                const st = STATUS_STYLE[d.status];
                const displayTitle = d.response?.title || d.title || "Untitled";
                const respondentName = d.respondent?.name || d.respondent || "Unknown";
                const docketType = d.respondent?.type || d.type || "Other";
                const summaryText = d.summary?.claim || d.summary || "No summary available";
                const filedDate = d.publishedDate || d.filedDate || d.createdAt;
                const exhibitCount = d.exhibits?.length || 0;

                return (
                  <Link
                    key={d._id}
                    href={`/dockets/${d._id}`}
                    className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-6 border cursor-pointer transition-all hover:-translate-y-0.5 no-underline"
                    style={{ background: "#faf6ee", borderColor: "#d4c8b4", textDecoration: "none", color: "inherit", boxShadow: "none" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(30,45,74,0.08)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <span className="font-mono-dm text-[0.65rem] sm:text-xs tracking-wider px-2 py-0.5 text-[#f5f0e8]" style={{ background: "#1e2d4a" }}>{d.docketId}</span>
                      <span className={`inline-flex items-center gap-1 font-mono-dm text-[0.55rem] sm:text-xs tracking-wider uppercase px-1.5 sm:px-2 py-0.5 border ${st.text} ${st.bg} ${st.border}`}>
                        <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${st.dot}`} />
                        {d.status}
                      </span>
                    </div>
                    <div className="border-t pt-2 sm:pt-3" style={{ borderColor: "#1e2d4a" }}>
                      <div className="font-playfair font-bold text-sm sm:text-base leading-snug mb-2" style={{ color: "#1e2d4a" }}>{displayTitle}</div>
                      <p className="font-garamond text-xs sm:text-sm leading-relaxed line-clamp-3" style={{ color: "#7a6e5e" }}>{summaryText}</p>
                    </div>
                    <div className="mt-auto pt-2 sm:pt-3 flex items-end justify-between border-t" style={{ borderColor: "#e4ddd0" }}>
                      <div>
                        <div className="font-garamond italic text-[0.65rem] sm:text-xs" style={{ color: "#9a8870" }}>{respondentName}</div>
                        <div className="font-mono-dm text-[0.6rem] sm:text-xs mt-0.5" style={{ color: "#b8b0a0" }}>{fmtDate(filedDate)} · {exhibitCount} exhibits</div>
                      </div>
                      <span className="font-mono-dm text-[0.55rem] sm:text-xs tracking-wider uppercase px-1.5 sm:px-2 py-0.5 border" style={{ color: "#9a8870", borderColor: "#c4b89a" }}>{docketType}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* Mobile result count */}
            <div className="mt-4 text-center sm:hidden">
              <span className="font-mono-dm text-xs text-[#9a8870]">
                {filtered.length} of {dockets.length} dockets
              </span>
            </div>
          </>
        )}

        {/* Bottom CTA */}
        {filtered.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2" style={{ borderColor: "#1e2d4a" }}>
            <div className="text-center sm:text-left">
              <div className="font-playfair font-bold text-lg sm:text-xl mb-1" style={{ color: "#1e2d4a" }}>Have a right of reply?</div>
              <p className="font-garamond italic text-sm sm:text-base" style={{ color: "#9a8870" }}>Submit a response and add it to the public record.</p>
            </div>
            <Link href="/submit" className="font-mono-dm text-xs tracking-widest uppercase px-5 sm:px-6 py-3 sm:py-3.5 flex items-center gap-2 text-[#f5f0e8] hover:opacity-90 transition-opacity" style={{ background: "#1e2d4a" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Submit a Reply
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}