
// // app/admin/create-docket/[id]/page.jsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { 
//   FiSave, FiArrowLeft, FiPlus, FiTrash2, FiFileText, 
//   FiCheckCircle, FiEdit2, FiUpload, FiX, FiFolder,
//   FiExternalLink, FiUser, FiCalendar, FiMail, FiAlertCircle
// } from "react-icons/fi";
// import adminAPI from "@/services/adminApi";
// import resolveFileUrl from "@/utils/fileUrl";

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

// const formatDate = (date) => {
//   if (!date) return "N/A";
//   return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
// };

// /**
//  * Resolves the correct fileUrl for an exhibit coming from a submission.
//  * Handles:
//  *   1. New submissions: file.fileUrl is already set correctly
//  *   2. Old submissions: only file.filename exists (no fileUrl stored)
//  *   3. Very old submissions: filename starts with "file-" instead of "submission-"
//  */
// // const resolveFileUrl = (file) => {
  
// //   if (file.fileUrl && file.fileUrl.startsWith("/uploads/")) {
// //     return file.fileUrl;
// //   }

// //   if (file.filename) {
// //     return `/uploads/submissions/${file.filename}`;
// //   }

// //   if (file.filePath) {
// //     const match = file.filePath.match(/(\/uploads\/.+)$/);
// //     if (match) return match[1];
// //   }
// //   return "";
// // };


// export default function CreateDocketPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [submission, setSubmission] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const fileInputRef = useRef(null);
//   const [duplicateError, setDuplicateError] = useState(null);
  
//   const [docket, setDocket] = useState({
//     title: "",
//     summary: { claim: "", context: "", whyMatters: "" },
//     response: { body: "", type: "" },
//     timeline: [],
//     exhibits: [],
//     status: "Open",
//   });

//   const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//   useEffect(() => {
//     fetchSubmission();
//   }, [params.id]);

//   const fetchSubmission = async () => {
//     try {
//       const response = await adminAPI.getSubmission(params.id);
//       const sub = response.submission;
//       setSubmission(sub);
      
//       // Convert timeline from submission format to docket format
//       const formattedTimeline = (sub.timeline || []).map(entry => ({
//         date: entry.date || "",
//         event: entry.event || "",
//         description: entry.detail || "",
//         type: "response"
//       }));
      
//       setDocket({
//         title: sub.responseTitle || "",
//         summary: { 
//           claim: sub.claimSummary || "", 
//           context: "", 
//           whyMatters: "" 
//         },
//         response: { 
//           body: sub.responseBody || "", 
//           type: sub.responseType || "" 
//         },
//         timeline: formattedTimeline,
//         exhibits: (sub.files || []).map((file, i) => {
//           // ← KEY FIX: use resolveFileUrl to handle all cases
//           // const fileUrl = resolveFileUrl(file);
//           const fileUrl = resolveFileUrl(
//             file.fileUrl || file.url || file.path || `/uploads/submissions/${file.filename}`
//           );
//           return {
//             id: Date.now() + Math.random() + i,
//             exhibitId: file.exhibitId || `EX-${String(i + 1).padStart(2, "0")}`,
//             title: file.originalName || file.filename || `Exhibit ${i + 1}`,
//             description: "",
//             fileUrl,
//             fileType: file.fileType || "",
//             fileSize: file.fileSize || 0,
//             category: "Evidence",
//             pages: null,
//             isNew: false,
//           };
//         }),
//         status: "Open",
//       });
//     } catch (error) {
//       console.error("Error fetching submission:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add new timeline entry
//   const addTimelineEntry = () => {
//     setDocket(prev => ({
//       ...prev,
//       timeline: [
//         ...prev.timeline,
//         { date: "", event: "", description: "", type: "response" }
//       ]
//     }));
//   };

//   const updateTimelineEntry = (index, field, value) => {
//     const updated = [...docket.timeline];
//     updated[index] = { ...updated[index], [field]: value };
//     setDocket({ ...docket, timeline: updated });
//   };

//   const removeTimelineEntry = (index) => {
//     setDocket(prev => ({
//       ...prev,
//       timeline: prev.timeline.filter((_, i) => i !== index)
//     }));
//   };

//   // Add new exhibit
//   const addExhibit = () => {
//     const newExhibit = {
//       id: Date.now() + Math.random(),
//       exhibitId: `EX-${String(docket.exhibits.length + 1).padStart(2, "0")}`,
//       title: "New Exhibit",
//       description: "",
//       fileUrl: "",
//       fileType: "",
//       fileSize: 0,
//       category: "Evidence",
//       pages: null,
//       isNew: true,
//       isUploading: false,
//     };
//     setDocket(prev => ({ ...prev, exhibits: [...prev.exhibits, newExhibit] }));
//   };

//   const removeExhibit = (index) => {
//     const updated = docket.exhibits.filter((_, i) => i !== index);
//     const renumbered = updated.map((ex, i) => ({
//       ...ex,
//       exhibitId: `EX-${String(i + 1).padStart(2, "0")}`
//     }));
//     setDocket({ ...docket, exhibits: renumbered });
//   };

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

//   const handleSave = async () => {
//     if (!docket.title.trim()) { 
//       alert("Please add a title"); 
//       return; 
//     }
//     if (!docket.summary.claim.trim()) { 
//       alert("Please add a claim summary"); 
//       return; 
//     }
    
//     if (docket.exhibits.some(ex => ex.isUploading)) {
//       alert("Please wait for all files to finish uploading.");
//       return;
//     }
    
//     setSaving(true);
//     setDuplicateError(null);
    
//     try {
//       const validExhibits = docket.exhibits.filter(ex => ex.fileUrl);
      
//       const submissionData = {
//         submissionId: submission._id,
//         docketData: {
//           title: docket.title,
//           summary: {
//             claim: docket.summary.claim,
//             context: docket.summary.context,
//             whyMatters: docket.summary.whyMatters,
//           },
//           response: {
//             body: docket.response.body,
//             type: docket.response.type,
//           },
//           timeline: docket.timeline,
//           exhibits: validExhibits.map(({ id, isNew, isUploading, ...rest }) => rest),
//           status: docket.status,
//         }
//       };
      
//       await adminAPI.createDocket(submissionData);
//       alert("✅ Docket created and published successfully!");
//       router.push("/admin/dockets");
//     } catch (error) {
//       console.error("Error creating docket:", error);
//       if (error.response?.status === 409) {
//         setDuplicateError(error.response?.data?.message || "A docket with similar content already exists.");
//       } else {
//         alert(error.response?.data?.message || "Failed to create docket");
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
//             <FiArrowLeft size={16} /> Back
//           </button>
//           <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Create Docket</h1>
//           <p className="font-garamond text-[#7a6e5e]">From: {submission?.respondentName}</p>
//         </div>
//         <button onClick={handleSave} disabled={saving}
//           className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer rounded">
//           <FiSave size={14} /> {saving ? "Publishing..." : "Publish Docket"}
//         </button>
//       </div>

//       {duplicateError && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//           <FiAlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="font-mono-dm text-sm text-red-700 font-semibold mb-1">Duplicate Detected</p>
//             <p className="font-garamond text-red-600">{duplicateError}</p>
//           </div>
//           <button onClick={() => setDuplicateError(null)} className="ml-auto text-red-400 hover:text-red-600 cursor-pointer">
//             <FiX size={18} />
//           </button>
//         </div>
//       )}

//       {/* Submission Summary Card */}
//       {submission && (
//         <div className="mb-6 border border-[#b8974a] bg-[#faf6ee] p-4 sm:p-5 rounded-lg">
//           <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
//             <div>
//               <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Original Submission</p>
//               <p className="font-playfair font-semibold text-lg text-[#1e2d4a]">{submission.responseTitle}</p>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 <span className="inline-flex items-center gap-1 font-mono-dm text-xs text-[#b8974a]">
//                   <FiUser size={12} /> {submission.respondentName}
//                 </span>
//                 <span className="inline-flex items-center gap-1 font-mono-dm text-xs text-[#9a8870]">
//                   <FiCalendar size={12} /> {formatDate(submission.submittedAt)}
//                 </span>
//                 {submission.claimUrl && (
//                   <a href={submission.claimUrl} target="_blank" className="inline-flex items-center gap-1 font-mono-dm text-xs text-[#b8974a] hover:underline cursor-pointer">
//                     <FiExternalLink size={12} /> View Original Claim
//                   </a>
//                 )}
//               </div>
//             </div>
//             <span className="inline-block px-3 py-1 text-xs font-mono-dm rounded-full bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">
//               {submission.status}
//             </span>
//           </div>
//         </div>
//       )}

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Title and Status Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Title *</label>
//             <input 
//               type="text" 
//               value={docket.title} 
//               onChange={(e) => setDocket({ ...docket, title: e.target.value })}
//               className="w-full border border-[#d4c8b4] p-3 font-garamond text-lg focus:outline-none focus:border-[#1e2d4a] mb-4 text-[#1e2d4a] bg-white rounded"
//               placeholder="Enter docket title..."
//             />

//             <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Status</label>
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

//           {/* Claim Summary Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
//               Claim Summary <span className="text-xs text-[#9a8870]">(from submission)</span>
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">The Claim *</label>
//                 <textarea 
//                   value={docket.summary.claim} 
//                   onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, claim: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                   rows={3} 
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Context</label>
//                 <textarea 
//                   value={docket.summary.context} 
//                   onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, context: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                   rows={3} 
//                   placeholder="Add context about the claim..."
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Why It Matters</label>
//                 <textarea 
//                   value={docket.summary.whyMatters} 
//                   onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, whyMatters: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//                   rows={3} 
//                   placeholder="Explain why this matters..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Response Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Response (From User)</h2>
//             <div>
//               <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Response Type</label>
//               <select
//                 value={docket.response.type}
//                 onChange={(e) => setDocket({ ...docket, response: { ...docket.response, type: e.target.value } })}
//                 className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white mb-4 cursor-pointer rounded"
//               >
//                 <option value="">Select type...</option>
//                 <option value="Full Rebuttal">Full Rebuttal</option>
//                 <option value="Partial Correction">Partial Correction</option>
//                 <option value="Factual Clarification">Factual Clarification</option>
//                 <option value="Context and Background">Context and Background</option>
//                 <option value="Legal Response">Legal Response</option>
//               </select>
//             </div>
//             <textarea 
//               value={docket.response.body} 
//               onChange={(e) => setDocket({ ...docket, response: { ...docket.response, body: e.target.value } })}
//               className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
//               rows={10} 
//             />
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Timeline Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//               <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Timeline</h2>
//               <button 
//                 onClick={addTimelineEntry}
//                 className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded"
//               >
//                 <FiPlus size={12} /> Add Event
//               </button>
//             </div>
//             {docket.timeline.length === 0 ? (
//               <p className="text-center text-[#9a8870] py-4">No timeline events added yet. Click "Add Event" to create one.</p>
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
//                     <option value="claim">Claim Published</option>
//                     <option value="response">Response Issued</option>
//                     <option value="third_party">Third Party Action</option>
//                     <option value="correction">Correction Issued</option>
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
//                 <p className="font-mono-dm text-xs text-[#9a8870] mt-1">{docket.exhibits.length} exhibit(s)</p>
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
//                   // ← Build the full URL for viewing, handling missing fileUrl gracefully
//                   // const viewUrl = ex.fileUrl ? `${API_BASE}${ex.fileUrl}` : null;
//                   const viewUrl = ex.fileUrl ? resolveFileUrl(ex.fileUrl) : null;
//                   console.log("viewurl:",viewUrl);
                  
//                   return (
//                     <div key={ex.id || i} className="border border-[#e4ddd0] p-4 bg-[#faf6ee] rounded relative">
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
//                         <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Title</label>
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
//                             <div className="flex items-center gap-2 overflow-hidden">
//                               <FiFileText size={14} className="text-[#b8974a] flex-shrink-0" />
//                               <span className="font-garamond text-sm text-[#1e2d4a] truncate">{ex.title}</span>
//                               {ex.fileSize > 0 && (
//                                 <span className="font-mono-dm text-xs text-[#9a8870] flex-shrink-0">
//                                   ({(ex.fileSize / 1024).toFixed(1)} KB)
//                                 </span>
//                               )}
//                             </div>
//                             <div className="flex gap-2 flex-shrink-0">
//                               {viewUrl ? (
//                                 <a 
//                                   href={viewUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-[#b8974a] text-xs hover:underline cursor-pointer"
//                                 >
//                                   View
//                                 </a>
//                               ) : (
//                                 <span className="text-[#c4b89a] text-xs">No URL</span>
//                               )}
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
//                             {/* Show warning for missing file URL */}
//                             <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded flex items-center gap-2">
//                               <FiAlertCircle size={12} className="text-yellow-600 flex-shrink-0" />
//                               <p className="font-mono-dm text-xs text-yellow-700">
//                                 File URL not found. The original file may have been uploaded with an older format. Upload a replacement.
//                               </p>
//                             </div>
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
            
//             <div className="mt-4 pt-3 border-t border-[#e4ddd0] text-center">
//               <p className="font-mono-dm text-xs text-[#9a8870]">
//                 Each exhibit will be assigned a unique ID. You can edit titles, add descriptions, and select categories.
//               </p>
//             </div>
//           </div>

//           {/* Review Box */}
//           <div className="border border-[#d4c8b4] bg-[#faf6ee] p-4 md:p-6 text-center rounded-lg">
//             <FiCheckCircle size={32} className="mx-auto text-[#b8974a] mb-3" />
//             <p className="font-garamond text-sm text-[#7a6e5e]">Review all information before publishing.</p>
//             <p className="font-mono-dm text-xs text-[#9a8870] mt-2">This will create a permanent public docket</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/admin/create-docket/[id]/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FiSave, FiArrowLeft, FiPlus, FiTrash2, FiFileText, 
  FiCheckCircle, FiEdit2, FiUpload, FiX, FiFolder,
  FiExternalLink, FiUser, FiCalendar, FiMail, FiAlertCircle
} from "react-icons/fi";
import adminAPI from "@/services/adminApi";
import resolveFileUrl from "@/utils/fileUrl";

const EXHIBIT_CATEGORIES = [
  { value: "Evidence", label: "Evidence", color: "#15803d", bg: "#f0fdf4" },
  { value: "Claim", label: "Claim", color: "#b91c1c", bg: "#fef2f2" },
  { value: "Analysis", label: "Analysis", color: "#1d4ed8", bg: "#eff6ff" },
  { value: "Legal", label: "Legal", color: "#7e22ce", bg: "#faf5ff" },
  { value: "Regulatory", label: "Regulatory", color: "#b45309", bg: "#fffbeb" },
  { value: "Benchmark", label: "Benchmark", color: "#0f766e", bg: "#f0fdfa" },
  { value: "Institutional", label: "Institutional", color: "#475569", bg: "#f8fafc" },
];

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

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

// Inline field error component
const FieldError = ({ message }) =>
  message ? <p className="mt-1 text-xs text-red-500 font-mono-dm">{message}</p> : null;

export default function CreateDocketPage() {
  const params = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [duplicateError, setDuplicateError] = useState(null);
  const [errors, setErrors] = useState({});

  const [docket, setDocket] = useState({
    title: "",
    summary: { claim: "", context: "", whyMatters: "" },
    response: { body: "", type: "" },
    timeline: [],
    exhibits: [],
    status: "Open",
  });

  useEffect(() => {
    fetchSubmission();
  }, [params.id]);

  const fetchSubmission = async () => {
    try {
      const response = await adminAPI.getSubmission(params.id);
      const sub = response.submission;
      setSubmission(sub);

      const formattedTimeline = (sub.timeline || []).map(entry => ({
        date: entry.date || "",
        event: entry.event || "",
        description: entry.detail || "",
        type: "response"
      }));

      setDocket({
        title: sub.responseTitle || "",
        summary: { 
          claim: sub.claimSummary || "", 
          context: "", 
          whyMatters: "" 
        },
        response: { 
          body: sub.responseBody || "", 
          type: sub.responseType || "" 
        },
        timeline: formattedTimeline,
        exhibits: (sub.files || []).map((file, i) => {
          const fileUrl = resolveFileUrl(
            file.fileUrl || file.url || file.path || `/uploads/submissions/${file.filename}`
          );
          return {
            id: Date.now() + Math.random() + i,
            exhibitId: file.exhibitId || `EX-${String(i + 1).padStart(2, "0")}`,
            title: file.originalName || file.filename || `Exhibit ${i + 1}`,
            description: "",
            fileUrl,
            fileType: file.fileType || "",
            fileSize: file.fileSize || 0,
            category: "Evidence",
            pages: null,
            isNew: false,
          };
        }),
        status: "Open",
      });
    } catch (error) {
      console.error("Error fetching submission:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── File validation helper ──────────────────────────────────────────────────
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

  // ── Timeline ───────────────────────────────────────────────────────────────
  const addTimelineEntry = () => {
    setDocket(prev => ({
      ...prev,
      timeline: [...prev.timeline, { date: "", event: "", description: "", type: "response" }]
    }));
  };

  const updateTimelineEntry = (index, field, value) => {
    const updated = [...docket.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setDocket({ ...docket, timeline: updated });
  };

  const removeTimelineEntry = (index) => {
    setDocket(prev => ({ ...prev, timeline: prev.timeline.filter((_, i) => i !== index) }));
  };

  // ── Exhibits ───────────────────────────────────────────────────────────────
  const addExhibit = () => {
    if (docket.exhibits.length >= MAX_FILES) {
      alert(`Maximum ${MAX_FILES} exhibits are allowed.`);
      return;
    }
    setDocket(prev => ({
      ...prev,
      exhibits: [
        ...prev.exhibits,
        {
          id: Date.now() + Math.random(),
          exhibitId: `EX-${String(prev.exhibits.length + 1).padStart(2, "0")}`,
          title: "New Exhibit",
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
        const updatedExhibit = [...docket.exhibits];
        updatedExhibit[index] = {
          ...updatedExhibit[index],
          fileUrl: result.fileUrl,
          fileType: result.fileType,
          fileSize: result.fileSize,
          title: result.fileName,
          isUploading: false,
        };
        setDocket({ ...docket, exhibits: updatedExhibit });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
      const resetUpload = [...docket.exhibits];
      resetUpload[index] = { ...resetUpload[index], isUploading: false };
      setDocket({ ...docket, exhibits: resetUpload });
    }
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!docket.title.trim()) newErrors.title = "Docket title is required.";
    if (!docket.summary.claim.trim()) newErrors.summarylaim = "Claim summary is required.";
    if (!docket.summary.context.trim()) newErrors.summarycontext = "The summary context is required.";
    if (!docket.summary.whyMatters.trim()) newErrors.summarywhymatters = "The summary whyMatters is required.";
    if (!docket.response.body.trim()) newErrors.responseBody = "Response body is required.";
    if (!docket.response.type) newErrors.responseType = "Response type is required.";

     // Timeline – at least one entry
    if (docket.timeline.length === 0) {
      newErrors.timeline = "At least one timeline event is required.";
    }
    
    // Exhibits – at least one entry
    if (docket.exhibits.length === 0) {
      newErrors.exhibits_count = "At least one exhibit is required.";
    }

    // Exhibit validations
    const exhibitErrs = {};
    docket.exhibits.forEach((ex, i) => {
      const errs = {};
      if (!ex.title.trim()) errs.title = "Title is required.";
      if (!ex.fileUrl) errs.fileUrl = "File is required.";
      if (Object.keys(errs).length) exhibitErrs[i] = errs;
    });
    if (Object.keys(exhibitErrs).length) newErrors.exhibits = exhibitErrs;

    setErrors(newErrors);
    // Return true only if no top-level errors (excluding nested exhibit errors — those show inline)
    const topLevelErrors = Object.keys(newErrors).filter(k => k !== "exhibits");
    return topLevelErrors.length === 0 && Object.keys(exhibitErrs).length === 0;
  };

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;

    if (docket.exhibits.some(ex => ex.isUploading)) {
      alert("Please wait for all files to finish uploading.");
      return;
    }

    setSaving(true);
    setDuplicateError(null);

    try {
      const validExhibits = docket.exhibits.filter(ex => ex.fileUrl);

      const submissionData = {
        submissionId: submission._id,
        docketData: {
          title: docket.title,
          summary: {
            claim: docket.summary.claim,
            context: docket.summary.context,
            whyMatters: docket.summary.whyMatters,
          },
          response: {
            body: docket.response.body,
            type: docket.response.type,
          },
          timeline: docket.timeline,
          exhibits: validExhibits.map(({ id, isNew, isUploading, ...rest }) => rest),
          status: docket.status,
        }
      };

      await adminAPI.createDocket(submissionData);
      alert("✅ Docket created and published successfully!");
      router.push("/admin/dockets");
    } catch (error) {
      console.error("Error creating docket:", error);
      if (error.response?.status === 409) {
        setDuplicateError(error.response?.data?.message || "A docket with similar content already exists.");
      } else {
        alert(error.response?.data?.message || "Failed to create docket");
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
            <FiArrowLeft size={16} /> Back
          </button>
          <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Create Docket</h1>
          <p className="font-garamond text-[#7a6e5e]">From: {submission?.respondentName}</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer rounded">
          <FiSave size={14} /> {saving ? "Publishing..." : "Publish Docket"}
        </button>
      </div>

      {duplicateError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <FiAlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-mono-dm text-sm text-red-700 font-semibold mb-1">Duplicate Detected</p>
            <p className="font-garamond text-red-600">{duplicateError}</p>
          </div>
          <button onClick={() => setDuplicateError(null)} className="ml-auto text-red-400 hover:text-red-600 cursor-pointer">
            <FiX size={18} />
          </button>
        </div>
      )}

      {/* Submission Summary Card */}
      {submission && (
        <div className="mb-6 border border-[#b8974a] bg-[#faf6ee] p-4 sm:p-5 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <p className="font-mono-dm text-xs text-[#9a8870] mb-1">Original Submission</p>
              <p className="font-playfair font-semibold text-lg text-[#1e2d4a]">{submission.responseTitle}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="inline-flex items-center gap-1 font-mono-dm text-xs text-[#b8974a]">
                  <FiUser size={12} /> {submission.respondentName}
                </span>
                <span className="inline-flex items-center gap-1 font-mono-dm text-xs text-[#9a8870]">
                  <FiCalendar size={12} /> {formatDate(submission.submittedAt)}
                </span>
                {submission.claimUrl && (
                  <a href={submission.claimUrl} target="_blank" className="inline-flex items-center gap-1 font-mono-dm text-xs text-[#b8974a] hover:underline cursor-pointer">
                    <FiExternalLink size={12} /> View Original Claim
                  </a>
                )}
              </div>
            </div>
            <span className="inline-block px-3 py-1 text-xs font-mono-dm rounded-full bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">
              {submission.status}
            </span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── Left Column ── */}
        <div className="space-y-6">
          {/* Title and Status */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
              Docket Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={docket.title}
              onChange={(e) => { setDocket({ ...docket, title: e.target.value }); setErrors(p => ({ ...p, title: "" })); }}
              className={`w-full border p-3 font-garamond text-lg focus:outline-none mb-1 text-[#1e2d4a] bg-white rounded ${errors.title ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
              placeholder="Enter docket title..."
            />
            <FieldError message={errors.title} />

            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2 mt-4">Status</label>
            <select
              value={docket.status}
              onChange={(e) => setDocket({ ...docket, status: e.target.value })}
              className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
            >
              <option value="Open">Open</option>
              <option value="Under Review">Under Review</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Claim Summary */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
              Claim Summary <span className="text-xs text-[#9a8870]">(from submission)</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
                  The Claim <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={docket.summary.claim}
                  onChange={(e) => { setDocket({ ...docket, summary: { ...docket.summary, claim: e.target.value } }); setErrors(p => ({ ...p, summarylaim: "" })); }}
                  className={`w-full border p-3 font-garamond focus:outline-none text-[#1e2d4a] bg-white rounded ${errors.summarylaim ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                  rows={3}
                />
                <FieldError message={errors.summarylaim} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Context <span className="text-red-500">*</span></label>
                <textarea
                  value={docket.summary.context}
                  onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, context: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  rows={3}
                  placeholder="Add context about the claim..."
                />
                <FieldError message={errors.summarycontext} />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Why It Matters <span className="text-red-500">*</span></label>
                <textarea
                  value={docket.summary.whyMatters}
                  onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, whyMatters: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  rows={3}
                  placeholder="Explain why this matters..."
                />
                <FieldError message={errors.summarywhymatters} />
              </div>
            </div>
          </div>

          {/* Response */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Response (From User)</h2>
            <div>
              <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
                Response Type <span className="text-red-500">*</span>
              </label>
              <select
                value={docket.response.type}
                onChange={(e) => { setDocket({ ...docket, response: { ...docket.response, type: e.target.value } }); setErrors(p => ({ ...p, responseType: "" })); }}
                className={`w-full border p-2 font-garamond focus:outline-none text-[#1e2d4a] bg-white mb-1 cursor-pointer rounded ${errors.responseType ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
              >
                <option value="">Select type...</option>
                <option value="Full Rebuttal">Full Rebuttal</option>
                <option value="Partial Correction">Partial Correction</option>
                <option value="Factual Clarification">Factual Clarification</option>
                <option value="Context and Background">Context and Background</option>
                <option value="Legal Response">Legal Response</option>
              </select>
              <FieldError message={errors.responseType} />
            </div>
            <div className="mt-4">
              <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
                Response Body <span className="text-red-500">*</span>
              </label>
              <textarea
                value={docket.response.body}
                onChange={(e) => { setDocket({ ...docket, response: { ...docket.response, body: e.target.value } }); setErrors(p => ({ ...p, responseBody: "" })); }}
                className={`w-full border p-3 font-garamond focus:outline-none text-[#1e2d4a] bg-white rounded ${errors.responseBody ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                rows={10}
              />
              <FieldError message={errors.responseBody} />
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Timeline <span className="text-red-500">*</span></h2>
              <button
                onClick={addTimelineEntry}
                className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded"
              >
                <FiPlus size={12} /> Add Event
              </button>
            </div>
             {errors.timeline && <p className="text-xs text-red-500 font-mono-dm mb-3">{errors.timeline}</p>}
            {docket.timeline.length === 0 ? (
              <p className="text-center text-[#9a8870] py-4 font-garamond text-sm">No timeline events added yet.</p>
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
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded" rows={2} />
                  <select value={entry.type} onChange={(e) => updateTimelineEntry(i, "type", e.target.value)}
                    className="w-full border border-[#d4c8b4] p-2 mt-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded">
                    <option value="claim">Claim Published</option>
                    <option value="response">Response Issued</option>
                    <option value="third_party">Third Party Action</option>
                    <option value="correction">Correction Issued</option>
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
                <p className="font-mono-dm text-xs text-[#9a8870] mt-1">{docket.exhibits.length} / {MAX_FILES} exhibit(s)</p>
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
                  const viewUrl = ex.fileUrl ? resolveFileUrl(ex.fileUrl) : null;
                  const exErrors = errors.exhibits?.[i] || {};

                  return (
                    <div key={ex.id || i} className="border border-[#e4ddd0] p-4 bg-[#faf6ee] rounded relative">
                      <button onClick={() => removeExhibit(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors cursor-pointer" title="Remove exhibit">
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
                          onChange={(e) => { updateExhibit(i, "title", e.target.value); setErrors(p => { const ne = { ...p }; if (ne.exhibits?.[i]) { ne.exhibits[i] = { ...ne.exhibits[i], title: "" }; } return ne; }); }}
                          className={`w-full border p-2 font-garamond text-sm focus:outline-none text-[#1e2d4a] bg-white rounded ${exErrors.title ? "border-red-400" : "border-[#d4c8b4] focus:border-[#1e2d4a]"}`}
                          placeholder="Enter exhibit title..." />
                        <FieldError message={exErrors.title} />
                      </div>

                      {/* Description (optional) */}
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Description <span className="font-normal normal-case text-[#9a8870]">(optional)</span></label>
                        <textarea value={ex.description || ""} onChange={(e) => updateExhibit(i, "description", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                          rows={2} placeholder="Brief description of this exhibit..." />
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
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FiFileText size={14} className="text-[#b8974a] flex-shrink-0" />
                              <span className="font-garamond text-sm text-[#1e2d4a] truncate">{ex.title}</span>
                              {ex.fileSize > 0 && (
                                <span className="font-mono-dm text-xs text-[#9a8870] flex-shrink-0">
                                  ({(ex.fileSize / 1024).toFixed(1)} KB)
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              {viewUrl ? (
                                <a href={viewUrl} target="_blank" rel="noopener noreferrer" className="text-[#b8974a] text-xs hover:underline cursor-pointer">View</a>
                              ) : (
                                <span className="text-[#c4b89a] text-xs">No URL</span>
                              )}
                              <button
                                onClick={() => {
                                  const fi = document.createElement("input");
                                  fi.type = "file";
                                  fi.accept = ALLOWED_FILE_TYPES.join(",");
                                  fi.onchange = (e) => handleFileUpload(i, e.target.files[0]);
                                  fi.click();
                                }}
                                className="text-[#1e2d4a] text-xs hover:text-[#b8974a] cursor-pointer"
                              >
                                Replace
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded flex items-center gap-2">
                              <FiAlertCircle size={12} className="text-yellow-600 flex-shrink-0" />
                              <p className="font-mono-dm text-xs text-yellow-700">
                                File URL not found. Upload a replacement.
                              </p>
                            </div>
                            <input type="file"
                              onChange={(e) => handleFileUpload(i, e.target.files[0])}
                              className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm bg-white cursor-pointer rounded"
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

            <div className="mt-4 pt-3 border-t border-[#e4ddd0] text-center">
              <p className="font-mono-dm text-xs text-[#9a8870]">
                Each exhibit will be assigned a unique ID. You can edit titles, add descriptions, and select categories.
              </p>
            </div>
          </div>

          {/* Review Box */}
          <div className="border border-[#d4c8b4] bg-[#faf6ee] p-4 md:p-6 text-center rounded-lg">
            <FiCheckCircle size={32} className="mx-auto text-[#b8974a] mb-3" />
            <p className="font-garamond text-sm text-[#7a6e5e]">Review all information before publishing.</p>
            <p className="font-mono-dm text-xs text-[#9a8870] mt-2">This will create a permanent public docket</p>
          </div>
        </div>
      </div>
    </div>
  );
}