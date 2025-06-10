"use client";

import { useEffect, useRef } from "react";
import CommerceSection from "@/components/Home/ComerceSection";
import EadSection from "@/components/Home/EadSection";

const cardData = [
  {
    title: "Conexões e Compartilhamento com Zoom",
    description:
      "Faça conexões significativas com reuniões, chat em equipe, quadro de compartilhamento, telefone e muito mais em uma oferta.",
    logo: "/solucoes/zoom1.jpg",
  },
  {
    title: "Ferramentas com Google Workspace",
    description:
      "Revolucione a colaboração da sua equipe com as ferramentas inteligentes do Google Workspace.",
    logo: "/solucoes/google1.webp",
  },
  {
    title: "Controle Remoto com AnyDesk",
    description:
      "Acesso remoto seguro, rápido e com baixa latência para equipes distribuídas.",
    logo: "/solucoes/anydesk1.webp",
  },
];

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = sectionRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resize();

    const nodes = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const update = () => {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#00bfff";
        ctx.fill();
      });
    };

    const animate = () => {
      update();
      draw();
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section>
      {/* HERO + ANIMAÇÃO */}
      <div
        ref={sectionRef}
        className="relative overflow-hidden bg-black text-white pb-24"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        />
        <div className="absolute inset-0 bg-black opacity-70 z-10" />

        <div className="relative z-20 text-center py-16 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
            Impulsionando o Futuro com Soluções de TI Inteligentes
          </h1>
          <p className="mt-4 text-gray-200 max-w-4xl mx-auto">
            Desenvolvemos soluções tecnológicas robustas que capacitam o setor
            público e empresas privadas a alcançar novos patamares de
            eficiência, segurança e inovação. Com parceiros líderes mundiais
            como Google e Zoom, e a confiança de mais de 800 clientes,
            transformamos desafios complexos em resultados concretos.
          </p>
        </div>

        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-28 h-28 mb-4">
                <img
                  src={card.logo}
                  alt={card.title}
                  className="w-full h-full object-contain rounded-full border border-gray-300 p-2"
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-700">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OUTRAS SEÇÕES */}
      <div className="bg-white">
        <EadSection />
        <CommerceSection />
      </div>
    </section>
  );
}
