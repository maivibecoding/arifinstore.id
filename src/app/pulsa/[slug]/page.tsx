import type { Metadata } from "next";
import EWalletBrandOrderPage from "@/components/EWalletBrandOrderPage";
import { EMONEY_BRANDS } from "@/lib/constants";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return EMONEY_BRANDS.map((brand) => ({
    slug: `top-up-${brand.id}`,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brandId = slug.replace(/^top-up-/, "").toLowerCase();
  const brand = EMONEY_BRANDS.find((b) => b.id.toLowerCase() === brandId);

  if (!brand) {
    return {
      title: "Top Up E-Wallet Murah | Arifin Store",
    };
  }

  return {
    title: `Beli Saldo ${brand.name} | Top Up ${brand.name} Murah`,
    description: `Top up pakai ${brand.name} di Arifin Store bisa bikin kamu hemat banyak! Pilihan nominal 10.000 hingga 100.000 dengan proses otomatis 5 detik via QRIS.`,
    keywords: [
      `top up ${brand.name.toLowerCase()}`,
      `isi ${brand.name.toLowerCase()} murah`,
      `beli saldo ${brand.name.toLowerCase()}`,
      "arifinstore.id",
    ],
  };
}

export default async function PulsaBrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brandId = slug.replace(/^top-up-/, "").toLowerCase();
  const brand = EMONEY_BRANDS.find((b) => b.id.toLowerCase() === brandId);

  if (!brand) {
    notFound();
  }

  return <EWalletBrandOrderPage brandId={brand.id} />;
}
