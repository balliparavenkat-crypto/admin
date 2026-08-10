"use client";

import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { ArrowLeft, Save, Sparkles, Calendar, DollarSign, FileText, CheckCircle, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../../../../lib/api";

export default function CreateSummitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Form State
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
    eventType: "Offline", // Offline, Online, Hybrid
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newSummitObj = {
      id: Date.now(),
      title: formData.title || "D&V Global Summit 2026",
      acronym: formData.acronym || "DVGS2026",
      bannerUrl: formData.bannerUrl || "/images/ai_quantum_summit.png",
      shortDescription: formData.shortDescription,
      description: formData.description || "Global summit conference",
      startDate: formData.startDate || "2026-10-15",
      endDate: formData.endDate || "2026-10-18",
      venueName: formData.venueName || "Convention Center",
      city: formData.city || "San Francisco",
      country: formData.country || "United States",
      status: formData.status || "ACTIVE",
      registrationFeeAuthor: parseFloat(formData.registrationFeeAuthor) || 499.0,
      registrationFeeListener: parseFloat(formData.registrationFeeListener) || 299.0,
      registrationFeeStudent: parseFloat(formData.registrationFeeStudent) || 199.0,
      currency: formData.currency || "USD",
      registrationsCount: 0,
      papersCount: 0,
    };

    // Store in localStorage for instant client-side persistence
    try {
      const existingStr = localStorage.getItem("custom_summits");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem("custom_summits", JSON.stringify([newSummitObj, ...existing]));
    } catch (err) {
      console.error(err);
    }

    try {
      await api.post("/conferences/create", {
        title: formData.title,
        acronym: formData.acronym,
        description: formData.description,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : new Date().toISOString(),
        venueName: formData.venueName,
        venueAddress: formData.venueAddress,
        city: formData.city,
        country: formData.country,
        status: formData.status,
        registrationFeeAuthor: parseFloat(formData.registrationFeeAuthor),
        registrationFeeListener: parseFloat(formData.registrationFeeListener),
        currency: formData.currency,
      });
    } catch {
      // Continue to navigation
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
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Create New Summit Wizard</h1>
            <p className="text-xs text-slate-500">Configure conference settings, deadlines, registration categories, and tracks</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform w-fit"
        >
          <Save className="w-4 h-4 stroke-[3]" />
          {loading ? "Publishing..." : "Publish Summit"}
        </button>
      </div>

      {/* Step Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { step: 1, label: "1. Basic Info & Banner", icon: FileText },
          { step: 2, label: "2. Schedule & Location", icon: Calendar },
          { step: 3, label: "3. Pricing Categories", icon: DollarSign },
          { step: 4, label: "4. Deadlines & Status", icon: Sparkles },
        ].map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setActiveStep(s.step)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeStep === s.step
                ? "bg-[#1E40AF] text-white shadow-sm"
                : "text-slate-600 hover:text-[#1E40AF] hover:bg-slate-100"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/15"
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
              <label className="text-xs font-extrabold text-[#0D1117] block mb-2">Summit Banner Image URL / Cover Image</label>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Event Format</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1E40AF]"
                >
                  <option value="Offline">On-Site (Offline)</option>
                  <option value="Online">Virtual (Online)</option>
                  <option value="Hybrid">Hybrid (Both)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Venue Name</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  placeholder="e.g. Convention Center"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. United States"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E40AF]"
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
                <label className="text-xs font-semibold text-slate-700 block mb-2">Author Registration Fee ($)</label>
                <input
                  type="number"
                  name="registrationFeeAuthor"
                  value={formData.registrationFeeAuthor}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Listener / Delegate Fee ($)</label>
                <input
                  type="number"
                  name="registrationFeeListener"
                  value={formData.registrationFeeListener}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Student Fee ($)</label>
                <input
                  type="number"
                  name="registrationFeeStudent"
                  value={formData.registrationFeeStudent}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">Publication Status</h3>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">Publication Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1E40AF]"
              >
                <option value="ACTIVE">ACTIVE / LIVE</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4 border-t border-slate-200">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep((prev) => prev - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
            >
              Previous Step
            </button>
          ) : <div />}

          {activeStep < 4 ? (
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
