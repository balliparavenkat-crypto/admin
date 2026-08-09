"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Building2, Plus, Globe, Trash2, ExternalLink } from "lucide-react";

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

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Corporate Sponsors & Partners</h1>
          <p className="text-xs text-slate-400">Manage sponsorship logos, website links, descriptions, and sponsorship tiers</p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg w-fit">
          <Plus className="w-4 h-4 stroke-[3]" /> Add Sponsor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sponsors.map((sp) => (
          <div key={sp.id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px] uppercase border border-amber-500/20">
                {sp.level} SPONSOR
              </span>
              <a href={sp.websiteUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white text-xs flex items-center gap-1">
                Website <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <img src={sp.logoUrl} alt={sp.companyName} className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
              <div>
                <h3 className="font-extrabold text-white text-base">{sp.companyName}</h3>
                <p className="text-xs text-slate-400 mt-1">{sp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
