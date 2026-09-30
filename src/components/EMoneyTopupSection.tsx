"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { EMONEY_BRANDS, FIXED_NOMINALS } from "@/lib/constants";
import { EMoneyBrand, NominalItem } from "@/types";
import { formatRupiah } from "@/lib/utils";
import {
  Smartphone,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
  Check,
  AlertTriangle,
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
  const [selectedNominal, setSelectedNominal] = useState<NominalItem | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [detectedOperator, setDetectedOperator] = useState<string>("");
  const [detectedIp, setDetectedIp] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"IDLE" | "SUCCESS" | "NOT_FOUND" | "IP_NOT_WHITELISTED" | "INVALID_PHONE" | "UNCONFIGURED">("IDLE");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  // Sync if external selectedBrandId changes
  useEffect(() => {
    const brand = EMONEY_BRANDS.find((b) => b.id === selectedBrandId);
    if (brand) setSelectedBrand(brand);
  }, [selectedBrandId]);

  // Real Account validation inquiry
  useEffect(() => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.length >= 10) {
      setIsValidating(true);
      setAccountName(null);
      setValidationMessage(null);
      setValidationStatus("IDLE");

      const timer = setTimeout(async () => {
        try {
          const res = await fetch("/api/validate-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              brandId: selectedBrand.id,
              phoneNumber: cleanNumber,
            }),
          });
          const data = await res.json();
          if (data.success && data.accountName) {
            setAccountName(data.accountName);
            setValidationStatus("SUCCESS");
            setDetectedOperator(data.operator || "");
          } else if (data.status === "IP_NOT_WHITELISTED" || data.error === "IP_NOT_WHITELISTED") {
            setValidationStatus("IP_NOT_WHITELISTED");
            setDetectedOperator(data.operator || "");
            setValidationMessage(data.message);
            setDetectedIp(data.detectedIp || "");
          } else if (data.error === "ACCOUNT_NOT_FOUND") {
            setValidationStatus("NOT_FOUND");
            setDetectedOperator(data.operator || "");
            setValidationMessage(data.message || `Nomor ini tidak terdaftar di ${selectedBrand.name}.`);
          } else if (data.error === "INVALID_PHONE") {
            setValidationStatus("INVALID_PHONE");
            setValidationMessage(data.message);
          } else {
            setValidationStatus("UNCONFIGURED");
            setDetectedOperator(data.operator || "");
            setValidationMessage(null);
          }
        } catch (err) {
          console.error("Account validation error:", err);
          setValidationStatus("UNCONFIGURED");
        } finally {
          setIsValidating(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setAccountName(null);
      setValidationMessage(null);
      setValidationStatus("IDLE");
      setIsValidating(false);
    }
  }, [phoneNumber, selectedBrand.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Silakan masukkan nomor handphone yang valid (minimal 10 digit).");
      return;
    }
    if (!selectedNominal) {
      alert("Silakan pilih nominal saldo terlebih dahulu.");
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
    <section id="topup-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#35508d] bg-blue-100 border border-blue-200 mb-1.5">
            <Zap className="w-3.5 h-3.5 text-[#0066cc]" />
            Layanan Top-Up 24 Jam
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Isi Saldo <span className="text-[#0066cc]">E-Money & E-Wallet</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            19 pilihan nominal tetap (10.000 s/d 100.000) dari provider Sekalipay Bebas Nominal
          </p>
        </div>

        {/* Sekalipay Provider Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 shadow-2xs self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Sekalipay Code: <strong className="text-[#0066cc] font-mono">{selectedBrand.code}</strong> (Open Denom)</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step 1: Pilih E-Money Brand */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              Pilih Layanan E-Money
            </h3>
            <span className="text-xs font-medium text-slate-500">8 E-Wallet Tersedia</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {EMONEY_BRANDS.map((brand) => {
              const isSelected = selectedBrand.id === brand.id;
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer relative ${
                    isSelected
                      ? "clean-card-selected"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#0066cc] flex items-center justify-center text-white text-[10px]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                  <div className="relative w-10 h-10">
                    <Image
                      src={brand.icon}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {brand.name}
                  </span>
                  {brand.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      {brand.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Input Nomor HP & Auto Cek Nama Akun */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
              Masukkan Nomor Akun {selectedBrand.name}
            </h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Inquiry Otomatis
            </span>
          </div>

          <div className="relative max-w-xl">
            <div className="relative">
              <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={selectedBrand.placeholder}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-mono text-slate-800 focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/15 bg-white"
                required
              />
            </div>

            {/* Account Validation Status Indicator */}
            {isValidating && (
              <div className="mt-2 flex items-center gap-2 text-xs text-[#0066cc] animate-pulse">
                <span className="w-3.5 h-3.5 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin shrink-0" />
                <span>Memverifikasi akun {selectedBrand.name}...</span>
              </div>
            )}

            {!isValidating && validationStatus === "SUCCESS" && accountName && (
              <div className="mt-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Nama Akun: <strong>{accountName}</strong> (Terverifikasi)
                </span>
              </div>
            )}

            {!isValidating && validationStatus === "IP_NOT_WHITELISTED" && (
              <div className="mt-2.5 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col gap-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nomor {detectedOperator || "Seluler"} Valid ({phoneNumber.replace(/[^0-9]/g, "").length} digit)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Untuk memunculkan nama pemilik otomatis di laptop, masukkan IP ini ke <strong>Dashboard Sekalipay &rarr; IP Whitelist</strong>: <code className="bg-white px-2 py-0.5 rounded border border-slate-300 font-mono text-[#0066cc] font-bold select-all">{detectedIp || "2404:c0:ab07:3dfb:71d6:ca72:9a24:1df3"}</code>
                </p>
              </div>
            )}

            {!isValidating && validationStatus === "NOT_FOUND" && (
              <div className="mt-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  {validationMessage || `Nomor ini tidak terdaftar di ${selectedBrand.name}. Periksa kembali nomor akun Anda.`}
                </span>
              </div>
            )}

            {!isValidating && validationStatus === "INVALID_PHONE" && (
              <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{validationMessage || "Format nomor handphone tidak valid. Gunakan awalan 08 (10-13 digit)."}</span>
              </div>
            )}

            {!isValidating && validationStatus === "UNCONFIGURED" && phoneNumber.replace(/[^0-9]/g, "").length >= 10 && (
              <div className="mt-2.5 p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>
                  Nomor Tujuan {selectedBrand.name}: <strong className="font-mono text-slate-900">{phoneNumber}</strong> ({detectedOperator || "Seluler"})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Pilih 19 Nominal Tetap */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            Pilih Nominal
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {FIXED_NOMINALS.map((nominal) => {
              const isSelected = selectedNominal?.amount === nominal.amount;
              return (
                <button
                  key={nominal.amount}
                  type="button"
                  onClick={() => setSelectedNominal(nominal)}
                  className={`p-3 rounded-xl flex flex-col text-left border-2 transition-all cursor-pointer relative overflow-hidden select-none ${
                    isSelected
                      ? "bg-blue-50/90 border-[#0066cc] ring-2 ring-[#0066cc]/25 shadow-md scale-[1.02]"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                  {nominal.popular && !isSelected && (
                    <span className="absolute top-0 right-0 bg-red-600 text-[9px] font-bold text-white px-1.5 py-0.2 rounded-bl-md">
                      Laris
                    </span>
                  )}
                  <span className={`text-xs sm:text-sm font-extrabold ${isSelected ? "text-[#0066cc]" : "text-slate-900"}`}>
                    {selectedBrand.name.toUpperCase()} {nominal.label}
                  </span>
                  <div className="mt-1.5 flex items-baseline justify-between w-full">
                    <span className="text-xs font-bold text-[#0066cc]">
                      {formatRupiah(nominal.price)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Checkout Bar / Summary */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-blue-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
              Rincian Pembelian Anda
            </span>
            {selectedNominal ? (
              <div className="text-lg sm:text-2xl font-black text-slate-900">
                {selectedBrand.name} Rp {selectedNominal.label}
                <span className="text-sm text-slate-600 font-normal ml-2">
                  Total: <strong className="text-emerald-600 font-bold">{formatRupiah(selectedNominal.price)}</strong>
                </span>
              </div>
            ) : (
              <div className="text-sm sm:text-base font-semibold text-slate-400 py-1">
                Silakan pilih nominal di atas untuk melanjutkan
              </div>
            )}
            <p className="text-xs text-slate-500 flex items-center gap-1 justify-center md:justify-start">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pembayaran QRIS All Bank & E-Wallet (Proses Otomatis 5 Detik)</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={!selectedNominal}
            className={`w-full md:w-auto px-8 py-3.5 rounded-xl text-sm sm:text-base font-extrabold transition-all flex items-center justify-center gap-2 ${
              selectedNominal
                ? "text-white bg-[#35508d] hover:bg-[#273b68] shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                : "text-slate-400 bg-slate-200 cursor-not-allowed"
            }`}
          >
            <span>{selectedNominal ? "Beli Sekarang" : "Pilih Nominal Dulu"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </section>
  );
}
