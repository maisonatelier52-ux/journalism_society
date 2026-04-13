
// // app/search/page.jsx
// "use client";

// import { useState, useEffect, useCallback, useRef, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { 
//   FiSearch, FiFileText, FiFile, FiMic, FiBookOpen,
//   FiArrowRight, FiCalendar, FiTag, FiX
// } from "react-icons/fi";
// import { searchAPI } from "@/services/api";

// /* ── FONTS ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm  { font-family: 'DM Mono', monospace; }
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(8px); }
//       to   { opacity: 1; transform: translateY(0); }
//     }
//     .result-item { animation: fadeIn 0.25s ease forwards; }
//     @keyframes shimmer {
//       0%   { background-position: -600px 0; }
//       100% { background-position:  600px 0; }
//     }
//     .skeleton {
//       background: linear-gradient(90deg, #e4ddd0 25%, #ede8dc 50%, #e4ddd0 75%);
//       background-size: 600px 100%;
//       animation: shimmer 1.4s infinite;
//       border-radius: 2px;
//     }
//   `}</style>
// );

// const CATEGORY_CONFIG = {
//   docket:        { label: "Docket",        icon: FiFileText,  color: "#1e2d4a", bg: "#ede8dc",  accent: "#1e2d4a" },
//   document:      { label: "Document",      icon: FiFile,      color: "#b8974a", bg: "#faf6ee",  accent: "#b8974a" },
//   press_release: { label: "Press Release", icon: FiBookOpen,  color: "#2d6a4f", bg: "#f0fdf4",  accent: "#2d6a4f" },
//   media:         { label: "Media Watch",   icon: FiMic,       color: "#b8190c", bg: "#fef2f2",  accent: "#b8190c" },
// };

// const STANCE_COLORS = {
//   adversarial: "#b8190c",
//   neutral:     "#6a7a94",
//   supportive:  "#2d6a4f",
// };

// const fmtDate = (iso) => {
//   if (!iso) return "N/A";
//   return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// };

// /* ── SKELETON CARDS ── */
// function SkeletonResult() {
//   return (
//     <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5">
//       <div className="flex items-center gap-2 mb-3">
//         <div className="skeleton h-5 w-20" />
//         <div className="skeleton h-5 w-16" />
//         <div className="skeleton h-4 w-24 ml-auto" />
//       </div>
//       <div className="skeleton h-6 w-full mb-2" />
//       <div className="skeleton h-4 w-4/5 mb-1" />
//       <div className="skeleton h-4 w-3/5 mb-3" />
//       <div className="flex justify-between">
//         <div className="skeleton h-4 w-28" />
//         <div className="skeleton h-4 w-20" />
//       </div>
//     </div>
//   );
// }

// /* ── RESULT CARDS ── */
// function DocketResult({ result }) {
//   return (
//     <Link href={result.href} className="block group result-item">
//       <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5 hover:bg-white hover:shadow-md transition-all">
//         <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
//           <div className="flex items-center gap-2 flex-wrap">
//             <span className="font-mono-dm text-xs bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">{result.id}</span>
//             {result.subtitle && (
//               <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.subtitle}</span>
//             )}
//             {result.status && (
//               <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.status}</span>
//             )}
//           </div>
//         </div>
//         <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
//           {result.title}
//         </h3>
//         <div className="flex items-center justify-end">
//           <span className="font-mono-dm text-xs uppercase text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
//             View Docket <FiArrowRight size={12} />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function DocumentResult({ result }) {
//   return (
//     <Link href={result.href} className="block group result-item">
//       <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5 hover:bg-white hover:shadow-md transition-all">
//         <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
//           <div className="flex items-center gap-2 flex-wrap">
//             <span className="font-mono-dm text-xs bg-[#b8974a] text-[#f5f0e8] px-2 py-0.5">{result.id}</span>
//             {result.subtitle && (
//               <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.subtitle}</span>
//             )}
//           </div>
//         </div>
//         <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
//           {result.title}
//         </h3>
//         <div className="flex items-center justify-end">
//           <span className="font-mono-dm text-xs uppercase text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
//             View Document <FiArrowRight size={12} />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function PressResult({ result }) {
//   return (
//     <Link href={result.href} className="block group result-item">
//       <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5 hover:bg-white hover:shadow-md transition-all">
//         <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
//           <div className="flex items-center gap-2 flex-wrap">
//             <span className="font-mono-dm text-xs bg-[#2d6a4f] text-[#f5f0e8] px-2 py-0.5">{result.id}</span>
//             {result.subtitle && (
//               <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.subtitle}</span>
//             )}
//           </div>
//         </div>
//         <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
//           {result.title}
//         </h3>
//         <div className="flex justify-end">
//           <span className="font-mono-dm text-xs uppercase text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
//             Read Release <FiArrowRight size={12} />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function MediaResult({ result }) {
//   return (
//     <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5 hover:bg-white hover:shadow-md transition-all result-item">
//       <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
//         <div className="flex items-center gap-2 flex-wrap">
//           <span className="font-mono-dm text-xs bg-[#b8190c] text-[#f5f0e8] px-2 py-0.5">{result.id}</span>
//           {result.subtitle && (
//             <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.subtitle}</span>
//           )}
//           {result.stance && (
//             <span className="font-mono-dm text-xs uppercase" style={{ color: STANCE_COLORS[result.stance] }}>
//               {result.stance}
//             </span>
//           )}
//         </div>
//       </div>
//       <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2">{result.title}</h3>
//     </div>
//   );
// }

// function ResultCard({ result }) {
//   switch (result.type) {
//     case "docket":        return <DocketResult result={result} />;
//     case "document":      return <DocumentResult result={result} />;
//     case "press_release": return <PressResult result={result} />;
//     case "media":         return <MediaResult result={result} />;
//     default:              return null;
//   }
// }

// /* ── SEARCH CONTENT ── */
// function SearchContent() {
//   const searchParams = useSearchParams();
//   const router       = useRouter();
//   const initialQuery = searchParams.get("q") || "";

//   const [searchInput,   setSearchInput]   = useState(initialQuery);
//   const [committedQuery, setCommittedQuery] = useState(initialQuery);
//   const [liveResults,   setLiveResults]   = useState([]);
//   const [fullResults,   setFullResults]   = useState({ dockets: [], documents: [], press: [], media: [], total: 0 });
//   const [loading,       setLoading]       = useState(false);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [showDropdown,  setShowDropdown]  = useState(false);

//   const debounceRef = useRef(null);
//   const inputRef    = useRef(null);

//   // Group full results by type
//   const groupResults = (results) => {
//     const dockets       = results.filter(r => r.type === "docket");
//     const documents     = results.filter(r => r.type === "document");
//     const press         = results.filter(r => r.type === "press_release");
//     const media         = results.filter(r => r.type === "media");
//     return { dockets, documents, press, media, total: results.length };
//   };

//   // Run search on page load if query in URL
//   useEffect(() => {
//     if (initialQuery.trim().length >= 2) {
//       runFullSearch(initialQuery);
//     }
//   }, [initialQuery]);

//   // Live dropdown search (debounced)
//   useEffect(() => {
//     if (!searchInput.trim() || searchInput.trim().length < 2) {
//       setLiveResults([]);
//       setShowDropdown(false);
//       return;
//     }

//     clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(async () => {
//       try {
//         const data = await searchAPI.search(searchInput);
//         setLiveResults((data.results || []).slice(0, 6));
//         setShowDropdown(true);
//       } catch (err) {
//         console.error("Live search error:", err);
//       }
//     }, 280);

//     return () => clearTimeout(debounceRef.current);
//   }, [searchInput]);

//   const runFullSearch = useCallback(async (q) => {
//     if (!q.trim()) return;
//     setLoading(true);
//     setShowDropdown(false);
//     try {
//       const data = await searchAPI.search(q);
//       setFullResults(groupResults(data.results || []));
//       setCommittedQuery(q);
//     } catch (err) {
//       console.error("Full search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!searchInput.trim()) return;
//     router.push(`/search?q=${encodeURIComponent(searchInput)}`);
//     runFullSearch(searchInput);
//   };

//   const handleResultClick = (href) => {
//     setShowDropdown(false);
//     router.push(href);
//   };

//   const categoryCounts = {
//     all:      fullResults.total,
//     dockets:  fullResults.dockets.length,
//     documents: fullResults.documents.length,
//     press:    fullResults.press.length,
//     media:    fullResults.media.length,
//   };

//   const getActiveResults = () => {
//     switch (activeCategory) {
//       case "dockets":   return fullResults.dockets;
//       case "documents": return fullResults.documents;
//       case "press":     return fullResults.press;
//       case "media":     return fullResults.media;
//       default:          return null; // "all" renders grouped sections
//     }
//   };

//   const TABS = [
//     { key: "all",       label: "All Results",    icon: FiSearch   },
//     { key: "dockets",   label: "Dockets",        icon: FiFileText },
//     { key: "documents", label: "Documents",      icon: FiFile     },
//     { key: "press",     label: "Press Releases", icon: FiBookOpen },
//     { key: "media",     label: "Media Watch",    icon: FiMic      },
//   ];

//   return (
//     <>
//       {/* ── Banner ── */}
//       <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
//         <div className="max-w-6xl mx-auto px-6 py-12">
//           <p className="font-mono-dm text-xs tracking-[0.16em] text-[#3a4e6a] uppercase mb-4">
//             Public Record / Search
//           </p>
//           <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6">
//             Search the<br />
//             <em className="text-[#b8974a] font-normal">Public Record</em>
//           </h1>

//           {/* Search form with live dropdown */}
//           <div className="relative max-w-2xl">
//             <form onSubmit={handleSubmit}>
//               <div className="relative">
//                 <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8870]" size={20} />
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value)}
//                   onFocus={() => liveResults.length > 0 && setShowDropdown(true)}
//                   onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
//                   className="w-full bg-[#faf6ee] border border-[#d4c8b4] pl-12 pr-28 py-4 font-garamond text-lg text-[#1e2d4a] focus:outline-none focus:border-[#b8974a] transition-colors"
//                   placeholder="Docket ID, organisation, keyword…"
//                   autoFocus
//                 />
//                 <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
//                   {searchInput && (
//                     <button type="button" onClick={() => { setSearchInput(""); setLiveResults([]); setShowDropdown(false); inputRef.current?.focus(); }}
//                       className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer">
//                       <FiX size={16} />
//                     </button>
//                   )}
//                   <button type="submit"
//                     className="bg-[#b8974a] text-[#f5f0e8] font-mono-dm text-xs uppercase tracking-wider px-3 py-1.5 hover:opacity-90 transition-opacity cursor-pointer">
//                     Search
//                   </button>
//                 </div>
//               </div>
//             </form>

//             {/* ── Live Dropdown ── */}
//             {showDropdown && liveResults.length > 0 && (
//               <div className="absolute top-full left-0 right-0 mt-1 bg-[#f5f0e8] shadow-2xl z-50 overflow-hidden"
//                 style={{ borderTop: "3px solid #b8974a" }}>
//                 {liveResults.map((result, idx) => {
//                   const config = CATEGORY_CONFIG[result.type] || CATEGORY_CONFIG.docket;
//                   const Icon   = config.icon;
//                   return (
//                     <button key={`${result.type}-${result._id}-${idx}`}
//                       onMouseDown={() => handleResultClick(result.href)}
//                       className="w-full text-left flex items-center gap-3 px-4 py-3 border-b border-[#e4ddd0] last:border-0 hover:bg-[#ede8dc] transition-colors cursor-pointer">
//                       <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
//                         style={{ background: config.bg }}>
//                         <Icon size={13} style={{ color: config.color }} />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-0.5">
//                           <span className="font-mono-dm text-[0.5rem] uppercase tracking-wider px-1.5 py-0.5"
//                             style={{ background: config.bg, color: config.color }}>
//                             {config.label}
//                           </span>
//                           {result.id && (
//                             <span className="font-mono-dm text-[0.5rem] text-[#9a8870]">{result.id}</span>
//                           )}
//                         </div>
//                         <p className="font-playfair font-bold text-sm text-[#1e2d4a] truncate">{result.title}</p>
//                         {result.subtitle && (
//                           <p className="font-garamond text-xs text-[#7a6e5e] italic truncate">{result.subtitle}</p>
//                         )}
//                       </div>
//                       <FiArrowRight size={12} className="text-[#b8974a] flex-shrink-0" />
//                     </button>
//                   );
//                 })}
//                 <button onMouseDown={handleSubmit}
//                   className="w-full px-4 py-2.5 bg-[#1e2d4a] text-[#f5f0e8] font-mono-dm text-[0.58rem] tracking-[0.12em] uppercase text-center hover:bg-[#2a3f6a] transition-colors cursor-pointer">
//                   View all results for "{searchInput}" →
//                 </button>
//               </div>
//             )}
//           </div>

//           <p className="font-mono-dm text-[0.56rem] text-[#3a4e6a] mt-3 tracking-wider uppercase">
//             Search across dockets, documents, press releases, and media coverage
//           </p>
//         </div>
//       </div>

//       {/* ── Results ── */}
//       <main className="max-w-6xl mx-auto px-6 py-12 pb-20">

//         {/* Empty state — no query yet */}
//         {!committedQuery && !loading && (
//           <div className="text-center py-24">
//             <FiSearch size={56} className="mx-auto text-[#c4b89a] mb-4" />
//             <p className="font-playfair text-2xl text-[#1e2d4a] mb-2">Enter a search term above</p>
//             <p className="font-garamond text-[#9a8870]">Search across all dockets, documents, press releases, and media coverage</p>
//           </div>
//         )}

//         {/* Loading skeletons */}
//         {loading && (
//           <div>
//             <div className="skeleton h-5 w-48 mb-8" />
//             <div className="grid gap-4">
//               {Array.from({ length: 5 }).map((_, i) => <SkeletonResult key={i} />)}
//             </div>
//           </div>
//         )}

//         {/* Results */}
//         {!loading && committedQuery && (
//           <>
//             {/* Summary + tabs */}
//             <div className="mb-6 pb-4 border-b border-[#d4c8b4]">
//               <p className="font-mono-dm text-sm text-[#9a8870] mb-4">
//                 {fullResults.total === 0
//                   ? `No results found for "${committedQuery}"`
//                   : <>Found <span className="text-[#b8974a] font-bold">{fullResults.total}</span> results for "{committedQuery}"</>
//                 }
//               </p>

//               {fullResults.total > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {TABS.map(tab => {
//                     const Icon    = tab.icon;
//                     const count   = categoryCounts[tab.key];
//                     const isActive = activeCategory === tab.key;
//                     if (tab.key !== "all" && count === 0) return null;
//                     return (
//                       <button key={tab.key} onClick={() => setActiveCategory(tab.key)}
//                         className={`flex items-center gap-2 px-3 py-1.5 font-mono-dm text-xs tracking-wider uppercase transition-all ${
//                           isActive ? "bg-[#1e2d4a] text-[#f5f0e8]" : "bg-transparent text-[#7a6e5e] hover:bg-[#ede8dc] cursor-pointer"
//                         }`}>
//                         <Icon size={13} />
//                         {tab.label}
//                         <span className={`px-1.5 py-0.5 text-xs ${isActive ? "bg-[#f5f0e8] text-[#1e2d4a]" : "bg-[#ede8dc] text-[#7a6e5e]"}`}>
//                           {count}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             {/* No results */}
//             {fullResults.total === 0 && (
//               <div className="text-center py-20">
//                 <p className="font-playfair text-3xl text-[#c4b89a] mb-4">No results found</p>
//                 <p className="font-garamond text-lg text-[#9a8870] mb-2">Nothing matched "{committedQuery}"</p>
//                 <p className="font-mono-dm text-sm text-[#7a6e5e]">Try different keywords or check your spelling</p>
//               </div>
//             )}

//             {/* Filtered single category */}
//             {activeCategory !== "all" && getActiveResults()?.length > 0 && (
//               <div className="grid gap-4">
//                 {getActiveResults().map((result, idx) => (
//                   <ResultCard key={`${result.type}-${result._id || idx}`} result={result} />
//                 ))}
//               </div>
//             )}

//             {/* All results grouped */}
//             {activeCategory === "all" && fullResults.total > 0 && (
//               <div className="space-y-10">
//                 {[
//                   { key: "dockets",   label: "Dockets",        icon: FiFileText, items: fullResults.dockets,   color: "#1e2d4a" },
//                   { key: "documents", label: "Documents",      icon: FiFile,     items: fullResults.documents,  color: "#b8974a" },
//                   { key: "press",     label: "Press Releases", icon: FiBookOpen, items: fullResults.press,      color: "#2d6a4f" },
//                   { key: "media",     label: "Media Watch",    icon: FiMic,      items: fullResults.media,      color: "#b8190c" },
//                 ].filter(s => s.items.length > 0).map(section => {
//                   const Icon = section.icon;
//                   return (
//                     <div key={section.key}>
//                       <div className="flex items-center gap-3 mb-4">
//                         <Icon size={18} style={{ color: section.color }} />
//                         <h2 className="font-playfair font-bold text-xl text-[#1e2d4a]">{section.label}</h2>
//                         <span className="font-mono-dm text-xs bg-[#ede8dc] px-2 py-0.5 text-[#7a6e5e]">
//                           {section.items.length} results
//                         </span>
//                       </div>
//                       <div className="grid gap-4">
//                         {section.items.slice(0, 5).map((result, idx) => (
//                           <ResultCard key={`${result.type}-${result._id || idx}`} result={result} />
//                         ))}
//                         {section.items.length > 5 && (
//                           <button onClick={() => setActiveCategory(section.key)}
//                             className="text-center font-mono-dm text-sm text-[#b8974a] hover:text-[#1e2d4a] transition-colors py-2">
//                             View all {section.items.length} {section.label.toLowerCase()} results →
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Search tips */}
//             {fullResults.total > 0 && (
//               <div className="mt-12 pt-8 border-t border-[#d4c8b4]">
//                 <div className="bg-[#ede8dc] border border-[#d4c8b4] p-5">
//                   <p className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870] mb-3">Search Tips</p>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="font-garamond text-sm text-[#1e2d4a] font-semibold mb-1">Try searching by:</p>
//                       <ul className="space-y-1 text-sm text-[#7a6e5e] font-garamond">
//                         <li>• Docket ID (e.g., JS-2026-003)</li>
//                         <li>• Organisation name</li>
//                         <li>• Publication name</li>
//                         <li>• Document title or type</li>
//                       </ul>
//                     </div>
//                     <div>
//                       <p className="font-garamond text-sm text-[#1e2d4a] font-semibold mb-1">Use the tabs to filter:</p>
//                       <ul className="space-y-1 text-sm text-[#7a6e5e] font-garamond">
//                         <li>• Use category tabs to narrow results</li>
//                         <li>• Combine terms for better results</li>
//                         <li>• Check spelling for accuracy</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </main>
//     </>
//   );
// }

// /* ── LOADING FALLBACK ── */
// function SearchLoading() {
//   return (
//     <div className="min-h-screen bg-[#f5f0e8]">
//       <Header />
//       <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
//         <div className="max-w-6xl mx-auto px-6 py-12">
//           <div className="skeleton h-4 w-32 mb-4" />
//           <div className="skeleton h-16 w-96 mb-6" />
//           <div className="skeleton h-14 w-full max-w-2xl" />
//         </div>
//       </div>
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         <div className="grid gap-4">
//           {Array.from({ length: 4 }).map((_, i) => <SkeletonResult key={i} />)}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// /* ── PAGE ── */
// export default function SearchPage() {
//   return (
//     <div className="min-h-screen bg-[#f5f0e8]">
//       <FontStyle />
//       <Header />
//       <Suspense fallback={<SearchLoading />}>
//         <SearchContent />
//       </Suspense>
//       <Footer />
//     </div>
//   );
// }

// app/search/page.jsx
// Note: search pages often need dynamic metadata based on query param.
// This uses generateMetadata for dynamic title based on search query.
import SearchClient from "@/components/SearchClient";
import { Suspense } from "react";


const SITE_URL = "https://journalism-society.vercel.app";

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q || "";
  return {
    title: q
      ? `Search results for "${q}" | Journalism Society`
      : "Search the Public Record | Journalism Society",
    description:
      "Search across all Journalism Society dockets, documents, press releases, and media coverage. Find any Right of Reply record by keyword, docket ID, or organisation name.",
    keywords: ["search journalism society", "search public record India", "find dockets India"],
    alternates: { canonical: q ? `${SITE_URL}/search?q=${encodeURIComponent(q)}` : `${SITE_URL}/search` },
    robots: { index: q ? false : true, follow: true },
    openGraph: {
      title: q ? `Search: "${q}" | Journalism Society` : "Search the Public Record | Journalism Society",
      description: "Find any docket, document, or media coverage in Journalism Society's public record.",
      url: `${SITE_URL}/search`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Search Journalism Society" }],
    },
    twitter: {
      card: "summary",
      title: q ? `Search: "${q}" | Journalism Society` : "Search the Public Record | Journalism Society",
      description: "Search dockets, documents, and media coverage in our permanent public record.",
    },
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Search", item: `${SITE_URL}/search` },
  ],
};

export default function SearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Suspense>
        <SearchClient />
      </Suspense>
    </>
  );
}