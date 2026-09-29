"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { STORE_INFO } from "@/lib/constants";

export interface AuthUser {
  name: string;
  phone: string;
  email: string;
  isVip: boolean;
  balance: number;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: AuthUser) => void;
  defaultTab?: "login" | "register";
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultTab = "login",
}: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Login form states
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form states
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regAgree, setRegAgree] = useState(true);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!loginIdentifier || !loginPassword) {
      setErrorMsg("Mohon isi nomor HP/Email dan kata sandi Anda.");
      return;
    }

    if (loginPassword.length < 4) {
      setErrorMsg("Kata sandi minimal 4 karakter.");
      return;
    }

    // Success login
    const user: AuthUser = {
      name: loginIdentifier.includes("@")
        ? loginIdentifier.split("@")[0]
        : "Pelanggan Setia",
      phone: loginIdentifier.includes("@") ? "083183787697" : loginIdentifier,
      email: loginIdentifier.includes("@")
        ? loginIdentifier
        : `${loginIdentifier}@arifinstore.id`,
      isVip: true,
      balance: 150000,
    };

    localStorage.setItem("arifinstore_auth_user", JSON.stringify(user));
    setSuccessMsg(`Selamat datang kembali, ${user.name}!`);

    setTimeout(() => {
      onLoginSuccess?.(user);
      onClose();
      setSuccessMsg("");
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!regName.trim()) {
      setErrorMsg("Nama lengkap wajib diisi.");
      return;
    }

    if (!regPhone || regPhone.length < 10) {
      setErrorMsg("Nomor WhatsApp wajib valid (minimal 10 digit).");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg("Kata sandi minimal 6 karakter.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (!regAgree) {
      setErrorMsg("Anda harus menyetujui syarat & ketentuan.");
      return;
    }

    const newUser: AuthUser = {
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim() || `${regPhone}@arifinstore.id`,
      isVip: false,
      balance: 25000, // Bonus saldo pendaftaran awal
    };

    localStorage.setItem("arifinstore_auth_user", JSON.stringify(newUser));
    setSuccessMsg(`Pendaftaran berhasil! Selamat datang, ${newUser.name}.`);

    setTimeout(() => {
      onLoginSuccess?.(newUser);
      onClose();
      setSuccessMsg("");
    }, 900);
  };

  const handleDemoLogin = () => {
    const demoUser: AuthUser = {
      name: "Mokhammad Arifin",
      phone: "083183787697",
      email: "arifinstore@gmail.com",
      isVip: true,
      balance: 500000,
    };
    localStorage.setItem("arifinstore_auth_user", JSON.stringify(demoUser));
    setSuccessMsg("Berhasil login sebagai Member VIP Demo!");
    setTimeout(() => {
      onLoginSuccess?.(demoUser);
      onClose();
      setSuccessMsg("");
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden relative my-6">
        {/* Navy Header */}
        <div className="bg-[#35508d] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-blue-200 uppercase">
              Akun Arifin Store
            </span>
            <h2 className="text-xl font-bold">
              {tab === "login" ? "Masuk ke Akun Anda" : "Daftar Akun Baru"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setErrorMsg("");
            }}
            className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
              tab === "login"
                ? "border-[#0066cc] text-[#0066cc] bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setErrorMsg("");
            }}
            className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-all cursor-pointer ${
              tab === "register"
                ? "border-[#0066cc] text-[#0066cc] bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Daftar Akun
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Notification Alerts */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nomor WhatsApp atau Email
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Contoh: 083183787697 atau email@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/15"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Kata Sandi
                  </label>
                  <a
                    href={`${STORE_INFO.whatsappUrl}?text=Halo%20Admin%20Arifin%20Store,%20saya%20butuh%20bantuan%20reset%20kata%20sandi`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0066cc] hover:underline"
                  >
                    Lupa Sandi?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Masukkan kata sandi akun"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/15"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-[#0066cc] focus:ring-[#0066cc]"
                  />
                  <span>Ingat saya di perangkat ini</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-[#35508d] hover:bg-[#273b68] shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Fast Login */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 px-3 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100 text-[#0066cc] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>1-Klik Coba Akun Demo (VIP Member)</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Contoh: Mokhammad Arifin"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0066cc]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp Aktif
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx (untuk kirim invoice & QRIS)"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0066cc]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email (Opsional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0066cc]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 karakter"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0066cc]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ulangi Sandi
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Ulangi sandi"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#0066cc]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start text-xs text-slate-600 gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={regAgree}
                  onChange={(e) => setRegAgree(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#0066cc]"
                />
                <span>
                  Saya menyetujui Ketentuan Layanan & Kebijakan Privasi transaksi di Arifin Store.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-[#0066cc] hover:bg-[#0052a3] shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Daftar Akun Baru</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Security Guarantee Note */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Data Anda dienkripsi 256-bit SSL aman & terlindungi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
