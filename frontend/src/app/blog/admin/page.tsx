"use client";

import { useState } from "react";

export default function AdminPostForm() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    author: "",
    category: "",
    reading_time: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          reading_time: Number(form.reading_time),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({
          title: "",
          slug: "",
          summary: "",
          content: "",
          author: "",
          category: "",
          reading_time: "",
          thumbnail: "",
        });
      } else {
        console.error("Erro ao criar post:", await res.text());
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12 text-black">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          📝 Criar Novo Post
        </h1>

        {success && (
          <p className="text-green-600 mb-4">Post criado com sucesso!</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            "title",
            "slug",
            "author",
            "category",
            "reading_time",
            "thumbnail",
          ].map((field) => (
            <input
              key={field}
              type={field === "reading_time" ? "number" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 text-black"
              required
            />
          ))}

          <textarea
            name="summary"
            placeholder="Resumo"
            value={form.summary}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 h-20 text-black"
            required
          />

          <textarea
            name="content"
            placeholder="Conteúdo"
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 h-40 text-black"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            {loading ? "Salvando..." : "Criar Post"}
          </button>
        </form>
      </div>
    </main>
  );
}
