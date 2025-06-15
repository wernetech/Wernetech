"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogOut } from "lucide-react";

const navLinks = [
  { href: "/sobre", label: "Sobre Nós" },
  {
    label: "Soluções",
    groupedDropdown: [
      {
        title: "Comunicação e Colaboração",
        items: [
          { href: "/solucoes/zoom", label: "Zoom" },
          { href: "/solucoes/googleWorkspace", label: "Google Workspace" },
        ],
      },
      {
        title: "Soluções de Armazenamento",
        items: [
          { href: "/solucoes/infraestruturaHpe", label: "Infraestrutura HPE" },
          { href: "/solucoes/indilinx", label: "Controladoras Indilinx" },
        ],
      },
      {
        title: "Nuvem e Infraestrutura",
        items: [
          { href: "/solucoes/googleCloud", label: "Google Cloud" },
          { href: "/solucoes/solarWigs", label: "SolarWinds" },
        ],
      },
      {
        title: "Soluções de Acesso Remoto",
        items: [
          { href: "/solucoes/teamViewer", label: "TeamViewer" },
          { href: "/solucoes/anyDesk", label: "AnyDesk" },
        ],
      },
      {
        title: "Cibersegurança e Endpoint",
        items: [
          { href: "/solucoes/kasperskyEndpointSecurity", label: "Kaspersky" },
          { href: "/solucoes/chromeOSCorporativo", label: "ChromeOS" },
        ],
      },
      {
        title: "Ver todas",
        items: [{ href: "/solucoes", label: "Ver todas as soluções" }],
      },
    ],
  },
  { href: "/consultoria", label: "Consultoria" },
  { href: "/clientes", label: "Nossos Clientes" },
  { href: "/blog", label: "Blog" },
  { href: "/", label: "Contato" },
];

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, checkAuth, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    await checkAuth();
    router.push("/");
  };

  const renderAuthButtons = () => {
    if (isAuthenticated === null) return null;

    return isAuthenticated ? (
      <>
        {user?.admin &&
          (pathname === "/blog/admin" ? (
            <Link
              href="/"
              className="ml-2 inline-flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition"
            >
              Voltar
            </Link>
          ) : (
            <Link
              href="/blog/admin"
              className="ml-2 inline-flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 transition"
            >
              Admin
            </Link>
          ))}

        <button
          onClick={handleLogout}
          className="ml-2 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
        >
          <LogOut size={16} />
          Sair
        </button>
      </>
    ) : (
      <Link
        href="/login"
        className="ml-4 inline-flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-md shadow hover:bg-blue-950 transition"
      >
        <Image src="/login.svg" alt="Login" width={16} height={16} />
        Entrar
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-0">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/Wernetech-02.png"
            alt="WerneTech Logo"
            width={200}
            height={40}
            className="max-h-[5rem] w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          {navLinks.map((link, i) =>
            link.groupedDropdown ? (
              <div key={i} className="relative group">
                <button className="flex items-center gap-1 hover:text-blue-800 transition-colors">
                  <span>{link.label}</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-max max-w-6xl bg-white shadow-lg rounded-md p-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-50">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                    {link.groupedDropdown.map((group, gi) => (
                      <div key={gi} className="space-y-4">
                        {group.title && (
                          <h3 className="font-bold text-sm uppercase text-gray-400">
                            {group.title}
                          </h3>
                        )}
                        <ul className="space-y-2">
                          {group.items.map((item, ii) => (
                            <li key={ii}>
                              <Link
                                href={item.href}
                                className={`block ${
                                  item.label.includes("Ver")
                                    ? "text-blue-600 font-semibold hover:underline"
                                    : "text-gray-700 hover:text-blue-600"
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={i}
                href={link.href}
                className="hover:text-blue-800 transition relative group"
              >
                <span>{link.label}</span>
                <span className="block h-[2px] w-0 group-hover:w-full transition-all bg-blue-500 absolute -bottom-1 left-0" />
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center">{renderAuthButtons()}</div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, i) =>
              link.groupedDropdown ? (
                <details key={i} className="group">
                  <summary className="cursor-pointer font-semibold text-gray-800 hover:text-blue-700 py-1">
                    {link.label}
                  </summary>
                  <div className="pl-4 pt-2 space-y-1">
                    {link.groupedDropdown.map((group, gi) =>
                      group.items.map((item, ii) => (
                        <Link
                          key={ii}
                          href={item.href}
                          className="block text-sm text-gray-700 hover:text-blue-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))
                    )}
                  </div>
                </details>
              ) : (
                <Link
                  key={i}
                  href={link.href}
                  className="block font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-gray-200">
              {renderAuthButtons()}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
