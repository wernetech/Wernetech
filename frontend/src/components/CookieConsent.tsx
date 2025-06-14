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
    <div className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-6 md:left-10 md:right-10 max-w-5xl mx-auto bg-white border border-gray-300 shadow-lg rounded-xl p-6 z-50 transition-all">
      {/* Texto */}
      <div className="text-sm text-gray-800 mb-6">
        Este site armazena cookies em seu computador. Esses cookies são usados
        para coletar informações sobre como você interage com nosso site e nos
        permite lembrar de você. Usamos essas informações para melhorar e
        personalizar sua experiência e para análises e métricas sobre nossos
        visitantes, tanto nesse site quanto em outras mídias. Para obter mais
        informações sobre os cookies que usamos, leia nossa{" "}
        <a
          href="https://drive.google.com/file/d/1QzMIppZCWm2efHcHuTHUgTeZy78HIzpd/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Política de Privacidade
        </a>
        . Se você recusar, suas informações não serão rastreadas quando você
        acessar este site. Um cookie simples será usado em seu navegador para
        lembrar sobre sua preferência de não ser rastreado.
      </div>

      {/* Botões */}
      <div className="flex justify-center gap-4">
        <button
          onClick={rejectCookies}
          className="px-5 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          aria-label="Recusar cookies"
        >
          Recusar
        </button>
        <button
          onClick={acceptCookies}
          className="px-5 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
          aria-label="Aceitar cookies"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
