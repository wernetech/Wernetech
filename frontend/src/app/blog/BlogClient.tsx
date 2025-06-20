"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogClient() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const getLikesKey = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return `likedPosts:${user?.email || "anon"}`;
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/post?limit=${postsPerPage}`);
      const data = await res.json();

      const likesKey = getLikesKey();
      const likedPosts = JSON.parse(localStorage.getItem(likesKey) || "[]");

      const postsWithLikes = data.map((post: any) => ({
        ...post,
        liked: likedPosts.includes(post.slug),
      }));

      setPosts(postsWithLikes);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (slug: string) => {
    const likesKey = getLikesKey();
    const likedPosts = JSON.parse(localStorage.getItem(likesKey) || "[]");
    if (likedPosts.includes(slug)) return;

    try {
      const res = await fetch(`/api/post/like/${slug}`, { method: "PUT" });
      if (!res.ok) throw new Error("Falha ao registrar like");

      const data = await res.json();

      localStorage.setItem(likesKey, JSON.stringify([...likedPosts, slug]));

      setPosts((prev) =>
        prev.map((post) =>
          post.slug === slug
            ? { ...post, likes: data.likes, liked: true }
            : post
        )
      );
    } catch (err) {
      console.error("Erro ao curtir post:", err);
      fetchPosts(); // fallback
    }
  };

  const openComments = async (post: any) => {
    setSelectedPost(post);
    const res = await fetch(`/api/post/${post.slug}/comments`);
    const data = await res.json();
    setComments(data);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const author = user?.name || "Usuário Anônimo";

    const res = await fetch(`/api/post/${selectedPost.slug}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content: commentText }),
    });

    if (res.ok) {
      setCommentText("");
      setSelectedPost(null);
      fetchPosts();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-10 text-center tracking-tight">
          Blog
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Carregando posts...</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {posts.map((post: any) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-48 object-cover cursor-pointer"
                  />
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div className="space-y-3">
                      <span className="text-xs uppercase text-blue-600 font-semibold tracking-wide">
                        {post.category || "Artigo"}
                      </span>
                      <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {post.summary}
                      </p>
                      <div className="text-xs text-gray-400">
                        ⏱ {post.reading_time} min •{" "}
                        {dayjs(post.created_at).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                      <button
                        onClick={() => handleLike(post.slug)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm transition cursor-pointer"
                      >
                        {post.liked ? <FaHeart /> : <FaRegHeart />} {post.likes}
                      </button>

                      <button
                        onClick={() => openComments(post)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm transition cursor-pointer"
                      >
                        <FaRegComment /> Comentários
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-4 text-2xl text-red-500 font-bold hover:text-red-700"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Comentários em "{selectedPost.title}"
              </h2>

              <textarea
                placeholder="Digite seu comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows={3}
              />

              <button
                onClick={handleCommentSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all"
              >
                Enviar Comentário
              </button>

              <div className="mt-6 space-y-4">
                {comments.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Nenhum comentário ainda. Seja o primeiro a comentar!
                  </p>
                ) : (
                  comments.map((comment: any) => (
                    <div
                      key={comment.id}
                      className="border-b border-gray-200 pb-3"
                    >
                      <p className="font-semibold text-gray-800">
                        {comment.author}
                      </p>
                      <p className="text-gray-600 text-sm">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
