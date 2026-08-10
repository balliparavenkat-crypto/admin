"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Bell, Plus, X } from "lucide-react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const handleAddBulletin = (e: React.FormEvent) => {
    e.preventDefault();
    const newObj = {
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      status: "PUBLISHED",
      publishDate: new Date().toISOString().substring(0, 10),
    };
    setAnnouncements([newObj, ...announcements]);
    setFormData({ title: "", message: "" });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Platform Announcements & Bulletins</h1>
          <p className="text-xs text-slate-700 font-medium">Broadcast important news, deadline extensions, and updates to attendees</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit hover:scale-[1.02] transition-transform"
        >
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

      {/* Create Bulletin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">Create Announcement Bulletin</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBulletin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Bulletin Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Schedule Announcement for Day 2"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Bulletin Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type full announcement message..."
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
                  Publish Bulletin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
