"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { STORE_INFO } from "@/lib/constants";
import {
  Search,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  FileSearch,
} from "lucide-react";

interface NavbarProps {
  onOpenTracker?: () => void;
  onOpenAdmin?: () => void;
}

export default function Navbar({ onOpenTracker, onOpenAdmin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
            <div className="relative h-11 w-40 sm:w-48">
              <Image
                src="/assets/logo464x127.png"
                alt="Arifin Store"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/#topup-section"
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Topup E-Wallet
            </Link>

            <Link
              href="/#digital-section"
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Produk Digital
            </Link>

            <button
              onClick={onOpenTracker}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileSearch className="w-4 h-4 text-sky-400" />
              Cek Pesanan
            </button>

            <Link
              href="/#blog-section"
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Blog & Tips
            </Link>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-2.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Action Button: CS WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/30 hover:scale-[1.02] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Bantuan WA 24 Jam</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-2 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl rounded-b-2xl animate-in slide-in-from-top-2">
            <Link
              href="/#topup-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Topup E-Wallet
            </Link>
            <Link
              href="/#digital-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Produk Digital & AI
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker?.();
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 text-left"
            >
              <FileSearch className="w-4 h-4 text-sky-400" />
              Cek Status Pesanan
            </button>
            <Link
              href="/#blog-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              Blog & Tips SEO
            </Link>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 text-left"
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
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500"
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
