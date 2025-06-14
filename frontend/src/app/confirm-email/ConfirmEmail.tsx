"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmEmailPage() {
  const canvasRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("pending"); // "pending" | "success" | "error"

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

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    async function confirmEmail() {
      try {
        const res = await fetch(`/api/auth/confirm-email?token=${token}`);

        if (!res.ok) {
          setStatus("error");
        } else {
          setStatus("success");
        }
      } catch {
        setStatus("error");
      }
    }

    confirmEmail();
  }, [token]);

  return (
    <main className="relative h-[90vh] w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      <div className="relative z-20 flex items-center justify-center h-full px-4 py-8">
        <div className="bg-white bg-opacity-95 backdrop-blur-lg p-8 rounded-xl max-w-md w-full shadow-md text-center">
          {status === "pending" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Confirmando e-mail...
              </h2>
              <p className="text-gray-600">
                Aguarde enquanto validamos seu token.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                E-mail confirmado com sucesso!
              </h2>
              <p className="text-gray-700">
                Você já pode fazer login normalmente.
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Link inválido ou expirado.
              </h2>
              <p className="text-gray-700">
                Solicite um novo link de confirmação.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
