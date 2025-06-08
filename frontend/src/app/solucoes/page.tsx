// app/solucoes/page.tsx

import Image from "next/image";
import Link from "next/link";

const softwares = [
  {
    name: "Zoom",
    logo: "/solucoes/zoom1.jpg",
    banner: "/solucoes/zoom.gif",
    title: "Plataforma de comunicação e colaboração unificada",
    description:
      "Faça conexões significativas com reuniões, chat em equipe, quadro de compartilhamento, telefone e muito mais em uma oferta.",
  },
  {
    name: "Google Workspace",
    logo: "/solucoes/google1.webp",
    banner: "/solucoes/google.gif",
    title:
      "O Google Workspace é a alternativa para os órgãos públicos serem mais produtivos e colaborativos.",
    description:
      "Colabore com segurança e produtividade em ferramentas integradas como Gmail, Meet, Drive, Agenda, Documentos e muito mais.",
  },
  {
    name: "Google Cloud",
    logo: "/solucoes/cloud1.png",
    banner: "/solucoes/cloud.gif",
    title:
      "O Google Cloud oferece infraestrutura escalável e segura para transformar digitalmente órgãos públicos e empresas.",
    description:
      "Implemente soluções em nuvem com alta performance, inteligência artificial, Big Data e segurança de nível empresarial para modernizar seus sistemas e serviços.",
  },
  {
    name: "Infraestrutura de Armazenamento Solar Wigs",
    logo: "/solucoes/solarWigs.webp",
    banner: "/solucoes/solarWigs1.png",
    title: "Armazenamento Rápido, Confiável e Seguro para Dados Críticos",
    description:
      "Nossas soluções combinam servidores HPE e controladoras Indilinx para oferecer alta velocidade, escalabilidade e confiabilidade no acesso a dados essenciais, suportando desde data centers até aplicações em nuvem e edge.",
  },
  {
    name: "Kaspersky Endpoint Security",
    logo: "/solucoes/karpely1.png",
    banner: "/solucoes/karpely.gif",
    title: "Proteção Inteligente Contra Ameaças Digitais Avançadas",
    description:
      "Com tecnologia premiada, o Kaspersky Endpoint Security protege seus servidores e estações contra malware, ransomware e phishing, com gerenciamento centralizado para ambientes corporativos exigentes.",
  },
  {
    name: "ChromeOS Corporativo",
    logo: "/solucoes/chrome1.webp",
    banner: "/solucoes/chrome.gif",
    title: "Gestão Eficiente e Segurança Nativa com ChromeOS",
    description:
      "Modernize sua infraestrutura com dispositivos gerenciados baseados em ChromeOS. Com atualizações automáticas, segurança multicamadas e gerenciamento remoto simplificado, os Chromebooks oferecem uma experiência ágil e segura por padrão.",
  },
  {
    name: "TeamViewer",
    logo: "/solucoes/teamviewer.jpg",
    banner: "/solucoes/teamviewer1.gif",
    title: "Suporte Remoto Seguro e Eficiente, de Qualquer Lugar",
    description:
      "O TeamViewer permite conexões remotas rápidas e criptografadas para assistência técnica, acesso a servidores e colaboração em tempo real. Ideal para equipes de TI e atendimento ao cliente em ambientes distribuídos.",
  },
  {
    name: "AnyDesk",
    logo: "/solucoes/anydesk1.webp",
    banner: "/solucoes/anydesk.webp",
    title: "Conectividade Remota de Alta Performance com Baixa Latência",
    description:
      "O AnyDesk oferece controle remoto leve e confiável com transferência de arquivos, suporte multiplataforma e segurança robusta. Uma solução ideal para acesso remoto a desktops e servidores com desempenho superior.",
  },
];

export const metadata = {
  title: "Soluções Oficiais | WerneTech",
  description:
    "Explore nossas parcerias oficiais com Zoom, Google, Microsoft, Azure e muito mais.",
};

export default function SolucoesPage() {
  return (
    <main className="max-w-8xl mx-auto px-4 py-12 bg-amber-50">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
        Soluções Oficiais
      </h1>

      {/* Logos com botão de demonstração */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 px-4 md:px-16">
        {softwares.map((software, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md text-center flex flex-col items-center justify-between"
          >
            <Image
              src={software.logo}
              alt={software.name}
              width={80}
              height={80}
              className="object-contain h-16"
            />
            <Link
              href="/consultoria"
              className="mt-3 text-xs bg-blue-700 hover:bg-blue-800 text-white py-1.5 px-3 rounded-full transition"
            >
              Agende uma demonstração
            </Link>
          </div>
        ))}
      </div>

      {/* Seções de destaque por software */}
      <div className="space-y-0">
        {softwares.map((software, index) => (
          <section
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-8 py-12 px-4 md:px-10 ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
            style={{
              backgroundColor:
                index % 3 === 0
                  ? "#ffffff"
                  : index % 3 === 1
                  ? "#f9fafb"
                  : "#f1f5f9",
            }}
          >
            <div className="flex-1">
              <Image
                src={software.banner}
                alt={software.name + " Banner"}
                width={700}
                height={400}
                className="rounded-lg shadow"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <Image
                src={software.logo}
                alt={software.name + " Logo"}
                width={120}
                height={70}
                className="mb-3 inline-block"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                {software.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {software.description}
              </p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
