"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STORE_INFO, EMONEY_BRANDS } from "@/lib/constants";
import { AuthUser } from "@/components/AuthModal";
import {
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  FileSearch,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Wallet,
  Layers,
  FileText,
  Clock,
} from "lucide-react";

interface NavbarProps {
  onOpenTracker?: () => void;
  onOpenAdmin?: () => void;
  onOpenAuth?: (tab?: "login" | "register") => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export default function Navbar({
  onOpenTracker,
  onOpenAdmin,
  onOpenAuth,
  currentUser,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const closeAll = () => {
    setActiveDropdown(null);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#35508d] text-white shadow-md">
      {/* Top micro bar for announcements */}
      <div className="bg-[#273b68] border-b border-white/10 text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between text-blue-100">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Layanan Top Up E-Money & QRIS Otomatis Online 24 Jam Non-Stop</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <span>Customer Support: <strong>{STORE_INFO.whatsapp}</strong></span>
          <a
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-300 hover:text-white flex items-center gap-1 font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat CS</span>
          </a>
        </div>
      </div>

      {/* HotelMurah Style Container: hm_header_container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: hm-header-first */}
        <div className="hm-header-first flex items-center justify-between h-15 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90 py-1">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
              arifinstore<span className="text-amber-400">.id</span>
            </span>
          </Link>

          {/* Right side: Masuk / Daftar, Bantuan, & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0066cc] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden xs:block">
                    <span className="text-xs font-bold block leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      VIP
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email || currentUser.phone}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenTracker?.();
                      }}
                      className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left flex items-center gap-2 cursor-pointer"
                    >
                      <FileSearch className="w-4 h-4 text-[#0066cc]" />
                      Riwayat Pesanan Saya
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout?.();
                      }}
                      className="w-full px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar (Logout)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAuth?.("login")}
                  className="hm-login px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold text-white hover:bg-white/10 border border-white/20 transition-all cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth?.("register")}
                  className="hm-regis px-3 sm:px-4 py-1.5 rounded-lg text-xs font-extrabold text-[#35508d] bg-white hover:bg-blue-50 shadow-sm transition-all cursor-pointer"
                >
                  Daftar
                </button>
              </div>
            )}

            {/* WA Help Button */}
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Bantuan</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Row 2: hm-header-second (HotelMurah Style Sub-Navigation Bar) */}
        <div className="hm-header-second hidden md:flex items-center justify-between border-t border-white/15 py-1 text-xs sm:text-sm font-semibold text-white/90">
          <nav className="flex items-center gap-1 lg:gap-2">
            {/* Direct Link: Beranda / Semua Layanan */}
            <div className="produk-ref">
              <Link
                href="/topup-e-wallet"
                className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1"
              >
                Semua Layanan
              </Link>
            </div>

            {/* Dropdown 1: Isi Ulang & E-Wallet (produk-ref-list topup) */}
            <div
              className="produk-ref-list topup relative"
              onMouseEnter={() => setActiveDropdown("topup")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "topup" ? null : "topup")}
                className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Wallet className="w-4 h-4 text-sky-300" />
                <span>Isi Ulang & E-Wallet</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "topup" ? "rotate-180" : ""}`} />
              </button>

              {/* Box List Dropdown */}
              {activeDropdown === "topup" && (
                <div className="produk-list topup-list absolute left-0 top-full pt-1 z-50 min-w-[270px] animate-in fade-in slide-in-from-top-1">
                  <div className="box-list bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-2.5 space-y-1">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                      <span>Pilihan E-Wallet Populer</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">24 Jam</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 pt-1">
                      <Link
                        href="/topup/dana"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>DANA</span>
                      </Link>
                      <Link
                        href="/topup/gopay"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>GoPay</span>
                      </Link>
                      <Link
                        href="/topup/ovo"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>OVO</span>
                      </Link>
                      <Link
                        href="/topup/shopeepay"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>ShopeePay</span>
                      </Link>
                      <Link
                        href="/topup/linkaja"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span>LinkAja</span>
                      </Link>
                      <Link
                        href="/topup/astrapay"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>AstraPay</span>
                      </Link>
                      <Link
                        href="/topup/isaku"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span>i.saku</span>
                      </Link>
                      <Link
                        href="/topup/doku"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>DOKU</span>
                      </Link>
                    </div>
                    <div className="pt-1.5 border-t border-slate-100">
                      <Link
                        href="/topup-e-wallet"
                        onClick={closeAll}
                        className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-center text-[#0066cc] hover:bg-blue-50 flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Lihat Semua Provider & Nominal</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 2: Produk Digital & AI */}
            <div
              className="produk-ref-list digital relative"
              onMouseEnter={() => setActiveDropdown("digital")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "digital" ? null : "digital")}
                className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-emerald-300" />
                <span>Produk Digital & AI</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "digital" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "digital" && (
                <div className="produk-list digital-list absolute left-0 top-full pt-1 z-50 min-w-[280px] animate-in fade-in slide-in-from-top-1">
                  <div className="box-list bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-2.5 space-y-1">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Lisensi Digital Premium Bergaransi
                    </div>
                    <div className="space-y-0.5 pt-1">
                      <Link
                        href="/produk/gemini-pro-18months"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between transition-colors"
                      >
                        <span>Gemini Pro 18 Bulan</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-semibold">AI Pro</span>
                      </Link>
                      <Link
                        href="/produk/duolingo-super-12m"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between transition-colors"
                      >
                        <span>Duolingo Super 1 Tahun</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-semibold">12 Bulan</span>
                      </Link>
                      <Link
                        href="/produk/notion-plus"
                        onClick={closeAll}
                        className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-between transition-colors"
                      >
                        <span>Notion Plus Education</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">Workspace</span>
                      </Link>
                    </div>
                    <div className="pt-1.5 border-t border-slate-100">
                      <Link
                        href="/#digital-section"
                        onClick={closeAll}
                        className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-center text-[#0066cc] hover:bg-blue-50 flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Katalog Akun Digital Lainnya</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 3: Transaksi (produk-ref-list trx) */}
            <div
              className="produk-ref-list trx relative"
              onMouseEnter={() => setActiveDropdown("trx")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "trx" ? null : "trx")}
                className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Transaksi</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "trx" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "trx" && (
                <div className="produk-list trx-list absolute left-0 top-full pt-1 z-50 min-w-[250px] animate-in fade-in slide-in-from-top-1">
                  <div className="box-list bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-2.5 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        closeAll();
                        onOpenTracker?.();
                      }}
                      className="w-full px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 text-left transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#0066cc]" />
                      <span>Transaksi Terakhir e-Wallet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeAll();
                        onOpenTracker?.();
                      }}
                      className="w-full px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0066cc] flex items-center gap-2 text-left transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#0066cc]" />
                      <span>Transaksi Terakhir Akun Digital</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Link: Blog & Edukasi */}
            <div className="produk-ref">
              <Link
                href="/#blog-section"
                className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
              >
                Blog & Edukasi
              </Link>
            </div>
          </nav>

          {/* Admin Button if provided */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1 text-xs font-bold text-blue-200 bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-2 border-t border-white/10 bg-[#273b68] rounded-b-2xl animate-in slide-in-from-top-2">
            {currentUser && (
              <div className="p-3 bg-white/10 rounded-xl mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-300">VIP Member Aktif</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout?.();
                  }}
                  className="text-xs text-rose-300 hover:underline font-semibold cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            )}

            {!currentUser && (
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.("login");
                  }}
                  className="py-2.5 rounded-xl text-xs font-bold text-white bg-white/15 hover:bg-white/25 text-center cursor-pointer"
                >
                  Masuk Akun
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.("register");
                  }}
                  className="py-2.5 rounded-xl text-xs font-extrabold text-[#35508d] bg-white hover:bg-blue-50 text-center cursor-pointer"
                >
                  Daftar Baru
                </button>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-[11px] font-bold text-blue-200/60 uppercase tracking-wider px-3 pt-2">
                Isi Ulang & E-Wallet
              </p>
              <div className="grid grid-cols-2 gap-1 px-1">
                <Link
                  href="/topup/dana"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-white hover:bg-white/10"
                >
                  Top Up DANA
                </Link>
                <Link
                  href="/topup/gopay"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-white hover:bg-white/10"
                >
                  Top Up GoPay
                </Link>
                <Link
                  href="/topup/shopeepay"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-white hover:bg-white/10"
                >
                  ShopeePay
                </Link>
                <Link
                  href="/topup/ovo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-white hover:bg-white/10"
                >
                  Top Up OVO
                </Link>
              </div>
              <Link
                href="/topup-e-wallet"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-amber-300 hover:bg-white/10"
              >
                <span>Lihat Semua Provider E-Wallet &raquo;</span>
              </Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/10">
              <p className="text-[11px] font-bold text-blue-200/60 uppercase tracking-wider px-3">
                Produk Digital & AI
              </p>
              <Link
                href="/produk/gemini-pro-18months"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-white hover:bg-white/10"
              >
                <span>Gemini Pro 18 Bulan</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-200">AI Pro</span>
              </Link>
              <Link
                href="/produk/duolingo-super-12m"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-white hover:bg-white/10"
              >
                <span>Duolingo Super 1 Tahun</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200">12 Bulan</span>
              </Link>
              <Link
                href="/#digital-section"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-amber-300 hover:bg-white/10"
              >
                <span>Semua Akun Digital &raquo;</span>
              </Link>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker?.();
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-white hover:bg-white/10 text-left cursor-pointer"
              >
                <FileSearch className="w-4 h-4 text-sky-300" />
                <span>Transaksi Terakhir / Cek Pesanan</span>
              </button>
              <Link
                href="/#blog-section"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-white hover:bg-white/10"
              >
                <span>Blog & Edukasi SEO</span>
              </Link>
            </div>

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-blue-200 bg-white/10 text-left cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Masuk Dashboard Admin</span>
              </button>
            )}

            <div className="pt-2">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat WhatsApp CS ({STORE_INFO.whatsapp})</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
