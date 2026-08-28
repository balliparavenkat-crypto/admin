"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, RefreshCw, Home, CheckCircle, CreditCard, ShieldCheck, X, Sparkles, Building, Globe, UserCheck, Calendar } from "lucide-react";

// ── Registration Data Tiers ──────────────────────────────────────────────────
const participationOptions = [
  { id: "speaker", label: "Speaker Presentation (In-Person)", earlyBird: 799, midTerm: 899, onSpot: 999 },
  { id: "delegate", label: "Delegate / Listener (In-Person)", earlyBird: 899, midTerm: 999, onSpot: 1099 },
  { id: "student", label: "Student (In-Person)", earlyBird: 399, midTerm: 499, onSpot: 599 },
  { id: "poster", label: "Poster (In-Person)", earlyBird: 499, midTerm: 599, onSpot: 699 },
  { id: "virtual", label: "Virtual Registration", earlyBird: 299, midTerm: 399, onSpot: 499 },
];

const sponsorshipOptions = [
  { id: "elite", label: "Elite Sponsor", earlyBird: 4500, midTerm: 5000, onSpot: 5500 },
  { id: "gold", label: "Gold Sponsor", earlyBird: 3500, midTerm: 4000, onSpot: 4500 },
  { id: "silver", label: "Silver Sponsor", earlyBird: 2700, midTerm: 3200, onSpot: 3700 },
  { id: "exhibition", label: "Exhibition", earlyBird: 2000, midTerm: 3000, onSpot: 4000 },
  { id: "virtualExhibition", label: "Virtual Exhibition", earlyBird: 449, midTerm: 599, onSpot: 799 },
];

const allSelectableOptions = [
  { value: "899", label: "Speaker Presentation (In-Person) - $899", price: 899 },
  { value: "999", label: "Delegate / Listener (In-Person) - $999", price: 999 },
  { value: "499", label: "Student (In-Person) - $499", price: 499 },
  { value: "599", label: "Poster (In-Person) - $599", price: 599 },
  { value: "399", label: "Virtual Registration - $399", price: 399 },
  { value: "5000", label: "Elite Sponsor - $5000", price: 5000 },
  { value: "4000", label: "Gold Sponsor - $4000", price: 4000 },
  { value: "3200", label: "Silver Sponsor - $3200", price: 3200 },
  { value: "3000", label: "Exhibition - $3000", price: 3000 },
  { value: "599_ex", label: "Virtual Exhibition - $599", price: 599 },
];

function genCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function CaptchaCanvas({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#0a1628"; ctx.fillRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(245, 158, 11, ${0.15 + Math.random() * 0.25})`; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * cv.width, Math.random() * cv.height);
      ctx.lineTo(Math.random() * cv.width, Math.random() * cv.height);
      ctx.stroke();
    }
    text.split("").forEach((ch, i) => {
      ctx.save();
      ctx.translate(18 + i * 26, 28 + (Math.random() - 0.5) * 8);
      ctx.rotate((Math.random() - 0.5) * 0.35);
      ctx.font = `bold ${22 + Math.random() * 5}px monospace`;
      ctx.fillStyle = i % 2 === 0 ? "#F59E0B" : "#3B82F6";
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });
  }, [text]);
  return <canvas ref={ref} width={180} height={46} className="rounded-xl border border-slate-200 shadow-sm" />;
}

export default function UnifiedRegisterPage() {
  const [form, setForm] = useState({
    title: "",
    name: "",
    email: "",
    whatsapp: "",
    institution: "",
    country: "",
  });
  
  const [selectedOption, setSelectedOption] = useState("899");
  const [accommodationType, setAccommodationType] = useState<string>("none"); // "single" (220), "double" (250), "triple" (280)
  const [accompanyingPerson, setAccompanyingPerson] = useState(false); // 249
  const [participantsCount, setParticipantsCount] = useState(1);
  const [nightsCount, setNightsCount] = useState(0);
  
  const [captchaText, setCaptchaText] = useState(genCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [isPaypalModalOpen, setIsPaypalModalOpen] = useState(false);
  const [isAbstractModalOpen, setIsAbstractModalOpen] = useState(false);
  const [abstractSubmitted, setAbstractSubmitted] = useState(false);
  const [abstractForm, setAbstractForm] = useState({
    authorName: "",
    email: "",
    whatsapp: "",
    title: "",
    track: "Artificial Intelligence & Robotics",
    abstractText: "",
  });

  const [paymentDone, setPaymentDone] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const refreshCaptcha = () => { setCaptchaText(genCaptcha()); setCaptchaInput(""); };

  const handleAbstractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abstractForm.authorName || !abstractForm.email || !abstractForm.title || !abstractForm.abstractText) {
      alert("Please fill in all required abstract submission fields.");
      return;
    }
    setAbstractSubmitted(true);
  };

  const currentOptionObj = allSelectableOptions.find(o => o.value === selectedOption) || allSelectableOptions[0];
  const regPriceSingle = currentOptionObj.price;
  const regTotalPrice = regPriceSingle * Math.max(1, participantsCount);

  const accomRatePerNight = accommodationType === "single" ? 220 : accommodationType === "double" ? 250 : accommodationType === "triple" ? 280 : 0;
  const accomTotalPrice = accomRatePerNight * Math.max(0, nightsCount);

  const accompanyingPrice = accompanyingPerson ? 249 : 0;

  const grandTotalUSD = regTotalPrice + accomTotalPrice + accompanyingPrice;
  const grandTotalINR = Math.round(grandTotalUSD * 83);

  const handleProceedPayment = (gateway: "RAZORPAY" | "PAYPAL", e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.title || !form.institution.trim() || !form.country.trim()) {
      alert("Please fill in all required fields (Title, Name, Email, Institution, Country).");
      return;
    }
    if (captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      alert("Verification code does not match. Please enter the correct code.");
      refreshCaptcha();
      return;
    }

    if (gateway === "RAZORPAY") {
      setIsRazorpayModalOpen(true);
    } else {
      setIsPaypalModalOpen(true);
    }
  };

  const handleCompletePayment = (gateway: "RAZORPAY" | "PAYPAL") => {
    const txnId = gateway === "RAZORPAY"
      ? `pay_Rzp${Math.floor(100000000 + Math.random() * 900000000)}`
      : `PAYPAL-CAP-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newPaymentObj = {
      id: Date.now(),
      transactionId: txnId,
      user: form,
      amountUSD: grandTotalUSD,
      amountINR: grandTotalINR,
      paymentGateway: gateway,
      status: "SUCCESS",
      createdAt: new Date().toISOString().substring(0, 10),
    };

    setReceiptData(newPaymentObj);
    setIsRazorpayModalOpen(false);
    setIsPaypalModalOpen(false);
    setPaymentDone(true);
  };

  if (paymentDone && receiptData) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-amber-200 space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div>
          <span className="px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
            {receiptData.paymentGateway} PAYMENT SUCCESSFUL
          </span>
          <h2 className="text-3xl font-extrabold text-[#0D1117] mt-3">Registration Confirmed!</h2>
          <p className="text-slate-600 text-xs mt-1">
            Payment receipt & details sent to <span className="text-[#1E40AF] font-bold">{receiptData.user?.email}</span>
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left text-xs font-mono space-y-2.5">
          <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">Transaction ID:</span><span className="font-bold text-[#1E40AF]">{receiptData.transactionId}</span></div>
          <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">Name:</span><span className="font-bold text-[#0D1117]">{receiptData.user?.title} {receiptData.user?.name}</span></div>
          <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">Institution:</span><span className="font-bold text-slate-800">{receiptData.user?.institution}</span></div>
          <div className="flex justify-between pt-1"><span className="text-slate-500">Total Paid:</span><span className="font-black text-emerald-700 text-base">$ {receiptData.amountUSD} <span className="text-xs text-slate-500 font-normal">(₹ {receiptData.amountINR.toLocaleString()})</span></span></div>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md transition">
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );

  const panelCls = "rounded-3xl p-8 border border-slate-200/80 bg-white shadow-xl space-y-6";
  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0D1117] placeholder-slate-400 focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition font-medium";
  const labelCls = "block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1117] font-sans selection:bg-[#1E40AF]/20">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 py-4 px-6 md:px-12 flex justify-between items-center bg-[#F8FAFC]/95 backdrop-blur-md">
        <Link href="/" className="flex items-center group">
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-16 md:h-20 w-auto object-contain transition duration-300" />
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Link href="/" className="hover:text-[#1E40AF] transition flex items-center gap-1.5 text-slate-900 font-bold">
            <Home className="w-4 h-4 text-slate-900" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
          <span className="text-slate-900 font-bold">Registration</span>
        </div>
      </nav>

      {/* ── Header Banner ──────────────────────────────────────────────────── */}
      <div className="relative py-16 px-6 text-center border-b border-slate-200 bg-gradient-to-b from-amber-50/60 via-blue-50/30 to-transparent">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#1E40AF] block font-mono">D&V GLOBAL SUMMITS 2026</span>
          <h1 className="font-extrabold text-4xl md:text-5xl text-[#0D1117] tracking-tight">
            Summit <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] via-blue-600 to-amber-500">Registration</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
            Fill out the form below to secure your seat or submit your abstract research paper.
          </p>

          {/* Action Buttons beside registration form */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {/* Pink / Magenta SUBMIT ABSTRACT Button */}
            <button
              type="button"
              onClick={() => setIsAbstractModalOpen(true)}
              className="px-8 py-3.5 bg-[#E63980] hover:bg-[#D0286F] text-white font-extrabold text-xs uppercase tracking-widest rounded-md transition duration-300 shadow-lg cursor-pointer"
            >
              SUBMIT ABSTRACT
            </button>

            {/* Golden Amber REGISTER NOW > Button */}
            <a
              href="#registration-form"
              className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg hover:scale-[1.03] transition duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>REGISTER NOW</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Form Container ────────────────────────────────────────────── */}
      <main id="registration-form" className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-10">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-10">

          {/* 1 — Delegate Information Card */}
          <section className={panelCls}>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1E40AF] font-extrabold flex items-center justify-center text-sm border border-blue-200">1</span>
              <h2 className="font-bold text-xl text-[#0D1117]">Delegate Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelCls}>Title <Req /></label>
                <select 
                  value={form.title} 
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls + " appearance-none cursor-pointer font-semibold"}
                  required
                >
                  <option value="" disabled>Select Title</option>
                  {["Mr.", "Ms.", "Dr.", "Prof.", "Er."].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className={labelCls}>Full Name <Req /></label>
                <input 
                  type="text" 
                  placeholder="Enter full name" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  required 
                />
              </div>

              <div>
                <label className={labelCls}>Email Address <Req /></label>
                <input 
                  type="email" 
                  placeholder="name@university.edu" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                  required 
                />
              </div>

              <div>
                <label className={labelCls}>WhatsApp / Phone</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  value={form.whatsapp} 
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Institution / Organisation <Req /></label>
                <input 
                  type="text" 
                  placeholder="University / Enterprise Name" 
                  value={form.institution} 
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  className={inputCls}
                  required 
                />
              </div>

              <div>
                <label className={labelCls}>Country <Req /></label>
                <input 
                  type="text" 
                  placeholder="United States / UK / India..." 
                  value={form.country} 
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className={inputCls}
                  required 
                />
              </div>
            </div>
          </section>

          {/* 2 — Types of Participation & Pricing Matrix */}
          <section className={panelCls}>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1E40AF] font-extrabold flex items-center justify-center text-sm border border-blue-200">2</span>
              <h2 className="font-bold text-xl text-[#0D1117]">Types of Participation</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-[#0D1117] font-bold text-xs uppercase tracking-wider">
                    <th className="p-4 text-left font-bold text-slate-700">Participation Tier</th>
                    <th className="p-4 text-right text-[#1E40AF]">
                      Early Bird<br />
                      <span className="font-mono text-[10px] text-slate-500 font-normal">Before March 10</span>
                    </th>
                    <th className="p-4 text-right text-[#1E40AF] bg-blue-50/50">
                      Mid Term<br />
                      <span className="font-mono text-[10px] text-slate-500 font-normal">Before June 01</span>
                    </th>
                    <th className="p-4 text-right text-emerald-800">
                      On Spot<br />
                      <span className="font-mono text-[10px] text-slate-500 font-normal">Before Sept 10</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {participationOptions.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition duration-150">
                      <td className="p-4 font-bold text-[#0D1117] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
                        {row.label}
                      </td>
                      <td className="p-4 text-right font-mono font-bold text-[#1E40AF]">${row.earlyBird}</td>
                      <td className="p-4 text-right font-mono font-bold text-[#1E40AF] bg-blue-50/30">${row.midTerm}</td>
                      <td className="p-4 text-right font-mono font-bold text-emerald-800">${row.onSpot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sponsorship Tiers Matrix */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="font-bold text-base text-[#0D1117] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Sponsorship & Exhibition Options
              </h3>
              
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-slate-200">
                    {sponsorshipOptions.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition duration-150">
                        <td className="p-4 font-bold text-[#0D1117] w-1/3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          {row.label}
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-slate-700">${row.earlyBird}</td>
                        <td className="p-4 text-right font-mono font-bold text-[#1E40AF] bg-blue-50/30">${row.midTerm}</td>
                        <td className="p-4 text-right font-mono font-bold text-emerald-800">${row.onSpot}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Selection Dropdown */}
            <div className="pt-4 space-y-2">
              <label className={labelCls}>Select Participation / Sponsorship Type:</label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#0D1117] focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition"
              >
                {allSelectableOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* 3 — Accommodation & Quantities Card */}
          <section className={panelCls}>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1E40AF] font-extrabold flex items-center justify-center text-sm border border-blue-200">3</span>
              <h2 className="font-bold text-xl text-[#0D1117]">Accommodation & Add-ons</h2>
            </div>

            {/* Accommodation Choices Styled Card */}
            <div className="bg-gradient-to-r from-blue-900 to-[#1E40AF] text-white rounded-2xl p-6 shadow-md space-y-4">
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" /> Accommodation Options (Per Night)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium">
                <label className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/15 cursor-pointer hover:bg-white/20 transition">
                  <input
                    type="radio"
                    name="accommodation"
                    checked={accommodationType === "single"}
                    onChange={() => setAccommodationType("single")}
                    className="accent-amber-400 w-4 h-4 cursor-pointer"
                  />
                  <span>Single Occupancy - <b>$220</b></span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/15 cursor-pointer hover:bg-white/20 transition">
                  <input
                    type="radio"
                    name="accommodation"
                    checked={accommodationType === "double"}
                    onChange={() => setAccommodationType("double")}
                    className="accent-amber-400 w-4 h-4 cursor-pointer"
                  />
                  <span>Double Occupancy - <b>$250</b></span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/15 cursor-pointer hover:bg-white/20 transition">
                  <input
                    type="radio"
                    name="accommodation"
                    checked={accommodationType === "triple"}
                    onChange={() => setAccommodationType("triple")}
                    className="accent-amber-400 w-4 h-4 cursor-pointer"
                  />
                  <span>Triple Occupancy - <b>$280</b></span>
                </label>
              </div>

              <div className="pt-2 border-t border-white/15">
                <label className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/15 cursor-pointer hover:bg-white/20 transition text-sm">
                  <input
                    type="checkbox"
                    checked={accompanyingPerson}
                    onChange={(e) => setAccompanyingPerson(e.target.checked)}
                    className="accent-amber-400 w-4 h-4 cursor-pointer"
                  />
                  <span>Accompanying Person Pass - <b>$249</b></span>
                </label>
              </div>
            </div>

            {/* Quantity inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <label className={labelCls}>No. of Participants:</label>
                <input
                  type="number"
                  min="1"
                  value={participantsCount}
                  onChange={(e) => setParticipantsCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className={inputCls + " font-bold font-mono text-base"}
                />
              </div>

              <div>
                <label className={labelCls}>No. of Accommodation Nights:</label>
                <input
                  type="number"
                  min="0"
                  value={nightsCount}
                  onChange={(e) => setNightsCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className={inputCls + " font-bold font-mono text-base"}
                />
              </div>
            </div>

            {/* Summary Price Breakdown */}
            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs text-slate-700">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Registration Base Price:</span>
                <span className="font-bold text-[#0D1117]">${regTotalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Participants Count:</span>
                <span className="font-bold text-[#0D1117]">{participantsCount}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Accommodation Total ({nightsCount} nights):</span>
                <span className="font-bold text-[#0D1117]">${accomTotalPrice.toLocaleString()}</span>
              </div>
              {accompanyingPerson && (
                <div className="flex justify-between border-b border-slate-200 pb-2 text-[#1E40AF]">
                  <span>Accompanying Person Pass:</span>
                  <span className="font-bold">$249</span>
                </div>
              )}
              <div className="flex justify-between pt-2 text-base font-black text-[#0D1117]">
                <span>Total Payable Amount:</span>
                <span className="text-2xl text-[#1E40AF] font-extrabold">${grandTotalUSD.toLocaleString()} <span className="text-xs font-normal text-slate-500">(₹ {grandTotalINR.toLocaleString()})</span></span>
              </div>
            </div>
          </section>

          {/* 4 — Verification & Payment Options */}
          <section className={panelCls}>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1E40AF] font-extrabold flex items-center justify-center text-sm border border-blue-200">4</span>
              <h2 className="font-bold text-xl text-[#0D1117]">Verification & Payment Gateway</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div>
                <label className={labelCls}>Enter Verification Code <Req /></label>
                <div className="flex items-center gap-3 mb-3">
                  <CaptchaCanvas text={captchaText} />
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-100 text-[#1E40AF] hover:bg-slate-200 transition"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter code shown above"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className={inputCls + " uppercase tracking-widest font-mono font-bold text-base"}
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase text-slate-500 block">Select Payment Gateway:</span>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={(e) => handleProceedPayment("RAZORPAY", e)}
                    className="w-full py-4 px-6 rounded-full font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl hover:scale-[1.02] transition border border-blue-400/30 cursor-pointer"
                  >
                    <span>🇮🇳</span>
                    <span>PROCEED TO RAZORPAY PAYMENT (INDIAN TRANSACTIONS ₹)</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleProceedPayment("PAYPAL", e)}
                    className="w-full py-4 px-6 rounded-full font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 shadow-xl hover:scale-[1.02] transition border border-amber-300/30 cursor-pointer"
                  >
                    <span>🌐</span>
                    <span>PROCEED TO PAYPAL PAYMENT (INTERNATIONAL TRANSACTIONS $)</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          </section>

        </form>

        {/* Conference Details & Cancellation Terms */}
        <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-sm space-y-6 text-xs text-slate-600 leading-relaxed">
          <h3 className="text-lg font-bold text-[#0D1117] border-b border-slate-200 pb-2">Conference Registration Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2 text-[#1E40AF]">For In-Person Participants</h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Full access to all conference sessions & keynotes</li>
                <li>Official conference kit (badge & program booklet)</li>
                <li>E-copy of the Abstract Book</li>
                <li>Daily lunch and coffee breaks</li>
                <li>Certificate of Participation</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2 text-[#1E40AF]">For Virtual Participants</h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Opportunity to present remotely from home or workplace</li>
                <li>Full digital access to all conference presentations</li>
                <li>E-copy of the Abstract Book and Program</li>
                <li>E-Certificate of Participation</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2">Refund & Cancellation Policy</h4>
            <p className="mb-2">
              All cancellation requests must be submitted in writing via email to the Conference Secretary.
            </p>
            <p className="mb-2">
              Cancellations made 60 days or more before the conference start date are eligible for a full refund, minus a $100 administrative fee. Cancellations within 60 days are non-refundable but transferable to future editions.
            </p>
          </div>
        </div>

      </main>

      {/* ── Razorpay Gateway Modal ─────────────────────────────────────────── */}
      {isRazorpayModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-blue-300 shadow-2xl overflow-hidden">
            <div className="bg-[#02042B] p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 block tracking-widest uppercase">RAZORPAY CHECKOUT GATEWAY (🇮🇳 INDIA)</span>
                <h3 className="font-extrabold text-base text-white mt-0.5">D&V Global Summits 2026</h3>
              </div>
              <button onClick={() => setIsRazorpayModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Payer Name:</span><span className="font-bold text-[#0D1117]">{form.title} {form.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Payer Email:</span><span className="font-bold text-slate-800">{form.email}</span></div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm"><span className="font-bold text-slate-700">Amount (INR):</span><span className="font-black text-blue-700">₹ {grandTotalINR.toLocaleString()}</span></div>
              </div>
              <button
                type="button"
                onClick={() => handleCompletePayment("RAZORPAY")}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" /> Authorize ₹ {grandTotalINR.toLocaleString()} via Razorpay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PayPal Gateway Modal ──────────────────────────────────────────── */}
      {isPaypalModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-amber-300 shadow-2xl overflow-hidden">
            <div className="bg-[#003087] p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-300 block tracking-widest uppercase">PAYPAL CHECKOUT GATEWAY (🌐 INTERNATIONAL)</span>
                <h3 className="font-extrabold text-base text-white mt-0.5">D&V Global Summits 2026</h3>
              </div>
              <button onClick={() => setIsPaypalModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Payer Name:</span><span className="font-bold text-[#0D1117]">{form.title} {form.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Payer Email:</span><span className="font-bold text-slate-800">{form.email}</span></div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm"><span className="font-bold text-slate-700">Amount (USD):</span><span className="font-black text-amber-700">$ {grandTotalUSD.toLocaleString()}</span></div>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleCompletePayment("PAYPAL")}
                  className="w-full py-3.5 rounded-xl bg-[#FFC439] hover:bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  PayPal Checkout ($ {grandTotalUSD.toLocaleString()})
                </button>
                <button
                  type="button"
                  onClick={() => handleCompletePayment("PAYPAL")}
                  className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" /> Debit or Credit Card
                </button>
              </div>
            </div>
          </div>
        </div>
      {/* ── Submit Abstract Modal ─────────────────────────────────────────── */}
      {isAbstractModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl border border-pink-300 shadow-2xl overflow-hidden">
            <div className="bg-[#E63980] p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-pink-200 block tracking-widest uppercase">RESEARCH PAPER SUBMISSION</span>
                <h3 className="font-extrabold text-base text-white mt-0.5">Submit Research Abstract</h3>
              </div>
              <button onClick={() => { setIsAbstractModalOpen(false); setAbstractSubmitted(false); }} className="text-pink-100 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {abstractSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Abstract Submitted Successfully!</h4>
                <p className="text-xs text-slate-600">
                  Your research abstract has been queued for peer review. A confirmation email has been sent to <span className="font-bold text-[#E63980]">{abstractForm.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => { setIsAbstractModalOpen(false); setAbstractSubmitted(false); }}
                  className="px-6 py-2.5 bg-[#E63980] hover:bg-[#D0286F] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleAbstractSubmit} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. / Prof. Full Name"
                    value={abstractForm.authorName}
                    onChange={(e) => setAbstractForm({ ...abstractForm, authorName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E63980]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="author@university.edu"
                      value={abstractForm.email}
                      onChange={(e) => setAbstractForm({ ...abstractForm, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E63980]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp / Mobile</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={abstractForm.whatsapp}
                      onChange={(e) => setAbstractForm({ ...abstractForm, whatsapp: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E63980]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Paper Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Title of Research Paper"
                    value={abstractForm.title}
                    onChange={(e) => setAbstractForm({ ...abstractForm, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E63980]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Scientific Track *</label>
                  <select
                    value={abstractForm.track}
                    onChange={(e) => setAbstractForm({ ...abstractForm, track: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#E63980]"
                  >
                    <option value="Artificial Intelligence & Robotics">Artificial Intelligence & Robotics</option>
                    <option value="Biomedicine & Healthcare">Biomedicine & Healthcare</option>
                    <option value="Clean Energy & Sustainability">Clean Energy & Sustainability</option>
                    <option value="Quantum Computing & Physics">Quantum Computing & Physics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Abstract Summary (Max 300 words) *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Paste research abstract summary here..."
                    value={abstractForm.abstractText}
                    onChange={(e) => setAbstractForm({ ...abstractForm, abstractText: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E63980]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#E63980] hover:bg-[#D0286F] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition cursor-pointer"
                  >
                    Submit Abstract For Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Req() { return <span className="text-red-500">*</span>; }
