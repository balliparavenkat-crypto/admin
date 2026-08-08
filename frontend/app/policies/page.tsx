"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, Shield, Database, Share2, Globe, Lock, UserCheck, Cookie, Bell, Mail } from "lucide-react";

const sections = [
  {
    icon: Globe,
    number: "1",
    title: "Scope of the Privacy Policy",
    color: "cyan" as const,
    content: "This policy applies to all personal data collected from attendees, speakers, sponsors, exhibitors, and other participants worldwide through online registration, in-person attendance, digital platforms, and other interactions related to our events.",
  },
  {
    icon: Database,
    number: "2",
    title: "Information We Collect",
    color: "gold" as const,
    content: "",
    list: [
      { label: "Personal Identification Information", text: "Name, email address, phone number, job title, company name, country, etc." },
      { label: "Demographic Information", text: "Age, gender, interests, and other preferences (where legally permissible)." },
      { label: "Technical Data", text: "IP addresses, device type, operating system, browser type, and usage data collected through cookies or similar technologies." },
      { label: "Payment Information", text: "Credit card numbers, billing address, and other financial information for payment processing." },
      { label: "Other Information", text: "Data related to interactions, such as session attendance, survey responses, and interactions on event platforms." },
    ],
  },
  {
    icon: Shield,
    number: "3",
    title: "How We Use Your Information",
    color: "cyan" as const,
    content: "We use your information for the following purposes:",
    list: [
      { label: "Event Management", text: "Registering and managing attendance, coordinating with speakers, and organizing event logistics." },
      { label: "Communication", text: "Sending updates, announcements, and confirmations regarding event participation and related activities." },
      { label: "Marketing and Promotions", text: "Providing information on upcoming events, offers, and opportunities (with opt-in options where required by law)." },
      { label: "Personalization", text: "Tailoring content, networking recommendations, and sessions based on user interests and event interactions." },
      { label: "Security and Compliance", text: "Ensuring event security and compliance with applicable laws, including data protection regulations." },
    ],
  },
  {
    icon: Share2,
    number: "4",
    title: "Data Sharing and Disclosure",
    color: "gold" as const,
    content: "We may share your personal information under certain circumstances, including:",
    list: [
      { label: "Event Partners", text: "With trusted sponsors, exhibitors, and partners who contribute to the event. This may include limited contact information for post-event follow-ups." },
      { label: "Service Providers", text: "With third-party vendors assisting in event management, payment processing, marketing, and other business functions." },
      { label: "Legal Compliance", text: "When required by law or in response to valid requests by public authorities." },
    ],
  },
  {
    icon: Globe,
    number: "5",
    title: "International Data Transfers",
    color: "cyan" as const,
    content: "Given the global nature of our events, your data may be transferred to and processed in countries outside your own. We ensure that such transfers comply with applicable legal requirements, including safeguards as required by GDPR and other data protection laws.",
  },
  {
    icon: Lock,
    number: "6",
    title: "Data Security",
    color: "gold" as const,
    content: "We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. While we strive to use acceptable means to protect your personal data, we cannot guarantee absolute security.",
  },
  {
    icon: UserCheck,
    number: "7",
    title: "Your Rights",
    color: "cyan" as const,
    content: "Depending on your location, you may have the following rights regarding your personal data:",
    list: [
      { label: "Access", text: "Request access to personal data we hold about you." },
      { label: "Correction", text: "Request correction of incomplete or inaccurate data." },
      { label: "Deletion", text: "Request deletion of your personal data under certain conditions." },
      { label: "Objection and Restriction", text: "Object to or request restriction of data processing in specific situations." },
      { label: "Data Portability", text: "Request transfer of your data to another organization or directly to you." },
      { label: "Withdraw Consent", text: "Where consent is the basis for processing, you may withdraw it at any time." },
    ],
    footer: "To exercise any of these rights, please contact us at info@dvglobalsummits.com.",
  },
  {
    icon: Cookie,
    number: "8",
    title: "Cookies and Tracking Technologies",
    color: "gold" as const,
    content: "We use cookies and similar tracking technologies to enhance your experience, analyze traffic, and understand user behavior. You can manage or disable cookies through your browser settings; however, this may impact your experience.",
  },
  {
    icon: Bell,
    number: "9",
    title: "Policy Updates",
    color: "cyan" as const,
    content: "We may update this Privacy Policy to reflect changes in our practices or for legal, regulatory, or operational reasons. We will provide notice of any significant updates and obtain consent where legally required.",
  },
  {
    icon: Mail,
    number: "10",
    title: "Contact Us",
    color: "gold" as const,
    content: "If you have questions, concerns, or requests regarding this Privacy Policy, please contact us at:",
    contact: true,
  },
];

export default function PoliciesPage() {
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
          <span style={{ color: "#D4AF37" }}>Policies</span>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative py-20 px-6 text-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.07) 0%, transparent 60%, rgba(212,175,55,0.05) 100%)" }} />
        {/* decorative shield icon */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 opacity-5">
          <Shield className="w-64 h-64" style={{ color: "#06B6D4" }} />
        </div>
        <div className="relative z-10">
          <span className="text-xs uppercase font-bold tracking-widest mb-4 block" style={{ fontFamily: "monospace", color: "#06B6D4" }}>
            Privacy & Data Protection
          </span>
          <h1 className="font-bold text-4xl md:text-6xl text-white mb-4">
            Global{" "}
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#FACC15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Privacy Policy
            </span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Welcome to <strong className="text-white">D&amp;V SUMMITS PVT LTD</strong>! Your privacy and data security are very important to us. This Global Privacy Policy outlines how we collect, use, disclose, and protect personal information in connection with our events, website, and services.
          </p>
          {/* Last updated badge */}
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
