"use client";

import React from "react";
import { STORE_INFO } from "@/lib/constants";

export default function FloatingWhatsApp() {
  return (
    <a
      href={STORE_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Customer Support"
      title="Hubungi CS WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999999,
        width: "58px",
        height: "58px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      className="hover:scale-110 active:scale-95"
    >
      {/* Official WhatsApp Logo SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        style={{ width: "34px", height: "34px", fill: "#ffffff", display: "block" }}
        aria-hidden="true"
      >
        <path d="M16.002 2C8.28 2 2 8.28 2 16c0 2.58.7 5.06 1.93 7.21L2 30l7.04-1.85A13.93 13.93 0 0 0 16.002 30C23.72 30 30 23.72 30 16s-6.28-14-13.998-14zm0 25.59a11.53 11.53 0 0 1-5.88-1.6l-.42-.25-4.37 1.15 1.17-4.26-.28-.44a11.57 11.57 0 0 1-1.78-6.19c0-6.39 5.2-11.59 11.56-11.59 6.38 0 11.58 5.2 11.58 11.59 0 6.39-5.2 11.59-11.58 11.59zm6.34-8.68c-.35-.17-2.06-1.02-2.38-1.13-.32-.12-.55-.17-.78.18-.23.35-.9 1.13-1.1 1.36-.2.23-.4.26-.75.09-.35-.17-1.47-.54-2.8-1.73-1.04-.92-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.61.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.17-.78-1.89-1.07-2.58-.28-.68-.57-.59-.78-.6h-.67c-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.37 1.42 3.6c.17.23 2.45 3.75 5.94 5.26.83.36 1.48.57 1.98.73.83.27 1.59.23 2.19.14.67-.1 2.06-.84 2.35-1.65.29-.81.29-1.51.2-1.65-.09-.15-.32-.23-.67-.4z" />
      </svg>
    </a>
  );
}
