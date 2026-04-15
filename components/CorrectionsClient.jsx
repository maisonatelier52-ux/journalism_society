// // app/corrections/page.jsx
// "use client";

// import { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { FiEdit, FiInfo, FiRefreshCw, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm  { font-family: 'DM Mono', monospace; }
//   `}</style>
// );

// const CORRECTION_LOG = [
//   { date: "2026-03-25", docketId: "JS-2026-001", type: "Correction", description: "Timeline date corrected from 2026-03-14 to 2026-03-15 to match exhibit documentation." },
//   { date: "2026-03-20", docketId: "JS-2026-003", type: "Clarification", description: "Added clarifying note to exhibit EX-07 regarding page numbering format." },
//   { date: "2026-03-15", docketId: "DOC-007", type: "Update", description: "Updated document preview to include full exhibit metadata." },
//   { date: "2026-03-10", docketId: "JS-2026-002", type: "Correction", description: "Corrected respondent name from 'Kozhikode Municipal Corporation' to 'Kozhikode City Council'." },
//   { date: "2026-03-05", docketId: "MW-003", type: "Clarification", description: "Added note clarifying that media citation was updated with additional context." },
//   { date: "2026-02-28", docketId: "JS-2026-007", type: "Correction", description: "Corrected exhibit count from 13 to 14 after verification." }
// ];

// const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// export default function CorrectionsClient() {
//   const [showAll, setShowAll] = useState(false);
//   const displayedLog = showAll ? CORRECTION_LOG : CORRECTION_LOG.slice(0, 5);

//   return (
//     <div className="min-h-screen bg-[#f5f0e8]">
//       <FontStyle />
//       <Header />

//       <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
//         <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
//           <p className="font-mono-dm text-xs tracking-[0.16em] text-[#adb7c4] uppercase mb-4">
//             Accountability
//           </p>
//           <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6 max-w-4xl">
//             Corrections &<br />
//             <em className="text-[#b8974a] font-normal">Clarifications</em>
//           </h1>
//           <p className="font-garamond text-xl leading-relaxed text-[#8a9bb8] max-w-3xl">
//             We are committed to accuracy. When we make mistakes, we correct them promptly and transparently.
//           </p>
//         </div>
//       </div>

//       <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        
//         {/* Policy Section */}
//         <div className="grid md:grid-cols-3 gap-6 mb-12">
//           <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
//             <FiEdit size={32} className="text-[#b8974a] mb-4" />
//             <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">Correction</h3>
//             <p className="font-garamond text-[#1a1818] leading-relaxed">
//               For factual errors in dates, names, or data. Original content is preserved with correction notes.
//             </p>
//           </div>
//           <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
//             <FiInfo size={32} className="text-[#b8974a] mb-4" />
//             <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">Clarification</h3>
//             <p className="font-garamond text-[#1a1818] leading-relaxed">
//               For context or ambiguity issues. Added to provide additional clarity without changing content.
//             </p>
//           </div>
//           <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
//             <FiRefreshCw size={32} className="text-[#b8974a] mb-4" />
//             <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">Update</h3>
//             <p className="font-garamond text-[#1a1818] leading-relaxed">
//               For new information or developments after publication. Appended with date and source.
//             </p>
//           </div>
//         </div>

//         {/* Policy Statement */}
//         <div className="bg-[#ede8dc] border border-[#d4c8b4] p-6 mb-12">
//           <div className="flex items-start gap-4">
//             <FiAlertCircle size={24} className="text-[#b8974a] flex-shrink-0 mt-1" />
//             <div>
//               <p className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2">Our Corrections Policy</p>
//               <p className="font-garamond text-[#1a1818] leading-relaxed mb-3">
//                 We correct errors promptly and transparently. When a correction is made, we:
//               </p>
//               <ul className="space-y-2 text-[#1a1818] font-garamond">
//                 <li className="flex items-start gap-2">
//                   <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
//                   <span>Add a correction note to the docket</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
//                   <span>Preserve the original content with a strike-through or note</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
//                   <span>Log the correction in this public log</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
//                   <span>Notify the respondent of significant corrections</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Correction Log */}
//         <div>
//           <div className="border-l-4 border-[#b8974a] pl-5 mb-6">
//             <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-2">Public Log</p>
//             <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Correction Log</h2>
//           </div>

//           <div className="space-y-3">
//             <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-[#1e2d4a] font-mono-dm text-xs tracking-widest uppercase text-[#6e5a40] font-semibold">
//               <span className="col-span-2">Date</span>
//               <span className="col-span-2">Docket</span>
//               <span className="col-span-2">Type</span>
//               <span className="col-span-6">Description</span>
//             </div>
//             {displayedLog.map((entry) => (
//               <div key={`${entry.date}-${entry.docketId}`} className="grid grid-cols-12 gap-4 py-3 border-b border-[#e4ddd0] items-start">
//                 <span className="col-span-2 font-mono-dm text-sm text-[#9a8870]">{fmtDate(entry.date)}</span>
//                 <span className="col-span-2 font-mono-dm text-sm text-[#b8974a]">{entry.docketId}</span>
//                 <span className="col-span-2">
//                   <span className={`inline-block px-2 py-0.5 text-xs font-mono-dm uppercase tracking-wider ${
//                     entry.type === "Correction" ? "bg-[#fef2f2] text-[#b8190c] border border-[#fecaca]" :
//                     entry.type === "Clarification" ? "bg-[#fffbeb] text-[#b8974a] border border-[#fde68a]" :
//                     "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]"
//                   }`}>
//                     {entry.type}
//                   </span>
//                 </span>
//                 <span className="col-span-6 font-garamond text-sm text-[#1a1818]">{entry.description}</span>
//               </div>
//             ))}
//           </div>

//           {CORRECTION_LOG.length > 5 && (
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="mt-6 font-mono-dm text-sm text-[#b8974a] hover:text-[#1e2d4a] transition-colors"
//             >
//               {showAll ? "Show fewer" : `View all ${CORRECTION_LOG.length} corrections →`}
//             </button>
//           )}
//         </div>

//         <div className="mt-12 pt-6 border-t border-[#d4c8b4]">
//           <p className="font-garamond text-sm text-[#9a8870] text-center">
//             Last updated: 25 March 2026 • For corrections older than 6 months, please contact our editorial team.
//           </p>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }



// app/corrections/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiEdit, FiInfo, FiRefreshCw, FiCheckCircle, FiAlertCircle, FiArrowRight, FiExternalLink } from "react-icons/fi";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }

    .cor-row { transition: background 0.15s; }
    .cor-row:hover { background: #faf6ee; }
    .cor-row:hover .cor-arrow { opacity: 1; transform: translateX(3px); }
    .cor-arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.35s ease forwards; }

    @media (max-width: 640px) {
      .cor-grid { grid-template-columns: 1fr !important; }
      .cor-table-head { display: none !important; }
      .cor-row { display: flex; flex-direction: column; gap: 6px; padding: 14px 0; }
      .cor-row .cor-date   { order: 1; }
      .cor-row .cor-docket { order: 2; }
      .cor-row .cor-type   { order: 3; }
      .cor-row .cor-desc   { order: 4; }
    }
  `}</style>
);

const TYPE_STYLE = {
  Correction:    { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  Clarification: { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  Update:        { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
};

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "N/A";

export default function CorrectionsPage() {
  const [corrections,    setCorrections]    = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);
  const [showAll,        setShowAll]        = useState(false);
  const [typeFilter,     setTypeFilter]     = useState("All");
  const [lastUpdated,    setLastUpdated]    = useState(null);

  const fetchCorrections = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res  = await fetch(`${API_BASE}/api/corrections?limit=100`);
      const data = await res.json();
      if (data.success) {
        setCorrections(data.corrections || []);
        setLastUpdated(new Date());
      } else {
        setError("Failed to load corrections.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCorrections();
  }, []);

  // Filtered list
  const filtered = typeFilter === "All"
    ? corrections
    : corrections.filter((c) => c.type === typeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, 10);

  // Counts per type
  const counts = corrections.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />
      <Header />

      {/* Banner */}
      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="font-mono-dm text-xs tracking-[0.16em] text-[#adb7c4] uppercase mb-4">
            Accountability
          </p>
          <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6 max-w-4xl">
            Corrections &amp;<br />
            <em className="text-[#b8974a] font-normal">Clarifications</em>
          </h1>
          <p className="font-garamond text-xl leading-relaxed text-[#8a9bb8] max-w-3xl">
            We are committed to accuracy. When we make mistakes, we correct them promptly and transparently.
            Every entry below reflects a real change made to the public record.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-20">

        {/* Policy Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 cor-grid">
          {[
            {
              icon: <FiEdit size={32} className="text-[#b8974a] mb-4" />,
              title: "Correction",
              desc: "For factual errors in dates, names, or data. Original content is preserved with correction notes.",
            },
            {
              icon: <FiInfo size={32} className="text-[#b8974a] mb-4" />,
              title: "Clarification",
              desc: "For context or ambiguity issues. Added to provide additional clarity without changing content.",
            },
            {
              icon: <FiRefreshCw size={32} className="text-[#b8974a] mb-4" />,
              title: "Update",
              desc: "For new information or developments after publication. Appended with date and source.",
            },
          ].map((card) => (
            <div key={card.title} className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
              {card.icon}
              <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">{card.title}</h3>
              <p className="font-garamond text-[#1a1818] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Policy Statement */}
        <div className="bg-[#ede8dc] border border-[#d4c8b4] p-6 mb-12">
          <div className="flex items-start gap-4">
            <FiAlertCircle size={24} className="text-[#b8974a] flex-shrink-0 mt-1" />
            <div>
              <p className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2">Our Corrections Policy</p>
              <p className="font-garamond text-[#1a1818] leading-relaxed mb-3">
                We correct errors promptly and transparently. When a correction is made, we:
              </p>
              <ul className="space-y-2 text-[#1a1818] font-garamond">
                {[
                  "Add a correction note to the docket",
                  "Preserve the original content with a strike-through or note",
                  "Log the correction in this public log",
                  "Notify the respondent of significant corrections",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Correction Log */}
        <div>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="border-l-4 border-[#b8974a] pl-5">
              <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-2">Public Log</p>
              <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Correction Log</h2>
            </div>
            <button
              onClick={fetchCorrections}
              disabled={loading}
              className="flex items-center gap-2 font-mono-dm text-xs tracking-widest uppercase text-[#7a6e5e] border border-[#c4b89a] px-3 py-2 hover:bg-[#ede8dc] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <FiRefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Type filter + stats */}
          <div className="flex flex-wrap gap-2 mb-5 items-center">
            <span className="font-mono-dm text-xs text-[#9a8870] uppercase tracking-wider mr-1">Filter:</span>
            {["All", "Correction", "Clarification", "Update"].map((t) => {
              const count = t === "All" ? corrections.length : (counts[t] || 0);
              return (
                <button
                  key={t}
                  onClick={() => { setTypeFilter(t); setShowAll(false); }}
                  className="font-mono-dm text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer"
                  style={
                    typeFilter === t
                      ? { background: "#1e2d4a", color: "#f5f0e8", borderColor: "#1e2d4a" }
                      : { background: "transparent", color: "#7a6e5e", borderColor: "#c4b89a" }
                  }
                >
                  {t} {count > 0 && <span className="opacity-70">({count})</span>}
                </button>
              );
            })}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#b8974a]" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center py-16 border border-[#fecaca] bg-[#fef2f2]">
              <p className="font-playfair text-xl text-[#b91c1c] mb-2">Unable to load corrections</p>
              <p className="font-garamond text-sm text-[#7a6e5e] mb-4">{error}</p>
              <button
                onClick={fetchCorrections}
                className="font-mono-dm text-xs uppercase tracking-wider bg-[#1e2d4a] text-[#f5f0e8] px-4 py-2 cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-16 border border-[#d4c8b4] bg-[#faf6ee]">
              <FiCheckCircle size={40} className="text-[#c4b89a] mx-auto mb-3" />
              <p className="font-playfair text-xl text-[#c4b89a] mb-2">No corrections yet</p>
              <p className="font-garamond text-sm text-[#9a8870]">
                {typeFilter !== "All"
                  ? `No ${typeFilter.toLowerCase()} entries found.`
                  : "The public record has no logged corrections at this time."}
              </p>
            </div>
          )}

          {/* Table header */}
          {!loading && !error && filtered.length > 0 && (
            <>
              <div
                className="cor-table-head grid grid-cols-12 gap-4 pb-3 border-b-2 border-[#1e2d4a] font-mono-dm text-xs tracking-widest uppercase text-[#6e5a40] font-semibold"
              >
                <span className="col-span-2">Date</span>
                <span className="col-span-2">Docket</span>
                <span className="col-span-2">Type</span>
                <span className="col-span-6">Description</span>
              </div>

              <div className="space-y-0 fade-up">
                {displayed.map((entry, idx) => {
                  const typeStyle = TYPE_STYLE[entry.type] || TYPE_STYLE.Correction;
                  return (
                    <div
                      key={entry._id || idx}
                      className="cor-row grid grid-cols-12 gap-4 py-3.5 border-b border-[#e4ddd0] items-start"
                    >
                      {/* Date */}
                      <div className="cor-date col-span-2">
                        <span className="font-mono-dm text-sm text-[#9a8870]">
                          {fmtDate(entry.createdAt)}
                        </span>
                      </div>

                      {/* Docket */}
                      <div className="cor-docket col-span-2">
                        <Link
                          href={`/dockets/${entry.docketId}`}
                          className="group inline-flex items-center gap-1.5 font-mono-dm text-sm font-semibold text-[#b8974a] hover:text-[#1e2d4a] transition-colors"
                        >
                          {entry.docketNumber}
                          <FiExternalLink
                            size={10}
                            className="cor-arrow opacity-0 group-hover:opacity-100 transition-all"
                          />
                        </Link>
                        {entry.docketTitle && (
                          <p className="font-garamond text-xs text-[#9a8870] mt-0.5 line-clamp-1 max-w-[140px]">
                            {entry.docketTitle}
                          </p>
                        )}
                      </div>

                      {/* Type badge */}
                      <div className="cor-type col-span-2">
                        <span
                          className="inline-block px-2 py-0.5 text-xs font-mono-dm uppercase tracking-wider border"
                          style={{
                            background:   typeStyle.bg,
                            color:        typeStyle.text,
                            borderColor:  typeStyle.border,
                          }}
                        >
                          {entry.type}
                        </span>
                        {/* Show "From Flag" tag if triggered by a flag */}
                        {entry.sourceFlagNumber && (
                          <span className="block font-mono-dm text-[0.52rem] text-[#9a8870] mt-1 uppercase tracking-wider">
                            via {entry.sourceFlagNumber}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <div className="cor-desc col-span-6">
                        <p className="font-garamond text-sm text-[#1a1818] leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show more / less */}
              {filtered.length > 10 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-6 font-mono-dm text-sm text-[#b8974a] hover:text-[#1e2d4a] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {showAll
                    ? "Show fewer"
                    : `View all ${filtered.length} entries →`}
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-6 border-t border-[#d4c8b4]">
          <p className="font-garamond text-sm text-[#9a8870] text-center">
            {lastUpdated
              ? `Last refreshed: ${lastUpdated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} · `
              : ""}
            For corrections older than 6 months, please contact our editorial team.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}