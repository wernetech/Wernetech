"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    reading_time: "",
    thumbnail: "",
    summary: "",
    author: "",
  });

  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) router.push("/login");
      else setAuthChecked(true);
    }
    checkAuth();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          reading_time: Number(form.reading_time)
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({
          title: "",
          slug: "",
          category: "",
          reading_time: "",
          thumbnail: "",
          summary: "",
          author: "",
        });
        setHtmlContent("");
      } else {
        console.error("Erro ao criar post:", await res.text());
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) return null;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-black">
          Criar Nova Postagem
        </h1>

        {success && (
          <p className="text-green-600 mb-4">Post criado com sucesso!</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="title"
              placeholder="Título"
              value={form.title}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
            <input
              name="category"
              placeholder="Categoria"
              value={form.category}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
            <input
              name="reading_time"
              placeholder="Tempo de leitura (min)"
              type="number"
              value={form.reading_time}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="thumbnail"
              placeholder="URL da imagem de capa"
              value={form.thumbnail}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
            <input
              name="slug"
              placeholder="Slug (ex: titulo-do-post)"
              value={form.slug}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
            <input
              name="author"
              placeholder="Author"
              value={form.author}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <textarea
            name="summary"
            placeholder="Resumo do post"
            value={form.summary}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 h-20"
            required
          />

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
