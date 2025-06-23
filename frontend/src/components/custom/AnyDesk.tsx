"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AnyDeskPage() {
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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/email/send2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, solution: "AnyDesk" }),
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
        alert("Erro ao enviar o contato.");
      }
    } catch (err) {
      console.error("Erro no envio:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-red-50 overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/solucoes/anydesk1.webp"
                alt="AnyDesk Logo"
                width={160}
                height={160}
                className="w-40 mb-4"
              />
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Controle remoto rápido e seguro com o AnyDesk
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Uma solução leve e eficiente para acesso remoto, suporte técnico
                e colaboração à distância. Conecte-se a qualquer dispositivo, de
                qualquer lugar.
              </p>
              <a
                href="#contato"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-300"
              >
                Solicite uma demonstração
              </a>
            </motion.div>
            <motion.div
              className="md:w-1/2 mt-10 md:mt-0"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/solucoes/anydesk.webp"
                alt="Plataforma AnyDesk em funcionamento"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Porque migrar */}
      <section className="py-20 text-black bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Chegou a hora de evoluir. Por que escolher o AnyDesk?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`p-8 rounded-xl border shadow-md bg-white border-gray-200`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-2">
                  {
                    [
                      "Alta Performance e Baixo Consumo",
                      "Segurança e Criptografia Avançadas",
                      "Conexão Instantânea em Qualquer Lugar",
                    ][i]
                  }
                </h3>
                <p>
                  {
                    [
                      "Transmita imagem e som com fluidez mesmo em conexões lentas.",
                      "Dados protegidos com tecnologia TLS 1.2 e criptografia RSA 2048.",
                      "Acesse dispositivos remotos com poucos cliques, sem complicação.",
                    ][i]
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Recursos avançados para suporte remoto profissional
            </h2>
            <p className="text-lg text-gray-300 mb-12">
              O AnyDesk oferece ferramentas robustas para assistência, controle,
              transferência de arquivos e muito mais, tudo em tempo real.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Transferência de Arquivos",
              "Acesso Multiplataforma",
              "Gravação de Sessão",
              "Gerenciamento de Permissões",
            ].map((title, i) => (
              <motion.div
                key={title}
                className="bg-gray-800 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-lg">{title}</h4>
                <p className="text-gray-400">
                  {
                    [
                      "Envie e receba arquivos com facilidade durante a sessão remota.",
                      "Compatível com Windows, macOS, Linux, Android e iOS.",
                      "Grave todas as atividades da sessão para auditoria e segurança.",
                      "Controle total de acessos com permissões configuráveis por sessão.",
                    ][i]
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário CTA */}
      <section id="contato" className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.h2
            className="text-3xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Pronto para transformar seu atendimento remoto?
          </motion.h2>
          <motion.p
            className="text-lg mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Solicite uma apresentação gratuita e entenda como o AnyDesk pode
            aumentar a eficiência da sua equipe.
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 text-black bg-white p-8 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-red-600">
              Preencha o formulário abaixo:
            </h3>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Digite seu WhatsApp"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Empresa / Instituição"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Quantas licenças você precisa?*</option>
              <option>1-10</option>
              <option>11-50</option>
              <option>51-100</option>
              <option>+100</option>
            </select>
            {success && (
              <p className="text-green-600 text-sm text-center">
                Lead enviado com sucesso! Entraremos em contato em breve.
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
            >
              {loading
                ? "Enviando..."
                : "ENTRE EM CONTATO COM O SETOR DE VENDAS"}
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
