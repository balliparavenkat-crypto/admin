"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare,
  HelpCircle,
  ChevronDown
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [contactContent, setContactContent] = useState<any>({
    phone: "+91 9666896607",
    whatsapp: "+919666896607",
    email: "info@dvglobalsummits.com",
    address: "World Trade Tower, Tech Hub District, India",
    officeHours: "Mon - Fri from 9:00 AM to 6:00 PM IST",
  });

  useEffect(() => {
    const loadContent = () => {
      try {
        const saved = localStorage.getItem("website_content");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.CONTACT) {
            setContactContent((prev: any) => ({ ...prev, ...parsed.CONTACT }));
          }
        }
      } catch {
        // Continue
      }
    };

    loadContent();
    if (typeof window !== "undefined") {
      window.addEventListener("website_content_updated", loadContent);
      window.addEventListener("storage", loadContent);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("website_content_updated", loadContent);
        window.removeEventListener("storage", loadContent);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How can I register as a speaker for an upcoming summit?",
      a: "You can submit your speaker proposal through our Contact Form by selecting 'Speaker Proposal' as the subject, or directly email our Academic Committee at info@dvglobalsummits.com."
    },
    {
      q: "What sponsorship packages are currently available?",
      a: "We offer Platinum, Diamond, Gold, Silver, and Exhibitor tiers. Detailed information is available on our main page under Sponsorship or by reaching out to info@dvglobalsummits.com."
    },
    {
      q: "When will I receive my delegate certificate?",
      a: "E-certificates are issued within 5 business days after the conclusion of the event to registered participants who attended the mandatory sessions."
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "Cancellations made 30 days prior to the event are eligible for a 75% refund. Detailed terms can be found on our Cancellation Policy page."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0D1117] overflow-x-hidden" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* Background ambient glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(6,182,212,0.06)" }} />
      <div className="fixed top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(212,175,55,0.05)" }} />
      <div className="fixed bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(6,182,212,0.04)" }} />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 py-3 px-6 md:px-12 flex justify-between items-center backdrop-blur-md" style={{ background: "rgba(255,255,255,0.95)" }}>
        <Link href="/" className="flex items-center group">
          <img src="/images/logo.png" alt="D&V Global Logo" className="h-20 md:h-24 w-auto object-contain transition duration-300" />
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-4 md:gap-6 text-xs font-bold tracking-wider text-black font-sans">
          <Link href="/" className="hover:text-[#1E40AF] transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-black" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-black" />
          <span className="text-black font-bold">Contact Us</span>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative py-16 md:py-20 px-6 text-center border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.07) 0%, transparent 60%, rgba(212,175,55,0.05) 100%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest mb-3 block" style={{ fontFamily: "monospace", color: "#1E40AF" }}>
            Reach Out To Us
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#0D1117] mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about upcoming summits, registration details, or sponsorship opportunities? Contact our team and we will respond promptly.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-[#1E40AF]">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0D1117] mb-1">Email Us</h3>
            <p className="text-xs text-gray-500 mb-3">Our team is here to help</p>
            <a href={`mailto:${contactContent.email || "info@dvglobalsummits.com"}`} className="text-sm font-bold text-[#1E40AF] hover:underline">
              {contactContent.email || "info@dvglobalsummits.com"}
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4 text-amber-600">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0D1117] mb-1">Call Us</h3>
            <p className="text-xs text-gray-500 mb-3">{contactContent.officeHours || "Mon - Fri from 9am to 6pm IST"}</p>
            <a href={`tel:${contactContent.phone || "+919666896607"}`} className="text-sm font-bold text-[#0D1117] hover:text-[#1E40AF]">
              {contactContent.phone || "+91 9666896607"}
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-4 text-cyan-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0D1117] mb-1">Headquarters</h3>
            <p className="text-xs text-gray-500 mb-3">D&V SUMMITS PVT LTD</p>
            <span className="text-sm font-semibold text-gray-700">
              {contactContent.address || "World Trade Tower, Tech Hub District, India"}
            </span>
          </div>
        </div>

        {/* Contact Form & Office Hours Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Form Container */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-lg relative">
            <h2 className="text-2xl font-black text-[#0D1117] mb-2 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-[#1E40AF]" /> Send a Message
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out the form below and our delegate support team will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center my-6">
                <CheckCircle className="w-14 h-14 text-emerald-600 mb-3 animate-bounce" />
                <h3 className="text-xl font-bold text-emerald-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-700 max-w-md">
                  Thank you for reaching out to D&V Global Summits. A confirmation email has been dispatched to <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                  }}
                  className="mt-6 px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-full hover:bg-emerald-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subject *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF] bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Sponsorship Support">Sponsorship Support</option>
                      <option value="Speaker Proposal">Speaker Proposal</option>
                      <option value="Registration Support">Registration Support</option>
                      <option value="Media & Press">Media & Press</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message or inquiry details here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#1E40AF] to-[#1D4ED8] text-white font-black text-sm rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition duration-300 flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Side Info & Operating Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#0B1E3D] to-[#050b1a] text-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-xl font-bold text-[#E5C158] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Operating Hours
              </h3>
              
              <div className="space-y-3 text-xs text-slate-300 font-sans border-b border-slate-700 pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Monday - Friday</span>
                  <span className="text-amber-400 font-mono">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Saturday</span>
                  <span className="text-amber-400 font-mono">10:00 AM - 2:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Sunday</span>
                  <span className="text-slate-400">Closed</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="font-bold text-white uppercase tracking-wider">Conference Management Desk:</div>
                <p className="text-slate-300 leading-relaxed">
                  D&V SUMMITS PVT LTD coordinates international scientific summits, keynote panels, and research publications worldwide.
                </p>
              </div>
            </div>

            {/* Quick Support Badge Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 flex-shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0D1117]">Need Urgent Assistance?</h4>
                <p className="text-xs text-gray-500">
                  For immediate registration queries, email us at <a href="mailto:info@dvglobalsummits.com" className="text-[#1E40AF] font-bold">info@dvglobalsummits.com</a>.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#1E40AF] block mb-2 font-mono">
              Got Questions?
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0D1117]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm text-[#0D1117]">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === index && (
                  <div className="p-5 pt-0 text-xs text-gray-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-6 text-center text-xs text-gray-500 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            &copy; {new Date().getFullYear()} D&V SUMMITS PVT LTD. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <Link href="/" className="hover:text-[#1E40AF] transition">Home</Link>
            <Link href="/policies" className="hover:text-[#1E40AF] transition">Policies</Link>
            <Link href="/cancellation-policy" className="hover:text-[#1E40AF] transition">Cancellation Policy</Link>
            <Link href="/terms-of-use" className="hover:text-[#1E40AF] transition">Terms of Use</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
