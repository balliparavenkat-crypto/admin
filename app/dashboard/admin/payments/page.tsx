"use client";

import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { CreditCard, Search, Download, CheckCircle, RefreshCw } from "lucide-react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([
    {
      id: 9104,
      transactionId: "TXN-881024981",
      user: { firstName: "Rahul", lastName: "Kumar", email: "rahul.kumar@ai.org" },
      conference: { acronym: "DVGS2026" },
      amount: 499.00,
      currency: "USD",
      paymentGateway: "RAZORPAY",
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
    },
    {
      id: 9105,
      transactionId: "TXN-902481029",
      user: { firstName: "Arthur", lastName: "Dent", email: "a.dent@london.edu" },
      conference: { acronym: "DVGS2026" },
      amount: 299.00,
      currency: "USD",
      paymentGateway: "STRIPE",
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
    },
  ]);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Financial Ledger & Payments</h1>
          <p className="text-xs text-slate-400">Track registration payments, transactions, gateway verifications, and receipts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono">Gross Revenue</span>
          <span className="text-2xl font-black text-emerald-400 block mt-1">$6,986.00</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono">Successful Transactions</span>
          <span className="text-2xl font-black text-white block mt-1">14</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono">Refunded Transactions</span>
          <span className="text-2xl font-black text-rose-400 block mt-1">0</span>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Txn ID & Gateway</th>
                <th className="p-4">Payer Details</th>
                <th className="p-4">Summit</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-mono">
                    <span className="font-bold text-accent-cyan block">{p.transactionId}</span>
                    <span className="text-[10px] text-slate-400">{p.paymentGateway}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-white block">{p.user?.firstName} {p.user?.lastName}</span>
                    <span className="text-[11px] text-slate-400">{p.user?.email}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{p.conference?.acronym}</td>
                  <td className="p-4 font-mono font-bold text-emerald-400">${p.amount} {p.currency}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px]">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
