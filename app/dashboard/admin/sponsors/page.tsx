"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Building2, Plus, ExternalLink, X, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";

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
  const [editingSponsor, setEditingSponsor] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    level: "PLATINUM",
    description: "",
    logoUrl: "",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCreate = () => {
    setEditingSponsor(null);
    setFormData({ companyName: "", websiteUrl: "", level: "PLATINUM", description: "", logoUrl: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sp: any) => {
    setEditingSponsor(sp);
    setFormData({
      companyName: sp.companyName,
      websiteUrl: sp.websiteUrl,
      level: sp.level,
      description: sp.description,
      logoUrl: sp.logoUrl,
    });
    setIsModalOpen(true);
  };

  const handleDeleteSponsor = (id: number) => {
    setSponsors((prev) => prev.filter((sp) => sp.id !== id));
  };

  const handleSaveSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSponsor) {
      setSponsors((prev) =>
        prev.map((sp) => (sp.id === editingSponsor.id ? { ...sp, ...formData } : sp))
      );
    } else {
      const newObj = {
        id: Date.now(),
        ...formData,
        logoUrl: formData.logoUrl || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=120&fit=crop",
      };
      setSponsors([newObj, ...sponsors]);
    }
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
          onClick={handleOpenCreate}
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
              <div className="flex items-center gap-2">
                <a href={sp.websiteUrl} target="_blank" rel="noreferrer" className="text-[#1E40AF] hover:underline text-xs flex items-center gap-1 font-bold">
                  Website <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => handleOpenEdit(sp)}
                  className="p-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                  title="Edit Sponsor"
                >
                  <Edit className="w-3.5 h-3.5 text-amber-600" />
                </button>
                <button
                  onClick={() => handleDeleteSponsor(sp.id)}
                  className="p-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
                  title="Delete Sponsor"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                </button>
              </div>
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

      {/* Add / Edit Sponsor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">
                {editingSponsor ? "Edit Sponsor Details" : "Add Corporate Sponsor"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSponsor} className="space-y-4">
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

              {/* Sponsor Logo File Upload & URL Picker */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#0D1117] block flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#1E40AF]" /> Sponsor Logo Image *
                </label>

                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl cursor-pointer text-xs font-bold text-slate-800 flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4 text-[#1E40AF]" /> Upload Logo File
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">Or paste image URL</span>
                </div>

                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#1E40AF]"
                />

                {formData.logoUrl && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-200 rounded-2xl">
                    <img src={formData.logoUrl} alt="Logo Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-300" />
                    <span className="text-xs font-bold text-[#0D1117]">Logo Preview Active</span>
                  </div>
                )}
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
                  {editingSponsor ? "Save Updates" : "Add Sponsor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
