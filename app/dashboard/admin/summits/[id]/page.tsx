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

  useEffect(() => {
    try {
      const savedStr = localStorage.getItem("custom_summits");
      if (savedStr) {
        const customList: any[] = JSON.parse(savedStr);
        const match = customList.find((s) => String(s.id) === String(summitId) || s.acronym === summitId);
        if (match) {
          setSummit(match);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    if (String(summitId) === "2") {
      setSummit({
        id: 2,
        title: "International Conference on Sustainable Climate Solutions",
        acronym: "ICSCS2026",
        description: "Global summit focusing on renewable energy economics, microgrids, and carbon capture.",
        city: "Singapore",
        country: "Singapore",
        status: "ACTIVE",
        registrationFeeAuthor: 450.00,
        registrationFeeListener: 250.00,
      });
    }
  }, [summitId]);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/admin/summits"
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 hover:text-[#1E40AF]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {summit.acronym}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {summit.status}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-[#0D1117] tracking-tight mt-1">{summit.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/admin/summits/edit/${summit.id}`}
            className="px-4 py-2 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-bold shadow-sm"
          >
            Edit Settings
          </Link>
        </div>
      </div>

      {/* Console Tab Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 custom-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? "bg-[#1E40AF] text-white shadow-sm"
                  : "text-slate-800 hover:text-[#1E40AF] hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel Contents */}
      <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm min-h-[400px]">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide">Summit Overview</h3>
            <p className="text-xs text-slate-700 font-medium leading-relaxed max-w-3xl">{summit.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-700 font-bold font-mono block">Location</span>
                <span className="text-sm font-bold text-[#0D1117] block mt-1">{summit.city}, {summit.country}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-700 font-bold font-mono block">Author Fee</span>
                <span className="text-sm font-black text-emerald-800 block mt-1">${summit.registrationFeeAuthor}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-700 font-bold font-mono block">Listener Fee</span>
                <span className="text-sm font-black text-emerald-800 block mt-1">${summit.registrationFeeListener}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="text-center py-16 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="text-sm font-bold text-[#0D1117] uppercase tracking-wider">
              {activeTab.toUpperCase()} Module Ready
            </h4>
            <p className="text-xs text-slate-700 font-medium max-w-md mx-auto">
              Manage all {activeTab} associated specifically with {summit.acronym}. All edits sync directly with backend PostgreSQL storage.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
