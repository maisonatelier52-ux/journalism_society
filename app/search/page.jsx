// app/search/page.jsx
"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FiSearch, 
  FiFileText, 
  FiFile, 
  FiMic, 
  FiBookOpen,
  FiArrowRight,
  FiCalendar,
  FiTag,
  FiX
} from "react-icons/fi";

/* ── FONTS STYLES ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .result-item {
      animation: fadeIn 0.3s ease forwards;
    }
  `}</style>
);

/* ── IMPORT DATA FROM EXISTING FILES ── */
// Dockets Data (from dockets page)
const ALL_DOCKETS = [
  { id: "JS-2026-001", title: "Right of Reply: Example Corp. on Alleged Financial Misreporting", summary: "Full corporate response to claims published on 14 March 2026, including verified exhibits, corrected financial timeline, and three independent auditor statements.", date: "2026-03-18", type: "Corporate", status: "Open", exhibits: 12, respondent: "Example Corp." },
  { id: "JS-2026-002", title: "City Council Response to Infrastructure Funding Report", summary: "Official council reply disputing figures cited in a regional outlet's investigation into infrastructure budget allocation.", date: "2026-03-19", type: "Government", status: "Open", exhibits: 7, respondent: "Kozhikode City Council" },
  { id: "JS-2026-003", title: "Healthcare Providers Alliance — Response to Billing Practices Claim", summary: "Detailed rebuttal with patient records summary, regulatory correspondence, and compliance certificates.", date: "2026-03-22", type: "Industry Body", status: "Open", exhibits: 19, respondent: "HPA Kerala Chapter" },
  { id: "JS-2026-004", title: "Prof. Rajan Menon: Correction to Peer-Review Plagiarism Allegation", summary: "Academic response with annotated source comparison documents and university ethics board findings.", date: "2026-02-28", type: "Individual", status: "Closed", exhibits: 5, respondent: "Prof. Rajan Menon" },
  { id: "JS-2026-005", title: "State Transport Corp. Reply to Safety Violations Report", summary: "Formal government body response disputing the scope of reported safety violations with inspection records.", date: "2026-02-14", type: "Government", status: "Closed", exhibits: 9, respondent: "Kerala STC" },
  { id: "JS-2026-006", title: "Merchant Association on Market Price Manipulation Claim", summary: "Industry body rebuttal with pricing data, wholesale records, and commodity board correspondence.", date: "2026-02-05", type: "Industry Body", status: "Closed", exhibits: 6, respondent: "Kozhikode Merchant Assoc." },
  { id: "JS-2026-007", title: "NGO Response to Fund Misuse Allegations", summary: "Nonprofit organisation's structured reply with complete audited accounts and donor communication logs.", date: "2026-01-30", type: "NGO", status: "Open", exhibits: 14, respondent: "Nilambur Relief Trust" },
  { id: "JS-2026-008", title: "Film Producer Right of Reply: Box Office Fraud Claim", summary: "Producer's documented response to allegations of theatrical booking manipulation, with ticket data.", date: "2026-01-22", type: "Individual", status: "Closed", exhibits: 3, respondent: "V. Krishnadas Productions" },
  { id: "JS-2026-009", title: "University Admissions Office: Response to Caste Bias Report", summary: "Institutional response with anonymised admission data, policy documents, and committee minutes.", date: "2026-01-10", type: "Institution", status: "Under Review", exhibits: 21, respondent: "Calicut University" },
  { id: "JS-2026-010", title: "Tech Startup Rebuttal to Data Privacy Breach Report", summary: "Startup's formal reply with security audit logs, CERT-In correspondence, and independent forensic summary.", date: "2025-12-18", type: "Corporate", status: "Closed", exhibits: 8, respondent: "Kozhitech Pvt. Ltd." },
  { id: "JS-2026-011", title: "Elected Representative Response to Corruption Allegation", summary: "MLA's documented reply with asset declarations, bank statements, and public records cross-reference.", date: "2025-12-05", type: "Government", status: "Under Review", exhibits: 16, respondent: "MLA, Beypore Constituency" },
  { id: "JS-2026-012", title: "School Management Reply to Mid-Day Meal Quality Report", summary: "Institution's rebuttal with supplier contracts, inspection records, and parent committee minutes.", date: "2025-11-28", type: "Institution", status: "Closed", exhibits: 4, respondent: "GHSS Feroke" },
];

// Documents Data (from document-room)
const ALL_DOCUMENTS = [
  { id: "DOC-001", title: "Healthcare Providers Alliance — Full Response Docket (JS-2026-003)", type: "Response Docket", date: "2026-03-22", checksum: "sha256:3f8a9b2c...e4d5", preview: "Full response including exhibits, legal review, and regulatory correspondence." },
  { id: "DOC-002", title: "Kerala Clinical Establishments Act — 2012 Amendment (Full Text)", type: "Regulatory Document", date: "2024-01-15", checksum: "sha256:7d2f1a8e...b9c3", preview: "Official government gazette notification of the 2012 amendment to the Kerala Clinical Establishments Act." },
  { id: "DOC-003", title: "NABH Standard Rate Card — Diagnostic Procedures, 2024 Edition", type: "Benchmark", date: "2024-03-10", checksum: "sha256:1e4f6a2b...c8d9", preview: "Standard reference rates for diagnostic procedures as published by NABH." },
  { id: "DOC-004", title: "HPA Kerala Chapter — Membership Register (Redacted)", type: "Institutional Record", date: "2025-12-01", checksum: "sha256:5a8c3b2d...f1e0", preview: "Redacted membership list of the HPA Kerala Chapter as of December 2025." },
  { id: "DOC-005", title: "Kerala Health Dept. Show-Cause Notice to HPA (17 March 2026)", type: "Regulatory Document", date: "2026-03-17", checksum: "sha256:9d4c2f6e...a7b8", preview: "Official show-cause notice issued by the Kerala Health Department to HPA Kerala Chapter." },
  { id: "DOC-006", title: "Independent Legal Review — Krishnaswamy & Associates (HPA Response)", type: "Legal Analysis", date: "2026-03-21", checksum: "sha256:2b7e5a1c...d3f4", preview: "Independent legal review commissioned by HPA regarding the billing circular cited in the article." },
  { id: "DOC-007", title: "The Malabar Record — 'Inside the Billing Cartel' (15 March 2026)", type: "Original Claim", date: "2026-03-15", checksum: "sha256:4c8a2f9b...e6d7", preview: "Full text of the investigative article that prompted the HPA response." },
  { id: "DOC-008", title: "Patient Feedback Survey Results — HPA Member Hospitals (2024–2025)", type: "Evidence", date: "2026-02-28", checksum: "sha256:6a1e4c8d...b2f3", preview: "Aggregate results of patient satisfaction and billing transparency surveys." },
  { id: "DOC-009", title: "Journalism Society — Right of Reply Guidelines", type: "Policy Document", date: "2025-06-10", checksum: "sha256:0f3a7c2e...d9b1", preview: "Official guidelines for submitting a Right of Reply docket." },
  { id: "DOC-010", title: "Kerala STC Safety Inspection Records (2025)", type: "Evidence", date: "2025-11-20", checksum: "sha256:8b4d2f1e...c7a9", preview: "Inspection records from the Kerala State Transport Corporation's 2025 safety audit." },
];

// Press Releases Data
const PRESS_RELEASES = [
  { id: "PR-2026-001", title: "Journalism Society Launches Public Record Platform for Right of Reply", date: "2026-03-20", category: "Announcement", excerpt: "Journalism Society announces the launch of a new public record platform dedicated to documenting responses, corrections, and evidence in response to media reports and public claims." },
  { id: "PR-2026-002", title: "Journalism Society Releases First Annual Transparency Report", date: "2026-03-15", category: "Report", excerpt: "The Journalism Society publishes its inaugural Transparency Report, detailing platform operations, submission statistics, and editorial decisions from the first quarter of 2026." },
  { id: "PR-2026-003", title: "Journalism Society Partners with Kerala Press Club on Media Literacy Initiative", date: "2026-03-10", category: "Partnership", excerpt: "Journalism Society announces a new partnership with the Kerala Press Club to launch a media literacy programme focused on Right of Reply mechanisms and public accountability." },
  { id: "PR-2026-004", title: "Journalism Society Announces Editorial Board Expansion", date: "2026-03-05", category: "Announcement", excerpt: "The Journalism Society expands its editorial board with five new members from legal, academic, and journalistic backgrounds to enhance review processes and editorial standards." },
  { id: "PR-2026-005", title: "Journalism Society Launches Media Watch Desk", date: "2026-02-28", category: "New Initiative", excerpt: "Journalism Society introduces Media Watch, a dedicated desk to track media coverage, identify corrections, and monitor the implementation of Right of Reply responses across news outlets." },
];

// Media Watch Data
const ALL_COVERAGE = [
  { id: "MW-001", docketId: "JS-2026-003", headline: "Inside the Billing Cartel: How Kerala's Hospitals Overcharged Thousands", outlet: "The Malabar Record", date: "2026-03-15", type: "Original Report", stance: "adversarial", summary: "4,200-word investigation naming six private hospitals and alleging a coordinated pricing structure." },
  { id: "MW-002", docketId: "JS-2026-003", headline: "Health dept issues notice to private hospital alliance over billing row", outlet: "The Hindu — Kerala", date: "2026-03-18", type: "News", stance: "neutral", summary: "Reporting on the Kerala Health Department's show-cause notice issued to HPA." },
  { id: "MW-003", docketId: "JS-2026-003", headline: "HPA rejects billing allegations; files public docket with Journalism Society", outlet: "Kerala Kaumudi", date: "2026-03-23", type: "Follow-up", stance: "neutral", summary: "Coverage of HPA's formal documented rebuttal." },
  { id: "MW-004", docketId: "JS-2026-002", headline: "Council funds misallocated in ring-road project, sources claim", outlet: "Kozhikode Chronicle", date: "2026-03-10", type: "Original Report", stance: "adversarial", summary: "Regional investigation citing anonymous municipal sources alleging fund misallocation." },
  { id: "MW-005", docketId: "JS-2026-001", headline: "Example Corp. faces scrutiny over Q3 earnings disclosure gaps", outlet: "Business Standard", date: "2026-03-01", type: "Original Report", stance: "adversarial", summary: "Financial desk report questioning whether Example Corp. complied with SEBI disclosure norms." },
];

const CATEGORIES = [
  { id: "dockets", name: "Dockets", icon: FiFileText, color: "#1e2d4a", bg: "#ede8dc" },
  { id: "documents", name: "Documents", icon: FiFile, color: "#b8974a", bg: "#faf6ee" },
  { id: "press", name: "Press Releases", icon: FiBookOpen, color: "#2d6a4f", bg: "#f0fdf4" },
  { id: "media", name: "Media Watch", icon: FiMic, color: "#b8190c", bg: "#fef2f2" },
];

const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

/* ── SEARCH RESULT COMPONENTS ── */
function DocketResult({ result }) {
  return (
    <Link href={`/dockets/${result.id}`} className="block group">
      <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5 hover:bg-white hover:shadow-md transition-all result-item">
        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-dm text-xs bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">{result.id}</span>
            <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.type}</span>
          </div>
          <div className="flex items-center gap-1 text-[#9a8870]">
            <FiCalendar size={12} />
            <span className="font-mono-dm text-xs">{fmtDate(result.date)}</span>
          </div>
        </div>
        <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
          {result.title}
        </h3>
        <p className="font-garamond text-[#7a6e5e] leading-relaxed mb-3 line-clamp-2">{result.summary}</p>
        <div className="flex items-center justify-between">
          <span className="font-garamond text-sm italic text-[#9a8870]">{result.respondent}</span>
          <span className="font-mono-dm text-xs uppercase text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
            View Docket <FiArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function DocumentResult({ result }) {
  return (
    <Link href={`/document-room/${result.id}`} className="block group">
      <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5 hover:bg-white hover:shadow-md transition-all result-item">
        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-dm text-xs bg-[#b8974a] text-[#f5f0e8] px-2 py-0.5">{result.id}</span>
            <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.type}</span>
          </div>
          <div className="flex items-center gap-1 text-[#9a8870]">
            <FiCalendar size={12} />
            <span className="font-mono-dm text-xs">{fmtDate(result.date)}</span>
          </div>
        </div>
        <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
          {result.title}
        </h3>
        <p className="font-garamond text-[#7a6e5e] leading-relaxed mb-3 line-clamp-2">{result.preview}</p>
        <div className="flex items-center justify-between">
          <span className="font-mono-dm text-xs text-[#9a8870]">{result.checksum.slice(0, 20)}...</span>
          <span className="font-mono-dm text-xs uppercase text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
            View Document <FiArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PressResult({ result }) {
  return (
    <Link href={`/press-releases/${result.id}`} className="block group">
      <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5 hover:bg-white hover:shadow-md transition-all result-item">
        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-dm text-xs bg-[#2d6a4f] text-[#f5f0e8] px-2 py-0.5">{result.id}</span>
            <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.category}</span>
          </div>
          <div className="flex items-center gap-1 text-[#9a8870]">
            <FiCalendar size={12} />
            <span className="font-mono-dm text-xs">{fmtDate(result.date)}</span>
          </div>
        </div>
        <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
          {result.title}
        </h3>
        <p className="font-garamond text-[#7a6e5e] leading-relaxed mb-3 line-clamp-2">{result.excerpt}</p>
        <div className="flex justify-end">
          <span className="font-mono-dm text-xs uppercase text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Release <FiArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function MediaResult({ result }) {
  return (
    <div className="block group cursor-pointer">
      <div className="border border-[#d4c8b4] bg-[#faf6ee] p-5 hover:bg-white hover:shadow-md transition-all result-item">
        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono-dm text-xs bg-[#b8190c] text-[#f5f0e8] px-2 py-0.5">{result.id}</span>
            <span className="font-mono-dm text-xs px-2 py-0.5 border border-[#c4b89a] text-[#7a6e5e]">{result.type}</span>
          </div>
          <div className="flex items-center gap-1 text-[#9a8870]">
            <FiCalendar size={12} />
            <span className="font-mono-dm text-xs">{fmtDate(result.date)}</span>
          </div>
        </div>
        <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2 group-hover:text-[#b8974a] transition-colors">
          {result.headline}
        </h3>
        <p className="font-garamond text-[#7a6e5e] leading-relaxed mb-2 line-clamp-2">{result.summary}</p>
        <div className="flex items-center justify-between">
          <span className="font-garamond text-sm italic text-[#9a8870]">{result.outlet}</span>
          <span className="font-mono-dm text-xs uppercase text-[#b8974a] flex items-center gap-1 group-hover:gap-2 transition-all">
            <FiTag size={10} /> {result.stance}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── LOADING COMPONENT ── */
function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Header />
      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="h-8 w-32 bg-[#3a4e6a] animate-pulse mb-4" />
          <div className="h-16 w-96 bg-[#2a3a54] animate-pulse mb-6" />
          <div className="h-14 w-full max-w-2xl bg-[#2a3a54] animate-pulse" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-[#e4ddd0] animate-pulse" />
          <div className="h-32 bg-[#faf6ee] animate-pulse rounded" />
          <div className="h-32 bg-[#faf6ee] animate-pulse rounded" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ── SEARCH CONTENT COMPONENT ── */
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return { dockets: [], documents: [], press: [], media: [], total: 0 };
    }

    const searchTerm = query.toLowerCase();
    
    const dockets = ALL_DOCKETS.filter(d => 
      d.title.toLowerCase().includes(searchTerm) ||
      d.id.toLowerCase().includes(searchTerm) ||
      d.summary.toLowerCase().includes(searchTerm) ||
      d.respondent.toLowerCase().includes(searchTerm)
    );

    const documents = ALL_DOCUMENTS.filter(d => 
      d.title.toLowerCase().includes(searchTerm) ||
      d.id.toLowerCase().includes(searchTerm) ||
      d.type.toLowerCase().includes(searchTerm) ||
      d.preview.toLowerCase().includes(searchTerm)
    );

    const press = PRESS_RELEASES.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.id.toLowerCase().includes(searchTerm) ||
      p.excerpt.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );

    const media = ALL_COVERAGE.filter(m => 
      m.headline.toLowerCase().includes(searchTerm) ||
      m.id.toLowerCase().includes(searchTerm) ||
      m.outlet.toLowerCase().includes(searchTerm) ||
      m.summary.toLowerCase().includes(searchTerm) ||
      m.docketId.toLowerCase().includes(searchTerm)
    );

    return {
      dockets,
      documents,
      press,
      media,
      total: dockets.length + documents.length + press.length + media.length
    };
  }, [query]);

  const getFilteredResults = () => {
    switch (activeCategory) {
      case "dockets":
        return searchResults.dockets;
      case "documents":
        return searchResults.documents;
      case "press":
        return searchResults.press;
      case "media":
        return searchResults.media;
      default:
        return null;
    }
  };

  const filteredResults = getFilteredResults();
  const showAllResults = activeCategory === "all";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
    }
  };

  const categoryCounts = {
    all: searchResults.total,
    dockets: searchResults.dockets.length,
    documents: searchResults.documents.length,
    press: searchResults.press.length,
    media: searchResults.media.length,
  };

  return (
    <>
      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="font-mono-dm text-xs tracking-[0.16em] text-[#3a4e6a] uppercase mb-4">
            Public Record / Search
          </p>
          <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6">
            Search the<br />
            <em className="text-[#b8974a] font-normal">Public Record</em>
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8870]" size={20} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-[#faf6ee] border border-[#d4c8b4] pl-12 pr-12 py-4 font-garamond text-lg text-[#1e2d4a] focus:outline-none focus:border-[#b8974a] transition-colors"
              placeholder="Search by keyword, docket ID, organisation, or publication..."
              autoFocus
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a8870] hover:text-[#1e2d4a] transition-colors"
              >
                <FiX size={18} />
              </button>
            )}
          </form>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        {!query ? (
          <div className="text-center py-20">
            <FiSearch size={64} className="mx-auto text-[#c4b89a] mb-4" />
            <p className="font-playfair text-2xl text-[#1e2d4a] mb-2">Enter a search term</p>
            <p className="font-garamond text-[#9a8870]">Search across dockets, documents, press releases, and media coverage</p>
          </div>
        ) : searchResults.total === 0 ? (
          <div className="text-center py-20">
            <p className="font-playfair text-3xl text-[#c4b89a] mb-4">No results found</p>
            <p className="font-garamond text-lg text-[#9a8870] mb-6">
              We couldn't find anything matching "{query}"
            </p>
            <p className="font-mono-dm text-sm text-[#7a6e5e]">
              Try different keywords or check your spelling
            </p>
          </div>
        ) : (
          <>
            {/* Search Summary */}
            <div className="mb-8 pb-4 border-b border-[#d4c8b4]">
              <p className="font-mono-dm text-sm text-[#9a8870]">
                Found <span className="text-[#b8974a] font-bold">{searchResults.total}</span> results for "{query}"
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-[#e4ddd0] pb-4">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 font-mono-dm text-xs tracking-wider uppercase transition-all ${
                      isActive
                        ? "bg-[#1e2d4a] text-[#f5f0e8]"
                        : "bg-transparent text-[#7a6e5e] hover:bg-[#ede8dc]"
                    }`}
                  >
                    <Icon size={14} />
                    {cat.name}
                    <span className={`ml-1 px-1.5 py-0.5 text-xs ${
                      isActive ? "bg-[#f5f0e8] text-[#1e2d4a]" : "bg-[#ede8dc] text-[#7a6e5e]"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={() => setActiveCategory("all")}
                className={`flex items-center gap-2 px-4 py-2 font-mono-dm text-xs tracking-wider uppercase transition-all ${
                  activeCategory === "all"
                    ? "bg-[#1e2d4a] text-[#f5f0e8]"
                    : "bg-transparent text-[#7a6e5e] hover:bg-[#ede8dc]"
                }`}
              >
                <FiSearch size={14} />
                All Results
                <span className={`ml-1 px-1.5 py-0.5 text-xs ${
                  activeCategory === "all" ? "bg-[#f5f0e8] text-[#1e2d4a]" : "bg-[#ede8dc] text-[#7a6e5e]"
                }`}>
                  {searchResults.total}
                </span>
              </button>
            </div>

            {/* Results Display */}
            {showAllResults ? (
              <div className="space-y-8">
                {searchResults.dockets.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <FiFileText size={20} className="text-[#1e2d4a]" />
                      <h2 className="font-playfair font-bold text-xl text-[#1e2d4a]">Dockets</h2>
                      <span className="font-mono-dm text-xs bg-[#ede8dc] px-2 py-0.5 text-[#7a6e5e]">
                        {searchResults.dockets.length} results
                      </span>
                    </div>
                    <div className="grid gap-4">
                      {searchResults.dockets.slice(0, 5).map(docket => (
                        <DocketResult key={docket.id} result={docket} />
                      ))}
                      {searchResults.dockets.length > 5 && (
                        <button
                          onClick={() => setActiveCategory("dockets")}
                          className="text-center font-mono-dm text-sm text-[#b8974a] hover:text-[#1e2d4a] transition-colors py-2"
                        >
                          View all {searchResults.dockets.length} docket results →
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {searchResults.documents.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4 mt-8">
                      <FiFile size={20} className="text-[#b8974a]" />
                      <h2 className="font-playfair font-bold text-xl text-[#1e2d4a]">Documents</h2>
                      <span className="font-mono-dm text-xs bg-[#ede8dc] px-2 py-0.5 text-[#7a6e5e]">
                        {searchResults.documents.length} results
                      </span>
                    </div>
                    <div className="grid gap-4">
                      {searchResults.documents.slice(0, 5).map(doc => (
                        <DocumentResult key={doc.id} result={doc} />
                      ))}
                      {searchResults.documents.length > 5 && (
                        <button
                          onClick={() => setActiveCategory("documents")}
                          className="text-center font-mono-dm text-sm text-[#b8974a] hover:text-[#1e2d4a] transition-colors py-2"
                        >
                          View all {searchResults.documents.length} document results →
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {searchResults.press.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4 mt-8">
                      <FiBookOpen size={20} className="text-[#2d6a4f]" />
                      <h2 className="font-playfair font-bold text-xl text-[#1e2d4a]">Press Releases</h2>
                      <span className="font-mono-dm text-xs bg-[#ede8dc] px-2 py-0.5 text-[#7a6e5e]">
                        {searchResults.press.length} results
                      </span>
                    </div>
                    <div className="grid gap-4">
                      {searchResults.press.slice(0, 5).map(release => (
                        <PressResult key={release.id} result={release} />
                      ))}
                      {searchResults.press.length > 5 && (
                        <button
                          onClick={() => setActiveCategory("press")}
                          className="text-center font-mono-dm text-sm text-[#b8974a] hover:text-[#1e2d4a] transition-colors py-2"
                        >
                          View all {searchResults.press.length} press release results →
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {searchResults.media.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4 mt-8">
                      <FiMic size={20} className="text-[#b8190c]" />
                      <h2 className="font-playfair font-bold text-xl text-[#1e2d4a]">Media Watch</h2>
                      <span className="font-mono-dm text-xs bg-[#ede8dc] px-2 py-0.5 text-[#7a6e5e]">
                        {searchResults.media.length} results
                      </span>
                    </div>
                    <div className="grid gap-4">
                      {searchResults.media.slice(0, 5).map(media => (
                        <MediaResult key={media.id} result={media} />
                      ))}
                      {searchResults.media.length > 5 && (
                        <button
                          onClick={() => setActiveCategory("media")}
                          className="text-center font-mono-dm text-sm text-[#b8974a] hover:text-[#1e2d4a] transition-colors py-2"
                        >
                          View all {searchResults.media.length} media results →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredResults && filteredResults.length > 0 ? (
                  filteredResults.map(result => {
                    if (activeCategory === "dockets") {
                      return <DocketResult key={result.id} result={result} />;
                    } else if (activeCategory === "documents") {
                      return <DocumentResult key={result.id} result={result} />;
                    } else if (activeCategory === "press") {
                      return <PressResult key={result.id} result={result} />;
                    } else if (activeCategory === "media") {
                      return <MediaResult key={result.id} result={result} />;
                    }
                    return null;
                  })
                ) : (
                  <div className="text-center py-12">
                    <p className="font-garamond text-[#9a8870]">No results found in this category</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Search Tips */}
        {query && searchResults.total > 0 && (
          <div className="mt-12 pt-8 border-t border-[#d4c8b4]">
            <div className="bg-[#ede8dc] border border-[#d4c8b4] p-5">
              <p className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870] mb-3">Search Tips</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-garamond text-sm text-[#1e2d4a] font-semibold mb-1">Try searching by:</p>
                  <ul className="space-y-1 text-sm text-[#7a6e5e] font-garamond">
                    <li>• Docket ID (e.g., JS-2026-003)</li>
                    <li>• Organisation name (e.g., HPA Kerala Chapter)</li>
                    <li>• Publication name (e.g., The Hindu)</li>
                    <li>• Date ranges (e.g., March 2026)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-garamond text-sm text-[#1e2d4a] font-semibold mb-1">Advanced filters:</p>
                  <ul className="space-y-1 text-sm text-[#7a6e5e] font-garamond">
                    <li>• Use category tabs to narrow results</li>
                    <li>• Combine terms for better results</li>
                    <li>• Check spelling for accuracy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

/* ── MAIN SEARCH PAGE WITH SUSPENSE ── */
export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />
      <Header />
      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}