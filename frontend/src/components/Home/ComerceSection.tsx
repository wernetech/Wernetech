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
            Licenças Oficiais para sua Empresa
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Adquira licenças originais de{" "}
            <strong>Google Workspace, Zoom e Anydesk</strong> com entrega rápida,
            pagamento facilitado e suporte técnico especializado.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>✔️ Entrega automática por e-mail</li>
            <li>✔️ Licença original com nota fiscal</li>
            <li>✔️ Pagamento facilitado por boleto ou Pix</li>
          </ul>

          <Link
            href="/loja"
            className="mt-6 inline-block bg-blue-700 text-white px-6 py-3 rounded-md shadow hover:bg-blue-800 transition"
          >
            Acessar Loja Completa
          </Link>
        </div>
      </div>
    </section>
  );
}
