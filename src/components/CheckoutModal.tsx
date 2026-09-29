"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { formatRupiah, generateInvoiceNumber } from "@/lib/utils";
import { convertStaticToDynamicQRIS, qrisSequencer } from "@/lib/qris";
import { STORE_INFO } from "@/lib/constants";
import {
  QrCode,
  Copy,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Download,
  Check,
  Zap,
  ExternalLink,
} from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    type: "e-money" | "digital";
    title: string;
    targetAccount: string;
    accountHolderName?: string;
    basePrice: number;
  } | null;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  orderData,
}: CheckoutModalProps) {
  const [invoice, setInvoice] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [uniqueCode, setUniqueCode] = useState(0);
  const [gatewayType, setGatewayType] = useState<"INDOAPI" | "DYNAMIC_QRIS">("INDOAPI");
  const [qrisString, setQrisString] = useState("");
  const [qrImageDataUrl, setQrImageDataUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins (900s)
  const [copied, setCopied] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize or reset invoice when modal opens
  useEffect(() => {
    if (isOpen && orderData) {
      const inv = generateInvoiceNumber();
      setInvoice(inv);
      setIsPaid(false);
      setIsProcessing(false);
      setTimeLeft(900);

      const base = orderData.basePrice;

      // Smart Split QRIS logic
      if (base > 400000) {
        // TIER 2: > 400rb memakai QRIS Statis to Dinamis dengan Anti-Collision (+1, +2, dst.)
        setGatewayType("DYNAMIC_QRIS");
        const { finalAmount: calcFinal, uniqueCode: code } = qrisSequencer.getUniqueNominal(base, inv);
        setFinalAmount(calcFinal);
        setUniqueCode(code);

        const dynQris = convertStaticToDynamicQRIS(undefined, calcFinal);
        setQrisString(dynQris);
        QRCode.toDataURL(dynQris, { width: 350, margin: 2 }).then(setQrImageDataUrl);
      } else {
        // TIER 1: <= 400rb memakai IndoApi Otomatis
        setGatewayType("INDOAPI");
        setFinalAmount(base);
        setUniqueCode(0);

        // Standard IndoApi dynamic string simulation
        const indoQris = convertStaticToDynamicQRIS(undefined, base);
        setQrisString(indoQris);
        QRCode.toDataURL(indoQris, { width: 350, margin: 2 }).then(setQrImageDataUrl);
      }
    }
  }, [isOpen, orderData]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isPaid || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isPaid, timeLeft]);

  if (!isOpen || !orderData) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const copyNominal = () => {
    navigator.clipboard.writeText(finalAmount.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      if (gatewayType === "DYNAMIC_QRIS") {
        qrisSequencer.releaseNominal(finalAmount);
      }
    }, 1500);
  };

  const downloadQR = () => {
    if (!qrImageDataUrl) return;
    const a = document.createElement("a");
    a.href = qrImageDataUrl;
    a.download = `QRIS-${invoice}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="glass-panel max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          ✕
        </button>

        {!isPaid ? (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-indigo-300 bg-indigo-500/20 border border-indigo-500/30">
                  {gatewayType === "DYNAMIC_QRIS" ? "QRIS DINAMIS (> 400RB)" : "INDOAPI QRIS OTOMATIS"}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {invoice}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Pembayaran QRIS All Payment
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Bisa di-scan via BCA, Mandiri, BRI, BNI, DANA, GoPay, OVO, ShopeePay, LinkAja dll.
              </p>
            </div>

            {/* Anti-Collision Banner (> 400rb) */}
            {gatewayType === "DYNAMIC_QRIS" && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>SISTEM ANTI-COLLISION QRIS AKTIF (+{uniqueCode} Rupiah)</span>
                </div>
                <p className="leading-relaxed text-slate-300">
                  Karena nominal di atas Rp 400.000, sistem menyematkan kode unik{" "}
                  <strong className="text-amber-300 font-mono">+{uniqueCode}</strong> agar verifikasi mutasi tidak bentrok dengan pembeli lain.{" "}
                  <strong>Wajib transfer sesuai nominal hingga 3 digit terakhir!</strong>
                </p>
              </div>
            )}

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-900 shadow-inner">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-600">
                <QrCode className="w-4 h-4 text-indigo-600" />
                <span>NMID: ID1020023910291 (ARIFIN STORE)</span>
              </div>

              {qrImageDataUrl ? (
                <div className="relative p-2 bg-white rounded-xl shadow-md border border-slate-200">
                  <img
                    src={qrImageDataUrl}
                    alt="QRIS Dinamis"
                    className="w-56 h-56 object-contain"
                  />
                </div>
              ) : (
                <div className="w-56 h-56 bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-xs text-slate-400">
                  Menyiapkan QRIS Dinamis...
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadQR}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh QR</span>
                </button>
              </div>
            </div>

            {/* Total Payment & Nominal Copy */}
            <div className="p-4 rounded-2xl glass-card flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total yang Harus Dibayar:</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {formatRupiah(finalAmount)}
                </span>
              </div>
              <button
                type="button"
                onClick={copyNominal}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Tersalin!" : "Salin Nominal"}</span>
              </button>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-4">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Batas Waktu Bayar: {timeFormatted}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Otomatis Verifikasi</span>
              </div>
            </div>

            {/* Simulation Action (Demo payment verification) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>{isProcessing ? "Memverifikasi Pembayaran..." : "Saya Sudah Transfer (Cek Otomatis)"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Payment Success View */
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Pembayaran Diterima!
              </span>
              <h2 className="text-2xl font-black text-white">
                Transaksi Berhasil Diproses
              </h2>
              <p className="text-xs text-slate-300 font-mono">
                No. Invoice: {invoice}
              </p>
            </div>

            {/* Fulfillment Box */}
            <div className="p-5 rounded-2xl glass-card text-left space-y-3 border-emerald-500/30">
              <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-slate-400">Produk:</span>
                <span className="font-bold text-white">{orderData.title}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-slate-400">Tujuan Akun:</span>
                <span className="font-bold text-indigo-300 font-mono">{orderData.targetAccount}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-slate-400">Nominal Dibayar:</span>
                <span className="font-bold text-emerald-400 font-mono">{formatRupiah(finalAmount)}</span>
              </div>

              {orderData.type === "digital" ? (
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold text-amber-300 block">
                    🎁 Data Lisensi / Akses Anda:
                  </span>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-emerald-300 select-all break-all">
                    ACTIVATE-KEY: ARF-{Math.random().toString(36).substring(2, 10).toUpperCase()}-2026
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    *Link aktivasi juga telah dikirimkan ke email Anda. Silakan hubungi CS jika butuh bantuan setup.
                  </p>
                </div>
              ) : (
                <div className="pt-2 text-xs text-emerald-300">
                  ✅ Saldo telah sukses dikirim ke nomor <strong>{orderData.targetAccount}</strong> melalui gateway Sekalipay.
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`${STORE_INFO.whatsappUrl}?text=Halo%20Admin%20Arifin%20Store,%20saya%20sudah%20bayar%20invoice%20${invoice}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2"
              >
                <span>Konfirmasi WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-xl text-xs font-bold text-slate-300 bg-white/10 hover:bg-white/20"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
