import Link from "next/link";

const solutions = [
  {
    title: "Comunicação e Colaboração",
    slug: "comunicacao-e-colaboracao",
    description:
      "Zoom, Google Workspace e ferramentas para trabalho em equipe de qualquer lugar.",
  },
  {
    title: "Nuvem e Infraestrutura",
    slug: "nuvem-e-infraestrutura",
    description:
      "Ambientes escaláveis, modernos e seguros com Google Cloud e SolarWinds.",
  },
  {
    title: "Armazenamento de Alta Performance",
    slug: "armazenamento-alta-performance",
    description:
      "Tecnologia robusta HPE e SSDs Indilinx para desempenho máximo e segurança.",
  },
  {
    title: "Acesso Remoto",
    slug: "acesso-remoto",
    description:
      "Conectividade eficiente com TeamViewer e AnyDesk para suporte e home office.",
  },
  {
    title: "Cibersegurança e Endpoint",
    slug: "ciberseguranca-e-endpoint",
    description:
      "Proteção com Kaspersky, ChromeOS e gestão moderna de dispositivos.",
  },
];

export const metadata = {
  title: "Soluções | WerneTech",
  description: "Explore nossas soluções tecnológicas sob medida.",
};

export default function SolucoesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-14">
        Soluções Tecnológicas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {solutions.map((solucao) => (
          <Link
            key={solucao.slug}
            href={`/solucoes/${solucao.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-600"
          >
            {/* Gradiente sutil decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-0" />

            <div className="relative z-10">
              <h2 className="text-xl font-bold text-blue-800 group-hover:text-blue-900 transition-colors mb-2">
                {solucao.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">
                {solucao.description}
              </p>
              <div className="mt-4 text-sm text-blue-700 font-semibold group-hover:underline">
                Saiba mais →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
