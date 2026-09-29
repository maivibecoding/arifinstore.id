"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { EMONEY_BRANDS, FIXED_NOMINALS } from "@/lib/constants";
import { EMoneyBrand, NominalItem } from "@/types";
import { formatRupiah } from "@/lib/utils";
import {
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Zap,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Info,
} from "lucide-react";

interface EMoneyTopupSectionProps {
  onCheckout: (orderData: {
    type: "e-money";
    brand: EMoneyBrand;
    nominal: NominalItem;
    phoneNumber: string;
    accountName: string;
  }) => void;
  selectedBrandId?: string;
}

export default function EMoneyTopupSection({
  onCheckout,
  selectedBrandId = "dana",
}: EMoneyTopupSectionProps) {
  const [selectedBrand, setSelectedBrand] = useState<EMoneyBrand>(
    () => EMONEY_BRANDS.find((b) => b.id === selectedBrandId) || EMONEY_BRANDS[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedNominal, setSelectedNominal] = useState<NominalItem>(FIXED_NOMINALS[0]);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Sync if external selectedBrandId changes
  useEffect(() => {
    const brand = EMONEY_BRANDS.find((b) => b.id === selectedBrandId);
    if (brand) setSelectedBrand(brand);
  }, [selectedBrandId]);

  // Account validation inquiry simulation (Sekalipay Account Validation)
  useEffect(() => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.length >= 10) {
      setIsValidating(true);
      const timer = setTimeout(() => {
        // Simulated response based on typical Sekalipay Account Validation
        setAccountName("MOKHAMMAD ARIFIN ILHAM");
        setIsValidating(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAccountName(null);
    }
  }, [phoneNumber, selectedBrand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Silakan masukkan nomor handphone yang valid (minimal 10 digit).");
      return;
    }

    onCheckout({
      type: "e-money",
      brand: selectedBrand,
      nominal: selectedNominal,
      phoneNumber,
      accountName: accountName || "Terverifikasi",
    });
  };

  return (
    <section id="topup-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20 mb-2">
            <Zap className="w-3.5 h-3.5" />
            Layanan Top-Up 24 Jam
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Isi Saldo <span className="text-gradient-neon">E-Money & E-Wallet</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Pilihan nominal tetap dari 10.000 s/d 100.000 via provider Sekalipay bebas nominal
          </p>
        </div>

        {/* Sekalipay Provider Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs text-slate-300 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Kode Sekalipay: <strong className="text-indigo-400 font-mono">{selectedBrand.code}</strong> (Open Denom)</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Pilih E-Money Brand */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-xs font-bold">1</span>
              Pilih Layanan E-Money
            </h3>
            <span className="text-xs text-slate-400">8 E-Wallet Tersedia</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {EMONEY_BRANDS.map((brand) => {
              const isSelected = selectedBrand.id === brand.id;
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                    isSelected
                      ? "glass-card-active"
                      : "glass-card hover:border-slate-500"
                  }`}
                >
                  <div className="relative w-10 h-10">
                    <Image
                      src={brand.icon}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-200">
                    {brand.name}
                  </span>
                  {brand.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {brand.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Input Nomor HP & Auto Cek Nama Akun */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-xs font-bold">2</span>
              Masukkan Nomor Akun {selectedBrand.name}
            </h3>
            <span className="text-xs text-slate-400">Verifikasi Otomatis</span>
          </div>

          <div className="relative max-w-xl">
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={selectedBrand.placeholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-base font-mono tracking-wider"
                required
              />
            </div>

            {/* Account Validation Status Indicator */}
            {isValidating && (
              <div className="mt-2.5 flex items-center gap-2 text-xs text-indigo-400 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span>Memeriksa nama pemilik akun {selectedBrand.name}...</span>
              </div>
            )}

            {accountName && !isValidating && (
              <div className="mt-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Akun Ditemukan: <strong>{accountName}</strong> (Silakan pastikan nama sudah sesuai)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Pilih 19 Nominal Tetap */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-xs font-bold">3</span>
              Pilih Nominal Top-Up (19 Pilihan Tetap)
            </h3>
            <p className="text-xs text-slate-400">
              *Diambil dari produk Sekalipay Bebas Nominal untuk tarif hemat
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {FIXED_NOMINALS.map((nominal) => {
              const isSelected = selectedNominal.amount === nominal.amount;
              return (
                <button
                  key={nominal.amount}
                  type="button"
                  onClick={() => setSelectedNominal(nominal)}
                  className={`p-3.5 rounded-2xl flex flex-col text-left border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "glass-card-active scale-[1.02]"
                      : "glass-card hover:border-slate-500"
                  }`}
                >
                  {nominal.popular && (
                    <span className="absolute top-0 right-0 bg-indigo-600 text-[9px] font-bold text-white px-2 py-0.5 rounded-bl-lg">
                      Laris
                    </span>
                  )}
                  <span className="text-sm font-extrabold text-white">
                    Rp {nominal.label}
                  </span>
                  <div className="mt-2 flex items-baseline justify-between w-full">
                    <span className="text-xs font-bold text-emerald-400">
                      {formatRupiah(nominal.price)}
                    </span>
                    <span className="text-[10px] text-slate-500 line-through">
                      {formatRupiah(nominal.originalPrice)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Checkout Bar / Summary */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 border-indigo-500/30">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Rincian Pembelian
            </span>
            <div className="text-xl sm:text-2xl font-black text-white">
              {selectedBrand.name} Rp {selectedNominal.label}
              <span className="text-sm text-slate-400 font-normal ml-2">
                Total: <strong className="text-emerald-400 font-bold">{formatRupiah(selectedNominal.price)}</strong>
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 justify-center md:justify-start">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Pembayaran QRIS Otomatis (Proses 5 Detik)</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Beli Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </section>
  );
}
