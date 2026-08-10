"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Clock, Plus, MapPin, Mic, Calendar } from "lucide-react";

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

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Sessions & Summit Timeline</h1>
          <p className="text-xs text-slate-400">Visual schedule builder for keynotes, workshops, and presentation panels</p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg w-fit">
          <Plus className="w-4 h-4 stroke-[3]" /> Add Session
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((s) => (
          <div key={s.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px]">
                  {s.sessionType}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent-cyan" /> {s.time}
                </span>
              </div>
              <h3 className="font-bold text-white text-base">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
            </div>

            <div className="space-y-1 text-right md:min-w-[200px]">
              <span className="block text-xs font-bold text-emerald-400">{s.speakerName}</span>
              <span className="text-[11px] text-slate-400 flex items-center justify-end gap-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> {s.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
