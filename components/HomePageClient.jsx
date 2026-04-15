// app/HomePageClient.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import docketsAPI from "@/services/docketsApi";
import mediaAPI from "@/services/mediaApi";
import pressReleaseAPI from "@/services/pressReleaseApi";

const SECTIONS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true">
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
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true">
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
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true">
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
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true">
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

const EDITORIAL_PRINCIPLES = [
  {
    num: "I",
    title: "Verified Before Published",
    desc: "Every docket undergoes editorial review before appearing in the public record. Claims must be documented, responses must be complete.",
  },
  {
    num: "II",
    title: "Nothing Is Ever Deleted",
    desc: "Once published, records are permanent. Corrections are filed as addenda — the original record is never altered or erased.",
  },
  {
    num: "III",
    title: "No Sides, Only Evidence",
    desc: "We neither defend nor prosecute. We present the full record — the claim, the response, the evidence — and let it speak.",
  },
  {
    num: "IV",
    title: "Open to All, Funded by None",
    desc: "Submission is free. Publication is free. We accept no payment from respondents or publications. Independence is non-negotiable.",
  },
];

const IMPACT_STATS = [
  { val: "48h", label: "Average Review Time", desc: "From submission to editorial decision" },
  { val: "100%", label: "Public Access", desc: "Every published record is freely accessible" },
  { val: "0", label: "Records Deleted", desc: "Permanent archive since founding" },
  { val: "Free", label: "Cost to Submit", desc: "No fees, no paywall, no gatekeeping" },
];

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export default function HomePageClient() {
  const [stats, setStats] = useState({ activeDockets: 0, verifiedResponses: 0, correctionsFiled: 0, accountability: "100%" });
  const [featuredDocket, setFeaturedDocket] = useState(null);
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [recentDockets, setRecentDockets] = useState([]);
  const [recentMedia, setRecentMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchHomeData(); }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const docketsRes = await docketsAPI.getAllDockets();
      const dockets = Array.isArray(docketsRes) ? docketsRes : (docketsRes.dockets || []);

      setStats({
        activeDockets: dockets.filter(d => d.status === "Open").length,
        verifiedResponses: dockets.length,
        correctionsFiled: dockets.filter(d => d.response?.type === "Partial Correction" || d.response?.type === "Correction Request").length,
        accountability: "100%",
      });

      const sortedDockets = [...dockets].sort((a, b) => new Date(b.publishedDate || b.createdAt) - new Date(a.publishedDate || a.createdAt));
      if (sortedDockets.length > 0) setFeaturedDocket(sortedDockets[0]);
      setRecentDockets(sortedDockets.slice(0, 4));

      const updates = [];
      const recentD = dockets.slice(0, 3).map(d => ({ type: "DOCKET", id: d.docketId, title: d.response?.title || "Untitled Docket", date: d.publishedDate || d.createdAt, href: `/dockets/${d._id}` }));
      updates.push(...recentD);

      try {
        const mediaRes = await mediaAPI.getAllMedia();
        const media = Array.isArray(mediaRes) ? mediaRes : (mediaRes.media || []);
        setRecentMedia(media.slice(0, 3));
        const recentM = media.slice(0, 2).map(m => ({ type: "MEDIA WATCH", id: m.mediaId || m.id, title: m.headline, date: m.publishedDate || m.date, href: `/media-watch` }));
        updates.push(...recentM);
      } catch {}

      try {
        const pressRes = await pressReleaseAPI.getAllPressReleases();
        const pressReleases = pressRes.releases || [];
        const recentP = pressReleases.slice(0, 2).map(p => ({ type: "PRESS RELEASE", id: p.id, title: p.title, date: p.publishedDate || p.date, href: `/press-releases/${p._id}` }));
        updates.push(...recentP);
      } catch {}

      setLatestUpdates(updates.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
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
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="bg-[#f5f0e8] py-10 sm:py-14 md:py-16 px-4 sm:px-6" aria-labelledby="hero-heading">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 items-start">
            <div className="flex-1">
              <h1 id="hero-heading" className="font-playfair font-black text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-[#1e2d4a] mb-4 sm:mb-6">
                Journalism<br />Society
              </h1>
              <div className="border-l-4 border-[#b8974a] pl-3 sm:pl-4 mb-5 sm:mb-7">
                <p className="font-playfair italic text-[clamp(1rem,3vw,1.75rem)] text-[#b8974a] leading-tight">Right of Reply. In Full.</p>
              </div>
              <p className="font-garamond text-sm sm:text-[1.05rem] leading-relaxed text-[#4a4035] max-w-md mb-2 hero-description">
                Public record platform for publishing responses, evidence, corrections to counter inaccurate or false reporting.
              </p>
              <p className="font-garamond italic text-xs sm:text-[0.9rem] text-[#9a8870] mb-6 sm:mb-8">
                Audi alteram partem — hear the other side.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/dockets" title="Browse all Right of Reply dockets in the public record" className="inline-flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] font-mono-dm text-[0.62rem] tracking-[0.13em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-[#2a3f6a] transition-colors">Browse Dockets</Link>
                <a href="#how" title="Learn how the Right of Reply process works" className="inline-flex items-center gap-2 bg-transparent text-[#1e2d4a] font-mono-dm text-[0.62rem] tracking-[0.13em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-[#1e2d4a] hover:bg-[#1e2d4a] hover:text-[#f5f0e8] transition-colors">Learn How It Works</a>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="flex-1 max-w-[280px] sm:max-w-[260px] w-full mx-auto md:mx-0 bg-[#ede8dc] border border-[#d4c8b4] p-5 sm:p-7" role="complementary" aria-label="Platform statistics">
              {loading ? (
                <>{[1,2,3,4].map(i => <div key={i} className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#d4c8b4] last:border-0 last:mb-0"><div className="h-8 w-12 sm:h-10 sm:w-16 bg-[#d4c8b4] animate-pulse rounded mb-2"></div><div className="h-3 w-20 sm:h-4 sm:w-24 bg-[#d4c8b4] animate-pulse rounded"></div></div>)}</>
              ) : (
                <>
                  {[
                    { val: stats.activeDockets, label: "Active Dockets" },
                    { val: stats.verifiedResponses, label: "Verified Responses" },
                    { val: stats.correctionsFiled, label: "Corrections Filed" },
                    { val: stats.accountability, label: "Accountability" },
                  ].map((s, i, arr) => (
                    <div key={s.label} className={`pb-3 sm:pb-4 mb-3 sm:mb-4 ${i < arr.length - 1 ? "border-b border-[#d4c8b4]" : ""}`}>
                      <div className="font-playfair font-black text-2xl sm:text-[2.6rem] leading-none text-[#b8974a]">{s.val}</div>
                      <div className="font-mono-dm text-[0.6rem] tracking-[0.14em] uppercase text-[#7a6e5e] mt-1">{s.label}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED DOCKET ── */}
      <section className="bg-[#f5f0e8] px-4 sm:px-6 pb-10 sm:pb-12" aria-labelledby="featured-docket-label">
        <div className="max-w-6xl mx-auto">
          <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-4 sm:mb-5 flex justify-between items-baseline">
            <span id="featured-docket-label" className="font-mono-dm text-[0.7rem] tracking-[0.16em] uppercase text-[#9a8870]">Featured Docket</span>
            <Link href="/dockets" title="View all Right of Reply dockets" className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] no-underline hover:text-[#b8974a] transition-colors">All Dockets →</Link>
          </div>

          {loading ? (
            <div className="flex flex-col md:grid md:grid-cols-[1fr_340px] border border-[#d4c8b4] bg-[#faf6ee] overflow-hidden">
              <div className="p-5 sm:p-8 md:p-9">
                {[32, 48, 20, 16, 32].map((w, i) => <div key={i} className={`h-5 sm:h-6 w-${w} bg-[#d4c8b4] animate-pulse rounded mb-4`}></div>)}
              </div>
              <div className="hidden md:block bg-[#d4c8b4] animate-pulse"></div>
            </div>
          ) : featuredDocket ? (
            <div className="flex flex-col md:grid md:grid-cols-[1fr_340px] border border-[#d4c8b4] bg-[#faf6ee] overflow-hidden">
              <div className="p-5 sm:p-8 md:p-9">
                <div className="flex gap-2 items-center mb-4 sm:mb-5 flex-wrap">
                  <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">{featuredDocket.respondent?.type || "Media Reply"}</span>
                  <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase border border-[#1e2d4a] text-[#1e2d4a] px-2 py-0.5">{featuredDocket.status || "Under Review"}</span>
                </div>
                <h2 className="font-playfair font-bold text-lg sm:text-xl md:text-[clamp(1.3rem,2.5vw,1.9rem)] leading-tight text-[#1e2d4a] mb-3 sm:mb-4 max-w-[520px]">
                  {featuredDocket.response?.title || featuredDocket.title || "Featured Docket"}
                </h2>
                <p className="font-garamond text-sm sm:text-[1.05rem] leading-relaxed text-black max-w-[500px] mb-5 sm:mb-7">
                  {featuredDocket.summary?.claim || "A documented response to public claims."}
                </p>
                <div className="flex gap-4 sm:gap-7 flex-wrap mb-5 sm:mb-7">
                  {[["Filed", formatDate(featuredDocket.publishedDate || featuredDocket.filedDate)], ["Status", featuredDocket.status || "Open"], ["Exhibits", `${featuredDocket.exhibits?.length || 0} documents`]].map(([k, v]) => (
                    <div key={k}>
                      <div className="font-mono-dm text-[0.58rem] tracking-[0.12em] uppercase text-[#9a8870] mb-0.5">{k}</div>
                      <div className="font-garamond text-xs sm:text-[0.95rem] text-[#3a3028]">{v}</div>
                    </div>
                  ))}
                </div>
                <Link href={`/dockets/${featuredDocket._id}`} title={`View full record: ${featuredDocket.response?.title || "Featured Docket"}`} className="inline-flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] font-mono-dm text-[0.62rem] tracking-[0.13em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-[#2a3f6a] transition-colors">View Full Record</Link>
              </div>
              <div className="hidden md:block min-h-[280px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=700&q=80"
                  alt="Courthouse representing justice and public accountability"
                  width={700}
                  height={280}
                  className="w-full h-full object-cover sepia-[0.2] brightness-90"
                  unoptimized
                />
              </div>
            </div>
          ) : (
            <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6 sm:p-8 text-center"><p className="font-garamond text-sm sm:text-base text-[#9a8870]">No dockets available yet.</p></div>
          )}
        </div>
      </section>

      {/* ── SECTION CARDS ── */}
      <section className="bg-[#ede8dc] border-y border-[#d4c8b4] py-8 sm:py-10 px-4 sm:px-6" aria-label="Platform sections">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTIONS.map((s) => (
              <Link key={s.label} href={s.href} title={`Explore ${s.label} — ${s.desc}`} className="p-4 sm:p-5 border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all no-underline text-inherit flex flex-col gap-2 sm:gap-2.5 rounded-lg">
                <div className="transform hover:scale-105 transition-transform duration-200">{s.icon}</div>
                <div className="font-playfair font-bold text-sm sm:text-base text-[#1e2d4a]">{s.label}</div>
                <p className="font-garamond text-xs sm:text-[0.88rem] leading-relaxed text-[#1a1818]">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="bg-[#f5f0e8] py-10 sm:py-12 px-4 sm:px-6" aria-labelledby="how-it-works-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="how-it-works-heading" className="font-playfair font-bold text-xl sm:text-2xl md:text-[clamp(1.6rem,4vw,2.2rem)] text-[#1e2d4a] mb-5 sm:mb-7">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STEPS.map((step, i) => (
              <div key={step.num} className="border border-[#d4c8b4] p-5 sm:p-6 bg-[#faf6ee] relative">
                <div className="font-playfair font-black text-2xl sm:text-[2.8rem] leading-none text-[#c8b89a] mb-3 sm:mb-3.5">{step.num}</div>
                <h3 className="font-playfair font-bold text-sm sm:text-base text-[#1e2d4a] mb-2 sm:mb-2.5">{step.title}</h3>
                <p className="font-garamond text-xs sm:text-[0.88rem] leading-relaxed text-[#1a1818]">{step.desc}</p>
                {i < STEPS.length - 1 && <div className="hidden lg:block absolute -right-2 top-[40%] text-[#c8b89a] text-xl font-light" aria-hidden="true">›</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PURPOSE ── */}
      <section className="bg-[#2a1f14] py-12 sm:py-16 px-4 sm:px-6" aria-labelledby="our-purpose-heading">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
          <div className="flex-1 min-w-[140px] sm:min-w-[160px]">
            <div className="border-t-2 border-[#b8974a] pt-2.5">
              <span className="font-mono-dm text-[0.65rem] tracking-[0.16em] uppercase text-[#b8974a]">Our Purpose</span>
            </div>
          </div>
          <div className="flex-[2]">
            <h2 id="our-purpose-heading" className="font-playfair font-bold text-xl sm:text-2xl md:text-[clamp(1.8rem,4vw,3rem)] text-[#f5f0e8] leading-tight mb-4 sm:mb-6">Most reporting shows one side.</h2>
            <p className="font-garamond text-sm sm:text-[1.1rem] leading-relaxed text-[#c8b89a] mb-4 max-w-[580px]">
              We ensure the <strong className="text-[#f5f0e8]">other side</strong> is recorded — clearly, permanently, and impartially. Every docket shows the complete record — the claims, the responses, and the evidence. Nothing erased. Nothing hidden.
            </p>
            <p className="font-garamond italic text-xs sm:text-[0.95rem] text-[#8a7a64]">
              "The press was to serve the governed, not the governors." — Justice Hugo Black
            </p>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="bg-[#1e2d4a] py-10 sm:py-12 px-4 sm:px-6" aria-labelledby="impact-stats-heading">
        <div className="max-w-6xl mx-auto">
          <div className="border-t-2 border-[#b8974a] pt-2.5 mb-7 sm:mb-9">
            <span id="impact-stats-heading" className="font-mono-dm text-[0.7rem] tracking-[0.16em] uppercase text-[#b8974a]">By the Numbers</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="bg-[#1e2d4a]/80 p-5 sm:p-7">
                <div className="font-playfair font-black text-2xl sm:text-3xl md:text-4xl leading-none text-[#b8974a] mb-2">{s.val}</div>
                <div className="font-mono-dm text-[0.56rem] sm:text-[0.6rem] tracking-[0.14em] uppercase text-[#f5f0e8] mb-1">{s.label}</div>
                <div className="font-garamond text-xs sm:text-[0.88rem] italic text-gray-400">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL PRINCIPLES ── */}
      <section className="bg-[#f5f0e8] py-10 sm:py-14 px-4 sm:px-6" aria-labelledby="editorial-principles-heading">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-7 sm:mb-9">
            <div>
              <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-3">
                <span className="font-mono-dm text-[0.7rem] tracking-[0.16em] uppercase text-[#9a8870]">Editorial Principles</span>
              </div>
              <h2 id="editorial-principles-heading" className="font-playfair font-bold text-xl sm:text-2xl md:text-[clamp(1.6rem,3.5vw,2.2rem)] text-[#1e2d4a] leading-tight max-w-md">
                The rules we hold ourselves to.
              </h2>
            </div>
            <Link href="/publishing-principles" title="Read our full publishing principles and editorial policy" className="font-mono-dm text-[0.6rem] tracking-[0.12em] uppercase text-[#b8974a] hover:text-[#1e2d4a] transition-colors whitespace-nowrap">
              Full Policy →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {EDITORIAL_PRINCIPLES.map((p) => (
              <div key={p.num} className="flex gap-4 sm:gap-5 border border-[#d4c8b4] bg-[#faf6ee] p-4 sm:p-6">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1e2d4a] flex items-center justify-center" aria-hidden="true">
                    <span className="font-playfair font-bold text-[0.65rem] sm:text-[0.75rem] text-[#b8974a]">{p.num}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-sm sm:text-base text-[#1e2d4a] mb-1.5 sm:mb-2">{p.title}</h3>
                  <p className="font-garamond text-xs sm:text-[0.92rem] leading-relaxed text-[#1a1818]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT DOCKETS ── */}
      {recentDockets.length > 0 && (
        <section className="bg-[#ede8dc] border-y border-[#d4c8b4] py-10 sm:py-12 px-4 sm:px-6" aria-labelledby="recent-dockets-heading">
          <div className="max-w-6xl mx-auto">
            <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-5 sm:mb-7 flex justify-between items-baseline">
              <span id="recent-dockets-heading" className="font-mono-dm text-[0.7rem] tracking-[0.16em] uppercase text-[#9a8870]">Recent Dockets</span>
              <Link href="/dockets" title="View all dockets in the public record" className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] no-underline hover:text-[#b8974a] transition-colors">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {recentDockets.map((d) => (
                <Link key={d._id} href={`/dockets/${d._id}`} title={`View docket: ${d.response?.title || "Untitled Docket"}`} className="border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all p-4 sm:p-5 no-underline text-inherit flex flex-col gap-2 group rounded-lg">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] text-[#b8974a] uppercase">{d.docketId}</span>
                    <span className={`font-mono-dm text-[0.5rem] tracking-[0.08em] uppercase px-1.5 py-0.5 border ${d.status === "Open" ? "border-green-300 text-green-700 bg-green-50" : d.status === "Closed" ? "border-gray-300 text-gray-600 bg-gray-50" : "border-yellow-300 text-yellow-700 bg-yellow-50"}`}>{d.status}</span>
                  </div>
                  <h3 className="font-playfair font-bold text-sm sm:text-base text-[#1e2d4a] leading-snug line-clamp-2 group-hover:text-[#b8974a] transition-colors">
                    {d.response?.title || "Untitled Docket"}
                  </h3>
                  <p className="font-garamond text-xs sm:text-[0.88rem] text-[#1a1818] line-clamp-2">{d.summary?.claim || "No summary available."}</p>
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-[#e4ddd0]">
                    <span className="font-garamond text-xs sm:text-[0.85rem] italic text-[#5c5b5b]">{d.respondent?.name || "Unknown"}</span>
                    <span className="font-mono-dm text-[0.55rem] text-[#5c5b5b]">{formatDate(d.publishedDate || d.createdAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MEDIA WATCH PREVIEW ── */}
      {recentMedia.length > 0 && (
        <section className="bg-[#f5f0e8] py-10 sm:py-12 px-4 sm:px-6" aria-labelledby="media-watch-heading">
          <div className="max-w-6xl mx-auto">
            <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-5 sm:mb-7 flex justify-between items-baseline">
              <span id="media-watch-heading" className="font-mono-dm text-[0.7rem] tracking-[0.16em] uppercase text-[#9a8870]">Media Watch</span>
              <Link href="/media-watch" title="View all tracked media coverage across dockets" className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] no-underline hover:text-[#b8974a] transition-colors">All Coverage →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {recentMedia.map((m, i) => {
                const stanceColor = m.stance === "adversarial" ? "#b8190c" : m.stance === "supportive" ? "#2d6a4f" : "#5a6a84";
                return (
                  <Link key={m._id || i} href="/media-watch" title={`Read media coverage: ${m.headline}`} className="border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all p-4 sm:p-5 no-underline text-inherit flex flex-col gap-2 group overflow-hidden rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase text-[#1e2d4a] font-medium">{m.outlet}</span>
                      <span className="font-mono-dm text-[0.5rem] px-1.5 py-0.5 border flex items-center gap-1" style={{ borderColor: stanceColor + "40", background: stanceColor + "10", color: stanceColor }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: stanceColor }} aria-hidden="true"></span>
                        {m.stance}
                      </span>
                    </div>
                    <h3 className="font-playfair font-bold text-sm text-[#1e2d4a] line-clamp-2 group-hover:text-[#b8974a] transition-colors">{m.headline}</h3>
                    <p className="font-garamond text-xs sm:text-[0.85rem] text-[#1a1818] line-clamp-2 mt-auto">{m.summary || "No summary available."}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#e4ddd0] mt-1">
                      <span className="font-mono-dm text-[0.55rem] uppercase text-[#b8974a]">{m.type}</span>
                      <span className="font-mono-dm text-[0.55rem] text-[#9a8870]">{formatDate(m.date)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── TRANSPARENCY PLEDGE ── */}
      <section className="bg-[#f5f0e8] py-10 sm:py-12 px-4 sm:px-6 border-t border-[#d4c8b4]" aria-labelledby="transparency-heading">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 sm:gap-12 items-start">
            <div>
              <div className="border-t-2 border-[#b8974a] pt-2.5 mb-4">
                <span className="font-mono-dm text-[0.7rem] tracking-[0.16em] uppercase text-[#b8974a]">Transparency Pledge</span>
              </div>
              <h2 id="transparency-heading" className="font-playfair font-bold text-xl sm:text-2xl text-[#1e2d4a] leading-tight mb-4">
                We hold ourselves to the same standard.
              </h2>
              <p className="font-garamond text-sm sm:text-[0.95rem] leading-relaxed text-[#1a1818]">
                Every editorial decision we make is governed by documented policies. We publish our standards so anyone can hold us accountable.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "No anonymous submissions", desc: "All submissions require verified contact information. Anonymity is not an option for respondents." },
                { title: "No paid promotion", desc: "Publications cannot pay to have dockets removed, amended, or buried. Nor can respondents." },
                { title: "Corrections are public", desc: "When we make an error, the correction is published prominently — alongside the original, not in its place." },
                { title: "Full audit trail", desc: "Every published docket shows when it was filed, reviewed, and last updated. Nothing is done in the dark." },
              ].map((item) => (
                <div key={item.title} className="bg-[#ede8dc] border border-[#d4c8b4] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    <h3 className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] font-bold">{item.title}</h3>
                  </div>
                  <p className="font-garamond text-xs sm:text-[0.88rem] leading-relaxed text-[#1a1818]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST UPDATES ── */}
      <section className="bg-[#f5f0e8] py-10 sm:py-12 px-4 sm:px-6 border-t border-[#d4c8b4]" aria-labelledby="latest-updates-heading">
        <div className="max-w-6xl mx-auto">
          <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-4 sm:mb-5 flex justify-between items-baseline">
            <span id="latest-updates-heading" className="font-mono-dm text-[0.7rem] tracking-[0.16em] uppercase text-[#9a8870] font-semibold">Latest Updates</span>
            <Link href="/dockets" title="View all updates in the public record" className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] no-underline hover:text-[#b8974a] transition-colors">View all →</Link>
          </div>
          {loading ? (
            <>{[1,2,3,4].map(i => <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3.5 py-3 sm:py-3.5 border-b border-[#d4c8b4]">{[20,16,32,24].map((w, j) => <div key={j} className={`h-4 w-${w} bg-[#d4c8b4] animate-pulse rounded`}></div>)}</div>)}</>
          ) : (
            latestUpdates.map((u) => (
              <Link key={u.id} href={u.href} title={`${u.type}: ${u.title}`} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3.5 py-3 sm:py-3.5 border-b border-[#d4c8b4] hover:bg-[#ede8dc] transition-colors no-underline group">
                <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase border border-[#61513c] px-1.5 py-0.5 text-[#595248] whitespace-nowrap self-start sm:self-auto">{u.type}</span>
                <span className="font-mono-dm text-[0.65rem] text-[#b8974a] whitespace-nowrap">{u.id}</span>
                <span className="font-garamond text-sm sm:text-[0.95rem] text-[#2a2018] flex-1 group-hover:underline">{u.title}</span>
                <span className="font-mono-dm text-[0.6rem] text-[#5c5b5b] whitespace-nowrap">{formatDate(u.date)}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* ── SUBMIT CTA ── */}
      <section className="bg-[#1e2d4a] border-t-4 border-[#b8974a] py-12 sm:py-16 px-4 sm:px-6" aria-labelledby="submit-cta-heading">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono-dm text-[0.58rem] tracking-[0.18em] uppercase text-gray-300 mb-4">Get on the Record</p>
          <h2 id="submit-cta-heading" className="font-playfair font-black text-2xl sm:text-3xl md:text-[clamp(2rem,5vw,3.5rem)] text-[#f5f0e8] leading-tight mb-4 sm:mb-5">
            Has something been said about you<br className="hidden sm:block" /> that isn't true?
          </h2>
          <p className="font-garamond text-sm sm:text-[1.05rem] leading-relaxed text-[#8a9bb8] max-w-xl mx-auto mb-7 sm:mb-9">
            Submit a Right of Reply and have your documented response permanently on the public record — alongside the original claim, for all to see.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/submit" title="Submit your Right of Reply — free and permanent public record" className="inline-flex items-center justify-center gap-2 bg-[#b8974a] text-[#1e2d4a] font-mono-dm text-[0.65rem] tracking-[0.13em] uppercase px-6 sm:px-8 py-3 sm:py-3.5 hover:bg-[#c8a85a] transition-colors font-medium">
              Submit a Right of Reply →
            </Link>
            <Link href="/dockets" title="Browse all Right of Reply dockets in the public record" className="inline-flex items-center justify-center gap-2 bg-transparent text-[#f5f0e8] font-mono-dm text-[0.65rem] tracking-[0.13em] uppercase px-6 sm:px-8 py-3 sm:py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors">
              Browse Public Record
            </Link>
          </div>
          <p className="font-garamond italic text-xs sm:text-[0.88rem] text-gray-400 mt-5">
            Free to submit · Reviewed within 48 hours · Published permanently
          </p>
        </div>
      </section>

      {/* ── TRUST & POLICIES ── */}
      <section className="bg-[#ede8dc] border-y border-[#d4c8b4] py-6 sm:py-7 px-4 sm:px-6" aria-label="Editorial policies and standards">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-garamond italic text-xs sm:text-[0.95rem] text-[#302e2b] text-center sm:text-left">
            Governed by clear editorial principles. Independently operated.
          </p>
          <nav aria-label="Policy links">
            <div className="flex flex-wrap justify-center gap-0">
              {POLICIES.map((p, i) => (
                <span key={p.href}>
                  <Link href={p.href} title={`Read our ${p.name}`} className="font-mono-dm text-[0.58rem] tracking-[0.1em] uppercase text-[#302e2b] hover:text-[#1e2d4a] transition-colors no-underline">{p.name}</Link>
                  {i < POLICIES.length - 1 && <span className="text-[#ab946a] px-2 sm:px-3 font-serif" aria-hidden="true">·</span>}
                </span>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <Footer />
    </div>
  );
}