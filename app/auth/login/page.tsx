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
    <div className="min-h-screen bg-background relative flex items-center justify-center p-6 overflow-hidden">
      
      {/* Background glow decor */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

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
        className="w-full max-w-md glass-panel p-8 rounded-2xl border-t border-accent-gold/30 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-accent-gold/10 rounded-full border border-accent-gold/25 mb-3 text-accent-gold">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white">Welcome Back</h2>
          <p className="text-xs text-gray-500 mt-1">Sign in to your conference portal</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
              Academic Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-sm glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-sm glass-input"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-gray-400">
              <input type="checkbox" className="accent-accent-gold rounded" /> Remember session
            </label>
            <a href="#" className="text-accent-gold hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-accent-gold to-yellow-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-gold/20 transition flex items-center justify-center gap-2"
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

        <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-gray-500">
          New to the platform?{" "}
          <Link href="/auth/register" className="text-accent-cyan hover:underline font-semibold">
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
