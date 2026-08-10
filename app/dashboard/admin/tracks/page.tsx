"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Layers, Plus, X } from "lucide-react";

export default function TracksPage() {
  const [tracks, setTracks] = useState<any[]>([
    { id: 1, name: "Natural Language Processing & LLMs", description: "Topics related to GPTs, translation, transformers, and reasoning.", paperCount: 5 },
    { id: 2, name: "Computer Vision & Robotics", description: "Topics related to object detection, generative video, and locomotion.", paperCount: 4 },
    { id: 3, name: "AI Safety & Alignment", description: "Topics related to RLHF, governance, and cybersecurity.", paperCount: 3 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const newObj = {
      id: tracks.length + 1,
      name: formData.name,
      description: formData.description,
      paperCount: 0,
    };
    setTracks([...tracks, newObj]);
    setFormData({ name: "", description: "" });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Scientific Tracks & Topics</h1>
          <p className="text-xs text-slate-700 font-medium">Configure research tracks for paper submission classification</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit hover:scale-[1.02] transition-transform"
        >
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

      {/* Add Track Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">Add Scientific Research Track</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTrack} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Track Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Quantum Computing & Cryptography"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Track Scope & Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Sub-topics, keywords, paper guidelines..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
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
                  Create Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
