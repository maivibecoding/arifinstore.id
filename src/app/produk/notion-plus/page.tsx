import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { DIGITAL_PRODUCTS } from "@/lib/constants";
import { Sparkles, ShieldCheck, Check, Star, ArrowRight, Zap, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Beli Notion Plus 1 Tahun Termurah & Garansi Resmi | Arifin Store",
  description:
    "Upgrade workspace Notion Plus 1 tahun murah dan resmi. Nikmati unlimited file uploads, 30 days page history, dan kolaborasi tanpa batas untuk tim profesional.",
  keywords: [
    "notion plus murah",
    "beli notion plus",
    "langganan notion 1 tahun",
    "notion workspace upgrade",
    "arifinstore.id",
  ],
};

export default function NotionPlusPage() {
  const product = DIGITAL_PRODUCTS.find((p) => p.id === "notion-plus") || DIGITAL_PRODUCTS[2];

  return (
    <main className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/#digital-section" className="hover:text-white">Produk Digital</Link>
          <span>/</span>
          <span className="text-indigo-400 font-semibold">{product.name}</span>
        </div>

        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-indigo-500/30 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{product.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Tingkatkan produktivitas dokumentasi tim dan manajemen proyek Anda ke tingkat profesional. Bebas batasan ukuran upload file dan miliki kontrol riwayat versi dokumen 30 hari.
            </p>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                {product.rating} / 5.0 ({product.soldCount}+ Terjual)
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Garansi 1 Tahun Penuh
              </span>
            </div>

            <div className="pt-2">
              <span className="text-xs text-slate-400 block">Harga Spesial Promo:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-emerald-400">
                  {formatRupiah(product.price)}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatRupiah(product.originalPrice)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/#digital-section"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Beli Notion Plus via QRIS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300">
              Keunggulan Paket Notion Plus
            </h3>
            <ul className="space-y-3 text-xs text-slate-200">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mendukung Sinkronisasi Real-Time Desktop, Web & Mobile</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Aktivasi ke Email Pribadi Anda</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
