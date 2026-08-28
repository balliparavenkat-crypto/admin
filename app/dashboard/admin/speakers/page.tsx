"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Mic, Plus, X, Edit, Trash2, Filter, Upload, Image as ImageIcon } from "lucide-react";

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [summitsList, setSummitsList] = useState<any[]>([]);
  const [selectedSummitFilter, setSelectedSummitFilter] = useState("ALL");

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
    type: "Plenary",
  });

  const loadData = () => {
    // 1. Load Summits List from localStorage custom_summits
    let customSummits: any[] = [];
    try {
      const savedSummits = localStorage.getItem("custom_summits");
      if (savedSummits) customSummits = JSON.parse(savedSummits);
    } catch (e) {
      console.error(e);
    }

    const defaultSummits = [
      { acronym: "DVGS2026", title: "D&V Global Summit 2026" },
      { acronym: "ICSCS2026", title: "Sustainable Climate Solutions 2026" },
    ];
    const combinedSummits = [...defaultSummits, ...customSummits];
    setSummitsList(combinedSummits);

    // 2. Load Speakers from localStorage custom_speakers
    let savedSpeakers: any[] = [];
    try {
      const str = localStorage.getItem("custom_speakers");
      if (str) savedSpeakers = JSON.parse(str);
    } catch (e) {
      console.error(e);
    }

    if (savedSpeakers.length === 0) {
      savedSpeakers = [
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
          type: "Plenary",
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
          type: "Plenary",
        },
        {
          id: 3,
          name: "Prof. Steven Chu",
          email: "schu@stanford.edu",
          designation: "Nobel Laureate in Physics",
          institution: "Stanford University",
          country: "USA",
          bio: "Former US Secretary of Energy and Climate Action Pioneer.",
          imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop",
          conferenceAcronym: "ICSCS2026",
          type: "Invited",
        },
      ];
      try {
        localStorage.setItem("custom_speakers", JSON.stringify(savedSpeakers));
      } catch (e) {
        console.error(e);
      }
    }
    setSpeakers(savedSpeakers);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

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
      conferenceAcronym: summitsList[0]?.acronym || "DVGS2026",
      type: "Plenary",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sp: any) => {
    setEditingSpeaker(sp);
    setFormData({
      name: sp.name,
      email: sp.email || "",
      designation: sp.designation || "",
      institution: sp.institution || "",
      country: sp.country || "USA",
      bio: sp.bio || "",
      imageUrl: sp.imageUrl || "",
      conferenceAcronym: sp.conferenceAcronym || "DVGS2026",
      type: sp.type || "Plenary",
    });
    setIsModalOpen(true);
  };

  const syncSpeakersToSummits = (updatedSpeakers: any[]) => {
    try {
      const savedSummitsStr = localStorage.getItem("custom_summits");
      if (savedSummitsStr) {
        const summits: any[] = JSON.parse(savedSummitsStr);
        const updatedSummits = summits.map((summit) => {
          const matching = updatedSpeakers.filter(
            (sp) => sp.conferenceAcronym === summit.acronym || String(sp.conferenceAcronym) === String(summit.id)
          );
          if (matching.length > 0) {
            return { ...summit, speakers: matching };
          }
          return summit;
        });
        localStorage.setItem("custom_summits", JSON.stringify(updatedSummits));
      }
    } catch (e) {
      console.error(e);
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("custom_speakers_updated"));
      window.dispatchEvent(new Event("custom_summits_updated"));
    }
  };

  const handleDeleteSpeaker = (id: number) => {
    const updated = speakers.filter((s) => s.id !== id);
    setSpeakers(updated);
    try {
      localStorage.setItem("custom_speakers", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    syncSpeakersToSummits(updated);
  };

  const handleSaveSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedList: any[] = [];
    if (editingSpeaker) {
      updatedList = speakers.map((s) => (s.id === editingSpeaker.id ? { ...s, ...formData } : s));
    } else {
      const newObj = {
        id: Date.now(),
        ...formData,
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
      };
      updatedList = [newObj, ...speakers];
    }
    setSpeakers(updatedList);
    try {
      localStorage.setItem("custom_speakers", JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
    syncSpeakersToSummits(updatedList);
    setIsModalOpen(false);
  };

  const filteredSpeakers = speakers.filter((s) =>
    selectedSummitFilter === "ALL" ? true : s.conferenceAcronym === selectedSummitFilter
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Keynote & Session Speakers</h1>
          <p className="text-xs text-slate-700 font-medium">Assign and manage speakers with custom headshots per summit / conference</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add Speaker
        </button>
      </div>

      {/* Summit Filter Selector */}
      <div className="p-4 rounded-2xl bg-white border border-[#1E40AF]/15 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#1E40AF]" />
          <span className="text-xs font-bold text-[#0D1117]">Filter Speakers by Summit:</span>
        </div>

        <select
          value={selectedSummitFilter}
          onChange={(e) => setSelectedSummitFilter(e.target.value)}
          className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-extrabold focus:outline-none focus:border-[#1E40AF]"
        >
          <option value="ALL">All Summits</option>
          {summitsList.map((summit, idx) => (
            <option key={idx} value={summit.acronym}>
              {summit.acronym} — {summit.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpeakers.length === 0 ? (
          <div className="col-span-2 p-12 text-center bg-white rounded-3xl border border-[#1E40AF]/15 text-slate-700 font-bold text-xs">
            No speakers assigned to {selectedSummitFilter}. Click "+ Add Speaker" to assign speakers to this summit!
          </div>
        ) : (
          filteredSpeakers.map((s) => (
            <div key={s.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm flex gap-4 relative group">
              <img src={s.imageUrl} alt={s.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-[#0D1117] text-base">{s.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black text-[#1E40AF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {s.conferenceAcronym}
                    </span>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
                      {s.type || "Plenary"}
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
          ))
        )}
      </div>

      {/* Add / Edit Speaker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">
                {editingSpeaker ? "Edit Speaker Profile" : "Add New Keynote / Speaker"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSpeaker} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Assign To Summit *</label>
                  <select
                    value={formData.conferenceAcronym}
                    onChange={(e) => setFormData({ ...formData, conferenceAcronym: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                  >
                    {summitsList.map((summit, idx) => (
                      <option key={idx} value={summit.acronym}>
                        {summit.acronym} — {summit.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Speaker Category *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                  >
                    <option value="Plenary">Plenary Speaker</option>
                    <option value="Invited">Invited Speaker</option>
                    <option value="Fellow">Young Research Fellow</option>
                  </select>
                </div>
              </div>

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

              {/* Speaker Headshot Image Upload Section */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#0D1117] block flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#1E40AF]" /> Speaker Headshot Image *
                </label>

                {/* File Upload Button */}
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl cursor-pointer text-xs font-bold text-slate-800 flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4 text-[#1E40AF]" /> Choose Photo File
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">Or paste image URL below</span>
                </div>

                {/* Direct Image URL Input */}
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                />

                {/* Preset Avatars */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-slate-600 font-bold font-mono">Sample Photos:</span>
                  {[
                    { name: "Speaker 1", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" },
                    { name: "Speaker 2", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" },
                    { name: "Speaker 3", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop" },
                    { name: "Speaker 4", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop" },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: p.url })}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold border border-slate-300"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                {/* Live Image Preview Thumbnail */}
                {formData.imageUrl && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-200 rounded-2xl mt-2">
                    <img src={formData.imageUrl} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-300 shadow-sm" />
                    <div>
                      <span className="text-xs font-bold text-[#0D1117] block">Image Preview Active</span>
                      <span className="text-[10px] text-slate-600 font-mono block truncate max-w-xs">{formData.imageUrl}</span>
                    </div>
                  </div>
                )}
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
