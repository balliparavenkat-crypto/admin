"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, MapPin, DollarSign, Award, ArrowLeft, 
  ChevronRight, Mic, Layers, Clock, CheckCircle, Sparkles, UserCheck 
} from "lucide-react";
import api from "../../../lib/api";

export default function PublicSummitDetailPage() {
  const params = useParams();
  const summitId = params?.id || "1";

  const [summit, setSummit] = useState<any>({
    id: summitId,
    title: "D&V Global Summit 2026: Advances in Artificial Intelligence",
    acronym: "DVGS2026",
    description: "The premier global conference bringing together leading researchers, practitioners, and industry experts to discuss breakthroughs in Deep Learning, Large Language Models, and Generative AI systems.",
    startDate: "2026-10-15",
    endDate: "2026-10-18",
    venueName: "Grand Palace Convention Center",
    city: "San Francisco",
    country: "United States",
    status: "ACTIVE",
    registrationFeeAuthor: 499.00,
    registrationFeeListener: 299.00,
    registrationFeeStudent: 199.00,
    currency: "USD",
  });

  const [tracks, setTracks] = useState<any[]>([
    { id: 1, name: "Natural Language Processing & LLMs", description: "Topics related to GPTs, translation, transformers, and reasoning." },
    { id: 2, name: "Computer Vision & Robotics", description: "Topics related to object detection, generative video, and locomotion." },
    { id: 3, name: "AI Safety & Alignment", description: "Topics related to reinforcement learning from human feedback and cybersecurity." },
  ]);

  const [speakers, setSpeakers] = useState<any[]>([
    { name: "Dr. Christopher Manning", designation: "Professor of Computer Science", institution: "Stanford University", bio: "World-renowned leader in NLP, deep learning, and structural linguistics.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop", conferenceAcronym: "DVGS2026" },
    { name: "Dr. Fei-Fei Li", designation: "Co-Director of HAI", institution: "Stanford University", bio: "Pioneer in computer vision and creator of ImageNet.", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop", conferenceAcronym: "DVGS2026" },
  ]);

  useEffect(() => {
    let resolvedSummit = { ...summit };

    // 1. Try resolving from localStorage custom_summits
    try {
      const savedStr = localStorage.getItem("custom_summits");
      if (savedStr) {
        const customList: any[] = JSON.parse(savedStr);
        const match = customList.find((s) => String(s.id) === String(summitId) || s.acronym === summitId);
        if (match) {
          resolvedSummit = { ...resolvedSummit, ...match };
          setSummit(resolvedSummit);
          if (match.speakers && match.speakers.length > 0) {
            setSpeakers(match.speakers);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Load speakers specifically tagged for this summit acronym from custom_speakers
    try {
      const savedSpeakersStr = localStorage.getItem("custom_speakers");
      if (savedSpeakersStr) {
        const allSpeakers: any[] = JSON.parse(savedSpeakersStr);
        const summitAcronym = resolvedSummit.acronym || summitId;
        const matchingSpeakers = allSpeakers.filter(
          (sp) => sp.conferenceAcronym === summitAcronym || String(sp.conferenceAcronym) === String(summitId)
        );
        if (matchingSpeakers.length > 0) {
          setSpeakers(matchingSpeakers);
        }
      }
    } catch (e) {
      console.error(e);
    }

    // 3. Try resolving from Backend API
    const fetchApiData = async () => {
      try {
        const res = await api.get(`/conferences/public/all`);
        if (res.data && res.data.length > 0) {
          const match = res.data.find((s: any) => String(s.id) === String(summitId) || s.acronym === summitId);
          if (match) {
            setSummit((prev: any) => ({ ...prev, ...match }));
            if (match.tracks && match.tracks.length > 0) setTracks(match.tracks);
            if (match.speakers && match.speakers.length > 0) setSpeakers(match.speakers);
          }
        }
      } catch {
        // Fallback
      }
    };
    fetchApiData();
  }, [summitId]);

  const [timeLeft, setTimeLeft] = useState({
    days: 48,
    hours: 14,
    minutes: 31,
    seconds: 8
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = summit?.startDate ? new Date(summit.startDate).getTime() : new Date("2026-10-15").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [summit?.startDate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1117] font-sans selection:bg-[#1E40AF]/20">
      {/* ── Top Header Navigation Bar ─────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 py-3.5 px-6 md:px-12 flex justify-between items-center text-white">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="D&V Global Summits" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden xl:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
          <Link href="/" className="hover:text-amber-400 transition">HOME</Link>
          <Link href="/submit-abstract" className="hover:text-amber-400 transition">SUBMISSIONS</Link>
          <a href="#speakers" className="hover:text-amber-400 transition">ORGANIZING COMMITTEE</a>
          <a href="#speakers" className="hover:text-amber-400 transition">SPEAKERS</a>
          <Link href="/register" className="hover:text-amber-400 transition">REGISTRATION-INR</Link>
          <a href="#sponsorship" className="hover:text-amber-400 transition">SPONSORSHIP</a>
          <a href="#dates" className="hover:text-amber-400 transition">AWARDS</a>
          <Link href="/policies" className="hover:text-amber-400 transition">MORE INFO</Link>
          <Link href="/contact" className="hover:text-amber-400 transition">CONTACT</Link>
        </div>

        {/* Top Right Pink Registration Button */}
        <Link
          href="/register"
          className="px-7 py-3 bg-[#E63980] hover:bg-[#D0286F] text-white font-extrabold text-xs uppercase tracking-widest shadow-md transition duration-300 rounded-sm"
        >
          REGISTRATION
        </Link>
      </nav>

      {/* ── Full-Bleed Hero Banner ────────────────────────────────────────── */}
      <div className="relative text-white min-h-[560px] py-20 px-6 md:px-12 border-b border-[#1E40AF]/20 overflow-hidden bg-[#0D1117] flex flex-col justify-center items-center text-center">
        {/* Visible Full-Bleed Background Image */}
        <img
          src={summit.bannerUrl || (String(summit.id) === "2" ? "/images/clean_energy_summit.png" : String(summit.id) === "3" ? "/images/biomedicine_congress.png" : "/images/ai_quantum_summit.png")}
          alt={summit.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 filter brightness-[0.85] contrast-[1.05] transition-all duration-700"
        />

        {/* Translucent Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/75 via-[#050B1A]/60 to-[#0D1117]/95 pointer-events-none" />

        {/* Center Hero Content */}
        <div className="max-w-5xl mx-auto relative z-10 space-y-5 flex flex-col items-center">
          <span className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-amber-300 font-mono drop-shadow">
            D&V Global Meet on
          </span>

          <h2 className="text-xl md:text-3xl font-extrabold text-white tracking-tight max-w-3xl drop-shadow-md">
            {summit.title}
          </h2>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] font-mono py-1">
            {summit.acronym || "DVGS2026"}
          </h1>

          {/* Location & Date Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base font-semibold text-white drop-shadow-md pt-2">
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              {summit.venueName ? `${summit.venueName}, ` : ""}{summit.city}, {summit.country}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              {summit.startDate?.substring(0, 10)} - {summit.endDate?.substring(0, 10)}
            </span>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/submit-abstract"
              className="px-8 py-3.5 bg-[#E63980] hover:bg-[#D0286F] text-white font-extrabold text-xs uppercase tracking-widest rounded-md shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
            >
              SUBMIT ABSTRACT
            </Link>

            <Link
              href="/register"
              className="px-8 py-3.5 bg-[#E63980] hover:bg-[#D0286F] text-white font-extrabold text-xs uppercase tracking-widest rounded-md shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
            >
              REGISTER NOW
            </Link>

            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#E63980] hover:bg-[#D0286F] text-white font-extrabold text-xs uppercase tracking-widest rounded-md shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
            >
              SUGGEST COLLEAGUE
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Venue Badge & Real-Time Countdown Timer */}
        <div className="w-full max-w-6xl mx-auto pt-12 relative z-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 mt-10">
          <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-slate-200">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-md">
              ▶
            </div>
            <span className="drop-shadow">About {summit.venueName || summit.city}, {summit.country}</span>
          </div>

          {/* Real-time Countdown Timer Blocks */}
          <div className="flex items-center gap-3 md:gap-4 text-center font-mono">
            <div className="px-3.5 md:px-5 py-2.5 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/15 shadow-lg">
              <span className="text-xl md:text-2xl font-black text-white block">0-{timeLeft.days}</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">DAYS</span>
            </div>
            <div className="px-3.5 md:px-5 py-2.5 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/15 shadow-lg">
              <span className="text-xl md:text-2xl font-black text-white block">0-{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">HOURS</span>
            </div>
            <div className="px-3.5 md:px-5 py-2.5 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/15 shadow-lg">
              <span className="text-xl md:text-2xl font-black text-white block">0-{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">MINUTES</span>
            </div>
            <div className="px-3.5 md:px-5 py-2.5 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/15 shadow-lg">
              <span className="text-xl md:text-2xl font-black text-amber-400 block animate-pulse">0-{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">SECONDS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Conference Chair Section (Top Circular Avatar Overlap) ───────────── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="relative pt-12 max-w-lg mx-auto">
          {/* Overlapping Avatar Circle */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden z-20 bg-slate-200">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="Dr. Seshubabu Desu" className="w-full h-full object-cover" />
          </div>

          <div className="bg-white rounded-3xl p-8 pt-16 border border-slate-200 shadow-xl text-center space-y-3 relative z-10 border-t-4 border-t-[#0D1117]">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0D1117] block">Conference Chair</span>
            <h3 className="text-lg font-extrabold text-[#0D1117]">Dr. Seshubabu Desu</h3>
            <p className="text-xs text-slate-600 font-medium">Chief Technology Officer</p>
            <p className="text-xs text-slate-500 font-medium">4DS Memory Limited, USA</p>

            <div className="pt-4">
              <span className="px-6 py-2 bg-[#1E293B] text-white text-xs font-bold rounded-md shadow inline-block">
                Welcome Message
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Conference & Important Dates ────────────────────────────── */}
      <section id="dates" className="py-12 px-6 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: About Conference (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-3xl font-black uppercase text-[#0D1117] tracking-tight">ABOUT CONFERENCE</h2>
            <p className="text-sm font-bold text-[#E63980]">D&V Global Meet on {summit.title}</p>

            <div className="p-8 rounded-3xl bg-white border-2 border-[#E63980]/40 shadow-xl text-xs leading-relaxed text-slate-700 space-y-4">
              <p>
                <strong>The D&V Global Meet on {summit.title}</strong>, scheduled for <strong>{summit.startDate}</strong> in <strong>{summit.city}, {summit.country}</strong>, is a premier international gathering designed to spotlight breakthroughs in research and next-generation technologies.
              </p>
              <p>
                The event features cutting-edge discussions across key scientific tracks including artificial intelligence, nanomaterials, robotics, clean energy, and biomedical engineering. The program connects fundamental research with scalable real-world applications.
              </p>
              <p>
                Set in <strong>{summit.city}</strong>, attendees experience a unique fusion of academic rigor and vibrant networking opportunities.
              </p>
            </div>
          </div>

          {/* Right Column: Important Dates & Collaborations (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase text-[#0D1117] tracking-tight">IMPORTANT DATES</h2>
              <p className="text-sm font-bold text-[#E63980]">Conference Updates</p>

              <div className="bg-white rounded-2xl border border-slate-300 shadow-md divide-y divide-slate-200 text-xs">
                <div className="p-4">
                  <span className="font-extrabold text-[#0D1117] block">Conference Dates</span>
                  <span className="text-[#E63980] font-semibold">{summit.startDate} - {summit.endDate}</span>
                </div>
                <div className="p-4 bg-slate-50">
                  <span className="font-extrabold text-[#0D1117] block">Early Bird Registration</span>
                  <span className="text-[#E63980] font-semibold">December 30, 2025</span>
                </div>
                <div className="p-4 bg-slate-50">
                  <span className="font-extrabold text-[#0D1117] block">Abstract Submission Deadline</span>
                  <span className="text-[#E63980] font-semibold">February 28, 2026</span>
                </div>
                <div className="p-4">
                  <span className="font-extrabold text-[#0D1117] block">Conference Venue</span>
                  <span className="text-[#E63980] font-semibold">{summit.venueName || "Convention Center"}, {summit.city}, {summit.country}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0D1117]">COLLABORATIONS AND EVENT UPDATES</h3>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0D1117] block">BEST ORAL PRESENTATION AWARD</span>
                  <span className="text-[10px] text-slate-500 font-mono">Sponsored by Academic Journals & MDPI</span>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[10px] font-bold rounded">MDPI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Speakers Sections with Overlapping Avatar Cards ─────────────────── */}
      <section id="speakers" className="py-16 px-6 max-w-6xl mx-auto space-y-16">
        {/* Plenary Speakers */}
        <div className="space-y-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-[#0D1117] tracking-tight">PLENARY SPEAKERS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakers.map((sp, idx) => (
              <div key={idx} className="relative pt-10">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden z-20 bg-slate-200">
                  <img src={sp.imageUrl} alt={sp.name} className="w-full h-full object-cover" />
                </div>
                <div className="bg-white rounded-2xl p-6 pt-12 border border-slate-200 shadow-md text-center space-y-2 border-t-4 border-t-[#0D1117]">
                  <h3 className="font-extrabold text-sm text-[#0D1117]">{sp.name}</h3>
                  <p className="text-[11px] text-slate-600">{sp.designation}</p>
                  <p className="text-[11px] text-slate-500">{sp.institution}</p>
                  <div className="pt-3">
                    <button className="px-4 py-1.5 bg-[#1E293B] text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invited Speakers */}
        <div className="space-y-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-[#0D1117] tracking-tight">INVITED SPEAKERS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Prof. Luca Spiridigliozzi", institution: "Universitas Mercatorum, Italy", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop" },
              { name: "Dr. Sergey Prikhodko", institution: "UCLA, USA", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop" },
              { name: "Albin Kaeclin", institution: "Epeaswitzerland GMBH, Switzerland", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop" },
              { name: "Dr. Elena Rostova", institution: "ETH Zurich, Switzerland", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop" },
            ].map((sp, idx) => (
              <div key={idx} className="relative pt-10">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden z-20 bg-slate-200">
                  <img src={sp.img} alt={sp.name} className="w-full h-full object-cover" />
                </div>
                <div className="bg-white rounded-2xl p-6 pt-12 border border-slate-200 shadow-md text-center space-y-2 border-t-4 border-t-[#0D1117]">
                  <h3 className="font-extrabold text-sm text-[#0D1117]">{sp.name}</h3>
                  <p className="text-[11px] text-slate-600">{sp.institution}</p>
                  <div className="pt-3">
                    <button className="px-4 py-1.5 bg-[#1E293B] text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Young Research Fellows */}
        <div className="space-y-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-[#0D1117] tracking-tight">YOUNG RESEARCH FELLOWS</h2>
          <div className="max-w-xs mx-auto relative pt-10">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden z-20 bg-slate-200">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop" alt="Mr. Alfie Mcmeeking" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white rounded-2xl p-6 pt-12 border border-slate-200 shadow-md text-center space-y-2 border-t-4 border-t-[#0D1117]">
              <h3 className="font-extrabold text-sm text-[#0D1117]">Mr. Alfie Mcmeeking</h3>
              <p className="text-[11px] text-slate-600">Imperial College London</p>
              <p className="text-[11px] text-slate-500">United Kingdom</p>
              <div className="pt-3">
                <button className="px-4 py-1.5 bg-[#1E293B] text-white text-[10px] font-bold rounded uppercase tracking-wider">
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scientific Sessions Cards over Dark Background ──────────────────── */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-center text-white tracking-tight">SCIENTIFIC SESSIONS</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Card: Translucent Box */}
            <div className="p-8 rounded-3xl bg-blue-900/40 backdrop-blur-md border-2 border-white/30 space-y-6 flex flex-col justify-between shadow-2xl">
              <ul className="space-y-3 text-xs font-semibold text-slate-100">
                <li className="flex items-center gap-2">➔ Next-Generation Nanomaterials</li>
                <li className="flex items-center gap-2">➔ 2D Materials and Heterostructures</li>
                <li className="flex items-center gap-2">➔ Advanced Functional Materials</li>
                <li className="flex items-center gap-2">➔ High-Performance Composite Materials</li>
                <li className="flex items-center gap-2">➔ Smart Polymers and Responsive Materials</li>
                <li className="flex items-center gap-2">➔ Materials for Energy Storage & Conversion</li>
                <li className="flex items-center gap-2">➔ Photovoltaic and Perovskite Materials</li>
                <li className="flex items-center gap-2">➔ Materials for Hydrogen Economy</li>
                <li className="flex items-center gap-2">➔ Sustainable, Recyclable & Green Materials</li>
                <li className="flex items-center gap-2">➔ Carbon Capture, Utilization & Storage (CCUS)</li>
              </ul>
              <div className="pt-4">
                <Link href="/submit-abstract" className="px-8 py-3.5 bg-[#E63980] hover:bg-[#D0286F] text-white font-extrabold text-xs uppercase tracking-wider rounded-md inline-block shadow-lg">
                  SUBMIT ABSTRACT
                </Link>
              </div>
            </div>

            {/* Right Card: White Box */}
            <div className="p-8 rounded-3xl bg-white text-slate-900 space-y-6 flex flex-col justify-between shadow-2xl">
              <ul className="space-y-3 text-xs font-semibold text-slate-800">
                <li className="flex items-center gap-2">➔ Materials for Quantum, AI & Neuromorphic Devices</li>
                <li className="flex items-center gap-2">➔ Bioinspired & Biomimetic Materials</li>
                <li className="flex items-center gap-2">➔ Materials for Biomedical Applications</li>
                <li className="flex items-center gap-2">➔ Additive Manufacturing & 4D Printing</li>
                <li className="flex items-center gap-2">➔ Artificial Intelligence in Materials Discovery</li>
                <li className="flex items-center gap-2">➔ Extreme Materials for Harsh Environments</li>
                <li className="flex items-center gap-2">➔ Circular Materials Economy & Life-Cycle Engineering</li>
                <li className="flex items-center gap-2">➔ Technology Transfer, Scale-up & Commercialization</li>
                <li className="flex items-center gap-2">➔ Metamaterials & Plasmonic Structures</li>
              </ul>
              <div className="pt-4">
                <Link href="/submit-abstract" className="px-8 py-3.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-md inline-block shadow-lg">
                  SUBMIT ABSTRACT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
