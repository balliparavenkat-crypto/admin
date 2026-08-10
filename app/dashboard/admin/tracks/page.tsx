"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Layers, Plus, Edit, Trash2 } from "lucide-react";

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
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Scientific Tracks & Topics</h1>
          <p className="text-xs text-slate-400">Configure research tracks for paper submission classification</p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg w-fit">
          <Plus className="w-4 h-4 stroke-[3]" /> Add Track
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tracks.map((t) => (
          <div key={t.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-accent-cyan bg-accent-blue/10 px-2 py-0.5 rounded border border-accent-blue/20">
                Track #{t.id}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">{t.paperCount} Papers</span>
            </div>
            <h3 className="font-bold text-white text-base leading-snug">{t.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
