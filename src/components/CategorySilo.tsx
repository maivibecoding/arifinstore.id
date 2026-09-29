"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { EMONEY_BRANDS } from "@/lib/constants";

export default function CategorySilo() {
  const digitalQuickLinks = [
    {
      id: "gemini-pro",
      title: "Gemini Pro 18M",
      icon: "/assets/logo200x200.png",
      href: "/produk/gemini-pro-18months",
      badge: "AI Pro",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      id: "duolingo-super",
      title: "Duolingo Super",
      icon: "/assets/logo200x200.png",
      href: "/produk/duolingo-super-12m",
      badge: "1 Tahun",
      badgeColor: "bg-green-100 text-green-800 border-green-200",
    },
    {
      id: "notion-plus",
      title: "Notion Plus",
      icon: "/assets/logo200x200.png",
      href: "/produk/notion-plus",
      badge: "Workspace",
      badgeColor: "bg-slate-200 text-slate-800 border-slate-300",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      {/* 1. HotelMurah PPOB E-Wallet Grid: pilih-klik */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Pilih Layanan Top Up E-Wallet
            </h2>
            <p className="text-xs text-slate-500">
              Klik e-wallet tujuan untuk isi saldo instan 5 detik tanpa ribet
            </p>
          </div>
          <Link
            href="/topup-e-wallet"
            className="text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Semua Layanan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* E-Wallet Grid matching HotelMurah pilih-klik */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2.5 sm:gap-4">
          {EMONEY_BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/topup/${brand.id}`}
              className="pilih-klik group relative flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-slate-50/70 hover:bg-blue-50/60 border border-slate-200/90 hover:border-[#0066cc] transition-all hover:scale-[1.03] shadow-2xs text-center cursor-pointer"
            >
              {brand.badge && (
                <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-md text-[8px] sm:text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-200 shadow-2xs">
                  {brand.badge}
                </span>
              )}
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white p-1.5 border border-slate-100 shadow-2xs flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src={brand.icon}
                  alt={`Top Up ${brand.name}`}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="pilih-ref mt-2 text-[11px] sm:text-xs font-black text-slate-800 group-hover:text-[#0066cc] transition-colors leading-tight">
                {brand.name}
              </div>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Mulai 10k
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Quick Highlight: Digital & AI Essentials */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0066cc]" />
              Akun Digital & AI Paling Laris
            </h2>
            <p className="text-xs text-slate-500">
              Lisensi resmi bergaransi 365 hari siap pakai
            </p>
          </div>
          <Link
            href="/#digital-section"
            className="text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1"
          >
            <span>Katalog Lengkap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {digitalQuickLinks.map((prod) => (
            <Link
              key={prod.id}
              href={prod.href}
              className="p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/90 hover:border-[#0066cc] flex items-center gap-3 transition-all group"
            >
              <div className="relative w-12 h-12 rounded-xl bg-white p-1.5 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                <Image
                  src={prod.icon}
                  alt={prod.title}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors truncate">
                    {prod.title}
                  </span>
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border shrink-0 ${prod.badgeColor}`}>
                    {prod.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Garansi replacement aktif
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0066cc] group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
