"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, ChevronLeft, ShieldCheck, Zap, ArrowRight } from "lucide-react";

interface BannerItem {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  gradient: string;
}

const BANNERS: BannerItem[] = [
  {
    id: "banner-1",
    tag: "PROMO E-WALLET INSTAN",
    title: "Isi Saldo E-Money Tercepat",
    highlight: "Bebas Biaya Admin!",
    subtitle: "DANA, ShopeePay, GoPay, OVO, LinkAja, i.saku, DOKU & AstraPay. Otomatis masuk dalam 5 detik via QRIS.",
    buttonText: "Top Up Sekarang",
    buttonLink: "#topup-section",
    gradient: "from-blue-600/30 via-indigo-600/20 to-purple-600/30",
  },
  {
    id: "banner-2",
    tag: "HOT PRODUCT 2026",
    title: "Google Gemini Pro 18 Bulan",
    highlight: "Diskon 60% Garansi Penuh",
    subtitle: "Aktivasi direct link resmi instan. Nikmati kapasitas konteks 1M token & kecepatan AI tercanggih untuk produktivitas.",
    buttonText: "Beli Gemini Pro",
    buttonLink: "#digital-section",
    gradient: "from-purple-600/30 via-pink-600/20 to-indigo-600/30",
  },
  {
    id: "banner-3",
    tag: "SPECIAL LEARNING",
    title: "Duolingo Super 12M Full 1 Tahun",
    highlight: "Belajar Tanpa Iklan!",
    subtitle: "Unlimited Hearts (Nyawa Tak Terbatas) & Practice Hub. Tingkatkan kefasihan bahasa asing Anda setiap hari.",
    buttonText: "Klaim Duolingo Super",
    buttonLink: "#digital-section",
    gradient: "from-emerald-600/30 via-teal-600/20 to-cyan-600/30",
  },
];

export default function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = BANNERS[currentIndex];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      {/* Announcement Ticker */}
      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Update Server: Transaksi E-Money & QRIS Dinamis Berjalan 100% Normal 24 Jam Nonstop</span>
      </div>

      {/* Main Glass Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-white/10 glass-panel bg-gradient-to-r ${current.gradient} transition-all duration-700`}
      >
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-white/10 backdrop-blur-md border border-white/20">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            {current.tag}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {current.title}{" "}
            <span className="block text-gradient-neon">{current.highlight}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {current.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={current.buttonLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-all"
            >
              <span>{current.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garansi 100% Uang Kembali</span>
            </div>
          </div>
        </div>

        {/* Ambient Decorative Blur */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-20 -top-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Banner Controls */}
        <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1))
            }
            className="p-2 rounded-lg bg-black/30 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
            aria-label="Previous Banner"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 px-2">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/30"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % BANNERS.length)}
            className="p-2 rounded-lg bg-black/30 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
            aria-label="Next Banner"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
