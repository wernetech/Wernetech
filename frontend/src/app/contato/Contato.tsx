"use client";

import { useState } from "react";

export default function Contato() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact_reason: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/email/send5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", contact_reason: "", message: "" });
      } else {
        alert("Erro ao enviar mensagem.");
      }
    } catch (err) {
      console.error("Erro ao enviar contato:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row bg-white rounded-xl border shadow-md max-w-6xl w-full overflow-hidden">
        <div className="bg-gray-100 p-10 w-full md:w-[40%]">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Entre em Contato</h2>
          <p className="text-gray-600 mb-8">
            Nossa equipe está pronta para ajudar. Preencha o formulário ao lado ou utilize um dos canais abaixo e retornaremos o mais breve possível.
          </p>
          <div className="mb-6">
            <strong className="block text-gray-800 mb-1">Telefone</strong>
            <span className="text-gray-600">(83) 99120-0828</span>
          </div>
          <div className="mb-6">
            <strong className="block text-gray-800 mb-1">E-mail</strong>
            <span className="text-gray-600">contato@wernetech.com</span>
          </div>
          <div>
            <strong className="block text-gray-800 mb-1">Endereço</strong>
            <span className="text-gray-600">
              Rua das Trincheiras, 194 Sala 16<br />
              Centro, João Pessoa - PB<br />
              CEP: 58011-000
            </span>
          </div>
        </div>

        <div className="p-10 w-full md:w-[60%]">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Envie sua mensagem</h3>
          <form onSubmit={handleSubmit} className="space-y-5 text-black">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nome Completo</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu e-mail"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Motivo do Contato</label>
              <select
                name="contact_reason"
                required
                value={form.contact_reason}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Selecione uma opção...</option>
                <option value="licenciamento">Dúvidas sobre Licenciamento</option>
                <option value="cursos">Interesse nos Cursos</option>
                <option value="suporte">Suporte Técnico</option>
                <option value="parceria">Quero ser um Parceiro</option>
                <option value="outro">Outros Assuntos</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Sua Mensagem</label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escreva sua dúvida ou solicitação aqui..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            >
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </button>
            {success && <p className="text-green-600 text-sm text-center">Mensagem enviada com sucesso!</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
