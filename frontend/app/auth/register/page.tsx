"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lock, Mail, ArrowLeft, Loader, User, Building, Globe, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("AUTHOR");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        institution,
        country,
        phone,
        role,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data || "Registration failed. Verify input parameters.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "AUTHOR", label: "Author (Submit Papers)" },
    { value: "REVIEWER", label: "Peer Reviewer" },
    { value: "SPEAKER", label: "Speaker" },
    { value: "LISTENER", label: "Delegate / Listener" },
    { value: "ORGANIZER", label: "Summit Organizer" },
  ];

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-6 overflow-hidden">
      
      {/* Background glow decor */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Header */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-panel p-8 rounded-2xl border-t border-accent-gold/30 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-accent-gold/10 rounded-full border border-accent-gold/25 mb-3 text-accent-gold">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white">Create Account</h2>
          <p className="text-xs text-gray-500 mt-1">Join the D&V Global Summit network</p>
        </div>

        {success ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-center font-medium">
            Account created successfully! Redirecting to login...
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs glass-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs glass-input"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                  Academic / Pro Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@university.edu"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                    Institution
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="Stanford Univ"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs glass-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                    Country
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United States"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs glass-input"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs glass-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1.5">
                    Registration Type
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-accent-gold transition"
                  >
                    {roles.map((r) => (
                      <option key={r.value} value={r.value} className="bg-surface text-white">
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-accent-gold to-yellow-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-gold/20 transition flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" /> Provisioning Profile...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </>
        )}

        <div className="mt-6 border-t border-white/5 pt-4 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent-cyan hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
