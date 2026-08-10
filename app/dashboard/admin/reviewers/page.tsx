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
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Reviewer Pool & Workload</h1>
          <p className="text-xs text-slate-700 font-medium">Manage academic reviewers, workload distribution, and review completion rates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Total Reviewers</span>
          <span className="text-2xl font-black text-[#0D1117] block">18</span>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Completed Reviews</span>
          <span className="text-2xl font-black text-emerald-700 block">42</span>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Pending Reviews</span>
          <span className="text-2xl font-black text-amber-700 block">7</span>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Average Score</span>
          <span className="text-2xl font-black text-[#1E40AF] block">4.7 / 5.0</span>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-800 font-mono text-[11px] uppercase tracking-wider border-b border-slate-300 font-extrabold">
            <tr>
              <th className="p-4">Reviewer Name</th>
              <th className="p-4">Institution</th>
              <th className="p-4">Assigned / Completed</th>
              <th className="p-4">Pending</th>
              <th className="p-4">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-900 font-medium">
            {reviewers.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#0D1117]">
                  {r.name} <span className="block text-[11px] font-mono text-slate-600 font-normal">{r.email}</span>
                </td>
                <td className="p-4 text-slate-800 font-semibold">{r.institution}</td>
                <td className="p-4 font-mono text-emerald-800 font-black">{r.completedCount} / {r.assignedCount}</td>
                <td className="p-4 font-mono text-amber-800 font-black">{r.pendingCount}</td>
                <td className="p-4 font-mono text-amber-600 font-black">★ {r.avgScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
