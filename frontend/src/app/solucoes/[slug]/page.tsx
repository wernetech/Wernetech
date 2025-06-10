"use client";

import { notFound } from "next/navigation";
import { techs } from "../../../data/techs";
import { Outfit } from "next/font/google";

import Image from "next/image";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  params: {
    slug: string;
  };
};

// eslint-disable-next-line @next/next/no-async-client-component
export default async function SolucaoLanding({ params }: Props) {
  const tech = techs.find((t) => t.slug === params.slug);
  if (!tech) return notFound();

  return (
    <main className={`${outfit.className} bg-white py-12 px-4 md:px-10`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <Image
            src={tech.logo}
            alt={tech.name}
            width={120}
            height={60}
            className="mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {tech.title}
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {tech.description}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl shadow p-6 md:p-10 w-full max-w-xl mx-auto">
          <form className="space-y-4 text-black">
            <h2 className="text-lg font-semibold mb-2">
              Preencha o formulário abaixo para entrar em contato com um agente comercial:
            </h2>
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Digite seu WhatsApp"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Empresa / Instituição"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Seu cargo*</option>
              <option>Diretor</option>
              <option>TI</option>
              <option>Compras</option>
              <option>Outros</option>
            </select>
            <select className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Quantas licenças você precisa?*</option>
              <option>1-10</option>
              <option>11-50</option>
              <option>51-100</option>
              <option>+100</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              ENTRE EM CONTATO COM O SETOR DE VENDAS
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
