# Product Requirement Document (PRD)
## Platform Web Top-Up E-Money & Produk Digital — Arifin Store (arifinstore.id)

---

| Dokumen Info | Keterangan |
| :--- | :--- |
| **Nama Proyek** | Arifin Store Website (arifinstore.id) |
| **Versi Dokumen** | 1.0.0 (Production-Ready Spec) |
| **Status** | Approved for Development |
| **Pemilik Bisnis** | Mokhammad Arifin Ilham |
| **Domain Utama** | [arifinstore.id](https://arifinstore.id) |
| **Kontak Resmi** | WhatsApp: `083183787697` \| Email: `admin@arifinstore.id` |
| **Media Sosial** | Instagram: `@arifinstoredigital` \| TikTok: `@arifinstoredigitall` \| YouTube: `@arifinstoredigital` |
| **Target Deployment** | Vercel (Edge/Serverless Platform via GitHub CI/CD) |
| **Desain UI/Aesthetic** | Modern Dark/Light Glassmorphism (Frosted Glass, Ambient Glow, Micro-Interactions) |

---

## 1. Executive Summary & Visi Produk

### 1.1 Latar Belakang
**Arifin Store** (`arifinstore.id`) adalah platform e-commerce direct-to-consumer (D2C) yang mengkhususkan diri dalam layanan **Top-Up E-Money / E-Wallet instan 24 jam** dan **penjualan Akun/Lisensi Produk Digital & AI Premium**. 

Industri voucher digital dan isi ulang e-wallet di Indonesia menuntut transaksi berkecepatan tinggi (di bawah 10 detik), kepastian validasi nomor tujuan, kemudahan metode pembayaran instan (QRIS All Payment), serta navigasi yang ramah SEO seperti agregator besar (contoh: HotelMurah).

### 1.2 Tujuan Produk (Product Goals)
1. **Otomatisasi Penuh (Zero Manual Intervention):** Pembayaran pelanggan via QRIS otomatis memicu order ke provider API (Sekalipay untuk E-Money dan ProdSeller untuk Produk Digital).
2. **Smart Payment Routing (> 400rb Switcher):** Membagi alur pembayaran secara presisi:
   - Transaksi **$\le$ Rp 400.000** menggunakan **IndoApi** (QRIS Dinamis Otomatis).
   - Transaksi **> Rp 400.000** menggunakan **QRIS Statis to Dinamis Engine** (`verssache/qris-dinamis`) dengan **Algoritma Unique Code Anti-Collision** (+1, +2, dst.) untuk mencegah bentrok mutasi.
3. **Optimasi Biaya E-Money Sekalipay:** Memanfaatkan produk *Bebas Nominal (Open Denom)* dari Sekalipay demi efisiensi jalur backend, namun menyajikan *19 Pilihan Nominal Tetap* di antarmuka pengguna agar UX tetap sederhana dan terarah.
4. **Kurasi Produk Digital ProdSeller:** Menyajikan hanya 7 produk digital pilihan bertarget pasar tinggi (Gemini Pro 18M, Duolingo Super, Notion Plus, Adobe Express, Office 365, JetBrains).
5. **SEO Powerhouse:** Mengadopsi arsitektur navigasi direktori spesifik (HotelMurah style) dengan *dedicated landing page* untuk kata kunci bernilai transaksi tinggi (`Topup E-Wallet`, `Gemini Pro 18Months`, `Duolingo Super 12M`, `Notion Plus`).

---

## 2. Arsitektur Brand & Aset Desain

### 2.1 Identitas Visual & Aset Lokal
Aset logo dan ikon telah tersedia di repositori lokal dan wajib diintegrasikan pada komponen aplikasi:

| Aset File | Lokasi Fisik | Penempatan Penggunaan |
| :--- | :--- | :--- |
| **Logo Horizontal (Navbar)** | `assets/logo464x127.png` | Header Navbar, Invoice Header, Email Notification, Admin Sidebar |
| **Logo Persegi (Icon/Avatar)** | `assets/logo200x200.png` | Footer Brand, Open Graph Social Share, PWA Splash Screen |
| **Vector Logo** | `assets/logo200x200.svg` | Scalable Vector Graphic untuk high-DPI displays |
| **Favicon** | `assets/logo200x200.ico` | Browser Tab Icon, Bookmark Icon |
| **DANA Product Icon** | `assets/dana-product.png` | Kartu Produk E-Wallet DANA |
| **ShopeePay Product Icon** | `assets/shopeepay-product.png` | Kartu Produk E-Wallet ShopeePay |
| **GoPay Product Icon** | `assets/gopay-product.png` | Kartu Produk E-Wallet GoPay |
| **OVO Product Icon** | `assets/ovo-product.png` | Kartu Produk E-Wallet OVO |
| **LinkAja Product Icon** | `assets/linkaja-product.png` | Kartu Produk E-Wallet LinkAja |
| **i.saku Product Icon** | `assets/isaku-product.png` | Kartu Produk E-Wallet i.saku |
| **DOKU Product Icon** | `assets/doku-product.png` | Kartu Produk E-Wallet DOKU Wallet |
| **AstraPay Product Icon** | `assets/astrapay-product.png` | Kartu Produk E-Wallet AstraPay |

### 2.2 Tema Desain: Glassmorphism Ultra-Modern
Desain website mengusung gaya **Frosted Glassmorphism** yang elegan, mewah, dan berteknologi tinggi:
- **Background:** Deep Dark Nebula Mesh (`#080a10` hingga `#0f172a`) dengan aksen radial neon glow violet (`#7c3aed`), biru elektrik (`#2563eb`), dan emerald (`#10b981`).
- **Glass Card Specs:**
  - `background: rgba(255, 255, 255, 0.03)` (Dark Mode) / `rgba(255, 255, 255, 0.65)` (Light Mode).
  - `backdrop-filter: blur(16px) saturate(180%)`.
  - `border: 1px solid rgba(255, 255, 255, 0.08)`.
  - `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37)`.
- **Tipografi:** Google Fonts **Plus Jakarta Sans** atau **Inter** (modern geometric sans-serif dengan legibilitas tinggi).
- **Micro-Interactions:** Shimmer loading skeletons, border neon hover effect, smooth price calculation transitions, dan confetti animation saat transaksi sukses.

---

## 3. Tech Stack & Deployment Architecture (Vercel Ready)

Aplikasi dibangun dengan arsitektur modern berbasis TypeScript yang siap di-deploy secara instan ke **Vercel** melalui GitHub repository.

```mermaid
graph TD
    Client[Browser Pelanggan / Mobile] -->|HTTPS| VercelEdge[Vercel Edge Network / CDN]
    VercelEdge --> NextApp[Next.js 14/15 App Router - Fullstack]
    
    subgraph Core Application [arifinstore.id Backend & API]
        NextApp --> AuthMod[NextAuth.js / Supabase Auth]
        NextApp --> PRouting[Payment Router Engine]
        NextApp --> OrdEngine[Order Orchestrator]
    end
    
    subgraph Data & State Storage
        NextApp --> PostgresDB[(PostgreSQL - Supabase / Neon)]
        NextApp --> RedisCache[(Upstash Redis - Locks & Anti-Collision)]
    end
    
    subgraph Third-Party Provider APIs
        PRouting -->|Amount <= 400.000| IndoApi[IndoApi Gateway - Dynamic QRIS]
        PRouting -->|Amount > 400.000| CustomQRIS[Static to Dynamic QRIS Engine]
        OrdEngine -->|E-Money Topup| SekalipayAPI[Sekalipay API - Open Denom]
        OrdEngine -->|Digital Accounts| ProdSellerAPI[ProdSeller API - USDT Balance]
    end
```

### 3.1 Detail Komponen Teknologi
- **Framework Utama:** Next.js 14+ (App Router, Server Actions, Route Handlers, SSR + ISR untuk SEO).
- **Bahasa Pemrograman:** TypeScript (Strict mode enabled).
- **Styling Engine:** Tailwind CSS + PostCSS + Tailwind Animate + Custom Glassmorphism Utility Plugins.
- **Basis Data:** PostgreSQL (dihosting di Supabase / Neon Serverless Postgres).
- **ORM:** Prisma ORM atau Drizzle ORM (Type-safe schema migration & querying).
- **Distributed Cache & Locking:** Upstash Redis (Serverless Redis REST API untuk Rate Limiting, Idempotency Keys, dan Atomic Counter Kode Unik Anti-Collision).
- **State Management & UI:** TanStack Query (React Query) untuk client-side state, Lucide React Icons, Framer Motion untuk micro-animations, Sonner untuk toast notification.
- **Deployment Platform:** **Vercel**
  - Git Branch Auto-deploy (`main` -> Production `arifinstore.id`, `staging` -> Preview).
  - Environment Variables dikonfigurasi langsung di dashboard Vercel.

---

## 4. Spesifikasi Integrasi Provider API

### 4.1 Sekalipay API (Layanan Top-Up E-Money)

#### 4.1.1 Aturan Bisnis & Logika Open Denom
Sesuai arahan spesifikasi produk:
- **TIDAK MENGIMPOR SEMUA PRODUK SEKALIPAY.** Sistem hanya mengintegrasikan produk tipe **Bebas Nominal (Open Denom)** dari Sekalipay.
- Di sisi Frontend, pelanggan **TIDAK DIBERIKAN INPUT BEBAS**, melainkan **19 Pilihan Tombol Nominal Tetap**:
  $$\{10.000, 15.000, 20.000, 25.000, 30.000, 35.000, 40.000, 45.000, 50.000, 55.000, 60.000, 65.000, 70.000, 75.000, 80.000, 85.000, 90.000, 95.000, 100.000\}$$
- Saat pelanggan memilih salah satu nominal di atas, backend akan mengirimkan nominal tersebut ke Sekalipay via parameter `provider_qty`.

#### 4.1.2 Pemetaan Kode Produk Bebas Nominal (Product Mapping)
| E-Money Provider | Nama Brand | Kode Produk Sekalipay | Tipe Input Target | Format Payload `note` / `provider_qty` |
| :--- | :--- | :--- | :--- | :--- |
| **DANA** | DANA Indonesia | `BBSD` | Nomor HP (08xxx) | `{"target":"08xxx","provider_qty":10000}` |
| **ShopeePay** | ShopeePay | `BBSSH002` | Nomor HP (08xxx) | `{"target":"08xxx","provider_qty":10000}` |
| **LinkAja** | LinkAja | `BBSTC` | Nomor HP (08xxx) | `{"target":"08xxx","provider_qty":10000}` |
| **OVO** | OVO Cash | `BBSOVON` | Nomor HP (08xxx) | `{"target":"08xxx","provider_qty":10000}` |
| **i.saku** | i.saku Indomaret | `BBSAKU` | Nomor HP (08xxx) | `{"target":"08xxx","provider_qty":10000}` |
| **DOKU** | DOKU Wallet | `BBSDOKU` | Nomor DOKU ID/HP | `{"target":"08xxx","provider_qty":10000}` |
| **AstraPay** | AstraPay | `BBSASTR` | Nomor HP (08xxx) | `{"target":"08xxx","provider_qty":10000}` |

#### 4.1.3 Fitur Cek Nama Pemilik Akun (Account Validation)
Untuk mencegah kesalahan transfer pelanggan, Arifin Store memanfaatkan endpoint Sekalipay **Account Validation** sebelum invoice dibuat:
- **Method & Endpoint:** `POST https://sekalipay.com/v1/item/validate`
- **Request Body:**
  ```json
  {
    "item_id": 12345,
    "customer_id": "083183787697"
  }
  ```
- **Response Handling:**
  ```json
  {
    "success": true,
    "data": {
      "display_name": "MOKHAMMAD ARIFIN ILHAM",
      "account_name": "MOKHAMMAD ARIFIN ILHAM"
    }
  }
  ```
- Tampilkan badge konfirmasi di UI: `Atas Nama: MOKHAMMAD ARIFIN ILHAM ✅`.

#### 4.1.4 Eksekusi Transaksi Top-Up Sekalipay
- **Method & Endpoint:** `POST https://sekalipay.com/v1/orders`
- **Headers:** `Authorization: Bearer <SEKALIPAY_API_KEY>`, `Content-Type: application/json`
- **Payload Struktur Open Denom:**
  ```json
  {
    "carts": [
      {
        "item_id": 12345,
        "quantity": 1,
        "provider_qty": 50000,
        "note": "{\"target\":\"083183787697\",\"provider_qty\":50000}"
      }
    ],
    "client_ref": "ARIFIN-ORD-20260929-001"
  }
  ```

---

### 4.2 ProdSeller API (Layanan Akun & Lisensi Digital)

#### 4.2.1 Kurasi Katalog Produk Digital (7 Produk Terpilih)
Sesuai instruksi, katalog ProdSeller dibatasi secara eksklusif hanya pada 7 produk berikut:

| No | Nama Produk Display | Kategori | Tipe Delivery | Memerlukan Input Email Pelanggan? |
| :---: | :--- | :--- | :--- | :---: |
| 1 | **Adobe Express 12M** | Software & Design | Instant Key / Invite | Ya (`requiresEmailActivation`) |
| 2 | **Notion Plus** | Productivity & Workspace | Workspace Invite / Key | Ya (`requiresEmailActivation`) |
| 3 | **Microsoft Office 365 Plus 1 year** | Office & Cloud | Credential / License Key | Opsional / Akun Baru |
| 4 | **JetBrains Edu Pack 12m** | Developer Tools | Edu Account / License | Ya (`requiresEmailActivation`) |
| 5 | **Duolingo 12M new method** | Education & Language | Family Invite / Link | Ya (`requiresEmailActivation`) |
| 6 | **Duolingo Super 12M** | Education & Language | Key / Direct Invite | Ya (`requiresEmailActivation`) |
| 7 | **Gemini Pro 18Months (link)** | Artificial Intelligence | Direct Activation Link | Tidak (Instant Link Fulfillment) |

#### 4.2.2 Alur Transaksi ProdSeller
- **Base URL:** `https://prodseller.com/v1`
- **Autentikasi Header:** `X-API-Key: <PRODSELLER_API_KEY>`
- **Method & Endpoint:** `POST https://prodseller.com/v1/orders`
- **Request Payload:**
  ```json
  {
    "productId": "64abc...",
    "quantity": 1,
    "email": "customer@gmail.com"
  }
  ```
- **Idempotency Protection:** Menyertakan header `Idempotency-Key: ARIFIN-PROD-<UUID>` untuk mencegah pemotongan saldo ganda jika terjadi timeout jaringan.
- **Fulfillment Output:** Respon berisi data serial key, login credentials, atau activation link langsung disimpan terenkripsi di database dan ditampilkan di halaman invoice sukses serta dikirimkan ke WhatsApp pelanggan.

---

## 5. Mesin Pembayaran Cerdas (Smart Split QRIS Engine)

Arifin Store menerapkan arsitektur *dual-engine payment routing* berdasarkan ambang batas nominal tagihan:

```mermaid
flowchart TD
    Start([Pelanggan Melakukan Checkout]) --> CalcAmount[Hitung Total Belanja: Harga Pokok + Margin]
    CalcAmount --> CheckThreshold{Total Belanja > Rp 400.000?}
    
    %% Alur Kurang Dari atau Sama Dengan 400rb
    CheckThreshold -- Tidak (<= 400.000) --> IndoApiFlow[Panggil IndoApi Gateway]
    IndoApiFlow --> GenIndoQris[Generate Dynamic QRIS via IndoApi]
    GenIndoQris --> ShowIndoQR[Tampilkan QRIS & Countdown Invoice]
    ShowIndoQR --> WebhookIndo[Terima Callback Webhook IndoApi]
    WebhookIndo --> VerifyIndoSig{Verifikasi HMAC-SHA256 Signature?}
    VerifyIndoSig -- Valid --> MarkPaid1[Update Status: PAID]
    
    %% Alur Di Atas 400rb
    CheckThreshold -- Ya (> 400.000) --> AntiCollision[Algoritma Anti-Collision Sequencer]
    AntiCollision --> CheckReserved{Nominal Unik Sedang Aktif di Redis?}
    CheckReserved -- Ya (400.001 ada) --> IncrementNominal[Nominal = Base + 2: 400.002]
    CheckReserved -- Tidak --> ReserveNominal[Kunci Nominal di Redis TTL 15 Menit]
    IncrementNominal --> ReserveNominal
    ReserveNominal --> StaticToDynamic[Convert Master Static QRIS to Dynamic]
    StaticToDynamic --> InjectTLV[Injeksi Tag 54, Tag 53, Recalculate CRC16]
    InjectTLV --> ShowCustomQR[Tampilkan QRIS Khusus + Instruksi Bayar Nominal Tepat]
    ShowCustomQR --> MutasiDetector[Deteksi Mutasi Bank/E-Wallet Masuk]
    MutasiDetector --> MatchUnique{Nominal Tepat 400.00x Cocok?}
    MatchUnique -- Cocok --> ReleaseLock[Hapus Kunci Redis & Mark PAID]
    
    %% Fulfillment
    MarkPaid1 --> DispatchOrder[Panggil API Provider: Sekalipay / ProdSeller]
    ReleaseLock --> DispatchOrder
    DispatchOrder --> SendNotif[Kirim Notifikasi WA & Update Real-time UI]
```

### 5.1 Jalur 1: Pembayaran $\le$ Rp 400.000 (IndoApi QRIS Otomatis)
- **Spesifikasi:** Menggunakan gateway pembayaran IndoApi terhubung langsung ke GoPay Merchant.
- **Base URL:** `https://indoapi.biz`
- **Endpoint Pembuatan:** `POST https://indoapi.biz/api/v1/payment/create`
- **Headers:** `X-API-Key: <INDOAPI_KEY>` atau `Authorization: Bearer <INDOAPI_KEY>`
- **Payload Request:**
  ```json
  {
    "amount": 50000,
    "reference": "ARIFIN-INV-20260929-881",
    "description": "Topup DANA 50.000 - 083183787697",
    "customer_name": "Mokhammad Arifin Ilham",
    "callback_url": "https://arifinstore.id/api/webhooks/indoapi"
  }
  ```
- **Verifikasi Signature Callback Webhook:**
  Webhook dikirim ke endpoint `/api/webhooks/indoapi`. Backend wajib memvalidasi signature menggunakan algoritma `HMAC-SHA256`:
  ```typescript
  // Algoritma Verifikasi Next.js Route Handler
  import crypto from 'crypto';

  export async function verifyIndoApiWebhook(rawPayload: Record<string, any>, signature: string, secret: string): Promise<boolean> {
    const payloadCopy = { ...rawPayload };
    delete payloadCopy.signature;
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payloadCopy))
      .digest('hex');
      
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  }
  ```

---

### 5.2 Jalur 2: Pembayaran > Rp 400.000 (QRIS Statis to Dinamis + Anti-Collision Sequencer)

#### 5.2.1 Problem Statement & Solusi Anti-Collision
Ketika nominal transaksi melebihi Rp 400.000, sistem menggunakan konverter QRIS Statis ke Dinamis mandiri (`https://github.com/verssache/qris-dinamis`). Pada metode ini, verifikasi pembayaran bergantung pada **pencocokan mutasi nominal unik**.

> [!WARNING]
> Jika ada dua pelanggan yang checkout produk senilai Rp 400.000 dalam rentang waktu bersamaan, mutasi rekening tidak bisa membedakan pesanan siapa yang telah dibayar jika nominal keduanya sama persis!

**Solusi Algoritma Anti-Collision:**
1. Pelanggan A checkout Rp 400.000 $\rightarrow$ Sistem mengecek antrean Redis. Karena Rp 400.001 belum digunakan, invoice dibuat dengan total **Rp 400.001**.
2. Kunci Redis disimpan: `KEY: qris_reserved_nominal:400001` dengan `TTL = 900 detik (15 menit)`.
3. Pelanggan B checkout Rp 400.000 sebelum Pelanggan A membayar $\rightarrow$ Sistem mendeteksi `400001` sedang aktif, sehingga sistem otomatis menaikkan nominal menjadi **Rp 400.002**.
4. Pelanggan C checkout Rp 400.000 $\rightarrow$ Otomatis menjadi **Rp 400.003**, dst.
5. Saat mutasi bank mendeteksi dana masuk sebesar **Rp 400.002**, sistem secara instan dan tanpa ambigu mencocokkan ke Pesanan Pelanggan B, menandai lunas, memicu order ProdSeller, dan melepas kunci Redis.

#### 5.2.2 Algoritma Konversi EMVCo QRIS Statis ke Dinamis
Mengikuti standar Bank Indonesia (QRIS EMVCo Tag-Length-Value):
1. Ambil string QRIS Statis Master milik Arifin Store.
2. Potong Tag `6304` (CRC checksum 4 karakter terakhir).
3. Ubah Tag `010211` (Static QR) menjadi `010212` (Dynamic QR).
4. Tambahkan Tag `54` (Transaction Amount):
   - Contoh nominal `400001` $\rightarrow$ Panjang string: 6 digit.
   - Tag format: `5406400001`.
5. Pastikan Tag `5303360` (Mata uang IDR) dan Tag `5802ID` (Country Code Indonesia) ada.
6. Hitung ulang CRC-16 (algoritma CCITT-FALSE, polynomial `0x1021`, initial value `0xFFFF`).
7. Gabungkan string final dengan Tag `6304` + 4 karakter hexadecimal checksum uppercase.
8. Render string dynamic QRIS tersebut ke dalam format gambar QR Code (SVG/Canvas) di frontend dengan logo Arifin Store di tengahnya.

---

## 6. Arsitektur SEO & Struktur Navigasi (HotelMurah Style)

### 6.1 Filosofi Navigasi HotelMurah Style
Website HotelMurah memiliki struktur navigasi katalog horizontal/grid yang memudahkan Google Bot dan pengguna menemukan kategori secara instan:
- Grid Ikon Kategori di bagian atas homepage: `Top Up DANA`, `Top Up GoPay`, `Top Up ShopeePay`, `Top Up OVO`, `Top Up LinkAja`, `Top Up E-Wallet Lainnya`, `Voucher Game`, `Akun Premium`.
- Setiap tombol langsung mengarah ke *Dedicated SEO Landing Page* yang dioptimasi khusus untuk kata kunci pencarian lokal.

```
arifinstore.id/
│
├── / (Homepage Hub)
│
├── /topup-e-wallet (Master Hub E-Money & Panduan Lengkap)
│   ├── /topup-dana (Target: "Top Up DANA Murah Bebas Admin 24 Jam")
│   ├── /topup-gopay (Target: "Top Up GoPay Instan Termurah")
│   ├── /topup-shopeepay (Target: "Top Up ShopeePay Bebas Biaya")
│   ├── /topup-ovo (Target: "Top Up OVO Cepat")
│   ├── /topup-linkaja
│   ├── /topup-isaku
│   ├── /topup-doku
│   └── /topup-astrapay
│
├── /produk/ (Katalog Produk Digital)
│   ├── /produk/gemini-pro-18months (Target: "Beli Gemini Pro 18 Bulan Garansi")
│   ├── /produk/duolingo-super-12m (Target: "Duolingo Super 1 Tahun Murah")
│   ├── /produk/notion-plus (Target: "Langganan Notion Plus 1 Tahun")
│   ├── /produk/adobe-express-12m
│   ├── /produk/microsoft-office-365
│   └── /produk/jetbrains-edu-pack
│
├── /blog/ (Content Hub & SEO Inbound Traffic)
│   ├── /blog/cara-topup-dana-tanpa-rekening-bank
│   ├── /blog/review-fitur-terbaru-gemini-pro
│   └── /blog/...
│
├── /cek-pesanan (Guest Order Tracker)
├── /syarat-ketentuan & /kebijakan-privasi
```

### 6.2 Target Khusus Halaman SEO Utama

#### 1. Halaman `/topup-e-wallet` (Master Silo)
- **Title Tag:** `Top Up E-Wallet Murah, Cepat & Terlengkap 24 Jam | Arifin Store`
- **Meta Description:** `Layanan isi ulang saldo e-wallet terlengkap di Indonesia: DANA, ShopeePay, OVO, GoPay, LinkAja, i.saku, DOKU, AstraPay. Proses otomatis 5 detik via QRIS.`
- **Target Keywords:** *topup e-wallet, isi saldo e-money, top up dana murah, topup gopay 24 jam*.
- **Content Block:** Tabel perbandingan biaya admin, status server real-time (Online/Gangguan), FAQ Accordion Schema.

#### 2. Halaman `/produk/gemini-pro-18months`
- **Title Tag:** `Beli Gemini Pro 18 Months Subscription (Direct Link) | Arifin Store`
- **Meta Description:** `Aktivasi Google Gemini Pro 18 Bulan resmi termurah. Dapatkan fitur AI tercanggih, context window raksasa, dan garansi penuh dari Arifin Store.`
- **Target Keywords:** *gemini pro 18 months, beli akun gemini pro, langganan google ai pro murah*.
- **Rich Snippet Schema:** `Product` (Price, AggregateRating, InStock, Brand: Google).

#### 3. Halaman `/produk/duolingo-super-12m`
- **Title Tag:** `Beli Duolingo Super 12 Bulan (1 Year Full) Murah | Arifin Store`
- **Meta Description:** `Tingkatkan kemampuan bahasa tanpa jeda iklan dan unlimited hearts dengan Duolingo Super 12M. Pengiriman instan otomatis hanya di Arifin Store.`
- **Target Keywords:** *duolingo super 12m, beli duolingo plus 1 tahun, aktivasi duolingo murah*.

#### 4. Halaman `/produk/notion-plus`
- **Title Tag:** `Langganan Notion Plus 1 Tahun Termurah & Bergaransi | Arifin Store`
- **Meta Description:** `Upgrade workspace Notion Anda ke paket Notion Plus 1 tahun. File upload tanpa batas, riwayat versi 30 hari, cocok untuk profesional & tim.`
- **Target Keywords:** *notion plus murah, beli akun notion plus, lisensi notion 1 tahun*.

### 6.3 Schema Markup JSON-LD Standar Industri
Setiap halaman wajib menginjeksi Structured Data JSON-LD:
- **Organization Schema:** Menampilkan info nama toko (Arifin Store), URL, logo, nomor WhatsApp `083183787697`, dan media sosial.
- **Product Schema:** Menyajikan nama produk, harga saat ini, ketersediaan stok (`https://schema.org/InStock`), dan rating bintang pelanggan.
- **BreadcrumbList Schema:** Mempermudah navigasi remah roti di hasil pencarian Google Mobile.
- **FAQPage Schema:** Pertanyaan seputar kecepatan top-up, legalitas akun, dan garansi pengembalian dana.

---

## 7. Rincian Fitur Aplikasi (Feature Breakdown)

### 7.1 Fitur Pengguna / Pelanggan (Customer Experience)

#### 1. Autentikasi Fleksibel (Login / Register / Guest Checkout)
- **Registrasi & Login:** Email + Password atau Sign-in Instan dengan Akun Google (Google OAuth).
- **Guest Checkout (Beli Tanpa Login):** Pelanggan dapat langsung bertransaksi tanpa dipaksa membuat akun; cukup memasukkan nomor WhatsApp untuk pengiriman invoice.
- **Reset Password:** Fitur lupa kata sandi dengan token magic link via email.

#### 2. Form Pemesanan Interaktif & Responsif
- **Form E-Money:**
  - Pemilihan brand e-money dengan logo visual yang tajam.
  - Input Nomor Handphone dengan auto-formatting (`08xxx`).
  - Auto-trigger validasi nama pemilik akun via Sekalipay.
  - Grid pemilihan 19 nominal tetap (10.000 s/d 100.000).
- **Form Produk Digital:**
  - Pemilihan paket durasi / varian lisensi.
  - Input email aktivasi (hanya jika produk membutuhkan aktivasi email).
- **Rangkuman Pembayaran (Checkout Bar):** Menampilkan rincian harga dasar, biaya admin payment gateway, kode unik anti-collision (jika ada), dan total bayar.

#### 3. Halaman Invoice Pembayaran Real-Time
- Tampilan QRIS beresolusi tinggi dengan tombol **Download QR Code** dan **Salin Nominal Tepat**.
- Timer hitung mundur kedaluwarsa pembayaran (Countdown 15 Menit).
- Real-time polling / WebSocket status update: Berubah otomatis dari `MENUNGGU PEMBAYARAN` $\rightarrow$ `DIPROSES` $\rightarrow$ `SUKSES` tanpa refresh halaman.
- Untuk produk ProdSeller: Informasi serial key, link aktivasi, dan instruksi penggunaan langsung ditampilkan di layar setelah status berubah menjadi `SUKSES`.

#### 4. Dashboard Pelanggan (User Portal)
- **Riwayat Pesanan:** Daftar transaksi lengkap dengan filter status, tanggal, dan pencarian ID invoice.
- **Buku Kontak Favorit:** Menyimpan nomor e-wallet yang sering ditop-up (misal: "Nomor Ibu", "Nomor Pribadi") untuk transaksi 1-klik di masa mendatang.
- **Cek Pesanan Publik (`/cek-pesanan`):** Formulir lacak status transaksi untuk pelanggan yang bertransaksi sebagai Guest (cukup ketik nomor invoice atau nomor WhatsApp).

---

### 7.2 Fitur Pemasaran & Promosi (Marketing Engine)

#### 1. Banner Slider Promosi
- Slider carousel di halaman depan (Hero Section) untuk menampilkan event diskon, cashback, produk baru, dan pengumuman jam operasional.
- Support auto-play, responsive swipe mobile, dan link tujuan (internal page atau chat WhatsApp).

#### 2. Popup Promosi Produk (Smart Promo Modal)
- Modal popup yang muncul saat pengunjung pertama kali membuka website untuk menawarkan produk unggulan (misal: "Flash Sale Gemini Pro 18 Bulan hanya Rp XX.000").
- Dilengkapi pengaturan **Cooldown Cookie/LocalStorage** (misalnya hanya muncul 1 kali dalam 24 jam per user agar tidak mengganggu pengalaman pengguna).
- Dapat diaktifkan / dinonaktifkan secara fleksibel dari Dashboard Admin.

#### 3. CMS Blog untuk SEO & Content Inbound
- Sistem manajemen artikel untuk mempublikasikan tutorial, berita teknologi, tips hemat, dan panduan penggunaan e-wallet.
- Integrasi internal linking otomatis ke halaman produk terkait.
- Dukungan Rich Text / Markdown Editor, meta description builder, dan optimasi gambar otomatis (WebP compression).

---

### 7.3 Fitur Dashboard Admin (Back-Office Portal)

```
Dashboard Admin
├── 1. Ringkasan Eksekutif (Omset Hari Ini, Laba Bersih, Transaksi Sukses/Gagal)
├── 2. Saldo Provider Live Monitor
│   ├── Saldo Sekalipay (IDR) + Status Server
│   └── Saldo ProdSeller (USDT) + Status Server
├── 3. Manajemen Transaksi
│   ├── Daftar Semua Order (Filter: Pending, Processing, Success, Failed)
│   ├── Aksi Manual: Resend Callback, Force Success, Refund, Manual Retry API
│   └── Log Anti-Collision QRIS Dinamis (Tracking Kode Unik Aktif)
├── 4. Manajemen Produk & Harga
│   ├── Setting Harga Pokok & Markup Keuntungan (Rp atau %)
│   ├── Saklar On/Off Produk (Disable otomatis jika provider gangguan)
├── 5. Manajemen Banner & Popup
│   ├── CRUD Banner Slider (Upload gambar, input link, urutan)
│   └── Setting Popup Promosi (Gambar, CTA link, durasi aktif)
├── 6. Manajemen Blog CMS
│   └── Tulis, Edit, Draft, Hapus Artikel SEO
└── 7. Pengaturan Sistem
    ├── Pengaturan API Key (IndoApi, Sekalipay, ProdSeller)
    └── Nomor Kontak CS & Akun Sosial Media
```

#### Detail Kemampuan Admin:
1. **Low-Balance Alerting:** Notifikasi otomatis ke WhatsApp Admin (`083183787697`) jika saldo deposit di Sekalipay atau ProdSeller menipis di bawah batas minimal (misal < Rp 200.000 atau < 20 USDT).
2. **Rekapitulasi Keuangan:** Laporan harian, mingguan, dan bulanan yang dapat diekspor ke format CSV / Excel.
3. **Audit Log:** Mencatat seluruh tindakan admin dan log callback webhook provider untuk transparansi pelacakan masalah.

---

## 8. Rekomendasi Fitur Unggulan Tambahan (Value-Added Features)

Berdasarkan analisis industri top-up dan e-commerce digital, berikut adalah rekomendasi fitur strategis untuk memaksimalkan kepuasan pelanggan dan efisiensi operasional Arifin Store:

1. **Notifikasi WhatsApp Gateway Otomatis (Fonnte / Wablas Integration):**
   - Mengirimkan pesan WhatsApp instan ke nomor pembeli saat:
     - Invoice diterbitkan (disertai link pembayaran).
     - Pembayaran berhasil diverifikasi.
     - Pesanan selesai (disertai detail serial key / activation link / bukti top-up sukses).
2. **Live Chat Floating Widget:**
   - Tombol floating glassmorphism di sudut kanan bawah dengan opsi langsung terhubung ke **WhatsApp Resmi Arifin Store (`083183787697`)** atau Telegram Support untuk bantuan kilat jika terjadi kendala.
3. **Fitur Auto-Retry & Queue Worker (Upstash QStash / BullMQ):**
   - Jika server Sekalipay atau ProdSeller mengalami timeout sesaat, sistem antrean otomatis melakukan retry hingga 3 kali dengan *exponential backoff* sebelum menandai transaksi gagal.
4. **Voucher Diskon & Promo Code Engine:**
   - Kolom kupon promo saat checkout (contoh: `ARIFINHEMAT`) untuk potongan harga promosi di hari gajian atau tanggal kembar.
5. **Mode Toggle Dark / Light Theme:**
   - Pengunjung dapat memilih tampilan Glassmorphism Dark Mode (Cyberpunk Midnight) atau Light Mode (Frosted Crystal Clean) sesuai kenyamanan mata mereka.

---

## 9. Skema Basis Data (Database Entity-Relationship Specs)

Berikut rancangan skema tabel PostgreSQL menggunakan Prisma/Drizzle:

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    CATEGORIES ||--o{ PRODUCTS : contains
    PRODUCTS ||--o{ PRODUCT_VARIANTS : has
    ORDERS ||--|| PAYMENTS : generates
    ORDERS ||--o{ ORDER_ITEMS : contains
    ORDERS ||--o{ FULFILLMENT_LOGS : tracks

    USERS {
        uuid id PK
        string email UK
        string name
        string phone
        string role "ADMIN | CUSTOMER"
        datetime created_at
    }

    CATEGORIES {
        int id PK
        string name
        string slug UK
        string type "EM_ONEY | DIGITAL_PRODUCT"
        int sort_order
    }

    PRODUCTS {
        int id PK
        int category_id FK
        string name
        string slug UK
        string provider "SEKALIPAY | PRODSELLER"
        string provider_code
        string icon_url
        boolean is_active
    }

    PRODUCT_VARIANTS {
        int id PK
        int product_id FK
        string name
        int nominal_amount
        decimal base_price
        decimal selling_price
        string sku
        boolean is_active
    }

    ORDERS {
        string invoice_number PK
        uuid user_id FK "nullable for guests"
        string customer_name
        string customer_phone
        string customer_email
        decimal subtotal
        decimal fee_amount
        int unique_code
        decimal grand_total
        string status "PENDING | PROCESSING | SUCCESS | FAILED | EXPIRED"
        datetime expired_at
        datetime paid_at
    }

    PAYMENTS {
        string id PK
        string invoice_number FK
        string payment_gateway "INDOAPI | DYNAMIC_QRIS"
        string qris_string
        string qris_image_url
        string transaction_ref
        string status "PENDING | PAID | EXPIRED"
        datetime created_at
    }

    QRIS_UNIQUE_POOL {
        int id PK
        int nominal_base
        int unique_code
        string current_invoice FK
        datetime reserved_until
    }
```

---

## 10. Non-Functional Requirements & Security Specs

| Dimensi | Standar Kebutuhan |
| :--- | :--- |
| **Kecepatan & Performa** | Waktu muat awal LCP (Largest Contentful Paint) < 1.8 detik; Skor Google Lighthouse $\ge 95$. |
| **Keamanan Webhook** | Validasi tanda tangan kriptografi HMAC-SHA256 pada seluruh endpoint webhook IndoApi dan Sekalipay. Permintaan tanpa signature valid langsung ditolak `401 Unauthorized`. |
| **Perlindungan Idempotency** | Seluruh pemanggilan ke `POST /v1/orders` ProdSeller dan Sekalipay wajib menyertakan kunci unik UUID transaksi untuk mencegah *double billing*. |
| **Rate Limiting** | Endpoint publik seperti Cek Akun E-Wallet dan Checkout dibatasi maksimal 10 request per menit per alamat IP menggunakan token bucket Upstash Redis untuk mencegah abuse scraping. |
| **Enkripsi Kredensial** | Kunci rahasia API disimpan di Environment Variables Vercel (`.env.production`). Serial key / akun lisensi pelanggan disimpan dengan enkripsi AES-256 di basis data. |
| **Ketersediaan (Availability)** | Target uptime 99.9% memanfaatkan arsitektur Serverless Vercel Multi-Region Edge Network. |

---

## 11. Roadmap Eksekusi Proyek (Phased Milestones)

```mermaid
gantt
    title Roadmap Implementasi Website Arifin Store
    dateFormat  YYYY-MM-DD
    section Fase 1: Fondasi & UI
    Setup Next.js, Vercel & Tailwind Glassmorphism :f1_1, 2026-10-01, 3d
    Desain Sistem & Komponen Layout Navbar Footer   :f1_2, after f1_1, 3d
    Setup Database Schema Prisma & Supabase        :f1_3, after f1_1, 3d
    
    section Fase 2: Provider & Katalog
    Integrasi Sekalipay Open Denom (7 E-Money)      :f2_1, 2026-10-07, 4d
    Integrasi Sekalipay Account Validation (Cek ID) :f2_2, after f2_1, 2d
    Integrasi ProdSeller API (7 Produk Digital)     :f2_3, after f2_1, 3d
    
    section Fase 3: Mesin Pembayaran
    Integrasi IndoApi QRIS (Nominal <= 400rb)       :f3_1, 2026-10-14, 3d
    Implementasi QRIS Statis to Dinamis (> 400rb)   :f3_2, after f3_1, 3d
    Algoritma Anti-Collision Unique Code (Redis)    :f3_3, after f3_2, 2d
    
    section Fase 4: Portal & Marketing
    Dashboard Pelanggan & Lacak Pesanan Guest       :f4_1, 2026-10-21, 3d
    CMS Banner Slider & Smart Promo Popup Modal     :f4_2, after f4_1, 2d
    CMS Blog & Dedicated SEO Landing Pages          :f4_3, after f4_2, 3d
    Dashboard Admin (Monitor Saldo & Transaksi)     :f4_4, after f4_1, 4d
    
    section Fase 5: Uji Coba & Launching
    Uji Beban, Sandbox Order & Validasi Webhook     :f5_1, 2026-10-30, 3d
    Setup Domain arifinstore.id di Vercel & Live!   :f5_2, after f5_1, 2d
```

---

## 12. Panduan Konfigurasi Environment Variable (`.env.example`)

Untuk proses deployment di **Vercel**, siapkan variabel lingkungan berikut pada dashboard Vercel:

```env
# Application Environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://arifinstore.id
NEXT_PUBLIC_APP_NAME="Arifin Store"
NEXT_PUBLIC_WHATSAPP="083183787697"

# Database Configuration (PostgreSQL Supabase/Neon)
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/arifinstore?sslmode=require"
DIRECT_URL="postgresql://user:password@db.supabase.co:5432/arifinstore"

# Upstash Redis (Locks, Rate Limit, Anti-Collision Pool)
UPSTASH_REDIS_REST_URL="https://your-upstash-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_upstash_token"

# IndoApi Payment Gateway (Nominal <= 400k)
INDOAPI_BASE_URL="https://indoapi.biz"
INDOAPI_API_KEY="iak_live_xxxxxxxxxxxxxxxxxxxxxxxx"
INDOAPI_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxx"

# Sekalipay API (E-Money Top-Up & Account Validation)
SEKALIPAY_BASE_URL="https://sekalipay.com"
SEKALIPAY_API_KEY="sekali_live_xxxxxxxxxxxxxxxxxxxx"
SEKALIPAY_WEBHOOK_SECRET="whsec_sekalipay_xxxxxxxxx"

# ProdSeller API (Digital Products & AI Accounts)
PRODSELLER_BASE_URL="https://prodseller.com/v1"
PRODSELLER_API_KEY="psk_live_xxxxxxxxxxxxxxxxxxxxxx"

# Master Static QRIS Payload (For Static-to-Dynamic > 400k)
MASTER_STATIC_QRIS_STRING="00020101021126570014ID.GO-PAY.WWW01189360091436123456785204481453033605802ID5912ARIFIN STORE6007JAKARTA61051234062070703A016304XXXX"

# NextAuth / Authentication
NEXTAUTH_URL=https://arifinstore.id
NEXTAUTH_SECRET="your-super-strong-jwt-secret-key-32chars-min"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
```

---

*Dokumen ini merupakan spesifikasi acuan resmi pengembangan sistem **Arifin Store (arifinstore.id)**. Seluruh logika bisnis, kode pemetaan produk, alur routing pembayaran, dan tata letak SEO wajib mengacu pada poin-poin yang tertulis di dalam dokumen ini.*
