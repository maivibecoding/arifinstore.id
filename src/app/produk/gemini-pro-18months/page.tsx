import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { DIGITAL_PRODUCTS, STORE_INFO } from "@/lib/constants";
import { Sparkles, ShieldCheck, Check, Star, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Beli Akun Gemini Pro 18 Months (Direct Link) Garansi Resmi",
  description:
    "Aktivasi langganan Google Gemini Pro 18 Bulan resmi dengan direct redemption link. Dapatkan kapasitas konteks 1 juta token, pemrosesan cepat, dan garansi penuh hanya di Arifin Store.",
  keywords: [
    "gemini pro 18months",
    "beli gemini pro",
    "langganan google ai pro murah",
    "gemini pro link",
    "arifinstore.id",
  ],
};

export default function GeminiProPage() {
  const product = DIGITAL_PRODUCTS.find((p) => p.id === "gemini-pro-18m") || DIGITAL_PRODUCTS[0];

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f6f9]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#0066cc]">Home</Link>
          <span>/</span>
          <Link href="/#digital-section" className="hover:text-[#0066cc]">Produk Digital</Link>
          <span>/</span>
          <span className="text-[#35508d] font-semibold">{product.name}</span>
        </div>

        {/* Product Hero Showcase */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#0066cc] bg-blue-50 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{product.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tingkatkan produktivitas kerja dan riset Anda dengan Google Gemini Pro selama 18 bulan penuh. Aktivasi via direct link resmi tanpa perlu berbagi password akun Anda.
            </p>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {product.rating} / 5.0 ({product.soldCount}+ Terjual)
              </span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Garansi Replacement Penuh
              </span>
            </div>

            <div className="pt-2">
              <span className="text-xs text-slate-500 block">Harga Promo Terbatas:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-emerald-600">
                  {formatRupiah(product.price)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatRupiah(product.originalPrice)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/#digital-section"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#35508d] hover:bg-[#273b68] shadow-md hover:scale-[1.02] transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Beli Sekarang via QRIS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Feature Highlights Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#35508d]">
              Fitur Utama Gemini Pro 18M
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Konteks Hingga 1 Juta Token untuk Dokumen Panjang</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Integrasi Google Workspace (Docs, Gmail, Drive)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
