"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Check, X } from "lucide-react";

export default function RolesPermissionsPage() {
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
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Role-Based Access Control (RBAC) Matrix</h1>
          <p className="text-xs text-slate-700 font-medium">Configure granular API and system capabilities across platform user roles</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-800 font-mono text-[11px] uppercase tracking-wider border-b border-slate-300 font-extrabold">
              <tr>
                <th className="p-4">Permission Capability</th>
                <th className="p-4 text-center">SUPER_ADMIN</th>
                <th className="p-4 text-center">ADMIN</th>
                <th className="p-4 text-center">CONFERENCE_CHAIR</th>
                <th className="p-4 text-center">REVIEWER</th>
                <th className="p-4 text-center">AUTHOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-900 font-medium">
              {permissions.map((p) => (
                <tr key={p.key} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#0D1117]">
                    {p.label}
                    <span className="block text-[10px] font-mono text-slate-600 font-bold">{p.key}</span>
                  </td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-slate-400 mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-slate-400 mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
