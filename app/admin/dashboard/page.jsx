
// app/admin/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiInbox, FiMic, FiFileText, FiFolder, FiArrowRight,
  FiBookOpen, FiEye, FiClock, FiUser, FiCalendar,
  FiPlusCircle, FiEdit2, FiTrash2, FiAlertTriangle,
} from "react-icons/fi";
import adminAPI from "@/services/adminApi";

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const formatRelativeTime = (date) => {
  if (!date) return "N/A";
  const diffMs = new Date() - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  return formatDate(date);
};

const ENTITY_CONFIG = {
  docket:        { icon: FiFileText,      color: "#2d6a4f", bg: "#f0fdf4", label: "Docket" },
  submission:    { icon: FiInbox,         color: "#b45309", bg: "#fffbeb", label: "Submission" },
  media:         { icon: FiMic,           color: "#1d4ed8", bg: "#eff6ff", label: "Media" },
  press_release: { icon: FiBookOpen,      color: "#b8974a", bg: "#fffbeb", label: "Press Release" },
  document:      { icon: FiFolder,        color: "#475569", bg: "#f8fafc", label: "Document" },
  flag:          { icon: FiAlertTriangle, color: "#b8190c", bg: "#fef2f2", label: "Flag Report" },
};

const ACTION_CONFIG = {
  created: { label: "Created", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", icon: FiPlusCircle },
  updated: { label: "Edited",  color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", icon: FiEdit2 },
  deleted: { label: "Deleted", color: "#b91c1c", bg: "#fef2f2", border: "#fecaca", icon: FiTrash2 },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pendingSubmissions: 0, pendingMedia: 0,
    totalDockets: 0, totalDocuments: 0, totalPressReleases: 0,
    pendingFlags: 0,
  });
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearing, setClearing] = useState(false);

  const cards = [
    { title: "Pending Submissions", value: stats.pendingSubmissions, icon: FiInbox,         color: "#b45309", bg: "#fffbeb", link: "/admin/submissions?status=pending" },
    { title: "Pending Media",       value: stats.pendingMedia,       icon: FiMic,            color: "#1d4ed8", bg: "#eff6ff", link: "/admin/media?status=pending" },
    { title: "Total Dockets",       value: stats.totalDockets,       icon: FiFileText,       color: "#2d6a4f", bg: "#f0fdf4", link: "/admin/dockets" },
    { title: "Total Documents",     value: stats.totalDocuments,     icon: FiFolder,         color: "#b8974a", bg: "#fffbeb", link: "/admin/documents" },
    { title: "Press Releases",      value: stats.totalPressReleases, icon: FiBookOpen,       color: "#b8974a", bg: "#fffbeb", link: "/admin/press-releases" },
    { title: "Pending Flags",       value: stats.pendingFlags,       icon: FiAlertTriangle,  color: "#b8190c", bg: "#fef2f2", link: "/admin/flags?status=pending" },
  ];

  const tabs = [
    { key: "all",           label: "All" },
    { key: "docket",        label: "Dockets" },
    { key: "submission",    label: "Submissions" },
    { key: "media",         label: "Media" },
    { key: "press_release", label: "Press" },
    { key: "flag",          label: "Flags" },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, logsRes] = await Promise.all([
          adminAPI.getStats(),
          adminAPI.getActivityLog(),
        ]);
        setStats(statsRes);
        setActivityLogs(logsRes.logs || []);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleClearActivity = async () => {
    setClearing(true);
    try {
      await adminAPI.clearActivityLog();
      setActivityLogs([]);
      setShowClearConfirm(false);
    } catch (error) {
      console.error("Error clearing activity log:", error);
      alert("Failed to clear activity log");
    } finally {
      setClearing(false);
    }
  };

  const filteredLogs = activityLogs.filter((log) =>
    activeTab === "all" ? true : log.entityType === activeTab
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]" />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1 className="font-playfair font-black text-3xl text-[#1e2d4a] mb-2">Dashboard</h1>
      <p className="font-garamond text-[#7a6e5e] mb-8">Welcome back to your admin panel</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.link}
              className="block border border-[#d4c8b4] bg-white p-4 md:p-6 hover:shadow-md transition-shadow group rounded-lg hover:border-black"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  style={{ background: card.bg }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <FiArrowRight className="text-[#c4b89a] group-hover:text-[#b8974a] transition-colors" />
              </div>
              <p className="font-mono-dm text-xs text-[#9a8870] uppercase mb-1">{card.title}</p>
              <p
                className="font-playfair font-bold text-2xl md:text-3xl"
                style={{ color: card.color }}
              >
                {card.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 mb-8">
        <h2 className="font-playfair font-bold text-xl text-[#1e2d4a] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { href: "/admin/submissions",    icon: FiInbox,         label: "Review Submissions",   sub: `${stats.pendingSubmissions} pending` },
            { href: "/admin/dockets",        icon: FiFileText,      label: "Manage Dockets",        sub: `${stats.totalDockets} total` },
            { href: "/admin/documents",      icon: FiEye,           label: "View Documents",        sub: `${stats.totalDocuments} total` },
            { href: "/admin/press-releases", icon: FiBookOpen,      label: "Press Releases",        sub: `${stats.totalPressReleases} total` },
            { href: "/admin/flags",          icon: FiAlertTriangle, label: "Flag Reports",          sub: `${stats.pendingFlags} pending` },
          ].map(({ href, icon: Icon, label, sub }) => (
            <Link
              key={href}
              href={href}
              className="p-4 border border-[#d4c8b4] bg-[#faf6ee] hover:bg-[#ede8dc] transition-colors text-center group"
            >
              <Icon
                size={24}
                className="mx-auto text-[#b8974a] mb-2 group-hover:scale-110 transition-transform"
              />
              <p className="font-mono-dm text-sm text-gray-600">{label}</p>
              <p className="font-garamond text-xs text-[#9a8870] mt-1">{sub}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h2 className="font-playfair font-bold text-xl text-[#1e2d4a] flex items-center gap-2">
              <FiClock size={20} /> Recent Activity
            </h2>
            {activityLogs.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="group flex items-center gap-2 px-4 py-2 text-xs font-mono-dm uppercase tracking-widest border border-red-200 bg-red-100 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-md transition-all duration-200 cursor-pointer rounded-lg"
              >
                <FiTrash2 size={12} className="group-hover:rotate-12 transition-transform duration-200" />
                Clear All
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1 text-xs font-mono-dm uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-[#1e2d4a] text-[#f5f0e8]"
                    : "text-[#9a8870] hover:text-[#1e2d4a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity list */}
        <div className="space-y-3">
          {filteredLogs.length === 0 ? (
            <p className="font-garamond text-[#9a8870] text-center py-8">
              No activity recorded yet. Actions like creating, editing, and deleting will appear here.
            </p>
          ) : (
            filteredLogs.slice(0, 20).map((log) => {
              const entity = ENTITY_CONFIG[log.entityType] || ENTITY_CONFIG.document;
              const action = ACTION_CONFIG[log.action]  || ACTION_CONFIG.updated;
              const EntityIcon = entity.icon;
              const ActionIcon = action.icon;

              return (
                <div
                  key={log._id}
                  className="flex items-start gap-4 p-4 border border-[#e4ddd0] hover:bg-[#faf6ee] transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: entity.bg }}
                  >
                    <EntityIcon size={18} style={{ color: entity.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className="font-mono-dm text-xs uppercase tracking-wider"
                        style={{ color: entity.color }}
                      >
                        {entity.label}
                      </span>

                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono-dm border rounded"
                        style={{
                          background: action.bg,
                          color: action.color,
                          borderColor: action.border,
                        }}
                      >
                        <ActionIcon size={10} />
                        {action.label}
                      </span>

                      <span className="font-mono-dm text-xs text-[#9a8870] flex items-center gap-1 ml-auto">
                        <FiCalendar size={10} />
                        {formatRelativeTime(log.createdAt)}
                      </span>
                    </div>

                    <p className="font-playfair font-bold text-sm text-[#1e2d4a] mb-0.5 truncate">
                      {log.entityTitle || "Untitled"}
                    </p>

                    {log.entitySubtitle && (
                      <p className="font-garamond text-xs text-[#7a6e5e] flex items-center gap-1">
                        <FiUser size={10} />
                        {log.entitySubtitle}
                      </p>
                    )}
                  </div>

                  <span className="font-mono-dm text-xs text-[#9a8870] hidden sm:block flex-shrink-0">
                    {formatDate(log.createdAt)}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#e4ddd0] flex justify-between items-center flex-wrap gap-4">
          <p className="font-mono-dm text-xs text-[#9a8870]">
            Showing {Math.min(filteredLogs.length, 20)} of {filteredLogs.length} activities
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/admin/submissions"
              className="font-mono-dm text-xs text-[#b8974a] hover:text-[#1e2d4a] transition-colors"
            >
              View All Submissions →
            </Link>
            <Link
              href="/admin/dockets"
              className="font-mono-dm text-xs text-[#b8974a] hover:text-[#1e2d4a] transition-colors"
            >
              View All Dockets →
            </Link>
            <Link
              href="/admin/flags"
              className="font-mono-dm text-xs text-[#b8974a] hover:text-[#1e2d4a] transition-colors"
            >
              View All Flags →
            </Link>
          </div>
        </div>
      </div>

      {/* Clear Confirm Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f5f0e8] border-t-4 border-red-400 max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <FiTrash2 size={18} className="text-red-500" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#1e2d4a]">Clear Activity Log</h3>
            </div>
            <p className="font-garamond text-[#7a6e5e] mb-1">
              Are you sure you want to clear all activity history?
            </p>
            <p className="font-mono-dm text-xs text-red-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleClearActivity}
                disabled={clearing}
                className="flex-1 font-mono-dm text-xs tracking-widest uppercase bg-red-500 text-white py-2.5 hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {clearing ? "Clearing..." : "Yes, Clear All"}
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                disabled={clearing}
                className="flex-1 font-mono-dm text-xs tracking-widest uppercase border border-[#c4b89a] text-[#7a6e5e] py-2.5 hover:bg-[#ede8dc] transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}