"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Clock, Plus, MapPin, X } from "lucide-react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([
    {
      id: 1,
      title: "Keynote: The Future of Large Language Models",
      description: "Opening keynote speech by Dr. Christopher Manning focusing on scaling laws.",
      time: "09:00 AM - 10:30 AM",
      location: "Auditorium A",
      speakerName: "Dr. Christopher Manning",
      sessionType: "KEYNOTE",
    },
    {
      id: 2,
      title: "Panel: Image Understanding and Generative Media",
      description: "Interactive panel chaired by Dr. Fei-Fei Li discussing generative vision systems.",
      time: "11:00 AM - 12:30 PM",
      location: "Grand Ballroom",
      speakerName: "Dr. Fei-Fei Li",
      sessionType: "PANEL",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "02:00 PM - 03:30 PM",
    location: "Auditorium B",
    speakerName: "",
    sessionType: "WORKSHOP",
  });

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newObj = {
      id: Date.now(),
      ...formData,
    };
    setSessions([...sessions, newObj]);
    setFormData({
      title: "",
      description: "",
      time: "02:00 PM - 03:30 PM",
      location: "Auditorium B",
      speakerName: "",
      sessionType: "WORKSHOP",
    });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Sessions & Summit Timeline</h1>
          <p className="text-xs text-slate-700 font-medium">Visual schedule builder for keynotes, workshops, and presentation panels</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add Session
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((s) => (
          <div key={s.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold text-[10px] uppercase border border-amber-300">
                  {s.sessionType}
                </span>
                <span className="text-xs font-mono text-slate-700 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#1E40AF]" /> {s.time}
                </span>
              </div>
              <h3 className="font-bold text-[#0D1117] text-base">{s.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{s.description}</p>
            </div>

            <div className="space-y-1 text-right md:min-w-[200px]">
              <span className="block text-xs font-black text-emerald-800">{s.speakerName}</span>
              <span className="text-[11px] text-slate-700 font-bold flex items-center justify-end gap-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-rose-600" /> {s.location}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Session Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">Schedule New Session</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSession} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Session Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Workshop: Hands-on Fine-tuning LLMs"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Session Type</label>
                  <select
                    value={formData.sessionType}
                    onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                  >
                    <option value="KEYNOTE">KEYNOTE</option>
                    <option value="PANEL">PANEL</option>
                    <option value="WORKSHOP">WORKSHOP</option>
                    <option value="ORAL_PRESENTATION">ORAL PRESENTATION</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Time Slot *</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="02:00 PM - 03:30 PM"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Speaker / Chair *</label>
                  <input
                    type="text"
                    required
                    value={formData.speakerName}
                    onChange={(e) => setFormData({ ...formData, speakerName: e.target.value })}
                    placeholder="Dr. Marc DuPont"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Hall / Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Auditorium B"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
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
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
