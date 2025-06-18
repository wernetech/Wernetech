"use client";

import { useEffect, useState } from "react";

export default function BlogClient() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/post?page=${currentPage}&limit=${postsPerPage}`
      );
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = async (slug: string) => {
    try {
      const res = await fetch(`/api/post/${slug}`);
      if (!res.ok) throw new Error("Erro ao buscar post");
      const data = await res.json();
      setSelectedPost(data);
    } catch (err) {
      console.error("Erro ao buscar post:", err);
    }
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Blog
        </h1>

        {selectedPost ? (
          <div className="bg-white rounded-xl p-6 shadow-md max-w-4xl mx-auto">
            <button
              onClick={handleBack}
              className="text-blue-600 underline mb-4 block"
            >
              ← Voltar
            </button>

            <img
              src={selectedPost.thumbnail}
              alt={selectedPost.title}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />

            <div className="flex gap-4 text-sm mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                ⏱ {selectedPost.reading_time} min de leitura
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
                {selectedPost.category}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              {selectedPost.title}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Por <strong>{selectedPost.author}</strong> |{" "}
              {new Date(selectedPost.created_at).toLocaleDateString("pt-BR")}
            </p>

            <article
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedPost.html_content }}
            />
          </div>
        ) : loading ? (
          <p className="text-center text-gray-500">Carregando posts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick(post.slug)}
                className="cursor-pointer group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 hover:border-blue-500"
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
              </div>
            ))}
          </div>
        )}

        {/* Paginação */}
        {!selectedPost && (
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
        )}
      </section>
    </main>
  );
}
