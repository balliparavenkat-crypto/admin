"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, Mail, CheckCircle, CreditCard, Shield, Lock, BookOpen, Users, AlertTriangle, Calendar, Globe, RefreshCw } from "lucide-react";

interface SectionItem {
  label: string;
  text: string;
}

interface Section {
  icon: React.ComponentType<any>;
  number: string;
  title: string;
  color: "cyan" | "gold";
  content?: string;
  list?: SectionItem[];
  footer?: string;
  contact?: boolean;
}

const sections: Section[] = [
  {
    icon: CheckCircle,
    number: "1",
    title: "Acceptance of Terms",
    color: "cyan" as const,
    content: "By registering for an Event, you (the “Participant”) accept these Terms in full. If you disagree with these Terms or any part of them, please do not register or attend our Events.",
  },
  {
    icon: CreditCard,
    number: "2",
    title: "Registration and Payment",
    color: "gold" as const,
    content: "All payments must be settled according to standard conference schedules:",
    list: [
      { label: "Registration Process", text: "All Participants must complete the registration process through the official D&V Global website or authorized partners." },
      { label: "Payment Terms", text: "Registration fees are due upon submission of the registration form. Payment options will be specified on the registration platform." },
      { label: "Cancellations", text: "Cancellation requests received in writing before a specific deadline (specified on the Event website) may be eligible for a refund, less an administrative fee." },
      { label: "Non-Refundable Fees", text: "Fees for cancellations made after the specified deadline are non-refundable." },
    ],
  },
  {
    icon: Shield,
    number: "3",
    title: "Code of Conduct",
    color: "cyan" as const,
    content: "D&V SUMMITS PVT LTD is committed to providing a safe and respectful environment for all Participants. By attending, you agree to adhere to the following:",
    list: [
      { label: "Respect", text: "Respect others and avoid disruptive or inappropriate behavior." },
      { label: "Zero Tolerance", text: "Harassment, discrimination, and offensive language will not be tolerated." },
      { label: "Compliance Failure", text: "Failure to comply with the Code of Conduct may result in expulsion from the Event without a refund." },
    ],
  },
  {
    icon: Lock,
    number: "4",
    title: "Personal Data and Privacy",
    color: "gold" as const,
    content: "By registering for an Event, you agree to the collection, processing, and sharing of your personal information as outlined in our Privacy Policy, available on our website. Information collected includes but is not limited to contact details, professional background, and payment information.",
  },
  {
    icon: BookOpen,
    number: "5",
    title: "Intellectual Property",
    color: "cyan" as const,
    content: "All materials and presentations displayed during the Event are legally protected:",
    list: [
      { label: "Event Content", text: "All materials, presentations, recordings, and other content shared or displayed during the Event are the property of D&V SUMMITS PVT LTD or its speakers." },
      { label: "Restrictions on Use", text: "Participants are prohibited from recording, duplicating, distributing, or otherwise using Event content for commercial purposes without prior written consent." },
    ],
  },
  {
    icon: Users,
    number: "6",
    title: "Use of Image and Likeness",
    color: "gold" as const,
    content: "By participating in an Event, you grant D&V SUMMITS PVT LTD the right to capture, reproduce, and distribute your image, voice, and likeness for promotional purposes, including but not limited to videos, photographs, and Event highlights. If you do not wish to be included, please inform us in advance.",
  },
  {
    icon: AlertTriangle,
    number: "7",
    title: "Disclaimer and Limitation of Liability",
    color: "cyan" as const,
    list: [
      { label: "Disclaimer", text: "The information presented at D&V SUMMITS PVT LTD Events is for general informational purposes only and is not intended as professional advice." },
      { label: "Limitation of Liability", text: "To the fullest extent permitted by law, D&V SUMMITS PVT LTD will not be liable for any loss or damage arising from your attendance at or participation in an Event, including any technical issues, personal injuries, or lost property." },
    ],
  },
  {
    icon: Calendar,
    number: "8",
    title: "Changes to the Event",
    color: "gold" as const,
    content: "D&V SUMMITS PVT LTD reserves the right to make modifications to the Event’s schedule, content, location, speakers, or format as necessary. Registered Participants will be notified of any significant changes.",
  },
  {
    icon: Globe,
    number: "9",
    title: "Governing Law",
    color: "cyan" as const,
    content: "These Terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these Terms or an Event will be subject to the exclusive jurisdiction of the competent courts.",
  },
  {
    icon: RefreshCw,
    number: "10",
    title: "Amendments to Terms",
    color: "gold" as const,
    content: "D&V SUMMITS PVT LTD reserves the right to modify these Terms at any time. Any changes will be posted on the Event website, and Participants will be notified if significant updates are made.",
  },
  {
    icon: Mail,
    number: "11",
    title: "Contact Us",
    color: "cyan" as const,
    content: "For any questions or concerns related to these Terms, please contact D&V SUMMITS PVT LTD:",
    contact: true,
  },
];

export default function TermsOfUsePage() {
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
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-14 w-auto object-contain filter drop-shadow-[0_0_6px_rgba(6,182,212,0.4)] group-hover:scale-105 transition duration-300" />
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-white transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span style={{ color: "#D4AF37" }}>Terms of Use</span>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative py-20 px-6 text-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.07) 0%, transparent 60%, rgba(212,175,55,0.05) 100%)" }} />
        <div className="relative z-10">
          <span className="text-xs uppercase font-bold tracking-widest mb-4 block" style={{ fontFamily: "monospace", color: "#06B6D4" }}>
            Legal Framework
          </span>
          <h1 className="font-bold text-4xl md:text-6xl text-white mb-4">
            Terms of{" "}
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#FACC15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Use Agreement
            </span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Welcome to <strong className="text-white">D&V SUMMITS PVT LTD</strong>! By registering for, attending, or participating in any D&V SUMMITS PVT LTD events (the “Events”), you agree to comply with and be bound by the following Terms and Conditions (“Terms”). Please read these Terms carefully before registering for or attending any Event.
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
