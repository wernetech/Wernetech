"use client";

import { useEffect, useState } from "react";

export default function BlogClient() {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({ category: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    fetchPosts();
  }, [filters, currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/post?category=${filters.category}&author=${filters.author}&page=${currentPage}`
      );
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Blog WerneTech
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <select
            name="category"
            onChange={handleFilterChange}
            className="border rounded-md px-4 py-2 text-black"
            defaultValue=""
          >
            <option value="">Todas as Categorias</option>
            <option value="infra">Infraestrutura</option>
            <option value="seguranca">Segurança</option>
            <option value="gestao">Gestão</option>
          </select>

          <select
            name="author"
            onChange={handleFilterChange}
            className="border rounded-md px-4 py-2 text-black"
            defaultValue=""
          >
            <option value="">Todos os Autores</option>
            <option value="Joao">João</option>
            <option value="Maria">Maria</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Carregando posts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <a
                href={`/blog/${post.slug}`}
                key={idx}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 hover:border-blue-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <span className="text-xs uppercase text-blue-500 font-semibold tracking-wide">
                    {post.category || "Artigo"}
                  </span>
                  <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-gray-400">Por {post.author}</p>
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                      ⏱ {post.reading_time} min
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10 gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
            >
              Anterior
            </button>
          )}
          {posts.length === postsPerPage && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
            >
              Próxima
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
