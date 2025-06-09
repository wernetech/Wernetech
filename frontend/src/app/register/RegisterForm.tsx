"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao registrar.");
        return;
      }

      setSuccess("Conta criada com sucesso!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative h-[90vh] w-full overflow-hidden">
      {/* Fundo GIF */}
      <img
        src="/background.gif"
        alt="Fundo animado"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      {/* Conteúdo dividido */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full px-4 py-8 gap-6 md:gap-12">
        {/* Texto à esquerda */}
        <div className="text-white max-w-xl md:mr-8 md:w-1/2">
          <h1 className="text-5xl font-bold mb-4">Registre-se</h1>
          <p className="text-lg leading-relaxed">
            Crie sua conta para ter acesso aos conteúdos exclusivos e serviços
            personalizados oferecidos pela equipe Wernetech.
          </p>
        </div>

        {/* Formulário à direita */}
        <div className="bg-white bg-opacity-95 backdrop-blur-lg p-8 rounded-xl max-w-md w-full shadow-md">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
            Criar conta
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Registre-se com seu e-mail corporativo
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                type="password"
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
            {success && (
              <div className="text-green-600 text-sm text-center">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>

            <p className="text-xs text-center text-gray-600 mt-2">
              Já tem uma conta?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Faça login
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
