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

    // Item ID mapping for common e-wallets in Sekalipay
    const BRAND_ITEM_MAP: Record<string, number> = {
      dana: 1,
      gopay: 2,
      ovo: 3,
      shopeepay: 4,
      linkaja: 5,
      isaku: 6,
      astrapay: 7,
      doku: 8,
    };

    let itemId = BRAND_ITEM_MAP[brandId.toLowerCase()] || 1;

    // Discover dynamic item_id from Sekalipay validation services if possible
    try {
      const servicesRes = await fetch(
        `https://sekalipay.com/api/v1/validation/services?search=${encodeURIComponent(brandId)}`,
        {
          headers: {
            "X-APIKEY": apiKey,
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        if (Array.isArray(servicesData?.data) && servicesData.data.length > 0) {
          const product = servicesData.data[0];
          if (Array.isArray(product?.variants) && product.variants.length > 0) {
            itemId = product.variants[0].item_id;
          }
        }
      }
    } catch (e) {
      console.warn("Sekalipay services lookup warning:", e);
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
        message: `Nomor ${operator} valid. IP server/laptop (${detectedIp}) belum di-whitelist di Sekalipay.`,
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

    return NextResponse.json({
      success: false,
      error: "ACCOUNT_NOT_FOUND",
      message: resJson?.message || `Nomor tidak terdaftar atau tidak aktif di layanan ${brandId.toUpperCase()}.`,
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
