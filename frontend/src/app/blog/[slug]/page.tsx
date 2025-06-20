"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";

export default function PostPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const getLikesKey = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return `likedPosts:${user?.email || "anon"}`;
  };

  const fetchPost = async () => {
    const res = await fetch(`/api/post/${slug}`);
    if (!res.ok) return notFound();
    const data = await res.json();

    const likedPosts = JSON.parse(localStorage.getItem(getLikesKey()) || "[]");
    const isLiked = likedPosts.includes(slug);

    setPost({ ...data, liked: isLiked });
  };

  const fetchComments = async () => {
    const res = await fetch(`/api/post/${slug}/comments`);
    if (!res.ok) return;
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (isCommentModalOpen) {
      fetchComments();
      textareaRef.current?.focus();
      document.body.style.overflow = "hidden";

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsCommentModalOpen(false);
      };

      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "auto";
      };
    }
  }, [isCommentModalOpen]);

  const handleLike = async () => {
    const likesKey = getLikesKey();
    const likedPosts = JSON.parse(localStorage.getItem(likesKey) || "[]");

    if (likedPosts.includes(slug)) return;

    try {
      const res = await fetch(`/api/post/like/${slug}`, { method: "PUT" });
      if (!res.ok) throw new Error("Erro ao curtir");

      const data = await res.json();

      localStorage.setItem(likesKey, JSON.stringify([...likedPosts, slug]));

      setPost((prev: any) =>
        prev
          ? {
              ...prev,
              likes: data.likes,
              liked: true,
            }
          : prev
      );
    } catch (err) {
      console.error("Erro ao curtir:", err);
      fetchPost(); // fallback visual
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const author = user?.name || "Usuário Anônimo";

    try {
      const res = await fetch(`/api/post/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText, author }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [...prev, newComment]);
        setCommentText("");
        setIsCommentModalOpen(false);
        fetchPost(); // atualiza post com novos likes
      }
    } catch (err) {
      console.error("Erro ao comentar:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) return <p className="text-center py-10">Carregando...</p>;

  return (
    <main className="bg-white min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
          ⏱ {post.reading_time} min de leitura
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
          {post.category}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3">
        {post.title}
      </h1>

      <p className="text-gray-500 text-sm mb-10">
        Por <strong>{post.author}</strong> |{" "}
        {new Date(post.created_at).toLocaleDateString("pt-BR")}
      </p>

      <div className="flex items-center gap-6 mb-10">
        <button
          onClick={handleLike}
          className="flex items-center text-red-600 hover:text-red-800 cursor-pointer"
        >
          {post.liked ? (
            <FaHeart className="text-xl mr-1" />
          ) : (
            <FaRegHeart className="text-xl mr-1" />
          )}
          {post.likes}
        </button>

        <button
          onClick={() => setIsCommentModalOpen(true)}
          className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <FaRegComment className="text-xl mr-1" />
          Comentários
        </button>
      </div>

      {isCommentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 transition-opacity">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto animate-fadeIn">
            <button
              onClick={() => setIsCommentModalOpen(false)}
              className="absolute top-3 right-4 text-xl text-red-500 font-bold hover:text-red-700"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Comentários</h2>

            <textarea
              ref={textareaRef}
              placeholder="Compartilhe sua opinião ou feedback..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            />

            <button
              onClick={handleCommentSubmit}
              disabled={isSubmitting}
              className={`w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Enviando..." : "Enviar Comentário"}
            </button>

            <div className="mt-8 space-y-6">
              {comments.length === 0 ? (
                <p className="text-center text-gray-500">
                  Ainda não há comentários. Seja o primeiro! 💬
                </p>
              ) : (
                comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="border-b pb-4 border-gray-200"
                  >
                    <p className="font-semibold text-gray-800">
                      {comment.author}
                    </p>
                    <p className="text-gray-600 mt-1">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
