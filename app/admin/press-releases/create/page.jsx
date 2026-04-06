// app/admin/press-releases/create/page.jsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  FiSave, FiArrowLeft, FiPlus, FiTrash2, FiInfo, 
  FiUpload, FiImage, FiX, FiLink, FiCheck
} from "react-icons/fi";
import adminAPI from "@/services/adminApi";

const CATEGORIES = [
  "Announcement",
  "Report",
  "Partnership",
  "New Initiative",
  "Update",
  "Statement"
];

const TAGS = [
  "Platform Launch",
  "Public Record",
  "Right of Reply",
  "Transparency",
  "Annual Report",
  "Accountability",
  "Media Literacy",
  "Partnership",
  "Editorial Board",
  "Media Watch"
];

export default function CreatePressReleasePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [imageUploadMethod, setImageUploadMethod] = useState("url"); // "url" or "upload"
  const fileInputRef = useRef(null);
  
  const [release, setRelease] = useState({
    title: "",
    category: "Announcement",
    date: new Date().toISOString().split('T')[0],
    excerpt: "",
    content: "",
    author: "Journalism Society Editorial Team",
    tags: [],
    featuredImage: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState(TAGS);

  const addTag = (tag) => {
    if (tag && !release.tags.includes(tag) && release.tags.length < 5) {
      setRelease({ ...release, tags: [...release.tags, tag] });
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setRelease({ ...release, tags: release.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "press-release");
      
      // Simulate progress (you can replace with actual upload progress)
      const interval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);
      
      const result = await adminAPI.uploadPressReleaseImage(formData);
      
      clearInterval(interval);
      setUploadProgress(100);
      
      if (result.success) {
        setRelease({ ...release, featuredImage: result.fileUrl });
        setImagePreview(result.fileUrl);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, or WebP)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      handleImageUpload(file);
    }
  };

  const handleImageUrlChange = (url) => {
    setRelease({ ...release, featuredImage: url });
    setImagePreview(url);
  };

  const removeImage = () => {
    setRelease({ ...release, featuredImage: "" });
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!release.title.trim()) {
      alert("Please add a title");
      return;
    }
    if (!release.excerpt.trim()) {
      alert("Please add an excerpt");
      return;
    }
    if (!release.content.trim()) {
      alert("Please add content");
      return;
    }

    setSaving(true);
    try {
      await adminAPI.createPressRelease(release);
      alert("✅ Press release created successfully!");
      router.push("/admin/press-releases");
    } catch (error) {
      console.error("Error creating press release:", error);
      alert(error.response?.data?.message || "Failed to create press release");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[#9a8870] hover:text-[#1e2d4a] mb-2 cursor-pointer">
            <FiArrowLeft size={16} /> Back to Press Releases
          </button>
          <h1 className="font-playfair font-black text-2xl md:text-3xl text-[#1e2d4a]">Create Press Release</h1>
          <p className="font-garamond text-[#7a6e5e]">Add a new official announcement or statement</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-[#1e2d4a] text-[#f5f0e8] px-4 md:px-6 py-2 md:py-3 font-mono-dm text-xs uppercase hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer">
          <FiSave size={14} /> {saving ? "Creating..." : "Publish Release"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Title *</label>
            <input
              type="text"
              value={release.title}
              onChange={(e) => setRelease({ ...release, title: e.target.value })}
              className="w-full border border-[#d4c8b4] p-3 font-garamond text-lg focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
              placeholder="Enter press release title..."
            />
          </div>

          {/* Excerpt */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Excerpt / Summary *</label>
            <textarea
              value={release.excerpt}
              onChange={(e) => setRelease({ ...release, excerpt: e.target.value })}
              className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
              rows={3}
              placeholder="Brief summary of the press release..."
            />
            <p className="font-mono-dm text-xs text-[#9a8870] mt-1">This will appear in the press release listing page</p>
          </div>

          {/* Content */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Full Content *</label>
            <textarea
              value={release.content}
              onChange={(e) => setRelease({ ...release, content: e.target.value })}
              className="w-full border border-[#d4c8b4] p-3 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
              rows={15}
              placeholder="Write the full press release content here. You can use HTML tags for formatting (e.g., <h3>, <p>, <ul>, <blockquote>)..."
            />
            <div className="mt-2 p-3 bg-[#faf6ee] border border-[#d4c8b4]">
              <div className="flex items-center gap-2 mb-2">
                <FiInfo size={14} className="text-[#b8974a]" />
                <p className="font-mono-dm text-xs text-[#9a8870]">Formatting Tips</p>
              </div>
              <p className="font-garamond text-xs text-[#7a6e5e]">
                Use <code className="bg-[#ede8dc] px-1">&lt;h3&gt;</code> for subheadings,{' '}
                <code className="bg-[#ede8dc] px-1">&lt;p&gt;</code> for paragraphs,{' '}
                <code className="bg-[#ede8dc] px-1">&lt;ul&gt;</code> for lists, and{' '}
                <code className="bg-[#ede8dc] px-1">&lt;blockquote&gt;</code> for quotes.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Category & Date */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <div className="mb-4">
              <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Category *</label>
              <select
                value={release.category}
                onChange={(e) => setRelease({ ...release, category: e.target.value })}
                className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Publication Date *</label>
              <input
                type="date"
                value={release.date}
                onChange={(e) => setRelease({ ...release, date: e.target.value })}
                className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white cursor-pointer"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Featured Image</label>
            
            {/* Upload Method Toggle */}
            <div className="flex gap-2 mb-4 border-b border-[#e4ddd0] pb-3">
              <button
                type="button"
                onClick={() => setImageUploadMethod("url")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-mono-dm uppercase tracking-wider transition-colors ${
                  imageUploadMethod === "url" 
                    ? "text-[#b8974a] border-b-2 border-[#b8974a]" 
                    : "text-[#9a8870] hover:text-[#1e2d4a] cursor-pointer"
                }`}
              >
                <FiLink size={14} />
                Image URL
              </button>
              <button
                type="button"
                onClick={() => setImageUploadMethod("upload")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-mono-dm uppercase tracking-wider transition-colors ${
                  imageUploadMethod === "upload" 
                    ? "text-[#b8974a] border-b-2 border-[#b8974a]" 
                    : "text-[#9a8870] hover:text-[#1e2d4a] cursor-pointer"
                }`}
              >
                <FiUpload size={14} />
                Upload Image
              </button>
            </div>

            {/* Image Preview */}
            {(imagePreview || release.featuredImage) && (
              <div className="mb-4 relative">
               
                <img
                    src={
                        (imagePreview || release.featuredImage)?.startsWith("/uploads/press-releases/")
                        ? `${process.env.NEXT_PUBLIC_API_URL}${imagePreview || release.featuredImage}`
                        : (imagePreview || release.featuredImage)
                    }
                    alt="Preview"
                    className="w-full h-48 object-cover rounded border border-[#d4c8b4]"
                    />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiX size={14} />
                </button>
              </div>
            )}

            {/* URL Input Method */}
            {imageUploadMethod === "url" && (
              <div>
                <input
                  type="url"
                  value={release.featuredImage}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="font-mono-dm text-xs text-[#9a8870] mt-2">
                  Enter a direct URL to an image (JPG, PNG, WebP)
                </p>
              </div>
            )}

            {/* File Upload Method */}
            {imageUploadMethod === "upload" && (
              <div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#c4b89a] bg-[#faf6ee] p-6 text-center cursor-pointer hover:bg-[#ede8dc] transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <FiImage size={32} className="mx-auto text-[#9a8870] mb-2" />
                  <p className="font-garamond text-sm text-[#1e2d4a]">Click to upload or drag and drop</p>
                  <p className="font-mono-dm text-xs text-[#9a8870] mt-1">
                    JPEG, PNG, WebP (max 5MB)
                  </p>
                </div>
                
                {uploading && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-mono-dm text-[#9a8870]">Uploading...</span>
                      <span className="font-mono-dm text-[#b8974a]">{uploadProgress}%</span>
                    </div>
                    <div className="h-1 bg-[#e4ddd0] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#b8974a] transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Author */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Author</label>
            <input
              type="text"
              value={release.author}
              onChange={(e) => setRelease({ ...release, author: e.target.value })}
              className="w-full border border-[#d4c8b4] p-2 font-garamond focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
            />
          </div>

          {/* Tags */}
          <div className="border border-[#d4c8b4] bg-white p-4 md:p-6">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">Tags (max 5)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag(tagInput)}
                placeholder="Add a tag..."
                className="flex-1 border border-[#d4c8b4] p-2 font-garamond text-sm focus:outline-none focus:border-[#1e2d4a] text-[#1e2d4a] bg-white"
              />
              <button
                onClick={() => addTag(tagInput)}
                className="px-3 py-2 bg-[#1e2d4a] text-white hover:bg-[#2a3f6a] transition-colors cursor-pointer"
              >
                <FiPlus size={14} />
              </button>
            </div>

            {/* Suggested Tags */}
            <div className="mb-3">
              <p className="font-mono-dm text-xs text-[#9a8870] mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.filter(t => !release.tags.includes(t)).slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="font-mono-dm text-[0.5rem] tracking-[0.08em] uppercase text-[#7a6e5e] border border-[#c4b89a] px-2 py-0.5 hover:bg-[#ede8dc] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tags */}
            {release.tags.length > 0 && (
              <div>
                <p className="font-mono-dm text-xs text-[#9a8870] mb-2">Selected tags:</p>
                <div className="flex flex-wrap gap-2">
                  {release.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 font-mono-dm text-[0.5rem] tracking-[0.08em] uppercase bg-[#1e2d4a] text-[#f5f0e8] px-2 py-0.5">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-[#b8974a]">
                        <FiTrash2 size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}