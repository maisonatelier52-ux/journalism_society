// // app/admin/media/page.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";
// import adminAPI from "@/services/adminApi";


// const formatDate = (date) => new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// export default function MediaPage() {
//   const searchParams = useSearchParams();
//   const statusFilter = searchParams.get("status") || "all";
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMedia();
//   }, [statusFilter]);

//   const fetchMedia = async () => {
//     try {
//       const response = await adminAPI.getMedia(statusFilter);
//       setMedia(response.media);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await adminAPI.approveMedia(id);
//       await fetchMedia();
//       alert("Media approved");
//     } catch (error) {
//       alert("Failed to approve");
//     }
//   };

//   const handleReject = async (id) => {
//     const reason = prompt("Enter rejection reason:");
//     if (reason === null) return;
//     try {
//       await adminAPI.rejectMedia(id, reason);
//       await fetchMedia();
//       alert("Media rejected");
//     } catch (error) {
//       alert("Failed to reject");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="font-playfair font-black text-3xl text-[#1e2d4a] mb-2">Media Watch</h1>
//       <p className="font-garamond text-[#7a6e5e] mb-8">Approve and manage media coverage citations</p>

//       <div className="border border-[#d4c8b4] bg-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
//               <tr>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Outlet</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Headline</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Date</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Status</th>
//                 <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {media.length === 0 ? (
//                 <tr><td colSpan="5" className="text-center py-12 font-garamond text-[#9a8870]">No media found</td></tr>
//               ) : (
//                 media.map((item) => (
//                   <tr key={item._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee]">
//                     <td className="py-3 px-4"><span className="font-garamond text-sm">{item.outlet}</span></td>
//                     <td className="py-3 px-4"><p className="font-garamond text-sm text-[#1e2d4a]">{item.headline}</p></td>
//                     <td className="py-3 px-4"><span className="font-mono-dm text-xs text-[#9a8870]">{formatDate(item.date)}</span></td>
//                     <td className="py-3 px-4">
//                       <span className={`inline-block px-2 py-1 text-xs font-mono-dm ${
//                         item.status === "approved" ? "bg-green-50 text-green-700 border border-green-200" :
//                         item.status === "rejected" ? "bg-red-50 text-red-700 border border-red-200" :
//                         "bg-yellow-50 text-yellow-700 border border-yellow-200"
//                       }`}>{item.status}</span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex gap-2">
//                         <a href={item.url} target="_blank" className="text-[#b8974a] hover:text-[#1e2d4a]" title="View"><FiEye size={16} /></a>
//                         {item.status === "pending" && (
//                           <>
//                             <button onClick={() => handleApprove(item._id)} className="text-green-600 hover:text-green-700" title="Approve"><FiCheckCircle size={16} /></button>
//                             <button onClick={() => handleReject(item._id)} className="text-red-500 hover:text-red-600" title="Reject"><FiXCircle size={16} /></button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



// app/admin/media/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  FiCheckCircle, 
  FiXCircle, 
  FiEye, 
  FiClock,
  FiTag,
  FiEdit2,
  FiExternalLink,
  FiPlus,
  FiSearch,
  FiX,
  FiTrash2
} from "react-icons/fi";
import adminAPI from "@/services/adminApi";

const formatDate = (date) => new Date(date).toLocaleDateString("en-GB", { 
  day: "2-digit", 
  month: "short", 
  year: "numeric" 
});

const formatDateTime = (date) => new Date(date).toLocaleDateString("en-GB", { 
  day: "2-digit", 
  month: "short", 
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

const STANCE_OPTIONS = [
  { value: "adversarial", label: "Adversarial", color: "#b8190c" },
  { value: "neutral", label: "Neutral", color: "#6a7a94" },
  { value: "supportive", label: "Supportive", color: "#2d6a4f" },
];

const MEDIA_TYPES = [
  "Original Report",
  "Follow-up",
  "Opinion",
  "Fact-Check",
  "News",
  "Regional",
  "Other"
];

export default function MediaPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("approved"); // approved, pending, create
  const [media, setMedia] = useState([]);
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [dockets, setDockets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [approveData, setApproveData] = useState({ stance: "neutral", summary: "", adminNotes: "" });
  const [createData, setCreateData] = useState({
    outlet: "",
    headline: "",
    url: "",
    date: "",
    type: "News",
    stance: "neutral",
    summary: "",
    docketId: "",
    docketNumber: "",
  });
  const [docketSearch, setDocketSearch] = useState("");
  const [selectedDocket, setSelectedDocket] = useState(null);
  const [showDocketDropdown, setShowDocketDropdown] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Fetch pending count separately to always show correct number on tab
  useEffect(() => {
    fetchPendingCount();
  }, []);

  const fetchPendingCount = async () => {
    try {
      const response = await adminAPI.getMediaSubmissions("pending");
      setPendingCount(response.submissions?.length || 0);
    } catch (error) {
      console.error("Error fetching pending count:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "pending") {
        const response = await adminAPI.getMediaSubmissions("pending");
        setPendingSubmissions(response.submissions || []);
        setPendingCount(response.submissions?.length || 0);
      } else if (activeTab === "approved") {
        const response = await adminAPI.getMedia();
        setMedia(response.media || []);
      } else if (activeTab === "create") {
        const docketsResponse = await adminAPI.getDockets();
        setDockets(docketsResponse.dockets || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (submission) => {
    setSelectedSubmission(submission);
    setApproveData({ 
      stance: "neutral", 
      summary: submission.note || "", 
      adminNotes: "" 
    });
    setShowApproveModal(true);
  };

  const confirmApprove = async () => {
    try {
      await adminAPI.approveMediaSubmission(selectedSubmission._id, approveData);
      alert("Media approved and published!");
      setShowApproveModal(false);
      setSelectedSubmission(null);
      // Refresh both tabs data
      await fetchData();
      await fetchPendingCount();
      // If currently on approved tab, refresh media list
      if (activeTab === "approved") {
        const response = await adminAPI.getMedia();
        setMedia(response.media || []);
      }
    } catch (error) {
      console.error("Error approving:", error);
      alert("Failed to approve");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (reason === null) return;
    try {
      await adminAPI.rejectMediaSubmission(id, reason);
      alert("Media rejected");
      await fetchData();
      await fetchPendingCount();
    } catch (error) {
      alert("Failed to reject");
    }
  };

  const handleDeleteMedia = async (id) => {
    if (!confirm("Are you sure you want to delete this media entry? This action cannot be undone.")) return;
    try {
      await adminAPI.deleteMedia(id);
      alert("Media deleted successfully");
      // Refresh the media list
      const response = await adminAPI.getMedia();
      setMedia(response.media || []);
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete media");
    }
  };

  const handleCreateMedia = async () => {
    if (!createData.outlet.trim()) {
      alert("Please enter publication name");
      return;
    }
    if (!createData.headline.trim()) {
      alert("Please enter headline");
      return;
    }
    if (!createData.url.trim()) {
      alert("Please enter URL");
      return;
    }
    if (!createData.date) {
      alert("Please select date");
      return;
    }
    if (!createData.docketId) {
      alert("Please select a docket");
      return;
    }

    try {
      await adminAPI.createMediaDirect({
        ...createData,
        source: "admin",
      });
      alert("Media created successfully!");
      setCreateData({
        outlet: "",
        headline: "",
        url: "",
        date: "",
        type: "News",
        stance: "neutral",
        summary: "",
        docketId: "",
        docketNumber: "",
      });
      setSelectedDocket(null);
      setShowCreateModal(false);
      setActiveTab("approved");
      await fetchData();
    } catch (error) {
      console.error("Error creating media:", error);
      alert("Failed to create media");
    }
  };

  const selectDocket = (docket) => {
    setSelectedDocket(docket);
    setCreateData({
      ...createData,
      docketId: docket._id,
      docketNumber: docket.docketId,
    });
    setDocketSearch("");
    setShowDocketDropdown(false);
  };

  const filteredDockets = dockets.filter(docket =>
    docket.docketId?.toLowerCase().includes(docketSearch.toLowerCase()) ||
    docket.response?.title?.toLowerCase().includes(docketSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair font-black text-3xl text-[#1e2d4a] mb-2">Media Watch</h1>
          <p className="font-garamond text-[#7a6e5e]">Manage media coverage and approve user submissions</p>
        </div>
        <button
          onClick={() => {
            setActiveTab("create");
            setShowCreateModal(true);
          }}
          className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 py-2 font-mono-dm text-xs uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer"
        >
          <FiPlus size={14} />
          Create Media Entry
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#e4ddd0]">
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 font-mono-dm text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === "approved"
              ? "text-[#b8974a] border-b-2 border-[#b8974a]"
              : "text-[#9a8870] hover:text-[#1e2d4a]"
          }`}
        >
          Published Media ({media.length})
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 font-mono-dm text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === "pending"
              ? "text-[#b8974a] border-b-2 border-[#b8974a]"
              : "text-[#9a8870] hover:text-[#1e2d4a]"
          }`}
        >
          Pending Submissions ({pendingCount})
        </button>
      </div>

      {/* Published Media Table */}
      {activeTab === "approved" && (
        <div className="border border-[#d4c8b4] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
                <tr>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Outlet</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Headline</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Docket</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Date</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Stance</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {media.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 font-garamond text-[#9a8870]">No published media</td>
                  </tr>
                ) : (
                  media.map((item) => (
                    <tr key={item._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee]">
                      <td className="py-3 px-4"><span className="font-garamond text-sm text-gray-600">{item.outlet}</span></td>
                      <td className="py-3 px-4"><p className="font-garamond text-sm text-[#1e2d4a]">{item.headline}</p></td>
                      <td className="py-3 px-4"><span className="font-mono-dm text-xs text-[#b8974a]">{item.docketNumber}</span></td>
                      <td className="py-3 px-4"><span className="font-mono-dm text-xs text-[#9a8870]">{formatDate(item.date)}</span></td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs font-mono-dm rounded ${
                          item.stance === "adversarial" ? "bg-red-50 text-red-700" :
                          item.stance === "supportive" ? "bg-green-50 text-green-700" :
                          "bg-gray-50 text-gray-700"
                        }`}>
                          {item.stance}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-3">
                          <a href={item.url} target="_blank" className="text-[#b8974a] hover:text-[#1e2d4a]" title="View Article">
                            <FiExternalLink size={16} />
                          </a>
                          <button
                            onClick={() => handleDeleteMedia(item._id)}
                            className="text-red-400 hover:text-red-600 cursor-pointer"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pending Submissions Table */}
      {activeTab === "pending" && (
        <div className="border border-[#d4c8b4] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
                <tr>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Outlet</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Headline</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Docket</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Date</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Submitted</th>
                  <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 font-garamond text-[#9a8870]">No pending submissions</td>
                  </tr>
                ) : (
                  pendingSubmissions.map((sub) => (
                    <tr key={sub._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee]">
                      <td className="py-3 px-4"><span className="font-garamond text-sm text-gray-600">{sub.outlet}</span></td>
                      <td className="py-3 px-4"><p className="font-garamond text-sm text-[#1e2d4a]">{sub.headline}</p></td>
                      <td className="py-3 px-4"><span className="font-mono-dm text-xs text-[#b8974a]">{sub.docketNumber}</span></td>
                      <td className="py-3 px-4"><span className="font-mono-dm text-xs text-[#9a8870]">{formatDate(sub.date)}</span></td>
                      <td className="py-3 px-4"><span className="font-mono-dm text-xs text-[#9a8870]">{formatDateTime(sub.submittedAt)}</span></td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(sub)}
                            className="text-green-600 hover:text-green-700 cursor-pointer"
                            title="Approve"
                          >
                            <FiCheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(sub._id)}
                            className="text-red-500 hover:text-red-600 cursor-pointer"
                            title="Reject"
                          >
                            <FiXCircle size={18} />
                          </button>
                          <button
                            onClick={() => window.open(sub.url, "_blank")}
                            className="text-[#b8974a] hover:text-[#1e2d4a] cursor-pointer"
                            title="View Article"
                          >
                            <FiExternalLink size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Media Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f5f0e8] border-t-4 border-[#b8974a] max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair font-bold text-xl text-[#1e2d4a]">Create Media Entry</h3>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setActiveTab("approved");
                  }} 
                  className="text-[#9a8870] hover:text-[#1e2d4a] cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Docket Selection */}
              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Select Docket *</label>
                <div className="relative">
                  <div className="flex items-center border border-[#d4c8b4] bg-white px-3 py-2 cursor-pointer" onClick={() => setShowDocketDropdown(!showDocketDropdown)}>
                    <FiSearch size={14} className="text-[#9a8870]" />
                    <input
                      type="text"
                      value={docketSearch}
                      onChange={(e) => {
                        setDocketSearch(e.target.value);
                        setShowDocketDropdown(true);
                      }}
                      placeholder="Search by docket ID or title..."
                      className="flex-1 ml-2 font-garamond text-sm focus:outline-none bg-transparent text-gray-700"
                      onClick={(e) => e.stopPropagation()}
                    />
                    {selectedDocket && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDocket(null);
                          setCreateData({ ...createData, docketId: "", docketNumber: "" });
                          setDocketSearch("");
                        }}
                        className="text-[#9a8870] hover:text-[#1e2d4a]"
                      >
                        <FiX size={14} />
                      </button>
                    )}
                  </div>
                  {showDocketDropdown && docketSearch && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d4c8b4] max-h-48 overflow-y-auto z-10">
                      {filteredDockets.length === 0 ? (
                        <div className="p-3 text-center font-garamond text-[#9a8870]">No dockets found</div>
                      ) : (
                        filteredDockets.map(docket => (
                          <div
                            key={docket._id}
                            onClick={() => selectDocket(docket)}
                            className="p-3 hover:bg-[#ede8dc] cursor-pointer border-b border-[#e4ddd0] last:border-0"
                          >
                            <p className="font-mono-dm text-xs text-[#b8974a]">{docket.docketId}</p>
                            <p className="font-garamond text-sm text-[#1e2d4a]">{docket.response?.title}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {selectedDocket && (
                  <p className="font-mono-dm text-xs text-[#b8974a] mt-1">Selected: {selectedDocket.docketId} - {selectedDocket.response?.title}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Publication Name *</label>
                <input
                  type="text"
                  value={createData.outlet}
                  onChange={(e) => setCreateData({ ...createData, outlet: e.target.value })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700"
                  placeholder="e.g., The Hindu, BBC News"
                />
              </div>

              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Headline *</label>
                <input
                  type="text"
                  value={createData.headline}
                  onChange={(e) => setCreateData({ ...createData, headline: e.target.value })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700"
                  placeholder="Article title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">URL *</label>
                  <input
                    type="url"
                    value={createData.url}
                    onChange={(e) => setCreateData({ ...createData, url: e.target.value })}
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Date *</label>
                  <input
                    type="date"
                    value={createData.date}
                    onChange={(e) => setCreateData({ ...createData, date: e.target.value })}
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Type *</label>
                  <select
                    value={createData.type}
                    onChange={(e) => setCreateData({ ...createData, type: e.target.value })}
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer"
                  >
                    {MEDIA_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Stance *</label>
                  <select
                    value={createData.stance}
                    onChange={(e) => setCreateData({ ...createData, stance: e.target.value })}
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer"
                  >
                    {STANCE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Summary (Optional)</label>
                <textarea
                  value={createData.summary}
                  onChange={(e) => setCreateData({ ...createData, summary: e.target.value })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700"
                  rows={3}
                  placeholder="Brief summary of the article..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCreateMedia}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-white py-2.5 hover:bg-[#2a3f6a] transition-colors cursor-pointer"
                >
                  Create Media Entry
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setActiveTab("approved");
                  }}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase border border-[#c4b89a] text-[#7a6e5e] py-2.5 hover:bg-[#ede8dc] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f5f0e8] border-t-4 border-[#b8974a] max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair font-bold text-xl text-[#1e2d4a]">Approve Media Citation</h3>
                <button onClick={() => setShowApproveModal(false)} className="text-[#9a8870] hover:text-[#1e2d4a] cursor-pointer">
                  <FiX size={20} />
                </button>
              </div>

              <div className="mb-4 p-3 bg-[#ede8dc] rounded">
                <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Article</p>
                <p className="font-playfair font-semibold text-[#1e2d4a]">{selectedSubmission.headline}</p>
                <p className="font-garamond text-sm text-[#7a6e5e] mt-1">{selectedSubmission.outlet} · {formatDate(selectedSubmission.date)}</p>
              </div>

              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Stance *</label>
                <select
                  value={approveData.stance}
                  onChange={(e) => setApproveData({ ...approveData, stance: e.target.value })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer"
                >
                  {STANCE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Summary (Optional)</label>
                <textarea
                  value={approveData.summary}
                  onChange={(e) => setApproveData({ ...approveData, summary: e.target.value })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700"
                  rows={3}
                  placeholder="Brief summary of the article..."
                />
              </div>

              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Admin Notes (Internal)</label>
                <textarea
                  value={approveData.adminNotes}
                  onChange={(e) => setApproveData({ ...approveData, adminNotes: e.target.value })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700"
                  rows={2}
                  placeholder="Optional notes for internal reference..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={confirmApprove}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase bg-[#2d6a4f] text-white py-2.5 hover:bg-[#1f5a3f] transition-colors cursor-pointer"
                >
                  Approve & Publish
                </button>
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase border border-[#c4b89a] text-[#7a6e5e] py-2.5 hover:bg-[#ede8dc] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}