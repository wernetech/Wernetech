"use client";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

const contents = {
  "comunicacao-e-colaboracao": {
    title: "Conecte, Colabore e Inove com Plataformas de Comunicação Unificada",
    sections: [
      {
        heading: "Plataforma Zoom",
        body: "Nossa parceria com a Zoom nos permite implementar uma plataforma robusta para conectar equipes e clientes em qualquer cenário de trabalho.",
      },
      {
        heading: "Zoom Workplace",
        body: "Unifique a comunicação com telefone, chat, reuniões e calendário. Tudo em um só lugar para produtividade máxima.",
      },
    ],
  },
  "nuvem-e-infraestrutura": {
    title: "Transforme seu Negócio com a Nuvem e Infraestrutura Inteligente",
    sections: [
      {
        heading: "Google Cloud Platform (GCP)",
        body: "Como parceiros Google Cloud, ajudamos sua empresa a utilizar Big Data, IA, infraestrutura de alta performance e muito mais.",
      },
      {
        heading: "Monitoramento com SolarWinds",
        body: "Visualize e gerencie sua infraestrutura com inteligência e alertas em tempo real.",
      },
    ],
  },
  // Adicione os demais slugs aqui...
};

export default function SolucaoPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = contents[slug];

  if (!data) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center leading-snug">
        {data.title}
      </h1>

      <div className="space-y-10">
        {data.sections.map((sec, idx) => (
          <section
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-6 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              {sec.heading}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {sec.body}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
