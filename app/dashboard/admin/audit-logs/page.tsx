"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { History, Search, RefreshCw } from "lucide-react";
import api from "../../../../lib/api";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([
    { id: 1, userEmail: "admin@dvglobal.com", action: "CREATED_SUMMIT", details: "Admin created summit D&V Global Summit 2026", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, userEmail: "admin@dvglobal.com", action: "APPROVED_REGISTRATION", details: "Admin approved registration #DV-REG-1001", timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: 3, userEmail: "s.connor@cyberdyne.edu", action: "PAPER_SUBMISSION", details: "Submitted paper PP-104 'Quantum Key Distribution'", timestamp: new Date(Date.now() - 14400000).toISOString() },
  ]);

  const [search, setSearch] = useState("");

  const filtered = logs.filter((l) =>
    l.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
    l.action?.toLowerCase().includes(search.toLowerCase()) ||
    l.details?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">System Audit Log Trail</h1>
          <p className="text-xs text-slate-400">Complete security trail of administrator actions, registrations, and logins</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter audit logs by action, user email, or details..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User Email</th>
                <th className="p-4">Action</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-mono text-slate-400">{new Date(l.timestamp).toLocaleString()}</td>
                  <td className="p-4 font-bold text-white">{l.userEmail}</td>
                  <td className="p-4 font-mono font-bold text-accent-cyan">{l.action}</td>
                  <td className="p-4 text-slate-300">{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
