"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DIGITAL_PRODUCTS } from "@/lib/constants";
import { DigitalProduct } from "@/types";
import { formatRupiah } from "@/lib/utils";
import {
  Sparkles,
  ShieldCheck,
  Star,
  Check,
  ArrowRight,
  Mail,
  Zap,
} from "lucide-react";

interface DigitalProductsSectionProps {
  onCheckout: (orderData: {
    type: "digital";
    product: DigitalProduct;
    email: string;
  }) => void;
}

export default function DigitalProductsSection({
  onCheckout,
}: DigitalProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);
  const [customerEmail, setCustomerEmail] = useState("");

  const handleOpenBuy = (product: DigitalProduct) => {
    setSelectedProduct(product);
  };

  const handleProceedBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    if (selectedProduct.requiresEmail && (!customerEmail || !customerEmail.includes("@"))) {
      alert("Silakan masukkan alamat email yang valid untuk aktivasi.");
      return;
    }

    onCheckout({
      type: "digital",
      product: selectedProduct,
      email: customerEmail || "guest@arifinstore.id",
    });

    setSelectedProduct(null);
  };

  return (
    <section id="digital-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Produk Digital & AI Pilihan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Akun & Lisensi Premium <span className="text-gradient-purple">Resmi Bergaransi</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Koleksi 7 produk digital terbaik (Gemini Pro, Notion, Duolingo, Office 365, JetBrains, Adobe)
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Garansi Penuh 365 Hari / Replacement Aktif</span>
        </div>
      </div>

      {/* Grid of 7 Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DIGITAL_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="glass-panel p-6 rounded-3xl flex flex-col justify-between border border-white/10 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group relative overflow-hidden"
          >
            {prod.badge && (
              <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
                {prod.badge}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                  {prod.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mt-0.5">
                  {prod.name}
                </h3>
                <span className="inline-block mt-1 text-xs text-slate-400 font-medium bg-white/5 px-2 py-0.5 rounded-md">
                  Durasi: {prod.duration}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {prod.description}
              </p>

              {/* Feature Points */}
              <div className="space-y-1.5 pt-1 border-t border-white/5">
                {prod.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Buy Button */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Harga Spesial</span>
                  <div className="text-xl font-extrabold text-emerald-400">
                    {formatRupiah(prod.price)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 line-through">
                    {formatRupiah(prod.originalPrice)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{prod.rating} ({prod.soldCount} Terjual)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenBuy(prod)}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Beli Cepat</span>
                </button>
                <Link
                  href={`/produk/${prod.slug}`}
                  className="py-3 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Buy Modal for Product */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel max-w-md w-full p-6 rounded-3xl border border-white/20 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-indigo-400 font-semibold uppercase">
                  Konfirmasi Pembelian
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedProduct.name}
                </h3>
                <span className="text-sm text-emerald-400 font-bold">
                  {formatRupiah(selectedProduct.price)}
                </span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-white p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProceedBuy} className="space-y-4">
              {selectedProduct.requiresEmail && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    Email untuk Aktivasi Lisensi:
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="namaanda@gmail.com"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    required
                  />
                  <p className="text-[11px] text-slate-400">
                    *Akun/link aktivasi akan di-deliver ke email ini dan WhatsApp Anda.
                  </p>
                </div>
              )}

              {!selectedProduct.requiresEmail && (
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
                  ⚡ Produk ini menggunakan pengiriman instan. Tautan atau lisensi langsung muncul di layar setelah QRIS dibayar.
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
                >
                  Lanjut Bayar QRIS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
