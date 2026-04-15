// app/corrections/page.jsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiEdit, FiInfo, FiRefreshCw, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }
  `}</style>
);

const CORRECTION_LOG = [
  { date: "2026-03-25", docketId: "JS-2026-001", type: "Correction", description: "Timeline date corrected from 2026-03-14 to 2026-03-15 to match exhibit documentation." },
  { date: "2026-03-20", docketId: "JS-2026-003", type: "Clarification", description: "Added clarifying note to exhibit EX-07 regarding page numbering format." },
  { date: "2026-03-15", docketId: "DOC-007", type: "Update", description: "Updated document preview to include full exhibit metadata." },
  { date: "2026-03-10", docketId: "JS-2026-002", type: "Correction", description: "Corrected respondent name from 'Kozhikode Municipal Corporation' to 'Kozhikode City Council'." },
  { date: "2026-03-05", docketId: "MW-003", type: "Clarification", description: "Added note clarifying that media citation was updated with additional context." },
  { date: "2026-02-28", docketId: "JS-2026-007", type: "Correction", description: "Corrected exhibit count from 13 to 14 after verification." }
];

const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function CorrectionsClient() {
  const [showAll, setShowAll] = useState(false);
  const displayedLog = showAll ? CORRECTION_LOG : CORRECTION_LOG.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />
      <Header />

      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="font-mono-dm text-xs tracking-[0.16em] text-[#adb7c4] uppercase mb-4">
            Accountability
          </p>
          <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6 max-w-4xl">
            Corrections &<br />
            <em className="text-[#b8974a] font-normal">Clarifications</em>
          </h1>
          <p className="font-garamond text-xl leading-relaxed text-[#8a9bb8] max-w-3xl">
            We are committed to accuracy. When we make mistakes, we correct them promptly and transparently.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        
        {/* Policy Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
            <FiEdit size={32} className="text-[#b8974a] mb-4" />
            <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">Correction</h3>
            <p className="font-garamond text-[#1a1818] leading-relaxed">
              For factual errors in dates, names, or data. Original content is preserved with correction notes.
            </p>
          </div>
          <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
            <FiInfo size={32} className="text-[#b8974a] mb-4" />
            <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">Clarification</h3>
            <p className="font-garamond text-[#1a1818] leading-relaxed">
              For context or ambiguity issues. Added to provide additional clarity without changing content.
            </p>
          </div>
          <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
            <FiRefreshCw size={32} className="text-[#b8974a] mb-4" />
            <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">Update</h3>
            <p className="font-garamond text-[#1a1818] leading-relaxed">
              For new information or developments after publication. Appended with date and source.
            </p>
          </div>
        </div>

        {/* Policy Statement */}
        <div className="bg-[#ede8dc] border border-[#d4c8b4] p-6 mb-12">
          <div className="flex items-start gap-4">
            <FiAlertCircle size={24} className="text-[#b8974a] flex-shrink-0 mt-1" />
            <div>
              <p className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2">Our Corrections Policy</p>
              <p className="font-garamond text-[#1a1818] leading-relaxed mb-3">
                We correct errors promptly and transparently. When a correction is made, we:
              </p>
              <ul className="space-y-2 text-[#1a1818] font-garamond">
                <li className="flex items-start gap-2">
                  <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
                  <span>Add a correction note to the docket</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
                  <span>Preserve the original content with a strike-through or note</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
                  <span>Log the correction in this public log</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle size={16} className="text-[#2d6a4f] flex-shrink-0 mt-1" />
                  <span>Notify the respondent of significant corrections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Correction Log */}
        <div>
          <div className="border-l-4 border-[#b8974a] pl-5 mb-6">
            <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-2">Public Log</p>
            <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Correction Log</h2>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-[#1e2d4a] font-mono-dm text-xs tracking-widest uppercase text-[#6e5a40] font-semibold">
              <span className="col-span-2">Date</span>
              <span className="col-span-2">Docket</span>
              <span className="col-span-2">Type</span>
              <span className="col-span-6">Description</span>
            </div>
            {displayedLog.map((entry) => (
              <div key={`${entry.date}-${entry.docketId}`} className="grid grid-cols-12 gap-4 py-3 border-b border-[#e4ddd0] items-start">
                <span className="col-span-2 font-mono-dm text-sm text-[#9a8870]">{fmtDate(entry.date)}</span>
                <span className="col-span-2 font-mono-dm text-sm text-[#b8974a]">{entry.docketId}</span>
                <span className="col-span-2">
                  <span className={`inline-block px-2 py-0.5 text-xs font-mono-dm uppercase tracking-wider ${
                    entry.type === "Correction" ? "bg-[#fef2f2] text-[#b8190c] border border-[#fecaca]" :
                    entry.type === "Clarification" ? "bg-[#fffbeb] text-[#b8974a] border border-[#fde68a]" :
                    "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]"
                  }`}>
                    {entry.type}
                  </span>
                </span>
                <span className="col-span-6 font-garamond text-sm text-[#1a1818]">{entry.description}</span>
              </div>
            ))}
          </div>

          {CORRECTION_LOG.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-6 font-mono-dm text-sm text-[#b8974a] hover:text-[#1e2d4a] transition-colors"
            >
              {showAll ? "Show fewer" : `View all ${CORRECTION_LOG.length} corrections →`}
            </button>
          )}
        </div>

        <div className="mt-12 pt-6 border-t border-[#d4c8b4]">
          <p className="font-garamond text-sm text-[#9a8870] text-center">
            Last updated: 25 March 2026 • For corrections older than 6 months, please contact our editorial team.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}