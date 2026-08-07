"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Users, Award, BookOpen, ChevronRight, ChevronLeft,
  Lock, MapPin, Sparkles, Send, Shield, DollarSign, Globe, Building, Play,
  QrCode, Menu, X, ArrowUpRight, HelpCircle, Mail, MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
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
      border: "border-amber-400/50 hover:border-amber-400",
      bg: "bg-gradient-to-b from-amber-500/10 via-black/40 to-black/60",
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
      border: "border-amber-500/30 hover:border-amber-400/80",
      bg: "bg-gradient-to-b from-amber-500/5 via-black/40 to-black/60",
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
      border: "border-amber-500/20 hover:border-amber-500/60",
      bg: "bg-gradient-to-b from-amber-500/5 via-black/40 to-black/60",
      includes: [
        "High-visibility booth space to engage attendees",
        "Logo placement on event website and conference program",
        "Inclusion in sponsor recognition announcements and emails",
        "Opportunity to contribute branded materials in the attendee bag"
      ]
    },
    {
      id: "exhibitor",
      name: "Exhibitor",
      priceINR: "₹2,59,555",
      priceUSD: "$2,999",
      badge: "Exhibit Space",
      popular: false,
      border: "border-white/10 hover:border-amber-400/40",
      bg: "bg-gradient-to-b from-white/5 via-black/40 to-black/60",
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
      eyebrow: "🌐 WORLD'S PREMIER RESEARCH SUMMIT PLATFORM",
      image: "/images/tech_hero_globe.png",
      title: (
        <>
          Connecting Researchers.<br />
          Inspiring <span className="text-accent-gold text-glow-gold">Innovation.</span><br />
          Impacting the <span className="text-accent-cyan text-glow-cyan">World.</span>
        </>
      ),
      description: "D&V Global Summit brings together brilliant minds, groundbreaking research, and global opportunities to shape a better tomorrow.",
      stats: [
        { value: "120+", label: "Countries", icon: Globe, iconColor: "text-amber-400" },
        { value: "15K+", label: "Researchers", icon: Users, iconColor: "text-amber-400" },
        { value: "500+", label: "Universities", icon: Building, iconColor: "text-amber-400" },
        { value: "250+", label: "Global Conferences", icon: Calendar, iconColor: "text-amber-400" },
      ]
    },
    {
      eyebrow: "⚡ ADVANCED COMPUTATION & INTELLECTUAL TRACKS",
      image: "/images/ai_quantum_summit.png",
      title: (
        <>
          Pioneering Intelligence.<br />
          Quantum <span className="text-accent-gold text-glow-gold">Leads.</span><br />
          Transforming the <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.65)]">Future.</span>
        </>
      ),
      description: "DV Global AI & Quantum Summit joins physicists, computer scientists, and global tech pioneers to address next-generation processing limits.",
      stats: [
        { value: "60+", label: "Countries", icon: Globe, iconColor: "text-amber-400" },
        { value: "4K+", label: "AI Experts", icon: Users, iconColor: "text-amber-400" },
        { value: "150+", label: "Universities", icon: Building, iconColor: "text-amber-400" },
        { value: "45+", label: "Active Tracks", icon: Calendar, iconColor: "text-amber-400" },
      ]
    },
    {
      eyebrow: "🧬 DECIPHERING GENOMICS & MOLECULAR PATHWAYS",
      image: "/images/biomedicine_congress.png",
      title: (
        <>
          Decoding Genomes.<br />
          Advanced <span className="text-accent-gold text-glow-gold">Care.</span><br />
          Healing <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.65)]">Humanity.</span>
        </>
      ),
      description: "Explore breakthroughs in gene splicing, double-blind clinical trials, molecular pathology, and fast-track Scopus indexations.",
      stats: [
        { value: "80+", label: "Countries", icon: Globe, iconColor: "text-amber-400" },
        { value: "6K+", label: "MD Specialists", icon: Users, iconColor: "text-amber-400" },
        { value: "220+", label: "Research Labs", icon: Building, iconColor: "text-amber-400" },
        { value: "80+", label: "Tracks Registered", icon: Calendar, iconColor: "text-amber-400" },
      ]
    },
    {
      eyebrow: "🍃 CLEAN ENERGY & SUSTAINABLE CLIMATE SOLUTIONS",
      image: "/images/clean_energy_summit.png",
      title: (
        <>
          Accelerating Net-Zero.<br />
          Clean <span className="text-accent-gold text-glow-gold">Energy.</span><br />
          Green <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.65)]">Innovation.</span>
        </>
      ),
      description: "Uniting environmental scientists, policy makers, and renewable tech developers to build scalable carbon-neutral infrastructures.",
      stats: [
        { value: "95+", label: "Countries", icon: Globe, iconColor: "text-amber-400" },
        { value: "8K+", label: "Delegates", icon: Users, iconColor: "text-amber-400" },
        { value: "310+", label: "CleanTech Labs", icon: Building, iconColor: "text-amber-400" },
        { value: "60+", label: "Green Tracks", icon: Calendar, iconColor: "text-amber-400" },
      ]
    },
    {
      eyebrow: "🤖 ROBOTICS, AUTONOMOUS SYSTEMS & NEXT-GEN IOT",
      image: "/images/robotics_summit.png",
      title: (
        <>
          Empowering Automation.<br />
          Robotics <span className="text-accent-gold text-glow-gold">Leads.</span><br />
          Smart <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.65)]">Cities.</span>
        </>
      ),
      description: "Gathering cybernetic engineers and IoT architects to demonstrate autonomous drone fleets and industrial automation.",
      stats: [
        { value: "75+", label: "Countries", icon: Globe, iconColor: "text-amber-400" },
        { value: "5K+", label: "Robotics Chairs", icon: Users, iconColor: "text-amber-400" },
        { value: "180+", label: "Tech Hubs", icon: Building, iconColor: "text-amber-400" },
        { value: "50+", label: "Live Demos", icon: Calendar, iconColor: "text-amber-400" },
      ]
    }
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


  const conferences = [
    {
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
      year: 2026,
      title: "World Clean Energy & Sustainability Summit",
      date: "Dec 03-05, 2026",
      location: "Tokyo, Japan",
      status: "Registration Open",
      image: "/images/clean_energy_summit.png",
      tag: "GreenTech",
      countryCode: "jp"
    },
    {
      year: 2027,
      title: "DV Global Robotics & IoT Summit 2027",
      date: "Apr 18-20, 2027",
      location: "Munich, Germany",
      status: "Call for Abstracts",
      image: "/images/robotics_summit.png",
      tag: "Automation",
      countryCode: "de"
    },
    {
      year: 2027,
      title: "International Neuro-Oncology & Brain Genomics Congress 2027",
      date: "May 22-25, 2027",
      location: "Boston, USA",
      status: "Accepting Papers",
      image: "/images/brain_genomics.png",
      tag: "BioTech",
      countryCode: "us"
    },
    {
      year: 2027,
      title: "World Sustainable Infrastructure & Smart Cities Forum 2027",
      date: "Sep 14-16, 2027",
      location: "Singapore",
      status: "Registration Open",
      image: "/images/smart_cities.png",
      tag: "UrbanTech",
      countryCode: "sg"
    }
  ];

  const speakers = [
    { name: "Dr. Elena Rostova", title: "Quantum AI Chair, ETH Zürich", role: "Keynote Speaker", image: "/images/speaker_elena.png" },
    { name: "Prof. Marcus Vance", title: "Director of Genomics, MIT", role: "Plenary Panelist", image: "/images/speaker_marcus.png" },
    { name: "Sarah Jenkins", title: "VP of Renewable Tech, SolarCorp", role: "Featured Speaker", image: "/images/speaker_sarah.png" },
  ];

  const journals = [
    { name: "DV Global Journal of Intelligent Systems", impact: "8.4 IF", scope: "Machine Learning & Soft Computing" },
    { name: "International Review of Clinical Bio-Medicine", impact: "6.9 IF", scope: "Genomics, Pathology & Clinical Care" },
    { name: "Journal of Sustainable Climate Solutions", impact: "5.7 IF", scope: "Renewable Systems & Economics" },
  ];

  const awards = [
    { title: "DV Global Research Excellence Award", desc: "For breakthrough discoveries in Applied Sciences." },
    { title: "Young Scientist Innovation Medal", desc: "Recognizing outstanding researchers under 35." },
    { title: "Outstanding Chair Leadership Award", desc: "Honoring exemplary conference orchestration." },
  ];

  const faqs = [
    { q: "How can I submit my research paper?", a: "Register for an Author account, select your target conference and track, and upload your abstract or full PDF via the Paper Submission module." },
    { q: "What is the review process for submitted papers?", a: "We utilize a strict double-blind peer-review system managed by our Conference Chair and Review Committee." },
    { q: "Can I download an invoice for my payment?", a: "Yes, immediately after payment, you can download formal PDF invoices and payment receipts from your user dashboard." },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans bg-background text-gray-200">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-accent-gold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center bg-[#050b1a]/80 backdrop-blur-md">
        <HeaderLogo />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wider text-gray-300 font-sans">
          <a href="#" className="text-amber-400 border-b-2 border-amber-400 pb-1 transition-all duration-300">HOME</a>
          <a href="#about" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">ABOUT US</a>
          <a href="#conferences" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">SUMMITS</a>
          <a href="#sponsorship" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">SPONSORSHIP</a>
          <a href="#journals" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">SCHEDULE</a>
          <Link href="/indian-registers" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">INDIAN REGISTERS</Link>
          <Link href="/policies" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">POLICIES</Link>
          <Link href="/cancellation-policy" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">CANCELLATION POLICY</Link>
          <Link href="/terms-of-use" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">TERMS OF USE</Link>
          <a href="#" className="hover:text-amber-400 border-b-2 border-transparent hover:border-amber-400 pb-1 transition-all duration-300">CONTACT</a>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => setSponsorshipModalOpen(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-black text-xs font-extrabold rounded-full hover:shadow-lg hover:shadow-accent-gold/25 hover:scale-[1.02] transition duration-300 uppercase tracking-wider shadow-md"
          >
            Sponsorship
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="absolute top-16 left-0 w-full glass-panel z-40 p-6 flex flex-col gap-4 border-b border-white/10 bg-[#050b1a]"
          >
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 text-amber-400 font-semibold text-xs tracking-wider">HOME</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 font-semibold text-xs tracking-wider transition-colors">ABOUT US</a>
            <a href="#conferences" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 font-semibold text-xs tracking-wider transition-colors">SUMMITS</a>
            <a href="#sponsorship" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 font-semibold text-xs tracking-wider transition-colors">SPONSORSHIP</a>
            <a href="#journals" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 font-semibold text-xs tracking-wider transition-colors">SCHEDULE</a>
            <Link href="/indian-registers" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 font-semibold text-xs tracking-wider transition-colors">INDIAN REGISTERS</Link>
            <Link href="/policies" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 font-semibold text-xs tracking-wider transition-colors">POLICIES</Link>
            <Link href="/cancellation-policy" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-white/5 text-gray-300 hover:text-amber-400 hover:border-amber-400/50 font-semibold text-xs tracking-wider transition-colors">CANCELLATION POLICY</Link>
            <div className="flex flex-col gap-3 mt-4">
              <button 
                onClick={() => { setMobileMenuOpen(false); setSponsorshipModalOpen(true); }}
                className="w-full text-center py-2.5 bg-accent-gold text-black font-extrabold rounded-lg text-xs uppercase tracking-wider shadow-md"
              >
                Sponsorship
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

            {/* ===================== PREMIUM TECH HERO — HEMISPHERE CAROUSEL ===================== */}
      <section
        className="relative w-full overflow-hidden flex items-center min-h-screen"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 100% 50%, rgba(20,45,80,0.5) 0%, rgba(5,10,22,0) 62%),
            radial-gradient(ellipse 120% 90% at 10% 100%, rgba(10,18,38,0.85) 0%, rgba(0,0,0,0) 55%),
            linear-gradient(180deg, #050A16 0%, #030509 65%, #000000 100%)
          `
        }}
      >
        <style>{`
          :root {
            --navy-950: #050A16;
            --gold: #d9b25e;
            --gold-bright: #f3d98a;
            --gold-dim: #8a713a;
            --cyan: #3fd0ff;
            --ink-100: #eef2fb;
            --ink-300: #a9b4cc;
            --ink-500: #5f6c8a;
            --d: min(66vw, 1040px);
          }

          .hero-content {
            position: relative;
            z-index: 5;
            width: 56%;
            padding: 0 6vw;
            max-width: 760px;
          }

          .hero-eyebrow {
            display: flex;
            align-items: center;
            gap: 14px;
            color: var(--gold);
            font-size: 12.5px;
            letter-spacing: .32em;
            text-transform: uppercase;
            font-weight: 500;
            margin-bottom: 28px;
            opacity: 0;
            animation: heroFadeUp 1s ease forwards .15s;
          }
          .hero-eyebrow::before {
            content: "";
            width: 34px;
            height: 1px;
            background: linear-gradient(90deg, var(--gold), transparent);
          }

          .hero-title {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 600;
            font-size: clamp(40px, 4.6vw, 76px);
            line-height: 1.06;
            color: var(--ink-100);
            margin: 0 0 26px;
            opacity: 0;
            animation: heroFadeUp 1s ease forwards .3s;
          }
          .hero-title em {
            font-style: normal;
            background: linear-gradient(120deg, var(--gold-bright), var(--gold) 45%, var(--cyan));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .hero-lead {
            font-weight: 300;
            font-size: 17px;
            line-height: 1.7;
            color: var(--ink-300);
            max-width: 480px;
            margin: 0 0 42px;
            opacity: 0;
            animation: heroFadeUp 1s ease forwards .45s;
          }

          .hero-cta-row {
            display: flex;
            align-items: center;
            gap: 20px;
            opacity: 0;
            animation: heroFadeUp 1s ease forwards .6s;
          }
          .btn-primary-custom {
            padding: 15px 32px;
            background: linear-gradient(135deg, #f3d98a 0%, #d9b25e 60%, #b88e36 100%);
            color: #050a16;
            font-weight: 700;
            font-size: 13px;
            letter-spacing: .08em;
            text-transform: uppercase;
            border-radius: 12px;
            text-decoration: none;
            white-space: nowrap;
            box-shadow: 0 0 25px rgba(217,178,94,.45);
            transition: all .35s cubic-bezier(0.22, 1, 0.36, 1);
            display: inline-flex;
            align-items: center;
            gap: 10px;
          }
          .btn-primary-custom:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 0 35px rgba(217,178,94,.75);
            color: #000000;
          }
          .btn-secondary-custom {
            padding: 14px 28px;
            background: rgba(255,255,255, 0.04);
            border: 1px solid rgba(255,255,255, 0.16);
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: .05em;
            border-radius: 12px;
            text-decoration: none;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(12px);
            transition: all .35s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .btn-secondary-custom:hover {
            background: rgba(217,178,94, 0.14);
            border-color: rgba(217,178,94, 0.65);
            color: #f3d98a;
            transform: translateY(-2px);
          }

          .hero-stats {
            display: flex;
            gap: 52px;
            margin-top: 72px;
            padding-top: 32px;
            border-top: 1px solid rgba(255,255,255,.08);
            opacity: 0;
            animation: heroFadeUp 1s ease forwards .75s;
          }
          .hero-stat b {
            display: block;
            font-family: 'Cormorant Garamond', serif;
            font-size: 32px;
            font-weight: 600;
            color: var(--ink-100);
          }
          .hero-stat span {
            display: block;
            font-size: 11.5px;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--ink-500);
            margin-top: 4px;
          }

          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          /* ================= THE HEMISPHERE ================= */
          .globe-sphere {
            position: absolute;
            top: 50%;
            left: 100%;
            width: var(--d);
            height: var(--d);
            transform: translate(-50%, -50%);
            border-radius: 50%;
            overflow: hidden;
            z-index: 3;
            background: radial-gradient(circle at 34% 30%, rgba(191,233,255,.28) 0%, rgba(63,168,221,.16) 26%, rgba(15,60,102,.22) 52%, rgba(8,29,56,.5) 78%, rgba(3,10,22,.82) 100%);
            box-shadow: inset 0 0 90px rgba(217,178,94,.22), inset 60px 0 140px rgba(0,0,0,.55), 0 0 120px rgba(217,178,94,.25);
            animation: breathe 9s ease-in-out infinite;
          }
          @keyframes breathe {
            0%,100% { transform: translate(-50%, -50%) scale(1); }
            50%     { transform: translate(-50%, -50%) scale(1.012); }
          }

          .globe-sphere::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            box-shadow: inset 0 0 0 2px rgba(217,178,94,.55), inset 0 0 40px rgba(217,178,94,.18);
            pointer-events: none;
          }

          .rim-sweep {
            position: absolute;
            inset: -2%;
            border-radius: 50%;
            background: conic-gradient(from 0deg,
              rgba(243,217,138,0) 0deg, rgba(243,217,138,.9) 8deg, rgba(243,217,138,0) 30deg,
              rgba(217,178,94,0) 170deg, rgba(243,217,138,.75) 190deg, rgba(217,178,94,0) 220deg,
              rgba(243,217,138,0) 360deg);
            mix-blend-mode: screen;
            opacity: .6;
            animation: spinRim 14s linear infinite;
            -webkit-mask: radial-gradient(circle, transparent 62%, #000 63%, #000 66%, transparent 67%);
                    mask: radial-gradient(circle, transparent 62%, #000 63%, #000 66%, transparent 67%);
          }
          @keyframes spinRim {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          .sphere-inner-decor {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .sphere-grid {
            transform-origin: 50% 50%;
            animation: spinRim 220s linear infinite;
          }

          .glass-sheen {
            position: absolute;
            top: 8%;
            left: 14%;
            width: 46%;
            height: 34%;
            background: radial-gradient(ellipse at center, rgba(255,255,255,.16), rgba(255,255,255,0) 70%);
            border-radius: 50%;
            pointer-events: none;
          }

          /* ================= PHOTO CAROUSEL ================= */
          .photo-chip {
            position: absolute;
            top: 50%;
            width: 78px;
            height: 78px;
            border-radius: 16px;
            overflow: hidden;
            border: 1.5px solid rgba(217,178,94,.75);
            box-shadow: 0 0 22px rgba(63,208,255,.35), 0 0 0 1px rgba(255,255,255,.04);
            background-size: cover;
            background-position: center;
            animation-name: flowToCenter;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
          .photo-chip::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(160deg, rgba(63,208,255,.18), rgba(5,10,22,.35) 70%);
          }

          @keyframes flowToCenter {
            0%   { left: 48%; transform: translateY(-50%) scale(.55); opacity: 0; }
            12%  { opacity: 1; }
            58%  { opacity: 1; }
            85%  { opacity: .55; }
            100% { left: 16%; transform: translateY(-50%) scale(.32); opacity: 0; }
          }

          /* ================= CENTER EMBLEM (TRANSPARENT CONTAINER WITH DEEP BLACK SHADOW) ================= */
          .badge-custom {
            position: absolute;
            top: 50%;
            right: calc(var(--d) / 4);
            transform: translate(50%, -50%);
            z-index: 4;
            width: calc(var(--d) * 0.35);
            height: calc(var(--d) * 0.35);
            background: transparent;
            border: none;
            box-shadow: none;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
          }
          .badge-custom b {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(22px, calc(var(--d) * 0.052), 40px);
            font-weight: 600;
            letter-spacing: 2px;
            color: var(--gold-bright);
            line-height: 1;
          }
          .badge-custom span {
            font-size: 9px;
            letter-spacing: 3px;
            color: #8fb6d8;
            margin-top: 8px;
            font-weight: 500;
          }
          .badge-custom .rule {
            width: 56%;
            height: 1px;
            background: rgba(217,178,94,.7);
            margin: 8px 0;
          }

          @media (max-width: 900px) {
            .hero-content { width: 100%; padding: 0 24px; }
            .hero-stats { gap: 32px; }
            :root { --d: 92vw; }
            .globe-sphere { opacity: .6; }
          }

          @media (prefers-reduced-motion: reduce) {
            .globe-sphere, .sphere-grid, .rim-sweep, .photo-chip, .badge-custom { animation: none !important; }
            .photo-chip { opacity: .8; left: 30% !important; }
          }
        `}</style>

        {/* ============ Background Decorative SVG Layer ============ */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <defs>
              <radialGradient id="ambientBlue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2fb9ff" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#2fb9ff" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d9b25e" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#d9b25e" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="rimGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbe7a8"/>
                <stop offset="50%" stopColor="#d9b25e"/>
                <stop offset="100%" stopColor="#7a5f2c"/>
              </linearGradient>
              <filter id="glowSoft" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glowNode" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="blurBig" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
              <filter id="blurFloor" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
            </defs>

            {/* Stars */}
            <g fill="#cfe4ff">
              <circle cx="120" cy="90" r="1.3" opacity="0.6"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite"/></circle>
              <circle cx="300" cy="220" r="1" opacity="0.4"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="6s" repeatCount="indefinite"/></circle>
              <circle cx="640" cy="60" r="1.2" opacity="0.5"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="5s" repeatCount="indefinite"/></circle>
              <circle cx="220" cy="480" r="1" opacity="0.35"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="7s" repeatCount="indefinite"/></circle>
              <circle cx="470" cy="700" r="1.3" opacity="0.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="4.5s" repeatCount="indefinite"/></circle>
              <circle cx="60" cy="640" r="1" opacity="0.4"/>
              <circle cx="820" cy="150" r="1.1" opacity="0.45"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="6.5s" repeatCount="indefinite"/></circle>
              <circle cx="950" cy="850" r="1" opacity="0.3"/>
              <circle cx="180" cy="920" r="1.2" opacity="0.4"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="5.5s" repeatCount="indefinite"/></circle>
              <circle cx="1030" cy="380" r="1" opacity="0.3"/>
              <circle cx="1300" cy="150" r="1.1" opacity="0.4"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="5s" repeatCount="indefinite"/></circle>
              <circle cx="1550" cy="820" r="1" opacity="0.35"/>
            </g>

            {/* Floor Reflection */}
            <ellipse cx="1600" cy="1010" rx="480" ry="60" fill="url(#floorGlow)" filter="url(#blurFloor)"/>

            {/* Ambient Glow behind Globe */}
            <circle cx="1920" cy="540" r="560" fill="url(#ambientBlue)" filter="url(#blurBig)" opacity="0.55"/>

            {/* Orbital Rings */}
            <g fill="none" strokeLinecap="round">
              <g style={{ transformOrigin: '1920px 540px', animation: 'spinRim 90s linear infinite' }} opacity="0.55">
                <ellipse cx="1920" cy="540" rx="900" ry="330" stroke="url(#rimGold)" strokeWidth="1.1" strokeDasharray="2 14"/>
              </g>
              <g style={{ transformOrigin: '1920px 540px', animation: 'spinRim 130s linear infinite' }} opacity="0.4">
                <ellipse cx="1920" cy="540" rx="840" ry="640" stroke="#3fd0ff" strokeWidth="1" strokeDasharray="1 10"/>
              </g>
              <g style={{ transformOrigin: '1920px 540px', animation: 'spinRim 220s linear infinite' }} opacity="0.5">
                <ellipse cx="1920" cy="540" rx="1000" ry="500" stroke="url(#rimGold)" strokeWidth="0.8" strokeDasharray="0.5 8"/>
              </g>
              <g style={{ transformOrigin: '1920px 540px', animation: 'spinRim 300s linear infinite' }} opacity="0.3">
                <ellipse cx="1920" cy="540" rx="1080" ry="1080" stroke="#3fd0ff" strokeWidth="0.6" strokeDasharray="1 22"/>
              </g>
            </g>

            {/* Floating Light Points */}
            <g style={{ transformOrigin: '1920px 540px', animation: 'spinRim 90s linear infinite' }}>
              <circle cx="1020" cy="540" r="4" fill="#f3d98a" filter="url(#glowNode)"/>
            </g>
            <g style={{ transformOrigin: '1920px 540px', animation: 'spinRim 130s linear infinite' }}>
              <circle cx="1920" cy="-100" r="3" fill="#3fd0ff" filter="url(#glowNode)"/>
            </g>
            <g style={{ transformOrigin: '1920px 540px', animation: 'spinRim 220s linear infinite' }}>
              <circle cx="920" cy="540" r="3.4" fill="#f3d98a" filter="url(#glowNode)"/>
            </g>

            {/* Thin Gold Accent Arcs */}
            <path d="M 1000 200 A 760 760 0 0 1 1300 100" fill="none" stroke="url(#rimGold)" strokeWidth="1.4" opacity="0.5" strokeLinecap="round" filter="url(#glowSoft)"/>
            <path d="M 960 900 A 800 800 0 0 0 1260 990" fill="none" stroke="url(#rimGold)" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" filter="url(#glowSoft)"/>

            {/* Drifting Free Particles */}
            <g fill="#3fd0ff">
              <circle cx="1050" cy="260" r="2.5" opacity="0.8" filter="url(#glowNode)">
                <animate attributeName="cy" values="260;246;260" dur="8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="1150" cy="820" r="2" fill="#f3d98a" opacity="0.7" filter="url(#glowNode)">
                <animate attributeName="cy" values="820;806;820" dur="9s" repeatCount="indefinite"/>
              </circle>
              <circle cx="990" cy="680" r="1.8" opacity="0.6" filter="url(#glowNode)">
                <animate attributeName="cy" values="680;668;680" dur="7s" repeatCount="indefinite"/>
              </circle>
            </g>
          </svg>
        </div>

                {/* Left / Right Carousel Navigation Controls */}
        <button
          type="button"
          onClick={handlePrevSlide}
          className="absolute left-3 md:left-6 z-30 w-11 h-11 border border-white/10 hover:border-amber-500/60 bg-black/40 hover:bg-amber-500/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-amber-400 transition-all duration-300 shadow-xl group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-3 md:right-6 z-30 w-11 h-11 border border-white/10 hover:border-amber-500/60 bg-black/40 hover:bg-amber-500/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-amber-400 transition-all duration-300 shadow-xl group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* ============ Text Content Column with Sliding Framer Motion & New Font Styles ============ */}
        <div className="hero-content relative z-10 w-full md:w-[54%] px-6 md:px-[5vw] max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -22, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Title with Cormorant Garamond display font style */}
              <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] text-[#eef2fb] tracking-tight">
                {slides[currentSlide].title}
              </h1>

              {/* Lead Description with Inter font style */}
              <p className="font-sans font-normal text-gray-300 text-base md:text-lg leading-[1.75] max-w-xl">
                {slides[currentSlide].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-5 pt-3">
                <a 
                  href="#conferences" 
                  className="btn-primary-custom flex items-center gap-2.5"
                >
                  Explore Conferences <ChevronRight className="w-4 h-4 stroke-[3]" />
                </a>
                <a 
                  href="#journals" 
                  className="btn-secondary-custom flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 text-amber-400 fill-current" /> Watch Video Presentation
                </a>
              </div>

              {/* Stats Card Grid with animated counters & icons */}
              <div className="w-full rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-5 bg-[#070e1e]/85 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 backdrop-blur-xl mt-8 shadow-[0_0_30px_rgba(217,178,94,0.15)]">
                {slides[currentSlide].stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={i} 
                      className={`flex flex-col items-start ${
                        i < 3 ? "sm:border-r sm:border-amber-500/20 sm:pr-4" : ""
                      }`}
                    >
                      <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30 mb-2 flex items-center justify-center">
                        <Icon className={`w-4.5 h-4.5 ${stat.iconColor}`} />
                      </div>
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                        <AnimatedCounter value={stat.value} />
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1 leading-snug font-mono">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-3 pt-6">
            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  currentSlide === index
                    ? "w-9 h-2 bg-amber-400 shadow-[0_0_14px_#f59e0b]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ============ The Hemisphere Globe ============ */}
        <div className="globe-sphere">
          {/* Inner Circuitry / Neural Network SVG */}
          <svg className="sphere-inner-decor" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="gN" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Rotating Holographic Grid */}
            <g className="sphere-grid" stroke="#3fd0ff" strokeWidth="0.6" fill="none" opacity="0.2">
              <ellipse cx="500" cy="500" rx="440" ry="80"/>
              <ellipse cx="500" cy="500" rx="440" ry="180"/>
              <ellipse cx="500" cy="500" rx="440" ry="280"/>
              <ellipse cx="500" cy="500" rx="440" ry="380"/>
              <ellipse cx="500" cy="500" rx="80" ry="440"/>
              <ellipse cx="500" cy="500" rx="200" ry="440"/>
              <ellipse cx="500" cy="500" rx="320" ry="440"/>
            </g>

            {/* Circuit Traces */}
            <g fill="none" stroke="#5fc9ff" strokeWidth="1.3" opacity="0.45" strokeLinecap="round">
              <path d="M 160 260 h 60 v 40 h 50 v -80 h 70"/>
              <path d="M 200 620 h -60 v -50 h -70 v 90"/>
              <path d="M 320 180 v 60 h 90 v 40 h 60"/>
              <path d="M 260 740 v -50 h 100 v -30 h 80"/>
              <path d="M 120 440 h 90 v -30"/>
            </g>
            <g fill="#5fc9ff" opacity="0.6">
              <circle cx="220" cy="260" r="3"/><circle cx="270" cy="300" r="2.5"/>
              <circle cx="140" cy="570" r="3"/><circle cx="200" cy="620" r="2.5"/>
              <circle cx="410" cy="220" r="2.5"/><circle cx="470" cy="750" r="3"/>
            </g>

            {/* Neural Network */}
            <g stroke="#8fd8ff" strokeWidth="0.9" opacity="0.5">
              <line x1="260" y1="340" x2="400" y2="280"/>
              <line x1="260" y1="340" x2="370" y2="420"/>
              <line x1="400" y1="280" x2="540" y2="330"/>
              <line x1="370" y1="420" x2="540" y2="330"/>
              <line x1="370" y1="420" x2="420" y2="540"/>
              <line x1="540" y1="330" x2="660" y2="300"/>
              <line x1="540" y1="330" x2="620" y2="440"/>
              <line x1="420" y1="540" x2="620" y2="440"/>
              <line x1="420" y1="540" x2="300" y2="600"/>
              <line x1="620" y1="440" x2="720" y2="520"/>
              <line x1="260" y1="340" x2="180" y2="420"/>
              <line x1="300" y1="600" x2="180" y2="540"/>
              <line x1="180" y1="420" x2="180" y2="540"/>
            </g>
            <g fill="#bfe9ff">
              <circle cx="260" cy="340" r="4.5" filter="url(#gN)"/>
              <circle cx="400" cy="280" r="3.5" filter="url(#gN)"/>
              <circle cx="370" cy="420" r="5" filter="url(#gN)"/>
              <circle cx="540" cy="330" r="4" filter="url(#gN)"/>
              <circle cx="420" cy="540" r="4.5" filter="url(#gN)"/>
              <circle cx="620" cy="440" r="4" filter="url(#gN)"/>
              <circle cx="660" cy="300" r="3.5" filter="url(#gN)"/>
              <circle cx="720" cy="520" r="3.5" filter="url(#gN)"/>
              <circle cx="300" cy="600" r="3.5" filter="url(#gN)"/>
              <circle cx="180" cy="420" r="3" filter="url(#gN)"/>
              <circle cx="180" cy="540" r="3" filter="url(#gN)"/>
            </g>

            {/* Energy Pulses */}
            <circle r="3.4" fill="#fff6d8" filter="url(#gN)">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M260,340 L400,280 L540,330 L660,300"/>
            </circle>
            <circle r="3" fill="#d9f2ff" filter="url(#gN)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M180,420 L260,340 L370,420 L420,540 L620,440"/>
            </circle>
            <circle r="2.8" fill="#fbe7a8" filter="url(#gN)">
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M300,600 L420,540 L620,440 L720,520"/>
            </circle>
          </svg>

          {/* Photo Carousel Chips flowing towards center */}
          <div className="photo-chip" style={{ top: '24%', animationDuration: '7s', animationDelay: '0s', backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=60&auto=format&fit=crop')" }} />
          <div className="photo-chip" style={{ top: '38%', animationDuration: '8s', animationDelay: '1.3s', backgroundImage: "url('https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=200&q=60&auto=format&fit=crop')" }} />
          <div className="photo-chip" style={{ top: '52%', animationDuration: '6.5s', animationDelay: '2.6s', backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&q=60&auto=format&fit=crop')" }} />
          <div className="photo-chip" style={{ top: '66%', animationDuration: '7.5s', animationDelay: '4s', backgroundImage: "url('https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=200&q=60&auto=format&fit=crop')" }} />
          <div className="photo-chip" style={{ top: '32%', animationDuration: '9s', animationDelay: '5.3s', backgroundImage: "url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=200&q=60&auto=format&fit=crop')" }} />
          <div className="photo-chip" style={{ top: '58%', animationDuration: '8.2s', animationDelay: '6.6s', backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&q=60&auto=format&fit=crop')" }} />

          <div className="rim-sweep" />
          <div className="glass-sheen" />
        </div>

        {/* ============ Center Official D&V Global Summits Logo Emblem (Transparent Style with Black Shadow) ============ */}
        <div className="badge-custom flex items-center justify-center pointer-events-auto">
          <img 
            src="/images/dv_global_summits_logo_clean.png" 
            alt="D&amp;V Global Summits Pvt. Ltd." 
            className="w-full h-auto object-contain filter drop-shadow-[0_0_15px_rgba(0,0,0,0.98)] drop-shadow-[0_0_35px_rgba(0,0,0,0.9)] hover:scale-105 transition-all duration-500"
          />
        </div>
      </section>

      {/* Trusted By Section (Ticker Animation) */}
      <section className="py-8 bg-[#030712] border-b border-white/5 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 mb-4 text-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] font-mono text-gray-500">
            Trusted By Researchers From
          </span>
        </div>
        <div className="relative w-full flex overflow-x-hidden">
          {/* Fade overlays on sides for premium look */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-20 whitespace-nowrap text-xs md:text-sm font-semibold text-gray-500 font-mono tracking-widest py-3 pr-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {[
              "Sable Polytechnic",
              "Oakridge Medical College",
              "Zenith Research Labs",
              "Kestrel State University",
              "Harborview Science Institute",
              "Meridian Institute",
              "Sable Polytechnic",
              "Oakridge Medical College",
              "Zenith Research Labs",
              "Kestrel State University",
              "Harborview Science Institute",
              "Meridian Institute",
            ].map((partner, index) => (
              <span key={index} className="hover:text-white transition duration-300 cursor-default">
                {partner}
              </span>
            ))}
          </motion.div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-gold mb-3 block">
              Architected for Impact
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
              An Enterprise Foundation for Scientific Advancement
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Managing large-scale summits demands high coordination. D&V Global provides an intuitive layout that connects organizers, scientific chairs, blind reviewers, and speakers seamlessly. We manage the pipeline from call-for-abstracts to peer review scores, digital certificates and automated global payouts.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="p-1.5 bg-accent-cyan/15 rounded-lg border border-accent-cyan/20 mt-1">
                  <Shield className="w-4 h-4 text-accent-cyan" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Automated Digital QR Verifications</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Dynamic verification barcodes on participation certificates preventing academic duplication.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="p-1.5 bg-accent-gold/15 rounded-lg border border-accent-gold/20 mt-1">
                  <Award className="w-4 h-4 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Multi-Tier Sponsor Promotion</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Expose your partners with integrated logo sliders and dedicated session placement.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-center items-center text-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-gold/10 rounded-full blur-2xl" />
            <BookOpen className="w-16 h-16 text-accent-cyan mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">Publishing & Journal Ties</h3>
            <p className="text-sm text-gray-400 max-w-xs mb-8">
              Seamless indexing to top academic publications (IEEE, Nature, Springer) directly from acceptance flows.
            </p>
            <div className="w-full border-t border-white/10 pt-6 flex justify-around">
              <div>
                <span className="block font-bold text-white text-lg">99.8%</span>
                <span className="text-[10px] text-gray-500 uppercase font-mono">Submission Uptime</span>
              </div>
              <div className="border-r border-white/10" />
              <div>
                <span className="block font-bold text-white text-lg">24h</span>
                <span className="text-[10px] text-gray-500 uppercase font-mono">Response SLAs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-24 px-6 md:px-12 bg-[#050b1a] border-t border-white/5 relative overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-bold font-mono tracking-widest text-accent-cyan mb-2 block">
              THE PROCESS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              From Abstract To Publication
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              A clear six-step path, the same for every researcher, every conference.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop only) */}
            <div className="absolute top-10 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-accent-cyan via-accent-gold to-accent-blue/20 hidden md:block z-0" />

            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
              {[
                { number: "01", title: "Register", desc: "Create your researcher profile in minutes." },
                { number: "02", title: "Peer Review", desc: "Evaluated by field experts worldwide." },
                { number: "03", title: "Acceptance", desc: "Receive your decision and presentation slot." },
                { number: "04", title: "Conference", desc: "Present and connect on the summit floor." },
                { number: "05", title: "Publication", desc: "Published with our journal partners." },
                { number: "06", title: "Submit Abstract", desc: "Upload your research for committee review." },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  {/* Circle container */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center font-mono text-sm transition-all duration-300 mb-5 relative bg-[#071329] border-2 ${
                    i === 0 
                      ? "border-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                      : "border-white/5 group-hover:border-accent-gold group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                  }`}>
                    {i === 0 && (
                      <div className="absolute inset-[-4px] rounded-full border border-accent-cyan/30 animate-ping pointer-events-none" />
                    )}
                    <span className={i === 0 ? "text-accent-cyan font-bold" : "text-gray-400 group-hover:text-accent-gold font-bold transition-colors"}>
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-accent-gold transition-colors duration-200">{step.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed max-w-[160px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Active Conferences Slider */}
      <section id="conferences" className="py-24 px-6 md:px-12 bg-primary/5 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Conference Categories & Year Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 border-b border-white/5 pb-8">
            <div>
              <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-cyan mb-2 block">
                Live Summits & Categories
              </span>
              <h2 className="font-display font-bold text-3xl text-white">
                Upcoming D&amp;V Global Summits
              </h2>
            </div>
            
            {/* Year Switcher capsule pill */}
            <div className="inline-flex p-1 rounded-full bg-[#050b1a] border border-white/10 shadow-lg shrink-0">
              <button
                type="button"
                onClick={() => setSelectedYear(2026)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition duration-300 ${
                  selectedYear === 2026
                    ? "bg-gradient-to-r from-accent-gold to-yellow-600 text-black shadow-md shadow-accent-gold/15"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                2026 Summits
              </button>
              <button
                type="button"
                onClick={() => setSelectedYear(2027)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition duration-300 ${
                  selectedYear === 2027
                    ? "bg-gradient-to-r from-accent-gold to-yellow-600 text-black shadow-md shadow-accent-gold/15"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                2027 Summits
              </button>
            </div>

            <Link href="/auth/register" className="text-accent-cyan text-sm font-semibold flex items-center hover:underline shrink-0">
              Submit a paper proposal <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Conference Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-6 mb-4 no-scrollbar">
            {["All", "Advanced Tech", "Medical Sciences", "GreenTech", "Automation", "BioTech", "UrbanTech"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap border ${
                  selectedCategory === cat
                    ? "bg-accent-gold/20 border-accent-gold text-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                {cat === "All" ? "🌐 All Categories" : cat}
              </button>
            ))}
          </div>

          <div className="overflow-hidden min-h-[500px]">
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {conferences
                  .filter(conf => conf.year === selectedYear)
                  .filter(conf => selectedCategory === "All" || conf.tag === selectedCategory)
                  .map((conf) => (
                    <motion.div
                      key={conf.title}
                      initial={{ opacity: 0, scale: 0.96, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -15 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition duration-300 border border-white/5 flex flex-col h-full"
                    >
                      <div className="h-44 relative overflow-hidden flex items-center justify-center">
                        <img 
                          src={conf.image} 
                          alt={conf.title} 
                          className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent opacity-65" />
                        {/* Tag bottom-left */}
                        <span className="absolute bottom-3 left-3 bg-black/60 text-accent-gold text-[10px] px-2 py-0.5 rounded border border-accent-gold/20 z-10">
                          {conf.tag}
                        </span>
                        {/* Country flag image top-right corner */}
                        <div className="absolute top-3 right-3 z-10 rounded-md overflow-hidden shadow-xl border-2 border-white/30" title={conf.location}>
                          <img
                            src={`https://flagcdn.com/w80/${conf.countryCode}.png`}
                            srcSet={`https://flagcdn.com/w160/${conf.countryCode}.png 2x`}
                            alt={conf.location}
                            width={56}
                            height={38}
                            className="block w-14 h-auto object-cover"
                          />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-white mb-2 leading-snug">{conf.title}</h3>
                          <div className="flex flex-col gap-2 text-xs text-gray-400 mb-6">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-accent-gold" /> {conf.date}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent-gold" /> {conf.location}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-white/5 pt-4">
                          <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                            {conf.status}
                          </span>
                          <Link href={`/auth/login`} className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline">
                            Apply Now <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conference Categories Section */}
      <section className="py-24 px-6 md:px-12 bg-black/20 border-b border-white/5 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(6,182,212,0.04)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(212,175,55,0.03)" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-bold font-mono tracking-widest text-accent-cyan mb-2 block">
              RESEARCH FIELDS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Conference Categories
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Twenty research fields, one global network.
            </p>
          </div>

          {/* Grid Layout of Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {[
              { name: "Artificial Intelligence", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Machine Learning", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Cyber Security", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Cloud Computing", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Medical Sciences", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Dentistry", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Nursing", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Pharmacy", img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Mechanical Eng.", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Civil Eng.", img: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Electrical Eng.", img: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Biotechnology", img: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Agriculture", img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Business", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Physics & Chemistry", img: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Law & Justice", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Education", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Earth Sciences", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=150&h=150&q=80" },
              { name: "Space Science", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&h=150&q=80" }
            ].map((cat, i) => (
              <div 
                key={i} 
                className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-accent-cyan/35 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03] group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-accent-cyan/40 transition duration-300 shadow-md relative">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-[#050b1a]/20 group-hover:bg-transparent transition duration-300" />
                </div>
                <h3 className="font-bold text-white text-xs tracking-wide group-hover:text-accent-cyan transition duration-200">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Attend Our Summits */}
      <section className="py-24 px-6 md:px-12 bg-[#050b1a] border-y border-white/5 relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-cyan mb-2 block">
              Your Advantage
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Why Attend Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">Summits?</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Every D&V Global Summit is engineered to deliver measurable career, research and business breakthroughs.
            </p>
          </div>

          {/* Reason Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="group glass-panel rounded-2xl p-7 border border-white/5 hover:border-accent-cyan/30 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03]">
              <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-5 group-hover:bg-accent-cyan/20 transition duration-300">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2">Meet Leading Experts</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Network directly with Nobel laureates, IEEE fellows, and top-cited researchers shaping global science.
              </p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
            </div>

            {/* Card 2 */}
            <div className="group glass-panel rounded-2xl p-7 border border-white/5 hover:border-accent-gold/30 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03]">
              <div className="w-16 h-16 rounded-2xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mb-5 group-hover:bg-accent-gold/20 transition duration-300">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2">Stand Out from the Crowd</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Present your research on a global stage and gain peer-reviewed recognition that builds your academic brand.
              </p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
            </div>

            {/* Card 3 */}
            <div className="group glass-panel rounded-2xl p-7 border border-white/5 hover:border-accent-cyan/30 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03]">
              <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-5 group-hover:bg-accent-cyan/20 transition duration-300">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2">Lead Generation</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Connect with decision-makers, potential collaborators and enterprise clients attending from 120+ countries.
              </p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
            </div>

            {/* Card 4 */}
            <div className="group glass-panel rounded-2xl p-7 border border-white/5 hover:border-accent-gold/30 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03]">
              <div className="w-16 h-16 rounded-2xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mb-5 group-hover:bg-accent-gold/20 transition duration-300">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-white text-base mb-2">Get Noticed by Funders</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Pitch your innovations to active VCs, government grant officers and R&D sponsors in dedicated matchmaking sessions.
              </p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
            </div>

          </div>

          {/* Bottom CTA strip */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="text-xl">🌍</span>
              <span>Delegates from <span className="text-white font-semibold">120+ countries</span></span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/10" />
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="text-xl">📑</span>
              <span>Over <span className="text-white font-semibold">6,000+ papers</span> published</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/10" />
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="text-xl">🤝</span>
              <span>Average <span className="text-white font-semibold">38 collaborations</span> formed per event</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers Grid */}
      <section id="speakers" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-gold mb-2 block">
            Academic Leaders
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            Renowned Keynote Presenters
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mt-3">
            Interact with leading researchers and industry pioneers chairing tracks globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {speakers.map((sp, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl text-center flex flex-col justify-between items-center hover:scale-[1.02] transition duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-accent-gold/30 mb-4 relative flex items-center justify-center bg-black/40">
                {sp.image ? (
                  <img 
                    src={sp.image} 
                    alt={sp.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-accent-gold text-2xl font-bold font-mono">
                    {sp.name.split(" ").pop()?.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-white text-lg mb-1">{sp.name}</h3>
              <p className="text-xs text-accent-cyan font-mono mb-2">{sp.role}</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">{sp.title}</p>
              <div className="w-full border-t border-white/5 pt-4 flex justify-center gap-4 text-xs text-gray-400">
                <span>50+ Papers</span>
                <span>•</span>
                <span>H-Index: 42</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Indexing Panel */}
      <section id="journals" className="py-24 px-6 md:px-12 bg-primary/10 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-cyan mb-2 block">
                Publications
              </span>
              <h2 className="font-display font-bold text-3xl text-white mb-4">
                Partner Journals
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                DV Global partners with top scientific publications. All accepted papers are sent directly to review boards for automated fast-track indexation.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">Scopus Indexed</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">Web of Science</span>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {journals.map((j, i) => (
                <div key={i} className="glass-panel p-5 rounded-xl border border-white/5 hover:border-accent-cyan/35 transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-white text-base leading-snug">{j.name}</h3>
                    <span className="bg-accent-gold/10 text-accent-gold text-[10px] px-2 py-0.5 rounded border border-accent-gold/25 font-bold whitespace-nowrap">
                      {j.impact}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 font-mono">{j.scope}</p>
                  <span className="text-accent-cyan text-xs font-semibold flex items-center hover:underline cursor-pointer">
                    Submission Criteria <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Opportunities Section */}
      <section id="sponsorship" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#070e24] via-[#050b1a] to-[#081028] border-y border-amber-500/20 relative overflow-hidden">
        {/* Background glow graphics */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-32 right-10 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Corporate & Event Partnerships
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Sponsorship Opportunities <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                at Our Upcoming Event
              </span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-4">
              Partner with us as a sponsor and gain unique access to industry leaders, influencers, and decision-makers. Our sponsorship packages are crafted to maximize brand visibility, offering a platform to showcase your business to a targeted audience of professionals and experts.
            </p>
          </div>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sponsorshipTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl border ${tier.border} ${tier.bg} hover:scale-[1.02] shadow-xl hover:shadow-amber-500/10 group`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[10px] font-black tracking-widest px-3 py-0.5 rounded-full uppercase shadow-md border border-yellow-200">
                    MOST POPULAR TIER
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400/90 uppercase block mb-1">
                    {tier.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {tier.name}
                  </h3>

                  {/* Pricing */}
                  <div className="mb-6 p-3 bg-black/50 rounded-xl border border-amber-500/20">
                    <div className="text-2xl font-black text-amber-400 tracking-tight">
                      {tier.priceINR}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      or <span className="text-white font-semibold">{tier.priceUSD}</span> USD
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider font-mono">Includes:</div>
                    {tier.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300 leading-snug">
                        <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSponsorshipTier(tier.name);
                    setSponsorshipModalOpen(true);
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                    tier.popular 
                      ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-lg shadow-amber-500/20 hover:brightness-110"
                      : "bg-white/10 text-amber-300 hover:bg-amber-400 hover:text-black border border-amber-400/30"
                  }`}
                >
                  Reserve {tier.name.split(" ")[0]} Tier
                </button>
              </div>
            ))}
          </div>

          {/* Why Sponsor Banner */}
          <div className="glass-panel p-8 md:p-10 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#0d1631] via-[#050b1a] to-[#121c3b] shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-left">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-400" /> Strategic Value
                </span>
                <h3 className="text-2xl font-bold text-white">Why Sponsor?</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  Becoming a sponsor positions your brand at the center of industry innovation, enhancing brand awareness and fostering meaningful connections. Our sponsors benefit from high-impact exposure, exclusive networking, and alignment with an event that celebrates excellence and progress. Don’t miss this opportunity to be a part of an unforgettable event!
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setSponsorshipModalOpen(true)}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black text-xs font-extrabold rounded-xl hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.03] transition duration-300 uppercase tracking-wider whitespace-nowrap shadow-lg"
                >
                  Reserve Sponsorship Tier
                </button>
                <span className="text-[11px] text-gray-400 font-mono text-center md:text-right">
                  To reserve your tier, contact our team at <a href="mailto:sponsorships@dvglobalsummits.org" className="text-amber-400 underline">sponsorships@dvglobalsummits.org</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-gold mb-2 block">
            Academic Excellence
          </span>
          <h2 className="font-display font-bold text-3xl text-white">
            Honors & Scientific Awards
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mt-3">
            Nominations are reviewed by the Global Advisory Committee. Awardees receive fully-funded travel packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((aw, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl border-t border-accent-gold/30 hover:shadow-lg hover:shadow-accent-gold/5 transition duration-300">
              <Award className="w-8 h-8 text-accent-gold mb-4" />
              <h3 className="font-bold text-white text-lg mb-2">{aw.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{aw.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ & Contact Accordion */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-primary/5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-center text-white mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel rounded-xl overflow-hidden border border-white/5">
                <button
                  className="w-full p-5 text-left font-semibold text-white flex justify-between items-center hover:bg-white/5 transition"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <HelpCircle className="w-5 h-5 text-accent-gold" />
                </button>
                {faqOpen === i && (
                  <div className="p-5 border-t border-white/5 text-sm text-gray-400 leading-relaxed bg-white/[0.01]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-gradient-to-b from-transparent to-primary/20">
        <div className="max-w-3xl mx-auto text-center glass-panel p-8 md:p-12 rounded-2xl border border-accent-gold/25">
          <h3 className="font-display font-bold text-2xl text-white mb-3">Subscribe to DV Global Bulletins</h3>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
            Get instant announcements regarding abstract deadlines, indexing schedules, and speaker slots.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); setEmailInput(""); }}>
            <input
              type="email"
              placeholder="Enter your academic email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-accent-gold transition"
            />
            <button className="px-6 py-3 bg-accent-gold text-black font-semibold rounded-lg hover:bg-yellow-600 transition flex items-center justify-center gap-2">
              Subscribe <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-black text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="D&V Global Logo" 
              className="h-7 w-auto object-contain opacity-60 hover:opacity-100 transition filter drop-shadow-[0_0_4px_rgba(6,182,212,0.25)] hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            />
            <span className="font-bold text-white group-hover:text-accent-cyan transition duration-300">D&V Global Summit Pvt. Ltd.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/policies" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white transition">Terms of Service</Link>
            <a href="#" className="hover:text-white transition">Regulatory Disclosures</a>
            <a href="#" className="hover:text-white transition">Contact Support</a>
          </div>
          <p>© 2026 D&V Global Summit Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>

      {/* Sponsorship Reservation Modal */}
      <AnimatePresence>
        {sponsorshipModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#081028] border border-amber-500/40 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden my-8"
            >
              {/* Top Gold Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
              
              <button
                type="button"
                onClick={() => {
                  setSponsorshipModalOpen(false);
                  setSponsorSubmitted(false);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!sponsorSubmitted ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 tracking-wider uppercase mb-1">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Sponsorship Portal
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mb-2">
                    Reserve Sponsorship Package
                  </h2>
                  <p className="text-xs text-gray-300 mb-6 leading-relaxed">
                    Partner with us to gain unique access to industry leaders and decision-makers. Fill out the form below to reserve your tier.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSponsorSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    {/* Tier Selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 font-mono">
                        Select Sponsorship Tier:
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {sponsorshipTiers.map((tier) => (
                          <div
                            key={tier.id}
                            onClick={() => setSelectedSponsorshipTier(tier.name)}
                            className={`cursor-pointer p-3 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                              selectedSponsorshipTier === tier.name
                                ? "bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10"
                                : "bg-white/5 border-white/10 text-gray-400 hover:border-amber-400/40 hover:text-gray-200"
                            }`}
                          >
                            <div className="font-bold flex items-center justify-between">
                              <span>{tier.name}</span>
                              {selectedSponsorshipTier === tier.name && (
                                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                              )}
                            </div>
                            <div className="text-[11px] font-mono text-amber-400 mt-1 font-bold">
                              {tier.priceINR} <span className="text-gray-400 font-normal">({tier.priceUSD})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. SolarCorp Global"
                          value={sponsorFormData.company}
                          onChange={(e) => setSponsorFormData({ ...sponsorFormData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">Contact Person Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={sponsorFormData.name}
                          onChange={(e) => setSponsorFormData({ ...sponsorFormData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">Corporate Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@solarcorp.com"
                          value={sponsorFormData.email}
                          onChange={(e) => setSponsorFormData({ ...sponsorFormData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={sponsorFormData.phone}
                          onChange={(e) => setSponsorFormData({ ...sponsorFormData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Special Requirements / Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Mention booth space preferences, keynote speaker details, or team size..."
                        value={sponsorFormData.message}
                        onChange={(e) => setSponsorFormData({ ...sponsorFormData, message: e.target.value })}
                        className="w-full px-3.5 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-[11px] text-gray-400 font-mono">
                        Direct Desk: <a href="mailto:sponsorships@dvglobalsummits.org" className="text-amber-400 underline">sponsorships@dvglobalsummits.org</a>
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 transition"
                      >
                        Submit Reservation
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/50 flex items-center justify-center mx-auto text-2xl font-bold shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Sponsorship Request Received!</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you for partnering with D&V Global Summit. Our team has received your reservation for the <span className="text-amber-400 font-bold">{selectedSponsorshipTier}</span> package. A senior event coordinator will contact you at <span className="text-white font-mono">{sponsorFormData.email}</span> within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSponsorshipModalOpen(false);
                        setSponsorSubmitted(false);
                      }}
                      className="px-6 py-2.5 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition"
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

// Animated counter component for counting up numbers on slide transition
interface AnimatedCounterProps {
  value: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value }) => {
  const [count, setCount] = useState(0);
  
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 1200; // 1.2 seconds

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress * (2 - progress); // Ease out quad
      const currentCount = Math.floor(easeProgress * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// Simple custom component icon fallback
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

// Gold Globe Shield Logo representation
const GoldLogo = () => (
  <div className="flex items-center justify-center p-3 rounded-full bg-[#050b1a]/40 backdrop-blur-md border border-white/5 shadow-2xl relative group overflow-hidden">
    {/* Glowing background highlights inside the circle */}
    <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/20 to-accent-gold/20 opacity-50 blur-xl group-hover:opacity-85 transition duration-500" />
    
    <img 
      src="/images/logo.png" 
      alt="D&V Global Logo" 
      className="w-44 h-auto object-contain relative z-10 filter drop-shadow-[0_0_12px_rgba(6,182,212,0.45)] drop-shadow-[0_0_25px_rgba(212,175,55,0.25)] group-hover:scale-105 transition duration-500"
    />
  </div>
);

// Small header version logo representation
const HeaderLogo = () => (
  <Link href="/" className="flex items-center group relative">
    <div className="absolute -inset-2 bg-gradient-to-r from-accent-cyan to-accent-gold rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
    <img 
      src="/images/logo.png" 
      alt="D&V Global Logo" 
      className="h-16 w-auto object-contain relative z-10 transition duration-300 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.4)] group-hover:drop-shadow-[0_0_14px_rgba(6,182,212,0.7)] group-hover:scale-105"
    />
  </Link>
);

// High-fidelity circular canvas particles display overlay
interface ShieldVisualizerProps {
  activeSlide: number;
}

const ShieldVisualizer: React.FC<ShieldVisualizerProps> = ({ activeSlide }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = 500;
    let height = canvas.height = 500;
    let animationId: number;
    let frame = 0;

    // Slide 1 Particles (Orbits)
    const orbitParticles: { angle: number; speed: number; radius: number; color: string; size: number }[] = [];
    for (let i = 0; i < 30; i++) {
      orbitParticles.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.012,
        radius: 150 + Math.random() * 70,
        color: i % 2 === 0 ? "#D4AF37" : "#06B6D4",
        size: 1.2 + Math.random() * 1.8
      });
    }

    // Slide 2 Particles (Neural Net)
    const neuralNodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < 22; i++) {
      neuralNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1.2 + Math.random() * 1.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      if (activeSlide === 0) {
        // Orbit particles rotating
        orbitParticles.forEach(p => {
          p.angle += p.speed;
          const x = width / 2 + Math.cos(p.angle) * p.radius;
          const y = height / 2 + Math.sin(p.angle) * p.radius * 0.45;

          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2, 200, 90, Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2, 230, 105, -Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();

      } else if (activeSlide === 1) {
        // Neural network connections
        neuralNodes.forEach(node => {
          node.x += node.vx;
          node.y += node.vy;

          const dx = node.x - width / 2;
          const dy = node.y - height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 230) {
            node.vx *= -1;
            node.vy *= -1;
            node.x = width / 2 + (dx / dist) * 229;
            node.y = height / 2 + (dy / dist) * 229;
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(6, 182, 212, 0.7)";
          ctx.fill();
        });

        ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
        ctx.lineWidth = 0.6;
        for (let i = 0; i < neuralNodes.length; i++) {
          for (let j = i + 1; j < neuralNodes.length; j++) {
            const dx = neuralNodes[i].x - neuralNodes[j].x;
            const dy = neuralNodes[i].y - neuralNodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(neuralNodes[i].x, neuralNodes[i].y);
              ctx.lineTo(neuralNodes[j].x, neuralNodes[j].y);
              ctx.stroke();
            }
          }
        }
      } else if (activeSlide === 2) {
        // DNA Helix rotation
        const centerX = width / 2;
        const centerY = height / 2;
        const helixWidth = 130;
        const numNodes = 14;

        for (let i = 0; i < numNodes; i++) {
          const t = i / numNodes;
          const y = centerY - 160 + t * 320;
          const angle = t * Math.PI * 3.5 + frame * 0.022;

          const sinVal = Math.sin(angle);
          const cosVal = Math.cos(angle);

          const x1 = centerX + sinVal * helixWidth * 0.7;
          const x2 = centerX - sinVal * helixWidth * 0.7;

          const size1 = 2 + (cosVal + 1) * 2;
          const size2 = 2 + (-cosVal + 1) * 2;

          const opacity1 = (cosVal + 1.6) / 2.6;
          const opacity2 = (-cosVal + 1.6) / 2.6;

          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (cosVal + 1)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x1, y, size1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity1})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#06B6D4";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, y, size2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${opacity2})`;
          ctx.shadowColor = "#D4AF37";
          ctx.fill();

          ctx.shadowBlur = 0;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [activeSlide]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      width={360}
      height={360}
    />
  );
};
