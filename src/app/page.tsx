"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import CategorySilo from "@/components/CategorySilo";
import DigitalProductsSection from "@/components/DigitalProductsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import CheckoutModal from "@/components/CheckoutModal";
import PromoPopup from "@/components/PromoPopup";
import OrderTrackerModal from "@/components/OrderTrackerModal";
import AdminDashboardModal from "@/components/AdminDashboardModal";
import AuthModal, { AuthUser } from "@/components/AuthModal";
import { DigitalProduct } from "@/types";
import { ShieldCheck, Zap, Clock, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { STORE_INFO } from "@/lib/constants";

export default function HomePage() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Authentication states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<"login" | "register">("login");
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Load auth state from localStorage on client mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("arifinstore_auth_user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Error reading auth state", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("arifinstore_auth_user");
    setCurrentUser(null);
  };

  const handleOpenAuth = (tab: "login" | "register" = "login") => {
    setAuthDefaultTab(tab);
    setAuthModalOpen(true);
  };

  const [checkoutOrder, setCheckoutOrder] = useState<{
    type: "e-money" | "digital";
    title: string;
    targetAccount: string;
    accountHolderName?: string;
    basePrice: number;
  } | null>(null);

  const handleDigitalCheckout = (data: {
    type: "digital";
    product: DigitalProduct;
    email: string;
  }) => {
    setCheckoutOrder({
      type: "digital",
      title: data.product.name,
      targetAccount: data.email,
      basePrice: data.product.price,
    });
    setCheckoutModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f6f9]">
      {/* 1. Navbar with HotelMurah Navy Header & Auth state */}
      <Navbar
        onOpenTracker={() => setTrackerModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Hero Promotional Banner Carousel */}
      <PromoBanner />

      {/* 3. Category Silo Navigation (HotelMurah Clean Style with pilih-klik e-wallet grid) */}
      <CategorySilo />

      {/* 4. Keunggulan Arifin Store (HotelMurah Style Trust Badges) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Proses 5 Detik</h3>
              <p className="text-[11px] text-slate-500">Saldo otomatis masuk</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">QRIS All Payment</h3>
              <p className="text-[11px] text-slate-500">BCA, BRI, DANA, GoPay</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Garansi 100%</h3>
              <p className="text-[11px] text-slate-500">Uang kembali / ganti baru</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Bantuan CS 24 Jam</h3>
              <p className="text-[11px] text-slate-500">WhatsApp fast response</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Digital Products Section (7 ProdSeller Curated Items) */}
      <DigitalProductsSection onCheckout={handleDigitalCheckout} />

      {/* 6. Blog & SEO Hub */}
      <BlogSection />

      {/* 7. Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authDefaultTab}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        orderData={checkoutOrder}
      />

      <OrderTrackerModal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
      />

      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      <PromoPopup />
    </main>
  );
}
