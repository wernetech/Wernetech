export const metadata = {
  title: "Wernetech - Impulsionando o Futuro com Soluções de TI Inteligentes",
  description:
    "Conheça nossa trajetória, valores e compromissos como empresa referência em soluções digitais no Brasil.",
};

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Nosso DNA é a Inovação
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Fundada há 6 anos, a Wernetech nasceu da visão de que a tecnologia,
            quando aplicada de forma estratégica, é a principal força para
            impulsionar organizações. Não somos apenas fornecedores; somos
            arquitetos de soluções, atuando como um parceiro consultivo que
            mergulha na realidade de cada cliente para entender seus desafios e
            entregar resultados que verdadeiramente importam.
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
              Resolver desafios complexos através de soluções tecnológicas
              personalizadas, garantindo que nossos clientes, do setor público
              ao privado, operem com máxima segurança e eficiência.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Nossa Visão
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ser a empresa de tecnologia mais confiável do Brasil para projetos
              de missão crítica, liderando a transformação digital com
              expertise, inovação e compromisso com o sucesso do cliente.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Nossos Valores
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nossos pilares são o compromisso com o cliente, vendo seu sucesso
              como nossa métrica final, e a excelência técnica, buscando a
              maestria em cada projeto. Agimos com integridade inabalável,
              conduzindo nossos negócios com transparência, e promovemos a
              inovação com propósito, focada em gerar impacto real. Acima de
              tudo, acreditamos na força da parceria, construindo relações de
              longo prazo baseadas na confiança e colaboração.
            </p>
          </div>
          <img
            src="/sobre.png"
            alt="Equipe de tecnologia WerneTech"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">
            Nossas Parcerias
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center">
            {[
              { src: "/commerce/office.webp", alt: "Microsoft Partner" },
              { src: "/commerce/creative.png", alt: "Adobe Partner" },
              { src: "/commerce/autodesk.png", alt: "Autodesk Partner" },
              { src: "/anydesk-logo.png", alt: "AnyDesk" },
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
      </section> */}

      {/* <section className="py-16 bg-blue-50">
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
      </section> */}
    </main>
  );
}
