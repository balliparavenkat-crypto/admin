"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "./components/AdminLayout";
import { 
  Calendar, Users, FileText, CheckSquare, UserCheck, Mic, 
  Building2, CreditCard, QrCode, Award, Bell, Mail, Image as ImageIcon, 
  Globe, FileSpreadsheet, BarChart3, Shield, History, Settings, 
  Sparkles, TrendingUp, ArrowUpRight, Plus, RefreshCw, ChevronRight, Activity
} from "lucide-react";
import Link from "next/link";
import api from "../../../lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSummits: 2,
    activeSummits: 2,
    totalRegistrations: 14,
    totalRevenue: 6986.00,
    acceptedPapers: 7,
    pendingReviews: 5,
  });

  const [activities, setActivities] = useState([
    { id: 1, title: "New Author Registration", detail: "Dr. Sarah Connor registered for DVGS2026", time: "10 mins ago", icon: UserCheck, color: "from-blue-500 to-indigo-600" },
    { id: 2, title: "Paper Abstract Submitted", detail: "Paper #PP-104 'Quantum Key Distribution' submitted", time: "25 mins ago", icon: FileText, color: "from-amber-500 to-yellow-600" },
    { id: 3, title: "Registration Fee Paid", detail: "Payment of $499 USD received via Razorpay", time: "1 hour ago", icon: CreditCard, color: "from-emerald-500 to-teal-600" },
    { id: 4, title: "Review Submitted", detail: "Dr. Marc DuPont completed review for Paper #PP-101", time: "2 hours ago", icon: CheckSquare, color: "from-purple-500 to-indigo-600" },
  ]);

  const [loading, setLoading] = useState(false);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const savedStr = localStorage.getItem("custom_summits");
      const customList = savedStr ? JSON.parse(savedStr) : [];
      setStats((prev) => ({
        ...prev,
        totalSummits: Math.max(2, customList.length),
        activeSummits: Math.max(2, customList.length),
      }));
    } catch {
      // Continue
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const statCards = [
    { label: "Total Summits", value: stats.totalSummits, badge: "+100%", color: "from-blue-500 to-indigo-600", icon: Calendar },
    { label: "Active Summits", value: stats.activeSummits, badge: "LIVE NOW", color: "from-emerald-500 to-teal-600", icon: Sparkles },
    { label: "Registrations", value: stats.totalRegistrations, badge: "+14 delegates", color: "from-[#1E40AF] to-blue-600", icon: Users },
    { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, badge: "USD Verified", color: "from-amber-500 to-yellow-600", icon: CreditCard },
    { label: "Accepted Papers", value: stats.acceptedPapers, badge: "Peer Reviewed", color: "from-purple-500 to-indigo-600", icon: FileText },
    { label: "Pending Reviews", value: stats.pendingReviews, badge: "In Review", color: "from-rose-500 to-red-600", icon: CheckSquare },
  ];

  return (
    <AdminLayout>
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0D1117] p-8 text-white shadow-lg border border-[#1E40AF]/30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[10px] font-extrabold uppercase border border-amber-400/30 tracking-widest">
                Central Administrator Suite
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">D&V Global Executive Overview</h1>
            <p className="text-xs text-slate-300 max-w-2xl font-medium leading-relaxed">
              Real-time synchronization across conference creation, author paper pipeline, peer reviews, delegate registration ledger, and certificate verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/admin/summits/create"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Create Summit
            </Link>
            <button
              onClick={fetchDashboardStats}
              className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-colors shadow-sm"
              title="Refresh Dashboard Stats"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm hover:shadow-md hover:border-[#1E40AF]/30 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-700 uppercase">
                  {card.label}
                </span>
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${card.color} p-0.5 shadow-sm`}>
                  <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#1E40AF]" />
                  </div>
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-[#0D1117] tracking-tight block">
                  {card.value}
                </span>
                <span className="text-[11px] font-bold text-[#1E40AF] flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> {card.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mid-section: Analytics Cards & Real-time Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Revenue & Paper Analytics */}
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue Breakdown */}
          <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0D1117] tracking-wide">Revenue & Registrations Analytics</h3>
                <p className="text-xs text-slate-600 font-medium">Financial status and category breakdown</p>
              </div>
              <Link href="/dashboard/admin/payments" className="text-xs text-[#1E40AF] hover:underline font-bold flex items-center gap-1">
                View Ledger <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-700 font-bold font-mono">Gross Revenue</span>
                <span className="text-xl font-black text-emerald-700 block mt-1">${stats.totalRevenue.toLocaleString()}</span>
                <span className="text-[10px] text-slate-600 font-semibold mt-1 block">100% verified gateway</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-700 font-bold font-mono">Pending Payments</span>
                <span className="text-xl font-black text-amber-700 block mt-1">$0.00</span>
                <span className="text-[10px] text-slate-600 font-semibold mt-1 block">0 pending authorizations</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-700 font-bold font-mono">Refunded Amount</span>
                <span className="text-xl font-black text-rose-700 block mt-1">$0.00</span>
                <span className="text-[10px] text-slate-600 font-semibold mt-1 block">Clean financial record</span>
              </div>
            </div>
          </div>

          {/* Paper Submissions Breakdown */}
          <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0D1117] tracking-wide">Paper Submissions & Review Pipeline</h3>
                <p className="text-xs text-slate-600 font-medium">Status of scientific abstracts and manuscripts</p>
              </div>
              <Link href="/dashboard/admin/papers" className="text-xs text-[#1E40AF] hover:underline font-bold flex items-center gap-1">
                View All Papers <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center">
                <span className="text-xs text-[#1E40AF] font-bold block uppercase tracking-wider">Submitted</span>
                <span className="text-2xl font-black text-[#0D1117] mt-1 block">12</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                <span className="text-xs text-amber-800 font-bold block uppercase tracking-wider">Under Review</span>
                <span className="text-2xl font-black text-[#0D1117] mt-1 block">{stats.pendingReviews}</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                <span className="text-xs text-emerald-800 font-bold block uppercase tracking-wider">Accepted</span>
                <span className="text-2xl font-black text-[#0D1117] mt-1 block">{stats.acceptedPapers}</span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-center">
                <span className="text-xs text-rose-800 font-bold block uppercase tracking-wider">Rejected</span>
                <span className="text-2xl font-black text-[#0D1117] mt-1 block">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Real-time Live Activity Stream */}
        <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-base font-bold text-[#0D1117] tracking-wide">Live Activity Stream</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-700 font-bold uppercase tracking-widest">Real-time</span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[460px] pr-1">
            {activities.map((act) => (
              <div key={act.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 hover:border-[#1E40AF]/30 transition-colors shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#1E40AF]">{act.title}</span>
                  <span className="text-[10px] text-slate-700 font-mono font-bold">{act.time}</span>
                </div>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">{act.detail}</p>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/admin/audit-logs"
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-center text-xs font-bold text-slate-800 transition-colors block"
          >
            View Complete Audit Trail
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
