"use client";

import React, { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import {
  FileSearch,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { STORE_INFO } from "@/lib/constants";

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderTrackerModal({
  isOpen,
  onClose,
}: OrderTrackerModalProps) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setSearched(true);

    // Mock search result
    if (query.toUpperCase().includes("ARF-") || query.startsWith("08")) {
      setResult({
        invoice: query.toUpperCase().includes("ARF-") ? query.toUpperCase() : "ARF-20260930-8912",
        type: "Top-Up DANA 50.000",
        target: "083183787697",
        amount: 50500,
        status: "SUCCESS",
        date: "30 September 2026, 01:15 WIB",
        sn: "SN202609309918230912",
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2"
        >
          ✕
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-sky-300 bg-sky-500/10 border border-sky-500/20 mb-2">
            <FileSearch className="w-3.5 h-3.5" />
            Lacak Status Pesanan
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Cek Pesanan Anda
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Masukkan Nomor Invoice (misal: <strong>ARF-20260930-8912</strong>) atau Nomor WhatsApp
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh: ARF-20260930-8912 atau 083183787697"
              className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-xs sm:text-sm font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Cari Transaksi</span>
          </button>
        </form>

        {searched && (
          <div className="pt-2">
            {result ? (
              <div className="p-4 rounded-2xl glass-card border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{result.invoice}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    BERHASIL / SUKSES
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Layanan:</span>
                    <span className="font-bold text-white">{result.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nomor Tujuan:</span>
                    <span className="font-mono text-indigo-300">{result.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Nominal:</span>
                    <span className="font-mono font-bold text-emerald-400">{formatRupiah(result.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Waktu Transaksi:</span>
                    <span className="text-slate-300">{result.date}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/5">
                    <span className="text-slate-400">No. Seri Provider:</span>
                    <span className="font-mono text-slate-300">{result.sn}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-1.5">
                <AlertCircle className="w-6 h-6 text-rose-400 mx-auto" />
                <p className="text-xs text-rose-300 font-semibold">
                  Pesanan tidak ditemukan
                </p>
                <p className="text-[11px] text-slate-400">
                  Pastikan format nomor invoice atau nomor WhatsApp sudah tepat, atau hubungi CS kami.
                </p>
                <a
                  href={`${STORE_INFO.whatsappUrl}?text=Halo%20Admin,%20tolong%20bantu%20cek%20pesanan%20saya%20${query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold hover:underline pt-1"
                >
                  <span>Tanya CS WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
