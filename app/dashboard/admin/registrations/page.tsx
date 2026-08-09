"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { UserCheck, Search, Filter, Download, CheckCircle, XCircle, Mail, QrCode, RefreshCw } from "lucide-react";
import api from "../../../../lib/api";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([
    {
      id: 1,
      registrationCode: "DV-REG-1001",
      user: { firstName: "Rahul", lastName: "Kumar", email: "rahul.kumar@ai.org", institution: "IIT Madras", country: "India" },
      conference: { acronym: "DVGS2026", title: "D&V Global Summit 2026" },
      category: "AUTHOR",
      amount: 499.00,
      paymentStatus: "SUCCESS",
      registrationStatus: "APPROVED",
      checkedIn: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      registrationCode: "DV-REG-1002",
      user: { firstName: "Sarah", lastName: "Connor", email: "s.connor@cyberdyne.edu", institution: "Cyberdyne Systems", country: "USA" },
      conference: { acronym: "DVGS2026", title: "D&V Global Summit 2026" },
      category: "SPEAKER",
      amount: 0.00,
      paymentStatus: "SUCCESS",
      registrationStatus: "APPROVED",
      checkedIn: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await api.get("/registrations");
      if (res.data && res.data.length > 0) {
        setRegistrations(res.data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/registrations/${id}/status`, { status });
    } catch {
      // Local fallback
    }
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, registrationStatus: status } : r))
    );
  };

  const exportCSV = () => {
    const headers = "ID,Code,Name,Email,Country,Category,Amount,PaymentStatus,RegistrationStatus\n";
    const rows = registrations
      .map(
        (r) =>
          `${r.id},${r.registrationCode},"${r.user?.firstName} ${r.user?.lastName}",${r.user?.email},${r.user?.country},${r.category},${r.amount},${r.paymentStatus},${r.registrationStatus}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations_export_${Date.now()}.csv`;
    a.click();
  };

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      r.registrationCode?.toLowerCase().includes(search.toLowerCase()) ||
      r.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      r.user?.email?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "ALL" || r.category === categoryFilter;
    const matchesStat = statusFilter === "ALL" || r.registrationStatus === statusFilter;
    return matchesSearch && matchesCat && matchesStat;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Registration Management</h1>
          <p className="text-xs text-slate-400">View, approve, and manage summit participant registrations</p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 w-fit"
        >
          <Download className="w-4 h-4" /> Export CSV Report
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search code, participant name, email..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="AUTHOR">AUTHOR</option>
            <option value="DELEGATE">DELEGATE</option>
            <option value="SPEAKER">SPEAKER</option>
            <option value="STUDENT">STUDENT</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPROVED">APPROVED</option>
            <option value="PENDING">PENDING</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <button onClick={fetchRegistrations} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Reg Code</th>
                <th className="p-4">Participant Info</th>
                <th className="p-4">Summit</th>
                <th className="p-4">Category & Fee</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-accent-cyan">{r.registrationCode}</td>
                  <td className="p-4">
                    <span className="font-bold text-white block">{r.user?.firstName} {r.user?.lastName}</span>
                    <span className="text-[11px] text-slate-400 block">{r.user?.email}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{r.user?.institution} ({r.user?.country})</span>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{r.conference?.acronym || "DVGS2026"}</td>
                  <td className="p-4 space-y-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono font-bold text-[10px] inline-block">
                      {r.category}
                    </span>
                    <span className="block text-emerald-400 font-mono font-bold">${r.amount}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        r.registrationStatus === "APPROVED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {r.registrationStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => updateStatus(r.id, "APPROVED")}
                      className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                      title="Approve Registration"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, "REJECTED")}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                      title="Reject Registration"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
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
