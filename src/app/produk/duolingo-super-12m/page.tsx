import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { DIGITAL_PRODUCTS } from "@/lib/constants";
import { Sparkles, ShieldCheck, Check, Star, ArrowRight, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Beli Duolingo Super 12M (1 Tahun Penuh) Termurah & Resmi",
  description:
    "Aktivasi Duolingo Super 12 Bulan murah garansi 365 hari. Nikmati Unlimited Hearts tanpa batasan nyawa, bebas iklan, dan fitur Practice Hub lengkap di Arifin Store.",
  keywords: [
    "duolingo super 12m",
    "beli duolingo super",
    "duolingo plus murah",
    "duolingo 1 tahun",
    "arifinstore.id",
  ],
};

export default function DuolingoSuperPage() {
  const product = DIGITAL_PRODUCTS.find((p) => p.id === "duolingo-super-12m") || DIGITAL_PRODUCTS[1];

  return (
    <main className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/#digital-section" className="hover:text-white">Produk Digital</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{product.name}</span>
        </div>

        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/30 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{product.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Pelajari bahasa asing favorit Anda tanpa batasan waktu dan bebas interupsi iklan. Dapatkan fitur Unlimited Hearts (nyawa tanpa batas) dan review kesalahan untuk pembelajaran maksimal.
            </p>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                {product.rating} / 5.0 ({product.soldCount}+ Terjual)
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Garansi 365 Hari Penuh
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
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-600/30 hover:scale-[1.02] transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Beli Duolingo Super via QRIS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
              Kelebihan Duolingo Super
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
                <span>Bebas Gangguan Iklan di Android & iOS</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Proses Cepat 5-10 Menit Masuk ke Akun</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
