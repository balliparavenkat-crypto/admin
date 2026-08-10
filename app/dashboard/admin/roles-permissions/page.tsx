"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Shield, Lock, Check, X } from "lucide-react";

export default function RolesPermissionsPage() {
  const roles = [
    "SUPER_ADMIN", "ADMIN", "CONFERENCE_CHAIR", "ORGANIZER", 
    "REVIEWER", "SPEAKER", "AUTHOR", "LISTENER", "FINANCE"
  ];

  const permissions = [
    { key: "SUMMIT_CREATE", label: "Create & Publish Summits" },
    { key: "SUMMIT_EDIT", label: "Edit Summit Settings" },
    { key: "USER_VIEW", label: "View User Accounts" },
    { key: "REGISTRATION_APPROVE", label: "Approve Registrations" },
    { key: "PAPER_ASSIGN_REVIEWER", label: "Assign Reviewers to Papers" },
    { key: "PAYMENT_REFUND", label: "Process Payment Refunds" },
    { key: "CERTIFICATE_CREATE", label: "Generate & Issue Certificates" },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Role-Based Access Control (RBAC) Matrix</h1>
          <p className="text-xs text-slate-400">Configure granular API and system capabilities across platform user roles</p>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Permission Capability</th>
                <th className="p-4 text-center">SUPER_ADMIN</th>
                <th className="p-4 text-center">ADMIN</th>
                <th className="p-4 text-center">CONFERENCE_CHAIR</th>
                <th className="p-4 text-center">REVIEWER</th>
                <th className="p-4 text-center">AUTHOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {permissions.map((p) => (
                <tr key={p.key} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white">
                    {p.label}
                    <span className="block text-[10px] font-mono text-slate-500">{p.key}</span>
                  </td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
