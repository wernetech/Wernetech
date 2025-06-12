"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const canvasRef = useRef(null);
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState<"fraca" | "media" | "forte">(
    "fraca"
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // === fundo animado ===
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const updateNodes = () => {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
    };

    const drawLines = () => {
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
    };

    const render = () => {
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
    };

    render();
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  // === força da senha ===
  useEffect(() => {
    const tests = [
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    const passed = tests.filter(Boolean).length;

    if (password.length < 8 || passed <= 1) setStrength("fraca");
    else if (passed === 2 || passed === 3) setStrength("media");
    else setStrength("forte");
  }, [password]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Token ausente ou inválido.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (strength === "fraca") {
      setError("Senha muito fraca. Tente uma mais segura.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao redefinir senha.");
        return;
      }

      setSuccess("Senha redefinida com sucesso!");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative h-[90vh] w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      <div className="relative z-20 flex items-center justify-center h-full px-4 py-8">
        <div className="bg-white bg-opacity-95 backdrop-blur-lg p-8 rounded-xl max-w-md w-full shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Redefinir Senha
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Crie uma nova senha segura.
          </p>

          <form className="space-y-4 text-black" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Nova senha
              </label>
              <input
                type="password"
                required
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <div className="mt-2">
                <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
                  <div
                    className={`h-2 transition-all duration-300 ${
                      strength === "fraca"
                        ? "w-1/3 bg-red-500"
                        : strength === "media"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                    }`}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1 flex justify-between">
                  <span>Força da senha:</span>
                  <span
                    className={`font-medium ${
                      strength === "fraca"
                        ? "text-red-600"
                        : strength === "media"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {strength === "fraca"
                      ? "Fraca"
                      : strength === "media"
                      ? "Média"
                      : "Forte"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Confirmar nova senha
              </label>
              <input
                type="password"
                required
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
              {loading ? "Enviando..." : "Redefinir senha"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:underline text-sm"
            >
              Voltar ao login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
