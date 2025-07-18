"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPosts, deletePost } from '@/lib/redux/slices/postsSlice';
import Link from 'next/link';
import { PostList } from '@/components/PostList';
import { Header } from '@/components/Header';

export default function PostsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      dispatch(deletePost(id));
    }
  };

  if (status === 'loading') return <p>Carregando posts...</p>;
  if (status === 'failed') return <p>Erro ao carregar posts: {error}</p>;

  return (
    
    <div className="container mx-auto px-5 mb-10">
    <PostList posts={posts} />
      {/* <h1 className="text-3xl font-bold mb-6">Gerenciar Publicações</h1> */}
      {/* <div className="space-y-4">
        
        {posts.map((post) => (
          <div key={post._id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/posts/${post._id}/edit`} className="text-blue-600 hover:underline">
                Editar
              </Link>
              <button onClick={() => handleDelete(post._id!)} className="text-red-600 hover:underline">
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}