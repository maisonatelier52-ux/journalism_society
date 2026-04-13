// // components/Footer.jsx
// import Link from "next/link";
// import { FaTwitter, FaLinkedinIn, FaRss } from "react-icons/fa";

// export default function Footer() {
//   const sections = [
//     {
//       heading: "Sections",
//       links: [
//         { name: "Dockets", href: "/dockets" },
//         { name: "Document Room", href: "/document-room" },
//         { name: "Press Releases", href: "#" },
//         { name: "Media Watch", href: "#" },
//       ],
//     },
//     {
//       heading: "Organisation",
//       links: [
//         { name: "About", href: "#" },
//         { name: "Contact", href: "#" },
//         { name: "Privacy Policy", href: "#" },
//         { name: "Terms", href: "#" },
//       ],
//     },
//   ];

//   const socialLinks = [
//     { icon: FaTwitter, href: "#", label: "Twitter" },
//     { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
//     { icon: FaRss, href: "#", label: "RSS" },
//   ];

//   return (
//     <footer className="bg-[#1e2d4a]">
//       <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
//         <div className="flex flex-wrap gap-10 justify-between mb-10">
//           {/* Brand block */}
//           <div className="flex-1 min-w-[220px]">
//             <div className="font-playfair font-black text-[1.5rem] text-[#f5f0e8] mb-1.5">
//               Journalism
//             </div>
//             <div className="font-playfair font-black text-[1.5rem] text-[#f5f0e8] mb-4 tracking-[-0.01em]">
//               society
//             </div>
//             <p className="font-garamond italic text-[0.9rem] text-[#8a9bb8] leading-relaxed mb-5">
//               Right of Reply. In Full.
//               <br />
//               Audi alteram partem.
//             </p>
//             <div className="flex gap-2.5">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   className="w-[34px] h-[34px] border border-white/20 rounded-full flex items-center justify-center text-[#b7bcc7] hover:border-[#f5f0e8] hover:text-[#f5f0e8] transition-all"
//                   aria-label={social.label}
//                 >
//                   <social.icon size={14} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Nav columns */}
//           {sections.map((section) => (
//             <div key={section.heading} className="flex-1 min-w-[140px]">
//               <p className="font-mono-dm text-[0.6rem] tracking-[0.14em] uppercase text-[#b7bcc7] mb-4">
//                 {section.heading}
//               </p>
//               {section.links.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className="block font-garamond text-[0.95rem] text-[#b7bcc7] hover:text-[#c8bfa8] transition-colors mb-2 no-underline"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between gap-2.5">
//           <p className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase text-[#b7bcc7]">
//             © 2026 Journalism Society. All rights reserved.
//           </p>
//           <p className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase text-[#b7bcc7]">
//             Independent · Non-Partisan · Public Record
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// components/Footer.jsx — SEO ENHANCED
// Changes: Added title="" to every <Link> and <a> tag
import Link from "next/link";
import { FaTwitter, FaLinkedinIn, FaRss } from "react-icons/fa";

export default function Footer() {
  const sections = [
    {
      heading: "Sections",
      links: [
        { name: "Dockets",        href: "/dockets",       title: "Browse all Right of Reply dockets" },
        { name: "Document Room",  href: "/document-room", title: "Access public records and legal exhibits" },
        { name: "Press Releases", href: "/press-releases",title: "Read official press releases and statements" },
        { name: "Media Watch",    href: "/media-watch",   title: "Track media coverage across all dockets" },
      ],
    },
    {
      heading: "Organisation",
      links: [
        { name: "About",          href: "/about",         title: "About Journalism Society and our mission" },
        { name: "Contact",        href: "#",              title: "Contact the Journalism Society editorial team" },
        { name: "Privacy Policy", href: "#",              title: "Read our privacy policy" },
        { name: "Terms",          href: "#",              title: "Read our terms of use" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaTwitter,    href: "#", label: "Follow Journalism Society on Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "Connect with Journalism Society on LinkedIn" },
    { icon: FaRss,        href: "#", label: "Subscribe to the Journalism Society RSS feed" },
  ];

  return (
    <footer className="bg-[#1e2d4a]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
        <div className="flex flex-wrap gap-10 justify-between mb-10">
          {/* Brand block */}
          <div className="flex-1 min-w-[220px]">
            <Link href="/" title="Journalism Society — Right of Reply. In Full." className="no-underline">
              <div className="font-playfair font-black text-[1.5rem] text-[#f5f0e8] mb-1.5">
                Journalism
              </div>
              <div className="font-playfair font-black text-[1.5rem] text-[#f5f0e8] mb-4 tracking-[-0.01em]">
                society
              </div>
            </Link>
            <p className="font-garamond italic text-[0.9rem] text-[#8a9bb8] leading-relaxed mb-5">
              Right of Reply. In Full.
              <br />
              Audi alteram partem.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.label}
                  aria-label={social.label}
                  className="w-[34px] h-[34px] border border-white/20 rounded-full flex items-center justify-center text-[#b7bcc7] hover:border-[#f5f0e8] hover:text-[#f5f0e8] transition-all"
                  rel="noopener noreferrer"
                >
                  <social.icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {sections.map((section) => (
            <div key={section.heading} className="flex-1 min-w-[140px]">
              <p className="font-mono-dm text-[0.6rem] tracking-[0.14em] uppercase text-[#b7bcc7] mb-4">
                {section.heading}
              </p>
              {section.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  title={link.title}
                  className="block font-garamond text-[0.95rem] text-[#b7bcc7] hover:text-[#c8bfa8] transition-colors mb-2 no-underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between gap-2.5">
          <p className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase text-[#b7bcc7]">
            © {new Date().getFullYear()} Journalism Society. All rights reserved.
          </p>
          <p className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase text-[#b7bcc7]">
            Independent · Non-Partisan · Public Record
          </p>
        </div>
      </div>
    </footer>
  );
}