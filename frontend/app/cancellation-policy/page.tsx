"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, Mail, UserMinus, Users, Calendar, ShieldAlert } from "lucide-react";

const sections = [
  {
    icon: UserMinus,
    number: "1",
    title: "Cancellation by Attendees",
    color: "cyan" as const,
    content: "All cancellation requests must be submitted in writing via email to the Conference Secretary.",
    list: [
      { label: "Before 60 Days", text: "Cancellations made before 60 days of the conference start date will be eligible for a full refund, minus a $100 administrative fee." },
      { label: "Within 60 Days", text: "Cancellations made within 60 days of the conference start date are non-refundable. However, the registration may be transferred to a future edition of the conference." },
      { label: "Processing", text: "All approved refunds will be processed during the second week following the conclusion of the conference." },
    ],
  },
  {
    icon: Users,
    number: "2",
    title: "Substitutions",
    color: "gold" as const,
    content: "If you are unable to attend, you may transfer your registration to another individual at no additional charge by providing notice up to 7 days before the event.",
    footer: "Please email info@dvglobalsummits.com with the full name and contact information of the substitute attendee.",
  },
  {
    icon: Calendar,
    number: "3",
    title: "Event Rescheduling or Cancellation",
    color: "cyan" as const,
    content: "In the unlikely event that D&V SUMMITS PVT LTD reschedules or cancels the event, attendees will be given the option of a full refund or credit toward a future event of equal value. We will notify registered attendees as soon as possible in the event of such changes.",
  },
  {
    icon: ShieldAlert,
    number: "4",
    title: "Force Majeure",
    color: "gold" as const,
    content: "D&V SUMMITS PVT LTD is not liable for refunds or damages if the event is canceled or postponed due to unforeseen circumstances beyond our control (e.g., natural disasters, pandemics, or government restrictions). In such cases, we will work to reschedule the event or offer credit toward future events.",
  },
  {
    icon: Mail,
    number: "5",
    title: "Contact Us",
    color: "cyan" as const,
    content: "If you have any questions regarding our Refund and Cancellation Policy, please contact us at:",
    contact: true,
  },
];

export default function CancellationPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-[#050b1a] text-gray-200 overflow-x-hidden" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* Background glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(6,182,212,0.06)" }} />
      <div className="fixed top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(212,175,55,0.05)" }} />
      <div className="fixed bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(6,182,212,0.04)" }} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 py-3 px-6 md:px-12 flex justify-between items-center backdrop-blur-md" style={{ background: "rgba(5,11,26,0.92)" }}>
        <Link href="/" className="flex items-center group">
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-20 md:h-24 w-auto object-contain transition duration-300" />
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-white transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span style={{ color: "#D4AF37" }}>Refund & Cancellation Policy</span>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative py-20 px-6 text-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.07) 0%, transparent 60%, rgba(212,175,55,0.05) 100%)" }} />
        <div className="relative z-10">
          <span className="text-xs uppercase font-bold tracking-widest mb-4 block" style={{ fontFamily: "monospace", color: "#06B6D4" }}>
            Terms & Guidelines
          </span>
          <h1 className="font-bold text-4xl md:text-6xl text-white mb-4">
            Refund &{" "}
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#FACC15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Cancellation Policy
            </span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            At <strong className="text-white">D&V SUMMITS PVT LTD</strong> we understand that plans may change, and we aim to provide a fair and transparent refund and cancellation process for our attendees. Please read the policy below for details on refunds, cancellations, and substitutions.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold" style={{ background: "rgba(212,175,55,0.08)", borderColor: "rgba(212,175,55,0.25)", color: "#D4AF37" }}>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Last updated: August 2026
          </div>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="sticky top-[73px] z-40 w-full border-b border-white/5 overflow-x-auto" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-1 py-2 min-w-max">
          {sections.map(s => (
            <button
              key={s.number}
              type="button"
              onClick={() => {
                document.getElementById(`section-${s.number}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveSection(s.number);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition duration-200"
              style={activeSection === s.number
                ? { background: "rgba(6,182,212,0.15)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.3)" }
                : { color: "#6b7280", border: "1px solid transparent" }}
            >
              {s.number}. {s.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-14 space-y-8">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isCyan = sec.color === "cyan";
          const accent = isCyan ? "#06B6D4" : "#D4AF37";
          const accentBg = isCyan ? "rgba(6,182,212,0.08)" : "rgba(212,175,55,0.08)";
          const accentBorder = isCyan ? "rgba(6,182,212,0.2)" : "rgba(212,175,55,0.2)";
          const accentDot = isCyan ? "rgba(6,182,212,0.35)" : "rgba(212,175,55,0.35)";

          return (
            <section
              key={sec.number}
              id={`section-${sec.number}`}
              className="rounded-2xl p-8 border transition duration-300 scroll-mt-28"
              style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
              onMouseEnter={() => setActiveSection(sec.number)}
            >
              {/* Section header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest mb-1" style={{ fontFamily: "monospace", color: accent }}>
                    SECTION {sec.number}
                  </div>
                  <h2 className="font-bold text-xl text-white">{sec.title}</h2>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${accentDot}, transparent)` }} />

              {/* Main content */}
              {sec.content && (
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{sec.content}</p>
              )}

              {/* List items */}
              {sec.list && (
                <ul className="space-y-3 mt-4">
                  {sec.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: accent }} />
                      <span className="text-sm text-gray-300">
                        <span className="font-semibold text-white">{item.label}: </span>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Footer note */}
              {sec.footer && (
                <div className="mt-5 flex items-center gap-3 p-4 rounded-xl" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
                  <p className="text-sm" style={{ color: accent }}>{sec.footer}</p>
                </div>
              )}

              {/* Contact block */}
              {sec.contact && (
                <div className="mt-4 rounded-2xl p-6 border" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(6,182,212,0.05))", borderColor: "rgba(212,175,55,0.25)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}>
                      <Mail className="w-5 h-5" style={{ color: "#D4AF37" }} />
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">D&V SUMMITS PVT LTD</div>
                      <div className="text-xs text-gray-400">Conference Management Authority</div>
                    </div>
                  </div>
                  <a
                    href="mailto:info@dvglobalsummits.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition hover:scale-[1.03]"
                    style={{ background: "linear-gradient(90deg,#D4AF37,#CA8A04)", color: "#000" }}
                  >
                    <Mail className="w-4 h-4" />
                    info@dvglobalsummits.com
                  </a>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 py-6 text-center text-xs text-gray-600">
        © 2026 D&V Global Summit / D&V SUMMITS PVT LTD. All rights reserved.{" "}
        <Link href="/" className="hover:underline" style={{ color: "#06B6D4" }}>Return to Homepage</Link>
      </div>
    </div>
  );
}
