"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { QrCode, CheckCircle, XCircle, Search, RefreshCw, UserCheck, Sparkles } from "lucide-react";
import api from "../../../../lib/api";

export default function AttendancePage() {
  const [scanCode, setScanCode] = useState("");
  const [lastCheckIn, setLastCheckIn] = useState<any | null>({
    registrationCode: "DV-REG-1001",
    user: { firstName: "Rahul", lastName: "Kumar", email: "rahul.kumar@ai.org", institution: "IIT Madras" },
    conference: { acronym: "DVGS2026" },
    checkedInAt: new Date().toISOString(),
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanCode.trim()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/registrations/check-in", { code: scanCode });
      setLastCheckIn(res.data);
      setScanCode("");
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Participant registration code or QR not found!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">On-Site Attendance & QR Check-In Terminal</h1>
          <p className="text-xs text-slate-700 font-medium">Validate participant QR badges and record real-time venue check-ins</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Total Registrations</span>
          <span className="text-2xl font-black text-[#0D1117] block">14</span>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Checked In</span>
          <span className="text-2xl font-black text-emerald-700 block">5</span>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Not Checked In</span>
          <span className="text-2xl font-black text-amber-700 block">9</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Check in Terminal Box */}
        <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-[#1E40AF]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0D1117]">Scan or Enter Badge Code</h3>
              <p className="text-xs text-slate-700 font-medium">Enter registration code (e.g. DV-REG-1001 or QR string)</p>
            </div>
          </div>

          <form onSubmit={handleCheckIn} className="space-y-4">
            <input
              type="text"
              value={scanCode}
              onChange={(e) => setScanCode(e.target.value)}
              placeholder="DV-REG-1001 or scan QR code..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono font-bold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF]"
            />

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" /> {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md hover:scale-[1.01] transition-transform"
            >
              {loading ? "Validating..." : "Validate & Record Check-In"}
            </button>
          </form>
        </div>

        {/* Last Check-In Confirmation Display */}
        <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-4 flex flex-col justify-between">
          <h3 className="text-base font-extrabold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Latest Validated Check-In</h3>

          {lastCheckIn ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-black border border-emerald-300">
                  CHECKED IN SUCCESSFUL
                </span>
                <span className="text-[10px] font-mono text-slate-700 font-bold">
                  {new Date(lastCheckIn.checkedInAt).toLocaleTimeString()}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-[#0D1117]">
                  {lastCheckIn.user?.firstName} {lastCheckIn.user?.lastName}
                </h4>
                <p className="text-xs text-slate-700 font-mono font-bold">{lastCheckIn.user?.email}</p>
                <p className="text-xs text-slate-700 font-medium mt-1">{lastCheckIn.user?.institution}</p>
              </div>
              <div className="pt-2 border-t border-emerald-200 flex justify-between items-center text-xs">
                <span className="font-mono text-[#1E40AF] font-black">{lastCheckIn.registrationCode}</span>
                <span className="font-bold text-[#0D1117]">{lastCheckIn.conference?.acronym}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-600 text-xs font-bold">No check-in scanned yet</div>
          )}

          <div className="text-center text-[10px] text-slate-600 font-mono font-bold uppercase tracking-widest">
            Events stream live to Real-Time Admin Dashboard
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
