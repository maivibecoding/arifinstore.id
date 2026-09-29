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
  bgGradient: string;
  tagColor: string;
}

const BANNERS: BannerItem[] = [
  {
    id: "banner-1",
    tag: "PROMO E-WALLET INSTAN",
    title: "Isi Saldo E-Money Tercepat",
    highlight: "Tanpa Ribet, Otomatis 5 Detik!",
    subtitle: "DANA, ShopeePay, GoPay, OVO, LinkAja, i.saku, DOKU & AstraPay. Bebas biaya admin tersembunyi via QRIS resmi.",
    buttonText: "Top Up Sekarang",
    buttonLink: "/topup-e-wallet",
    bgGradient: "from-blue-50 via-sky-50 to-indigo-50 border-blue-200",
    tagColor: "bg-blue-600 text-white",
  },
  {
    id: "banner-2",
    tag: "HOT PRODUCT 2026",
    title: "Google Gemini Pro 18 Bulan",
    highlight: "Diskon 60% Garansi Penuh",
    subtitle: "Aktivasi direct link resmi instan. Nikmati kapasitas konteks 1M token & kecepatan AI tercanggih untuk produktivitas.",
    buttonText: "Beli Gemini Pro",
    buttonLink: "#digital-section",
    bgGradient: "from-purple-50 via-pink-50 to-indigo-50 border-purple-200",
    tagColor: "bg-purple-600 text-white",
  },
  {
    id: "banner-3",
    tag: "SPECIAL LEARNING",
    title: "Duolingo Super 12M Full 1 Tahun",
    highlight: "Belajar Tanpa Iklan!",
    subtitle: "Unlimited Hearts (Nyawa Tak Terbatas) & Practice Hub. Tingkatkan kefasihan bahasa asing Anda setiap hari.",
    buttonText: "Klaim Duolingo Super",
    buttonLink: "#digital-section",
    bgGradient: "from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200",
    tagColor: "bg-emerald-600 text-white",
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
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
      {/* HotelMurah Style Clean Banner Card */}
      <div
        className={`relative overflow-hidden rounded-2xl p-6 sm:p-9 border bg-gradient-to-r ${current.bgGradient} shadow-sm transition-all duration-500`}
      >
        <div className="relative z-10 max-w-2xl space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shadow-xs uppercase">
            <span className={`px-2.5 py-0.5 rounded-full ${current.tagColor}`}>
              {current.tag}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-snug">
            {current.title}{" "}
            <span className="block text-[#0066cc]">{current.highlight}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {current.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={current.buttonLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] shadow-md transition-all hover:scale-[1.02]"
            >
              <span>{current.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garansi 100% Uang Kembali</span>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1))
            }
            className="p-1.5 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
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
                  idx === currentIndex ? "w-6 bg-[#0066cc]" : "w-2 bg-slate-300"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % BANNERS.length)}
            className="p-1.5 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Next Banner"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
