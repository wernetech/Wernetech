"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const canvasRef = useRef(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    cellphone: "",
    company: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    width: "0%",
    color: "",
    text: "",
    textColor: "",
  });

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

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length > 0) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let width = "0%",
      color = "",
      text = "",
      textColor = "";
    switch (score) {
      case 1:
      case 2:
        width = "25%";
        color = "#ef4444";
        text = "Senha Fraca";
        textColor = "#ef4444";
        break;
      case 3:
        width = "50%";
        color = "#f97316";
        text = "Senha Média";
        textColor = "#f97316";
        break;
      case 4:
        width = "75%";
        color = "#3b82f6";
        text = "Senha Boa";
        textColor = "#3b82f6";
        break;
      case 5:
        width = "100%";
        color = "#22c55e";
        text = "Senha Forte";
        textColor = "#22c55e";
        break;
    }
    setPasswordStrength({ width, color, text, textColor });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao registrar.");
        return;
      }

      setSuccess(
        "Verifique seu e-mail para confirmar o cadastro antes de fazer login."
      );
      setTimeout(() => router.push("/login"), 5000);
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 py-10 gap-10 lg:gap-20">
        {/* Texto lateral */}
        <div className="text-white text-center lg:text-left max-w-xl w-full lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Crie sua Conta
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed">
            Preencha o formulário para ter acesso imediato aos nossos conteúdos
            e insights de tecnologia.
          </p>
        </div>

        {/* Formulário */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl z-20">
          <div className="p-6 sm:p-8 text-center border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Criar conta</h2>
            <p className="text-sm text-gray-500 mt-1">
              Registre-se com seu e-mail
            </p>
          </div>

          <form
            className="p-6 sm:p-8 space-y-4 text-black"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                placeholder="Digite seu e-mail"
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
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                placeholder="Crie uma senha forte"
                value={form.password}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, password: e.target.value }));
                  checkPasswordStrength(e.target.value);
                }}
              />
              <div className="mt-2 h-1.5 rounded-full bg-gray-200">
                <div
                  style={{
                    width: passwordStrength.width,
                    backgroundColor: passwordStrength.color,
                  }}
                  className="h-1.5 rounded-full transition-all duration-300"
                />
              </div>
              <p
                className="text-xs mt-1"
                style={{ color: passwordStrength.textColor }}
              >
                {passwordStrength.text}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                placeholder="Repita a senha"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                  placeholder="(XX) XXXXX-XXXX"
                  value={form.cellphone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, cellphone: e.target.value }))
                  }
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Empresa
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                  placeholder="Nome da empresa"
                  value={form.company}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, company: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Cidade
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                  placeholder="Sua cidade"
                  value={form.city}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  UF
                </label>
                <select
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                  value={form.state}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, state: e.target.value }))
                  }
                >
                  <option value="">UF</option>
                  {[
                    "AC",
                    "AL",
                    "AP",
                    "AM",
                    "BA",
                    "CE",
                    "DF",
                    "ES",
                    "GO",
                    "MA",
                    "MT",
                    "MS",
                    "MG",
                    "PA",
                    "PB",
                    "PR",
                    "PE",
                    "PI",
                    "RJ",
                    "RN",
                    "RS",
                    "RO",
                    "RR",
                    "SC",
                    "SP",
                    "SE",
                    "TO",
                  ].map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center pt-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-600"
              >
                Eu li e aceito os{" "}
                <a
                  href="https://drive.google.com/file/d/1zd4nLdHgXGi5GFA4W-aNbwO9_fANGeSX/view"
                  target="_blank"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  rel="noopener noreferrer"
                >
                  Termos de Serviço
                </a>
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
            {success && (
              <div className="text-sm text-green-700 bg-green-100 border border-green-300 rounded-md p-2 text-center">
                {success}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700"
              >
                {loading ? "Registrando..." : "Criar minha conta"}
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Já possui uma conta?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Faça login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
