import { NextResponse } from "next/server";
import { convertStaticToDynamicQRIS, qrisSequencer } from "@/lib/qris";

export async function POST(req: Request) {
  try {
    const { amount, invoice, customerName, title } = await req.json();

    if (!amount || amount < 1000) {
      return NextResponse.json(
        { success: false, error: "INVALID_AMOUNT", message: "Nominal pembayaran minimal Rp 1.000" },
        { status: 400 }
      );
    }

    const inv = invoice || `ARF-${Date.now()}`;
    const base = Number(amount);

    // Rule: Jika nominal > 400.000 gunakan QRIS Statis to Dinamis (+1, +2 anti-collision)
    if (base > 400000) {
      const { finalAmount, uniqueCode } = qrisSequencer.getUniqueNominal(base, inv);
      const qrisString = convertStaticToDynamicQRIS(undefined, finalAmount);
      return NextResponse.json({
        success: true,
        gateway: "DYNAMIC_QRIS",
        invoice: inv,
        baseAmount: base,
        finalAmount,
        uniqueCode,
        qrisString,
        isDynamicAntiCollision: true,
      });
    }

    // Rule: Jika nominal <= 400.000 gunakan IndoApi QRIS
    const indoApiKey = process.env.INDOAPI_API_KEY;
    if (indoApiKey) {
      try {
        const indoRes = await fetch("https://indoapi.biz/api/v1/payment/create", {
          method: "POST",
          headers: {
            "X-API-Key": indoApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: base,
            reference: inv,
            customer_name: customerName || "Pelanggan Arifin Store",
            description: title || `Order ${inv}`,
          }),
        });

        const indoData = await indoRes.json();
        if (indoRes.ok && indoData?.data?.qris_string) {
          return NextResponse.json({
            success: true,
            gateway: "INDOAPI",
            invoice: indoData.data.invoice || inv,
            reference: inv,
            baseAmount: base,
            finalAmount: base,
            uniqueCode: 0,
            qrisString: indoData.data.qris_string,
            qrImage: indoData.data.qr_image,
            paymentUrl: indoData.data.payment_url,
          });
        }
      } catch (err) {
        console.error("IndoApi live call error, fallback to converter:", err);
      }
    }

    // Fallback converter
    const fallbackQris = convertStaticToDynamicQRIS(undefined, base);
    return NextResponse.json({
      success: true,
      gateway: "INDOAPI",
      invoice: inv,
      baseAmount: base,
      finalAmount: base,
      uniqueCode: 0,
      qrisString: fallbackQris,
    });
  } catch (error: any) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { success: false, error: "SERVER_ERROR", message: error.message },
      { status: 500 }
    );
  }
}
