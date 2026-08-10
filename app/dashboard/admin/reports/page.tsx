"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FileSpreadsheet, Download, Filter } from "lucide-react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("REGISTRATIONS");

  const generateReport = () => {
    const data = "Report,GeneratedAt,Count\n" + `${reportType},${new Date().toISOString()},14\n`;
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportType.toLowerCase()}_report_${Date.now()}.csv`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Custom Export Reports</h1>
          <p className="text-xs text-slate-400">Export registration, paper submission, financial, and attendance data into CSV / Excel format</p>
        </div>

        <button
          onClick={generateReport}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg w-fit"
        >
          <Download className="w-4 h-4 stroke-[3]" /> Generate & Download CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { id: "REGISTRATIONS", title: "Registrations Report", desc: "Full list of registered delegates, categories, fees, payment states" },
          { id: "PAPERS", title: "Paper Submissions Report", desc: "Submitted abstracts, reviewers, recommendations, DOIs" },
          { id: "FINANCE", title: "Financial Ledger", desc: "Gross revenue breakdown, transaction IDs, payment gateways" },
          { id: "ATTENDANCE", title: "Attendance & Check-Ins", desc: "Validated QR check-in times and venue participant counts" },
        ].map((rep) => (
          <div
            key={rep.id}
            onClick={() => setReportType(rep.id)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
              reportType === rep.id
                ? "bg-accent-blue/15 border-accent-blue/40 shadow-lg"
                : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-accent-cyan" />
            </div>
            <h3 className="font-bold text-white text-base">{rep.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{rep.desc}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
