"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronRight, Upload, CheckCircle, FileText, BookOpen, AlertCircle, Send } from "lucide-react";

export default function SubmitAbstractPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    universityName: "",
    countryName: "",
    email: "",
    mobileNumber: "",
    presentationType: "",
    topicOfInterest: "",
    abstractTitle: "",
    fileName: "",
    agreedTerms: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.abstractTitle) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    if (!formData.agreedTerms) {
      alert("Please accept the proceedings and terms & conditions checkbox.");
      return;
    }
    setSubmitted(true);
  };

  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0D1117] placeholder-slate-400 focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 transition font-medium";
  const labelCls = "block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1117] font-sans selection:bg-[#1E40AF]/20">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 py-4 px-6 md:px-12 flex justify-between items-center bg-[#F8FAFC]/95 backdrop-blur-md">
        <Link href="/" className="flex items-center group">
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-16 md:h-20 w-auto object-contain transition duration-300" />
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Link href="/" className="hover:text-[#1E40AF] transition flex items-center gap-1.5 text-slate-900 font-bold">
            <Home className="w-4 h-4 text-slate-900" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
          <span className="text-slate-900 font-bold">Submit Abstract</span>
        </div>
      </nav>

      {/* ── Header Banner ──────────────────────────────────────────────────── */}
      <div className="relative py-14 px-6 text-center border-b border-slate-200 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#1E40AF] block font-mono">CALL FOR PAPERS & RESEARCH</span>
          <h1 className="font-extrabold text-3xl md:text-5xl text-[#0D1117] tracking-tight">
            Submit Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] via-blue-600 to-amber-500">Abstract</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
            Submit your research work for peer review and publication in official summit proceedings.
          </p>
        </div>
      </div>

      {/* ── Main Layout ────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {submitted ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <span className="px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                SUBMISSION RECEIVED
              </span>
              <h2 className="text-3xl font-extrabold text-[#0D1117] pt-2">Abstract Submitted Successfully!</h2>
              <p className="text-slate-600 text-xs max-w-md mx-auto">
                Thank you, <span className="font-bold text-[#1E40AF]">{formData.title} {formData.firstName} {formData.lastName}</span>. Your abstract has been registered for peer review.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left text-xs font-mono space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">Abstract Title:</span><span className="font-bold text-[#0D1117]">{formData.abstractTitle}</span></div>
              <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">Presentation Type:</span><span className="font-bold text-[#1E40AF]">{formData.presentationType || "Oral Presentation"}</span></div>
              <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">University / Org:</span><span className="font-bold text-slate-800">{formData.universityName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Author Email:</span><span className="font-bold text-slate-800">{formData.email}</span></div>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Submit Another Abstract
              </button>
              <Link
                href="/register"
                className="px-8 py-3 bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2"
              >
                Proceed to Registration <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Personal Info</h2>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">* Required</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title, First Name, Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelCls}>Title</label>
                    <select
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">Select</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* University Name & Country Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>University Name</label>
                    <input
                      type="text"
                      placeholder="Enter your University Name"
                      value={formData.universityName}
                      onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Country Name</label>
                    <input
                      type="text"
                      placeholder="Enter your Country Name"
                      value={formData.countryName}
                      onChange={(e) => setFormData({ ...formData, countryName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Email & Mobile Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="Enter your Mobile Number"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Presentation Type & Topic of Interest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Presentation Type</label>
                    <select
                      value={formData.presentationType}
                      onChange={(e) => setFormData({ ...formData, presentationType: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">Presentation Type</option>
                      <option value="Oral Presentation">Oral Presentation</option>
                      <option value="Poster Presentation">Poster Presentation</option>
                      <option value="Virtual Presentation">Virtual Presentation</option>
                      <option value="Keynote Presentation">Keynote Presentation</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Topic of Interest</label>
                    <select
                      value={formData.topicOfInterest}
                      onChange={(e) => setFormData({ ...formData, topicOfInterest: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">Select Topic of Interest</option>
                      <option value="Artificial Intelligence & Robotics">Artificial Intelligence & Robotics</option>
                      <option value="Biomedicine & Healthcare">Biomedicine & Healthcare</option>
                      <option value="Clean Energy & Sustainability">Clean Energy & Sustainability</option>
                      <option value="Quantum Computing & Physics">Quantum Computing & Physics</option>
                    </select>
                  </div>
                </div>

                {/* Title of the Abstract */}
                <div>
                  <label className={labelCls}>Title of the Abstract <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your Title of the Abstract"
                    value={formData.abstractTitle}
                    onChange={(e) => setFormData({ ...formData, abstractTitle: e.target.value })}
                    className={inputCls}
                  />
                </div>

                {/* Upload Doc */}
                <div>
                  <label className={labelCls}>Upload Doc</label>
                  <div className="flex items-center gap-3">
                    <label className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl border border-slate-300 cursor-pointer flex items-center gap-2 transition">
                      <Upload className="w-4 h-4 text-[#1E40AF]" /> Choose File
                      <input type="file" onChange={handleFileChange} accept=".doc,.docx,.pdf" className="hidden" />
                    </label>
                    <span className="text-xs text-slate-500 font-mono">
                      {formData.fileName || "No file chosen"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Accepted formats: .doc, .docx, .pdf (Max size 10MB)</p>
                </div>

                {/* Terms Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={formData.agreedTerms}
                      onChange={(e) => setFormData({ ...formData, agreedTerms: e.target.checked })}
                      className="mt-0.5 w-4 h-4 text-[#1E40AF] rounded border-slate-300 focus:ring-[#1E40AF]"
                    />
                    <span>
                      If accepted, I permit my abstract to be included in the proceedings and conference website. <Link href="/policies" className="text-[#1E40AF] font-bold underline">Terms and Conditions</Link>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-[#1E40AF] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Submit Abstract
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Submission Guidelines (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-[#0D1117] tracking-tight flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-[#1E40AF]" /> Submission Guidelines
                  </h2>
                </div>

                <div className="space-y-6 text-slate-700 text-xs leading-relaxed">
                  {/* Guideline 1 */}
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-[#0D1117]">1. Word Count or Length</h3>
                    <p className="text-slate-600 font-medium">
                      <span className="font-bold text-[#0D1117]">Word limit:</span> Abstracts are usually between 150–300 words. Be sure to check the exact word limit for the specific conference.
                    </p>
                  </div>

                  {/* Guideline 2 */}
                  <div className="space-y-3">
                    <h3 className="text-base font-extrabold text-[#0D1117]">2. Content and Structure</h3>
                    <ul className="space-y-3 list-disc pl-4 text-slate-600">
                      <li>
                        <strong className="text-[#0D1117]">Title:</strong> Your abstract should begin with a concise and descriptive title of your research. The title should clearly convey the focus of your work.
                      </li>
                      <li>
                        <strong className="text-[#0D1117]">Background or Introduction:</strong> Briefly describe the problem or research question your study addresses. This section should set the context for your work.
                      </li>
                      <li>
                        <strong className="text-[#0D1117]">Objectives or Aims:</strong> State the objectives of your study. What was the primary purpose or hypothesis of your research?
                      </li>
                      <li>
                        <strong className="text-[#0D1117]">Methods:</strong> Provide a short description of the methods or approaches you used for the study (e.g., experimental, observational).
                      </li>
                      <li>
                        <strong className="text-[#0D1117]">Results / Findings:</strong> Summarize the main findings or data collected during your research.
                      </li>
                      <li>
                        <strong className="text-[#0D1117]">Conclusion:</strong> State the main conclusions drawn from your research and their significance.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs space-y-1">
                    <div className="font-extrabold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" /> Important Note:
                    </div>
                    <p className="text-[11px] text-amber-800">
                      All submitted abstracts undergo double-blind peer review by our international scientific committee. Notification of acceptance will be sent via email within 5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
