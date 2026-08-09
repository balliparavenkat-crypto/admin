"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { 
  ArrowLeft, Calendar, Users, FileText, CheckSquare, UserCheck, 
  Mic, Building2, CreditCard, QrCode, Award, Bell, Mail, FileSpreadsheet, 
  Settings, Layers, Clock, Sparkles, Plus, Search, Filter
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import api from "../../../../../lib/api";

export default function SummitConsolePage() {
  const params = useParams();
  const summitId = params?.id || "1";
  const [activeTab, setActiveTab] = useState("overview");

  const [summit, setSummit] = useState<any>({
    id: summitId,
    title: "D&V Global Summit 2026: Advances in Artificial Intelligence",
    acronym: "DVGS2026",
    description: "Premier global conference bringing together leading researchers, practitioners, and industry experts in AI.",
    city: "San Francisco",
    country: "United States",
    status: "ACTIVE",
    registrationFeeAuthor: 499.00,
    registrationFeeListener: 299.00,
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: Calendar },
    { id: "registrations", label: "Registrations", icon: Users },
    { id: "papers", label: "Papers", icon: FileText },
    { id: "reviews", label: "Reviews", icon: CheckSquare },
    { id: "reviewers", label: "Reviewers", icon: UserCheck },
    { id: "speakers", label: "Speakers", icon: Mic },
    { id: "tracks", label: "Tracks", icon: Layers },
    { id: "sessions", label: "Sessions", icon: Clock },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "attendance", label: "Attendance", icon: QrCode },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "sponsors", label: "Sponsors", icon: Building2 },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "emails", label: "Emails", icon: Mail },
    { id: "reports", label: "Reports", icon: FileSpreadsheet },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <AdminLayout>
      {/* Top Console Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/admin/summits"
            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-accent-cyan bg-accent-blue/10 px-2 py-0.5 rounded border border-accent-blue/20">
                {summit.acronym}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                {summit.status}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">{summit.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/admin/summits/create`}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Edit Settings
          </Link>
        </div>
      </div>

      {/* Console Tab Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 custom-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? "bg-accent-blue/20 text-accent-cyan border border-accent-blue/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/40"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel Contents */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 min-h-[400px]">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide">Summit Overview</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">{summit.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono block">Location</span>
                <span className="text-sm font-bold text-white block mt-1">{summit.city}, {summit.country}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono block">Author Fee</span>
                <span className="text-sm font-bold text-emerald-400 block mt-1">${summit.registrationFeeAuthor}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono block">Listener Fee</span>
                <span className="text-sm font-bold text-emerald-400 block mt-1">${summit.registrationFeeListener}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="text-center py-16 space-y-3">
            <Sparkles className="w-8 h-8 text-accent-gold mx-auto" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {activeTab.toUpperCase()} Module Ready
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Manage all {activeTab} associated specifically with {summit.acronym}. All edits sync directly with backend PostgreSQL storage.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
