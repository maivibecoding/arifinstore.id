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
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      id: "dana",
      title: "Topup DANA",
      icon: "/assets/dana-product.png",
      action: () => onSelectBrand?.("dana"),
      badge: "Populer",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
    },
    {
      id: "gopay",
      title: "Topup GoPay",
      icon: "/assets/gopay-product.png",
      action: () => onSelectBrand?.("gopay"),
      badge: "Instan",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      id: "shopeepay",
      title: "ShopeePay",
      icon: "/assets/shopeepay-product.png",
      action: () => onSelectBrand?.("shopeepay"),
      badge: "Hemat",
      badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    },
    {
      id: "ovo",
      title: "Topup OVO",
      icon: "/assets/ovo-product.png",
      action: () => onSelectBrand?.("ovo"),
    },
    {
      id: "linkaja",
      title: "LinkAja",
      icon: "/assets/linkaja-product.png",
      action: () => onSelectBrand?.("linkaja"),
    },
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
    {
      id: "isaku",
      title: "Topup i.saku",
      icon: "/assets/isaku-product.png",
      action: () => onSelectBrand?.("isaku"),
    },
    {
      id: "doku",
      title: "Topup DOKU",
      icon: "/assets/doku-product.png",
      action: () => onSelectBrand?.("doku"),
    },
    {
      id: "astrapay",
      title: "AstraPay",
      icon: "/assets/astrapay-product.png",
      action: () => onSelectBrand?.("astrapay"),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0066cc]" />
            Layanan Utama & Kategori Cepat
          </h2>
          <p className="text-xs text-slate-500">
            Akses langsung isi saldo e-wallet dan aktivasi akun digital terlaris
          </p>
        </div>
        <Link
          href="/topup-e-wallet"
          className="text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1"
        >
          Lihat Semua <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Clean HotelMurah Icon Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {quickLinks.map((item) => {
          const content = (
            <div
              className="relative p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#0066cc] flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer group"
            >
              {item.badge && (
                <span
                  className={`absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-md text-[9px] font-extrabold border ${
                    item.badgeColor || "bg-blue-100 text-blue-800 border-blue-200"
                  }`}
                >
                  {item.badge}
                </span>
              )}
              <div className="relative w-11 h-11 rounded-xl p-1 bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 group-hover:text-[#0066cc] line-clamp-1 transition-colors">
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
