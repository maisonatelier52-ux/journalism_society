


// // app/admin/create-docket/[id]/page.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { FiSave, FiArrowLeft, FiPlus, FiTrash2, FiFileText, FiCheckCircle } from "react-icons/fi";
// import adminAPI from "@/services/adminApi";

// export default function CreateDocketPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [submission, setSubmission] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
  
//   const [docket, setDocket] = useState({
//     title: "",
//     summary: { claim: "", context: "", whyMatters: "" },
//     response: { body: "", type: "" },
//     timeline: [],
//     exhibits: [],
//     status: "Open",
//   });

//   useEffect(() => {
//     fetchSubmission();
//   }, [params.id]);

//   const fetchSubmission = async () => {
//     try {
//       const response = await adminAPI.getSubmission(params.id);
//       const sub = response.submission;
//       setSubmission(sub);
      
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
//         exhibits: (sub.files || []).map((file, i) => ({
//           exhibitId: `EX-${String(i + 1).padStart(2, "0")}`,
//           title: file.originalName,
//           fileUrl: `/uploads/submissions/${file.filename}`,
//           fileType: file.fileType,
//           fileSize: file.fileSize,
//           category: "Evidence",
//         })),
//         status: "Open",
//       });
//     } catch (error) {
//       console.error("Error fetching submission:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

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

//   const handleSave = async () => {
//     if (!docket.title.trim()) { 
//       alert("Please add a title"); 
//       return; 
//     }
//     if (!docket.summary.claim.trim()) { 
//       alert("Please add a claim summary"); 
//       return; 
//     }
    
//     setSaving(true);
//     try {
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
//           exhibits: docket.exhibits,
//           status: docket.status,
//         }
//       };
      
//       await adminAPI.createDocket(submissionData);
//       alert("✅ Docket created and published successfully!");
//       router.push("/admin/dockets");
//     } catch (error) {
//       console.error("Error creating docket:", error);
//       alert(error.response?.data?.message || "Failed to create docket");
//     } finally {
//       setSaving(false);
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
//     <div className="admin-page">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//         <div>
//           <button onClick={() => router.back()} className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a] mb-2 cursor-pointer">
//             <FiArrowLeft size={16} /> Back
//           </button>
//           <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Create Docket</h1>
//           <p className="font-garamond text-[#7a6e5e]">From: {submission?.respondentName}</p>
//         </div>
//         <button onClick={handleSave} disabled={saving}
//           className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer">
//           <FiSave size={14} /> {saving ? "Publishing..." : "Publish Docket"}
//         </button>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           {/* Title and Status Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
//             <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Title *</label>
//             <input 
//               type="text" 
//               value={docket.title} 
//               onChange={(e) => setDocket({ ...docket, title: e.target.value })}
//               className="w-full border border-[#d4c8b4] p-3 font-garamond text-lg focus:outline-none focus:border-[#1e2d4a] mb-4 text-[#1e2d4a] bg-white"
//               placeholder="Enter docket title..."
//             />

//             <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Status</label>
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
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Response (From User)</h2>
//             <textarea 
//               value={docket.response.body} 
//               onChange={(e) => setDocket({ ...docket, response: { ...docket.response, body: e.target.value } })}
//               className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
//               rows={10} 
//             />
//           </div>
//         </div>

//         <div className="space-y-6">
//           {/* Timeline Section */}
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
//             <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//               <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Timeline</h2>
//               <button 
//                 onClick={addTimelineEntry}
//                 className="flex items-center gap-1 text-[#b8974a] text-sm hover:text-[#1e2d4a] transition-colors cursor-pointer"
//               >
//                 <FiPlus size={14} /> Add Event
//               </button>
//             </div>
//             {docket.timeline.length === 0 ? (
//               <p className="text-center text-[#9a8870] py-4">No timeline events added yet. Click "Add Event" to create one.</p>
//             ) : (
//               docket.timeline.map((entry, i) => (
//                 <div key={i} className="border-l-2 border-[#b8974a] pl-4 relative my-8">
//                   <button 
//                     onClick={() => removeTimelineEntry(i)}
//                     className="absolute -right-5 top-0 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
//                   >
//                     <FiTrash2 size={17} />
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
//                     className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
//                   />
//                   <textarea 
//                     value={entry.description} 
//                     onChange={(e) => updateTimelineEntry(i, "description", e.target.value)}
//                     placeholder="Description" 
//                     className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
//                     rows={2}
//                   />
//                   <select
//                     value={entry.type}
//                     onChange={(e) => updateTimelineEntry(i, "type", e.target.value)}
//                     className="w-full border border-[#d4c8b4] p-2 mt-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
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
//           <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
//             <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Exhibits</h2>
//             {docket.exhibits.length === 0 ? (
//               <p className="text-center text-[#9a8870] py-4">No exhibits attached.</p>
//             ) : (
//               docket.exhibits.map((ex, i) => (
//                 <div key={i} className="flex items-center gap-2 p-2 bg-[#ede8dc] mb-2 rounded flex-wrap">
//                   <FiFileText className="text-[#b8974a] flex-shrink-0" />
//                   <span className="font-mono-dm text-xs text-[#b8974a] flex-shrink-0">{ex.exhibitId}</span>
//                   <span className="font-garamond text-sm flex-1 text-[#1e2d4a] break-all">{ex.title}</span>
//                   <a 
//                     href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${ex.fileUrl}`}
//                     target="_blank" 
//                     className="text-[#1e2d4a] text-xs hover:underline flex-shrink-0"
//                   >
//                     View
//                   </a>
//                 </div>
//               ))
//             )}
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

// app/admin/create-docket/[id]/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FiSave, FiArrowLeft, FiPlus, FiTrash2, FiFileText, 
  FiCheckCircle, FiEdit2, FiUpload, FiX, FiFolder 
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

export default function CreateDocketPage() {
  const params = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
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
      
      // Convert timeline from submission format to docket format
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
        exhibits: (sub.files || []).map((file, i) => ({
          id: Date.now() + Math.random(),
          exhibitId: `EX-${String(i + 1).padStart(2, "0")}`,
          title: file.originalName,
          description: "",
          fileUrl: `/uploads/submissions/${file.filename}`,
          fileType: file.fileType,
          fileSize: file.fileSize,
          category: "Evidence",
          pages: null,
          isNew: false,
        })),
        status: "Open",
      });
    } catch (error) {
      console.error("Error fetching submission:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new timeline entry
  const addTimelineEntry = () => {
    setDocket({
      ...docket,
      timeline: [
        ...docket.timeline,
        { date: "", event: "", description: "", type: "response" }
      ]
    });
  };

  // Update timeline entry
  const updateTimelineEntry = (index, field, value) => {
    const updated = [...docket.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setDocket({ ...docket, timeline: updated });
  };

  // Remove timeline entry
  const removeTimelineEntry = (index) => {
    const updated = docket.timeline.filter((_, i) => i !== index);
    setDocket({ ...docket, timeline: updated });
  };

  // Add new exhibit
  const addExhibit = () => {
    const newExhibit = {
      id: Date.now() + Math.random(),
      exhibitId: `EX-${String(docket.exhibits.length + 1).padStart(2, "0")}`,
      title: "New Exhibit",
      description: "",
      fileUrl: "",
      fileType: "",
      fileSize: 0,
      category: "Evidence",
      pages: null,
      isNew: true,
      isUploading: false,
    };
    setDocket({
      ...docket,
      exhibits: [...docket.exhibits, newExhibit]
    });
  };

  // Remove exhibit
  const removeExhibit = (index) => {
    const updated = docket.exhibits.filter((_, i) => i !== index);
    // Re-number exhibit IDs
    const renumbered = updated.map((ex, i) => ({
      ...ex,
      exhibitId: `EX-${String(i + 1).padStart(2, "0")}`
    }));
    setDocket({ ...docket, exhibits: renumbered });
  };

  // Update exhibit
  const updateExhibit = (index, field, value) => {
    const updated = [...docket.exhibits];
    updated[index] = { ...updated[index], [field]: value };
    setDocket({ ...docket, exhibits: updated });
  };

  // Handle file upload for exhibit
  const handleFileUpload = async (index, file) => {
    if (!file) return;
    
    // Update uploading state
    const updated = [...docket.exhibits];
    updated[index] = { ...updated[index], isUploading: true };
    setDocket({ ...docket, exhibits: updated });
    
    try {
      const result = await adminAPI.uploadExhibit(file);
      
      if (result.success) {
        // Update exhibit with file info
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
      
      // Reset uploading state
      const resetUpload = [...docket.exhibits];
      resetUpload[index] = { ...resetUpload[index], isUploading: false };
      setDocket({ ...docket, exhibits: resetUpload });
    }
  };

  const handleSave = async () => {
    if (!docket.title.trim()) { 
      alert("Please add a title"); 
      return; 
    }
    if (!docket.summary.claim.trim()) { 
      alert("Please add a claim summary"); 
      return; 
    }
    
    // Check if any exhibits are still uploading
    if (docket.exhibits.some(ex => ex.isUploading)) {
      alert("Please wait for all files to finish uploading.");
      return;
    }
    
    setSaving(true);
    try {
      // Filter out empty exhibits (no file URL)
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
      
      const result = await adminAPI.createDocket(submissionData);
      alert("✅ Docket created and published successfully!");
      router.push("/admin/dockets");
    } catch (error) {
      console.error("Error creating docket:", error);
      alert(error.response?.data?.message || "Failed to create docket");
    } finally {
      setSaving(false);
    }
  };

  // Get category style
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
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a] mb-2 cursor-pointer">
            <FiArrowLeft size={16} /> Back
          </button>
          <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Create Docket</h1>
          <p className="font-garamond text-[#7a6e5e]">From: {submission?.respondentName}</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer">
          <FiSave size={14} /> {saving ? "Publishing..." : "Publish Docket"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Title and Status Section */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Docket Title *</label>
            <input 
              type="text" 
              value={docket.title} 
              onChange={(e) => setDocket({ ...docket, title: e.target.value })}
              className="w-full border border-[#d4c8b4] p-3 font-garamond text-lg focus:outline-none focus:border-[#1e2d4a] mb-4 text-[#1e2d4a] bg-white"
              placeholder="Enter docket title..."
            />

            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Status</label>
            <select 
              value={docket.status} 
              onChange={(e) => setDocket({ ...docket, status: e.target.value })}
              className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
            >
              <option value="Open">Open</option>
              <option value="Under Review">Under Review</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Summary Section */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">
              Summary <span className="text-xs text-[#9a8870]">(Admin writes this)</span>
            </h2>
            <div className="space-y-4">
              <textarea 
                value={docket.summary.claim} 
                onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, claim: e.target.value } })}
                className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                rows={3} 
                placeholder="The Claim *" 
              />
              <textarea 
                value={docket.summary.context} 
                onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, context: e.target.value } })}
                className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                rows={3} 
                placeholder="Context" 
              />
              <textarea 
                value={docket.summary.whyMatters} 
                onChange={(e) => setDocket({ ...docket, summary: { ...docket.summary, whyMatters: e.target.value } })}
                className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                rows={3} 
                placeholder="Why It Matters" 
              />
            </div>
          </div>

          {/* Response Section */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <h2 className="font-playfair font-bold text-lg text-[#1e2d4a] mb-4">Response (From User)</h2>
            <textarea 
              value={docket.response.body} 
              onChange={(e) => setDocket({ ...docket, response: { ...docket.response, body: e.target.value } })}
              className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
              rows={10} 
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Timeline Section */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">Timeline</h2>
              <button 
                onClick={addTimelineEntry}
                className="flex items-center gap-1 text-[#b8974a] text-sm hover:text-[#1e2d4a] transition-colors cursor-pointer"
              >
                <FiPlus size={14} /> Add Event
              </button>
            </div>
            {docket.timeline.length === 0 ? (
              <p className="text-center text-[#9a8870] py-4">No timeline events added yet. Click "Add Event" to create one.</p>
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
                    className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={entry.event} 
                    onChange={(e) => updateTimelineEntry(i, "event", e.target.value)}
                    placeholder="Event title" 
                    className="w-full border border-[#d4c8b4] p-2 mb-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                  />
                  <textarea 
                    value={entry.description} 
                    onChange={(e) => updateTimelineEntry(i, "description", e.target.value)}
                    placeholder="Description" 
                    className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                    rows={2}
                  />
                  <select
                    value={entry.type}
                    onChange={(e) => updateTimelineEntry(i, "type", e.target.value)}
                    className="w-full border border-[#d4c8b4] p-2 mt-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                  >
                    <option value="claim">Claim Published</option>
                    <option value="response">Response Issued</option>
                    <option value="third_party">Third Party Action</option>
                    <option value="correction">Correction Issued</option>
                  </select>
                </div>
              ))
            )}
          </div>

          {/* Exhibits Section - With Add/Remove Functionality */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="font-playfair font-bold text-lg text-[#1e2d4a]">
                  Exhibits <span className="text-xs text-[#9a8870]">(Add or remove files)</span>
                </h2>
                <p className="font-mono-dm text-xs text-[#9a8870] mt-1">
                  {docket.exhibits.length} exhibit(s)
                </p>
              </div>
              <button 
                onClick={addExhibit}
                className="flex items-center gap-1 bg-[#1e2d4a] text-white px-3 py-1.5 text-xs font-mono-dm uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors cursor-pointer"
              >
                <FiPlus size={12} /> Add Exhibit
              </button>
            </div>
            
            {docket.exhibits.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-[#d4c8b4] bg-[#faf6ee]">
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
                      {/* Remove Button */}
                      <button
                        onClick={() => removeExhibit(i)}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove exhibit"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      
                      {/* Exhibit Header */}
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
                      
                      {/* Exhibit Title - Editable */}
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Title</label>
                        <input
                          type="text"
                          value={ex.title}
                          onChange={(e) => updateExhibit(i, "title", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                          placeholder="Enter exhibit title..."
                        />
                      </div>
                      
                      {/* Exhibit Description - Optional */}
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Description (Optional)</label>
                        <textarea
                          value={ex.description || ""}
                          onChange={(e) => updateExhibit(i, "description", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                          rows={2}
                          placeholder="Brief description of this exhibit..."
                        />
                      </div>
                      
                      {/* Category Selection */}
                      <div className="mb-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">Category</label>
                        <select
                          value={ex.category}
                          onChange={(e) => updateExhibit(i, "category", e.target.value)}
                          className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
                        >
                          {EXHIBIT_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* File Upload/Display */}
                      <div className="mt-3">
                        <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-1">File</label>
                        {ex.fileUrl ? (
                          <div className="flex items-center justify-between p-2 bg-[#ede8dc] rounded">
                            <div className="flex items-center gap-2">
                              <FiFileText size={14} className="text-[#b8974a]" />
                              <span className="font-garamond text-sm text-[#1e2d4a] truncate max-w-[200px]">{ex.title}</span>
                              <span className="font-mono-dm text-xs text-[#9a8870]">
                                ({(ex.fileSize / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <a 
                                href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${ex.fileUrl}`}
                                target="_blank" 
                                className="text-[#b8974a] text-xs hover:underline"
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
                                className="text-[#1e2d4a] text-xs hover:text-[#b8974a]"
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
                              className="w-full border border-[#d4c8b4] p-2 font-garamond text-sm bg-white cursor-pointer"
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
          <div className="border border-[#d4c8b4] bg-[#faf6ee] p-4 md:p-6 text-center">
            <FiCheckCircle size={32} className="mx-auto text-[#b8974a] mb-3" />
            <p className="font-garamond text-sm text-[#7a6e5e]">Review all information before publishing.</p>
            <p className="font-mono-dm text-xs text-[#9a8870] mt-2">This will create a permanent public docket</p>
          </div>
        </div>
      </div>
    </div>
  );
}