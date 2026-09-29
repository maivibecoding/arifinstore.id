import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { EMONEY_BRANDS, FIXED_NOMINALS, STORE_INFO } from "@/lib/constants";
import { formatRupiah } from "@/lib/utils";
import { ShieldCheck, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

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
    <main className="min-h-screen flex flex-col bg-[#f4f6f9]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Header Breadcrumb & Hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#0066cc]">Home</Link>
            <span>/</span>
            <span className="text-[#35508d] font-semibold">Topup E-Wallet</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              Top Up <span className="text-[#0066cc]">E-Wallet & E-Money</span> Terlengkap 24 Jam
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Solusi praktis isi ulang dompet digital DANA, ShopeePay, GoPay, OVO, LinkAja, i.saku, DOKU, dan AstraPay dengan harga termurah dan proses instan otomatis via QRIS.
            </p>
          </div>
        </div>

        {/* E-Wallet Grid Directory (HotelMurah Clean Style) */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Daftar Layanan E-Wallet Tersedia
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {EMONEY_BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#0066cc] transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-slate-50 p-1 border border-slate-100 flex items-center justify-center">
                    <Image
                      src={brand.icon}
                      alt={brand.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors">
                      Top Up {brand.name}
                    </h3>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      ● Status Online 24 Jam
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Nominal tersedia dari Rp 10.000 hingga Rp 100.000 dengan biaya admin terendah.
                </p>

                <Link
                  href={`/topup/${brand.id}`}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-center text-white bg-[#35508d] hover:bg-[#273b68] shadow-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Beli Saldo {brand.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Price Table Comparison */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Daftar 19 Pilihan Nominal Tetap & Biaya Admin
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3">Nominal Saldo</th>
                  <th className="p-3">Harga Bayar</th>
                  <th className="p-3">Biaya Admin</th>
                  <th className="p-3">Kecepatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FIXED_NOMINALS.slice(0, 8).map((nom) => (
                  <tr key={nom.amount} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-800">Rp {nom.label}</td>
                    <td className="p-3 font-mono font-bold text-[#0066cc]">{formatRupiah(nom.price)}</td>
                    <td className="p-3 text-slate-600 font-semibold">{formatRupiah(nom.price - nom.amount)}</td>
                    <td className="p-3 text-emerald-600 font-medium">Instan (5 Detik)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#35508d]" />
            Pertanyaan Umum Seputar Top Up E-Wallet (FAQ)
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="font-bold text-slate-900">Berapa lama saldo e-wallet masuk ke akun saya?</h3>
              <p className="text-slate-600 leading-relaxed">
                Rata-rata transaksi diproses dalam hitungan 5 hingga 30 detik setelah pembayaran QRIS berhasil diverifikasi oleh sistem gateway kami.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="font-bold text-slate-900">Bagaimana jika salah memasukkan nomor akun?</h3>
              <p className="text-slate-600 leading-relaxed">
                Website Arifin Store dilengkapi fitur <strong>Cek Nama Akun Otomatis</strong> sebelum checkout sehingga Anda dapat memastikan nama pemilik akun sudah benar 100% sebelum membayar.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="font-bold text-slate-900">Metode pembayaran apa saja yang diterima?</h3>
              <p className="text-slate-600 leading-relaxed">
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
