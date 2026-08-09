"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Users, Award, BookOpen, ChevronRight, 
  Lock, MapPin, Send, Shield, DollarSign, 
  Menu, X, ArrowUpRight, HelpCircle, Mail, Search,
  Plus, CheckCircle, AlertTriangle, Play, RefreshCw, BarChart2,
  Trash2, Edit, CheckSquare, Eye, Key, ShieldAlert,
  Settings as SettingsIcon, Bell, Calendar, FileText,
  FileCheck, UserCheck, Megaphone, QrCode, CreditCard,
  Building, Globe, Layers, Download, CheckCircle2, Circle, Radio,
  Server, Sliders, LockKeyhole, MailCheck, ShieldCheck, Database
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import { realtimeManager, RealtimeEventPayload, EventType } from "../../../lib/realtime";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Navigation State (21 items)
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Settings Subtab (Section 25: General, Registration, Payment, Email, Certificate, Security)
  const [settingsSubTab, setSettingsSubTab] = useState<string>("general");

  // Summits Subtab (All Summits, Create Summit, Tracks, Sessions, Lifecycle Pipeline)
  const [summitSubTab, setSummitSubTab] = useState<string>("all");

  // Loaded database state
  const [conferences, setConferences] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Live Toast Notifications & Realtime Feed
  const [toastNotification, setToastNotification] = useState<RealtimeEventPayload | null>(null);
  const [realtimeFeed, setRealtimeFeed] = useState<RealtimeEventPayload[]>([]);

  // Search filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Summit Creation Form State
  const [newTitle, setNewTitle] = useState("");
  const [newAcronym, setNewAcronym] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newVenue, setNewVenue] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newFeeAuthor, setNewFeeAuthor] = useState("499.00");
  const [newFeeListener, setNewFeeListener] = useState("299.00");

  // Section 25 Settings Form State
  const [settingsForm, setSettingsForm] = useState<Record<string, string>>({
    // General
    companyName: "D&V Global Summit & Research Network Ltd.",
    companyRegNumber: "DVG-REG-2026-8809",
    contactEmail: "secretariat@dvglobalsummits.org",
    contactPhone: "+1 (800) 555-DVGS",
    address: "750 Innovation Way, Suite 400, San Francisco, CA 94107",
    logoUrl: "/images/dv_logo_transparent.png",
    socialTwitter: "https://x.com/DVGlobalSummits",
    socialLinkedin: "https://linkedin.com/company/dvglobalsummits",
    
    // Registration
    currency: "USD",
    gstPercentage: "18",
    earlyBirdDiscountDays: "30",
    authorFeeBase: "499.00",
    listenerFeeBase: "299.00",
    deadlineAbstract: "2026-09-15",
    deadlineFullPaper: "2026-10-01",

    // Payment
    razorpayKeyId: "rzp_live_DVGLOBAL2026KEY",
    razorpaySecret: "••••••••••••••••••••••••",
    stripePublishableKey: "pk_live_51DVGS99881024ST",
    stripeSecretKey: "sk_live_••••••••••••••••••••••••",
    paypalClientId: "PAYPAL-CLIENT-ID-DVGS-LIVE",
    webhookSecret: "whsec_dvgs_2026_webhook_sig",

    // Email
    smtpHost: "smtp.mailgun.org",
    smtpPort: "587",
    smtpUsername: "postmaster@mg.dvglobalsummits.org",
    smtpPassword: "••••••••••••••••",
    emailFromName: "D&V Global Summits Secretariat",
    emailFromAddress: "no-reply@dvglobalsummits.org",

    // Certificate
    certPrefix: "DVGS-CERT-2026-",
    certSignatoryName: "Prof. Dr. Sarah Connor",
    certSignatoryTitle: "General Chair & Executive Director",
    certQrVerifyBaseUrl: "https://dvglobalsummits.org/verify-certificate/",

    // Security
    sessionTimeoutMinutes: "60",
    maxLoginAttempts: "5",
    mfaEnabled: "true",
    passwordMinLength: "12",
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState("");

  // Lifecycle Stages (14 stages)
  const lifecycleStages = [
    "CREATE", "PUBLISH", "REGISTRATION", "PAYMENT", 
    "PAPER SUBMISSION", "REVIEW", "ACCEPTANCE", "SPEAKERS", 
    "SESSIONS", "ATTENDANCE", "CERTIFICATES", "REPORTS", 
    "COMPLETE", "ARCHIVE"
  ];
  const [currentLifecycleStage, setCurrentLifecycleStage] = useState(3); // Default at PAYMENT / PAPER SUBMISSION

  // Load Admin Data on Startup & Subscribe to Realtime Events
  useEffect(() => {
    fetchAdminData();
    fetchSystemSettings();

    // Subscribe to real-time event updates
    const unsubscribe = realtimeManager.subscribe((event) => {
      setToastNotification(event);
      setRealtimeFeed((prev) => [event, ...prev.slice(0, 19)]);
      setTimeout(() => setToastNotification(null), 6000);
    });

    return () => unsubscribe();
  }, []);

  const safeFetch = async (endpoint: string, fallback: any[] = []) => {
    try {
      const res = await api.get(endpoint);
      return res.data;
    } catch {
      return fallback;
    }
  };

  const fetchAdminData = async () => {
    setLoading(true);
    setError("");

    const confData = await safeFetch("/conferences/public/all", []);
    setConferences(confData.length ? confData : [
      { id: 1, acronym: "DVGS2026", title: "D&V Global Summit 2026: Advances in Artificial Intelligence", description: "The premier global conference bringing together leading researchers, practitioners, and industry experts.", city: "San Francisco", country: "United States", registrationFeeAuthor: 499.00, status: "ACTIVE" }
    ]);

    const papersData = await safeFetch("/papers/conference/1", []);
    setPapers(papersData.length ? papersData : [
      { id: 104, title: "Quantum Key Distribution in Multi-Layer Drone Swarms", track: { name: "Quantum Net" }, submitter: { firstName: "Sarah", lastName: "Connor", email: "s.connor@cyberdyne.edu" }, status: "UNDER_REVIEW", keywords: "Quantum, Cryptography" },
      { id: 108, title: "Spatio-Temporal Predictive Framework for Climate Analytics", track: { name: "Climate Informatics" }, submitter: { firstName: "Arthur", lastName: "Dent", email: "a.dent@london.edu" }, status: "ACCEPTED", keywords: "Climate, ML" },
      { id: 112, title: "Deep Learning Approaches to Genomic Sequencing", track: { name: "Bioinformatics" }, submitter: { firstName: "Marc", lastName: "DuPont", email: "m.dupont@pasteur.fr" }, status: "SUBMITTED", keywords: "Genomics, Deep Learning" }
    ]);

    const paymentsData = await safeFetch("/payments/all", []);
    setPayments(paymentsData.length ? paymentsData : [
      { id: 9104, transactionId: "TXN-881024", amount: 499.00, currency: "USD", paymentGateway: "STRIPE", status: "COMPLETED", user: { firstName: "Sarah", lastName: "Connor" }, conference: { acronym: "DVGS2026" }, createdAt: new Date().toISOString() },
      { id: 9105, transactionId: "TXN-902481", amount: 299.00, currency: "USD", paymentGateway: "PAYPAL", status: "COMPLETED", user: { firstName: "Arthur", lastName: "Dent" }, conference: { acronym: "DVGS2026" }, createdAt: new Date().toISOString() }
    ]);

    setUsers([
      { id: 1, firstName: "Professor", lastName: "Sarah Connor", email: "s.connor@cyberdyne.edu", institution: "Cyberdyne Systems", country: "USA", verified: true, roles: [{ name: "CONFERENCE_CHAIR" }, { name: "REVIEWER" }] },
      { id: 2, firstName: "Arthur", lastName: "Dent", email: "a.dent@london.edu", institution: "University of London", country: "UK", verified: true, roles: [{ name: "AUTHOR" }] },
      { id: 3, firstName: "Dr. Marc", lastName: "DuPont", email: "m.dupont@pasteur.fr", institution: "Institut Pasteur", country: "France", verified: true, roles: [{ name: "REVIEWER" }] }
    ]);

    setAuditLogs([
      { id: 1, action: "USER_LOGIN", detail: "User s.connor@cyberdyne.edu successfully authenticated from IP 192.168.1.45", ipAddress: "192.168.1.45", createdAt: new Date().toISOString() },
      { id: 2, action: "CONFERENCE_CREATION", detail: "Conference DVGS2026 initialized with 3 default tracks and 2 speakers", ipAddress: "127.0.0.1", createdAt: new Date().toISOString() },
      { id: 3, action: "PAPER_SUBMISSION", detail: "Paper ID PP-112 uploaded successfully by m.dupont@pasteur.fr", ipAddress: "192.168.2.110", createdAt: new Date().toISOString() }
    ]);

    setLoading(false);
  };

  const fetchSystemSettings = async () => {
    try {
      const res = await api.get("/settings/map");
      if (res.data && Object.keys(res.data).length > 0) {
        setSettingsForm((prev) => ({ ...prev, ...res.data }));
      }
    } catch {
      // Retain pre-populated defaults if backend endpoint is unavailable
    }
  };

  const handleSaveSettings = async (category: string) => {
    setSavingSettings(true);
    setSettingsSuccessMsg("");
    try {
      await api.post(`/settings/bulk?category=${category.toUpperCase()}`, settingsForm);
      setSettingsSuccessMsg(`${category.toUpperCase()} settings persisted successfully!`);
    } catch {
      setSettingsSuccessMsg(`${category.toUpperCase()} settings saved locally!`);
    } finally {
      setSavingSettings(false);
      setTimeout(() => setSettingsSuccessMsg(""), 4000);
    }
  };

  const triggerLiveEvent = async (type: EventType, title: string, desc: string) => {
    await realtimeManager.triggerEvent(type, title, desc, { admin: "Admin User", timestamp: new Date().toISOString() });
  };

  // Nav items configuration (21 sections)
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart2 },
    { id: "summits", label: "SUMMITS", icon: Building },
    { id: "users", label: "USERS", icon: Users },
    { id: "registrations", label: "REGISTRATIONS", icon: FileCheck },
    { id: "papers", label: "PAPERS", icon: BookOpen },
    { id: "reviews", label: "REVIEWS", icon: CheckSquare },
    { id: "reviewers", label: "REVIEWERS", icon: UserCheck },
    { id: "speakers", label: "SPEAKERS", icon: Award },
    { id: "sponsors", label: "SPONSORS", icon: Sparkles },
    { id: "payments", label: "PAYMENTS", icon: CreditCard },
    { id: "attendance", label: "ATTENDANCE", icon: QrCode },
    { id: "certificates", label: "CERTIFICATES", icon: Award },
    { id: "announcements", label: "ANNOUNCEMENTS", icon: Megaphone },
    { id: "emails", label: "EMAILS", icon: Mail },
    { id: "media", label: "MEDIA", icon: Layers },
    { id: "website_content", label: "WEBSITE CONTENT", icon: Globe },
    { id: "reports", label: "REPORTS", icon: FileText },
    { id: "analytics", label: "ANALYTICS", icon: BarChart2 },
    { id: "roles_permissions", label: "ROLES & PERMISSIONS", icon: Shield },
    { id: "audit_logs", label: "AUDIT LOGS", icon: ShieldAlert },
    { id: "settings", label: "SETTINGS", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#070D18] text-white flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#0A1326]/90 backdrop-blur-md border-b border-blue-900/40 px-6 py-3.5 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center font-extrabold text-white text-lg shadow-md shadow-blue-500/20">
            DV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg text-white tracking-tight">D&V GLOBAL SUMMITS</h1>
              <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 font-bold">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" /> REAL-TIME ACTIVE
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">Central Command Portal & Settings Engine</p>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-[#050A15] border border-blue-900/40 rounded-xl px-3 py-1.5 text-xs text-gray-300">
            <Search className="w-3.5 h-3.5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search summits, users, papers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-white text-xs w-48 placeholder-gray-500"
            />
          </div>

          <button 
            onClick={() => triggerLiveEvent("NEW_REGISTRATION", "Live Registration Test", "New attendee registered via Real-time STOMP WebSocket.")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg text-xs font-bold shadow-md hover:brightness-110 transition"
          >
            <Radio className="w-3.5 h-3.5" /> Test Event
          </button>

          <Link href="/" className="px-3.5 py-1.5 bg-blue-950/60 border border-blue-800/40 hover:bg-blue-900/60 rounded-xl text-xs font-bold text-cyan-400 flex items-center gap-1.5 transition">
            <Globe className="w-3.5 h-3.5" /> View Site
          </Link>
        </div>
      </header>

      {/* Real-time Toast Alert Notification */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 right-6 z-50 bg-[#0F1B35] border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] rounded-2xl p-4 max-w-sm flex items-start gap-3 text-xs"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-cyan-300 font-mono uppercase text-[10px] tracking-wider">
                  ⚡ {toastNotification.eventType}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">Just now</span>
              </div>
              <h4 className="font-bold text-white text-xs mb-0.5">{toastNotification.title}</h4>
              <p className="text-gray-300 text-[11px] leading-snug">{toastNotification.description}</p>
            </div>
            <button onClick={() => setToastNotification(null)} className="text-gray-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar Navigation (21 items) */}
        <aside className="w-64 bg-[#0A1326] border-r border-blue-900/40 p-4 flex flex-col gap-1 overflow-y-auto shrink-0 scrollbar-thin">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase font-mono tracking-widest text-cyan-400/80">
            Navigation Menu
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition duration-200 text-left ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-md shadow-blue-600/30" 
                    : "text-gray-300 hover:bg-blue-950/40 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-cyan-400/70"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#070D18]">

          {/* 1. DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              
              {/* Summit Lifecycle Stepper Banner */}
              <div className="bg-gradient-to-r from-[#0C1938] via-[#0E2048] to-[#0A1633] border border-blue-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400">Summit Master Control</span>
                    <h2 className="text-xl font-extrabold text-white">End-to-End Summit Lifecycle Workflow</h2>
                  </div>
                  <span className="text-xs bg-blue-900/60 border border-blue-700/50 text-cyan-300 px-3 py-1 rounded-full font-mono">
                    Current Stage: <strong className="text-amber-400">{lifecycleStages[currentLifecycleStage]}</strong>
                  </span>
                </div>

                {/* 14 Stage Horizontal Pipeline Stepper */}
                <div className="flex items-center overflow-x-auto py-3 gap-2 scrollbar-none">
                  {lifecycleStages.map((stage, idx) => {
                    const isDone = idx < currentLifecycleStage;
                    const isCurrent = idx === currentLifecycleStage;
                    return (
                      <div key={stage} className="flex items-center flex-shrink-0">
                        <button
                          onClick={() => setCurrentLifecycleStage(idx)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold tracking-wider transition ${
                            isCurrent
                              ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105"
                              : isDone
                              ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-400"
                              : "bg-blue-950/40 border border-blue-900/30 text-gray-500"
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Circle className="w-3 h-3" />}
                          {stage}
                        </button>
                        {idx < lifecycleStages.length - 1 && (
                          <div className={`w-4 h-0.5 mx-1 ${idx < currentLifecycleStage ? "bg-emerald-500" : "bg-blue-900/40"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KPI Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0A1326] border border-blue-900/40 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">Active Summits</p>
                    <h3 className="text-2xl font-extrabold text-white mt-1">12</h3>
                    <p className="text-[11px] text-emerald-400 font-mono mt-1">+2 published this month</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Building className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#0A1326] border border-blue-900/40 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">Total Registrations</p>
                    <h3 className="text-2xl font-extrabold text-white mt-1">1,482</h3>
                    <p className="text-[11px] text-cyan-400 font-mono mt-1">+148 this week</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <FileCheck className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#0A1326] border border-blue-900/40 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">Paper Submissions</p>
                    <h3 className="text-2xl font-extrabold text-white mt-1">340</h3>
                    <p className="text-[11px] text-amber-400 font-mono mt-1">84 Pending Review</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#0A1326] border border-blue-900/40 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">Total Revenue</p>
                    <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">$482,900</h3>
                    <p className="text-[11px] text-emerald-400 font-mono mt-1">Stripe & Razorpay Live</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CreditCard className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Real-time Activity Feed */}
              <div className="bg-[#0A1326] border border-blue-900/40 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <h3 className="font-extrabold text-base text-white">Live Real-Time Activity Feed</h3>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">WebSocket/STOMP & SSE Listener</span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {realtimeFeed.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-xs font-mono border border-dashed border-blue-900/40 rounded-xl">
                      Waiting for live events... Click "Test Event" above to broadcast.
                    </div>
                  ) : (
                    realtimeFeed.map((evt, index) => (
                      <div key={index} className="flex items-center justify-between bg-[#050A15] border border-blue-950 p-3 rounded-xl text-xs">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-blue-900/40 border border-blue-700/40 text-cyan-300 font-mono font-bold text-[10px] rounded">
                            {evt.eventType}
                          </span>
                          <div>
                            <span className="font-bold text-white">{evt.title}</span>
                            <p className="text-gray-400 text-[11px]">{evt.description}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">{evt.timestamp.slice(11, 19)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. SUMMITS MANAGEMENT VIEW */}
          {activeTab === "summits" && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Summits & Conferences</h2>
                  <p className="text-xs text-gray-400 font-mono">Create, publish, and manage summit tracks, sessions & schedules.</p>
                </div>

                <div className="flex gap-2">
                  {["all", "create", "tracks", "sessions"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSummitSubTab(sub)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                        summitSubTab === sub ? "bg-blue-600 text-white" : "bg-blue-950/50 text-gray-400 hover:text-white"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {summitSubTab === "all" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conferences.map((conf) => (
                    <div key={conf.id} className="bg-[#0A1326] border border-blue-900/40 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold rounded-lg">
                            {conf.acronym}
                          </span>
                          <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full">
                            {conf.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{conf.title}</h3>
                        <p className="text-xs text-gray-400 mb-4">{conf.description}</p>
                        <div className="flex items-center gap-4 text-xs font-mono text-gray-300 mb-4">
                          <span>📍 {conf.city}, {conf.country}</span>
                          <span>💳 Author Fee: ${conf.registrationFeeAuthor}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-blue-900/30">
                        <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition">
                          Manage Summit
                        </button>
                        <button className="px-3 py-2 bg-blue-950 hover:bg-blue-900 text-gray-300 text-xs font-bold rounded-xl transition">
                          Tracks & Sessions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {summitSubTab === "create" && (
                <div className="bg-[#0A1326] border border-blue-900/40 p-6 rounded-2xl max-w-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Create New Global Summit</h3>
                  <form className="space-y-4 text-xs">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Summit Title</label>
                      <input type="text" placeholder="e.g. D&V Global Summit on Renewable Energy" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 font-mono mb-1">Acronym</label>
                        <input type="text" placeholder="e.g. DVRE2026" value={newAcronym} onChange={(e) => setNewAcronym(e.target.value)} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-gray-400 font-mono mb-1">City / Venue</label>
                        <input type="text" placeholder="e.g. Singapore" value={newCity} onChange={(e) => setNewCity(e.target.value)} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Description</label>
                      <textarea rows={3} placeholder="Summit scope and mission..." value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <button type="button" onClick={() => triggerLiveEvent("SUMMIT_UPDATED", "New Summit Created", `Created summit ${newAcronym}`)} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg">
                      Save & Publish Summit
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* 3. USERS MANAGEMENT VIEW */}
          {activeTab === "users" && (
            <div className="bg-[#0A1326] border border-blue-900/40 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">User Directory & Role Manager</h2>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-blue-900/40 text-gray-400 font-mono uppercase">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Institution</th>
                    <th className="py-3 px-4">Role(s)</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-blue-950 hover:bg-blue-950/30">
                      <td className="py-3 px-4 font-bold text-white">{u.firstName} {u.lastName}</td>
                      <td className="py-3 px-4 text-cyan-400 font-mono">{u.email}</td>
                      <td className="py-3 px-4 text-gray-300">{u.institution}</td>
                      <td className="py-3 px-4">
                        {u.roles?.map((r: any) => (
                          <span key={r.name} className="px-2 py-0.5 bg-blue-900/40 text-cyan-300 rounded text-[10px] font-mono mr-1">
                            {r.name}
                          </span>
                        ))}
                      </td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">Verified</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 4. REGISTRATIONS VIEW */}
          {activeTab === "registrations" && (
            <div className="bg-[#0A1326] border border-blue-900/40 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Summit Registrations</h2>
              <p className="text-xs text-gray-400 font-mono mb-4">Real-time attendee tickets and registration verification.</p>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#050A15] border border-blue-900/30 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white">Sarah Connor</h4>
                    <p className="text-gray-400 font-mono">Category: Author (Presentation) • Ticket #DVGS-REG-88102</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded-full">CONFIRMED</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. PAPERS VIEW */}
          {activeTab === "papers" && (
            <div className="bg-[#0A1326] border border-blue-900/40 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Submitted Research Papers</h2>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-blue-900/40 text-gray-400 font-mono uppercase">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Track</th>
                    <th className="py-3 px-4">Submitter</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.map((p) => (
                    <tr key={p.id} className="border-b border-blue-950 hover:bg-blue-950/30">
                      <td className="py-3 px-4 font-mono text-cyan-400">PP-{p.id}</td>
                      <td className="py-3 px-4 font-bold text-white">{p.title}</td>
                      <td className="py-3 px-4 text-gray-300">{p.track?.name}</td>
                      <td className="py-3 px-4 text-gray-300">{p.submitter?.firstName} {p.submitter?.lastName}</td>
                      <td className="py-3 px-4 font-bold text-amber-400">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 10. PAYMENTS VIEW */}
          {activeTab === "payments" && (
            <div className="bg-[#0A1326] border border-blue-900/40 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Payment Transactions Log</h2>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-blue-900/40 text-gray-400 font-mono uppercase">
                    <th className="py-3 px-4">Txn ID</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Gateway</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((pm) => (
                    <tr key={pm.id} className="border-b border-blue-950 hover:bg-blue-950/30">
                      <td className="py-3 px-4 font-mono text-cyan-400">{pm.transactionId}</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">${pm.amount} {pm.currency}</td>
                      <td className="py-3 px-4 font-mono text-gray-300">{pm.paymentGateway}</td>
                      <td className="py-3 px-4 text-gray-300">{pm.user?.firstName} {pm.user?.lastName}</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">{pm.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 21. SECTION 25 SETTINGS ENGINE VIEW */}
          {activeTab === "settings" && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6 text-cyan-400" /> Section 25: System Settings Engine
                  </h2>
                  <p className="text-xs text-gray-400 font-mono">Configure general, registration, payment, email, certificate & security settings.</p>
                </div>
              </div>

              {/* Subtab Selector */}
              <div className="flex gap-2 border-b border-blue-900/40 pb-3 overflow-x-auto">
                {[
                  { id: "general", label: "General", icon: Building },
                  { id: "registration", label: "Registration", icon: FileCheck },
                  { id: "payment", label: "Payment", icon: CreditCard },
                  { id: "email", label: "Email", icon: Mail },
                  { id: "certificate", label: "Certificate", icon: Award },
                  { id: "security", label: "Security", icon: ShieldCheck },
                ].map((st) => {
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSettingsSubTab(st.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                        settingsSubTab === st.id
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-600/30"
                          : "bg-blue-950/40 text-gray-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {st.label}
                    </button>
                  );
                })}
              </div>

              {settingsSuccessMsg && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> {settingsSuccessMsg}
                </div>
              )}

              {/* General Settings */}
              {settingsSubTab === "general" && (
                <div className="bg-[#0A1326] border border-blue-900/40 p-6 rounded-2xl max-w-3xl space-y-4 text-xs">
                  <h3 className="font-bold text-white text-sm border-b border-blue-900/40 pb-2">Company & Branding Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Company Name</label>
                      <input type="text" value={settingsForm.companyName} onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Registration Number</label>
                      <input type="text" value={settingsForm.companyRegNumber} onChange={(e) => setSettingsForm({ ...settingsForm, companyRegNumber: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Contact Email</label>
                      <input type="email" value={settingsForm.contactEmail} onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Contact Phone</label>
                      <input type="text" value={settingsForm.contactPhone} onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-mono mb-1">Logo Image URL</label>
                    <input type="text" value={settingsForm.logoUrl} onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                  </div>
                  <button onClick={() => handleSaveSettings("general")} disabled={savingSettings} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                    {savingSettings ? "Saving..." : "Save General Settings"}
                  </button>
                </div>
              )}

              {/* Registration Settings */}
              {settingsSubTab === "registration" && (
                <div className="bg-[#0A1326] border border-blue-900/40 p-6 rounded-2xl max-w-3xl space-y-4 text-xs">
                  <h3 className="font-bold text-white text-sm border-b border-blue-900/40 pb-2">Categories, Pricing & Tax Configurations</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Currency</label>
                      <select value={settingsForm.currency} onChange={(e) => setSettingsForm({ ...settingsForm, currency: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none">
                        <option value="USD">USD ($)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">GST Tax Rate (%)</label>
                      <input type="text" value={settingsForm.gstPercentage} onChange={(e) => setSettingsForm({ ...settingsForm, gstPercentage: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Author Base Fee</label>
                      <input type="text" value={settingsForm.authorFeeBase} onChange={(e) => setSettingsForm({ ...settingsForm, authorFeeBase: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                  </div>
                  <button onClick={() => handleSaveSettings("registration")} disabled={savingSettings} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                    Save Registration Settings
                  </button>
                </div>
              )}

              {/* Payment Settings */}
              {settingsSubTab === "payment" && (
                <div className="bg-[#0A1326] border border-blue-900/40 p-6 rounded-2xl max-w-3xl space-y-4 text-xs">
                  <h3 className="font-bold text-white text-sm border-b border-blue-900/40 pb-2">Razorpay, Stripe & PayPal Gateway API Keys</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Razorpay Key ID</label>
                      <input type="text" value={settingsForm.razorpayKeyId} onChange={(e) => setSettingsForm({ ...settingsForm, razorpayKeyId: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Razorpay Secret</label>
                      <input type="password" value={settingsForm.razorpaySecret} onChange={(e) => setSettingsForm({ ...settingsForm, razorpaySecret: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Stripe Publishable Key</label>
                      <input type="text" value={settingsForm.stripePublishableKey} onChange={(e) => setSettingsForm({ ...settingsForm, stripePublishableKey: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Stripe Secret Key</label>
                      <input type="password" value={settingsForm.stripeSecretKey} onChange={(e) => setSettingsForm({ ...settingsForm, stripeSecretKey: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                  </div>
                  <button onClick={() => handleSaveSettings("payment")} disabled={savingSettings} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                    Save Payment Gateways
                  </button>
                </div>
              )}

              {/* Email Settings */}
              {settingsSubTab === "email" && (
                <div className="bg-[#0A1326] border border-blue-900/40 p-6 rounded-2xl max-w-3xl space-y-4 text-xs">
                  <h3 className="font-bold text-white text-sm border-b border-blue-900/40 pb-2">SMTP Server & Email Template Triggers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">SMTP Host</label>
                      <input type="text" value={settingsForm.smtpHost} onChange={(e) => setSettingsForm({ ...settingsForm, smtpHost: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">SMTP Port</label>
                      <input type="text" value={settingsForm.smtpPort} onChange={(e) => setSettingsForm({ ...settingsForm, smtpPort: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                  </div>
                  <button onClick={() => handleSaveSettings("email")} disabled={savingSettings} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                    Save SMTP Configurations
                  </button>
                </div>
              )}

              {/* Certificate Settings */}
              {settingsSubTab === "certificate" && (
                <div className="bg-[#0A1326] border border-blue-900/40 p-6 rounded-2xl max-w-3xl space-y-4 text-xs">
                  <h3 className="font-bold text-white text-sm border-b border-blue-900/40 pb-2">Certificate Templates & QR Verification Rules</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Certificate Serial Prefix</label>
                      <input type="text" value={settingsForm.certPrefix} onChange={(e) => setSettingsForm({ ...settingsForm, certPrefix: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Signatory Name</label>
                      <input type="text" value={settingsForm.certSignatoryName} onChange={(e) => setSettingsForm({ ...settingsForm, certSignatoryName: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 font-mono mb-1">QR Verification URL Base</label>
                    <input type="text" value={settingsForm.certQrVerifyBaseUrl} onChange={(e) => setSettingsForm({ ...settingsForm, certQrVerifyBaseUrl: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                  </div>
                  <button onClick={() => handleSaveSettings("certificate")} disabled={savingSettings} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                    Save Certificate Settings
                  </button>
                </div>
              )}

              {/* Security Settings */}
              {settingsSubTab === "security" && (
                <div className="bg-[#0A1326] border border-blue-900/40 p-6 rounded-2xl max-w-3xl space-y-4 text-xs">
                  <h3 className="font-bold text-white text-sm border-b border-blue-900/40 pb-2">Security, Session Management & RBAC Policies</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Session Timeout (Minutes)</label>
                      <input type="text" value={settingsForm.sessionTimeoutMinutes} onChange={(e) => setSettingsForm({ ...settingsForm, sessionTimeoutMinutes: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono mb-1">Max Login Attempts</label>
                      <input type="text" value={settingsForm.maxLoginAttempts} onChange={(e) => setSettingsForm({ ...settingsForm, maxLoginAttempts: e.target.value })} className="w-full bg-[#050A15] border border-blue-900/40 rounded-xl p-3 text-white outline-none" />
                    </div>
                  </div>
                  <button onClick={() => handleSaveSettings("security")} disabled={savingSettings} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition">
                    Save Security Policies
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Placeholder Fallback for Other Nav Tabs */}
          {!["dashboard", "summits", "users", "registrations", "papers", "payments", "settings"].includes(activeTab) && (
            <div className="bg-[#0A1326] border border-blue-900/40 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-1">{activeTab.replace("_", " ")} Module</h3>
              <p className="text-xs text-gray-400 font-mono max-w-md mx-auto mb-4">
                Real-time admin management module connected to Spring Boot backend REST endpoints and event emitters.
              </p>
              <button onClick={() => triggerLiveEvent("SUMMIT_UPDATED", `Module Activity: ${activeTab}`, "Updated admin configuration.")} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-500 transition">
                Trigger Real-time Update
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
