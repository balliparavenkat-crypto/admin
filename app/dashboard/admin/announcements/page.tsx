"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Bell, Plus } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([
    {
      id: 1,
      title: "Paper Submission Deadline Extended!",
      message: "The paper submission deadline for DVGS2026 has been extended by 2 weeks until August 30.",
      status: "PUBLISHED",
      publishDate: "2026-08-01",
    },
    {
      id: 2,
      title: "Early Bird Registration Discount Available",
      message: "Register before September 15 to receive a 20% early bird delegate fee discount.",
      status: "PUBLISHED",
      publishDate: "2026-08-05",
    },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Platform Announcements & Bulletins</h1>
          <p className="text-xs text-slate-700 font-medium">Broadcast important news, deadline extensions, and updates to attendees</p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit">
          <Plus className="w-4 h-4 stroke-[3]" /> Create Bulletin
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((a) => (
          <div key={a.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] uppercase border border-emerald-300">
                {a.status}
              </span>
              <span className="text-[10px] font-mono text-slate-700 font-bold">{a.publishDate}</span>
            </div>
            <h3 className="font-extrabold text-[#0D1117] text-base">{a.title}</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{a.message}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
