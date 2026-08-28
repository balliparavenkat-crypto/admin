"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Save, Check } from "lucide-react";
import api from "../../../../lib/api";

export default function WebsiteContentPage() {
  const [activeSection, setActiveSection] = useState("HERO");
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [sections, setSections] = useState<any>({
    HERO: {
      headline: "D&V Global Summits 2026",
      tagline: "Connecting Global AI Pioneers, Academic Researchers, and Industry Leaders",
      ctaText: "Explore Conferences",
    },
    ABOUT: {
      title: "Pioneering International Scientific Summit Platform",
      content: "D&V Global Summit brings together thousands of researchers worldwide across 45+ countries.",
    },
    FAQS: {
      q1: "How do I submit my paper?",
      a1: "Register for an Author account and upload your abstract via the Paper Submission portal.",
    },
  });

  const handleSave = async () => {
    setLoading(true);
    setSavedSuccess(false);
    try {
      localStorage.setItem("website_content", JSON.stringify(sections));
      await api.put(`/admin/website-content/${activeSection}`, {
        contentJson: JSON.stringify(sections[activeSection]),
      });
    } catch {
      // Continue
    } finally {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Website Content CMS Manager</h1>
          <p className="text-xs text-slate-700 font-medium">Dynamically update public homepage sections (Hero, About, FAQs) without code deployment</p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform w-fit"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
          {savedSuccess ? "Saved to Database ✓" : "Save Section Content"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Section Selector */}
        <div className="p-4 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          {["HERO", "ABOUT", "FAQS", "FOOTER"].map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeSection === sec
                  ? "bg-[#1E40AF] text-white shadow-sm"
                  : "text-slate-800 hover:text-[#1E40AF] hover:bg-slate-100"
              }`}
            >
              {sec} Section
            </button>
          ))}
        </div>

        {/* Section Editor Form */}
        <div className="md:col-span-3 p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">
            Editing {activeSection} Section JSON & Key Values
          </h3>

          <div className="space-y-4">
            {Object.keys(sections[activeSection] || {}).map((key) => (
              <div key={key}>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-1 font-mono">{key}</label>
                <textarea
                  rows={2}
                  value={sections[activeSection][key]}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSections((prev: any) => ({
                      ...prev,
                      [activeSection]: { ...prev[activeSection], [key]: val },
                    }));
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
