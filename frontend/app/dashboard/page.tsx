"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, FileText, CheckCircle, Award, CreditCard, 
  BookOpen, Plus, Calendar, Star, ShieldAlert, 
  Settings, LogOut, ChevronRight, Download, RefreshCw,
  Eye, FileCode, CheckSquare, Search, TrendingUp, AlertTriangle, QrCode
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>({
    firstName: "Professor",
    lastName: "Sarah Connor",
    email: "s.connor@cyberdyne.edu",
    roles: ["ROLE_AUTHOR", "ROLE_REVIEWER", "ROLE_ADMIN"]
  });

  const [activeTab, setActiveTab] = useState("overview");

  // Submissions State
  const [papers, setPapers] = useState([
    { id: "PP-2026-904", title: "Quantum Key Distribution in Multi-Layer Ad-Hoc Drone Swarms", track: "Quantum Networking", status: "UNDER_REVIEW", submittedAt: "July 24, 2026", author: "Sarah Connor" },
    { id: "PP-2026-102", title: "Spatio-Temporal Predictive Framework for Climate Analytics", track: "Climate Informatics", status: "ACCEPTED", submittedAt: "June 12, 2026", author: "Sarah Connor" }
  ]);

  // Abstract / Paper submission form inputs
  const [newTitle, setNewTitle] = useState("");
  const [newAbstract, setNewAbstract] = useState("");
  const [newTrack, setNewTrack] = useState("Quantum Networking");
  const [newCoAuthors, setNewCoAuthors] = useState("");

  // Reviewer Assignments
  const [assignedPapers, setAssignedPapers] = useState([
    { id: "RV-2026-302", title: "Decentralized Proof-of-Authority Consensus for Microgrids", track: "Smart Energy Systems", author: "A. Patel", score: null },
    { id: "RV-2026-784", title: "Deep Learning Approaches to Genomic Variant Sequencing", track: "Bioinformatics", author: "M. DuPont", score: 4.5 }
  ]);

  // Review rating inputs
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [scoreOriginality, setScoreOriginality] = useState(5);
  const [scoreQuality, setScoreQuality] = useState(4);
  const [scoreRelevance, setScoreRelevance] = useState(5);
  const [scoreClarity, setScoreClarity] = useState(4);
  const [commentsAuthor, setCommentsAuthor] = useState("");
  const [commentsChair, setCommentsChair] = useState("");

  // Invoices & Payments State
  const [payments, setPayments] = useState([
    { id: "INV-89104", conference: "AI & Quantum Summit 2026", amount: 450.00, status: "COMPLETED", date: "July 28, 2026", gateway: "STRIPE" },
    { id: "INV-78291", conference: "Bio-Medicine Congress 2026", amount: 350.00, status: "COMPLETED", date: "June 15, 2026", gateway: "PAYPAL" }
  ]);

  // Certificates Issued
  const [certificates, setCertificates] = useState([
    { id: "CERT-QA-882", conference: "Bio-Medicine Congress 2026", type: "PRESENTATION", issuedAt: "July 29, 2026", code: "DV-GEN-882-90" }
  ]);

  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleNewPaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAbstract) return;

    const paperId = `PP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newObj = {
      id: paperId,
      title: newTitle,
      abstract: newAbstract,
      track: newTrack,
      status: "SUBMITTED",
      submittedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: `${user.firstName} ${user.lastName}`
    };

    setPapers([newObj, ...papers]);
    setNewTitle("");
    setNewAbstract("");
    setNewCoAuthors("");
    alert("Abstract and Paper structure submitted successfully to peer review cycle.");
    setActiveTab("submissions");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReviewId) return;

    // Update assignment state to reflect review completion
    const avg = ((scoreOriginality + scoreQuality + scoreRelevance + scoreClarity) / 4).toFixed(1);
    setAssignedPapers(assignedPapers.map(p => {
      if (p.id === selectedReviewId) {
        return { ...p, score: parseFloat(avg) };
      }
      return p;
    }));

    setSelectedReviewId(null);
    setCommentsAuthor("");
    setCommentsChair("");
    alert("Review recommendation logged and signed digitally.");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-xs rounded-full">Accepted</span>;
      case "UNDER_REVIEW":
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 text-xs rounded-full">Under Review</span>;
      case "SUBMITTED":
        return <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 text-xs rounded-full">Submitted</span>;
      default:
        return <span className="bg-gray-500/10 text-gray-400 border border-gray-500/20 px-2.5 py-1 text-xs rounded-full">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-200 flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel border-r border-white/5 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <Sparkles className="w-6 h-6 text-accent-gold" />
            <span className="font-display font-bold text-lg text-white">
              D&V <span className="text-accent-gold">GLOBAL</span>
            </span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeTab === "overview" 
                  ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <TrendingUp className="w-4.5 h-4.5" /> Overview
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeTab === "submissions" 
                  ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileText className="w-4.5 h-4.5" /> Paper Submissions
            </button>
            <button
              onClick={() => setActiveTab("reviewer")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeTab === "reviewer" 
                  ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <CheckSquare className="w-4.5 h-4.5" /> Reviewer Center
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeTab === "payments" 
                  ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <CreditCard className="w-4.5 h-4.5" /> Payments & Invoices
            </button>
            <button
              onClick={() => setActiveTab("certificates")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition ${
                activeTab === "certificates" 
                  ? "bg-secondary text-accent-gold border-l-2 border-accent-gold" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Award className="w-4.5 h-4.5" /> Certificates
            </button>
            <Link
              href="/dashboard/admin"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition text-gray-400 hover:text-white hover:bg-white/5"
            >
              <FileCode className="w-4.5 h-4.5" /> Admin Panel
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/5 pt-6">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 bg-accent-gold/20 rounded-full flex items-center justify-center font-bold text-accent-gold text-sm border border-accent-gold/30">
              {user.firstName[0]}
            </div>
            <div className="overflow-hidden">
              <h5 className="text-xs font-bold text-white truncate">{user.firstName} {user.lastName}</h5>
              <span className="text-[10px] text-gray-500 truncate block">{user.email}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <LogOut className="w-4.5 h-4.5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        
        {/* Upper Header */}
        <header className="flex justify-between items-center border-b border-white/5 pb-6 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-white">Conference Portal</h1>
            <p className="text-xs text-gray-400 mt-1">Manage submissions, download credentials, and evaluate track logs.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-mono tracking-wider text-accent-gold font-bold">Authenticated Profile</span>
              <div className="text-xs font-semibold text-white">
                {user.roles.includes("ROLE_ADMIN") ? "Super Chair" : "Academic Delegate"}
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow shadow-emerald-500/50" />
          </div>
        </header>

        {/* Tab content switcher */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-panel p-5 rounded-xl border-l-4 border-accent-cyan flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-mono">My Submissions</span>
                  <h4 className="font-display font-bold text-2xl text-white mt-1">{papers.length} Papers</h4>
                </div>
                <FileText className="w-8 h-8 text-accent-cyan/60" />
              </div>
              <div className="glass-panel p-5 rounded-xl border-l-4 border-accent-gold flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Assigned Reviews</span>
                  <h4 className="font-display font-bold text-2xl text-white mt-1">2 Pending</h4>
                </div>
                <CheckSquare className="w-8 h-8 text-accent-gold/60" />
              </div>
              <div className="glass-panel p-5 rounded-xl border-l-4 border-emerald-500 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Paid Registration</span>
                  <h4 className="font-display font-bold text-2xl text-white mt-1">$800.00 USD</h4>
                </div>
                <CreditCard className="w-8 h-8 text-emerald-500/60" />
              </div>
              <div className="glass-panel p-5 rounded-xl border-l-4 border-purple-500 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-mono">Certificates Verified</span>
                  <h4 className="font-display font-bold text-2xl text-white mt-1">1 Verified</h4>
                </div>
                <Award className="w-8 h-8 text-purple-500/60" />
              </div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Submission Status List */}
              <div className="lg:col-span-2 glass-panel p-6 rounded-xl space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-white">Recent Research Status</h3>
                  <button onClick={() => setActiveTab("submissions")} className="text-xs text-accent-cyan hover:underline flex items-center">
                    New Submission <Plus className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {papers.map((paper, idx) => (
                    <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-snug mb-1.5">{paper.title}</h4>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>ID: {paper.id}</span>
                          <span>Track: {paper.track}</span>
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        {getStatusBadge(paper.status)}
                        <span className="block text-[10px] text-gray-500 mt-2">{paper.submittedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info Board */}
              <div className="glass-panel p-6 rounded-xl space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white mb-2">Notice & Announcements</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    The review deadline for the Quantum Key Distribution track has been extended to August 15, 2026.
                  </p>
                  <div className="p-3.5 bg-accent-gold/5 border border-accent-gold/20 rounded-lg text-xs text-accent-gold mb-3 flex gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Double-blind rules apply. Do not include author tags in submission PDF.</span>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <button onClick={() => alert("Connecting Live Support Client...")} className="w-full py-2.5 bg-secondary text-xs font-semibold rounded-lg text-white text-center hover:bg-secondary/80 transition">
                    Contact Track Chair
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paper Submissions Tab */}
        {activeTab === "submissions" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Submission Form */}
              <div className="lg:col-span-2 glass-panel p-6 rounded-xl space-y-6">
                <h3 className="font-bold text-lg text-white">Submit New Paper Abstract</h3>
                <form onSubmit={handleNewPaperSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Paper / Presentation Title</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Adaptive Convolutional Feature Extraction in Bio-medical Assays"
                      className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Target Conference Track</label>
                    <select
                      value={newTrack}
                      onChange={(e) => setNewTrack(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-gold transition"
                    >
                      <option value="Quantum Networking" className="bg-surface">Quantum Networking & Cryptography</option>
                      <option value="Climate Informatics" className="bg-surface">Climate Informatics & Sustainable Systems</option>
                      <option value="Bioinformatics" className="bg-surface">Genomic Informatics & Biology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Abstract Summary (Max 500 words)</label>
                    <textarea
                      rows={5}
                      required
                      value={newAbstract}
                      onChange={(e) => setNewAbstract(e.target.value)}
                      placeholder="Provide a comprehensive synopsis containing research methodology and primary dataset parameters..."
                      className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Co-Authors & Affiliations (Comma-separated)</label>
                    <input
                      type="text"
                      value={newCoAuthors}
                      onChange={(e) => setNewCoAuthors(e.target.value)}
                      placeholder="e.g. Dr. Arthur Dent (Univ. of London), Dr. Ford Prefect"
                      className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                    />
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-dashed border-white/15 rounded-lg flex flex-col items-center justify-center text-center">
                    <FileText className="w-8 h-8 text-gray-500 mb-2" />
                    <span className="text-xs font-semibold text-white mb-1">Drag and drop abstract manuscript PDF</span>
                    <span className="text-[10px] text-gray-500">IEEE standard layout, limit 15MB</span>
                  </div>

                  <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-accent-gold to-yellow-600 text-black font-semibold rounded-lg hover:shadow-lg transition">
                    Upload & Submit Paper
                  </button>
                </form>
              </div>

              {/* Submission guidelines */}
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <h3 className="font-bold text-white text-base">Guidelines & Checklists</h3>
                <ul className="space-y-4 text-xs text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-accent-gold font-bold">1.</span>
                    <span>Ensure no author names, emails, or institutions are present in the PDF body to enforce double-blind requirements.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-gold font-bold">2.</span>
                    <span>Abstract files must contain 3-5 keywords under the summary section.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-gold font-bold">3.</span>
                    <span>File size must not exceed 15MB. All graphs should be embedded directly.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Reviewer Center Tab */}
        {activeTab === "reviewer" && (
          <div className="space-y-8">
            {!selectedReviewId ? (
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <h3 className="font-bold text-lg text-white">Double-Blind Review Panel</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-semibold">
                        <th className="pb-3">Paper Reference</th>
                        <th className="pb-3">Title</th>
                        <th className="pb-3">Scope Track</th>
                        <th className="pb-3 text-right">Review Score</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {assignedPapers.map((p, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01]">
                          <td className="py-4 font-mono font-bold text-accent-gold">{p.id}</td>
                          <td className="py-4 font-medium max-w-sm truncate pr-4">{p.title}</td>
                          <td className="py-4 text-gray-400">{p.track}</td>
                          <td className="py-4 text-right">
                            {p.score ? (
                              <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                {p.score} / 5.0
                              </span>
                            ) : (
                              <span className="text-yellow-500">Unscored</span>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            {!p.score ? (
                              <button 
                                onClick={() => setSelectedReviewId(p.id)}
                                className="px-3.5 py-1.5 bg-accent-gold text-black rounded text-[11px] font-semibold hover:bg-yellow-600 transition"
                              >
                                Evaluate Paper
                              </button>
                            ) : (
                              <button 
                                onClick={() => alert("Review has already been signed and submitted to the track chair.")}
                                className="px-3.5 py-1.5 border border-white/15 text-gray-400 rounded text-[11px] transition"
                              >
                                View Log
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-6 rounded-xl space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-white">Evaluate Paper: {selectedReviewId}</h3>
                  <button onClick={() => setSelectedReviewId(null)} className="text-xs text-gray-400 hover:text-white">
                    Cancel Assessment
                  </button>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg mb-6">
                  <span className="text-[10px] text-gray-500 uppercase font-mono">Assigned Manuscript Abstract</span>
                  <p className="text-xs text-gray-300 leading-relaxed mt-2">
                    Title: {assignedPapers.find(p => p.id === selectedReviewId)?.title}
                  </p>
                  <p className="text-xs text-gray-500 italic mt-3 leading-relaxed">
                    "This research presents a novel architecture detailing low-latency cryptography protocols in decentralized systems. We provide formal proofs regarding consensus performance and comparative test benchmarks..."
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => alert("Downloading PDF Manuscript...")} className="px-3 py-1 bg-secondary text-[11px] rounded text-white flex items-center gap-1.5 hover:bg-secondary/80 transition">
                      <Download className="w-3.5 h-3.5" /> Download Manuscript PDF
                    </button>
                  </div>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Originality (1-5)</label>
                      <input 
                        type="number" min="1" max="5" required 
                        value={scoreOriginality} 
                        onChange={(e) => setScoreOriginality(parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-xs glass-input rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Technical Quality (1-5)</label>
                      <input 
                        type="number" min="1" max="5" required 
                        value={scoreQuality} 
                        onChange={(e) => setScoreQuality(parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-xs glass-input rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Relevance (1-5)</label>
                      <input 
                        type="number" min="1" max="5" required 
                        value={scoreRelevance} 
                        onChange={(e) => setScoreRelevance(parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-xs glass-input rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Clarity (1-5)</label>
                      <input 
                        type="number" min="1" max="5" required 
                        value={scoreClarity} 
                        onChange={(e) => setScoreClarity(parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-xs glass-input rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Comments to the Authors</label>
                    <textarea 
                      rows={4} required 
                      value={commentsAuthor}
                      onChange={(e) => setCommentsAuthor(e.target.value)}
                      placeholder="Detail experimental improvements, reference gaps, or typo corrections..."
                      className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Confidential Comments to Track Chair</label>
                    <textarea 
                      rows={2}
                      value={commentsChair}
                      onChange={(e) => setCommentsChair(e.target.value)}
                      placeholder="Add any conflict warnings or publication concerns here..."
                      className="w-full px-3 py-2.5 text-xs glass-input rounded-lg"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="px-5 py-2.5 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-600 transition">
                      Sign & Submit Decision
                    </button>
                    <button type="button" onClick={() => setSelectedReviewId(null)} className="px-5 py-2.5 border border-white/10 text-gray-400 rounded-lg">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="font-bold text-lg text-white">Transaction Logs & Invoices</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-semibold">
                    <th className="pb-3">Invoice Code</th>
                    <th className="pb-3">Conference Track</th>
                    <th className="pb-3">Settlement Date</th>
                    <th className="pb-3">Method</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {payments.map((p, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01]">
                      <td className="py-4 font-mono font-bold text-white">{p.id}</td>
                      <td className="py-4">{p.conference}</td>
                      <td className="py-4 text-gray-400">{p.date}</td>
                      <td className="py-4 text-gray-400 font-mono text-[10px]">{p.gateway}</td>
                      <td className="py-4 text-right font-bold text-emerald-400">${p.amount.toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => alert("Downloading PDF Invoice...")}
                          className="p-1.5 bg-secondary hover:bg-secondary/80 rounded transition inline-flex items-center gap-1.5 text-[10px]"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-xl space-y-6">
              <h3 className="font-bold text-lg text-white">Issued Qualifications & Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((c, idx) => (
                  <div key={idx} className="p-5 bg-white/[0.02] border border-accent-gold/20 rounded-xl relative overflow-hidden flex flex-col justify-between h-56">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl" />
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="px-2.5 py-0.5 text-[10px] font-mono bg-accent-gold/15 text-accent-gold border border-accent-gold/30 rounded-full font-bold">
                          {c.type}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">ID: {c.code}</span>
                      </div>
                      <h4 className="font-bold text-white text-base mt-3 leading-snug">{c.conference}</h4>
                      <p className="text-xs text-gray-400 mt-1">Issued to {user.firstName} {user.lastName} on {c.issuedAt}</p>
                    </div>

                    <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold cursor-pointer" onClick={() => alert("Displaying verification QR scanner info...")}>
                        <QrCode className="w-5 h-5" /> Verify Certificate
                      </div>
                      <button 
                        onClick={() => alert("Initiating digitally signed PDF download...")}
                        className="px-3.5 py-1.5 bg-accent-gold text-black rounded text-[11px] font-semibold hover:bg-yellow-600 transition flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" /> Get PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Admin Panel Tab */}
        {activeTab === "admin" && (
          <div className="space-y-8">
            {/* System Status Banner */}
            <div className="glass-panel p-5 rounded-xl bg-gradient-to-r from-primary to-secondary border border-white/10 flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Sparkles className="w-6 h-6 text-accent-gold animate-bounce" />
                <div>
                  <h3 className="font-bold text-sm text-white">System Advisory Controller</h3>
                  <p className="text-xs text-gray-400">Scale configs, inspect server logs, or compile audit triggers.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                Server Status: 100% OK
              </span>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-5 rounded-xl">
                <span className="text-[10px] text-gray-500 uppercase font-mono">Conference Registry</span>
                <h4 className="font-display font-bold text-2xl text-white mt-1">1,208 Conferences</h4>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <span>+18 this week</span>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl">
                <span className="text-[10px] text-gray-500 uppercase font-mono">User Profiles Logged</span>
                <h4 className="font-display font-bold text-2xl text-white mt-1">45,180 Accounts</h4>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <span>+280 new verification OTPs</span>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl">
                <span className="text-[10px] text-gray-500 uppercase font-mono">Revenue Pipeline</span>
                <h4 className="font-display font-bold text-2xl text-white mt-1">$459,200.00 USD</h4>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <span>+12.4% vs last cycle</span>
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="glass-panel p-6 rounded-xl space-y-4">
              <h3 className="font-bold text-lg text-white">System Audit & Access Logs</h3>
              <div className="space-y-3 font-mono text-[11px]">
                <div className="p-3 bg-black/40 rounded border border-white/5 flex justify-between text-gray-400">
                  <span className="text-accent-gold">[INFO] User s.connor@cyberdyne.edu successfully authenticated from IP 192.168.1.45</span>
                  <span>10 seconds ago</span>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/5 flex justify-between text-gray-400">
                  <span className="text-accent-cyan">[INFO] Paper ID PP-2026-904: assigned to reviewers (double-blind validation matched)</span>
                  <span>3 minutes ago</span>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/5 flex justify-between text-gray-400">
                  <span className="text-emerald-400">[SUCCESS] Payment Intent confirmation hook executed for Invoice INV-89104 (Stripe SDK response 200)</span>
                  <span>10 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
