"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { CreditCard, Search, Download, CheckCircle, RefreshCw, Settings, ShieldCheck, Key, Lock, Globe } from "lucide-react";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<"transactions" | "gateways">("transactions");
  
  // Ledger State
  const [payments, setPayments] = useState<any[]>([]);

  // Gateway Configurations State
  const [gatewayConfig, setGatewayConfig] = useState({
    razorpay: {
      enabled: true,
      mode: "TEST", // TEST or LIVE
      keyId: "rzp_test_901840291048",
      keySecret: "sec_razorpay_test_9918204",
      merchantName: "D&V Global Summits India",
      currency: "INR",
    },
    paypal: {
      enabled: true,
      mode: "SANDBOX", // SANDBOX or LIVE
      clientId: "sb-client-id-dvglobal-paypal-9910481",
      clientSecret: "sb-secret-paypal-key-881024",
      currency: "USD",
    },
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // 1. Load Gateway Configs
    try {
      const savedConfig = localStorage.getItem("payment_gateway_config");
      if (savedConfig) {
        setGatewayConfig(JSON.parse(savedConfig));
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Load Registration Payments Ledger
    try {
      const savedPayments = localStorage.getItem("registration_payments");
      if (savedPayments) {
        setPayments(JSON.parse(savedPayments));
      } else {
        const defaultPayments = [
          {
            id: 9104,
            transactionId: "pay_Rzp881024981",
            user: { firstName: "Rahul", lastName: "Kumar", email: "rahul.kumar@ai.org" },
            conference: { acronym: "DVGS2026" },
            amount: 49900.00,
            currency: "INR",
            paymentGateway: "RAZORPAY",
            status: "SUCCESS",
            createdAt: new Date().toISOString().substring(0, 10),
          },
          {
            id: 9105,
            transactionId: "PAYPAL-CAP-902481029",
            user: { firstName: "Arthur", lastName: "Dent", email: "a.dent@london.edu" },
            conference: { acronym: "DVGS2026" },
            amount: 699.00,
            currency: "USD",
            paymentGateway: "PAYPAL",
            status: "SUCCESS",
            createdAt: new Date().toISOString().substring(0, 10),
          },
        ];
        setPayments(defaultPayments);
        localStorage.setItem("registration_payments", JSON.stringify(defaultPayments));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveConfigs = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("payment_gateway_config", JSON.stringify(gatewayConfig));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1117] tracking-tight">Financial Ledger & Payment Gateways</h1>
          <p className="text-xs text-slate-700 font-medium">Configure Razorpay for Indian registrations & PayPal for International delegates</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-300 w-fit">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "transactions"
                ? "bg-[#1E40AF] text-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Transactions Ledger
          </button>
          <button
            onClick={() => setActiveTab("gateways")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "gateways"
                ? "bg-[#1E40AF] text-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <Settings className="w-3.5 h-3.5" /> Gateway Settings
          </button>
        </div>
      </div>

      {activeTab === "transactions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Gross Revenue (INR / USD)</span>
              <span className="text-2xl font-black text-emerald-800 block mt-1">₹ 4,99,000 / $ 6,986</span>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Active Payment Gateways</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">RAZORPAY</span>
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold text-[10px]">PAYPAL</span>
              </div>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-[#1E40AF]/15 shadow-sm space-y-1">
              <span className="text-[11px] text-slate-700 font-bold font-mono uppercase tracking-wider">Successful Transactions</span>
              <span className="text-2xl font-black text-[#0D1117] block mt-1">{payments.length} Verified</span>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-[#1E40AF]/15 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-800 font-mono text-[11px] uppercase tracking-wider border-b border-slate-300 font-extrabold">
                  <tr>
                    <th className="p-4">Txn ID & Gateway</th>
                    <th className="p-4">Payer Details</th>
                    <th className="p-4">Summit</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-900 font-medium">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono">
                        <span className="font-bold text-[#1E40AF] block">{p.transactionId}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded w-fit inline-block mt-0.5 ${
                          p.paymentGateway === "RAZORPAY" ? "bg-blue-50 text-blue-800 border border-blue-200" : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}>
                          {p.paymentGateway}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-[#0D1117] block">{p.user?.firstName} {p.user?.lastName}</span>
                        <span className="text-[11px] text-slate-600 font-mono font-bold">{p.user?.email}</span>
                      </td>
                      <td className="p-4 font-mono text-slate-800 font-bold">{p.conference?.acronym || "DVGS2026"}</td>
                      <td className="p-4 font-mono font-black text-emerald-800">
                        {p.currency === "INR" ? `₹ ${p.amount.toLocaleString()}` : `$ ${p.amount}`} {p.currency}
                      </td>
                      <td className="p-4 font-mono text-slate-600 font-bold">{p.createdAt}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono font-bold text-[10px] uppercase">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Gateway Configurations Tab */}
      {activeTab === "gateways" && (
        <form onSubmit={handleSaveConfigs} className="space-y-6">
          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700" /> Payment Gateway Settings saved successfully!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Razorpay Configuration for Indian Registrations */}
            <div className="p-6 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono font-black text-xs">RAZORPAY</span>
                  <h3 className="text-base font-extrabold text-[#0D1117]">Indian Registrations (INR ₹)</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gatewayConfig.razorpay.enabled}
                    onChange={(e) =>
                      setGatewayConfig({
                        ...gatewayConfig,
                        razorpay: { ...gatewayConfig.razorpay, enabled: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Environment Mode</label>
                <select
                  value={gatewayConfig.razorpay.mode}
                  onChange={(e) =>
                    setGatewayConfig({
                      ...gatewayConfig,
                      razorpay: { ...gatewayConfig.razorpay, mode: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                >
                  <option value="TEST">TEST / SANDBOX MODE</option>
                  <option value="LIVE">LIVE PRODUCTION MODE</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Razorpay Key ID *</label>
                <input
                  type="text"
                  required
                  value={gatewayConfig.razorpay.keyId}
                  onChange={(e) =>
                    setGatewayConfig({
                      ...gatewayConfig,
                      razorpay: { ...gatewayConfig.razorpay, keyId: e.target.value },
                    })
                  }
                  placeholder="rzp_test_..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Razorpay Key Secret *</label>
                <input
                  type="password"
                  required
                  value={gatewayConfig.razorpay.keySecret}
                  onChange={(e) =>
                    setGatewayConfig({
                      ...gatewayConfig,
                      razorpay: { ...gatewayConfig.razorpay, keySecret: e.target.value },
                    })
                  }
                  placeholder="••••••••••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* PayPal Configuration for International Registrations */}
            <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-mono font-black text-xs">PAYPAL</span>
                  <h3 className="text-base font-extrabold text-[#0D1117]">International Registrations (USD $)</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gatewayConfig.paypal.enabled}
                    onChange={(e) =>
                      setGatewayConfig({
                        ...gatewayConfig,
                        paypal: { ...gatewayConfig.paypal, enabled: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">Environment Mode</label>
                <select
                  value={gatewayConfig.paypal.mode}
                  onChange={(e) =>
                    setGatewayConfig({
                      ...gatewayConfig,
                      paypal: { ...gatewayConfig.paypal, mode: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                >
                  <option value="SANDBOX">SANDBOX MODE</option>
                  <option value="LIVE">LIVE PRODUCTION MODE</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">PayPal Client ID *</label>
                <input
                  type="text"
                  required
                  value={gatewayConfig.paypal.clientId}
                  onChange={(e) =>
                    setGatewayConfig({
                      ...gatewayConfig,
                      paypal: { ...gatewayConfig.paypal, clientId: e.target.value },
                    })
                  }
                  placeholder="sb-client-id-..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1117] block mb-1">PayPal Client Secret *</label>
                <input
                  type="password"
                  required
                  value={gatewayConfig.paypal.clientSecret}
                  onChange={(e) =>
                    setGatewayConfig({
                      ...gatewayConfig,
                      paypal: { ...gatewayConfig.paypal, clientSecret: e.target.value },
                    })
                  }
                  placeholder="••••••••••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md hover:scale-[1.02] transition-transform"
            >
              Save Payment Gateway Configurations
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
