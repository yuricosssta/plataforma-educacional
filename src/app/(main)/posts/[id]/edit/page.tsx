"use client";

import PostForm from '@/components/PostForm';
import { fetchPostById, updatePost } from '@/lib/redux/slices/postsSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { IPost } from '@/types/IPost';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EditPostPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { currentPost, status } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch]);

  const handleSubmit = (postData: IPost) => {
    dispatch(updatePost(postData)).then(() => {
      router.push('/posts');
    });
  };

  if (!currentPost || currentPost.id !== id) {
    return <p>Carregando dados do post...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Editar Publicação</h1>
      <PostForm 
        onSubmit={handleSubmit} 
        initialData={currentPost}
        isLoading={status === 'loading'} 
      />
    </div>
  );
}