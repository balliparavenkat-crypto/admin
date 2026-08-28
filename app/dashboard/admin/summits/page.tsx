"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Plus, Search, Filter, Calendar, MapPin, Edit, Trash2, Eye, RefreshCw, CheckCircle } from "lucide-react";
import Link from "next/link";
import api from "../../../../lib/api";

export default function SummitsListPage() {
  const [summits, setSummits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteModalId, setDeleteModalId] = useState<number | string | null>(null);

  const fetchSummits = async () => {
    setLoading(true);
    let allSummits: any[] = [];

    // 1. Load custom_summits from localStorage
    try {
      const savedStr = localStorage.getItem("custom_summits");
      if (savedStr) {
        allSummits = JSON.parse(savedStr);
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Load default fallback summits if empty
    if (allSummits.length === 0) {
      allSummits = [
        {
          id: 1,
          title: "D&V Global Summit 2026: Advances in Artificial Intelligence",
          acronym: "DVGS2026",
          city: "San Francisco",
          country: "United States",
          startDate: "2026-10-15",
          endDate: "2026-10-18",
          registrationFeeAuthor: 499.00,
          registrationFeeListener: 299.00,
          status: "ACTIVE",
          registrationsCount: 14,
        },
        {
          id: 2,
          title: "International Conference on Sustainable Climate Solutions",
          acronym: "ICSCS2026",
          city: "Singapore",
          country: "Singapore",
          startDate: "2026-11-20",
          endDate: "2026-11-23",
          registrationFeeAuthor: 450.00,
          registrationFeeListener: 250.00,
          status: "ACTIVE",
          registrationsCount: 8,
        },
        {
          id: 3,
          title: "INTERNATIONAL STUDENT INNOVATION AND RESEARCH SUMMIT-2026",
          acronym: "ISIRS 2026",
          city: "London",
          country: "United Kingdom",
          startDate: "2026-11-12",
          endDate: "2026-11-15",
          registrationFeeAuthor: 399.00,
          registrationFeeListener: 299.00,
          status: "ACTIVE",
          registrationsCount: 19,
        },
      ];
    }

    // 3. Try fetching from backend API and merge
    try {
      const res = await api.get("/conferences");
      if (Array.isArray(res.data) && res.data.length > 0) {
        const backendIds = new Set(res.data.map((b: any) => String(b.id)));
        const uniqueCustom = allSummits.filter((c) => !backendIds.has(String(c.id)));
        allSummits = [...res.data, ...uniqueCustom];
      }
    } catch {
      // Continue with local list
    } finally {
      setSummits(allSummits);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummits();
  }, []);

  const filteredSummits = summits.filter((s) => {
    const matchesSearch =
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.acronym?.toLowerCase().includes(search.toLowerCase()) ||
      s.city?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: number | string) => {
    const updated = summits.filter((s) => String(s.id) !== String(id));
    setSummits(updated);
    try {
      localStorage.setItem("custom_summits", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setDeleteModalId(null);
  };

  const toggleStatus = (id: number | string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "DRAFT" : "ACTIVE";
    const updated = summits.map((s) => (String(s.id) === String(id) ? { ...s, status: nextStatus } : s));
    setSummits(updated);
    try {
      localStorage.setItem("custom_summits", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Summits Management</h1>
          <p className="text-xs text-slate-700 font-medium">Manage complete lifecycle of conferences and global summits</p>
        </div>

        <Link
          href="/dashboard/admin/summits/create"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform w-fit"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Create New Summit
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#1E40AF]/15 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E40AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, acronym, city..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 font-semibold placeholder-slate-500 focus:outline-none focus:border-[#1E40AF]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE / LIVE</option>
            <option value="DRAFT">DRAFT</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>

          <button
            onClick={fetchSummits}
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 hover:text-[#1E40AF]"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Summits List Table */}
      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-800 font-mono text-[11px] uppercase tracking-wider border-b border-slate-300 font-extrabold">
              <tr>
                <th className="p-4">Summit Title & Acronym</th>
                <th className="p-4">Location & Dates</th>
                <th className="p-4">Pricing</th>
                <th className="p-4">Registrations</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-900 font-medium">
              {filteredSummits.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-700 font-semibold">
                    No summits found
                  </td>
                </tr>
              ) : (
                filteredSummits.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <Link href={`/dashboard/admin/summits/${s.id}`} className="font-black text-[#0D1117] text-sm block hover:text-[#1E40AF] transition-colors cursor-pointer">
                        {s.title}
                      </Link>
                      <span className="text-[10px] font-mono font-black text-[#1E40AF] bg-blue-100/70 px-2 py-0.5 rounded border border-blue-300 mt-1 inline-block">
                        {s.acronym}
                      </span>
                    </td>
                    <td className="p-4 space-y-1">
                      <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" /> {s.city}, {s.country}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px] font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#1E40AF]" /> {s.startDate?.substring(0, 10)} - {s.endDate?.substring(0, 10)}
                      </span>
                    </td>
                    <td className="p-4 space-y-1 font-mono">
                      <span className="block text-emerald-800 font-black">Author: ${s.registrationFeeAuthor || 499}</span>
                      <span className="block text-slate-700 font-bold">Listener: ${s.registrationFeeListener || 299}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-[#1E40AF]">
                      {s.registrationsCount || 14} Participant(s)
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(s.id, s.status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          s.status === "ACTIVE" || s.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {s.status}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/summits/${s.id}`}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
                          title="Open Summit Console"
                        >
                          <Eye className="w-4 h-4 text-[#1E40AF]" />
                        </Link>
                        <Link
                          href={`/dashboard/admin/summits/edit/${s.id}`}
                          className="p-2 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
                          title="Edit Summit Details & Banner"
                        >
                          <Edit className="w-4 h-4 text-amber-600" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalId(s.id)}
                          className="p-2 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200"
                          title="Delete / Archive Summit"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalId !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-xl space-y-4">
            <h3 className="text-lg font-extrabold text-[#0D1117]">Delete or Archive Summit?</h3>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Are you sure you want to remove this summit? Soft archiving is recommended if participant registrations or paper submissions exist.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
