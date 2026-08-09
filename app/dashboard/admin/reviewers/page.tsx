"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { UserCheck, Search, Plus, Award, CheckSquare } from "lucide-react";

export default function ReviewersPage() {
  const [reviewers, setReviewers] = useState<any[]>([
    { id: 1, name: "Dr. Marc DuPont", email: "m.dupont@pasteur.fr", institution: "Institut Pasteur", assignedCount: 4, completedCount: 3, pendingCount: 1, avgScore: 4.8 },
    { id: 2, name: "Dr. Christopher Manning", email: "manning@stanford.edu", institution: "Stanford University", assignedCount: 6, completedCount: 6, pendingCount: 0, avgScore: 4.9 },
    { id: 3, name: "Prof. Sarah Connor", email: "s.connor@cyberdyne.edu", institution: "Cyberdyne Systems", assignedCount: 3, completedCount: 2, pendingCount: 1, avgScore: 4.6 },
  ]);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Reviewer Pool & Workload</h1>
          <p className="text-xs text-slate-400">Manage academic reviewers, workload distribution, and review completion rates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono">Total Reviewers</span>
          <span className="text-2xl font-black text-white block mt-1">18</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono">Completed Reviews</span>
          <span className="text-2xl font-black text-emerald-400 block mt-1">42</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono">Pending Reviews</span>
          <span className="text-2xl font-black text-amber-400 block mt-1">7</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono">Average Score</span>
          <span className="text-2xl font-black text-accent-cyan block mt-1">4.7 / 5.0</span>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-4">Reviewer Name</th>
              <th className="p-4">Institution</th>
              <th className="p-4">Assigned / Completed</th>
              <th className="p-4">Pending</th>
              <th className="p-4">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {reviewers.map((r) => (
              <tr key={r.id} className="hover:bg-slate-800/40">
                <td className="p-4 font-bold text-white">{r.name} <span className="block text-[10px] font-mono text-slate-400 font-normal">{r.email}</span></td>
                <td className="p-4">{r.institution}</td>
                <td className="p-4 font-mono text-emerald-400 font-bold">{r.completedCount} / {r.assignedCount}</td>
                <td className="p-4 font-mono text-amber-400 font-bold">{r.pendingCount}</td>
                <td className="p-4 font-mono text-accent-gold font-bold">★ {r.avgScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
