import { NextResponse } from "next/server";

interface ValidateRequestBody {
  brandId: string;
  phoneNumber: string;
}

export async function POST(req: Request) {
  try {
    const body: ValidateRequestBody = await req.json();
    const { brandId, phoneNumber } = body;

    if (!phoneNumber || phoneNumber.length < 10) {
      return NextResponse.json(
        { success: false, error: "INVALID_PHONE", message: "Nomor handphone minimal 10 digit." },
        { status: 400 }
      );
    }

    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
    const apiKey = process.env.SEKALIPAY_API_KEY || "wa1GRp7sfVUrySqDBv8QORQMHYBgjXim";

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "API_KEY_NOT_CONFIGURED",
        message: "API Key Sekalipay belum dikonfigurasi di Environment Variable (SEKALIPAY_API_KEY).",
        phoneNumber: cleanNumber,
      });
    }

    // Discover item_id dynamically from Sekalipay validation services
    let itemId: number | null = null;
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
        item_id: itemId || 1,
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
        phoneNumber: cleanNumber,
        source: "SEKALIPAY",
      });
    }

    if (resJson?.message && String(resJson.message).includes("INVALID_IP")) {
      const detectedIp = String(resJson.message).replace("INVALID_IP=", "").trim();
      return NextResponse.json({
        success: false,
        error: "IP_NOT_WHITELISTED",
        message: `IP belum di-whitelist di Dashboard Sekalipay: ${detectedIp}`,
        detectedIp,
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
      message: resJson?.message || `Nomor tidak terdaftar atau tidak valid di layanan ${brandId.toUpperCase()}`,
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
