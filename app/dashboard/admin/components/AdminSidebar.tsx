"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Calendar, Users, FileText, CheckSquare, UserCheck, 
  Mic, Building2, CreditCard, QrCode, Award, Bell, Mail, Image, 
  Globe, FileSpreadsheet, BarChart3, Shield, History, Settings, 
  ChevronDown, ChevronRight, Menu, X, Sparkles, Layers, Clock
} from "lucide-react";

export default function AdminSidebar({
  isMobileOpen,
  setIsMobileOpen,
}: {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [summitsOpen, setSummitsOpen] = useState(true);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    {
      name: "Summits",
      icon: Calendar,
      subItems: [
        { name: "All Summits", href: "/dashboard/admin/summits" },
        { name: "Create Summit", href: "/dashboard/admin/summits/create" },
        { name: "Tracks", href: "/dashboard/admin/tracks" },
        { name: "Sessions", href: "/dashboard/admin/sessions" },
      ],
    },
    { name: "Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Registrations", href: "/dashboard/admin/registrations", icon: UserCheck },
    { name: "Papers", href: "/dashboard/admin/papers", icon: FileText },
    { name: "Reviews", href: "/dashboard/admin/reviews", icon: CheckSquare },
    { name: "Reviewers", href: "/dashboard/admin/reviewers", icon: UserCheck },
    { name: "Speakers", href: "/dashboard/admin/speakers", icon: Mic },
    { name: "Sponsors", href: "/dashboard/admin/sponsors", icon: Building2 },
    { name: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Attendance", href: "/dashboard/admin/attendance", icon: QrCode },
    { name: "Certificates", href: "/dashboard/admin/certificates", icon: Award },
    { name: "Announcements", href: "/dashboard/admin/announcements", icon: Bell },
    { name: "Emails", href: "/dashboard/admin/emails", icon: Mail },
    { name: "Media", href: "/dashboard/admin/media", icon: Image },
    { name: "Website Content", href: "/dashboard/admin/website-content", icon: Globe },
    { name: "Reports", href: "/dashboard/admin/reports", icon: FileSpreadsheet },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    { name: "Roles & Permissions", href: "/dashboard/admin/roles-permissions", icon: Shield },
    { name: "Audit Logs", href: "/dashboard/admin/audit-logs", icon: History },
    { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Backdrop for mobile drawer */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-slate-950 border-r border-slate-800/80 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/dashboard/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-blue via-blue-600 to-accent-cyan p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-gold" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wider block">D&V GLOBAL</span>
              <span className="text-[10px] text-accent-cyan font-mono tracking-widest uppercase">Admin Portal</span>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            if (item.subItems) {
              const isSubActive = item.subItems.some((sub) => pathname === sub.href);
              return (
                <div key={idx} className="space-y-1">
                  <button
                    onClick={() => setSummitsOpen(!summitsOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isSubActive
                        ? "bg-accent-blue/15 text-accent-cyan border border-accent-blue/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-accent-blue" />
                      <span>{item.name}</span>
                    </div>
                    {summitsOpen ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {summitsOpen && (
                    <div className="pl-9 space-y-1 border-l border-slate-800 ml-5 my-1">
                      {item.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            isActive(sub.href)
                              ? "text-accent-gold font-bold bg-amber-500/10"
                              : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-accent-blue/25 to-accent-blue/10 text-white border border-accent-blue/40 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive(item.href) ? "text-accent-gold" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-extrabold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-xs font-bold text-white truncate">D&V Administrator</span>
              <span className="block text-[10px] text-slate-500 truncate font-mono">admin@dvglobal.com</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
