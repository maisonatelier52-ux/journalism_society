// app/ethics/page.jsx
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiHeart, FiShield, FiLock, FiAlertTriangle, FiUserCheck, FiEyeOff } from "react-icons/fi";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }
  `}</style>
);

const PRINCIPLES = [
  {
    title: "Fairness to All Parties",
    description: "We treat every respondent equally, regardless of status, background, or the nature of the claim against them. No preferential treatment.",
    icon: FiHeart,
    color: "#b8974a"
  },
  {
    title: "No Bias",
    description: "We do not favour any political, commercial, or ideological position. Our editorial decisions are based solely on evidence and guidelines.",
    icon: FiShield,
    color: "#1e2d4a"
  },
  {
    title: "Respect for Privacy",
    description: "We redact sensitive personal information when appropriate and respect boundaries of privacy in public records.",
    icon: FiEyeOff,
    color: "#2d6a4f"
  },
  {
    title: "No Manipulation",
    description: "We do not edit, alter, or manipulate submitted content. Every response is published exactly as received.",
    icon: FiLock,
    color: "#b8190c"
  }
];

const CONFLICTS = [
  "All staff and editors must disclose any potential conflicts of interest.",
  "We do not accept submissions from parties with whom editors have personal or professional relationships without disclosure.",
  "Advisory board members recuse themselves from decisions where conflicts exist.",
  "Financial relationships with any respondent or claimant are disclosed publicly.",
  "We maintain editorial independence from all funding sources."
];

const PROHIBITED = [
  "Hate speech or discriminatory content targeting protected groups",
  "Defamation without supporting evidence or documentation",
  "Fabricated or manipulated documents presented as evidence",
  "Content that violates Indian law or court orders",
  "Personal contact information without consent"
];

export default function EthicsClient() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />
      <Header />

      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="font-mono-dm text-xs tracking-[0.16em] text-[#adb7c4] uppercase mb-4">
            Our Integrity
          </p>
          <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6 max-w-4xl">
            Ethics<br />
            <em className="text-[#b8974a] font-normal">Policy</em>
          </h1>
          <p className="font-garamond text-xl leading-relaxed text-[#8a9bb8] max-w-3xl">
            The ethical framework that governs our editorial decisions. Our commitment to fairness, independence, and integrity.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        
        {/* Core Principles */}
        <div className="mb-12">
          <div className="border-l-4 border-[#b8974a] pl-5 mb-8">
            <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-2">Core Principles</p>
            <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">What Guides Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PRINCIPLES.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
                  <div className="flex items-start gap-4">
                    <Icon size={28} style={{ color: principle.color }} className="flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">{principle.title}</h3>
                      <p className="font-garamond text-[#1a1818] leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conflicts of Interest */}
        <div className="mb-12">
          <div className="border-l-4 border-[#b8974a] pl-5 mb-6">
            <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Conflicts of Interest</h2>
          </div>
          <div className="bg-[#faf6ee] border border-[#d4c8b4] p-6">
            <div className="flex items-start gap-4 mb-6">
              <FiUserCheck size={24} className="text-[#b8974a] flex-shrink-0 mt-1" />
              <p className="font-playfair font-semibold text-lg text-[#1e2d4a]">We take conflicts seriously.</p>
            </div>
            <ul className="space-y-3">
              {CONFLICTS.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[#1a1818] font-garamond">
                  <span className="text-[#b8974a] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prohibited Content */}
        <div className="mb-12">
          <div className="border-l-4 border-[#b8974a] pl-5 mb-6">
            <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Prohibited Content</h2>
          </div>
          <div className="bg-[#fef2f2] border border-[#fecaca] p-6">
            <div className="flex items-start gap-4 mb-6">
              <FiAlertTriangle size={24} className="text-[#b8190c] flex-shrink-0 mt-1" />
              <p className="font-playfair font-semibold text-lg text-[#b8190c]">We do not publish:</p>
            </div>
            <ul className="space-y-3">
              {PROHIBITED.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[#1a1818] font-garamond">
                  <span className="text-[#b8190c] mt-1">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reporting Violations */}
        <div className="bg-[#ede8dc] border border-[#d4c8b4] p-8 text-center">
          <h3 className="font-playfair font-bold text-2xl text-[#1e2d4a] mb-3">Report an Ethical Concern</h3>
          <p className="font-garamond text-[#7a6e5e] mb-4 max-w-2xl mx-auto">
            If you believe any published content violates our ethics policy or if you have concerns about our editorial process, please contact us.
          </p>
          <a 
            href="mailto:ethics@journalismsociety.org" 
            className="inline-block font-mono-dm text-sm tracking-wider uppercase text-[#b8974a] hover:text-[#1e2d4a] transition-colors"
          >
            ethics@journalismsociety.org →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}