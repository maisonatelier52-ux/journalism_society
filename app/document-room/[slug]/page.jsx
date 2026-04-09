
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