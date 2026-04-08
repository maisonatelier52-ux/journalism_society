// // app/admin/create-docket/page.jsx
// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { 
//   FiSave, FiArrowLeft, FiPlus, FiTrash2, FiFileText, 
//   FiCheckCircle, FiFolder, FiUser, FiFile, FiCalendar,
//   FiLink, FiTag, FiX
// } from "react-icons/fi";
// import adminAPI from "@/services/adminApi";

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

// export default function AdminCreateDocketPage() {
//   const router = useRouter();
//   const [saving, setSaving] = useState(false);
  
//   const [docket, setDocket] = useState({
//     // Docket Info
//     docketId: "",
    
//     // Summary
//     summary: { 
//       claim: "", 
//       context: "", 
//       whyMatters: "" 
//     },
    
//     // Respondent Info
//     respondent: {
//       name: "",
//       type: "",
//     },
    
//     // Claim Info
//     claim: {
//       source: "",
//       url: "",
//       date: "",
//       category: "",
//     },
    
//     // Response
//     response: {
//       title: "",
//       body: "",
//       type: "",
//       requestedAction: "",
//     },
    
//     // Timeline
//     timeline: [],
    
//     // Exhibits
//     exhibits: [],
    
//     // Status
//     status: "Open",
//   });

//   // Add new timeline entry
//   const addTimelineEntry = () => {
//     setDocket({
//       ...docket,
//       timeline: [
//         ...docket.timeline,
//         { date: "", event: "", description: "", type: "response" }
//       ]
//     });
//   };

//   // Update timeline entry
//   const updateTimelineEntry = (index, field, value) => {
//     const updated = [...docket.timeline];
//     updated[index] = { ...updated[index], [field]: value };
//     setDocket({ ...docket, timeline: updated });
//   };

//   // Remove timeline entry
//   const removeTimelineEntry = (index) => {
//     const updated = docket.timeline.filter((_, i) => i !== index);
//     setDocket({ ...docket, timeline: updated });
//   };

//   // Add new exhibit
//   const addExhibit = () => {
//     const newExhibit = {
//       id: Date.now() + Math.random(),
//       exhibitId: `EX-${String(docket.exhibits.length + 1).padStart(2, "0")}`,
//       title: "",
//       description: "",
//       fileUrl: "",
//       fileType: "",
//       fileSize: 0,
//       category: "Evidence",
//       pages: null,
//       isUploading: false,
//     };
//     setDocket({
//       ...docket,
//       exhibits: [...docket.exhibits, newExhibit]
//     });
//   };

//   // Remove exhibit
//   const removeExhibit = (index) => {
//     const updated = docket.exhibits.filter((_, i) => i !== index);
//     const renumbered = updated.map((ex, i) => ({
//       ...ex,
//       exhibitId: `EX-${String(i + 1).padStart(2, "0")}`
//     }));
//     setDocket({ ...docket, exhibits: renumbered });
//   };

//   // Update exhibit
//   const updateExhibit = (index, field, value) => {
//     const updated = [...docket.exhibits];
//     updated[index] = { ...updated[index], [field]: value };
//     setDocket({ ...docket, exhibits: updated });
//   };

//   // Handle file upload for exhibit
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
//     try {
//       // Filter out empty exhibits (no file URL)
//       const validExhibits = docket.exhibits.filter(ex => ex.fileUrl && ex.title.trim());
      
//       const submissionData = {
//         // Mark this as admin created (no submission ID)
//         isAdminCreated: true,
//         docketData: {
//           title: docket.response.title,
//           summary: {
//             claim: docket.summary.claim,
//             context: docket.summary.context,
//             whyMatters: docket.summary.whyMatters,
//           },
//           respondent: {
//             name: docket.respondent.name,
//             type: docket.respondent.type,
//           },
//           claim: {
//             source: docket.claim.source,
//             url: docket.claim.url,
//             date: docket.claim.date,
//             category: docket.claim.category,
//           },
//           response: {
//             body: docket.response.body,
//             type: docket.response.type,
//             requestedAction: docket.response.requestedAction,
//           },
//           timeline: docket.timeline,
//           exhibits: validExhibits.map(({ id, isUploading, ...rest }) => rest),
//           status: docket.status,
//         }
//       };
      
//       const result = await adminAPI.createAdminDocket(submissionData);
//       alert("✅ Docket created successfully!");
//       router.push("/admin/dockets");
//     } catch (error) {
//       console.error("Error creating docket:", error);
//       alert(error.response?.data?.message || "Failed to create docket");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getCategoryStyle = (category) => {
//     const cat = EXHIBIT_CATEGORIES.find(c => c.value === category) || EXHIBIT_CATEGORIES[0];
//     return { bg: cat.bg, color: cat.color, border: `1px solid ${cat.color}20` };
//   };

//   return (
//     <div className="admin-page">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//         <div>
//           <button onClick={() => router.back()} className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a] mb-2 cursor-pointer">
//             <FiArrowLeft size={16} /> Back
//           </button>
//           <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Create New Docket</h1>
//           <p className="font-garamond text-[#7a6e5e]">Create a docket directly without a user submission</p>
//         </div>
//         <button onClick={handleSave} disabled={saving}
//           className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer">
//           <FiSave size={14} /> {saving ? "Creating..." : "Create Docket"}
//         </button>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Respondent Information */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
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
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                   placeholder="e.g., HPA Kerala Chapter"
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Type *</label>
//                 <select
//                   value={docket.respondent.type}
//                   onChange={(e) => setDocket({ ...docket, respondent: { ...docket.respondent, type: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
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
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
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
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                     placeholder="e.g., The Malabar Record"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Date *</label>
//                   <input 
//                     type="date" 
//                     value={docket.claim.date} 
//                     onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, date: e.target.value } })}
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">URL (Optional)</label>
//                 <input 
//                   type="url" 
//                   value={docket.claim.url} 
//                   onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, url: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                   placeholder="https://..."
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Category</label>
//                 <select
//                   value={docket.claim.category}
//                   onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, category: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
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
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
//               Summary <span className="text-xs text-[#9a8870]">(Admin writes this)</span>
//             </h2>
//             <div className="space-y-4">
//               <textarea 
//                 value={docket.summary.claim} 
//                 onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, claim: e.target.value } })}
//                 className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                 rows={3} 
//                 placeholder="The Claim *" 
//               />
//               <textarea 
//                 value={docket.summary.context} 
//                 onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, context: e.target.value } })}
//                 className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                 rows={3} 
//                 placeholder="Context" 
//               />
//               <textarea 
//                 value={docket.summary.whyMatters} 
//                 onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, whyMatters: e.target.value } })}
//                 className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                 rows={3} 
//                 placeholder="Why It Matters" 
//               />
//             </div>
//           </div>

//           {/* Response Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
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
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                   placeholder="e.g., Right of Reply: HPA on Alleged Billing Practices"
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Response Type</label>
//                 <select
//                   value={docket.response.type}
//                   onChange={(e) => setDocket({ ...docket, response: { ...docket.response, type: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
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
//                   className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                   rows={10} 
//                   placeholder="Write the full response here..."
//                 />
//               </div>
//               <div>
//                 <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Requested Action</label>
//                 <select
//                   value={docket.response.requestedAction}
//                   onChange={(e) => setDocket({ ...docket, response: { ...docket.response, requestedAction: e.target.value } })}
//                   className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
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
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
//             <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Status</label>
//             <select 
//               value={docket.status} 
//               onChange={(e) => setDocket({ ...docket, status: e.target.value })}
//               className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
//             >
//               <option value="Open">Open</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>

//           {/* Timeline Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
//             <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//               <div>
//                 <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Timeline</h2>
//                 <p className="font-mono-dm text-xs text-[#9a8870]">Add key events in chronological order</p>
//               </div>
//               <button 
//                 onClick={addTimelineEntry}
//                 className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer"
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
//                     className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
//                   />
//                   <input 
//                     type="text" 
//                     value={entry.event} 
//                     onChange={(e) => updateTimelineEntry(i, "event", e.target.value)}
//                     placeholder="Event title" 
//                     className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                   />
//                   <textarea 
//                     value={entry.description} 
//                     onChange={(e) => updateTimelineEntry(i, "description", e.target.value)}
//                     placeholder="Description" 
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                     rows={2}
//                   />
//                   <select
//                     value={entry.type}
//                     onChange={(e) => updateTimelineEntry(i, "type", e.target.value)}
//                     className="w-full border border-[#d4c8b4] p-2 mt-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
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
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
//             <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//               <div>
//                 <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Exhibits</h2>
//                 <p className="font-mono-dm text-xs text-[#9a8870]">Upload supporting documents</p>
//               </div>
//               <button 
//                 onClick={addExhibit}
//                 className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer"
//               >
//                 <FiPlus size={12} /> Add Exhibit
//               </button>
//             </div>
            
//             {docket.exhibits.length === 0 ? (
//               <div className="text-center py-12 border-2 border-dashed border-[#d4c8b4] bg-[#faf6ee]">
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
//                     <div key={ex.id} className="border border-[#e4ddd0] p-4 bg-[#faf6ee] rounded relative">
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
//                           className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                           placeholder="Enter exhibit title..."
//                         />
//                       </div>
                      
//                       <div className="mb-3">
//                         <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Description (Optional)</label>
//                         <textarea
//                           value={ex.description || ""}
//                           onChange={(e) => updateExhibit(i, "description", e.target.value)}
//                           className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//                           rows={2}
//                           placeholder="Brief description of this exhibit..."
//                         />
//                       </div>
                      
//                       <div className="mb-3">
//                         <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Category</label>
//                         <select
//                           value={ex.category}
//                           onChange={(e) => updateExhibit(i, "category", e.target.value)}
//                           className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
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
//                                 href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${ex.fileUrl}`}
//                                 target="_blank" 
//                                 className="text-[#b8974a] text-xs hover:underline"
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
//                                 className="text-[#1e2d4a] text-xs hover:text-[#b8974a]"
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
//                               className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm bg-white cursor-pointer"
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
//           <div className="border border-[#d4c8b4] bg-[#faf6ee] p-4 md:p-6 text-center">
//             <FiCheckCircle size={32} className="mx-auto text-[#b8974a] mb-3" />
//             <p className="font-garamond text-sm text-[#7a6e5e]">Review all information before publishing.</p>
//             <p className="font-mono-dm text-xs text-[#9a8870] mt-2">This will create a permanent public docket</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  FiSave, FiArrowLeft, FiPlus, FiTrash2, FiFileText, 
  FiCheckCircle, FiFolder, FiUser, FiFile, FiCalendar,
  FiLink, FiTag, FiX, FiAlertCircle
} from "react-icons/fi";
import adminAPI from "@/services/adminApi";

// Category options for exhibits
const EXHIBIT_CATEGORIES = [
  { value: "Evidence", label: "Evidence", color: "#15803d", bg: "#f0fdf4" },
  { value: "Claim", label: "Claim", color: "#b91c1c", bg: "#fef2f2" },
  { value: "Analysis", label: "Analysis", color: "#1d4ed8", bg: "#eff6ff" },
  { value: "Legal", label: "Legal", color: "#7e22ce", bg: "#faf5ff" },
  { value: "Regulatory", label: "Regulatory", color: "#b45309", bg: "#fffbeb" },
  { value: "Benchmark", label: "Benchmark", color: "#0f766e", bg: "#f0fdfa" },
  { value: "Institutional", label: "Institutional", color: "#475569", bg: "#f8fafc" },
];

// Respondent types
const RESPONDENT_TYPES = [
  "Individual",
  "Corporate Organisation",
  "Government Body",
  "Industry Association",
  "Non-Governmental Organisation",
  "Educational Institution",
  "Other",
];

// Response types
const RESPONSE_TYPES = [
  "Full Rebuttal",
  "Partial Correction",
  "Factual Clarification",
  "Context and Background",
  "Legal Response",
];

// Timeline types
const TIMELINE_TYPES = [
  "claim",
  "response",
  "third_party",
  "correction",
];

export default function AdminCreateDocketPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [duplicateError, setDuplicateError] = useState(null);
  
  const [docket, setDocket] = useState({
    docketId: "",
    summary: { claim: "", context: "", whyMatters: "" },
    respondent: { name: "", type: "" },
    claim: { source: "", url: "", date: "", category: "" },
    response: { title: "", body: "", type: "", requestedAction: "" },
    timeline: [],
    exhibits: [],
    status: "Open",
  });

  const addTimelineEntry = () => {
    setDocket({
      ...docket,
      timeline: [
        ...docket.timeline,
        { date: "", event: "", description: "", type: "response" }
      ]
    });
  };

  const updateTimelineEntry = (index, field, value) => {
    const updated = [...docket.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setDocket({ ...docket, timeline: updated });
  };

  const removeTimelineEntry = (index) => {
    const updated = docket.timeline.filter((_, i) => i !== index);
    setDocket({ ...docket, timeline: updated });
  };

  const addExhibit = () => {
    const newExhibit = {
      id: Date.now() + Math.random(),
      exhibitId: `EX-${String(docket.exhibits.length + 1).padStart(2, "0")}`,
      title: "",
      description: "",
      fileUrl: "",
      fileType: "",
      fileSize: 0,
      category: "Evidence",
      pages: null,
      isUploading: false,
    };
    setDocket({
      ...docket,
      exhibits: [...docket.exhibits, newExhibit]
    });
  };

  const removeExhibit = (index) => {
    const updated = docket.exhibits.filter((_, i) => i !== index);
    const renumbered = updated.map((ex, i) => ({
      ...ex,
      exhibitId: `EX-${String(i + 1).padStart(2, "0")}`
    }));
    setDocket({ ...docket, exhibits: renumbered });
  };

  const updateExhibit = (index, field, value) => {
    const updated = [...docket.exhibits];
    updated[index] = { ...updated[index], [field]: value };
    setDocket({ ...docket, exhibits: updated });
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;
    
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

  const handleSave = async () => {
    if (!docket.response.title.trim()) {
      alert("Please add a response title");
      return;
    }
    if (!docket.response.body.trim()) {
      alert("Please add response content");
      return;
    }
    if (!docket.summary.claim.trim()) {
      alert("Please add a claim summary");
      return;
    }
    if (!docket.respondent.name.trim()) {
      alert("Please add respondent name");
      return;
    }
    if (!docket.respondent.type) {
      alert("Please select respondent type");
      return;
    }
    if (!docket.claim.source.trim()) {
      alert("Please add claim source");
      return;
    }
    if (!docket.claim.date) {
      alert("Please select claim date");
      return;
    }
    
    if (docket.exhibits.some(ex => ex.isUploading)) {
      alert("Please wait for all files to finish uploading.");
      return;
    }
    
    setSaving(true);
    setDuplicateError(null);
    
    try {
      const validExhibits = docket.exhibits.filter(ex => ex.fileUrl && ex.title.trim());
      
      const submissionData = {
        isAdminCreated: true,
        docketData: {
          title: docket.response.title,
          summary: {
            claim: docket.summary.claim,
            context: docket.summary.context,
            whyMatters: docket.summary.whyMatters,
          },
          respondent: {
            name: docket.respondent.name,
            type: docket.respondent.type,
          },
          claim: {
            source: docket.claim.source,
            url: docket.claim.url,
            date: docket.claim.date,
            category: docket.claim.category,
          },
          response: {
            body: docket.response.body,
            type: docket.response.type,
            requestedAction: docket.response.requestedAction,
          },
          timeline: docket.timeline,
          exhibits: validExhibits.map(({ id, isUploading, ...rest }) => rest),
          status: docket.status,
        }
      };
      
      const result = await adminAPI.createAdminDocket(submissionData);
      alert("✅ Docket created successfully!");
      router.push("/admin/dockets");
    } catch (error) {
      console.error("Error creating docket:", error);
      if (error.response?.status === 409) {
        setDuplicateError(error.response?.data?.message);
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

  return (
    <div className="admin-page">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a] mb-2 transition-colors cursor-pointer">
            <FiArrowLeft size={16} /> Back
          </button>
          <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Create New Docket</h1>
          <p className="font-garamond text-[#7a6e5e]">Create a docket directly without a user submission</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer rounded">
          <FiSave size={14} /> {saving ? "Creating..." : "Create Docket"}
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
      

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Respondent Information */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4 flex items-center gap-2">
              <FiUser size={18} /> Respondent Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Name / Organisation *</label>
                <input 
                  type="text" 
                  value={docket.respondent.name} 
                  onChange={(e) => setDocket({ ...docket, respondent: { ...docket.respondent, name: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  placeholder="e.g., HPA Kerala Chapter"
                />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Type *</label>
                <select
                  value={docket.respondent.type}
                  onChange={(e) => setDocket({ ...docket, respondent: { ...docket.respondent, type: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
                >
                  <option value="">Select type...</option>
                  {RESPONDENT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Source / Publication *</label>
                  <input 
                    type="text" 
                    value={docket.claim.source} 
                    onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, source: e.target.value } })}
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                    placeholder="e.g., The Malabar Record"
                  />
                </div>
                <div>
                  <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Date *</label>
                  <input 
                    type="date" 
                    value={docket.claim.date} 
                    onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, date: e.target.value } })}
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
                  />
                </div>
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">URL (Optional)</label>
                <input 
                  type="url" 
                  value={docket.claim.url} 
                  onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, url: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Category</label>
                <select
                  value={docket.claim.category}
                  onChange={(e) => setDocket({ ...docket, claim: { ...docket.claim, category: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
                >
                  <option value="">Select category...</option>
                  {["Right of Reply", "Correction Request", "Factual Dispute", "Defamation Response", "Regulatory Compliance", "Other"].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
              Summary <span className="text-xs text-[#9a8870]">(Admin writes this)</span>
            </h2>
            <div className="space-y-4">
              <textarea 
                value={docket.summary.claim} 
                onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, claim: e.target.value } })}
                className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                rows={3} 
                placeholder="The Claim *" 
              />
              <textarea 
                value={docket.summary.context} 
                onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, context: e.target.value } })}
                className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                rows={3} 
                placeholder="Context" 
              />
              <textarea 
                value={docket.summary.whyMatters} 
                onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, whyMatters: e.target.value } })}
                className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                rows={3} 
                placeholder="Why It Matters" 
              />
            </div>
          </div>

          {/* Response Section */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
              Response <span className="text-xs text-[#9a8870]">(Main content)</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Response Title *</label>
                <input 
                  type="text" 
                  value={docket.response.title} 
                  onChange={(e) => setDocket({ ...docket, response: { ...docket.response, title: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  placeholder="e.g., Right of Reply: HPA on Alleged Billing Practices"
                />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Response Type</label>
                <select
                  value={docket.response.type}
                  onChange={(e) => setDocket({ ...docket, response: { ...docket.response, type: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
                >
                  <option value="">Select type...</option>
                  {RESPONSE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Full Response *</label>
                <textarea 
                  value={docket.response.body} 
                  onChange={(e) => setDocket({ ...docket, response: { ...docket.response, body: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  rows={10} 
                  placeholder="Write the full response here..."
                />
              </div>
              <div>
                <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Requested Action</label>
                <select
                  value={docket.response.requestedAction}
                  onChange={(e) => setDocket({ ...docket, response: { ...docket.response, requestedAction: e.target.value } })}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
                >
                  <option value="">Select action...</option>
                  {["Publish this reply in full", "Issue a formal correction", "Remove or retract the article", "Publish a link to this docket", "No specific action requested"].map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Status */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Status</label>
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

          {/* Timeline Section */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Timeline</h2>
                <p className="font-mono-dm text-xs text-[#9a8870]">Add key events in chronological order</p>
              </div>
              <button 
                onClick={addTimelineEntry}
                className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded"
              >
                <FiPlus size={12} /> Add Event
              </button>
            </div>
            {docket.timeline.length === 0 ? (
              <p className="text-center text-[#9a8870] py-8">No timeline events added. Click "Add Event" to create one.</p>
            ) : (
              docket.timeline.map((entry, i) => (
                <div key={i} className="border-l-2 border-[#b8974a] pl-4 relative mb-6">
                  <button 
                    onClick={() => removeTimelineEntry(i)}
                    className="absolute -right-5 top-0 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <FiTrash2 size={14} />
                  </button>
                  <input 
                    type="date" 
                    value={entry.date} 
                    onChange={(e) => updateTimelineEntry(i, "date", e.target.value)}
                    className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
                  />
                  <input 
                    type="text" 
                    value={entry.event} 
                    onChange={(e) => updateTimelineEntry(i, "event", e.target.value)}
                    placeholder="Event title" 
                    className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                  />
                  <textarea 
                    value={entry.description} 
                    onChange={(e) => updateTimelineEntry(i, "description", e.target.value)}
                    placeholder="Description" 
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                    rows={2}
                  />
                  <select
                    value={entry.type}
                    onChange={(e) => updateTimelineEntry(i, "type", e.target.value)}
                    className="w-full border border-[#d4c8b4] p-2 mt-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
                  >
                    {TIMELINE_TYPES.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>
              ))
            )}
          </div>

          {/* Exhibits Section */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Exhibits</h2>
                <p className="font-mono-dm text-xs text-[#9a8870]">Upload supporting documents</p>
              </div>
              <button 
                onClick={addExhibit}
                className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer rounded"
              >
                <FiPlus size={12} /> Add Exhibit
              </button>
            </div>
            
            {docket.exhibits.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-[#d4c8b4] bg-[#faf6ee] rounded">
                <FiFolder size={48} className="mx-auto text-[#c4b89a] mb-3" />
                <p className="font-garamond text-[#9a8870] mb-2">No exhibits added yet</p>
                <button 
                  onClick={addExhibit}
                  className="font-mono-dm text-xs text-[#b8974a] hover:text-[#1e2d4a] transition-colors cursor-pointer"
                >
                  + Add your first exhibit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {docket.exhibits.map((ex, i) => {
                  const categoryStyle = getCategoryStyle(ex.category);
                  return (
                    <div key={ex.id} className="border border-[#e4ddd0] p-4 bg-[#faf6ee] rounded relative">
                      <button
                        onClick={() => removeExhibit(i)}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove exhibit"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      
                      <div className="flex items-start justify-between mb-3 pr-6">
                        <div className="flex items-center gap-2">
                          <FiFileText className="text-[#b8974a]" size={18} />
                          <span className="font-mono-dm text-sm font-semibold text-[#b8974a]">{ex.exhibitId}</span>
                        </div>
                        <span 
                          className="px-2 py-1 text-xs font-mono-dm uppercase rounded"
                          style={{ background: categoryStyle.bg, color: categoryStyle.color, border: categoryStyle.border }}
                        >
                          {ex.category}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Title *</label>
                        <input
                          type="text"
                          value={ex.title}
                          onChange={(e) => updateExhibit(i, "title", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                          placeholder="Enter exhibit title..."
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Description (Optional)</label>
                        <textarea
                          value={ex.description || ""}
                          onChange={(e) => updateExhibit(i, "description", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white rounded"
                          rows={2}
                          placeholder="Brief description of this exhibit..."
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Category</label>
                        <select
                          value={ex.category}
                          onChange={(e) => updateExhibit(i, "category", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer rounded"
                        >
                          {EXHIBIT_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mt-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">File</label>
                        {ex.fileUrl ? (
                          <div className="flex items-center justify-between p-2 bg-[#ede8dc] rounded">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FiFileText size={14} className="text-[#b8974a] flex-shrink-0" />
                              <span className="font-garamond text-sm text-[#1e2d4a] truncate">{ex.title || "File"}</span>
                              <span className="font-mono-dm text-xs text-[#9a8870] flex-shrink-0">
                                ({(ex.fileSize / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <a 
                                href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${ex.fileUrl}`}
                                target="_blank" 
                                className="text-[#b8974a] text-xs hover:underline cursor-pointer"
                              >
                                View
                              </a>
                              <button
                                onClick={() => {
                                  const fileInput = document.createElement('input');
                                  fileInput.type = 'file';
                                  fileInput.onchange = (e) => handleFileUpload(i, e.target.files[0]);
                                  fileInput.click();
                                }}
                                className="text-[#1e2d4a] text-xs hover:text-[#b8974a] cursor-pointer"
                              >
                                Replace
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              onChange={(e) => handleFileUpload(i, e.target.files[0])}
                              className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm bg-white cursor-pointer rounded"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv"
                            />
                            {ex.isUploading && (
                              <div className="flex items-center gap-2 mt-2">
                                <div className="animate-spin rounded-full h-3 w-3 border-2 border-[#b8974a] border-t-transparent"></div>
                                <span className="font-mono-dm text-xs text-[#9a8870]">Uploading...</span>
                              </div>
                            )}
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