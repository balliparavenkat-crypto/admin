"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lock, Mail, ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, email: userEmail, firstName, lastName, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email: userEmail, firstName, lastName, roles }));

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative flex items-center justify-center p-6 overflow-hidden">
      
      {/* Background glow decor */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Header */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1E40AF] transition font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-blue-50 rounded-full border border-blue-100 mb-3 text-[#1E40AF]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[#0D1117]">Welcome Back</h2>
          <p className="text-xs text-gray-500 mt-1">Sign in to your conference portal</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-600 text-xs rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-2">
              Academic Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-sm bg-slate-50 border border-slate-200 text-[#0D1117] placeholder-gray-400 focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]/30 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-sm bg-slate-50 border border-slate-200 text-[#0D1117] placeholder-gray-400 focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]/30 transition"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 font-semibold">
              <input type="checkbox" className="accent-[#1E40AF] rounded" /> Remember session
            </label>
            <a href="#" className="text-[#1E40AF] hover:underline font-semibold">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/10 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" /> Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-gray-500">
          New to the platform?{" "}
          <Link href="/auth/register" className="text-[#1E40AF] hover:underline font-bold">
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
