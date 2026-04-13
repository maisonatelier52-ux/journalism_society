
// // app/admin/dockets/[id]/edit/page.jsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { 
//   FiSave, FiArrowLeft, FiPlus, FiTrash2, FiFileText, 
//   FiCheckCircle, FiFolder, FiUser, FiFile, FiCalendar,
//   FiLink, FiTag, FiX, FiEdit2, FiMic, FiRefreshCw,
//   FiAlertCircle
// } from "react-icons/fi";
// import adminAPI from "@/services/adminApi";
// import resolveFileUrl from "@/utils/fileUrl";

// // Helper function for date formatting
// const formatDate = (date) => {
//   if (!date) return "N/A";
//   return new Date(date).toLocaleDateString("en-GB", { 
//     day: "2-digit", 
//     month: "short", 
//     year: "numeric" 
//   });
// };

// // Category options for exhibits
// const EXHIBIT_CATEGORIES = [
//   { value: "Evidence", label: "Evidence", color: "#15803d", bg: "#f0fdf4" },
//   { value: "Claim", label: "Claim", color: "#b91c1c", bg: "#fef2f2" },
//   { value: "Analysis", label: "Analysis", color: "#1d4ed8", bg: "#eff6ff" },
//   { value: "Legal", label: "Legal", color: "#7e22ce", bg: "#faf5ff" },
//   { value: "Regulatory", label: "Regulatory", color: "#b45309", bg: "#fffbeb" },
//   { value: "Benchmark", label: "Benchmark", color: "#0f766e", bg: "#f0fdfa" },
//   { value: "Institutional", label: "Institutional", color: "#475569", bg: "#f8fafc" },
// ];

// // Respondent types
// const RESPONDENT_TYPES = [
//   "Individual",
//   "Corporate Organisation",
//   "Government Body",
//   "Industry Association",
//   "Non-Governmental Organisation",
//   "Educational Institution",
//   "Other",
// ];

// // Response types
// const RESPONSE_TYPES = [
//   "Full Rebuttal",
//   "Partial Correction",
//   "Factual Clarification",
//   "Context and Background",
//   "Legal Response",
// ];

// // Timeline types
// const TIMELINE_TYPES = [
//   "claim",
//   "response",
//   "third_party",
//   "correction",
// ];

// // Media stance options
// const STANCE_OPTIONS = [
//   { value: "adversarial", label: "Adversarial", color: "#b8190c" },
//   { value: "neutral", label: "Neutral", color: "#6a7a94" },
//   { value: "supportive", label: "Supportive", color: "#2d6a4f" },
// ];

// const MEDIA_TYPES = [
//   "Original Report",
//   "Follow-up",
//   "Opinion",
//   "Fact-Check",
//   "News",
//   "Regional",
//   "Other"
// ];

// export default function AdminEditDocketPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deletedExhibits, setDeletedExhibits] = useState([]);
//   const [deletedMedia, setDeletedMedia] = useState([]);
//   const [mediaItems, setMediaItems] = useState([]);
//   const [showMediaModal, setShowMediaModal] = useState(false);
//   const [editingMedia, setEditingMedia] = useState(null);
//   const [duplicateError, setDuplicateError] = useState(null);
//   const [mediaDuplicateError, setMediaDuplicateError] = useState(null);
  
//   const [docket, setDocket] = useState({
//     _id: "",
//     docketId: "",
//     summary: { claim: "", context: "", whyMatters: "" },
//     respondent: { name: "", type: "" },
//     claim: { source: "", url: "", date: "", category: "" },
//     response: { title: "", body: "", type: "", requestedAction: "" },
//     timeline: [],
//     exhibits: [],
//     status: "Open",
//   });

//   // New media form
//   const [newMedia, setNewMedia] = useState({
//     outlet: "",
//     headline: "",
//     url: "",
//     date: "",
//     type: "News",
//     stance: "neutral",
//     summary: "",
//   });

//   useEffect(() => {
//     if (params?.id) {
//       fetchDocket();
//       fetchMedia();
//     }
//   }, [params?.id]);

//   const fetchDocket = async () => {
//     setLoading(true);
//     try {
//       const response = await adminAPI.getDocket(params.id);
//       setDocket(response.docket);
//     } catch (error) {
//       console.error("Error fetching docket:", error);
//       alert("Failed to load docket");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMedia = async () => {
//     try {
//       const response = await adminAPI.getMediaByDocket(params.id);
//       setMediaItems(response.media || []);
//     } catch (error) {
//       console.error("Error fetching media:", error);
//     }
//   };

//   // Helper function to check if media with same URL already exists
//   const checkMediaExists = (url, excludeId = null) => {
//     return mediaItems.some(media => 
//       media.url === url && media._id !== excludeId
//     );
//   };

//   // Timeline functions
//   const addTimelineEntry = () => {
//     setDocket({
//       ...docket,
//       timeline: [
//         ...docket.timeline,
//         { date: "", event: "", description: "", type: "response" }
//       ]
//     });
//   };

//   const updateTimelineEntry = (index, field, value) => {
//     const updated = [...docket.timeline];
//     updated[index] = { ...updated[index], [field]: value };
//     setDocket({ ...docket, timeline: updated });
//   };

//   const removeTimelineEntry = (index) => {
//     const updated = docket.timeline.filter((_, i) => i !== index);
//     setDocket({ ...docket, timeline: updated });
//   };

//   // Exhibit functions
// const addExhibit = () => {
//   const newExhibit = {
//     id: Date.now() + Math.random(),
//     exhibitId: `EX-${String(docket.exhibits.length + 1).padStart(2, "0")}`,
//     title: "",
//     description: "",
//     fileUrl: "",
//     fileType: "",
//     fileSize: 0,
//     category: "Evidence",
//     pages: null,
//     isNew: true,
//     isUploading: false,
//   };
//   setDocket({
//     ...docket,
//     exhibits: [...docket.exhibits, newExhibit]
//   });
// };

//  const removeExhibit = (index) => {
//   const exhibit = docket.exhibits[index];
//   // Store the exhibitId to delete from Document model
//   if (exhibit.exhibitId) {
//     setDeletedExhibits([...deletedExhibits, exhibit.exhibitId]);
//   }
//   const updated = docket.exhibits.filter((_, i) => i !== index);
//   const renumbered = updated.map((ex, i) => ({
//     ...ex,
//     exhibitId: `EX-${String(i + 1).padStart(2, "0")}`
//   }));
//   setDocket({ ...docket, exhibits: renumbered });
// };

//   const updateExhibit = (index, field, value) => {
//     const updated = [...docket.exhibits];
//     updated[index] = { ...updated[index], [field]: value };
//     setDocket({ ...docket, exhibits: updated });
//   };

//   const handleFileUpload = async (index, file) => {
//     if (!file) return;
    
//     const updated = [...docket.exhibits];
//     updated[index] = { ...updated[index], isUploading: true };
//     setDocket({ ...docket, exhibits: updated });
    
//     try {
//       const result = await adminAPI.uploadExhibit(file);
      
//       if (result.success) {
//         const updatedExhibit = [...docket.exhibits];
//         updatedExhibit[index] = {
//           ...updatedExhibit[index],
//           fileUrl: result.fileUrl,
//           fileType: result.fileType,
//           fileSize: result.fileSize,
//           title: result.fileName,
//           isUploading: false,
//         };
//         setDocket({ ...docket, exhibits: updatedExhibit });
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Failed to upload file. Please try again.");
      
//       const resetUpload = [...docket.exhibits];
//       resetUpload[index] = { ...resetUpload[index], isUploading: false };
//       setDocket({ ...docket, exhibits: resetUpload });
//     }
//   };

//   // Media functions
//   const addMedia = () => {
//     setEditingMedia(null);
//     setMediaDuplicateError(null);
//     setNewMedia({
//       outlet: "",
//       headline: "",
//       url: "",
//       date: "",
//       type: "News",
//       stance: "neutral",
//       summary: "",
//     });
//     setShowMediaModal(true);
//   };

//   const editMedia = (media) => {
//     setEditingMedia(media);
//     setMediaDuplicateError(null);
//     setNewMedia({
//       outlet: media.outlet,
//       headline: media.headline,
//       url: media.url,
//       date: media.date,
//       type: media.type,
//       stance: media.stance,
//       summary: media.summary || "",
//     });
//     setShowMediaModal(true);
//   };

//   const removeMedia = (mediaId) => {
//     if (confirm("Remove this media entry? This will permanently delete it from the database.")) {
//       setDeletedMedia([...deletedMedia, mediaId]);
//       setMediaItems(mediaItems.filter(m => m._id !== mediaId));
//     }
//   };

//   const saveMedia = async () => {
//     if (!newMedia.outlet.trim()) {
//       alert("Please enter publication name");
//       return;
//     }
//     if (!newMedia.headline.trim()) {
//       alert("Please enter headline");
//       return;
//     }
//     if (!newMedia.url.trim()) {
//       alert("Please enter URL");
//       return;
//     }
//     if (!newMedia.date) {
//       alert("Please select date");
//       return;
//     }

//     // Check for duplicate URL
//     if (checkMediaExists(newMedia.url, editingMedia?._id)) {
//       setMediaDuplicateError("A media entry with this URL already exists for this docket. Please use a different URL.");
//       return;
//     }

//     setMediaDuplicateError(null);
    
//     try {
//       if (editingMedia) {
//         // Update existing media
//         await adminAPI.updateMedia(editingMedia._id, {
//           ...newMedia,
//           docketId: docket._id,
//         });
//         setMediaItems(mediaItems.map(m => 
//           m._id === editingMedia._id ? { ...m, ...newMedia } : m
//         ));
//         alert("Media updated successfully");
//       } else {
//         // Create new media
//         const result = await adminAPI.createMediaDirect({
//           ...newMedia,
//           docketId: docket._id,
//           docketNumber: docket.docketId,
//           source: "admin",
//         });
//         setMediaItems([...mediaItems, result.media]);
//         alert("Media added successfully");
//       }
//       setShowMediaModal(false);
//     } catch (error) {
//       console.error("Error saving media:", error);
//       if (error.response?.status === 409) {
//         setMediaDuplicateError(error.response?.data?.message || "A media entry with this URL already exists.");
//       } else {
//         alert("Failed to save media");
//       }
//     }
//   };

//   const handleSave = async () => {
//     // Validate required fields
//     if (!docket.response.title.trim()) {
//       alert("Please add a response title");
//       return;
//     }
//     if (!docket.response.body.trim()) {
//       alert("Please add response content");
//       return;
//     }
//     if (!docket.summary.claim.trim()) {
//       alert("Please add a claim summary");
//       return;
//     }
//     if (!docket.respondent.name.trim()) {
//       alert("Please add respondent name");
//       return;
//     }
//     if (!docket.respondent.type) {
//       alert("Please select respondent type");
//       return;
//     }
//     if (!docket.claim.source.trim()) {
//       alert("Please add claim source");
//       return;
//     }
//     if (!docket.claim.date) {
//       alert("Please select claim date");
//       return;
//     }
    
//     // Check if any exhibits are still uploading
//     if (docket.exhibits.some(ex => ex.isUploading)) {
//       alert("Please wait for all files to finish uploading.");
//       return;
//     }
    
//     setSaving(true);
//     setDuplicateError(null);
    
//     try {
//       const updateData = {
//         docketId: docket._id,
//         docketData: {
//           summary: docket.summary,
//           respondent: docket.respondent,
//           claim: docket.claim,
//           response: docket.response,
//           timeline: docket.timeline,
//           exhibits: docket.exhibits.map(({ id, isUploading, ...rest }) => rest),
//           status: docket.status,
//         },
//         deletedExhibits,
//         deletedMedia,
//         mediaItems: mediaItems.map(({ __v, ...rest }) => rest),
//       };
      
//       await adminAPI.updateDocketFull(params.id, updateData);
//       alert("✅ Docket updated successfully!");
//       router.push("/admin/dockets");
//     } catch (error) {
//       console.error("Error updating docket:", error);
//       if (error.response?.status === 409) {
//         setDuplicateError(error.response?.data?.message);
//       } else {
//         alert(error.response?.data?.message || "Failed to update docket");
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getCategoryStyle = (category) => {
//     const cat = EXHIBIT_CATEGORIES.find(c => c.value === category) || EXHIBIT_CATEGORIES[0];
//     return { bg: cat.bg, color: cat.color, border: `1px solid ${cat.color}20` };
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-page">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//         <div>
//           <button onClick={() => router.back()} className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a] mb-2 transition-colors cursor-pointer">
//             <FiArrowLeft size={16} /> Back to Dockets
//           </button>
//           <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Edit Docket</h1>
//           <p className="font-garamond text-[#7a6e5e]">Editing: {docket.docketId}</p>
//         </div>
//         <button onClick={handleSave} disabled={saving}
//           className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer rounded">
//           <FiSave size={14} /> {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </div>

//       {duplicateError && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//           <FiAlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="font-mono-dm text-sm text-red-700 font-semibold mb-1">Duplicate Docket Detected</p>
//             <p className="font-garamond text-red-600">{duplicateError}</p>
//           </div>
//           <button onClick={() => setDuplicateError(null)} className="ml-auto text-red-400 hover:text-red-600 cursor-pointer">
//             <FiX size={18} />
//           </button>
//         </div>
//       )}

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Respondent Information */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4 flex items-center gap-2">
//               <FiUser size={18} /> Respondent Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Name / Organisation *</label>
//                 <input 
//                   type="text" 
//                   value={docket.respondent.name} 
//                   onChange={(e) => setDocket({ ...docket, respondent: { ...docket.respondent, name: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Type *</label>
//                 <select
//                   value={docket.respondent.type}
//                   onChange={(e) => setDocket({ ...docket, respondent: { ...docket.respondent, type: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//                 >
//                   <option value="">Select type...</option>
//                   {RESPONDENT_TYPES.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Claim Information */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4 flex items-center gap-2">
//               <FiFile size={18} /> Claim Information
//             </h2>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Source / Publication *</label>
//                   <input 
//                     type="text" 
//                     value={docket.claim.source} 
//                     onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, source: e.target.value } })}
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Date *</label>
//                   <input 
//                     type="date" 
//                     value={docket.claim.date} 
//                     onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, date: e.target.value } })}
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">URL (Optional)</label>
//                 <input 
//                   type="url" 
//                   value={docket.claim.url} 
//                   onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, url: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                   placeholder="https://..."
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Category</label>
//                 <select
//                   value={docket.claim.category}
//                   onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, category: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//                 >
//                   <option value="">Select category...</option>
//                   {["Right of Reply", "Correction Request", "Factual Dispute", "Defamation Response", "Regulatory Compliance", "Other"].map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Summary Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
//               Summary <span className="text-xs text-[#9a8870]">(Admin writes this)</span>
//             </h2>
//             <div className="space-y-4">
//               <textarea 
//                 value={docket.summary.claim} 
//                 onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, claim: e.target.value } })}
//                 className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                 rows={3} 
//                 placeholder="The Claim *" 
//               />
//               <textarea 
//                 value={docket.summary.context} 
//                 onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, context: e.target.value } })}
//                 className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                 rows={3} 
//                 placeholder="Context" 
//               />
//               <textarea 
//                 value={docket.summary.whyMatters} 
//                 onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, whyMatters: e.target.value } })}
//                 className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                 rows={3} 
//                 placeholder="Why It Matters" 
//               />
//             </div>
//           </div>

//           {/* Response Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
//               Response <span className="text-xs text-[#9a8870]">(Main content)</span>
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Response Title *</label>
//                 <input 
//                   type="text" 
//                   value={docket.response.title} 
//                   onChange={(e) => setDocket({ ...docket, response: { ...docket.response, title: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Response Type</label>
//                 <select
//                   value={docket.response.type}
//                   onChange={(e) => setDocket({ ...docket, response: { ...docket.response, type: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//                 >
//                   <option value="">Select type...</option>
//                   {RESPONSE_TYPES.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Full Response *</label>
//                 <textarea 
//                   value={docket.response.body} 
//                   onChange={(e) => setDocket({ ...docket, response: { ...docket.response, body: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                   rows={10} 
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Requested Action</label>
//                 <select
//                   value={docket.response.requestedAction}
//                   onChange={(e) => setDocket({ ...docket, response: { ...docket.response, requestedAction: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//                 >
//                   <option value="">Select action...</option>
//                   {["Publish this reply in full", "Issue a formal correction", "Remove or retract the article", "Publish a link to this docket", "No specific action requested"].map(action => (
//                     <option key={action} value={action}>{action}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Status */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Status</label>
//             <select 
//               value={docket.status} 
//               onChange={(e) => setDocket({ ...docket, status: e.target.value })}
//               className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//             >
//               <option value="Open">Open</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>

//           {/* Timeline Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//               <div>
//                 <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Timeline</h2>
//                 <p className="font-mono-dm text-xs text-[#9a8870]">Add key events in chronological order</p>
//               </div>
//               <button 
//                 onClick={addTimelineEntry}
//                 className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded"
//               >
//                 <FiPlus size={12} /> Add Event
//               </button>
//             </div>
//             {docket.timeline.length === 0 ? (
//               <p className="text-center text-[#9a8870] py-8">No timeline events added. Click "Add Event" to create one.</p>
//             ) : (
//               docket.timeline.map((entry, i) => (
//                 <div key={i} className="border-l-2 border-[#b8974a] pl-4 relative mb-6">
//                   <button 
//                     onClick={() => removeTimelineEntry(i)}
//                     className="absolute -right-5 top-0 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
//                   >
//                     <FiTrash2 size={14} />
//                   </button>
//                   <input 
//                     type="date" 
//                     value={entry.date} 
//                     onChange={(e) => updateTimelineEntry(i, "date", e.target.value)}
//                     className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//                   />
//                   <input 
//                     type="text" 
//                     value={entry.event} 
//                     onChange={(e) => updateTimelineEntry(i, "event", e.target.value)}
//                     placeholder="Event title" 
//                     className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                   />
//                   <textarea 
//                     value={entry.description} 
//                     onChange={(e) => updateTimelineEntry(i, "description", e.target.value)}
//                     placeholder="Description" 
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                     rows={2}
//                   />
//                   <select
//                     value={entry.type}
//                     onChange={(e) => updateTimelineEntry(i, "type", e.target.value)}
//                     className="w-full border border-[#d4c8b4] p-2 mt-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//                   >
//                     {TIMELINE_TYPES.map(type => (
//                       <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
//                     ))}
//                   </select>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Exhibits Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//               <div>
//                 <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Exhibits</h2>
//                 <p className="font-mono-dm text-xs text-[#9a8870]">Upload supporting documents</p>
//               </div>
//               <button 
//                 onClick={addExhibit}
//                 className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded"
//               >
//                 <FiPlus size={12} /> Add Exhibit
//               </button>
//             </div>
            
//             {docket.exhibits.length === 0 ? (
//               <div className="text-center py-12 border-2 border-dashed border-[#d4c8b4] bg-[#faf6ee] rounded">
//                 <FiFolder size={48} className="mx-auto text-[#c4b89a] mb-3" />
//                 <p className="font-garamond text-[#9a8870] mb-2">No exhibits added yet</p>
//                 <button 
//                   onClick={addExhibit}
//                   className="font-mono-dm text-xs text-[#b8974a] hover:text-[#1e2d4a] transition-colors cursor-pointer"
//                 >
//                   + Add your first exhibit
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {docket.exhibits.map((ex, i) => {
//                   const categoryStyle = getCategoryStyle(ex.category);
//                   return (
//                     <div key={ex.id || ex._id} className="border border-[#e4ddd0] p-4 bg-[#faf6ee] rounded relative">
//                       <button
//                         onClick={() => removeExhibit(i)}
//                         className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
//                         title="Remove exhibit"
//                       >
//                         <FiTrash2 size={16} />
//                       </button>
                      
//                       <div className="flex items-start justify-between mb-3 pr-6">
//                         <div className="flex items-center gap-2">
//                           <FiFileText className="text-[#b8974a]" size={18} />
//                           <span className="font-mono-dm text-sm font-semibold text-[#b8974a]">{ex.exhibitId}</span>
//                         </div>
//                         <span 
//                           className="px-2 py-1 text-xs font-mono-dm uppercase rounded"
//                           style={{ background: categoryStyle.bg, color: categoryStyle.color, border: categoryStyle.border }}
//                         >
//                           {ex.category}
//                         </span>
//                       </div>
                      
//                       <div className="mb-3">
//                         <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Title *</label>
//                         <input
//                           type="text"
//                           value={ex.title}
//                           onChange={(e) => updateExhibit(i, "title", e.target.value)}
//                           className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                           placeholder="Enter exhibit title..."
//                         />
//                       </div>
                      
//                       <div className="mb-3">
//                         <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Description (Optional)</label>
//                         <textarea
//                           value={ex.description || ""}
//                           onChange={(e) => updateExhibit(i, "description", e.target.value)}
//                           className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                           rows={2}
//                           placeholder="Brief description of this exhibit..."
//                         />
//                       </div>
                      
//                       <div className="mb-3">
//                         <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Category</label>
//                         <select
//                           value={ex.category}
//                           onChange={(e) => updateExhibit(i, "category", e.target.value)}
//                           className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
//                         >
//                           {EXHIBIT_CATEGORIES.map(cat => (
//                             <option key={cat.value} value={cat.value}>{cat.label}</option>
//                           ))}
//                         </select>
//                       </div>
                      
//                       <div className="mt-3">
//                         <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">File</label>
//                         {ex.fileUrl ? (
//                           <div className="flex items-center justify-between p-2 bg-[#ede8dc] rounded">
//                             <div className="flex items-center gap-2">
//                               <FiFileText size={14} className="text-[#b8974a]" />
//                               <span className="font-garamond text-sm text-[#1e2d4a] truncate max-w-[200px]">{ex.title || "File"}</span>
//                               <span className="font-mono-dm text-xs text-[#9a8870]">
//                                 ({(ex.fileSize / 1024).toFixed(1)} KB)
//                               </span>
//                             </div>
//                             <div className="flex gap-2">
//                               <a 
//                                href={resolveFileUrl(ex.fileUrl)}
//                                 target="_blank" 
//                                 className="text-[#b8974a] text-xs hover:underline cursor-pointer"
//                               >
//                                 View
//                               </a>
//                               <button
//                                 onClick={() => {
//                                   const fileInput = document.createElement('input');
//                                   fileInput.type = 'file';
//                                   fileInput.onchange = (e) => handleFileUpload(i, e.target.files[0]);
//                                   fileInput.click();
//                                 }}
//                                 className="text-[#1e2d4a] text-xs hover:text-[#b8974a] cursor-pointer"
//                               >
//                                 Replace
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div>
//                             <input
//                               type="file"
//                               onChange={(e) => handleFileUpload(i, e.target.files[0])}
//                               className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm bg-white cursor-pointer rounded"
//                               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv"
//                             />
//                             {ex.isUploading && (
//                               <div className="flex items-center gap-2 mt-2">
//                                 <div className="animate-spin rounded-full h-3 w-3 border-2 border-[#b8974a] border-t-transparent"></div>
//                                 <span className="font-mono-dm text-xs text-[#9a8870]">Uploading...</span>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Media Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//               <div>
//                 <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Media Coverage</h2>
//                 <p className="font-mono-dm text-xs text-[#9a8870]">Manage media articles about this docket</p>
//               </div>
//               <button 
//                 onClick={addMedia}
//                 className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded"
//               >
//                 <FiPlus size={12} /> Add Media
//               </button>
//             </div>
            
//             {mediaItems.length === 0 ? (
//               <div className="text-center py-12 border-2 border-dashed border-[#d4c8b4] bg-[#faf6ee] rounded">
//                 <FiMic size={48} className="mx-auto text-[#c4b89a] mb-3" />
//                 <p className="font-garamond text-[#9a8870] mb-2">No media coverage added yet</p>
//                 <button 
//                   onClick={addMedia}
//                   className="font-mono-dm text-xs text-[#b8974a] hover:text-[#1e2d4a] transition-colors cursor-pointer"
//                 >
//                   + Add media coverage
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {mediaItems.map((media) => (
//                   <div key={media._id} className="border border-[#e4ddd0] p-3 bg-[#faf6ee] rounded hover:shadow-sm transition-shadow">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2 flex-wrap">
//                           <span className="font-mono-dm text-xs font-semibold text-[#b8974a]">{media.outlet}</span>
//                           <span className={`px-1.5 py-0.5 text-[0.5rem] font-mono-dm uppercase rounded ${
//                             media.stance === "adversarial" ? "bg-red-50 text-red-700" :
//                             media.stance === "supportive" ? "bg-green-50 text-green-700" :
//                             "bg-gray-50 text-gray-700"
//                           }`}>
//                             {media.stance}
//                           </span>
//                           <span className="font-mono-dm text-[0.5rem] text-[#9a8870]">{media.type}</span>
//                           <span className="font-mono-dm text-[0.5rem] text-[#9a8870] ml-auto">{formatDate(media.date)}</span>
//                         </div>
//                         <p className="font-playfair font-semibold text-sm text-[#1e2d4a] mb-1">{media.headline}</p>
//                         <p className="font-garamond text-xs text-[#7a6e5e] line-clamp-2">{media.summary || "No summary available."}</p>
//                         <div className="flex items-center gap-3 mt-2">
//                           <a href={media.url} target="_blank" className="text-[#b8974a] text-xs hover:underline flex items-center gap-1 cursor-pointer">
//                             <FiLink size={10} /> View Article
//                           </a>
//                         </div>
//                       </div>
//                       <div className="flex gap-2 ml-3">
//                         <button
//                           onClick={() => editMedia(media)}
//                           className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer"
//                           title="Edit"
//                         >
//                           <FiEdit2 size={14} />
//                         </button>
//                         <button
//                           onClick={() => removeMedia(media._id)}
//                           className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
//                           title="Delete"
//                         >
//                           <FiTrash2 size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Review Box */}
//           <div className="border border-[#d4c8b4] bg-[#faf6ee] p-4 md:p-6 text-center rounded-lg">
//             <FiCheckCircle size={32} className="mx-auto text-[#b8974a] mb-3" />
//             <p className="font-garamond text-sm text-[#7a6e5e]">Review all changes before saving.</p>
//             <p className="font-mono-dm text-xs text-[#9a8870] mt-2">Changes will be applied immediately to the public record</p>
//           </div>
//         </div>
//       </div>

//       {/* Media Modal */}
//       {showMediaModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#f5f0e8] border-t-4 border-[#b8974a] max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-playfair font-bold text-xl text-[#1e2d4a]">
//                   {editingMedia ? "Edit Media Entry" : "Add Media Entry"}
//                 </h3>
//                 <button onClick={() => setShowMediaModal(false)} className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer">
//                   <FiX size={20} />
//                 </button>
//               </div>

//               {mediaDuplicateError && (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
//                   <FiAlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
//                   <p className="font-garamond text-sm text-red-600">{mediaDuplicateError}</p>
//                 </div>
//               )}

//               <div className="mb-4">
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Publication Name *</label>
//                 <input
//                   type="text"
//                   value={newMedia.outlet}
//                   onChange={(e) => setNewMedia({ ...newMedia, outlet: e.target.value })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 rounded"
//                   placeholder="e.g., The Hindu, BBC News"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Headline *</label>
//                 <input
//                   type="text"
//                   value={newMedia.headline}
//                   onChange={(e) => setNewMedia({ ...newMedia, headline: e.target.value })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 rounded"
//                   placeholder="Article title"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">URL *</label>
//                   <input
//                     type="url"
//                     value={newMedia.url}
//                     onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 rounded"
//                     placeholder="https://..."
//                   />
//                 </div>
//                 <div>
//                   <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Date *</label>
//                   <input
//                     type="date"
//                     value={newMedia.date}
//                     onChange={(e) => setNewMedia({ ...newMedia, date: e.target.value })}
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer rounded"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Type</label>
//                   <select
//                     value={newMedia.type}
//                     onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer rounded"
//                   >
//                     {MEDIA_TYPES.map(type => (
//                       <option key={type} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Stance</label>
//                   <select
//                     value={newMedia.stance}
//                     onChange={(e) => setNewMedia({ ...newMedia, stance: e.target.value })}
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer rounded"
//                   >
//                     {STANCE_OPTIONS.map(opt => (
//                       <option key={opt.value} value={opt.value}>{opt.label}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Summary (Optional)</label>
//                 <textarea
//                   value={newMedia.summary}
//                   onChange={(e) => setNewMedia({ ...newMedia, summary: e.target.value })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 rounded"
//                   rows={3}
//                   placeholder="Brief summary of the article..."
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={saveMedia}
//                   className="flex-1 font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-white py-2.5 hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded"
//                 >
//                   {editingMedia ? "Update Media" : "Add Media"}
//                 </button>
//                 <button
//                   onClick={() => setShowMediaModal(false)}
//                   className="flex-1 font-mono-dm text-xs tracking-widest uppercase border border-[#c4b89a] text-[#7a6e5e] py-2.5 hover:bg-[#ede8dc] transition-colors cursor-pointer rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// app/admin/dockets/[id]/edit/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FiSave, FiArrowLeft, FiPlus, FiTrash2, FiFileText,
  FiCheckCircle, FiFolder, FiUser, FiFile, FiCalendar,
  FiLink, FiTag, FiX, FiEdit2, FiMic, FiRefreshCw,
  FiAlertCircle
} from "react-icons/fi";
import adminAPI from "@/services/adminApi";
import resolveFileUrl from "@/utils/fileUrl";

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const EXHIBIT_CATEGORIES = [
  { value: "Evidence", label: "Evidence", color: "#15803d", bg: "#f0fdf4" },
  { value: "Claim", label: "Claim", color: "#b91c1c", bg: "#fef2f2" },
  { value: "Analysis", label: "Analysis", color: "#1d4ed8", bg: "#eff6ff" },
  { value: "Legal", label: "Legal", color: "#7e22ce", bg: "#faf5ff" },
  { value: "Regulatory", label: "Regulatory", color: "#b45309", bg: "#fffbeb" },
  { value: "Benchmark", label: "Benchmark", color: "#0f766e", bg: "#f0fdfa" },
  { value: "Institutional", label: "Institutional", color: "#475569", bg: "#f8fafc" },
];

const RESPONDENT_TYPES = [
  "Individual", "Corporate Organisation", "Government Body",
  "Industry Association", "Non-Governmental Organisation",
  "Educational Institution", "Other",
];

const RESPONSE_TYPES = [
  "Full Rebuttal", "Partial Correction", "Factual Clarification",
  "Context and Background", "Legal Response",
];

const TIMELINE_TYPES = ["claim", "response", "third_party", "correction"];

const STANCE_OPTIONS = [
  { value: "adversarial", label: "Adversarial", color: "#b8190c" },
  { value: "neutral", label: "Neutral", color: "#6a7a94" },
  { value: "supportive", label: "Supportive", color: "#2d6a4f" },
];

const MEDIA_TYPES = ["Original Report", "Follow-up", "Opinion", "Fact-Check", "News", "Regional", "Other"];

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];
const MAX_FILE_SIZE_MB = 25;
const MAX_FILES = 10;

const isValidUrl = (value) => {
  try { new URL(value); return true; } catch { return false; }
};

// Inline field error
const FieldError = ({ message }) =>
  message ? <p className="mt-1 text-xs text-red-500 font-mono-dm">{message}</p> : null;

export default function AdminEditDocketPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletedExhibits, setDeletedExhibits] = useState([]);
  const [deletedMedia, setDeletedMedia] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [duplicateError, setDuplicateError] = useState(null);
  const [mediaDuplicateError, setMediaDuplicateError] = useState(null);
  const [errors, setErrors] = useState({});
  const [mediaErrors, setMediaErrors] = useState({});

  const [docket, setDocket] = useState({
    _id: "",
    docketId: "",
    summary: { claim: "", context: "", whyMatters: "" },
    respondent: { name: "", type: "" },
    claim: { source: "", url: "", date: "", category: "" },
    response: { title: "", body: "", type: "", requestedAction: "" },
    timeline: [],
    exhibits: [],
    status: "Open",
  });

  const [newMedia, setNewMedia] = useState({
    outlet: "", headline: "", url: "", date: "", type: "News", stance: "neutral", summary: "",
  });

  useEffect(() => {
    if (params?.id) { fetchDocket(); fetchMedia(); }
  }, [params?.id]);

  const fetchDocket = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getDocket(params.id);
      setDocket(response.docket);
    } catch (error) {
      console.error("Error fetching docket:", error);
      alert("Failed to load docket");
    } finally {
      setLoading(false);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await adminAPI.getMediaByDocket(params.id);
      setMediaItems(response.media || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const checkMediaExists = (url, excludeId = null) =>
    mediaItems.some(m => m.url === url && m._id !== excludeId);

  // ── File validation ──────────────────────────────────────────────────────────
  const validateFile = (file) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      alert(`File "${file.name}" has an unsupported format. Allowed: PDF, Word, Excel, CSV, JPEG, PNG.`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File "${file.name}" exceeds the ${MAX_FILE_SIZE_MB} MB size limit.`);
      return false;
    }
    return true;
  };

  // ── Error helpers ────────────────────────────────────────────────────────────
  const clearErr = (...keys) => setErrors(p => { const n = { ...p }; keys.forEach(k => delete n[k]); return n; });
  const clearExhibitErr = (i, field) => setErrors(p => {
    if (!p.exhibits?.[i]) return p;
    return { ...p, exhibits: { ...p.exhibits, [i]: { ...p.exhibits[i], [field]: "" } } };
  });
  const clearMediaErr = (...keys) => setMediaErrors(p => { const n = { ...p }; keys.forEach(k => delete n[k]); return n; });

  // ── Timeline ─────────────────────────────────────────────────────────────────
  const addTimelineEntry = () => {
    setDocket(p => ({ ...p, timeline: [...p.timeline, { date: "", event: "", description: "", type: "response" }] }));
  };

  const updateTimelineEntry = (index, field, value) => {
    const updated = [...docket.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setDocket({ ...docket, timeline: updated });
  };

  const removeTimelineEntry = (index) => {
    setDocket(p => ({ ...p, timeline: p.timeline.filter((_, i) => i !== index) }));
  };

  // ── Exhibits ──────────────────────────────────────────────────────────────────
  const addExhibit = () => {
    if (docket.exhibits.length >= MAX_FILES) {
      alert(`Maximum ${MAX_FILES} exhibits are allowed.`);
      return;
    }
    setDocket(p => ({
      ...p,
      exhibits: [
        ...p.exhibits,
        {
          id: Date.now() + Math.random(),
          exhibitId: `EX-${String(p.exhibits.length + 1).padStart(2, "0")}`,
          title: "",
          description: "",
          fileUrl: "",
          fileType: "",
          fileSize: 0,
          category: "Evidence",
          pages: null,
          isNew: true,
          isUploading: false,
        }
      ]
    }));
  };

  const removeExhibit = (index) => {
    const exhibit = docket.exhibits[index];
    if (exhibit.exhibitId) setDeletedExhibits(p => [...p, exhibit.exhibitId]);
    const updated = docket.exhibits.filter((_, i) => i !== index);
    const renumbered = updated.map((ex, i) => ({ ...ex, exhibitId: `EX-${String(i + 1).padStart(2, "0")}` }));
    setDocket({ ...docket, exhibits: renumbered });
  };

  const updateExhibit = (index, field, value) => {
    const updated = [...docket.exhibits];
    updated[index] = { ...updated[index], [field]: value };
    setDocket({ ...docket, exhibits: updated });
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;
    if (!validateFile(file)) return;

    const updated = [...docket.exhibits];
    updated[index] = { ...updated[index], isUploading: true };
    setDocket({ ...docket, exhibits: updated });

    try {
      const result = await adminAPI.uploadExhibit(file);
      if (result.success) {
        const upd = [...docket.exhibits];
        upd[index] = {
          ...upd[index],
          fileUrl: result.fileUrl,
          fileType: result.fileType,
          fileSize: result.fileSize,
          title: upd[index].title || result.fileName,
          isUploading: false,
        };
        setDocket({ ...docket, exhibits: upd });
        clearExhibitErr(index, "fileUrl");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
      const reset = [...docket.exhibits];
      reset[index] = { ...reset[index], isUploading: false };
      setDocket({ ...docket, exhibits: reset });
    }
  };

  // ── Media ────────────────────────────────────────────────────────────────────
  const addMedia = () => {
    setEditingMedia(null);
    setMediaDuplicateError(null);
    setMediaErrors({});
    setNewMedia({ outlet: "", headline: "", url: "", date: "", type: "News", stance: "neutral", summary: "" });
    setShowMediaModal(true);
  };

  const editMedia = (media) => {
    setEditingMedia(media);
    setMediaDuplicateError(null);
    setMediaErrors({});
    setNewMedia({ outlet: media.outlet, headline: media.headline, url: media.url, date: media.date, type: media.type, stance: media.stance, summary: media.summary || "" });
    setShowMediaModal(true);
  };

  const removeMedia = (mediaId) => {
    if (confirm("Remove this media entry? This will permanently delete it from the database.")) {
      setDeletedMedia(p => [...p, mediaId]);
      setMediaItems(p => p.filter(m => m._id !== mediaId));
    }
  };

  const validateMedia = () => {
    const errs = {};
    if (!newMedia.outlet.trim()) errs.outlet = "Publication name is required.";
    if (!newMedia.headline.trim()) errs.headline = "Headline is required.";
    if (!newMedia.url.trim()) {
      errs.url = "URL is required.";
    } else if (!isValidUrl(newMedia.url)) {
      errs.url = "Please enter a valid URL (e.g. https://example.com).";
    }
    if (!newMedia.date) errs.date = "Date is required.";
    setMediaErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const saveMedia = async () => {
    if (!validateMedia()) return;

    if (checkMediaExists(newMedia.url, editingMedia?._id)) {
      setMediaDuplicateError("A media entry with this URL already exists for this docket.");
      return;
    }
    setMediaDuplicateError(null);

    try {
      if (editingMedia) {
        await adminAPI.updateMedia(editingMedia._id, { ...newMedia, docketId: docket._id });
        setMediaItems(p => p.map(m => m._id === editingMedia._id ? { ...m, ...newMedia } : m));
        alert("Media updated successfully");
      } else {
        const result = await adminAPI.createMediaDirect({
          ...newMedia, docketId: docket._id, docketNumber: docket.docketId, source: "admin",
        });
        setMediaItems(p => [...p, result.media]);
        alert("Media added successfully");
      }
      setShowMediaModal(false);
    } catch (error) {
      console.error("Error saving media:", error);
      if (error.response?.status === 409) {
        setMediaDuplicateError(error.response?.data?.message || "A media entry with this URL already exists.");
      } else {
        alert("Failed to save media");
      }
    }
  };

  // ── Main validation ──────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!docket.respondent.name.trim()) newErrors.respondentName = "Respondent name is required.";
    if (!docket.respondent.type) newErrors.respondentType = "Respondent type is required.";
    if (!docket.claim.source.trim()) newErrors.claimSource = "Claim source is required.";
    if (!docket.claim.date) newErrors.claimDate = "Claim date is required.";
    if (!docket.claim.url.trim()) {
      newErrors.claimUrl = "Claim URL is required.";
    } else if (!isValidUrl(docket.claim.url)) {
      newErrors.claimUrl = "Please enter a valid URL (e.g. https://example.com).";
    }
      if (!docket.claim.category) newErrors.claimCategory = "Claim Category is required.";
    if (!docket.summary.claim.trim()) newErrors.summarylaim = "The claim summary is required.";
     if (!docket.summary.context.trim()) newErrors.summarycontext = "The summary context is required.";
      if (!docket.summary.whyMatters.trim()) newErrors.summarywhymatters = "The summary whyMatters is required.";
    if (!docket.response.title.trim()) newErrors.responseTitle = "Response title is required.";
    if (!docket.response.body.trim()) newErrors.responseBody = "Response body is required.";
     if (!docket.response.type.trim()) newErrors.responseType = "Response type is required.";
      if (!docket.response.requestedAction.trim()) newErrors.responseRequestAction = "Response request action is required.";

        // Timeline – at least one entry
    if (docket.timeline.length === 0) {
      newErrors.timeline = "At least one timeline event is required.";
    }

    // Exhibits – at least one entry
    if (docket.exhibits.length === 0) {
      newErrors.exhibits_count = "At least one exhibit is required.";
    }

    // Per-exhibit
    const exhibitErrs = {};
    docket.exhibits.forEach((ex, i) => {
      const errs = {};
      if (!ex.title.trim()) errs.title = "Title is required.";
      if (!ex.fileUrl) errs.fileUrl = "File is required.";
      if (Object.keys(errs).length) exhibitErrs[i] = errs;
    });
    if (Object.keys(exhibitErrs).length) newErrors.exhibits = exhibitErrs;

    setErrors(newErrors);
    const hasTopErrors = Object.keys(newErrors).some(k => k !== "exhibits");
    return !hasTopErrors && Object.keys(exhibitErrs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    if (docket.exhibits.some(ex => ex.isUploading)) {
      alert("Please wait for all files to finish uploading.");
      return;
    }

    setSaving(true);
    setDuplicateError(null);

    try {
      const updateData = {
        docketId: docket._id,
        docketData: {
          summary: docket.summary,
          respondent: docket.respondent,
          claim: docket.claim,
          response: docket.response,
          timeline: docket.timeline,
          exhibits: docket.exhibits.map(({ id, isUploading, ...rest }) => rest),
          status: docket.status,
        },
        deletedExhibits,
        deletedMedia,
        mediaItems: mediaItems.map(({ __v, ...rest }) => rest),
      };

      await adminAPI.updateDocketFull(params.id, updateData);
      alert("✅ Docket updated successfully!");
      router.push("/admin/dockets");
    } catch (error) {
      console.error("Error updating docket:", error);
      if (error.response?.status === 409) {
        setDuplicateError(error.response?.data?.message);
      } else {
        alert(error.response?.data?.message || "Failed to update docket");
      }
    } finally {
      setSaving(false);
    }
  };

  const getCategoryStyle = (category) => {
    const cat = EXHIBIT_CATEGORIES.find(c => c.value === category) || EXHIBIT_CATEGORIES[0];
    return { bg: cat.bg, color: cat.color, border: `1px solid ${cat.color}20` };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a] mb-2 transition-colors cursor-pointer">
            <FiArrowLeft size={16} /> Back to Dockets
          </button>
          <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Edit Docket</h1>
          <p className="font-garamond text-[#7a6e5e]">Editing: {docket.docketId}</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer rounded">
          <FiSave size={14} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {duplicateError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <FiAlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-mono-dm text-sm text-red-700 font-semibold mb-1">Duplicate Docket Detected</p>
            <p className="font-garamond text-red-600">{duplicateError}</p>
          </div>
          <button onClick={() => setDuplicateError(null)} className="ml-auto text-red-400 hover:text-red-600 cursor-pointer">
            <FiX size={18} />
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── Left Column ── */}
        <div className="space-y-6">
          {/* Respondent */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4 flex items-center gap-2">
              <FiUser size={18} /> Respondent Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Name / Organisation <span className="text-red-500">*</span></label>
                <input type="text" value={docket.respondent.name}
                  onChange={(e) => { setDocket({ ...docket, respondent: { ...docket.respondent, name: e.target.value } }); clearErr("respondentName"); }}
                  className={`w-full border p-2 font-garamond focus:outline-none text-[#1e2d4a] bg-white rounded ${errors.respondentName ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`} />
                <FieldError message={errors.respondentName} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Type <span className="text-red-500">*</span></label>
                <select value={docket.respondent.type}
                  onChange={(e) => { setDocket({ ...docket, respondent: { ...docket.respondent, type: e.target.value } }); clearErr("respondentType"); }}
                  className={`w-full border p-2 font-garamond focus:outline-none text-[#1e2d4a] bg-white cursor-pointer rounded ${errors.respondentType ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}>
                  <option value="">Select type...</option>
                  {RESPONDENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <FieldError message={errors.respondentType} />
              </div>
            </div>
          </div>

          {/* Claim Information */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4 flex items-center gap-2">
              <FiFile size={18} /> Claim Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Source / Publication <span className="text-red-500">*</span></label>
                  <input type="text" value={docket.claim.source}
                    onChange={(e) => { setDocket({ ...docket, claim: { ...docket.claim, source: e.target.value } }); clearErr("claimSource"); }}
                    className={`w-full border p-2 font-garamond focus:outline-none text-[#1e2d4a] bg-white rounded ${errors.claimSource ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`} />
                  <FieldError message={errors.claimSource} />
                </div>
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Date <span className="text-red-500">*</span></label>
                  <input type="date" value={docket.claim.date}
                    onChange={(e) => { setDocket({ ...docket, claim: { ...docket.claim, date: e.target.value } }); clearErr("claimDate"); }}
                    className={`w-full border p-2 font-garamond focus:outline-none text-[#1e2d4a] bg-white cursor-pointer rounded ${errors.claimDate ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`} />
                  <FieldError message={errors.claimDate} />
                </div>
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">URL <span className="text-red-500">*</span></label>
                <input type="url" value={docket.claim.url}
                  onChange={(e) => { setDocket({ ...docket, claim: { ...docket.claim, url: e.target.value } }); clearErr("claimUrl"); }}
                  className={`w-full border p-2 font-garamond focus:outline-none text-[#1e2d4a] bg-white rounded ${errors.claimUrl ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                  placeholder="https://..." />
                <FieldError message={errors.claimUrl} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Category <span className="text-red-500">*</span></label>
                <select value={docket.claim.category}
                  onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, category: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded">
                  <option value="">Select category...</option>
                  {["Right of Reply", "Correction Request", "Factual Dispute", "Defamation Response", "Regulatory Compliance", "Other"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                 <FieldError message={errors.claimCategory} />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
              Summary <span className="text-xs text-[#9a8870]">(Admin writes this)</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">The Claim <span className="text-red-500">*</span></label>
                <textarea value={docket.summary.claim}
                  onChange={(e) => { setDocket({ ...docket, summary: { ...docket.summary, claim: e.target.value } }); clearErr("summarylaim"); }}
                  className={`w-full border p-3 font-garamond focus:outline-none text-[#1e2d4a] bg-white rounded ${errors.summarylaim ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                  rows={3} placeholder="The Claim *" />
                <FieldError message={errors.summarylaim} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Context <span className="text-red-500">*</span></label>
                <textarea value={docket.summary.context}
                  onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, context: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  rows={3} placeholder="Context" />
                   <FieldError message={errors.summarycontext} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Why It Matters <span className="text-red-500">*</span></label>
                <textarea value={docket.summary.whyMatters}
                  onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, whyMatters: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  rows={3} placeholder="Why It Matters" />
                   <FieldError message={errors.summarywhymatters} />
              </div>
            </div>
          </div>

          {/* Response */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
              Response <span className="text-xs text-[#9a8870]">(Main content)</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Response Title <span className="text-red-500">*</span></label>
                <input type="text" value={docket.response.title}
                  onChange={(e) => { setDocket({ ...docket, response: { ...docket.response, title: e.target.value } }); clearErr("responseTitle"); }}
                  className={`w-full border p-2 font-garamond focus:outline-none text-[#1e2d4a] bg-white rounded ${errors.responseTitle ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`} />
                <FieldError message={errors.responseTitle} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Response Type <span className="text-red-500">*</span></label>
                <select value={docket.response.type}
                  onChange={(e) => setDocket({ ...docket, response: { ...docket.response, type: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded">
                  <option value="">Select type...</option>
                  {RESPONSE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <FieldError message={errors.responseType} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Full Response <span className="text-red-500">*</span></label>
                <textarea value={docket.response.body}
                  onChange={(e) => { setDocket({ ...docket, response: { ...docket.response, body: e.target.value } }); clearErr("responseBody"); }}
                  className={`w-full border p-3 font-garamond focus:outline-none text-[#1e2d4a] bg-white rounded ${errors.responseBody ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                  rows={10} />
                <FieldError message={errors.responseBody} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Requested Action <span className="text-red-500">*</span></label>
                <select value={docket.response.requestedAction}
                  onChange={(e) => setDocket({ ...docket, response: { ...docket.response, requestedAction: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded">
                  <option value="">Select action...</option>
                  {["Publish this reply in full", "Issue a formal correction", "Remove or retract the article", "Publish a link to this docket", "No specific action requested"].map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                 <FieldError message={errors.responseRequestAction} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Status */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Status</label>
            <select value={docket.status}
              onChange={(e) => setDocket({ ...docket, status: e.target.value })}
              className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded">
              <option value="Open">Open</option>
              <option value="Under Review">Under Review</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Timeline */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Timeline <span className="text-red-500">*</span></h2>
                <p className="font-mono-dm text-xs text-[#9a8870]">Add key events in chronological order</p>
              </div>
              <button onClick={addTimelineEntry}
                className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded">
                <FiPlus size={12} /> Add Event
              </button>
            </div>
            {errors.timeline && <p className="text-xs text-red-500 font-mono-dm mb-3">{errors.timeline}</p>}
            {docket.timeline.length === 0 ? (
              <p className="text-center text-[#9a8870] py-8 font-garamond text-sm">No timeline events added.</p>
            ) : (
              docket.timeline.map((entry, i) => (
                <div key={i} className="border-l-2 border-[#b8974a] pl-4 relative mb-6">
                  <button onClick={() => removeTimelineEntry(i)} className="absolute -right-5 top-0 text-red-400 hover:text-red-600 transition-colors cursor-pointer">
                    <FiTrash2 size={14} />
                  </button>
                  <input type="date" value={entry.date} onChange={(e) => updateTimelineEntry(i, "date", e.target.value)}
                    className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded" />
                  <input type="text" value={entry.event} onChange={(e) => updateTimelineEntry(i, "event", e.target.value)}
                    placeholder="Event title"
                    className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded" />
                  <textarea value={entry.description} onChange={(e) => updateTimelineEntry(i, "description", e.target.value)}
                    placeholder="Description"
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                    rows={2} />
                  <select value={entry.type} onChange={(e) => updateTimelineEntry(i, "type", e.target.value)}
                    className="w-full border border-[#d4c8b4] p-2 mt-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded">
                    {TIMELINE_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
              ))
            )}
          </div>

          {/* Exhibits */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <div>
                <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Exhibits <span className="text-red-500">*</span></h2>
                <p className="font-mono-dm text-xs text-[#9a8870]">{docket.exhibits.length} / {MAX_FILES} exhibit(s)</p>
              </div>
              <button onClick={addExhibit}
                className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded">
                <FiPlus size={12} /> Add Exhibit
              </button>
            </div>
            <p className="font-mono-dm text-xs text-[#9a8870] mb-4">Max {MAX_FILES} files · Max {MAX_FILE_SIZE_MB} MB each · PDF, Word, Excel, CSV, JPEG, PNG</p>
              {errors.exhibits_count && <p className="text-xs text-red-500 font-mono-dm mb-3">{errors.exhibits_count}</p>}
            {docket.exhibits.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-[#d4c8b4] bg-[#faf6ee] rounded">
                <FiFolder size={48} className="mx-auto text-[#c4b89a] mb-3" />
                <p className="font-garamond text-[#9a8870] mb-2">No exhibits added yet</p>
                <button onClick={addExhibit} className="font-mono-dm text-xs text-[#b8974a] hover:text-[#1e2d4a] transition-colors cursor-pointer">
                  + Add your first exhibit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {docket.exhibits.map((ex, i) => {
                  const categoryStyle = getCategoryStyle(ex.category);
                  const exErrors = errors.exhibits?.[i] || {};
                  return (
                    <div key={ex.id || ex._id} className="border border-[#e4ddd0] p-4 bg-[#faf6ee] rounded relative">
                      <button onClick={() => removeExhibit(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors cursor-pointer" title="Remove">
                        <FiTrash2 size={16} />
                      </button>

                      <div className="flex items-start justify-between mb-3 pr-6">
                        <div className="flex items-center gap-2">
                          <FiFileText className="text-[#b8974a]" size={18} />
                          <span className="font-mono-dm text-sm font-semibold text-[#b8974a]">{ex.exhibitId}</span>
                        </div>
                        <span className="px-2 py-1 text-xs font-mono-dm uppercase rounded"
                          style={{ background: categoryStyle.bg, color: categoryStyle.color, border: categoryStyle.border }}>
                          {ex.category}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Title <span className="text-red-500">*</span></label>
                        <input type="text" value={ex.title}
                          onChange={(e) => { updateExhibit(i, "title", e.target.value); clearExhibitErr(i, "title"); }}
                          className={`w-full border p-2 font-garamond text-sm focus:outline-none text-[#1e2d4a] bg-white rounded ${exErrors.title ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                          placeholder="Enter exhibit title..." />
                        <FieldError message={exErrors.title} />
                      </div>

                      {/* Description (optional) */}
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Description <span className="font-normal normal-case text-[#9a8870]">(optional)</span></label>
                        <textarea value={ex.description || ""} onChange={(e) => updateExhibit(i, "description", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                          rows={2} placeholder="Brief description..." />
                      </div>

                      {/* Category */}
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Category</label>
                        <select value={ex.category} onChange={(e) => updateExhibit(i, "category", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded">
                          {EXHIBIT_CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                        </select>
                      </div>

                      {/* File */}
                      <div className="mt-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">File <span className="text-red-500">*</span></label>
                        {ex.fileUrl ? (
                          <div className="flex items-center justify-between p-2 bg-[#ede8dc] rounded">
                            <div className="flex items-center gap-2">
                              <FiFileText size={14} className="text-[#b8974a]" />
                              <span className="font-garamond text-sm text-[#1e2d4a] truncate max-w-[200px]">{ex.title || "File"}</span>
                              <span className="font-mono-dm text-xs text-[#9a8870]">
                                ({(ex.fileSize / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <a href={resolveFileUrl(ex.fileUrl)} target="_blank" className="text-[#b8974a] text-xs hover:underline cursor-pointer">
                                View
                              </a>
                              <button
                                onClick={() => {
                                  const fi = document.createElement("input");
                                  fi.type = "file";
                                  fi.accept = ALLOWED_FILE_TYPES.join(",");
                                  fi.onchange = (e) => handleFileUpload(i, e.target.files[0]);
                                  fi.click();
                                }}
                                className="text-[#1e2d4a] text-xs hover:text-[#b8974a] cursor-pointer">
                                Replace
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input type="file"
                              onChange={(e) => handleFileUpload(i, e.target.files[0])}
                              className={`w-full border p-2 font-garamond text-sm bg-white cursor-pointer rounded ${exErrors.fileUrl ? "border-red-400" : "border-[#d4c8b4]"}`}
                              accept={ALLOWED_FILE_TYPES.join(",")} />
                            {ex.isUploading && (
                              <div className="flex items-center gap-2 mt-2">
                                <div className="animate-spin rounded-full h-3 w-3 border-2 border-[#b8974a] border-t-transparent"></div>
                                <span className="font-mono-dm text-xs text-[#9a8870]">Uploading...</span>
                              </div>
                            )}
                            <FieldError message={exErrors.fileUrl} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Media Coverage */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Media Coverage <span className="font-normal text-xs text-[#9a8870]">(optional)</span></h2>
                <p className="font-mono-dm text-xs text-[#9a8870]">Manage media articles about this docket</p>
              </div>
              <button onClick={addMedia}
                className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded">
                <FiPlus size={12} /> Add Media
              </button>
            </div>

            {mediaItems.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-[#d4c8b4] bg-[#faf6ee] rounded">
                <FiMic size={48} className="mx-auto text-[#c4b89a] mb-3" />
                <p className="font-garamond text-[#9a8870] mb-2">No media coverage added yet</p>
                <button onClick={addMedia} className="font-mono-dm text-xs text-[#b8974a] hover:text-[#1e2d4a] transition-colors cursor-pointer">
                  + Add media coverage
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {mediaItems.map((media) => (
                  <div key={media._id} className="border border-[#e4ddd0] p-3 bg-[#faf6ee] rounded hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-mono-dm text-xs font-semibold text-[#b8974a]">{media.outlet}</span>
                          <span className={`px-1.5 py-0.5 text-[0.5rem] font-mono-dm uppercase rounded ${
                            media.stance === "adversarial" ? "bg-red-50 text-red-700" :
                            media.stance === "supportive" ? "bg-green-50 text-green-700" :
                            "bg-gray-50 text-gray-700"
                          }`}>{media.stance}</span>
                          <span className="font-mono-dm text-[0.5rem] text-[#9a8870]">{media.type}</span>
                          <span className="font-mono-dm text-[0.5rem] text-[#9a8870] ml-auto">{formatDate(media.date)}</span>
                        </div>
                        <p className="font-playfair font-semibold text-sm text-[#1e2d4a] mb-1">{media.headline}</p>
                        <p className="font-garamond text-xs text-[#7a6e5e] line-clamp-2">{media.summary || "No summary available."}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <a href={media.url} target="_blank" className="text-[#b8974a] text-xs hover:underline flex items-center gap-1 cursor-pointer">
                            <FiLink size={10} /> View Article
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-3">
                        <button onClick={() => editMedia(media)} className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer" title="Edit">
                          <FiEdit2 size={14} />
                        </button>
                        <button onClick={() => removeMedia(media._id)} className="text-red-400 hover:text-red-600 transition-colors cursor-pointer" title="Delete">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review */}
          <div className="border border-[#d4c8b4] bg-[#faf6ee] p-4 md:p-6 text-center rounded-lg">
            <FiCheckCircle size={32} className="mx-auto text-[#b8974a] mb-3" />
            <p className="font-garamond text-sm text-[#7a6e5e]">Review all changes before saving.</p>
            <p className="font-mono-dm text-xs text-[#9a8870] mt-2">Changes will be applied immediately to the public record</p>
          </div>
        </div>
      </div>

      {/* ── Media Modal ── */}
      {showMediaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f5f0e8] border-t-4 border-[#b8974a] max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair font-bold text-xl text-[#1e2d4a]">
                  {editingMedia ? "Edit Media Entry" : "Add Media Entry"}
                </h3>
                <button onClick={() => setShowMediaModal(false)} className="text-[#9a8870] hover:text-[#1e2d4a] transition-colors cursor-pointer">
                  <FiX size={20} />
                </button>
              </div>

              {mediaDuplicateError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                  <FiAlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="font-garamond text-sm text-red-600">{mediaDuplicateError}</p>
                </div>
              )}

              {/* Publication Name */}
              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
                  Publication Name <span className="text-red-500">*</span>
                </label>
                <input type="text" value={newMedia.outlet}
                  onChange={(e) => { setNewMedia({ ...newMedia, outlet: e.target.value }); clearMediaErr("outlet"); }}
                  className={`w-full border p-2 font-garamond focus:outline-none text-gray-700 rounded ${mediaErrors.outlet ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                  placeholder="e.g., The Hindu, BBC News" />
                <FieldError message={mediaErrors.outlet} />
              </div>

              {/* Headline */}
              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
                  Headline <span className="text-red-500">*</span>
                </label>
                <input type="text" value={newMedia.headline}
                  onChange={(e) => { setNewMedia({ ...newMedia, headline: e.target.value }); clearMediaErr("headline"); }}
                  className={`w-full border p-2 font-garamond focus:outline-none text-gray-700 rounded ${mediaErrors.headline ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                  placeholder="Article title" />
                <FieldError message={mediaErrors.headline} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* URL */}
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
                    URL <span className="text-red-500">*</span>
                  </label>
                  <input type="url" value={newMedia.url}
                    onChange={(e) => { setNewMedia({ ...newMedia, url: e.target.value }); clearMediaErr("url"); }}
                    className={`w-full border p-2 font-garamond focus:outline-none text-gray-700 rounded ${mediaErrors.url ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                    placeholder="https://..." />
                  <FieldError message={mediaErrors.url} />
                </div>
                {/* Date */}
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input type="date" value={newMedia.date}
                    onChange={(e) => { setNewMedia({ ...newMedia, date: e.target.value }); clearMediaErr("date"); }}
                    className={`w-full border p-2 font-garamond focus:outline-none text-gray-700 cursor-pointer rounded ${mediaErrors.date ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`} />
                  <FieldError message={mediaErrors.date} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Type</label>
                  <select value={newMedia.type} onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer rounded">
                    {MEDIA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Stance</label>
                  <select value={newMedia.stance} onChange={(e) => setNewMedia({ ...newMedia, stance: e.target.value })}
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 cursor-pointer rounded">
                    {STANCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Summary (optional) */}
              <div className="mb-4">
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
                  Summary <span className="font-normal normal-case text-[#9a8870]">(optional)</span>
                </label>
                <textarea value={newMedia.summary} onChange={(e) => setNewMedia({ ...newMedia, summary: e.target.value })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-gray-700 rounded"
                  rows={3} placeholder="Brief summary of the article..." />
              </div>

              <div className="flex gap-3">
                <button onClick={saveMedia}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase bg-[#1e2d4a] text-white py-2.5 hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded">
                  {editingMedia ? "Update Media" : "Add Media"}
                </button>
                <button onClick={() => setShowMediaModal(false)}
                  className="flex-1 font-mono-dm text-xs tracking-widest uppercase border border-[#c4b89a] text-[#7a6e5e] py-2.5 hover:bg-[#ede8dc] transition-colors cursor-pointer rounded">
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