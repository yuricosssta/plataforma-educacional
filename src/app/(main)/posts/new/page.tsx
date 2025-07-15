"use client";

import PostForm from '@/components/PostForm';
import { createNewPost } from '@/lib/redux/slices/postsSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { IPost } from '@/types/IPost';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function NewPostPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status } = useSelector((state: RootState) => state.posts);

  const handleSubmit = (postData: Omit<IPost, 'id'>) => {
    dispatch(createNewPost(postData)).then(() => {
      router.push('/posts');
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Criar Nova Publicação</h1>
      <PostForm onSubmit={handleSubmit} isLoading={status === 'loading'} />
    </div>
  );
}