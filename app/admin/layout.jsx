

// app/admin/layout.jsx
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiLayout, FiInbox, FiFileText, FiMic, FiFolder,
  FiLogOut, FiChevronRight, FiMenu, FiX, FiPlusCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { ImNewspaper } from "react-icons/im";
import adminAPI from "@/services/adminApi";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pendingFlags, setPendingFlags] = useState(0);
  const [pendingMedia, setPendingMedia] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        setLoading(false);
        return;
      }

      try {
        await adminAPI.verifyToken();
        setIsAuthenticated(true);
        // Fetch all badge counts from the single stats endpoint
        try {
          const stats = await adminAPI.getStats();
          setPendingFlags(stats.pendingFlags || 0);
          setPendingMedia(stats.pendingMedia || 0);
        } catch {
          // Non-critical — swallow error
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Re-fetch badge counts whenever the route changes so badges stay fresh
  // e.g. after approving a media submission the badge updates on next nav
  useEffect(() => {
    if (!isAuthenticated) return;
    const refreshCounts = async () => {
      try {
        const stats = await adminAPI.getStats();
        setPendingFlags(stats.pendingFlags || 0);
        setPendingMedia(stats.pendingMedia || 0);
      } catch {
        // Non-critical
      }
    };
    refreshCounts();
  }, [pathname, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
      </div>
    );
  }

  if (pathname === "/admin/login") return children;
  if (!isAuthenticated) return null;

  const navItems = [
    { name: "Dashboard",      href: "/admin/dashboard",      icon: FiLayout },
    { name: "Submissions",    href: "/admin/submissions",    icon: FiInbox },
    { name: "Create Docket",  href: "/admin/create-docket",  icon: FiPlusCircle },
    { name: "Dockets",        href: "/admin/dockets",        icon: FiFileText },
    {
      name: "Media",
      href: "/admin/media",
      icon: FiMic,
      badge: pendingMedia > 0 ? pendingMedia : null,
    },
    { name: "Documents",      href: "/admin/documents",      icon: FiFolder },
    { name: "Press Releases", href: "/admin/press-releases", icon: ImNewspaper },
    {
      name: "Flag Reports",
      href: "/admin/flags",
      icon: FiAlertTriangle,
      badge: pendingFlags > 0 ? pendingFlags : null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1e2d4a] p-2 rounded text-white shadow-lg cursor-pointer"
      >
        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-[#1e2d4a] border-r border-white/10 z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto`}
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="font-playfair font-bold text-xl text-[#f5f0e8]">Journalism Society</h1>
          <p className="font-mono-dm text-xs text-[#8a9bb8] mt-1">Admin Panel</p>
        </div>

        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded mb-1 transition-colors ${
                  isActive
                    ? "bg-[#b8974a] text-[#1e2d4a]"
                    : "text-[#8a9bb8] hover:bg-[#2a3f6a] hover:text-[#f5f0e8]"
                }`}
              >
                <Icon size={18} />
                <span className="font-mono-dm text-sm flex-1">{item.name}</span>
                {/* Badge for pending counts */}
                {item.badge && (
                  <span
                    className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[0.6rem] font-bold"
                    style={{
                      background: isActive ? "#1e2d4a" : "#b8190c",
                      color: "#fff",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && !item.badge && <FiChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#1e2d4a]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-[#8a9bb8] hover:bg-[#2a3f6a] hover:text-[#f5f0e8] rounded transition-colors cursor-pointer"
          >
            <FiLogOut size={18} />
            <span className="font-mono-dm text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen && !isMobile ? "md:ml-64" : "ml-0"
        } min-h-screen`}
      >
        <div className="p-4 md:p-8 pt-16 md:pt-8">{children}</div>
      </div>
    </div>
  );
}