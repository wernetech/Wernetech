import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Contato */}
        <div>
          <h3 className="text-base font-semibold mb-3">Contato</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 (83) 99120-0828</li>
            <li>✉️ comercial@wernetech.com</li>
            <li>📍 Rua das Trincheiras, 194 Sala 16 - Centro, João Pessoa - PB - CEP 58011-000</li>
          </ul>
        </div>

        {/* Institucional */}
        <div>
          <h3 className="text-base font-semibold mb-3">Institucional</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/sobre" className="hover:text-blue-800 transition">
                Sobre a empresa
              </Link>
            </li>
            <li>
              <Link
                href="/consultoria"
                className="hover:text-blue-800 transition"
              >
                Consultoria
              </Link>
            </li>
            {/* <li>
              <Link
                href="/politica-privacidade"
                className="hover:text-blue-800 transition"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos" className="hover:text-blue-800 transition">
                Termos de uso
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Soluções */}
        {/* <div>
          <h3 className="text-base font-semibold mb-3">Soluções</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/solucoes/software"
                className="hover:text-blue-800 transition"
              >
                Softwares
              </Link>
            </li>
            <li>
              <Link
                href="/solucoes/licenciamento"
                className="hover:text-blue-800 transition"
              >
                Licenciamento
              </Link>
            </li>
            <li>
              <Link
                href="/solucoes/suporte"
                className="hover:text-blue-800 transition"
              >
                Suporte
              </Link>
            </li>
          </ul>
        </div> */}

        {/* Mídias Sociais */}
        <div>
          <h3 className="text-base font-semibold mb-3">Siga a gente</h3>
          <div className="flex gap-4 text-gray-600">
            {/* <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-600">
              <Instagram size={20} />
            </a> */}
            <a href="https://www.linkedin.com/company/wernetech" aria-label="Linkedin" className="hover:text-blue-700">
              <Linkedin size={20} />
            </a>
            {/* <a href="#" aria-label="YouTube" className="hover:text-red-600">
              <Youtube size={20} />
            </a> */}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-4 border-t border-gray-200 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} WERNETECH INFORMATICA LTDA. {" "}
        <a
          href="https://drive.google.com/file/d/1QzMIppZCWm2efHcHuTHUgTeZy78HIzpd/view"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600 transition"
        >
          Todos os direitos reservados
        </a>
      </div>
    </footer>
  );
}
