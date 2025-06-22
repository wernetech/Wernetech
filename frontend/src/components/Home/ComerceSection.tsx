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
            Licenciamento de Software: Seguro, Ágil e Direto
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Simplifique a aquisição de tecnologia para sua equipe. Em breve, a
            Wernetech lançará sua nova plataforma de e-commerce, um ambiente
            digital seguro para você adquirir licenças oficiais das maiores
            desenvolvedoras de software do mundo. Explore um catálogo completo,
            com soluções líderes como <strong>Zoom</strong>, <strong>Google Workspace</strong> e <strong>Anydesk</strong>, além de
            diversas outras ferramentas essenciais para seu negócio. Tudo com a
            garantia, o faturamento descomplicado e o suporte de um parceiro
            tecnológico que você já conhece e confia.
          </p>

          <Link
            href="/oferta"
            className="mt-6 inline-block bg-blue-700 text-white px-6 py-3 rounded-md shadow hover:bg-blue-800 transition"
          >
            Tenho interesse
          </Link>
        </div>
      </div>
    </section>
  );
}
