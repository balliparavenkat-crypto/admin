"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Users, Search, Filter, Shield, CheckCircle, XCircle, Key, UserPlus } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([
    { id: 1, firstName: "D&V", lastName: "Admin", email: "admin@dvglobal.com", institution: "D&V Global Summit", country: "USA", role: "SUPER_ADMIN", verified: true },
    { id: 2, firstName: "Sarah", lastName: "Connor", email: "s.connor@cyberdyne.edu", institution: "Cyberdyne Systems", country: "USA", role: "CONFERENCE_CHAIR", verified: true },
    { id: 3, firstName: "Arthur", lastName: "Dent", email: "a.dent@london.edu", institution: "University of London", country: "UK", role: "AUTHOR", verified: true },
    { id: 4, firstName: "Dr. Marc", lastName: "DuPont", email: "m.dupont@pasteur.fr", institution: "Institut Pasteur", country: "France", role: "REVIEWER", verified: true },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">User Account Directory</h1>
          <p className="text-xs text-slate-400">Manage system users, roles, password resets, and verification states</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, institution..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
        >
          <option value="ALL">All Roles</option>
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          <option value="CONFERENCE_CHAIR">CONFERENCE_CHAIR</option>
          <option value="REVIEWER">REVIEWER</option>
          <option value="AUTHOR">AUTHOR</option>
        </select>
      </div>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">User Name & Email</th>
                <th className="p-4">Institution & Country</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-white block">{u.firstName} {u.lastName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="block text-slate-300">{u.institution}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{u.country}</span>
                  </td>
                  <td className="p-4 font-mono">
                    <span className="px-2.5 py-1 rounded bg-accent-blue/10 text-accent-cyan border border-accent-blue/20 font-bold text-[10px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                      VERIFIED
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white" title="Reset Password">
                      <Key className="w-4 h-4" />
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
