"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, X, ArrowRight, Zap } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative bg-white max-w-sm w-full p-6 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden text-center space-y-3.5">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Tutup Promo"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>PROMO SPESIAL HARI INI</span>
        </div>

        {/* Image / Graphic */}
        <div className="relative w-16 h-16 mx-auto rounded-xl overflow-hidden p-1.5 bg-[#35508d] shadow-sm">
          <Image
            src="/assets/logo200x200.png"
            alt="Arifin Store Promo"
            fill
            className="object-contain p-1 brightness-0 invert"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 leading-tight">
            Flash Sale <span className="text-[#0066cc]">Gemini Pro 18 Months</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dapatkan akses penuh Google AI Gemini Pro 18 Bulan resmi hanya{" "}
            <strong className="text-emerald-600 text-sm">Rp 185.000</strong> (Normal Rp 450.000). Garansi 100% replacement aktif!
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Link
            href="/#digital-section"
            onClick={handleDismiss}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] shadow-sm flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02]"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Klaim Diskon Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleDismiss}
            className="text-xs text-slate-400 hover:text-slate-600 py-1 font-medium"
          >
            Nanti saja, terima kasih
          </button>
        </div>
      </div>
    </div>
  );
}
