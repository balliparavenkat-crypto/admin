"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CreditCard, Search, CheckCircle, ShieldCheck, ArrowLeft, Home, ExternalLink, Globe, Lock } from "lucide-react";

export default function PaymentPortalPage() {
  const [activeTab, setActiveTab] = useState<"pay" | "receipt">("pay");
  const [searchTxn, setSearchTxn] = useState("");
  const [foundReceipt, setFoundReceipt] = useState<any | null>(null);
  const [searchError, setSearchError] = useState("");

  const [summits, setSummits] = useState<any[]>([
    {
      id: 1,
      title: "D&V Global Summit 2026: Advances in Artificial Intelligence",
      acronym: "DVGS2026",
      city: "San Francisco",
      country: "United States",
      priceINR: 15000,
      priceUSD: 499,
    },
    {
      id: 2,
      title: "International Conference on Sustainable Climate Solutions",
      acronym: "ICSCS2026",
      city: "Singapore",
      country: "Singapore",
      priceINR: 14000,
      priceUSD: 450,
    },
  ]);

  useEffect(() => {
    // Merge localStorage summits
    try {
      const savedStr = localStorage.getItem("custom_summits");
      if (savedStr) {
        const customList: any[] = JSON.parse(savedStr);
        setSummits((prev) => {
          const merged = [...customList, ...prev];
          const unique = merged.filter((s, idx, self) => idx === self.findIndex((t) => t.id === s.id || t.acronym === s.acronym));
          return unique;
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSearchReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setFoundReceipt(null);

    if (!searchTxn.trim()) return;

    try {
      const savedRegs = localStorage.getItem("custom_registrations");
      const savedPay = localStorage.getItem("custom_payments");

      const regList: any[] = savedRegs ? JSON.parse(savedRegs) : [];
      const payList: any[] = savedPay ? JSON.parse(savedPay) : [];
      const combined = [...regList, ...payList];

      const match = combined.find(
        (r) =>
          String(r.registrationCode).toLowerCase() === searchTxn.trim().toLowerCase() ||
          String(r.transactionId).toLowerCase() === searchTxn.trim().toLowerCase() ||
          String(r.email).toLowerCase() === searchTxn.trim().toLowerCase()
      );

      if (match) {
        setFoundReceipt(match);
      } else {
        setSearchError("No verified transaction or registration receipt found for this code or email.");
      }
    } catch (err) {
      setSearchError("Unable to query transaction records.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1117]" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* Header Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#1E40AF]/15 py-4 px-6 md:px-12 flex justify-between items-center shadow-xs">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-16 md:h-20 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
          <Link href="/" className="hover:text-[#1E40AF] transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-[#1E40AF]" /> Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#1E40AF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Payment & Receipt Checkout
          </span>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="py-12 px-6 text-center border-b border-slate-200 bg-gradient-to-b from-blue-50/60 to-transparent">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-[11px] font-mono font-bold uppercase tracking-wider border border-blue-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> Razorpay & PayPal Verified Payment Hub
        </div>
        <h1 className="font-extrabold text-3xl md:text-4xl text-[#0D1117] tracking-tight">
          Summit <span className="text-[#1E40AF]">Payment & Receipt Portal</span>
        </h1>
        <p className="text-slate-600 text-xs mt-2 max-w-lg mx-auto font-medium">
          Pay for summits via Razorpay (India ₹) or PayPal (International $), or lookup your existing paid receipt.
        </p>
      </div>

      {/* Main Options Container */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab("pay")}
            className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === "pay"
                ? "bg-[#1E40AF] text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
            }`}
          >
            Pay For a Summit
          </button>
          <button
            onClick={() => setActiveTab("receipt")}
            className={`px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === "receipt"
                ? "bg-[#1E40AF] text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
            }`}
          >
            Lookup Paid Receipt & Status
          </button>
        </div>

        {/* Tab 1: Pay For a Summit */}
        {activeTab === "pay" && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-[#0D1117] text-center">Select Summit to Proceed with Payment</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {summits.map((s) => (
                <div key={s.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {s.acronym}
                    </span>
                    <span className="text-xs font-mono font-extrabold text-emerald-800">
                      Registration Open
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#0D1117] text-base leading-snug">{s.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{s.city}, {s.country}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px]">India Fee</span>
                      <span className="font-bold text-amber-800">₹ {(s.priceINR || 15000).toLocaleString("en-IN")}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">International Fee</span>
                      <span className="font-bold text-[#1E40AF]">$ {s.priceUSD || 499} USD</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      href="/indian-registers"
                      className="py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 text-center font-extrabold text-xs uppercase tracking-wider shadow-sm hover:scale-[1.02] transition"
                    >
                      Razorpay ₹
                    </Link>
                    <Link
                      href="/international-registers"
                      className="py-3 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white text-center font-extrabold text-xs uppercase tracking-wider shadow-sm hover:scale-[1.02] transition"
                    >
                      PayPal $
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Lookup Paid Receipt & Status */}
        {activeTab === "receipt" && (
          <div className="p-8 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6 max-w-xl mx-auto">
            <h2 className="text-xl font-extrabold text-[#0D1117] text-center">Verify Paid Registration Receipt</h2>

            <form onSubmit={handleSearchReceipt} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Enter Registration Code, Txn ID, or Email *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DV-REG-IND-102938 or pay_rzp_... or email"
                  value={searchTxn}
                  onChange={(e) => setSearchTxn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                Search Paid Receipt
              </button>
            </form>

            {searchError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold text-center">
                {searchError}
              </div>
            )}

            {foundReceipt && (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase border border-emerald-300">
                    VERIFIED PAID RECEIPT ({foundReceipt.paymentGateway || "ONLINE"})
                  </span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex justify-between border-b border-emerald-200 pb-2">
                  <span className="text-slate-600">Reg Code:</span>
                  <span className="font-bold text-[#1E40AF]">{foundReceipt.registrationCode}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-200 pb-2">
                  <span className="text-slate-600">Txn ID:</span>
                  <span className="font-bold text-slate-900">{foundReceipt.transactionId}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-200 pb-2">
                  <span className="text-slate-600">Delegate:</span>
                  <span className="font-bold text-slate-900">{foundReceipt.fullName || foundReceipt.user?.firstName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount Paid:</span>
                  <span className="font-extrabold text-emerald-800 text-sm">
                    {foundReceipt.currency === "INR" ? `₹ ${foundReceipt.amountPaid}` : `$ ${foundReceipt.amountPaid} USD`}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
