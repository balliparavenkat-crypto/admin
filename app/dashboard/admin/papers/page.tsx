"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FileText, Search, Filter, Eye, CheckCircle, Clock } from "lucide-react";

export default function PapersPage() {
  const [papers, setPapers] = useState<any[]>([
    { id: 1, paperCode: "PP-101", title: "Large Language Models in Autonomous Swarms", authorName: "Dr. Sarah Connor", track: "NLP & LLMs", status: "ACCEPTED" },
    { id: 2, paperCode: "PP-102", title: "Generative Video Synthesis using Diffusion Transformers", authorName: "Prof. Alan Turing", track: "Computer Vision", status: "UNDER_REVIEW" },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Paper Submissions & Pipeline</h1>
          <p className="text-xs text-slate-500">Track abstract reviews, author submissions, and peer evaluation status</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-600 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Paper Code</th>
                <th className="p-4">Title & Author</th>
                <th className="p-4">Track</th>
                <th className="p-4">Review Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {papers.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#1E40AF]">{p.paperCode}</td>
                  <td className="p-4">
                    <span className="font-bold text-[#0D1117] block">{p.title}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{p.authorName}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-700">{p.track}</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
