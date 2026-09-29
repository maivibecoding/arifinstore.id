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
  AlertTriangle,
  CheckCircle2,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white max-w-4xl w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden relative my-6">
        {/* Navy Header */}
        <div className="bg-[#35508d] px-6 py-4 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-blue-200 uppercase">
              Admin Back-Office
            </span>
            <h2 className="text-lg font-bold">
              Arifin Store Dashboard Monitoring
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Live Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Sekalipay Balance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">Saldo Sekalipay (E-Money)</span>
                <Wallet className="w-4 h-4 text-[#0066cc]" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {formatRupiah(sekalipayBalance)}
              </div>
              <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Cukup untuk $\pm$ 75 Transaksi</span>
              </p>
            </div>

            {/* ProdSeller Balance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">Saldo ProdSeller (USDT)</span>
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-xl font-black text-slate-900">
                ${prodsellerBalance.toFixed(2)} USDT
              </div>
              <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>7 Produk Digital Siap Terbit</span>
              </p>
            </div>

            {/* Omset Hari Ini */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">Omset Transaksi Hari Ini</span>
                <Layers className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-black text-emerald-600">
                Rp 1.485.500
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Success Rate: 100% (Normal)
              </p>
            </div>
          </div>

          {/* Anti-Collision QRIS Queue Monitor (> 400rb) */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Monitor Antrean Kode Unik QRIS Dinamis (&gt; Rp 400.000)
              </h3>
              <span className="text-[11px] text-amber-700">TTL: 15 Menit</span>
            </div>

            {activeQrisQueue.length > 0 ? (
              <div className="divide-y divide-amber-200 text-xs">
                {activeQrisQueue.map((item, idx) => (
                  <div key={idx} className="py-1.5 flex items-center justify-between">
                    <span className="font-mono text-slate-800 font-bold">
                      Nominal: {formatRupiah(item.nominal)}
                    </span>
                    <span className="text-slate-500 font-mono">Inv: {item.invoice}</span>
                    <span className="text-amber-700 font-semibold">
                      Expired in {item.expiresInSeconds}s
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-amber-700">
                Tidak ada antrean bentrok saat ini. Generator kode unik siap mengalokasikan 400.001, 400.002, dst secara atomik.
              </p>
            )}
          </div>

          {/* Live Transaction Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Log Transaksi Terakhir (Live Feed)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="p-2.5">Invoice</th>
                    <th className="p-2.5">Produk</th>
                    <th className="p-2.5">Provider</th>
                    <th className="p-2.5">Gateway</th>
                    <th className="p-2.5">Nominal</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockTransactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-2.5 font-mono text-[#0066cc] font-semibold">{tx.invoice}</td>
                      <td className="p-2.5 font-medium text-slate-800">{tx.type}</td>
                      <td className="p-2.5 text-slate-500">{tx.provider}</td>
                      <td className="p-2.5 text-slate-600">{tx.gateway}</td>
                      <td className="p-2.5 font-mono font-bold text-emerald-600">
                        {formatRupiah(tx.nominal)}
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#35508d] hover:bg-[#273b68]"
            >
              Tutup Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
