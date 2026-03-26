// "use client";

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// /* ── FONTS ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

//     *, *::before, *::after { box-sizing: border-box; }
//     html, body { font-family: 'EB Garamond', Georgia, serif; overflow-x: hidden; }

//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm  { font-family: 'DM Mono', monospace; }

//     /* ── ARTICLE CARD ── */
//     .article-card {
//       display: flex;
//       border: 1px solid #d4c8b4;
//       background: #faf6ee;
//       text-decoration: none;
//       color: inherit;
//       cursor: pointer;
//       transition: box-shadow 0.18s, transform 0.18s, background 0.15s;
//       overflow: hidden;
//     }
//     .article-card:hover {
//       background: #fff;
//       box-shadow: 0 6px 28px rgba(30,45,74,0.09);
//       transform: translateY(-1px);
//     }
//     .article-card:hover .card-arrow { opacity: 1; transform: translateX(4px); }
//     .card-arrow { opacity: 0; transition: opacity 0.18s, transform 0.2s; }

//     /* ── LIST ROW ── */
//     .list-row {
//       display: grid;
//       grid-template-columns: 90px 1fr 160px 100px 80px 28px;
//       gap: 0 16px;
//       align-items: center;
//       padding: 14px 0;
//       border-bottom: 1px solid #e4ddd0;
//       cursor: pointer;
//       text-decoration: none;
//       color: inherit;
//       transition: background 0.12s;
//     }
//     .list-row:hover { background: #ede8dc; padding-left: 16px; padding-right: 16px; margin: 0 -16px; }
//     .list-row:hover .row-arrow { opacity: 1; transform: translateX(3px); }
//     .row-arrow { opacity: 0; transition: opacity 0.15s, transform 0.2s; color: #b8974a; }

//     @media (max-width: 860px) {
//       .list-row {
//         grid-template-columns: 1fr;
//         gap: 6px;
//       }
//       .list-row:hover { padding-left: 0; padding-right: 0; margin: 0; }
//       .col-pub, .col-date, .col-docket { display: none; }
//     }

//     /* ── CHIP FILTER ── */
//     .chip {
//       font-family: 'DM Mono', monospace;
//       font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase;
//       padding: 5px 11px; border: 1px solid #c4b89a; background: transparent;
//       color: #7a6e5e; cursor: pointer; white-space: nowrap;
//       transition: background 0.14s, color 0.14s, border-color 0.14s;
//     }
//     .chip:hover:not(.active) { border-color: #9a8870; color: #3a3028; }
//     .chip.active { background: #1e2d4a; color: #f5f0e8; border-color: #1e2d4a; }

//     /* ── STANCE PILL ── */
//     .stance-pill {
//       display: inline-flex; align-items: center; gap: 5px;
//       font-family: 'DM Mono', monospace;
//       font-size: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase;
//       padding: 3px 8px; border: 1px solid;
//     }

//     /* ── SEARCH ── */
//     .search-field {
//       background: #faf6ee; border: none;
//       border-bottom: 2px solid #1e2d4a;
//       padding: 10px 12px 10px 34px;
//       font-family: 'EB Garamond', Georgia, serif;
//       font-size: 1rem; color: #1e2d4a; outline: none; width: 100%;
//     }
//     .search-field::placeholder { color: #b8b0a0; font-style: italic; }

//     /* ── VIEW TOGGLE ── */
//     .view-btn {
//       padding: 7px 10px; border: none; cursor: pointer;
//       display: flex; align-items: center;
//       transition: background 0.14s, color 0.14s;
//     }

//     /* ── MODAL ── */
//     .modal-backdrop {
//       position: fixed; inset: 0; z-index: 500;
//       background: rgba(10,15,30,0.72);
//       display: flex; align-items: center; justify-content: center;
//       padding: 20px;
//       animation: mbFadeIn 0.18s ease;
//     }
//     @keyframes mbFadeIn { from { opacity: 0; } to { opacity: 1; } }
//     .modal-panel {
//       width: 100%; max-width: 500px; background: #f5f0e8;
//       border-top: 4px solid #b8974a; max-height: 90vh; overflow-y: auto;
//       animation: mpSlideUp 0.22s ease;
//     }
//     @keyframes mpSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

//     /* ── TICKER ── */
//     @keyframes ticker {
//       0%   { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }
//     .ticker-track {
//       display: flex; gap: 0;
//       animation: ticker 32s linear infinite;
//       width: max-content;
//     }
//     .ticker-track:hover { animation-play-state: paused; }

//     /* ── INPUT ── */
//     .modal-input {
//       width: 100%; background: #faf6ee; border: 1px solid #d4c8b4;
//       padding: 10px 13px; font-family: 'EB Garamond', Georgia, serif;
//       font-size: 0.97rem; color: #1e2d4a; outline: none;
//       transition: border-color 0.15s;
//     }
//     .modal-input:focus { border-color: #1e2d4a; }
//     .modal-input::placeholder { color: #b8b0a0; font-style: italic; }
//     .modal-select {
//       width: 100%; background: #faf6ee; border: 1px solid #d4c8b4;
//       padding: 10px 13px; appearance: none; font-family: 'EB Garamond', Georgia, serif;
//       font-size: 0.97rem; color: #1e2d4a; outline: none; cursor: pointer;
//       background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231e2d4a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
//       background-repeat: no-repeat; background-position: right 13px center;
//     }
//     .modal-select:focus { border-color: #1e2d4a; outline: none; }

//     @keyframes successPop {
//       0%   { opacity: 0; transform: scale(0.85); }
//       60%  { transform: scale(1.04); }
//       100% { opacity: 1; transform: scale(1); }
//     }
//     .success-pop { animation: successPop 0.35s ease forwards; }

//     @media (max-width: 640px) {
//       .filter-row { flex-direction: column !important; align-items: flex-start !important; }
//       .stat-grid  { grid-template-columns: 1fr 1fr !important; }
//     }
//   `}</style>
// );

// /* ── DATA ── */
// const ALL_COVERAGE = [
//   /* ── JS-2026-003 ── */
//   { id: "MW-001", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "The Malabar Record", headline: "Inside the Billing Cartel: How Kerala's Hospitals Overcharged Thousands", date: "2026-03-15", type: "Original Report", stance: "adversarial", url: "https://example.com/1", summary: "4,200-word investigation naming six private hospitals and alleging a coordinated pricing structure leading to estimated patient overcharges of ₹4.2 crore." },
//   { id: "MW-002", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "The Hindu — Kerala", headline: "Health dept issues notice to private hospital alliance over billing row", date: "2026-03-18", type: "News",            stance: "neutral",    url: "https://example.com/2", summary: "Reporting on the Kerala Health Department's show-cause notice issued to HPA, requesting billing records for the period under investigation." },
//   { id: "MW-003", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "Kerala Kaumudi",   headline: "HPA rejects billing allegations; files public docket with Journalism Society", date: "2026-03-23", type: "Follow-up",       stance: "neutral",    url: "https://example.com/3", summary: "Coverage of HPA's formal documented rebuttal, noting the submission of a 19-exhibit docket and an independent legal review." },
//   { id: "MW-004", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "Mathrubhumi",      headline: "ഹെൽത്ത്കെയർ ബില്ലിംഗ് വിവാദം: HPA പ്രതിരോധം", date: "2026-03-23", type: "Regional",         stance: "neutral",    url: "https://example.com/4", summary: "Regional-language coverage summarising the billing dispute and HPA's counter-evidence, with reaction from patient advocacy groups." },
//   { id: "MW-005", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "Deccan Herald",    headline: "Kerala private hospitals dispute overbilling claims with audit data", date: "2026-03-25", type: "News",            stance: "neutral",    url: "https://example.com/5", summary: "National coverage noting HPA's statistical reanalysis showing 96.4% of procedures fell within standard NABH rate variance." },

//   /* ── JS-2026-002 ── */
//   { id: "MW-006", docketId: "JS-2026-002", docketTitle: "City Council — Infrastructure Funding Report", outlet: "Kozhikode Chronicle", headline: "Council funds misallocated in ring-road project, sources claim", date: "2026-03-10", type: "Original Report", stance: "adversarial", url: "https://example.com/6", summary: "Regional investigation citing anonymous municipal sources alleging that ₹12 crore in infrastructure funds were redirected without tender." },
//   { id: "MW-007", docketId: "JS-2026-002", docketTitle: "City Council — Infrastructure Funding Report", outlet: "The Hindu — Kerala", headline: "City Corporation files formal response to infrastructure report", date: "2026-03-20", type: "Follow-up",       stance: "neutral",    url: "https://example.com/7", summary: "Brief report covering the council's submission of a documented rebuttal, including tender records and project completion certificates." },
//   { id: "MW-008", docketId: "JS-2026-002", docketTitle: "City Council — Infrastructure Funding Report", outlet: "Manorama Online",   headline: "Infrastructure dispute: Council points to audit trail", date: "2026-03-21", type: "News",            stance: "neutral",    url: "https://example.com/8", summary: "Digital-first coverage of the council's claim that full financial records were available but were not sought by the original publication." },

//   /* ── JS-2026-001 ── */
//   { id: "MW-009", docketId: "JS-2026-001", docketTitle: "Example Corp. — Alleged Financial Misreporting", outlet: "Business Standard", headline: "Example Corp. faces scrutiny over Q3 earnings disclosure gaps", date: "2026-03-01", type: "Original Report", stance: "adversarial", url: "https://example.com/9",  summary: "Financial desk report questioning whether Example Corp. complied with SEBI disclosure norms in its Q3 earnings filing, citing analyst notes." },
//   { id: "MW-010", docketId: "JS-2026-001", docketTitle: "Example Corp. — Alleged Financial Misreporting", outlet: "The Economic Times", headline: "Example Corp. submits full financial documentation in public docket", date: "2026-03-19", type: "Follow-up",       stance: "supportive", url: "https://example.com/10", summary: "Coverage of the company's formal reply, noting that auditor statements and board minutes contradict the original report's central claims." },
//   { id: "MW-011", docketId: "JS-2026-001", docketTitle: "Example Corp. — Alleged Financial Misreporting", outlet: "Mint",             headline: "Corporate right-of-reply: Is this a new accountability model?", date: "2026-03-22", type: "Opinion",          stance: "neutral",    url: "https://example.com/11", summary: "Opinion piece examining the broader implications of the Journalism Society model for corporate communications and media accountability in India." },

//   /* ── JS-2026-007 ── */
//   { id: "MW-012", docketId: "JS-2026-007", docketTitle: "Nilambur Relief Trust — Fund Misuse Allegations", outlet: "The Wire",         headline: "NGO fund audit raises questions about donor transparency", date: "2026-01-25", type: "Original Report", stance: "adversarial", url: "https://example.com/12", summary: "Investigative report questioning how Nilambur Relief Trust allocated disaster relief donations during the 2023 flood response period." },
//   { id: "MW-013", docketId: "JS-2026-007", docketTitle: "Nilambur Relief Trust — Fund Misuse Allegations", outlet: "Scroll.in",        headline: "Relief trust releases complete audited accounts in public record", date: "2026-02-04", type: "Follow-up",       stance: "supportive", url: "https://example.com/13", summary: "Update covering the NGO's public docket submission, which includes three years of audited accounts and donor communication logs." },

//   /* ── JS-2026-009 ── */
//   { id: "MW-014", docketId: "JS-2026-009", docketTitle: "Calicut University — Caste Bias in Admissions", outlet: "The News Minute",   headline: "Data suggests caste-based admissions gap at Calicut University", date: "2026-01-05", type: "Original Report", stance: "adversarial", url: "https://example.com/14", summary: "Data journalism piece analysing admissions records obtained under RTI, arguing that OBC and SC/ST enrolment rates have declined over three years." },
//   { id: "MW-015", docketId: "JS-2026-009", docketTitle: "Calicut University — Caste Bias in Admissions", outlet: "Indian Express",    headline: "Calicut University disputes admissions data methodology", date: "2026-01-12", type: "News",            stance: "neutral",    url: "https://example.com/15", summary: "Report on the university's claim that the RTI data was misread, with the administration pointing to classification errors in the source files." },
//   { id: "MW-016", docketId: "JS-2026-009", docketTitle: "Calicut University — Caste Bias in Admissions", outlet: "Outlook India",     headline: "University-press dispute highlights RTI data interpretation gaps", date: "2026-01-20", type: "Opinion",          stance: "neutral",    url: "https://example.com/16", summary: "Commentary examining how RTI data can be misinterpreted when extracted without full institutional context, using the Calicut case as a study." },

//   /* ── JS-2026-011 ── */
//   { id: "MW-017", docketId: "JS-2026-011", docketTitle: "MLA Beypore — Corruption Allegation", outlet: "Reporter TV",       headline: "MLA's asset growth raises questions, opposition demands probe", date: "2025-12-01", type: "Original Report", stance: "adversarial", url: "https://example.com/17", summary: "Television news investigation comparing the MLA's declared assets across four election cycles, with commentary from opposition leaders." },
//   { id: "MW-018", docketId: "JS-2026-011", docketTitle: "MLA Beypore — Corruption Allegation", outlet: "Asianet News",      headline: "MLA submits income records and property documents in public docket", date: "2025-12-07", type: "Follow-up",       stance: "supportive", url: "https://example.com/18", summary: "Coverage of the MLA's formal response, which includes bank statements, IT returns, and a legal affidavit explaining asset growth through inheritance." },
// ];

// const STANCE_CFG = {
//   adversarial: { color: "#b8190c", bg: "#fef2f2", border: "#fecaca", label: "Adversarial" },
//   neutral:     { color: "#5a6a84", bg: "#f0f4fa", border: "#c8d4e8", label: "Neutral"     },
//   supportive:  { color: "#2d6a4f", bg: "#f0fdf4", border: "#bbf7d0", label: "Supportive"  },
// };

// const TYPE_COLORS = {
//   "Original Report": { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
//   "Follow-up":       { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
//   "News":            { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
//   "Opinion":         { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
//   "Regional":        { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
//   "Fact-Check":      { bg: "#f0fdfa", text: "#0f766e", border: "#99f6e4" },
// };

// const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// const UNIQUE_OUTLETS  = ["All", ...Array.from(new Set(ALL_COVERAGE.map(c => c.outlet))).sort()];
// const UNIQUE_DOCKETS  = ["All", ...Array.from(new Set(ALL_COVERAGE.map(c => c.docketId)))];
// const UNIQUE_TYPES    = ["All", ...Array.from(new Set(ALL_COVERAGE.map(c => c.type)))];
// const UNIQUE_STANCES  = ["All", "adversarial", "neutral", "supportive"];

// /* ── SUBMIT CITATION MODAL ── */
// function SubmitCitationModal({ onClose }) {
//   const [form, setForm]     = useState({ publication: "", type: "Follow-up", url: "", date: "", headline: "", docket: "", note: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({});
//   const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const validate = () => {
//     const e = {};
//     if (!form.publication.trim()) e.publication = "Required";
//     if (!form.headline.trim())    e.headline    = "Required";
//     if (!form.url.trim())         e.url         = "Required";
//     if (!form.date)               e.date        = "Required";
//     return e;
//   };

//   const submit = (ev) => {
//     ev.preventDefault();
//     const e = validate();
//     if (Object.keys(e).length) { setErrors(e); return; }
//     setSubmitted(true);
//   };

//   const mono  = (s = {}) => ({ fontFamily: "'DM Mono', monospace", ...s });
//   const serif = (s = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...s });

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-panel" onClick={e => e.stopPropagation()}>
//         <div style={{ background: "#1e2d4a", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//           <div>
//             <p style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 5 })}>Media Watch</p>
//             <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: "#f5f0e8" }}>Submit a Media Citation</h3>
//           </div>
//           <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#3a4e6a", padding: 4 }}
//             onMouseEnter={e => e.currentTarget.style.color = "#c8bfa8"}
//             onMouseLeave={e => e.currentTarget.style.color = "#3a4e6a"}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//           </button>
//         </div>

//         {submitted ? (
//           <div className="success-pop" style={{ padding: "40px 28px", textAlign: "center" }}>
//             <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
//             </div>
//             <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#1e2d4a", marginBottom: 8 }}>Citation Submitted</p>
//             <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#6a5e4e", marginBottom: 20 })}>
//               <strong>{form.publication}</strong>'s coverage has been flagged for editorial review and will appear once approved.
//             </p>
//             <button onClick={onClose} style={mono({ background: "#1e2d4a", color: "#f5f0e8", border: "none", padding: "10px 24px", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" })}>
//               Close
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={submit} style={{ padding: "22px" }}>
//             <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#7a6e5e", lineHeight: 1.6, marginBottom: 18, borderLeft: "3px solid #b8974a", paddingLeft: 12 })}>
//               Know of coverage that isn't listed? Submit it for editorial review.
//             </p>

//             <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 10, marginBottom: 14 }}>
//               <div>
//                 <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 5 })}>
//                   Publication <span style={{ color: "#b8974a" }}>*</span>
//                 </label>
//                 <input className="modal-input" value={form.publication} onChange={e => set("publication", e.target.value)} placeholder="e.g. NDTV, BBC" />
//                 {errors.publication && <p style={mono({ fontSize: "0.54rem", color: "#b8190c", marginTop: 3 })}>{errors.publication}</p>}
//               </div>
//               <div>
//                 <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 5 })}>
//                   Type <span style={{ color: "#b8974a" }}>*</span>
//                 </label>
//                 <select className="modal-select" value={form.type} onChange={e => set("type", e.target.value)}>
//                   {["Original Report","Follow-up","Opinion","Fact-Check","News","Regional","Other"].map(t => <option key={t}>{t}</option>)}
//                 </select>
//               </div>
//             </div>

//             <div style={{ marginBottom: 14 }}>
//               <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 5 })}>
//                 Headline <span style={{ color: "#b8974a" }}>*</span>
//               </label>
//               <input className="modal-input" value={form.headline} onChange={e => set("headline", e.target.value)} placeholder="Full article title" />
//               {errors.headline && <p style={mono({ fontSize: "0.54rem", color: "#b8190c", marginTop: 3 })}>{errors.headline}</p>}
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 10, marginBottom: 14 }}>
//               <div>
//                 <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 5 })}>
//                   Article URL <span style={{ color: "#b8974a" }}>*</span>
//                 </label>
//                 <input type="url" className="modal-input" value={form.url} onChange={e => set("url", e.target.value)} placeholder="https://…" />
//                 {errors.url && <p style={mono({ fontSize: "0.54rem", color: "#b8190c", marginTop: 3 })}>{errors.url}</p>}
//               </div>
//               <div>
//                 <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 5 })}>
//                   Date <span style={{ color: "#b8974a" }}>*</span>
//                 </label>
//                 <input type="date" className="modal-input" value={form.date} onChange={e => set("date", e.target.value)} />
//                 {errors.date && <p style={mono({ fontSize: "0.54rem", color: "#b8190c", marginTop: 3 })}>{errors.date}</p>}
//               </div>
//             </div>

//             <div style={{ marginBottom: 14 }}>
//               <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 5 })}>
//                 Related Docket ID <span style={{ color: "#b8b0a0" }}>(optional)</span>
//               </label>
//               <input className="modal-input" value={form.docket} onChange={e => set("docket", e.target.value)} placeholder="e.g. JS-2026-003" />
//             </div>

//             <div style={{ marginBottom: 20 }}>
//               <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 5 })}>
//                 Short Note <span style={{ color: "#b8b0a0" }}>(optional)</span>
//               </label>
//               <textarea className="modal-input" style={{ minHeight: 64, resize: "vertical", lineHeight: 1.6 }}
//                 value={form.note} onChange={e => set("note", e.target.value)}
//                 placeholder="e.g. Covers regulatory angle, quotes independent expert" />
//             </div>

//             <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "10px 13px", marginBottom: 20, display: "flex", gap: 8 }}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
//               <p style={serif({ fontSize: "0.86rem", fontStyle: "italic", color: "#7a6e5e" })}>All citations are reviewed before appearing in the public record.</p>
//             </div>

//             <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
//               <button type="button" onClick={onClose} style={mono({ background: "transparent", border: "1px solid #c4b89a", color: "#7a6e5e", padding: "9px 18px", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" })}>
//                 Cancel
//               </button>
//               <button type="submit" style={mono({ background: "#1e2d4a", border: "none", color: "#f5f0e8", padding: "9px 20px", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" })}>
//                 Submit Citation →
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ── ARTICLE PREVIEW MODAL ── */
// function ArticlePreviewModal({ item, onClose }) {
//   if (!item) return null;
//   const sc  = STANCE_CFG[item.stance]      || STANCE_CFG.neutral;
//   const tc  = TYPE_COLORS[item.type]       || TYPE_COLORS["News"];
//   const mono  = (s = {}) => ({ fontFamily: "'DM Mono', monospace", ...s });
//   const serif = (s = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...s });
//   const pf    = (s = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", ...s });

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-panel" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
//         {/* Stance colour stripe */}
//         <div style={{ height: 4, background: sc.color }} />

//         {/* Header */}
//         <div style={{ padding: "16px 20px 14px", borderBottom: "1px solid #e4ddd0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
//           <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
//             <span style={mono({ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1e2d4a" })}>{item.outlet}</span>
//             <span style={{ padding: "2px 7px", border: `1px solid ${tc.border}`, background: tc.bg, ...mono({ fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase", color: tc.text }) }}>{item.type}</span>
//             <span style={{ padding: "2px 7px", border: `1px solid ${sc.border}`, background: sc.bg, display: "inline-flex", alignItems: "center", gap: 4, ...mono({ fontSize: "0.52rem" }) }}>
//               <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.color, display: "inline-block" }} />
//               <span style={{ color: sc.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{sc.label}</span>
//             </span>
//           </div>
//           <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#b8b0a0", flexShrink: 0 }}
//             onMouseEnter={e => e.currentTarget.style.color = "#1e2d4a"}
//             onMouseLeave={e => e.currentTarget.style.color = "#b8b0a0"}>
//             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//           </button>
//         </div>

//         {/* Body */}
//         <div style={{ padding: "20px 20px 22px" }}>
//           <p style={mono({ fontSize: "0.54rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 })}>{fmtDate(item.date)}</p>

//           <h3 style={pf({ fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.3, color: "#1e2d4a", marginBottom: 14 })}>{item.headline}</h3>

//           <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "14px 16px", marginBottom: 18 }}>
//             <p style={mono({ fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginBottom: 7 })}>Summary</p>
//             <p style={serif({ fontSize: "0.97rem", lineHeight: 1.72, color: "#4a4035" })}>{item.summary}</p>
//           </div>

//           {/* Docket link */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", border: "1px solid #d4c8b4", background: "#faf6ee", marginBottom: 16 }}>
//             <div>
//               <p style={mono({ fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginBottom: 3 })}>Related Docket</p>
//               <p style={mono({ fontSize: "0.62rem", color: "#1e2d4a" })}>{item.docketId}</p>
//             </div>
//             <Link href={`/dockets/${item.docketId}`} onClick={onClose}
//               style={{ ...mono({ fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#b8974a", textDecoration: "none" }) }}>
//               View Docket →
//             </Link>
//           </div>

//           {/* External CTA */}
//           <a href={item.url} target="_blank" rel="noopener noreferrer"
//             style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1e2d4a", padding: "12px 18px", textDecoration: "none" }}>
//             <span style={mono({ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#f5f0e8" })}>Read Full Article</span>
//             <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
//               <span style={mono({ fontSize: "0.54rem", color: "#6a7a94" })}>{item.outlet}</span>
//               <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6a7a94" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
//             </span>
//           </a>
//           <p style={mono({ fontSize: "0.5rem", color: "#b8b0a0", letterSpacing: "0.08em", marginTop: 8, textAlign: "center" })}>
//             Opens in new tab · External content
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── MAIN PAGE ── */
// export default function MediaWatchPage() {
//   const [search,       setSearch]       = useState("");
//   const [docketFilter, setDocketFilter] = useState("All");
//   const [outletFilter, setOutletFilter] = useState("All");
//   const [typeFilter,   setTypeFilter]   = useState("All");
//   const [stanceFilter, setStanceFilter] = useState("All");
//   const [sortBy,       setSort]         = useState("newest");
//   const [view,         setView]         = useState("cards"); // "cards" | "list"
//   const [previewItem,  setPreviewItem]  = useState(null);
//   const [showSubmit,   setShowSubmit]   = useState(false);

//   const filtered = useMemo(() => {
//     let l = [...ALL_COVERAGE];
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       l = l.filter(c =>
//         c.headline.toLowerCase().includes(q) ||
//         c.outlet.toLowerCase().includes(q)   ||
//         c.docketId.toLowerCase().includes(q) ||
//         c.summary.toLowerCase().includes(q)
//       );
//     }
//     if (docketFilter !== "All") l = l.filter(c => c.docketId  === docketFilter);
//     if (outletFilter !== "All") l = l.filter(c => c.outlet    === outletFilter);
//     if (typeFilter   !== "All") l = l.filter(c => c.type      === typeFilter);
//     if (stanceFilter !== "All") l = l.filter(c => c.stance    === stanceFilter);
//     l.sort((a, b) => sortBy === "newest"
//       ? new Date(b.date) - new Date(a.date)
//       : new Date(a.date) - new Date(b.date));
//     return l;
//   }, [search, docketFilter, outletFilter, typeFilter, stanceFilter, sortBy]);

//   const hasFilters = search || docketFilter !== "All" || outletFilter !== "All" || typeFilter !== "All" || stanceFilter !== "All";
//   const clearAll   = () => { setSearch(""); setDocketFilter("All"); setOutletFilter("All"); setTypeFilter("All"); setStanceFilter("All"); };

//   const counts = {
//     total:       ALL_COVERAGE.length,
//     adversarial: ALL_COVERAGE.filter(c => c.stance === "adversarial").length,
//     neutral:     ALL_COVERAGE.filter(c => c.stance === "neutral").length,
//     supportive:  ALL_COVERAGE.filter(c => c.stance === "supportive").length,
//     outlets:     new Set(ALL_COVERAGE.map(c => c.outlet)).size,
//   };

//   /* ── ticker items ── */
//   const tickerItems = ALL_COVERAGE.slice(0, 8);

//   const mono  = (s = {}) => ({ fontFamily: "'DM Mono', monospace", ...s });
//   const serif = (s = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...s });
//   const pf    = (s = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", ...s });

//   return (
//     <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
//       <FontStyle />

//       {previewItem && <ArticlePreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />}
//       {showSubmit  && <SubmitCitationModal onClose={() => setShowSubmit(false)} />}

//       <Header />

//       {/* ── DARK BANNER ── */}
//       <div style={{ background: "#1e2d4a", borderBottom: "4px solid #b8974a" }}>
//         <div style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 24px 36px" }}>
//           <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.16em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 14 })}>
//             Public Record / Media Watch
//           </p>
//           <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
//             <h1 style={pf({ fontWeight: 900, fontSize: "clamp(2.4rem,6vw,4.2rem)", lineHeight: 0.95, color: "#f5f0e8" })}>
//               Media<br /><em style={{ color: "#b8974a", fontWeight: 400 }}>Watch</em>
//             </h1>
//             <p style={serif({ fontSize: "1rem", fontStyle: "italic", color: "#8a9bb8", maxWidth: 380, lineHeight: 1.65 })}>
//               All media coverage across every active docket — tracked, categorised, and cross-referenced for full accountability.
//             </p>
//           </div>

//           {/* Stat strip */}
//           <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
//             {[
//               { val: counts.total,       label: "Total Articles",   accent: "#f5f0e8" },
//               { val: counts.adversarial, label: "Adversarial",       accent: "#b8190c" },
//               { val: counts.neutral,     label: "Neutral",           accent: "#8a9bb8" },
//               { val: counts.supportive,  label: "Supportive",        accent: "#2d6a4f" },
//               { val: counts.outlets,     label: "Publications",      accent: "#b8974a" },
//             ].map(s => (
//               <div key={s.label} style={{ background: "rgba(30,45,74,0.6)", padding: "16px 18px" }}>
//                 <div style={{ height: 2, background: s.accent, marginBottom: 12 }} />
//                 <div style={pf({ fontWeight: 900, fontSize: "2rem", lineHeight: 1, color: s.accent })}>{s.val}</div>
//                 <div style={mono({ fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a4e6a", marginTop: 5 })}>{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── NEWS TICKER ── */}
//       <div style={{ background: "#0d1a2e", borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
//         <div style={{ display: "flex", alignItems: "center", height: 36 }}>
//           {/* Label */}
//           <div style={{ background: "#b8974a", padding: "0 14px", height: "100%", display: "flex", alignItems: "center", flexShrink: 0 }}>
//             <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#1e2d4a", fontWeight: 500 })}>
//               Latest
//             </span>
//           </div>
//           {/* Scrolling track */}
//           <div style={{ overflow: "hidden", flex: 1 }}>
//             <div className="ticker-track">
//               {[...tickerItems, ...tickerItems].map((item, i) => (
//                 <button key={i} onClick={() => setPreviewItem(item)}
//                   style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 0, padding: 0, flexShrink: 0 }}>
//                   <span style={{ padding: "0 20px 0 24px", ...mono({ fontSize: "0.58rem", color: "#8a9bb8", letterSpacing: "0.05em", whiteSpace: "nowrap" }) }}>
//                     {item.outlet}
//                   </span>
//                   <span style={{ color: "#3a4e6a", ...mono({ fontSize: "0.6rem" }) }}>·</span>
//                   <span style={{ padding: "0 24px 0 20px", ...serif({ fontSize: "0.82rem", color: "#c8bfa8", whiteSpace: "nowrap" }) }}>
//                     {item.headline.length > 72 ? item.headline.slice(0, 72) + "…" : item.headline}
//                   </span>
//                   <span style={{ color: "#2a3a54", ...mono({ fontSize: "0.6rem" }) }}>|</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <main style={{ maxWidth: 1160, margin: "0 auto", padding: "36px 24px 80px" }}>

//         {/* ── SEARCH + CONTROLS ── */}
//         <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "14px 18px", marginBottom: 4 }}>
//           <div className="filter-row" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
//             {/* Search */}
//             <div style={{ flex: "1 1 240px", position: "relative" }}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="2"
//                 style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
//                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//               </svg>
//               <input type="text" className="search-field" value={search} onChange={e => setSearch(e.target.value)}
//                 placeholder="Search by headline, outlet, docket ID…" />
//               {search && (
//                 <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9a8870", fontSize: "1.1rem" }}>×</button>
//               )}
//             </div>

//             <div style={{ width: 1, height: 26, background: "#c4b89a", flexShrink: 0 }} />

//             {/* Stance filter */}
//             <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
//               <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginRight: 2 })}>Stance</span>
//               {UNIQUE_STANCES.map(s => (
//                 <button key={s} className={`chip${stanceFilter === s ? " active" : ""}`} onClick={() => setStanceFilter(s)}>
//                   {s === "All" ? "All" : STANCE_CFG[s]?.label || s}
//                 </button>
//               ))}
//             </div>

//             <div style={{ width: 1, height: 26, background: "#c4b89a", flexShrink: 0 }} />

//             {/* Sort + View */}
//             <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
//               <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                 <span style={mono({ fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Sort</span>
//                 {[["newest","Latest"],["oldest","Oldest"]].map(([val, label]) => (
//                   <button key={val} onClick={() => setSort(val)}
//                     style={mono({ background: "none", border: "none", cursor: "pointer", fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", color: sortBy === val ? "#1e2d4a" : "#9a8870", fontWeight: sortBy === val ? "500" : "400" })}>
//                     {label}
//                   </button>
//                 ))}
//               </div>
//               {/* View toggle */}
//               <div style={{ display: "flex", border: "1px solid #c4b89a", overflow: "hidden" }}>
//                 {[
//                   ["cards", <svg key="g" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>],
//                   ["list",  <svg key="l" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>],
//                 ].map(([val, icon]) => (
//                   <button key={val} className="view-btn" onClick={() => setView(val)}
//                     style={{ background: view === val ? "#1e2d4a" : "transparent", color: view === val ? "#f5f0e8" : "#9a8870" }}>
//                     {icon}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── SECONDARY FILTERS ── */}
//         <div style={{ padding: "10px 0 16px", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
//           {/* Docket filter */}
//           <span style={mono({ fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginRight: 2 })}>Docket</span>
//           {UNIQUE_DOCKETS.map(d => (
//             <button key={d} className={`chip${docketFilter === d ? " active" : ""}`} onClick={() => setDocketFilter(d)}>
//               {d}
//             </button>
//           ))}

//           <div style={{ width: 1, height: 18, background: "#d4c8b4", margin: "0 6px" }} />

//           {/* Type filter */}
//           <span style={mono({ fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginRight: 2 })}>Type</span>
//           {UNIQUE_TYPES.map(t => (
//             <button key={t} className={`chip${typeFilter === t ? " active" : ""}`} onClick={() => setTypeFilter(t)}>
//               {t}
//             </button>
//           ))}

//           <div style={{ width: 1, height: 18, background: "#d4c8b4", margin: "0 6px" }} />

//           {/* Outlet filter */}
//           <span style={mono({ fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginRight: 2 })}>Outlet</span>
//           <select onChange={e => setOutletFilter(e.target.value)} value={outletFilter}
//             style={{ ...mono({ fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase" }), background: outletFilter !== "All" ? "#1e2d4a" : "#faf6ee", color: outletFilter !== "All" ? "#f5f0e8" : "#7a6e5e", border: "1px solid #c4b89a", padding: "5px 28px 5px 10px", cursor: "pointer", outline: "none", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23c4b89a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}>
//             {UNIQUE_OUTLETS.map(o => <option key={o}>{o}</option>)}
//           </select>

//           {hasFilters && (
//             <button onClick={clearAll} style={mono({ background: "none", border: "1px dashed #b8974a", color: "#b8974a", padding: "5px 12px", fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginLeft: 4 })}>
//               Reset all
//             </button>
//           )}

//           <span style={{ ...mono({ fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" }), marginLeft: "auto" }}>
//             {filtered.length} of {ALL_COVERAGE.length} articles
//           </span>
//         </div>

//         {/* ── EMPTY STATE ── */}
//         {filtered.length === 0 && (
//           <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid #d4c8b4" }}>
//             <p style={pf({ fontStyle: "italic", fontSize: "1.8rem", color: "#c4b89a", marginBottom: 10 })}>No coverage found</p>
//             <p style={serif({ fontSize: "1rem", color: "#9a8870" })}>Try adjusting your filters or search terms.</p>
//           </div>
//         )}

//         {/* ── CARDS VIEW ── */}
//         {view === "cards" && filtered.length > 0 && (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
//             {filtered.map(item => {
//               const sc = STANCE_CFG[item.stance]  || STANCE_CFG.neutral;
//               const tc = TYPE_COLORS[item.type]   || TYPE_COLORS["News"];
//               return (
//                 <div key={item.id} className="article-card" onClick={() => setPreviewItem(item)}>
//                   {/* Stance stripe */}
//                   <div style={{ width: 4, flexShrink: 0, background: sc.color }} />
//                   <div style={{ flex: 1, padding: "18px 18px 16px", display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
//                     {/* Top meta */}
//                     <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
//                       <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                         <span style={{ padding: "2px 7px", border: `1px solid ${tc.border}`, background: tc.bg, ...mono({ fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: tc.text }) }}>{item.type}</span>
//                         <span style={{ padding: "2px 7px", border: `1px solid ${sc.border}`, background: sc.bg, display: "inline-flex", alignItems: "center", gap: 4 }}>
//                           <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.color, display: "inline-block" }} />
//                           <span style={mono({ fontSize: "0.5rem", color: sc.color, letterSpacing: "0.08em", textTransform: "uppercase" })}>{sc.label}</span>
//                         </span>
//                       </div>
//                       <span style={mono({ fontSize: "0.52rem", color: "#9a8870", whiteSpace: "nowrap", flexShrink: 0 })}>{fmtDate(item.date)}</span>
//                     </div>

//                     {/* Outlet */}
//                     <div>
//                       <span style={mono({ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1e2d4a" })}>{item.outlet}</span>
//                     </div>

//                     {/* Headline */}
//                     <div style={{ borderTop: "1.5px solid #1e2d4a", paddingTop: 12 }}>
//                       <p style={pf({ fontWeight: 700, fontSize: "1rem", lineHeight: 1.3, color: "#1e2d4a", marginBottom: 8 })}>{item.headline}</p>
//                       <p style={{ ...serif({ fontSize: "0.88rem", lineHeight: 1.6, color: "#7a6e5e" }), display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                         {item.summary}
//                       </p>
//                     </div>

//                     {/* Footer */}
//                     <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #e4ddd0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                       <Link href={`/dockets/${item.docketId}`} onClick={e => e.stopPropagation()}
//                         style={{ ...mono({ fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#b8974a", textDecoration: "none" }) }}>
//                         {item.docketId} →
//                       </Link>
//                       <svg className="card-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1e2d4a" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* ── LIST VIEW ── */}
//         {view === "list" && filtered.length > 0 && (
//           <div>
//             {/* Header row */}
//             <div className="list-row" style={{ borderBottom: "2px solid #1e2d4a", padding: "0 0 10px", cursor: "default", background: "transparent" }}
//               onMouseEnter={() => {}} onMouseLeave={() => {}}>
//               <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Type</span>
//               <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Headline & Outlet</span>
//               <span className="col-pub"    style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Publication</span>
//               <span className="col-docket" style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Docket</span>
//               <span className="col-date"   style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Date</span>
//               <span />
//             </div>

//             {filtered.map(item => {
//               const sc = STANCE_CFG[item.stance]  || STANCE_CFG.neutral;
//               const tc = TYPE_COLORS[item.type]   || TYPE_COLORS["News"];
//               return (
//                 <div key={item.id} className="list-row" onClick={() => setPreviewItem(item)}>
//                   {/* Type + stance */}
//                   <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
//                     <span style={{ padding: "2px 7px", border: `1px solid ${tc.border}`, background: tc.bg, display: "inline-block", ...mono({ fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", color: tc.text }) }}>{item.type}</span>
//                     <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
//                       <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.color, display: "inline-block" }} />
//                       <span style={mono({ fontSize: "0.5rem", color: sc.color, letterSpacing: "0.08em", textTransform: "uppercase" })}>{sc.label}</span>
//                     </span>
//                   </div>

//                   {/* Headline */}
//                   <div style={{ minWidth: 0 }}>
//                     <p style={pf({ fontWeight: 700, fontSize: "0.97rem", lineHeight: 1.25, color: "#1e2d4a", marginBottom: 4, wordWrap: "break-word", overflowWrap: "break-word" })}>{item.headline}</p>
//                     <p style={{ ...serif({ fontSize: "0.84rem", color: "#9a8870" }), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.summary.slice(0, 90)}…</p>
//                   </div>

//                   {/* Outlet */}
//                   <span className="col-pub" style={mono({ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1e2d4a" })}>{item.outlet}</span>

//                   {/* Docket */}
//                   <Link href={`/dockets/${item.docketId}`} className="col-docket" onClick={e => e.stopPropagation()}
//                     style={{ ...mono({ fontSize: "0.58rem", color: "#b8974a", textDecoration: "none", letterSpacing: "0.06em" }) }}>
//                     {item.docketId}
//                   </Link>

//                   {/* Date */}
//                   <span className="col-date" style={mono({ fontSize: "0.58rem", color: "#9a8870" })}>{fmtDate(item.date)}</span>

//                   {/* Arrow */}
//                   <span className="row-arrow">→</span>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* ── BOTTOM CTA ── */}
//         {filtered.length > 0 && (
//           <div style={{ marginTop: 56, borderTop: "2px solid #1e2d4a", paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 18 }}>
//             <div>
//               <p style={pf({ fontWeight: 700, fontSize: "1.15rem", color: "#1e2d4a", marginBottom: 4 })}>See coverage we've missed?</p>
//               <p style={serif({ fontSize: "0.95rem", fontStyle: "italic", color: "#9a8870" })}>
//                 Help build the most complete media record for each docket.
//               </p>
//             </div>
//             <button onClick={() => setShowSubmit(true)}
//               style={{ ...mono({ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" }), background: "#1e2d4a", color: "#f5f0e8", border: "none", padding: "13px 24px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}
//               onMouseEnter={e => e.currentTarget.style.background = "#2a3f6a"}
//               onMouseLeave={e => e.currentTarget.style.background = "#1e2d4a"}>
//               <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
//               Submit a Media Citation
//             </button>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }


// app/media-watch/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FiSearch, 
  FiArrowRight, 
  FiCheck, 
  FiAlertCircle, 
  FiX, 
  FiCalendar, 
  FiFileText, 
  FiTag,
  FiExternalLink,
  FiPlus,
  FiClock
} from "react-icons/fi";

/* ── FONTS STYLES ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    html, body { font-family: 'EB Garamond', Georgia, serif; overflow-x: hidden; }

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }

    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ticker-track {
      display: flex;
      gap: 0;
      animation: ticker 32s linear infinite;
      width: max-content;
    }
    .ticker-track:hover { animation-play-state: paused; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .toast-animation { animation: fadeUp 0.3s ease forwards; }

    @keyframes successPop {
      0%   { opacity: 0; transform: scale(0.85); }
      60%  { transform: scale(1.04); }
      100% { opacity: 1; transform: scale(1); }
    }
    .success-pop { animation: successPop 0.35s ease forwards; }
  `}</style>
);

/* ── DATA ── */
const ALL_COVERAGE = [
  { id: "MW-001", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "The Malabar Record", headline: "Inside the Billing Cartel: How Kerala's Hospitals Overcharged Thousands", date: "2026-03-15", type: "Original Report", stance: "adversarial", url: "https://example.com/1", summary: "4,200-word investigation naming six private hospitals and alleging a coordinated pricing structure leading to estimated patient overcharges of ₹4.2 crore." },
  { id: "MW-002", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "The Hindu — Kerala", headline: "Health dept issues notice to private hospital alliance over billing row", date: "2026-03-18", type: "News", stance: "neutral", url: "https://example.com/2", summary: "Reporting on the Kerala Health Department's show-cause notice issued to HPA, requesting billing records for the period under investigation." },
  { id: "MW-003", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "Kerala Kaumudi", headline: "HPA rejects billing allegations; files public docket with Journalism Society", date: "2026-03-23", type: "Follow-up", stance: "neutral", url: "https://example.com/3", summary: "Coverage of HPA's formal documented rebuttal, noting the submission of a 19-exhibit docket and an independent legal review." },
  { id: "MW-004", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "Mathrubhumi", headline: "ഹെൽത്ത്കെയർ ബില്ലിംഗ് വിവാദം: HPA പ്രതിരോധം", date: "2026-03-23", type: "Regional", stance: "neutral", url: "https://example.com/4", summary: "Regional-language coverage summarising the billing dispute and HPA's counter-evidence, with reaction from patient advocacy groups." },
  { id: "MW-005", docketId: "JS-2026-003", docketTitle: "HPA Kerala Chapter — Billing Practices Claim", outlet: "Deccan Herald", headline: "Kerala private hospitals dispute overbilling claims with audit data", date: "2026-03-25", type: "News", stance: "neutral", url: "https://example.com/5", summary: "National coverage noting HPA's statistical reanalysis showing 96.4% of procedures fell within standard NABH rate variance." },
  { id: "MW-006", docketId: "JS-2026-002", docketTitle: "City Council — Infrastructure Funding Report", outlet: "Kozhikode Chronicle", headline: "Council funds misallocated in ring-road project, sources claim", date: "2026-03-10", type: "Original Report", stance: "adversarial", url: "https://example.com/6", summary: "Regional investigation citing anonymous municipal sources alleging that ₹12 crore in infrastructure funds were redirected without tender." },
  { id: "MW-007", docketId: "JS-2026-002", docketTitle: "City Council — Infrastructure Funding Report", outlet: "The Hindu — Kerala", headline: "City Corporation files formal response to infrastructure report", date: "2026-03-20", type: "Follow-up", stance: "neutral", url: "https://example.com/7", summary: "Brief report covering the council's submission of a documented rebuttal, including tender records and project completion certificates." },
  { id: "MW-008", docketId: "JS-2026-002", docketTitle: "City Council — Infrastructure Funding Report", outlet: "Manorama Online", headline: "Infrastructure dispute: Council points to audit trail", date: "2026-03-21", type: "News", stance: "neutral", url: "https://example.com/8", summary: "Digital-first coverage of the council's claim that full financial records were available but were not sought by the original publication." },
  { id: "MW-009", docketId: "JS-2026-001", docketTitle: "Example Corp. — Alleged Financial Misreporting", outlet: "Business Standard", headline: "Example Corp. faces scrutiny over Q3 earnings disclosure gaps", date: "2026-03-01", type: "Original Report", stance: "adversarial", url: "https://example.com/9", summary: "Financial desk report questioning whether Example Corp. complied with SEBI disclosure norms in its Q3 earnings filing, citing analyst notes." },
  { id: "MW-010", docketId: "JS-2026-001", docketTitle: "Example Corp. — Alleged Financial Misreporting", outlet: "The Economic Times", headline: "Example Corp. submits full financial documentation in public docket", date: "2026-03-19", type: "Follow-up", stance: "supportive", url: "https://example.com/10", summary: "Coverage of the company's formal reply, noting that auditor statements and board minutes contradict the original report's central claims." },
  { id: "MW-011", docketId: "JS-2026-001", docketTitle: "Example Corp. — Alleged Financial Misreporting", outlet: "Mint", headline: "Corporate right-of-reply: Is this a new accountability model?", date: "2026-03-22", type: "Opinion", stance: "neutral", url: "https://example.com/11", summary: "Opinion piece examining the broader implications of the Journalism Society model for corporate communications and media accountability in India." },
  { id: "MW-012", docketId: "JS-2026-007", docketTitle: "Nilambur Relief Trust — Fund Misuse Allegations", outlet: "The Wire", headline: "NGO fund audit raises questions about donor transparency", date: "2026-01-25", type: "Original Report", stance: "adversarial", url: "https://example.com/12", summary: "Investigative report questioning how Nilambur Relief Trust allocated disaster relief donations during the 2023 flood response period." },
  { id: "MW-013", docketId: "JS-2026-007", docketTitle: "Nilambur Relief Trust — Fund Misuse Allegations", outlet: "Scroll.in", headline: "Relief trust releases complete audited accounts in public record", date: "2026-02-04", type: "Follow-up", stance: "supportive", url: "https://example.com/13", summary: "Update covering the NGO's public docket submission, which includes three years of audited accounts and donor communication logs." },
  { id: "MW-014", docketId: "JS-2026-009", docketTitle: "Calicut University — Caste Bias in Admissions", outlet: "The News Minute", headline: "Data suggests caste-based admissions gap at Calicut University", date: "2026-01-05", type: "Original Report", stance: "adversarial", url: "https://example.com/14", summary: "Data journalism piece analysing admissions records obtained under RTI, arguing that OBC and SC/ST enrolment rates have declined over three years." },
  { id: "MW-015", docketId: "JS-2026-009", docketTitle: "Calicut University — Caste Bias in Admissions", outlet: "Indian Express", headline: "Calicut University disputes admissions data methodology", date: "2026-01-12", type: "News", stance: "neutral", url: "https://example.com/15", summary: "Report on the university's claim that the RTI data was misread, with the administration pointing to classification errors in the source files." },
  { id: "MW-016", docketId: "JS-2026-009", docketTitle: "Calicut University — Caste Bias in Admissions", outlet: "Outlook India", headline: "University-press dispute highlights RTI data interpretation gaps", date: "2026-01-20", type: "Opinion", stance: "neutral", url: "https://example.com/16", summary: "Commentary examining how RTI data can be misinterpreted when extracted without full institutional context, using the Calicut case as a study." },
  { id: "MW-017", docketId: "JS-2026-011", docketTitle: "MLA Beypore — Corruption Allegation", outlet: "Reporter TV", headline: "MLA's asset growth raises questions, opposition demands probe", date: "2025-12-01", type: "Original Report", stance: "adversarial", url: "https://example.com/17", summary: "Television news investigation comparing the MLA's declared assets across four election cycles, with commentary from opposition leaders." },
  { id: "MW-018", docketId: "JS-2026-011", docketTitle: "MLA Beypore — Corruption Allegation", outlet: "Asianet News", headline: "MLA submits income records and property documents in public docket", date: "2025-12-07", type: "Follow-up", stance: "supportive", url: "https://example.com/18", summary: "Coverage of the MLA's formal response, which includes bank statements, IT returns, and a legal affidavit explaining asset growth through inheritance." },
];

const STANCE_CFG = {
  adversarial: { color: "#b8190c", bg: "#fef2f2", border: "#fecaca", label: "Adversarial", icon: "alert" },
  neutral:     { color: "#5a6a84", bg: "#f0f4fa", border: "#c8d4e8", label: "Neutral", icon: "circle" },
  supportive:  { color: "#2d6a4f", bg: "#f0fdf4", border: "#bbf7d0", label: "Supportive", icon: "check" },
  pending:     { color: "#b8974a", bg: "#fffbeb", border: "#fde68a", label: "Pending Review", icon: "clock" },
};

const TYPE_COLORS = {
  "Original Report": { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  "Follow-up":       { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  "News":            { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  "Opinion":         { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
  "Regional":        { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  "Fact-Check":      { bg: "#f0fdfa", text: "#0f766e", border: "#99f6e4" },
  "Other":           { bg: "#f8fafc", text: "#475569", border: "#cbd5e1" },
};

const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const getUniqueDockets = () => {
  const docketMap = new Map();
  ALL_COVERAGE.forEach(c => {
    if (!docketMap.has(c.docketId)) {
      docketMap.set(c.docketId, c.docketTitle);
    }
  });
  return Array.from(docketMap.entries()).map(([id, title]) => ({ id, title }));
};

const getDocketTitle = (docketId) => {
  const docket = getUniqueDockets().find(d => d.id === docketId);
  return docket ? docket.title : docketId;
};

const UNIQUE_OUTLETS = ["All", ...Array.from(new Set(ALL_COVERAGE.map(c => c.outlet))).sort()];
const UNIQUE_DOCKETS = ["All", ...getUniqueDockets().map(d => d.id)];
const UNIQUE_TYPES = ["All", ...Array.from(new Set(ALL_COVERAGE.map(c => c.type)))];
const UNIQUE_STANCES = ["All", "adversarial", "neutral", "supportive"];

/* ── SUBMIT CITATION MODAL ── */
function SubmitCitationModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    publication: "",
    type: "Follow-up",
    url: "",
    date: "",
    headline: "",
    docketId: "",
    note: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const AVAILABLE_DOCKETS = getUniqueDockets();

  const validate = () => {
    const e = {};
    if (!form.publication.trim()) e.publication = "Publication name is required";
    if (!form.headline.trim()) e.headline = "Headline is required";
    if (!form.url.trim()) e.url = "Article URL is required";
    if (!form.date) e.date = "Publication date is required";
    if (!form.docketId) e.docketId = "Please select which docket this relates to";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newCitation = {
        id: `MW-${Date.now()}`,
        docketId: form.docketId,
        docketTitle: getDocketTitle(form.docketId),
        outlet: form.publication,
        headline: form.headline,
        date: form.date,
        type: form.type,
        stance: "pending",
        url: form.url,
        summary: form.note || "Awaiting editorial review"
      };

      if (onSuccess) onSuccess(newCitation);
      setSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting citation:", error);
      setErrors({ submit: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0f1e]/90 flex items-center justify-center p-5" onClick={onClose}>
      <div className="w-full max-w-[560px] bg-[#f5f0e8] border-t-4 border-[#b8974a] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="bg-[#1e2d4a] p-5 flex justify-between items-start">
          <div>
            <p className="font-mono-dm text-[0.52rem] tracking-[0.14em] text-[#3a4e6a] uppercase mb-1">Media Watch</p>
            <h3 className="font-playfair font-bold text-[1.15rem] text-[#f5f0e8]">Submit a Media Citation</h3>
          </div>
          <button onClick={onClose} className="text-[#3a4e6a] hover:text-[#c8bfa8] transition-colors p-1">
            <FiX size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="success-pop p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#2d6a4f] flex items-center justify-center mx-auto mb-4">
              <FiCheck size={24} className="text-[#f5f0e8]" />
            </div>
            <p className="font-playfair font-bold text-[1.1rem] text-[#1e2d4a] mb-2">Citation Submitted</p>
            <p className="font-garamond text-[0.95rem] leading-relaxed text-[#6a5e4e] mb-5">
              <strong>{form.publication}</strong>'s coverage of <strong>{form.docketId}</strong> has been flagged for editorial review.
            </p>
            <button onClick={onClose} className="font-mono-dm bg-[#1e2d4a] text-[#f5f0e8] px-6 py-2.5 text-[0.6rem] tracking-[0.12em] uppercase">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <p className="font-garamond text-[0.92rem] italic text-[#7a6e5e] leading-relaxed mb-5 border-l-3 border-[#b8974a] pl-3">
              Know of coverage that isn't listed? Submit it for editorial review.
            </p>

            <div className="mb-4">
              <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                Related Docket <span className="text-[#b8974a]">*</span>
              </label>
              <select
                className={`w-full bg-[#faf6ee] border p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.docketId ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                value={form.docketId}
                onChange={e => setForm({ ...form, docketId: e.target.value })}
              >
                <option value="">Select a docket...</option>
                {AVAILABLE_DOCKETS.map(docket => (
                  <option key={docket.id} value={docket.id}>
                    {docket.id} — {docket.title}
                  </option>
                ))}
              </select>
              {errors.docketId && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.docketId}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_130px] gap-2.5 mb-4">
              <div>
                <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                  Publication <span className="text-[#b8974a]">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full bg-[#faf6ee] border p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.publication ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                  value={form.publication}
                  onChange={e => setForm({ ...form, publication: e.target.value })}
                  placeholder="e.g. NDTV, BBC"
                />
                {errors.publication && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.publication}</p>}
              </div>
              <div>
                <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                  Type <span className="text-[#b8974a]">*</span>
                </label>
                <select
                  className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a]"
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                >
                  {["Original Report", "Follow-up", "Opinion", "Fact-Check", "News", "Regional", "Other"].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                Headline <span className="text-[#b8974a]">*</span>
              </label>
              <input
                type="text"
                className={`w-full bg-[#faf6ee] border p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.headline ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                value={form.headline}
                onChange={e => setForm({ ...form, headline: e.target.value })}
                placeholder="Full article title"
              />
              {errors.headline && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.headline}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_130px] gap-2.5 mb-4">
              <div>
                <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                  Article URL <span className="text-[#b8974a]">*</span>
                </label>
                <input
                  type="url"
                  className={`w-full bg-[#faf6ee] border p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.url ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                  value={form.url}
                  onChange={e => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                />
                {errors.url && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.url}</p>}
              </div>
              <div>
                <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                  Date <span className="text-[#b8974a]">*</span>
                </label>
                <input
                  type="date"
                  className={`w-full bg-[#faf6ee] border p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.date ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                />
                {errors.date && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.date}</p>}
              </div>
            </div>

            <div className="mb-5">
              <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                Summary / Note <span className="text-[#b8b0a0]">(optional)</span>
              </label>
              <textarea
                className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y min-h-[64px]"
                value={form.note}
                onChange={e => setForm({ ...form, note: e.target.value })}
                placeholder="Brief summary of the article or key points from the coverage..."
              />
            </div>

            {errors.submit && (
              <div className="bg-[#fee2e2] border border-[#fecaca] p-2.5 mb-5">
                <p className="font-garamond text-[0.86rem] text-[#b8190c]">{errors.submit}</p>
              </div>
            )}

            <div className="bg-[#ede8dc] border border-[#d4c8b4] p-2.5 mb-5 flex gap-2">
              <FiAlertCircle size={13} className="text-[#9a8870] flex-shrink-0 mt-0.5" />
              <p className="font-garamond text-[0.86rem] italic text-[#7a6e5e]">
                All citations are reviewed before appearing in the public record. We'll verify the content and assign a stance after review.
              </p>
            </div>

            <div className="flex gap-2.5 justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="font-mono-dm bg-transparent border border-[#c4b89a] text-[#7a6e5e] px-5 py-2 text-[0.58rem] tracking-[0.1em] uppercase cursor-pointer hover:bg-[#ede8dc] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-mono-dm bg-[#1e2d4a] text-[#f5f0e8] px-5 py-2 text-[0.58rem] tracking-[0.1em] uppercase cursor-pointer hover:bg-[#2a3f6a] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Citation →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── ARTICLE PREVIEW MODAL ── */
function ArticlePreviewModal({ item, onClose }) {
  if (!item) return null;
  const sc = STANCE_CFG[item.stance] || STANCE_CFG.pending;
  const tc = TYPE_COLORS[item.type] || TYPE_COLORS["News"];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0f1e]/90 flex items-center justify-center p-5" onClick={onClose}>
      <div className="w-full max-w-[480px] bg-[#f5f0e8]" onClick={e => e.stopPropagation()}>
        <div className="h-1" style={{ background: sc.color }} />
        
        <div className="p-4 border-b border-[#e4ddd0] flex justify-between items-start gap-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono-dm text-[0.62rem] font-medium tracking-[0.1em] uppercase text-[#1e2d4a]">{item.outlet}</span>
            <span className="px-1.5 py-0.5 border text-[0.52rem] tracking-[0.08em] uppercase" style={{ borderColor: tc.border, background: tc.bg, color: tc.text }}>
              {item.type}
            </span>
            <span className="px-1.5 py-0.5 border flex items-center gap-1 text-[0.52rem]" style={{ borderColor: sc.border, background: sc.bg, color: sc.color }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
              {sc.label}
            </span>
          </div>
          <button onClick={onClose} className="text-[#b8b0a0] hover:text-[#1e2d4a] transition-colors">
            <FiX size={15} />
          </button>
        </div>

        <div className="p-5">
          <p className="font-mono-dm text-[0.54rem] text-[#9a8870] tracking-[0.1em] uppercase mb-2.5">
            {fmtDate(item.date)}
          </p>
          <h3 className="font-playfair font-bold text-[1.15rem] leading-tight text-[#1e2d4a] mb-3.5">
            {item.headline}
          </h3>
          
          <div className="bg-[#ede8dc] border border-[#d4c8b4] p-3.5 mb-4">
            <p className="font-mono-dm text-[0.52rem] tracking-[0.12em] uppercase text-[#9a8870] mb-1.5">Summary</p>
            <p className="font-garamond text-[0.97rem] leading-relaxed text-[#4a4035]">{item.summary}</p>
          </div>

          <div className="flex items-center justify-between p-2.5 border border-[#d4c8b4] bg-[#faf6ee] mb-4">
            <div>
              <p className="font-mono-dm text-[0.5rem] tracking-[0.12em] uppercase text-[#9a8870] mb-0.5">Related Docket</p>
              <p className="font-mono-dm text-[0.62rem] text-[#1e2d4a]">{item.docketId}</p>
            </div>
            <Link href={`/dockets/${item.docketId}`} onClick={onClose} className="font-mono-dm text-[0.56rem] tracking-[0.1em] uppercase text-[#b8974a] no-underline">
              View Docket →
            </Link>
          </div>

          <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[#1e2d4a] p-3 no-underline hover:bg-[#2a3f6a] transition-colors">
            <span className="font-mono-dm text-[0.6rem] tracking-[0.12em] uppercase text-[#f5f0e8]">Read Full Article</span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono-dm text-[0.54rem] text-[#6a7a94]">{item.outlet}</span>
              <FiExternalLink size={11} className="text-[#6a7a94]" />
            </span>
          </a>
          <p className="font-mono-dm text-[0.5rem] text-[#b8b0a0] tracking-[0.08em] mt-2 text-center">
            Opens in new tab · External content
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── TOAST NOTIFICATION ── */
function Toast({ message, type, onClose }) {
  const bgColor = type === "success" ? "#2d6a4f" : "#b8190c";
  
  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded shadow-lg toast-animation`} style={{ background: bgColor, color: "#fff" }}>
      {type === "success" ? <FiCheck size={16} /> : <FiAlertCircle size={16} />}
      <span className="font-mono-dm text-[0.8rem] tracking-[0.05em]">{message}</span>
      <button onClick={onClose} className="ml-2 text-white opacity-70 hover:opacity-100">
        <FiX size={14} />
      </button>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function MediaWatchPage() {
  const [search, setSearch] = useState("");
  const [docketFilter, setDocketFilter] = useState("All");
  const [outletFilter, setOutletFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [stanceFilter, setStanceFilter] = useState("All");
  const [sortBy, setSort] = useState("newest");
  const [view, setView] = useState("cards");
  const [previewItem, setPreviewItem] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [toast, setToast] = useState(null);
  const [coverage, setCoverage] = useState(ALL_COVERAGE);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCitationSuccess = (newCitation) => {
    setCoverage(prev => [newCitation, ...prev]);
    showToast(`Citation for ${newCitation.docketId} submitted successfully!`, "success");
  };

  const filtered = useMemo(() => {
    let l = [...coverage];
    if (search.trim()) {
      const q = search.toLowerCase();
      l = l.filter(c =>
        c.headline.toLowerCase().includes(q) ||
        c.outlet.toLowerCase().includes(q) ||
        c.docketId.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q)
      );
    }
    if (docketFilter !== "All") l = l.filter(c => c.docketId === docketFilter);
    if (outletFilter !== "All") l = l.filter(c => c.outlet === outletFilter);
    if (typeFilter !== "All") l = l.filter(c => c.type === typeFilter);
    if (stanceFilter !== "All") l = l.filter(c => c.stance === stanceFilter);
    l.sort((a, b) => sortBy === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date));
    return l;
  }, [search, docketFilter, outletFilter, typeFilter, stanceFilter, sortBy, coverage]);

  const hasFilters = search || docketFilter !== "All" || outletFilter !== "All" || typeFilter !== "All" || stanceFilter !== "All";
  const clearAll = () => {
    setSearch("");
    setDocketFilter("All");
    setOutletFilter("All");
    setTypeFilter("All");
    setStanceFilter("All");
  };

  const counts = {
    total: coverage.length,
    adversarial: coverage.filter(c => c.stance === "adversarial").length,
    neutral: coverage.filter(c => c.stance === "neutral").length,
    supportive: coverage.filter(c => c.stance === "supportive").length,
    pending: coverage.filter(c => c.stance === "pending").length,
    outlets: new Set(coverage.map(c => c.outlet)).size,
  };

  const tickerItems = coverage.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />

      {previewItem && <ArticlePreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />}
      {showSubmit && <SubmitCitationModal onClose={() => setShowSubmit(false)} onSuccess={handleCitationSuccess} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <Header />

      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-11 md:py-12">
          <p className="font-mono-dm text-[0.56rem] tracking-[0.16em] text-[#3a4e6a] uppercase mb-3.5">
            Public Record / Media Watch
          </p>
          <div className="flex items-end justify-between flex-wrap gap-5 mb-7">
            <h1 className="font-playfair font-black text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] text-[#f5f0e8]">
              Media<br /><em className="text-[#b8974a] font-normal">Watch</em>
            </h1>
            <p className="font-garamond text-base italic text-[#8a9bb8] max-w-[380px] leading-relaxed">
              All media coverage across every active docket — tracked, categorised, and cross-referenced for full accountability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10">
            {[
              { val: counts.total, label: "Total Articles", accent: "#f5f0e8" },
              { val: counts.adversarial, label: "Adversarial", accent: "#b8190c" },
              { val: counts.neutral, label: "Neutral", accent: "#8a9bb8" },
              { val: counts.supportive, label: "Supportive", accent: "#2d6a4f" },
              { val: counts.pending, label: "Pending Review", accent: "#b8974a" },
              { val: counts.outlets, label: "Publications", accent: "#c8bfa8" },
            ].map(s => (
              <div key={s.label} className="bg-[#1e2d4a]/60 p-4">
                <div className="h-0.5 mb-3" style={{ background: s.accent }} />
                <div className="font-playfair font-black text-3xl leading-none" style={{ color: s.accent }}>{s.val}</div>
                <div className="font-mono-dm text-[0.52rem] tracking-[0.12em] uppercase text-[#3a4e6a] mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0d1a2e] border-b border-white/10 overflow-hidden">
        <div className="flex items-center h-9">
          <div className="bg-[#b8974a] px-3.5 h-full flex items-center flex-shrink-0">
            <span className="font-mono-dm text-[0.54rem] tracking-[0.14em] uppercase text-[#1e2d4a] font-medium">Latest</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="ticker-track flex">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setPreviewItem(item)}
                  className="bg-transparent border-none cursor-pointer flex items-center gap-0 p-0 flex-shrink-0"
                >
                  <span className="px-5 pl-6 font-mono-dm text-[0.58rem] text-[#8a9bb8] tracking-[0.05em] whitespace-nowrap">
                    {item.outlet}
                  </span>
                  <span className="font-mono-dm text-[0.6rem] text-[#3a4e6a]">·</span>
                  <span className="px-6 pl-5 font-garamond text-[0.82rem] text-[#c8bfa8] whitespace-nowrap">
                    {item.headline.length > 72 ? item.headline.slice(0, 72) + "…" : item.headline}
                  </span>
                  <span className="font-mono-dm text-[0.6rem] text-[#2a3a54]">|</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-9 pb-20">
        <div className="bg-[#ede8dc] border border-[#d4c8b4] p-3.5 mb-1">
          <div className="flex flex-col md:flex-row items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[240px] relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={13} />
              <input
                type="text"
                className="w-full bg-[#faf6ee] border-b-2 border-[#1e2d4a] pl-8 pr-8 py-2.5 font-garamond text-base text-[#1e2d4a] focus:outline-none"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by headline, outlet, docket ID…"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8870] hover:text-[#1e2d4a]">
                  <FiX size={14} />
                </button>
              )}
            </div>

            <div className="w-px h-6 bg-[#c4b89a] hidden md:block" />

            <div className="flex gap-1.5 items-center flex-wrap">
              <span className="font-mono-dm text-[0.54rem] tracking-[0.12em] uppercase text-[#9a8870] mr-0.5">Stance</span>
              {UNIQUE_STANCES.map(s => (
                <button
                  key={s}
                  onClick={() => setStanceFilter(s)}
                  className={`font-mono-dm text-[0.58rem] tracking-[0.12em] uppercase px-3 py-1 border transition-all whitespace-nowrap ${
                    stanceFilter === s
                      ? "bg-[#1e2d4a] text-[#f5f0e8] border-[#1e2d4a]"
                      : "bg-transparent text-[#7a6e5e] border-[#c4b89a] hover:border-[#9a8870] hover:text-[#3a3028]"
                  }`}
                >
                  {s === "All" ? "All" : STANCE_CFG[s]?.label || s}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-[#c4b89a] hidden md:block" />

            <div className="flex items-center gap-3 ml-auto">
              <div className="flex gap-2 items-center">
                <span className="font-mono-dm text-[0.52rem] tracking-[0.1em] uppercase text-[#9a8870]">Sort</span>
                <button
                  onClick={() => setSort("newest")}
                  className={`font-mono-dm text-[0.56rem] tracking-[0.1em] uppercase ${sortBy === "newest" ? "text-[#1e2d4a] font-medium" : "text-[#9a8870]"} hover:text-[#1e2d4a] transition-colors`}
                >
                  Latest
                </button>
                <span className="text-[#9a8870]">·</span>
                <button
                  onClick={() => setSort("oldest")}
                  className={`font-mono-dm text-[0.56rem] tracking-[0.1em] uppercase ${sortBy === "oldest" ? "text-[#1e2d4a] font-medium" : "text-[#9a8870]"} hover:text-[#1e2d4a] transition-colors`}
                >
                  Oldest
                </button>
              </div>
              <div className="flex border border-[#c4b89a] overflow-hidden">
                <button
                  onClick={() => setView("cards")}
                  className={`p-1.5 flex items-center transition-colors ${view === "cards" ? "bg-[#1e2d4a] text-[#f5f0e8]" : "bg-transparent text-[#9a8870]"}`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 flex items-center transition-colors ${view === "list" ? "bg-[#1e2d4a] text-[#f5f0e8]" : "bg-transparent text-[#9a8870]"}`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-2.5 pb-4 flex gap-1.5 flex-wrap items-center">
          <span className="font-mono-dm text-[0.52rem] tracking-[0.12em] uppercase text-[#9a8870] mr-0.5">Docket</span>
          {UNIQUE_DOCKETS.slice(0, 5).map(d => (
            <button
              key={d}
              onClick={() => setDocketFilter(d)}
              className={`font-mono-dm text-[0.58rem] tracking-[0.12em] uppercase px-3 py-1 border transition-all ${
                docketFilter === d
                  ? "bg-[#1e2d4a] text-[#f5f0e8] border-[#1e2d4a]"
                  : "bg-transparent text-[#7a6e5e] border-[#c4b89a] hover:border-[#9a8870] hover:text-[#3a3028]"
              }`}
            >
              {d}
            </button>
          ))}
          {UNIQUE_DOCKETS.length > 5 && (
            <select
              onChange={e => setDocketFilter(e.target.value)}
              value={docketFilter}
              className="font-mono-dm text-[0.58rem] tracking-[0.08em] uppercase border border-[#c4b89a] px-2 py-1 pl-2 pr-7 cursor-pointer outline-none bg-[#faf6ee] text-[#7a6e5e] appearance-none"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23c4b89a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center"
              }}
            >
              {UNIQUE_DOCKETS.map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          )}

          <div className="w-px h-4 bg-[#d4c8b4] mx-1.5" />

          <span className="font-mono-dm text-[0.52rem] tracking-[0.12em] uppercase text-[#9a8870] mr-0.5">Type</span>
          {UNIQUE_TYPES.slice(0, 4).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`font-mono-dm text-[0.58rem] tracking-[0.12em] uppercase px-3 py-1 border transition-all ${
                typeFilter === t
                  ? "bg-[#1e2d4a] text-[#f5f0e8] border-[#1e2d4a]"
                  : "bg-transparent text-[#7a6e5e] border-[#c4b89a] hover:border-[#9a8870] hover:text-[#3a3028]"
              }`}
            >
              {t}
            </button>
          ))}
          {UNIQUE_TYPES.length > 4 && (
            <select
              onChange={e => setTypeFilter(e.target.value)}
              value={typeFilter}
              className="font-mono-dm text-[0.58rem] tracking-[0.08em] uppercase border border-[#c4b89a] px-2 py-1 pl-2 pr-7 cursor-pointer outline-none bg-[#faf6ee] text-[#7a6e5e] appearance-none"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23c4b89a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center"
              }}
            >
              {UNIQUE_TYPES.map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          )}

          <div className="w-px h-4 bg-[#d4c8b4] mx-1.5" />

          <span className="font-mono-dm text-[0.52rem] tracking-[0.12em] uppercase text-[#9a8870] mr-0.5">Outlet</span>
          <select
            onChange={e => setOutletFilter(e.target.value)}
            value={outletFilter}
            className="font-mono-dm text-[0.58rem] tracking-[0.08em] uppercase border border-[#c4b89a] px-2 py-1 pl-2 pr-7 cursor-pointer outline-none bg-[#faf6ee] text-[#7a6e5e] appearance-none"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23c4b89a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center"
            }}
          >
            {UNIQUE_OUTLETS.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="font-mono-dm text-[0.56rem] tracking-[0.1em] uppercase border border-dashed border-[#b8974a] text-[#b8974a] px-3 py-1 ml-1 hover:bg-[#ede8dc] transition-colors"
            >
              Reset all
            </button>
          )}

          <span className="font-mono-dm text-[0.56rem] tracking-[0.1em] uppercase text-[#9a8870] ml-auto">
            {filtered.length} of {coverage.length} articles
          </span>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 border border-[#d4c8b4]">
            <p className="font-playfair italic text-[1.8rem] text-[#c4b89a] mb-2.5">No coverage found</p>
            <p className="font-garamond text-base text-[#9a8870]">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {view === "cards" && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(item => {
              const sc = STANCE_CFG[item.stance] || STANCE_CFG.pending;
              const tc = TYPE_COLORS[item.type] || TYPE_COLORS["News"];
              return (
                <div
                  key={item.id}
                  onClick={() => setPreviewItem(item)}
                  className="flex border border-[#d4c8b4] bg-[#faf6ee] cursor-pointer hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden group"
                >
                  <div className="w-1 flex-shrink-0" style={{ background: sc.color }} />
                  <div className="flex-1 p-4 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.5 border text-[0.5rem] tracking-[0.08em] uppercase" style={{ borderColor: tc.border, background: tc.bg, color: tc.text }}>
                          {item.type}
                        </span>
                        <span className="px-1.5 py-0.5 border flex items-center gap-1 text-[0.5rem]" style={{ borderColor: sc.border, background: sc.bg, color: sc.color }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                          {sc.label}
                        </span>
                      </div>
                      <span className="font-mono-dm text-[0.52rem] text-[#9a8870] whitespace-nowrap flex-shrink-0">{fmtDate(item.date)}</span>
                    </div>

                    <div>
                      <span className="font-mono-dm text-[0.62rem] font-medium tracking-[0.1em] uppercase text-[#1e2d4a]">{item.outlet}</span>
                    </div>

                    <div className="border-t border-[#1e2d4a] pt-3">
                      <p className="font-playfair font-bold text-base leading-tight text-[#1e2d4a] mb-2">{item.headline}</p>
                      <p className="font-garamond text-[0.88rem] leading-relaxed text-[#7a6e5e] line-clamp-2">{item.summary}</p>
                    </div>

                    <div className="mt-auto pt-2.5 border-t border-[#e4ddd0] flex justify-between items-center">
                      <Link href={`/dockets/${item.docketId}`} onClick={e => e.stopPropagation()} className="font-mono-dm text-[0.52rem] tracking-[0.1em] uppercase text-[#b8974a] no-underline">
                        {item.docketId} →
                      </Link>
                      <FiArrowRight size={13} className="text-[#1e2d4a] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === "list" && filtered.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-[90px_1fr_160px_100px_80px_28px] gap-4 items-center pb-2.5 border-b-2 border-[#1e2d4a]">
              <span className="font-mono-dm text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870]">Type</span>
              <span className="font-mono-dm text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870]">Headline & Outlet</span>
              <span className="font-mono-dm text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870] hidden md:block">Publication</span>
              <span className="font-mono-dm text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870] hidden md:block">Docket</span>
              <span className="font-mono-dm text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870] hidden md:block">Date</span>
              <span />
            </div>

            {filtered.map(item => {
              const sc = STANCE_CFG[item.stance] || STANCE_CFG.pending;
              const tc = TYPE_COLORS[item.type] || TYPE_COLORS["News"];
              return (
                <div
                  key={item.id}
                  onClick={() => setPreviewItem(item)}
                  className="grid grid-cols-1 md:grid-cols-[90px_1fr_160px_100px_80px_28px] gap-4 items-center py-3.5 border-b border-[#e4ddd0] cursor-pointer hover:bg-[#ede8dc] transition-colors group"
                >
                  <div className="flex flex-col gap-1">
                    <span className="px-1.5 py-0.5 border inline-block text-[0.5rem] tracking-[0.08em] uppercase w-fit" style={{ borderColor: tc.border, background: tc.bg, color: tc.text }}>
                      {item.type}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                      <span className="font-mono-dm text-[0.5rem] text-[#sc.color]" style={{ color: sc.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{sc.label}</span>
                    </span>
                  </div>

                  <div>
                    <p className="font-playfair font-bold text-[0.97rem] leading-tight text-[#1e2d4a] mb-1">{item.headline}</p>
                    <p className="font-garamond text-[0.84rem] text-[#9a8870] truncate">{item.summary.slice(0, 90)}…</p>
                  </div>

                  <span className="font-mono-dm text-[0.6rem] font-medium tracking-[0.08em] uppercase text-[#1e2d4a] hidden md:block">{item.outlet}</span>

                  <Link href={`/dockets/${item.docketId}`} onClick={e => e.stopPropagation()} className="font-mono-dm text-[0.58rem] text-[#b8974a] no-underline tracking-[0.06em] hidden md:block">
                    {item.docketId}
                  </Link>

                  <span className="font-mono-dm text-[0.58rem] text-[#9a8870] hidden md:block">{fmtDate(item.date)}</span>

                  <FiArrowRight size={14} className="text-[#b8974a] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mt-14 pt-7 border-t-2 border-[#1e2d4a] flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-playfair font-bold text-[1.15rem] text-[#1e2d4a] mb-1">See coverage we've missed?</p>
              <p className="font-garamond text-[0.95rem] italic text-[#9a8870]">Help build the most complete media record for each docket.</p>
            </div>
            <button
              onClick={() => setShowSubmit(true)}
              className="font-mono-dm text-[0.6rem] tracking-[0.12em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-6 py-3.5 flex items-center gap-2.5 hover:bg-[#2a3f6a] transition-colors"
            >
              <FiPlus size={11} />
              Submit a Media Citation
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}