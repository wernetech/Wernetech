export const metadata = {
  title: "Login | Acesso ao Portal",
  description:
    "Entre em sua conta para acessar serviços, suporte e soluções personalizadas.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-blue-700 text-center">
          Acesse sua conta
        </h1>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Utilize seu e-mail corporativo para continuar
        </p>

        <form className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="voce@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition"
          >
            Entrar
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Esqueceu sua senha?{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline hover:text-blue-700"
            >
              Redefinir
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
