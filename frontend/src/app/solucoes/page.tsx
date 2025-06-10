// app/solucoes/page.tsx
import Image from "next/image";
import Link from "next/link";
import { techs } from "@/data/techs";

export const metadata = {
  title: "Soluções Oficiais | WerneTech",
  description:
    "Explore nossas parcerias oficiais com Zoom, Google, Microsoft, Azure e muito mais.",
};

export default function SolucoesPage() {
  return (
    <main className="max-w-8xl mx-auto px-4 py-12 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
        Soluções Oficiais
      </h1>

      {/* Grid de logos + botão */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 px-4 md:px-16">
        {techs.map((tech, index) => (
          <Link
            key={index}
            href={`/solucoes/${tech.slug}`}
            className="group relative flex flex-col items-center justify-center text-center rounded-xl transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl p-4 bg-white"
          >
            <div className="transition-all duration-300 ease-in-out group-hover:scale-105">
              <Image
                src={tech.logo}
                alt={tech.name}
                width={72}
                height={72}
                className="object-contain h-16 mb-2"
              />
            </div>
            <span className="text-sm font-semibold text-indigo-700 group-hover:text-indigo-900 transition-colors">
              {tech.cta || "Agende uma demonstração"}
            </span>
            {/* Adiciona um "aura" sutil no fundo ao passar o mouse */}
            <span className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300 z-[-1]" />
          </Link>
        ))}
      </div>

      {/* Seções descritivas por software */}
      <div className="space-y-0">
        {techs.map((tech, index) => (
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
                src={tech.banner}
                alt={`${tech.name} Banner`}
                width={700}
                height={400}
                className="rounded-lg shadow"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <Image
                src={tech.logo}
                alt={`${tech.name} Logo`}
                width={120}
                height={70}
                className="mb-3 inline-block"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                {tech.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {tech.description}
              </p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
