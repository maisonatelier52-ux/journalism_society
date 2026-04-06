// app/admin/press-releases/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch, 
  FiX, FiCalendar, FiTag, FiAlertTriangle, FiCheckCircle 
} from "react-icons/fi";
import adminAPI from "@/services/adminApi";

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", { 
    day: "2-digit", 
    month: "short", 
    year: "numeric" 
  });
};

export default function AdminPressReleasesPage() {
  const router = useRouter();
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [releaseToDelete, setReleaseToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPressReleases();
  }, []);

  const fetchPressReleases = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getPressReleases();
      setPressReleases(response.releases || []);
    } catch (error) {
      console.error("Error fetching press releases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (release) => {
    setReleaseToDelete(release);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!releaseToDelete) return;
    
    setDeleting(true);
    try {
      await adminAPI.deletePressRelease(releaseToDelete._id);
      await fetchPressReleases();
      setShowDeleteModal(false);
      setReleaseToDelete(null);
      alert("Press release deleted successfully");
    } catch (error) {
      console.error("Error deleting press release:", error);
      alert("Failed to delete press release");
    } finally {
      setDeleting(false);
    }
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(pressReleases.map(r => r.category).filter(Boolean))];
    return cats;
  }, [pressReleases]);

  // Filter and sort press releases
  const filteredReleases = useMemo(() => {
    let filtered = [...pressReleases];
    
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(r => 
        r.title?.toLowerCase().includes(query) || 
        r.excerpt?.toLowerCase().includes(query) ||
        r.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (categoryFilter !== "All") {
      filtered = filtered.filter(r => r.category === categoryFilter);
    }
    
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  }, [pressReleases, search, categoryFilter, sortBy]);

  const clearSearch = () => setSearch("");
  const clearAllFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setSortBy("newest");
  };

  const hasFilters = search || categoryFilter !== "All" || sortBy !== "newest";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair font-black text-3xl text-[#1e2d4a] mb-2">Press Releases</h1>
          <p className="font-garamond text-[#7a6e5e]">Manage official announcements and statements</p>
        </div>
        <Link
          href="/admin/press-releases/create"
          className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 py-2 font-mono-dm text-xs uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer"
        >
          <FiPlus size={14} />
          Create New Release
        </Link>
      </div>

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
              placeholder="Search by title, content, or tags..."
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

          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870]">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-[#c4b89a] bg-[#faf6ee] px-3 py-1.5 font-mono-dm text-xs uppercase tracking-wider focus:outline-none focus:border-[#1e2d4a] cursor-pointer text-gray-600"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
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
              Newest
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
          Showing {filteredReleases.length} of {pressReleases.length} releases
        </span>
      </div>

      {/* Press Releases Table */}
      {filteredReleases.length === 0 ? (
        <div className="border border-[#d4c8b4] bg-white p-12 text-center">
          <p className="font-playfair text-xl text-[#1e2d4a] mb-2">No press releases found</p>
          <p className="font-garamond text-[#9a8870]">
            {search || categoryFilter !== "All" 
              ? "Try adjusting your filters or search terms." 
              : "Click 'Create New Release' to add your first press release."}
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
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Category</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Date</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Tags</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Actions</th>
                 </tr>
              </thead>
              <tbody>
                {filteredReleases.map((release) => (
                  <tr key={release._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee]">
                    <td className="py-3 px-4">
                      <span className="font-mono-dm text-xs text-[#b8974a]">{release.id || release._id.slice(-8)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-playfair font-semibold text-sm text-[#1e2d4a]">{release.title}</p>
                      <p className="font-mono-dm text-xs text-[#9a8870] mt-1 line-clamp-1">{release.excerpt}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 text-xs font-mono-dm uppercase bg-[#1e2d4a] text-[#f5f0e8] rounded">
                        {release.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-[#9a8870]">
                        <FiCalendar size={12} />
                        <span className="font-mono-dm text-xs">{formatDate(release.date)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {release.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="font-mono-dm text-[0.5rem] tracking-[0.08em] uppercase text-[#9a8870] border border-[#c4b89a] px-1.5 py-0.5">
                            {tag}
                          </span>
                        ))}
                        {release.tags?.length > 2 && (
                          <span className="font-mono-dm text-[0.5rem] text-[#9a8870]">+{release.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <Link
                          href={`/press-releases/${release._id}`}
                          target="_blank"
                          className="text-[#b8974a] hover:text-[#1e2d4a] transition-colors cursor-pointer"
                          title="View"
                        >
                          <FiEye size={16} />
                        </Link>
                        <Link
                          href={`/admin/press-releases/edit/${release._id}`}
                          className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(release)}
                          className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && releaseToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f5f0e8] border-t-4 border-red-500 max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FiAlertTriangle size={20} className="text-red-500" />
                </div>
                <h3 className="font-playfair font-bold text-xl text-[#1e2d4a]">Delete Press Release</h3>
              </div>
              
              <p className="font-garamond text-[#7a6e5e] mb-4">
                Are you sure you want to delete "<strong>{releaseToDelete.title}</strong>"?
              </p>
              <p className="font-mono-dm text-xs text-red-600 mb-6">
                This action cannot be undone. This press release will be permanently removed from the public site.
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="font-mono-dm text-xs tracking-widest uppercase border border-[#c4b89a] text-[#7a6e5e] px-4 py-2 hover:bg-[#ede8dc] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="font-mono-dm text-xs tracking-widest uppercase bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {deleting ? "Deleting..." : "Delete Release"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}