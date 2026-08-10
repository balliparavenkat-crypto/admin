"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { FileText, Search, Filter, CheckCircle, XCircle, UserCheck, Eye, RefreshCw, AlertCircle } from "lucide-react";
import api from "../../../../lib/api";

export default function PapersPage() {
  const [papers, setPapers] = useState<any[]>([
    {
      id: 104,
      title: "Quantum Key Distribution in Multi-Layer Drone Swarms",
      abstractText: "We propose a novel quantum cryptography protocol tailored for autonomous UAV swarms...",
      track: { name: "AI Safety & Alignment" },
      submitter: { firstName: "Sarah", lastName: "Connor", email: "s.connor@cyberdyne.edu" },
      status: "UNDER_REVIEW",
      keywords: "Quantum, Drone, Swarm",
      doi: "10.1000/dvgs.2026.104",
      reviewerName: "Dr. Marc DuPont",
      createdAt: "2026-08-01",
    },
    {
      id: 108,
      title: "Spatio-Temporal Predictive Framework for Climate Analytics",
      abstractText: "A transformer-based neural network model for global sea temperature prediction...",
      track: { name: "Natural Language Processing & LLMs" },
      submitter: { firstName: "Arthur", lastName: "Dent", email: "a.dent@london.edu" },
      status: "ACCEPTED",
      keywords: "Climate, Transformers, ML",
      doi: "10.1000/dvgs.2026.108",
      reviewerName: "Dr. Christopher Manning",
      createdAt: "2026-08-03",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);

  const updatePaperStatus = (id: number, newStatus: string) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    if (selectedPaper?.id === id) {
      setSelectedPaper((prev: any) => ({ ...prev, status: newStatus }));
    }
  };

  const filtered = papers.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.submitter?.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.keywords?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Paper Submissions & Review Pipeline</h1>
          <p className="text-xs text-slate-700 font-medium">Manage manuscript submissions, reviewer assignments, and acceptance decisions</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#1E40AF]/15 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E40AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search paper title, author email, keywords..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 font-semibold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
        >
          <option value="ALL">All Statuses</option>
          <option value="SUBMITTED">SUBMITTED</option>
          <option value="UNDER_REVIEW">UNDER_REVIEW</option>
          <option value="REVISION_REQUIRED">REVISION_REQUIRED</option>
          <option value="ACCEPTED">ACCEPTED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>

      {/* Papers Table */}
      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-800 font-mono text-[11px] uppercase tracking-wider border-b border-slate-300 font-extrabold">
              <tr>
                <th className="p-4">ID & Title</th>
                <th className="p-4">Track & Author</th>
                <th className="p-4">Assigned Reviewer</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-900 font-medium">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      PP-{p.id}
                    </span>
                    <span className="font-bold text-[#0D1117] block mt-1 leading-snug">{p.title}</span>
                    <span className="text-[10px] text-slate-600 font-mono font-bold">DOI: {p.doi}</span>
                  </td>
                  <td className="p-4">
                    <span className="block font-extrabold text-[#1E40AF]">{p.track?.name}</span>
                    <span className="text-[11px] text-slate-800 font-bold block mt-0.5">{p.submitter?.firstName} {p.submitter?.lastName}</span>
                    <span className="text-[10px] text-slate-600 font-mono font-bold">{p.submitter?.email}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-800 font-bold">
                    {p.reviewerName ? (
                      <span className="text-emerald-800 font-black">{p.reviewerName}</span>
                    ) : (
                      <span className="text-slate-600 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        p.status === "ACCEPTED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : p.status === "UNDER_REVIEW"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedPaper(p)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-800 hover:text-[#1E40AF] border border-slate-200"
                      title="View Abstract & Review"
                    >
                      <Eye className="w-4 h-4 text-[#1E40AF]" />
                    </button>
                    <button
                      onClick={() => updatePaperStatus(p.id, "ACCEPTED")}
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                      title="Accept Paper"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </button>
                    <button
                      onClick={() => updatePaperStatus(p.id, "REJECTED")}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
                      title="Reject Paper"
                    >
                      <XCircle className="w-4 h-4 text-rose-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Abstract Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-xl space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1E40AF]">Paper ID: PP-{selectedPaper.id}</span>
                <h3 className="text-base font-extrabold text-[#0D1117] mt-1">{selectedPaper.title}</h3>
              </div>
              <button onClick={() => setSelectedPaper(null)} className="text-slate-500 hover:text-slate-800 font-bold">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-[#0D1117]">Abstract Text</h4>
              <p className="text-xs text-slate-700 font-medium leading-relaxed font-sans">{selectedPaper.abstractText}</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => updatePaperStatus(selectedPaper.id, "REVISION_REQUIRED")}
                className="px-4 py-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold"
              >
                Request Revision
              </button>
              <button
                onClick={() => updatePaperStatus(selectedPaper.id, "ACCEPTED")}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Accept Paper
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
