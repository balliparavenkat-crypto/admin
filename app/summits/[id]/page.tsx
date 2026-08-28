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

      {/* Hero Banner */}
      <div className="relative text-white py-16 md:py-24 px-6 md:px-12 border-b border-[#1E40AF]/20 overflow-hidden bg-[#0D1117]">
        {/* Visible Background Banner Image */}
        <img
          src={summit.bannerUrl || (String(summit.id) === "2" ? "/images/clean_energy_summit.png" : String(summit.id) === "3" ? "/images/biomedicine_congress.png" : "/images/ai_quantum_summit.png")}
          alt={summit.title}
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-700"
        />

        {/* Subtle Bottom Gradient Overlay for High Image Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/25 to-[#0D1117]/40 pointer-events-none" />

        {/* Text Container with Frosted Glass Backdrop Panel */}
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-4xl p-8 md:p-10 rounded-3xl bg-[#0D1117]/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 bg-amber-500/20 text-amber-300 font-mono font-bold text-xs rounded-full border border-amber-500/30">
                {summit.acronym || "DVGS2026"}
              </span>
              <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs rounded-full border border-emerald-500/30 uppercase">
                {summit.status || "Registration Open"}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              {summit.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-slate-200 font-semibold">
              <span className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/10">
                <Calendar className="w-4 h-4 text-amber-400" />
                {summit.startDate?.substring(0, 10)} - {summit.endDate?.substring(0, 10)}
              </span>
              <span className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/10">
                <MapPin className="w-4 h-4 text-amber-400" />
                {summit.venueName ? `${summit.venueName}, ` : ""}{summit.city}, {summit.country}
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              {/* Project Theme SUBMIT ABSTRACT Button */}
              <Link
                href="/submit-abstract"
                className="px-8 py-3.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg border border-blue-400/20 hover:scale-[1.02] transition duration-300 cursor-pointer"
              >
                SUBMIT ABSTRACT
              </Link>

              {/* Golden Amber REGISTER NOW > Button */}
              <Link
                href="/register"
                className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:scale-[1.02] transition duration-300 flex items-center gap-2"
              >
                REGISTER NOW <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>
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
