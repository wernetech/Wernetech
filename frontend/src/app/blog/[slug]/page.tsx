import { notFound } from "next/navigation";
import { type SlugPageProps } from "../../../types/pages"; // caminho pode variar dependendo do seu tsconfig

async function getPost(slug: string) {
  const res = await fetch(`/api/post/${slug}`, {
    next: { revalidate: 60 }, // opcional: ISR
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function PostPage({ params }: SlugPageProps) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <main className="bg-white min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Capa do Post */}
      <div className="mb-8">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Tags */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
          ⏱ {post.reading_time} min de leitura
        </span>
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
          {post.category}
        </span>
      </div>

      {/* Título */}
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3">
        {post.title}
      </h1>

      {/* Autor e data */}
      <p className="text-gray-500 text-sm mb-10">
        Por <strong>{post.author}</strong> |{" "}
        {new Date(post.created_at).toLocaleDateString("pt-BR")}
      </p>

      {/* Conteúdo */}
      <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        {post.content}
      </article>
    </main>
  );
}
