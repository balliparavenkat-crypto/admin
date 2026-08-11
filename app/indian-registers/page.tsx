"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, RefreshCw, Home, CheckCircle, CreditCard, Lock, ShieldCheck, X, Globe } from "lucide-react";

// ── Indian INR Fee data ───────────────────────────────────────────────────────
const categories = [
  { id: "oral",      label: "Oral Talk",           earlyBird: 49900, superEarly: 59900, standard: 69900 },
  { id: "invited",   label: "Invited Talk",         earlyBird: 49900, superEarly: 59900, standard: 69900 },
  { id: "poster",    label: "Poster",               earlyBird: 34900, superEarly: 44900, standard: 54900 },
  { id: "student",   label: "Student Delegate",     earlyBird: 27900, superEarly: 34900, standard: 41900 },
  { id: "industry",  label: "Industry Delegate",    earlyBird: 64900, superEarly: 74900, standard: 84900 },
  { id: "virtual",   label: "Virtual Registration", earlyBird: 14900, superEarly: 19900, standard: 24900 },
  { id: "accompany", label: "Accompanying Person",  earlyBird: 19900, superEarly: 19900, standard: 19900 },
];

const accommodation = [
  { nights: "1 Night",  single: 12900, double: 14900, triple: 16900 },
  { nights: "2 Nights", single: 25800, double: 29800, triple: 33800 },
  { nights: "3 Nights", single: 38700, double: 44700, triple: 50700 },
  { nights: "4 Nights", single: 51600, double: 59600, triple: 67600 },
  { nights: "5 Nights", single: 64500, double: 74500, triple: 84500 },
];

const packages = [
  { id: "pkgA", label: "Package A", price: 74900, desc: "Registration + 2 Nights Single Occupancy" },
  { id: "pkgB", label: "Package B", price: 87900, desc: "Registration + 3 Nights Single Occupancy" },
  { id: "pkgC", label: "Package C", price: 99900, desc: "Registration + 4 Nights Single Occupancy" },
  { id: "pkgD", label: "Package D", price: 76900, desc: "Registration + 2 Nights Double Occupancy" },
  { id: "pkgE", label: "Package E", price: 89900, desc: "Registration + 3 Nights Double Occupancy" },
  { id: "pkgF", label: "Package F", price: 102900, desc: "Registration + 4 Nights Double Occupancy" },
];

// ── Captcha ───────────────────────────────────────────────────────────────────
function genCaptcha() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => c[Math.floor(Math.random() * c.length)]).join("");
}

function CaptchaCanvas({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#0a1628"; ctx.fillRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(6,182,212,${0.1 + Math.random() * 0.2})`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(Math.random() * cv.width, Math.random() * cv.height);
      ctx.lineTo(Math.random() * cv.width, Math.random() * cv.height); ctx.stroke();
    }
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(212,175,55,${Math.random() * 0.3})`;
      ctx.beginPath(); ctx.arc(Math.random() * cv.width, Math.random() * cv.height, 1.5, 0, Math.PI * 2); ctx.fill();
    }
    text.split("").forEach((ch, i) => {
      ctx.save();
      ctx.translate(18 + i * 26, 28 + (Math.random() - 0.5) * 8);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.font = `bold ${22 + Math.random() * 6}px monospace`;
      ctx.fillStyle = i % 2 === 0 ? "#1E40AF" : "#1E40AF";
      ctx.fillText(ch, 0, 0); ctx.restore();
    });
  }, [text]);
  return <canvas ref={ref} width={180} height={50} className="rounded-lg border border-white/10" />;
}

export default function IndianRegistersPage() {
  const [form, setForm] = useState({ title: "", firstName: "", lastName: "", university: "", country: "India", email: "", whatsapp: "" });
  const [feeType, setFeeType] = useState<"earlyBird" | "superEarly" | "standard">("earlyBird");
  const [selCat, setSelCat] = useState("oral");
  const [selAccom, setSelAccom] = useState<{ nights: string; type: "single" | "double" | "triple" } | null>(null);
  const [selPkg, setSelPkg] = useState("");
  const [captcha, setCaptcha] = useState(genCaptcha);
  const [captchaIn, setCaptchaIn] = useState("");
  
  // Payment Modal & Confirmation State
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const refreshCaptcha = () => { setCaptcha(genCaptcha()); setCaptchaIn(""); };

  const total = (() => {
    if (selPkg) return packages.find(p => p.id === selPkg)?.price ?? 0;
    const cat = categories.find(c => c.id === selCat);
    const catFee = cat ? cat[feeType] : 0;
    const accomRow = selAccom ? accommodation.find(a => a.nights === selAccom.nights) : null;
    const accomFee = accomRow && selAccom ? accomRow[selAccom.type] : 0;
    return catFee + accomFee;
  })();

  const fmt = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaIn.toUpperCase() !== captcha) {
      alert("Verification code does not match. Please try again."); refreshCaptcha(); return;
    }
    // Open Razorpay Checkout Modal
    setIsRazorpayModalOpen(true);
  };

  const handleCompleteRazorpayPayment = () => {
    const txnId = `pay_Rzp${Math.floor(100000000 + Math.random() * 900000000)}`;
    const newPaymentObj = {
      id: Date.now(),
      transactionId: txnId,
      user: { firstName: form.firstName, lastName: form.lastName, email: form.email, whatsapp: form.whatsapp },
      conference: { acronym: "DVGS2026", title: "D&V Global Summit 2026" },
      amount: total,
      currency: "INR",
      paymentGateway: "RAZORPAY",
      status: "SUCCESS",
      createdAt: new Date().toISOString().substring(0, 10),
    };

    // Save transaction to localStorage registration_payments
    try {
      const existingStr = localStorage.getItem("registration_payments");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(newPaymentObj);
      localStorage.setItem("registration_payments", JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }

    setReceiptData(newPaymentObj);
    setIsRazorpayModalOpen(false);
    setPaymentDone(true);
  };

  if (paymentDone && receiptData) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-12">
      <div className="rounded-3xl p-10 text-center max-w-xl border border-blue-200 shadow-2xl bg-white space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 font-mono font-bold text-xs rounded-full border border-blue-300">
            RAZORPAY PAYMENT SUCCESSFUL
          </span>
          <h2 className="font-extrabold text-3xl text-[#0D1117] mt-3">Registration Confirmed!</h2>
          <p className="text-slate-600 text-xs mt-1">
            Payment receipt & ticket details sent to <span className="text-[#1E40AF] font-bold">{receiptData.user?.email}</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 font-mono text-xs">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Transaction ID:</span>
            <span className="font-bold text-[#1E40AF]">{receiptData.transactionId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Delegate Name:</span>
            <span className="font-bold text-[#0D1117]">{form.title} {receiptData.user?.firstName} {receiptData.user?.lastName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Conference:</span>
            <span className="font-bold text-slate-800">{receiptData.conference?.title}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">Total Paid (INR):</span>
            <span className="font-black text-emerald-700 text-base">{fmt(receiptData.amount)}</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md transition"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );

  const panelCls = "rounded-2xl p-8 border border-[#1E40AF]/15 bg-white shadow-xl backdrop-blur-sm";
  const panelStyle = { background: "#FFFFFF" };
  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0D1117] placeholder-gray-600 focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]/30 transition";
  const labelCls = "block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2";

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0D1117] overflow-x-hidden" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 py-3 px-6 md:px-12 flex justify-between items-center bg-[#F8FAFC]/90 backdrop-blur-md">
        <Link href="/" className="flex items-center group">
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-20 md:h-24 w-auto object-contain transition duration-300" />
        </Link>
        <div className="flex items-center gap-3 text-xs font-bold text-black">
          <Link href="/" className="hover:text-black transition flex items-center gap-1"><Home className="w-3.5 h-3.5 text-black" /> Home</Link>
          <ChevronRight className="w-3 h-3 text-black" />
          <Link href="/international-registers" className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-extrabold flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> Switch to PayPal (USD $)
          </Link>
        </div>
      </nav>

      {/* Gateway Switcher Banner */}
      <div className="bg-[#02042B] text-white py-3 px-6 text-center text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-3">
        <span>Payment Method Selected: <strong className="text-blue-400">Razorpay (Indian INR ₹)</strong></span>
        <Link
          href="/international-registers"
          className="px-4 py-1 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1"
        >
          <Globe className="w-3.5 h-3.5" /> Looking for PayPal (USD $)? Click Here
        </Link>
      </div>

      {/* Header */}
      <div className="relative py-14 px-6 text-center border-b border-slate-200 bg-gradient-to-b from-blue-50/50 to-transparent">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#1E40AF] mb-3 block font-mono">Indian Delegates & Authors</span>
        <h1 className="font-bold text-4xl md:text-5xl text-[#0D1117] mb-3">
          Indian Conference <span className="text-[#1E40AF]">Registration (INR ₹)</span>
        </h1>
        <p className="text-gray-600 text-sm max-w-lg mx-auto">Razorpay checkout available for Indian debit cards, credit cards, UPI, and Netbanking.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="max-w-5xl mx-auto px-4 md:px-6 py-14 space-y-10">

        {/* 1 — Personal Info */}
        <section className={panelCls} style={panelStyle}>
          <SectionTitle n="1" color="cyan">Personal Information</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div>
              <label className={labelCls}>Title <Req /></label>
              <select required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className={inputCls + " appearance-none cursor-pointer font-semibold"}>
                <option value="" disabled>Select Title</option>
                {["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Er."].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <Field label="First Name" placeholder="Enter your First Name" value={form.firstName} onChange={v => setForm({ ...form, firstName: v })} />
            <Field label="Last Name" placeholder="Enter your Last Name" value={form.lastName} onChange={v => setForm({ ...form, lastName: v })} />
            <Field label="University / Organisation" placeholder="Enter your University Name" value={form.university} onChange={v => setForm({ ...form, university: v })} />
            <Field label="Country" placeholder="India" value={form.country} onChange={v => setForm({ ...form, country: v })} />
            <Field label="Email Address" type="email" placeholder="Enter your Email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
            <Field label="WhatsApp Number" type="tel" placeholder="Enter 10-digit mobile number" value={form.whatsapp} onChange={v => setForm({ ...form, whatsapp: v })} />
          </div>
        </section>

        {/* 2 — Category & Fees */}
        <section className={panelCls} style={panelStyle}>
          <SectionTitle n="2" color="gold">Category & Registration Fee (INR ₹)</SectionTitle>

          <div className="inline-flex p-1 rounded-full border border-slate-200 mt-6 mb-8 bg-slate-100">
            {(["earlyBird", "superEarly", "standard"] as const).map(t => (
              <button key={t} type="button" onClick={() => setFeeType(t)}
                className="px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition duration-300"
                style={feeType === t ? { background: "#1E40AF", color: "#FFFFFF" } : { color: "#475569" }}>
                {t === "earlyBird" ? "Early Bird" : t === "superEarly" ? "Super Early Bird" : "Standard"}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#1E40AF]/15 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E40AF]/15 bg-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#1E40AF]">Early Bird</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#1E40AF]">Super Early Bird</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-800">Standard</th>
                  <th className="px-5 py-3.5 w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {categories.map(cat => {
                  const active = selCat === cat.id && !selPkg;
                  return (
                    <tr key={cat.id} onClick={() => { setSelCat(cat.id); setSelPkg(""); }}
                      className="cursor-pointer transition duration-200 hover:bg-slate-50"
                      style={active ? { background: "rgba(30,64,175,0.05)", borderLeft: "4px solid #1E40AF" } : {}}>
                      <td className="px-5 py-4 font-semibold text-[#0D1117]">
                        <span className="flex items-center gap-3">
                          <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 inline-block transition"
                            style={active ? { borderColor: "#1E40AF", background: "#1E40AF" } : { borderColor: "#94a3b8" }} />
                          {cat.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-[#1E40AF]">{fmt(cat.earlyBird)}</td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-[#1E40AF]">{fmt(cat.superEarly)}</td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-emerald-800">{fmt(cat.standard)}</td>
                      <td className="px-5 py-4 text-right">
                        {active && <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-[#1E40AF]">Selected</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3 — Verification & Razorpay Checkout Summary */}
        <section className={panelCls} style={panelStyle}>
          <SectionTitle n="3" color="cyan">Verification & Razorpay Payment</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mt-6">
            <div>
              <label className={labelCls}>Verification Code <Req /></label>
              <div className="flex items-center gap-3 mb-3">
                <CaptchaCanvas text={captcha} />
                <button type="button" onClick={refreshCaptcha} className="p-2.5 rounded-lg transition border border-[#1E40AF]/15 bg-slate-100 text-[#1E40AF]">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <input required type="text" maxLength={6} placeholder="Enter code shown above"
                value={captchaIn} onChange={e => setCaptchaIn(e.target.value.toUpperCase())}
                className={inputCls + " tracking-widest font-mono font-bold"} />
            </div>

            <div className="rounded-2xl p-6 border border-blue-200 bg-blue-50/40 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-gray-600">Total Payable Amount:</span>
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono font-bold text-[10px]">RAZORPAY (INR)</span>
              </div>
              <div className="text-3xl font-black text-[#0D1117] font-mono">{fmt(total)}</div>
              <p className="text-[11px] text-slate-600 font-medium">Includes conference kit, keynote sessions, proceedings indexation, and lunch pass.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button type="submit"
              className="px-10 py-4 font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl hover:scale-[1.02] transition">
              <CreditCard className="w-4 h-4 stroke-[3]" /> Proceed to Razorpay Payment <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
            
            <Link
              href="/international-registers"
              className="px-8 py-4 font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md transition"
            >
              <Globe className="w-4 h-4" /> Pay via PayPal Instead
            </Link>
          </div>
        </section>
      </form>

      {/* Razorpay Official Checkout Simulator Modal */}
      {isRazorpayModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-blue-300 shadow-2xl overflow-hidden space-y-0">
            <div className="bg-[#02042B] p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 block tracking-widest uppercase">RAZORPAY CHECKOUT GATEWAY</span>
                <h3 className="font-extrabold text-base text-white mt-0.5">D&V Global Summits 2026</h3>
              </div>
              <button onClick={() => setIsRazorpayModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payer Name:</span>
                  <span className="font-bold text-[#0D1117]">{form.title} {form.firstName} {form.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payer Email:</span>
                  <span className="font-bold text-slate-800">{form.email}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm">
                  <span className="font-bold text-slate-700">Amount (INR):</span>
                  <span className="font-black text-blue-700">{fmt(total)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCompleteRazorpayPayment}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Authorize {fmt(total)} via Razorpay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Req() { return <span style={{ color: "#f87171" }}>*</span>; }

function SectionTitle({ n, color, children }: { n: string; color: "cyan" | "gold"; children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-xl text-[#0D1117] flex items-center gap-3">
      <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-blue-100 text-[#1E40AF] border border-blue-300">{n}</span>
      {children}
    </h2>
  );
}

function Field({ label, placeholder, value, onChange, type = "text" }:
  { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0D1117] placeholder-gray-500 focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]/30 transition font-medium";
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{label} <span style={{ color: "#f87171" }}>*</span></label>
      <input required type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className={inputCls} />
    </div>
  );
}
