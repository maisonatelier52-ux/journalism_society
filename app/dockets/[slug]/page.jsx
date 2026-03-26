
// "use client";

// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import { useState } from "react";

// /* ── GOOGLE FONTS + RESPONSIVE CSS ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

//     *, *::before, *::after { box-sizing: border-box; }

//     /* CRITICAL FIX: Prevent horizontal overflow */
//     html, body {
//       font-family: 'EB Garamond', Georgia, serif;
//       overflow-x: hidden;
//       max-width: 100%;
//     }

//     /* CRITICAL FIX: All elements must respect viewport width */
//     * { max-width: 100%; }

//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm  { font-family: 'DM Mono', monospace; }

//     .exhibit-row:hover { background-color: #ede8dc; }
//     .exhibit-row:hover .dl-arrow { opacity: 1 !important; transform: translateX(3px); }
//     .dl-arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }

//     /* Show download arrows on mobile always (no hover on touch) */
//     @media (max-width: 640px) {
//       .dl-arrow { opacity: 1 !important; }
//     }

//     .timeline-item:last-child .tl-line { display: none; }

//     .media-card { transition: box-shadow 0.2s, transform 0.2s; }
//     .media-card:hover { box-shadow: 0 6px 28px rgba(30,45,74,0.1); transform: translateY(-2px); }

//     .response-body h3 {
//       font-family: 'Playfair Display', Georgia, serif;
//       font-weight: 700; font-size: 1.1rem; color: #1e2d4a;
//       margin: 1.8rem 0 0.5rem;
//     }
//     .response-body p {
//       font-family: 'EB Garamond', Georgia, serif;
//       font-size: 1.05rem; line-height: 1.85; color: #4a4035; margin-bottom: 1rem;
//       /* CRITICAL FIX: ensure text wraps */
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }
//     .response-body blockquote {
//       border-left: 3px solid #b8974a;
//       padding: 0.5rem 0 0.5rem 1.2rem;
//       margin: 1.4rem 0;
//     }
//     .response-body blockquote p { font-style: italic; color: #7a6e5e; }
//     .drop-cap::first-letter {
//       font-family: 'Playfair Display', Georgia, serif;
//       font-size: 3.8rem; font-weight: 900; line-height: 0.82;
//       float: left; margin: 0.1rem 0.16em 0 0; color: #1e2d4a;
//     }
//     @media (max-width: 640px) {
//       .drop-cap::first-letter {
//         font-size: 2.8rem;
//       }
//     }

//     /* Tab strip scrollable */
//     .tab-strip {
//       overflow-x: auto;
//       -webkit-overflow-scrolling: touch;
//       scrollbar-width: none;
//       /* CRITICAL FIX: don't allow strip to expand page */
//       width: 100%;
//     }
//     .tab-strip::-webkit-scrollbar { display: none; }

//     /* ── LAYOUT: two-col on desktop, single on mobile ── */
//     .docket-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; align-items: start; }

//     @media (max-width: 900px) {
//       .docket-grid { grid-template-columns: 1fr; }
//       /* Sidebar goes ABOVE main content on mobile */
//       .sidebar-col { order: -1; }
//     }

//     /* Banner title responsive */
//     .banner-title { font-size: 2.2rem; word-wrap: break-word; overflow-wrap: break-word; }
//     @media (max-width: 640px) { .banner-title { font-size: 1.35rem; } }
//     @media (min-width: 641px) and (max-width: 900px) { .banner-title { font-size: 1.85rem; } }

//     /* Banner meta: horizontal on desktop, vertical on mobile */
//     .banner-meta { display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap; }
//     .meta-divider { width: 1px; height: 28px; background: rgba(255,255,255,0.1); flex-shrink: 0; }
//     @media (max-width: 640px) {
//       .banner-meta  { flex-direction: column; gap: 10px; }
//       .meta-divider { display: none; }
//     }

//     /* Summary cards: 2-col → 1-col */
//     .summary-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//     @media (max-width: 580px) { .summary-cards { grid-template-columns: 1fr; } }

//     /* Docket detail two-col on mobile so it's compact */
//     .detail-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
//     @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr 1fr; gap: 0 16px; } }

//     /* Actions: 2 cols on mobile */
//     .actions-wrap { display: flex; flex-direction: column; }
//     @media (max-width: 900px) { .actions-wrap { display: grid; grid-template-columns: 1fr 1fr; } }

//     /* Exhibits table: hide "Pages" col on mobile */
//     .ex-table { display: grid; grid-template-columns: 58px 1fr 70px 52px 28px; gap: 0 10px; }
//     .col-pages { }
//     @media (max-width: 580px) {
//       .ex-table  { grid-template-columns: 46px 1fr 60px 24px; }
//       .col-pages { display: none !important; }
//     }

//     /* CRITICAL FIX: Exhibit title text wrapping */
//     .exhibit-title {
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       min-width: 0; /* allows grid child to shrink */
//     }

//     /* Page padding */
//     .page-pad { padding: 40px 24px 80px; }
//     @media (max-width: 640px) { .page-pad { padding: 20px 14px 60px; } }

//     .banner-pad { padding: 40px 24px 36px; }
//     @media (max-width: 640px) { .banner-pad { padding: 22px 14px 22px; } }

//     .nav-pad { padding: 0 24px; }
//     @media (max-width: 640px) { .nav-pad { padding: 0 12px; } }

//     /* Footer wrap */
//     .footer-inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 32px; }
//     .footer-cols  { display: flex; gap: 40px; flex-wrap: wrap; }

//     /* CRITICAL FIX: Prevent any text from causing overflow */
//     p, h1, h2, h3, h4, h5, h6, span, a {
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* CRITICAL FIX: Badge rows should wrap properly */
//     .badge-row {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       flex-wrap: wrap;
//     }

//     /* CRITICAL FIX: Meta text truncation on very small screens */
//     .meta-val {
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       max-width: 100%;
//     }

//     /* CRITICAL FIX: Sidebar citation text */
//     .cite-text {
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* CRITICAL FIX: Exhibit category badge */
//     .ex-cat-badge {
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       max-width: 100%;
//       display: inline-block;
//     }

//     /* CRITICAL FIX: Media cards */
//     .media-card {
//       min-width: 0;
//       overflow: hidden;
//     }
//     .media-card h-line {
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//     }

//     /* CRITICAL FIX: Main content container */
//     .main-container {
//       max-width: 1160px;
//       margin: 0 auto;
//       width: 100%;
//       /* prevent children from expanding beyond */
//       overflow: hidden;
//     }

//     /* CRITICAL FIX: Docket grid children */
//     .docket-grid > * {
//       min-width: 0;
//       overflow: hidden;
//     }

//     /* Tab buttons should not cause overflow */
//     .tab-btn {
//       white-space: nowrap;
//       flex-shrink: 0;
//     }

//     /* CRITICAL FIX: footer inner on mobile */
//     @media (max-width: 640px) {
//       .footer-inner { flex-direction: column; gap: 24px; }
//       .footer-cols  { gap: 24px; }
//     }
//   `}</style>
// );

// /* ── DATA ── */
// const DOCKET = {
//   id: "JS-2026-003",
//   title: "Healthcare Providers Alliance — Response to Billing Practices Claim",
//   respondent: "HPA Kerala Chapter",
//   type: "Industry Body",
//   status: "Open",
//   filed: "2026-03-22",
//   claim_source: "The Malabar Record",
//   claim_date: "2026-03-15",
//   exhibits_count: 19,
//   summary: {
//     claim: "On 15 March 2026, The Malabar Record published an investigation alleging that member hospitals of the HPA Kerala Chapter systematically overbilled patients for diagnostic procedures between January 2024 and December 2025, citing anonymous whistleblower testimony and partially redacted internal communications.",
//     context: "The report named six private hospitals and alleged a coordinated pricing cartel, resulting in estimated patient overcharges of ₹4.2 crore across approximately 3,800 cases. The story circulated widely and prompted calls for a government inquiry.",
//     why_matters: "The HPA Kerala Chapter represents 74 accredited hospitals serving an estimated 1.8 million patients annually across northern Kerala. The allegations, if substantiated, would represent the largest documented healthcare pricing violation in the region.",
//   },
//   response: `
//     <p class="drop-cap">The Healthcare Providers Alliance Kerala Chapter categorically rejects the characterisation of its members' billing practices as presented in The Malabar Record's investigation of 15 March 2026. The report contains substantive factual errors, relies on selectively presented data, and draws conclusions not supported by the documentary record.</p>
//     <h3>On the Allegation of Coordinated Pricing</h3>
//     <p>The claim that member hospitals engaged in cartel behaviour rests entirely on two anonymised testimonies and a partial printout of a 2024 internal pricing circular. That circular — Exhibit 7 in this docket — addresses the standardisation of cost-disclosure formats mandated by the Kerala Clinical Establishments Act (2012 Amendment), not price-fixing. The full document makes this clear; the excerpt published by The Malabar Record omits pages 3 through 6, which contain the regulatory context.</p>
//     <blockquote><p>"The circular in question is a compliance template, not a price-setting agreement. Any fair reading of the complete document makes this unambiguous."<br/>— Independent Legal Review, Exhibit 11</p></blockquote>
//     <h3>On the Financial Figures Cited</h3>
//     <p>The figure of ₹4.2 crore in alleged overcharges appears to derive from a methodology that compares private hospital rates against government facility tariffs — a comparison that is methodologically unsound. When compared against NABH-accredited private facility benchmarks, the figures cited in the report do not hold.</p>
//     <p>Exhibits 3, 4 and 5 contain billing records for the six named hospitals, cross-referenced against NABH standard rate cards. The data shows that 96.4% of procedures fell within the ±12% tolerance band considered standard variation across accredited facilities.</p>
//     <h3>On the Whistleblower Testimonies</h3>
//     <p>We have reviewed the two anonymous testimonies as quoted in the article. Based on the operational details described, we believe both originate from a single former administrative contractor whose engagement ended in September 2024 following a disciplinary process for data handling violations. We make this observation to note that the testimony reflects a specific and adversarial context that The Malabar Record did not disclose to its readers.</p>
//     <h3>Our Request</h3>
//     <p>The HPA Kerala Chapter formally requests a published correction of the factual errors identified in Exhibits 8, 9 and 10, and requests that The Malabar Record publish a link to this full response as part of its ongoing coverage. We remain willing to facilitate an independent audit by a regulator-approved body.</p>
//   `,
//   timeline: [
//     { date: "2026-03-15", event: "Original report published", detail: "The Malabar Record publishes 'Inside the Billing Cartel' — a 4,200-word investigation naming six HPA member hospitals.", type: "claim" },
//     { date: "2026-03-16", event: "HPA issues initial statement", detail: "Brief public statement rejecting allegations; commits to a full documented response within seven days.", type: "response" },
//     { date: "2026-03-17", event: "Government notice issued", detail: "Kerala Health Department issues a show-cause notice to HPA requesting billing records for the named period.", type: "third_party" },
//     { date: "2026-03-19", event: "Independent legal review commissioned", detail: "HPA engages Krishnaswamy & Associates (Kochi) for independent review of the billing circular cited in the report.", type: "response" },
//     { date: "2026-03-21", event: "Audit records compiled", detail: "Billing data from all six named hospitals compiled and cross-referenced against NABH benchmark rate cards.", type: "response" },
//     { date: "2026-03-22", event: "Full docket submitted", detail: "This docket filed with Journalism Society, including 19 exhibits, legal review, and compliance certificates.", type: "response" },
//     { date: "2026-03-24", event: "Government response submitted", detail: "HPA submits detailed reply to Kerala Health Department with full exhibit set.", type: "third_party" },
//   ],
//   exhibits: [
//     { id: "EX-01", title: "Original Article — The Malabar Record, 15 March 2026", pages: 8,   category: "Claim" },
//     { id: "EX-02", title: "HPA Kerala Chapter — Membership Register (Redacted)", pages: 3,   category: "Institutional" },
//     { id: "EX-03", title: "Billing Records — General Hospital Kozhikode (Jan 2024–Dec 2025)", pages: 47,  category: "Evidence" },
//     { id: "EX-04", title: "Billing Records — Malabar Medical Centre (Jan 2024–Dec 2025)", pages: 52,  category: "Evidence" },
//     { id: "EX-05", title: "Billing Records — Four Remaining Named Facilities (Composite)", pages: 138, category: "Evidence" },
//     { id: "EX-06", title: "NABH Standard Rate Card — Diagnostic Procedures, 2024 Edition", pages: 21,  category: "Benchmark" },
//     { id: "EX-07", title: "HPA Internal Pricing Circular — Full Text (Unredacted)", pages: 9,   category: "Evidence" },
//     { id: "EX-08", title: "Annotated Comparison: Article Claims vs. Full Circular Text", pages: 6,   category: "Analysis" },
//     { id: "EX-09", title: "Statistical Reanalysis — Procedure Rate Variance by Facility", pages: 14,  category: "Analysis" },
//     { id: "EX-10", title: "Methodology Critique — Government vs. NABH Rate Comparison", pages: 5,   category: "Analysis" },
//     { id: "EX-11", title: "Independent Legal Review — Krishnaswamy & Associates", pages: 12,  category: "Legal" },
//     { id: "EX-12", title: "Kerala Clinical Establishments Act — 2012 Amendment (Extracts)", pages: 4,   category: "Regulatory" },
//     { id: "EX-13", title: "NABH Accreditation Certificates — All Six Named Hospitals", pages: 6,   category: "Regulatory" },
//     { id: "EX-14", title: "Kerala Health Dept. Show-Cause Notice, 17 March 2026", pages: 2,   category: "Regulatory" },
//     { id: "EX-15", title: "HPA Reply to Show-Cause Notice, 24 March 2026", pages: 9,   category: "Regulatory" },
//     { id: "EX-16", title: "Whistleblower Contractor — Employment & Disciplinary File (Redacted)", pages: 7,   category: "Evidence" },
//     { id: "EX-17", title: "Patient Feedback Survey Results — 2024–2025 (Aggregate)", pages: 11,  category: "Evidence" },
//     { id: "EX-18", title: "Correspondence Log — HPA to The Malabar Record", pages: 3,   category: "Institutional" },
//     { id: "EX-19", title: "Compliance Certificates — Insurance Regulatory Billing Standards", pages: 4,   category: "Regulatory" },
//   ],
//   media_watch: [
//     { outlet: "The Malabar Record", headline: "Inside the Billing Cartel: How Kerala's Hospitals Overcharged Thousands", date: "2026-03-15", type: "Original Report", stance: "adversarial" },
//     { outlet: "Kerala Kaumudi",     headline: "HPA rejects billing allegations; files public docket", date: "2026-03-23", type: "Follow-up", stance: "neutral" },
//     { outlet: "The Hindu — Kerala", headline: "Health dept issues notice to private hospital alliance over billing row", date: "2026-03-18", type: "News", stance: "neutral" },
//     { outlet: "Mathrubhumi",        headline: "ഹെൽത്ത്കെയർ ബില്ലിംഗ് വിവാദം: HPA പ്രതിരോധം", date: "2026-03-23", type: "Regional", stance: "neutral" },
//   ],
// };

// const STATUS_STYLE = {
//   "Open":         { dot: "#16a34a", text: "#15803d", border: "#bbf7d0", bg: "#f0fdf4" },
//   "Under Review": { dot: "#f59e0b", text: "#b45309", border: "#fde68a", bg: "#fffbeb" },
//   "Closed":       { dot: "#a8a29e", text: "#78716c", border: "#e7e5e4", bg: "#f5f5f4" },
// };

// const CAT_COLOR = {
//   "Claim":        { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
//   "Evidence":     { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
//   "Analysis":     { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
//   "Legal":        { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
//   "Regulatory":   { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
//   "Benchmark":    { bg: "#f0fdfa", text: "#0f766e", border: "#99f6e4" },
//   "Institutional":{ bg: "#f8fafc", text: "#475569", border: "#cbd5e1" },
// };

// const TL_TYPE = {
//   claim:       { color: "#b8190c", label: "Claim",       bg: "#fef3f2" },
//   response:    { color: "#1e2d4a", label: "Response",    bg: "#eff4ff" },
//   third_party: { color: "#b8974a", label: "Third Party", bg: "#fffbeb" },
// };

// const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// const fmtLong = (iso) => new Date(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

// /* ─────────────────── COMPONENT ─────────────────── */
// export default function SingleDocketPage() {
//   const d  = DOCKET;
//   const st = STATUS_STYLE[d.status];
//   const [activeTab, setActiveTab] = useState("response");
//   const [exFilter,  setExFilter]  = useState("All");

//   const exCategories = ["All", ...Array.from(new Set(d.exhibits.map(e => e.category)))];
//   const filteredEx   = exFilter === "All" ? d.exhibits : d.exhibits.filter(e => e.category === exFilter);
//   const exBreakdown  = d.exhibits.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + 1; return acc; }, {});

//   /* ── shared inline-style shortcuts ── */
//   const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", wordWrap: "break-word", overflowWrap: "break-word", ...extra });
//   const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", wordWrap: "break-word", overflowWrap: "break-word", ...extra });
//   const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", wordWrap: "break-word", overflowWrap: "break-word", ...extra });

//   return (
//     <div style={{ minHeight: "100vh", background: "#f5f0e8", overflowX: "hidden", maxWidth: "100vw" }}>
//       <FontStyle />

//       {/* ══ NAV ══ */}
//     <Header/>

//       {/* ══ BANNER ══ */}
//       <div style={{ background: "#1e2d4a", borderBottom: "4px solid #b8974a" }}>
//         <div className="banner-pad" style={{ maxWidth: 1160, margin: "0 auto" }}>

//           {/* Breadcrumb */}
//           <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 18 })}>
//             Public Record / Dockets / {d.id}
//           </p>

//           {/* Badges row — FIXED: use className for flex-wrap */}
//           <div className="badge-row" style={{ marginBottom: 16 }}>
//             <span style={mono({ fontSize: "0.62rem", letterSpacing: "0.1em", color: "#8a9bb8", textTransform: "uppercase", background: "rgba(255,255,255,0.07)", padding: "4px 12px", border: "1px solid rgba(255,255,255,0.12)" })}>
//               {d.id}
//             </span>
//             <span style={mono({ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${st.border}`, background: st.bg, color: st.text, display: "inline-flex", alignItems: "center", gap: 6 })}>
//               <span style={{ width: 7, height: 7, borderRadius: "50%", background: st.dot, display: "inline-block", flexShrink: 0 }} />
//               {d.status}
//             </span>
//             <span style={mono({ fontSize: "0.58rem", letterSpacing: "0.1em", color: "#5a6e8a", textTransform: "uppercase" })}>{d.type}</span>
//           </div>

//           {/* Title — FIXED: word wrap enforced */}
//           <h1 className="font-playfair banner-title" style={{ fontWeight: 900, color: "#f5f0e8", lineHeight: 1.12, maxWidth: 820, marginBottom: 26, wordWrap: "break-word", overflowWrap: "break-word" }}>
//             {d.title}
//           </h1>

//           {/* Meta */}
//           <div className="banner-meta" style={{ paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
//             {[
//               ["Respondent",    d.respondent,              true],
//               ["In Response To",d.claim_source,             false],
//               ["Claim Published",fmtDate(d.claim_date),    false],
//               ["Docket Filed",  fmtDate(d.filed),           false],
//               ["Exhibits",      `${d.exhibits_count} docs`, false],
//             ].map(([label, val, italic], i) => (
//               <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 18, minWidth: 0 }}>
//                 {i > 0 && <div className="meta-divider" />}
//                 <div style={{ minWidth: 0 }}>
//                   <p style={mono({ fontSize: "0.52rem", color: "#3a4e6a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 })}>{label}</p>
//                   {/* FIXED: meta values get word-wrap */}
//                   <p className="meta-val" style={serif({ color: "#c8bfa8", fontSize: "0.92rem", fontStyle: italic ? "italic" : "normal" })}>{val}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ MAIN ══ */}
//       <main className="page-pad" style={{ maxWidth: 1160, margin: "0 auto", overflowX: "hidden" }}>
//         <div className="docket-grid">

//           {/* ── LEFT COLUMN ── */}
//           <div style={{ minWidth: 0, overflow: "hidden" }}>

//             {/* SUMMARY */}
//             <section style={{ marginBottom: 40 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
//                 <div style={{ width: 3, height: 26, background: "#b8974a", flexShrink: 0 }} />
//                 <h2 style={display({ fontSize: "1.45rem", fontWeight: 700, color: "#1e2d4a" })}>Summary</h2>
//               </div>

//               <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "20px 22px", marginBottom: 12 }}>
//                 <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#b8974a", textTransform: "uppercase", marginBottom: 10 })}>The Claim</p>
//                 <p style={serif({ fontSize: "1.02rem", lineHeight: 1.75, color: "#4a4035" })}>{d.summary.claim}</p>
//               </div>

//               <div className="summary-cards">
//                 {[["Context", d.summary.context], ["Why It Matters", d.summary.why_matters]].map(([label, text]) => (
//                   <div key={label} style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px" }}>
//                     <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 8 })}>{label}</p>
//                     <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#5a5048" })}>{text}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* TABS — FIXED: tab-strip is scrollable, no overflow */}
//             <div className="tab-strip" style={{ display: "flex", borderBottom: "2px solid #1e2d4a", marginBottom: 26 }}>
//               {[
//                 { key: "response", label: "Full Response" },
//                 { key: "timeline", label: "Timeline" },
//                 { key: "exhibits", label: `Exhibits (${d.exhibits.length})` },
//                 { key: "media",    label: "Media Watch" },
//               ].map(tab => (
//                 <button key={tab.key} onClick={() => setActiveTab(tab.key)}
//                   className="tab-btn"
//                   style={mono({
//                     fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
//                     padding: "10px 14px", border: "none", cursor: "pointer", whiteSpace: "nowrap",
//                     background: activeTab === tab.key ? "#1e2d4a" : "transparent",
//                     color:      activeTab === tab.key ? "#f5f0e8" : "#9a8870",
//                     marginBottom: -2, flexShrink: 0,
//                   })}>
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {/* ── FULL RESPONSE ── */}
//             {activeTab === "response" && (
//               <section style={{ minWidth: 0, overflow: "hidden" }}>
//                 <div style={{ display: "flex", gap: 10, marginBottom: 18, padding: "12px 15px", background: "#faf6ee", border: "1px solid #d4c8b4", borderLeft: "3px solid #1e2d4a" }}>
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e2d4a" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
//                   <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#6a5e4e", lineHeight: 1.6 })}>
//                     Full, unedited response submitted by <strong>{d.respondent}</strong> on {fmtLong(d.filed)}.
//                   </p>
//                 </div>
//                 {/* FIXED: response body overflow hidden */}
//                 <div className="response-body" style={{ minWidth: 0, overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: d.response }} />
//                 <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid #d4c8b4", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
//                   <span style={mono({ fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase" })}>Submitted: {fmtDate(d.filed)}</span>
//                   <span style={{ width: 1, height: 12, background: "#d4c8b4", flexShrink: 0 }} />
//                   <span style={mono({ fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase" })}>{d.respondent}</span>
//                 </div>
//               </section>
//             )}

//             {/* ── TIMELINE ── */}
//             {activeTab === "timeline" && (
//               <section>
//                 {/* Legend */}
//                 <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
//                   {Object.entries(TL_TYPE).map(([key, t]) => (
//                     <span key={key} style={mono({ fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6 })}>
//                       <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, display: "inline-block", flexShrink: 0 }} />
//                       <span style={{ color: "#7a6e5e" }}>{t.label}</span>
//                     </span>
//                   ))}
//                 </div>

//                 <div style={{ position: "relative", paddingLeft: 28 }}>
//                   {d.timeline.map((item, i) => {
//                     const t = TL_TYPE[item.type];
//                     return (
//                       <div key={i} className="timeline-item" style={{ position: "relative", paddingBottom: 26, minWidth: 0 }}>
//                         <div className="tl-line" style={{ position: "absolute", left: -28 + 6, top: 20, bottom: -8, width: 2, background: "#d4c8b4" }} />
//                         <div style={{ position: "absolute", left: -28, top: 6, width: 14, height: 14, borderRadius: "50%", background: t.color, border: "3px solid #f5f0e8", boxShadow: `0 0 0 2px ${t.color}`, flexShrink: 0 }} />
//                         <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
//                           <span style={mono({ fontSize: "0.58rem", color: "#9a8870", letterSpacing: "0.06em" })}>{fmtDate(item.date)}</span>
//                           <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 8px", background: t.bg, color: t.color, border: `1px solid ${t.color}30` })}>{t.label}</span>
//                         </div>
//                         <h4 style={display({ fontSize: "0.98rem", fontWeight: 700, color: "#1e2d4a", marginBottom: 5 })}>{item.event}</h4>
//                         <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#6a5e4e" })}>{item.detail}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </section>
//             )}

//             {/* ── EXHIBITS ── */}
//             {activeTab === "exhibits" && (
//               <section>
//                 {/* Filters — FIXED: allow wrapping */}
//                 <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
//                   <span style={mono({ fontSize: "0.56rem", letterSpacing: "0.12em", color: "#9a8870", textTransform: "uppercase", marginRight: 4 })}>Filter:</span>
//                   {exCategories.map(cat => (
//                     <button key={cat} onClick={() => setExFilter(cat)}
//                       style={mono({ fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid", cursor: "pointer",
//                         background: exFilter === cat ? "#1e2d4a" : "transparent",
//                         color:      exFilter === cat ? "#f5f0e8" : "#7a6e5e",
//                         borderColor: exFilter === cat ? "#1e2d4a" : "#c4b89a",
//                       })}>
//                       {cat}
//                     </button>
//                   ))}
//                   <span style={mono({ marginLeft: "auto", fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.08em", textTransform: "uppercase" })}>{filteredEx.length}/{d.exhibits.length}</span>
//                 </div>

//                 {/* Header */}
//                 <div className="ex-table" style={{ paddingBottom: 8, borderBottom: "2px solid #1e2d4a" }}>
//                   <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>ID</span>
//                   <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Document</span>
//                   <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Category</span>
//                   <span className="col-pages" style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Pages</span>
//                   <span />
//                 </div>

//                 {filteredEx.map(ex => {
//                   const cat = CAT_COLOR[ex.category] || CAT_COLOR["Institutional"];
//                   return (
//                     <div key={ex.id} className="exhibit-row ex-table" style={{ padding: "11px 0", borderBottom: "1px solid #d4c8b4", cursor: "pointer", alignItems: "center", transition: "background 0.15s" }}>
//                       <span style={mono({ fontSize: "0.6rem", fontWeight: 500, color: "#1e2d4a", letterSpacing: "0.05em" })}>{ex.id}</span>
//                       {/* FIXED: exhibit title wraps */}
//                       <span className="exhibit-title" style={serif({ fontSize: "0.95rem", color: "#1e2d4a", lineHeight: 1.3 })}>{ex.title}</span>
//                       <span className="ex-cat-badge" style={mono({ fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 6px", background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` })}>{ex.category}</span>
//                       <span className="col-pages" style={mono({ fontSize: "0.58rem", color: "#9a8870" })}>{ex.pages} pp.</span>
//                       <a href="#" className="dl-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", color: "#b8974a", textDecoration: "none" }}>
//                         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
//                       </a>
//                     </div>
//                   );
//                 })}

//                 <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px dashed #d4c8b4", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
//                   <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#9a8870" })}>All exhibits are public record and freely downloadable.</p>
//                   <a href="#" style={mono({ background: "#1e2d4a", color: "#f5f0e8", padding: "10px 18px", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 })}>
//                     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
//                     Download All ({d.exhibits.length} files)
//                   </a>
//                 </div>
//               </section>
//             )}

//             {/* ── MEDIA WATCH ── */}
//             {activeTab === "media" && (
//               <section>
//                 <p style={serif({ fontSize: "0.98rem", fontStyle: "italic", color: "#7a6e5e", marginBottom: 18 })}>Coverage tracked by Journalism Society's Media Watch desk.</p>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                   {d.media_watch.map((m, i) => (
//                     <a key={i} href="#" className="media-card" style={{ display: "flex", border: "1px solid #d4c8b4", background: "#faf6ee", textDecoration: "none", color: "inherit", minWidth: 0, overflow: "hidden" }}>
//                       <div style={{ width: 4, flexShrink: 0, background: m.stance === "adversarial" ? "#b8190c" : "#c4b89a" }} />
//                       <div style={{ flex: 1, padding: "14px 16px", minWidth: 0 }}>
//                         <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 7 }}>
//                           <span style={mono({ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1e2d4a" })}>{m.outlet}</span>
//                           <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a8870", padding: "2px 8px", border: "1px solid #d4c8b4" })}>{m.type}</span>
//                           <span style={mono({ fontSize: "0.54rem", color: "#b8b0a0", marginLeft: "auto" })}>{fmtDate(m.date)}</span>
//                         </div>
//                         {/* FIXED: headline word-wrap */}
//                         <p style={display({ fontSize: "0.96rem", fontWeight: 700, color: "#1e2d4a", lineHeight: 1.35, wordWrap: "break-word", overflowWrap: "break-word" })}>{m.headline}</p>
//                       </div>
//                       <div style={{ display: "flex", alignItems: "center", padding: "0 12px", flexShrink: 0 }}>
//                         <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c4b89a" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//                 <div style={{ marginTop: 20, padding: "16px 18px", background: "#ede8dc", border: "1px solid #d4c8b4" }}>
//                   <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginBottom: 6 })}>See something missing?</p>
//                   <p style={serif({ fontSize: "0.94rem", fontStyle: "italic", color: "#7a6e5e" })}>
//                     Flag additional coverage for review.{" "}
//                     <a href="#" style={{ color: "#1e2d4a" }}>Submit a media citation →</a>
//                   </p>
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* ── SIDEBAR ── */}
//           <aside className="sidebar-col" style={{ minWidth: 0, overflow: "hidden" }}>

//             {/* Docket details card */}
//             <div style={{ background: "#1e2d4a", padding: "20px 22px", marginBottom: 14 }}>
//               <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", paddingBottom: 12, marginBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" })}>
//                 Docket Details
//               </p>
//               <div className="detail-grid">
//                 {[
//                   ["Docket ID",   d.id],
//                   ["Status",      d.status],
//                   ["Type",        d.type],
//                   ["Respondent",  d.respondent],
//                   ["Claim Filed", fmtDate(d.claim_date)],
//                   ["Reply Filed", fmtDate(d.filed)],
//                   ["Exhibits",    `${d.exhibits_count} documents`],
//                 ].map(([label, val]) => (
//                   <div key={label} style={{ marginBottom: 12, minWidth: 0 }}>
//                     <p style={mono({ fontSize: "0.5rem", letterSpacing: "0.1em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 3 })}>{label}</p>
//                     <p style={serif({ color: "#c8bfa8", fontSize: "0.9rem" })}>{val}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Citation — FIXED: text wraps properly */}
//             <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px", marginBottom: 14 }}>
//               <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 10 })}>Cite This Docket</p>
//               <p className="cite-text" style={serif({ fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.7, color: "#7a6e5e" })}>
//                 {d.respondent}. "{d.title}." <em>Journalism Society Public Record</em>, {d.id}, {fmtDate(d.filed)}.
//               </p>
//             </div>

//             {/* Actions */}
//             <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px", marginBottom: 14 }}>
//               <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 12 })}>Actions</p>
//               <div className="actions-wrap">
//                 {[
//                   ["📥", "Download Full Docket"],
//                   ["🔗", "Copy Permalink"],
//                   ["📤", "Share this Record"],
//                   ["⚑",  "Flag an Error"],
//                 ].map(([icon, label]) => (
//                   <a key={label} href="#"
//                     style={mono({ fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1e2d4a", textDecoration: "none", padding: "9px 0", borderBottom: "1px solid #ede8dc", display: "flex", alignItems: "center", gap: 8 })}>
//                     <span style={{ width: 16, textAlign: "center", flexShrink: 0 }}>{icon}</span>
//                     {label}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Exhibit breakdown */}
//             <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px" }}>
//               <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 14 })}>Exhibit Breakdown</p>
//               {Object.entries(exBreakdown).map(([cat, count]) => {
//                 const c   = CAT_COLOR[cat] || CAT_COLOR["Institutional"];
//                 const pct = Math.round((count / d.exhibits.length) * 100);
//                 return (
//                   <div key={cat} style={{ marginBottom: 10 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
//                       <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", color: c.text, minWidth: 0, overflowWrap: "break-word" })}>{cat}</span>
//                       <span style={mono({ fontSize: "0.54rem", color: "#9a8870", flexShrink: 0 })}>{count}</span>
//                     </div>
//                     <div style={{ height: 4, background: "#e4ddd0", borderRadius: 2 }}>
//                       <div style={{ height: 4, width: `${pct}%`, background: c.text, borderRadius: 2 }} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </aside>
//         </div>
//       </main>

//       {/* ══ FOOTER ══ */}
//       <Footer/>
//     </div>
//   );
// }


"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

/* ── GOOGLE FONTS + RESPONSIVE CSS ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    html, body { font-family: 'EB Garamond', Georgia, serif; overflow-x: hidden; max-width: 100%; }
    * { max-width: 100%; }

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }

    .exhibit-row:hover { background-color: #ede8dc; }
    .exhibit-row:hover .dl-arrow { opacity: 1 !important; transform: translateX(3px); }
    .dl-arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
    @media (max-width: 640px) { .dl-arrow { opacity: 1 !important; } }

    .timeline-item:last-child .tl-line { display: none; }

    /* ── MEDIA CARD ── */
    .media-card {
      transition: box-shadow 0.2s, transform 0.2s, background 0.15s;
      cursor: pointer;
    }
    .media-card:hover {
      box-shadow: 0 6px 28px rgba(30,45,74,0.1);
      transform: translateY(-1px);
      background: #fff !important;
    }
    .media-card:hover .media-arrow { color: #1e2d4a !important; transform: translateX(3px); }
    .media-arrow { transition: color 0.15s, transform 0.2s; }

    .response-body h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 700; font-size: 1.1rem; color: #1e2d4a;
      margin: 1.8rem 0 0.5rem;
    }
    .response-body p {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 1.05rem; line-height: 1.85; color: #4a4035; margin-bottom: 1rem;
      word-wrap: break-word; overflow-wrap: break-word;
    }
    .response-body blockquote {
      border-left: 3px solid #b8974a;
      padding: 0.5rem 0 0.5rem 1.2rem; margin: 1.4rem 0;
    }
    .response-body blockquote p { font-style: italic; color: #7a6e5e; }
    .drop-cap::first-letter {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 3.8rem; font-weight: 900; line-height: 0.82;
      float: left; margin: 0.1rem 0.16em 0 0; color: #1e2d4a;
    }
    @media (max-width: 640px) { .drop-cap::first-letter { font-size: 2.8rem; } }

    .tab-strip {
      overflow-x: auto; -webkit-overflow-scrolling: touch;
      scrollbar-width: none; width: 100%;
    }
    .tab-strip::-webkit-scrollbar { display: none; }

    .docket-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; align-items: start; }
    @media (max-width: 900px) {
      .docket-grid { grid-template-columns: 1fr; }
      .sidebar-col { order: -1; }
    }

    .banner-title { font-size: 2.2rem; word-wrap: break-word; overflow-wrap: break-word; }
    @media (max-width: 640px) { .banner-title { font-size: 1.35rem; } }
    @media (min-width: 641px) and (max-width: 900px) { .banner-title { font-size: 1.85rem; } }

    .banner-meta { display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap; }
    .meta-divider { width: 1px; height: 28px; background: rgba(255,255,255,0.1); flex-shrink: 0; }
    @media (max-width: 640px) { .banner-meta { flex-direction: column; gap: 10px; } .meta-divider { display: none; } }

    .summary-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 580px) { .summary-cards { grid-template-columns: 1fr; } }

    .detail-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
    @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr 1fr; gap: 0 16px; } }

    .actions-wrap { display: flex; flex-direction: column; }
    @media (max-width: 900px) { .actions-wrap { display: grid; grid-template-columns: 1fr 1fr; } }

    .ex-table { display: grid; grid-template-columns: 58px 1fr 70px 52px 28px; gap: 0 10px; }
    @media (max-width: 580px) { .ex-table { grid-template-columns: 46px 1fr 60px 24px; } .col-pages { display: none !important; } }

    .exhibit-title { word-wrap: break-word; overflow-wrap: break-word; min-width: 0; }
    .page-pad { padding: 40px 24px 80px; }
    @media (max-width: 640px) { .page-pad { padding: 20px 14px 60px; } }
    .banner-pad { padding: 40px 24px 36px; }
    @media (max-width: 640px) { .banner-pad { padding: 22px 14px 22px; } }

    .footer-inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 32px; }
    .footer-cols  { display: flex; gap: 40px; flex-wrap: wrap; }
    p, h1, h2, h3, h4, h5, h6, span, a { word-wrap: break-word; overflow-wrap: break-word; }
    .badge-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .meta-val { word-wrap: break-word; overflow-wrap: break-word; max-width: 100%; }
    .cite-text { word-wrap: break-word; overflow-wrap: break-word; }
    .ex-cat-badge { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; display: inline-block; }
    .media-card { min-width: 0; overflow: hidden; }
    .main-container { max-width: 1160px; margin: 0 auto; width: 100%; overflow: hidden; }
    .docket-grid > * { min-width: 0; overflow: hidden; }
    .tab-btn { white-space: nowrap; flex-shrink: 0; }
    @media (max-width: 640px) { .footer-inner { flex-direction: column; gap: 24px; } .footer-cols { gap: 24px; } }

    /* ── MODAL BACKDROP ── */
    .modal-backdrop {
      position: fixed; inset: 0; z-index: 500;
      background: rgba(10, 15, 30, 0.7);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      animation: fadeIn 0.18s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    /* ── MODAL PANEL ── */
    .modal-panel {
      width: 100%; max-width: 520px;
      background: #f5f0e8;
      border-top: 4px solid #b8974a;
      animation: slideUp 0.22s ease;
      max-height: 90vh; overflow-y: auto;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── FORM INPUTS ── */
    .modal-input {
      width: 100%; background: #faf6ee; border: 1px solid #d4c8b4;
      padding: 10px 13px; font-family: 'EB Garamond', Georgia, serif;
      font-size: 0.97rem; color: #1e2d4a; outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .modal-input:focus { border-color: #1e2d4a; box-shadow: 0 0 0 3px rgba(30,45,74,0.06); }
    .modal-input::placeholder { color: #b8b0a0; font-style: italic; }

    .modal-select {
      width: 100%; background: #faf6ee; border: 1px solid #d4c8b4;
      padding: 10px 13px; appearance: none; font-family: 'EB Garamond', Georgia, serif;
      font-size: 0.97rem; color: #1e2d4a; outline: none; cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231e2d4a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 13px center;
      transition: border-color 0.15s;
    }
    .modal-select:focus { border-color: #1e2d4a; outline: none; }

    /* ── SUCCESS PULSE ── */
    @keyframes successPop {
      0%   { transform: scale(0.8); opacity: 0; }
      60%  { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }
    .success-pop { animation: successPop 0.35s ease forwards; }

    /* ── PREVIEW MODAL ── */
    .preview-panel { max-width: 480px; }

    /* ── STANCE INDICATOR ── */
    .stance-dot {
      display: inline-flex; align-items: center; gap: 5px;
      font-family: 'DM Mono', monospace; font-size: 0.52rem;
      letter-spacing: 0.1em; text-transform: uppercase;
    }
  `}</style>
);

/* ── DATA ── */
const DOCKET = {
  id: "JS-2026-003",
  title: "Healthcare Providers Alliance — Response to Billing Practices Claim",
  respondent: "HPA Kerala Chapter",
  type: "Industry Body",
  status: "Open",
  filed: "2026-03-22",
  claim_source: "The Malabar Record",
  claim_date: "2026-03-15",
  exhibits_count: 19,
  summary: {
    claim: "On 15 March 2026, The Malabar Record published an investigation alleging that member hospitals of the HPA Kerala Chapter systematically overbilled patients for diagnostic procedures between January 2024 and December 2025, citing anonymous whistleblower testimony and partially redacted internal communications.",
    context: "The report named six private hospitals and alleged a coordinated pricing cartel, resulting in estimated patient overcharges of ₹4.2 crore across approximately 3,800 cases. The story circulated widely and prompted calls for a government inquiry.",
    why_matters: "The HPA Kerala Chapter represents 74 accredited hospitals serving an estimated 1.8 million patients annually across northern Kerala. The allegations, if substantiated, would represent the largest documented healthcare pricing violation in the region.",
  },
  response: `
    <p class="drop-cap">The Healthcare Providers Alliance Kerala Chapter categorically rejects the characterisation of its members' billing practices as presented in The Malabar Record's investigation of 15 March 2026. The report contains substantive factual errors, relies on selectively presented data, and draws conclusions not supported by the documentary record.</p>
    <h3>On the Allegation of Coordinated Pricing</h3>
    <p>The claim that member hospitals engaged in cartel behaviour rests entirely on two anonymised testimonies and a partial printout of a 2024 internal pricing circular. That circular — Exhibit 7 in this docket — addresses the standardisation of cost-disclosure formats mandated by the Kerala Clinical Establishments Act (2012 Amendment), not price-fixing. The full document makes this clear; the excerpt published by The Malabar Record omits pages 3 through 6, which contain the regulatory context.</p>
    <blockquote><p>"The circular in question is a compliance template, not a price-setting agreement. Any fair reading of the complete document makes this unambiguous."<br/>— Independent Legal Review, Exhibit 11</p></blockquote>
    <h3>On the Financial Figures Cited</h3>
    <p>The figure of ₹4.2 crore in alleged overcharges appears to derive from a methodology that compares private hospital rates against government facility tariffs — a comparison that is methodologically unsound. When compared against NABH-accredited private facility benchmarks, the figures cited in the report do not hold.</p>
    <p>Exhibits 3, 4 and 5 contain billing records for the six named hospitals, cross-referenced against NABH standard rate cards. The data shows that 96.4% of procedures fell within the ±12% tolerance band considered standard variation across accredited facilities.</p>
    <h3>On the Whistleblower Testimonies</h3>
    <p>We have reviewed the two anonymous testimonies as quoted in the article. Based on the operational details described, we believe both originate from a single former administrative contractor whose engagement ended in September 2024 following a disciplinary process for data handling violations. We make this observation to note that the testimony reflects a specific and adversarial context that The Malabar Record did not disclose to its readers.</p>
    <h3>Our Request</h3>
    <p>The HPA Kerala Chapter formally requests a published correction of the factual errors identified in Exhibits 8, 9 and 10, and requests that The Malabar Record publish a link to this full response as part of its ongoing coverage. We remain willing to facilitate an independent audit by a regulator-approved body.</p>
  `,
  timeline: [
    { date: "2026-03-15", event: "Original report published", detail: "The Malabar Record publishes 'Inside the Billing Cartel' — a 4,200-word investigation naming six HPA member hospitals.", type: "claim" },
    { date: "2026-03-16", event: "HPA issues initial statement", detail: "Brief public statement rejecting allegations; commits to a full documented response within seven days.", type: "response" },
    { date: "2026-03-17", event: "Government notice issued", detail: "Kerala Health Department issues a show-cause notice to HPA requesting billing records for the named period.", type: "third_party" },
    { date: "2026-03-19", event: "Independent legal review commissioned", detail: "HPA engages Krishnaswamy & Associates (Kochi) for independent review of the billing circular cited in the report.", type: "response" },
    { date: "2026-03-21", event: "Audit records compiled", detail: "Billing data from all six named hospitals compiled and cross-referenced against NABH benchmark rate cards.", type: "response" },
    { date: "2026-03-22", event: "Full docket submitted", detail: "This docket filed with Journalism Society, including 19 exhibits, legal review, and compliance certificates.", type: "response" },
    { date: "2026-03-24", event: "Government response submitted", detail: "HPA submits detailed reply to Kerala Health Department with full exhibit set.", type: "third_party" },
  ],
  exhibits: [
    { id: "EX-01", title: "Original Article — The Malabar Record, 15 March 2026", pages: 8,   category: "Claim" },
    { id: "EX-02", title: "HPA Kerala Chapter — Membership Register (Redacted)", pages: 3,   category: "Institutional" },
    { id: "EX-03", title: "Billing Records — General Hospital Kozhikode (Jan 2024–Dec 2025)", pages: 47,  category: "Evidence" },
    { id: "EX-04", title: "Billing Records — Malabar Medical Centre (Jan 2024–Dec 2025)", pages: 52,  category: "Evidence" },
    { id: "EX-05", title: "Billing Records — Four Remaining Named Facilities (Composite)", pages: 138, category: "Evidence" },
    { id: "EX-06", title: "NABH Standard Rate Card — Diagnostic Procedures, 2024 Edition", pages: 21,  category: "Benchmark" },
    { id: "EX-07", title: "HPA Internal Pricing Circular — Full Text (Unredacted)", pages: 9,   category: "Evidence" },
    { id: "EX-08", title: "Annotated Comparison: Article Claims vs. Full Circular Text", pages: 6,   category: "Analysis" },
    { id: "EX-09", title: "Statistical Reanalysis — Procedure Rate Variance by Facility", pages: 14,  category: "Analysis" },
    { id: "EX-10", title: "Methodology Critique — Government vs. NABH Rate Comparison", pages: 5,   category: "Analysis" },
    { id: "EX-11", title: "Independent Legal Review — Krishnaswamy & Associates", pages: 12,  category: "Legal" },
    { id: "EX-12", title: "Kerala Clinical Establishments Act — 2012 Amendment (Extracts)", pages: 4,   category: "Regulatory" },
    { id: "EX-13", title: "NABH Accreditation Certificates — All Six Named Hospitals", pages: 6,   category: "Regulatory" },
    { id: "EX-14", title: "Kerala Health Dept. Show-Cause Notice, 17 March 2026", pages: 2,   category: "Regulatory" },
    { id: "EX-15", title: "HPA Reply to Show-Cause Notice, 24 March 2026", pages: 9,   category: "Regulatory" },
    { id: "EX-16", title: "Whistleblower Contractor — Employment & Disciplinary File (Redacted)", pages: 7,   category: "Evidence" },
    { id: "EX-17", title: "Patient Feedback Survey Results — 2024–2025 (Aggregate)", pages: 11,  category: "Evidence" },
    { id: "EX-18", title: "Correspondence Log — HPA to The Malabar Record", pages: 3,   category: "Institutional" },
    { id: "EX-19", title: "Compliance Certificates — Insurance Regulatory Billing Standards", pages: 4,   category: "Regulatory" },
  ],
  media_watch: [
    { outlet: "The Malabar Record", headline: "Inside the Billing Cartel: How Kerala's Hospitals Overcharged Thousands", date: "2026-03-15", type: "Original Report", stance: "adversarial", url: "https://example.com/malabar-record/billing-cartel", summary: "A 4,200-word investigative piece naming six private hospitals and alleging a coordinated pricing structure that led to patient overcharges of an estimated ₹4.2 crore." },
    { outlet: "Kerala Kaumudi",     headline: "HPA rejects billing allegations; files public docket", date: "2026-03-23", type: "Follow-up", stance: "neutral", url: "https://example.com/kerala-kaumudi/hpa-response", summary: "Kerala Kaumudi covers HPA's formal rejection and the filing of a public docket with Journalism Society, including the 19-exhibit response package." },
    { outlet: "The Hindu — Kerala", headline: "Health dept issues notice to private hospital alliance over billing row", date: "2026-03-18", type: "News", stance: "neutral", url: "https://www.thehindu.com/news/cities/chennai/hospitals-told-to-refund-excess-charges/article35259672.ece", summary: "Reporting on the Kerala Health Department's show-cause notice issued to HPA, requesting billing records for the period under investigation." },
    { outlet: "Mathrubhumi",        headline: "ഹെൽത്ത്കെയർ ബില്ലിംഗ് വിവാദം: HPA പ്രതിരോധം", date: "2026-03-23", type: "Regional", stance: "neutral", url: "https://example.com/mathrubhumi/hpa-response", summary: "Regional language coverage of the HPA response, summarising the key contested claims and the association's counter-evidence." },
  ],
};

const STATUS_STYLE = {
  "Open":         { dot: "#16a34a", text: "#15803d", border: "#bbf7d0", bg: "#f0fdf4" },
  "Under Review": { dot: "#f59e0b", text: "#b45309", border: "#fde68a", bg: "#fffbeb" },
  "Closed":       { dot: "#a8a29e", text: "#78716c", border: "#e7e5e4", bg: "#f5f5f4" },
};

const CAT_COLOR = {
  "Claim":        { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  "Evidence":     { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  "Analysis":     { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  "Legal":        { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
  "Regulatory":   { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  "Benchmark":    { bg: "#f0fdfa", text: "#0f766e", border: "#99f6e4" },
  "Institutional":{ bg: "#f8fafc", text: "#475569", border: "#cbd5e1" },
};

const TL_TYPE = {
  claim:       { color: "#b8190c", label: "Claim",       bg: "#fef3f2" },
  response:    { color: "#1e2d4a", label: "Response",    bg: "#eff4ff" },
  third_party: { color: "#b8974a", label: "Third Party", bg: "#fffbeb" },
};

const STANCE_CONFIG = {
  adversarial: { color: "#b8190c", label: "Adversarial", dot: "#b8190c" },
  neutral:     { color: "#6a7a94", label: "Neutral",     dot: "#6a7a94" },
  supportive:  { color: "#2d6a4f", label: "Supportive",  dot: "#2d6a4f" },
};

const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const fmtLong = (iso) => new Date(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/* ── CITATION MODAL ── */
function CitationModal({ docketId, onClose }) {
  const [form, setForm] = useState({ publication: "", type: "Follow-up", url: "", date: "", headline: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.publication.trim()) e.publication = "Publication name is required.";
    if (!form.headline.trim())    e.headline    = "Headline is required.";
    if (!form.url.trim())         e.url         = "Article URL is required.";
    if (!form.date)               e.date        = "Publication date is required.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", ...extra });
  const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...extra });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ background: "#1e2d4a", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 5 })}>
              {docketId} · Media Watch
            </p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "#f5f0e8", lineHeight: 1.2 }}>
              Submit a Media Citation
            </h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#3a4e6a", padding: 4, marginLeft: 12, flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = "#c8bfa8"}
            onMouseLeave={e => e.currentTarget.style.color = "#3a4e6a"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {submitted ? (
          /* ── SUCCESS STATE ── */
          <div className="success-pop" style={{ padding: "40px 28px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: "#1e2d4a", marginBottom: 8 }}>
              Citation Submitted
            </p>
            <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#6a5e4e", marginBottom: 4 })}>
              Thank you. <strong>{form.publication}</strong>'s coverage has been flagged for editorial review.
            </p>
            <p style={serif({ fontSize: "0.88rem", fontStyle: "italic", color: "#9a8870", marginBottom: 24 })}>
              If approved, it will appear in the Media Watch section of this docket.
            </p>
            <button onClick={onClose}
              style={mono({ background: "#1e2d4a", color: "#f5f0e8", border: "none", padding: "10px 24px", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" })}>
              Close
            </button>
          </div>
        ) : (
          /* ── FORM ── */
          <form onSubmit={submit} style={{ padding: "22px 22px 24px" }}>
            <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#7a6e5e", lineHeight: 1.6, marginBottom: 20, borderLeft: "3px solid #b8974a", paddingLeft: 12 })}>
              Help improve this record by submitting additional media coverage we may have missed.
            </p>

            {/* Publication + Type */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
                  Publication Name <span style={{ color: "#b8974a" }}>*</span>
                </label>
                <input className="modal-input" value={form.publication} onChange={e => set("publication", e.target.value)}
                  placeholder="e.g. The Hindu" />
                {errors.publication && <p style={mono({ fontSize: "0.56rem", color: "#b8190c", marginTop: 4 })}>{errors.publication}</p>}
              </div>
              <div>
                <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
                  Type <span style={{ color: "#b8974a" }}>*</span>
                </label>
                <select className="modal-select" value={form.type} onChange={e => set("type", e.target.value)}>
                  {["Original Report", "Follow-up", "Opinion", "Fact-Check", "News", "Regional", "Other"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: 14 }}>
              <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
                Article Headline <span style={{ color: "#b8974a" }}>*</span>
              </label>
              <input className="modal-input" value={form.headline} onChange={e => set("headline", e.target.value)}
                placeholder="Full title of the article" />
              {errors.headline && <p style={mono({ fontSize: "0.56rem", color: "#b8190c", marginTop: 4 })}>{errors.headline}</p>}
            </div>

            {/* URL + Date */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
                  Article URL <span style={{ color: "#b8974a" }}>*</span>
                </label>
                <input type="url" className="modal-input" value={form.url} onChange={e => set("url", e.target.value)}
                  placeholder="https://…" />
                {errors.url && <p style={mono({ fontSize: "0.56rem", color: "#b8190c", marginTop: 4 })}>{errors.url}</p>}
              </div>
              <div>
                <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
                  Date Published <span style={{ color: "#b8974a" }}>*</span>
                </label>
                <input type="date" className="modal-input" value={form.date} onChange={e => set("date", e.target.value)} />
                {errors.date && <p style={mono({ fontSize: "0.56rem", color: "#b8190c", marginTop: 4 })}>{errors.date}</p>}
              </div>
            </div>

            {/* Note */}
            <div style={{ marginBottom: 20 }}>
              <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
                Short Note <span style={{ color: "#b8b0a0" }}>(optional)</span>
              </label>
              <textarea className="modal-input" style={{ minHeight: 70, resize: "vertical", lineHeight: 1.6 }}
                value={form.note} onChange={e => set("note", e.target.value)}
                placeholder="e.g. Mentions regulatory action; quotes unnamed health official" />
            </div>

            {/* Notice */}
            <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "10px 13px", marginBottom: 20, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
              <p style={serif({ fontSize: "0.85rem", fontStyle: "italic", color: "#7a6e5e", lineHeight: 1.5 })}>
                Submissions are reviewed by our editorial team before appearing in the public record.
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={onClose}
                style={mono({ background: "transparent", border: "1px solid #c4b89a", color: "#7a6e5e", padding: "9px 18px", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" })}>
                Cancel
              </button>
              <button type="submit"
                style={mono({ background: "#1e2d4a", border: "none", color: "#f5f0e8", padding: "9px 20px", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" })}>
                Submit Citation →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── MEDIA PREVIEW MODAL ── */
function MediaPreviewModal({ item, onClose }) {
  if (!item) return null;
  const stanceCfg = STANCE_CONFIG[item.stance] || STANCE_CONFIG.neutral;
  const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", ...extra });
  const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...extra });
  const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", ...extra });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel preview-panel" onClick={e => e.stopPropagation()}>

        {/* Stance stripe */}
        <div style={{ height: 4, background: item.stance === "adversarial" ? "#b8190c" : "#c4b89a" }} />

        {/* Header */}
        <div style={{ padding: "18px 22px 16px", borderBottom: "1px solid #e4ddd0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={mono({ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1e2d4a" })}>
              {item.outlet}
            </span>
            <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 8px", border: "1px solid #d4c8b4", color: "#9a8870" })}>
              {item.type}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: stanceCfg.dot, display: "inline-block" }} />
              <span style={mono({ fontSize: "0.52rem", color: stanceCfg.color, letterSpacing: "0.08em", textTransform: "uppercase" })}>{stanceCfg.label}</span>
            </span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#b8b0a0", padding: 2, flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = "#1e2d4a"}
            onMouseLeave={e => e.currentTarget.style.color = "#b8b0a0"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "22px 22px 24px" }}>
          <p style={mono({ fontSize: "0.54rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 })}>
            {fmtDate(item.date)}
          </p>

          <h3 style={display({ fontWeight: 700, fontSize: "1.2rem", lineHeight: 1.3, color: "#1e2d4a", marginBottom: 16 })}>
            {item.headline}
          </h3>

          <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "14px 16px", marginBottom: 20 }}>
            <p style={mono({ fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginBottom: 7 })}>
              Summary
            </p>
            <p style={serif({ fontSize: "0.97rem", lineHeight: 1.72, color: "#4a4035" })}>
              {item.summary}
            </p>
          </div>

          {/* External link */}
          <a href={item.url} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", background: "#1e2d4a", padding: "12px 18px" }}>
            <span style={mono({ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#f5f0e8" })}>
              Read Full Article
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={mono({ fontSize: "0.54rem", color: "#6a7a94", letterSpacing: "0.08em" })}>{item.outlet}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6a7a94" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </span>
          </a>

          <p style={mono({ fontSize: "0.52rem", color: "#b8b0a0", letterSpacing: "0.08em", marginTop: 10, textAlign: "center" })}>
            Opens in a new tab · External content not verified by Journalism Society
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN COMPONENT ─────────────────── */
export default function SingleDocketPage() {
  const d  = DOCKET;
  const st = STATUS_STYLE[d.status];
  const [activeTab,    setActiveTab]    = useState("response");
  const [exFilter,     setExFilter]     = useState("All");
  const [showCitation, setShowCitation] = useState(false);
  const [previewItem,  setPreviewItem]  = useState(null);

  const exCategories = ["All", ...Array.from(new Set(d.exhibits.map(e => e.category)))];
  const filteredEx   = exFilter === "All" ? d.exhibits : d.exhibits.filter(e => e.category === exFilter);
  const exBreakdown  = d.exhibits.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + 1; return acc; }, {});

  const mono    = (extra = {}) => ({ fontFamily: "'DM Mono', monospace",            wordWrap: "break-word", overflowWrap: "break-word", ...extra });
  const serif   = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif",   wordWrap: "break-word", overflowWrap: "break-word", ...extra });
  const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", wordWrap: "break-word", overflowWrap: "break-word", ...extra });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", overflowX: "hidden", maxWidth: "100vw" }}>
      <FontStyle />

      {/* ── MODALS ── */}
      {showCitation && <CitationModal docketId={d.id} onClose={() => setShowCitation(false)} />}
      {previewItem  && <MediaPreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />}

      <Header />

      {/* ══ BANNER ══ */}
      <div style={{ background: "#1e2d4a", borderBottom: "4px solid #b8974a" }}>
        <div className="banner-pad" style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 18 })}>
            Public Record / Dockets / {d.id}
          </p>
          <div className="badge-row" style={{ marginBottom: 16 }}>
            <span style={mono({ fontSize: "0.62rem", letterSpacing: "0.1em", color: "#8a9bb8", textTransform: "uppercase", background: "rgba(255,255,255,0.07)", padding: "4px 12px", border: "1px solid rgba(255,255,255,0.12)" })}>
              {d.id}
            </span>
            <span style={mono({ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${st.border}`, background: st.bg, color: st.text, display: "inline-flex", alignItems: "center", gap: 6 })}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: st.dot, display: "inline-block", flexShrink: 0 }} />
              {d.status}
            </span>
            <span style={mono({ fontSize: "0.58rem", letterSpacing: "0.1em", color: "#5a6e8a", textTransform: "uppercase" })}>{d.type}</span>
          </div>
          <h1 className="font-playfair banner-title" style={{ fontWeight: 900, color: "#f5f0e8", lineHeight: 1.12, maxWidth: 820, marginBottom: 26, wordWrap: "break-word", overflowWrap: "break-word" }}>
            {d.title}
          </h1>
          <div className="banner-meta" style={{ paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[
              ["Respondent",     d.respondent,                 true],
              ["In Response To", d.claim_source,               false],
              ["Claim Published",fmtDate(d.claim_date),        false],
              ["Docket Filed",   fmtDate(d.filed),             false],
              ["Exhibits",       `${d.exhibits_count} docs`,   false],
            ].map(([label, val, italic], i) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 18, minWidth: 0 }}>
                {i > 0 && <div className="meta-divider" />}
                <div style={{ minWidth: 0 }}>
                  <p style={mono({ fontSize: "0.52rem", color: "#3a4e6a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 })}>{label}</p>
                  <p className="meta-val" style={serif({ color: "#c8bfa8", fontSize: "0.92rem", fontStyle: italic ? "italic" : "normal" })}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <main className="page-pad" style={{ maxWidth: 1160, margin: "0 auto", overflowX: "hidden" }}>
        <div className="docket-grid">

          {/* ── LEFT COLUMN ── */}
          <div style={{ minWidth: 0, overflow: "hidden" }}>

            {/* SUMMARY */}
            <section style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 3, height: 26, background: "#b8974a", flexShrink: 0 }} />
                <h2 style={display({ fontSize: "1.45rem", fontWeight: 700, color: "#1e2d4a" })}>Summary</h2>
              </div>
              <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "20px 22px", marginBottom: 12 }}>
                <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#b8974a", textTransform: "uppercase", marginBottom: 10 })}>The Claim</p>
                <p style={serif({ fontSize: "1.02rem", lineHeight: 1.75, color: "#4a4035" })}>{d.summary.claim}</p>
              </div>
              <div className="summary-cards">
                {[["Context", d.summary.context], ["Why It Matters", d.summary.why_matters]].map(([label, text]) => (
                  <div key={label} style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px" }}>
                    <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 8 })}>{label}</p>
                    <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#5a5048" })}>{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* TABS */}
            <div className="tab-strip" style={{ display: "flex", borderBottom: "2px solid #1e2d4a", marginBottom: 26 }}>
              {[
                { key: "response", label: "Full Response" },
                { key: "timeline", label: "Timeline" },
                { key: "exhibits", label: `Exhibits (${d.exhibits.length})` },
                { key: "media",    label: `Media Watch (${d.media_watch.length})` },
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className="tab-btn"
                  style={mono({ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "10px 14px", border: "none", cursor: "pointer", whiteSpace: "nowrap", background: activeTab === tab.key ? "#1e2d4a" : "transparent", color: activeTab === tab.key ? "#f5f0e8" : "#9a8870", marginBottom: -2, flexShrink: 0 })}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── FULL RESPONSE ── */}
            {activeTab === "response" && (
              <section style={{ minWidth: 0, overflow: "hidden" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 18, padding: "12px 15px", background: "#faf6ee", border: "1px solid #d4c8b4", borderLeft: "3px solid #1e2d4a" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e2d4a" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#6a5e4e", lineHeight: 1.6 })}>
                    Full, unedited response submitted by <strong>{d.respondent}</strong> on {fmtLong(d.filed)}.
                  </p>
                </div>
                <div className="response-body" style={{ minWidth: 0, overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: d.response }} />
                <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid #d4c8b4", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={mono({ fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase" })}>Submitted: {fmtDate(d.filed)}</span>
                  <span style={{ width: 1, height: 12, background: "#d4c8b4", flexShrink: 0 }} />
                  <span style={mono({ fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase" })}>{d.respondent}</span>
                </div>
              </section>
            )}

            {/* ── TIMELINE ── */}
            {activeTab === "timeline" && (
              <section>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
                  {Object.entries(TL_TYPE).map(([key, t]) => (
                    <span key={key} style={mono({ fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6 })}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ color: "#7a6e5e" }}>{t.label}</span>
                    </span>
                  ))}
                </div>
                <div style={{ position: "relative", paddingLeft: 28 }}>
                  {d.timeline.map((item, i) => {
                    const t = TL_TYPE[item.type];
                    return (
                      <div key={i} className="timeline-item" style={{ position: "relative", paddingBottom: 26, minWidth: 0 }}>
                        <div className="tl-line" style={{ position: "absolute", left: -28 + 6, top: 20, bottom: -8, width: 2, background: "#d4c8b4" }} />
                        <div style={{ position: "absolute", left: -28, top: 6, width: 14, height: 14, borderRadius: "50%", background: t.color, border: "3px solid #f5f0e8", boxShadow: `0 0 0 2px ${t.color}`, flexShrink: 0 }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={mono({ fontSize: "0.58rem", color: "#9a8870", letterSpacing: "0.06em" })}>{fmtDate(item.date)}</span>
                          <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 8px", background: t.bg, color: t.color, border: `1px solid ${t.color}30` })}>{t.label}</span>
                        </div>
                        <h4 style={display({ fontSize: "0.98rem", fontWeight: 700, color: "#1e2d4a", marginBottom: 5 })}>{item.event}</h4>
                        <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#6a5e4e" })}>{item.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── EXHIBITS ── */}
            {activeTab === "exhibits" && (
              <section>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
                  <span style={mono({ fontSize: "0.56rem", letterSpacing: "0.12em", color: "#9a8870", textTransform: "uppercase", marginRight: 4 })}>Filter:</span>
                  {exCategories.map(cat => (
                    <button key={cat} onClick={() => setExFilter(cat)}
                      style={mono({ fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid", cursor: "pointer", background: exFilter === cat ? "#1e2d4a" : "transparent", color: exFilter === cat ? "#f5f0e8" : "#7a6e5e", borderColor: exFilter === cat ? "#1e2d4a" : "#c4b89a" })}>
                      {cat}
                    </button>
                  ))}
                  <span style={mono({ marginLeft: "auto", fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.08em", textTransform: "uppercase" })}>{filteredEx.length}/{d.exhibits.length}</span>
                </div>
                <div className="ex-table" style={{ paddingBottom: 8, borderBottom: "2px solid #1e2d4a" }}>
                  <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>ID</span>
                  <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Document</span>
                  <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Category</span>
                  <span className="col-pages" style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Pages</span>
                  <span />
                </div>
                {filteredEx.map(ex => {
                  const cat = CAT_COLOR[ex.category] || CAT_COLOR["Institutional"];
                  return (
                    <div key={ex.id} className="exhibit-row ex-table" style={{ padding: "11px 0", borderBottom: "1px solid #d4c8b4", cursor: "pointer", alignItems: "center", transition: "background 0.15s" }}>
                      <span style={mono({ fontSize: "0.6rem", fontWeight: 500, color: "#1e2d4a", letterSpacing: "0.05em" })}>{ex.id}</span>
                      <span className="exhibit-title" style={serif({ fontSize: "0.95rem", color: "#1e2d4a", lineHeight: 1.3 })}>{ex.title}</span>
                      <span className="ex-cat-badge" style={mono({ fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 6px", background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` })}>{ex.category}</span>
                      <span className="col-pages" style={mono({ fontSize: "0.58rem", color: "#9a8870" })}>{ex.pages} pp.</span>
                      <a href="#" className="dl-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", color: "#b8974a", textDecoration: "none" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      </a>
                    </div>
                  );
                })}
                <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px dashed #d4c8b4", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#9a8870" })}>All exhibits are public record and freely downloadable.</p>
                  <a href="#" style={mono({ background: "#1e2d4a", color: "#f5f0e8", padding: "10px 18px", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 })}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download All ({d.exhibits.length} files)
                  </a>
                </div>
              </section>
            )}

            {/* ── MEDIA WATCH TAB ── */}
            {activeTab === "media" && (
              <section>
                {/* Legend + count */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
                  <p style={serif({ fontSize: "0.98rem", fontStyle: "italic", color: "#7a6e5e" })}>
                    Coverage tracked by Journalism Society's Media Watch desk.
                  </p>
                  <div style={{ display: "flex", gap: 14 }}>
                    {Object.entries(STANCE_CONFIG).map(([key, s]) => (
                      <span key={key} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                        <span style={mono({ fontSize: "0.52rem", color: "#9a8870", letterSpacing: "0.08em", textTransform: "uppercase" })}>{s.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cards — clicking opens preview modal */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {d.media_watch.map((m, i) => (
                    <div
                      key={i}
                      className="media-card"
                      onClick={() => setPreviewItem(m)}
                      style={{ display: "flex", border: "1px solid #d4c8b4", background: "#faf6ee", textDecoration: "none", color: "inherit", minWidth: 0, overflow: "hidden", cursor: "pointer" }}
                    >
                      {/* Stance stripe */}
                      <div style={{ width: 4, flexShrink: 0, background: m.stance === "adversarial" ? "#b8190c" : "#c4b89a" }} />

                      <div style={{ flex: 1, padding: "14px 16px", minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 7 }}>
                          <span style={mono({ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1e2d4a" })}>{m.outlet}</span>
                          <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a8870", padding: "2px 8px", border: "1px solid #d4c8b4" })}>{m.type}</span>
                          {/* Stance badge */}
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: (STANCE_CONFIG[m.stance] || STANCE_CONFIG.neutral).dot, display: "inline-block" }} />
                            <span style={mono({ fontSize: "0.5rem", color: (STANCE_CONFIG[m.stance] || STANCE_CONFIG.neutral).color, letterSpacing: "0.08em", textTransform: "uppercase" })}>
                              {(STANCE_CONFIG[m.stance] || STANCE_CONFIG.neutral).label}
                            </span>
                          </span>
                          <span style={mono({ fontSize: "0.54rem", color: "#b8b0a0", marginLeft: "auto" })}>{fmtDate(m.date)}</span>
                        </div>
                        <p style={display({ fontSize: "0.96rem", fontWeight: 700, color: "#1e2d4a", lineHeight: 1.35, wordWrap: "break-word", overflowWrap: "break-word", marginBottom: 6 })}>{m.headline}</p>
                        {/* Preview snippet */}
                        <p style={serif({ fontSize: "0.86rem", color: "#7a6e5e", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" })}>
                          {m.summary}
                        </p>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 14px", flexShrink: 0, gap: 6 }}>
                        <svg className="media-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c4b89a" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                        {/* External link icon hint */}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c4b89a" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit citation CTA */}
                <div style={{ marginTop: 20, padding: "18px 20px", background: "#ede8dc", border: "1px solid #d4c8b4", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                  <div>
                    <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginBottom: 5 })}>
                      See something missing?
                    </p>
                    <p style={serif({ fontSize: "0.94rem", fontStyle: "italic", color: "#7a6e5e", lineHeight: 1.55 })}>
                      Help improve this record by submitting additional media coverage.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCitation(true)}
                    style={mono({ background: "#1e2d4a", color: "#f5f0e8", border: "none", padding: "10px 18px", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 8 })}
                    onMouseEnter={e => e.currentTarget.style.background = "#2a3f6a"}
                    onMouseLeave={e => e.currentTarget.style.background = "#1e2d4a"}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                    Submit a media citation →
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="sidebar-col" style={{ minWidth: 0, overflow: "hidden" }}>
            {/* Docket details */}
            <div style={{ background: "#1e2d4a", padding: "20px 22px", marginBottom: 14 }}>
              <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", paddingBottom: 12, marginBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" })}>
                Docket Details
              </p>
              <div className="detail-grid">
                {[
                  ["Docket ID",   d.id],
                  ["Status",      d.status],
                  ["Type",        d.type],
                  ["Respondent",  d.respondent],
                  ["Claim Filed", fmtDate(d.claim_date)],
                  ["Reply Filed", fmtDate(d.filed)],
                  ["Exhibits",    `${d.exhibits_count} documents`],
                ].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: 12, minWidth: 0 }}>
                    <p style={mono({ fontSize: "0.5rem", letterSpacing: "0.1em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 3 })}>{label}</p>
                    <p style={serif({ color: "#c8bfa8", fontSize: "0.9rem" })}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Citation */}
            <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px", marginBottom: 14 }}>
              <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 10 })}>Cite This Docket</p>
              <p className="cite-text" style={serif({ fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.7, color: "#7a6e5e" })}>
                {d.respondent}. "{d.title}." <em>Journalism Society Public Record</em>, {d.id}, {fmtDate(d.filed)}.
              </p>
            </div>

            {/* Actions */}
            <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px", marginBottom: 14 }}>
              <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 12 })}>Actions</p>
              <div className="actions-wrap">
                {[
                  ["📥", "Download Full Docket"],
                  ["🔗", "Copy Permalink"],
                  ["📤", "Share this Record"],
                  ["⚑",  "Flag an Error"],
                ].map(([icon, label]) => (
                  <a key={label} href="#"
                    style={mono({ fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1e2d4a", textDecoration: "none", padding: "9px 0", borderBottom: "1px solid #ede8dc", display: "flex", alignItems: "center", gap: 8 })}>
                    <span style={{ width: 16, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Exhibit breakdown */}
            <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px" }}>
              <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 14 })}>Exhibit Breakdown</p>
              {Object.entries(exBreakdown).map(([cat, count]) => {
                const c   = CAT_COLOR[cat] || CAT_COLOR["Institutional"];
                const pct = Math.round((count / d.exhibits.length) * 100);
                return (
                  <div key={cat} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
                      <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", color: c.text, minWidth: 0, overflowWrap: "break-word" })}>{cat}</span>
                      <span style={mono({ fontSize: "0.54rem", color: "#9a8870", flexShrink: 0 })}>{count}</span>
                    </div>
                    <div style={{ height: 4, background: "#e4ddd0", borderRadius: 2 }}>
                      <div style={{ height: 4, width: `${pct}%`, background: c.text, borderRadius: 2 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}