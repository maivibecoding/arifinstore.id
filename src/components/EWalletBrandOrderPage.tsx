"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutModal from "@/components/CheckoutModal";
import AuthModal, { AuthUser } from "@/components/AuthModal";
import OrderTrackerModal from "@/components/OrderTrackerModal";
import { EMONEY_BRANDS, FIXED_NOMINALS, STORE_INFO } from "@/lib/constants";
import { EMoneyBrand, NominalItem } from "@/types";
import { formatRupiah } from "@/lib/utils";
import {
  Smartphone,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
  Check,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface EWalletBrandOrderPageProps {
  brandId: string;
}

export default function EWalletBrandOrderPage({ brandId }: EWalletBrandOrderPageProps) {
  const brand =
    EMONEY_BRANDS.find((b) => b.id.toLowerCase() === brandId.toLowerCase()) ||
    EMONEY_BRANDS[0];

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedNominal, setSelectedNominal] = useState<NominalItem>(FIXED_NOMINALS[0]);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Modals
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("arifinstore_auth_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setCurrentUser(u);
        if (u.phone && !phoneNumber) {
          setPhoneNumber(u.phone);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Account validation inquiry simulation
  useEffect(() => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.length >= 10) {
      setIsValidating(true);
      const timer = setTimeout(() => {
        setAccountName("MOKHAMMAD ARIFIN ILHAM");
        setIsValidating(false);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setAccountName(null);
    }
  }, [phoneNumber, brand]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Silakan masukkan nomor handphone yang valid (minimal 10 digit).");
      return;
    }
    setCheckoutModalOpen(true);
  };

  const checkoutOrder = {
    type: "e-money" as const,
    title: `${brand.name} Rp ${selectedNominal.label}`,
    targetAccount: phoneNumber,
    accountHolderName: accountName || "Terverifikasi",
    basePrice: selectedNominal.price,
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f6f9]">
      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={() => {
          localStorage.removeItem("arifinstore_auth_user");
          setCurrentUser(null);
        }}
        onOpenTracker={() => setTrackerModalOpen(true)}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* Breadcrumb Navigation (HotelMurah Style) */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#0066cc]">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/topup-e-wallet" className="hover:text-[#0066cc]">
            Top Up E-Wallet
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-[#35508d]">Top Up {brand.name}</span>
        </nav>

        {/* Page Title & Brand Identity Card */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 p-2 border border-slate-100 flex items-center justify-center shrink-0">
              <Image
                src={brand.icon}
                alt={`Top Up ${brand.name}`}
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0066cc] uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>PPOB & Top Up Resmi</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Beli Saldo {brand.name} | Top Up {brand.name} Murah
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Proses instan 5 detik, bebas biaya admin tersembunyi via QRIS All Payment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#0066cc] font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Server Online 24 Jam</span>
          </div>
        </div>

        {/* Quick E-Wallet Switcher Tabs */}
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          {EMONEY_BRANDS.map((b) => {
            const isActive = b.id === brand.id;
            return (
              <Link
                key={b.id}
                href={`/topup/${b.id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#35508d] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{b.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Top-Up Form */}
        <form onSubmit={handleCheckout} className="space-y-5">
          {/* Step 1: Input Nomor Akun */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="step-badge">1</span>
                Masukkan Nomor HP Akun {brand.name}
              </label>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cek Akun Otomatis
              </span>
            </div>

            <div className="relative">
              <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={brand.placeholder}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-mono text-slate-800 focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/15 bg-white"
                required
              />
            </div>

            {/* Account Validation Status Indicator */}
            {isValidating && (
              <div className="flex items-center gap-2 text-xs text-[#0066cc] animate-pulse pt-1">
                <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-ping" />
                <span>Memeriksa nama pemilik akun {brand.name}...</span>
              </div>
            )}

            {accountName && !isValidating && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Pemilik Akun Terdaftar: <strong>{accountName}</strong> (Nama sudah sesuai)
                </span>
              </div>
            )}
          </div>

          {/* Step 2: Pilih Nominal Saldo (19 Fixed Nominals) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h2 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                <span className="step-badge">2</span>
                Pilih Nominal Saldo {brand.name}
              </h2>
              <span className="text-xs text-slate-500">
                Tersedia 19 pilihan nominal hemat
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {FIXED_NOMINALS.map((nom) => {
                const isSelected = selectedNominal.amount === nom.amount;
                return (
                  <button
                    key={nom.amount}
                    type="button"
                    onClick={() => setSelectedNominal(nom)}
                    className={`p-3 rounded-xl flex flex-col text-left border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? "clean-card-selected scale-[1.02]"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                    }`}
                  >
                    {nom.popular && (
                      <span className="absolute top-0 right-0 bg-red-600 text-[9px] font-bold text-white px-1.5 py-0.2 rounded-bl-md">
                        Laris
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {brand.name.toUpperCase()} {nom.label}
                    </span>
                    <div className="mt-1.5 flex items-baseline justify-between w-full">
                      <span className="text-xs font-bold text-[#0066cc]">
                        {formatRupiah(nom.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        {formatRupiah(nom.originalPrice)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Checkout Summary & Action Button */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-blue-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                Rincian Tagihan Anda
              </span>
              <div className="text-lg sm:text-2xl font-black text-slate-900">
                {brand.name} Rp {selectedNominal.label}
                <span className="text-sm text-slate-600 font-normal ml-2">
                  Total Bayar: <strong className="text-emerald-600 font-bold">{formatRupiah(selectedNominal.price)}</strong>
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 justify-center md:justify-start">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bayar otomatis via QRIS (BCA, Mandiri, BRI, DANA, GoPay, OVO, dll.)</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 rounded-xl text-sm sm:text-base font-extrabold text-white bg-[#35508d] hover:bg-[#273b68] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjutkan Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Tutorial & Cara Top Up HotelMurah Style */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Cara Top Up {brand.name} di Arifin Store
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-600">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#35508d] block text-sm">1. Masukkan Nomor</span>
              <p>Ketik nomor HP yang terdaftar pada akun {brand.name} Anda.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#35508d] block text-sm">2. Pilih Nominal</span>
              <p>Pilih salah satu dari 19 nominal saldo tetap yang Anda inginkan.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#35508d] block text-sm">3. Scan QRIS</span>
              <p>Scan kode QRIS yang muncul via mobile banking atau aplikasi e-wallet apa saja.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-[#35508d] block text-sm">4. Saldo Masuk!</span>
              <p>Sistem memproses transaksi otomatis dalam 5-10 detik. Selesai!</p>
            </div>
          </div>
        </div>

        {/* FAQ Schema Accordion */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#35508d]" />
            Pertanyaan Umum Seputar Top Up {brand.name} (FAQ)
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="font-bold text-slate-900">
                Apakah bisa isi saldo {brand.name} tanpa aplikasi {brand.name} atau mobile banking?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Bisa. Di Arifin Store memungkinkan Anda isi saldo {brand.name} langsung dari browser web. Cukup masukkan nomor HP tujuan, pilih nominal, lalu bayar menggunakan QRIS dari aplikasi apa pun.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="font-bold text-slate-900">
                Berapa lama proses saldo {brand.name} masuk?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Umumnya saldo {brand.name} akan otomatis bertambah dalam waktu 5 hingga 30 detik setelah pembayaran QRIS diverifikasi sistem gateway otomatis kami.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="font-bold text-slate-900">
                Berapa minimal dan maksimal top up {brand.name}?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Minimal top up Rp 10.000 dan maksimal Rp 100.000 per transaksi dengan 19 opsi nominal tetap yang dapat dipilih bebas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="font-bold text-slate-900">
                Bagaimana jika saldo belum masuk setelah pembayaran?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Hubungi Customer Service WhatsApp Arifin Store ({STORE_INFO.whatsapp}) dengan menyertakan nomor invoice. Tim kami siap membantu 24 jam nonstop dengan garansi uang kembali 100%.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        orderData={checkoutOrder}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(u) => setCurrentUser(u)}
      />

      <OrderTrackerModal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
      />
    </main>
  );
}
