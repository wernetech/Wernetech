"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    function updateNodes() {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }
    }

    function drawLines() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.stroke();
          }
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateNodes();
      drawLines();
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#00bfff";
        ctx.fill();
      });
      requestAnimationFrame(render);
    }

    render();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full px-4 py-8 gap-6 md:gap-12">
        <div className="text-white max-w-xl md:mr-8 md:w-1/2">
          <h1 className="text-5xl font-bold mb-4">Crie sua Conta</h1>
          <p className="text-lg leading-relaxed">
            Preencha o formulário para ter acesso gratuito e imediato aos nossos
            conteúdos e insights de tecnologia.
          </p>
        </div>

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
                E-mail corporativo
              </label>
              <input
                type="email"
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="seuemail@suaempresa.com.br"
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
                placeholder="Digite sua senha"
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
              {loading ? "Registrando..." : "Criar minha conta"}
            </button>

            <p className="text-xs text-center text-gray-600 mt-2">
              Já tem uma conta?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Faça login
              </a>
            </p>

            <p className="text-xs text-center text-gray-500 mt-4">
              Ao continuar, você concorda com nossa{" "}
              <a
                href="https://drive.google.com/file/d/1QzMIppZCWm2efHcHuTHUgTeZy78HIzpd/view"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 transition"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
