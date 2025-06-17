import Clients from "./Clients";

export const metadata = {
  title: "Wernetech - Impulsionando o Futuro com Soluções de TI Inteligentes",
  description:
    "Conheça os mais de 800 clientes satisfeitos que confiam na Wernetech, incluindo CGU, MPSP, UFRN, UFPE, COREN, CREA e outros.",
  openGraph: {
    title: "Wernetech - Impulsionando o Futuro com Soluções de TI Inteligentes",
    description:
      "Veja quem confia na Wernetech para soluções tecnológicas seguras e eficientes.",
    url: "https://www.wernetech.com/clientes",
    type: "website",
  },
};

export default function RegisterPage() {
  return <Clients />;
}
