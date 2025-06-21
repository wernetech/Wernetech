// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { AuthProvider } from "../context/AuthContext";
import CookieConsent from "@/components/CookieConsent";
import LogoutModal from "@/components/LogoutModal";

export const metadata = {
  title: "Wernetech - Impulsionando o Futuro com Soluções de TI Inteligentes",
  description: "Seu sistema inteligente",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Wernetech - Impulsionando o Futuro com Soluções de TI Inteligentes</title>
      </head>
      <body>
        <AuthProvider>
          <Header />
          <LogoutModal />
          {children}
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
