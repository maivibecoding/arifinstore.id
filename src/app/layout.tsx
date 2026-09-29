import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Arifin Store - Top Up E-Money & Produk Digital Termurah 24 Jam",
    template: "%s | Arifin Store",
  },
  description:
    "Pusat top up saldo DANA, ShopeePay, GoPay, OVO, LinkAja, i.saku, DOKU, AstraPay instan bebas nominal, serta akun premium Gemini Pro 18M, Duolingo Super, Notion Plus resmi & bergaransi.",
  keywords: [
    "topup e-wallet",
    "top up dana murah",
    "topup gopay",
    "topup shopeepay",
    "gemini pro 18months",
    "duolingo super 12m",
    "notion plus",
    "arifinstore.id",
    "qris dinamis",
  ],
  authors: [{ name: "Mokhammad Arifin Ilham" }],
  creator: "Mokhammad Arifin Ilham",
  metadataBase: new URL("https://www.arifinstore.web.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.arifinstore.web.id",
    siteName: "Arifin Store",
    title: "Arifin Store - Top Up E-Money & Akun Digital Premium 24 Jam",
    description:
      "Isi ulang saldo e-wallet instan hitungan detik via QRIS otomatis. Dapatkan akun Gemini Pro, Duolingo Super, dan Notion Plus bergaransi.",
    images: [
      {
        url: "/assets/logo200x200.png",
        width: 200,
        height: 200,
        alt: "Arifin Store Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/assets/logo200x200.png",
    apple: "/assets/logo200x200.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} dark antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col mesh-gradient-bg text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
