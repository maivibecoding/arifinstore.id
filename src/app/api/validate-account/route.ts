import { NextResponse } from "next/server";

interface ValidateRequestBody {
  brandId: string;
  phoneNumber: string;
}

function detectOperator(phone: string): string {
  const p = phone.replace(/[^0-9]/g, "");
  const prefix4 = p.slice(0, 4);
  if (["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"].includes(prefix4)) return "Telkomsel";
  if (["0814", "0815", "0816", "0855", "0856", "0857", "0858"].includes(prefix4)) return "Indosat Ooredoo";
  if (["0817", "0818", "0819", "0859", "0877", "0878"].includes(prefix4)) return "XL Axiata";
  if (["0831", "0832", "0838"].includes(prefix4)) return "AXIS";
  if (["0895", "0896", "0897", "0898", "0899"].includes(prefix4)) return "Tri (3)";
  if (["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"].includes(prefix4)) return "Smartfren";
  return "Seluler";
}

export async function POST(req: Request) {
  try {
    const body: ValidateRequestBody = await req.json();
    const { brandId, phoneNumber } = body;

    const cleanNumber = (phoneNumber || "").replace(/[^0-9]/g, "");

    if (!cleanNumber || cleanNumber.length < 10 || cleanNumber.length > 14 || !cleanNumber.startsWith("08")) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_PHONE",
          message: "Nomor handphone tidak valid. Gunakan awalan 08 (10-13 digit).",
          phoneNumber: cleanNumber,
        },
        { status: 400 }
      );
    }

    const operator = detectOperator(cleanNumber);
    const apiKey = process.env.SEKALIPAY_API_KEY || "wa1GRp7sfVUrySqDBv8QORQMHYBgjXim";

    const BRAND_NAMES: Record<string, string> = {
      dana: "DANA",
      gopay: "GoPay",
      ovo: "OVO",
      shopeepay: "ShopeePay",
      linkaja: "LinkAja",
      isaku: "i.saku",
      astrapay: "AstraPay",
      doku: "DOKU",
    };
    const brandName = BRAND_NAMES[brandId.toLowerCase()] || brandId.toUpperCase();

    // Verified Sekalipay item IDs from /api/v1/validation/services
    const BRAND_ITEM_MAP: Record<string, number> = {
      dana: 8571,
      gopay: 8503,
      ovo: 9168,
      shopeepay: 9425,
      linkaja: 10888,
    };

    const itemId = BRAND_ITEM_MAP[brandId.toLowerCase()];

    // Brands that don't have account validation in Sekalipay (e.g. i.saku, AstraPay, DOKU)
    if (!itemId) {
      return NextResponse.json({
        success: true,
        isFormatValid: true,
        operator,
        status: "UNCONFIGURED",
        message: `Nomor ${operator} valid. Layanan ${brandName} tidak memerlukan cek nama pemilik (bisa langsung checkout).`,
        phoneNumber: cleanNumber,
      });
    }

    // Call Sekalipay Account Validation Endpoint
    const validateRes = await fetch("https://sekalipay.com/api/v1/item/validate", {
      method: "POST",
      headers: {
        "X-APIKEY": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        customer_id: cleanNumber,
      }),
      cache: "no-store",
    });

    const resJson = await validateRes.json();

    if (validateRes.ok && (resJson?.data?.account_name || resJson?.data?.display_name)) {
      const accountName = resJson.data.account_name || resJson.data.display_name;
      return NextResponse.json({
        success: true,
        accountName: String(accountName).trim().toUpperCase(),
        operator,
        phoneNumber: cleanNumber,
        source: "SEKALIPAY",
      });
    }

    if (resJson?.message && String(resJson.message).includes("INVALID_IP")) {
      const detectedIp = String(resJson.message).replace("INVALID_IP=", "").trim();
      return NextResponse.json({
        success: true,
        isFormatValid: true,
        operator,
        status: "IP_NOT_WHITELISTED",
        detectedIp,
        message: `Nomor ${operator} valid. Masukkan IP (${detectedIp}) ke Sekalipay Dashboard > IP Whitelist untuk menampilkan nama pemilik.`,
        phoneNumber: cleanNumber,
      });
    }

    if (resJson?.message === "INVALID_API_KEY") {
      return NextResponse.json({
        success: false,
        error: "INVALID_API_KEY",
        message: "API Key Sekalipay tidak valid.",
        phoneNumber: cleanNumber,
      });
    }

    if (resJson?.message === "NOT_FOUND" || resJson?.message === "Not found") {
      return NextResponse.json({
        success: false,
        error: "ACCOUNT_NOT_FOUND",
        message: `Nomor ${cleanNumber} tidak terdaftar sebagai akun ${brandName}. Periksa kembali nomor atau gunakan akun yang aktif.`,
        operator,
        phoneNumber: cleanNumber,
      });
    }

    return NextResponse.json({
      success: false,
      error: "ACCOUNT_NOT_FOUND",
      message: `Nomor ini tidak terdaftar atau tidak aktif di layanan ${brandName}.`,
      operator,
      phoneNumber: cleanNumber,
    });
  } catch (error: any) {
    console.error("Error in validate-account API:", error);
    return NextResponse.json(
      { success: false, error: "SERVER_ERROR", message: error.message || "Terjadi kesalahan server saat validasi." },
      { status: 500 }
    );
  }
}
