// app/press-releases/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPressReleaseById, PRESS_RELEASES } from "../../../public/data/pressReleases";
import { FiCalendar, FiTag, FiUser, FiArrowLeft, FiArrowRight, FiShare2 } from "react-icons/fi";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PressReleaseDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const found = getPressReleaseById(slug);
      setRelease(found);
    }
    setLoading(false);
  }, [slug]);

  // Find next and previous releases
  const currentIndex = PRESS_RELEASES.findIndex(r => r.id === slug);
  const prevRelease = currentIndex > 0 ? PRESS_RELEASES[currentIndex - 1] : null;
  const nextRelease = currentIndex < PRESS_RELEASES.length - 1 ? PRESS_RELEASES[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="font-garamond text-lg text-[#9a8870]">Loading press release...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!release) {
    return (
      <div className="min-h-screen bg-[#f5f0e8]">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="font-playfair text-2xl mb-4 text-[#1e2d4a]">Press release not found</p>
          <p className="font-garamond text-base text-[#9a8870] mb-6">The requested press release could not be located.</p>
          <Link href="/press-releases" className="inline-block font-mono-dm text-xs uppercase bg-[#1e2d4a] text-[#f5f0e8] px-6 py-3 hover:bg-[#2a3f6a] transition-colors">
            ← Back to Press Releases
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-8 pb-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/press-releases" className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870] hover:text-[#b8974a] transition-colors flex items-center gap-1">
            <FiArrowLeft size={12} />
            Back to Press Releases
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">
              {release.category}
            </span>
            <div className="flex items-center gap-1.5 text-[#9a8870]">
              <FiCalendar size={12} />
              <span className="font-mono-dm text-xs">{formatDate(release.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#9a8870]">
              <FiUser size={12} />
              <span className="font-garamond text-sm">{release.author}</span>
            </div>
          </div>
          
          <h1 className="font-playfair font-black text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1e2d4a] mb-6">
            {release.title}
          </h1>
          
          <p className="font-garamond text-xl text-[#7a6e5e] leading-relaxed border-l-4 border-[#b8974a] pl-5">
            {release.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        {release.featuredImage && (
          <div className="mb-10 -mx-6 md:mx-0">
            <img
              src={release.featuredImage}
              alt={release.title}
              className="w-full h-auto object-cover rounded-sm"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <style jsx>{`
            .prose {
              font-family: 'EB Garamond', Georgia, serif;
              color: #4a4035;
              line-height: 1.85;
            }
            .prose h3 {
              font-family: 'Playfair Display', Georgia, serif;
              font-weight: 700;
              font-size: 1.5rem;
              color: #1e2d4a;
              margin: 2rem 0 1rem;
            }
            .prose p {
              margin-bottom: 1.25rem;
            }
            .prose ul {
              margin: 1.25rem 0;
              padding-left: 1.5rem;
            }
            .prose li {
              margin-bottom: 0.5rem;
            }
            .prose blockquote {
              border-left: 3px solid #b8974a;
              padding: 0.5rem 0 0.5rem 1.5rem;
              margin: 1.5rem 0;
              font-style: italic;
              color: #7a6e5e;
            }
            .prose blockquote p {
              margin-bottom: 0;
            }
            .drop-cap::first-letter {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 4rem;
              font-weight: 900;
              line-height: 0.82;
              float: left;
              margin: 0.1rem 0.16em 0 0;
              color: #1e2d4a;
            }
            @media (max-width: 640px) {
              .drop-cap::first-letter {
                font-size: 3rem;
              }
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: release.content }} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#d4c8b4] mb-8">
          <FiTag size={14} className="text-[#9a8870]" />
          {release.tags.map(tag => (
            <Link
              key={tag}
              href={`/press-releases?tag=${encodeURIComponent(tag)}`}
              className="font-mono-dm text-[0.55rem] tracking-[0.08em] uppercase text-[#7a6e5e] border border-[#c4b89a] px-2 py-0.5 hover:bg-[#ede8dc] hover:text-[#1e2d4a] transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Share Section */}
        <div className="bg-[#ede8dc] border border-[#d4c8b4] p-5 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870] mb-1">
                Share this release
              </p>
              <p className="font-garamond text-sm text-[#7a6e5e]">
                Help spread accurate information
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full border border-[#c4b89a] flex items-center justify-center text-[#9a8870] hover:bg-[#1e2d4a] hover:text-white hover:border-[#1e2d4a] transition-all">
                <FiShare2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation between releases */}
        <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-[#d4c8b4]">
          {prevRelease && (
            <Link
              href={`/press-releases/${prevRelease.id}`}
              className="group p-4 border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all no-underline"
            >
              <span className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870] flex items-center gap-1 mb-2">
                <FiArrowLeft size={12} /> Previous
              </span>
              <p className="font-playfair font-bold text-[#1e2d4a] group-hover:text-[#b8974a] transition-colors">
                {prevRelease.title}
              </p>
              <p className="font-mono-dm text-xs text-[#9a8870] mt-1">{formatDate(prevRelease.date)}</p>
            </Link>
          )}
          
          {nextRelease && (
            <Link
              href={`/press-releases/${nextRelease.id}`}
              className="group p-4 border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all no-underline text-right md:text-left"
            >
              <span className="font-mono-dm text-xs tracking-widest uppercase text-[#9a8870] flex items-center gap-1 justify-end md:justify-start mb-2">
                Next <FiArrowRight size={12} />
              </span>
              <p className="font-playfair font-bold text-[#1e2d4a] group-hover:text-[#b8974a] transition-colors">
                {nextRelease.title}
              </p>
              <p className="font-mono-dm text-xs text-[#9a8870] mt-1">{formatDate(nextRelease.date)}</p>
            </Link>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}