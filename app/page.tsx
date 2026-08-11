"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Users, Award, BookOpen, ChevronRight, ChevronLeft,
  Lock, MapPin, Sparkles, Send, Shield, DollarSign, Globe, Building, Play,
  QrCode, Menu, X, ArrowUpRight, HelpCircle, Mail, MessageSquare, Phone
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevImage, setPrevImage] = useState("/images/ai_quantum_summit.png");
  const [selectedYear, setSelectedYear] = useState<2026 | 2027>(2026);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sponsorshipModalOpen, setSponsorshipModalOpen] = useState(false);
  const [selectedSponsorshipTier, setSelectedSponsorshipTier] = useState<string>("Platinum Sponsor");
  const [sponsorFormData, setSponsorFormData] = useState({ company: "", name: "", email: "", phone: "", message: "" });
  const [sponsorSubmitted, setSponsorSubmitted] = useState(false);

  const sponsorshipTiers = [
    {
      id: "platinum",
      name: "Platinum Sponsor",
      priceINR: "₹5,19,168",
      priceUSD: "$5,999",
      badge: "Exclusive Tier",
      popular: true,
      border: "border-blue-400/80 hover:border-blue-500",
      bg: "bg-gradient-to-b from-blue-50 via-white to-white shadow-blue-500/5",
      includes: [
        "Prime booth location and exclusive branding across the event",
        "Keynote speaking opportunity to showcase your expertise",
        "Featured logo placement on event materials, website, and attendee lanyards",
        "Dedicated email blast to event participants"
      ]
    },
    {
      id: "diamond",
      name: "Diamond Sponsor",
      priceINR: "₹4,32,625",
      priceUSD: "$4,999",
      badge: "Premium Tier",
      popular: false,
      border: "border-slate-200 hover:border-blue-400",
      bg: "bg-gradient-to-b from-slate-50 via-white to-white",
      includes: [
        "Premium booth location and branding throughout the event",
        "Opportunity to participate in a panel discussion or workshop",
        "Logo placement on event website and select printed materials",
        "Social media shootouts and recognition"
      ]
    },
    {
      id: "gold",
      name: "Gold Sponsor",
      priceINR: "₹3,46,102",
      priceUSD: "$3,999",
      badge: "High Visibility",
      popular: false,
      border: "border-slate-200 hover:border-blue-400",
      bg: "bg-gradient-to-b from-slate-50 via-white to-white",
      includes: [
        "High-visibility booth space to engage attendees",
        "Logo placement on event website and conference program",
        "Inclusion in sponsor recognition announcements and emails",
        "Opportunity to contribute branded materials in the attendee bag"
      ]
    },
    {
      id: "silver",
      name: "Silver Sponsor",
      priceINR: "₹2,59,555",
      priceUSD: "$2,999",
      badge: "Standard Visibility",
      popular: false,
      border: "border-slate-200 hover:border-blue-400",
      bg: "bg-gradient-to-b from-slate-50 via-white to-white",
      includes: [
        "Standard booth space in the main exhibit hall",
        "Logo placement on event website and printed booklet",
        "Recognition in opening and closing ceremony announcements",
        "2 complimentary sponsor delegate passes"
      ]
    },
    {
      id: "exhibitor",
      name: "Exhibitor",
      priceINR: "₹1,72,625",
      priceUSD: "$1,999",
      badge: "Exhibit Space",
      popular: false,
      border: "border-slate-200 hover:border-blue-400/80",
      bg: "bg-gradient-to-b from-slate-50 via-white to-white",
      includes: [
        "Exhibit booth space in a high-traffic area",
        "Listing on event website and program",
        "Access to networking sessions and attendee engagement opportunities",
        "Dedicated email blast to event participants"
      ]
    }
  ];

  const slides = [
    {
      summitName: "AI & Quantum Summit",
      eyebrow: "⚡ ADVANCED COMPUTATION & QUANTUM TRACKS",
      image: "/images/ai_quantum_summit.png",
      location: "San Francisco, USA",
      date: "Oct 12-14, 2026",
      title: (
        <>
          Connecting Researchers.<br />
          Inspiring <span className="text-accent-blue font-extrabold">Innovation.</span><br />
          Impacting the <span className="text-cyan-400 font-extrabold">World.</span>
        </>
      ),
      description: "Bringing together world-renowned researchers, industry leaders, and academicians to explore breakthroughs in Artificial Intelligence and Quantum Computing.",
      stats: [
        { value: "95+", label: "Countries", icon: Globe, iconColor: "text-accent-blue" },
        { value: "12K+", label: "Delegates", icon: Users, iconColor: "text-accent-blue" },
        { value: "480+", label: "Universities", icon: Building, iconColor: "text-accent-blue" },
        { value: "85+", label: "Tracks", icon: Calendar, iconColor: "text-accent-blue" },
      ]
    },
    {
      summitName: "Bio-Medicine Congress",
      eyebrow: "🧬 GENETICS & MEDICAL SCIENCES",
      image: "/images/biomedicine_congress.png",
      location: "Geneva, Switzerland",
      date: "Nov 08-11, 2026",
      title: (
        <>
          Advancing Medicine.<br />
          Transforming <span className="text-accent-blue font-extrabold">Healthcare.</span><br />
          Saving <span className="text-emerald-400 font-extrabold">Lives.</span>
        </>
      ),
      description: "Premier global platform for clinical researchers, geneticists, and healthcare pioneers sharing landmark medical discoveries.",
      stats: [
        { value: "80+", label: "Countries", icon: Globe, iconColor: "text-[#1E40AF]" },
        { value: "8.5K+", label: "Clinicians", icon: Users, iconColor: "text-[#1E40AF]" },
        { value: "320+", label: "Hospitals", icon: Building, iconColor: "text-[#1E40AF]" },
        { value: "60+", label: "Medical Tracks", icon: Calendar, iconColor: "text-[#1E40AF]" },
      ]
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const [dynamicConferences, setDynamicConferences] = useState<any[]>([]);

  useEffect(() => {
    try {
      const savedStr = localStorage.getItem("custom_summits");
      if (savedStr) {
        const customList: any[] = JSON.parse(savedStr);
        const mappedCustom = customList.map((c, i) => ({
          id: c.id || `custom-${i}`,
          year: 2026,
          title: c.title,
          date: `${c.startDate?.substring(0, 10) || "Oct 15, 2026"} - ${c.endDate?.substring(0, 10) || "Oct 18, 2026"}`,
          location: `${c.city || "San Francisco"}, ${c.country || "USA"}`,
          status: c.status || "Registration Open",
          image: c.bannerUrl || "/images/ai_quantum_summit.png",
          tag: "Advanced Tech",
          countryCode: "us",
        }));
        setDynamicConferences(mappedCustom);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const defaultConferences = [
    {
      id: 1,
      year: 2026,
      title: "DV Global AI & Quantum Summit 2026",
      date: "Oct 12-14, 2026",
      location: "San Francisco, USA",
      status: "Accepting Papers",
      image: "/images/ai_quantum_summit.png",
      tag: "Advanced Tech",
      countryCode: "us"
    },
    {
      id: 2,
      year: 2026,
      title: "International Bio-Medicine & Genetics Congress",
      date: "Nov 08-11, 2026",
      location: "Geneva, Switzerland",
      status: "Call for Abstracts",
      image: "/images/biomedicine_congress.png",
      tag: "Medical Sciences",
      countryCode: "ch"
    },
    {
      id: 3,
      year: 2026,
      title: "World Clean Energy & Sustainability Summit",
      date: "Dec 03-05, 2026",
      location: "Tokyo, Japan",
      status: "Registration Open",
      image: "/images/clean_energy_summit.png",
      tag: "GreenTech",
      countryCode: "jp"
    },
  ];

  const conferences = [...dynamicConferences, ...defaultConferences];

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans bg-[#F8FAFC] text-[#0D1117]">
      
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 w-full glass-panel border-b border-[#1E40AF]/15 py-4 px-6 md:px-12 flex justify-between items-center bg-[#F8FAFC]/90 backdrop-blur-md">
        <HeaderLogo />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wider text-black font-sans">
          <a href="#" className="text-black border-b-2 border-black pb-1 transition-all duration-300">HOME</a>
          <a href="#about" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">ABOUT US</a>
          <a href="#conferences" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">SUMMITS</a>
          <a href="#sponsorship" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">SPONSORSHIP</a>
          <a href="#conferences" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">SCHEDULE</a>
          <Link href="/indian-registers" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">REGISTER</Link>
          <Link href="/policies" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">POLICIES</Link>
          <Link href="/cancellation-policy" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">CANCELLATION POLICY</Link>
          <Link href="/terms-of-use" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">TERMS OF USE</Link>
          <a href="#contact" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all duration-300">CONTACT</a>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => setSponsorshipModalOpen(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#1D4ED8] text-white text-xs font-extrabold rounded-full hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] transition duration-300 uppercase tracking-wider shadow-md"
          >
            Sponsorship
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button className="lg:hidden text-[#0D1117]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full glass-panel z-40 p-6 flex flex-col gap-4 border-b border-[#1E40AF]/15 bg-[#F8FAFC]"
          >
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/15 text-[#1E40AF] font-semibold text-xs tracking-wider">HOME</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">ABOUT US</a>
            <a href="#conferences" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">SUMMITS</a>
            <a href="#sponsorship" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">SPONSORSHIP</a>
            <a href="#conferences" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">SCHEDULE</a>
            <Link href="/indian-registers" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">REGISTER</Link>
            <Link href="/policies" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">POLICIES</Link>
            <Link href="/cancellation-policy" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">CANCELLATION POLICY</Link>
            <div className="flex flex-col gap-3 mt-4">
              <button 
                onClick={() => { setMobileMenuOpen(false); setSponsorshipModalOpen(true); }}
                className="w-full text-center py-2.5 bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#1D4ED8] text-white font-extrabold rounded-lg text-xs uppercase tracking-wider shadow-md"
              >
                Sponsorship
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden text-[#0D1117] py-16 px-6 md:px-12 bg-gradient-to-b from-[#0D1117] via-[#050b1a] to-[#0D1117] text-white border-b border-[#1E40AF]/20">
        <div className="max-w-6xl mx-auto space-y-6">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 font-mono font-bold text-xs rounded-full border border-blue-500/30">
            D&V GLOBAL SUMMITS 2026 - 2027
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Connecting Researchers.<br />
            Inspiring <span className="text-blue-400">Innovation.</span><br />
            Impacting the <span className="text-cyan-400">World.</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed">
            Bringing together leading researchers, practitioners, and industry experts. Secure your delegate pass or submit your research paper today.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/indian-registers"
              className="px-6 py-3.5 bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#1D4ED8] hover:scale-[1.02] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2"
            >
              Register Now <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Summits Cards Section */}
      <section id="conferences" className="py-16 px-6 md:px-12 max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0D1117] tracking-tight">Upcoming D&V Global Summits</h2>
          <p className="text-xs text-slate-600 font-medium">Select a summit to register or view tracks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conferences.map((conf) => (
            <div key={conf.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <img src={conf.image} alt={conf.title} className="w-full h-40 rounded-2xl object-cover border border-slate-200" />
                <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {conf.tag}
                </span>
                <h3 className="font-extrabold text-[#0D1117] text-base leading-snug">{conf.title}</h3>
                <p className="text-xs text-slate-600 font-medium">{conf.location} • {conf.date}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <Link
                  href={`/summits/${conf.id}`}
                  className="block text-center py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border border-slate-300"
                >
                  View Summit Details
                </Link>
                <Link
                  href="/indian-registers"
                  className="block text-center py-2 rounded-xl bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#1D4ED8] text-white text-xs font-extrabold shadow-sm hover:scale-[1.01] transition"
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsorship Section */}
      <section id="sponsorship" className="py-20 px-6 md:px-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] font-mono font-bold text-xs uppercase border border-blue-200">
              Corporate & Academic Partnership
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1117]">Sponsorship Opportunities</h2>
            <p className="text-xs text-slate-600 font-medium">Partner with D&V Global Summits to gain global visibility among leading scientists and research labs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sponsorshipTiers.slice(0, 3).map((tier) => (
              <div key={tier.id} className="p-8 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1E40AF] font-mono font-extrabold text-[10px] uppercase border border-blue-200">
                    {tier.badge}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0D1117]">{tier.name}</h3>
                  <div className="text-3xl font-black text-[#1E40AF] font-mono">{tier.priceUSD} <span className="text-xs font-normal text-slate-500">({tier.priceINR})</span></div>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    {tier.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#1E40AF] font-bold">✓</span> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSponsorshipTier(tier.name);
                    setSponsorshipModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#1D4ED8] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition"
                >
                  Reserve {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Reservation Modal */}
      <AnimatePresence>
        {sponsorshipModalOpen && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl w-full bg-white rounded-3xl border border-blue-200 shadow-2xl overflow-hidden p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#1E40AF] uppercase tracking-widest block">SPONSORSHIP REGISTRATION</span>
                  <h3 className="font-extrabold text-xl text-[#0D1117]">{selectedSponsorshipTier}</h3>
                </div>
                <button onClick={() => setSponsorshipModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!sponsorSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSponsorSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Institution Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OpenAI Inc."
                      value={sponsorFormData.company}
                      onChange={(e) => setSponsorFormData({ ...sponsorFormData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Contact Representative *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={sponsorFormData.name}
                        onChange={(e) => setSponsorFormData({ ...sponsorFormData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Official Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@openai.com"
                        value={sponsorFormData.email}
                        onChange={(e) => setSponsorFormData({ ...sponsorFormData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={sponsorFormData.phone}
                      onChange={(e) => setSponsorFormData({ ...sponsorFormData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Special Requirements / Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Mention booth space preferences, keynote speaker details, or team size..."
                      value={sponsorFormData.message}
                      onChange={(e) => setSponsorFormData({ ...sponsorFormData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF] resize-none"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                    <div className="text-[11px] text-slate-600 font-mono">
                      Direct Desk: <a href="mailto:info@dvglobalsummits.org" className="text-[#1E40AF] font-bold underline">info@dvglobalsummits.org</a>
                    </div>
                    {/* NEW ROYAL BLUE GRADIENT SUBMIT RESERVATION BUTTON */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#1D4ED8] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/25 hover:scale-[1.02] hover:brightness-110 transition cursor-pointer"
                    >
                      Submit Reservation
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#0D1117]">Sponsorship Request Received!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for partnering with D&V Global Summit. Our team has received your reservation for the <span className="text-[#1E40AF] font-bold">{selectedSponsorshipTier}</span> package. A senior event coordinator will contact you at <span className="text-[#0D1117] font-mono">{sponsorFormData.email}</span> within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSponsorshipModalOpen(false);
                        setSponsorSubmitted(false);
                      }}
                      className="px-6 py-2.5 bg-[#1E40AF] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-blue-800 transition"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center group">
      <img src="/images/logo.png" alt="D&V Global Logo" className="h-16 md:h-20 w-auto object-contain" />
    </Link>
  );
}
