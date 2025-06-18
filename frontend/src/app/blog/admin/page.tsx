"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  created_at: string;
}

export default function ManagePosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
        } else {
          setAuthChecked(true);
        }
      } catch (err) {
        router.push("/login");
      }
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;

    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch("/api/post", { credentials: "include" });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [authChecked]);

  const handleDelete = async (slug: string) => {
    const confirm = window.confirm("Tem certeza que deseja excluir este post?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/post/${slug}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        console.error("Erro ao excluir post:", await res.text());
      }
    } catch (err) {
      console.error("Erro na exclusão:", err);
    }
  };

  if (!authChecked) return null;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12 text-black">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Gerenciar Posts</h1>
          <button
            onClick={() => router.push("/blog/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Criar Novo Post
          </button>
        </div>

        {loading ? (
          <p>Carregando posts...</p>
        ) : (
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-sm text-gray-700">
                <th className="p-3">TÍTULO</th>
                <th className="p-3">CATEGORIA</th>
                <th className="p-3">DATA</th>
                <th className="p-3 text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-gray-300">
                  <td className="p-3 font-medium">{post.title}</td>
                  <td className="p-3 text-sm text-gray-600">{post.category}</td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right space-x-4">
                    <button
                      onClick={() => router.push(`/blog/edit/${post.slug}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
