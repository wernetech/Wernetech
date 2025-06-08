import CommerceSection from "@/components/Home/ComerceSection";
import EadSection from "@/components/Home/EadSection";

const cardData = [
  {
    title: "Pacote Office para Empresas",
    description:
      "Soluções completas de produtividade com Word, Excel, PowerPoint e mais.",
    logo: "/office-logo.png",
  },
  {
    title: "Controle Remoto com AnyDesk",
    description:
      "Acesso remoto seguro, rápido e com baixa latência para equipes distribuídas.",
    logo: "/anydesk-logo.png",
  },
  {
    title: "Ambiente de Desenvolvimento com VS",
    description:
      "Editor de código robusto e extensível para devs modernos e produtivos.",
    logo: "/vs-logo.png",
  },
];

export const metadata = {
  title: "Início | Empresa de Soluções Digitais",
  description:
    "Transforme seu negócio com soluções inovadoras em tecnologia, automação e consultoria digital.",
};

export default function HomePage() {
  return (
    <section className="bg-gradient-to-b from-black via-slate-900 to-white text-white">
      {/* HERO */}
      <div className="text-center py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
          Impulsionando o Futuro com Soluções de TI Inteligentes
        </h1>
        <p className="mt-4 text-gray-300">
          Desenvolvemos soluções tecnológicas robustas que capacitam o setor
          público e empresas privadas a alcançar novos patamares de eficiência,
          segurança e inovação. Com parceiros líderes mundiais como Google e
          Zoom, e a confiança de mais de 800 clientes, transformamos desafios
          complexos em resultados concretos.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 pb-24">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="group rounded-2xl shadow-xl overflow-hidden border border-neutral-200 bg-white transition hover:shadow-2xl hover:scale-[1.02] duration-300 ease-in-out cursor-pointer"
          >
            <div
              className="h-48 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${card.logo})` }}
            />

            <div className="p-6 flex flex-col h-[220px] justify-between">
              <div>
                <h3 className="text-xl font-semibold text-neutral-800 group-hover:text-blue-800 transition">
                  {card.title}
                </h3>
                <p className="text-sm text-neutral-600 mt-2">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <EadSection />
      <CommerceSection />
    </section>
  );
}
