"use client";

import Image from "next/image";
import Link from "next/link";
import { IPost } from "../types/IPost";
import { useEffect } from 'react'; // ✅ MELHORIA 3: useState removido
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPosts, deletePost } from '@/lib/redux/slices/postsSlice';

export const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error, currentPage, totalPages } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1 }));
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchPosts({ page: newPage }));
  };

  const handleDelete = (_id: string) => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      dispatch(deletePost(_id)).then(() => {
        if (posts.length === 1 && currentPage > 1) {
          handlePageChange(currentPage - 1);
        } else {
          dispatch(fetchPosts({ page: currentPage }));
        }
      });
    }
  };

  if (status === 'loading' && posts.length === 0) {
    return <p className="text-center"> Carregando posts...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center text-red-500"> Erro ao carregar posts: {error}</p>;
  }

  return (
    <div>
      <div
        className={`grid grid-cols-1 gap-16 md:grid-cols-2 px-4 transition-opacity duration-300 ${status === 'loading' ? 'opacity-50' : 'opacity-100'}`}
      >
        {posts.map((post) => (
          <div className="break-words" key={post._id}>
            <Link href={`/posts/${post._id}`}>
              <div className="aspect-[16/9] relative cursor-pointer bg-gray-200">
                <Image
                  alt={post.title}
                  className="object-cover"
                  src={post.image || "https://placehold.co/600x400"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Link>
            <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
              <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
                <Link href={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
                {post.content}
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium">
                  {/* {post.author} | Publicado em {formatFullDate(post.modified_at)} */}
                  {post.author} | Publicado em
                </div>
              </div>
              <Link href={`/posts/${post._id}/edit`} className="btn btn-sm btn-secondary hover:underline w-fit">
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de Paginação */}
      <div className="flex justify-center items-center gap-4 mt-16">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || status === 'loading'}
          className="px-4 py-2 bg-black-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || status === 'loading'}
          className="px-4 py-2 bg-black-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};