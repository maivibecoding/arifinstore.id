"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import CategorySilo from "@/components/CategorySilo";
import EMoneyTopupSection from "@/components/EMoneyTopupSection";
import DigitalProductsSection from "@/components/DigitalProductsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import CheckoutModal from "@/components/CheckoutModal";
import PromoPopup from "@/components/PromoPopup";
import OrderTrackerModal from "@/components/OrderTrackerModal";
import AdminDashboardModal from "@/components/AdminDashboardModal";
import { EMoneyBrand, NominalItem, DigitalProduct } from "@/types";

export default function HomePage() {
  const [selectedBrandId, setSelectedBrandId] = useState("dana");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const [checkoutOrder, setCheckoutOrder] = useState<{
    type: "e-money" | "digital";
    title: string;
    targetAccount: string;
    accountHolderName?: string;
    basePrice: number;
  } | null>(null);

  const handleEMoneyCheckout = (data: {
    type: "e-money";
    brand: EMoneyBrand;
    nominal: NominalItem;
    phoneNumber: string;
    accountName: string;
  }) => {
    setCheckoutOrder({
      type: "e-money",
      title: `${data.brand.name} Rp ${data.nominal.label}`,
      targetAccount: data.phoneNumber,
      accountHolderName: data.accountName,
      basePrice: data.nominal.price,
    });
    setCheckoutModalOpen(true);
  };

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

  const handleBrandSelectFromSilo = (brandId: string) => {
    setSelectedBrandId(brandId);
    const element = document.getElementById("topup-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* 1. Navbar */}
      <Navbar
        onOpenTracker={() => setTrackerModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* 2. Hero Promotional Banner Carousel */}
      <PromoBanner />

      {/* 3. Category Silo Navigation (HotelMurah Style) */}
      <CategorySilo onSelectBrand={handleBrandSelectFromSilo} />

      {/* 4. E-Money Top-Up Section (19 Fixed Denominations + Sekalipay Open Denom) */}
      <EMoneyTopupSection
        selectedBrandId={selectedBrandId}
        onCheckout={handleEMoneyCheckout}
      />

      {/* 5. Digital Products Section (7 ProdSeller Curated Items) */}
      <DigitalProductsSection onCheckout={handleDigitalCheckout} />

      {/* 6. Blog & SEO Hub */}
      <BlogSection />

      {/* 7. Footer */}
      <Footer />

      {/* Modals & Overlays */}
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
