"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogIn, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  {
    label: "Soluções",
    dropdown: [
      { href: "/solucoes/software", label: "Softwares" },
      { href: "/solucoes/licenciamento", label: "Licenciamento" },
      { href: "/solucoes/suporte", label: "Suporte" },
    ],
  },
  { href: "/consultoria", label: "Consultoria" },
  { href: "/blog", label: "Blog" },
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

const pathname = usePathname(); // 👈 obter rota atual

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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-blue-800 hover:opacity-90 transition"
        >
          Werne<span className="text-neutral-900">Tech</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 relative">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
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
                      className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-md py-2 w-52 z-50"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-blue-800 transition"
                        >
                          {item.label}
                        </Link>
                      ))}
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
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {link.label}
                  </span>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-gray-600 pl-4 py-1 hover:text-blue-800 text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 font-medium hover:text-blue-800 transition"
                >
                  {link.label}
                </Link>
              )
            )}

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
