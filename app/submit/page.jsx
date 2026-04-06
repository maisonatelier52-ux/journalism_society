
// // app/submit/page.jsx
// "use client";

// import { useState, useRef, useCallback } from "react";
// import Link from "next/link";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// /* ── FONTS + STYLES ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

//     *, *::before, *::after { box-sizing: border-box; }
//     html, body { font-family: 'EB Garamond', Georgia, serif; overflow-x: hidden; }

//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm  { font-family: 'DM Mono', monospace; }

//     /* ── INPUTS ── */
//     .field-input {
//       width: 100%;
//       background: #faf6ee;
//       border: 1px solid #d4c8b4;
//       padding: 11px 14px;
//       font-family: 'EB Garamond', Georgia, serif;
//       font-size: 1rem;
//       color: #1e2d4a;
//       outline: none;
//       transition: border-color 0.18s, box-shadow 0.18s;
//     }
//     .field-input:focus {
//       border-color: #1e2d4a;
//       box-shadow: 0 0 0 3px rgba(30,45,74,0.07);
//     }
//     .field-input::placeholder { color: #b8b0a0; font-style: italic; }

//     .field-textarea {
//       width: 100%; resize: vertical; min-height: 140px;
//       background: #faf6ee; border: 1px solid #d4c8b4;
//       padding: 12px 14px;
//       font-family: 'EB Garamond', Georgia, serif;
//       font-size: 1rem; color: #1e2d4a;
//       outline: none; line-height: 1.7;
//       transition: border-color 0.18s, box-shadow 0.18s;
//     }
//     .field-textarea:focus {
//       border-color: #1e2d4a;
//       box-shadow: 0 0 0 3px rgba(30,45,74,0.07);
//     }
//     .field-textarea::placeholder { color: #b8b0a0; font-style: italic; }

//     .field-select {
//       width: 100%; background: #faf6ee;
//       border: 1px solid #d4c8b4;
//       padding: 11px 14px; appearance: none;
//       font-family: 'EB Garamond', Georgia, serif;
//       font-size: 1rem; color: #1e2d4a;
//       outline: none; cursor: pointer;
//       background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231e2d4a' stroke-width='1.5'/%3E%3C/svg%3E");
//       background-repeat: no-repeat;
//       background-position: right 14px center;
//       transition: border-color 0.18s;
//     }
//     .field-select:focus { border-color: #1e2d4a; outline: none; }

//     /* ── STEP PROGRESS ── */
//     .step-connector { flex: 1; height: 1px; background: #d4c8b4; margin-top: 18px; }
//     .step-connector.done { background: #1e2d4a; }

//     /* ── FILE UPLOAD AREA ── */
//     .upload-zone {
//       border: 2px dashed #d4c8b4;
//       background: #faf6ee;
//       padding: 36px 24px;
//       text-align: center;
//       cursor: pointer;
//       transition: border-color 0.2s, background 0.2s;
//     }
//     .upload-zone:hover, .upload-zone.dragging {
//       border-color: #1e2d4a;
//       background: #ede8dc;
//     }

//     /* ── TIMELINE ENTRY ── */
//     .timeline-entry {
//       border-left: 3px solid #d4c8b4;
//       padding-left: 16px;
//       margin-bottom: 16px;
//       position: relative;
//     }
//     .timeline-entry::before {
//       content: '';
//       position: absolute; left: -7px; top: 14px;
//       width: 11px; height: 11px; border-radius: 50%;
//       background: #b8974a; border: 2px solid #f5f0e8;
//     }

//     /* ── REMOVE BUTTON ── */
//     .remove-btn {
//       background: none; border: none;
//       color: #c4b89a; cursor: pointer;
//       padding: 2px 6px; font-size: 1.1rem;
//       transition: color 0.15s;
//     }
//     .remove-btn:hover { color: #b8190c; }

//     /* ── SUCCESS STATE ── */
//     @keyframes fadeUp {
//       from { opacity: 0; transform: translateY(20px); }
//       to   { opacity: 1; transform: translateY(0); }
//     }
//     .success-anim { animation: fadeUp 0.5s ease forwards; }

//     /* ── RADIO / CHECK CUSTOM ── */
//     .check-item { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
//     .check-box {
//       width: 16px; height: 16px; flex-shrink: 0; margin-top: 3px;
//       border: 1.5px solid #c4b89a; background: #faf6ee;
//       display: flex; align-items: center; justify-content: center;
//       transition: background 0.15s, border-color 0.15s;
//     }
//     .check-box.checked { background: #1e2d4a; border-color: #1e2d4a; }

//     /* Mobile */
//     @media (max-width: 640px) {
//       .step-label { display: none; }
//     }
//   `}</style>
// );

// /* ── CONSTANTS ── */
// const STEPS = [
//   { num: 1, label: "Your Details" },
//   { num: 2, label: "The Claim"    },
//   { num: 3, label: "Your Response"},
//   { num: 4, label: "Evidence"     },
//   { num: 5, label: "Review"       },
// ];

// const RESPONDENT_TYPES = [
//   "Individual",
//   "Corporate Organisation",
//   "Government Body",
//   "Industry Association",
//   "Non-Governmental Organisation",
//   "Educational Institution",
//   "Other",
// ];

// const DOCKET_TYPES = [
//   "Right of Reply",
//   "Correction Request",
//   "Factual Dispute",
//   "Defamation Response",
//   "Regulatory Compliance",
//   "Other",
// ];

// const TIMELINE_TYPES = [
//   "Original Claim Published",
//   "Response Issued",
//   "Third-Party Statement",
//   "Regulatory Action",
//   "Court Filing",
//   "Media Coverage",
//   "Other",
// ];

// /* ── INITIAL FORM STATE ── */
// const INITIAL = {
//   // Step 1
//   respondentName: "",
//   respondentOrg:  "",
//   respondentType: "",
//   contactEmail:   "",
//   contactPhone:   "",
//   respondentRole: "",

//   // Step 2
//   claimSource:    "",
//   claimUrl:       "",
//   claimDate:      "",
//   claimSummary:   "",
//   claimCategory:  "",

//   // Step 3
//   responseTitle:  "",
//   responseBody:   "",
//   responseType:   "",
//   requestedAction:"",

//   // Step 4 — handled separately
//   // Step 5 — consent
//   consentAccurate:   false,
//   consentPublish:    false,
//   consentContact:    false,
// };

// /* ── COMPONENT ── */
// export default function SubmitReplyPage() {
//   const [step, setStep]         = useState(1);
//   const [form, setForm]         = useState(INITIAL);
//   const [files, setFiles]       = useState([]);
//   const [timeline, setTimeline] = useState([
//     { date: "", event: "", detail: "", type: "Original Claim Published" },
//   ]);
//   const [dragging, setDragging] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors]     = useState({});
//   const fileInputRef            = useRef(null);

//   /* helpers - FIXED: Use functional updates */
//   const set = useCallback((k, v) => {
//     setForm(f => ({ ...f, [k]: v }));
//   }, []);

//   /* FIXED: Generic field change handler */
//   const handleFieldChange = useCallback((field, value) => {
//     set(field, value);
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   }, [set, errors]);

//   /* FIXED: Specific handlers for each field */
//   const handleRespondentNameChange = useCallback((e) => {
//     handleFieldChange("respondentName", e.target.value);
//   }, [handleFieldChange]);

//   const handleRespondentTypeChange = useCallback((e) => {
//     handleFieldChange("respondentType", e.target.value);
//   }, [handleFieldChange]);

//   const handleContactEmailChange = useCallback((e) => {
//     handleFieldChange("contactEmail", e.target.value);
//   }, [handleFieldChange]);

//   const handleContactPhoneChange = useCallback((e) => {
//     handleFieldChange("contactPhone", e.target.value);
//   }, [handleFieldChange]);

//   const handleRespondentRoleChange = useCallback((e) => {
//     handleFieldChange("respondentRole", e.target.value);
//   }, [handleFieldChange]);

//   const handleClaimSourceChange = useCallback((e) => {
//     handleFieldChange("claimSource", e.target.value);
//   }, [handleFieldChange]);

//   const handleClaimUrlChange = useCallback((e) => {
//     handleFieldChange("claimUrl", e.target.value);
//   }, [handleFieldChange]);

//   const handleClaimDateChange = useCallback((e) => {
//     handleFieldChange("claimDate", e.target.value);
//   }, [handleFieldChange]);

//   const handleClaimSummaryChange = useCallback((e) => {
//     handleFieldChange("claimSummary", e.target.value);
//   }, [handleFieldChange]);

//   const handleClaimCategoryChange = useCallback((e) => {
//     handleFieldChange("claimCategory", e.target.value);
//   }, [handleFieldChange]);

//   const handleResponseTitleChange = useCallback((e) => {
//     handleFieldChange("responseTitle", e.target.value);
//   }, [handleFieldChange]);

//   const handleResponseBodyChange = useCallback((e) => {
//     handleFieldChange("responseBody", e.target.value);
//   }, [handleFieldChange]);

//   const handleResponseTypeChange = useCallback((e) => {
//     handleFieldChange("responseType", e.target.value);
//   }, [handleFieldChange]);

//   const handleRequestedActionChange = useCallback((e) => {
//     handleFieldChange("requestedAction", e.target.value);
//   }, [handleFieldChange]);

//   const handleConsentChange = useCallback((key) => {
//     setForm(f => ({ ...f, [key]: !f[key] }));
//     if (errors[key]) {
//       setErrors(prev => ({ ...prev, [key]: undefined }));
//     }
//   }, [errors]);

//   /* validation per step */
//   const validate = useCallback((s) => {
//     const e = {};
//     if (s === 1) {
//       if (!form.respondentName.trim()) e.respondentName = "Name or organisation is required.";
//       if (!form.respondentType)        e.respondentType = "Please select a respondent type.";
//       if (!form.contactEmail.trim() || !/\S+@\S+\.\S+/.test(form.contactEmail))
//         e.contactEmail = "A valid email address is required.";
//     }
//     if (s === 2) {
//       if (!form.claimSource.trim())  e.claimSource  = "Name of the outlet or source is required.";
//       if (!form.claimDate)           e.claimDate    = "Date of the original claim is required.";
//       if (!form.claimSummary.trim()) e.claimSummary = "A summary of the claim is required.";
//     }
//     if (s === 3) {
//       if (!form.responseTitle.trim()) e.responseTitle = "A title for your response is required.";
//       if (form.responseBody.trim().split(/\s+/).length < 30)
//         e.responseBody = "Your response should be at least 30 words.";
//     }
//     if (s === 5) {
//       if (!form.consentAccurate) e.consentAccurate = "You must confirm the accuracy of your submission.";
//       if (!form.consentPublish)  e.consentPublish  = "You must consent to publication.";
//     }
//     return e;
//   }, [form]);

//   const next = useCallback(() => {
//     const e = validate(step);
//     if (Object.keys(e).length) { setErrors(e); return; }
//     setErrors({});
//     if (step < STEPS.length) setStep(s => s + 1);
//     else handleSubmit();
//   }, [step, validate]);

//   const back = useCallback(() => { setErrors({}); setStep(s => Math.max(1, s - 1)); }, []);

//   /* file handling */
//   const addFiles = useCallback((incoming) => {
//     const arr = Array.from(incoming).map(f => ({
//       name: f.name, size: f.size, type: f.type, file: f,
//       id: Math.random().toString(36).slice(2),
//     }));
//     setFiles(prev => [...prev, ...arr]);
//   }, []);

//   const removeFile = useCallback((id) => setFiles(f => f.filter(x => x.id !== id)), []);

//   /* timeline */
//   const addTL = useCallback(() => setTimeline(t => [...t, { date: "", event: "", detail: "", type: "Response Issued" }]), []);
//   const removeTL = useCallback((i) => setTimeline(t => t.filter((_, idx) => idx !== i)), []);
//   const setTL = useCallback((i, k, v) => setTimeline(t => t.map((e, idx) => idx === i ? { ...e, [k]: v } : e)), []);

//   /* submit */
//   const handleSubmit = useCallback(() => setSubmitted(true), []);

//   const wordCount = useCallback((text) => text.trim() ? text.trim().split(/\s+/).length : 0, []);
//   const fmtBytes  = useCallback((b) => b < 1024*1024 ? `${(b/1024).toFixed(0)} KB` : `${(b/1024/1024).toFixed(1)} MB`, []);

//   /* ── LABEL COMPONENT ── */
//   const Label = useCallback(({ children, required }) => (
//     <label className="font-mono-dm text-xs tracking-widest uppercase block mb-2" style={{ color: "#9a8870" }}>
//       {children}{required && <span style={{ color: "#b8974a", marginLeft: 3 }}>*</span>}
//     </label>
//   ), []);

//   const Err = useCallback(({ k }) => errors[k] ? (
//     <p className="font-mono-dm text-xs mt-1.5" style={{ color: "#b8190c" }}>{errors[k]}</p>
//   ) : null, [errors]);

//   const Field = useCallback(({ children, className = "" }) => (
//     <div className={`mb-6 ${className}`}>{children}</div>
//   ), []);

//   /* ── SECTION HEADER ── */
//   const SectionHead = useCallback(({ num, title, desc }) => (
//     <div className="mb-8">
//       <div className="flex items-center gap-3 mb-3">
//         <span className="font-playfair font-black text-4xl leading-none" style={{ color: "#ede8dc" }}>{String(num).padStart(2, "0")}</span>
//         <div className="w-px h-8 bg-[#d4c8b4]" />
//         <h2 className="font-playfair font-bold text-2xl leading-tight" style={{ color: "#1e2d4a" }}>{title}</h2>
//       </div>
//       {desc && <p className="font-garamond italic text-base" style={{ color: "#9a8870" }}>{desc}</p>}
//     </div>
//   ), []);

//   /* ── STEP INDICATOR ── */
//   const StepBar = useCallback(() => (
//     <div className="flex items-start gap-0 mb-10">
//       {STEPS.map((s, i) => (
//         <div key={s.num} className="flex items-center" style={{ flex: i < STEPS.length - 1 ? "1 1 0" : "0 0 auto" }}>
//           <div className="flex flex-col items-center gap-1.5">
//             <button
//               onClick={() => { if (s.num < step) { setErrors({}); setStep(s.num); } }}
//               className="w-9 h-9 rounded-full flex items-center justify-center font-mono-dm text-xs font-medium transition-all"
//               style={
//                 step === s.num
//                   ? { background: "#1e2d4a", color: "#f5f0e8", boxShadow: "0 0 0 3px rgba(30,45,74,0.15)" }
//                   : s.num < step
//                   ? { background: "#b8974a", color: "#f5f0e8" }
//                   : { background: "#ede8dc", color: "#9a8870", border: "1px solid #d4c8b4" }
//               }
//             >
//               {s.num < step
//                 ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
//                 : s.num
//               }
//             </button>
//             <span className="step-label font-mono-dm text-center" style={{ fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: step === s.num ? "#1e2d4a" : "#9a8870", fontWeight: step === s.num ? "500" : "400" }}>
//               {s.label}
//             </span>
//           </div>
//           {i < STEPS.length - 1 && (
//             <div className="step-connector" style={{ flex: 1, height: 1, background: s.num < step ? "#b8974a" : "#d4c8b4", marginBottom: 20 }} />
//           )}
//         </div>
//       ))}
//     </div>
//   ), [step]);

//   /* ── NAVIGATION BUTTONS ── */
//   const NavButtons = useCallback(({ nextLabel = "Continue →" }) => (
//     <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#d4c8b4]">
//       {step > 1
//         ? <button onClick={back} className="font-mono-dm text-xs tracking-widest uppercase flex items-center gap-2 px-5 py-2.5 border-2 transition-colors" style={{ borderColor: "#c4b89a", color: "#7a6e5e" }}
//             onMouseEnter={e => { e.currentTarget.style.background = "#ede8dc"; }}
//             onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
//             ← Back
//           </button>
//         : <div />
//       }
//       <button onClick={next} className="font-mono-dm text-xs tracking-widest uppercase flex items-center gap-2 px-6 py-2.5 transition-opacity hover:opacity-90" style={{ background: "#1e2d4a", color: "#f5f0e8" }}>
//         {nextLabel}
//       </button>
//     </div>
//   ), [step, back, next]);

//   /* ── SUCCESS PAGE ── */
//   if (submitted) {
//     const refId = `JS-2026-${String(Math.floor(Math.random()*900)+100)}`;
//     return (
//       <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
//         <FontStyle />
//         <Header />
//         <main className="max-w-2xl mx-auto px-6 py-20 text-center success-anim">
//           <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: "#1e2d4a" }}>
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
//           </div>
//           <p className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: "#9a8870" }}>Submission Received</p>
//           <h1 className="font-playfair font-black text-4xl md:text-5xl leading-tight mb-4" style={{ color: "#1e2d4a" }}>
//             Your Reply<br /><em style={{ color: "#b8974a" }}>Has Been Filed</em>
//           </h1>
//           <p className="font-garamond text-lg leading-relaxed mb-3" style={{ color: "#5a5040" }}>
//             Your submission has been received and assigned a reference ID. Our editorial team will review it within 3–5 business days.
//           </p>
//           <div className="inline-block my-6 px-6 py-4 border" style={{ borderColor: "#d4c8b4", background: "#ede8dc" }}>
//             <p className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: "#9a8870" }}>Reference ID</p>
//             <p className="font-mono-dm text-2xl font-medium" style={{ color: "#1e2d4a" }}>{refId}</p>
//           </div>
//           <p className="font-garamond italic text-base mb-8" style={{ color: "#9a8870" }}>
//             A confirmation has been sent to <strong>{form.contactEmail}</strong>
//           </p>
//           <div className="flex gap-3 justify-center flex-wrap">
//             <Link href="/dockets" className="font-mono-dm text-xs tracking-widest uppercase px-6 py-3 text-[#f5f0e8]" style={{ background: "#1e2d4a" }}>
//               Browse Dockets
//             </Link>
//             <Link href="/" className="font-mono-dm text-xs tracking-widest uppercase px-6 py-3 border-2 text-[#1e2d4a]" style={{ borderColor: "#1e2d4a" }}>
//               Return Home
//             </Link>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
//       <FontStyle />
//       <Header />

//       {/* ── PAGE BANNER ── */}
//       <div style={{ background: "#1e2d4a", borderBottom: "4px solid #b8974a" }}>
//         <div className="max-w-4xl mx-auto px-6 py-10 md:py-12">
//           <p className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: "#3a4e6a" }}>
//             Public Record / Submit a Reply
//           </p>
//           <h1 className="font-playfair font-black leading-none mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f5f0e8" }}>
//             Submit a<br /><em style={{ color: "#b8974a" }}>Right of Reply</em>
//           </h1>
//           <p className="font-garamond text-lg leading-relaxed max-w-xl" style={{ color: "#8a9bb8" }}>
//             File your documented response for permanent public record. All submissions undergo editorial review before publication.
//           </p>
//           <div className="flex flex-wrap gap-5 mt-6 pt-6 border-t border-white/10">
//             {[
//               ["🔒", "Confidential review process"],
//               ["⏱", "3–5 business day turnaround"],
//               ["📋", "Free to submit"],
//               ["🌐", "Permanently public record"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-2">
//                 <span>{icon}</span>
//                 <span className="font-mono-dm text-xs tracking-wider" style={{ color: "#6a7a94", textTransform: "uppercase", letterSpacing: "0.08em" }}>{text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN FORM ── */}
//       <main className="max-w-4xl mx-auto px-6 py-12 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">

//           {/* LEFT: FORM */}
//           <div>
//             <StepBar />

//             {/* ════ STEP 1: YOUR DETAILS ════ */}
//             {step === 1 && (
//               <div>
//                 <SectionHead num={1} title="Your Details" desc="Tell us who is submitting this Right of Reply." />

//                 <Field>
//                   <Label required>Name or Organisation</Label>
//                   <input 
//                     className="field-input" 
//                     value={form.respondentName} 
//                     onChange={handleRespondentNameChange}
//                     placeholder="e.g. HPA Kerala Chapter or Dr. Rajan Menon" 
//                   />
//                   <Err k="respondentName" />
//                 </Field>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <Field className="mb-0">
//                     <Label required>Respondent Type</Label>
//                     <select 
//                       className="field-select" 
//                       value={form.respondentType} 
//                       onChange={handleRespondentTypeChange}
//                     >
//                       <option value="">Select type…</option>
//                       {RESPONDENT_TYPES.map(t => <option key={t}>{t}</option>)}
//                     </select>
//                     <Err k="respondentType" />
//                   </Field>
//                   <Field className="mb-0">
//                     <Label>Role / Designation</Label>
//                     <input 
//                       className="field-input" 
//                       value={form.respondentRole} 
//                       onChange={handleRespondentRoleChange}
//                       placeholder="e.g. Secretary General" 
//                     />
//                   </Field>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <Field className="mb-0">
//                     <Label required>Contact Email</Label>
//                     <input 
//                       type="email" 
//                       className="field-input" 
//                       value={form.contactEmail} 
//                       onChange={handleContactEmailChange}
//                       placeholder="your@email.com" 
//                     />
//                     <Err k="contactEmail" />
//                   </Field>
//                   <Field className="mb-0">
//                     <Label>Contact Phone</Label>
//                     <input 
//                       type="tel" 
//                       className="field-input" 
//                       value={form.contactPhone} 
//                       onChange={handleContactPhoneChange}
//                       placeholder="+91 98765 43210" 
//                     />
//                   </Field>
//                 </div>

//                 <div className="p-4 border-l-4 font-garamond text-sm leading-relaxed" style={{ borderColor: "#b8974a", background: "#faf6ee", color: "#6a5e4e" }}>
//                   Your contact details are used only for correspondence about this docket and are not published publicly. Only your name or organisation name will appear in the public record.
//                 </div>

//                 <NavButtons nextLabel="Continue to Claim →" />
//               </div>
//             )}

//             {/* ════ STEP 2: THE CLAIM ════ */}
//             {step === 2 && (
//               <div>
//                 <SectionHead num={2} title="The Claim" desc="Details about the report or statement you are responding to." />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <Field className="mb-0">
//                     <Label required>Publication / Source Name</Label>
//                     <input 
//                       className="field-input" 
//                       value={form.claimSource} 
//                       onChange={handleClaimSourceChange}
//                       placeholder="e.g. The Malabar Record" 
//                     />
//                     <Err k="claimSource" />
//                   </Field>
//                   <Field className="mb-0">
//                     <Label required>Date of Original Claim</Label>
//                     <input 
//                       type="date" 
//                       className="field-input" 
//                       value={form.claimDate} 
//                       onChange={handleClaimDateChange} 
//                     />
//                     <Err k="claimDate" />
//                   </Field>
//                 </div>

//                 <Field>
//                   <Label>URL of Original Article</Label>
//                   <input 
//                     type="url" 
//                     className="field-input" 
//                     value={form.claimUrl} 
//                     onChange={handleClaimUrlChange}
//                     placeholder="https://example.com/article" 
//                   />
//                 </Field>

//                 <Field>
//                   <Label required>Docket Category</Label>
//                   <select 
//                     className="field-select" 
//                     value={form.claimCategory} 
//                     onChange={handleClaimCategoryChange}
//                   >
//                     <option value="">Select category…</option>
//                     {DOCKET_TYPES.map(t => <option key={t}>{t}</option>)}
//                   </select>
//                 </Field>

//                 <Field>
//                   <Label required>Summary of the Claim</Label>
//                   <textarea 
//                     className="field-textarea" 
//                     style={{ minHeight: 120 }} 
//                     value={form.claimSummary} 
//                     onChange={handleClaimSummaryChange}
//                     placeholder="Briefly describe the allegation, report, or claim you are responding to. What was stated? Where was it published? Who saw it?" 
//                   />
//                   <Err k="claimSummary" />
//                   <p className="font-mono-dm text-xs mt-1.5" style={{ color: "#b8b0a0" }}>{wordCount(form.claimSummary)} words</p>
//                 </Field>

//                 <NavButtons nextLabel="Continue to Response →" />
//               </div>
//             )}

//             {/* ════ STEP 3: YOUR RESPONSE ════ */}
//             {step === 3 && (
//               <div>
//                 <SectionHead num={3} title="Your Response" desc="Your full, documented reply. Be specific, factual, and cite your evidence." />

//                 <Field>
//                   <Label required>Response Title</Label>
//                   <input 
//                     className="field-input" 
//                     value={form.responseTitle} 
//                     onChange={handleResponseTitleChange}
//                     placeholder="e.g. Right of Reply: HPA on Alleged Billing Practices" 
//                   />
//                   <Err k="responseTitle" />
//                 </Field>

//                 <Field>
//                   <Label required>Type of Response</Label>
//                   <select 
//                     className="field-select" 
//                     value={form.responseType} 
//                     onChange={handleResponseTypeChange}
//                   >
//                     <option value="">Select type…</option>
//                     {["Full Rebuttal", "Partial Correction", "Factual Clarification", "Context and Background", "Legal Response"].map(t => <option key={t}>{t}</option>)}
//                   </select>
//                 </Field>

//                 <Field>
//                   <Label required>Full Response</Label>
//                   <p className="font-garamond italic text-sm mb-2" style={{ color: "#9a8870" }}>
//                     Write your complete, unedited response. This will be published verbatim. Use clear paragraphs and reference your exhibits where applicable.
//                   </p>
//                   <textarea 
//                     className="field-textarea" 
//                     style={{ minHeight: 280 }} 
//                     value={form.responseBody} 
//                     onChange={handleResponseBodyChange}
//                     placeholder="Begin your response here. Address each claim specifically. Reference any exhibits you are attaching, e.g. 'See Exhibit 3 for the full billing records.'&#10;&#10;Be thorough — this is your permanent public record." 
//                   />
//                   <div className="flex justify-between mt-1.5">
//                     <Err k="responseBody" />
//                     <p className="font-mono-dm text-xs ml-auto" style={{ color: wordCount(form.responseBody) < 30 ? "#c4b89a" : "#2d6a4f" }}>
//                       {wordCount(form.responseBody)} words {wordCount(form.responseBody) < 30 ? "(minimum 30)" : "✓"}
//                     </p>
//                   </div>
//                 </Field>

//                 <Field>
//                   <Label>Action Requested from Publication</Label>
//                   <select 
//                     className="field-select" 
//                     value={form.requestedAction} 
//                     onChange={handleRequestedActionChange}
//                   >
//                     <option value="">Select…</option>
//                     {["Publish this reply in full", "Issue a formal correction", "Remove or retract the article", "Publish a link to this docket", "No specific action requested"].map(a => <option key={a}>{a}</option>)}
//                   </select>
//                 </Field>

//                 {/* Timeline entries */}
//                 <div className="mt-8">
//                   <div className="flex items-center justify-between mb-4">
//                     <div>
//                       <Label>Timeline of Events</Label>
//                       <p className="font-garamond italic text-sm" style={{ color: "#9a8870" }}>Add key dates in chronological order.</p>
//                     </div>
//                     <button onClick={addTL} className="font-mono-dm text-xs tracking-wider uppercase px-3 py-1.5 border transition-colors flex items-center gap-1.5"
//                       style={{ borderColor: "#c4b89a", color: "#1e2d4a" }}
//                       onMouseEnter={e => e.currentTarget.style.background = "#ede8dc"}
//                       onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
//                       <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
//                       Add Entry
//                     </button>
//                   </div>

//                   {timeline.map((entry, i) => (
//                     <div key={i} className="timeline-entry">
//                       <div className="grid grid-cols-1 md:grid-cols-[120px_160px_1fr_32px] gap-3 mb-2">
//                         <div>
//                           <Label>Date</Label>
//                           <input type="date" className="field-input" style={{ padding: "8px 10px", fontSize: "0.85rem" }}
//                             value={entry.date} onChange={e => setTL(i, "date", e.target.value)} />
//                         </div>
//                         <div>
//                           <Label>Type</Label>
//                           <select className="field-select" style={{ padding: "8px 10px", fontSize: "0.85rem" }}
//                             value={entry.type} onChange={e => setTL(i, "type", e.target.value)}>
//                             {TIMELINE_TYPES.map(t => <option key={t}>{t}</option>)}
//                           </select>
//                         </div>
//                         <div>
//                           <Label>Event Description</Label>
//                           <input className="field-input" style={{ padding: "8px 10px", fontSize: "0.85rem" }}
//                             value={entry.event} onChange={e => setTL(i, "event", e.target.value)}
//                             placeholder="Brief description of the event" />
//                         </div>
//                         {timeline.length > 1 && (
//                           <div className="flex items-end pb-0.5">
//                             <button onClick={() => removeTL(i)} className="remove-btn">×</button>
//                           </div>
//                         )}
//                       </div>
//                       <div>
//                         <input className="field-input" style={{ padding: "8px 10px", fontSize: "0.88rem" }}
//                           value={entry.detail} onChange={e => setTL(i, "detail", e.target.value)}
//                           placeholder="Additional details (optional)" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <NavButtons nextLabel="Continue to Evidence →" />
//               </div>
//             )}

//             {/* ════ STEP 4: EVIDENCE ════ */}
//             {step === 4 && (
//               <div>
//                 <SectionHead num={4} title="Evidence &amp; Documents" desc="Upload supporting exhibits. Each file will be assigned an exhibit ID." />

//                 {/* Drop zone */}
//                 <div
//                   className={`upload-zone ${dragging ? "dragging" : ""}`}
//                   onClick={() => fileInputRef.current?.click()}
//                   onDragOver={e => { e.preventDefault(); setDragging(true); }}
//                   onDragLeave={() => setDragging(false)}
//                   onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
//                 >
//                   <input ref={fileInputRef} type="file" multiple className="hidden" style={{ display: "none" }}
//                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv"
//                     onChange={e => addFiles(e.target.files)} />
//                   <div className="flex flex-col items-center gap-3">
//                     <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#ede8dc" }}>
//                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9a8870" strokeWidth="1.5">
//                         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//                         <polyline points="17 8 12 3 7 8"/>
//                         <line x1="12" y1="3" x2="12" y2="15"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="font-garamond text-base" style={{ color: "#1e2d4a" }}>
//                         Drop files here, or <span className="underline" style={{ color: "#b8974a" }}>click to browse</span>
//                       </p>
//                       <p className="font-mono-dm text-xs mt-1" style={{ color: "#9a8870", textTransform: "uppercase", letterSpacing: "0.1em" }}>
//                         PDF · DOC · DOCX · JPG · PNG · XLSX · CSV — max 25MB per file
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* File list */}
//                 {files.length > 0 && (
//                   <div className="mt-4">
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#9a8870" }}>{files.length} file{files.length !== 1 ? "s" : ""} attached</p>
//                     </div>
//                     {files.map((f, i) => (
//                       <div key={f.id} className="flex items-center gap-3 py-3 border-b" style={{ borderColor: "#e4ddd0" }}>
//                         <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded" style={{ background: "#ede8dc" }}>
//                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b8974a" strokeWidth="2">
//                             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                             <polyline points="14 2 14 8 20 8"/>
//                           </svg>
//                         </div>
//                         <span className="font-mono-dm text-xs flex-shrink-0" style={{ color: "#b8974a", letterSpacing: "0.06em" }}>
//                           EX-{String(i + 1).padStart(2, "0")}
//                         </span>
//                         <div className="flex-1 min-w-0">
//                           <p className="font-garamond text-sm truncate" style={{ color: "#1e2d4a" }}>{f.name}</p>
//                           <p className="font-mono-dm text-xs" style={{ color: "#9a8870" }}>{fmtBytes(f.size)}</p>
//                         </div>
//                         <button onClick={() => removeFile(f.id)} className="remove-btn flex-shrink-0">×</button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {files.length === 0 && (
//                   <p className="font-garamond italic text-sm mt-4" style={{ color: "#9a8870" }}>
//                     No documents are required but supporting evidence significantly strengthens your submission.
//                   </p>
//                 )}

//                 {/* Evidence guidance */}
//                 <div className="mt-8 border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
//                   <div className="px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
//                     <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Evidence Guidelines</p>
//                   </div>
//                   <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {[
//                       ["✓ Accepted", ["Original source documents", "Correspondence & email threads", "Official records & certificates", "Billing records (redacted if needed)", "Photographs & media files"]],
//                       ["✗ Not accepted", ["Unverified screenshots", "Anonymous testimonies only", "Documents with broken chain-of-custody", "Files exceeding 25MB", "Content violating privacy laws"]],
//                     ].map(([title, items]) => (
//                       <div key={title}>
//                         <p className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: title.startsWith("✓") ? "#2d6a4f" : "#b8190c" }}>{title}</p>
//                         {items.map(item => (
//                           <p key={item} className="font-garamond text-sm mb-1" style={{ color: "#6a5e4e" }}>
//                             <span className="mr-2" style={{ color: title.startsWith("✓") ? "#2d6a4f" : "#b8190c" }}>·</span>{item}
//                           </p>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <NavButtons nextLabel="Review & Submit →" />
//               </div>
//             )}

//             {/* ════ STEP 5: REVIEW & CONSENT ════ */}
//             {step === 5 && (
//               <div>
//                 <SectionHead num={5} title="Review &amp; Submit" desc="Review your submission details before filing." />

//                 {/* Summary cards */}
//                 <div className="space-y-4 mb-8">
//                   {/* Respondent */}
//                   <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
//                     <div className="flex items-center justify-between px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
//                       <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>§1 Your Details</p>
//                       <button onClick={() => setStep(1)} className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
//                     </div>
//                     <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
//                       {[["Name / Org", form.respondentName || "—"], ["Type", form.respondentType || "—"], ["Email", form.contactEmail || "—"]].map(([k, v]) => (
//                         <div key={k}>
//                           <p className="font-mono-dm text-xs uppercase tracking-wider mb-0.5" style={{ color: "#9a8870" }}>{k}</p>
//                           <p className="font-garamond text-sm" style={{ color: "#1e2d4a" }}>{v}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Claim */}
//                   <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
//                     <div className="flex items-center justify-between px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
//                       <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>§2 The Claim</p>
//                       <button onClick={() => setStep(2)} className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
//                     </div>
//                     <div className="px-5 py-4">
//                       <div className="grid grid-cols-2 gap-4 mb-3">
//                         {[["Source", form.claimSource || "—"], ["Date", form.claimDate || "—"]].map(([k, v]) => (
//                           <div key={k}>
//                             <p className="font-mono-dm text-xs uppercase tracking-wider mb-0.5" style={{ color: "#9a8870" }}>{k}</p>
//                             <p className="font-garamond text-sm" style={{ color: "#1e2d4a" }}>{v}</p>
//                           </div>
//                         ))}
//                       </div>
//                       {form.claimSummary && <p className="font-garamond text-sm leading-relaxed" style={{ color: "#5a5040" }}>{form.claimSummary.slice(0, 200)}{form.claimSummary.length > 200 ? "…" : ""}</p>}
//                     </div>
//                   </div>

//                   {/* Response */}
//                   <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
//                     <div className="flex items-center justify-between px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
//                       <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>§3 Your Response</p>
//                       <button onClick={() => setStep(3)} className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
//                     </div>
//                     <div className="px-5 py-4">
//                       <p className="font-playfair font-bold text-base mb-2" style={{ color: "#1e2d4a" }}>{form.responseTitle || "—"}</p>
//                       <p className="font-mono-dm text-xs" style={{ color: "#9a8870" }}>{wordCount(form.responseBody)} words · {timeline.length} timeline entr{timeline.length !== 1 ? "ies" : "y"}</p>
//                     </div>
//                   </div>

//                   {/* Documents */}
//                   <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
//                     <div className="flex items-center justify-between px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
//                       <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>§4 Evidence</p>
//                       <button onClick={() => setStep(4)} className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
//                     </div>
//                     <div className="px-5 py-4">
//                       {files.length === 0
//                         ? <p className="font-garamond italic text-sm" style={{ color: "#9a8870" }}>No documents attached.</p>
//                         : files.map((f, i) => (
//                           <div key={f.id} className="flex items-center gap-2 mb-1.5">
//                             <span className="font-mono-dm text-xs" style={{ color: "#b8974a" }}>EX-{String(i+1).padStart(2,"0")}</span>
//                             <span className="font-garamond text-sm" style={{ color: "#1e2d4a" }}>{f.name}</span>
//                           </div>
//                         ))
//                       }
//                     </div>
//                   </div>
//                 </div>

//                 {/* Consent checkboxes */}
//                 <div className="space-y-4 mb-6">
//                   <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Declarations</p>

//                   {[
//                     { k: "consentAccurate", text: "I confirm that all information submitted in this docket is accurate and complete to the best of my knowledge. I understand that intentionally false submissions may be removed and flagged." },
//                     { k: "consentPublish",  text: "I consent to this response being published as a permanent public record on the Journalism Society platform, accessible to anyone without restriction." },
//                     { k: "consentContact",  text: "I agree to be contacted by the Journalism Society editorial team for verification purposes prior to publication." },
//                   ].map(({ k, text }) => (
//                     <div key={k}>
//                       <div className="check-item" onClick={() => handleConsentChange(k)}>
//                         <div className={`check-box ${form[k] ? "checked" : ""}`}>
//                           {form[k] && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
//                         </div>
//                         <p className="font-garamond text-sm leading-relaxed" style={{ color: "#4a4035" }}>{text}</p>
//                       </div>
//                       <Err k={k} />
//                     </div>
//                   ))}
//                 </div>

//                 <NavButtons nextLabel="📌 File This Docket" />
//               </div>
//             )}
//           </div>

//           {/* RIGHT: SIDEBAR */}
//           <aside className="hidden lg:block sticky top-24 space-y-4">

//             {/* Progress */}
//             <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
//               <div className="px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
//                 <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Your Progress</p>
//               </div>
//               <div className="p-5">
//                 <div className="h-1.5 rounded-full mb-4" style={{ background: "#e4ddd0" }}>
//                   <div className="h-1.5 rounded-full transition-all duration-500" style={{ background: "#b8974a", width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
//                 </div>
//                 <p className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#9a8870" }}>
//                   Step {step} of {STEPS.length}
//                 </p>
//                 <p className="font-playfair font-bold text-base mt-1" style={{ color: "#1e2d4a" }}>
//                   {STEPS[step - 1].label}
//                 </p>
//               </div>
//             </div>

//             {/* Checklist */}
//             <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
//               <div className="px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
//                 <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Checklist</p>
//               </div>
//               <div className="p-5 space-y-3">
//                 {[
//                   { label: "Respondent details",  done: !!(form.respondentName && form.contactEmail) },
//                   { label: "Claim source & date",  done: !!(form.claimSource && form.claimDate) },
//                   { label: "Full response written", done: wordCount(form.responseBody) >= 30 },
//                   { label: "Timeline added",        done: timeline.some(t => t.date && t.event) },
//                   { label: "Documents attached",    done: files.length > 0 },
//                 ].map(item => (
//                   <div key={item.label} className="flex items-center gap-2.5">
//                     <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: item.done ? "#2d6a4f" : "#e4ddd0" }}>
//                       {item.done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
//                     </div>
//                     <span className="font-mono-dm text-xs tracking-wider" style={{ color: item.done ? "#2d6a4f" : "#9a8870" }}>
//                       {item.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Need help */}
//             <div className="border border-[#d4c8b4] p-5" style={{ background: "#faf6ee" }}>
//               <p className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: "#9a8870" }}>Need Help?</p>
//               <p className="font-garamond text-sm leading-relaxed mb-3" style={{ color: "#6a5e4e" }}>
//                 If you need assistance filing your docket, our editorial team is available.
//               </p>
//               <a href="mailto:submit@journalismsociety.org" className="font-mono-dm text-xs tracking-wider uppercase flex items-center gap-1.5" style={{ color: "#1e2d4a", textDecoration: "none" }}>
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
//                 Contact Editorial Team
//               </a>
//             </div>

//             {/* Quote */}
//             <div className="px-5 py-4 border-l-4" style={{ borderColor: "#b8974a", background: "transparent" }}>
//               <p className="font-garamond italic text-sm leading-relaxed" style={{ color: "#9a8870" }}>
//                 "The right of reply exists so that no public claim stands unanswered."
//               </p>
//             </div>
//           </aside>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }




// app/submit/page.jsx
"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiUpload, 
  FiPlus, 
  FiX,
  FiMail,
  FiFileText
} from "react-icons/fi";
import { submissionAPI } from "@/services/api";

/* ── FONTS + STYLES ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    html, body { font-family: 'EB Garamond', Georgia, serif; overflow-x: hidden; }

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }

    /* ── INPUTS ── */
    .field-input {
      width: 100%;
      background: #faf6ee;
      border: 1px solid #d4c8b4;
      padding: 11px 14px;
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 1rem;
      color: #1e2d4a;
      outline: none;
      transition: border-color 0.18s, box-shadow 0.18s;
    }
    .field-input:focus {
      border-color: #1e2d4a;
      box-shadow: 0 0 0 3px rgba(30,45,74,0.07);
    }
    .field-input::placeholder { color: #b8b0a0; font-style: italic; }

    .field-textarea {
      width: 100%; resize: vertical; min-height: 140px;
      background: #faf6ee; border: 1px solid #d4c8b4;
      padding: 12px 14px;
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 1rem; color: #1e2d4a;
      outline: none; line-height: 1.7;
      transition: border-color 0.18s, box-shadow 0.18s;
    }
    .field-textarea:focus {
      border-color: #1e2d4a;
      box-shadow: 0 0 0 3px rgba(30,45,74,0.07);
    }
    .field-textarea::placeholder { color: #b8b0a0; font-style: italic; }

    .field-select {
      width: 100%; background: #faf6ee;
      border: 1px solid #d4c8b4;
      padding: 11px 14px; appearance: none;
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 1rem; color: #1e2d4a;
      outline: none; cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231e2d4a' stroke-width='1.5'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      transition: border-color 0.18s;
    }
    .field-select:focus { border-color: #1e2d4a; outline: none; }

    /* ── STEP PROGRESS ── */
    .step-connector { flex: 1; height: 1px; background: #d4c8b4; margin-top: 18px; }
    .step-connector.done { background: #1e2d4a; }

    /* ── FILE UPLOAD AREA ── */
    .upload-zone {
      border: 2px dashed #d4c8b4;
      background: #faf6ee;
      padding: 36px 24px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .upload-zone:hover, .upload-zone.dragging {
      border-color: #1e2d4a;
      background: #ede8dc;
    }

    /* ── TIMELINE ENTRY ── */
    .timeline-entry {
      border-left: 3px solid #d4c8b4;
      padding-left: 16px;
      margin-bottom: 16px;
      position: relative;
    }
    .timeline-entry::before {
      content: '';
      position: absolute; left: -7px; top: 14px;
      width: 11px; height: 11px; border-radius: 50%;
      background: #b8974a; border: 2px solid #f5f0e8;
    }

    /* ── REMOVE BUTTON ── */
    .remove-btn {
      background: none; border: none;
      color: #c4b89a; cursor: pointer;
      padding: 2px 6px; font-size: 1.1rem;
      transition: color 0.15s;
    }
    .remove-btn:hover { color: #b8190c; }

    /* ── SUCCESS STATE ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .success-anim { animation: fadeUp 0.5s ease forwards; }

    /* ── RADIO / CHECK CUSTOM ── */
    .check-item { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
    .check-box {
      width: 16px; height: 16px; flex-shrink: 0; margin-top: 3px;
      border: 1.5px solid #c4b89a; background: #faf6ee;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, border-color 0.15s;
    }
    .check-box.checked { background: #1e2d4a; border-color: #1e2d4a; }

    /* Mobile */
    @media (max-width: 640px) {
      .step-label { display: none; }
    }

    /* Loading spinner */
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #f5f0e8;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      display: inline-block;
    }
  `}</style>
);

/* ── CONSTANTS ── */
const STEPS = [
  { num: 1, label: "Your Details" },
  { num: 2, label: "The Claim"    },
  { num: 3, label: "Your Response"},
  { num: 4, label: "Evidence"     },
  { num: 5, label: "Review"       },
];

const RESPONDENT_TYPES = [
  "Individual",
  "Corporate Organisation",
  "Government Body",
  "Industry Association",
  "Non-Governmental Organisation",
  "Educational Institution",
  "Other",
];

const DOCKET_TYPES = [
  "Right of Reply",
  "Correction Request",
  "Factual Dispute",
  "Defamation Response",
  "Regulatory Compliance",
  "Other",
];

const TIMELINE_TYPES = [
  "Original Claim Published",
  "Response Issued",
  "Third-Party Statement",
  "Regulatory Action",
  "Court Filing",
  "Media Coverage",
  "Other",
];

/* ── INITIAL FORM STATE ── */
const INITIAL = {
  // Step 1
  respondentName: "",
  respondentOrg:  "",
  respondentType: "",
  contactEmail:   "",
  contactPhone:   "",
  respondentRole: "",

  // Step 2
  claimSource:    "",
  claimUrl:       "",
  claimDate:      "",
  claimSummary:   "",
  claimCategory:  "",

  // Step 3
  responseTitle:  "",
  responseBody:   "",
  responseType:   "",
  requestedAction:"",

  // Step 4 — handled separately
  // Step 5 — consent
  consentAccurate:   false,
  consentPublish:    false,
  consentContact:    false,
};

/* ── COMPONENT ── */
export default function SubmitReplyPage() {
  const [step, setStep]         = useState(1);
  const [form, setForm]         = useState(INITIAL);
  const [files, setFiles]       = useState([]);
  const [timeline, setTimeline] = useState([
    { date: "", event: "", detail: "", type: "Original Claim Published" },
  ]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]     = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [referenceId, setReferenceId] = useState(null);
  const fileInputRef            = useRef(null);

  /* helpers - FIXED: Use functional updates */
  const set = useCallback((k, v) => {
    setForm(f => ({ ...f, [k]: v }));
  }, []);

  /* FIXED: Generic field change handler */
  const handleFieldChange = useCallback((field, value) => {
    set(field, value);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [set, errors]);

  /* FIXED: Specific handlers for each field */
  const handleRespondentNameChange = useCallback((e) => {
    handleFieldChange("respondentName", e.target.value);
  }, [handleFieldChange]);

  const handleRespondentTypeChange = useCallback((e) => {
    handleFieldChange("respondentType", e.target.value);
  }, [handleFieldChange]);

  const handleContactEmailChange = useCallback((e) => {
    handleFieldChange("contactEmail", e.target.value);
  }, [handleFieldChange]);

  const handleContactPhoneChange = useCallback((e) => {
    handleFieldChange("contactPhone", e.target.value);
  }, [handleFieldChange]);

  const handleRespondentRoleChange = useCallback((e) => {
    handleFieldChange("respondentRole", e.target.value);
  }, [handleFieldChange]);

  const handleClaimSourceChange = useCallback((e) => {
    handleFieldChange("claimSource", e.target.value);
  }, [handleFieldChange]);

  const handleClaimUrlChange = useCallback((e) => {
    handleFieldChange("claimUrl", e.target.value);
  }, [handleFieldChange]);

  const handleClaimDateChange = useCallback((e) => {
    handleFieldChange("claimDate", e.target.value);
  }, [handleFieldChange]);

  const handleClaimSummaryChange = useCallback((e) => {
    handleFieldChange("claimSummary", e.target.value);
  }, [handleFieldChange]);

  const handleClaimCategoryChange = useCallback((e) => {
    handleFieldChange("claimCategory", e.target.value);
  }, [handleFieldChange]);

  const handleResponseTitleChange = useCallback((e) => {
    handleFieldChange("responseTitle", e.target.value);
  }, [handleFieldChange]);

  const handleResponseBodyChange = useCallback((e) => {
    handleFieldChange("responseBody", e.target.value);
  }, [handleFieldChange]);

  const handleResponseTypeChange = useCallback((e) => {
    handleFieldChange("responseType", e.target.value);
  }, [handleFieldChange]);

  const handleRequestedActionChange = useCallback((e) => {
    handleFieldChange("requestedAction", e.target.value);
  }, [handleFieldChange]);

  const handleConsentChange = useCallback((key) => {
    setForm(f => ({ ...f, [key]: !f[key] }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  }, [errors]);

  /* validation per step */
  const validate = useCallback((s) => {
    const e = {};
    if (s === 1) {
      if (!form.respondentName.trim()) e.respondentName = "Name or organisation is required.";
      if (!form.respondentType)        e.respondentType = "Please select a respondent type.";
      if (!form.contactEmail.trim() || !/\S+@\S+\.\S+/.test(form.contactEmail))
        e.contactEmail = "A valid email address is required.";
    }
    if (s === 2) {
      if (!form.claimSource.trim())  e.claimSource  = "Name of the outlet or source is required.";
      if (!form.claimDate)           e.claimDate    = "Date of the original claim is required.";
      if (!form.claimSummary.trim()) e.claimSummary = "A summary of the claim is required.";
    }
    if (s === 3) {
      if (!form.responseTitle.trim()) e.responseTitle = "A title for your response is required.";
      if (form.responseBody.trim().split(/\s+/).length < 30)
        e.responseBody = "Your response should be at least 30 words.";
    }
    if (s === 5) {
      if (!form.consentAccurate) e.consentAccurate = "You must confirm the accuracy of your submission.";
      if (!form.consentPublish)  e.consentPublish  = "You must consent to publication.";
    }
    return e;
  }, [form]);

  const next = useCallback(() => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    if (step < STEPS.length) setStep(s => s + 1);
    else handleSubmit();
  }, [step, validate]);

  const back = useCallback(() => { setErrors({}); setStep(s => Math.max(1, s - 1)); }, []);

  /* file handling */
  const addFiles = useCallback((incoming) => {
    const arr = Array.from(incoming).map(f => ({
      name: f.name, size: f.size, type: f.type, file: f,
      id: Math.random().toString(36).slice(2),
    }));
    setFiles(prev => [...prev, ...arr]);
  }, []);

  const removeFile = useCallback((id) => setFiles(f => f.filter(x => x.id !== id)), []);

  /* timeline */
  const addTL = useCallback(() => setTimeline(t => [...t, { date: "", event: "", detail: "", type: "Response Issued" }]), []);
  const removeTL = useCallback((i) => setTimeline(t => t.filter((_, idx) => idx !== i)), []);
  const setTL = useCallback((i, k, v) => setTimeline(t => t.map((e, idx) => idx === i ? { ...e, [k]: v } : e)), []);

  /* submit to API */
  /* submit to API */
const handleSubmit = useCallback(async () => {
  setIsSubmitting(true);
  setSubmitError(null);
  
  try {
    // Prepare data for API - this will use FormData for file uploads
    const submissionData = {
      respondentName: form.respondentName,
      respondentType: form.respondentType,
      respondentRole: form.respondentRole,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      
      claimSource: form.claimSource,
      claimUrl: form.claimUrl,
      claimDate: form.claimDate,
      claimSummary: form.claimSummary,
      claimCategory: form.claimCategory,
      
      responseTitle: form.responseTitle,
      responseBody: form.responseBody,
      responseType: form.responseType,
      requestedAction: form.requestedAction,
      
      timeline: timeline,
      files: files, // This now includes the actual File objects
      
      consentAccurate: form.consentAccurate,
      consentPublish: form.consentPublish,
      consentContact: form.consentContact,
    };
    
    // Send to backend
    const response = await submissionAPI.submitDocket(submissionData);
    
    // Generate reference ID from response or create one
    const refId = response.referenceId || `JS-2026-${String(Math.floor(Math.random()*900)+100)}`;
    setReferenceId(refId);
    
    // Show success state
    setSubmitted(true);
    
  } catch (error) {
    console.error("Submission error:", error);
    setSubmitError(error.response?.data?.message || "Failed to submit. Please try again.");
    setSubmitted(false);
  } finally {
    setIsSubmitting(false);
  }
}, [form, files, timeline]);

  const wordCount = useCallback((text) => text.trim() ? text.trim().split(/\s+/).length : 0, []);
  const fmtBytes  = useCallback((b) => b < 1024*1024 ? `${(b/1024).toFixed(0)} KB` : `${(b/1024/1024).toFixed(1)} MB`, []);

  /* ── LABEL COMPONENT ── */
  const Label = useCallback(({ children, required }) => (
    <label className="font-mono-dm text-xs tracking-widest uppercase block mb-2" style={{ color: "#9a8870" }}>
      {children}{required && <span style={{ color: "#b8974a", marginLeft: 3 }}>*</span>}
    </label>
  ), []);

  const Err = useCallback(({ k }) => errors[k] ? (
    <p className="font-mono-dm text-xs mt-1.5" style={{ color: "#b8190c" }}>{errors[k]}</p>
  ) : null, [errors]);

  const Field = useCallback(({ children, className = "" }) => (
    <div className={`mb-6 ${className}`}>{children}</div>
  ), []);

  /* ── SECTION HEADER ── */
  const SectionHead = useCallback(({ num, title, desc }) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-playfair font-black text-4xl leading-none" style={{ color: "#ede8dc" }}>{String(num).padStart(2, "0")}</span>
        <div className="w-px h-8 bg-[#d4c8b4]" />
        <h2 className="font-playfair font-bold text-2xl leading-tight" style={{ color: "#1e2d4a" }}>{title}</h2>
      </div>
      {desc && <p className="font-garamond italic text-base" style={{ color: "#9a8870" }}>{desc}</p>}
    </div>
  ), []);

  /* ── STEP INDICATOR ── */
  const StepBar = useCallback(() => (
    <div className="flex items-start gap-0 mb-10">
      {STEPS.map((s, i) => (
        <div key={s.num} className="flex items-center" style={{ flex: i < STEPS.length - 1 ? "1 1 0" : "0 0 auto" }}>
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => { if (s.num < step) { setErrors({}); setStep(s.num); } }}
              className="w-9 h-9 rounded-full flex items-center justify-center font-mono-dm text-xs font-medium transition-all"
              style={
                step === s.num
                  ? { background: "#1e2d4a", color: "#f5f0e8", boxShadow: "0 0 0 3px rgba(30,45,74,0.15)" }
                  : s.num < step
                  ? { background: "#b8974a", color: "#f5f0e8" }
                  : { background: "#ede8dc", color: "#9a8870", border: "1px solid #d4c8b4" }
              }
            >
              {s.num < step
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                : s.num
              }
            </button>
            <span className="step-label font-mono-dm text-center" style={{ fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase", color: step === s.num ? "#1e2d4a" : "#9a8870", fontWeight: step === s.num ? "500" : "400" }}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="step-connector" style={{ flex: 1, height: 1, background: s.num < step ? "#b8974a" : "#d4c8b4", marginBottom: 20 }} />
          )}
        </div>
      ))}
    </div>
  ), [step]);

  /* ── NAVIGATION BUTTONS ── */
  const NavButtons = useCallback(({ nextLabel = "Continue →" }) => (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#d4c8b4]">
      {step > 1
        ? <button onClick={back} className="font-mono-dm text-xs tracking-widest uppercase flex items-center gap-2 px-5 py-2.5 border-2 transition-colors cursor-pointer" style={{ borderColor: "#c4b89a", color: "#7a6e5e" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#ede8dc"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            ← Back
          </button>
        : <div />
      }
      <button onClick={next} className="font-mono-dm text-xs tracking-widest uppercase flex items-center gap-2 px-6 py-2.5 transition-opacity hover:opacity-90 cursor-pointer" style={{ background: "#1e2d4a", color: "#f5f0e8" }}>
        {nextLabel}
      </button>
    </div>
  ), [step, back, next]);

  /* ── SUCCESS PAGE ── */
  if (submitted) {
    return (
      <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
        <FontStyle />
        <Header />
        <main className="max-w-2xl mx-auto px-6 py-20 text-center success-anim">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: "#1e2d4a" }}>
            <FiCheckCircle size={28} className="text-[#f5f0e8]" />
          </div>
          <p className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: "#9a8870" }}>Submission Received</p>
          <h1 className="font-playfair font-black text-4xl md:text-5xl leading-tight mb-4" style={{ color: "#1e2d4a" }}>
            Your Reply<br /><em style={{ color: "#b8974a" }}>Has Been Filed</em>
          </h1>
          <p className="font-garamond text-lg leading-relaxed mb-3" style={{ color: "#5a5040" }}>
            Your submission has been received and assigned a reference ID. Our editorial team will review it within 3–5 business days.
          </p>
          <div className="inline-block my-6 px-6 py-4 border" style={{ borderColor: "#d4c8b4", background: "#ede8dc" }}>
            <p className="font-mono-dm text-xs tracking-widest uppercase mb-1" style={{ color: "#9a8870" }}>Reference ID</p>
            <p className="font-mono-dm text-2xl font-medium" style={{ color: "#1e2d4a" }}>{referenceId || `JS-2026-${String(Math.floor(Math.random()*900)+100)}`}</p>
          </div>
          <p className="font-garamond italic text-base mb-8" style={{ color: "#9a8870" }}>
            A confirmation has been sent to <strong>{form.contactEmail}</strong>
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/dockets" className="font-mono-dm text-xs tracking-widest uppercase px-6 py-3 text-[#f5f0e8]" style={{ background: "#1e2d4a" }}>
              Browse Dockets
            </Link>
            <Link href="/" className="font-mono-dm text-xs tracking-widest uppercase px-6 py-3 border-2 text-[#1e2d4a]" style={{ borderColor: "#1e2d4a" }}>
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f0e8" }}>
      <FontStyle />
      <Header />

      {/* ── PAGE BANNER ── */}
      <div style={{ background: "#1e2d4a", borderBottom: "4px solid #b8974a" }}>
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-12">
          <p className="font-mono-dm text-xs tracking-widest uppercase mb-3" style={{ color: "#3a4e6a" }}>
            Public Record / Submit a Reply
          </p>
          <h1 className="font-playfair font-black leading-none mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f5f0e8" }}>
            Submit a<br /><em style={{ color: "#b8974a" }}>Right of Reply</em>
          </h1>
          <p className="font-garamond text-lg leading-relaxed max-w-xl" style={{ color: "#8a9bb8" }}>
            File your documented response for permanent public record. All submissions undergo editorial review before publication.
          </p>
          <div className="flex flex-wrap gap-5 mt-6 pt-6 border-t border-white/10">
            {[
              ["🔒", "Confidential review process"],
              ["⏱", "3–5 business day turnaround"],
              ["📋", "Free to submit"],
              ["🌐", "Permanently public record"],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2">
                <span>{icon}</span>
                <span className="font-mono-dm text-xs tracking-wider" style={{ color: "#6a7a94", textTransform: "uppercase", letterSpacing: "0.08em" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN FORM ── */}
      <main className="max-w-4xl mx-auto px-6 py-12 pb-20">
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3">
            <FiAlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-mono-dm text-xs text-red-700 uppercase mb-1">Submission Error</p>
              <p className="font-garamond text-sm text-red-600">{submitError}</p>
            </div>
            <button onClick={() => setSubmitError(null)} className="ml-auto text-red-400 hover:text-red-600">
              <FiX size={14} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">

          {/* LEFT: FORM */}
          <div>
            <StepBar />

            {/* ════ STEP 1: YOUR DETAILS ════ */}
            {step === 1 && (
              <div>
                <SectionHead num={1} title="Your Details" desc="Tell us who is submitting this Right of Reply." />

                <Field>
                  <Label required>Name or Organisation</Label>
                  <input 
                    className="field-input" 
                    value={form.respondentName} 
                    onChange={handleRespondentNameChange}
                    placeholder="e.g. HPA Kerala Chapter or Dr. Rajan Menon" 
                  />
                  <Err k="respondentName" />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Field className="mb-0">
                    <Label required>Respondent Type</Label>
                    <select 
                      className="field-select" 
                      value={form.respondentType} 
                      onChange={handleRespondentTypeChange}
                    >
                      <option value="">Select type…</option>
                      {RESPONDENT_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <Err k="respondentType" />
                  </Field>
                  <Field className="mb-0">
                    <Label>Role / Designation</Label>
                    <input 
                      className="field-input" 
                      value={form.respondentRole} 
                      onChange={handleRespondentRoleChange}
                      placeholder="e.g. Secretary General" 
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Field className="mb-0">
                    <Label required>Contact Email</Label>
                    <input 
                      type="email" 
                      className="field-input" 
                      value={form.contactEmail} 
                      onChange={handleContactEmailChange}
                      placeholder="your@email.com" 
                    />
                    <Err k="contactEmail" />
                  </Field>
                  <Field className="mb-0">
                    <Label>Contact Phone</Label>
                    <input 
                      type="tel" 
                      className="field-input" 
                      value={form.contactPhone} 
                      onChange={handleContactPhoneChange}
                      placeholder="+91 98765 43210" 
                    />
                  </Field>
                </div>

                <div className="p-4 border-l-4 font-garamond text-sm leading-relaxed" style={{ borderColor: "#b8974a", background: "#faf6ee", color: "#6a5e4e" }}>
                  Your contact details are used only for correspondence about this docket and are not published publicly. Only your name or organisation name will appear in the public record.
                </div>

                <NavButtons nextLabel="Continue to Claim →" />
              </div>
            )}

            {/* ════ STEP 2: THE CLAIM ════ */}
            {step === 2 && (
              <div>
                <SectionHead num={2} title="The Claim" desc="Details about the report or statement you are responding to." />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Field className="mb-0">
                    <Label required>Publication / Source Name</Label>
                    <input 
                      className="field-input" 
                      value={form.claimSource} 
                      onChange={handleClaimSourceChange}
                      placeholder="e.g. The Malabar Record" 
                    />
                    <Err k="claimSource" />
                  </Field>
                  <Field className="mb-0">
                    <Label required>Date of Original Claim</Label>
                    <input 
                      type="date" 
                      className="field-input cursor-pointer" 
                      value={form.claimDate} 
                      onChange={handleClaimDateChange} 
                    />
                    <Err k="claimDate" />
                  </Field>
                </div>

                <Field>
                  <Label>URL of Original Article</Label>
                  <input 
                    type="url" 
                    className="field-input" 
                    value={form.claimUrl} 
                    onChange={handleClaimUrlChange}
                    placeholder="https://example.com/article" 
                  />
                </Field>

                <Field>
                  <Label required>Docket Category</Label>
                  <select 
                    className="field-select" 
                    value={form.claimCategory} 
                    onChange={handleClaimCategoryChange}
                  >
                    <option value="">Select category…</option>
                    {DOCKET_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>

                <Field>
                  <Label required>Summary of the Claim</Label>
                  <textarea 
                    className="field-textarea" 
                    style={{ minHeight: 120 }} 
                    value={form.claimSummary} 
                    onChange={handleClaimSummaryChange}
                    placeholder="Briefly describe the allegation, report, or claim you are responding to. What was stated? Where was it published? Who saw it?" 
                  />
                  <Err k="claimSummary" />
                  <p className="font-mono-dm text-xs mt-1.5" style={{ color: "#b8b0a0" }}>{wordCount(form.claimSummary)} words</p>
                </Field>

                <NavButtons nextLabel="Continue to Response →" />
              </div>
            )}

            {/* ════ STEP 3: YOUR RESPONSE ════ */}
            {step === 3 && (
              <div>
                <SectionHead num={3} title="Your Response" desc="Your full, documented reply. Be specific, factual, and cite your evidence." />

                <Field>
                  <Label required>Response Title</Label>
                  <input 
                    className="field-input" 
                    value={form.responseTitle} 
                    onChange={handleResponseTitleChange}
                    placeholder="e.g. Right of Reply: HPA on Alleged Billing Practices" 
                  />
                  <Err k="responseTitle" />
                </Field>

                <Field>
                  <Label required>Type of Response</Label>
                  <select 
                    className="field-select" 
                    value={form.responseType} 
                    onChange={handleResponseTypeChange}
                  >
                    <option value="">Select type…</option>
                    {["Full Rebuttal", "Partial Correction", "Factual Clarification", "Context and Background", "Legal Response"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>

                <Field>
                  <Label required>Full Response</Label>
                  <p className="font-garamond italic text-sm mb-2" style={{ color: "#9a8870" }}>
                    Write your complete, unedited response. This will be published verbatim. Use clear paragraphs and reference your exhibits where applicable.
                  </p>
                  <textarea 
                    className="field-textarea" 
                    style={{ minHeight: 280 }} 
                    value={form.responseBody} 
                    onChange={handleResponseBodyChange}
                    placeholder="Begin your response here. Address each claim specifically. Reference any exhibits you are attaching, e.g. 'See Exhibit 3 for the full billing records.'&#10;&#10;Be thorough — this is your permanent public record." 
                  />
                  <div className="flex justify-between mt-1.5">
                    <Err k="responseBody" />
                    <p className="font-mono-dm text-xs ml-auto" style={{ color: wordCount(form.responseBody) < 30 ? "#c4b89a" : "#2d6a4f" }}>
                      {wordCount(form.responseBody)} words {wordCount(form.responseBody) < 30 ? "(minimum 30)" : "✓"}
                    </p>
                  </div>
                </Field>

                <Field>
                  <Label>Action Requested from Publication</Label>
                  <select 
                    className="field-select" 
                    value={form.requestedAction} 
                    onChange={handleRequestedActionChange}
                  >
                    <option value="">Select…</option>
                    {["Publish this reply in full", "Issue a formal correction", "Remove or retract the article", "Publish a link to this docket", "No specific action requested"].map(a => <option key={a}>{a}</option>)}
                  </select>
                </Field>

                {/* Timeline entries */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label>Timeline of Events</Label>
                      <p className="font-garamond italic text-sm" style={{ color: "#9a8870" }}>Add key dates in chronological order.</p>
                    </div>
                    <button onClick={addTL} className="font-mono-dm text-xs tracking-wider uppercase px-3 py-1.5 border transition-colors flex items-center gap-1.5 cursor-pointer"
                      style={{ borderColor: "#c4b89a", color: "#1e2d4a" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#ede8dc"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <FiPlus size={10} />
                      Add Entry
                    </button>
                  </div>

                  {timeline.map((entry, i) => (
                    <div key={i} className="timeline-entry">
                      <div className="grid grid-cols-1 md:grid-cols-[120px_160px_1fr_32px] gap-3 mb-2">
                        <div>
                          <Label>Date</Label>
                          <input type="date" className="field-input" style={{ padding: "8px 10px", fontSize: "0.85rem" }}
                            value={entry.date} onChange={e => setTL(i, "date", e.target.value)} />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <select className="field-select" style={{ padding: "8px 10px", fontSize: "0.85rem" }}
                            value={entry.type} onChange={e => setTL(i, "type", e.target.value)}>
                            {TIMELINE_TYPES.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <Label>Event Description</Label>
                          <input className="field-input" style={{ padding: "8px 10px", fontSize: "0.85rem" }}
                            value={entry.event} onChange={e => setTL(i, "event", e.target.value)}
                            placeholder="Brief description of the event" />
                        </div>
                        {timeline.length > 1 && (
                          <div className="flex items-end pb-0.5">
                            <button onClick={() => removeTL(i)} className="remove-btn">×</button>
                          </div>
                        )}
                      </div>
                      <div>
                        <input className="field-input" style={{ padding: "8px 10px", fontSize: "0.88rem" }}
                          value={entry.detail} onChange={e => setTL(i, "detail", e.target.value)}
                          placeholder="Additional details (optional)" />
                      </div>
                    </div>
                  ))}
                </div>

                <NavButtons nextLabel="Continue to Evidence →" />
              </div>
            )}

            {/* ════ STEP 4: EVIDENCE ════ */}
            {step === 4 && (
              <div>
                <SectionHead num={4} title="Evidence &amp; Documents" desc="Upload supporting exhibits. Each file will be assigned an exhibit ID." />

                {/* Drop zone */}
                <div
                  className={`upload-zone ${dragging ? "dragging" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                >
                  <input ref={fileInputRef} type="file" multiple className="hidden" style={{ display: "none" }}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv"
                    onChange={e => addFiles(e.target.files)} />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#ede8dc" }}>
                      <FiUpload size={24} className="text-[#9a8870]" />
                    </div>
                    <div>
                      <p className="font-garamond text-base" style={{ color: "#1e2d4a" }}>
                        Drop files here, or <span className="underline" style={{ color: "#b8974a" }}>click to browse</span>
                      </p>
                      <p className="font-mono-dm text-xs mt-1" style={{ color: "#9a8870", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        PDF · DOC · DOCX · JPG · PNG · XLSX · CSV — max 25MB per file
                      </p>
                    </div>
                  </div>
                </div>

                {/* File list */}
                {files.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#9a8870" }}>{files.length} file{files.length !== 1 ? "s" : ""} attached</p>
                    </div>
                    {files.map((f, i) => (
                      <div key={f.id} className="flex items-center gap-3 py-3 border-b" style={{ borderColor: "#e4ddd0" }}>
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded" style={{ background: "#ede8dc" }}>
                          <FiFileText size={14} className="text-[#b8974a]" />
                        </div>
                        <span className="font-mono-dm text-xs flex-shrink-0" style={{ color: "#b8974a", letterSpacing: "0.06em" }}>
                          EX-{String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-garamond text-sm truncate" style={{ color: "#1e2d4a" }}>{f.name}</p>
                          <p className="font-mono-dm text-xs" style={{ color: "#9a8870" }}>{fmtBytes(f.size)}</p>
                        </div>
                        <button onClick={() => removeFile(f.id)} className="remove-btn flex-shrink-0">×</button>
                      </div>
                    ))}
                  </div>
                )}

                {files.length === 0 && (
                  <p className="font-garamond italic text-sm mt-4" style={{ color: "#9a8870" }}>
                    No documents are required but supporting evidence significantly strengthens your submission.
                  </p>
                )}

                {/* Evidence guidance */}
                <div className="mt-8 border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
                  <div className="px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
                    <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Evidence Guidelines</p>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ["✓ Accepted", ["Original source documents", "Correspondence & email threads", "Official records & certificates", "Billing records (redacted if needed)", "Photographs & media files"]],
                      ["✗ Not accepted", ["Unverified screenshots", "Anonymous testimonies only", "Documents with broken chain-of-custody", "Files exceeding 25MB", "Content violating privacy laws"]],
                    ].map(([title, items]) => (
                      <div key={title}>
                        <p className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: title.startsWith("✓") ? "#2d6a4f" : "#b8190c" }}>{title}</p>
                        {items.map(item => (
                          <p key={item} className="font-garamond text-sm mb-1" style={{ color: "#6a5e4e" }}>
                            <span className="mr-2" style={{ color: title.startsWith("✓") ? "#2d6a4f" : "#b8190c" }}>·</span>{item}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <NavButtons nextLabel="Review & Submit →" />
              </div>
            )}

            {/* ════ STEP 5: REVIEW & CONSENT ════ */}
            {step === 5 && (
              <div>
                <SectionHead num={5} title="Review &amp; Submit" desc="Review your submission details before filing." />

                {/* Summary cards */}
                <div className="space-y-4 mb-8">
                  {/* Respondent */}
                  <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
                      <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>§1 Your Details</p>
                      <button onClick={() => setStep(1)} className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                    </div>
                    <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[["Name / Org", form.respondentName || "—"], ["Type", form.respondentType || "—"], ["Email", form.contactEmail || "—"]].map(([k, v]) => (
                        <div key={k}>
                          <p className="font-mono-dm text-xs uppercase tracking-wider mb-0.5" style={{ color: "#9a8870" }}>{k}</p>
                          <p className="font-garamond text-sm" style={{ color: "#1e2d4a" }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Claim */}
                  <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
                      <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>§2 The Claim</p>
                      <button onClick={() => setStep(2)} className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                    </div>
                    <div className="px-5 py-4">
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        {[["Source", form.claimSource || "—"], ["Date", form.claimDate || "—"]].map(([k, v]) => (
                          <div key={k}>
                            <p className="font-mono-dm text-xs uppercase tracking-wider mb-0.5" style={{ color: "#9a8870" }}>{k}</p>
                            <p className="font-garamond text-sm" style={{ color: "#1e2d4a" }}>{v}</p>
                          </div>
                        ))}
                      </div>
                      {form.claimSummary && <p className="font-garamond text-sm leading-relaxed" style={{ color: "#5a5040" }}>{form.claimSummary.slice(0, 200)}{form.claimSummary.length > 200 ? "…" : ""}</p>}
                    </div>
                  </div>

                  {/* Response */}
                  <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
                      <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>§3 Your Response</p>
                      <button onClick={() => setStep(3)} className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                    </div>
                    <div className="px-5 py-4">
                      <p className="font-playfair font-bold text-base mb-2" style={{ color: "#1e2d4a" }}>{form.responseTitle || "—"}</p>
                      <p className="font-mono-dm text-xs" style={{ color: "#9a8870" }}>{wordCount(form.responseBody)} words · {timeline.length} timeline entr{timeline.length !== 1 ? "ies" : "y"}</p>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
                      <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>§4 Evidence</p>
                      <button onClick={() => setStep(4)} className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#b8974a", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                    </div>
                    <div className="px-5 py-4">
                      {files.length === 0
                        ? <p className="font-garamond italic text-sm" style={{ color: "#9a8870" }}>No documents attached.</p>
                        : files.map((f, i) => (
                          <div key={f.id} className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono-dm text-xs" style={{ color: "#b8974a" }}>EX-{String(i+1).padStart(2,"0")}</span>
                            <span className="font-garamond text-sm" style={{ color: "#1e2d4a" }}>{f.name}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>

                {/* Consent checkboxes */}
                <div className="space-y-4 mb-6">
                  <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Declarations</p>

                  {[
                    { k: "consentAccurate", text: "I confirm that all information submitted in this docket is accurate and complete to the best of my knowledge. I understand that intentionally false submissions may be removed and flagged." },
                    { k: "consentPublish",  text: "I consent to this response being published as a permanent public record on the Journalism Society platform, accessible to anyone without restriction." },
                    { k: "consentContact",  text: "I agree to be contacted by the Journalism Society editorial team for verification purposes prior to publication." },
                  ].map(({ k, text }) => (
                    <div key={k}>
                      <div className="check-item" onClick={() => handleConsentChange(k)}>
                        <div className={`check-box ${form[k] ? "checked" : ""}`}>
                          {form[k] && <FiCheckCircle size={10} className="text-white" />}
                        </div>
                        <p className="font-garamond text-sm leading-relaxed" style={{ color: "#4a4035" }}>{text}</p>
                      </div>
                      <Err k={k} />
                    </div>
                  ))}
                </div>

                <NavButtons nextLabel={isSubmitting ? "Submitting..." : "📌 File This Docket"} />
              </div>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="hidden lg:block sticky top-24 space-y-4">

            {/* Progress */}
            <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
              <div className="px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
                <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Your Progress</p>
              </div>
              <div className="p-5">
                <div className="h-1.5 rounded-full mb-4" style={{ background: "#e4ddd0" }}>
                  <div className="h-1.5 rounded-full transition-all duration-500" style={{ background: "#b8974a", width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
                </div>
                <p className="font-mono-dm text-xs tracking-wider uppercase" style={{ color: "#9a8870" }}>
                  Step {step} of {STEPS.length}
                </p>
                <p className="font-playfair font-bold text-base mt-1" style={{ color: "#1e2d4a" }}>
                  {STEPS[step - 1].label}
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="border border-[#d4c8b4]" style={{ background: "#faf6ee" }}>
              <div className="px-5 py-3 border-b border-[#d4c8b4]" style={{ background: "#ede8dc" }}>
                <p className="font-mono-dm text-xs tracking-widest uppercase" style={{ color: "#9a8870" }}>Checklist</p>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { label: "Respondent details",  done: !!(form.respondentName && form.contactEmail) },
                  { label: "Claim source & date",  done: !!(form.claimSource && form.claimDate) },
                  { label: "Full response written", done: wordCount(form.responseBody) >= 30 },
                  { label: "Timeline added",        done: timeline.some(t => t.date && t.event) },
                  { label: "Documents attached",    done: files.length > 0 },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: item.done ? "#2d6a4f" : "#e4ddd0" }}>
                      {item.done && <FiCheckCircle size={8} className="text-white" />}
                    </div>
                    <span className="font-mono-dm text-xs tracking-wider" style={{ color: item.done ? "#2d6a4f" : "#9a8870" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Need help */}
            <div className="border border-[#d4c8b4] p-5" style={{ background: "#faf6ee" }}>
              <p className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: "#9a8870" }}>Need Help?</p>
              <p className="font-garamond text-sm leading-relaxed mb-3" style={{ color: "#6a5e4e" }}>
                If you need assistance filing your docket, our editorial team is available.
              </p>
              <a href="mailto:submit@journalismsociety.org" className="font-mono-dm text-xs tracking-wider uppercase flex items-center gap-1.5" style={{ color: "#1e2d4a", textDecoration: "none" }}>
                <FiMail size={11} />
                Contact Editorial Team
              </a>
            </div>

            {/* Quote */}
            <div className="px-5 py-4 border-l-4" style={{ borderColor: "#b8974a", background: "transparent" }}>
              <p className="font-garamond italic text-sm leading-relaxed" style={{ color: "#9a8870" }}>
                "The right of reply exists so that no public claim stands unanswered."
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}