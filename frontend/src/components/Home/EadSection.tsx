import Image from "next/image";
import Link from "next/link";

export default function EadSection() {
  return (
    <section className="bg-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Título + descrição */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight">
            Plataforma de Cursos Online WerneTech
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Capacite sua equipe com treinamentos EAD nos principais softwares do
            mercado: <strong>Microsoft, Adobe, Autodesk</strong> e muito mais.
          </p>
        </div>

        {/* Cards de destaque */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Autodesk AutoCAD",
              image: "/cursos/autocad.png",
            },
            {
              title: "Microsoft Teams",
              image: "/cursos/teams.png",
            },
            {
              title: "Adobe Photoshop",
              image: "/cursos/photoshop.png",
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
            href="/plataforma"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md transition"
          >
            Acessar Plataforma Completa
          </Link>
        </div>
      </div>
    </section>
  );
}
