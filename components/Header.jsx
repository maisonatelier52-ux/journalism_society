// // components/Header.jsx
// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import { FiSearch, FiMenu, FiX } from "react-icons/fi";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const searchRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (searchOpen && searchRef.current) {
//       searchRef.current.focus();
//     }
//     const handleKey = (e) => {
//       if (e.key === "Escape") {
//         setSearchOpen(false);
//         setSearchQuery("");
//       }
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [searchOpen]);

//   // Handle search submission
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       // You can implement your search logic here
//       // For example, redirect to search results page
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery("");
//     }
//   };

//   // Get current date
//   const getCurrentDate = () => {
//     const date = new Date();
//     return date.toLocaleDateString("en-GB", {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const navLinks = [
//     { name: "Dockets", href: "/dockets" },
//     { name: "Document Room", href: "/document-room" },
//     { name: "Press Releases", href: "/press-releases" },
//     { name: "Media Watch", href: "/media-watch" },
//     { name: "About", href: "/about" },
//      { name: "Standards", href: "/editorial-standards" },
//   ];

//   return (
//     <>
//       {/* Search Overlay */}
//       {searchOpen && (
//         <div
//           className="fixed inset-0 z-[300] bg-[#0a0f1e]/90 flex items-start justify-center pt-[100px]"
//           onClick={() => {
//             setSearchOpen(false);
//             setSearchQuery("");
//           }}
//         >
//           <div className="w-full max-w-2xl px-6" onClick={(e) => e.stopPropagation()}>
//             <p className="font-mono-dm text-[0.6rem] tracking-[0.15em] text-white/40 uppercase mb-4">
//               Search dockets, documents, and records
//             </p>
//             <form onSubmit={handleSearch}>
//               <input
//                 ref={searchRef}
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-transparent border-none border-b-2 border-white/50 font-playfair text-2xl md:text-3xl italic text-[#f5f0e8] py-3 outline-none placeholder:text-white/30"
//                 placeholder="Keyword, docket ID, or entity…"
//               />
//             </form>
//             <p className="font-mono-dm text-[0.58rem] text-white/25 mt-2.5 tracking-[0.1em]">
//               Press ESC to close • Enter to search
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Top Bar */}
//       <header className="bg-[#1e2d4a] border-b border-white/10">
//         <div className="max-w-6xl mx-auto px-6 h-11 flex items-center gap-5">
//           {/* Left info */}
//           <span className="font-mono-dm text-[0.58rem] tracking-[0.12em] text-[#8a9bb8] uppercase whitespace-nowrap">
//             {getCurrentDate()}
//           </span>
//           <div className="w-px h-5 bg-white/20 hidden md:block" />
//           <span className="font-mono-dm text-[0.58rem] tracking-[0.1em] text-[#8a9bb8] uppercase hidden md:block">
//             Free Public Record Platform
//           </span>

//           <div className="flex-1" />

//           {/* Right actions */}
//           <Link
//             href="#"
//             className="font-mono-dm text-[0.58rem] tracking-[0.12em] text-[#c8bfa8] uppercase hover:text-white transition-colors hidden md:block"
//           >
//             Join / Log In
//           </Link>
//           <Link
//             href="/submit"
//             className="font-mono-dm bg-[#b8974a] text-[#f5f0e8] px-3 py-1.5 text-[0.58rem] tracking-[0.1em] uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
//           >
//             Submit a Reply
//           </Link>
//           <button
//             onClick={() => setSearchOpen(true)}
//             className="bg-transparent border-none cursor-pointer text-[#c8bfa8] p-1 flex items-center hover:text-white transition-colors"
//             aria-label="Search"
//           >
//             <FiSearch size={15} />
//           </button>
//         </div>
//       </header>

//       {/* Main Navigation */}
//       <nav className="bg-[#f5f0e8] border-b-2 border-[#1e2d4a] sticky top-0 z-50">
//         <div className="max-w-6xl mx-auto px-6 h-13 flex items-center gap-8">
//           <Link
//             href="/"
//             className="font-playfair font-bold text-[1.15rem] text-[#1e2d4a] no-underline tracking-[-0.01em] whitespace-nowrap"
//           >
//             Journalism Society
//           </Link>
//           <div className="flex-1" />
          
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex gap-7 items-center">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#4a5568] hover:text-[#1e2d4a] transition-colors no-underline"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden bg-transparent border-none cursor-pointer p-1"
//             aria-label="Menu"
//           >
//             {menuOpen ? <FiX size={20} stroke="#1e2d4a" /> : <FiMenu size={20} stroke="#1e2d4a" />}
//           </button>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {menuOpen && (
//           <div className="md:hidden bg-[#f5f0e8] border-t border-[#d4c8b4] px-6 py-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="block font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-[#1e2d4a] py-2.5 border-b border-[#e4ddd0] no-underline"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             {/* Mobile Search Option */}
//             <button
//               onClick={() => {
//                 setMenuOpen(false);
//                 setSearchOpen(true);
//               }}
//               className="w-full text-left font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-[#1e2d4a] py-2.5 border-b border-[#e4ddd0] flex items-center gap-2"
//             >
//               <FiSearch size={14} />
//               Search
//             </button>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }


// components/Header.jsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiSearch, FiMenu, FiX, FiFileText, FiFolder, FiMic, FiBookOpen } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { searchAPI } from "@/services/api";

const TYPE_CONFIG = {
  docket:        { icon: FiFileText,  color: "#2d6a4f", bg: "#f0fdf4", label: "Docket" },
  document:      { icon: FiFolder,    color: "#b8974a", bg: "#fffbeb", label: "Document" },
  media:         { icon: FiMic,       color: "#1d4ed8", bg: "#eff6ff", label: "Media" },
  press_release: { icon: FiBookOpen,  color: "#7e22ce", bg: "#faf5ff", label: "Press Release" },
};

const STANCE_COLORS = {
  adversarial: "#b8190c",
  neutral:     "#6a7a94",
  supportive:  "#2d6a4f",
};

export default function Header() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [results, setResults]           = useState([]);
  const [loading, setLoading]           = useState(false);
  const [selectedIdx, setSelectedIdx]   = useState(-1);
  
  const searchRef    = useRef(null);
  const dropdownRef  = useRef(null);
  const debounceRef  = useRef(null);
  const router       = useRouter();

  // Focus input when overlay opens
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Debounced live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      setSelectedIdx(-1);
      return;
    }

    if (searchQuery.trim().length < 2) return;

    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchAPI.search(searchQuery);
        setResults(data.results || []);
        setSelectedIdx(-1);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(debounceRef.current);
  }, [searchQuery]);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setResults([]);
    setSelectedIdx(-1);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (selectedIdx >= 0 && results[selectedIdx]) {
        router.push(results[selectedIdx].href);
        closeSearch();
      } else if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        closeSearch();
      }
    }
  };

  const handleResultClick = (href) => {
    router.push(href);
    closeSearch();
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric",
      month: "long", year: "numeric",
    });
  };

  const navLinks = [
    { name: "Dockets",       href: "/dockets" },
    { name: "Document Room", href: "/document-room" },
    { name: "Press Releases",href: "/press-releases" },
    { name: "Media Watch",   href: "/media-watch" },
    { name: "About",         href: "/about" },
    { name: "Standards",     href: "/editorial-standards" },
  ];

  return (
    <>
      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[300] bg-[#0a0f1e]/92 flex flex-col items-center pt-[80px] px-4"
          onClick={closeSearch}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Search input */}
            <p className="font-mono-dm text-[0.6rem] tracking-[0.15em] text-white/40 uppercase mb-3">
              Search dockets, documents, media, and press releases
            </p>
            <div className="relative">
              <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none border-b-2 border-white/40 font-playfair text-2xl md:text-3xl italic text-[#f5f0e8] py-3 pl-8 pr-10 outline-none placeholder:text-white/25 focus:border-white/70 transition-colors"
                placeholder="Keyword, docket ID, or entity…"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setResults([]); searchRef.current?.focus(); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="font-mono-dm text-[0.56rem] text-white/25 tracking-[0.1em]">
                ↑↓ navigate · Enter to go · Esc to close
              </p>
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-white/30 border-t-white/70 animate-spin" />
                  <span className="font-mono-dm text-[0.54rem] text-white/40 uppercase tracking-wider">Searching…</span>
                </div>
              )}
            </div>

            {/* ── Live Results Dropdown ── */}
            {results.length > 0 && (
              <div
                ref={dropdownRef}
                className="mt-3 bg-[#f5f0e8] overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto"
                style={{ borderTop: "3px solid #b8974a" }}
              >
                {results.map((result, idx) => {
                  const config = TYPE_CONFIG[result.type] || TYPE_CONFIG.docket;
                  const Icon = config.icon;
                  const isSelected = idx === selectedIdx;

                  return (
                    <button
                      key={`${result.type}-${result._id}`}
                      onClick={() => handleResultClick(result.href)}
                      className="w-full text-left flex items-center gap-4 px-5 py-3.5 border-b border-[#e4ddd0] last:border-0 transition-colors"
                      style={{ background: isSelected ? "#ede8dc" : "transparent" }}
                      onMouseEnter={() => setSelectedIdx(idx)}
                    >
                      {/* Icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: config.bg }}
                      >
                        <Icon size={15} style={{ color: config.color }} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span
                            className="font-mono-dm text-[0.5rem] tracking-[0.1em] uppercase px-1.5 py-0.5"
                            style={{ background: config.bg, color: config.color }}
                          >
                            {config.label}
                          </span>
                          {result.id && (
                            <span className="font-mono-dm text-[0.52rem] text-[#9a8870] tracking-wider">
                              {result.id}
                            </span>
                          )}
                          {result.stance && (
                            <span
                              className="font-mono-dm text-[0.5rem] uppercase tracking-wider"
                              style={{ color: STANCE_COLORS[result.stance] }}
                            >
                              {result.stance}
                            </span>
                          )}
                          {result.status && (
                            <span className="font-mono-dm text-[0.5rem] text-[#9a8870] uppercase tracking-wider ml-auto">
                              {result.status}
                            </span>
                          )}
                        </div>
                        <p className="font-playfair font-bold text-sm text-[#1e2d4a] truncate">
                          {result.title}
                        </p>
                        {result.subtitle && (
                          <p className="font-garamond text-xs text-[#7a6e5e] italic truncate">
                            {result.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Arrow */}
                      <span className="font-mono-dm text-[#b8974a] text-sm flex-shrink-0 opacity-0 group-hover:opacity-100" style={{ opacity: isSelected ? 1 : 0 }}>
                        →
                      </span>
                    </button>
                  );
                })}

                {/* "View all results" footer */}
                <button
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                    closeSearch();
                  }}
                  className="w-full px-5 py-3 bg-[#1e2d4a] text-[#f5f0e8] font-mono-dm text-[0.58rem] tracking-[0.12em] uppercase text-center hover:bg-[#2a3f6a] transition-colors"
                >
                  View all results for "{searchQuery}" →
                </button>
              </div>
            )}

            {/* No results state */}
            {!loading && searchQuery.trim().length >= 2 && results.length === 0 && (
              <div className="mt-3 bg-[#f5f0e8] px-5 py-6 text-center" style={{ borderTop: "3px solid #b8974a" }}>
                <p className="font-playfair italic text-lg text-[#c4b89a] mb-1">No results found</p>
                <p className="font-garamond text-sm text-[#9a8870]">
                  Try a different keyword, or{" "}
                  <button
                    onClick={() => { router.push(`/search?q=${encodeURIComponent(searchQuery)}`); closeSearch(); }}
                    className="text-[#b8974a] underline"
                  >
                    search the full record
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Top Bar ── */}
      <header className="bg-[#1e2d4a] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-11 flex items-center gap-5">
          <span className="font-mono-dm text-[0.58rem] tracking-[0.12em] text-[#8a9bb8] uppercase whitespace-nowrap">
            {getCurrentDate()}
          </span>
          <div className="w-px h-5 bg-white/20 hidden md:block" />
          <span className="font-mono-dm text-[0.58rem] tracking-[0.1em] text-[#8a9bb8] uppercase hidden md:block">
            Free Public Record Platform
          </span>
          <div className="flex-1" />
          <Link href="#" className="font-mono-dm text-[0.58rem] tracking-[0.12em] text-[#c8bfa8] uppercase hover:text-white transition-colors hidden md:block">
            Join / Log In
          </Link>
          <Link href="/submit" className="font-mono-dm bg-[#b8974a] text-[#f5f0e8] px-3 py-1.5 text-[0.58rem] tracking-[0.1em] uppercase hover:opacity-90 transition-opacity whitespace-nowrap">
            Submit a Reply
          </Link>
          <button
            onClick={() => setSearchOpen(true)}
            className="bg-transparent border-none cursor-pointer text-[#c8bfa8] p-1 flex items-center hover:text-white transition-colors"
            aria-label="Search"
          >
            <FiSearch size={15} />
          </button>
        </div>
      </header>

      {/* ── Main Navigation ── */}
      <nav className="bg-[#f5f0e8] border-b-2 border-[#1e2d4a] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-13 flex items-center gap-8">
          <Link href="/" className="font-playfair font-bold text-[1.15rem] text-[#1e2d4a] no-underline tracking-[-0.01em] whitespace-nowrap">
            Journalism Society
          </Link>
          <div className="flex-1" />
          <div className="hidden md:flex gap-7 items-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}
                className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#4a5568] hover:text-[#1e2d4a] transition-colors no-underline">
                {link.name}
              </Link>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-transparent border-none cursor-pointer p-1" aria-label="Menu">
            {menuOpen ? <FiX size={20} stroke="#1e2d4a" /> : <FiMenu size={20} stroke="#1e2d4a" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#f5f0e8] border-t border-[#d4c8b4] px-6 py-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}
                className="block font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-[#1e2d4a] py-2.5 border-b border-[#e4ddd0] no-underline"
                onClick={() => setMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
              className="w-full text-left font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-[#1e2d4a] py-2.5 flex items-center gap-2">
              <FiSearch size={14} />
              Search
            </button>
          </div>
        )}
      </nav>
    </>
  );
}