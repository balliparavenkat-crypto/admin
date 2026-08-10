"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Mail } from "lucide-react";

export default function EmailsPage() {
  const [templates, setTemplates] = useState<any[]>([
    {
      id: 1,
      key: "REGISTRATION_CONFIRMATION",
      subject: "Registration Confirmed - {{summit_name}}",
      body: "Dear {{name}},\n\nThank you for registering for {{summit_name}}. Your Registration Code is {{registration_code}}.",
      variables: "{{name}}, {{summit_name}}, {{registration_code}}",
    },
    {
      id: 2,
      key: "PAPER_ACCEPTED",
      subject: "Paper Acceptance Notification - {{summit_name}}",
      body: "Dear {{name}},\n\nWe are pleased to inform you that your paper '{{paper_title}}' has been ACCEPTED for presentation.",
      variables: "{{name}}, {{summit_name}}, {{paper_title}}",
    },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Transactional Email Templates</h1>
          <p className="text-xs text-slate-700 font-medium">Customize automated registration receipts, paper notifications, and reminders</p>
        </div>
      </div>

      <div className="space-y-6">
        {templates.map((t) => (
          <div key={t.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#1E40AF] bg-blue-50 px-3 py-1 rounded border border-blue-200">
                {t.key}
              </span>
              <span className="text-[11px] font-mono text-slate-700 font-bold">Variables: {t.variables}</span>
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#0D1117] block mb-1">Subject</label>
              <input
                type="text"
                value={t.subject}
                onChange={(e) => {
                  const val = e.target.value;
                  setTemplates((prev) => prev.map((item) => (item.id === t.id ? { ...item, subject: val } : item)));
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#0D1117] block mb-1">Body Template</label>
              <textarea
                rows={4}
                value={t.body}
                onChange={(e) => {
                  const val = e.target.value;
                  setTemplates((prev) => prev.map((item) => (item.id === t.id ? { ...item, body: val } : item)));
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 font-mono font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
