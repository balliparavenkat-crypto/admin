"use client";

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import NotificationCenter from "./NotificationCenter";
import { Menu, Search, User, LogOut, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-accent-cyan/30 selection:text-white">
      {/* Sidebar Navigation */}
      <AdminSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Search */}
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search summits, registrations, papers, users..."
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Real-time Notification Bell */}
            <NotificationCenter />

            {/* Admin User Profile Quick Link */}
            <Link
              href="/dashboard/admin/settings"
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 font-extrabold text-[11px]">
                A
              </div>
              <span className="text-xs font-semibold text-slate-200 hidden md:inline">Admin</span>
            </Link>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
