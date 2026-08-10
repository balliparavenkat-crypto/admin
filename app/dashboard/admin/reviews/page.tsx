"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([
    {
      id: 1,
      paperTitle: "Quantum Key Distribution in Multi-Layer Drone Swarms",
      reviewerName: "Dr. Marc DuPont",
      score: 5,
      recommendation: "ACCEPT",
      comments: "Exceptional mathematical proof of quantum key distribution scalability in UAV networks.",
      submittedAt: "2026-08-05",
    },
    {
      id: 2,
      paperTitle: "Spatio-Temporal Predictive Framework for Climate Analytics",
      reviewerName: "Dr. Christopher Manning",
      score: 4,
      recommendation: "ACCEPT",
      comments: "Strong empirical evaluation, minor revisions suggested for section 4 transformer equations.",
      submittedAt: "2026-08-06",
    },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Peer Review Evaluations</h1>
          <p className="text-xs text-slate-700 font-medium">Inspect reviewer scores, written feedback, and final recommendations</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-800 font-mono text-[11px] uppercase tracking-wider border-b border-slate-300 font-extrabold">
              <tr>
                <th className="p-4">Paper Title</th>
                <th className="p-4">Reviewer</th>
                <th className="p-4">Score</th>
                <th className="p-4">Recommendation</th>
                <th className="p-4">Submitted Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-900 font-medium">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#0D1117] max-w-xs">{r.paperTitle}</td>
                  <td className="p-4 font-mono text-slate-800 font-bold">{r.reviewerName}</td>
                  <td className="p-4 font-mono font-black text-amber-600">★ {r.score} / 5</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] uppercase border border-emerald-300">
                      {r.recommendation}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-700 font-bold">{r.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
