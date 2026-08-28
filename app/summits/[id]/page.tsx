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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1117] font-sans selection:bg-[#1E40AF]/20">
      {/* Header Bar */}
      <nav className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-[#1E40AF]/15 py-4 px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xs font-bold text-[#1E40AF] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to D&V Global Summits
        </Link>
        <Link
          href="/register"
          className="px-6 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md hover:scale-[1.02] transition duration-300"
        >
          Register For Summit
        </Link>
      </nav>

      {/* Full-Bleed Hero Banner */}
      <div className="relative text-white min-h-[560px] py-20 px-6 md:px-12 border-b border-[#1E40AF]/20 overflow-hidden bg-[#0D1117] flex flex-col justify-center items-center text-center">
        {/* Visible Full-Bleed Background Image */}
        <img
          src={summit.bannerUrl || (String(summit.id) === "2" ? "/images/clean_energy_summit.png" : String(summit.id) === "3" ? "/images/biomedicine_congress.png" : "/images/ai_quantum_summit.png")}
          alt={summit.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 filter brightness-[0.85] contrast-[1.05] transition-all duration-700"
        />

        {/* Translucent Dark Gradient Overlay for Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117]/75 via-[#050B1A]/60 to-[#0D1117]/95 pointer-events-none" />

        {/* Center Hero Content (Overlaying Background Directly) */}
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

        {/* Bottom Bar: Venue Badge & Countdown Timer */}
        <div className="w-full max-w-6xl mx-auto pt-12 relative z-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 mt-10">
          <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-slate-200">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-md">
              ▶
            </div>
            <span className="drop-shadow">About {summit.venueName || summit.city}, {summit.country}</span>
          </div>

          {/* Countdown Timer Blocks */}
          <div className="flex items-center gap-4 text-center font-mono">
            <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/15">
              <span className="text-xl md:text-2xl font-black text-white block">0-110</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">DAYS</span>
            </div>
            <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/15">
              <span className="text-xl md:text-2xl font-black text-white block">0-14</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">HOURS</span>
            </div>
            <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/15">
              <span className="text-xl md:text-2xl font-black text-white block">0-31</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">MINUTES</span>
            </div>
            <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/15">
              <span className="text-xl md:text-2xl font-black text-white block">0-8</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">SECONDS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto py-16 px-6 md:px-12 space-y-16">
        {/* Description Section */}
        <section className="space-y-4 bg-white p-8 rounded-3xl border border-[#1E40AF]/10 shadow-sm">
          <h2 className="text-xl font-bold text-[#0D1117] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1E40AF]" /> About the Summit
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {summit.description}
          </p>
        </section>

        {/* Pricing & Fees Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#0D1117] flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" /> Registration Categories & Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/10 space-y-3 shadow-sm hover:border-[#1E40AF]/30 transition">
              <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase block">Author Registration</span>
              <span className="text-3xl font-black text-[#0D1117] block">${summit.registrationFeeAuthor || 499} <span className="text-xs font-normal text-gray-500">USD</span></span>
              <p className="text-xs text-gray-500">Includes paper presentation slot, conference proceedings indexation, and all summit passes.</p>
              <Link href="/register" className="block text-center py-2.5 rounded-xl bg-[#1E40AF] text-white text-xs font-bold uppercase tracking-wider mt-4">
                Register as Author
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/10 space-y-3 shadow-sm hover:border-[#1E40AF]/30 transition">
              <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase block">Delegate / Listener</span>
              <span className="text-3xl font-black text-[#0D1117] block">${summit.registrationFeeListener || 299} <span className="text-xs font-normal text-gray-500">USD</span></span>
              <p className="text-xs text-gray-500">Full access to keynote sessions, panel discussions, networking lunch, and attendance certificate.</p>
              <Link href="/register" className="block text-center py-2.5 rounded-xl bg-[#1E40AF] text-white text-xs font-bold uppercase tracking-wider mt-4">
                Register as Listener
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#1E40AF]/10 space-y-3 shadow-sm hover:border-[#1E40AF]/30 transition">
              <span className="text-xs font-mono font-bold text-[#1E40AF] uppercase block">Student Registration</span>
              <span className="text-3xl font-black text-[#0D1117] block">${summit.registrationFeeStudent || 199} <span className="text-xs font-normal text-gray-500">USD</span></span>
              <p className="text-xs text-gray-500">Discounted pass for verified undergraduate and graduate research students.</p>
              <Link href="/register" className="block text-center py-2.5 rounded-xl bg-[#1E40AF] text-white text-xs font-bold uppercase tracking-wider mt-4">
                Register as Student
              </Link>
            </div>
          </div>
        </section>

        {/* Keynote Speakers Section specifically for THIS summit */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#0D1117] flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#1E40AF]" /> Keynote Speakers ({summit.acronym || "DVGS2026"})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {speakers.map((sp, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/10 flex gap-4 shadow-sm">
                <img src={sp.imageUrl} alt={sp.name} className="w-16 h-16 rounded-2xl object-cover border border-gray-200" />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#0D1117] text-base">{sp.name}</h3>
                    <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {sp.conferenceAcronym || summit.acronym}
                    </span>
                  </div>
                  <span className="text-xs text-[#1E40AF] font-bold block">{sp.designation}</span>
                  <span className="text-xs text-gray-500 block">{sp.institution}</span>
                  <p className="text-xs text-gray-600 pt-2 border-t border-gray-100">{sp.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="p-10 rounded-3xl bg-gradient-to-r from-[#0D1117] via-[#050b1a] to-[#0D1117] text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Ready to Attend {summit.title}?</h2>
          <p className="text-xs text-gray-300 max-w-lg mx-auto leading-relaxed">
            Reserve your seat, submit your research paper, or network with global industry pioneers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/submit-abstract"
              className="px-8 py-3.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg border border-blue-400/20 hover:scale-[1.02] transition duration-300 cursor-pointer"
            >
              SUBMIT ABSTRACT
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg hover:scale-[1.02] transition duration-300"
            >
              REGISTER NOW <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
