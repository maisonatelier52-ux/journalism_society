// app/editorial-standards/page.jsx
"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FiUsers, 
  FiFileText, 
  FiCheckCircle, 
  FiXCircle, 
  FiShield,
  FiBookOpen,
  FiClock,
  FiEye,
  FiArrowRight
} from "react-icons/fi";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }
  `}</style>
);

const GOVERNANCE = [
  {
    title: "Editorial Desk",
    description: "Handles all incoming submissions, performs initial review for completeness, and coordinates with respondents for clarifications.",
    icon: FiFileText,
    color: "#1e2d4a"
  },
  {
    title: "Standards Editor",
    description: "Ensures consistency across all published dockets, maintains editorial guidelines, and reviews appeals on editorial decisions.",
    icon: FiBookOpen,
    color: "#b8974a"
  },
  {
    title: "Legal Review",
    description: "Reviews submissions for legal compliance, assesses potential defamation concerns, and ensures proper documentation of evidence.",
    icon: FiShield,
    color: "#2d6a4f"
  },
  {
    title: "Advisory Board",
    description: "Provides policy guidance, reviews platform operations, and ensures adherence to our core principles of fairness and transparency.",
    icon: FiUsers,
    color: "#b8190c"
  }
];

const WORKFLOW_STEPS = [
  { step: "1", title: "Submission", description: "Respondent submits full response with supporting exhibits and timeline entries." },
  { step: "2", title: "Review", description: "Editorial team reviews for completeness, evidence quality, and compliance with guidelines." },
  { step: "3", title: "Verification", description: "Legal review and fact-checking to ensure all claims are substantiated by exhibits." },
  { step: "4", title: "Publication", description: "Docket is published permanently in the public record with a unique ID and full metadata." }
];

export default function EditorialStandardsClient() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />
      <Header />

      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="font-mono-dm text-xs tracking-[0.16em] text-[#adb7c4] uppercase mb-4">
            Our Standards
          </p>
          <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6 max-w-4xl">
            Editorial<br />
            <em className="text-[#b8974a] font-normal">Standards</em>
          </h1>
          <p className="font-garamond text-xl leading-relaxed text-[#8a9bb8] max-w-3xl">
            How we review, verify, and publish Right of Reply submissions. Our commitment to fairness, transparency, and evidence-based publishing.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        
        {/* Governance Section */}
        <div className="mb-16">
          <div className="border-l-4 border-[#b8974a] pl-5 mb-8">
            <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-2">Governance</p>
            <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Who Makes the Decisions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {GOVERNANCE.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border border-[#d4c8b4] bg-[#faf6ee] p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon size={28} style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">{item.title}</h3>
                      <p className="font-garamond text-[#1a1818] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workflow Section */}
        <div className="mb-16">
          <div className="border-l-4 border-[#b8974a] pl-5 mb-8">
            <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-2">Workflow</p>
            <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">From Submission to Publication</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#d4c8b4] hidden md:block" />
            {WORKFLOW_STEPS.map((step, index) => (
              <div key={step.step} className="relative flex flex-col md:flex-row gap-6 mb-8 last:mb-0">
                <div className="md:w-1/4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[#b8974a] flex items-center justify-center text-[#f5f0e8] font-playfair font-black text-2xl z-10 relative">
                      {step.step}
                    </div>
                    <span className="font-mono-dm text-sm text-[#9a8870] hidden md:block">{step.title}</span>
                  </div>
                </div>
                <div className="md:w-3/4 bg-[#faf6ee] border border-[#d4c8b4] p-6">
                  <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">{step.title}</h3>
                  <p className="font-garamond text-[#1a1818] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Publish */}
        <div className="mb-16">
          <div className="border-l-4 border-[#b8974a] pl-5 mb-8">
            <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-2">Our Content</p>
            <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">What We Publish</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Full Responses (Unaltered)", description: "Every response is published exactly as submitted, without editing or modification.", icon: FiFileText, color: "#1e2d4a" },
              { title: "Verified Exhibits", description: "All supporting documents are archived permanently with unique exhibit IDs.", icon: FiCheckCircle, color: "#2d6a4f" },
              { title: "Timeline Entries", description: "Chronological documentation of claims, responses, and related events.", icon: FiClock, color: "#b8974a" },
              { title: "Media Coverage", description: "All media reports about each docket, categorised by stance and type.", icon: FiEye, color: "#b8190c" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
                  <div className="flex items-start gap-4">
                    <Icon size={24} style={{ color: item.color }} className="flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2">{item.title}</h3>
                      <p className="font-garamond text-[#1a1818] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What We Do NOT Do */}
        <div className="mb-16">
          <div className="border-l-4 border-[#b8974a] pl-5 mb-8">
            <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-2">Our Boundaries</p>
            <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">What We Do NOT Do</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Edit Responses", description: "We never alter, edit, or modify the content of a submitted response.", icon: FiXCircle, color: "#b8190c" },
              { title: "Take Sides", description: "We do not advocate for or against any claim or response.", icon: FiXCircle, color: "#b8190c" },
              { title: "Publish Unverified Claims", description: "Every response requires supporting evidence before publication.", icon: FiXCircle, color: "#b8190c" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
                  <div className="flex items-start gap-4">
                    <Icon size={24} style={{ color: item.color }} className="flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2">{item.title}</h3>
                      <p className="font-garamond text-[#1a1818] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Neutrality Statement */}
        <div className="bg-[#ede8dc] border border-[#d4c8b4] p-8 md:p-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#b8974a] flex items-center justify-center mx-auto mb-6">
              <FiShield size={28} className="text-[#f5f0e8]" />
            </div>
            <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870] mb-3">Our Commitment</p>
            <h3 className="font-playfair font-bold text-2xl text-[#1e2d4a] mb-4">We do not determine truth.</h3>
            <p className="font-garamond text-xl leading-relaxed text-[#5a5040] mb-4">
              "We present claims and responses. We verify evidence. We publish the record."
            </p>
            <p className="font-garamond text-[#7a6e5e] leading-relaxed">
              Truth is established by the parties involved and the evidence they present. Our role is to ensure 
              that all sides are heard and that the public record is complete, verifiable, and permanent.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}