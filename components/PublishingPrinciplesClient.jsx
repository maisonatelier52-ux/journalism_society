// app/publishing-principles/page.jsx
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FiCheckCircle, 
  FiShield, 
  FiEye, 
  FiFileText, 
  FiLock,
  FiGlobe,
  FiClock
} from "react-icons/fi";

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
    title: "Accuracy & Fairness",
    description: "We verify all submissions for evidence quality and relevance. Every response is published in full, with all supporting exhibits attached.",
    icon: FiCheckCircle,
    color: "#2d6a4f"
  },
  {
    title: "No Misleading Content",
    description: "We do not publish unsubstantiated claims. All responses must be supported by verifiable evidence.",
    icon: FiShield,
    color: "#1e2d4a"
  },
  {
    title: "Verification",
    description: "Every exhibit is reviewed for authenticity. We require original documents, official records, or verifiable correspondence.",
    icon: FiEye,
    color: "#b8974a"
  },
  {
    title: "Evidence Required",
    description: "Submissions without supporting evidence are returned for clarification or rejected.",
    icon: FiFileText,
    color: "#b8190c"
  },
  {
    title: "Transparency",
    description: "All publication dates, review times, and update logs are visible on each docket. Nothing is hidden.",
    icon: FiGlobe,
    color: "#1e2d4a"
  },
  {
    title: "Completeness",
    description: "We publish the full response, all exhibits, timeline entries, and media coverage for every docket.",
    icon: FiFileText,
    color: "#2d6a4f"
  },
  {
    title: "Independence",
    description: "No external influence on editorial decisions. We operate independently of any government, corporate, or political interest.",
    icon: FiLock,
    color: "#b8974a"
  },
  {
    title: "Timely Publication",
    description: "We aim to review submissions within 3-5 business days and communicate clearly about any delays.",
    icon: FiClock,
    color: "#b8190c"
  }
];

export default function PublishingPrinciplesClient() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />
      <Header />

      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="font-mono-dm text-xs tracking-[0.16em] text-[#adb7c4] uppercase mb-4">
            Our Philosophy
          </p>
          <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6 max-w-4xl">
            Publishing<br />
            <em className="text-[#b8974a] font-normal">Principles</em>
          </h1>
          <p className="font-garamond text-xl leading-relaxed text-[#8a9bb8] max-w-3xl">
            The core values that guide everything we publish. Our commitment to accuracy, fairness, and transparency.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon;
            return (
              <div key={principle.title} className="border border-[#d4c8b4] bg-[#faf6ee] p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon size={28} style={{ color: principle.color }} />
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">{principle.title}</h3>
                    <p className="font-garamond text-[#1a1818] leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-[#ede8dc] border border-[#d4c8b4] p-8 text-center">
          <p className="font-garamond text-lg italic text-[#5a5040] max-w-3xl mx-auto">
            "We publish for the record, not for the moment. Every docket is a permanent, verifiable document of public accountability."
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}