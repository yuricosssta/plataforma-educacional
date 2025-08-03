"use client";

import { IPost } from "../types/IPost";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';

export const BlogPostContent = ({ post }: { post: IPost | null }) => {
  if (!post) return <p>Página não encontrada</p>;

    return (
    <div>
           <div className="max-w-4xl mx-auto px-4 py-8 break-words">
      {/* <div className="max-w-4xl mx-auto px-4 py-8 mb-10 lg:mt-20 break-words"> */}
        <Link href="/posts" className="btn btn-secondary">
          &larr; Voltar
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-4">
          {post.title}
        </h1>

        <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg mt-4" />

        {/* <PostContent content={post.content || ""} /> */}
        <article className="prose lg:prose-xl dark:prose-invert max-w-none">           
          <Markdown remarkPlugins={[remarkGfm]}>{post.content || ""}</Markdown>
          
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

// "use client";

// import { IPost } from "../types/IPost";
// import Link from "next/link";
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { useEffect, useState } from 'react'; // Importar para a formatação de data segura

// export const BlogPostContent = ({ post }: { post: IPost | null }) => {
//   // Estado para garantir que a formatação de data só ocorra no cliente
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!post) {
//     return <p className="text-center mt-10">Página não encontrada</p>;
//   }

//   const displayDate = post.modified_at || post.created_at;

//   return (
//     // 1. O contêiner principal agora só cuida do layout (sem "prose")
//     <div className="max-w-4xl mx-auto px-4 py-8 break-words">
//       <div className="mb-6">
//         <Link href="/posts" className="text-blue-500 hover:underline">
//           &larr; Voltar para todos os posts
//         </Link>
//       </div>

//       {/* 2. Agora os estilos deste H1 funcionarão perfeitamente */}
//       <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-4">
//         {post.title}
//       </h1>
      
//       {/* Informações do Post */}
//       <div className="text-sm text-gray-500 mb-8">
//         {post.author && <span>Por: {post.author}</span>}
//         {displayDate && isClient && (
//           <span className="ml-4">
//             Atualizado em: {new Intl.DateTimeFormat("pt-br").format(new Date(displayDate))}
//           </span>
//         )}
//       </div>

//       {post.image && (
//         <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg mb-8" />
//       )}
      
//       {/* 3. A classe "prose" foi movida para este <article>, envolvendo apenas o Markdown */}
//       <article className="prose lg:prose-xl dark:prose-invert max-w-none">
//         <ReactMarkdown remarkPlugins={[remarkGfm]}>
//           {post.content || ""}
//         </ReactMarkdown>
//       </article>

//       {/* Botão de Edição */}
//       <div className="mt-10 pt-6 border-t">
//         <Link href={`/posts/${post._id}/edit`} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
//           Editar Post
//         </Link>
//       </div>
//     </div>
//   );
// };