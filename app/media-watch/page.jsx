
// app/media-watch/page.jsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FiSearch,
  FiArrowRight,
  FiCheck,
  FiAlertCircle,
  FiX,
  FiExternalLink,
  FiPlus,
  FiRefreshCw,
} from "react-icons/fi";
import mediaAPI from "@/services/mediaApi";
import docketsAPI from "@/services/docketsApi";

/* ── FONTS STYLES ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    html, body { font-family: 'EB Garamond', Georgia, serif; overflow-x: hidden; }

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }

    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ticker-track {
      display: flex;
      gap: 0;
      animation: ticker 32s linear infinite;
      width: max-content;
    }
    .ticker-track:hover { animation-play-state: paused; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .toast-animation { animation: fadeUp 0.3s ease forwards; }

    @keyframes successPop {
      0%   { opacity: 0; transform: scale(0.85); }
      60%  { transform: scale(1.04); }
      100% { opacity: 1; transform: scale(1); }
    }
    .success-pop { animation: successPop 0.35s ease forwards; }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .spin { animation: spin 0.8s linear infinite; }

    @keyframes shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position: 600px 0; }
    }
    .skeleton {
      background: linear-gradient(90deg, #e4ddd0 25%, #ede8dc 50%, #e4ddd0 75%);
      background-size: 600px 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 2px;
    }

    /* Custom scrollbar */
    .filter-scroll::-webkit-scrollbar {
      height: 3px;
    }
    .filter-scroll::-webkit-scrollbar-track {
      background: #e4ddd0;
    }
    .filter-scroll::-webkit-scrollbar-thumb {
      background: #b8974a;
      border-radius: 2px;
    }
    
    .docket-dropdown::-webkit-scrollbar {
      width: 6px;
    }
    .docket-dropdown::-webkit-scrollbar-track {
      background: #ede8dc;
    }
    .docket-dropdown::-webkit-scrollbar-thumb {
      background: #c4b89a;
      border-radius: 3px;
    }
    .docket-dropdown::-webkit-scrollbar-thumb:hover {
      background: #b8974a;
    }
  `}</style>
);

/* ── CONSTANTS ── */
const STANCE_CFG = {
  adversarial: { color: "#b8190c", bg: "#fef2f2", border: "#fecaca", label: "Adversarial" },
  neutral:     { color: "#5a6a84", bg: "#f0f4fa", border: "#c8d4e8", label: "Neutral" },
  supportive:  { color: "#2d6a4f", bg: "#f0fdf4", border: "#bbf7d0", label: "Supportive" },
  pending:     { color: "#b8974a", bg: "#fffbeb", border: "#fde68a", label: "Pending Review" },
};

const TYPE_COLORS = {
  "Original Report": { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  "Follow-up":       { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  "News":            { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  "Opinion":         { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
  "Regional":        { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  "Fact-Check":      { bg: "#f0fdfa", text: "#0f766e", border: "#99f6e4" },
  "Other":           { bg: "#f8fafc", text: "#475569", border: "#cbd5e1" },
};

const fmtDate = (iso) => {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

/* ── SKELETON CARD ── */
function SkeletonCard() {
  return (
    <div className="flex border border-[#d4c8b4] bg-[#faf6ee] overflow-hidden">
      <div className="w-1 flex-shrink-0 skeleton" />
      <div className="flex-1 p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
        <div className="flex justify-between">
          <div className="skeleton h-3 w-16 sm:h-4 sm:w-20 rounded" />
          <div className="skeleton h-3 w-12 sm:h-4 sm:w-16 rounded" />
        </div>
        <div className="skeleton h-2 w-20 sm:h-3 sm:w-28 rounded" />
        <div className="border-t border-[#e4ddd0] pt-2 sm:pt-3 flex flex-col gap-2">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-4/5 rounded" />
          <div className="skeleton h-2 w-full rounded" />
          <div className="skeleton h-2 w-3/4 rounded" />
        </div>
        <div className="mt-auto pt-2 border-t border-[#e4ddd0]">
          <div className="skeleton h-2 w-20 sm:h-3 sm:w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

/* ── SUBMIT CITATION MODAL ── */
/* ── SUBMIT CITATION MODAL ── */
function SubmitCitationModal({ onClose, onSuccess, dockets }) {
  const [form, setForm] = useState({
    publication: "",
    type: "Follow-up",
    url: "",
    date: "",
    headline: "",
    docketId: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docketSearch, setDocketSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDocket, setSelectedDocket] = useState(null);

  const filteredDockets = dockets.filter(d =>
    d.id.toLowerCase().includes(docketSearch.toLowerCase()) ||
    d.title.toLowerCase().includes(docketSearch.toLowerCase())
  );

  const selectDocket = (docket) => {
    setSelectedDocket(docket);
    setForm({ ...form, docketId: docket.id });
    setDocketSearch(`${docket.id} — ${docket.title}`);
    setShowDropdown(false);
    if (errors.docketId) {
      setErrors({ ...errors, docketId: "" });
    }
  };

  const handleDocketSearchChange = (e) => {
    const value = e.target.value;
    setDocketSearch(value);
    setShowDropdown(true);
    if (value === "") {
      setSelectedDocket(null);
      setForm({ ...form, docketId: "" });
    }
  };

  const validate = () => {
    const e = {};
    if (!form.publication.trim()) e.publication = "Publication name is required";
    if (!form.headline.trim()) e.headline = "Headline is required";
    if (!form.url.trim()) e.url = "Article URL is required";
    if (!form.date) e.date = "Publication date is required";
    if (!form.docketId) e.docketId = "Please select which docket this relates to";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await mediaAPI.submitCitation({
        outlet: form.publication,
        headline: form.headline,
        url: form.url,
        date: form.date,
        type: form.type,
        note: form.note,
        docketId: form.docketId,
      });

      if (onSuccess) onSuccess(result);
      setSubmitted(true);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error("Error submitting citation:", error);
      if (error.response?.status === 409) {
        setErrors({ submit: error.response?.data?.message || "This media entry already exists for this docket." });
      } else {
        setErrors({ submit: error.response?.data?.message || "Failed to submit. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.docket-search-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0f1e]/90 flex items-center justify-center p-4 sm:p-5" onClick={onClose}>
      <div className="w-full max-w-[95%] sm:max-w-[560px] bg-[#f5f0e8] border-t-4 border-[#b8974a] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#1e2d4a] p-4 sm:p-5 flex justify-between items-start">
          <div>
            <p className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.14em] text-[#3a4e6a] uppercase mb-1">Media Watch</p>
            <h3 className="font-playfair font-bold text-base sm:text-[1.15rem] text-[#f5f0e8]">Submit a Media Citation</h3>
          </div>
          <button onClick={onClose} className="text-[#3a4e6a] hover:text-[#c8bfa8] transition-colors p-1 cursor-pointer">
            <FiX size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="success-pop p-6 sm:p-10 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2d6a4f] flex items-center justify-center mx-auto mb-4">
              <FiCheck size={20} className="sm:w-6 sm:h-6 text-[#f5f0e8]" />
            </div>
            <p className="font-playfair font-bold text-base sm:text-[1.1rem] text-[#1e2d4a] mb-2">Citation Submitted</p>
            <p className="font-garamond text-sm sm:text-[0.95rem] leading-relaxed text-[#6a5e4e] mb-5">
              <strong>{form.publication}</strong>'s coverage has been flagged for editorial review.
            </p>
            <button onClick={onClose} className="font-mono-dm bg-[#1e2d4a] text-[#f5f0e8] px-5 sm:px-6 py-2 sm:py-2.5 text-[0.55rem] sm:text-[0.6rem] tracking-[0.12em] uppercase cursor-pointer">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <p className="font-garamond text-sm sm:text-[0.92rem] italic text-[#7a6e5e] leading-relaxed mb-4 sm:mb-5 border-l-2 border-[#b8974a] pl-3">
              Know of coverage that isn't listed? Submit it for editorial review.
            </p>

            {/* Duplicate Error Display */}
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b8190c" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                <p className="font-garamond text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="mb-4 docket-search-container">
              <label className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                Search & Select Docket <span className="text-[#b8974a]">*</span>
              </label>
              <div className="relative">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={14} />
                  <input
                    type="text"
                    value={docketSearch}
                    onChange={handleDocketSearchChange}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Type docket ID or title to search..."
                    className={`w-full bg-[#faf6ee] border pl-9 sm:pl-10 pr-8 p-2 font-garamond text-sm sm:text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.docketId ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                  />
                  {docketSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setDocketSearch("");
                        setSelectedDocket(null);
                        setForm({ ...form, docketId: "" });
                        setShowDropdown(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8870] hover:text-[#1e2d4a] cursor-pointer"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </div>
                
                {showDropdown && docketSearch && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d4c8b4] max-h-60 overflow-y-auto z-10 shadow-lg docket-dropdown">
                    {filteredDockets.length === 0 ? (
                      <div className="p-3 text-center font-garamond text-[#9a8870]">
                        No dockets found matching "{docketSearch}"
                      </div>
                    ) : (
                      filteredDockets.map((docket) => (
                        <div
                          key={docket.id}
                          onClick={() => selectDocket(docket)}
                          className="p-3 hover:bg-[#ede8dc] cursor-pointer border-b border-[#e4ddd0] last:border-0 transition-colors"
                        >
                          <p className="font-mono-dm text-xs text-[#b8974a]">{docket.id}</p>
                          <p className="font-garamond text-sm text-[#1e2d4a] line-clamp-2">{docket.title}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              {errors.docketId && <p className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] text-[#b8190c] mt-1">{errors.docketId}</p>}
              {selectedDocket && (
                <p className="font-mono-dm text-xs text-[#2d6a4f] mt-1 flex items-center gap-1">
                  <FiCheck size={12} /> Selected: {selectedDocket.id}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2.5 mb-4">
              <div className="flex-1">
                <label className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                  Publication <span className="text-[#b8974a]">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full bg-[#faf6ee] border p-2 font-garamond text-sm sm:text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.publication ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                  value={form.publication}
                  onChange={(e) => setForm({ ...form, publication: e.target.value })}
                  placeholder="e.g. NDTV, BBC"
                />
                {errors.publication && <p className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] text-[#b8190c] mt-1">{errors.publication}</p>}
              </div>
              <div className="sm:w-[130px]">
                <label className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">Type</label>
                <select
                  className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2 font-garamond text-sm sm:text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] cursor-pointer"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  {["Original Report", "Follow-up", "Opinion", "Fact-Check", "News", "Regional", "Other"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                Headline <span className="text-[#b8974a]">*</span>
              </label>
              <input
                type="text"
                className={`w-full bg-[#faf6ee] border p-2 font-garamond text-sm sm:text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.headline ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                placeholder="Full article title"
              />
              {errors.headline && <p className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] text-[#b8190c] mt-1">{errors.headline}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2.5 mb-4">
              <div className="flex-1">
                <label className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                  Article URL <span className="text-[#b8974a]">*</span>
                </label>
                <input
                  type="url"
                  className={`w-full bg-[#faf6ee] border p-2 font-garamond text-sm sm:text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] ${errors.url ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                />
                {errors.url && <p className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] text-[#b8190c] mt-1">{errors.url}</p>}
              </div>
              <div className="sm:w-[130px]">
                <label className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                  Date <span className="text-[#b8974a]">*</span>
                </label>
                <input
                  type="date"
                  className={`w-full bg-[#faf6ee] border p-2 font-garamond text-sm sm:text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] cursor-pointer ${errors.date ? "border-[#b8190c]" : "border-[#d4c8b4]"}`}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                {errors.date && <p className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] text-[#b8190c] mt-1">{errors.date}</p>}
              </div>
            </div>

            <div className="mb-5">
              <label className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.14em] uppercase text-[#9a8870] block mb-1.5">
                Summary / Note <span className="text-[#b8b0a0]">(optional)</span>
              </label>
              <textarea
                className="w-full bg-[#faf6ee] border border-[#d4c8b4] p-2 font-garamond text-sm sm:text-[0.97rem] text-[#1e2d4a] focus:outline-none focus:border-[#1e2d4a] resize-y min-h-[60px]"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Brief summary of the article or key points from the coverage..."
              />
            </div>

            <div className="bg-[#ede8dc] border border-[#d4c8b4] p-2.5 mb-5 flex gap-2">
              <FiAlertCircle size={13} className="text-[#9a8870] flex-shrink-0 mt-0.5" />
              <p className="font-garamond text-xs sm:text-[0.86rem] italic text-[#7a6e5e]">
                All citations are reviewed before appearing in the public record.
              </p>
            </div>

            <div className="flex gap-2.5 justify-end">
              <button type="button" onClick={onClose} disabled={isSubmitting}
                className="font-mono-dm bg-transparent border border-[#c4b89a] text-[#7a6e5e] px-4 sm:px-5 py-1.5 sm:py-2 text-[0.55rem] sm:text-[0.58rem] tracking-[0.1em] uppercase cursor-pointer hover:bg-[#ede8dc] transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting}
                className="font-mono-dm bg-[#1e2d4a] text-[#f5f0e8] px-4 sm:px-5 py-1.5 sm:py-2 text-[0.55rem] sm:text-[0.58rem] tracking-[0.1em] uppercase cursor-pointer hover:bg-[#2a3f6a] transition-colors disabled:opacity-50">
                {isSubmitting ? "Submitting..." : "Submit Citation →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── ARTICLE PREVIEW MODAL ── */
function ArticlePreviewModal({ item, onClose }) {
  if (!item) return null;
  const sc = STANCE_CFG[item.stance] || STANCE_CFG.pending;
  const tc = TYPE_COLORS[item.type] || TYPE_COLORS["News"];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0f1e]/90 flex items-center justify-center p-4 sm:p-5" onClick={onClose}>
      <div className="w-full max-w-[95%] sm:max-w-[480px] bg-[#f5f0e8]" onClick={(e) => e.stopPropagation()}>
        <div className="h-1" style={{ background: sc.color }} />
        <div className="p-3 sm:p-4 border-b border-[#e4ddd0] flex justify-between items-start gap-3">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="font-mono-dm text-[0.55rem] sm:text-[0.62rem] font-medium tracking-[0.1em] uppercase text-[#1e2d4a]">{item.outlet}</span>
            <span className="px-1.5 py-0.5 border text-[0.45rem] sm:text-[0.52rem] tracking-[0.08em] uppercase" style={{ borderColor: tc.border, background: tc.bg, color: tc.text }}>
              {item.type}
            </span>
            <span className="px-1.5 py-0.5 border flex items-center gap-1 text-[0.45rem] sm:text-[0.52rem]" style={{ borderColor: sc.border, background: sc.bg, color: sc.color }}>
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ background: sc.color }} />
              {sc.label}
            </span>
          </div>
          <button onClick={onClose} className="text-[#b8b0a0] hover:text-[#1e2d4a] transition-colors cursor-pointer">
            <FiX size={15} />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <p className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] text-[#9a8870] tracking-[0.1em] uppercase mb-2">{fmtDate(item.date)}</p>
          <h3 className="font-playfair font-bold text-base sm:text-[1.15rem] leading-tight text-[#1e2d4a] mb-3">{item.headline}</h3>
          <div className="bg-[#ede8dc] border border-[#d4c8b4] p-3 mb-4">
            <p className="font-mono-dm text-[0.48rem] sm:text-[0.52rem] tracking-[0.12em] uppercase text-[#9a8870] mb-1.5">Summary</p>
            <p className="font-garamond text-sm sm:text-[0.97rem] leading-relaxed text-[#4a4035]">{item.summary || "No summary available."}</p>
          </div>

          {item.docketId && (
            <div className="flex items-center justify-between p-2.5 border border-[#d4c8b4] bg-[#faf6ee] mb-4">
              <div>
                <p className="font-mono-dm text-[0.45rem] sm:text-[0.5rem] tracking-[0.12em] uppercase text-[#9a8870] mb-0.5">Related Docket</p>
                <p className="font-mono-dm text-[0.55rem] sm:text-[0.62rem] text-[#1e2d4a]">{item.docketId}</p>
              </div>
              <Link href={`/dockets/${item.docketId}`} onClick={onClose} className="font-mono-dm text-[0.5rem] sm:text-[0.56rem] tracking-[0.1em] uppercase text-[#b8974a] no-underline">
                View Docket →
              </Link>
            </div>
          )}

          <a href={item.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between bg-[#1e2d4a] p-3 no-underline hover:bg-[#2a3f6a] transition-colors">
            <span className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.12em] uppercase text-[#f5f0e8]">Read Full Article</span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] text-[#6a7a94]">{item.outlet}</span>
              <FiExternalLink size={10} className="sm:w-3 sm:h-3 text-[#6a7a94]" />
            </span>
          </a>
          <p className="font-mono-dm text-[0.45rem] sm:text-[0.5rem] text-[#b8b0a0] tracking-[0.08em] mt-2 text-center">Opens in new tab · External content</p>
        </div>
      </div>
    </div>
  );
}

/* ── TOAST ── */
function Toast({ message, type, onClose }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg toast-animation"
      style={{ background: type === "success" ? "#2d6a4f" : "#b8190c", color: "#fff" }}>
      {type === "success" ? <FiCheck size={14} className="sm:w-4 sm:h-4" /> : <FiAlertCircle size={14} className="sm:w-4 sm:h-4" />}
      <span className="font-mono-dm text-sm sm:text-[0.8rem] tracking-[0.05em]">{message}</span>
      <button onClick={onClose} className="ml-2 text-white opacity-70 hover:opacity-100 cursor-pointer"><FiX size={14} /></button>
    </div>
  );
}

/* ── ERROR STATE ── */
function ErrorState({ onRetry }) {
  return (
    <div className="text-center py-16 sm:py-20 border border-[#d4c8b4] bg-[#faf6ee]">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fee2e2] flex items-center justify-center mx-auto mb-4">
        <FiAlertCircle size={18} className="sm:w-5 sm:h-5 text-[#b8190c]" />
      </div>
      <p className="font-playfair font-bold text-lg sm:text-[1.2rem] text-[#1e2d4a] mb-2">Failed to load media</p>
      <p className="font-garamond text-sm sm:text-[0.97rem] italic text-[#9a8870] mb-6">Unable to reach the server. Please check your connection.</p>
      <button onClick={onRetry}
        className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.12em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-5 sm:px-6 py-2 sm:py-2.5 flex items-center gap-2 mx-auto hover:bg-[#2a3f6a] transition-colors cursor-pointer">
        <FiRefreshCw size={11} className="sm:w-3 sm:h-3" />
        Try Again
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function MediaWatchPage() {
  const [coverage, setCoverage] = useState([]);
  const [docketsList, setDocketsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDockets, setLoadingDockets] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [docketFilter, setDocketFilter] = useState("All");
  const [outletFilter, setOutletFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [stanceFilter, setStanceFilter] = useState("All");
  const [sortBy, setSort] = useState("newest");
  const [view, setView] = useState("cards");

  const [previewItem, setPreviewItem] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchMedia = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await mediaAPI.getAllMedia();
      const items = Array.isArray(data) ? data : (data.media || data.data || []);
      setCoverage(items);
    } catch (err) {
      console.error("Error fetching media:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchDockets = async () => {
    setLoadingDockets(true);
    try {
      const response = await docketsAPI.getAllDockets();
      const dockets = Array.isArray(response) ? response : (response.dockets || []);
      setDocketsList(dockets);
    } catch (err) {
      console.error("Error fetching dockets:", err);
      setDocketsList([]);
    } finally {
      setLoadingDockets(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    fetchDockets();
  }, []);

  const uniqueOutlets = useMemo(() =>
    ["All", ...Array.from(new Set(coverage.map((c) => c.outlet))).sort()],
    [coverage]
  );

  const uniqueDocketIds = useMemo(() => {
    const ids = new Set(coverage.map((c) => c.docketId).filter(Boolean));
    return ["All", ...Array.from(ids)];
  }, [coverage]);

  const uniqueTypes = useMemo(() =>
    ["All", ...Array.from(new Set(coverage.map((c) => c.type).filter(Boolean)))],
    [coverage]
  );

  const uniqueStances = ["All", "adversarial", "neutral", "supportive"];

  const counts = useMemo(() => ({
    total: coverage.length,
    adversarial: coverage.filter((c) => c.stance === "adversarial").length,
    neutral: coverage.filter((c) => c.stance === "neutral").length,
    supportive: coverage.filter((c) => c.stance === "supportive").length,
    pending: coverage.filter((c) => c.stance === "pending").length,
    outlets: new Set(coverage.map((c) => c.outlet)).size,
  }), [coverage]);

  const filtered = useMemo(() => {
    let l = [...coverage];
    if (search.trim()) {
      const q = search.toLowerCase();
      l = l.filter(
        (c) =>
          (c.headline || "").toLowerCase().includes(q) ||
          (c.outlet || "").toLowerCase().includes(q) ||
          (c.docketId || "").toLowerCase().includes(q) ||
          (c.summary || "").toLowerCase().includes(q)
      );
    }
    if (docketFilter !== "All") l = l.filter((c) => (c.docketId || c.docket) === docketFilter);
    if (outletFilter !== "All") l = l.filter((c) => c.outlet === outletFilter);
    if (typeFilter !== "All") l = l.filter((c) => c.type === typeFilter);
    if (stanceFilter !== "All") l = l.filter((c) => c.stance === stanceFilter);
    l.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    return l;
  }, [search, docketFilter, outletFilter, typeFilter, stanceFilter, sortBy, coverage]);

  const hasFilters = search || docketFilter !== "All" || outletFilter !== "All" || typeFilter !== "All" || stanceFilter !== "All";
  const clearAll = () => {
    setSearch(""); setDocketFilter("All"); setOutletFilter("All"); setTypeFilter("All"); setStanceFilter("All");
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCitationSuccess = () => {
    showToast("Citation submitted! It will appear after editorial review.", "success");
    fetchMedia();
  };

  const tickerItems = coverage.slice(0, 6);

  const formattedDockets = useMemo(() => {
    return docketsList.map(d => ({
      id: d._id || d.id,
      title: d.response?.title || d.title || d.docketId || "Untitled",
    }));
  }, [docketsList]);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />

      {previewItem && <ArticlePreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />}
      {showSubmit && (
        <SubmitCitationModal
          onClose={() => setShowSubmit(false)}
          onSuccess={handleCitationSuccess}
          dockets={formattedDockets}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <Header />

      {/* Banner */}
      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-11 md:py-12">
          <p className="font-mono-dm text-[0.5rem] sm:text-[0.56rem] tracking-[0.16em] text-[#3a4e6a] uppercase mb-3">
            Public Record / Media Watch
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <h1 className="font-playfair font-black text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] text-[#f5f0e8]">
              Media<br /><em className="text-[#b8974a] font-normal">Watch</em>
            </h1>
            <p className="font-garamond text-sm sm:text-base italic text-[#8a9bb8] max-w-[380px] leading-relaxed">
              All media coverage across every active docket — tracked, categorised, and cross-referenced for full accountability.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10">
            {[
              { val: counts.total,       label: "Total Articles",  accent: "#f5f0e8" },
              { val: counts.adversarial, label: "Adversarial",     accent: "#b8190c" },
              { val: counts.neutral,     label: "Neutral",         accent: "#8a9bb8" },
              { val: counts.supportive,  label: "Supportive",      accent: "#2d6a4f" },
              { val: counts.pending,     label: "Pending Review",  accent: "#b8974a" },
              { val: counts.outlets,     label: "Publications",    accent: "#c8bfa8" },
            ].map((s) => (
              <div key={s.label} className="bg-[#1e2d4a]/60 p-3 sm:p-4">
                <div className="h-0.5 mb-2 sm:mb-3" style={{ background: s.accent }} />
                {loading ? (
                  <div className="skeleton h-6 w-8 sm:h-8 sm:w-10 mb-1.5 rounded" />
                ) : (
                  <div className="font-playfair font-black text-xl sm:text-2xl md:text-3xl leading-none" style={{ color: s.accent }}>{s.val}</div>
                )}
                <div className="font-mono-dm text-[0.48rem] sm:text-[0.52rem] tracking-[0.12em] uppercase text-[#3a4e6a] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker */}
      {tickerItems.length > 0 && (
        <div className="bg-[#0d1a2e] border-b border-white/10 overflow-hidden">
          <div className="flex items-center h-8 sm:h-9">
            <div className="bg-[#b8974a] px-2.5 sm:px-3.5 h-full flex items-center flex-shrink-0">
              <span className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] tracking-[0.14em] uppercase text-[#1e2d4a] font-medium">Latest</span>
            </div>
            <div className="overflow-hidden flex-1">
              <div className="ticker-track">
                {[...tickerItems, ...tickerItems].map((item, i) => (
                  <button key={i} onClick={() => setPreviewItem(item)}
                    className="bg-transparent border-none cursor-pointer flex items-center gap-0 p-0 flex-shrink-0">
                    <span className="px-3 sm:px-5 pl-4 sm:pl-6 font-mono-dm text-[0.5rem] sm:text-[0.58rem] text-[#8a9bb8] tracking-[0.05em] whitespace-nowrap">{item.outlet}</span>
                    <span className="font-mono-dm text-[0.5rem] sm:text-[0.6rem] text-[#3a4e6a]">·</span>
                    <span className="px-4 sm:px-6 pl-3 sm:pl-5 font-garamond text-[0.7rem] sm:text-[0.82rem] text-[#c8bfa8] whitespace-nowrap">
                      {(item.headline || "").length > 60 ? item.headline.slice(0, 60) + "…" : item.headline}
                    </span>
                    <span className="font-mono-dm text-[0.5rem] sm:text-[0.6rem] text-[#2a3a54]">|</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-9 pb-16 sm:pb-20">

        {/* Filter Bar */}
        <div className="bg-[#ede8dc] border border-[#d4c8b4] p-3 mb-1">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={13} />
              <input
                type="text"
                className="w-full bg-[#faf6ee] border-b-2 border-[#1e2d4a] pl-8 pr-8 py-2 font-garamond text-sm sm:text-base text-[#1e2d4a] focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by headline, outlet, docket ID…"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8870] hover:text-[#1e2d4a] cursor-pointer">
                  <FiX size={14} />
                </button>
              )}
            </div>

            <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

            {/* Stance filter */}
            <div className="flex gap-1.5 items-center flex-wrap">
              <span className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] tracking-[0.12em] uppercase text-[#9a8870] mr-0.5">Stance</span>
              {uniqueStances.map((s) => (
                <button key={s} onClick={() => setStanceFilter(s)}
                  className={`font-mono-dm text-[0.5rem] sm:text-[0.58rem] tracking-[0.12em] uppercase px-2 sm:px-3 py-1 border transition-all whitespace-nowrap cursor-pointer ${
                    stanceFilter === s
                      ? "bg-[#1e2d4a] text-[#f5f0e8] border-[#1e2d4a]"
                      : "bg-transparent text-[#7a6e5e] border-[#c4b89a] hover:border-[#9a8870] hover:text-[#3a3028]"
                  }`}>
                  {s === "All" ? "All" : STANCE_CFG[s]?.label || s}
                </button>
              ))}
            </div>

            <div className="hidden md:block w-px h-6 bg-[#c4b89a]" />

            {/* Sort + View */}
            <div className="flex items-center justify-between md:justify-end gap-3 ml-auto">
              <div className="flex gap-2 items-center">
                <span className="font-mono-dm text-[0.48rem] sm:text-[0.52rem] tracking-[0.1em] uppercase text-[#9a8870]">Sort</span>
                {[["newest", "Latest"], ["oldest", "Oldest"]].map(([val, label]) => (
                  <React.Fragment key={val}>
                    <button onClick={() => setSort(val)}
                      className={`font-mono-dm text-[0.5rem] sm:text-[0.56rem] tracking-[0.1em] uppercase cursor-pointer ${sortBy === val ? "text-[#1e2d4a] font-medium" : "text-[#9a8870]"} hover:text-[#1e2d4a] transition-colors`}>
                      {label}
                    </button>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex border border-[#c4b89a] overflow-hidden">
                {[
                  { k: "cards", icon: <svg width="11" height="11" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg> },
                  { k: "list",  icon: <svg width="11" height="11" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg> },
                ].map(({ k, icon }) => (
                  <button key={k} onClick={() => setView(k)}
                    className="p-1.5 flex items-center transition-colors cursor-pointer"
                    style={view === k ? { background: "#1e2d4a", color: "#f5f0e8" } : { background: "transparent", color: "#9a8870" }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary filter row - scrollable on mobile */}
        <div className="filter-scroll py-2 pb-3 flex gap-1.5 flex-nowrap overflow-x-auto items-center" style={{ WebkitOverflowScrolling: "touch" }}>
          <span className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.12em] uppercase text-[#9a8870] mr-0.5 flex-shrink-0">Docket</span>
          {uniqueDocketIds.slice(0, 4).map((d) => (
            <button key={d} onClick={() => setDocketFilter(d)}
              className={`font-mono-dm text-[0.55rem] sm:text-[0.58rem] tracking-[0.12em] uppercase px-2 sm:px-3 py-1 border transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                docketFilter === d
                  ? "bg-[#1e2d4a] text-[#f5f0e8] border-[#1e2d4a]"
                  : "bg-transparent text-[#7a6e5e] border-[#c4b89a] hover:border-[#9a8870] hover:text-[#3a3028]"
              }`}>
              {typeof d === 'string' && d.length > 15 ? d.slice(0, 12) + '...' : d}
            </button>
          ))}
          {uniqueDocketIds.length > 4 && (
            <select onChange={(e) => setDocketFilter(e.target.value)} value={docketFilter}
              className="font-mono-dm text-[0.55rem] sm:text-[0.58rem] tracking-[0.08em] uppercase border border-[#c4b89a] px-2 py-1 pl-2 pr-6 cursor-pointer outline-none bg-[#faf6ee] text-[#7a6e5e] appearance-none flex-shrink-0"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23c4b89a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 6px center" }}>
              {uniqueDocketIds.map((d) => <option key={d}>{d}</option>)}
            </select>
          )}

          <div className="w-px h-3 bg-[#d4c8b4] mx-1" />

          <span className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.12em] uppercase text-[#9a8870] mr-0.5 flex-shrink-0">Type</span>
          {uniqueTypes.slice(0, 3).map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`font-mono-dm text-[0.55rem] sm:text-[0.58rem] tracking-[0.12em] uppercase px-2 sm:px-3 py-1 border transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                typeFilter === t
                  ? "bg-[#1e2d4a] text-[#f5f0e8] border-[#1e2d4a]"
                  : "bg-transparent text-[#7a6e5e] border-[#c4b89a] hover:border-[#9a8870] hover:text-[#3a3028]"
              }`}>
              {t}
            </button>
          ))}
          {uniqueTypes.length > 3 && (
            <select onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}
              className="font-mono-dm text-[0.55rem] sm:text-[0.58rem] tracking-[0.08em] uppercase border border-[#c4b89a] px-2 py-1 pl-2 pr-6 cursor-pointer outline-none bg-[#faf6ee] text-[#7a6e5e] appearance-none flex-shrink-0"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23c4b89a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 6px center" }}>
              {uniqueTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          )}

          <div className="w-px h-3 bg-[#d4c8b4] mx-1" />

          <span className="font-mono-dm text-[0.5rem] sm:text-[0.52rem] tracking-[0.12em] uppercase text-[#9a8870] mr-0.5 flex-shrink-0">Outlet</span>
          <select onChange={(e) => setOutletFilter(e.target.value)} value={outletFilter}
            className="font-mono-dm text-[0.55rem] sm:text-[0.58rem] tracking-[0.08em] uppercase border border-[#c4b89a] px-2 py-1 pl-2 pr-6 cursor-pointer outline-none bg-[#faf6ee] text-[#7a6e5e] appearance-none flex-shrink-0"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23c4b89a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 6px center" }}>
            {uniqueOutlets.map((o) => <option key={o}>{o}</option>)}
          </select>

          {hasFilters && (
            <button onClick={clearAll}
              className="font-mono-dm text-[0.5rem] sm:text-[0.56rem] tracking-[0.1em] uppercase border border-dashed border-[#b8974a] text-[#b8974a] px-2 sm:px-3 py-1 ml-1 hover:bg-[#ede8dc] transition-colors cursor-pointer whitespace-nowrap flex-shrink-0">
              Reset
            </button>
          )}

          <span className="hidden sm:block font-mono-dm text-[0.5rem] sm:text-[0.56rem] tracking-[0.1em] uppercase text-[#9a8870] ml-auto flex-shrink-0">
            {loading ? "Loading…" : `${filtered.length} of ${coverage.length}`}
          </span>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error state */}
        {!loading && error && <ErrorState onRetry={fetchMedia} />}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 sm:py-20 border border-[#d4c8b4]">
            <p className="font-playfair italic text-xl sm:text-[1.8rem] text-[#c4b89a] mb-2">
              {coverage.length === 0 ? "No media coverage yet" : "No coverage found"}
            </p>
            <p className="font-garamond text-sm sm:text-base text-[#9a8870]">
              {coverage.length === 0
                ? "Be the first to submit a media citation."
                : "Try adjusting your filters or search terms."}
            </p>
            {coverage.length === 0 && (
              <button onClick={() => setShowSubmit(true)}
                className="mt-5 sm:mt-6 font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.12em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-5 sm:px-6 py-2 sm:py-2.5 inline-flex items-center gap-2 hover:bg-[#2a3f6a] transition-colors cursor-pointer">
                <FiPlus size={11} />
                Submit a Media Citation
              </button>
            )}
          </div>
        )}

        {/* Cards view */}
        {!loading && !error && view === "cards" && filtered.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filtered.map((item, idx) => {
                const sc = STANCE_CFG[item.stance] || STANCE_CFG.pending;
                const tc = TYPE_COLORS[item.type] || TYPE_COLORS["News"];
                return (
                  <div key={item._id || item.id || idx}
                    onClick={() => setPreviewItem(item)}
                    className="flex border border-[#d4c8b4] bg-[#faf6ee] cursor-pointer hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden group">
                    <div className="w-1 flex-shrink-0" style={{ background: sc.color }} />
                    <div className="flex-1 p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5">
                      <div className="flex items-start justify-between gap-1">
                        <div className="flex gap-1 flex-wrap">
                          <span className="px-1 py-0.5 border text-[0.45rem] sm:text-[0.5rem] tracking-[0.08em] uppercase" style={{ borderColor: tc.border, background: tc.bg, color: tc.text }}>
                            {item.type}
                          </span>
                          <span className="px-1 py-0.5 border flex items-center gap-1 text-[0.45rem] sm:text-[0.5rem]" style={{ borderColor: sc.border, background: sc.bg, color: sc.color }}>
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ background: sc.color }} />
                            <span className="hidden sm:inline">{sc.label}</span>
                          </span>
                        </div>
                        <span className="font-mono-dm text-[0.45rem] sm:text-[0.52rem] text-[#9a8870] whitespace-nowrap flex-shrink-0">{fmtDate(item.date)}</span>
                      </div>

                      <span className="font-mono-dm text-[0.55rem] sm:text-[0.62rem] font-medium tracking-[0.1em] uppercase text-[#1e2d4a] truncate">{item.outlet}</span>

                      <div className="border-t border-[#1e2d4a] pt-2 sm:pt-3">
                        <p className="font-playfair font-bold text-sm sm:text-base leading-tight text-[#1e2d4a] mb-1 sm:mb-2 line-clamp-2">{item.headline}</p>
                        <p className="font-garamond text-[0.75rem] sm:text-[0.88rem] leading-relaxed text-[#7a6e5e] line-clamp-2">{item.summary}</p>
                      </div>

                      <div className="mt-auto pt-2 border-t border-[#e4ddd0] flex justify-between items-center">
                        {item.docketId ? (
                          <Link href={`/dockets/${item.docketId}`} onClick={(e) => e.stopPropagation()}
                            className="font-mono-dm text-[0.45rem] sm:text-[0.52rem] tracking-[0.1em] uppercase text-[#b8974a] no-underline">
                            {item.docketId.length > 12 ? item.docketId.slice(0, 10) + '…' : item.docketId} →
                          </Link>
                        ) : (
                          <span className="font-mono-dm text-[0.45rem] sm:text-[0.52rem] text-[#c4b89a]">No docket linked</span>
                        )}
                        <FiArrowRight size={11} className="sm:w-3 sm:h-3 text-[#1e2d4a] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Mobile result count */}
            <div className="mt-4 text-center sm:hidden">
              <span className="font-mono-dm text-xs text-[#9a8870]">
                {filtered.length} of {coverage.length} articles
              </span>
            </div>
          </>
        )}

        {/* List view */}
        {!loading && !error && view === "list" && filtered.length > 0 && (
          <>
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              <div style={{ minWidth: "700px" }}>
                <div className="grid grid-cols-[80px_1fr_140px_90px_70px_24px] gap-3 items-center pb-2 border-b-2 border-[#1e2d4a]">
                  <span className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870]">Type</span>
                  <span className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870]">Headline</span>
                  <span className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870]">Outlet</span>
                  <span className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870]">Docket</span>
                  <span className="font-mono-dm text-[0.5rem] sm:text-[0.54rem] tracking-[0.1em] uppercase text-[#9a8870]">Date</span>
                  <span />
                </div>

                {filtered.map((item, idx) => {
                  const sc = STANCE_CFG[item.stance] || STANCE_CFG.pending;
                  const tc = TYPE_COLORS[item.type] || TYPE_COLORS["News"];
                  return (
                    <div key={item._id || item.id || idx}
                      onClick={() => setPreviewItem(item)}
                      className="grid grid-cols-[80px_1fr_140px_90px_70px_24px] gap-3 items-center py-3 border-b border-[#e4ddd0] cursor-pointer hover:bg-[#ede8dc] transition-colors group">
                      <div className="flex flex-col gap-1">
                        <span className="px-1.5 py-0.5 border inline-block text-[0.45rem] sm:text-[0.5rem] tracking-[0.08em] uppercase w-fit" style={{ borderColor: tc.border, background: tc.bg, color: tc.text }}>
                          {item.type}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full" style={{ background: sc.color }} />
                          <span className="font-mono-dm text-[0.45rem] uppercase" style={{ color: sc.color, letterSpacing: "0.08em" }}>{sc.label}</span>
                        </span>
                      </div>

                      <div>
                        <p className="font-playfair font-bold text-sm leading-tight text-[#1e2d4a] mb-1 line-clamp-1">{item.headline}</p>
                      </div>

                      <span className="font-mono-dm text-[0.55rem] font-medium tracking-[0.08em] uppercase text-[#1e2d4a] truncate">{item.outlet}</span>

                      {item.docketId ? (
                        <Link href={`/dockets/${item.docketId}`} onClick={(e) => e.stopPropagation()}
                          className="font-mono-dm text-[0.55rem] text-[#b8974a] no-underline tracking-[0.06em] truncate">
                          {item.docketId}
                        </Link>
                      ) : (
                        <span className="font-mono-dm text-[0.55rem] text-[#c4b89a]">—</span>
                      )}

                      <span className="font-mono-dm text-[0.55rem] text-[#9a8870]">{fmtDate(item.date)}</span>

                      <FiArrowRight size={14} className="text-[#b8974a] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Mobile result count */}
            <div className="mt-4 text-center sm:hidden">
              <span className="font-mono-dm text-xs text-[#9a8870]">
                {filtered.length} of {coverage.length} articles
              </span>
            </div>
          </>
        )}

        {/* Footer CTA */}
        {!loading && !error && filtered.length > 0 && (
          <div className="mt-10 sm:mt-14 pt-5 sm:pt-7 border-t-2 border-[#1e2d4a] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-playfair font-bold text-base sm:text-[1.15rem] text-[#1e2d4a] mb-1">See coverage we've missed?</p>
              <p className="font-garamond text-sm sm:text-[0.95rem] italic text-[#9a8870]">Help build the most complete media record for each docket.</p>
            </div>
            <button onClick={() => setShowSubmit(true)}
              className="font-mono-dm text-[0.55rem] sm:text-[0.6rem] tracking-[0.12em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-5 sm:px-6 py-2.5 sm:py-3.5 flex items-center gap-2 hover:bg-[#2a3f6a] transition-colors cursor-pointer">
              <FiPlus size={11} />
              Submit a Media Citation
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}