// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin"],
      },
    ],
    sitemap: "https://journalism-society.vercel.app/sitemap.xml",
    host: "https://journalism-society.vercel.app",
  };
}