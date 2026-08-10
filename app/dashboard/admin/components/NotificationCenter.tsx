"use client";

import React, { useState, useEffect } from "react";
import { Bell, Check, Sparkles, X, Activity } from "lucide-react";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: 1,
      type: "NEW_REGISTRATION",
      title: "New Registration",
      message: "Dr. Sarah Connor registered for DVGS2026",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "PAYMENT_SUCCESS",
      title: "Payment Received",
      message: "$499.00 payment confirmed for #DV-REG-1002",
      time: "15 mins ago",
      read: false,
    },
    {
      id: 3,
      type: "PAPER_SUBMISSION",
      title: "Paper Submitted",
      message: "Paper 'Quantum Key Distribution' uploaded by Author",
      time: "1 hour ago",
      read: false,
    },
  ]);

  useEffect(() => {
    // SSE Real-time Event Stream Listener
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource("http://localhost:8080/api/admin/events/stream");
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const newNotif = {
            id: Date.now(),
            type: data.eventType || "SYSTEM_EVENT",
            title: data.eventType?.replace("_", " ") || "Real-Time Event",
            message: data.message || "New platform activity logged",
            time: "Just now",
            read: false,
          };
          setNotifications((prev) => [newNotif, ...prev]);
          setUnreadCount((prev) => prev + 1);
        } catch (e) {
          console.error(e);
        }
      };
    } catch {
      // Mock SSE offline fallback
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow-sm"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-[#1E40AF]/15 rounded-3xl shadow-2xl z-50 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="font-extrabold text-[#0D1117] text-xs">Live System Notifications</h3>
            </div>
            <button
              onClick={markAllRead}
              className="text-[10px] text-[#1E40AF] font-bold hover:underline"
            >
              Mark all read
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-2xl border transition-all ${
                  n.read
                    ? "bg-slate-50 border-slate-100 text-slate-500"
                    : "bg-blue-50/50 border-blue-100 text-slate-900 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#1E40AF] uppercase">
                    {n.title}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs font-medium mt-1 leading-snug">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
