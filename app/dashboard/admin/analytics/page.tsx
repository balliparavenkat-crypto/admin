"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Globe } from "lucide-react";

export default function AnalyticsPage() {
  const countryBreakdown = [
    { country: "United States", count: 8, percentage: "57%" },
    { country: "India", count: 4, percentage: "28%" },
    { country: "United Kingdom", count: 1, percentage: "7%" },
    { country: "France", count: 1, percentage: "7%" },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Geographic & Global Analytics</h1>
          <p className="text-xs text-slate-700 font-medium">Analyze delegate country distributions, submission growth, and revenue trends</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Country Breakdown Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#1E40AF]" /> Geographic Distribution
            </h3>
            <span className="text-[10px] font-mono text-slate-700 font-bold uppercase">4 Countries</span>
          </div>

          <div className="space-y-4">
            {countryBreakdown.map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>{c.country}</span>
                  <span className="font-mono text-emerald-800 font-black">{c.count} ({c.percentage})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1E40AF] to-blue-500 rounded-full" style={{ width: c.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Stats */}
        <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6 flex flex-col justify-between">
          <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Growth Trends</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-700 font-mono font-bold">Acceptance Rate</span>
              <span className="text-2xl font-black text-emerald-800 block mt-1">58.3%</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-700 font-mono font-bold">Attendance Rate</span>
              <span className="text-2xl font-black text-amber-800 block mt-1">85.7%</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
