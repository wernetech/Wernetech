"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { techs } from "../../../data/techs";
import { Outfit } from "next/font/google";
import Image from "next/image";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  params: {
    slug: string;
  };
};

export default function SolucaoLanding({ params }: Props) {
  const tech = techs.find((t) => t.slug === params.slug);
  if (!tech) return notFound();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    licenses: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch(
        `/api/email/send2`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, solution: tech.name }),
        }
      );

      if (res.ok) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          role: "",
          licenses: "",
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
    <main className={`${outfit.className} bg-white py-12 px-4 md:px-10`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <Image
            src={tech.logo}
            alt={tech.name}
            width={120}
            height={60}
            className="mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {tech.title}
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {tech.description}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl shadow p-6 md:p-10 w-full max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <h2 className="text-lg font-semibold mb-2">
              Preencha o formulário abaixo para entrar em contato com um agente
              comercial:
            </h2>

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
          </form>
        </div>
      </div>
    </main>
  );
}
