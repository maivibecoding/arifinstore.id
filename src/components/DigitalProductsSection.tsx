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
  X,
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
    <section id="digital-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#35508d] bg-blue-100 border border-blue-200 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
            Produk Digital & AI Pilihan
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Akun & Lisensi Premium <span className="text-[#0066cc]">Resmi Bergaransi</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Koleksi 7 produk digital terbaik (Gemini Pro, Notion, Duolingo, Office 365, JetBrains, Adobe)
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Garansi Penuh 365 Hari / Replacement Aktif</span>
        </div>
      </div>

      {/* Grid of 7 Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DIGITAL_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#0066cc] transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            {prod.badge && (
              <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold text-white bg-[#0066cc] shadow-xs">
                {prod.badge}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-[#0066cc] uppercase tracking-wider">
                  {prod.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors mt-0.5">
                  {prod.name}
                </h3>
                <span className="inline-block mt-1 text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                  Durasi: {prod.duration}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {prod.description}
              </p>

              {/* Feature Points */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                {prod.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Buy Button */}
            <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Harga Spesial</span>
                  <div className="text-lg sm:text-xl font-black text-emerald-600">
                    {formatRupiah(prod.price)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through">
                    {formatRupiah(prod.originalPrice)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{prod.rating} ({prod.soldCount} Terjual)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenBuy(prod)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#35508d] hover:bg-[#273b68] shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Beli Cepat</span>
                </button>
                <Link
                  href={`/produk/${prod.slug}`}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden space-y-4">
            <div className="bg-[#35508d] px-6 py-4 text-white flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-blue-200 uppercase">
                  Konfirmasi Pembelian
                </span>
                <h3 className="text-lg font-bold">
                  {selectedProduct.name}
                </h3>
                <span className="text-sm text-emerald-300 font-bold">
                  {formatRupiah(selectedProduct.price)}
                </span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-blue-200 hover:text-white p-1"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProceedBuy} className="p-6 pt-2 space-y-4">
              {selectedProduct.requiresEmail && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#0066cc]" />
                    Email untuk Pengiriman Lisensi / Akses:
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="namaanda@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0066cc]"
                    required
                  />
                  <p className="text-[11px] text-slate-500">
                    *Akun/link aktivasi akan di-deliver ke email ini dan WhatsApp Anda.
                  </p>
                </div>
              )}

              {!selectedProduct.requiresEmail && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#0066cc]">
                  ⚡ Produk ini menggunakan pengiriman instan. Tautan atau lisensi langsung muncul di layar setelah pembayaran QRIS diverifikasi.
                </div>
              )}

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] shadow-sm"
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
