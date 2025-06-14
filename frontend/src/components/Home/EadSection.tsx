import Image from "next/image";
import Link from "next/link";

export default function EadSection() {
  return (
    <section className="bg-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Título + descrição */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight">
            Vem aí: A Nova Plataforma de Cursos Wernetech
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Estamos construindo um novo espaço de aprendizado para ajudar sua
            equipe a ir além. Em breve, você terá acesso a treinamentos práticos
            e detalhados, ministrados por nossos especialistas, para dominar as
            ferramentas que definem o futuro do trabalho:{" "}
            <strong>Zoom Workplace</strong>, <strong>Google Workspace</strong> e{" "}
            <strong>Google Cloud</strong> .
          </p>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Deixe seu contato e seja o primeiro a saber do lançamento. Garanta
            acesso a conteúdos e condições especiais que preparamos para você.
          </p>
        </div>

        {/* Cards de destaque */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Google Workspace",
              image: "/solucoes/google1.webp",
            },
            {
              title: "Google Cloud",
              image: "/solucoes/cloud1.png",
            },
            {
              title: "Zoom",
              image: "/solucoes/zoom1.jpg",
            },
          ].map((curso, i) => (
            <div
              key={i}
              className="rounded-xl bg-white shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={curso.image}
                  alt={curso.title}
                  fill
                  className="object-contain p-6 bg-gradient-to-b from-white via-slate-100 to-white"
                />
              </div>
              <div className="px-5 py-4">
                <h3 className="text-blue-800 font-semibold text-lg text-center">
                  {curso.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Botão */}
        <div className="text-center mt-14">
          <Link
            href="/temporario"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md transition"
          >
            Quero ser o primeiro a saber
          </Link>
        </div>
      </div>
    </section>
  );
}
