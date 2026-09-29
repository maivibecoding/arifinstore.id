"use client";

import React, { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import { qrisSequencer } from "@/lib/qris";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Layers,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboardModal({
  isOpen,
  onClose,
}: AdminDashboardModalProps) {
  const [sekalipayBalance] = useState(3850000);
  const [prodsellerBalance] = useState(148.5); // USDT

  if (!isOpen) return null;

  const activeQrisQueue = qrisSequencer.getActiveQueue();

  const mockTransactions = [
    {
      invoice: "ARF-20260930-8912",
      type: "Top-Up DANA 50.000",
      provider: "Sekalipay (BBSD)",
      gateway: "IndoApi",
      nominal: 50500,
      status: "SUCCESS",
      time: "01:15 WIB",
    },
    {
      invoice: "ARF-20260930-7731",
      type: "Gemini Pro 18Months",
      provider: "ProdSeller",
      gateway: "IndoApi",
      nominal: 185000,
      status: "SUCCESS",
      time: "00:52 WIB",
    },
    {
      invoice: "ARF-20260930-5501",
      type: "Top-Up E-Money Jumbo",
      provider: "Sekalipay (BBSSH002)",
      gateway: "QRIS Dinamis (+1 Anti-Collision)",
      nominal: 400001,
      status: "SUCCESS",
      time: "Kemarin",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="glass-panel max-w-4xl w-full p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-6 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 mb-1">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin Back-Office Portal
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Arifin Store Dashboard Monitoring
            </h2>
            <p className="text-xs text-slate-400">
              Pantau saldo deposit provider, antrean QRIS Dinamis, dan mutasi penjualan real-time
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 self-start sm:self-auto">
            ● Server Online & Terhubung
          </span>
        </div>

        {/* 1. Live Provider Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Sekalipay Balance */}
          <div className="p-4 rounded-2xl glass-card border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Saldo Sekalipay (E-Money)</span>
              <Wallet className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-black text-white">
              {formatRupiah(sekalipayBalance)}
            </div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Cukup untuk $\pm$ 75 Transaksi</span>
            </p>
          </div>

          {/* ProdSeller Balance */}
          <div className="p-4 rounded-2xl glass-card border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Saldo ProdSeller (USDT)</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-black text-white">
              ${prodsellerBalance.toFixed(2)} USDT
            </div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>7 Produk Digital Siap Terbit</span>
            </p>
          </div>

          {/* Omset Hari Ini */}
          <div className="p-4 rounded-2xl glass-card border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Omset Transaksi Hari Ini</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400">
              Rp 1.485.500
            </div>
            <p className="text-[11px] text-indigo-300">
              Success Rate: 100% (Tanpa Kendala)
            </p>
          </div>
        </div>

        {/* 2. Anti-Collision QRIS Queue Monitor (> 400rb) */}
        <div className="p-5 rounded-2xl glass-card space-y-3 border-amber-500/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Monitor Antrean Kode Unik QRIS Dinamis (&gt; Rp 400.000)
            </h3>
            <span className="text-xs text-slate-400">
              TTL Aktif: 15 Menit
            </span>
          </div>

          {activeQrisQueue.length > 0 ? (
            <div className="divide-y divide-white/5 text-xs">
              {activeQrisQueue.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between">
                  <span className="font-mono text-white">
                    Nominal Aktif: <strong>{formatRupiah(item.nominal)}</strong>
                  </span>
                  <span className="text-slate-400 font-mono">Inv: {item.invoice}</span>
                  <span className="text-amber-300 font-semibold">
                    Kedaluwarsa dalam {item.expiresInSeconds}s
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">
              Tidak ada antrean bentrok saat ini. Generator kode unik siap mengalokasikan 400.001, 400.002, dst secara atomik.
            </p>
          )}
        </div>

        {/* 3. Live Transaction Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white">
            Log Transaksi Terakhir (Live Feed)
          </h3>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-slate-400">
                <tr>
                  <th className="p-3">Invoice</th>
                  <th className="p-3">Produk</th>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Gateway</th>
                  <th className="p-3">Nominal</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockTransactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="p-3 font-mono text-indigo-300">{tx.invoice}</td>
                    <td className="p-3 font-medium text-white">{tx.type}</td>
                    <td className="p-3 text-slate-400">{tx.provider}</td>
                    <td className="p-3 text-slate-300">{tx.gateway}</td>
                    <td className="p-3 font-mono font-bold text-emerald-400">
                      {formatRupiah(tx.nominal)}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500"
          >
            Tutup Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
