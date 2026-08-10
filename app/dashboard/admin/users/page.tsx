"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Users, Search, Shield } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([
    { id: 1, name: "Admin User", email: "admin@dvglobal.com", role: "SUPER_ADMIN" },
    { id: 2, name: "Dr. Sarah Connor", email: "s.connor@cyberdyne.edu", role: "AUTHOR" },
    { id: 3, name: "Prof. Alan Turing", email: "turing@cambridge.edu", role: "REVIEWER" },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">User Account Directory</h1>
          <p className="text-xs text-slate-500">Manage user accounts, roles, and administrative access privileges</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-600 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Name & Email</th>
                <th className="p-4">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-[#0D1117] block">{u.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{u.email}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-[#1E40AF]">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
