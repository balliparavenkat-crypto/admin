"use client";

import React, { useState, useEffect } from "react";
import { Bell, Check, Trash2, X, Sparkles } from "lucide-react";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: 1,
      title: "New Registration",
      message: "Dr. Sarah Connor registered for DVGS2026",
      time: "10m ago",
      read: false,
    },
    {
      id: 2,
      title: "Paper Abstract Uploaded",
      message: "Paper #PP-104 'Quantum Key Distribution' submitted",
      time: "25m ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "$499 USD author registration fee processed",
      time: "1h ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 hover:text-[#1E40AF] transition-colors shadow-xs"
      >
        <Bell className="w-4 h-4 text-[#1E40AF]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white border border-[#1E40AF]/20 shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-extrabold text-[#0D1117] text-xs uppercase tracking-wider">Live System Notifications</h3>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[10px] text-[#1E40AF] font-bold hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-200">
            {notifications.map((n) => (
              <div key={n.id} className={`p-4 space-y-1 transition-colors ${n.read ? "bg-white" : "bg-blue-50/50"}`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0D1117] text-xs">{n.title}</span>
                  <span className="text-[10px] font-mono text-slate-600 font-bold">{n.time}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
