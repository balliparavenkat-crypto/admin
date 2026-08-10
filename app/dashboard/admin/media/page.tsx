"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Upload, Copy, Check, X, Trash2, Image as ImageIcon } from "lucide-react";

export default function MediaPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [mediaItems, setMediaItems] = useState<any[]>([
    { id: 1, name: "summit_banner_ai2026.png", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop", category: "BANNER", size: "1.4 MB" },
    { id: 2, name: "nvidia_logo.png", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop", category: "SPONSOR", size: "320 KB" },
    { id: 3, name: "dr_manning_headshot.jpg", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", category: "SPEAKER", size: "480 KB" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    category: "BANNER",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          name: prev.name || file.name,
          url: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = (id: number) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUploadAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const newObj = {
      id: Date.now(),
      name: formData.name || "uploaded_asset.png",
      url: formData.url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop",
      category: formData.category,
      size: "850 KB",
    };
    setMediaItems([newObj, ...mediaItems]);
    setFormData({ name: "", url: "", category: "BANNER" });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Centralized Media Library</h1>
          <p className="text-xs text-slate-700 font-medium">Upload photos from device gallery, store, and manage summit banners, speaker headshots, sponsor logos, and PDFs</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit hover:scale-[1.02] transition-transform"
        >
          <Upload className="w-4 h-4 stroke-[3]" /> Upload Asset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaItems.map((m) => (
          <div key={m.id} className="p-4 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-3 group relative">
            <img src={m.url} alt={m.name} className="w-full h-40 rounded-2xl object-cover border border-slate-200" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {m.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-700 font-bold font-mono">{m.size}</span>
                <button
                  onClick={() => handleDeleteMedia(m.id)}
                  className="p-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
                  title="Delete Media Asset"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                </button>
              </div>
            </div>
            <span className="font-extrabold text-[#0D1117] text-xs block truncate">{m.name}</span>
            <button
              onClick={() => copyUrl(m.id, m.url)}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-300"
            >
              {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#1E40AF]" />}
              {copiedId === m.id ? "Copied URL" : "Copy Image URL"}
            </button>
          </div>
        ))}
      </div>

      {/* Upload Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">Upload Media Asset from Device</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadAsset} className="space-y-4">
              {/* File Upload Box */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#0D1117] block flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#1E40AF]" /> Choose Image / File from Local Gallery *
                </label>

                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl cursor-pointer text-xs font-bold text-slate-800 flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4 text-[#1E40AF]" /> Upload File from Gallery
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">Or paste image URL</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Asset Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. quantum_key_banner.png"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Asset Link / Data URL *</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              {formData.url && (
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-200 rounded-2xl">
                  <img src={formData.url} alt="Preview" className="w-16 h-12 rounded-xl object-cover border border-slate-300" />
                  <span className="text-xs font-bold text-[#0D1117]">Asset Preview Ready</span>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                >
                  <option value="BANNER">SUMMIT BANNER</option>
                  <option value="SPEAKER">SPEAKER HEADSHOT</option>
                  <option value="SPONSOR">SPONSOR LOGO</option>
                  <option value="DOCUMENT">DOCUMENT / PDF</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-bold shadow-md"
                >
                  Upload & Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
