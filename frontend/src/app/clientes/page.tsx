import Image from "next/image";

export const metadata = {
  title: "Nossos Clientes | WerneTech",
  description:
    "Conheça os mais de 800 clientes satisfeitos que confiam na WerneTech, incluindo CGU, MPSP, UFRN, UFPE, COREN, CREA e outros.",
  openGraph: {
    title: "Nossos Clientes | WerneTech",
    description:
      "Veja quem confia na WerneTech para soluções tecnológicas seguras e eficientes.",
    url: "https://www.wernetech.com/clientes",
    type: "website",
  },
};

const clientes = [
  { src: "CGU.jpg", alt: "Controladoria-Geral da União" },
  { src: "ufrn-logo.png", alt: "UFRN" },
  { src: "UFPB - logo.png", alt: "UFPB" },
  { src: "logo-ufpe-1.png", alt: "UFPE" },
  { src: "mpsp logo.png", alt: "Ministério Público de SP" },
  { src: "crea pr - logo.png", alt: "CREA-PR" },
  { src: "creRrnLogo.png", alt: "CREA-RN" },
  { src: "tely - logo.png", alt: "TELY" },
  { src: "Coren - MG.png", alt: "COREN" },
  { src: "tce - pe Logo.png", alt: "TCE-PE" },
  {
    src: "Assembleia Legislativa - RN.png",
    alt: "Assembleia Legislativa do RN",
  },
];

export default function ClientesPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20 text-gray-800">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">
        Nossos Clientes
      </h1>
      <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed mb-12 text-amber-50">
        Com uma carteira de mais de 800 clientes satisfeitos em todo o Brasil,
        temos o orgulho de ser o parceiro tecnológico de confiança para
        organizações dos mais variados setores. Nossa expertise e compromisso
        com a excelência nos permitem atender desde grandes órgãos públicos e
        instituições de ensino renomadas até empresas que são referência em seus
        mercados. A confiança de clientes como a Controladoria-Geral da União
        (CGU), o Tribunal de Contas do Estado de Pernambuco, a Assembleia
        Legislativa do Rio Grande do Norte e diversas universidades federais
        reflete a qualidade e a segurança das nossas soluções. Abaixo,
        destacamos alguns dos nomes que confiam em nosso trabalho.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 items-center justify-items-center">
        {clientes.map(({ src, alt }) => (
          <div
            key={src}
            className="relative w-28 h-20 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
          >
            <Image
              src={`/clients/${src}`}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100px, 140px"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
