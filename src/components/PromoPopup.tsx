"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, X, ArrowRight, Zap, ShieldCheck } from "lucide-react";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check cooldown in localStorage (1 day)
    const lastDismissed = localStorage.getItem("arifinstore_promo_dismissed");
    if (!lastDismissed || Date.now() - parseInt(lastDismissed, 10) > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("arifinstore_promo_dismissed", Date.now().toString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl overflow-hidden text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Tutup Promo"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROMO SPESIAL HARI INI</span>
        </div>

        {/* Image / Graphic */}
        <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden p-2 bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/25">
          <Image
            src="/assets/logo200x200.png"
            alt="Arifin Store Promo"
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            Flash Sale <span className="text-gradient-neon">Gemini Pro 18 Months</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Dapatkan akses penuh Google AI Gemini Pro 18 Bulan resmi hanya{" "}
            <strong className="text-emerald-400 text-sm">Rp 185.000</strong> (Normal Rp 450.000). Garansi 100% replacement aktif!
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Link
            href="/#digital-section"
            onClick={handleDismiss}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <Zap className="w-4 h-4" />
            <span>Klaim Diskon Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleDismiss}
            className="text-xs text-slate-400 hover:text-slate-200 py-1 font-medium"
          >
            Nanti saja, terima kasih
          </button>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}
