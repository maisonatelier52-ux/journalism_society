

// "use client";

// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import { useState } from "react";

// /* ── GOOGLE FONTS + RESPONSIVE CSS ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

//     *, *::before, *::after { box-sizing: border-box; }
//     html, body { font-family: 'EB Garamond', Georgia, serif; overflow-x: hidden; max-width: 100%; }
//     * { max-width: 100%; }

//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm  { font-family: 'DM Mono', monospace; }

//     .exhibit-row:hover { background-color: #ede8dc; }
//     .exhibit-row:hover .dl-arrow { opacity: 1 !important; transform: translateX(3px); }
//     .dl-arrow { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
//     @media (max-width: 640px) { .dl-arrow { opacity: 1 !important; } }

//     .timeline-item:last-child .tl-line { display: none; }

//     /* ── MEDIA CARD ── */
//     .media-card {
//       transition: box-shadow 0.2s, transform 0.2s, background 0.15s;
//       cursor: pointer;
//     }
//     .media-card:hover {
//       box-shadow: 0 6px 28px rgba(30,45,74,0.1);
//       transform: translateY(-1px);
//       background: #fff !important;
//     }
//     .media-card:hover .media-arrow { color: #1e2d4a !important; transform: translateX(3px); }
//     .media-arrow { transition: color 0.15s, transform 0.2s; }

//     .response-body h3 {
//       font-family: 'Playfair Display', Georgia, serif;
//       font-weight: 700; font-size: 1.1rem; color: #1e2d4a;
//       margin: 1.8rem 0 0.5rem;
//     }
//     .response-body p {
//       font-family: 'EB Garamond', Georgia, serif;
//       font-size: 1.05rem; line-height: 1.85; color: #4a4035; margin-bottom: 1rem;
//       word-wrap: break-word; overflow-wrap: break-word;
//     }
//     .response-body blockquote {
//       border-left: 3px solid #b8974a;
//       padding: 0.5rem 0 0.5rem 1.2rem; margin: 1.4rem 0;
//     }
//     .response-body blockquote p { font-style: italic; color: #7a6e5e; }
//     .drop-cap::first-letter {
//       font-family: 'Playfair Display', Georgia, serif;
//       font-size: 3.8rem; font-weight: 900; line-height: 0.82;
//       float: left; margin: 0.1rem 0.16em 0 0; color: #1e2d4a;
//     }
//     @media (max-width: 640px) { .drop-cap::first-letter { font-size: 2.8rem; } }

//     .tab-strip {
//       overflow-x: auto; -webkit-overflow-scrolling: touch;
//       scrollbar-width: none; width: 100%;
//     }
//     .tab-strip::-webkit-scrollbar { display: none; }

//     .docket-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; align-items: start; }
//     @media (max-width: 900px) {
//       .docket-grid { grid-template-columns: 1fr; }
//       .sidebar-col { order: -1; }
//     }

//     .banner-title { font-size: 2.2rem; word-wrap: break-word; overflow-wrap: break-word; }
//     @media (max-width: 640px) { .banner-title { font-size: 1.35rem; } }
//     @media (min-width: 641px) and (max-width: 900px) { .banner-title { font-size: 1.85rem; } }

//     .banner-meta { display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap; }
//     .meta-divider { width: 1px; height: 28px; background: rgba(255,255,255,0.1); flex-shrink: 0; }
//     @media (max-width: 640px) { .banner-meta { flex-direction: column; gap: 10px; } .meta-divider { display: none; } }

//     .summary-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//     @media (max-width: 580px) { .summary-cards { grid-template-columns: 1fr; } }

//     .detail-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
//     @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr 1fr; gap: 0 16px; } }

//     .actions-wrap { display: flex; flex-direction: column; }
//     @media (max-width: 900px) { .actions-wrap { display: grid; grid-template-columns: 1fr 1fr; } }

//     .ex-table { display: grid; grid-template-columns: 58px 1fr 70px 52px 28px; gap: 0 10px; }
//     @media (max-width: 580px) { .ex-table { grid-template-columns: 46px 1fr 60px 24px; } .col-pages { display: none !important; } }

//     .exhibit-title { word-wrap: break-word; overflow-wrap: break-word; min-width: 0; }
//     .page-pad { padding: 40px 24px 80px; }
//     @media (max-width: 640px) { .page-pad { padding: 20px 14px 60px; } }
//     .banner-pad { padding: 40px 24px 36px; }
//     @media (max-width: 640px) { .banner-pad { padding: 22px 14px 22px; } }

//     .footer-inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 32px; }
//     .footer-cols  { display: flex; gap: 40px; flex-wrap: wrap; }
//     p, h1, h2, h3, h4, h5, h6, span, a { word-wrap: break-word; overflow-wrap: break-word; }
//     .badge-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
//     .meta-val { word-wrap: break-word; overflow-wrap: break-word; max-width: 100%; }
//     .cite-text { word-wrap: break-word; overflow-wrap: break-word; }
//     .ex-cat-badge { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; display: inline-block; }
//     .media-card { min-width: 0; overflow: hidden; }
//     .main-container { max-width: 1160px; margin: 0 auto; width: 100%; overflow: hidden; }
//     .docket-grid > * { min-width: 0; overflow: hidden; }
//     .tab-btn { white-space: nowrap; flex-shrink: 0; }
//     @media (max-width: 640px) { .footer-inner { flex-direction: column; gap: 24px; } .footer-cols { gap: 24px; } }

//     /* ── MODAL BACKDROP ── */
//     .modal-backdrop {
//       position: fixed; inset: 0; z-index: 500;
//       background: rgba(10, 15, 30, 0.7);
//       display: flex; align-items: center; justify-content: center;
//       padding: 20px;
//       animation: fadeIn 0.18s ease;
//     }
//     @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

//     /* ── MODAL PANEL ── */
//     .modal-panel {
//       width: 100%; max-width: 520px;
//       background: #f5f0e8;
//       border-top: 4px solid #b8974a;
//       animation: slideUp 0.22s ease;
//       max-height: 90vh; overflow-y: auto;
//     }
//     @keyframes slideUp {
//       from { opacity: 0; transform: translateY(24px); }
//       to   { opacity: 1; transform: translateY(0); }
//     }

//     /* ── FORM INPUTS ── */
//     .modal-input {
//       width: 100%; background: #faf6ee; border: 1px solid #d4c8b4;
//       padding: 10px 13px; font-family: 'EB Garamond', Georgia, serif;
//       font-size: 0.97rem; color: #1e2d4a; outline: none;
//       transition: border-color 0.15s, box-shadow 0.15s;
//     }
//     .modal-input:focus { border-color: #1e2d4a; box-shadow: 0 0 0 3px rgba(30,45,74,0.06); }
//     .modal-input::placeholder { color: #b8b0a0; font-style: italic; }

//     .modal-select {
//       width: 100%; background: #faf6ee; border: 1px solid #d4c8b4;
//       padding: 10px 13px; appearance: none; font-family: 'EB Garamond', Georgia, serif;
//       font-size: 0.97rem; color: #1e2d4a; outline: none; cursor: pointer;
//       background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231e2d4a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
//       background-repeat: no-repeat; background-position: right 13px center;
//       transition: border-color 0.15s;
//     }
//     .modal-select:focus { border-color: #1e2d4a; outline: none; }

//     /* ── SUCCESS PULSE ── */
//     @keyframes successPop {
//       0%   { transform: scale(0.8); opacity: 0; }
//       60%  { transform: scale(1.05); }
//       100% { transform: scale(1); opacity: 1; }
//     }
//     .success-pop { animation: successPop 0.35s ease forwards; }

//     /* ── PREVIEW MODAL ── */
//     .preview-panel { max-width: 480px; }

//     /* ── STANCE INDICATOR ── */
//     .stance-dot {
//       display: inline-flex; align-items: center; gap: 5px;
//       font-family: 'DM Mono', monospace; font-size: 0.52rem;
//       letter-spacing: 0.1em; text-transform: uppercase;
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
//     { outlet: "The Malabar Record", headline: "Inside the Billing Cartel: How Kerala's Hospitals Overcharged Thousands", date: "2026-03-15", type: "Original Report", stance: "adversarial", url: "https://example.com/malabar-record/billing-cartel", summary: "A 4,200-word investigative piece naming six private hospitals and alleging a coordinated pricing structure that led to patient overcharges of an estimated ₹4.2 crore." },
//     { outlet: "Kerala Kaumudi",     headline: "HPA rejects billing allegations; files public docket", date: "2026-03-23", type: "Follow-up", stance: "neutral", url: "https://example.com/kerala-kaumudi/hpa-response", summary: "Kerala Kaumudi covers HPA's formal rejection and the filing of a public docket with Journalism Society, including the 19-exhibit response package." },
//     { outlet: "The Hindu — Kerala", headline: "Health dept issues notice to private hospital alliance over billing row", date: "2026-03-18", type: "News", stance: "neutral", url: "https://www.thehindu.com/news/cities/chennai/hospitals-told-to-refund-excess-charges/article35259672.ece", summary: "Reporting on the Kerala Health Department's show-cause notice issued to HPA, requesting billing records for the period under investigation." },
//     { outlet: "Mathrubhumi",        headline: "ഹെൽത്ത്കെയർ ബില്ലിംഗ് വിവാദം: HPA പ്രതിരോധം", date: "2026-03-23", type: "Regional", stance: "neutral", url: "https://example.com/mathrubhumi/hpa-response", summary: "Regional language coverage of the HPA response, summarising the key contested claims and the association's counter-evidence." },
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

// const STANCE_CONFIG = {
//   adversarial: { color: "#b8190c", label: "Adversarial", dot: "#b8190c" },
//   neutral:     { color: "#6a7a94", label: "Neutral",     dot: "#6a7a94" },
//   supportive:  { color: "#2d6a4f", label: "Supportive",  dot: "#2d6a4f" },
// };

// const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// const fmtLong = (iso) => new Date(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

// /* ── CITATION MODAL ── */
// function CitationModal({ docketId, onClose }) {
//   const [form, setForm] = useState({ publication: "", type: "Follow-up", url: "", date: "", headline: "", note: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({});

//   const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

//   const validate = () => {
//     const e = {};
//     if (!form.publication.trim()) e.publication = "Publication name is required.";
//     if (!form.headline.trim())    e.headline    = "Headline is required.";
//     if (!form.url.trim())         e.url         = "Article URL is required.";
//     if (!form.date)               e.date        = "Publication date is required.";
//     return e;
//   };

//   const submit = (ev) => {
//     ev.preventDefault();
//     const e = validate();
//     if (Object.keys(e).length) { setErrors(e); return; }
//     setSubmitted(true);
//   };

//   const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", ...extra });
//   const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...extra });

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-panel" onClick={e => e.stopPropagation()}>

//         {/* Header */}
//         <div style={{ background: "#1e2d4a", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//           <div>
//             <p style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 5 })}>
//               {docketId} · Media Watch
//             </p>
//             <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "#f5f0e8", lineHeight: 1.2 }}>
//               Submit a Media Citation
//             </h3>
//           </div>
//           <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#3a4e6a", padding: 4, marginLeft: 12, flexShrink: 0 }}
//             onMouseEnter={e => e.currentTarget.style.color = "#c8bfa8"}
//             onMouseLeave={e => e.currentTarget.style.color = "#3a4e6a"}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//           </button>
//         </div>

//         {submitted ? (
//           /* ── SUCCESS STATE ── */
//           <div className="success-pop" style={{ padding: "40px 28px", textAlign: "center" }}>
//             <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
//             </div>
//             <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: "#1e2d4a", marginBottom: 8 }}>
//               Citation Submitted
//             </p>
//             <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#6a5e4e", marginBottom: 4 })}>
//               Thank you. <strong>{form.publication}</strong>'s coverage has been flagged for editorial review.
//             </p>
//             <p style={serif({ fontSize: "0.88rem", fontStyle: "italic", color: "#9a8870", marginBottom: 24 })}>
//               If approved, it will appear in the Media Watch section of this docket.
//             </p>
//             <button onClick={onClose}
//               style={mono({ background: "#1e2d4a", color: "#f5f0e8", border: "none", padding: "10px 24px", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" })}>
//               Close
//             </button>
//           </div>
//         ) : (
//           /* ── FORM ── */
//           <form onSubmit={submit} style={{ padding: "22px 22px 24px" }}>
//             <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#7a6e5e", lineHeight: 1.6, marginBottom: 20, borderLeft: "3px solid #b8974a", paddingLeft: 12 })}>
//               Help improve this record by submitting additional media coverage we may have missed.
//             </p>

//             {/* Publication + Type */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 10, marginBottom: 14 }}>
//               <div>
//                 <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
//                   Publication Name <span style={{ color: "#b8974a" }}>*</span>
//                 </label>
//                 <input className="modal-input" value={form.publication} onChange={e => set("publication", e.target.value)}
//                   placeholder="e.g. The Hindu" />
//                 {errors.publication && <p style={mono({ fontSize: "0.56rem", color: "#b8190c", marginTop: 4 })}>{errors.publication}</p>}
//               </div>
//               <div>
//                 <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
//                   Type <span style={{ color: "#b8974a" }}>*</span>
//                 </label>
//                 <select className="modal-select" value={form.type} onChange={e => set("type", e.target.value)}>
//                   {["Original Report", "Follow-up", "Opinion", "Fact-Check", "News", "Regional", "Other"].map(t => <option key={t}>{t}</option>)}
//                 </select>
//               </div>
//             </div>

//             {/* Headline */}
//             <div style={{ marginBottom: 14 }}>
//               <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
//                 Article Headline <span style={{ color: "#b8974a" }}>*</span>
//               </label>
//               <input className="modal-input" value={form.headline} onChange={e => set("headline", e.target.value)}
//                 placeholder="Full title of the article" />
//               {errors.headline && <p style={mono({ fontSize: "0.56rem", color: "#b8190c", marginTop: 4 })}>{errors.headline}</p>}
//             </div>

//             {/* URL + Date */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 10, marginBottom: 14 }}>
//               <div>
//                 <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
//                   Article URL <span style={{ color: "#b8974a" }}>*</span>
//                 </label>
//                 <input type="url" className="modal-input" value={form.url} onChange={e => set("url", e.target.value)}
//                   placeholder="https://…" />
//                 {errors.url && <p style={mono({ fontSize: "0.56rem", color: "#b8190c", marginTop: 4 })}>{errors.url}</p>}
//               </div>
//               <div>
//                 <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
//                   Date Published <span style={{ color: "#b8974a" }}>*</span>
//                 </label>
//                 <input type="date" className="modal-input" value={form.date} onChange={e => set("date", e.target.value)} />
//                 {errors.date && <p style={mono({ fontSize: "0.56rem", color: "#b8190c", marginTop: 4 })}>{errors.date}</p>}
//               </div>
//             </div>

//             {/* Note */}
//             <div style={{ marginBottom: 20 }}>
//               <label style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>
//                 Short Note <span style={{ color: "#b8b0a0" }}>(optional)</span>
//               </label>
//               <textarea className="modal-input" style={{ minHeight: 70, resize: "vertical", lineHeight: 1.6 }}
//                 value={form.note} onChange={e => set("note", e.target.value)}
//                 placeholder="e.g. Mentions regulatory action; quotes unnamed health official" />
//             </div>

//             {/* Notice */}
//             <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "10px 13px", marginBottom: 20, display: "flex", gap: 8, alignItems: "flex-start" }}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
//                 <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
//               </svg>
//               <p style={serif({ fontSize: "0.85rem", fontStyle: "italic", color: "#7a6e5e", lineHeight: 1.5 })}>
//                 Submissions are reviewed by our editorial team before appearing in the public record.
//               </p>
//             </div>

//             {/* Actions */}
//             <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
//               <button type="button" onClick={onClose}
//                 style={mono({ background: "transparent", border: "1px solid #c4b89a", color: "#7a6e5e", padding: "9px 18px", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" })}>
//                 Cancel
//               </button>
//               <button type="submit"
//                 style={mono({ background: "#1e2d4a", border: "none", color: "#f5f0e8", padding: "9px 20px", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" })}>
//                 Submit Citation →
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ── MEDIA PREVIEW MODAL ── */
// function MediaPreviewModal({ item, onClose }) {
//   if (!item) return null;
//   const stanceCfg = STANCE_CONFIG[item.stance] || STANCE_CONFIG.neutral;
//   const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", ...extra });
//   const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...extra });
//   const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", ...extra });

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-panel preview-panel" onClick={e => e.stopPropagation()}>

//         {/* Stance stripe */}
//         <div style={{ height: 4, background: item.stance === "adversarial" ? "#b8190c" : "#c4b89a" }} />

//         {/* Header */}
//         <div style={{ padding: "18px 22px 16px", borderBottom: "1px solid #e4ddd0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
//           <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
//             <span style={mono({ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1e2d4a" })}>
//               {item.outlet}
//             </span>
//             <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 8px", border: "1px solid #d4c8b4", color: "#9a8870" })}>
//               {item.type}
//             </span>
//             <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
//               <span style={{ width: 6, height: 6, borderRadius: "50%", background: stanceCfg.dot, display: "inline-block" }} />
//               <span style={mono({ fontSize: "0.52rem", color: stanceCfg.color, letterSpacing: "0.08em", textTransform: "uppercase" })}>{stanceCfg.label}</span>
//             </span>
//           </div>
//           <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#b8b0a0", padding: 2, flexShrink: 0 }}
//             onMouseEnter={e => e.currentTarget.style.color = "#1e2d4a"}
//             onMouseLeave={e => e.currentTarget.style.color = "#b8b0a0"}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div style={{ padding: "22px 22px 24px" }}>
//           <p style={mono({ fontSize: "0.54rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 })}>
//             {fmtDate(item.date)}
//           </p>

//           <h3 style={display({ fontWeight: 700, fontSize: "1.2rem", lineHeight: 1.3, color: "#1e2d4a", marginBottom: 16 })}>
//             {item.headline}
//           </h3>

//           <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "14px 16px", marginBottom: 20 }}>
//             <p style={mono({ fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginBottom: 7 })}>
//               Summary
//             </p>
//             <p style={serif({ fontSize: "0.97rem", lineHeight: 1.72, color: "#4a4035" })}>
//               {item.summary}
//             </p>
//           </div>

//           {/* External link */}
//           <a href={item.url} target="_blank" rel="noopener noreferrer"
//             style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", background: "#1e2d4a", padding: "12px 18px" }}>
//             <span style={mono({ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#f5f0e8" })}>
//               Read Full Article
//             </span>
//             <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
//               <span style={mono({ fontSize: "0.54rem", color: "#6a7a94", letterSpacing: "0.08em" })}>{item.outlet}</span>
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6a7a94" strokeWidth="2">
//                 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
//                 <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
//               </svg>
//             </span>
//           </a>

//           <p style={mono({ fontSize: "0.52rem", color: "#b8b0a0", letterSpacing: "0.08em", marginTop: 10, textAlign: "center" })}>
//             Opens in a new tab · External content not verified by Journalism Society
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────── MAIN COMPONENT ─────────────────── */
// export default function SingleDocketPage() {
//   const d  = DOCKET;
//   const st = STATUS_STYLE[d.status];
//   const [activeTab,    setActiveTab]    = useState("response");
//   const [exFilter,     setExFilter]     = useState("All");
//   const [showCitation, setShowCitation] = useState(false);
//   const [previewItem,  setPreviewItem]  = useState(null);

//   const exCategories = ["All", ...Array.from(new Set(d.exhibits.map(e => e.category)))];
//   const filteredEx   = exFilter === "All" ? d.exhibits : d.exhibits.filter(e => e.category === exFilter);
//   const exBreakdown  = d.exhibits.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + 1; return acc; }, {});

//   const mono    = (extra = {}) => ({ fontFamily: "'DM Mono', monospace",            wordWrap: "break-word", overflowWrap: "break-word", ...extra });
//   const serif   = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif",   wordWrap: "break-word", overflowWrap: "break-word", ...extra });
//   const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", wordWrap: "break-word", overflowWrap: "break-word", ...extra });

//   return (
//     <div style={{ minHeight: "100vh", background: "#f5f0e8", overflowX: "hidden", maxWidth: "100vw" }}>
//       <FontStyle />

//       {/* ── MODALS ── */}
//       {showCitation && <CitationModal docketId={d.id} onClose={() => setShowCitation(false)} />}
//       {previewItem  && <MediaPreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />}

//       <Header />

//       {/* ══ BANNER ══ */}
//       <div style={{ background: "#1e2d4a", borderBottom: "4px solid #b8974a" }}>
//         <div className="banner-pad" style={{ maxWidth: 1160, margin: "0 auto" }}>
//           <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 18 })}>
//             Public Record / Dockets / {d.id}
//           </p>
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
//           <h1 className="font-playfair banner-title" style={{ fontWeight: 900, color: "#f5f0e8", lineHeight: 1.12, maxWidth: 820, marginBottom: 26, wordWrap: "break-word", overflowWrap: "break-word" }}>
//             {d.title}
//           </h1>
//           <div className="banner-meta" style={{ paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
//             {[
//               ["Respondent",     d.respondent,                 true],
//               ["In Response To", d.claim_source,               false],
//               ["Claim Published",fmtDate(d.claim_date),        false],
//               ["Docket Filed",   fmtDate(d.filed),             false],
//               ["Exhibits",       `${d.exhibits_count} docs`,   false],
//             ].map(([label, val, italic], i) => (
//               <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 18, minWidth: 0 }}>
//                 {i > 0 && <div className="meta-divider" />}
//                 <div style={{ minWidth: 0 }}>
//                   <p style={mono({ fontSize: "0.52rem", color: "#3a4e6a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 })}>{label}</p>
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

//             {/* TABS */}
//             <div className="tab-strip" style={{ display: "flex", borderBottom: "2px solid #1e2d4a", marginBottom: 26 }}>
//               {[
//                 { key: "response", label: "Full Response" },
//                 { key: "timeline", label: "Timeline" },
//                 { key: "exhibits", label: `Exhibits (${d.exhibits.length})` },
//                 { key: "media",    label: `Media Watch (${d.media_watch.length})` },
//               ].map(tab => (
//                 <button key={tab.key} onClick={() => setActiveTab(tab.key)}
//                   className="tab-btn"
//                   style={mono({ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "10px 14px", border: "none", cursor: "pointer", whiteSpace: "nowrap", background: activeTab === tab.key ? "#1e2d4a" : "transparent", color: activeTab === tab.key ? "#f5f0e8" : "#9a8870", marginBottom: -2, flexShrink: 0 })}>
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
//                 <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
//                   <span style={mono({ fontSize: "0.56rem", letterSpacing: "0.12em", color: "#9a8870", textTransform: "uppercase", marginRight: 4 })}>Filter:</span>
//                   {exCategories.map(cat => (
//                     <button key={cat} onClick={() => setExFilter(cat)}
//                       style={mono({ fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid", cursor: "pointer", background: exFilter === cat ? "#1e2d4a" : "transparent", color: exFilter === cat ? "#f5f0e8" : "#7a6e5e", borderColor: exFilter === cat ? "#1e2d4a" : "#c4b89a" })}>
//                       {cat}
//                     </button>
//                   ))}
//                   <span style={mono({ marginLeft: "auto", fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.08em", textTransform: "uppercase" })}>{filteredEx.length}/{d.exhibits.length}</span>
//                 </div>
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

//             {/* ── MEDIA WATCH TAB ── */}
//             {activeTab === "media" && (
//               <section>
//                 {/* Legend + count */}
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
//                   <p style={serif({ fontSize: "0.98rem", fontStyle: "italic", color: "#7a6e5e" })}>
//                     Coverage tracked by Journalism Society's Media Watch desk.
//                   </p>
//                   <div style={{ display: "flex", gap: 14 }}>
//                     {Object.entries(STANCE_CONFIG).map(([key, s]) => (
//                       <span key={key} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
//                         <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
//                         <span style={mono({ fontSize: "0.52rem", color: "#9a8870", letterSpacing: "0.08em", textTransform: "uppercase" })}>{s.label}</span>
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Cards — clicking opens preview modal */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                   {d.media_watch.map((m, i) => (
//                     <div
//                       key={i}
//                       className="media-card"
//                       onClick={() => setPreviewItem(m)}
//                       style={{ display: "flex", border: "1px solid #d4c8b4", background: "#faf6ee", textDecoration: "none", color: "inherit", minWidth: 0, overflow: "hidden", cursor: "pointer" }}
//                     >
//                       {/* Stance stripe */}
//                       <div style={{ width: 4, flexShrink: 0, background: m.stance === "adversarial" ? "#b8190c" : "#c4b89a" }} />

//                       <div style={{ flex: 1, padding: "14px 16px", minWidth: 0 }}>
//                         <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 7 }}>
//                           <span style={mono({ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1e2d4a" })}>{m.outlet}</span>
//                           <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a8870", padding: "2px 8px", border: "1px solid #d4c8b4" })}>{m.type}</span>
//                           {/* Stance badge */}
//                           <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
//                             <span style={{ width: 5, height: 5, borderRadius: "50%", background: (STANCE_CONFIG[m.stance] || STANCE_CONFIG.neutral).dot, display: "inline-block" }} />
//                             <span style={mono({ fontSize: "0.5rem", color: (STANCE_CONFIG[m.stance] || STANCE_CONFIG.neutral).color, letterSpacing: "0.08em", textTransform: "uppercase" })}>
//                               {(STANCE_CONFIG[m.stance] || STANCE_CONFIG.neutral).label}
//                             </span>
//                           </span>
//                           <span style={mono({ fontSize: "0.54rem", color: "#b8b0a0", marginLeft: "auto" })}>{fmtDate(m.date)}</span>
//                         </div>
//                         <p style={display({ fontSize: "0.96rem", fontWeight: 700, color: "#1e2d4a", lineHeight: 1.35, wordWrap: "break-word", overflowWrap: "break-word", marginBottom: 6 })}>{m.headline}</p>
//                         {/* Preview snippet */}
//                         <p style={serif({ fontSize: "0.86rem", color: "#7a6e5e", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" })}>
//                           {m.summary}
//                         </p>
//                       </div>

//                       <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 14px", flexShrink: 0, gap: 6 }}>
//                         <svg className="media-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c4b89a" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
//                         {/* External link icon hint */}
//                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c4b89a" strokeWidth="2">
//                           <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
//                           <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
//                         </svg>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Submit citation CTA */}
//                 <div style={{ marginTop: 20, padding: "18px 20px", background: "#ede8dc", border: "1px solid #d4c8b4", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
//                   <div>
//                     <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8870", marginBottom: 5 })}>
//                       See something missing?
//                     </p>
//                     <p style={serif({ fontSize: "0.94rem", fontStyle: "italic", color: "#7a6e5e", lineHeight: 1.55 })}>
//                       Help improve this record by submitting additional media coverage.
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setShowCitation(true)}
//                     style={mono({ background: "#1e2d4a", color: "#f5f0e8", border: "none", padding: "10px 18px", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 8 })}
//                     onMouseEnter={e => e.currentTarget.style.background = "#2a3f6a"}
//                     onMouseLeave={e => e.currentTarget.style.background = "#1e2d4a"}
//                   >
//                     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
//                     Submit a media citation →
//                   </button>
//                 </div>
//               </section>
//             )}
//           </div>

//           {/* ── SIDEBAR ── */}
//           <aside className="sidebar-col" style={{ minWidth: 0, overflow: "hidden" }}>
//             {/* Docket details */}
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

//             {/* Citation */}
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

//       <Footer />
//     </div>
//   );
// }




// app/dockets/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiCalendar, FiFileText, FiDownload, FiExternalLink, FiArrowRight, FiInfo, FiPlus } from "react-icons/fi";
import docketsAPI from "@/services/docketsApi";
import mediaAPI from "@/services/mediaApi";

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

    .media-card { transition: box-shadow 0.2s, transform 0.2s, background 0.15s; cursor: pointer; }
    .media-card:hover { box-shadow: 0 6px 28px rgba(30,45,74,0.1); transform: translateY(-1px); background: #fff !important; }
    .media-card:hover .media-arrow { color: #1e2d4a !important; transform: translateX(3px); }
    .media-arrow { transition: color 0.15s, transform 0.2s; }

    .response-body h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 700; font-size: 1.3rem; color: #1e2d4a;
      margin: 1.8rem 0 0.8rem;
      letter-spacing: -0.01em;
    }
    .response-body h3:first-of-type { margin-top: 0; }
    .response-body p {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 1.05rem; line-height: 1.85; color: #4a4035; margin-bottom: 1.2rem;
      word-wrap: break-word; overflow-wrap: break-word;
    }
    .response-body blockquote {
      border-left: 3px solid #b8974a;
      padding: 0.5rem 0 0.5rem 1.5rem;
      margin: 1.5rem 0;
      font-style: italic;
      background: #faf6ee;
      border-radius: 0 4px 4px 0;
    }
    .response-body blockquote p {
      font-style: italic;
      color: #7a6e5e;
      margin-bottom: 0;
      font-size: 1rem;
    }
    .drop-cap::first-letter {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 3.8rem; font-weight: 900; line-height: 0.82;
      float: left; margin: 0.1rem 0.16em 0 0; color: #1e2d4a;
    }
    @media (max-width: 640px) { .drop-cap::first-letter { font-size: 2.8rem; } }

    .tab-strip { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; width: 100%; }
    .tab-strip::-webkit-scrollbar { display: none; }

    .docket-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; align-items: start; }
    @media (max-width: 900px) { .docket-grid { grid-template-columns: 1fr; } .sidebar-col { order: -1; } }

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

    .modal-backdrop {
      position: fixed; inset: 0; z-index: 500;
      background: rgba(10, 15, 30, 0.7);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      animation: fadeIn 0.18s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .modal-panel {
      width: 100%; max-width: 520px;
      background: #f5f0e8;
      border-top: 4px solid #b8974a;
      animation: slideUp 0.22s ease;
      max-height: 90vh; overflow-y: auto;
    }
    @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

    .modal-input {
      width: 100%; background: #faf6ee; border: 1px solid #d4c8b4;
      padding: 10px 13px; font-family: 'EB Garamond', Georgia, serif;
      font-size: 0.97rem; color: #1e2d4a; outline: none;
      transition: border-color 0.15s;
    }
    .modal-input:focus { border-color: #1e2d4a; }
    .modal-input::placeholder { color: #b8b0a0; font-style: italic; }

    .modal-select {
      width: 100%; background: #faf6ee; border: 1px solid #d4c8b4;
      padding: 10px 13px; appearance: none; font-family: 'EB Garamond', Georgia, serif;
      font-size: 0.97rem; color: #1e2d4a; outline: none; cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231e2d4a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 13px center;
    }
    .modal-select:focus { border-color: #1e2d4a; outline: none; }

    @keyframes successPop { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
    .success-pop { animation: successPop 0.35s ease forwards; }
    .preview-panel { max-width: 480px; }

    .action-btn {
      font-family: 'DM Mono', monospace;
      font-size: 0.56rem; letter-spacing: 0.08em; text-transform: uppercase;
      color: #1e2d4a; padding: 9px 0; border: none; border-bottom: 1px solid #ede8dc;
      display: flex; align-items: center; gap: 8px; background: none;
      cursor: pointer; width: 100%; text-align: left;
      transition: color 0.15s, background 0.15s;
    }
    .action-btn:hover { color: #b8974a; }
    .action-btn:last-child { border-bottom: none; }

    @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
    .toast { animation: toastIn 0.22s ease forwards; }

    .share-btn {
      font-family: 'DM Mono', monospace; font-size: 0.58rem; letter-spacing: 0.08em;
      text-transform: uppercase; color: #1e2d4a; background: none; border: none;
      border-bottom: 1px solid #ede8dc; padding: 11px 0; cursor: pointer;
      display: flex; align-items: center; gap: 12px; width: 100%; text-align: left;
      transition: color 0.15s;
    }
    .share-btn:hover { color: #b8974a; }
    .share-btn:last-child { border-bottom: none; }
  `}</style>
);

/* ── CONSTANTS ── */
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

/* ── HELPERS ── */
const fmtDate = (iso) => {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const fmtLong = (iso) => {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

const formatResponseText = (text) => {
  if (!text) return "";
  let html = text.replace(/\r\n/g, "\n");
  const paragraphs = html.split(/\n\n+/);
  return paragraphs.map((para, index) => {
    para = para.trim();
    if (!para) return "";
    if (
      para.match(/^(On the|Our Request|The Healthcare Providers)/i) ||
      para.match(/^[A-Z][a-z]+ [A-Z][a-z]+:/) ||
      para.includes("Allegation") ||
      para.includes("Financial Figures") ||
      para.includes("Whistleblower") ||
      para.includes("Request") ||
      (para.endsWith(":") && para.length < 100)
    ) {
      return `<h3>${para.replace(/:$/, "")}</h3>`;
    }
    if ((para.startsWith('"') && para.includes('" —')) || (para.startsWith("\u201c") && para.includes("\u201d \u2014"))) {
      return `<blockquote><p>${para}</p></blockquote>`;
    }
    if (index === 0) {
      const m = para.match(/^([^\.]+\.)/);
      if (m) return `<p><span class="drop-cap">${m[1]}</span>${para.substring(m[1].length)}</p>`;
    }
    return `<p>${para}</p>`;
  }).filter(Boolean).join("");
};

/* ── FLAG ERROR MODAL ── */
function FlagErrorModal({ docketId, docketLabel, onClose }) {
  const [form, setForm] = useState({ category: "Factual Error", description: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", ...extra });
  const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...extra });
  const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", ...extra });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description.trim()) { setErrors({ description: "Please describe the error." }); return; }
    setLoading(true);
    try {
      // Replace with your actual API call:
      // await flagAPI.submitFlag({ docketId, ...form });
      await new Promise((r) => setTimeout(r, 900));
      setSubmitted(true);
      setTimeout(onClose, 2200);
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" style={{ maxWidth: 480, borderTopColor: "#b8190c" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ background: "#1e2d4a", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 4 })}>Editorial</p>
            <h3 style={display({ fontWeight: 700, fontSize: "1.1rem", color: "#f5f0e8" })}>Flag an Error</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5a6e8a", padding: 4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {submitted ? (
          <div className="success-pop" style={{ padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2d6a4f", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p style={display({ fontWeight: 700, fontSize: "1.1rem", color: "#1e2d4a", marginBottom: 8 })}>Report Received</p>
            <p style={serif({ fontSize: "0.95rem", color: "#6a5e4e", lineHeight: 1.6 })}>
              Thank you. Our editorial team will review this report for <strong>{docketLabel}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "20px 22px" }}>
            <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#7a6e5e", lineHeight: 1.65, marginBottom: 18, borderLeft: "3px solid #b8190c", paddingLeft: 12 })}>
              Help us maintain accuracy. Describe the error you found in docket <strong>{docketLabel}</strong>.
            </p>

            <div style={{ marginBottom: 14 }}>
              <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>Error Type</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="modal-select">
                {["Factual Error", "Date Inaccuracy", "Name / Entity Error", "Missing Information", "Document Error", "Other"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({}); }}
                className="modal-input"
                rows={3}
                style={{ resize: "vertical", minHeight: 80 }}
                placeholder="Describe what is incorrect and, if possible, what the correct information should be…"
              />
              {errors.description && <p style={mono({ fontSize: "0.54rem", color: "#b8190c", marginTop: 4 })}>{errors.description}</p>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9a8870", display: "block", marginBottom: 6 })}>Your Email (Optional)</label>
              <input
                type="email"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="modal-input"
                placeholder="For follow-up if needed"
              />
            </div>

            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "10px 12px", marginBottom: 18, display: "flex", gap: 8 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b8190c" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
              <p style={serif({ fontSize: "0.86rem", fontStyle: "italic", color: "#7a3030" })}>
                All reports are reviewed by our editorial team before any changes are made to the public record.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={onClose}
                style={mono({ fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", border: "1px solid #c4b89a", color: "#7a6e5e", padding: "8px 18px", cursor: "pointer" })}>
                Cancel
              </button>
              <button type="submit" disabled={loading}
                style={mono({ fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "#b8190c", color: "#fff", border: "none", padding: "8px 18px", cursor: "pointer", opacity: loading ? 0.6 : 1 })}>
                {loading ? "Sending…" : "Submit Flag →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── SHARE MODAL ── */
function ShareModal({ title, onClose, onCopied }) {
  const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", ...extra });
  const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...extra });
  const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", ...extra });

  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ),
      label: "WhatsApp",
      action: () => window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "_blank"),
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.855-8.175-10.645H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
      label: "X / Twitter",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, "_blank"),
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
      ),
      label: "Reddit",
      action: () => window.open(`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`, "_blank"),
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      ),
      label: "Facebook",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank"),
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="url(#ig)">
          <defs>
            <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433"/>
              <stop offset="25%" stopColor="#e6683c"/>
              <stop offset="50%" stopColor="#dc2743"/>
              <stop offset="75%" stopColor="#cc2366"/>
              <stop offset="100%" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      label: "Instagram (Copy Link)",
      action: () => {
        navigator.clipboard.writeText(url);
        onCopied();
        onClose();
      },
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e2d4a" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      ),
      label: "Email",
      action: () => window.open(`mailto:?subject=${encodedTitle}&body=${encodeURIComponent("Public Record: " + title + "\n\n" + url)}`),
    },
    ...(typeof navigator !== "undefined" && navigator.share
      ? [{
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e2d4a" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          ),
          label: "More Options",
          action: () => navigator.share({ title, url }),
        }]
      : []),
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ background: "#1e2d4a", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={mono({ fontSize: "0.52rem", letterSpacing: "0.14em", color: "#3a4e6a", textTransform: "uppercase", marginBottom: 4 })}>Share</p>
            <h3 style={display({ fontWeight: 700, fontSize: "1.1rem", color: "#f5f0e8" })}>Share This Record</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5a6e8a", padding: 4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div style={{ padding: "18px 22px" }}>
          <p style={serif({ fontSize: "0.9rem", fontStyle: "italic", color: "#7a6e5e", marginBottom: 16, lineHeight: 1.6 })}>
            Share this docket record via your preferred platform.
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {platforms.map(({ icon, label, action }) => (
              <button key={label} onClick={action} className="share-btn">
                <span style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MEDIA CITATION MODAL ── */
function MediaCitationModal({ docketId, docketTitle, onClose, onSubmit }) {
  const [form, setForm] = useState({ outlet: "", headline: "", url: "", date: "", type: "News", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.outlet.trim()) e.outlet = "Publication name is required";
    if (!form.headline.trim()) e.headline = "Headline is required";
    if (!form.url.trim()) e.url = "URL is required";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    try {
      await mediaAPI.submitCitation({ ...form, docketId });
      setSubmitted(true);
      setTimeout(() => { onClose(); if (onSubmit) onSubmit(); }, 2000);
    } catch (error) {
      console.error("Error submitting citation:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div style={{ background: "#1e2d4a", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p className="font-mono-dm text-[0.52rem] tracking-[0.14em] text-[#3a4e6a] uppercase mb-1">Media Watch</p>
            <h3 className="font-playfair font-bold text-[1.15rem] text-[#f5f0e8]">Submit a Media Citation</h3>
          </div>
          <button onClick={onClose} className="text-[#3a4e6a] hover:text-[#c8bfa8] transition-colors p-1 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        {submitted ? (
          <div className="success-pop p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#2d6a4f] flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="font-playfair font-bold text-[1.1rem] text-[#1e2d4a] mb-2">Citation Submitted</p>
            <p className="font-garamond text-[0.95rem] leading-relaxed text-[#6a5e4e] mb-5">
              Thank you. <strong>{form.outlet}</strong>'s coverage has been flagged for editorial review.
            </p>
            <button onClick={onClose} className="font-mono-dm bg-[#1e2d4a] text-[#f5f0e8] px-6 py-2.5 text-[0.6rem] tracking-[0.12em] uppercase">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <p className="font-garamond text-[0.92rem] italic text-[#7a6e5e] leading-relaxed mb-5 border-l-3 border-[#b8974a] pl-3">
              Help improve this record by submitting additional media coverage we may have missed.
            </p>
            <div className="mb-4">
              <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">Publication Name *</label>
              <input type="text" value={form.outlet} onChange={(e) => handleChange("outlet", e.target.value)} className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a]" placeholder="e.g., The Hindu, BBC News"/>
              {errors.outlet && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.outlet}</p>}
            </div>
            <div className="mb-4">
              <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">Headline *</label>
              <input type="text" value={form.headline} onChange={(e) => handleChange("headline", e.target.value)} className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a]" placeholder="Full article title"/>
              {errors.headline && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.headline}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">URL *</label>
                <input type="url" value={form.url} onChange={(e) => handleChange("url", e.target.value)} className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a]" placeholder="https://..."/>
                {errors.url && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.url}</p>}
              </div>
              <div>
                <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">Date *</label>
                <input type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] cursor-pointer"/>
                {errors.date && <p className="font-mono-dm text-[0.54rem] text-[#b8190c] mt-1">{errors.date}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => handleChange("type", e.target.value)} className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] cursor-pointer">
                {["Original Report", "Follow-up", "Opinion", "Fact-Check", "News", "Regional", "Other"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="mb-5">
              <label className="font-mono-dm text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">Note (Optional)</label>
              <textarea value={form.note} onChange={(e) => handleChange("note", e.target.value)} className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2.5 font-garamond text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y min-h-[64px]" rows={2} placeholder="Brief summary or key points from the coverage..."/>
            </div>
            <div className="bg-[#ede8dc] border border-[#d4c8b4] p-2.5 mb-5 flex gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              <p className="font-garamond text-[0.86rem] italic text-[#7a6e5e]">Submissions are reviewed by our editorial team before appearing in the public record.</p>
            </div>
            <div className="flex gap-2.5 justify-end">
              <button type="button" onClick={onClose} className="font-mono-dm bg-transparent border border-[#c4b89a] text-[#7a6e5e] px-5 py-2 text-[0.58rem] tracking-[0.1em] uppercase cursor-pointer hover:bg-[#ede8dc] transition-colors">Cancel</button>
              <button type="submit" disabled={loading} className="font-mono-dm bg-[#1e2d4a] text-[#f5f0e8] px-5 py-2 text-[0.58rem] tracking-[0.1em] uppercase cursor-pointer hover:bg-[#2a3f6a] transition-colors disabled:opacity-50">
                {loading ? "Submitting..." : "Submit Citation →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── ACTIONS PANEL (sidebar) ── */
function ActionsPanel({ docket, displayTitle, respondentName, filedDate, claimDate, exhibitsCount, claimSource, formattedResponse }) {
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);

  const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", ...extra });
  const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", ...extra });
  const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", ...extra });

  const handleCopyPermalink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedMsg(true);
        setTimeout(() => setCopiedMsg(false), 2500);
      });
    }
  };

  const handleDownload = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>${docket.docketId} — ${displayTitle}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'EB Garamond', Georgia, serif; color: #1e2d4a; padding: 48px 60px; max-width: 820px; margin: 0 auto; background: #fff; }
          .header-bar { border-bottom: 3px solid #b8974a; padding-bottom: 18px; margin-bottom: 24px; }
          .org-label { font-family: 'DM Mono', monospace; font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: #9a8870; margin-bottom: 10px; }
          h1 { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; line-height: 1.15; color: #1e2d4a; margin-bottom: 10px; }
          .status-row { font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9a8870; }
          h2 { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; color: #1e2d4a; margin: 32px 0 10px; padding-bottom: 5px; border-bottom: 1.5px solid #b8974a; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; background: #f5f0e8; padding: 16px 18px; margin: 16px 0; border-left: 4px solid #b8974a; }
          .meta-label { font-family: 'DM Mono', monospace; font-size: 0.56rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9a8870; margin-bottom: 3px; }
          .meta-val { font-size: 0.95rem; color: #1e2d4a; font-family: 'EB Garamond', Georgia, serif; }
          .claim-box { background: #ede8dc; border: 1px solid #d4c8b4; padding: 14px 18px; margin: 10px 0; }
          .claim-box .box-label { font-family: 'DM Mono', monospace; font-size: 0.56rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b8974a; margin-bottom: 8px; }
          .claim-box p { font-size: 1rem; line-height: 1.75; color: #4a4035; }
          .response-section p { font-size: 1rem; line-height: 1.85; color: #4a4035; margin-bottom: 1rem; }
          .response-section h3 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.15rem; color: #1e2d4a; margin: 1.5rem 0 0.5rem; }
          .response-section blockquote { border-left: 3px solid #b8974a; padding: 6px 0 6px 16px; margin: 1.2rem 0; background: #faf6ee; font-style: italic; color: #7a6e5e; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th { font-family: 'DM Mono', monospace; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.1em; padding: 8px 10px; background: #1e2d4a; color: #f5f0e8; text-align: left; }
          td { padding: 8px 10px; border-bottom: 1px solid #d4c8b4; font-size: 0.9rem; vertical-align: top; }
          tr:nth-child(even) td { background: #faf6ee; }
          .tl-item { padding: 10px 0 10px 14px; border-left: 2px solid #d4c8b4; margin-left: 6px; margin-bottom: 6px; }
          .tl-date { font-family: 'DM Mono', monospace; font-size: 0.58rem; color: #9a8870; letter-spacing: 0.08em; }
          .tl-event { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1rem; color: #1e2d4a; margin: 3px 0; }
          .tl-desc { font-size: 0.9rem; color: #6a5e4e; line-height: 1.6; }
          .doc-footer { margin-top: 48px; padding-top: 14px; border-top: 1px solid #d4c8b4; display: flex; justify-content: space-between; font-family: 'DM Mono', monospace; font-size: 0.56rem; color: #9a8870; text-transform: uppercase; letter-spacing: 0.1em; }
          @media print { body { padding: 24px 32px; } @page { margin: 1.5cm; } }
        </style>
      </head>
      <body>
        <div class="header-bar">
          <p class="org-label">Journalism Society — Public Record</p>
          <h1>${displayTitle}</h1>
          <p class="status-row">${docket.docketId} &nbsp;·&nbsp; Status: ${docket.status} &nbsp;·&nbsp; Filed: ${fmtDate(filedDate)}</p>
        </div>

        <div class="meta-grid">
          ${[
            ["Respondent", respondentName],
            ["Claim Source", claimSource],
            ["Claim Date", fmtDate(claimDate)],
            ["Reply Filed", fmtDate(filedDate)],
            ["Exhibits", `${exhibitsCount} documents`],
            ["Type", docket.respondent?.type || docket.type || "Other"],
          ].map(([l, v]) => `<div><div class="meta-label">${l}</div><div class="meta-val">${v}</div></div>`).join("")}
        </div>

        ${docket.summary ? `
        <h2>Summary</h2>
        <div class="claim-box"><p class="box-label">The Claim</p><p>${docket.summary.claim}</p></div>
        ${docket.summary.context ? `<div class="claim-box"><p class="box-label">Context</p><p>${docket.summary.context}</p></div>` : ""}
        ${docket.summary.whyMatters ? `<div class="claim-box"><p class="box-label">Why It Matters</p><p>${docket.summary.whyMatters}</p></div>` : ""}
        ` : ""}

        <h2>Full Response</h2>
        <div class="response-section">${formattedResponse || "<p>No response content available.</p>"}</div>

        ${docket.timeline?.length ? `
        <h2>Timeline</h2>
        ${docket.timeline.map((item) => `
          <div class="tl-item">
            <div class="tl-date">${fmtDate(item.date)} &nbsp;·&nbsp; ${item.type}</div>
            <div class="tl-event">${item.event}</div>
            <div class="tl-desc">${item.description}</div>
          </div>`).join("")}
        ` : ""}

        ${docket.exhibits?.length ? `
        <h2>Exhibits (${exhibitsCount})</h2>
        <table>
          <thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Pages</th></tr></thead>
          <tbody>
            ${docket.exhibits.map((ex) => `<tr><td>${ex.exhibitId}</td><td>${ex.title}</td><td>${ex.category}</td><td>${ex.pages || "N/A"}</td></tr>`).join("")}
          </tbody>
        </table>
        ` : ""}

        <div class="doc-footer">
          <span>Journalism Society Public Record</span>
          <span>${docket.docketId} &nbsp;·&nbsp; Downloaded ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => printWindow.print(), 400);
      };
    }
  };

  return (
    <>
      {/* Copied toast */}
      {copiedMsg && (
        <div className="toast" style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#1e2d4a", color: "#f5f0e8", padding: "11px 22px", zIndex: 999, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 24px rgba(0,0,0,0.28)", pointerEvents: "none" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b8974a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span style={mono({ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" })}>URL Copied to Clipboard</span>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          title={displayTitle}
          onClose={() => setShowShareModal(false)}
          onCopied={() => { setCopiedMsg(true); setTimeout(() => setCopiedMsg(false), 2500); }}
        />
      )}

      {/* Flag Modal */}
      {showFlagModal && (
        <FlagErrorModal
          docketId={docket._id}
          docketLabel={docket.docketId}
          onClose={() => setShowFlagModal(false)}
        />
      )}

      {/* Actions Card */}
      <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px", marginBottom: 14 }}>
        <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 12 })}>Actions</p>
        <div className="actions-wrap">
          <button className="action-btn" onClick={handleDownload}>
            <span style={{ width: 16, textAlign: "center", flexShrink: 0 }}>📥</span>
            Download Full Docket
          </button>
          <button className="action-btn" onClick={handleCopyPermalink}>
            <span style={{ width: 16, textAlign: "center", flexShrink: 0 }}>🔗</span>
            Copy Permalink
          </button>
          <button className="action-btn" onClick={() => setShowShareModal(true)}>
            <span style={{ width: 16, textAlign: "center", flexShrink: 0 }}>📤</span>
            Share this Record
          </button>
          <button className="action-btn" onClick={() => setShowFlagModal(true)}>
            <span style={{ width: 16, textAlign: "center", flexShrink: 0 }}>⚑</span>
            Flag an Error
          </button>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function SingleDocketPage() {
  const params = useParams();
  const [docket, setDocket] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [activeTab, setActiveTab] = useState("response");
  const [exFilter, setExFilter] = useState("All");
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      fetchDocket();
      fetchMedia();
    }
  }, [params?.slug]);

  const fetchDocket = async () => {
    setLoading(true);
    try {
      const data = await docketsAPI.getDocketById(params.slug);
      setDocket(data);
    } catch (error) {
      console.error("Error fetching docket:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const response = await mediaAPI.getMediaByDocket(params.slug);
      setMediaItems(response.media || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleCitationSubmitted = () => fetchMedia();

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

  if (!docket) {
    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="font-playfair text-2xl text-[#1e2d4a] mb-4">Docket Not Found</h1>
          <Link href="/dockets" className="font-mono-dm text-sm text-[#b8974a] hover:underline">← Back to Dockets</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const st = STATUS_STYLE[docket.status] || STATUS_STYLE["Open"];
  const exCategories = ["All", ...Array.from(new Set(docket.exhibits?.map((e) => e.category) || []))];
  const filteredEx = exFilter === "All" ? docket.exhibits || [] : docket.exhibits?.filter((e) => e.category === exFilter) || [];
  const exBreakdown = (docket.exhibits || []).reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + 1; return acc; }, {});

  const displayTitle = docket.response?.title || docket.title || "Untitled";
  const respondentName = docket.respondent?.name || docket.respondent || "Unknown";
  const claimSource = docket.claim?.source || docket.claim_source || "Unknown";
  const claimDate = docket.claim?.date || docket.claim_date;
  const filedDate = docket.publishedDate || docket.filedDate;
  const exhibitsCount = docket.exhibits?.length || 0;

  const mono = (extra = {}) => ({ fontFamily: "'DM Mono', monospace", wordWrap: "break-word", overflowWrap: "break-word", ...extra });
  const serif = (extra = {}) => ({ fontFamily: "'EB Garamond', Georgia, serif", wordWrap: "break-word", overflowWrap: "break-word", ...extra });
  const display = (extra = {}) => ({ fontFamily: "'Playfair Display', Georgia, serif", wordWrap: "break-word", overflowWrap: "break-word", ...extra });
//   const mono = (extra = {}) => ({
//   fontFamily: "Helvetica, Arial, sans-serif",
//   ...extra
// });

// const serif = (extra = {}) => ({
//   fontFamily: "Helvetica, Arial, sans-serif",
//   ...extra
// });

// const display = (extra = {}) => ({
//   fontFamily: "Helvetica, Arial, sans-serif",
//   ...extra
// });

  const formattedResponse = formatResponseText(docket.response?.body);

  const formatFileSize = (bytes) => {
    
  if (!bytes && bytes !== 0) return "N/A";

  const kb = bytes / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  } else if (mb < 1024) {
    return `${mb.toFixed(2)} MB`;
  } else {
    return `${gb.toFixed(2)} GB`;
  }
};
  
  

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", overflowX: "hidden", maxWidth: "100vw" }}>
      <FontStyle />
      <Header />

      {/* Citation Modal */}
      {showCitationModal && (
        <MediaCitationModal
          docketId={docket._id}
          docketTitle={docket.docketId}
          onClose={() => setShowCitationModal(false)}
          onSubmit={handleCitationSubmitted}
        />
      )}

      {/* Media Preview Modal */}
      {previewItem && (
        <div className="modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="modal-panel preview-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ height: 4, background: previewItem.stance === "adversarial" ? "#b8190c" : "#c4b89a" }} />
            <div style={{ padding: "18px 22px 16px", borderBottom: "1px solid #e4ddd0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <span className="font-mono-dm text-[0.6rem] font-medium tracking-[0.1em] uppercase text-[#1e2d4a]">{previewItem.outlet}</span>
                <span className="ml-2 inline-block px-2 py-0.5 text-[0.5rem] font-mono-dm uppercase" style={{ background: "#ede8dc", color: "#9a8870" }}>{previewItem.type}</span>
              </div>
              <button onClick={() => setPreviewItem(null)} className="text-[#b8b0a0] hover:text-[#1e2d4a] cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="p-5">
              <p className="font-mono-dm text-[0.54rem] text-[#9a8870] mb-2">{fmtDate(previewItem.date)}</p>
              <h3 className="font-playfair font-bold text-[1.15rem] leading-tight text-[#1e2d4a] mb-3">{previewItem.headline}</h3>
              <div className="bg-[#ede8dc] p-3 mb-4 rounded">
                <p className="font-garamond text-sm text-[#4a4035]">{previewItem.summary || "No summary available."}</p>
              </div>
              <a href={previewItem.url} target="_blank" className="flex items-center justify-between bg-[#1e2d4a] p-3 no-underline hover:bg-[#2a3f6a] transition-colors">
                <span className="font-mono-dm text-[0.6rem] text-[#f5f0e8] uppercase">Read Full Article</span>
                <FiExternalLink size={14} className="text-[#6a7a94]" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Banner */}
      <div style={{ background: "#1e2d4a", borderBottom: "4px solid #b8974a" }}>
        <div className="banner-pad" style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={mono({ fontSize: "0.58rem", letterSpacing: "0.14em", color: "#d7dfeb", textTransform: "uppercase", marginBottom: 18 })}>
            Public Record / Dockets / {docket.docketId}
          </p>
          <div className="badge-row" style={{ marginBottom: 16 }}>
            <span style={mono({ fontSize: "0.62rem", letterSpacing: "0.1em", color: "#cfd5de", textTransform: "uppercase", background: "rgba(255,255,255,0.07)", padding: "4px 12px", border: "1px solid rgba(255,255,255,0.12)" })}>
              {docket.docketId}
            </span>
            <span style={mono({ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${st.border}`, background: st.bg, color: st.text, display: "inline-flex", alignItems: "center", gap: 6 })}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: st.dot, display: "inline-block", flexShrink: 0 }} />
              {docket.status}
            </span>
            <span style={mono({ fontSize: "0.58rem", letterSpacing: "0.1em", color: "#c6cdd7", textTransform: "uppercase" })}>{docket.respondent?.type || docket.type || "Other"}</span>
          </div>
          <h1 className="font-playfair banner-title" style={{ fontWeight: 900, color: "#f5f0e8", lineHeight: 1.12, maxWidth: 820, marginBottom: 26 }}>
            {displayTitle}
          </h1>
          <div className="banner-meta" style={{ paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[
              ["Respondent", respondentName, true],
              ["In Response To", claimSource, false],
              ["Claim Published", claimDate ? fmtDate(claimDate) : "N/A", false],
              ["Docket Filed", filedDate ? fmtDate(filedDate) : "N/A", false],
              ["Exhibits", `${exhibitsCount} docs`, false],
            ].map(([label, val, italic], i) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 18, minWidth: 0 }}>
                {i > 0 && <div className="meta-divider" />}
                <div style={{ minWidth: 0 }}>
                  <p style={mono({ fontSize: "0.52rem", color: "#d7dde4", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 })}>{label}</p>
                  <p className="meta-val" style={serif({ color: "#c8bfa8", fontSize: "0.92rem", fontStyle: italic ? "italic" : "normal" })}>{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="page-pad" style={{ maxWidth: 1160, margin: "0 auto", overflowX: "hidden" }}>
        <div className="docket-grid">

          {/* ── LEFT COLUMN ── */}
          <div style={{ minWidth: 0, overflow: "hidden" }}>

            {/* Summary */}
            {docket.summary && (
              <section style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 3, height: 26, background: "#b8974a", flexShrink: 0 }} />
                  <h2 style={display({ fontSize: "1.45rem", fontWeight: 700, color: "#1e2d4a" })}>Summary</h2>
                </div>
                <div style={{ background: "#ede8dc", border: "1px solid #d4c8b4", padding: "20px 22px", marginBottom: 12 }}>
                  <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#b8974a", textTransform: "uppercase", marginBottom: 10 })}>The Claim</p>
                  <p style={serif({ fontSize: "1.02rem", lineHeight: 1.75, color: "#4a4035" })}>{docket.summary.claim}</p>
                </div>
                <div className="summary-cards">
                  {[["Context", docket.summary.context], ["Why It Matters", docket.summary.whyMatters]].filter(([_, text]) => text).map(([label, text]) => (
                    <div key={label} style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px" }}>
                      <p style={mono({ fontSize: "0.56rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 8 })}>{label}</p>
                      <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#5a5048" })}>{text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tabs */}
            <div className="tab-strip" style={{ display: "flex", borderBottom: "2px solid #1e2d4a", marginBottom: 26 }}>
              {[
                { key: "response", label: "Full Response" },
                { key: "timeline", label: "Timeline" },
                { key: "exhibits", label: `Exhibits (${exhibitsCount})` },
                { key: "media", label: `Media Watch (${mediaItems.length})` },
              ].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="tab-btn"
                  style={mono({ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "10px 14px", border: "none", cursor: "pointer", whiteSpace: "nowrap", background: activeTab === tab.key ? "#1e2d4a" : "transparent", color: activeTab === tab.key ? "#f5f0e8" : "#9a8870", marginBottom: -2, flexShrink: 0 })}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Full Response */}
            {activeTab === "response" && (
              <section style={{ minWidth: 0, overflow: "hidden" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 18, padding: "12px 15px", background: "#faf6ee", border: "1px solid #d4c8b4", borderLeft: "3px solid #1e2d4a" }}>
                  <FiInfo size={14} style={{ flexShrink: 0, marginTop: 2, color: "#1e2d4a" }} />
                  <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#6a5e4e", lineHeight: 1.6 })}>
                    Full, unedited response submitted by <strong>{respondentName}</strong> on {fmtLong(filedDate)}.
                  </p>
                </div>
                <div className="response-body" style={{ minWidth: 0, overflow: "hidden" }}>
                  {formattedResponse ? (
                    <div dangerouslySetInnerHTML={{ __html: formattedResponse }} />
                  ) : (
                    <p className="font-garamond text-[#7a6e5e]">No response content available.</p>
                  )}
                </div>
                <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid #d4c8b4", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={mono({ fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase" })}>Submitted: {fmtDate(filedDate)}</span>
                  <span style={{ width: 1, height: 12, background: "#d4c8b4", flexShrink: 0 }} />
                  <span style={mono({ fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.1em", textTransform: "uppercase" })}>{respondentName}</span>
                </div>
              </section>
            )}

            {/* Timeline */}
            {activeTab === "timeline" && docket.timeline?.length > 0 && (
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
                  {docket.timeline.map((item, i) => {
                    const t = TL_TYPE[item.type] || TL_TYPE.response;
                    return (
                      <div key={i} className="timeline-item" style={{ position: "relative", paddingBottom: 26, minWidth: 0 }}>
                        <div className="tl-line" style={{ position: "absolute", left: -28 + 6, top: 20, bottom: -8, width: 2, background: "#d4c8b4" }} />
                        <div style={{ position: "absolute", left: -28, top: 6, width: 14, height: 14, borderRadius: "50%", background: t.color, border: "3px solid #f5f0e8", boxShadow: `0 0 0 2px ${t.color}`, flexShrink: 0 }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={mono({ fontSize: "0.58rem", color: "#9a8870", letterSpacing: "0.06em" })}>{fmtDate(item.date)}</span>
                          <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 8px", background: t.bg, color: t.color, border: `1px solid ${t.color}30` })}>{t.label}</span>
                        </div>
                        <h4 style={display({ fontSize: "0.98rem", fontWeight: 700, color: "#1e2d4a", marginBottom: 5 })}>{item.event}</h4>
                        <p style={serif({ fontSize: "0.95rem", lineHeight: 1.7, color: "#6a5e4e" })}>{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Exhibits */}
           {/* Exhibits */}
{activeTab === "exhibits" && docket.exhibits?.length > 0 && (
  <section>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
      <span style={mono({ fontSize: "0.56rem", letterSpacing: "0.12em", color: "#9a8870", textTransform: "uppercase", marginRight: 4 })}>Filter:</span>
      {exCategories.map((cat) => (
        <button key={cat} onClick={() => setExFilter(cat)}
          style={mono({ fontSize: "0.56rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid", cursor: "pointer", background: exFilter === cat ? "#1e2d4a" : "transparent", color: exFilter === cat ? "#f5f0e8" : "#7a6e5e", borderColor: exFilter === cat ? "#1e2d4a" : "#c4b89a" })}>
          {cat}
        </button>
      ))}
      <span style={mono({ marginLeft: "auto", fontSize: "0.56rem", color: "#9a8870", letterSpacing: "0.08em", textTransform: "uppercase" })}>{filteredEx.length}/{exhibitsCount}</span>
    </div>
    <div className="ex-table" style={{ paddingBottom: 8, borderBottom: "2px solid #1e2d4a" }}>
      <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>ID</span>
      <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Document</span>
      <span style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Category</span>
      <span className="col-pages" style={mono({ fontSize: "0.54rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8870" })}>Size</span>
      <span />
    </div>
    {filteredEx.map((ex) => {
      const cat = CAT_COLOR[ex.category] || CAT_COLOR["Evidence"];
      console.log(filteredEx);
      
      return (
        <div key={ex.exhibitId} className="exhibit-row ex-table cursor-pointer" style={{ padding: "11px 0", borderBottom: "1px solid #d4c8b4", alignItems: "center", transition: "background 0.15s" }}>
          <span style={mono({ fontSize: "0.6rem", fontWeight: 500, color: "#1e2d4a", letterSpacing: "0.05em" })}>{ex.exhibitId}</span>
          <span className="exhibit-title" style={serif({ fontSize: "0.95rem", color: "#1e2d4a", lineHeight: 1.3 })}>{ex.title}</span>
          <span className="ex-cat-badge" style={mono({ fontSize: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 6px", background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` })}>{ex.category}</span>
          <span className="col-pages text-gray-500 text-xs">
            {formatFileSize(ex.fileSize)}
          </span>
          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              
              if (!ex.fileUrl) {
                alert("No file URL available");
                return;
              }
              
              const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
              let fileUrl = ex.fileUrl;
              if (fileUrl.startsWith('/')) {
                fileUrl = `${API_BASE_URL}${fileUrl}`;
              }
              
              try {
                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = ex.title || `exhibit-${ex.exhibitId}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              } catch (error) {
                console.error("Download error:", error);
                alert("Failed to download file. Please try again.");
              }
            }}
            className="dl-arrow"
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}
          >
            <FiDownload size={13}/>
          </button>
        </div>
      );
    })}
    <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px dashed #d4c8b4" }}>
      <p style={serif({ fontSize: "0.92rem", fontStyle: "italic", color: "#9a8870" })}>All exhibits are public record and freely downloadable.</p>
    </div>
  </section>
)}

            {/* Media Watch */}
            {activeTab === "media" && (
              <section>
                {loadingMedia ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8974a]"></div>
                  </div>
                ) : mediaItems.length === 0 ? (
                  <div className="text-center py-16 border border-[#d4c8b4] bg-[#faf6ee]">
                    <p className="font-playfair text-xl text-[#c4b89a] mb-3">No media coverage tracked yet</p>
                    <p className="font-garamond text-[#9a8870] mb-6">Help improve this record by submitting relevant media coverage.</p>
                    <button onClick={() => setShowCitationModal(true)} className="font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-[#f5f0e8] px-6 py-2.5 hover:bg-[#2a3f6a] transition-colors cursor-pointer">
                      Submit a Media Citation →
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4">
                      {mediaItems.map((item, idx) => {
                        const stanceConfig = STANCE_CONFIG[item.stance] || STANCE_CONFIG.neutral;
                        return (
                          <div key={idx} onClick={() => setPreviewItem(item)} className="media-card border border-[#d4c8b4] bg-[#faf6ee] overflow-hidden cursor-pointer hover:shadow-md transition-all">
                            <div className="flex">
                              <div style={{ width: 4, background: stanceConfig.color }} />
                              <div className="flex-1 p-5">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                  <span className="font-mono-dm text-sm font-semibold text-[#1e2d4a]">{item.outlet}</span>
                                  <span className="font-mono-dm text-[0.55rem] tracking-wider uppercase px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{item.type}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full" style={{ background: stanceConfig.dot }} />
                                    <span className="font-mono-dm text-[0.55rem] uppercase tracking-wider" style={{ color: stanceConfig.color }}>{stanceConfig.label}</span>
                                  </div>
                                  <span className="font-mono-dm text-xs text-[#9a8870] ml-auto">{fmtDate(item.date)}</span>
                                </div>
                                <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2">{item.headline}</h3>
                                <p className="font-garamond text-[#7a6e5e] leading-relaxed line-clamp-2">{item.summary || "No summary available."}</p>
                                <div className="mt-4 flex justify-end">
                                  <span className="font-mono-dm text-xs uppercase text-[#b8974a] flex items-center gap-1">
                                    Read Article <FiArrowRight size={12} className="media-arrow" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
                      <p className="font-garamond text-[0.98rem] italic text-[#7a6e5e]">Media coverage tracked by Journalism Society's Media Watch desk.</p>
                      <button onClick={() => setShowCitationModal(true)} className="flex items-center gap-2 font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-[#f5f0e8] px-4 py-2 hover:bg-[#2a3f6a] transition-colors cursor-pointer">
                        <FiPlus size={12} />
                        Submit a Media Citation
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="sidebar-col" style={{ minWidth: 0, overflow: "hidden" }}>

            {/* Docket Details */}
            <div style={{ background: "#1e2d4a", padding: "20px 22px", marginBottom: 14 }}>
              <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#c1c8d2", textTransform: "uppercase", paddingBottom: 12, marginBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" })}>
                Docket Details
              </p>
              <div className="detail-grid">
                {[
                  ["Docket ID", docket.docketId],
                  ["Status", docket.status],
                  ["Type", docket.respondent?.type || docket.type || "Other"],
                  ["Respondent", respondentName],
                  ["Claim Filed", claimDate ? fmtDate(claimDate) : "N/A"],
                  ["Reply Filed", filedDate ? fmtDate(filedDate) : "N/A"],
                  ["Exhibits", `${exhibitsCount} documents`],
                ].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: 12, minWidth: 0 }}>
                    <p style={mono({ fontSize: "0.5rem", letterSpacing: "0.1em", color: "#c1c8d2", textTransform: "uppercase", marginBottom: 3 })}>{label}</p>
                    <p style={serif({ color: "#c8bfa8", fontSize: "0.9rem" })}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cite This Docket */}
            <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px", marginBottom: 14 }}>
              <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 10 })}>Cite This Docket</p>
              <p className="cite-text" style={serif({ fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.7, color: "#7a6e5e" })}>
                {respondentName}. "{displayTitle}." <em>Journalism Society Public Record</em>, {docket.docketId}, {fmtDate(filedDate)}.
              </p>
            </div>

            {/* Actions — now a proper component with working handlers */}
            <ActionsPanel
              docket={docket}
              displayTitle={displayTitle}
              respondentName={respondentName}
              filedDate={filedDate}
              claimDate={claimDate}
              exhibitsCount={exhibitsCount}
              claimSource={claimSource}
              formattedResponse={formattedResponse}
            />

            {/* Exhibit Breakdown */}
            {Object.keys(exBreakdown).length > 0 && (
              <div style={{ background: "#faf6ee", border: "1px solid #d4c8b4", padding: "16px 18px" }}>
                <p style={mono({ fontSize: "0.54rem", letterSpacing: "0.14em", color: "#9a8870", textTransform: "uppercase", marginBottom: 14 })}>Exhibit Breakdown</p>
                {Object.entries(exBreakdown).map(([cat, count]) => {
                  const c = CAT_COLOR[cat] || CAT_COLOR["Evidence"];
                  const pct = Math.round((count / exhibitsCount) * 100);
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
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}