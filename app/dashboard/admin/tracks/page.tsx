"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Layers, Plus } from "lucide-react";

export default function TracksPage() {
  const [tracks, setTracks] = useState<any[]>([
    { id: 1, name: "Natural Language Processing & LLMs", description: "Topics related to GPTs, translation, transformers, and reasoning.", paperCount: 5 },
    { id: 2, name: "Computer Vision & Robotics", description: "Topics related to object detection, generative video, and locomotion.", paperCount: 4 },
    { id: 3, name: "AI Safety & Alignment", description: "Topics related to RLHF, governance, and cybersecurity.", paperCount: 3 },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Scientific Tracks & Topics</h1>
          <p className="text-xs text-slate-700 font-medium">Configure research tracks for paper submission classification</p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit">
          <Plus className="w-4 h-4 stroke-[3]" /> Add Track
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tracks.map((t) => (
          <div key={t.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Track #{t.id}
              </span>
              <span className="text-xs font-mono text-emerald-800 font-black">{t.paperCount} Papers</span>
            </div>
            <h3 className="font-bold text-[#0D1117] text-base leading-snug">{t.name}</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{t.description}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
