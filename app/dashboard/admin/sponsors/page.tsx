"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Building2, Plus, ExternalLink, X } from "lucide-react";

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<any[]>([
    {
      id: 1,
      companyName: "NVIDIA AI Research",
      logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop",
      websiteUrl: "https://nvidia.com",
      level: "PLATINUM",
      description: "Global Leader in Accelerated Computing & Generative AI Hardware",
    },
    {
      id: 2,
      companyName: "Google Cloud Platform",
      logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop",
      websiteUrl: "https://cloud.google.com",
      level: "GOLD",
      description: "AI & Machine Learning Infrastructure Partner",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    level: "PLATINUM",
    description: "",
    logoUrl: "",
  });

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    const newObj = {
      id: Date.now(),
      ...formData,
      logoUrl: formData.logoUrl || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=120&fit=crop",
    };
    setSponsors([newObj, ...sponsors]);
    setFormData({
      companyName: "",
      websiteUrl: "",
      level: "PLATINUM",
      description: "",
      logoUrl: "",
    });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Corporate Sponsors & Partners</h1>
          <p className="text-xs text-slate-700 font-medium">Manage sponsorship logos, website links, descriptions, and sponsorship tiers</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md w-fit hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add Sponsor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sponsors.map((sp) => (
          <div key={sp.id} className="p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-mono font-bold text-[10px] uppercase border border-amber-300">
                {sp.level} SPONSOR
              </span>
              <a href={sp.websiteUrl} target="_blank" rel="noreferrer" className="text-[#1E40AF] hover:underline text-xs flex items-center gap-1 font-bold">
                Website <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <img src={sp.logoUrl} alt={sp.companyName} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
              <div>
                <h3 className="font-extrabold text-[#0D1117] text-base">{sp.companyName}</h3>
                <p className="text-xs text-slate-600 font-medium mt-1">{sp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Sponsor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">Add Corporate Sponsor</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSponsor} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Company / Sponsor Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. OpenAI"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Sponsorship Tier</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                  >
                    <option value="PLATINUM">PLATINUM</option>
                    <option value="GOLD">GOLD</option>
                    <option value="SILVER">SILVER</option>
                    <option value="BRONZE">BRONZE</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0D1117] block mb-1">Website URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://openai.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Company Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Official sponsor of keynote sessions..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-bold shadow-md"
                >
                  Add Sponsor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
