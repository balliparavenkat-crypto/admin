"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { ArrowLeft, Save, Sparkles, Calendar, DollarSign, FileText, Mic, Image as ImageIcon, Plus, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../../../../lib/api";

export default function CreateSummitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Wizard Form State
  const [formData, setFormData] = useState({
    title: "",
    acronym: "",
    bannerUrl: "",
    shortDescription: "",
    description: "",
    websiteUrl: "",
    startDate: "",
    endDate: "",
    startTime: "09:00",
    endTime: "18:00",
    timezone: "UTC",
    venueName: "",
    venueAddress: "",
    city: "",
    state: "",
    country: "United States",
    eventType: "Offline",
    registrationOpenDate: "",
    registrationCloseDate: "",
    earlyBirdDeadline: "",
    registrationFeeAuthor: "499.00",
    registrationFeeListener: "299.00",
    registrationFeeStudent: "199.00",
    currency: "USD",
    taxRate: "18",
    submissionOpen: "",
    submissionDeadline: "",
    reviewDeadline: "",
    status: "ACTIVE",
  });

  // Selected Speakers State for this specific summit
  const [summitSpeakers, setSummitSpeakers] = useState<any[]>([]);
  const [newSpeakerName, setNewSpeakerName] = useState("");
  const [newSpeakerDesignation, setNewSpeakerDesignation] = useState("");
  const [newSpeakerInstitution, setNewSpeakerInstitution] = useState("");
  const [newSpeakerBio, setNewSpeakerBio] = useState("");
  const [newSpeakerImageUrl, setNewSpeakerImageUrl] = useState("");

  const handleSpeakerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSpeakerImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpeakerToSummit = () => {
    if (!newSpeakerName.trim()) return;
    const newSp = {
      id: Date.now(),
      name: newSpeakerName,
      designation: newSpeakerDesignation || "Keynote Speaker",
      institution: newSpeakerInstitution || "Global University",
      bio: newSpeakerBio || "Distinguished researcher and keynote speaker.",
      imageUrl: newSpeakerImageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
      conferenceAcronym: formData.acronym || "CUSTOM",
    };
    setSummitSpeakers([...summitSpeakers, newSp]);
    setNewSpeakerName("");
    setNewSpeakerDesignation("");
    setNewSpeakerInstitution("");
    setNewSpeakerBio("");
    setNewSpeakerImageUrl("");
  };

  const handleRemoveSpeakerFromSummit = (id: number) => {
    setSummitSpeakers(summitSpeakers.filter((sp) => sp.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const summitAcronym = formData.acronym || `SUMMIT${Date.now()}`;

    // Tag all selected speakers to this summit's acronym
    const finalSpeakers = summitSpeakers.map((sp) => ({
      ...sp,
      conferenceAcronym: summitAcronym,
    }));

    const newSummitObj = {
      id: Date.now(),
      title: formData.title,
      acronym: summitAcronym,
      bannerUrl: formData.bannerUrl || "/images/ai_quantum_summit.png",
      shortDescription: formData.shortDescription,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      venueName: formData.venueName,
      city: formData.city,
      country: formData.country,
      status: formData.status,
      registrationFeeAuthor: parseFloat(formData.registrationFeeAuthor) || 499.0,
      registrationFeeListener: parseFloat(formData.registrationFeeListener) || 299.0,
      registrationFeeStudent: parseFloat(formData.registrationFeeStudent) || 199.0,
      currency: formData.currency,
      registrationsCount: 0,
      speakers: finalSpeakers,
    };

    // Store summit in localStorage custom_summits
    try {
      const existingStr = localStorage.getItem("custom_summits");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.push(newSummitObj);
      localStorage.setItem("custom_summits", JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    // Store custom speakers in localStorage custom_speakers
    try {
      const savedSpeakersStr = localStorage.getItem("custom_speakers");
      const existingSpeakers = savedSpeakersStr ? JSON.parse(savedSpeakersStr) : [];
      const updatedSpeakers = [...existingSpeakers, ...finalSpeakers];
      localStorage.setItem("custom_speakers", JSON.stringify(updatedSpeakers));
    } catch (err) {
      console.error(err);
    }

    try {
      await api.post("/conferences/create", newSummitObj);
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
            <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Create New Summit</h1>
            <p className="text-xs text-slate-700 font-medium">Configure new summit parameters, custom keynote speakers, banner images, and pricing</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform w-fit"
        >
          <Save className="w-4 h-4 stroke-[3]" /> {loading ? "Publishing..." : "Publish Summit"}
        </button>
      </div>

      {/* Step Indicator Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { step: 1, label: "Basic Info & Banner", icon: FileText },
          { step: 2, label: "Schedule & Location", icon: Calendar },
          { step: 3, label: "Speakers Selection", icon: Mic },
          { step: 4, label: "Pricing Categories", icon: DollarSign },
          { step: 5, label: "Deadlines & Status", icon: Sparkles },
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
                  placeholder="e.g. D&V Global Summit 2026: Advances in Artificial Intelligence"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF]"
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
                  placeholder="e.g. DVGS2026"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#0D1117] block mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#1E40AF]" /> Summit Banner Image URL / Cover Image
              </label>
              <input
                type="text"
                name="bannerUrl"
                value={formData.bannerUrl}
                onChange={handleChange}
                placeholder="e.g. /images/ai_quantum_summit.png or https://images.unsplash.com/photo-..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF] font-mono"
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
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Short Summary Description</label>
              <textarea
                name="shortDescription"
                rows={2}
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief summary for cards and search indexing..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 font-semibold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF]"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Full Summit Description</label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Comprehensive conference overview, target audience, tracks..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 font-semibold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF]"
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
                  placeholder="e.g. Grand Palace Convention Center"
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
                  placeholder="e.g. San Francisco"
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
                  placeholder="e.g. United States"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Keynote Speakers Selection specifically for this summit */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0D1117] tracking-wide">Keynote Speakers for {formData.acronym || "this Summit"}</h3>
                <p className="text-xs text-slate-600 font-medium">Add speakers with photo uploads that belong specifically to this summit</p>
              </div>
            </div>

            {/* Quick Add Speaker Card Form */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="text-xs font-extrabold text-[#0D1117] uppercase tracking-wider">Add Speaker to this Summit</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={newSpeakerName}
                  onChange={(e) => setNewSpeakerName(e.target.value)}
                  placeholder="Speaker Name (e.g. Dr. Jane Goodall)"
                  className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
                <input
                  type="text"
                  value={newSpeakerDesignation}
                  onChange={(e) => setNewSpeakerDesignation(e.target.value)}
                  placeholder="Designation (e.g. Lead Researcher)"
                  className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
                <input
                  type="text"
                  value={newSpeakerInstitution}
                  onChange={(e) => setNewSpeakerInstitution(e.target.value)}
                  placeholder="Institution / Org"
                  className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              {/* Speaker Photo Upload Box */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="text-xs font-extrabold text-[#0D1117] block flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#1E40AF]" /> Speaker Photo / Headshot
                </label>

                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl cursor-pointer text-xs font-bold text-slate-800 flex items-center gap-2 transition-colors shadow-sm">
                    <Upload className="w-4 h-4 text-[#1E40AF]" /> Upload Photo File
                    <input type="file" accept="image/*" onChange={handleSpeakerFileUpload} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">Or paste image link</span>
                </div>

                <input
                  type="text"
                  value={newSpeakerImageUrl}
                  onChange={(e) => setNewSpeakerImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                />

                {newSpeakerImageUrl && (
                  <div className="flex items-center gap-3 p-2.5 bg-blue-50/50 border border-blue-200 rounded-xl">
                    <img src={newSpeakerImageUrl} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-slate-300" />
                    <span className="text-xs font-bold text-[#0D1117]">Photo Ready</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddSpeakerToSummit}
                  className="px-4 py-2 rounded-xl bg-[#1E40AF] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Speaker to Summit
                </button>
              </div>
            </div>

            {/* Assigned Speakers List */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-[#0D1117] uppercase tracking-wider">Selected Speakers ({summitSpeakers.length})</h4>
              {summitSpeakers.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  No custom speakers assigned yet for this summit. (Optional: Speakers can also be added later from the Speakers Manager page)
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summitSpeakers.map((sp) => (
                    <div key={sp.id} className="p-4 rounded-2xl bg-white border border-[#1E40AF]/15 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={sp.imageUrl} alt={sp.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <h5 className="font-bold text-xs text-[#0D1117]">{sp.name}</h5>
                          <span className="text-[10px] text-[#1E40AF] font-bold block">{sp.designation}</span>
                          <span className="text-[10px] text-slate-500 font-medium block">{sp.institution}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpeakerFromSummit(sp.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200"
                        title="Remove Speaker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeStep === 4 && (
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

        {activeStep === 5 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Status & Publishing</h3>

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
              {loading ? "Publishing..." : "Publish Summit"}
            </button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
