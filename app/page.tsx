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
      description: "D&V Global AI & Quantum Summit brings together physicists, computer scientists, and tech pioneers to solve complex computational limits.",
      stats: [
        { value: "120+", label: "Countries", icon: Globe, iconColor: "text-accent-blue" },
        { value: "15K+", label: "Researchers", icon: Users, iconColor: "text-accent-blue" },
        { value: "500+", label: "Universities", icon: Building, iconColor: "text-accent-blue" },
        { value: "250+", label: "Conferences", icon: Calendar, iconColor: "text-accent-blue" },
      ]
    },
    {
      summitName: "Bio-Medicine Congress",
      eyebrow: "🧬 DECIPHERING GENOMICS & MOLECULAR PATHWAYS",
      image: "/images/biomedicine_congress.png",
      location: "Geneva, Switzerland",
      date: "Nov 08-11, 2026",
      title: (
        <>
          Decoding Genomes.<br />
          Advanced <span className="text-accent-blue font-extrabold">Care.</span><br />
          Healing <span className="text-yellow-300 font-extrabold">Humanity.</span>
        </>
      ),
      description: "Explore breakthroughs in gene splicing, double-blind clinical trials, molecular pathology, and fast-track Scopus indexations.",
      stats: [
        { value: "80+", label: "Countries", icon: Globe, iconColor: "text-accent-blue" },
        { value: "6K+", label: "MD Specialists", icon: Users, iconColor: "text-accent-blue" },
        { value: "220+", label: "Research Labs", icon: Building, iconColor: "text-accent-blue" },
        { value: "80+", label: "Tracks Registered", icon: Calendar, iconColor: "text-accent-blue" },
      ]
    },
    {
      summitName: "Clean Energy Summit",
      eyebrow: "🍃 CLEAN ENERGY & SUSTAINABLE CLIMATE SOLUTIONS",
      image: "/images/clean_energy_summit.png",
      location: "Tokyo, Japan",
      date: "Dec 03-05, 2026",
      title: (
        <>
          Accelerating Net-Zero.<br />
          Clean <span className="text-accent-blue font-extrabold">Energy.</span><br />
          Green <span className="text-emerald-400 font-extrabold">Innovation.</span>
        </>
      ),
      description: "Uniting environmental scientists, policy makers, and renewable tech developers to build scalable carbon-neutral infrastructures.",
      stats: [
        { value: "95+", label: "Countries", icon: Globe, iconColor: "text-accent-blue" },
        { value: "8K+", label: "Delegates", icon: Users, iconColor: "text-accent-blue" },
        { value: "310+", label: "CleanTech Labs", icon: Building, iconColor: "text-accent-blue" },
        { value: "60+", label: "Green Tracks", icon: Calendar, iconColor: "text-accent-blue" },
      ]
    },
    {
      summitName: "Robotics & IoT Summit",
      eyebrow: "🤖 ROBOTICS, AUTONOMOUS SYSTEMS & NEXT-GEN IOT",
      image: "/images/robotics_summit.png",
      location: "Munich, Germany",
      date: "Apr 18-20, 2027",
      title: (
        <>
          Empowering Automation.<br />
          Robotics <span className="text-accent-blue font-extrabold">Leads.</span><br />
          Smart <span className="text-cyan-400 font-extrabold">Cities.</span>
        </>
      ),
      description: "Gathering cybernetic engineers and IoT architects to demonstrate autonomous drone fleets and industrial automation.",
      stats: [
        { value: "75+", label: "Countries", icon: Globe, iconColor: "text-accent-blue" },
        { value: "5K+", label: "Robotics Chairs", icon: Users, iconColor: "text-accent-blue" },
        { value: "180+", label: "Tech Hubs", icon: Building, iconColor: "text-accent-blue" },
        { value: "50+", label: "Live Demos", icon: Calendar, iconColor: "text-accent-blue" },
      ]
    },
    {
      summitName: "Brain Genomics Congress",
      eyebrow: "🧠 NEURO-ONCOLOGY & BRAIN GENOMICS DISCOVERIES",
      image: "/images/brain_genomics.png",
      location: "Boston, USA",
      date: "May 22-25, 2027",
      title: (
        <>
          Mapping Neural Pathways.<br />
          Brain <span className="text-accent-blue font-extrabold">Genomics.</span><br />
          Precision <span className="text-purple-400 font-extrabold">Therapy.</span>
        </>
      ),
      description: "Bringing together neuroscientists and computational oncologists to revolutionize brain tumor targeting and neural mapping.",
      stats: [
        { value: "70+", label: "Countries", icon: Globe, iconColor: "text-accent-blue" },
        { value: "4.5K+", label: "Neuro Specialists", icon: Users, iconColor: "text-accent-blue" },
        { value: "160+", label: "Medical Labs", icon: Building, iconColor: "text-accent-blue" },
        { value: "40+", label: "Specialist Tracks", icon: Calendar, iconColor: "text-accent-blue" },
      ]
    },
    {
      summitName: "Smart Cities Forum",
      eyebrow: "🏙️ SUSTAINABLE INFRASTRUCTURE & SMART CITIES",
      image: "/images/smart_cities.png",
      location: "Singapore",
      date: "Sep 14-16, 2027",
      title: (
        <>
          Building Future Cities.<br />
          Resilient <span className="text-accent-blue font-extrabold">Urban Grids.</span><br />
          Green <span className="text-emerald-400 font-extrabold">Infrastructure.</span>
        </>
      ),
      description: "Designing next-generation sustainable urban environments, resilient power networks, and zero-emission transportation systems.",
      stats: [
        { value: "85+", label: "Countries", icon: Globe, iconColor: "text-accent-blue" },
        { value: "7K+", label: "Urban Planners", icon: Users, iconColor: "text-accent-blue" },
        { value: "240+", label: "Smart Hubs", icon: Building, iconColor: "text-accent-blue" },
        { value: "55+", label: "Future Tracks", icon: Calendar, iconColor: "text-accent-blue" },
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevImage(slides[currentSlide].image);
    }, 850);
    return () => clearTimeout(timer);
  }, [currentSlide]);


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
    { q: "Can I download an invoice for my payment?", a: "Yes, immediately after payment, formal PDF invoices and payment receipts will be sent directly to your registered email address." },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans bg-[#F8FAFC] text-[#0D1117]">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 w-full glass-panel border-b border-[#1E40AF]/15 py-4 px-6 md:px-12 flex justify-between items-center bg-[#F8FAFC]/90 backdrop-blur-md">
        <HeaderLogo />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wider text-gray-700 font-sans">
          <a href="#" className="text-[#1E40AF] border-b-2 border-[#1E40AF] pb-1 transition-all duration-300">HOME</a>
          <a href="#about" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">ABOUT US</a>
          <a href="#conferences" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">SUMMITS</a>
          <a href="#sponsorship" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">SPONSORSHIP</a>
          <a href="#journals" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">SCHEDULE</a>
          <Link href="/indian-registers" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">REGISTER</Link>
          <Link href="/policies" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">POLICIES</Link>
          <Link href="/cancellation-policy" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">CANCELLATION POLICY</Link>
          <Link href="/terms-of-use" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">TERMS OF USE</Link>
          <a href="#" className="hover:text-accent-blue border-b-2 border-transparent hover:border-accent-blue pb-1 transition-all duration-300">CONTACT</a>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => setSponsorshipModalOpen(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-black text-xs font-extrabold rounded-full hover:shadow-lg hover:shadow-accent-blue/25 hover:scale-[1.02] transition duration-300 uppercase tracking-wider shadow-md"
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
            <a href="#journals" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">SCHEDULE</a>
            <Link href="/indian-registers" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">REGISTER</Link>
            <Link href="/policies" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">POLICIES</Link>
            <Link href="/cancellation-policy" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#1E40AF]/10 text-gray-700/80 hover:text-accent-blue hover:border-accent-blue/40 font-semibold text-xs tracking-wider transition-colors">CANCELLATION POLICY</Link>
            <div className="flex flex-col gap-3 mt-4">
              <button 
                onClick={() => { setMobileMenuOpen(false); setSponsorshipModalOpen(true); }}
                className="w-full text-center py-2.5 bg-accent-blue text-black font-extrabold rounded-lg text-xs uppercase tracking-wider shadow-md"
              >
                Sponsorship
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== VIBRANT CIRCLE SLIDING HERO ===================== */}
      <section className="relative w-full overflow-hidden text-[#0D1117] min-h-[480px] flex items-center border-b border-[#1E40AF]/15">

        <style>{`
          /* Gradient background */
          .hero-bg {
            background: linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 30%, #FFE4C4 55%, #FFFFFF 80%, #F8FAFC 100%);
          }
          /* Spinning portal ring */
          .portal-spin {
            animation: portalSpin 20s linear infinite;
          }
          .portal-spin-reverse {
            animation: portalSpin 30s linear infinite reverse;
          }
          @keyframes portalSpin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          /* Floating blob pulse */
          .blob-pulse {
            animation: blobPulse 6s ease-in-out infinite alternate;
          }
          @keyframes blobPulse {
            from { transform: scale(1) translate(0, 0); opacity: 0.6; }
            to   { transform: scale(1.12) translate(8px, -12px); opacity: 0.9; }
          }
          /* Slide-in from left */
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-40px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          .hero-text-animate {
            animation: slideInLeft 0.5s ease-out both;
          }
        `}</style>

        {/* ── Full-Bleed Sliding Background Image Carousel ── */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0D1117]">
          {/* Static underlying layer showing previous image to prevent any background flash during transition */}
          <img
            src={prevImage}
            alt=""
            className="w-full h-full object-cover object-center absolute inset-0 opacity-90"
          />
          <AnimatePresence initial={false}>
            <motion.img
              key={currentSlide}
              src={slides[currentSlide].image}
              alt={slides[currentSlide].summitName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full object-cover object-center absolute inset-0 z-10"
            />
          </AnimatePresence>
          {/* Very light overall warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF0E6]/40 via-[#FAF0E6]/20 to-transparent z-15" />
        </div>

        {/* ── Subtle grid overlay ── */}
        <div className="absolute inset-0 z-10 opacity-[0.05]"
          style={{ backgroundImage: "linear-gradient(rgba(218,165,32,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(218,165,32,0.12) 1px,transparent 1px)", backgroundSize: "45px 45px" }} />

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* ── LEFT: TEXT BLOCK (Wrapped in a highly readable premium dark glass card) ── */}
          <div className="flex flex-col gap-6 w-full max-w-xl bg-[#0D1117]/85 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-20">

            {/* Logo + badge */}

            {/* Headline */}
            <div>
              <p className="text-white/60 text-lg sm:text-xl font-light mb-1 tracking-wide">Welcome to</p>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-white tracking-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="text-gray-300 text-base sm:text-lg leading-[1.75] max-w-lg"
              >
                {slides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href="#conferences"
                className="px-7 py-3 bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#1E3A8A] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_0_22px_rgba(30,64,175,0.45)] hover:shadow-[0_0_35px_rgba(30,64,175,0.7)] hover:scale-[1.03] transition duration-300 flex items-center gap-2"
              >
                About Us <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#conferences"
                className="px-7 py-3 bg-white/10 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-full backdrop-blur-md hover:bg-white/20 hover:border-white/40 transition duration-300 flex items-center gap-2"
              >
                Explore Summits
              </a>
            </div>

            {/* Stats row */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stats-${currentSlide}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="flex flex-wrap gap-6 pt-2"
              >
                {slides[currentSlide].stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/10 rounded-lg border border-white/10">
                        <Icon className="w-4 h-4 text-[#93C5FD]" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-base leading-none">{stat.value}</div>
                        <div className="text-gray-400 text-[10px] uppercase tracking-wider font-mono">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Dots & Controls */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="w-8 h-8 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="w-8 h-8 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dot indices */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentSlide(i)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === i
                        ? "w-6 h-2 bg-[#93C5FD]"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: EMPTY TO SHOW SLIDING BACKGROUND IMAGES ── */}
          <div className="hidden lg:block w-full h-[350px]" />

        </div>
      </section>

      {/* Trusted By Section (Ticker Animation) */}
      <section className="py-8 bg-[#FFFFFF] border-b border-[#1E40AF]/15 overflow-hidden relative">
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
              <span key={index} className="hover:text-[#0D1117] transition duration-300 cursor-default">
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
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0D1117] mb-6 leading-tight">
              An Enterprise Foundation for Scientific Advancement
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Managing large-scale summits demands high coordination. D&V Global provides an intuitive layout that connects organizers, scientific chairs, blind reviewers, and speakers seamlessly. We manage the pipeline from call-for-abstracts to peer review scores, digital certificates and automated global payouts.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="p-1.5 bg-accent-cyan/15 rounded-lg border border-accent-cyan/20 mt-1">
                  <Shield className="w-4 h-4 text-accent-cyan" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1117] text-sm">Automated Digital QR Verifications</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Dynamic verification barcodes on participation certificates preventing academic duplication.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="p-1.5 bg-accent-blue/15 rounded-lg border border-accent-gold/20 mt-1">
                  <Award className="w-4 h-4 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1117] text-sm">Multi-Tier Sponsor Promotion</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Expose your partners with integrated logo sliders and dedicated session placement.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="glass-panel p-8 rounded-2xl border border-[#1E40AF]/15 relative overflow-hidden flex flex-col justify-center items-center text-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/10 rounded-full blur-2xl" />
            <BookOpen className="w-16 h-16 text-accent-cyan mb-6" />
            <h3 className="text-xl font-bold text-[#0D1117] mb-2">Publishing & Journal Ties</h3>
            <p className="text-sm text-gray-600 max-w-xs mb-8">
              Seamless indexing to top academic publications (IEEE, Nature, Springer) directly from acceptance flows.
            </p>
            <div className="w-full border-t border-[#1E40AF]/15 pt-6 flex justify-around">
              <div>
                <span className="block font-bold text-[#0D1117] text-lg">99.8%</span>
                <span className="text-[10px] text-gray-500 uppercase font-mono">Submission Uptime</span>
              </div>
              <div className="border-r border-[#1E40AF]/15" />
              <div>
                <span className="block font-bold text-[#0D1117] text-lg">24h</span>
                <span className="text-[10px] text-gray-500 uppercase font-mono">Response SLAs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Conferences Slider */}
      <section id="conferences" className="py-24 px-6 md:px-12 bg-primary/5 border-y border-[#1E40AF]/10">
        <div className="max-w-6xl mx-auto">
          {/* Conference Categories & Year Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 border-b border-[#1E40AF]/10 pb-8">
            <div>
              <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-cyan mb-2 block">
                Live Summits & Categories
              </span>
              <h2 className="font-display font-bold text-3xl text-[#0D1117]">
                Upcoming D&amp;V Global Summits
              </h2>
            </div>
            
            {/* Year Switcher capsule pill */}
            <div className="inline-flex p-1 rounded-full bg-[#F8FAFC] border border-[#1E40AF]/15 shadow-lg shrink-0">
              <button
                type="button"
                onClick={() => setSelectedYear(2026)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition duration-300 ${
                  selectedYear === 2026
                    ? "bg-gradient-to-r from-accent-gold to-yellow-600 text-black shadow-md shadow-accent-blue/15"
                    : "text-gray-600 hover:text-[#0D1117]"
                }`}
              >
                2026 Summits
              </button>
              <button
                type="button"
                onClick={() => setSelectedYear(2027)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition duration-300 ${
                  selectedYear === 2027
                    ? "bg-gradient-to-r from-accent-gold to-yellow-600 text-black shadow-md shadow-accent-blue/15"
                    : "text-gray-600 hover:text-[#0D1117]"
                }`}
              >
                2027 Summits
              </button>
            </div>
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
                    ? "bg-accent-blue/20 border-accent-gold text-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    : "bg-white/[0.03] border-[#1E40AF]/15 text-gray-600 hover:text-[#0D1117] hover:border-[#1E40AF]/30"
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
                      className="glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition duration-300 border border-[#1E40AF]/10 flex flex-col h-full"
                    >
                      <div className="h-44 relative overflow-hidden flex items-center justify-center">
                        <img 
                          src={conf.image} 
                          alt={conf.title} 
                          className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent opacity-65" />
                        {/* Tag bottom-left */}
                        <span className="absolute bottom-3 left-3 bg-white/70 text-accent-gold text-[10px] px-2 py-0.5 rounded border border-accent-gold/20 z-10">
                          {conf.tag}
                        </span>
                        {/* Country flag image top-right corner */}
                        <div className="absolute top-3 right-3 z-10 rounded-md overflow-hidden shadow-xl border-2 border-[#1E40AF]/30" title={conf.location}>
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
                          <h3 className="font-bold text-lg text-[#0D1117] mb-2 leading-snug">{conf.title}</h3>
                          <div className="flex flex-col gap-2 text-xs text-gray-600 mb-6">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-accent-gold" /> {conf.date}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent-gold" /> {conf.location}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-[#1E40AF]/10 pt-4">
                          <span className="text-xs font-semibold text-[#93C5FD] bg-blue-500/10 border border-accent-blue/30 px-2.5 py-1 rounded-lg">
                            {conf.status}
                          </span>
                          <Link href={`/auth/login`} className="text-xs font-bold text-accent-blue hover:text-[#93C5FD] flex items-center gap-1 hover:underline">
                            Click Here <ChevronRight className="w-3.5 h-3.5" />
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
      <section className="py-24 px-6 md:px-12 bg-black/20 border-b border-[#1E40AF]/10 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(6,182,212,0.04)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(212,175,55,0.03)" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-bold font-mono tracking-widest text-accent-cyan mb-2 block">
              RESEARCH FIELDS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0D1117] mb-4">
              Conference Categories
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
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
                className="glass-panel p-5 rounded-2xl border border-[#1E40AF]/10 hover:border-accent-cyan/35 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03] group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-4 border border-[#1E40AF]/15 group-hover:border-accent-cyan/40 transition duration-300 shadow-md relative">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-[#FFFFFF]/30 group-hover:bg-transparent transition duration-300" />
                </div>
                <h3 className="font-bold text-[#0D1117] text-xs tracking-wide group-hover:text-accent-cyan transition duration-200">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Attend Our Summits */}
      <section className="py-24 px-6 md:px-12 bg-[#F8FAFC] border-y border-[#1E40AF]/10 relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-cyan mb-2 block">
              Your Advantage
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0D1117] mb-4">
              Why Attend Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-400">Summits?</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              Every D&V Global Summit is engineered to deliver measurable career, research and business breakthroughs.
            </p>
          </div>

          {/* Reason Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="group glass-panel rounded-2xl p-7 border border-[#1E40AF]/10 hover:border-accent-cyan/30 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03]">
              <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-5 group-hover:bg-accent-cyan/20 transition duration-300">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="font-bold text-[#0D1117] text-base mb-2">Meet Leading Experts</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Network directly with Nobel laureates, IEEE fellows, and top-cited researchers shaping global science.
              </p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
            </div>

            {/* Card 2 */}
            <div className="group glass-panel rounded-2xl p-7 border border-[#1E40AF]/10 hover:border-accent-gold/30 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03]">
              <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-gold/20 flex items-center justify-center mb-5 group-hover:bg-accent-blue/20 transition duration-300">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="font-bold text-[#0D1117] text-base mb-2">Stand Out from the Crowd</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Present your research on a global stage and gain peer-reviewed recognition that builds your academic brand.
              </p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
            </div>

            {/* Card 3 */}
            <div className="group glass-panel rounded-2xl p-7 border border-[#1E40AF]/10 hover:border-accent-cyan/30 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03]">
              <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-5 group-hover:bg-accent-cyan/20 transition duration-300">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-bold text-[#0D1117] text-base mb-2">Lead Generation</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Connect with decision-makers, potential collaborators and enterprise clients attending from 120+ countries.
              </p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
            </div>

            {/* Card 4 */}
            <div className="group glass-panel rounded-2xl p-7 border border-[#1E40AF]/10 hover:border-accent-gold/30 transition duration-300 flex flex-col items-center text-center hover:scale-[1.03]">
              <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-gold/20 flex items-center justify-center mb-5 group-hover:bg-accent-blue/20 transition duration-300">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-[#0D1117] text-base mb-2">Get Noticed by Funders</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Pitch your innovations to active VCs, government grant officers and R&D sponsors in dedicated matchmaking sessions.
              </p>
              <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
            </div>

          </div>

          {/* Bottom CTA strip */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-xl">🌍</span>
              <span>Delegates from <span className="text-[#0D1117] font-semibold">120+ countries</span></span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-[#FFFFFF]/50" />
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-xl">📑</span>
              <span>Over <span className="text-[#0D1117] font-semibold">6,000+ papers</span> published</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-[#FFFFFF]/50" />
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-xl">🤝</span>
              <span>Average <span className="text-[#0D1117] font-semibold">38 collaborations</span> formed per event</span>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Indexing Panel */}
      <section id="journals" className="py-24 px-6 md:px-12 bg-primary/10 border-y border-[#1E40AF]/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <span className="text-xs uppercase font-bold font-mono tracking-wider text-accent-cyan mb-2 block">
                Publications
              </span>
              <h2 className="font-display font-bold text-3xl text-[#0D1117] mb-4">
                Partner Journals
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                DV Global partners with top scientific publications. All accepted papers are sent directly to review boards for automated fast-track indexation.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#FFFFFF]/30 border border-[#1E40AF]/15 rounded-full text-xs text-gray-600">Scopus Indexed</span>
                <span className="px-3 py-1 bg-[#FFFFFF]/30 border border-[#1E40AF]/15 rounded-full text-xs text-gray-600">Web of Science</span>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {journals.map((j, i) => (
                <div key={i} className="glass-panel p-5 rounded-xl border border-[#1E40AF]/10 hover:border-accent-cyan/35 transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-[#0D1117] text-base leading-snug">{j.name}</h3>
                    <span className="bg-accent-blue/10 text-accent-gold text-[10px] px-2 py-0.5 rounded border border-accent-gold/25 font-bold whitespace-nowrap">
                      {j.impact}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4 font-mono">{j.scope}</p>
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
      <section id="sponsorship" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF]/60 to-[#F8FAFC] border-y border-[#1E40AF]/15 relative overflow-hidden">
        {/* Background glow graphics */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-32 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-mono font-bold tracking-widest text-[#1E40AF] uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Corporate & Event Partnerships
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[#0D1117] tracking-tight leading-tight">
              Sponsorship Opportunities <br />
              <span className="text-[#1E40AF] font-bold">
                at Our Upcoming Event
              </span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-4">
              Partner with us as a sponsor and gain unique access to industry leaders, influencers, and decision-makers. Our sponsorship packages are crafted to maximize brand visibility, offering a platform to showcase your business to a targeted audience of professionals and experts.
            </p>
          </div>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {sponsorshipTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl border ${tier.border} ${tier.bg} hover:scale-[1.02] shadow-xl hover:shadow-blue-500/5 group`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1E40AF] to-[#1D4ED8] text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md border border-blue-300">
                    MOST POPULAR TIER
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#1E40AF] uppercase block mb-1">
                    {tier.badge}
                  </span>
                  <h3 className="text-xl font-bold text-[#0D1117] mb-3 group-hover:text-[#1E40AF] transition-colors">
                    {tier.name}
                  </h3>

                  {/* Pricing */}
                  <div className="mb-6 p-3 bg-white/70 rounded-xl border border-[#1E40AF]/15">
                    <div className="text-2xl font-black text-[#1E40AF] tracking-tight">
                      {tier.priceINR}
                    </div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">
                      or <span className="text-[#0D1117] font-semibold">{tier.priceUSD}</span> USD
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[11px] font-bold text-[#1E40AF] uppercase tracking-wider font-mono">Includes:</div>
                    {tier.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
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
                      ? "bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#1E3A8A] text-white shadow-lg shadow-blue-500/20 hover:brightness-110"
                      : "bg-white text-[#1E40AF] border border-[#1E40AF]/20 hover:bg-[#1E40AF] hover:text-white"
                  }`}
                >
                  Reserve {tier.name.split(" ")[0]} Tier
                </button>
              </div>
            ))}
          </div>

          {/* Why Sponsor Banner */}
          <div className="glass-panel p-8 md:p-10 rounded-2xl border border-[#1E40AF]/15 bg-white/80 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-left">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1E40AF] flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#1E40AF]" /> Strategic Value
                </span>
                <h3 className="text-2xl font-bold text-[#0D1117]">Why Sponsor?</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Becoming a sponsor positions your brand at the center of industry innovation, enhancing brand awareness and fostering meaningful connections. Our sponsors benefit from high-impact exposure, exclusive networking, and alignment with an event that celebrates excellence and progress. Don’t miss this opportunity to be a part of an unforgettable event!
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setSponsorshipModalOpen(true)}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#1E3A8A] text-white text-xs font-extrabold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.03] transition duration-300 uppercase tracking-wider whitespace-nowrap shadow-lg"
                >
                  Reserve Sponsorship Tier
                </button>
                <span className="text-[11px] text-gray-500 font-mono text-center md:text-right">
                  To reserve your tier, contact our team at <a href="mailto:info@dvglobalsummits.org" className="text-[#1E40AF] underline">info@dvglobalsummits.org</a>
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
          <h2 className="font-display font-bold text-3xl text-[#0D1117]">
            Honors & Scientific Awards
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto mt-3">
            Nominations are reviewed by the Global Advisory Committee. Awardees receive fully-funded travel packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((aw, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl border-t border-accent-gold/30 hover:shadow-lg hover:shadow-accent-blue/5 transition duration-300">
              <Award className="w-8 h-8 text-accent-gold mb-4" />
              <h3 className="font-bold text-[#0D1117] text-lg mb-2">{aw.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{aw.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ & Contact Accordion */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-primary/5 border-t border-[#1E40AF]/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-center text-[#0D1117] mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel rounded-xl overflow-hidden border border-[#1E40AF]/10">
                <button
                  className="w-full p-5 text-left font-semibold text-[#0D1117] flex justify-between items-center hover:bg-[#FFFFFF]/30 transition"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <HelpCircle className="w-5 h-5 text-accent-gold" />
                </button>
                {faqOpen === i && (
                  <div className="p-5 border-t border-[#1E40AF]/10 text-sm text-gray-600 leading-relaxed bg-white/[0.01]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 md:px-12 border-t border-[#1E40AF]/10 bg-gradient-to-b from-transparent to-primary/20">
        <div className="max-w-3xl mx-auto text-center glass-panel p-8 md:p-12 rounded-2xl border border-accent-gold/25">
          <h3 className="font-display font-bold text-2xl text-[#0D1117] mb-3">Subscribe to DV Global Bulletins</h3>
          <p className="text-gray-600 text-sm max-w-sm mx-auto mb-8">
            Get instant announcements regarding abstract deadlines, indexing schedules, and speaker slots.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); setEmailInput(""); }}>
            <input
              type="email"
              placeholder="Enter your academic email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#374151]/15 border border-[#1E40AF]/15 rounded-lg text-sm text-[#0D1117] focus:outline-none focus:border-accent-gold transition"
            />
            <button className="px-6 py-3 bg-accent-blue text-black font-semibold rounded-lg hover:bg-yellow-600 transition flex items-center justify-center gap-2">
              Subscribe <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-[#0D1117] text-xs text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="D&V Global Logo" 
              className="h-7 w-auto object-contain opacity-80 hover:opacity-100 transition filter drop-shadow-[0_0_4px_rgba(255,255,255,0.15)]"
            />
            <span className="font-bold text-gray-100 group-hover:text-white transition duration-300">D&V Global Summit Pvt. Ltd.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/policies" className="hover:text-white hover:underline transition">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white hover:underline transition">Terms of Service</Link>
            <a href="#" className="hover:text-white hover:underline transition">Regulatory Disclosures</a>
            <a href="#" className="hover:text-white hover:underline transition">Contact Support</a>
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
              className="relative w-full max-w-2xl bg-[#F8FAFC] border border-accent-blue/40 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden my-8"
            >
              {/* Top Gold Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
              
              <button
                type="button"
                onClick={() => {
                  setSponsorshipModalOpen(false);
                  setSponsorSubmitted(false);
                }}
                className="absolute top-4 right-4 text-gray-600 hover:text-[#0D1117] p-2 rounded-full hover:bg-[#FFFFFF]/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!sponsorSubmitted ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-blue tracking-wider uppercase mb-1">
                    <Sparkles className="w-4 h-4 text-accent-blue" /> Sponsorship Portal
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#0D1117] mb-2">
                    Reserve Sponsorship Package
                  </h2>
                  <p className="text-xs text-gray-700/80 mb-6 leading-relaxed">
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
                      <label className="block text-xs font-bold text-gray-700/80 uppercase tracking-wider mb-2 font-mono">
                        Select Sponsorship Tier:
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {sponsorshipTiers.map((tier) => (
                          <div
                            key={tier.id}
                            onClick={() => setSelectedSponsorshipTier(tier.name)}
                            className={`cursor-pointer p-3 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                              selectedSponsorshipTier === tier.name
                                ? "bg-amber-500/20 border-accent-blue text-[#0D1117] shadow-md shadow-amber-500/10"
                                : "bg-[#FFFFFF]/30 border-[#1E40AF]/15 text-gray-600 hover:border-accent-blue/40 hover:text-[#333333]"
                            }`}
                          >
                            <div className="font-bold flex items-center justify-between">
                              <span>{tier.name}</span>
                              {selectedSponsorshipTier === tier.name && (
                                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                              )}
                            </div>
                            <div className="text-[11px] font-mono text-accent-blue mt-1 font-bold">
                              {tier.priceINR} <span className="text-gray-600 font-normal">({tier.priceUSD})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700/80 mb-1">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. SolarCorp Global"
                          value={sponsorFormData.company}
                          onChange={(e) => setSponsorFormData({ ...sponsorFormData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white/60 border border-[#1E40AF]/15 rounded-xl text-xs text-[#0D1117] placeholder-gray-500 focus:outline-none focus:border-accent-blue transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700/80 mb-1">Contact Person Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={sponsorFormData.name}
                          onChange={(e) => setSponsorFormData({ ...sponsorFormData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white/60 border border-[#1E40AF]/15 rounded-xl text-xs text-[#0D1117] placeholder-gray-500 focus:outline-none focus:border-accent-blue transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700/80 mb-1">Corporate Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@solarcorp.com"
                          value={sponsorFormData.email}
                          onChange={(e) => setSponsorFormData({ ...sponsorFormData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white/60 border border-[#1E40AF]/15 rounded-xl text-xs text-[#0D1117] placeholder-gray-500 focus:outline-none focus:border-accent-blue transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700/80 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={sponsorFormData.phone}
                          onChange={(e) => setSponsorFormData({ ...sponsorFormData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white/60 border border-[#1E40AF]/15 rounded-xl text-xs text-[#0D1117] placeholder-gray-500 focus:outline-none focus:border-accent-blue transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700/80 mb-1">Special Requirements / Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Mention booth space preferences, keynote speaker details, or team size..."
                        value={sponsorFormData.message}
                        onChange={(e) => setSponsorFormData({ ...sponsorFormData, message: e.target.value })}
                        className="w-full px-3.5 py-2 bg-white/60 border border-[#1E40AF]/15 rounded-xl text-xs text-[#0D1117] placeholder-gray-500 focus:outline-none focus:border-accent-blue transition resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-[11px] text-gray-600 font-mono">
                        Direct Desk: <a href="mailto:info@dvglobalsummits.org" className="text-accent-blue underline">info@dvglobalsummits.org</a>
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
                  <div className="w-16 h-16 rounded-full bg-amber-400/20 text-accent-blue border border-accent-blue/40 flex items-center justify-center mx-auto text-2xl font-bold shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#0D1117]">Sponsorship Request Received!</h3>
                  <p className="text-xs text-gray-700/80 max-w-md mx-auto leading-relaxed">
                    Thank you for partnering with D&V Global Summit. Our team has received your reservation for the <span className="text-accent-blue font-bold">{selectedSponsorshipTier}</span> package. A senior event coordinator will contact you at <span className="text-[#0D1117] font-mono">{sponsorFormData.email}</span> within 24 hours.
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
  <img 
    src="/images/logo.png" 
    alt="D&V Global Logo" 
    className="w-56 h-auto object-contain relative z-10 filter drop-shadow-[0_4px_15px_rgba(0,0,0,0.15)] group-hover:scale-105 transition duration-500"
  />
);

// Small header version logo representation
const HeaderLogo = () => (
  <Link href="/" className="flex items-center group relative">
    <img 
      src="/images/logo.png" 
      alt="D&V Global Logo" 
      className="h-20 md:h-24 w-auto object-contain transition duration-300"
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
