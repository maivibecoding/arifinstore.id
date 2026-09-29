"use client";

import React, { useState, useEffect } from "react";
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
  X,
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
      setQrImageDataUrl("");

      const base = orderData.basePrice;

      // Call backend payment creation API (IndoApi / Dynamic QRIS Anti-Collision)
      fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: base,
          invoice: inv,
          customerName: orderData.accountHolderName || "Pelanggan Arifin Store",
          title: orderData.title,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setGatewayType(data.gateway);
            setFinalAmount(data.finalAmount);
            setUniqueCode(data.uniqueCode || 0);
            setQrisString(data.qrisString);
            if (data.qrImage) {
              setQrImageDataUrl(data.qrImage);
            } else if (data.qrisString) {
              QRCode.toDataURL(data.qrisString, { width: 350, margin: 2 }).then(setQrImageDataUrl);
            }
          }
        })
        .catch((err) => {
          console.error("Payment init error:", err);
          const dynQris = convertStaticToDynamicQRIS(undefined, base);
          setGatewayType(base > 400000 ? "DYNAMIC_QRIS" : "INDOAPI");
          setFinalAmount(base);
          setQrisString(dynQris);
          QRCode.toDataURL(dynQris, { width: 350, margin: 2 }).then(setQrImageDataUrl);
        });
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
    }, 1200);
  };

  const downloadQR = () => {
    if (!qrImageDataUrl) return;
    const a = document.createElement("a");
    a.href = qrImageDataUrl;
    a.download = `QRIS-${invoice}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden relative my-6">
        {/* Navy Header */}
        <div className="bg-[#35508d] px-6 py-4 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider text-blue-100 bg-white/20">
                {gatewayType === "DYNAMIC_QRIS" ? "QRIS DINAMIS (> 400RB)" : "INDOAPI QRIS OTOMATIS"}
              </span>
              <span className="text-xs font-mono text-blue-200">
                {invoice}
              </span>
            </div>
            <h2 className="text-lg font-bold mt-1">
              Pembayaran QRIS All Payment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isPaid ? (
          <div className="p-6 space-y-5">
            {/* Anti-Collision Banner (> 400rb) */}
            {gatewayType === "DYNAMIC_QRIS" && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>SISTEM ANTI-COLLISION QRIS AKTIF (+{uniqueCode} Rupiah)</span>
                </div>
                <p className="leading-relaxed text-amber-700">
                  Karena nominal di atas Rp 400.000, sistem menyematkan kode unik{" "}
                  <strong className="text-amber-900 font-mono">+{uniqueCode}</strong> agar verifikasi mutasi tidak bentrok dengan pembeli lain.{" "}
                  <strong>Wajib transfer sesuai nominal hingga 3 digit terakhir!</strong>
                </p>
              </div>
            )}

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <QrCode className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>NMID: ID1020023910291 (ARIFIN STORE)</span>
              </div>

              {qrImageDataUrl ? (
                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
                  <img
                    src={qrImageDataUrl}
                    alt="QRIS Dinamis"
                    className="w-52 h-52 object-contain"
                  />
                </div>
              ) : (
                <div className="w-52 h-52 bg-slate-200 animate-pulse rounded-xl flex items-center justify-center text-xs text-slate-500">
                  Menyiapkan QRIS Dinamis...
                </div>
              )}

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadQR}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh QR</span>
                </button>
              </div>
            </div>

            {/* Total Payment & Nominal Copy */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-600 block">Total yang Harus Ditransfer:</span>
                <span className="text-2xl font-black text-[#0066cc] font-mono">
                  {formatRupiah(finalAmount)}
                </span>
              </div>
              <button
                type="button"
                onClick={copyNominal}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Tersalin!" : "Salin Nominal"}</span>
              </button>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center justify-between text-xs text-slate-600 border-t border-slate-200 pt-3">
              <div className="flex items-center gap-1.5 text-amber-600 font-semibold">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Batas Waktu Bayar: {timeFormatted}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Otomatis Verifikasi</span>
              </div>
            </div>

            {/* Simulation Action */}
            <div>
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>{isProcessing ? "Memverifikasi Pembayaran..." : "Saya Sudah Transfer (Cek Otomatis)"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Payment Success View */
          <div className="p-6 space-y-5 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Pembayaran Diterima!
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Transaksi Berhasil Diproses
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                No. Invoice: {invoice}
              </p>
            </div>

            {/* Fulfillment Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Produk:</span>
                <span className="font-bold text-slate-900">{orderData.title}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Tujuan Akun:</span>
                <span className="font-bold text-[#0066cc] font-mono">{orderData.targetAccount}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Nominal Dibayar:</span>
                <span className="font-bold text-emerald-600 font-mono">{formatRupiah(finalAmount)}</span>
              </div>

              {orderData.type === "digital" ? (
                <div className="pt-2 space-y-1.5">
                  <span className="text-xs font-bold text-amber-700 block">
                    🎁 Data Lisensi / Akses Anda:
                  </span>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-300 font-mono text-xs text-emerald-700 select-all break-all">
                    ACTIVATE-KEY: ARF-{Math.random().toString(36).substring(2, 10).toUpperCase()}-2026
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    *Link aktivasi juga telah dikirimkan ke email Anda. Silakan hubungi CS jika butuh bantuan setup.
                  </p>
                </div>
              ) : (
                <div className="pt-2 text-xs text-emerald-700">
                  ✅ Saldo telah sukses dikirim ke nomor <strong>{orderData.targetAccount}</strong> melalui gateway Sekalipay.
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`${STORE_INFO.whatsappUrl}?text=Halo%20Admin%20Arifin%20Store,%20saya%20sudah%20bayar%20invoice%20${invoice}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Konfirmasi WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
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
