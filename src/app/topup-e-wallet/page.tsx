import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { EMONEY_BRANDS, FIXED_NOMINALS, STORE_INFO } from "@/lib/constants";
import { formatRupiah } from "@/lib/utils";
import { ShieldCheck, Zap, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Topup E-Wallet Murah, Lengkap & Tercepat 24 Jam",
  description:
    "Pusat isi ulang saldo e-wallet terlengkap di Indonesia: DANA, ShopeePay, GoPay, OVO, LinkAja, i.saku, DOKU, AstraPay. Proses otomatis 5 detik via QRIS bebas biaya admin.",
  keywords: [
    "topup e-wallet",
    "top up dana murah",
    "top up gopay",
    "top up shopeepay",
    "isi saldo ovo",
    "linkaja murah",
    "arifinstore.id",
  ],
};

export default function TopupEWalletPage() {
  return (
    <main className="min-h-screen flex flex-col mesh-gradient-bg">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-12">
        {/* Header Breadcrumb & Hero */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-indigo-400 font-semibold">Topup E-Wallet</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Top Up <span className="text-gradient-neon">E-Wallet & E-Money</span> Terlengkap 24 Jam
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Solusi praktis isi ulang dompet digital DANA, ShopeePay, GoPay, OVO, LinkAja, i.saku, DOKU, dan AstraPay dengan harga termurah dan proses instan otomatis via QRIS.
            </p>
          </div>
        </div>

        {/* E-Wallet Grid Directory (HotelMurah Style) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Daftar Layanan E-Wallet Tersedia
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMONEY_BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="glass-panel p-5 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-white/5 p-1 border border-white/10">
                    <Image
                      src={brand.icon}
                      alt={brand.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      Top Up {brand.name}
                    </h3>
                    <span className="text-[11px] text-emerald-400 font-medium">
                      ● Status Online 24 Jam
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  Nominal tersedia dari Rp 10.000 hingga Rp 100.000 dengan biaya admin terendah.
                </p>

                <Link
                  href="/#topup-section"
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-center text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Beli Saldo {brand.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Price Table Comparison */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold text-white">
            Daftar 19 Pilihan Nominal Tetap & Biaya Admin
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-slate-400">
                <tr>
                  <th className="p-3">Nominal Masuk</th>
                  <th className="p-3">Harga Arifin Store</th>
                  <th className="p-3">Harga Normal Pasar</th>
                  <th className="p-3">Hemat</th>
                  <th className="p-3">Kecepatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {FIXED_NOMINALS.slice(0, 8).map((nom) => (
                  <tr key={nom.amount} className="hover:bg-white/5">
                    <td className="p-3 font-bold text-white">Rp {nom.label}</td>
                    <td className="p-3 font-mono font-bold text-emerald-400">{formatRupiah(nom.price)}</td>
                    <td className="p-3 font-mono text-slate-500 line-through">{formatRupiah(nom.originalPrice)}</td>
                    <td className="p-3 text-cyan-400 font-semibold">{formatRupiah(nom.originalPrice - nom.price)}</td>
                    <td className="p-3 text-slate-300">Instan (5 Detik)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO FAQ Accordion Schema */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            Pertanyaan Umum Seputar Top Up E-Wallet (FAQ)
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl glass-card space-y-1">
              <h3 className="font-bold text-white">Berapa lama saldo e-wallet masuk ke akun saya?</h3>
              <p className="text-slate-300 leading-relaxed">
                Rata-rata transaksi diproses dalam hitungan 5 hingga 30 detik setelah pembayaran QRIS berhasil diverifikasi oleh sistem gateway kami.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-card space-y-1">
              <h3 className="font-bold text-white">Bagaimana jika salah memasukkan nomor akun?</h3>
              <p className="text-slate-300 leading-relaxed">
                Website Arifin Store dilengkapi fitur <strong>Cek Nama Akun Otomatis</strong> sebelum checkout sehingga Anda dapat memastikan nama pemilik akun sudah benar 100% sebelum membayar.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-card space-y-1">
              <h3 className="font-bold text-white">Metode pembayaran apa saja yang diterima?</h3>
              <p className="text-slate-300 leading-relaxed">
                Kami menerima pembayaran QRIS dari semua mobile banking (BCA, Mandiri, BRI, BNI, Permata, dll.) dan seluruh dompet digital (DANA, GoPay, OVO, ShopeePay, LinkAja).
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
