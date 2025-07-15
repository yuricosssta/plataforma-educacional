"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPostById } from '@/lib/redux/slices/postsSlice';

export default function PostDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.id as string; // Pega o ID da URL

  // Seleciona os dados relevantes do estado do Redux
  const { currentPost, status, error } = useSelector((state: RootState) => state.posts);

  // Efeito para buscar os dados do post quando o componente é montado ou o ID muda
  useEffect(() => {
    if (id) {
      // Dispara a ação para buscar o post pelo ID
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch]);

  // Renderiza um estado de carregamento enquanto a requisição está em andamento
  if (status === 'loading' || !currentPost) {
    return <div className="text-center mt-10">Carregando publicação...</div>;
  }

  // Renderiza uma mensagem de erro se a requisição falhar
  if (status === 'failed') {
    return <div className="text-center mt-10 text-red-500">Erro ao carregar a publicação: {error}</div>;
  }
  
  // Garante que o post carregado corresponde ao ID da URL para evitar mostrar dados antigos
  if (currentPost.id !== id) {
     return <div className="text-center mt-10">Carregando publicação...</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      {/* Botão para voltar e para editar */}
      <div className="mb-8 flex justify-between items-center">
        <Link href="/posts" className="text-blue-600 hover:underline">
          &larr; Voltar para todas as publicações
        </Link>
        <Link href={`/posts/${currentPost.id}/edit`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Editar
        </Link>
      </div>

      {/* Detalhes da Publicação */}
      <article className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{currentPost.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{currentPost.description}</p>
        
        {/* Informações meta (data, autor, etc.) */}
        <div className="text-sm text-gray-500 mb-6 border-b pb-4">
          {currentPost.author && <span>Por: {currentPost.author}</span>}
          {currentPost.created_at && 
            <span className="ml-4">
              Publicado em: {new Date(currentPost.created_at).toLocaleDateString('pt-BR')}
            </span>
          }
        </div>

        {/* Conteúdo principal do post, renderizado como HTML se necessário */}
        {/* CUIDADO: Se o conteúdo tiver HTML, use 'dangerouslySetInnerHTML' com cautela.
            Para conteúdo em Markdown, use uma biblioteca como 'react-markdown'.
            Para texto simples, apenas renderize como abaixo. */}
        <div className="prose lg:prose-xl max-w-none">
          <p>{currentPost.content}</p>
        </div>
      </article>
    </div>
  );
}