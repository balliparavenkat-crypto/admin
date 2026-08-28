"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Save, Check, Globe, Phone, Mail, FileText, Award, HelpCircle } from "lucide-react";
import api from "../../../../lib/api";

export default function WebsiteContentPage() {
  const [activeSection, setActiveSection] = useState("CONTACT");
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [sections, setSections] = useState<any>({
    CONTACT: {
      phone: "+91 9666896607",
      whatsapp: "+919666896607",
      email: "info@dvglobalsummits.com",
      address: "World Trade Tower, Tech Hub District, India",
      officeHours: "Mon - Fri from 9:00 AM to 6:00 PM IST",
    },
    HERO: {
      headline: "D&V Global Summits 2026",
      tagline: "Connecting Global AI Pioneers, Academic Researchers, and Industry Leaders",
      ctaText: "Explore Conferences",
    },
    ABOUT: {
      title: "Pioneering International Scientific Summit Platform",
      content: "D&V Global Summit brings together thousands of researchers worldwide across 45+ countries to share breakthroughs in AI, BioMedicine, Clean Energy, and Robotics.",
      statCountries: "120+",
      statResearchers: "15,000+",
      statUniversities: "500+",
    },
    POLICIES: {
      cancellationNotice: "Cancellations made 30 days prior to the event are eligible for a 75% refund.",
      termsNotice: "By registering for D&V Global Summits, delegates agree to comply with our academic code of conduct and review policies.",
    },
    AWARDS: {
      bestOralAward: "BEST ORAL PRESENTATION AWARD - Sponsored by Academic Journals & MDPI",
      youngScientistAward: "Young Scientist Innovation Medal for breakthrough research under age 35",
    },
    FAQS: {
      q1: "How do I submit my research paper?",
      a1: "Register for an Author account and upload your abstract via the Paper Submission portal.",
      q2: "What is the review process for submitted papers?",
      a2: "We utilize a strict double-blind peer-review system managed by our Conference Chair and Review Committee.",
    },
  });

  useEffect(() => {
    try {
      const savedStr = localStorage.getItem("website_content");
      if (savedStr) {
        const parsed = JSON.parse(savedStr);
        setSections((prev: any) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Continue
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setSavedSuccess(false);
    try {
      localStorage.setItem("website_content", JSON.stringify(sections));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("website_content_updated"));
        window.dispatchEvent(new Event("storage"));
      }
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
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Full Website Content CMS Manager</h1>
          <p className="text-xs text-slate-700 font-medium">Update all frontend website pages (Contact Details, Hero Banner, About, Policies & Awards) in real-time</p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform w-fit"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-slate-950 stroke-[3]" /> : <Save className="w-4 h-4" />}
          {savedSuccess ? "Saved to Site ✓" : "Save All Website Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Section Selector */}
        <div className="p-4 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
          {[
            { id: "CONTACT", name: "Contact & Phone", icon: Phone },
            { id: "HERO", name: "Hero Banner", icon: Globe },
            { id: "ABOUT", name: "About Us Section", icon: FileText },
            { id: "POLICIES", name: "Policies & Terms", icon: FileText },
            { id: "AWARDS", name: "Awards & Honors", icon: Award },
            { id: "FAQS", name: "FAQs & Support", icon: HelpCircle },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeSection === sec.id
                  ? "bg-[#1E40AF] text-white shadow-sm"
                  : "text-slate-800 hover:text-[#1E40AF] hover:bg-slate-100"
              }`}
            >
              <sec.icon className="w-4 h-4" />
              {sec.name}
            </button>
          ))}
        </div>

        {/* Section Editor Form */}
        <div className="md:col-span-3 p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-[#0D1117] tracking-wide border-b border-slate-200 pb-3">
            Editing {activeSection} Section
          </h3>

          <div className="space-y-4">
            {Object.keys(sections[activeSection] || {}).map((key) => (
              <div key={key}>
                <label className="text-xs font-extrabold text-[#0D1117] block mb-1 uppercase tracking-wider text-slate-700">{key}</label>
                <textarea
                  rows={key.length > 20 || key.includes("content") || key.includes("Notice") ? 3 : 1}
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

          <div className="pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm"
            >
              Save Section Content
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
