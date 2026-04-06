// // app/press-releases/page.jsx
// "use client";

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { PRESS_RELEASES, CATEGORIES } from "../../public/data/pressReleases";
// import { FiCalendar, FiArrowRight } from "react-icons/fi";

// function formatDate(dateString) {
//   return new Date(dateString).toLocaleDateString("en-GB", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

// export default function PressReleasesPage() {
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredReleases = useMemo(() => {
//     let releases = PRESS_RELEASES;
    
//     if (categoryFilter !== "All") {
//       releases = releases.filter(r => r.category === categoryFilter);
//     }
    
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       releases = releases.filter(r => 
//         r.title.toLowerCase().includes(query) || 
//         r.excerpt.toLowerCase().includes(query) ||
//         r.tags.some(tag => tag.toLowerCase().includes(query))
//       );
//     }
    
//     return releases.sort((a, b) => new Date(b.date) - new Date(a.date));
//   }, [categoryFilter, searchQuery]);

//   return (
//     <div className="min-h-screen bg-[#f5f0e8]">
//       <Header />
      
//       <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
//         {/* Page Header */}
//         <div className="mb-12">
//           <p className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: "#9a8870" }}>
//             Public Record <span className="mx-2 opacity-40">/</span> Press Releases
//           </p>
//           <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
//             <h1 className="font-playfair leading-none">
//               <span className="block font-black text-5xl md:text-6xl" style={{ color: "#1e2d4a" }}>Press</span>
//               <span className="block font-normal italic text-5xl md:text-6xl" style={{ color: "#b8974a" }}>Releases</span>
//             </h1>
//             <p className="font-garamond italic text-base max-w-xs leading-relaxed" style={{ color: "#7a6e5e" }}>
//               Official announcements, updates, and statements from Journalism Society.
//             </p>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-0 border-b border-[#d4c8b4] pb-6">
//             <div>
//               <div className="mb-2 h-0.5 bg-[#1e2d4a]" />
//               <div className="font-playfair font-black text-4xl text-[#1e2d4a]">{PRESS_RELEASES.length}</div>
//               <div className="font-mono-dm text-xs tracking-widest uppercase mt-1 text-[#9a8870]">Total Releases</div>
//             </div>
//             <div>
//               <div className="mb-2 h-0.5 bg-[#b8974a]" />
//               <div className="font-playfair font-black text-4xl text-[#b8974a]">
//                 {new Date().getFullYear()}
//               </div>
//               <div className="font-mono-dm text-xs tracking-widest uppercase mt-1 text-[#9a8870]">Current Year</div>
//             </div>
//             <div>
//               <div className="mb-2 h-0.5 bg-[#2d6a4f]" />
//               <div className="font-playfair font-black text-4xl text-[#2d6a4f]">
//                 {PRESS_RELEASES.filter(r => r.category === "Announcement").length}
//               </div>
//               <div className="font-mono-dm text-xs tracking-widest uppercase mt-1 text-[#9a8870]">Announcements</div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="mb-8">
//           <div className="flex flex-wrap items-center gap-4 mb-4">
//             <span className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870]">Filter by:</span>
//             {CATEGORIES.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setCategoryFilter(cat)}
//                 className={`font-mono-dm text-xs tracking-wider uppercase px-3 py-1 border transition-all ${
//                   categoryFilter === cat
//                     ? "bg-[#1e2d4a] text-[#f5f0e8] border-[#1e2d4a]"
//                     : "bg-transparent text-[#7a6e5e] border-[#c4b89a] hover:bg-[#ede8dc]"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Search */}
//           <div className="relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search press releases by title, content, or tags..."
//               className="w-full bg-white border border-[#d4c8b4] px-4 py-2.5 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] transition-colors"
//               style={{ color: "#1e2d4a" }}
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8870] hover:text-[#1e2d4a] text-lg"
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-6 flex justify-between items-center">
//           <span className="font-mono-dm text-xs uppercase tracking-wider text-[#9a8870]">
//             Showing {filteredReleases.length} of {PRESS_RELEASES.length} releases
//           </span>
//         </div>

//         {/* Press Releases Grid */}
//         {filteredReleases.length === 0 ? (
//           <div className="text-center py-20 border border-[#d4c8b4]">
//             <p className="font-playfair italic text-2xl mb-2 text-[#c4b89a]">No press releases found</p>
//             <p className="font-garamond text-base text-[#9a8870]">Try adjusting your filters or search query.</p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {filteredReleases.map((release) => (
//               <Link
//                 key={release.id}
//                 href={`/press-releases/${release.id}`}
//                 className="group block border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all no-underline"
//               >
//                 <div className="p-6">
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">
//                       {release.category}
//                     </span>
//                     <div className="flex items-center gap-1.5 text-[#9a8870]">
//                       <FiCalendar size={12} />
//                       <span className="font-mono-dm text-xs">{formatDate(release.date)}</span>
//                     </div>
//                   </div>
                  
//                   <h2 className="font-playfair font-bold text-xl md:text-2xl text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
//                     {release.title}
//                   </h2>
                  
//                   <p className="font-garamond text-[#6a5e4e] leading-relaxed mb-4 line-clamp-2">
//                     {release.excerpt}
//                   </p>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex gap-2">
//                       {release.tags.slice(0, 2).map(tag => (
//                         <span key={tag} className="font-mono-dm text-[0.5rem] tracking-[0.08em] uppercase text-[#9a8870] border border-[#c4b89a] px-2 py-0.5">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                     <span className="font-mono-dm text-xs uppercase tracking-wider text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
//                       Read More <FiArrowRight size={12} />
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Newsletter Signup */}
//         <div className="mt-16 pt-8 border-t-2 border-[#1e2d4a]">
//           <div className="bg-[#ede8dc] border border-[#d4c8b4] p-6 md:p-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//               <div>
//                 <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">
//                   Subscribe to Press Releases
//                 </h3>
//                 <p className="font-garamond text-[#7a6e5e]">
//                   Get the latest announcements delivered to your inbox.
//                 </p>
//               </div>
//               <div className="flex gap-3 w-full md:w-auto">
//                 <input
//                   type="email"
//                   placeholder="Your email address"
//                   className="flex-1 md:w-64 bg-white border border-[#d4c8b4] px-4 py-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a]"
//                 />
//                 <button className="font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-[#f5f0e8] px-6 py-2 hover:bg-[#2a3f6a] transition-colors whitespace-nowrap">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// }


// app/press-releases/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiCalendar, FiArrowRight, FiSearch, FiX } from "react-icons/fi";
import pressReleaseAPI from "@/services/pressReleaseApi";

function formatDate(dateString) {
  if (!dateString) return "Date not available";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PressReleasesPage() {
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPressReleases();
  }, []);

  const fetchPressReleases = async () => {
    setLoading(true);
    try {
      const response = await pressReleaseAPI.getAllPressReleases();
      setPressReleases(response.releases || []);
    } catch (error) {
      console.error("Error fetching press releases:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from fetched data
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(pressReleases.map(r => r.category).filter(Boolean))];
    return cats;
  }, [pressReleases]);

  const filteredReleases = useMemo(() => {
    let releases = [...pressReleases];
    
    if (categoryFilter !== "All") {
      releases = releases.filter(r => r.category === categoryFilter);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      releases = releases.filter(r => 
        r.title?.toLowerCase().includes(query) || 
        r.excerpt?.toLowerCase().includes(query) ||
        r.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return releases.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [pressReleases, categoryFilter, searchQuery]);

  const clearSearch = () => setSearchQuery("");
  const clearFilters = () => {
    setCategoryFilter("All");
    setSearchQuery("");
  };

  const hasFilters = categoryFilter !== "All" || searchQuery;

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
    <div className="min-h-screen bg-[#f5f0e8]">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        {/* Page Header */}
        <div className="mb-12">
          <p className="font-mono-dm text-xs tracking-widest uppercase mb-4" style={{ color: "#9a8870" }}>
            Public Record <span className="mx-2 opacity-40">/</span> Press Releases
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <h1 className="font-playfair leading-none">
              <span className="block font-black text-5xl md:text-6xl" style={{ color: "#1e2d4a" }}>Press</span>
              <span className="block font-normal italic text-5xl md:text-6xl" style={{ color: "#b8974a" }}>Releases</span>
            </h1>
            <p className="font-garamond italic text-base max-w-xs leading-relaxed" style={{ color: "#7a6e5e" }}>
              Official announcements, updates, and statements from Journalism Society.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0 border-b border-[#d4c8b4] pb-6">
            <div>
              <div className="mb-2 h-0.5 bg-[#1e2d4a]" />
              <div className="font-playfair font-black text-4xl text-[#1e2d4a]">{pressReleases.length}</div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mt-1 text-[#9a8870]">Total Releases</div>
            </div>
            <div>
              <div className="mb-2 h-0.5 bg-[#b8974a]" />
              <div className="font-playfair font-black text-4xl text-[#b8974a]">
                {new Date().getFullYear()}
              </div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mt-1 text-[#9a8870]">Current Year</div>
            </div>
            <div>
              <div className="mb-2 h-0.5 bg-[#2d6a4f]" />
              <div className="font-playfair font-black text-4xl text-[#2d6a4f]">
                {pressReleases.filter(r => r.category === "Announcement").length}
              </div>
              <div className="font-mono-dm text-xs tracking-widest uppercase mt-1 text-[#9a8870]">Announcements</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870]">Filter by:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`font-mono-dm text-xs tracking-wider uppercase px-3 py-1 border transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-[#1e2d4a] text-[#f5f0e8] border-[#1e2d4a]"
                    : "bg-transparent text-[#7a6e5e] border-[#c4b89a] hover:bg-[#ede8dc]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search press releases by title, content, or tags..."
              className="w-full bg-white border border-[#d4c8b4] pl-10 pr-10 py-2.5 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] transition-colors"
              style={{ color: "#1e2d4a" }}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8870] hover:text-[#1e2d4a] text-lg cursor-pointer"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 font-mono-dm text-xs tracking-wider uppercase text-[#b8974a] hover:text-[#1e2d4a] transition-colors cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <span className="font-mono-dm text-xs uppercase tracking-wider text-[#9a8870]">
            Showing {filteredReleases.length} of {pressReleases.length} releases
          </span>
        </div>

        {/* Press Releases Grid */}
        {filteredReleases.length === 0 ? (
          <div className="text-center py-20 border border-[#d4c8b4]">
            <p className="font-playfair italic text-2xl mb-2 text-[#c4b89a]">No press releases found</p>
            <p className="font-garamond text-base text-[#9a8870]">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReleases.map((release) => (
              <Link
                key={release._id}
                href={`/press-releases/${release._id}`}
                className="group block border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all no-underline"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">
                      {release.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[#9a8870]">
                      <FiCalendar size={12} />
                      <span className="font-mono-dm text-xs">{formatDate(release.date)}</span>
                    </div>
                  </div>
                  
                  <h2 className="font-playfair font-bold text-xl md:text-2xl text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
                    {release.title}
                  </h2>
                  
                  <p className="font-garamond text-[#6a5e4e] leading-relaxed mb-4 line-clamp-2">
                    {release.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {release.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="font-mono-dm text-[0.5rem] tracking-[0.08em] uppercase text-[#9a8870] border border-[#c4b89a] px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono-dm text-xs uppercase tracking-wider text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <FiArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t-2 border-[#1e2d4a]">
          <div className="bg-[#ede8dc] border border-[#d4c8b4] p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">
                  Subscribe to Press Releases
                </h3>
                <p className="font-garamond text-[#7a6e5e]">
                  Get the latest announcements delivered to your inbox.
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 md:w-64 bg-white border border-[#d4c8b4] px-4 py-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a]"
                />
                <button className="font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-[#f5f0e8] px-6 py-2 hover:bg-[#2a3f6a] transition-colors whitespace-nowrap cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}