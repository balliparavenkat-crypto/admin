"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Mic, Plus, X, Edit, Trash2 } from "lucide-react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    institution: "",
    country: "USA",
    bio: "",
    imageUrl: "",
    conferenceAcronym: "DVGS2026",
  });

  const handleOpenCreate = () => {
    setEditingSpeaker(null);
    setFormData({
      name: "",
      email: "",
      designation: "",
      institution: "",
      country: "USA",
      bio: "",
      imageUrl: "",
      conferenceAcronym: "DVGS2026",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sp: any) => {
    setEditingSpeaker(sp);
    setFormData({
      name: sp.name,
      email: sp.email,
      designation: sp.designation,
      institution: sp.institution,
      country: sp.country,
      bio: sp.bio,
      imageUrl: sp.imageUrl,
      conferenceAcronym: sp.conferenceAcronym,
    });
    setIsModalOpen(true);
  };

  const handleDeleteSpeaker = (id: number) => {
    setSpeakers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSaveSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpeaker) {
      setSpeakers((prev) =>
        prev.map((s) => (s.id === editingSpeaker.id ? { ...s, ...formData } : s))
      );
    } else {
      const newObj = {
        id: Date.now(),
        ...formData,
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
      };
      setSpeakers([newObj, ...speakers]);
    }
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Keynote & Session Speakers</h1>
          <p className="text-xs text-slate-700 font-medium">Manage conference speakers, biographies, designations, and session assignments</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add Speaker
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {speakers.map((s) => (
          <div key={s.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm flex gap-4 relative group">
            <img src={s.imageUrl} alt={s.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-[#0D1117] text-base">{s.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {s.conferenceAcronym}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="p-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                    title="Edit Speaker"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteSpeaker(s.id)}
                    className="p-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
                    title="Delete Speaker"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  </button>
                </div>
              </div>
              <span className="text-xs text-amber-700 font-extrabold block">{s.designation}</span>
              <span className="text-xs text-slate-700 font-bold block">{s.institution} ({s.country})</span>
              <p className="text-xs text-slate-600 font-medium line-clamp-2 pt-2 border-t border-slate-200">{s.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Speaker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">
                {editingSpeaker ? "Edit Speaker Profile" : "Add New Keynote / Speaker"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSpeaker} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Speaker Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Yann LeCun"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="Chief AI Scientist"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Institution / Org *</label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Meta AI / NYU"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Headshot Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Pioneer in Turing Award research..."
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
                  {editingSpeaker ? "Save Updates" : "Add Speaker"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
