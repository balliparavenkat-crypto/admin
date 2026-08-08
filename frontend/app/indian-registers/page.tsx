"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, RefreshCw, Home, CheckCircle } from "lucide-react";

// ── Fee data ──────────────────────────────────────────────────────────────────
const categories = [
  { id: "oral",      label: "Oral Talk",           earlyBird: 699, superEarly: 799, standard: 899 },
  { id: "invited",   label: "Invited Talk",         earlyBird: 699, superEarly: 799, standard: 899 },
  { id: "poster",    label: "Poster",               earlyBird: 499, superEarly: 599, standard: 699 },
  { id: "student",   label: "Student Delegate",     earlyBird: 399, superEarly: 499, standard: 599 },
  { id: "industry",  label: "Industry Delegate",    earlyBird: 899, superEarly: 999, standard: 1099 },
  { id: "virtual",   label: "Virtual Registration", earlyBird: 199, superEarly: 299, standard: 399 },
  { id: "accompany", label: "Accompanying Person",  earlyBird: 299, superEarly: 299, standard: 299 },
];

const accommodation = [
  { nights: "1 Night",  single: 180, double: 190, triple: 200 },
  { nights: "2 Nights", single: 360, double: 380, triple: 400 },
  { nights: "3 Nights", single: 540, double: 570, triple: 600 },
  { nights: "4 Nights", single: 720, double: 760, triple: 800 },
  { nights: "5 Nights", single: 900, double: 950, triple: 1000 },
];

const packages = [
  { id: "pkgA", label: "Package A", price: 1050,  desc: "Registration + 2 Nights Single Occupancy" },
  { id: "pkgB", label: "Package B", price: 1200, desc: "Registration + 3 Nights Single Occupancy" },
  { id: "pkgC", label: "Package C", price: 1400, desc: "Registration + 4 Nights Single Occupancy" },
  { id: "pkgD", label: "Package D", price: 1060,  desc: "Registration + 2 Nights Double Occupancy" },
  { id: "pkgE", label: "Package E", price: 1220, desc: "Registration + 3 Nights Double Occupancy" },
  { id: "pkgF", label: "Package F", price: 1420, desc: "Registration + 4 Nights Double Occupancy" },
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function IndianRegistersPage() {
  const [form, setForm] = useState({ title: "", firstName: "", lastName: "", university: "", country: "", email: "", whatsapp: "" });
  const [feeType, setFeeType] = useState<"earlyBird" | "superEarly" | "standard">("earlyBird");
  const [selCat, setSelCat] = useState("");
  const [selAccom, setSelAccom] = useState<{ nights: string; type: "single" | "double" | "triple" } | null>(null);
  const [selPkg, setSelPkg] = useState("");
  const [captcha, setCaptcha] = useState(genCaptcha);
  const [captchaIn, setCaptchaIn] = useState("");
  const [done, setDone] = useState(false);

  const refreshCaptcha = () => { setCaptcha(genCaptcha()); setCaptchaIn(""); };

  const total = (() => {
    if (selPkg) return packages.find(p => p.id === selPkg)?.price ?? 0;
    const cat = categories.find(c => c.id === selCat);
    const catFee = cat ? cat[feeType] : 0;
    const accomRow = selAccom ? accommodation.find(a => a.nights === selAccom.nights) : null;
    const accomFee = accomRow && selAccom ? accomRow[selAccom.type] : 0;
    return catFee + accomFee;
  })();

  const fmt = (n: number) => n > 0 ? `$ ${n.toLocaleString("en-US")}` : "$ 0";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaIn.toUpperCase() !== captcha) {
      alert("Verification code does not match. Please try again."); refreshCaptcha(); return;
    }
    setDone(true);
  };

  if (done) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="rounded-3xl p-14 text-center max-w-lg border border-slate-200 shadow-2xl" style={{ background: "#FFFFFF", backdropFilter: "blur(20px)" }}>
        <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
        <h2 className="font-bold text-3xl text-[#0D1117] mb-3">Registration Submitted!</h2>
        <p className="text-gray-600 text-sm mb-8">Thank you! Our team will contact <span className="text-[#1E40AF] font-semibold">{form.email}</span> within 24–48 hours.</p>
        <p className="text-2xl font-bold text-[#1E40AF] mb-8">{fmt(total)}</p>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white font-bold rounded-full text-sm uppercase tracking-wider hover:scale-[1.03] transition">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );

  const panelCls = "rounded-2xl p-8 border border-[#1E40AF]/15 bg-white shadow-xl" + " " + "backdrop-blur-sm";
  const panelStyle = { background: "#FFFFFF" };
  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0D1117] placeholder-gray-600 focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/30 transition";
  const labelCls = "block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2";

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0D1117] overflow-x-hidden" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* bg glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 py-3 px-6 md:px-12 flex justify-between items-center bg-[#F8FAFC]/90 backdrop-blur-md">
        <Link href="/" className="flex items-center group">
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-20 md:h-24 w-auto object-contain transition duration-300" />
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold text-black">
          <Link href="/" className="hover:text-black transition flex items-center gap-1"><Home className="w-3.5 h-3.5 text-black" /> Home</Link>
          <ChevronRight className="w-3 h-3 text-black" />
          <span className="text-black font-bold">Registration</span>
        </div>
      </nav>

      {/* Header */}
      <div className="relative py-14 px-6 text-center border-b border-slate-200" style={{ background: "linear-gradient(to bottom, rgba(6,182,212,0.06), transparent)" }}>
        <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 mb-3 block" style={{ fontFamily: "monospace" }}>Register</span>
        <h1 className="font-bold text-4xl md:text-5xl text-[#0D1117] mb-3">
          Conference <span style={{ background: "linear-gradient(90deg,#1E40AF,#FACC15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Registration</span>
        </h1>
        <p className="text-gray-600 text-sm max-w-lg mx-auto">Complete the form below to secure your seat. All fees are in Indian Rupees (INR).</p>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="max-w-5xl mx-auto px-4 md:px-6 py-14 space-y-10">

        {/* 1 — Personal Info */}
        <section className={panelCls} style={panelStyle}>
          <SectionTitle n="1" color="cyan">Personal Information</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div>
              <label className={labelCls}>Title <Req /></label>
              <select required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className={inputCls + " appearance-none cursor-pointer"}>
                <option value="" disabled className="bg-white text-[#0D1117]">Select</option>
                {["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Er."].map(t => <option key={t} value={t} className="bg-white text-[#0D1117]">{t}</option>)}
              </select>
            </div>
            <Field label="First Name" placeholder="Enter your First Name" value={form.firstName} onChange={v => setForm({ ...form, firstName: v })} />
            <Field label="Last Name" placeholder="Enter your Last Name" value={form.lastName} onChange={v => setForm({ ...form, lastName: v })} />
            <Field label="University / Organisation" placeholder="Enter your University Name" value={form.university} onChange={v => setForm({ ...form, university: v })} />
            <Field label="Country" placeholder="Enter your Country Name" value={form.country} onChange={v => setForm({ ...form, country: v })} />
            <Field label="Email" type="email" placeholder="Enter your Email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
            <Field label="WhatsApp Number" type="tel" placeholder="Enter your WhatsApp Number" value={form.whatsapp} onChange={v => setForm({ ...form, whatsapp: v })} />
          </div>
        </section>

        {/* 2 — Category & Fees */}
        <section className={panelCls} style={panelStyle}>
          <SectionTitle n="2" color="gold">Category & Registration Fee</SectionTitle>

          <div className="mt-4 mb-6 ml-11 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-gray-600 leading-relaxed max-w-2xl">
            <span className="font-bold text-[#1E40AF] block mb-1">Registration Selection Process:</span>
            <ul className="list-decimal list-inside space-y-1 text-gray-600">
              <li>Choose your timeline tier (<strong>Early Bird</strong>, <strong>Super Early Bird</strong>, or <strong>Standard</strong>) using the toggle below.</li>
              <li>Select your category from the table (e.g. Oral Talk, Poster, Delegate) by clicking on its row.</li>
              <li>Scroll down to optionally choose <strong>Accommodation</strong> or select a pre-bundled <strong>Registration Package</strong>.</li>
            </ul>
          </div>

          <div className="inline-flex p-1 rounded-full border border-slate-200 mt-6 mb-8 bg-slate-100">
            {(["earlyBird", "superEarly", "standard"] as const).map(t => (
              <button key={t} type="button" onClick={() => setFeeType(t)}
                className="px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition duration-300"
                style={feeType === t ? { background: "linear-gradient(90deg,#1E40AF,#1E3A8A)", color: "#FFFFFF" } : { color: "#475569" }}>
                {t === "earlyBird" ? "Early Bird" : t === "superEarly" ? "Super Early Bird" : "Standard"}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#1E40AF]/15 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#FFFFFF" }} className="border-b border-[#1E40AF]/15 bg-white">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ color: "#1E40AF" }}>Early Bird</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ color: "#1E40AF" }}>Super Early Bird</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ color: "#34d399" }}>Standard</th>
                  <th className="px-5 py-3.5 w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {categories.map(cat => {
                  const active = selCat === cat.id && !selPkg;
                  return (
                    <tr key={cat.id} onClick={() => { setSelCat(cat.id); setSelPkg(""); }}
                      className="cursor-pointer transition duration-200"
                      style={active ? { background: "rgba(6,182,212,0.07)", borderLeft: "2px solid #1E40AF" } : {}}>
                      <td className="px-5 py-4 font-semibold text-[#0D1117]">
                        <span className="flex items-center gap-3">
                          <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 inline-block transition"
                            style={active ? { borderColor: "#1E40AF", background: "#1E40AF" } : { borderColor: "#4b5563" }} />
                          {cat.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-semibold" style={{ color: "#1E40AF" }}>$ {cat.earlyBird.toLocaleString("en-US")}</td>
                      <td className="px-5 py-4 text-right font-mono font-semibold" style={{ color: "#1E40AF" }}>$ {cat.superEarly.toLocaleString("en-US")}</td>
                      <td className="px-5 py-4 text-right font-mono font-semibold" style={{ color: "#34d399" }}>$ {cat.standard.toLocaleString("en-US")}</td>
                      <td className="px-5 py-4 text-right">
                        {active && <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: "#1E40AF", background: "rgba(6,182,212,0.1)" }}>Selected</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3 — Accommodation */}
        <section className={panelCls} style={panelStyle}>
          <SectionTitle n="3" color="cyan">Accommodation Fee <span className="text-xs font-normal text-gray-500 ml-1">(Optional)</span></SectionTitle>
          <p className="text-xs text-gray-500 mt-1 mb-6 ml-11">Click a cell to add accommodation to your total.</p>
          <div className="overflow-x-auto rounded-xl border border-[#1E40AF]/15 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#FFFFFF" }} className="border-b border-[#1E40AF]/15 bg-white">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider">Type / Nights</th>
                  <th className="text-center px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ color: "#1E40AF" }}>Single</th>
                  <th className="text-center px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ color: "#1E40AF" }}>Double</th>
                  <th className="text-center px-5 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ color: "#34d399" }}>Triple</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {accommodation.map(row => (
                  <tr key={row.nights} className="transition" style={{ background: "transparent" }}>
                    <td className="px-5 py-4 font-semibold text-[#0D1117]">{row.nights}</td>
                    {(["single", "double", "triple"] as const).map(type => {
                      const active = selAccom?.nights === row.nights && selAccom?.type === type;
                      return (
                        <td key={type} className="px-5 py-4 text-center">
                          <button type="button"
                            onClick={() => { setSelAccom(active ? null : { nights: row.nights, type }); setSelPkg(""); }}
                            className="px-4 py-2 rounded-lg font-mono font-semibold text-sm transition duration-200"
                            style={active
                              ? { background: "#1E40AF", color: "#FFFFFF", boxShadow: "0 4px 15px rgba(30,64,175,0.25)" }
                              : { background: "rgba(30,64,175,0.05)", border: "1px solid rgba(30,64,175,0.15)", color: "#1E40AF" }}>
                            $ {row[type].toLocaleString("en-US")}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 — Packages */}
        <section className={panelCls} style={panelStyle}>
          <SectionTitle n="4" color="gold">Registration Packages</SectionTitle>
          <p className="text-xs text-gray-500 mt-1 mb-6 ml-11">Bundle packages override separate category & accommodation selections.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map(pkg => {
              const active = selPkg === pkg.id;
              return (
                <button key={pkg.id} type="button"
                  onClick={() => { setSelPkg(active ? "" : pkg.id); setSelCat(""); setSelAccom(null); }}
                  className="text-left rounded-xl p-5 border-2 transition duration-300 w-full"
                  style={active
                    ? { borderColor: "#1E40AF", background: "rgba(30,64,175,0.05)", boxShadow: "0 4px 20px rgba(30,64,175,0.1)" }
                    : { borderColor: "rgba(30,64,175,0.1)", background: "#FFFFFF" }}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={active ? { background: "#1E40AF", color: "#FFFFFF" } : { background: "rgba(30,64,175,0.05)", color: "#1E40AF" }}>
                      {pkg.label}
                    </span>
                    {active && <CheckCircle className="w-5 h-5 text-[#1E40AF] flex-shrink-0" />}
                  </div>
                  <div className="text-xl font-bold text-[#0D1117] mb-1" style={{ fontFamily: "monospace" }}>$ {pkg.price.toLocaleString("en-US")}</div>
                  <div className="text-xs text-gray-600 leading-snug">{pkg.desc}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 5 — Captcha + Total */}
        <section className={panelCls} style={panelStyle}>
          <SectionTitle n="5" color="cyan">Verification & Summary</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mt-6">
            <div>
              <label className={labelCls}>Verification Code <Req /></label>
              <div className="flex items-center gap-3 mb-3">
                <CaptchaCanvas text={captcha} />
                <button type="button" onClick={refreshCaptcha}
                  className="p-2.5 rounded-lg transition border border-[#1E40AF]/15"
                  style={{ background: "rgba(30,64,175,0.05)", color: "#1E40AF" }}
                  title="Refresh captcha">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <input required type="text" maxLength={6} placeholder="Enter code shown above"
                value={captchaIn} onChange={e => setCaptchaIn(e.target.value.toUpperCase())}
                className={inputCls + " tracking-widest font-mono"} />
              <button type="button" onClick={refreshCaptcha} className="mt-2 text-xs hover:underline" style={{ color: "#1E40AF" }}>
                Can&apos;t read the image? Click here to refresh
              </button>
            </div>
            <div className="rounded-2xl p-6 border" style={{ background: "linear-gradient(135deg,rgba(30,64,175,0.06),rgba(30,64,175,0.03))", borderColor: "rgba(30,64,175,0.15)" }}>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Total Amount</div>
              <div className="text-4xl font-bold text-[#0D1117] mb-2" style={{ fontFamily: "monospace" }}>{fmt(total)}</div>
              {selPkg && <div className="text-xs" style={{ color: "#1E40AF" }}>{packages.find(p => p.id === selPkg)?.label} — {packages.find(p => p.id === selPkg)?.desc}</div>}
              {selCat && !selPkg && (
                <div className="text-xs" style={{ color: "#1E40AF" }}>
                  {categories.find(c => c.id === selCat)?.label}
                  {selAccom ? ` + ${selAccom.nights} ${selAccom.type.charAt(0).toUpperCase() + selAccom.type.slice(1)}` : ""}
                </div>
              )}
              {total === 0 && <div className="text-xs text-gray-500">Select a category or package above</div>}
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button type="submit"
              className="px-14 py-4 font-bold text-sm uppercase tracking-widest rounded-full flex items-center gap-3 transition duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(90deg,#1E40AF,#1E3A8A)", color: "#FFFFFF", boxShadow: "0 8px 30px rgba(30,64,175,0.25)" }}>
              Register Now <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

      </form>

      <div className="border-t border-slate-200 py-6 text-center text-xs text-gray-600">
        © 2026 D&V Global Summit. All rights reserved.{" "}
        <Link href="/" className="hover:underline" style={{ color: "#1E40AF" }}>Return to Homepage</Link>
      </div>
    </div>
  );
}

// ── Helper sub-components ─────────────────────────────────────────────────────
function Req() { return <span style={{ color: "#f87171" }}>*</span>; }

function SectionTitle({ n, color, children }: { n: string; color: "cyan" | "gold"; children: React.ReactNode }) {
  const bg = color === "cyan" ? "rgba(30,64,175,0.15)" : "rgba(212,175,55,0.15)";
  const border = color === "cyan" ? "rgba(6,182,212,0.3)" : "rgba(212,175,55,0.3)";
  const text = color === "cyan" ? "#1E40AF" : "#1E40AF";
  return (
    <h2 className="font-bold text-xl text-[#0D1117] flex items-center gap-3">
      <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
        style={{ background: bg, border: `1px solid ${border}`, color: text }}>{n}</span>
      {children}
    </h2>
  );
}

function Field({ label, placeholder, value, onChange, type = "text" }:
  { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0D1117] placeholder-gray-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition";
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{label} <span style={{ color: "#f87171" }}>*</span></label>
      <input required type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className={inputCls} />
    </div>
  );
}

