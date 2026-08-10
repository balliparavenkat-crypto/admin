"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { UserCheck, Search, Filter, Download, CheckCircle, XCircle, Eye } from "lucide-react";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([
    { id: 1, registrationCode: "DV-REG-1001", fullName: "Dr. Sarah Connor", email: "s.connor@cyberdyne.edu", summitName: "DVGS2026", category: "AUTHOR", paymentStatus: "PAID", amountPaid: 499.00, checkInStatus: "CHECKED_IN" },
    { id: 2, registrationCode: "DV-REG-1002", fullName: "Prof. John Doe", email: "j.doe@mit.edu", summitName: "DVGS2026", category: "DELEGATE", paymentStatus: "PAID", amountPaid: 299.00, checkInStatus: "NOT_CHECKED_IN" },
    { id: 3, registrationCode: "DV-REG-1003", fullName: "Alice Smith", email: "alice@stanford.edu", summitName: "DVGS2026", category: "STUDENT", paymentStatus: "PENDING", amountPaid: 199.00, checkInStatus: "NOT_CHECKED_IN" },
  ]);

  const [search, setSearch] = useState("");

  const filtered = registrations.filter((r) =>
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.registrationCode.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Participant Registrations</h1>
          <p className="text-xs text-slate-500">Manage delegates, authors, payment verification, and CSV export</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-[#1E40AF]/15 flex items-center gap-4 shadow-sm">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name, registration code, or email..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E40AF]"
        />
      </div>

      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-600 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Reg Code</th>
                <th className="p-4">Full Name & Email</th>
                <th className="p-4">Summit</th>
                <th className="p-4">Category</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Check-In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#1E40AF]">{r.registrationCode}</td>
                  <td className="p-4">
                    <span className="font-bold text-[#0D1117] block">{r.fullName}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{r.email}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-700">{r.summitName}</td>
                  <td className="p-4 font-mono text-slate-600">{r.category}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      r.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}>
                      {r.paymentStatus} (${r.amountPaid})
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs font-bold text-slate-700">{r.checkInStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
