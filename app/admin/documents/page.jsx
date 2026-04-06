// app/admin/documents/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FiSearch, FiDownload, FiFileText, FiX, FiEye } from "react-icons/fi";
import adminAPI from "@/services/adminApi";

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", { 
    day: "2-digit", 
    month: "short", 
    year: "numeric" 
  });
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [downloading, setDownloading] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getDocuments();
      const docs = Array.isArray(response) ? response : (response.documents || []);
      setDocuments(docs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!doc || !doc.fileUrl) {
      alert("No file URL available");
      return;
    }

    setDownloading(doc._id);

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
    } catch (error) {
      console.error("Download error:", error);
      alert(`Failed to download: ${error.message}`);
    } finally {
      setDownloading(null);
    }
  };

  // Get unique types from documents
  const typeList = useMemo(() => {
    const types = ["All", ...new Set(documents.map(d => d.type).filter(Boolean))];
    return types;
  }, [documents]);

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];
    
    // Apply search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title?.toLowerCase().includes(query) || 
        doc.documentId?.toLowerCase().includes(query) ||
        doc.type?.toLowerCase().includes(query) ||
        doc.description?.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (typeFilter !== "All") {
      filtered = filtered.filter(doc => doc.type === typeFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedDate || a.createdAt);
      const dateB = new Date(b.publishedDate || b.createdAt);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  }, [documents, search, typeFilter, sortBy]);

  const clearSearch = () => setSearch("");
  const clearAllFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setSortBy("newest");
  };

  const hasFilters = search || typeFilter !== "All" || sortBy !== "newest";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-playfair font-black text-3xl text-[#1e2d4a] mb-2">Documents</h1>
      <p className="font-garamond text-[#7a6e5e] mb-8">View and download Document Room files</p>

      {/* Search and Filter Bar */}
      <div className="mb-6 bg-[#ede8dc] border border-[#d4c8b4] p-4">
        <div className="flex flex-col md:flex-row items-center gap-4 flex-wrap">
          {/* Search input */}
          <div className="flex-1 min-w-[240px] relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, document ID, or type..."
              className="w-full bg-[#faf6ee] border-b-2 border-[#1e2d4a] pl-10 pr-8 py-2 font-garamond text-base text-[#1e2d4a] focus:outline-none"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8870] hover:text-[#1e2d4a] cursor-pointer"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <div className="w-px h-6 bg-[#c4b89a] hidden md:block" />

          {/* Type filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870]">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-[#c4b89a] bg-[#faf6ee] px-3 py-1.5 font-mono-dm text-xs uppercase tracking-wider focus:outline-none focus:border-[#1e2d4a] cursor-pointer text-gray-600"
            >
              {typeList.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="w-px h-6 bg-[#c4b89a] hidden md:block" />

          {/* Sort order */}
          <div className="flex items-center gap-2">
            <span className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870]">Sort:</span>
            <button
              onClick={() => setSortBy("newest")}
              className={`font-mono-dm text-xs uppercase tracking-wider px-2 py-1 transition-colors cursor-pointer ${
                sortBy === "newest" ? "text-[#1e2d4a] font-medium" : "text-[#9a8870] hover:text-[#1e2d4a]"
              }`}
            >
              Latest
            </button>
            <span className="text-[#9a8870]">·</span>
            <button
              onClick={() => setSortBy("oldest")}
              className={`font-mono-dm text-xs uppercase tracking-wider px-2 py-1 transition-colors cursor-pointer ${
                sortBy === "oldest" ? "text-[#1e2d4a] font-medium" : "text-[#9a8870] hover:text-[#1e2d4a]"
              }`}
            >
              Oldest
            </button>
          </div>

          {hasFilters && (
            <>
              <div className="w-px h-6 bg-[#c4b89a] hidden md:block" />
              <button
                onClick={clearAllFilters}
                className="font-mono-dm text-xs tracking-wider uppercase border border-dashed border-[#b8974a] text-[#b8974a] px-3 py-1 hover:bg-[#ede8dc] transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <span className="font-mono-dm text-xs uppercase tracking-wider text-[#9a8870]">
          Showing {filteredDocuments.length} of {documents.length} documents
        </span>
      </div>

      {/* Documents Table */}
      {filteredDocuments.length === 0 ? (
        <div className="border border-[#d4c8b4] bg-white p-12 text-center">
          <FiFileText size={48} className="mx-auto text-[#c4b89a] mb-3" />
          <p className="font-playfair text-xl text-[#1e2d4a] mb-2">No documents found</p>
          <p className="font-garamond text-[#9a8870]">
            {search || typeFilter !== "All" 
              ? "Try adjusting your filters or search terms." 
              : "Documents will appear here when added from dockets."}
          </p>
        </div>
      ) : (
        <div className="border border-[#d4c8b4] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
                <tr>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">ID</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Title</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Type</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Source Docket</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Date</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Action</th>
                 </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee]">
                    <td className="py-3 px-4">
                      <span className="font-mono-dm text-xs text-[#b8974a]">{doc.documentId}</span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-garamond text-sm text-[#1e2d4a] font-medium">{doc.title}</p>
                      {doc.description && (
                        <p className="font-mono-dm text-xs text-[#9a8870] mt-1 line-clamp-1">{doc.description}</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 text-xs font-mono-dm uppercase bg-[#ede8dc] text-[#7a6e5e] rounded">
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {doc.sourceDocketNumber ? (
                        <Link 
                          href={`/dockets/${doc.sourceDocketId}`} 
                          target="_blank"
                          className="font-mono-dm text-xs text-[#b8974a] hover:underline flex items-center gap-1"
                        >
                          {doc.sourceDocketNumber}
                          <FiEye size={10} />
                        </Link>
                      ) : (
                        <span className="font-mono-dm text-xs text-[#c4b89a]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono-dm text-xs text-[#9a8870]">{formatDate(doc.publishedDate || doc.createdAt)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={(e) => handleDownload(doc, e)}
                        disabled={downloading === doc._id}
                        className="text-[#b8974a] hover:text-[#1e2d4a] transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1"
                        title="Download"
                      >
                        {downloading === doc._id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-[#b8974a] border-t-transparent"></div>
                            <span className="font-mono-dm text-xs">Downloading...</span>
                          </>
                        ) : (
                          <>
                            <FiDownload size={14} />
                            <span className="font-mono-dm text-xs">Download</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 p-4 bg-[#ede8dc] border border-[#d4c8b4]">
        <p className="font-mono-dm text-xs text-[#9a8870]">
          💡 Documents are automatically created when exhibits are added to dockets. You can also upload documents directly.
        </p>
      </div>
    </div>
  );
}