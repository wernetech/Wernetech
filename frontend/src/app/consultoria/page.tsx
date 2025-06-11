"use client";
import { useState } from "react";

export default function ConsultoriaPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    segment: "",
    message: "",
    accepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    if (!form.accepted) {
      alert("Você precisa aceitar a política de privacidade.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          position: "",
          segment: "",
          message: "",
          accepted: false,
        });
      } else {
        alert("Erro ao enviar formulário");
      }
    } catch (err) {
      console.error("Erro no envio:", err);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Seção de Capacitação e Treinamento */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 text-gray-800">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Capacitação e Treinamento Contínuo
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Domine as Ferramentas que Impulsionam seu Negócio
          </p>
          <p className="mb-4">
            Acreditamos que a verdadeira transformação digital acontece quando
            as equipes dominam as ferramentas que têm em mãos. Por isso, criamos
            uma plataforma de treinamento exclusiva, projetada para capacitar
            seus colaboradores e garantir o máximo retorno sobre seu
            investimento em tecnologia.
          </p>
          <p className="mb-4">
            Através de um modelo de <strong>assinatura flexível</strong>, sua
            empresa ganha acesso a um portal de EAD com cursos, workshops e
            tutoriais sobre as principais plataformas do mercado — com foco
            especial em <strong>Google Workspace</strong> e{" "}
            <strong>Zoom</strong>.
          </p>
          <p className="mb-6">
            Ensinamos desde funcionalidades básicas até estratégias avançadas de
            colaboração, gestão e segurança, para que sua equipe utilize 100% do
            potencial das ferramentas.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Produtividade Acelerada:</strong> Equipes treinadas
              trabalham mais rápido e de forma mais inteligente.
            </li>
            <li>
              <strong>Maior Retorno sobre o Investimento (ROI):</strong>{" "}
              Transforme seu investimento em resultados reais.
            </li>
            <li>
              <strong>Aprendizagem Contínua:</strong> Mantenha sua equipe
              atualizada com as últimas funcionalidades.
            </li>
            <li>
              <strong>Redução de Custos com Suporte:</strong> Usuários
              capacitados resolvem mais problemas de forma autônoma.
            </li>
          </ul>
        </div>
      </section>

      {/* Formulário LGPD */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-8">
            Solicite uma Consultoria com Especialista
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Nome *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  E-mail *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu e-mail"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Telefone/Whatsapp *
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(99) 99999-9999"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Cargo
                </label>
                <input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Diretor de TI"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Empresa
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Segmento
                </label>
                <input
                  name="segment"
                  value={form.segment}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Construção civil"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">
                Conte-nos mais sobre sua necessidade *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3 min-h-[120px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva brevemente seu desafio ou necessidade técnica."
              />
            </div>

            <label className="flex items-start sm:items-center text-sm text-gray-700 gap-2">
              <input
                type="checkbox"
                name="accepted"
                checked={form.accepted}
                onChange={handleChange}
                className="mt-1 sm:mt-0"
              />
              <span>
                Li e aceito a{" "}
                <a
                  href="https://drive.google.com/file/d/1QzMIppZCWm2efHcHuTHUgTeZy78HIzpd/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
                  Política de Privacidade
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md font-semibold transition"
            >
              {loading ? "Enviando..." : "Receber Cotação"}
            </button>

            {success && (
              <p className="text-green-600 text-sm text-center mt-4">
                Lead enviado com sucesso! Entraremos em contato em breve.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
