"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function acceptCookies() {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  }

  function rejectCookies() {
    localStorage.setItem("cookie-consent", "false");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-4 right-4 sm:left-10 sm:right-10 sm:max-w-3xl mx-auto bg-white border border-gray-300 shadow-lg rounded-xl p-5 z-50 flex flex-col sm:flex-row sm:items-center gap-4 transition-all">
      {/* Texto */}
      <div className="flex-1 text-sm text-gray-800">
        Utilizamos cookies para melhorar sua experiência. Ao continuar, você
        concorda com nossa{" "}
        <a
          href="https://drive.google.com/file/d/1QzMIppZCWm2efHcHuTHUgTeZy78HIzpd/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Política de Cookies
        </a>
        .
      </div>

      {/* Botões */}
      <div className="flex gap-2 self-end sm:self-auto">
        <button
          onClick={rejectCookies}
          className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          aria-label="Recusar cookies"
        >
          Recusar
        </button>
        <button
          onClick={acceptCookies}
          className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
          aria-label="Aceitar cookies"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
