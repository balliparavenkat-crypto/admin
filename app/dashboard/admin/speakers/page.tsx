"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Mic, Plus, Edit, Trash2, Globe, Building } from "lucide-react";

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<any[]>([
    {
      id: 1,
      name: "Dr. Christopher Manning",
      email: "manning@stanford.edu",
      designation: "Professor of Computer Science",
      institution: "Stanford University",
      country: "USA",
      bio: "World-renowned leader in Natural Language Processing and deep learning.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
      conferenceAcronym: "DVGS2026",
    },
    {
      id: 2,
      name: "Dr. Fei-Fei Li",
      email: "feifeili@stanford.edu",
      designation: "Co-Director of HAI",
      institution: "Stanford University",
      country: "USA",
      bio: "Pioneer in computer vision and creator of ImageNet.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      conferenceAcronym: "DVGS2026",
    },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Keynote & Session Speakers</h1>
          <p className="text-xs text-slate-700 font-medium">Manage conference speakers, biographies, designations, and session assignments</p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit">
          <Plus className="w-4 h-4 stroke-[3]" /> Add Speaker
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {speakers.map((s) => (
          <div key={s.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm flex gap-4">
            <img src={s.imageUrl} alt={s.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-300 shadow-sm" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-[#0D1117] text-base">{s.name}</h3>
                <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {s.conferenceAcronym}
                </span>
              </div>
              <span className="text-xs text-[#1E40AF] font-extrabold block">{s.designation}</span>
              <span className="text-xs text-slate-700 font-bold block">{s.institution} ({s.country})</span>
              <p className="text-xs text-slate-600 font-medium line-clamp-2 pt-2 border-t border-slate-200">{s.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
