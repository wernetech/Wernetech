"use client";

import Image from "next/image";

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
    <main className="w-full bg-white px-6 py-20 text-gray-800">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">
        Nossos Clientes
      </h1>

      <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed mb-12">
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

      {/* Carrossel infinito */}
      <div className="overflow-hidden relative py-10 bg-white">
        <div className="flex animate-scroll-loop gap-12 items-center whitespace-nowrap w-fit">
          {[...clientes, ...clientes].map(({ src, alt }, index) => (
            <div key={index} className="relative w-28 h-20">
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
      </div>

      <style jsx>{`
        @keyframes scroll-loop {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-loop {
          animation: scroll-loop 60s linear infinite;
        }
      `}</style>
    </main>
  );
}
