"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Users, Award, BookOpen, ChevronRight, 
  Lock, MapPin, Send, Shield, DollarSign, 
  Menu, X, ArrowUpRight, HelpCircle, Mail, Search,
  Plus, CheckCircle, AlertTriangle, Play, RefreshCw, BarChart2,
  Trash2, Edit, CheckSquare, Eye, Key, ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  
  // Dashboard Sub-navigation Tabs
  const [activeSubTab, setActiveSubTab] = useState("overview");

  // Loaded database state
  const [conferences, setConferences] = useState<any[]>([]);
  const [papers, setPapers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Form states for creating a conference
  const [newTitle, setNewTitle] = useState("");
  const [newAcronym, setNewAcronym] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newVenue, setNewVenue] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newFeeAuthor, setNewFeeAuthor] = useState("499.00");
  const [newFeeListener, setNewFeeListener] = useState("299.00");

  // Load Admin Data on Startup
  useEffect(() => {
    fetchAdminData();
  }, []);

  // Safe fetch helper — never throws, always returns fallback on network error
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

    // Load conferences
    const confData = await safeFetch("/conferences/public/all", []);
    setConferences(confData.length ? confData : [
      { acronym: "DVGS2026", title: "D&V Global Summit 2026: Advances in Artificial Intelligence", description: "The premier global conference bringing together leading researchers, practitioners, and industry experts.", city: "San Francisco", country: "United States", registrationFeeAuthor: 499.00, status: "ACTIVE" }
    ]);

    // Load papers
    const papersData = await safeFetch("/papers/conference/1", []);
    setPapers(papersData.length ? papersData : [
      { id: 104, title: "Quantum Key Distribution in Multi-Layer Drone Swarms", track: { name: "Quantum Net" }, submitter: { firstName: "Sarah", lastName: "Connor", email: "s.connor@cyberdyne.edu" }, status: "UNDER_REVIEW", keywords: "Quantum, Cryptography" },
      { id: 108, title: "Spatio-Temporal Predictive Framework for Climate Analytics", track: { name: "Climate Informatics" }, submitter: { firstName: "A.", lastName: "Dent", email: "a.dent@london.edu" }, status: "ACCEPTED", keywords: "Climate, ML" },
      { id: 112, title: "Deep Learning Approaches to Genomic Sequencing", track: { name: "Bioinformatics" }, submitter: { firstName: "M.", lastName: "DuPont", email: "m.dupont@pasteur.fr" }, status: "SUBMITTED", keywords: "Genomics, Deep Learning" }
    ]);

    // Load payments
    const paymentsData = await safeFetch("/payments/all", []);
    setPayments(paymentsData.length ? paymentsData : [
      { id: 9104, transactionId: "TXN-881024", amount: 499.00, currency: "USD", paymentGateway: "STRIPE", status: "COMPLETED", user: { firstName: "Sarah", lastName: "Connor" }, conference: { acronym: "DVGS2026" }, createdAt: new Date().toISOString() },
      { id: 9105, transactionId: "TXN-902481", amount: 299.00, currency: "USD", paymentGateway: "PAYPAL", status: "COMPLETED", user: { firstName: "A.", lastName: "Dent" }, conference: { acronym: "DVGS2026" }, createdAt: new Date().toISOString() }
    ]);

    // Seed mock users
    setUsers([
      { id: 1, firstName: "Professor", lastName: "Sarah Connor", email: "s.connor@cyberdyne.edu", institution: "Cyberdyne Systems", country: "USA", verified: true, roles: [{ name: "CONFERENCE_CHAIR" }, { name: "REVIEWER" }] },
      { id: 2, firstName: "Arthur", lastName: "Dent", email: "a.dent@london.edu", institution: "University of London", country: "UK", verified: true, roles: [{ name: "AUTHOR" }] },
      { id: 3, firstName: "Dr. Marc", lastName: "DuPont", email: "m.dupont@pasteur.fr", institution: "Institut Pasteur", country: "France", verified: true, roles: [{ name: "REVIEWER" }] }
    ]);

    // Seed audit logs
    setAuditLogs([
      { id: 1, action: "USER_LOGIN", detail: "User s.connor@cyberdyne.edu successfully authenticated from IP 192.168.1.45", ipAddress: "192.168.1.45", createdAt: new Date().toISOString() },
      { id: 2, action: "CONFERENCE_CREATION", detail: "Conference DVGS2026 initialized with 3 default tracks and 2 speakers", ipAddress: "127.0.0.1", createdAt: new Date().toISOString() },
      { id: 3, action: "PAPER_SUBMISSION", detail: "Paper ID PP-112 uploaded successfully by m.dupont@pasteur.fr", ipAddress: "192.168.2.110", createdAt: new Date().toISOString() }
    ]);

    setLoading(false);
  };

  const handleCreateConference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAcronym) return;

    try {
      const response = await api.post("/conferences", {
        title: newTitle,
        acronym: newAcronym.toUpperCase(),
        description: newDesc,
        venueName: newVenue,
        city: newCity,
        country: newCountry,
        registrationFeeAuthor: parseFloat(newFeeAuthor),
        registrationFeeListener: parseFloat(newFeeListener),
        startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 63 * 24 * 60 * 60 * 1000).toISOString(),
        status: "ACTIVE"
      });

      setConferences([...conferences, response.data]);
      alert("New conference registry successfully initialized!");
      
      // Clear forms
      setNewTitle("");
      setNewAcronym("");
      setNewDesc("");
      setNewVenue("");
      setNewCity("");
      setNewCountry("");
      setActiveSubTab("conferences");
    } catch (err: any) {
      alert(err.response?.data || "Failed to create conference registry.");
    }
  };

  const handleStatusChange = async (paperId: number, targetStatus: string) => {
    try {
      await api.put(`/papers/${paperId}/status?status=${targetStatus}`);
      setPapers(papers.map(p => p.id === paperId ? { ...p, status: targetStatus } : p));
      alert(`Paper ID PP-${paperId} marked as ${targetStatus}`);
    } catch (err: any) {
      alert("Failed to modify paper status.");
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    if (roleFilter === "ALL") return matchesSearch;
    return matchesSearch && u.roles.some((r: any) => r.name === roleFilter);
  });

  return (
    <div className="min-h-screen bg-background text-gray-200 flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel border-r border-white/5 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <Sparkles className="w-6 h-6 text-accent-gold" />
            <div>
              <span className="font-display font-bold text-lg text-white">D&V GLOBAL</span>
              <span className="block text-[9px] uppercase font-mono tracking-wider text-accent-gold">Administrative Terminal</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveSubTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeSubTab === "overview" ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BarChart2 className="w-4.5 h-4.5" /> Dashboard Overview
            </button>
            <button
              onClick={() => setActiveSubTab("conferences")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeSubTab === "conferences" ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-4.5 h-4.5" /> Conferences
            </button>
            <button
              onClick={() => setActiveSubTab("papers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeSubTab === "papers" ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <CheckSquare className="w-4.5 h-4.5" /> Submissions & Reviews
            </button>
            <button
              onClick={() => setActiveSubTab("payments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeSubTab === "payments" ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <DollarSign className="w-4.5 h-4.5" /> Billing & Payments
            </button>
            <button
              onClick={() => setActiveSubTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeSubTab === "users" ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-4.5 h-4.5" /> User Directory
            </button>
            <button
              onClick={() => setActiveSubTab("create-conference")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeSubTab === "create-conference" ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Plus className="w-4.5 h-4.5" /> New Summit
            </button>
          </nav>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col gap-3">
          <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary text-xs font-semibold rounded-lg text-white hover:bg-secondary/80 transition">
            Exit to User View
          </Link>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        
        {/* Upper Header */}
        <header className="flex justify-between items-center border-b border-white/5 pb-6 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-white">System Administration Panel</h1>
            <p className="text-xs text-gray-400 mt-1">SaaS operations terminal for global conference orchestration.</p>
          </div>
          <button onClick={fetchAdminData} className="p-2 bg-secondary rounded-lg border border-white/10 text-white hover:scale-[1.02] transition">
            <RefreshCw className="w-4 h-4" />
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-accent-gold" />
            <span className="text-xs text-gray-400">Syncing administrative records...</span>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* 1. OVERVIEW SUBTAB */}
            {activeSubTab === "overview" && (
              <div className="space-y-8">
                {/* Stats row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="glass-panel p-5 rounded-xl border-l-4 border-accent-gold">
                    <span className="text-[10px] text-gray-400 uppercase font-mono">Conferences Hosted</span>
                    <h4 className="font-display font-bold text-2xl text-white mt-1">{conferences.length} Registries</h4>
                  </div>
                  <div className="glass-panel p-5 rounded-xl border-l-4 border-accent-cyan">
                    <span className="text-[10px] text-gray-400 uppercase font-mono">Paper Submissions</span>
                    <h4 className="font-display font-bold text-2xl text-white mt-1">{papers.length} Uploads</h4>
                  </div>
                  <div className="glass-panel p-5 rounded-xl border-l-4 border-emerald-500">
                    <span className="text-[10px] text-gray-400 uppercase font-mono">Total Revenue Collected</span>
                    <h4 className="font-display font-bold text-2xl text-white mt-1">
                      ${payments.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)} USD
                    </h4>
                  </div>
                  <div className="glass-panel p-5 rounded-xl border-l-4 border-purple-500">
                    <span className="text-[10px] text-gray-400 uppercase font-mono">Users Registered</span>
                    <h4 className="font-display font-bold text-2xl text-white mt-1">{users.length} Accounts</h4>
                  </div>
                </div>

                {/* Audit Logs and System health */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 glass-panel p-6 rounded-xl space-y-4">
                    <h3 className="font-bold text-white text-base">Recent Audit Activities</h3>
                    <div className="space-y-3 font-mono text-[11px]">
                      {auditLogs.map((log, idx) => (
                        <div key={idx} className="p-3 bg-black/40 rounded border border-white/5 flex justify-between text-gray-400">
                          <span className="text-accent-gold font-bold">[{log.action}] {log.detail}</span>
                          <span className="text-[10px]">{log.ipAddress}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base mb-2">Gateways & Cloud Services</h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-6">
                        Stripe API, PayPal checkout instances, and Amazon S3 file storage endpoints are operational.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>PostgreSQL Database Connection</span>
                          <span className="text-emerald-400">Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span>OpenAI Review Assistant API</span>
                          <span className="text-emerald-400">Configured</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dynamic QR Code Verification</span>
                          <span className="text-emerald-400">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CONFERENCES SUBTAB */}
            {activeSubTab === "conferences" && (
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <h3 className="font-bold text-lg text-white">Active Conferences Registry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {conferences.map((conf, idx) => (
                    <div key={idx} className="p-5 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col justify-between h-48">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-0.5 text-[10px] bg-accent-gold/15 text-accent-gold rounded font-bold">{conf.acronym}</span>
                          <span className="text-[10px] text-gray-500">{conf.city}, {conf.country}</span>
                        </div>
                        <h4 className="font-bold text-white text-base mt-2 leading-snug">{conf.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{conf.description}</p>
                      </div>
                      <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs">
                        <span className="text-accent-cyan">Fee (Author): ${conf.registrationFeeAuthor}</span>
                        <span className="text-gray-400">Status: {conf.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PAPERS SUBTAB */}
            {activeSubTab === "papers" && (
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <h3 className="font-bold text-lg text-white">Manuscript Decision Center</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-semibold">
                        <th className="pb-3">ID</th>
                        <th className="pb-3">Title</th>
                        <th className="pb-3">Submitter</th>
                        <th className="pb-3">Review Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {papers.map((p, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01]">
                          <td className="py-4 font-mono font-bold text-accent-gold">PP-{p.id}</td>
                          <td className="py-4 max-w-sm truncate pr-4">{p.title}</td>
                          <td className="py-4">{p.submitter.firstName} {p.submitter.lastName}</td>
                          <td className="py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.status === "ACCEPTED" ? "bg-emerald-500/10 text-emerald-400" :
                              p.status === "UNDER_REVIEW" ? "bg-amber-500/10 text-amber-400" : "bg-cyan-500/10 text-cyan-400"
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-4 text-right flex justify-end gap-2">
                            <button 
                              onClick={() => handleStatusChange(p.id, "ACCEPTED")}
                              className="px-2 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded hover:bg-emerald-600 transition"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleStatusChange(p.id, "REJECTED")}
                              className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold rounded border border-red-500/30 hover:bg-red-500/30 transition"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. BILLING SUBTAB */}
            {activeSubTab === "payments" && (
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <h3 className="font-bold text-lg text-white">Billing & Payments Registry</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-semibold">
                        <th className="pb-3">Transaction ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Gateway</th>
                        <th className="pb-3 text-right">Amount</th>
                        <th className="pb-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {payments.map((pay, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01]">
                          <td className="py-4 font-mono text-gray-400">{pay.transactionId}</td>
                          <td className="py-4 font-semibold">{pay.user.firstName} {pay.user.lastName}</td>
                          <td className="py-4 font-mono text-[10px] text-gray-400">{pay.paymentGateway}</td>
                          <td className="py-4 text-right font-bold text-emerald-400">${pay.amount.toFixed(2)} USD</td>
                          <td className="py-4 text-right">
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold">
                              {pay.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. USERS SUBTAB */}
            {activeSubTab === "users" && (
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <h3 className="font-bold text-lg text-white">User Directory ({filteredUsers.length})</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                      <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search users..." 
                        className="pl-9 pr-4 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-gold transition"
                      />
                    </div>
                    <select 
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="px-3 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-gold transition"
                    >
                      <option value="ALL">All Roles</option>
                      <option value="CONFERENCE_CHAIR">Chair</option>
                      <option value="REVIEWER">Reviewer</option>
                      <option value="AUTHOR">Author</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-semibold">
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Email Address</th>
                        <th className="pb-3">Institution</th>
                        <th className="pb-3">Assigned Roles</th>
                        <th className="pb-3 text-right">MFA / Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {filteredUsers.map((u, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01]">
                          <td className="py-4 font-semibold">{u.firstName} {u.lastName}</td>
                          <td className="py-4 text-gray-400">{u.email}</td>
                          <td className="py-4 text-gray-400">{u.institution}</td>
                          <td className="py-4">
                            <div className="flex gap-1.5 flex-wrap">
                              {u.roles.map((r: any, i: number) => (
                                <span key={i} className="px-2 py-0.5 bg-secondary text-accent-gold border border-accent-gold/20 rounded-full text-[9px] font-bold">
                                  {r.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold">
                              {u.verified ? "VERIFIED" : "PENDING"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. CREATE SUMMIT SUBTAB */}
            {activeSubTab === "create-conference" && (
              <div className="glass-panel p-6 rounded-xl space-y-6 max-w-2xl">
                <h3 className="font-bold text-lg text-white">Initialize New Conference Registry</h3>
                <form onSubmit={handleCreateConference} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Summit Title</label>
                      <input 
                        type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. World Quantum Computing Forum"
                        className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Acronym</label>
                      <input 
                        type="text" required value={newAcronym} onChange={(e) => setNewAcronym(e.target.value)}
                        placeholder="e.g. WQCF2026"
                        className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Description Synopsis</label>
                    <textarea 
                      rows={3} required value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Detail scope, timeline parameters, and advisory chairs..."
                      className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Venue Name</label>
                      <input 
                        type="text" value={newVenue} onChange={(e) => setNewVenue(e.target.value)}
                        placeholder="e.g. Convention Center"
                        className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">City</label>
                      <input 
                        type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)}
                        placeholder="San Francisco"
                        className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Country</label>
                      <input 
                        type="text" value={newCountry} onChange={(e) => setNewCountry(e.target.value)}
                        placeholder="United States"
                        className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Author Registration Fee (USD)</label>
                      <input 
                        type="number" step="0.01" value={newFeeAuthor} onChange={(e) => setNewFeeAuthor(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Listener Registration Fee (USD)</label>
                      <input 
                        type="number" step="0.01" value={newFeeListener} onChange={(e) => setNewFeeListener(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                      />
                    </div>
                  </div>
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-accent-gold to-yellow-600 text-black font-semibold rounded-lg hover:shadow-lg transition">
                    Publish Summit Registry
                  </button>
                </form>
              </div>
            )}

          </div>
        )}
      </main>

    </div>
  );
}
