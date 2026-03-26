// 'use client';

// import React, { useEffect } from 'react';

// export default function JournalismSociety() {
//   useEffect(() => {
//     const reveals = document.querySelectorAll('.reveal');
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.08 }
//     );

//     reveals.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {/* NAV */}
//       <nav className="sticky top-0 z-50 bg-[var(--cream)] border-b border-black/10 px-12 flex items-center h-16 gap-10">
//         <div className="flex gap-7 items-center">
//           <a href="#" className="text-[13.5px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">Beats</a>
//           <a href="#" className="text-[13.5px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">Journalists</a>
//           <a href="#" className="text-[13.5px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">Articles</a>
//           <a href="#" className="text-[13.5px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">Awards</a>
//         </div>

//         <div className="flex-1 text-center">
//           <div className="font-serif text-2xl font-bold tracking-[-0.3px] text-[var(--ink)]">
//             Journalism<span className="text-[var(--olive)]">Society</span>
//           </div>
//         </div>

//         <div className="flex gap-6 items-center">
//           <a href="#" className="text-[13.5px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">About</a>
//           <a href="#" className="text-[13.5px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">Archives</a>
//           <a href="#" className="text-[13.5px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">Contact</a>
//           <a href="#" className="bg-[var(--ink)] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[var(--olive-card)] transition-all">
//             Subscribe →
//           </a>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section className="px-12 pt-20 pb-16 grid grid-cols-2 gap-10 items-center min-h-[560px]">
//         <div>
//           <p className="uppercase tracking-[0.12em] text-xs font-semibold text-[var(--olive)] mb-5 flex items-center gap-2">
//             <span className="inline-block w-6 h-0.5 bg-[var(--olive)] rounded" />
//             Journalism Society
//           </p>

//           <h1 className="font-serif text-[clamp(38px,5vw,58px)] leading-[1.1] font-bold tracking-[-1px] mb-5">
//             Discover the Voices<br />
//             <em className="text-[var(--olive)] not-italic">Shaping Our World</em>
//           </h1>

//           <p className="text-[15px] text-[var(--muted)] leading-relaxed max-w-[400px] mb-9">
//             An independent collective of India's finest journalists — covering politics, sports, technology, travel, culture, and business with rigour and integrity.
//           </p>

//           <div className="flex gap-4 mb-14">
//             <a href="#" className="bg-[var(--ink)] text-white px-7 py-3.5 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-[var(--olive-card)] transition-all active:scale-95">
//               Explore Journalists
//               <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//             </a>
//             <a href="#" className="text-[var(--ink-soft)] flex items-center gap-1.5 text-sm font-medium hover:text-[var(--olive)] transition-colors">
//               Browse Articles
//               <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//             </a>
//           </div>

//           {/* Journalist Strip */}
//           <div className="flex gap-2.5 items-end">
//             {[
//               { seed: 'adharsh', label: 'Politics', bg: '#D4DBCA', height: 130 },
//               { seed: 'meera', label: 'Sports', bg: '#C8D9B8', height: 160 },
//               { seed: 'rohan', label: 'Tech', bg: '#E8D5B7', height: 180 },
//               { seed: 'priya', label: 'Travel', bg: '#D5C8DA', height: 160 },
//               { seed: 'sana', label: 'Culture', bg: '#C8DAD4', height: 130 },
//               { seed: 'arjun', label: 'Business', bg: '#DAD0C8', height: 150 },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="rounded-xl overflow-hidden relative flex-shrink-0 transition-transform hover:-translate-y-1.5 shadow-sm"
//                 style={{ width: '88px', height: `${item.height}px`, background: item.bg }}
//               >
//                 <img
//                   src={`https://api.dicebear.com/9.x/personas/svg?seed=${item.seed}&backgroundColor=b6e3f4&backgroundType=gradientLinear`}
//                   alt={item.label}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-5 px-1 text-center text-white text-[10px] font-semibold tracking-wider">
//                   {item.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Hero Right Panel */}
//         <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
//           <img
//             src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&auto=format&fit=crop"
//             alt="Journalists at work"
//             className="w-full h-[220px] object-cover"
//           />
//           <div className="grid grid-cols-3 divide-x divide-black/10">
//             {[
//               { tag: "Stay Informed, Always", title: "Keep everyone on the same page", desc: "Breaking stories, live updates, and transparent reporting you can trust." },
//               { tag: "Boost Team Efficiency", title: "Work faster, with less friction", desc: "Our journalists' productivity tools ensure no story goes untold." },
//               { tag: "Make Smarter Decisions", title: "Insights you can act on", desc: "Data-driven analysis helps your team understand the world around you." },
//             ].map((item, i) => (
//               <div key={i} className="p-4">
//                 <div className="text-[10px] font-semibold text-[var(--olive)] tracking-widest uppercase mb-1">{item.tag}</div>
//                 <div className="text-[13px] font-semibold leading-tight mb-1.5">{item.title}</div>
//                 <div className="text-[11.5px] text-[var(--muted)] leading-relaxed">{item.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURES ROW */}
//       <div className="grid grid-cols-3 border-t border-b border-black/10 py-10 px-12 reveal">
//         {[
//           { title: "Real-Time Reporting", desc: "Our correspondents file stories from the ground as events unfold, keeping you ahead of the news cycle with trusted, verified information." },
//           { title: "Beat-Based Expertise", desc: "Each journalist owns their domain — politics, tech, sports, travel, culture or business — with deep specialisation and years of experience." },
//           { title: "Award-Winning Analysis", desc: "Our work has won over 120 press awards, recognised for its accuracy, depth, and commitment to the public interest." },
//         ].map((feature, i) => (
//           <div key={i} className={`px-8 ${i !== 2 ? 'border-r border-black/10' : ''}`}>
//             <div className="font-semibold text-[15px] mb-2">{feature.title}</div>
//             <div className="text-[13px] text-[var(--muted)] leading-relaxed">{feature.desc}</div>
//           </div>
//         ))}
//       </div>

//       {/* EVERYTHING YOU NEED - BENTO SECTION */}
//       <section className="py-20 px-12 bg-[var(--cream-light)] reveal">
//         <div className="text-center mb-12">
//           <p className="uppercase tracking-widest text-xs font-semibold text-[var(--muted)] mb-2">What We Offer</p>
//           <h2 className="font-serif text-4xl font-bold tracking-tight">Everything You Need to<br />Stay Informed Smarter</h2>
//           <p className="mt-4 text-[15px] text-[var(--muted)] max-w-lg mx-auto">
//             From breaking politics to immersive travel writing, every story is crafted to keep you connected, curious, and critically informed.
//           </p>
//         </div>

//         <div className="max-w-6xl mx-auto">
//           {/* Top Mosaic */}
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div className="relative rounded-2xl overflow-hidden h-[200px] group cursor-pointer">
//               <img src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=700&q=80&auto=format&fit=crop" alt="Political reporting" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
//                 <h3 className="font-semibold">Political Reporting</h3>
//                 <p className="text-sm opacity-90">Incisive coverage of power, policy, and governance</p>
//               </div>
//             </div>
//             <div className="grid grid-rows-2 gap-4">
//               <div className="relative rounded-2xl overflow-hidden h-[180px] group cursor-pointer">
//                 <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80&auto=format&fit=crop" alt="Travel writing" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
//                   <h3 className="font-semibold">Immersive Travel Writing</h3>
//                   <p className="text-sm opacity-90">Evocative long-form narratives from 60+ countries</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
//                   <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80&auto=format&fit=crop" alt="Technology" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
//                     <h3 className="font-semibold text-sm">Tech & Innovation</h3>
//                   </div>
//                 </div>
//                 <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
//                   <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=700&q=80&auto=format&fit=crop" alt="Arts & culture" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
//                     <h3 className="font-semibold text-sm">Arts & Culture</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Tiles */}
//           <div className="grid grid-cols-3 gap-4">
//             {[
//               { icon: "🏟️", title: "Sports Coverage", desc: "From grassroots athletics to Olympic arenas" },
//               { icon: "📊", title: "Business & Finance", desc: "Complex financial stories made clear" },
//               { icon: "🌏", title: "Geopolitics & World Affairs", desc: "South Asia, Indo-Pacific, and global diplomacy" },
//             ].map((tile, i) => (
//               <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
//                 <div className="text-3xl mb-4">{tile.icon}</div>
//                 <div className="font-semibold text-[14.5px] mb-2">{tile.title}</div>
//                 <div className="text-[12.5px] text-[var(--muted)] leading-relaxed">{tile.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURES DETAIL SECTION */}
//       <section className="py-20 px-12 reveal">
//         <div className="text-center mb-12">
//           <p className="uppercase tracking-widest text-xs font-semibold text-[var(--muted)] mb-2">Our Beats</p>
//           <h2 className="font-serif text-4xl font-bold tracking-tight">Features That Keep Readers<br />Coming Back</h2>
//         </div>

//         <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center">
//           <div className="rounded-3xl overflow-hidden shadow-xl h-[500px]">
//             <img src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=700&q=80&auto=format&fit=crop" alt="Journalist at work" className="w-full h-full object-cover" />
//           </div>

//           <div className="space-y-6">
//             {[
//               { icon: "📰", title: "Breaking News Alerts", desc: "Real-time notifications from our correspondents in the field" },
//               { icon: "🔍", title: "Investigative Deep Dives", desc: "Long-form investigations that go beyond headlines" },
//               { icon: "🗂️", title: "Journalist Profiles", desc: "Get to know the people behind the bylines" },
//               { icon: "🌍", title: "Notes & Field Dispatches", desc: "Raw, direct dispatches from journalists on assignment" },
//               { icon: "🔔", title: "Weekly Newsletter Digest", desc: "The week's best journalism curated every Friday" },
//             ].map((item, i) => (
//               <div key={i} className="flex gap-5 group cursor-pointer hover:pl-1 transition-all border-b border-black/10 last:border-none pb-6 last:pb-0">
//                 <div className="w-10 h-10 rounded-xl bg-[var(--olive-pale)] flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
//                 <div>
//                   <h3 className="font-semibold text-[15px] mb-1">{item.title}</h3>
//                   <p className="text-[13px] text-[var(--muted)] leading-relaxed">{item.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* OLIVE PANEL */}
//       <div className="px-12 pb-20">
//         <div className="bg-[var(--olive-card)] rounded-3xl p-16 max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center text-white reveal">
//           <div>
//             <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight mb-4">Built for Every Beat,<br />Ready for Any Story</h2>
//             <p className="text-[14.5px] opacity-75 leading-relaxed">Our platform adapts to every kind of journalism — from data-heavy investigations to intimate human interest pieces.</p>

//             <div className="flex flex-wrap gap-3 mt-10">
//               {["Political Analysis", "Sports Reporting", "Cybersecurity", "Travel Narratives", "Culture Writing", "Business & Finance", "Geopolitics", "Investigations"].map((tag, i) => (
//                 <span key={i} className={`px-4 py-2 rounded-lg text-sm font-medium ${[0,1,4,7].includes(i) ? 'bg-[var(--tag-green)] text-[var(--tag-green-text)]' : 'bg-white/10'}`}>
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <div className="w-[220px] h-[420px] bg-white/10 border-2 border-white/20 rounded-[36px] p-2 relative">
//               <div className="bg-white/5 rounded-3xl h-full p-5 flex flex-col gap-3">
//                 <div className="bg-white/10 rounded-2xl p-3">
//                   <div className="text-[10px] opacity-60 mb-1">BREAKING</div>
//                   <div className="text-sm font-semibold leading-tight">Coalition Politics After the 2024 Elections</div>
//                 </div>
//                 <div className="bg-white/5 rounded-2xl p-3">
//                   <div className="text-[10px] opacity-60 mb-1">SPORTS</div>
//                   <div className="text-xs opacity-90">India's Olympic Medal Dreams — The Untold Story</div>
//                 </div>
//                 <div className="bg-white/5 rounded-2xl p-3">
//                   <div className="text-[10px] opacity-60 mb-1">TECHNOLOGY</div>
//                   <div className="text-xs opacity-90">AI Policy Written in Boardrooms, Not Parliament</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* STATS SECTION */}
//       <section className="py-20 px-12 bg-[var(--cream-light)] reveal">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
//           <div className="grid grid-cols-3 gap-3">
//             <div className="rounded-2xl overflow-hidden aspect-[3/4]"><img src="https://api.dicebear.com/9.x/personas/svg?seed=vikram" alt="" className="w-full h-full object-cover" /></div>
//             <div className="bg-white rounded-2xl p-6 flex flex-col justify-end aspect-[3/4]">
//               <div className="font-serif text-4xl font-bold">+85%</div>
//               <div className="text-xs text-[var(--muted)] mt-1">Reader Trust Rate</div>
//             </div>
//             <div className="rounded-2xl overflow-hidden aspect-[3/4]"><img src="https://api.dicebear.com/9.x/personas/svg?seed=lakshmi" alt="" className="w-full h-full object-cover" /></div>
//             <div className="bg-[var(--olive-card)] text-white rounded-2xl p-6 flex flex-col justify-end aspect-[3/4] col-span-2">
//               <div className="font-serif text-4xl font-bold">12h</div>
//               <div className="text-xs opacity-75 mt-1">Avg. Response Time</div>
//             </div>
//             <div className="col-span-2 rounded-2xl overflow-hidden relative">
//               <img src="https://api.dicebear.com/9.x/personas/svg?seed=priya" alt="" className="w-full h-full object-cover" />
//               <div className="absolute bottom-4 left-4 bg-white/95 rounded-xl px-5 py-3">
//                 <div className="font-serif text-2xl font-bold text-[var(--ink)]">2,400+</div>
//                 <div className="text-xs text-[var(--muted)]">Articles Published</div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <p className="uppercase text-xs font-semibold tracking-widest text-[var(--muted)]">Proven Impact</p>
//             <h2 className="font-serif text-4xl font-bold mt-3 leading-tight">Real Stories,<br />Real Impact</h2>
//             <p className="mt-6 text-[15px] text-[var(--muted)] leading-relaxed">See how our journalists are changing conversations, holding power to account, and telling the stories that shape how India understands itself and the world.</p>
//             <a href="#" className="mt-8 inline-flex items-center gap-2 bg-[var(--ink)] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--olive-card)]">
//               Read Our Work
//               <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* JOURNALISTS GRID */}
//       <section className="py-20 px-12 bg-[var(--cream-light)] reveal">
//         <div className="text-center mb-12">
//           <p className="uppercase tracking-widest text-xs font-semibold text-[var(--muted)] mb-2">Our Team</p>
//           <h2 className="font-serif text-4xl font-bold">Meet the Journalists</h2>
//         </div>

//         <div className="max-w-6xl mx-auto grid grid-cols-4 gap-4">
//           {[
//             { name: "Adharsh Nair", title: "Senior Political Correspondent", cat: "Politics", seed: "adharsh" },
//             { name: "Meera Krishnan", title: "Chief Sports Editor", cat: "Sports", seed: "meera" },
//             { name: "Rohan Verma", title: "Technology & Innovation Reporter", cat: "Technology", seed: "rohan" },
//             { name: "Priya Sundaram", title: "Travel & Culture Writer", cat: "Travel", seed: "priya" },
//             { name: "Arjun Pillai", title: "Business & Finance Correspondent", cat: "Business", seed: "arjun" },
//             { name: "Sana Mirza", title: "Arts & Culture Editor", cat: "Culture", seed: "sana" },
//             { name: "Vikram Das", title: "International Affairs Desk", cat: "Politics", seed: "vikram" },
//             { name: "Lakshmi Iyer", title: "Cybersecurity & Privacy Reporter", cat: "Technology", seed: "lakshmi" },
//           ].map((j, i) => (
//             <div key={i} className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all cursor-pointer shadow-sm">
//               <img src={`https://api.dicebear.com/9.x/personas/svg?seed=${j.seed}`} alt={j.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <span className="inline-block px-3 py-1 text-[10px] font-semibold tracking-wider rounded-full bg-[var(--tag-green)] text-[var(--tag-green-text)]">{j.cat}</span>
//                 <div className="font-semibold mt-3 mb-1">{j.name}</div>
//                 <div className="text-xs text-[var(--muted)] mb-2">{j.title}</div>
//                 <div className="text-xs text-[var(--muted)] line-clamp-3">Experienced journalist with deep expertise in their field.</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <a href="#" className="inline-flex items-center gap-2 bg-[var(--ink)] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--olive-card)]">
//             View All Journalists
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//           </a>
//         </div>
//       </section>

//       {/* COMMUNITY SECTION */}
//       <section className="py-20 px-12 reveal">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16">
//           <div>
//             <p className="uppercase tracking-widest text-xs font-semibold text-[var(--muted)]">Our Readers</p>
//             <h2 className="font-serif text-4xl font-bold mt-3">Trusted by Readers<br />Around India</h2>
//             <p className="mt-6 text-[15px] text-[var(--muted)] leading-relaxed">From students and policy wonks to business leaders and travellers — the Journalism Society has built a community of engaged, critically minded readers.</p>

//             <div className="flex items-center gap-4 mt-10">
//               <div className="flex -space-x-3">
//                 {[1,2,3,4].map(i => (
//                   <img key={i} src={`https://api.dicebear.com/9.x/personas/svg?seed=reader${i}`} className="w-11 h-11 rounded-full border-4 border-[var(--cream)] object-cover" alt="" />
//                 ))}
//               </div>
//               <div className="text-sm text-[var(--muted)]"><strong className="text-[var(--ink)]">25,000+</strong> active subscribers</div>
//             </div>

//             <a href="#" className="mt-8 inline-flex items-center gap-2 bg-[var(--ink)] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--olive-card)]">
//               Join the Community
//               <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//             </a>
//           </div>

//           <div className="grid grid-cols-4 gap-3">
//             {[1,2,3,4].map(i => (
//               <div key={i} className={`rounded-2xl overflow-hidden ${i % 2 === 0 ? 'mt-8' : ''}`}>
//                 <img src={`https://api.dicebear.com/9.x/personas/svg?seed=comm${i}`} alt="" className="w-full h-full object-cover" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* JOIN / CAREERS */}
//       <div className="px-12 pb-20">
//         <div className="text-center mb-10">
//           <p className="uppercase text-xs font-semibold tracking-widest text-[var(--muted)]">Careers</p>
//           <h2 className="font-serif text-4xl font-bold mt-3">Join Our Team</h2>
//         </div>

//         <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12">
//           <div className="rounded-3xl overflow-hidden h-[340px]">
//             <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&q=80&auto=format&fit=crop" alt="Newsroom" className="w-full h-full object-cover" />
//           </div>

//           <div>
//             <h2 className="font-serif text-3xl font-bold leading-tight">A diverse group of passionate professionals — and journalists — bringing innovation and excellence to every project.</h2>
//             <p className="mt-6 text-[14px] text-[var(--muted)] leading-relaxed">We're always looking for talented reporters, editors, and digital journalists who share our commitment to honest, impactful storytelling.</p>

//             <div className="mt-10 space-y-4">
//               {[
//                 { dept: "Politics", role: "Political Correspondent", location: "New Delhi", type: "Full-time" },
//                 { dept: "Technology", role: "Tech & Data Reporter", location: "Bengaluru", type: "Full-time" },
//                 { dept: "Culture", role: "Arts & Culture Writer", location: "Remote", type: "Contract" },
//               ].map((role, i) => (
//                 <div key={i} className="bg-white rounded-2xl p-5 flex justify-between items-center hover:shadow-md transition-all cursor-pointer group">
//                   <div>
//                     <div className="uppercase text-[10px] tracking-widest text-[var(--muted)]">{role.dept}</div>
//                     <div className="font-semibold">{role.role}</div>
//                     <div className="text-xs text-[var(--muted)] mt-1 flex gap-4">
//                       <span>🏙️ {role.location}</span>
//                       <span>📄 {role.type}</span>
//                     </div>
//                   </div>
//                   <div className="w-8 h-8 rounded-full bg-[var(--olive-pale)] group-hover:bg-[var(--olive)] flex items-center justify-center transition-colors">
//                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#3D4A35" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SAVE TIME BANNER */}
//       <div className="mx-12 bg-[var(--olive-card)] text-white rounded-t-3xl py-20 px-12 text-center reveal">
//         <h2 className="font-serif text-5xl font-bold tracking-tight">Start Reading What Matters</h2>
//         <p className="mt-4 text-lg opacity-75 max-w-md mx-auto">Join 25,000+ readers who trust Journalism Society for stories that make sense of the world.</p>
//         <a href="#" className="mt-8 inline-flex items-center gap-2 bg-white text-[var(--ink)] px-8 py-4 rounded-full font-medium hover:bg-[var(--cream)] transition-all">
//           Subscribe for Free
//           <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
//         </a>
//       </div>

//       {/* FOOTER */}
//       <footer className="bg-[var(--ink)] text-white/70 px-12 pt-16 pb-10">
//         <div className="max-w-6xl mx-auto grid grid-cols-4 gap-10">
//           <div>
//             <div className="font-serif text-3xl font-bold text-white mb-4">Journalism<span className="text-[var(--olive-pale)]">Society</span></div>
//             <p className="text-sm leading-relaxed">An independent collective of India's finest journalists — committed to honest, incisive, and impactful reporting across every beat since 2015.</p>
//             <div className="flex gap-3 mt-8">
//               <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer">𝕏</div>
//               <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer">in</div>
//               <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer">f</div>
//             </div>
//           </div>

//           <div>
//             <h4 className="uppercase text-xs tracking-widest text-white/40 mb-4">Beats</h4>
//             <ul className="space-y-3 text-sm">
//               <li><a href="#" className="hover:text-white">Politics</a></li>
//               <li><a href="#" className="hover:text-white">Sports</a></li>
//               <li><a href="#" className="hover:text-white">Technology</a></li>
//               <li><a href="#" className="hover:text-white">Travel</a></li>
//               <li><a href="#" className="hover:text-white">Culture</a></li>
//               <li><a href="#" className="hover:text-white">Business</a></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="uppercase text-xs tracking-widest text-white/40 mb-4">Society</h4>
//             <ul className="space-y-3 text-sm">
//               <li><a href="#" className="hover:text-white">About Us</a></li>
//               <li><a href="#" className="hover:text-white">Our Mission</a></li>
//               <li><a href="#" className="hover:text-white">Editorial Standards</a></li>
//               <li><a href="#" className="hover:text-white">Awards</a></li>
//               <li><a href="#" className="hover:text-white">Careers</a></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="uppercase text-xs tracking-widest text-white/40 mb-4">Subscribe</h4>
//             <ul className="space-y-3 text-sm">
//               <li><a href="#" className="hover:text-white">Newsletter</a></li>
//               <li><a href="#" className="hover:text-white">Podcast</a></li>
//               <li><a href="#" className="hover:text-white">Contact Us</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto border-t border-white/10 mt-16 pt-8 flex justify-between text-xs">
//           <div>© 2025 Journalism Society. All rights reserved.</div>
//           <div className="flex gap-6">
//             <a href="#" className="hover:text-white/90">Privacy Policy</a>
//             <a href="#" className="hover:text-white/90">Terms of Use</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// app/page.jsx



"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DOCKET = {
  id: "JS-2026-001",
  title: "Right of Reply: Example Corp. on Alleged Misreporting",
  summary:
    "A full documented response to claims published on 14 March 2026, including verified exhibits, a corrected timeline, and three witness statements previously unpublished.",
  date: "18 Mar 2026",
  type: "Docket",
  status: "Open",
};

const SECTIONS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="6" width="22" height="28" rx="1" stroke="#1e2d4a" strokeWidth="2" fill="#e8e0d0" />
        <line x1="8" y1="13" x2="22" y2="13" stroke="#1e2d4a" strokeWidth="1.5" />
        <line x1="8" y1="18" x2="22" y2="18" stroke="#1e2d4a" strokeWidth="1.5" />
        <line x1="8" y1="23" x2="17" y2="23" stroke="#1e2d4a" strokeWidth="1.5" />
        <rect x="18" y="20" width="18" height="14" rx="1" stroke="#1e2d4a" strokeWidth="1.5" fill="#c8b89a" />
        <line x1="21" y1="24" x2="33" y2="24" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="21" y1="27" x2="33" y2="27" stroke="#1e2d4a" strokeWidth="1" />
      </svg>
    ),
    label: "Dockets",
    desc: "Publishing responses, evidences, corrections, and accountability.",
    href: "/dockets",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="6" y="5" width="18" height="24" rx="1" stroke="#1e2d4a" strokeWidth="2" fill="#e8e0d0" />
        <rect x="11" y="9" width="18" height="24" rx="1" stroke="#1e2d4a" strokeWidth="1.5" fill="#d4c8b4" />
        <line x1="14" y1="16" x2="26" y2="16" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="14" y1="20" x2="26" y2="20" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="14" y1="24" x2="22" y2="24" stroke="#1e2d4a" strokeWidth="1" />
      </svg>
    ),
    label: "Document Room",
    desc: "Legal documents, correspondence, exhibits, and additional records.",
    href: "/document-room",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="8" width="32" height="22" rx="1" stroke="#1e2d4a" strokeWidth="2" fill="#e8e0d0" />
        <line x1="4" y1="14" x2="36" y2="14" stroke="#1e2d4a" strokeWidth="1.5" />
        <circle cx="8" cy="11" r="1.5" fill="#1e2d4a" />
        <circle cx="13" cy="11" r="1.5" fill="#1e2d4a" />
        <line x1="9" y1="19" x2="31" y2="19" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="9" y1="23" x2="31" y2="23" stroke="#1e2d4a" strokeWidth="1" />
        <line x1="9" y1="27" x2="22" y2="27" stroke="#1e2d4a" strokeWidth="1" />
      </svg>
    ),
    label: "Press Releases",
    desc: "Official statements and public clarifications to set the record.",
    href: "press-releases",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="8" width="32" height="22" rx="2" stroke="#1e2d4a" strokeWidth="2" fill="#e8e0d0" />
        <rect x="8" y="12" width="14" height="10" rx="1" stroke="#1e2d4a" strokeWidth="1.5" fill="#c8b89a" />
        <line x1="25" y1="14" x2="33" y2="14" stroke="#1e2d4a" strokeWidth="1.5" />
        <line x1="25" y1="18" x2="33" y2="18" stroke="#1e2d4a" strokeWidth="1.5" />
        <line x1="8" y1="25" x2="33" y2="25" stroke="#1e2d4a" strokeWidth="1" />
        <circle cx="32" cy="32" r="5" fill="#1e2d4a" />
        <path d="M30 32 L31.5 33.5 L34 30.5" stroke="white" strokeWidth="1.2" />
      </svg>
    ),
    label: "Media Watch",
    desc: "Analysis of media reports to expose inaccuracies and demand accountability.",
    href: "/media-watch",
  },
];

const STEPS = [
  { num: "01", title: "A Claim Is Published", desc: "Allegations to disputes are made by published organisations or publications." },
  { num: "02", title: "A Response Is Submitted", desc: "A documented response, including verifiable evidence, is submitted for review." },
  { num: "03", title: "A Docket Is Created", desc: "We approve the submission before a public docket for review and verification." },
  { num: "04", title: "The Record Stands", desc: "Once verified, the record is published so both claims and responses are fully accountable." },
];

const UPDATES = [
  { type: "DOCKET", id: "JS-2026-003", title: "Healthcare Providers Alliance — Response to Billing Claim", date: "22 Mar 2026", href: "/dockets/JS-2026-003" },
  { type: "MEDIA WATCH", id: "MW-2026-011", title: "Fact-Check: Regional Outlet Corrects Demographic Data", date: "21 Mar 2026", href: "#" },
  { type: "DOCUMENT", id: "DOC-2026-044", title: "Exhibit Set: Financial Audit Reports (2022–2024)", date: "20 Mar 2026", href: "/document-room/DOC-2026-044" },
  { type: "DOCKET", id: "JS-2026-002", title: "City Council Response to Infrastructure Report", date: "19 Mar 2026", href: "/dockets/JS-2026-002" },
];


const POLICIES = [
  {
    name : "Publishing Principles",
    href : "/publishing-principles"
  },
  {
    name : "Corrections Policy",
    href : "/corrections"
  },
  {
    name : "Ethics Charter",
    href : "/ethics"
  },
  {
    name : "Source Disclosures",
    href : "/disclosures"
  },
  {
    name : "Editorial Standards",
    href : "/editorial-standards"
  }

]
export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');

        .font-playfair {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-garamond {
          font-family: 'EB Garamond', Georgia, serif;
        }
        .font-mono-dm {
          font-family: 'DM Mono', monospace;
        }
      `}</style>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[300] bg-[#0a0f1e]/90 flex items-start justify-center pt-[100px]"
          onClick={() => setSearchOpen(false)}
        >
          <div className="w-full max-w-2xl px-6" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono-dm text-[0.6rem] tracking-[0.15em] text-white/40 uppercase mb-4">
              Search dockets, documents, and records
            </p>
            <input
              autoFocus
              className="w-full bg-transparent border-none border-b-2 border-white/50 font-playfair text-2xl md:text-3xl italic text-[#f5f0e8] py-3 outline-none placeholder:text-white/30"
              placeholder="Keyword, docket ID, or entity…"
            />
            <p className="font-mono-dm text-[0.58rem] text-white/25 mt-2.5 tracking-[0.1em]">
              Press ESC to close
            </p>
          </div>
        </div>
      )}

      <Header />

      {/* Hero Section */}
      <section className="bg-[#f5f0e8] py-14 px-6 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="font-playfair font-black text-[clamp(3.2rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-[#1e2d4a] mb-6">
                Journalism<br />Society
              </h1>

              <div className="border-l-4 border-[#b8974a] pl-4 mb-7">
                <p className="font-playfair italic text-[clamp(1.2rem,3vw,1.75rem)] text-[#b8974a] leading-tight">
                  Right of Reply. In Full.
                </p>
              </div>

              <p className="font-garamond text-[1.05rem] leading-relaxed text-[#4a4035] max-w-md mb-2">
                Public record platform for publishing responses, evidence, corrections to counter inaccurate or false reporting.
              </p>

              <p className="font-garamond italic text-[0.9rem] text-[#9a8870] mb-8">
                Audi alteram partem — hear the other side.
              </p>

              <div className="flex gap-3 flex-wrap">
                <Link href="/dockets" className="inline-flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] font-mono-dm text-[0.62rem] tracking-[0.13em] uppercase px-5 py-2.5 hover:bg-[#2a3f6a] transition-colors">
                  Browse Dockets
                </Link>
                <a href="#how" className="inline-flex items-center gap-2 bg-transparent text-[#1e2d4a] font-mono-dm text-[0.62rem] tracking-[0.13em] uppercase px-5 py-2.5 border-2 border-[#1e2d4a] hover:bg-[#1e2d4a] hover:text-[#f5f0e8] transition-colors">
                  Learn How It Works
                </a>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="flex-1 max-w-[260px] bg-[#ede8dc] border border-[#d4c8b4] p-7">
              {[
                { num: "47", label: "Active Dockets" },
                { num: "203", label: "Verified Responses" },
                { num: "31", label: "Corrections Filed" },
                { num: "100%", label: "Accountability" },
              ].map((s, i) => (
                <div key={s.label} className={`pb-4 mb-4 ${i < 3 ? "border-b border-[#d4c8b4]" : ""}`}>
                  <div className="font-playfair font-black text-[2.6rem] leading-none text-[#b8974a]">{s.num}</div>
                  <div className="font-mono-dm text-[0.6rem] tracking-[0.14em] uppercase text-[#7a6e5e] mt-1">{s.label}</div>
                </div>
              ))}

              {/* Search Box */}
              <div
                className="mt-5 bg-[#f5f0e8] border border-[#d4c8b4] flex items-center gap-2 px-3 py-2.5 cursor-pointer"
                onClick={() => setSearchOpen(true)}
              >
                <FiSearch size={13} className="text-[#9a8870]" />
                <span className="font-mono-dm text-[0.6rem] tracking-[0.1em] text-[#9a8870] uppercase">Search records…</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Docket */}
      <section className="bg-[#f5f0e8] px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-5 flex justify-between items-baseline">
            <span className="font-mono-dm text-[0.6rem] tracking-[0.16em] uppercase text-[#9a8870]">Featured Docket</span>
            <Link href="/dockets" className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] no-underline">
              All Dockets →
            </Link>
          </div>

          <div className="grid md:grid-cols-[1fr_340px] border border-[#d4c8b4] bg-[#faf6ee] overflow-hidden">
            <div className="p-8 md:p-9">
              <div className="flex gap-2 items-center mb-5">
                <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">Media Reply</span>
                <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase border border-[#1e2d4a] text-[#1e2d4a] px-2 py-0.5">Media Review</span>
              </div>

              <h2 className="font-playfair font-bold text-[clamp(1.3rem,2.5vw,1.9rem)] leading-tight text-[#1e2d4a] mb-4 max-w-[520px]">
                {DOCKET.title}
              </h2>

              <p className="font-garamond text-[1.05rem] leading-relaxed text-[#5a5040] max-w-[500px] mb-7">
                {DOCKET.summary}
              </p>

              <div className="flex gap-7 flex-wrap mb-7">
                {[
                  ["Filed", DOCKET.date],
                  ["Status", "Under Review"],
                  ["Exhibits", "12 documents"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="font-mono-dm text-[0.58rem] tracking-[0.12em] uppercase text-[#9a8870] mb-0.5">{k}</div>
                    <div className="font-garamond text-[0.95rem] text-[#3a3028]">{v}</div>
                  </div>
                ))}
              </div>

              <Link href="/dockets/JS-2026-006" className="inline-flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] font-mono-dm text-[0.62rem] tracking-[0.13em] uppercase px-5 py-2.5 hover:bg-[#2a3f6a] transition-colors">
                View Full Record
              </Link>
            </div>

            <div className="hidden md:block min-h-[280px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=700&q=80"
                alt="Courthouse"
                className="w-full h-full object-cover sepia-[0.2] brightness-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="bg-[#ede8dc] border-y border-[#d4c8b4] py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTIONS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="p-5 border border-[#d4c8b4] bg-[#faf6ee] hover:bg-white hover:shadow-md transition-all no-underline text-inherit flex flex-col gap-2.5"
              >
                <div>{s.icon}</div>
                <div className="font-playfair font-bold text-base text-[#1e2d4a]">{s.label}</div>
                <p className="font-garamond text-[0.88rem] leading-relaxed text-[#6a5e4e]">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-[#f5f0e8] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair font-bold text-[clamp(1.6rem,4vw,2.2rem)] text-[#1e2d4a] mb-7">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {STEPS.map((step, i) => (
              <div key={step.num} className="border border-[#d4c8b4] p-6 bg-[#faf6ee] relative">
                <div className="font-playfair font-black text-[2.8rem] leading-none text-[#c8b89a] mb-3.5">{step.num}</div>
                <div className="font-playfair font-bold text-base text-[#1e2d4a] mb-2.5">{step.title}</div>
                <p className="font-garamond text-[0.88rem] leading-relaxed text-[#6a5e4e]">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-[40%] text-[#c8b89a] text-xl font-light">›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="bg-[#2a1f14] bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-12 items-start">
          <div className="flex-1 min-w-[160px]">
            <div className="border-t-2 border-[#b8974a] pt-2.5">
              <span className="font-mono-dm text-[0.58rem] tracking-[0.16em] uppercase text-[#b8974a]">Our Purpose</span>
            </div>
          </div>
          <div className="flex-[2]">
            <h2 className="font-playfair font-bold text-[clamp(1.8rem,4vw,3rem)] text-[#f5f0e8] leading-tight mb-6">
              Most reporting shows one side.
            </h2>
            <p className="font-garamond text-[1.1rem] leading-relaxed text-[#c8b89a] mb-4 max-w-[580px]">
              We ensure the <strong className="text-[#f5f0e8]">other side</strong> is recorded — clearly, permanently, and impartially. Every docket shows the complete record — the claims, the responses, and the evidence. Nothing erased. Nothing hidden.
            </p>
            <p className="font-garamond italic text-[0.95rem] text-[#8a7a64]">
              "The press was to serve the governed, not the governors." — Justice Hugo Black
            </p>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="bg-[#f5f0e8] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border-t-2 border-[#1e2d4a] pt-2.5 mb-5 flex justify-between items-baseline">
            <span className="font-mono-dm text-[0.6rem] tracking-[0.16em] uppercase text-[#9a8870]">Latest Updates</span>
            <Link href="#" className="font-mono-dm text-[0.6rem] tracking-[0.1em] uppercase text-[#1e2d4a] no-underline">
              View all →
            </Link>
          </div>

          {UPDATES.map((u) => (
            <Link
              key={u.id}
              href={u.href}
              className="flex items-baseline gap-3.5 py-3.5 border-b border-[#d4c8b4] hover:bg-[#ede8dc] transition-colors no-underline group"
            >
              <span className="font-mono-dm text-[0.55rem] tracking-[0.1em] uppercase border border-[#c4b89a] px-1.5 py-0.5 text-[#7a6e5e] whitespace-nowrap flex-shrink-0">
                {u.type}
              </span>
              <span className="font-mono-dm text-[0.65rem] text-[#b8974a] whitespace-nowrap flex-shrink-0">{u.id}</span>
              <span className="font-garamond text-[0.95rem] text-[#2a2018] flex-1 group-hover:underline">{u.title}</span>
              <span className="font-mono-dm text-[0.6rem] text-[#9a8870] whitespace-nowrap flex-shrink-0">{u.date}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Policies */}
      <section className="bg-[#ede8dc] border-y border-[#d4c8b4] py-7 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <p className="font-garamond italic text-[0.95rem] text-[#7a6e5e]">
            Governed by clear editorial principles. Independently operated.
          </p>
          <div className="flex flex-wrap gap-0">
            {POLICIES.map((p, i) => (
              <span key={p.href}>
                <a
                  href={p.href}
                  className="font-mono-dm text-[0.58rem] tracking-[0.1em] uppercase text-[#6a5e4e] hover:text-[#1e2d4a] transition-colors no-underline"
                >
                  {p.name}
                </a>
                {i < POLICIES.length - 1 && <span className="text-[#c8b89a] px-3 font-serif">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

// // 7 Cards
// const cards = [
//   {
//     id: 1,
//     img: "https://images.unsplash.com/photo-1611432579698-9f4f6c6e6f0e",
//     bg: "#2a2a2a",
//   },
//   {
//     id: 2,
//     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
//     bg: "#4a3f35",
//   },
//   {
//     id: 3,
//     img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//     bg: "#1f1f1f",
//   },
//   {
//     id: 4,
//     img: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad",
//     bg: "#d4c2b0",
//   },
//   {
//     id: 5,
//     img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//     bg: "#a8c4c0",
//   },
//   {
//     id: 6,
//     img: "https://images.unsplash.com/photo-1567532939604-e320e59cf0e8",
//     bg: "#c8b0d0",
//   },
//   {
//     id: 7,
//     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
//     bg: "#e8d5c0",
//   },
// ];

// // Updated layout as per your request (asymmetric center)
// const layout = [
//   { widthPx: 100, heightPx: 220, yOffset: 72, clipLeft: true },    // 1
//   { widthPx: 125, heightPx: 258, yOffset: 46, clipLeft: false },   // 2
//   { widthPx: 150, heightPx: 292, yOffset: 24, clipLeft: false },   // 3
//   { widthPx: 172, heightPx: 328, yOffset: 8,  clipLeft: false },   // 4 - Largest (center left)
//   { widthPx: 150, heightPx: 292, yOffset: 24, clipLeft: false },   // 5
//   { widthPx: 125, heightPx: 258, yOffset: 46, clipLeft: false },   // 6
//   { widthPx: 100, heightPx: 220, yOffset: 72, clipRight: true },   // 7 - right outer
// ];

// const GAP = 10;

// export default function Home() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const maxHeight = Math.max(...layout.map((l) => l.heightPx));

//   return (
//     <div className="flex flex-col min-h-screen bg-[#f0ebe2]" style={{ fontFamily: "'Georgia', serif" }}>

//       {/* HEADER */}
//       <header className="w-full bg-[#f0ebe2] px-6 md:px-10 py-3 flex items-center justify-between relative border-b border-[#e0d8cc]">
//         <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600" style={{ fontFamily: "Arial, sans-serif" }}>
//           {["Services", "Features", "Blog"].map((item) => (
//             <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
//           ))}
//         </nav>

//         <div className="hidden md:block absolute left-1/2 -translate-x-1/2 text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Arial, sans-serif" }}>
//           Journalism Society
//         </div>

//         <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600" style={{ fontFamily: "Arial, sans-serif" }}>
//           {["About", "Pricing", "Contact"].map((item) => (
//             <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
//           ))}
//           <a href="#" className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
//             Get started
//             <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-600">
//               <FiArrowRight size={12} />
//             </span>
//           </a>
//         </nav>

//         <button className="md:hidden z-10 text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//         </button>

//         <div className="md:hidden absolute left-1/2 -translate-x-1/2 text-base font-bold text-gray-900 whitespace-nowrap" style={{ fontFamily: "Arial, sans-serif" }}>
//           Journalism Society
//         </div>

//         <a href="#" className="md:hidden flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-medium text-white z-10" style={{ fontFamily: "Arial, sans-serif" }}>
//           Get started <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-600"><FiArrowRight size={10} /></span>
//         </a>
//       </header>

//       {menuOpen && (
//         <div className="md:hidden bg-[#f0ebe2] border-b border-gray-200 px-6 py-4 flex flex-col gap-3" style={{ fontFamily: "Arial, sans-serif" }}>
//           <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Menu</p>
//           {["Services", "Features", "Blog", "About", "Pricing", "Contact"].map((item, i, arr) => (
//             <a 
//               key={i} 
//               href="#" 
//               className={`text-sm text-gray-700 hover:text-black py-1 ${i < arr.length - 1 ? "border-b border-gray-200" : ""}`}
//             >
//               {item}
//             </a>
//           ))}
//         </div>
//       )}

//       {/* HERO SECTION */}
//       <section className="flex flex-col items-center pt-12 pb-0 overflow-hidden">

//         <div className="text-center px-4 mb-12">
//           <h1 className="text-4xl md:text-5xl leading-tight text-gray-900">
//             <span className="font-normal italic block">Streamline Your Team,</span>
//             <span className="font-extrabold block">Supercharge Your Workflow</span>
//           </h1>
//           <p className="mt-4 text-gray-500 text-base leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
//             All-in-one platform to plan, collaborate,<br />
//             and deliver — faster and smarter.
//           </p>
//           <a
//             href="#"
//             className="inline-flex items-center gap-3 mt-6 rounded-full bg-gray-900 text-white px-7 py-3 text-sm font-semibold hover:bg-gray-700 transition-colors"
//             style={{ fontFamily: "Arial, sans-serif" }}
//           >
//             Get started for Free
//             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-900">
//               <FiArrowRight size={14} />
//             </span>
//           </a>
//         </div>

//         {/* ARC CARDS - 7 ITEMS with your custom layout */}
//         <div
//           className="relative flex items-end justify-center w-full"
//           style={{ height: `${maxHeight + 30}px`, overflow: "hidden" }}
//         >
//           <div className="flex items-end" style={{ gap: `${GAP}px` }}>
//             {cards.map((card, i) => {
//               const l = layout[i];
//               return (
//                 <div
//                   key={card.id}
//                   style={{
//                     width: `${l.widthPx}px`,
//                     height: `${l.heightPx}px`,
//                     marginBottom: `${l.yOffset}px`,
//                     flexShrink: 0,
//                     overflow: "hidden",
//                     marginLeft: l.clipLeft ? `-${l.widthPx / 2.2}px` : "0",
//                     marginRight: l.clipRight ? `-${l.widthPx / 2.2}px` : "0",
//                   }}
//                 >
//                   <div
//                     className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
//                     style={{ backgroundColor: card.bg }}
//                   >
//                     <img
//                       src={card.img}
//                       alt={`Team member ${i + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="bg-[#f0ebe2] pt-12 pb-20 px-6">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
//           {[
//             {
//               title: "Real-Time Collaboration",
//               desc: "Communicate seamlessly and keep everyone in sync with built-in messaging, file sharing, and live updates.",
//             },
//             {
//               title: "Task & Project Tracking",
//               desc: "Assign tasks, set deadlines, and visualize progress with boards, lists, and timelines tailored to your team's style.",
//             },
//             {
//               title: "Performance Insights",
//               desc: "Make smarter decisions with analytics that show productivity trends, bottlenecks, and team workload balance.",
//             },
//           ].map((f) => (
//             <div key={f.title} className="flex flex-col items-center gap-3">
//               <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: "Arial, sans-serif" }}>{f.title}</h3>
//               <p className="text-sm text-gray-500 leading-relaxed max-w-xs" style={{ fontFamily: "Arial, sans-serif" }}>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

