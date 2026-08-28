"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { ArrowLeft, Save, Sparkles, Calendar, DollarSign, FileText, Image as ImageIcon, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../../../lib/api";
import { getCountryCode } from "@/lib/country";

export default function EditSummitPage() {
  const router = useRouter();
  const params = useParams();
  const summitId = params?.id;

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Wizard Form State
  const [formData, setFormData] = useState({
    title: "D&V Global Summit 2026: Advances in Artificial Intelligence",
    acronym: "DVGS2026",
    bannerUrl: "/images/ai_quantum_summit.png",
    shortDescription: "Annual premier conference on artificial intelligence, machine learning, and quantum computing.",
    description: "Bringing together world-renowned researchers, industry pioneers, and academicians to present cutting-edge research.",
    websiteUrl: "https://dvglobalsummits.com",
    startDate: "2026-10-15",
    endDate: "2026-10-18",
    startTime: "09:00",
    endTime: "18:00",
    timezone: "UTC",
    venueName: "Grand Palace Convention Center",
    venueAddress: "100 Innovation Way",
    city: "San Francisco",
    state: "CA",
    country: "United States",
    eventType: "Offline",
    registrationOpenDate: "2026-05-01",
    registrationCloseDate: "2026-10-01",
    earlyBirdDeadline: "2026-08-15",
    registrationFeeAuthor: "499.00",
    registrationFeeListener: "299.00",
    registrationFeeStudent: "199.00",
    currency: "USD",
    taxRate: "18",
    submissionOpen: "2026-05-01",
    submissionDeadline: "2026-08-30",
    reviewDeadline: "2026-09-15",
    status: "ACTIVE",
    // Extended Editable Fields for Summit Landing Page
    chairName: "Dr. Seshubabu Desu",
    chairTitle: "Chief Technology Officer",
    chairInstitution: "4DS Memory Limited, USA",
    earlyBirdDate: "December 30, 2025",
    abstractDeadline: "February 28, 2026",
    scientificTrackLeft: "Next-Generation Nanomaterials\n2D Materials and Heterostructures\nAdvanced Functional Materials\nHigh-Performance Composite Materials\nSmart Polymers and Responsive Materials\nMaterials for Energy Storage & Conversion",
    scientificTrackRight: "Materials for Quantum, AI & Neuromorphic Devices\nBioinspired & Biomimetic Materials\nMaterials for Biomedical Applications\nAdditive Manufacturing & 4D Printing\nArtificial Intelligence in Materials Discovery",
  });

  const [speakersList, setSpeakersList] = useState<any[]>([
    { name: "Dr. Christopher Manning", designation: "Professor of Computer Science", institution: "Stanford University", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop", type: "Plenary" },
    { name: "Dr. Fei-Fei Li", designation: "Co-Director of HAI", institution: "Stanford University", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop", type: "Plenary" },
    { name: "Prof. Luca Spiridigliozzi", designation: "Professor", institution: "Universitas Mercatorum, Italy", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop", type: "Invited" },
    { name: "Dr. Sergey Prikhodko", designation: "Research Scholar", institution: "UCLA, USA", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop", type: "Invited" },
  ]);

  const [newSpeaker, setNewSpeaker] = useState({
    name: "",
    designation: "",
    institution: "",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
    type: "Plenary",
  });

  useEffect(() => {
    if (!summitId) return;

    // Load custom summit data if available
    try {
      const savedStr = localStorage.getItem("custom_summits");
      if (savedStr) {
        const customSummits = JSON.parse(savedStr);
        const match = customSummits.find((s: any) => String(s.id) === String(summitId));
        if (match) {
          setFormData((prev) => ({
            ...prev,
            title: match.title || prev.title,
            acronym: match.acronym || prev.acronym,
            bannerUrl: match.bannerUrl || prev.bannerUrl,
            shortDescription: match.shortDescription || prev.shortDescription,
            description: match.description || prev.description,
            startDate: match.startDate || prev.startDate,
            endDate: match.endDate || prev.endDate,
            venueName: match.venueName || prev.venueName,
            city: match.city || prev.city,
            country: match.country || prev.country,
            registrationFeeAuthor: String(match.registrationFeeAuthor || prev.registrationFeeAuthor),
            registrationFeeListener: String(match.registrationFeeListener || prev.registrationFeeListener),
            registrationFeeStudent: String(match.registrationFeeStudent || prev.registrationFeeStudent),
            status: match.status || prev.status,
            chairName: match.chairName || prev.chairName,
            chairTitle: match.chairTitle || prev.chairTitle,
            chairInstitution: match.chairInstitution || prev.chairInstitution,
            earlyBirdDate: match.earlyBirdDate || prev.earlyBirdDate,
            abstractDeadline: match.abstractDeadline || prev.abstractDeadline,
            scientificTrackLeft: match.scientificTrackLeft || prev.scientificTrackLeft,
            scientificTrackRight: match.scientificTrackRight || prev.scientificTrackRight,
          }));
          if (match.speakers && match.speakers.length > 0) {
            setSpeakersList(match.speakers);
          }
        }
      }
    } catch {
      // Fallback
    }

    // Try fetching from backend API
    api.get(`/conferences/${summitId}`).then((res) => {
      if (res.data) {
        setFormData((prev) => ({
          ...prev,
          title: res.data.title || prev.title,
          acronym: res.data.acronym || prev.acronym,
          bannerUrl: res.data.bannerUrl || prev.bannerUrl,
          shortDescription: res.data.shortDescription || prev.shortDescription,
          description: res.data.description || prev.description,
          startDate: res.data.startDate || prev.startDate,
          endDate: res.data.endDate || prev.endDate,
          status: res.data.status || prev.status,
        }));
      }
    }).catch(() => {
      // Fallback
    });
  }, [summitId]);

  const handleBannerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, bannerUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const calculatedCountryCode = getCountryCode(formData.country, formData.city);

    const updatedObj = {
      id: summitId,
      title: formData.title,
      acronym: formData.acronym,
      bannerUrl: formData.bannerUrl,
      shortDescription: formData.shortDescription,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      venueName: formData.venueName,
      city: formData.city,
      country: formData.country,
      countryCode: calculatedCountryCode,
      status: formData.status,
      registrationFeeAuthor: parseFloat(formData.registrationFeeAuthor) || 499.0,
      registrationFeeListener: parseFloat(formData.registrationFeeListener) || 299.0,
      registrationFeeStudent: parseFloat(formData.registrationFeeStudent) || 199.0,
      currency: formData.currency,
      chairName: formData.chairName,
      chairTitle: formData.chairTitle,
      chairInstitution: formData.chairInstitution,
      earlyBirdDate: formData.earlyBirdDate,
      abstractDeadline: formData.abstractDeadline,
      scientificTrackLeft: formData.scientificTrackLeft,
      scientificTrackRight: formData.scientificTrackRight,
      speakers: speakersList,
    };

    // Update in localStorage custom_summits
    try {
      const savedStr = localStorage.getItem("custom_summits");
      const existing: any[] = savedStr ? JSON.parse(savedStr) : [];
      const matchIndex = existing.findIndex((s: any) => String(s.id) === String(summitId));
      if (matchIndex >= 0) {
        existing[matchIndex] = { ...existing[matchIndex], ...updatedObj };
      } else {
        existing.push(updatedObj);
      }
      localStorage.setItem("custom_summits", JSON.stringify(existing));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("custom_summits_updated"));
      }
    } catch {
      // Continue
    }

    try {
      await api.put(`/conferences/${summitId}`, updatedObj);
    } catch {
      // Continue
    } finally {
      setLoading(false);
      router.push("/dashboard/admin/summits");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/admin/summits"
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 hover:text-[#1E40AF]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Edit Summit Details</h1>
            <p className="text-xs text-slate-700 font-medium">Update summit metadata, banner image from device gallery, dates, and registration pricing</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit"
        >
          <Save className="w-4 h-4 stroke-[3]" /> {loading ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>

      {/* Step Indicator Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { step: 1, label: "Basic Info & Banner", icon: FileText },
          { step: 2, label: "Schedule & Location", icon: Calendar },
          { step: 3, label: "Pricing Categories", icon: DollarSign },
          { step: 4, label: "Chair & Tracks", icon: Sparkles },
          { step: 5, label: "Keynote Speakers", icon: Sparkles },
        ].map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setActiveStep(s.step)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeStep === s.step
                ? "bg-[#1E40AF] text-white shadow-sm"
                : "text-slate-800 hover:text-[#1E40AF] hover:bg-slate-100"
            }`}
          >
            <s.icon className="w-4 h-4" />
            {s.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
        {activeStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Basic Information & Cover Image</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Summit Full Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Summit Acronym *</label>
                <input
                  type="text"
                  name="acronym"
                  required
                  value={formData.acronym}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF] font-mono"
                />
              </div>
            </div>

            {/* Banner Image Upload & Preset Picker */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-[#0D1117] block flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#1E40AF]" /> Summit Banner Image / Cover Image *
              </label>

              <div className="flex items-center gap-3">
                <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl cursor-pointer text-xs font-bold text-slate-800 flex items-center gap-2 transition-colors">
                  <Upload className="w-4 h-4 text-[#1E40AF]" /> Upload Banner Photo from Device
                  <input type="file" accept="image/*" onChange={handleBannerFileUpload} className="hidden" />
                </label>
                <span className="text-[11px] text-slate-500 font-medium">Or paste image URL</span>
              </div>

              <input
                type="text"
                name="bannerUrl"
                value={formData.bannerUrl}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF] font-mono"
              />

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[10px] text-slate-700 font-bold font-mono">Quick Presets:</span>
                {[
                  { name: "AI & Tech", url: "/images/ai_quantum_summit.png" },
                  { name: "BioMedicine", url: "/images/biomedicine_congress.png" },
                  { name: "Clean Energy", url: "/images/clean_energy_summit.png" },
                  { name: "Robotics", url: "/images/robotics_summit.png" },
                  { name: "Smart Cities", url: "/images/smart_cities.png" },
                ].map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, bannerUrl: p.url })}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold font-mono border border-slate-300"
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {formData.bannerUrl && (
                <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                  <img src={formData.bannerUrl} alt="Banner Preview" className="w-24 h-12 rounded-xl object-cover border border-slate-300 shadow-sm" />
                  <span className="text-xs text-slate-700 font-mono font-bold">Current Active Cover Banner Preview</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Short Summary Description</label>
              <textarea
                name="shortDescription"
                rows={2}
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Full Summit Description</label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
              />
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Event Schedule & Location</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  required
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Venue Name</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Pricing & Delegate Categories</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Author Registration Fee ($)</label>
                <input
                  type="number"
                  name="registrationFeeAuthor"
                  value={formData.registrationFeeAuthor}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Listener / Delegate Fee ($)</label>
                <input
                  type="number"
                  name="registrationFeeListener"
                  value={formData.registrationFeeListener}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Student Fee ($)</label>
                <input
                  type="number"
                  name="registrationFeeStudent"
                  value={formData.registrationFeeStudent}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Conference Chair & Key Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Conference Chair Name</label>
                <input
                  type="text"
                  name="chairName"
                  value={formData.chairName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Chair Designation / Role</label>
                <input
                  type="text"
                  name="chairTitle"
                  value={formData.chairTitle}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Chair Institution / Company</label>
                <input
                  type="text"
                  name="chairInstitution"
                  value={formData.chairInstitution}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Early Bird Registration Date</label>
                <input
                  type="text"
                  name="earlyBirdDate"
                  value={formData.earlyBirdDate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Abstract Submission Deadline Date</label>
                <input
                  type="text"
                  name="abstractDeadline"
                  value={formData.abstractDeadline}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Scientific Tracks (Left Column - 1 per line)</label>
                <textarea
                  name="scientificTrackLeft"
                  rows={4}
                  value={formData.scientificTrackLeft}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Scientific Tracks (Right Column - 1 per line)</label>
                <textarea
                  name="scientificTrackRight"
                  rows={4}
                  value={formData.scientificTrackRight}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Publication Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
              >
                <option value="ACTIVE">ACTIVE / LIVE</option>
                <option value="DRAFT">DRAFT</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Summit Keynote & Plenary Speakers</h3>

            {/* List of Active Speakers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {speakersList.map((sp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={sp.imageUrl} alt={sp.name} className="w-12 h-12 rounded-xl object-cover border border-slate-300" />
                    <div>
                      <h4 className="font-extrabold text-xs text-[#0D1117]">{sp.name}</h4>
                      <p className="text-[10px] text-[#1E40AF] font-bold">{sp.designation}</p>
                      <p className="text-[10px] text-slate-500">{sp.institution}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-900 text-[9px] font-bold rounded">
                        {sp.type || "Plenary"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSpeakersList(speakersList.filter((_, i) => i !== idx))}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Speaker Form */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-4">
              <h4 className="text-xs font-extrabold text-[#0D1117] uppercase tracking-wider">Add New Speaker to Summit</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Speaker Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Jane Smith"
                    value={newSpeaker.name}
                    onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Designation / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Professor & Researcher"
                    value={newSpeaker.designation}
                    onChange={(e) => setNewSpeaker({ ...newSpeaker, designation: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Institution / University</label>
                  <input
                    type="text"
                    placeholder="e.g. Oxford University, UK"
                    value={newSpeaker.institution}
                    onChange={(e) => setNewSpeaker({ ...newSpeaker, institution: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Photo Image URL</label>
                  <input
                    type="text"
                    value={newSpeaker.imageUrl}
                    onChange={(e) => setNewSpeaker({ ...newSpeaker, imageUrl: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Speaker Category</label>
                  <select
                    value={newSpeaker.type}
                    onChange={(e) => setNewSpeaker({ ...newSpeaker, type: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                  >
                    <option value="Plenary">Plenary Speaker</option>
                    <option value="Invited">Invited Speaker</option>
                    <option value="Fellow">Young Research Fellow</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!newSpeaker.name.trim()) return;
                  setSpeakersList([...speakersList, newSpeaker]);
                  setNewSpeaker({
                    name: "",
                    designation: "",
                    institution: "",
                    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
                    type: "Plenary",
                  });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm"
              >
                + Add Speaker to List
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4 border-t border-slate-200">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep((prev) => prev - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200"
            >
              Previous Step
            </button>
          ) : <div />}

          {activeStep < 5 ? (
            <button
              type="button"
              onClick={() => setActiveStep((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-bold"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
