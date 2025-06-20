// /pages/blog/edit/[slug].tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditBlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    reading_time: "",
    thumbnail: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    if (!slug) return;
    async function fetchPost() {
      try {
        const res = await fetch(`/api/post/${slug}`);
        const data = await res.json();
        setPost(data);
        setFormData({
          title: data.title,
          category: data.category,
          reading_time: data.reading_time,
          thumbnail: data.thumbnail,
          summary: data.summary,
          content: data.content,
        });
      } catch (error) {
        console.error("Erro ao carregar post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/post/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Post atualizado com sucesso!");
        router.push("/blog/manage");
      } else {
        console.error("Erro ao atualizar post:", await res.text());
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando post...</p>;

  if (!post) return <p>Post não encontrado.</p>;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Editar Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="reading_time"
            placeholder="Tempo de leitura (min)"
            type="number"
            value={formData.reading_time}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="thumbnail"
            placeholder="URL da imagem de capa"
            value={formData.thumbnail}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            name="summary"
            placeholder="Resumo do post"
            value={formData.summary}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 h-20"
            required
          />
          <textarea
            name="content"
            placeholder="Conteúdo do post"
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 h-32"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Atualizando..." : "Atualizar Post"}
          </button>
        </form>
      </div>
    </main>
  );
}
