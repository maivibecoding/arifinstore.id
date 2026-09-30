"use client";

import React from "react";
import Link from "next/link";
import { STORE_INFO, EMONEY_BRANDS } from "@/lib/constants";
import {
  MessageCircle,
  Mail,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#273b68] text-white border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <span className="text-2xl font-black tracking-tight text-white">
                arifinstore<span className="text-amber-400">.id</span>
              </span>
            </Link>
            <p className="text-xs text-blue-100/80 leading-relaxed max-w-sm">
              <strong>{STORE_INFO.name}</strong> adalah platform resmi penyedia layanan isi ulang e-money/e-wallet tercepat di Indonesia serta lisensi akun digital premium bergaransi dengan sistem pembayaran QRIS otomatis 24 jam.
            </p>
            <div className="text-xs text-blue-100 space-y-1">
              <p>
                Owner: <strong>{STORE_INFO.owner}</strong>
              </p>
              <p>
                Email: <a href={`mailto:${STORE_INFO.email}`} className="text-sky-300 hover:underline">{STORE_INFO.email}</a>
              </p>
              <p>
                WhatsApp CS: <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:underline">{STORE_INFO.whatsapp}</a>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={STORE_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Layanan Top-Up */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Top-Up E-Wallet
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <Link href="/topup-e-wallet" className="hover:text-white transition-colors">
                  Topup E-Wallet Master Hub
                </Link>
              </li>
              <li>
                <Link href="/topup/dana" className="hover:text-white transition-colors">
                  Top Up DANA Bebas Biaya
                </Link>
              </li>
              <li>
                <Link href="/topup/gopay" className="hover:text-white transition-colors">
                  Top Up GoPay Instan
                </Link>
              </li>
              <li>
                <Link href="/topup/shopeepay" className="hover:text-white transition-colors">
                  Top Up ShopeePay
                </Link>
              </li>
              <li>
                <Link href="/topup/ovo" className="hover:text-white transition-colors">
                  Top Up OVO Murah
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Produk Digital Premium */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Produk Digital & AI
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <Link href="/produk/gemini-pro-18months" className="hover:text-white transition-colors">
                  Gemini Pro 18Months (link)
                </Link>
              </li>
              <li>
                <Link href="/produk/duolingo-super-12m" className="hover:text-white transition-colors">
                  Duolingo Super 12M
                </Link>
              </li>
              <li>
                <Link href="/produk/notion-plus" className="hover:text-white transition-colors">
                  Notion Plus 1 Tahun
                </Link>
              </li>
              <li>
                <Link href="/#digital-section" className="hover:text-white transition-colors">
                  Microsoft Office 365 Plus
                </Link>
              </li>
              <li>
                <Link href="/#digital-section" className="hover:text-white transition-colors">
                  Adobe Express & JetBrains
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Keamanan & Pembayaran */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Metode Pembayaran
            </h4>
            <div className="p-3.5 rounded-xl bg-white/10 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>QRIS All Payment</span>
              </div>
              <p className="text-[11px] text-blue-100/80 leading-relaxed">
                Mendukung semua bank (BCA, Mandiri, BRI, BNI) dan seluruh dompet digital otomatis via QRIS.
              </p>
              <div className="pt-1 flex flex-wrap gap-1">
                {EMONEY_BRANDS.slice(0, 6).map((b) => (
                  <span
                    key={b.id}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold"
                  >
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200/70 gap-3">
          <p>
            &copy; {new Date().getFullYear()} <strong>{STORE_INFO.name}</strong> ({STORE_INFO.domain}). All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan dedikasi untuk pengguna Indonesia</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
