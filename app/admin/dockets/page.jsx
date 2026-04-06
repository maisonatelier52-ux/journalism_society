// app/admin/dockets/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiEye, FiEdit, FiTrash2, FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";
import adminAPI from "@/services/adminApi";

const formatDate = (date) => new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function DocketsPage() {
  const [dockets, setDockets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [docketToDelete, setDocketToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteResult, setDeleteResult] = useState(null);

  useEffect(() => {
    fetchDockets();
  }, []);

  const fetchDockets = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getDockets();
      setDockets(response.dockets);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (docket) => {
    setDocketToDelete(docket);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!docketToDelete) return;
    
    setDeleting(true);
    try {
      const result = await adminAPI.deleteDocket(docketToDelete._id);
      setDeleteResult(result);
      
      // Refresh the list
      await fetchDockets();
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowDeleteModal(false);
        setDocketToDelete(null);
        setDeleteResult(null);
      }, 2000);
      
    } catch (error) {
      console.error("Error deleting docket:", error);
      alert("Failed to delete docket");
      setShowDeleteModal(false);
      setDocketToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8974a]"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-playfair font-black text-3xl text-[#1e2d4a] mb-2">Dockets</h1>
      <p className="font-garamond text-[#7a6e5e] mb-8">Manage published dockets</p>

      <div className="border border-[#d4c8b4] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#faf6ee] border-b border-[#e4ddd0]">
              <tr>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Docket ID</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Title</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Status</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Date</th>
                <th className="text-left py-3 px-4 font-mono-dm text-xs text-[#9a8870] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dockets.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-12 font-garamond text-[#9a8870]">No dockets found</td></tr>
              ) : (
                dockets.map((docket) => (
                  <tr key={docket._id} className="border-b border-[#e4ddd0] hover:bg-[#faf6ee]">
                    <td className="py-3 px-4"><span className="font-mono-dm text-sm text-[#b8974a]">{docket.docketId}</span></td>
                    <td className="py-3 px-4"><p className="font-garamond text-sm text-[#1e2d4a]">{docket.response?.title}</p></td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-mono-dm ${
                        docket.status === "Open" ? "bg-green-50 text-green-700 border border-green-200" :
                        docket.status === "Under Review" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                        "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}>{docket.status}</span>
                    </td>
                    <td className="py-3 px-4"><span className="font-mono-dm text-xs text-[#9a8870]">{formatDate(docket.publishedDate)}</span></td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <Link href={`/dockets/${docket._id}`} target="_blank" className="text-[#b8974a] hover:text-[#1e2d4a]" title="View"><FiEye size={16} /></Link>
                        <Link href={`/admin/dockets/${docket._id}/edit`}><button className="text-[#9a8870] hover:text-[#1e2d4a] cursor-pointer" title="Edit"><FiEdit size={16} /></button></Link>
                        <button 
                          onClick={() => handleDeleteClick(docket)} 
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && docketToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f5f0e8] border-t-4 border-red-500 max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FiAlertTriangle size={20} className="text-red-500" />
                </div>
                <h3 className="font-playfair font-bold text-xl text-[#1e2d4a]">Delete Docket</h3>
              </div>
              
              {deleteResult ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle size={24} className="text-green-600" />
                  </div>
                  <p className="font-playfair font-bold text-lg text-[#1e2d4a] mb-2">Docket Deleted</p>
                  <p className="font-garamond text-sm text-[#7a6e5e] mb-4">
                    Successfully deleted docket <strong>{docketToDelete.docketId}</strong>
                  </p>
                  {deleteResult.details && (
                    <div className="text-xs text-[#9a8870] space-y-1">
                      <p>📰 Media entries: {deleteResult.details.mediaDeleted}</p>
                      <p>📝 Media submissions: {deleteResult.details.mediaSubmissionsDeleted}</p>
                      <p>📄 Documents: {deleteResult.details.documentsDeleted}</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <p className="font-garamond text-[#7a6e5e] mb-4">
                    Are you sure you want to delete docket <strong>{docketToDelete.docketId}</strong>?
                  </p>
                  <p className="font-mono-dm text-xs text-red-600 mb-6">
                    Warning: This will also delete:
                  </p>
                  <ul className="list-disc list-inside text-sm text-[#7a6e5e] mb-6 space-y-1">
                    <li>All media entries linked to this docket</li>
                    <li>All media submissions for this docket</li>
                    <li>All documents (exhibits) linked to this docket</li>
                    <li>The original submission will be marked as rejected</li>
                  </ul>
                  <p className="font-mono-dm text-xs text-red-600 mb-6">This action cannot be undone.</p>
                  
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="font-mono-dm text-xs tracking-widest uppercase border border-[#c4b89a] text-[#7a6e5e] px-4 py-2 hover:bg-[#ede8dc] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      disabled={deleting}
                      className="font-mono-dm text-xs tracking-widest uppercase bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {deleting ? "Deleting..." : "Delete Docket"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}