"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Bell, Plus, X, Edit, Trash2 } from "lucide-react";

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
  const [editingBulletin, setEditingBulletin] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const handleOpenCreate = () => {
    setEditingBulletin(null);
    setFormData({ title: "", message: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: any) => {
    setEditingBulletin(a);
    setFormData({ title: a.title, message: a.message });
    setIsModalOpen(true);
  };

  const handleDeleteBulletin = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSaveBulletin = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBulletin) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editingBulletin.id ? { ...a, title: formData.title, message: formData.message } : a))
      );
    } else {
      const newObj = {
        id: Date.now(),
        title: formData.title,
        message: formData.message,
        status: "PUBLISHED",
        publishDate: new Date().toISOString().substring(0, 10),
      };
      setAnnouncements([newObj, ...announcements]);
    }
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
          onClick={handleOpenCreate}
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
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-700 font-bold">{a.publishDate}</span>
                <button
                  onClick={() => handleOpenEdit(a)}
                  className="p-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                  title="Edit Announcement"
                >
                  <Edit className="w-3.5 h-3.5 text-amber-600" />
                </button>
                <button
                  onClick={() => handleDeleteBulletin(a.id)}
                  className="p-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                </button>
              </div>
            </div>
            <h3 className="font-extrabold text-[#0D1117] text-base">{a.title}</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{a.message}</p>
          </div>
        ))}
      </div>

      {/* Create / Edit Bulletin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">
                {editingBulletin ? "Edit Bulletin" : "Create Announcement Bulletin"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBulletin} className="space-y-4">
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
                  {editingBulletin ? "Save Updates" : "Publish Bulletin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
