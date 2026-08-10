"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Upload, Copy, Check } from "lucide-react";

export default function MediaPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [mediaItems, setMediaItems] = useState<any[]>([
    { id: 1, name: "summit_banner_ai2026.png", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop", category: "BANNER", size: "1.4 MB" },
    { id: 2, name: "nvidia_logo.png", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop", category: "SPONSOR", size: "320 KB" },
    { id: 3, name: "dr_manning_headshot.jpg", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", category: "SPEAKER", size: "480 KB" },
  ]);

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Centralized Media Library</h1>
          <p className="text-xs text-slate-700 font-medium">Upload, store, and manage summit banners, speaker headshots, sponsor logos, and PDFs</p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit">
          <Upload className="w-4 h-4 stroke-[3]" /> Upload Asset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaItems.map((m) => (
          <div key={m.id} className="p-4 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-3 group">
            <img src={m.url} alt={m.name} className="w-full h-40 rounded-2xl object-cover border border-slate-200" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {m.category}
              </span>
              <span className="text-[10px] text-slate-700 font-bold font-mono">{m.size}</span>
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
    </AdminLayout>
  );
}
