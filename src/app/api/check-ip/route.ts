import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  let outboundIp = "Unknown";
  let sekalipayDetectedIp = "Unknown";
  let sekalipayStatus = "Unknown";

  // 1. Cek Outbound IP Vercel via service publik
  try {
    const ipRes = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
    const ipJson = await ipRes.json();
    outboundIp = ipJson.ip;
  } catch (e: any) {
    outboundIp = e.message;
  }

  // 2. Cek deteksi IP langsung dari server Sekalipay
  const apiKey = process.env.SEKALIPAY_API_KEY || "wa1GRp7sfVUrySqDBv8QORQMHYBgjXim";
  try {
    const sekRes = await fetch("https://sekalipay.com/api/v1/balance", {
      headers: {
        "X-APIKEY": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const sekJson = await sekRes.json();
    sekalipayStatus = String(sekJson.message || JSON.stringify(sekJson));

    if (sekalipayStatus.includes("INVALID_IP=")) {
      sekalipayDetectedIp = sekalipayStatus.replace("INVALID_IP=", "").trim();
    } else if (sekRes.ok) {
      sekalipayDetectedIp = "IP_ALREADY_WHITELISTED_SUCCESS";
    }
  } catch (e: any) {
    sekalipayStatus = e.message;
  }

  return NextResponse.json({
    success: true,
    vercel_outbound_ip: outboundIp,
    ip_terdeteksi_sekalipay: sekalipayDetectedIp,
    status_sekalipay: sekalipayStatus,
    panduan: [
      "1. Buka Dashboard Sekalipay -> Menu Settings/API -> IP Whitelist",
      `2. Masukkan IP '${sekalipayDetectedIp !== "Unknown" ? sekalipayDetectedIp : outboundIp}' atau '${outboundIp}' ke kolom IP Whitelist`,
      "3. Jika dashboard Sekalipay mendukung 0.0.0.0/0 atau bisa dinonaktifkan, Anda bisa mencobanya untuk mengizinkan semua serverless IP Vercel",
      "4. Klik Simpan di Sekalipay"
    ]
  });
}
