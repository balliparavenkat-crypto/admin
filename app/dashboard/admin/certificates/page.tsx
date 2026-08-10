"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Plus, CheckCircle, ExternalLink, X, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([
    {
      id: 1,
      certificateCode: "CERT-DV-881024",
      recipientName: "Rahul Kumar",
      certificateType: "PRESENTATION",
      conferenceTitle: "D&V Global Summit 2026",
      issueDate: "2026-08-05",
      verificationHash: "4b9f2910-384e-4f10-b91a-9824f1029481",
    },
    {
      id: 2,
      certificateCode: "CERT-DV-881025",
      recipientName: "Dr. Sarah Connor",
      certificateType: "SPEAKER",
      conferenceTitle: "D&V Global Summit 2026",
      issueDate: "2026-08-06",
      verificationHash: "7a8b9c10-1234-5678-90ab-cdef12345678",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    recipientName: "",
    certificateType: "PRESENTATION",
    conferenceTitle: "D&V Global Summit 2026",
  });

  const handleOpenCreate = () => {
    setEditingCert(null);
    setFormData({ recipientName: "", certificateType: "PRESENTATION", conferenceTitle: "D&V Global Summit 2026" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: any) => {
    setEditingCert(cert);
    setFormData({
      recipientName: cert.recipientName,
      certificateType: cert.certificateType,
      conferenceTitle: cert.conferenceTitle,
    });
    setIsModalOpen(true);
  };

  const handleDeleteCert = (id: number) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCert) {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === editingCert.id
            ? { ...c, recipientName: formData.recipientName, certificateType: formData.certificateType, conferenceTitle: formData.conferenceTitle }
            : c
        )
      );
    } else {
      const randomCode = `CERT-DV-${Math.floor(100000 + Math.random() * 900000)}`;
      const newObj = {
        id: Date.now(),
        certificateCode: randomCode,
        recipientName: formData.recipientName,
        certificateType: formData.certificateType,
        conferenceTitle: formData.conferenceTitle,
        issueDate: new Date().toISOString().substring(0, 10),
        verificationHash: `${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}`,
      };
      setCertificates([newObj, ...certificates]);
    }
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Certificate Engine & Verification</h1>
          <p className="text-xs text-slate-700 font-medium">Issue, generate, edit, and verify participation and presentation certificates</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/verify-certificate"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 border border-slate-300"
          >
            <ExternalLink className="w-4 h-4 text-[#1E40AF]" /> Public Verification Tool
          </Link>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Issue Certificate
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-800 font-mono text-[11px] uppercase tracking-wider border-b border-slate-300 font-extrabold">
              <tr>
                <th className="p-4">Certificate Code</th>
                <th className="p-4">Recipient Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Conference</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-900 font-medium">
              {certificates.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#1E40AF]">{c.certificateCode}</td>
                  <td className="p-4 font-bold text-[#0D1117]">{c.recipientName}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-mono font-bold text-[10px] uppercase border border-amber-300">
                      {c.certificateType}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-800 font-bold">{c.conferenceTitle}</td>
                  <td className="p-4 font-mono text-slate-700 font-bold">{c.issueDate}</td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/verify-certificate?code=${c.verificationHash}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 inline-block border border-slate-200"
                      title="Verify Certificate"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </Link>
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                      title="Edit Certificate"
                    >
                      <Edit className="w-4 h-4 text-amber-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteCert(c.id)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
                      title="Delete Certificate"
                    >
                      <Trash2 className="w-4 h-4 text-rose-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue / Edit Certificate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-white border border-[#1E40AF]/20 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-[#0D1117]">
                {editingCert ? "Edit Certificate Details" : "Issue Certificate of Achievement"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCertificate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Recipient Name *</label>
                <input
                  type="text"
                  required
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  placeholder="e.g. Prof. Arthur Dent"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#1E40AF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Certificate Type</label>
                <select
                  value={formData.certificateType}
                  onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#1E40AF]"
                >
                  <option value="PRESENTATION">PRESENTATION CERTIFICATE</option>
                  <option value="PARTICIPATION">PARTICIPATION CERTIFICATE</option>
                  <option value="SPEAKER">KEYNOTE SPEAKER CERTIFICATE</option>
                  <option value="BEST_PAPER">BEST PAPER AWARD</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Summit Title</label>
                <input
                  type="text"
                  value={formData.conferenceTitle}
                  onChange={(e) => setFormData({ ...formData, conferenceTitle: e.target.value })}
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
                  {editingCert ? "Save Updates" : "Generate & Issue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
