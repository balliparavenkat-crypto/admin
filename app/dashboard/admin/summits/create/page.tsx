"use client";

import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { ArrowLeft, Save, Sparkles, Calendar, DollarSign, FileText, CheckCircle } from "lucide-react";
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
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin/summits"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Create New Summit</h1>
            <p className="text-xs text-slate-400">Configure new summit parameters, registration fees, and deadlines</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
        >
          <Save className="w-4 h-4" /> {loading ? "Publishing..." : "Publish Summit"}
        </button>
      </div>

      {/* Step Indicator Tabs */}
      <div className="grid grid-cols-4 gap-2 border-b border-slate-800 pb-4">
        {[
          { step: 1, label: "1. Basic Info" },
          { step: 2, label: "2. Schedule & Venue" },
          { step: 3, label: "3. Pricing & Fees" },
          { step: 4, label: "4. Paper Deadlines" },
        ].map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setActiveStep(s.step)}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all text-center ${
              activeStep === s.step
                ? "bg-accent-blue/15 text-accent-cyan border border-accent-blue/30 shadow-sm"
                : "text-slate-400 hover:text-white bg-slate-900/40"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        {activeStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-slate-800 pb-3">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Summit Full Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. D&V Global Summit 2026: Advances in Artificial Intelligence"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Summit Acronym *</label>
                <input
                  type="text"
                  name="acronym"
                  required
                  value={formData.acronym}
                  onChange={handleChange}
                  placeholder="e.g. DVGS2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Short Summary Description</label>
              <textarea
                name="shortDescription"
                rows={2}
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief summary for cards and search indexing..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Full Summit Description</label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Comprehensive conference overview, target audience, tracks..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50"
              />
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-slate-800 pb-3">Event Schedule & Location</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-cyan/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  required
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-cyan/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Event Format</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-cyan/50"
                >
                  <option value="Offline">Offline / On-Site</option>
                  <option value="Online">Virtual / Online</option>
                  <option value="Hybrid">Hybrid (On-Site & Virtual)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Venue Name</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  placeholder="e.g. Grand Palace Convention Center"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">City & Country</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50"
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-cyan/50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-slate-800 pb-3">Registration Categories & Fees</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Author Fee ($)</label>
                <input
                  type="text"
                  name="registrationFeeAuthor"
                  value={formData.registrationFeeAuthor}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-accent-cyan/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Listener / Delegate Fee ($)</label>
                <input
                  type="text"
                  name="registrationFeeListener"
                  value={formData.registrationFeeListener}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-accent-cyan/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Student Fee ($)</label>
                <input
                  type="text"
                  name="registrationFeeStudent"
                  value={formData.registrationFeeStudent}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-accent-cyan/50"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-slate-800 pb-3">Paper Submission Deadlines</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Submission Deadline</label>
                <input
                  type="date"
                  name="submissionDeadline"
                  value={formData.submissionDeadline}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-cyan/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Review Deadline</label>
                <input
                  type="date"
                  name="reviewDeadline"
                  value={formData.reviewDeadline}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-cyan/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Initial Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-cyan/50 font-mono"
                >
                  <option value="ACTIVE">ACTIVE / REGISTRATION OPEN</option>
                  <option value="DRAFT">DRAFT</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep(activeStep - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white"
            >
              Back
            </button>
          ) : <div />}

          {activeStep < 4 ? (
            <button
              type="button"
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-accent-blue hover:bg-blue-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-md"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" /> Save & Publish Summit
            </button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
