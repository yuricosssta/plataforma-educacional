"use client";
import { IPost } from "../types/IPost";
import sanitize, { defaults } from "sanitize-html";
// import NotFound, {} from "../../app/not-found"
import Link from "next/link";

export const PostContent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitize(content, {
    allowedTags: [
      "b", "br", "i", "em", "strong", "a", "img", "h1", "h2", "h3",
      "code", "pre", "p", "li", "ul", "ol", "blockquote",
      "td", "th", "table", "tr", "tbody", "thead", "tfoot",
      "small", "div", "iframe"
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      "*": ["style"],
      iframe: ["src", "allowfullscreen", "style"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
  });

  return (
    <article className="blog-content mx-auto" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></article>
  );
};

export const BlogPostContent = ({ post }: { post: IPost | null }) => {
  if (!post) return <p>Página não encontrada</p>;

  return (
    <div>

      <div className="prose lg:prose-xl dark:prose-invert mx-auto lg:prose-h1:text-4xl mb-10 lg:mt-20 break-words">
        <Link href="/posts" className="btn btn-secondary">
          &larr; Voltar
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight">{post.title}</h1>
        <PostContent content={post.content || ""} />

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