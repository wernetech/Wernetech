export const metadata = {
  title: "Consultoria em Tecnologia | WerneTech",
  description:
    "Transforme sua empresa com a consultoria especializada da WerneTech. Diagnóstico, planejamento e implementação com foco em resultados.",
};

export default function ConsultoriaPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Consultoria Estratégica em TI
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Soluções sob medida para digitalizar processos, aumentar
            produtividade e reduzir custos na sua empresa.
          </p>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-800 text-center mb-12">
            Como podemos transformar seu negócio
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Diagnóstico Completo",
                desc: "Analisamos sua infraestrutura, software e processos para identificar oportunidades reais de melhoria.",
              },
              {
                title: "Plano Estratégico",
                desc: "Desenvolvemos um plano de ação personalizado com foco em produtividade, automação e segurança.",
              },
              {
                title: "Execução Guiada",
                desc: "Nossa equipe acompanha a implantação de soluções e oferece suporte técnico contínuo.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 transition"
              >
                <h3 className="text-blue-700 font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-50 py-16 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-8">
            Entre em contato com nossos especialistas e descubra como a
            consultoria da WerneTech pode levar sua empresa a um novo patamar.
          </p>
          <a
            href="/contato"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Fale com um Consultor
          </a>
        </div>
      </section>
    </main>
  );
}
