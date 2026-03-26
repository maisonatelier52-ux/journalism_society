// components/Header.jsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement your search logic here
      // For example, redirect to search results page
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Get current date
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const navLinks = [
    { name: "Dockets", href: "/dockets" },
    { name: "Document Room", href: "/document-room" },
    { name: "Press Releases", href: "/press-releases" },
    { name: "Media Watch", href: "/media-watch" },
    { name: "About", href: "/about" },
     { name: "Standards", href: "/editorial-standards" },
  ];

  return (
    <>
      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[300] bg-[#0a0f1e]/90 flex items-start justify-center pt-[100px]"
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
        >
          <div className="w-full max-w-2xl px-6" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono-dm text-[0.6rem] tracking-[0.15em] text-white/40 uppercase mb-4">
              Search dockets, documents, and records
            </p>
            <form onSubmit={handleSearch}>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none border-b-2 border-white/50 font-playfair text-2xl md:text-3xl italic text-[#f5f0e8] py-3 outline-none placeholder:text-white/30"
                placeholder="Keyword, docket ID, or entity…"
              />
            </form>
            <p className="font-mono-dm text-[0.58rem] text-white/25 mt-2.5 tracking-[0.1em]">
              Press ESC to close • Enter to search
            </p>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <header className="bg-[#1e2d4a] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-11 flex items-center gap-5">
          {/* Left info */}
          <span className="font-mono-dm text-[0.58rem] tracking-[0.12em] text-[#8a9bb8] uppercase whitespace-nowrap">
            {getCurrentDate()}
          </span>
          <div className="w-px h-5 bg-white/20 hidden md:block" />
          <span className="font-mono-dm text-[0.58rem] tracking-[0.1em] text-[#8a9bb8] uppercase hidden md:block">
            Free Public Record Platform
          </span>

          <div className="flex-1" />

          {/* Right actions */}
          <Link
            href="#"
            className="font-mono-dm text-[0.58rem] tracking-[0.12em] text-[#c8bfa8] uppercase hover:text-white transition-colors hidden md:block"
          >
            Join / Log In
          </Link>
          <Link
            href="/submit"
            className="font-mono-dm bg-[#b8974a] text-[#f5f0e8] px-3 py-1.5 text-[0.58rem] tracking-[0.1em] uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
          >
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

      {/* Main Navigation */}
      <nav className="bg-[#f5f0e8] border-b-2 border-[#1e2d4a] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-13 flex items-center gap-8">
          <Link
            href="/"
            className="font-playfair font-bold text-[1.15rem] text-[#1e2d4a] no-underline tracking-[-0.01em] whitespace-nowrap"
          >
            Journalism Society
          </Link>
          <div className="flex-1" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-7 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#4a5568] hover:text-[#1e2d4a] transition-colors no-underline"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-transparent border-none cursor-pointer p-1"
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={20} stroke="#1e2d4a" /> : <FiMenu size={20} stroke="#1e2d4a" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-[#f5f0e8] border-t border-[#d4c8b4] px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-[#1e2d4a] py-2.5 border-b border-[#e4ddd0] no-underline"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Search Option */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full text-left font-mono-dm text-[0.65rem] tracking-[0.1em] uppercase text-[#1e2d4a] py-2.5 border-b border-[#e4ddd0] flex items-center gap-2"
            >
              <FiSearch size={14} />
              Search
            </button>
          </div>
        )}
      </nav>
    </>
  );
}