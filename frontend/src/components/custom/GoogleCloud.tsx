"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GoogleCloudPage() {
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
        body: JSON.stringify({ ...form, solution: "Google Cloud" }),
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
      <section className="bg-blue-50 overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/solucoes/cloud1.png"
                alt="Google Cloud Logo"
                width={160}
                height={160}
                className="w-40 mb-4"
              />
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Construa o futuro na nuvem com o Google Cloud
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                A plataforma de nuvem segura, escalável e inteligente que
                potencia a inovação, análise de dados e modernização de
                infraestrutura.
              </p>
              <a
                href="#contato"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
              >
                Comece sua jornada
              </a>
            </motion.div>
            <motion.div
              className="md:w-1/2 mt-10 md:mt-0"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/solucoes/cloud.gif"
                alt="Painel Google Cloud"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 text-black bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Por que migrar para o Google Cloud?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-xl border shadow-md bg-white border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-2">
                  {
                    [
                      "Infraestrutura Escalável e Segura",
                      "Poder da Análise de Dados",
                      "Inovação com IA e ML",
                    ][i]
                  }
                </h3>
                <p>
                  {
                    [
                      "Hospede suas aplicações em data centers modernos com alta performance e segurança.",
                      "Transforme dados em insights acionáveis com BigQuery e outras ferramentas.",
                      "Implemente soluções inteligentes com os serviços de IA e machine learning do Google.",
                    ][i]
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Recursos essenciais para escalar seu negócio
            </h2>
            <p className="text-lg text-gray-300 mb-12">
              O Google Cloud combina performance, inteligência e economia para
              atender empresas de todos os portes.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {["Compute Engine", "Cloud Storage", "BigQuery", "Vertex AI"].map(
              (title, i) => (
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
                        "Execução de VMs altamente configuráveis sob demanda.",
                        "Armazene e acesse seus dados de forma segura e escalável.",
                        "Análise de grandes volumes de dados em segundos.",
                        "Construa e implemente modelos de IA com facilidade.",
                      ][i]
                    }
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Formulário CTA */}
      <section id="contato" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.h2
            className="text-3xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Pronto para modernizar seu ambiente com o Google Cloud?
          </motion.h2>
          <motion.p
            className="text-lg mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Fale com nossos especialistas e descubra como transformar sua
            infraestrutura em uma vantagem competitiva.
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 text-black bg-white p-8 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              Preencha o formulário abaixo:
            </h3>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Digite seu WhatsApp"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Empresa / Instituição"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
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
