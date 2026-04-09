

// app/page.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import docketsAPI from "@/services/docketsApi";
import mediaAPI from "@/services/mediaApi";
import documentsAPI from "@/services/documentsApi";
import pressReleaseAPI from "@/services/pressReleaseApi";

const SECTIONS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect x="4" y="6" width="22" height="28" rx="1" stroke="#1e2d4a" strokeWidth="2" fill="#e8e0d0" />
        <line x1="8" y1="13" x2="22" y2="13" stroke="#1e2d4a" strokeWidth="1.5" />
        <line x1="8" y1="18" x2="22" y2="18" stroke="#1e2d4a" strokeWidth="1.5" />
        <line x1="8" y1="23" x2="17" y2="23" stroke="#1e2d4a" strokeWidth="1.5" />
        <rect x="18" y="20" width="18" height="14" rx="1" stroke="#1e2d4a" strokeWidth="1.5" fill="#c8b89a" />
        <line x1="21" y1="24" x2="33" y2="24" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="21" y1="27" x2="33" y2="27" stroke="#1e2d4a" strokeWidth="1" />
      </svg>
    ),
    label: "Dockets",
    desc: "Publishing responses, evidences, corrections, and accountability.",
    href: "/dockets",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect x="6" y="5" width="18" height="24" rx="1" stroke="#1e2d4a" strokeWidth="2" fill="#e8e0d0" />
        <rect x="11" y="9" width="18" height="24" rx="1" stroke="#1e2d4a" strokeWidth="1.5" fill="#d4c8b4" />
        <line x1="14" y1="16" x2="26" y2="16" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="14" y1="20" x2="26" y2="20" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="14" y1="24" x2="22" y2="24" stroke="#1e2d4a" strokeWidth="1" />
      </svg>
    ),
    label: "Document Room",
    desc: "Legal documents, correspondence, exhibits, and additional records.",
    href: "/document-room",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect x="4" y="8" width="32" height="22" rx="1" stroke="#1e2d4a" strokeWidth="2" fill="#e8e0d0" />
        <line x1="4" y1="14" x2="36" y2="14" stroke="#1e2d4a" strokeWidth="1.5" />
        <circle cx="8" cy="11" r="1.5" fill="#1e2d4a" />
        <circle cx="13" cy="11" r="1.5" fill="#1e2d4a" />
        <line x1="9" y1="19" x2="31" y2="19" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="9" y1="23" x2="31" y2="23" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="9" y1="27" x2="22" y2="27" stroke="#1e2d4a" strokeWidth="1" />
      </svg>
    ),
    label: "Press Releases",
    desc: "Official statements and public clarifications to set the record.",
    href: "/press-releases",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect x="4" y="8" width="32" height="22" rx="2" stroke="#1e2d4a" strokeWidth="2" fill="#e8e0d0" />
        <rect x="8" y="12" width="14" height="10" rx="1" stroke="#1e2d4a" strokeWidth="1.5" fill="#c8b89a" />
        <line x1="25" y1="14" x2="33" y2="14" stroke="#1e2d4a" strokeWidth="1.5" />
        <line x1="25" y1="18" x2="33" y2="18" stroke="#1e2d4a" strokeWidth="1.5" />
        <line x1="8" y1="25" x2="33" y2="25" stroke="#1e2d4a" strokeWidth="1" />
        <circle cx="32" cy="32" r="5" fill="#1e2d4a" />
        <path d="M30 32 L31.5 33.5 L34 30.5" stroke="white" strokeWidth="1.2" />
      </svg>
    ),
    label: "Media Watch",
    desc: "Analysis of media reports to expose inaccuracies and demand accountability.",
    href: "/media-watch",
  },
];

const STEPS = [
  { num: "01", title: "A Claim Is Published", desc: "Allegations to disputes are made by published organisations or publications." },
  { num: "02", title: "A Response Is Submitted", desc: "A documented response, including verifiable evidence, is submitted for review." },
  { num: "03", title: "A Docket Is Created", desc: "We approve the submission before a public docket for review and verification." },
  { num: "04", title: "The Record Stands", desc: "Once verified, the record is published so both claims and responses are fully accountable." },
];

const POLICIES = [
  { name: "Publishing Principles", href: "/publishing-principles" },
  { name: "Corrections Policy", href: "/corrections" },
  { name: "Ethics Charter", href: "/ethics" },
  { name: "Source Disclosures", href: "/disclosures" },
  { name: "Editorial Standards", href: "/editorial-standards" },
];

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [stats, setStats] = useState({
    activeDockets: 0,
    verifiedResponses: 0,
    correctionsFiled: 0,
    accountability: "100%",
  });
  const [featuredDocket, setFeaturedDocket] = useState(null);
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const docketsRes = await docketsAPI.getAllDockets();
      const dockets = Array.isArray(docketsRes) ? docketsRes : (docketsRes.dockets || []);
      
      const openDockets = dockets.filter(d => d.status === "Open").length;
      const totalResponses = dockets.length;
      const corrections = dockets.filter(d => d.response?.type === "Partial Correction" || d.response?.type === "Correction Request").length;
      
      setStats({
        activeDockets: openDockets,
        verifiedResponses: totalResponses,
        correctionsFiled: corrections,
        accountability: "100%",
      });
      
      if (dockets.length > 0) {
        const sortedDockets = [...dockets].sort((a, b) => 
          new Date(b.publishedDate || b.createdAt) - new Date(a.publishedDate || a.createdAt)
        );
        setFeaturedDocket(sortedDockets[0]);
      }
      
      const updates = [];
      
      const recentDockets = dockets.slice(0, 3).map(d => ({
        type: "DOCKET",
        id: d.docketId,
        title: d.response?.title || "Untitled Docket",
        date: d.publishedDate || d.createdAt,
        href: `/dockets/${d._id}`,
      }));
      updates.push(...recentDockets);
      
      try {
        const mediaRes = await mediaAPI.getAllMedia();
        const media = Array.isArray(mediaRes) ? mediaRes : (mediaRes.media || []);
        const recentMedia = media.slice(0, 2).map(m => ({
          type: "MEDIA WATCH",
          id: m.mediaId || m.id,
          title: m.headline,
          date: m.publishedDate || m.date,
          href: `/media-watch`,
        }));
        updates.push(...recentMedia);
      } catch (err) {
        console.error("Error fetching media for updates:", err);
      }
      
      try {
        const pressRes = await pressReleaseAPI.getAllPressReleases();
        const pressReleases = pressRes.releases || [];
        const recentPress = pressReleases.slice(0, 2).map(p => ({
          type: "PRESS RELEASE",
          id: p.id,
          title: p.title,
          date: p.publishedDate || p.date,
          href: `/press-releases/${p._id}`,
        }));
        updates.push(...recentPress);
      } catch (err) {
        console.error("Error fetching press releases for updates:", err);
      }
      
      const sortedUpdates = updates.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      setLatestUpdates(sortedUpdates);
      
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');

        .font-playfair {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-garamond {
          font-family: 'EB Garamond', Georgia, serif;
        }
        .font-mono-dm {
          font-family: 'DM Mono', monospace;
        }
      `}</style>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[300] bg-[#0a0f1e]/90 flex items-start justify-center pt-[60px] sm:pt-[100px] px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div className="w-full max-w-2xl px-4 sm:px-6" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.15em] text-white/40 uppercase mb-4">
              Search dockets, documents, and records
            </p>
            <input
              autoFocus
              className="w-full bg-transparent border-none border-b-2 border-white/50 font-playfair text-xl sm:text-2xl md:text-3xl italic text-[#f5f0e8] py-3 outline-none placeholder:text-white/30"
              placeholder="Keyword, docket ID, or entity…"
            />
            <p className="font-mono-dm text-[0.55rem] sm:text-[0.58rem] text-white/25 mt-2.5 tracking-[0.1em]">
              Press ESC to close
            </p>
          </div>
        </div>
      )}

      <Header />

      {/* Hero Section - Responsive */}
      <section className="bg-[#f5f0e8] py-10 sm:py-14 md:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 items-start">
            <div className="flex-1">
              <h1 className="font-playfair font-black text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-[#1e2d4a] mb-4 sm:mb-6">
                Journalism<br />Society
              </h1>
              <div className="border-l-4 border-[#b8974a] pl-3 sm:pl-4 mb-5 sm:mb-7">
                <p className="font-playfair italic text-[clamp(1rem,3vw,1.75rem)] text-[#b8974a] leading-tight">
                  Right of Reply. In Full.
                </p>
              </div>
              <p className="font-garamond text-sm sm:text-[1.05rem] leading-relaxed text-[#4a4035] max-w-md mb-2">
                Public record platform for publishing responses, evidence, corrections to counter inaccurate or false reporting.
              </p>
              <p className="font-garamond italic text-xs sm:text-[0.9rem] text-[#9a8870] mb-6 sm:mb-8">
                Audi alteram partem — hear the other side.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/dockets" className="inline-flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] font-mono-dm text-[0.58rem] sm:text-[0.62rem] tracking-[0.13em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-[#2a3f6a] transition-colors">
                  Browse Dockets
                </Link>
                <a href="#how" className="inline-flex items-center gap-2 bg-transparent text-[#1e2d4a] font-mono-dm text-[0.58rem] sm:text-[0.62rem] tracking-[0.13em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-[#1e2d4a] hover:bg-[#1e2d4a] hover:text-[#f5f0e8] transition-colors">
                  Learn How It Works
                </a>
              </div>
            </div>

            {/* Stats Panel - Responsive */}
            <div className="flex-1 max-w-[280px] sm:max-w-[260px] w-full mx-auto md:mx-0 bg-[#ede8dc] border border-[#d4c8b4] p-5 sm:p-7">
              {loading ? (
                <>
                  <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#d4c8b4]">
                    <div className="h-8 w-12 sm:h-10 sm:w-16 bg-[#d4c8b4] animate-pulse rounded mb-2"></div>
                    <div className="h-3 w-20 sm:h-4 sm:w-24 bg-[#d4c8b4] animate-pulse rounded"></div>
                  </div>
                  <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#d4c8b4]">
                    <div className="h-8 w-12 sm:h-10 sm:w-16 bg-[#d4c8b4] animate-pulse rounded mb-2"></div>
                    <div className="h-3 w-20 sm:h-4 sm:w-24 bg-[#d4c8b4] animate-pulse rounded"></div>
                  </div>
                  <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#d4c8b4]">
                    <div className="h-8 w-12 sm:h-10 sm:w-16 bg-[#d4c8b4] animate-pulse rounded mb-2"></div>
                    <div className="h-3 w-20 sm:h-4 sm:w-24 bg-[#d4c8b4] animate-pulse rounded"></div>
                  </div>
                  <div>
                    <div className="h-8 w-12 sm:h-10 sm:w-16 bg-[#d4c8b4] animate-pulse rounded mb-2"></div>
                    <div className="h-3 w-20 sm:h-4 sm:w-24 bg-[#d4c8b4] animate-pulse rounded"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#d4c8b4]">
                    <div className="font-playfair font-black text-2xl sm:text-[2.6rem] leading-none text-[#b8974a]">{stats.activeDockets}</div>
                    <div className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.14em] uppercase text-[#7a6e5e] mt-1">Active Dockets</div>
                  </div>
                  <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#d4c8b4]">
                    <div className="font-playfair font-black text-2xl sm:text-[2.6rem] leading-none text-[#b8974a]">{stats.verifiedResponses}</div>
                    <div className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.14em] uppercase text-[#7a6e5e] mt-1">Verified Responses</div>
                  </div>
                  <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#d4c8b4]">
                    <div className="font-playfair font-black text-2xl sm:text-[2.6rem] leading-none text-[#b8974a]">{stats.correctionsFiled}</div>
                    <div className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.14em] uppercase text-[#7a6e5e] mt-1">Corrections Filed</div>
                  </div>
                  <div>
                    <div className="font-playfair font-black text-2xl sm:text-[2.6rem] leading-none text-[#b8974a]">{stats.accountability}</div>
                    <div className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.14em] uppercase text-[#7a6e5e] mt-1">Accountability</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Docket - Responsive */}
      <section className="bg-[#f5f0e8] px-4 sm:px-6 pb-10 sm:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-4 sm:mb-5 flex justify-between items-baseline">
            <span className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.16em] uppercase text-[#9a8870]">Featured Docket</span>
            <Link href="/dockets" className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] no-underline hover:text-[#b8974a] transition-colors">
              All Dockets →
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col md:grid md:grid-cols-[1fr_340px] border border-[#d4c8b4] bg-[#faf6ee] overflow-hidden">
              <div className="p-5 sm:p-8 md:p-9">
                <div className="h-5 w-28 sm:h-6 sm:w-32 bg-[#d4c8b4] animate-pulse rounded mb-5"></div>
                <div className="h-6 w-full sm:h-8 bg-[#d4c8b4] animate-pulse rounded mb-4"></div>
                <div className="h-16 w-full sm:h-20 bg-[#d4c8b4] animate-pulse rounded mb-7"></div>
                <div className="flex gap-5 sm:gap-7 mb-7">
                  <div><div className="h-3 w-12 sm:h-4 sm:w-16 bg-[#d4c8b4] animate-pulse rounded mb-1"></div><div className="h-4 w-16 sm:h-5 sm:w-20 bg-[#d4c8b4] animate-pulse rounded"></div></div>
                  <div><div className="h-3 w-12 sm:h-4 sm:w-16 bg-[#d4c8b4] animate-pulse rounded mb-1"></div><div className="h-4 w-16 sm:h-5 sm:w-20 bg-[#d4c8b4] animate-pulse rounded"></div></div>
                  <div><div className="h-3 w-12 sm:h-4 sm:w-16 bg-[#d4c8b4] animate-pulse rounded mb-1"></div><div className="h-4 w-16 sm:h-5 sm:w-20 bg-[#d4c8b4] animate-pulse rounded"></div></div>
                </div>
                <div className="h-8 w-28 sm:h-10 sm:w-32 bg-[#d4c8b4] animate-pulse rounded"></div>
              </div>
              <div className="hidden md:block bg-[#d4c8b4] animate-pulse"></div>
            </div>
          ) : featuredDocket ? (
            <div className="flex flex-col md:grid md:grid-cols-[1fr_340px] border border-[#d4c8b4] bg-[#faf6ee] overflow-hidden">
              <div className="p-5 sm:p-8 md:p-9">
                <div className="flex gap-2 items-center mb-4 sm:mb-5 flex-wrap">
                  <span className="font-mono-dm text-[0.5rem] sm:text-[0.55rem] tracking-[0.1em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">
                    {featuredDocket.respondent?.type || "Media Reply"}
                  </span>
                  <span className="font-mono-dm text-[0.5rem] sm:text-[0.55rem] tracking-[0.1em] uppercase border border-[#1e2d4a] text-[#1e2d4a] px-2 py-0.5">
                    {featuredDocket.status || "Under Review"}
                  </span>
                </div>

                <h2 className="font-playfair font-bold text-lg sm:text-xl md:text-[clamp(1.3rem,2.5vw,1.9rem)] leading-tight text-[#1e2d4a] mb-3 sm:mb-4 max-w-[520px]">
                  {featuredDocket.response?.title || featuredDocket.title || "Featured Docket"}
                </h2>

                <p className="font-garamond text-sm sm:text-[1.05rem] leading-relaxed text-[#5a5040] max-w-[500px] mb-5 sm:mb-7">
                  {featuredDocket.summary?.claim || featuredDocket.summary || "A documented response to public claims."}
                </p>

                <div className="flex gap-4 sm:gap-7 flex-wrap mb-5 sm:mb-7">
                  <div>
                    <div className="font-mono-dm text-[0.5rem] sm:text-[0.58rem] tracking-[0.12em] uppercase text-[#9a8870] mb-0.5">Filed</div>
                    <div className="font-garamond text-xs sm:text-[0.95rem] text-[#3a3028]">{formatDate(featuredDocket.publishedDate || featuredDocket.filedDate)}</div>
                  </div>
                  <div>
                    <div className="font-mono-dm text-[0.5rem] sm:text-[0.58rem] tracking-[0.12em] uppercase text-[#9a8870] mb-0.5">Status</div>
                    <div className="font-garamond text-xs sm:text-[0.95rem] text-[#3a3028]">{featuredDocket.status || "Open"}</div>
                  </div>
                  <div>
                    <div className="font-mono-dm text-[0.5rem] sm:text-[0.58rem] tracking-[0.12em] uppercase text-[#9a8870] mb-0.5">Exhibits</div>
                    <div className="font-garamond text-xs sm:text-[0.95rem] text-[#3a3028]">{featuredDocket.exhibits?.length || 0} documents</div>
                  </div>
                </div>

                <Link href={`/dockets/${featuredDocket._id}`} className="inline-flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] font-mono-dm text-[0.55rem] sm:text-[0.62rem] tracking-[0.13em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-[#2a3f6a] transition-colors">
                  View Full Record
                </Link>
              </div>

              <div className="hidden md:block min-h-[280px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=700&q=80"
                  alt="Courthouse"
                  className="w-full h-full object-cover sepia-[0.2] brightness-90"
                />
              </div>
            </div>
          ) : (
            <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6 sm:p-8 text-center">
              <p className="font-garamond text-sm sm:text-base text-[#9a8870]">No dockets available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Section Cards - Responsive */}
      <section className="bg-[#ede8dc] border-y border-[#d4c8b4] py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTIONS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="p-4 sm:p-5 border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all no-underline text-inherit flex flex-col gap-2 sm:gap-2.5"
              >
                <div className="transform hover:scale-105 transition-transform duration-200">{s.icon}</div>
                <div className="font-playfair font-bold text-sm sm:text-base text-[#1e2d4a]">{s.label}</div>
                <p className="font-garamond text-xs sm:text-[0.88rem] leading-relaxed text-[#6a5e4e]">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Responsive */}
      <section id="how" className="bg-[#f5f0e8] py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair font-bold text-xl sm:text-2xl md:text-[clamp(1.6rem,4vw,2.2rem)] text-[#1e2d4a] mb-5 sm:mb-7">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STEPS.map((step, i) => (
              <div key={step.num} className="border border-[#d4c8b4] p-5 sm:p-6 bg-[#faf6ee] relative">
                <div className="font-playfair font-black text-2xl sm:text-[2.8rem] leading-none text-[#c8b89a] mb-3 sm:mb-3.5">{step.num}</div>
                <div className="font-playfair font-bold text-sm sm:text-base text-[#1e2d4a] mb-2 sm:mb-2.5">{step.title}</div>
                <p className="font-garamond text-xs sm:text-[0.88rem] leading-relaxed text-[#6a5e4e]">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-[40%] text-[#c8b89a] text-xl font-light">›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Purpose - Responsive */}
      <section className="bg-[#2a1f14] bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
          <div className="flex-1 min-w-[140px] sm:min-w-[160px]">
            <div className="border-t-2 border-[#b8974a] pt-2.5">
              <span className="font-mono-dm text-[0.55rem] sm:text-[0.58rem] tracking-[0.16em] uppercase text-[#b8974a]">Our Purpose</span>
            </div>
          </div>
          <div className="flex-[2]">
            <h2 className="font-playfair font-bold text-xl sm:text-2xl md:text-[clamp(1.8rem,4vw,3rem)] text-[#f5f0e8] leading-tight mb-4 sm:mb-6">
              Most reporting shows one side.
            </h2>
            <p className="font-garamond text-sm sm:text-[1.1rem] leading-relaxed text-[#c8b89a] mb-4 max-w-[580px]">
              We ensure the <strong className="text-[#f5f0e8]">other side</strong> is recorded — clearly, permanently, and impartially. Every docket shows the complete record — the claims, the responses, and the evidence. Nothing erased. Nothing hidden.
            </p>
            <p className="font-garamond italic text-xs sm:text-[0.95rem] text-[#8a7a64]">
              "The press was to serve the governed, not the governors." — Justice Hugo Black
            </p>
          </div>
        </div>
      </section>

      {/* Latest Updates - Responsive */}
      <section className="bg-[#f5f0e8] py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-4 sm:mb-5 flex justify-between items-baseline">
            <span className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.16em] uppercase text-[#9a8870]">Latest Updates</span>
            <Link href="#" className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] no-underline hover:text-[#b8974a] transition-colors">
              View all →
            </Link>
          </div>

          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3.5 py-3 sm:py-3.5 border-b border-[#d4c8b4]">
                  <div className="h-4 w-20 sm:h-5 sm:w-20 bg-[#d4c8b4] animate-pulse rounded"></div>
                  <div className="h-4 w-16 sm:h-5 sm:w-16 bg-[#d4c8b4] animate-pulse rounded"></div>
                  <div className="h-4 flex-1 bg-[#d4c8b4] animate-pulse rounded"></div>
                  <div className="h-4 w-24 bg-[#d4c8b4] animate-pulse rounded"></div>
                </div>
              ))}
            </>
          ) : (
            latestUpdates.map((u) => (
              <Link
                key={u.id}
                href={u.href}
                className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3.5 py-3 sm:py-3.5 border-b border-[#d4c8b4] hover:bg-[#ede8dc] transition-colors no-underline group"
              >
                <span className="font-mono-dm text-[0.5rem] sm:text-[0.55rem] tracking-[0.1em] uppercase border border-[#c4b89a] px-1.5 py-0.5 text-[#7a6e5e] whitespace-nowrap self-start sm:self-auto">
                  {u.type}
                </span>
                <span className="font-mono-dm text-[0.6rem] sm:text-[0.65rem] text-[#b8974a] whitespace-nowrap">{u.id}</span>
                <span className="font-garamond text-sm sm:text-[0.95rem] text-[#2a2018] flex-1 group-hover:underline">{u.title}</span>
                <span className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] text-[#9a8870] whitespace-nowrap">{formatDate(u.date)}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Trust & Policies - Responsive */}
      <section className="bg-[#ede8dc] border-y border-[#d4c8b4] py-6 sm:py-7 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-garamond italic text-xs sm:text-[0.95rem] text-[#7a6e5e] text-center sm:text-left">
            Governed by clear editorial principles. Independently operated.
          </p>
          <div className="flex flex-wrap justify-center gap-0">
            {POLICIES.map((p, i) => (
              <span key={p.href}>
                <Link
                  href={p.href}
                  className="font-mono-dm text-[0.5rem] sm:text-[0.58rem] tracking-[0.1em] uppercase text-[#6a5e4e] hover:text-[#1e2d4a] transition-colors no-underline"
                >
                  {p.name}
                </Link>
                {i < POLICIES.length - 1 && <span className="text-[#c8b89a] px-2 sm:px-3 font-serif">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
