"use client";

import { useState } from "react";

export default function Temporario() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
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
      const res = await fetch("/api/email/send3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", company: "", role: "" });
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
    <main className="bg-white py-12 px-4 md:px-10">
      <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl shadow p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Entre em contato com nosso time comercial
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
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

          {success && (
            <p className="text-green-600 text-sm text-center">
              Lead enviado com sucesso!
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Enviando..." : "ENTRAR EM CONTATO"}
          </button>
        </form>
      </div>
    </main>
  );
}
