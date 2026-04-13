// app/about/page.jsx
"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FiShield, 
  FiUsers, 
  FiBookOpen, 
  FiGlobe, 
  FiAward, 
  FiHeart,
  FiCheckCircle,
  FiFileText,
  FiMic,
  FiLock,
  FiExternalLink
} from "react-icons/fi";

/* ── FONTS STYLES ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
    .font-mono-dm  { font-family: 'DM Mono', monospace; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up {
      animation: fadeUp 0.5s ease forwards;
    }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
  `}</style>
);

const VALUES = [
  {
    icon: FiShield,
    title: "Accountability",
    description: "We believe that every public claim deserves a documented response. Our platform ensures that no statement goes unanswered, creating a permanent record of accountability.",
    color: "#1e2d4a"
  },
  {
    icon: FiUsers,
    title: "Access for All",
    description: "The Right of Reply should not be limited to those with resources. Our platform is free, open, and accessible to every individual and organisation.",
    color: "#b8974a"
  },
  {
    icon: FiBookOpen,
    title: "Transparency",
    description: "We publish full responses, complete exhibits, and clear editorial decisions. Nothing is hidden, redacted, or altered without disclosure.",
    color: "#2d6a4f"
  },
  {
    icon: FiGlobe,
    title: "Public Record",
    description: "Our dockets are permanent, searchable, and freely available to anyone. We believe in building a shared resource for truth and accountability.",
    color: "#b8190c"
  }
];

const PRINCIPLES = [
  {
    title: "Independence",
    description: "We operate independently of any government, corporation, or political affiliation. Our editorial decisions are guided solely by evidence and our commitment to fairness.",
    icon: FiLock
  },
  {
    title: "Verification",
    description: "Every submission undergoes editorial review to verify evidence quality and relevance. We do not publish unsubstantiated claims.",
    icon: FiCheckCircle
  },
  {
    title: "Fairness",
    description: "We treat all respondents equally, regardless of their status, background, or the nature of the claim against them. Every submission is reviewed with the same standards.",
    icon: FiHeart
  },
  {
    title: "Permanence",
    description: "Once published, dockets become permanent public records. We do not remove responses except in rare cases of proven factual error or legal necessity.",
    icon: FiAward
  }
];

const TIMELINE = [
  { year: "2024", title: "Concept & Research", description: "Journalism Society founded to address the gap in documented Right of Reply mechanisms in Indian media." },
  { year: "2025", title: "Platform Development", description: "Built the public record platform with input from journalists, lawyers, and media ethicists." },
  { year: "2026", title: "Public Launch", description: "Launched with 12 pilot dockets, establishing the first comprehensive Right of Reply public record in India." }
];

const TEAM = [
  {
    name: "Dr. Anjali Nair",
    role: "Editorial Director",
    bio: "Former investigative journalist with 15 years of experience in media accountability and press ethics.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  },
  {
    name: "Rajesh Menon",
    role: "Legal Counsel",
    bio: "Constitutional law expert specializing in media law and the Right of Reply jurisprudence.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
  },
  {
    name: "Priya Krishnan",
    role: "Editorial Lead",
    bio: "Former senior editor with expertise in fact-checking, verification, and evidence-based reporting.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
  },
  {
    name: "Suresh Kumar",
    role: "Technology Director",
    bio: "Building open-source tools for transparency and public accountability in the digital age.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  }
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <FontStyle />
      <Header />

      {/* Hero Section */}
      <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="font-mono-dm text-xs tracking-[0.16em] text-[#3a4e6a] uppercase mb-4">
            About Us
          </p>
          <h1 className="font-playfair font-black text-5xl md:text-6xl lg:text-7xl leading-tight text-[#f5f0e8] mb-6 max-w-4xl">
            Building a Public Record<br />
            <em className="text-[#b8974a] font-normal">for Accountability</em>
          </h1>
          <p className="font-garamond text-xl leading-relaxed text-[#8a9bb8] max-w-3xl">
            The Journalism Society exists to ensure that every public claim has a documented, permanent response. 
            We believe in the fundamental principle that all sides deserve to be heard.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        
        {/* What is Journalism Society */}
        <div className="mb-20 fade-up">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block mb-4">
                <div className="h-1 w-12 bg-[#b8974a] mb-3" />
                <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870]">Our Identity</p>
              </div>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1e2d4a] mb-6">
                What is the<br />
                Journalism Society?
              </h2>
              <div className="space-y-4 text-[#5a5040] font-garamond text-lg leading-relaxed">
                <p>
                  The Journalism Society is a non-partisan, independent platform dedicated to documenting and publishing 
                  Right of Reply responses. We provide a permanent public record where individuals, organisations, and 
                  institutions can file documented responses to claims made in the media and public discourse.
                </p>
                <p>
                  Founded in 2024, we recognised a critical gap in how responses to public claims are handled. Too often, 
                  responses are buried, ignored, or forgotten. We set out to create a permanent, searchable, and verifiable 
                  archive where the other side of the story is preserved.
                </p>
                <p>
                  Our platform operates on the principle of <em className="text-[#b8974a] font-semibold">Audi alteram partem</em> — 
                  hear the other side. We believe that true accountability requires that both claims and responses are 
                  recorded, accessible, and permanent.
                </p>
              </div>
            </div>
            <div className="bg-[#ede8dc] border border-[#d4c8b4] p-8">
              <div className="mb-6">
                <div className="font-playfair font-black text-6xl text-[#b8974a] mb-2">Audi</div>
                <div className="font-playfair font-black text-6xl text-[#b8974a] mb-2">alteram</div>
                <div className="font-playfair font-black text-6xl text-[#b8974a] mb-4">partem</div>
              </div>
              <p className="font-garamond text-[#7a6e5e] leading-relaxed">
                "Hear the other side" — a principle of natural justice that no person should be judged without a fair hearing.
              </p>
              <div className="mt-6 pt-6 border-t border-[#d4c8b4]">
                <p className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870] mb-2">Our Commitment</p>
                <p className="font-garamond text-sm text-[#6a5e4e]">
                  Every docket is reviewed for evidence and relevance. Every response is published in full. 
                  Every exhibit is archived permanently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-20 bg-[#ede8dc] border border-[#d4c8b4] p-8 md:p-12 fade-up delay-100">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <div className="h-1 w-12 bg-[#b8974a] mx-auto mb-3" />
              <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870]">Our Mission</p>
            </div>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1e2d4a] mb-6">
              To ensure that every public claim has a<br />
              <span className="text-[#b8974a]">documented, permanent response</span>
            </h2>
            <p className="font-garamond text-lg text-[#5a5040] leading-relaxed">
              We believe that accountability requires both sides of a story to be recorded, accessible, and permanent. 
              The Journalism Society builds the infrastructure for the Right of Reply in the digital age.
            </p>
          </div>
        </div>

        {/* Why Right of Reply */}
        <div className="mb-20 fade-up delay-200">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-1 w-12 bg-[#b8974a] mx-auto mb-3" />
              <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870]">The Principle</p>
            </div>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1e2d4a] mb-4">
              Why the Right of Reply Matters
            </h2>
            <p className="font-garamond text-lg text-[#7a6e5e] max-w-3xl mx-auto">
              In an era of rapid news cycles and fragmented information, the ability to respond and correct the record 
              is more important than ever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#ede8dc] flex items-center justify-center mb-4">
                <FiShield size={24} className="text-[#1e2d4a]" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-3">Preserving Context</h3>
              <p className="font-garamond text-[#7a6e5e] leading-relaxed">
                Claims made in isolation can distort public understanding. The Right of Reply ensures that full context is preserved and accessible.
              </p>
            </div>

            <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#ede8dc] flex items-center justify-center mb-4">
                <FiFileText size={24} className="text-[#b8974a]" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-3">Documented Evidence</h3>
              <p className="font-garamond text-[#7a6e5e] leading-relaxed">
                A response without evidence is just another claim. We require documented evidence, creating a verifiable public record.
              </p>
            </div>

            <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#ede8dc] flex items-center justify-center mb-4">
                <FiMic size={24} className="text-[#b8190c]" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-3">Media Accountability</h3>
              <p className="font-garamond text-[#7a6e5e] leading-relaxed">
                Our platform holds media accountable by tracking which outlets publish corrections and how they respond to documented replies.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20 fade-up delay-300">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-1 w-12 bg-[#b8974a] mx-auto mb-3" />
              <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870]">What We Stand For</p>
            </div>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1e2d4a] mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="border border-[#d4c8b4] bg-[#faf6ee] p-6 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon size={32} style={{ color: value.color }} />
                    </div>
                    <div>
                      <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">{value.title}</h3>
                      <p className="font-garamond text-[#7a6e5e] leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editorial Principles */}
        <div className="mb-20 fade-up delay-400">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="inline-block mb-4">
                <div className="h-1 w-12 bg-[#b8974a] mb-3" />
                <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870]">Our Approach</p>
              </div>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1e2d4a] mb-6">
                Editorial Principles
              </h2>
              <div className="space-y-6">
                {PRINCIPLES.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <div key={principle.title} className="flex gap-4">
                      <Icon size={20} className="text-[#b8974a] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-1">{principle.title}</h3>
                        <p className="font-garamond text-[#7a6e5e] leading-relaxed">{principle.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#1e2d4a] p-8 text-[#f5f0e8]">
              <h3 className="font-playfair font-bold text-2xl mb-4">Our Promise</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3">
                  <FiCheckCircle size={18} className="text-[#b8974a] flex-shrink-0 mt-0.5" />
                  <span className="font-garamond text-[#c8bfa8]">Every response is published in full, unedited</span>
                </li>
                <li className="flex gap-3">
                  <FiCheckCircle size={18} className="text-[#b8974a] flex-shrink-0 mt-0.5" />
                  <span className="font-garamond text-[#c8bfa8]">All exhibits are archived permanently</span>
                </li>
                <li className="flex gap-3">
                  <FiCheckCircle size={18} className="text-[#b8974a] flex-shrink-0 mt-0.5" />
                  <span className="font-garamond text-[#c8bfa8]">Editorial decisions are documented and transparent</span>
                </li>
                <li className="flex gap-3">
                  <FiCheckCircle size={18} className="text-[#b8974a] flex-shrink-0 mt-0.5" />
                  <span className="font-garamond text-[#c8bfa8]">Our platform remains free and accessible to all</span>
                </li>
                <li className="flex gap-3">
                  <FiCheckCircle size={18} className="text-[#b8974a] flex-shrink-0 mt-0.5" />
                  <span className="font-garamond text-[#c8bfa8]">We are independent of political and commercial interests</span>
                </li>
              </ul>
              <div className="border-t border-white/20 pt-4 mt-4">
                <p className="font-mono-dm text-xs tracking-widest uppercase text-[#8a9bb8]">
                  Read our full editorial standards
                </p>
                <Link href="/editorial-standards" className="font-garamond text-sm text-[#b8974a] hover:text-[#c8bfa8] transition-colors inline-flex items-center gap-1 mt-1">
                  Editorial Guidelines <FiExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-1 w-12 bg-[#b8974a] mx-auto mb-3" />
              <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870]">Our Story</p>
            </div>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1e2d4a] mb-4">
              Our Journey
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#d4c8b4] hidden md:block" />
            {TIMELINE.map((item, index) => (
              <div key={item.year} className="relative flex flex-col md:flex-row gap-6 mb-8 last:mb-0">
                <div className="md:w-1/4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[#b8974a] flex items-center justify-center text-[#f5f0e8] font-playfair font-black text-2xl z-10 relative">
                      {item.year.slice(-2)}
                    </div>
                    <span className="font-mono-dm text-sm text-[#9a8870] hidden md:block">{item.year}</span>
                  </div>
                </div>
                <div className="md:w-3/4 bg-[#faf6ee] border border-[#d4c8b4] p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-2">{item.title}</h3>
                  <p className="font-garamond text-[#7a6e5e] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-1 w-12 bg-[#b8974a] mx-auto mb-3" />
              <p className="font-mono-dm text-xs tracking-[0.12em] uppercase text-[#9a8870]">The Team</p>
            </div>
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1e2d4a] mb-4">
              Who We Are
            </h2>
            <p className="font-garamond text-lg text-[#7a6e5e] max-w-2xl mx-auto">
              A dedicated team of journalists, lawyers, and technologists committed to building public accountability infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="border border-[#d4c8b4] bg-[#faf6ee] overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-1">{member.name}</h3>
                  <p className="font-mono-dm text-xs text-[#b8974a] tracking-wider uppercase mb-2">{member.role}</p>
                  <p className="font-garamond text-sm text-[#7a6e5e] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#1e2d4a] border border-[#2a3f6a] p-8 md:p-12 text-center">
          <h2 className="font-playfair font-bold text-3xl text-[#f5f0e8] mb-4">
            Join Us in Building Accountability
          </h2>
          <p className="font-garamond text-lg text-[#8a9bb8] max-w-2xl mx-auto mb-8">
            Whether you're submitting a response, tracking media coverage, or supporting our work, 
            you're helping build a more accountable public discourse.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/submit" 
              className="font-mono-dm text-xs tracking-widest uppercase bg-[#b8974a] text-[#f5f0e8] px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Submit a Right of Reply
            </Link>
            <Link 
              href="/dockets" 
              className="font-mono-dm text-xs tracking-widest uppercase border-2 border-[#b8974a] text-[#b8974a] px-6 py-3 hover:bg-[#b8974a] hover:text-[#f5f0e8] transition-all"
            >
              Browse Dockets
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}