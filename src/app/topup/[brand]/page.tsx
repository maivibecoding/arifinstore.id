import type { Metadata } from "next";
import EWalletBrandOrderPage from "@/components/EWalletBrandOrderPage";
import { EMONEY_BRANDS } from "@/lib/constants";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return EMONEY_BRANDS.map((brand) => ({
    brand: brand.id,
  }));
}

interface PageProps {
  params: Promise<{
    brand: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandParam } = await params;
  const brand = EMONEY_BRANDS.find((b) => b.id.toLowerCase() === brandParam.toLowerCase());

  if (!brand) {
    return {
      title: "Top Up E-Wallet Murah 24 Jam | Arifin Store",
    };
  }

  return {
    title: `Beli Saldo ${brand.name} | Top Up ${brand.name} Murah 24 Jam`,
    description: `Isi ulang saldo ${brand.name} online tercepat tanpa biaya admin berlebih. 19 pilihan nominal lengkap dari 10.000 s/d 100.000 dengan QRIS otomatis di Arifin Store.`,
    keywords: [
      `top up ${brand.name.toLowerCase()}`,
      `beli saldo ${brand.name.toLowerCase()}`,
      `isi ${brand.name.toLowerCase()} murah`,
      `topup ${brand.name.toLowerCase()} 24 jam`,
      "arifinstore.id",
    ],
    openGraph: {
      title: `Beli Saldo ${brand.name} | Top Up ${brand.name} Murah`,
      description: `Top up saldo ${brand.name} instan 5 detik via QRIS otomatis. Pilihan nominal 10k hingga 100k bergaransi 100%.`,
      images: [
        {
          url: brand.icon,
          width: 200,
          height: 200,
          alt: `Top Up ${brand.name}`,
        },
      ],
    },
  };
}

export default async function TopupBrandPage({ params }: PageProps) {
  const { brand: brandParam } = await params;
  const brand = EMONEY_BRANDS.find((b) => b.id.toLowerCase() === brandParam.toLowerCase());

  if (!brand) {
    notFound();
  }

  return <EWalletBrandOrderPage brandId={brand.id} />;
}
