// app/sitemap.js
const SITE_URL = "https://journalism-society.vercel.app";

export default async function sitemap() {
  // Static public pages
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/dockets`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/document-room`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/press-releases`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/media-watch`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/publishing-principles`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/corrections`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/ethics`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/disclosures`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/editorial-standards`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamic dockets — fetch from API
  let docketPages = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dockets`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const dockets = Array.isArray(data) ? data : data.dockets || [];
      docketPages = dockets.map((d) => ({
        url: `${SITE_URL}/dockets/${d._id}`,
        lastModified: new Date(d.lastUpdated || d.publishedDate || d.createdAt),
        changeFrequency: "weekly",
        priority: 0.85,
      }));
    }
  } catch (_) {}

  // Dynamic press releases
  let pressPages = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/press-releases`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const releases = data.releases || [];
      pressPages = releases.map((r) => ({
        url: `${SITE_URL}/press-releases/${r._id}`,
        lastModified: new Date(r.date || r.createdAt),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }
  } catch (_) {}

  // Dynamic documents
  let docPages = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const docs = data.documents || [];
      docPages = docs.map((d) => ({
        url: `${SITE_URL}/document-room/${d._id}`,
        lastModified: new Date(d.publishedDate || d.createdAt),
        changeFrequency: "monthly",
        priority: 0.65,
      }));
    }
  } catch (_) {}

  return [...staticPages, ...docketPages, ...pressPages, ...docPages];
}