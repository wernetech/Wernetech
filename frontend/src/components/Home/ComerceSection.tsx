// components/CommerceSection.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

export default function CommerceSection() {
  return (
    <section className="bg-gradient-to-r bg-blue-200 py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Imagem à esquerda */}
        <div className="md:w-1/2">
          <Image
            src="/products.png"
            alt="Loja Digital"
            width={400}
            height={200}
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Conteúdo à direita */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-800">
            Uma Nova Forma de Gerenciar suas Licenças está Chegando
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Estamos desenvolvendo um portal exclusivo para revolucionar a gestão
            das suas licenças de software. Imagine centralizar o faturamento de{" "}
            <strong>Zoom Workplace</strong>, <strong>Google Workspace</strong> e{" "}
            <strong>Anydesk</strong>, otimizar seus custos com nossa consultoria
            e ter um canal de suporte prioritário, tudo em um só lugar. A
            complexidade de hoje será a simplicidade de amanhã.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Cadastre-se para ser notificado sobre o lançamento e descubra como
            vamos facilitar a gestão de tecnologia na sua empresa.
          </p>

          <Link
            href="/temporario"
            className="mt-6 inline-block bg-blue-700 text-white px-6 py-3 rounded-md shadow hover:bg-blue-800 transition"
          >
            Tenho interesse
          </Link>
        </div>
      </div>
    </section>
  );
}
