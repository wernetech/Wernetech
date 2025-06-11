"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogIn, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  // { href: "/", label: "Início" },
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
        title: "Nuvem e Infraestrutura",
        items: [
          { href: "/solucoes/googleCloud", label: "Google Cloud" },
          { href: "/solucoes/solarWigs", label: "SolarWinds" },
        ],
      },
      {
        title: "Soluções de Armazenamento",
        items: [
          { href: "/solucoes/infra-hpe", label: "Infraestrutura HPE" },
          { href: "/solucoes/indilinx", label: "Controladoras Indilinx" },
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
        title: "",
        items: [{ href: "/solucoes", label: "Ver todos" }],
      },
    ],
  },
  { href: "/consultoria", label: "Consultoria" },
  { href: "/blog", label: "Blog" },
  { href: "/clientes", label: "Nossos Clientes" },
  { href: "/", label: "Educação" },
  { href: "/", label: "Loja" },
  { href: "/", label: "Suporte" },
  { href: "/", label: "Contato" },
];

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, checkAuth, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    await checkAuth();
    router.push("/");
  };

  const pathname = usePathname();

  const renderAuthButtons = () => {
    if (isAuthenticated === null) return null;

    return isAuthenticated ? (
      <>
        {pathname === "/blog/admin" ? (
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
        )}

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
        <LogIn size={16} />
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
            width={150}
            height={40}
            className="h-24 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 relative">
          {navLinks.map((link, i) =>
            link.groupedDropdown ? (
              <div
                key={link.label || `grouped-${i}`} // adiciona key única aqui
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-blue-800 transition-colors group">
                  <span>{link.label}</span>
                  <ChevronDown
                    size={16}
                    className="group-hover:text-blue-800 transition"
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-md py-4 px-4 w-[420px] z-50"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {link.groupedDropdown.map((group, gi) => (
                          <div key={group.title || `group-${gi}`}>
                            {group.title && (
                              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">
                                {group.title}
                              </p>
                            )}
                            <ul className="space-y-1">
                              {group.items.map((item, ii) => (
                                <li key={item.href || `item-${ii}`}>
                                  <Link
                                    href={item.href}
                                    className="text-sm text-gray-700 hover:text-blue-800 transition"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-blue-800 transition-colors duration-150 relative group"
              >
                <span>{link.label}</span>
                <span className="block h-[2px] w-0 group-hover:w-full transition-all bg-blue-500 absolute -bottom-1 left-0"></span>
              </Link>
            )
          )}

          {renderAuthButtons()}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700"
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden px-4 pb-4 flex flex-col gap-3 bg-white border-t border-gray-100 shadow"
          >
            {isAuthenticated ? (
              <>
                <Link
                  href="/blog/admin"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Admin
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="mt-2 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-md hover:bg-blue-950 transition"
              >
                <LogIn size={16} />
                Entrar
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
