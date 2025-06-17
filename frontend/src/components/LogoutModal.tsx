"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LogoutModal() {
  const { confirmLogout, setConfirmLogout, logout, checkAuth } = useAuth();
  const router = useRouter();

  if (!confirmLogout) return null;

  const handleLogout = async () => {
    setConfirmLogout(false);
    await logout();
    await checkAuth();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Deseja realmente sair da conta?
        </h2>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setConfirmLogout(false)}
            className="px-5 py-2 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
