"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Save, Key, Mail, Check } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "D&V Global Summits",
    supportEmail: "contact@dvglobalsummits.com",
    razorpayKey: "rzp_live_10928475610293",
    stripeKey: "pk_live_510928475610293",
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
    currency: "USD",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Platform System Settings</h1>
          <p className="text-xs text-slate-500">Configure payment gateway keys, SMTP email credentials, and platform defaults</p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Settings Saved ✓" : "Save Configurations"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3 flex items-center gap-2">
            <Key className="w-4 h-4 text-[#1E40AF]" /> Payment Gateway Integration Keys
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2 font-mono">Razorpay Key ID</label>
              <input
                type="password"
                value={formData.razorpayKey}
                onChange={(e) => setFormData({ ...formData, razorpayKey: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2 font-mono">Stripe Publishable Key</label>
              <input
                type="password"
                value={formData.stripeKey}
                onChange={(e) => setFormData({ ...formData, stripeKey: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-600" /> Transactional Email SMTP
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">SMTP Host</label>
              <input
                type="text"
                value={formData.smtpHost}
                onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">SMTP Port</label>
              <input
                type="text"
                value={formData.smtpPort}
                onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
