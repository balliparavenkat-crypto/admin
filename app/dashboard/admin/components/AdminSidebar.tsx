"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Calendar, Users, FileText, CheckSquare, UserCheck, 
  Mic, Building2, CreditCard, QrCode, Award, Bell, Mail, Image as ImageIcon, 
  Globe, FileSpreadsheet, BarChart3, Shield, History, Settings, 
  ChevronDown, ChevronRight, X
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
      href: "/dashboard/admin/summits",
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
    { name: "Media", href: "/dashboard/admin/media", icon: ImageIcon },
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
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-[#1E40AF]/15 z-50 flex flex-col transition-transform duration-300 shadow-md lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header with Official D&V Global Logo */}
        <div className="p-4 px-6 border-b border-[#1E40AF]/15 flex items-center justify-between bg-slate-50">
          <Link href="/dashboard/admin" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="D&V Global Logo" 
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-600 hover:text-slate-900 p-1"
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
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => {
                        setSummitsOpen(true);
                        setIsMobileOpen(false);
                      }}
                      className={`flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isSubActive
                          ? "bg-blue-50 text-[#1E40AF] border border-blue-200"
                          : "text-slate-800 hover:text-[#1E40AF] hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#1E40AF]" />
                      <span>{item.name}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSummitsOpen(!summitsOpen)}
                      className="p-2 text-slate-700 hover:text-[#1E40AF]"
                    >
                      {summitsOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-700" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                      )}
                    </button>
                  </div>
                  {summitsOpen && (
                    <div className="pl-9 space-y-1 border-l-2 border-blue-200 ml-5 my-1">
                      {item.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                            isActive(sub.href)
                              ? "text-[#1E40AF] font-black bg-blue-100/80 border border-blue-200"
                              : "text-slate-700 hover:text-[#1E40AF] hover:bg-slate-100"
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
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive(item.href)
                    ? "bg-[#1E40AF] text-white shadow-md shadow-blue-500/20"
                    : "text-slate-800 hover:text-[#1E40AF] hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive(item.href) ? "text-amber-300" : "text-[#1E40AF]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-slate-200 bg-slate-100/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 font-extrabold text-xs shadow-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-xs font-bold text-[#0D1117] truncate">D&V Administrator</span>
              <span className="block text-[11px] text-slate-700 font-bold truncate font-mono">admin@dvglobal.com</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
