export const metadata = {
  title: "Sobre Nós | WerneTech Informática",
  description:
    "Conheça nossa trajetória, valores e compromissos como empresa referência em soluções digitais no Brasil.",
};

export default function SobrePage() {
  return (
    <main className="min-h-screen pt-20 bg-white text-gray-800">
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Sobre a WerneTech
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Há mais de uma década atuando com excelência, impulsionamos a
            transformação digital de empresas com tecnologia, capacitação e
            compromisso.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Nossa Missão
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Capacitar e digitalizar empresas com soluções inovadoras,
              acessíveis e confiáveis nas áreas de software, consultoria,
              treinamentos EAD e infraestrutura. Buscamos sempre a excelência
              técnica com foco em atendimento humanizado.
            </p>
          </div>
          <img
            src="/equipe-tech.png"
            alt="Equipe de tecnologia WerneTech"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">
            Nossas Parcerias
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center">
            {[
              { src: "/logos/microsoft.png", alt: "Microsoft Partner" },
              { src: "/logos/adobe.png", alt: "Adobe Partner" },
              { src: "/logos/autodesk.png", alt: "Autodesk Partner" },
              { src: "/logos/anydesk-logo.png", alt: "AnyDesk" },
            ].map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-12 mx-auto opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Presença Nacional
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 mb-8">
            Atendemos empresas em todo o Brasil com estrutura de suporte remoto,
            consultores regionais e soluções em nuvem.
          </p>
          <img
            src="/mapa-brasil.png"
            alt="Mapa de atuação WerneTech"
            className="mx-auto max-w-md"
          />
        </div>
      </section>
    </main>
  );
}
