"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { ArrowLeft, Save, Sparkles, Calendar, DollarSign, FileText, Image as ImageIcon, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../../../lib/api";

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
          }));
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
      status: formData.status,
      registrationFeeAuthor: parseFloat(formData.registrationFeeAuthor) || 499.0,
      registrationFeeListener: parseFloat(formData.registrationFeeListener) || 299.0,
      registrationFeeStudent: parseFloat(formData.registrationFeeStudent) || 199.0,
      currency: formData.currency,
    };

    // Update in localStorage custom_summits
    try {
      const savedStr = localStorage.getItem("custom_summits");
      const existing = savedStr ? JSON.parse(savedStr) : [];
      const updatedList = existing.map((s: any) =>
        String(s.id) === String(summitId) ? { ...s, ...updatedObj } : s
      );
      localStorage.setItem("custom_summits", JSON.stringify(updatedList));
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
          { step: 4, label: "Deadlines & Status", icon: Sparkles },
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
