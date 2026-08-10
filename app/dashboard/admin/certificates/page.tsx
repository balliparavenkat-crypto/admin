"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Award, Plus, Download, CheckCircle, Search, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([
    {
      id: 1,
      certificateCode: "CERT-DV-881024",
      recipientName: "Rahul Kumar",
      certificateType: "PRESENTATION",
      conferenceTitle: "D&V Global Summit 2026",
      issueDate: "2026-08-05",
      verificationHash: "4b9f2910-384e-4f10-b91a-9824f1029481",
    },
    {
      id: 2,
      certificateCode: "CERT-DV-881025",
      recipientName: "Dr. Sarah Connor",
      certificateType: "SPEAKER",
      conferenceTitle: "D&V Global Summit 2026",
      issueDate: "2026-08-06",
      verificationHash: "7a8b9c10-1234-5678-90ab-cdef12345678",
    },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Certificate Engine & Verification</h1>
          <p className="text-xs text-slate-400">Issue, generate, and verify participation and presentation certificates</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/verify-certificate"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700"
          >
            <ExternalLink className="w-4 h-4 text-accent-cyan" /> Public Verification Tool
          </Link>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4 stroke-[3]" /> Issue Certificate
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Certificate Code</th>
                <th className="p-4">Recipient Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Conference</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {certificates.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-mono font-bold text-accent-cyan">{c.certificateCode}</td>
                  <td className="p-4 font-bold text-white">{c.recipientName}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px]">
                      {c.certificateType}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{c.conferenceTitle}</td>
                  <td className="p-4 font-mono text-slate-400">{c.issueDate}</td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/verify-certificate?code=${c.verificationHash}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white inline-block"
                      title="Verify Certificate"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
