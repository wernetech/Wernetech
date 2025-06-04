"use client";

import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao fazer login");
        return;
      }

      // ✅ Sucesso → redireciona para subdomínio
      // window.open("https://admin.empresa.com.br", "_blank");
      window.open("https://www.google.com/");
    } catch (err) {
      console.error(err);
      // setError("Erro na conexão com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-blue-700 text-center">
          Acesse sua conta
        </h1>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Utilize seu e-mail corporativo para continuar
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="admin@empresa.com"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="text"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="********"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Esqueceu sua senha?{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline hover:text-blue-700"
            >
              Redefinir
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
