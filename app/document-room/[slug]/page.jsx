// // app/document-room/[slug]/page.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// /* ── GOOGLE FONTS + CSS ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
//     html { font-family: 'EB Garamond', Georgia, serif; }
//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm { font-family: 'DM Mono', monospace; }
//     .preview-container {
//       background: #faf6ee;
//       border: 1px solid #d4c8b4;
//       min-height: 400px;
//       display: flex;
//       flex-direction: column;
//     }
//     .preview-header {
//       border-bottom: 1px solid #d4c8b4;
//       background: #ede8dc;
//     }
//     @media (max-width: 640px) {
//       .preview-iframe { height: 500px; }
//     }
//   `}</style>
// );

// /* ── SAMPLE DATA (should match the list page) ── */
// const DOCUMENTS_DB = {
//   "DOC-001": {
//     id: "DOC-001",
//     title: "Healthcare Providers Alliance — Full Response Docket (JS-2026-003)",
//     type: "Response Docket",
//     date: "2026-03-22",
//     fileUrl: "/documents/js-2026-003-full-docket.pdf",
//     checksum: "sha256:3f8a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
//     preview: "Full response including exhibits, legal review, and regulatory correspondence. This document contains the complete submission from HPA Kerala Chapter, including 19 exhibits, independent legal analysis, and correspondence with regulatory bodies."
//   },
//   "DOC-002": {
//     id: "DOC-002",
//     title: "Kerala Clinical Establishments Act — 2012 Amendment (Full Text)",
//     type: "Regulatory Document",
//     date: "2024-01-15",
//     fileUrl: "/documents/kerala-clinical-act-amendment.pdf",
//     checksum: "sha256:7d2f1a8e9b0c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
//     preview: "Official government gazette notification of the 2012 amendment to the Kerala Clinical Establishments Act. Key provisions regarding pricing transparency and mandatory disclosure requirements for accredited hospitals."
//   },
//   "DOC-003": {
//     id: "DOC-003",
//     title: "NABH Standard Rate Card — Diagnostic Procedures, 2024 Edition",
//     type: "Benchmark",
//     date: "2024-03-10",
//     fileUrl: "/documents/nabh-rate-card-2024.pdf",
//     checksum: "sha256:1e4f6a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
//     preview: "Standard reference rates for diagnostic procedures as published by the National Accreditation Board for Hospitals & Healthcare Providers (NABH). Used as benchmark for comparing hospital charges."
//   },
//   "DOC-004": {
//     id: "DOC-004",
//     title: "HPA Kerala Chapter — Membership Register (Redacted)",
//     type: "Institutional Record",
//     date: "2025-12-01",
//     fileUrl: "/documents/hpa-membership-register.pdf",
//     checksum: "sha256:5a8c3b2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
//     preview: "Redacted membership list of the HPA Kerala Chapter as of December 2025. Includes member hospitals, accreditation status, and facility classifications."
//   },
//   "DOC-005": {
//     id: "DOC-005",
//     title: "Kerala Health Dept. Show-Cause Notice to HPA (17 March 2026)",
//     type: "Regulatory Document",
//     date: "2026-03-17",
//     fileUrl: "/documents/health-dept-notice.pdf",
//     checksum: "sha256:9d4c2f6e7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
//     preview: "Official show-cause notice issued by the Kerala Health Department to HPA Kerala Chapter regarding billing practices. Requests detailed billing records for the period January 2024–December 2025."
//   },
//   "DOC-006": {
//     id: "DOC-006",
//     title: "Independent Legal Review — Krishnaswamy & Associates (HPA Response)",
//     type: "Legal Analysis",
//     date: "2026-03-21",
//     fileUrl: "/documents/legal-review-krishnaswamy.pdf",
//     checksum: "sha256:2b7e5a1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
//     preview: "Independent legal review commissioned by HPA regarding the billing circular cited in the Malabar Record article. Concludes that the circular is a compliance template, not a price-fixing agreement."
//   },
//   "DOC-007": {
//     id: "DOC-007",
//     title: "The Malabar Record — 'Inside the Billing Cartel' (15 March 2026)",
//     type: "Original Claim",
//     date: "2026-03-15",
//     fileUrl: "/documents/malabar-record-article.pdf",
//     checksum: "sha256:4c8a2f9b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
//     preview: "Full text of the investigative article that prompted the HPA response. Original reporting by The Malabar Record on alleged billing irregularities in Kerala's private hospitals."
//   },
//   "DOC-008": {
//     id: "DOC-008",
//     title: "Patient Feedback Survey Results — HPA Member Hospitals (2024–2025)",
//     type: "Evidence",
//     date: "2026-02-28",
//     fileUrl: "/documents/patient-feedback-survey.pdf",
//     checksum: "sha256:6a1e4c8d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
//     preview: "Aggregate results of patient satisfaction and billing transparency surveys conducted across HPA member hospitals. Includes data from 1,247 respondents."
//   },
//   "DOC-009": {
//     id: "DOC-009",
//     title: "Journalism Society — Right of Reply Guidelines",
//     type: "Policy Document",
//     date: "2025-06-10",
//     fileUrl: "/documents/ror-guidelines.pdf",
//     checksum: "sha256:0f3a7c2e3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
//     preview: "Official guidelines for submitting a Right of Reply docket. Outlines the process, evidence requirements, and standards for public record inclusion."
//   },
//   "DOC-010": {
//     id: "DOC-010",
//     title: "Kerala STC Safety Inspection Records (2025)",
//     type: "Evidence",
//     date: "2025-11-20",
//     fileUrl: "/documents/stc-inspection-records.pdf",
//     checksum: "sha256:8b4d2f1e3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
//     preview: "Inspection records from the Kerala State Transport Corporation's 2025 safety audit. Documents compliance status and identified areas for improvement."
//   },
//   "DOC-011": {
//     id: "DOC-011",
//     title: "Calicut University Admissions Data (Anonymised) — 2024-2025",
//     type: "Institutional Record",
//     date: "2025-08-15",
//     fileUrl: "/documents/university-admissions-data.pdf",
//     checksum: "sha256:3c7a5e2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
//     preview: "Anonymised admission data for the 2024-2025 academic year. Includes demographic breakdowns and category-wise distribution."
//   },
//   "DOC-012": {
//     id: "DOC-012",
//     title: "MLA Asset Declaration — Beypore Constituency (2025)",
//     type: "Public Record",
//     date: "2025-12-20",
//     fileUrl: "/documents/mla-asset-declaration.pdf",
//     checksum: "sha256:7e2a1c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
//     preview: "Annual asset declaration filed by the elected representative for Beypore constituency. Includes movable and immovable assets, as required by public disclosure norms."
//   },
// };

// function fmtDate(iso) {
//   if (!iso) return "";
//   return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
// }

// /* ── COMPONENT ── */
// export default function SingleDocumentPage() {
//   const params = useParams();
//   const slug = params?.slug;
//   const [doc, setDoc] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (slug && DOCUMENTS_DB[slug]) {
//       setDoc(DOCUMENTS_DB[slug]);
//     }
//     setLoading(false);
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
//         <p className="font-garamond text-lg" style={{ color: "#9a8870" }}>Loading document...</p>
//       </div>
//     );
//   }

//   if (!doc) {
//     return (
//       <div className="min-h-screen bg-[#f5f0e8]">
//         <header style={{ background: "#1e2d4a", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
//           <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
//             <Link href="/document-room" className="font-mono-dm text-sm text-[#8a9bb8] hover:text-[#c8bfa8]">← Back to Document Room</Link>
//           </div>
//         </header>
//         <div className="max-w-4xl mx-auto px-6 py-20 text-center">
//           <p className="font-playfair text-2xl mb-4" style={{ color: "#1e2d4a" }}>Document not found</p>
//           <p className="font-garamond text-base" style={{ color: "#9a8870" }}>The requested document could not be located.</p>
//           <Link href="/document-room" className="inline-block mt-6 font-mono-dm text-xs uppercase px-6 py-3 bg-[#1e2d4a] text-[#f5f0e8]">Return to Document Room</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
//       <FontStyle />

//       {/* Simple top bar */}
//       <Header/>

//       <main className="max-w-5xl mx-auto px-6 py-8 pb-20">
//         {/* Breadcrumb */}
//         <p className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: "#9a8870" }}>
//           Public Record / <Link href="/document-room" className="hover:text-[#b8974a]">Document Room</Link> / {doc.id}
//         </p>

//         {/* Title */}
//         <h1 className="font-playfair font-black text-2xl md:text-4xl lg:text-5xl leading-tight mb-4" style={{ color: "#1e2d4a" }}>
//           {doc.title}
//         </h1>

//         {/* Metadata row */}
//         <div className="flex flex-wrap items-center gap-5 mb-8 pb-4 border-b border-[#d4c8b4]">
//           <div>
//             <p className="font-mono-dm text-[10px] md:text-xs tracking-widest uppercase mb-1" style={{ color: "#9a8870" }}>Type</p>
//             <span className="font-mono-dm text-xs md:text-sm px-2 py-0.5 border" style={{ color: "#7a6e5e", borderColor: "#c4b89a" }}>{doc.type}</span>
//           </div>
//           <div>
//             <p className="font-mono-dm text-[10px] md:text-xs tracking-widest uppercase mb-1" style={{ color: "#9a8870" }}>Date</p>
//             <p className="font-garamond text-xs md:text-sm" style={{ color: "#1e2d4a" }}>{fmtDate(doc.date)}</p>
//           </div>
//           <div>
//             <p className="font-mono-dm text-[10px] md:text-xs tracking-widest uppercase mb-1" style={{ color: "#9a8870" }}>Checksum</p>
//             <p className="font-mono-dm text-[10px] md:text-xs break-all" style={{ color: "#7a6e5e" }}>{doc.checksum}</p>
//           </div>
//           <div className="ml-auto">
//             <a
//               href={doc.fileUrl}
//               download
//               className="inline-flex items-center gap-2 font-mono-dm text-[10px] md:text-xs uppercase tracking-wider px-4 py-2 bg-[#1e2d4a] text-[#f5f0e8] hover:opacity-90 transition"
//             >
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                 <polyline points="7 10 12 15 17 10" />
//                 <line x1="12" y1="15" x2="12" y2="3" />
//               </svg>
//               Download PDF
//             </a>
//           </div>
//         </div>

//         {/* Document Preview */}
//         <div className="preview-container rounded-sm overflow-hidden">
//           <div className="preview-header px-4 py-2 flex items-center justify-between">
//             <span className="font-mono-dm text-xs uppercase tracking-wider" style={{ color: "#9a8870" }}>Document Preview</span>
//             <span className="font-mono-dm text-xs" style={{ color: "#9a8870" }}>PDF</span>
//           </div>
//           <div className="p-4 flex-1 bg-[#fefcf8]">
//             {/* In a real app, you'd embed a PDF viewer. Here we show a preview card */}
//             <div className="border border-[#e4ddd0] rounded-sm bg-white p-6 shadow-sm">
//               <div className="flex items-start gap-4">
//                 <div className="flex-shrink-0 w-12 h-12 bg-[#ede8dc] rounded flex items-center justify-center">
//                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8974a" strokeWidth="1.5">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                     <polyline points="14 2 14 8 20 8" />
//                     <line x1="16" y1="13" x2="8" y2="13" />
//                     <line x1="16" y1="17" x2="8" y2="17" />
//                     <polyline points="10 9 9 9 8 9" />
//                   </svg>
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-playfair font-bold text-md md:text-lg mb-1" style={{ color: "#1e2d4a" }}>{doc.title}</p>
//                   <p className="font-garamond text-xs md:text-sm mb-3" style={{ color: "#7a6e5e" }}>{doc.preview}</p>
//                   <div className="flex items-center gap-4 text-[7px] md:text-xs font-mono-dm">
//                     <span style={{ color: "#9a8870" }}>ID: {doc.id}</span>
//                     <span style={{ color: "#9a8870" }}>•</span>
//                     <span style={{ color: "#9a8870" }}>{doc.type}</span>
//                     <span style={{ color: "#9a8870" }}>•</span>
//                     <span style={{ color: "#9a8870" }}>{fmtDate(doc.date)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <p className="font-mono-dm text-xs text-center mt-6" style={{ color: "#b8b0a0" }}>
//               Full preview requires PDF viewer. <a href={doc.fileUrl} download className="text-[#b8974a] hover:underline">Download the document</a> to view the complete file.
//             </p>
//           </div>
//         </div>

//         {/* Additional metadata */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-[#ede8dc] p-4 border border-[#d4c8b4]">
//             <p className="font-mono-dm text-xs uppercase tracking-wider mb-2" style={{ color: "#9a8870" }}>Document Integrity</p>
//             <p className="font-mono-dm text-xs break-all" style={{ color: "#5a5048" }}>SHA-256: {doc.checksum}</p>
//             <p className="font-garamond text-xs mt-2 italic" style={{ color: "#7a6e5e" }}>This checksum verifies the document has not been altered since publication.</p>
//           </div>
//           <div className="bg-[#ede8dc] p-4 border border-[#d4c8b4]">
//             <p className="font-mono-dm text-xs uppercase tracking-wider mb-2" style={{ color: "#9a8870" }}>Source</p>
//             <p className="font-garamond text-sm" style={{ color: "#1e2d4a" }}>Journalism Society Public Record</p>
//             <p className="font-mono-dm text-xs mt-1" style={{ color: "#9a8870" }}>Published: {fmtDate(doc.date)}</p>
//           </div>
//         </div>

//         {/* Back link */}
//         <div className="mt-10 pt-6 border-t border-[#d4c8b4]">
//           <Link href="/document-room" className="font-mono-dm text-sm inline-flex items-center gap-1 hover:text-[#b8974a]" style={{ color: "#9a8870" }}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
//             Back to Document Room
//           </Link>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer/>
//     </div>
//   );
// }
// app/document-room/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiDownload, FiFileText, FiCalendar, FiTag, FiArrowLeft, FiCheck, FiX } from "react-icons/fi";
import documentsAPI from "@/services/documentsApi";

/* ── GOOGLE FONTS + CSS ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
    html { font-family: 'EB Garamond', Georgia, serif; }
    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm { font-family: 'DM Mono', monospace; }
    .preview-container {
      background: #faf6ee;
      border: 1px solid #d4c8b4;
      min-height: 300px;
      display: flex;
      flex-direction: column;
    }
    .preview-header {
      border-bottom: 1px solid #d4c8b4;
      background: #ede8dc;
    }
    @media (max-width: 640px) {
      .preview-container {
        min-height: 250px;
      }
    }
  `}</style>
);

function fmtDate(iso) {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

/* ── COMPONENT ── */
export default function SingleDocumentPage() {
  const params = useParams();
  const slug = params?.slug;
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (slug) {
      fetchDocument();
    }
  }, [slug]);

  const fetchDocument = async () => {
    setLoading(true);
    try {
      const data = await documentsAPI.getDocumentById(slug);
      setDoc(data);
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!doc || !doc.fileUrl) {
      setDownloadError("No file URL available");
      setTimeout(() => setDownloadError(null), 3000);
      return;
    }

    setDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

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
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("Download error:", error);
      setDownloadError(error.message);
      setTimeout(() => setDownloadError(null), 5000);
    } finally {
      setDownloading(false);
    }
  };

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

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="font-playfair text-xl sm:text-2xl mb-3 sm:mb-4" style={{ color: "#1e2d4a" }}>Document not found</p>
          <p className="font-garamond text-sm sm:text-base" style={{ color: "#9a8870" }}>The requested document could not be located.</p>
          <Link href="/document-room" className="inline-block mt-6 font-mono-dm text-xs uppercase px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1e2d4a] text-[#f5f0e8] hover:bg-[#2a3f6a] transition-colors">
            Return to Document Room
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
      <FontStyle />
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-16 sm:pb-20">
        {/* Breadcrumb */}
        <p className="font-mono-dm text-[0.65rem] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4" style={{ color: "#9a8870" }}>
          Public Record / <Link href="/document-room" className="hover:text-[#b8974a] transition-colors">Document Room</Link> / <span className="text-[#b8974a]">{doc.documentId || doc.id}</span>
        </p>

        {/* Title */}
        <h1 className="font-playfair font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-3 sm:mb-4" style={{ color: "#1e2d4a" }}>
          {doc.title}
        </h1>

        {/* Metadata row - Responsive */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-5 mb-6 sm:mb-8 pb-4 border-b border-[#d4c8b4]">
          <div>
            <p className="font-mono-dm text-[0.6rem] sm:text-xs tracking-widest uppercase mb-1" style={{ color: "#9a8870" }}>Type</p>
            <span className="font-mono-dm text-[0.7rem] sm:text-sm px-2 py-0.5 border" style={{ color: "#7a6e5e", borderColor: "#c4b89a" }}>{doc.type}</span>
          </div>
          <div>
            <p className="font-mono-dm text-[0.6rem] sm:text-xs tracking-widest uppercase mb-1" style={{ color: "#9a8870" }}>Date</p>
            <p className="font-garamond text-xs sm:text-sm" style={{ color: "#1e2d4a" }}>{fmtDate(doc.createdAt || doc.publishedDate)}</p>
          </div>
          {doc.sourceDocketNumber && (
            <div>
              <p className="font-mono-dm text-[0.6rem] sm:text-xs tracking-widest uppercase mb-1" style={{ color: "#9a8870" }}>Source Docket</p>
              <Link href={`/dockets/${doc.sourceDocketId}`} className="font-mono-dm text-[0.7rem] sm:text-sm text-[#b8974a] hover:underline">
                {doc.sourceDocketNumber}
              </Link>
            </div>
          )}
          <div className="sm:ml-auto w-full sm:w-auto mt-3 sm:mt-0">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono-dm text-xs uppercase tracking-wider px-4 py-2 bg-[#1e2d4a] text-[#f5f0e8] hover:bg-[#2a3f6a] transition disabled:opacity-50 cursor-pointer"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <FiDownload size={12} />
                  <span>Download Document</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Download Status Messages - Responsive */}
        {downloadSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded flex items-center gap-2">
            <FiCheck size={16} className="text-green-600 flex-shrink-0" />
            <p className="font-garamond text-xs sm:text-sm text-green-700">Document downloaded successfully!</p>
          </div>
        )}
        
        {downloadError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-center gap-2">
            <FiX size={16} className="text-red-600 flex-shrink-0" />
            <p className="font-garamond text-xs sm:text-sm text-red-700">Download failed: {downloadError}</p>
          </div>
        )}

        {/* Document Preview - Responsive */}
        <div className="preview-container rounded-sm overflow-hidden">
          <div className="preview-header px-3 sm:px-4 py-2 flex items-center justify-between">
            <span className="font-mono-dm text-[0.6rem] sm:text-xs uppercase tracking-wider" style={{ color: "#9a8870" }}>Document Preview</span>
            <span className="font-mono-dm text-[0.6rem] sm:text-xs" style={{ color: "#9a8870" }}>{doc.fileType?.split('/').pop() || 'PDF'}</span>
          </div>
          <div className="p-3 sm:p-4 flex-1 bg-[#fefcf8]">
            <div className="border border-[#e4ddd0] rounded-sm bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#ede8dc] rounded flex items-center justify-center">
                  <FiFileText size={20} className="sm:text-[28px] text-[#b8974a]" />
                </div>
                <div className="flex-1 w-full">
                  <p className="font-playfair font-bold text-sm sm:text-md md:text-lg mb-1" style={{ color: "#1e2d4a" }}>{doc.title}</p>
                  <p className="font-garamond text-xs sm:text-sm mb-3" style={{ color: "#7a6e5e" }}>{doc.description || doc.preview || "No description available."}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[0.6rem] sm:text-xs font-mono-dm">
                    <span style={{ color: "#9a8870" }}>ID: {doc.documentId || doc.id}</span>
                    <span style={{ color: "#9a8870" }}>•</span>
                    <span style={{ color: "#9a8870" }}>{doc.type}</span>
                    <span style={{ color: "#9a8870" }}>•</span>
                    <span style={{ color: "#9a8870" }}>{fmtDate(doc.createdAt || doc.publishedDate)}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="font-mono-dm text-[0.6rem] sm:text-xs text-center mt-4 sm:mt-6" style={{ color: "#b8b0a0" }}>
              Full preview requires file viewer. Click the download button to view the complete file.
            </p>
          </div>
        </div>

        {/* Additional metadata - Responsive Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {doc.checksum && (
            <div className="bg-[#ede8dc] p-3 sm:p-4 border border-[#d4c8b4]">
              <p className="font-mono-dm text-[0.6rem] sm:text-xs uppercase tracking-wider mb-2" style={{ color: "#9a8870" }}>Document Integrity</p>
              <p className="font-mono-dm text-[0.65rem] sm:text-xs break-all" style={{ color: "#5a5048" }}>SHA-256: {doc.checksum}</p>
              <p className="font-garamond text-[0.65rem] sm:text-xs mt-2 italic" style={{ color: "#7a6e5e" }}>This checksum verifies the document has not been altered since publication.</p>
            </div>
          )}
          <div className="bg-[#ede8dc] p-3 sm:p-4 border border-[#d4c8b4]">
            <p className="font-mono-dm text-[0.6rem] sm:text-xs uppercase tracking-wider mb-2" style={{ color: "#9a8870" }}>Source</p>
            <p className="font-garamond text-xs sm:text-sm" style={{ color: "#1e2d4a" }}>Journalism Society Public Record</p>
            <p className="font-mono-dm text-[0.6rem] sm:text-xs mt-1" style={{ color: "#9a8870" }}>Added: {fmtDate(doc.createdAt)}</p>
            {doc.fileSize && (
              <p className="font-mono-dm text-[0.6rem] sm:text-xs mt-1" style={{ color: "#9a8870" }}>Size: {(doc.fileSize / 1024).toFixed(1)} KB</p>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#d4c8b4]">
          <Link href="/document-room" className="font-mono-dm text-xs sm:text-sm inline-flex items-center gap-1 hover:text-[#b8974a] transition-colors" style={{ color: "#9a8870" }}>
            <FiArrowLeft size={14} />
            Back to Document Room
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}