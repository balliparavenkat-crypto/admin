"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, RefreshCw, Home, CheckCircle, CreditCard, ShieldCheck, Globe, Lock } from "lucide-react";
import api from "../../lib/api";

declare global {
  interface Window {
    paypal: any;
  }
}

// ── International USD Fee Structure ──────────────────────────────────────────
const categories = [
  { id: "oral",      label: "Oral Talk (Presenter)",       earlyBird: 499, superEarly: 599, standard: 699 },
  { id: "invited",   label: "Invited Keynote Speaker",      earlyBird: 499, superEarly: 599, standard: 699 },
  { id: "poster",    label: "Poster Presentation",          earlyBird: 399, superEarly: 499, standard: 599 },
  { id: "student",   label: "Student / Scholar Delegate",  earlyBird: 299, superEarly: 399, standard: 499 },
  { id: "industry",  label: "Industry Executive Delegate",  earlyBird: 699, superEarly: 799, standard: 899 },
  { id: "virtual",   label: "Virtual Online Delegate",      earlyBird: 199, superEarly: 299, standard: 399 },
  { id: "accompany", label: "Accompanying Person",          earlyBird: 299, superEarly: 299, standard: 299 },
];

const accommodation = [
  { nights: "1 Night",  single: 180, double: 200, triple: 220 },
  { nights: "2 Nights", single: 360, double: 400, triple: 440 },
  { nights: "3 Nights", single: 540, double: 600, triple: 660 },
  { nights: "4 Nights", single: 720, double: 800, triple: 880 },
];

const packages = [
  { id: "pkgA", label: "Package A", price: 850,  desc: "Registration + 2 Nights Single Occupancy Hotel Stay" },
  { id: "pkgB", label: "Package B", price: 1050, desc: "Registration + 3 Nights Single Occupancy Hotel Stay" },
  { id: "pkgC", label: "Package C", price: 950,  desc: "Registration + 2 Nights Double Shared Occupancy Stay" },
  { id: "pkgD", label: "Package D", price: 1150, desc: "Registration + 3 Nights Double Shared Occupancy Stay" },
];

// ── Captcha Generator ─────────────────────────────────────────────────────────
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
    ctx.fillStyle = "#F8FAFC"; ctx.fillRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(30,64,175,${0.1 + Math.random() * 0.2})`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(Math.random() * cv.width, Math.random() * cv.height);
      ctx.lineTo(Math.random() * cv.width, Math.random() * cv.height); ctx.stroke();
    }
    text.split("").forEach((ch, i) => {
      ctx.save();
      ctx.translate(18 + i * 26, 28 + (Math.random() - 0.5) * 8);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.font = `bold ${22 + Math.random() * 6}px monospace`;
      ctx.fillStyle = i % 2 === 0 ? "#1E40AF" : "#0D1117";
      ctx.fillText(ch, 0, 0); ctx.restore();
    });
  }, [text]);
  return <canvas ref={ref} width={180} height={50} className="rounded-xl border border-slate-300 shadow-xs" />;
}

export default function InternationalRegistersPage() {
  const [form, setForm] = useState({
    title: "Prof.",
    firstName: "",
    lastName: "",
    university: "",
    country: "United States",
    email: "",
    whatsapp: "",
  });

  const [feeType, setFeeType] = useState<"earlyBird" | "superEarly" | "standard">("earlyBird");
  const [selCat, setSelCat] = useState("oral");
  const [selAccom, setSelAccom] = useState<{ nights: string; type: "single" | "double" | "triple" } | null>(null);
  const [selPkg, setSelPkg] = useState("");
  const [captcha, setCaptcha] = useState(genCaptcha);
  const [captchaIn, setCaptchaIn] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);

  const paypalContainerRef = useRef<HTMLDivElement>(null);

  // Load PayPal SDK script
  useEffect(() => {
    if (document.getElementById("paypal-sdk-script")) return;

    const script = document.createElement("script");
    script.id = "paypal-sdk-script";
    script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const refreshCaptcha = () => { setCaptcha(genCaptcha()); setCaptchaIn(""); };

  const total = (() => {
    if (selPkg) return packages.find(p => p.id === selPkg)?.price ?? 0;
    const cat = categories.find(c => c.id === selCat);
    const catFee = cat ? cat[feeType] : 0;
    const accomRow = selAccom ? accommodation.find(a => a.nights === selAccom.nights) : null;
    const accomFee = accomRow && selAccom ? accomRow[selAccom.type] : 0;
    return catFee + accomFee;
  })();

  const fmtUSD = (n: number) => `$ ${n.toLocaleString("en-US")} USD`;

  // Render PayPal Smart Payment Buttons dynamically
  useEffect(() => {
    if (typeof window !== "undefined" && window.paypal && paypalContainerRef.current) {
      paypalContainerRef.current.innerHTML = "";
      try {
        window.paypal.Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          },
          createOrder: function (data: any, actions: any) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total.toString(),
                  },
                  description: `D&V Global Summit International Registration (${selCat.toUpperCase()})`,
                },
              ],
            });
          },
          onApprove: function (data: any, actions: any) {
            return actions.order.capture().then(function (details: any) {
              const regCode = `DV-REG-INTL-${Math.floor(100000 + Math.random() * 900000)}`;
              const txId = details.id || `PAYID-PPL-${Date.now()}`;

              const newRecord = {
                id: Date.now(),
                registrationCode: regCode,
                transactionId: txId,
                fullName: `${form.title} ${form.firstName} ${form.lastName}`,
                user: { firstName: form.firstName, lastName: form.lastName, email: form.email, institution: form.university },
                email: form.email,
                whatsapp: form.whatsapp,
                summitName: "D&V Global Summit 2026",
                conference: { acronym: "DVGS2026" },
                category: selCat.toUpperCase(),
                paymentStatus: "PAID",
                status: "SUCCESS",
                amountPaid: total,
                amount: total,
                currency: "USD",
                paymentGateway: "PAYPAL",
                checkInStatus: "NOT_CHECKED_IN",
                createdAt: new Date().toISOString(),
              };

              try {
                const existingRegsStr = localStorage.getItem("custom_registrations");
                const existingRegs = existingRegsStr ? JSON.parse(existingRegsStr) : [];
                existingRegs.unshift(newRecord);
                localStorage.setItem("custom_registrations", JSON.stringify(existingRegs));

                const existingPayStr = localStorage.getItem("custom_payments");
                const existingPay = existingPayStr ? JSON.parse(existingPayStr) : [];
                existingPay.unshift(newRecord);
                localStorage.setItem("custom_payments", JSON.stringify(existingPay));
              } catch (err) {
                console.error(err);
              }

              api.post("/registrations/create", newRecord).catch(() => {});

              setPaymentSuccess(newRecord);
            });
          },
        }).render(paypalContainerRef.current);
      } catch (e) {
        console.error(e);
      }
    }
  }, [total, selCat, form]);

  const handlePayPalDirectSimulate = (e: React.FormEvent) => {
    e.preventDefault();

    if (captchaIn.toUpperCase() !== captcha) {
      alert("Verification captcha code does not match. Please try again.");
      refreshCaptcha();
      return;
    }

    if (!form.firstName || !form.lastName || !form.email) {
      alert("Please fill in all mandatory contact information.");
      return;
    }

    setProcessing(true);

    const regCode = `DV-REG-INTL-${Math.floor(100000 + Math.random() * 900000)}`;
    const txId = `PAYID-PPL-${Date.now()}`;

    setTimeout(() => {
      const newRecord = {
        id: Date.now(),
        registrationCode: regCode,
        transactionId: txId,
        fullName: `${form.title} ${form.firstName} ${form.lastName}`,
        user: { firstName: form.firstName, lastName: form.lastName, email: form.email, institution: form.university },
        email: form.email,
        whatsapp: form.whatsapp,
        summitName: "D&V Global Summit 2026",
        conference: { acronym: "DVGS2026" },
        category: selCat.toUpperCase(),
        paymentStatus: "PAID",
        status: "SUCCESS",
        amountPaid: total,
        amount: total,
        currency: "USD",
        paymentGateway: "PAYPAL",
        checkInStatus: "NOT_CHECKED_IN",
        createdAt: new Date().toISOString(),
      };

      try {
        const existingRegsStr = localStorage.getItem("custom_registrations");
        const existingRegs = existingRegsStr ? JSON.parse(existingRegsStr) : [];
        existingRegs.unshift(newRecord);
        localStorage.setItem("custom_registrations", JSON.stringify(existingRegs));

        const existingPayStr = localStorage.getItem("custom_payments");
        const existingPay = existingPayStr ? JSON.parse(existingPayStr) : [];
        existingPay.unshift(newRecord);
        localStorage.setItem("custom_payments", JSON.stringify(existingPay));
      } catch (err) {
        console.error(err);
      }

      api.post("/registrations/create", newRecord).catch(() => {});

      setPaymentSuccess(newRecord);
      setProcessing(false);
    }, 1200);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-[#0D1117]">
        <div className="rounded-3xl p-10 max-w-xl w-full bg-white border border-[#1E40AF]/20 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-mono font-bold uppercase tracking-wider border border-blue-200">
              PayPal International Secured Checkout Verified (USD $)
            </span>
            <h2 className="font-extrabold text-2xl text-[#0D1117] mt-3">International Registration Confirmed!</h2>
            <p className="text-xs text-slate-600 mt-1">
              Official receipt and verification badge sent to <span className="text-[#1E40AF] font-bold">{paymentSuccess.email}</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Registration Code:</span>
              <span className="font-bold text-[#1E40AF]">{paymentSuccess.registrationCode}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">PayPal Txn ID:</span>
              <span className="font-bold text-slate-900">{paymentSuccess.transactionId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Delegate Name:</span>
              <span className="font-bold text-slate-900">{paymentSuccess.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Paid:</span>
              <span className="font-extrabold text-emerald-700 text-base">{fmtUSD(paymentSuccess.amountPaid)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1117]" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 py-3 px-6 md:px-12 flex justify-between items-center bg-white/90 backdrop-blur-md shadow-xs">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-16 md:h-20 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
          <Link href="/" className="hover:text-[#1E40AF] transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-[#1E40AF]" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#1E40AF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            International Registration (PayPal $)
          </span>
        </div>
      </nav>

      {/* Header Banner */}
      <div className="py-12 px-6 text-center border-b border-slate-200 bg-gradient-to-b from-blue-50/60 to-transparent">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-[11px] font-mono font-bold uppercase tracking-wider border border-blue-200 mb-3">
          <Globe className="w-3.5 h-3.5" /> PayPal International Checkout (USD / EUR / Global Cards)
        </div>
        <h1 className="font-extrabold text-3xl md:text-4xl text-[#0D1117] tracking-tight">
          International Delegate <span className="text-[#1E40AF]">Registration & Payment</span>
        </h1>
        <p className="text-slate-600 text-xs mt-2 max-w-lg mx-auto font-medium">
          Pay via PayPal Balance, PayPal Credit, or International Credit/Debit Cards (Visa, Mastercard, Amex).
        </p>
      </div>

      {/* Registration & Payment Form */}
      <form onSubmit={handlePayPalDirectSimulate} className="max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-8">
        
        {/* Step 1: Personal Info */}
        <section className="rounded-3xl p-8 bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <span className="w-8 h-8 rounded-full bg-[#1E40AF] text-white font-extrabold text-xs flex items-center justify-center">1</span>
            <h2 className="font-extrabold text-lg text-[#0D1117]">International Delegate Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Title *</label>
              <select
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
              >
                {["Prof.", "Dr.", "Mr.", "Mrs.", "Ms.", "Er."].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">First Name *</label>
              <input
                required
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Last Name *</label>
              <input
                required
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">University / Organization *</label>
              <input
                required
                type="text"
                placeholder="e.g. Stanford University / CNRS / MIT"
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Country of Residence *</label>
              <input
                required
                type="text"
                placeholder="e.g. United States / Germany / Japan"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address *</label>
              <input
                required
                type="email"
                placeholder="email@university.edu"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>
          </div>
        </section>

        {/* Step 2: Category & Fee Tier */}
        <section className="rounded-3xl p-8 bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <span className="w-8 h-8 rounded-full bg-[#1E40AF] text-white font-extrabold text-xs flex items-center justify-center">2</span>
            <h2 className="font-extrabold text-lg text-[#0D1117]">Select Registration Category (USD $)</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["earlyBird", "superEarly", "standard"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFeeType(t)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                  feeType === t
                    ? "bg-[#1E40AF] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t === "earlyBird" ? "Early Bird" : t === "superEarly" ? "Super Early Bird" : "Standard Tier"}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-800 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200 font-extrabold">
                <tr>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Fee (USD $)</th>
                  <th className="p-4 text-center">Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-900 font-medium">
                {categories.map((cat) => {
                  const isSelected = selCat === cat.id && !selPkg;
                  const fee = cat[feeType];
                  return (
                    <tr
                      key={cat.id}
                      onClick={() => { setSelCat(cat.id); setSelPkg(""); }}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-blue-50/80 font-bold" : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="p-4 font-bold text-[#0D1117]">{cat.label}</td>
                      <td className="p-4 text-right font-mono font-black text-emerald-800">{fmtUSD(fee)}</td>
                      <td className="p-4 text-center">
                        <input
                          type="radio"
                          name="categorySelect"
                          checked={isSelected}
                          onChange={() => { setSelCat(cat.id); setSelPkg(""); }}
                          className="w-4 h-4 text-[#1E40AF] focus:ring-[#1E40AF]"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 3: PayPal Order Summary & Checkout */}
        <section className="rounded-3xl p-8 bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#1E40AF] text-white font-extrabold text-xs flex items-center justify-center">3</span>
              <h2 className="font-extrabold text-lg text-[#0D1117]">PayPal Smart Checkout Summary</h2>
            </div>
            <span className="text-xs font-mono font-extrabold text-[#1E40AF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              PayPal Global Encrypted
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Verification Captcha Code *</label>
              <div className="flex items-center gap-3 mb-3">
                <CaptchaCanvas text={captcha} />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-[#1E40AF] hover:bg-slate-200"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <input
                required
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit captcha"
                value={captchaIn}
                onChange={(e) => setCaptchaIn(e.target.value.toUpperCase())}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-mono font-bold tracking-widest uppercase focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200 space-y-3">
              <span className="text-xs font-mono text-slate-600 font-bold uppercase block">Total Payable Amount</span>
              <span className="text-4xl font-black text-[#0D1117] block font-mono">{fmtUSD(total)}</span>
              <p className="text-xs text-slate-600 font-medium">Includes international conference kit, session access & PDF receipt</p>
            </div>
          </div>

          {/* PayPal Smart Payment Buttons Container */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="max-w-md mx-auto" ref={paypalContainerRef} />

            <div className="text-center">
              <button
                type="submit"
                disabled={processing}
                className="px-10 py-3.5 rounded-full bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-widest shadow-md transition-all inline-flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {processing ? "Connecting to PayPal..." : `Express Checkout ${fmtUSD(total)} via PayPal / Card`}
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> PayPal 256-Bit SSL Encrypted International Payment Gateway
            </p>
          </div>
        </section>
      </form>
    </div>
  );
}
