"use client";

import React, { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import {
  FileSearch,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden relative my-6">
        {/* Navy Header */}
        <div className="bg-[#35508d] px-6 py-4 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-blue-200 uppercase">
              Tracking Transaksi
            </span>
            <h2 className="text-lg font-bold">
              Cek Status Pesanan Anda
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

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-500">
            Masukkan Nomor Invoice (misal: <strong>ARF-20260930-8912</strong>) atau Nomor WhatsApp transaksi
          </p>

          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: ARF-20260930-8912 atau 083183787697"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:border-[#0066cc]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Cari Status Transaksi</span>
            </button>
          </form>

          {searched && (
            <div className="pt-2">
              {result ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-600">{result.invoice}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      BERHASIL / SUKSES
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Layanan:</span>
                      <span className="font-bold text-slate-900">{result.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nomor Tujuan:</span>
                      <span className="font-mono text-[#0066cc] font-semibold">{result.target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Nominal:</span>
                      <span className="font-mono font-bold text-emerald-600">{formatRupiah(result.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Waktu Transaksi:</span>
                      <span className="text-slate-700">{result.date}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-500">No. Seri Provider:</span>
                      <span className="font-mono text-slate-700">{result.sn}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1">
                  <AlertCircle className="w-5 h-5 text-rose-500 mx-auto" />
                  <p className="text-xs text-rose-800 font-bold">
                    Pesanan tidak ditemukan
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Pastikan nomor invoice atau nomor WhatsApp sudah tepat, atau konfirmasi dengan CS kami.
                  </p>
                  <a
                    href={`${STORE_INFO.whatsappUrl}?text=Halo%20Admin,%20tolong%20bantu%20cek%20pesanan%20saya%20${query}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold hover:underline pt-1"
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
    </div>
  );
}
