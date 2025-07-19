"use client";

import { IPost } from "../types/IPost";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export const BlogPostContent = ({ post }: { post: IPost | null }) => {
  if (!post) return <p>Página não encontrada</p>;
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8 mb-10 lg:mt-20 break-words">
        <Link href="/posts" className="btn btn-secondary">
          &larr; Voltar
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-4">
          {post.title}
        </h1>

        <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg mt-4" />

        {/* <PostContent content={post.content || ""} /> */}
        <article className="prose lg:prose-xl dark:prose-invert max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>
            {post.content || ""}
          </Markdown>
        </article>

        <div className="text-sm opacity-40 mt-4">
          {post.author && <span>Por: {post.author}</span>}
          {post.created_at &&
            <span className="ml-4">
              Atualizado em: {Intl.DateTimeFormat("pt-br").format(
                new Date(post.modified_at || post.created_at || new Date())
              )}
            </span>
          }
        </div>
        <Link href={`/posts/${post._id}/edit`} className="btn btn-secondary">
          Editar
        </Link>
      </div>

    </div>
  );
};
