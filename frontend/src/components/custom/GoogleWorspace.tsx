// Página dedicada ao Google Workspace com foco em UI/UX moderno e formulário integrado
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GoogleWorkspace() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    solution: "",
    role: "",
    licenses: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/email/send2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, solution: "Google Workspace" }),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          role: "",
          licenses: "",
          solution: "",
        });
      } else {
        alert("Erro ao enviar contato.");
      }
    } catch (err) {
      console.error("Erro ao enviar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      {/* Hero animado */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-white via-gray-50 to-white py-20"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <Image
              src="/solucoes/google.gif"
              alt="Google Workspace"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-800">
              Conecte sua equipe com o{" "}
              <span className="text-blue-600">Google Workspace</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              O Google Workspace emerge como uma solução completa para empresas,
              abrangendo um conjunto de ferramentas baseadas em nuvem, que
              buscam aprimorar simultaneamente a produtividade, colaboração e
              segurança. Incluindo uma variedade de aplicativos, como Gmail,
              Agenda, Meet, Chat, Drive, Documentos, Planilhas, Apresentações,
              Formulários, Sites, entre outros, o Google Workspace permite que
              as organizações operem de maneira mais eficiente. Destaca-se por
              proporcionar uma experiência de usuário intuitiva, facilitando o
              trabalho ágil e eficaz dos funcionários.
            </p>
            <a
              href="#contato"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Agendar Demonstração
            </a>
          </div>
        </div>
      </motion.section>

      {/* Benefícios */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Por que escolher o Google Workspace?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Produtividade",
                desc: "Acelere processos com apps integrados como Gmail, Drive, Docs, e muito mais.",
                icon: "/google/iconGoogleCollaboration.png",
              },
              {
                title: "Colaboração",
                desc: "Edite documentos em tempo real e conecte equipes de qualquer lugar.",
                icon: "/google/iconGoogleProdutivity.png",
              },
              {
                title: "Segurança",
                desc: "Proteja seus dados com autenticação multifator e criptografia avançada.",
                icon: "/google/iconGoogleSecurity.png",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-blue-700">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Intermediária Extra (Print 1) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-gray-800">
            <h2 className="text-3xl font-bold mb-6">
              Conecte sua equipe e trabalhe de forma mais colaborativa e
              eficiente.
            </h2>
            <p className="text-lg text-gray-600">
              O Google Workspace integra todas as ferramentas que você precisa
              em um só lugar: Gmail, Agenda, Drive, Docs, Meet e muito mais.
              Trabalhe de forma fluida com seus times e aumente a produtividade.
            </p>
          </div>
          <div>
            <Image
              src="/google/bg.jpg"
              alt="Integração Workspace"
              width={700}
              height={450}
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Seção Segurança (Print 2) */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            O Google Workspace foi desenvolvido com padrões de privacidade e
            segurança
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Verificação em duas etapas, criptografia de ponta a ponta,
            autenticação forte e conformidade com as práticas recomendadas do
            setor.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src="/google/web.svg"
                alt="Navegador"
                width={48}
                height={48}
              />
              <h3 className="text-xl font-semibold mt-4">100% Web</h3>
              <p className="text-gray-600 mt-2">
                Sistema baseado em navegador com atualizações automáticas e sem
                dependência de hardware.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src="/google/security.svg"
                alt="Segurança"
                width={48}
                height={48}
              />
              <h3 className="text-xl font-semibold mt-4">Criptografia</h3>
              <p className="text-gray-600 mt-2">
                Proteção total com criptografia de dados e autenticação forte.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src="/google/language.svg"
                alt="Escalabilidade"
                width={48}
                height={48}
              />
              <h3 className="text-xl font-semibold mt-4">Escalabilidade</h3>
              <p className="text-gray-600 mt-2">
                Atuação global com segurança avançada contra ataques de
                phishing, malware e ransomware.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src="/google/settings.svg"
                alt="Proteção"
                width={48}
                height={48}
              />
              <h3 className="text-xl font-semibold mt-4">
                Proteção de Endpoints
              </h3>
              <p className="text-gray-600 mt-2">
                Segurança no acesso, inclusive em dispositivos BYOD, com
                gerenciamento centralizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário CTA */}
      <section id="contato" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Vamos conversar sobre o Google Workspace?
          </h2>
          <p className="text-lg mb-8 text-center">
            Preencha o formulário e nossa equipe comercial entrará em contato
            com você em breve.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-black bg-white p-8 rounded-xl shadow-lg animate-fadeIn"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Seu nome"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Seu e-mail"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="WhatsApp"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Empresa / Instituição"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Seu cargo*</option>
              <option>Diretor</option>
              <option>TI</option>
              <option>Compras</option>
              <option>Outros</option>
            </select>

            <select
              name="solution"
              value={form.solution}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Informe a solução ou tecnologia
              </option>
              <option value="Zoom">Zoom</option>
              <option value="Google Workspace">Google Workspace</option>
              <option value="TeamViewer">TeamViewer</option>
              <option value="AnyDesk">AnyDesk</option>
              <option value="Infraestrutura HPE">Infraestrutura HPE</option>
              <option value="Controladoras Indilinx">
                Controladoras Indilinx
              </option>
              <option value="Kaspersky">Kaspersky</option>
              <option value="ChromeOS">ChromeOS</option>
              <option value="Google Cloud">Google Cloud</option>
              <option value="SolarWinds">SolarWinds</option>
              <option value="Outros">Outros</option>
            </select>

            <select
              name="licenses"
              value={form.licenses}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Quantas licenças?*</option>
              <option>1-10</option>
              <option>11-50</option>
              <option>51-100</option>
              <option>+100</option>
            </select>
            
            {success && (
              <p className="text-green-600 text-sm text-center">
                Contato enviado com sucesso!
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Enviando..." : "Solicitar Demonstração"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
