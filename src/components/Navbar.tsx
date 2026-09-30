"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { STORE_INFO } from "@/lib/constants";
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
  Sparkles,
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

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90 py-1">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
              arifinstore<span className="text-amber-400">.id</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/topup-e-wallet"
              className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              Topup E-Wallet
            </Link>

            <Link
              href="/#digital-section"
              className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Produk Digital
            </Link>

            <button
              onClick={onOpenTracker}
              className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileSearch className="w-4 h-4 text-sky-300" />
              Cek Pesanan
            </button>

            <Link
              href="/#blog-section"
              className="px-3 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Blog & Edukasi
            </Link>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-2.5 py-1.5 text-xs font-bold text-blue-200 bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Admin
              </button>
            )}
          </nav>

          {/* User Auth & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              /* User is Logged In */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0066cc] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold block leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      VIP Member
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
                </button>

                {/* Dropdown Menu */}
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
                      className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left flex items-center gap-2"
                    >
                      <FileSearch className="w-4 h-4 text-[#0066cc]" />
                      Riwayat Pesanan Saya
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout?.();
                      }}
                      className="w-full px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar (Logout)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* User is NOT Logged In: Show Clean Masuk / Daftar button */
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAuth?.("login")}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 border border-white/20 transition-all cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth?.("register")}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-[#35508d] bg-white hover:bg-blue-50 shadow-sm transition-all cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Bantuan</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {!currentUser ? (
              <button
                type="button"
                onClick={() => onOpenAuth?.("login")}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0066cc] hover:bg-[#0052a3]"
              >
                Masuk
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onLogout?.()}
                className="p-1.5 rounded-lg text-xs font-bold text-blue-200 bg-white/10"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                  className="text-xs text-rose-300 hover:underline font-semibold"
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
                  className="py-2.5 rounded-xl text-xs font-bold text-white bg-white/15 hover:bg-white/25 text-center"
                >
                  Masuk Akun
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.("register");
                  }}
                  className="py-2.5 rounded-xl text-xs font-extrabold text-[#35508d] bg-white hover:bg-blue-50 text-center"
                >
                  Daftar Baru
                </button>
              </div>
            )}

            <Link
              href="/topup-e-wallet"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              Topup E-Wallet
            </Link>
            <Link
              href="/#digital-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Produk Digital & AI
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker?.();
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 text-left"
            >
              <FileSearch className="w-4 h-4 text-sky-300" />
              Cek Status Pesanan
            </button>
            <Link
              href="/#blog-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
            >
              Blog & Edukasi SEO
            </Link>

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-blue-200 bg-white/10 text-left"
              >
                <LayoutDashboard className="w-4 h-4" />
                Masuk Dashboard Admin
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
                Chat WhatsApp CS ({STORE_INFO.whatsapp})
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
