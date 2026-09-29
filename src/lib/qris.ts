/**
 * QRIS EMVCo Converter & Anti-Collision Engine
 * Berdasarkan spesifikasi QRIS Dinamis (https://github.com/verssache/qris-dinamis)
 */

export function calculateCRC16(str: string): string {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    crc ^= c << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

// Master Static QRIS template untuk Arifin Store (fallback standar QRIS Nasional)
export const DEFAULT_STATIC_QRIS =
  "00020101021126570014ID.GO-PAY.WWW01189360091436123456785204481453033605802ID5912ARIFIN STORE6007JAKARTA61051234062070703A016304";

/**
 * Mengubah string QRIS Statis menjadi QRIS Dinamis dengan menyisipkan Tag 54 (Nominal)
 * dan menghitung ulang CRC16
 */
export function convertStaticToDynamicQRIS(
  staticQris: string = DEFAULT_STATIC_QRIS,
  amount: number
): string {
  let qris = staticQris.trim();

  // Hapus Tag CRC 6304 di akhir jika ada
  if (qris.includes("6304")) {
    qris = qris.substring(0, qris.lastIndexOf("6304"));
  }

  // Ubah Tag 010211 (Statis) menjadi 010212 (Dinamis)
  if (qris.includes("010211")) {
    qris = qris.replace("010211", "010212");
  }

  // Format Tag 54 (Transaction Amount): 54 + 2 digit panjang + nilai nominal
  const amountStr = Math.round(amount).toString();
  const lenStr = amountStr.length.toString().padStart(2, "0");
  const tag54 = `54${lenStr}${amountStr}`;

  // Cari posisi Tag 58 (Country Code) untuk menyisipkan Tag 54 sebelum Tag 58
  let baseQris = qris;
  if (baseQris.includes("5802ID")) {
    baseQris = baseQris.replace("5802ID", `${tag54}5802ID`);
  } else {
    baseQris = `${baseQris}${tag54}`;
  }

  // Tambahkan prefix Tag 6304 dan hitung CRC16
  const payloadForChecksum = `${baseQris}6304`;
  const checksum = calculateCRC16(payloadForChecksum);

  return `${payloadForChecksum}${checksum}`;
}

/**
 * In-Memory Sequencer untuk Anti-Collision pada Transaksi > 400.000
 * Jika 400.000 -> 400.001. Jika 400.001 sudah ada yang pakai, otomatis 400.002, dst.
 */
class AntiCollisionSequencer {
  private activePendingNominals: Map<number, { expiresAt: number; invoice: string }> = new Map();

  /**
   * Mendapatkan nominal unik yang belum bentrok dengan transaksi pending lainnya
   */
  public getUniqueNominal(baseAmount: number, invoice: string): { finalAmount: number; uniqueCode: number } {
    this.cleanExpired();

    let counter = 1;
    let candidate = baseAmount + counter;

    while (this.activePendingNominals.has(candidate)) {
      counter++;
      candidate = baseAmount + counter;
    }

    // Kunci nominal ini selama 15 menit (900.000 ms)
    this.activePendingNominals.set(candidate, {
      expiresAt: Date.now() + 15 * 60 * 1000,
      invoice,
    });

    return {
      finalAmount: candidate,
      uniqueCode: counter,
    };
  }

  public releaseNominal(nominal: number): void {
    this.activePendingNominals.delete(nominal);
  }

  public getActiveQueue() {
    this.cleanExpired();
    return Array.from(this.activePendingNominals.entries()).map(([nominal, data]) => ({
      nominal,
      invoice: data.invoice,
      expiresInSeconds: Math.max(0, Math.round((data.expiresAt - Date.now()) / 1000)),
    }));
  }

  private cleanExpired(): void {
    const now = Date.now();
    for (const [nominal, data] of this.activePendingNominals.entries()) {
      if (data.expiresAt < now) {
        this.activePendingNominals.delete(nominal);
      }
    }
  }
}

export const qrisSequencer = new AntiCollisionSequencer();
