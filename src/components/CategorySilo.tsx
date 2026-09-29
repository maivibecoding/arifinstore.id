"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface CategorySiloProps {
  onSelectBrand?: (brandId: string) => void;
  onSelectProduct?: (productId: string) => void;
}

export default function CategorySilo({
  onSelectBrand,
  onSelectProduct,
}: CategorySiloProps) {
  const quickLinks = [
    {
      id: "topup-e-wallet",
      title: "Topup E-Wallet",
      icon: "/assets/logo200x200.png",
      href: "/topup-e-wallet",
      badge: "Master Hub",
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      id: "dana",
      title: "Topup DANA",
      icon: "/assets/dana-product.png",
      action: () => onSelectBrand?.("dana"),
      badge: "Populer",
      color: "from-sky-500/20 to-blue-500/20",
    },
    {
      id: "gopay",
      title: "Topup GoPay",
      icon: "/assets/gopay-product.png",
      action: () => onSelectBrand?.("gopay"),
      badge: "Instan",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      id: "shopeepay",
      title: "Topup ShopeePay",
      icon: "/assets/shopeepay-product.png",
      action: () => onSelectBrand?.("shopeepay"),
      badge: "Promo",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      id: "ovo",
      title: "Topup OVO",
      icon: "/assets/ovo-product.png",
      action: () => onSelectBrand?.("ovo"),
      color: "from-purple-500/20 to-indigo-500/20",
    },
    {
      id: "linkaja",
      title: "Topup LinkAja",
      icon: "/assets/linkaja-product.png",
      action: () => onSelectBrand?.("linkaja"),
      color: "from-red-500/20 to-rose-500/20",
    },
    {
      id: "gemini-pro",
      title: "Gemini Pro 18Months",
      icon: "/assets/logo200x200.png",
      href: "/produk/gemini-pro-18months",
      badge: "AI 18 Bulan",
      color: "from-purple-600/30 to-pink-600/20",
      isSpecial: true,
    },
    {
      id: "duolingo-super",
      title: "Duolingo Super 12M",
      icon: "/assets/logo200x200.png",
      href: "/produk/duolingo-super-12m",
      badge: "1 Tahun",
      color: "from-green-600/30 to-emerald-600/20",
      isSpecial: true,
    },
    {
      id: "notion-plus",
      title: "Notion Plus",
      icon: "/assets/logo200x200.png",
      href: "/produk/notion-plus",
      badge: "Workspace",
      color: "from-zinc-600/30 to-slate-600/20",
      isSpecial: true,
    },
    {
      id: "isaku",
      title: "Topup i.saku",
      icon: "/assets/isaku-product.png",
      action: () => onSelectBrand?.("isaku"),
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: "doku",
      title: "Topup DOKU",
      icon: "/assets/doku-product.png",
      action: () => onSelectBrand?.("doku"),
      color: "from-red-500/20 to-amber-500/20",
    },
    {
      id: "astrapay",
      title: "Topup AstraPay",
      icon: "/assets/astrapay-product.png",
      action: () => onSelectBrand?.("astrapay"),
      color: "from-blue-600/20 to-indigo-600/20",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Layanan Cepat (HotelMurah Style)
          </h2>
          <p className="text-xs text-slate-400">
            Akses langsung menu top up e-wallet dan aktivasi produk digital terpopuler
          </p>
        </div>
        <Link
          href="/topup-e-wallet"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
        >
          Lihat Semua <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {quickLinks.map((item) => {
          const content = (
            <div
              className={`relative p-3.5 rounded-2xl glass-card flex flex-col items-center justify-center text-center gap-2.5 hover:scale-[1.03] transition-all cursor-pointer group bg-gradient-to-b ${item.color}`}
            >
              {item.badge && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold text-white bg-indigo-600/60 border border-indigo-400/30">
                  {item.badge}
                </span>
              )}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden p-1.5 bg-black/20 backdrop-blur-sm border border-white/10 group-hover:border-indigo-400/50 transition-colors">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-1">
                {item.title}
              </span>
            </div>
          );

          if (item.href) {
            return (
              <Link key={item.id} href={item.href}>
                {content}
              </Link>
            );
          }

          return (
            <div key={item.id} onClick={item.action}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
