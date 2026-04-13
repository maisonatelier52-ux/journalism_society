// // app/disclosures/page.jsx
// "use client";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { FiDollarSign, FiUsers, FiShield, FiDatabase, FiEye, FiLock } from "react-icons/fi";

// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');

//     .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
//     .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
//     .font-mono-dm  { font-family: 'DM Mono', monospace; }
//   `}</style>
// );

// export default function DisclosuresPage() {
//   return (
//     <div className="min-h-screen bg-[#f5f0e8]">
//       <FontStyle />
//       <Header />

//       <div className="bg-[#1e2d4a] border-b-4 border-[#b8974a]">
//         <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
//           <p className="font-mono-dm text-xs tracking-[0.16em] text-[#3a4e6a] uppercase mb-4">
//             Transparency
//           </p>
//           <h1 className="font-playfair font-black text-5xl md:text-6xl leading-tight text-[#f5f0e8] mb-6 max-w-4xl">
//             Disclosures<br />
//             <em className="text-[#b8974a] font-normal">& Funding</em>
//           </h1>
//           <p className="font-garamond text-xl leading-relaxed text-[#8a9bb8] max-w-3xl">
//             Full transparency about our operations, funding, and data practices.
//           </p>
//         </div>
//       </div>

//       <main className="max-w-6xl mx-auto px-6 py-12 pb-20">
        
//         {/* Funding Section */}
//         <div className="mb-12">
//           <div className="border-l-4 border-[#b8974a] pl-5 mb-6">
//             <div className="flex items-center gap-3 mb-2">
//               <FiDollarSign size={24} className="text-[#b8974a]" />
//               <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Funding</h2>
//             </div>
//           </div>
//           <div className="bg-[#faf6ee] border border-[#d4c8b4] p-6">
//             <p className="font-garamond text-[#7a6e5e] leading-relaxed mb-4">
//               The Journalism Society is funded through:
//             </p>
//             <ul className="space-y-2 mb-4">
//               <li className="flex items-start gap-3 text-[#5a5040] font-garamond">
//                 <span className="text-[#b8974a]">•</span>
//                 <span>Independent grants from media ethics foundations</span>
//               </li>
//               <li className="flex items-start gap-3 text-[#5a5040] font-garamond">
//                 <span className="text-[#b8974a]">•</span>
//                 <span>Individual donations from supporters of public accountability</span>
//               </li>
//               <li className="flex items-start gap-3 text-[#5a5040] font-garamond">
//                 <span className="text-[#b8974a]">•</span>
//                 <span>No corporate advertising or sponsored content</span>
//               </li>
//               <li className="flex items-start gap-3 text-[#5a5040] font-garamond">
//                 <span className="text-[#b8974a]">•</span>
//                 <span>No government funding or political contributions</span>
//               </li>
//             </ul>
//             <p className="font-mono-dm text-xs text-[#9a8870] mt-4 pt-4 border-t border-[#d4c8b4]">
//               All donors and grantors are disclosed below. No donor has influence over editorial decisions.
//             </p>
//           </div>
//         </div>

//         {/* Partnerships */}
//         <div className="mb-12">
//           <div className="border-l-4 border-[#b8974a] pl-5 mb-6">
//             <div className="flex items-center gap-3 mb-2">
//               <FiUsers size={24} className="text-[#b8974a]" />
//               <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Partnerships</h2>
//             </div>
//           </div>
//           <div className="bg-[#faf6ee] border border-[#d4c8b4] p-6">
//             <p className="font-garamond text-[#7a6e5e] leading-relaxed mb-4">
//               We partner with organisations that share our commitment to transparency:
//             </p>
//             <ul className="space-y-2">
//               <li className="flex items-start gap-3 text-[#5a5040] font-garamond">
//                 <span className="text-[#b8974a]">•</span>
//                 <span>Kerala Press Club — Media literacy initiatives (no funding relationship)</span>
//               </li>
//               <li className="flex items-start gap-3 text-[#5a5040] font-garamond">
//                 <span className="text-[#b8974a]">•</span>
//                 <span>Centre for Media Studies — Research collaboration (in-kind only)</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Editorial Independence */}
//         <div className="mb-12">
//           <div className="border-l-4 border-[#b8974a] pl-5 mb-6">
//             <div className="flex items-center gap-3 mb-2">
//               <FiShield size={24} className="text-[#b8974a]" />
//               <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Editorial Independence</h2>
//             </div>
//           </div>
//           <div className="bg-[#ede8dc] border border-[#d4c8b4] p-6">
//             <p className="font-garamond text-[#5a5040] leading-relaxed">
//               The Journalism Society operates as an independent public record platform. Our editorial decisions are made without any external influence from donors, partners, or any other third party. We do not accept submissions that come with conditions about publication or editorial treatment.
//             </p>
//             <div className="mt-4 pt-4 border-t border-[#d4c8b4]">
//               <p className="font-playfair font-bold text-lg text-[#1e2d4a]">We are an independent public record platform.</p>
//               <p className="font-garamond text-sm text-[#7a6e5e] mt-2">No government, corporate, or political entity has control over our operations.</p>
//             </div>
//           </div>
//         </div>

//         {/* Data Handling */}
//         <div className="mb-12">
//           <div className="border-l-4 border-[#b8974a] pl-5 mb-6">
//             <div className="flex items-center gap-3 mb-2">
//               <FiDatabase size={24} className="text-[#b8974a]" />
//               <h2 className="font-playfair font-bold text-3xl text-[#1e2d4a]">Data Handling</h2>
//             </div>
//           </div>
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <FiEye size={20} className="text-[#b8974a]" />
//                 <h3 className="font-playfair font-bold text-lg text-[#1e2d4a]">What We Store</h3>
//               </div>
//               <ul className="space-y-2 text-[#7a6e5e] font-garamond">
//                 <li>• Submitted responses and exhibits</li>
//                 <li>• Contact information for verification</li>
//                 <li>• Publication metadata and dates</li>
//                 <li>• Media coverage and citations</li>
//                 <li>• Editorial review records</li>
//               </ul>
//             </div>
//             <div className="border border-[#d4c8b4] bg-[#faf6ee] p-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <FiLock size={20} className="text-[#b8974a]" />
//                 <h3 className="font-playfair font-bold text-lg text-[#1e2d4a]">How We Use It</h3>
//               </div>
//               <ul className="space-y-2 text-[#7a6e5e] font-garamond">
//                 <li>• Publishing the public record</li>
//                 <li>• Verification of submissions</li>
//                 <li>• Communication about submissions</li>
//                 <li>• Improving platform operations</li>
//                 <li>• Never sold or shared with third parties</li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-4 bg-[#f0fdf4] border border-[#bbf7d0] p-4">
//             <p className="font-mono-dm text-xs text-[#2d6a4f]">
//               We do not sell user data. We do not use data for advertising. We do not share personal information without consent.
//             </p>
//           </div>
//         </div>

//         {/* Platform Nature Statement */}
//         <div className="bg-[#1e2d4a] p-8 text-center">
//           <p className="font-playfair font-bold text-2xl text-[#f5f0e8] mb-3">Independent · Non-Partisan · Public Record</p>
//           <p className="font-garamond text-[#8a9bb8] max-w-2xl mx-auto">
//             We exist to serve the public interest, not any private interest. Our only allegiance is to the principle that every public claim deserves a documented, permanent response.
//           </p>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// ============================================================
// FILE: app/disclosures/page.jsx
// ============================================================

import DisclosuresClient from "@/components/DisclosuresClient";
const SITE_URL = "https://journalism-society.vercel.app";

export const metadata = {
  title: "Disclosures & Funding — Full Transparency | Journalism Society",
  description:
    "Complete disclosure of Journalism Society's funding sources, partnerships, editorial independence, and data handling practices. We operate transparently with no hidden interests.",
  keywords: ["journalism society funding", "editorial independence India", "media transparency disclosures"],
  alternates: { canonical: `${SITE_URL}/disclosures` },
  openGraph: {
    title: "Disclosures & Funding | Journalism Society",
    description: "Full transparency about our funding, partnerships, and data practices. No hidden agendas.",
    url: `${SITE_URL}/disclosures`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Journalism Society Disclosures" }],
  },
  twitter: { card: "summary", title: "Disclosures & Funding | Journalism Society", description: "Complete transparency about our funding and editorial independence." },
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Disclosures", item: `${SITE_URL}/disclosures` },
  ],
};

export default function DisclosuresPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DisclosuresClient />
    </>
  );
}