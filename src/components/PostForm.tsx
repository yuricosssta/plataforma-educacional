"use client";

import { useState, FormEvent, useEffect } from 'react';
import { IPost } from '@/types/IPost';

interface PostFormProps {
  onSubmit: (post: Omit<IPost, 'id'> | IPost) => void;
  initialData?: IPost | null;
  isLoading: boolean;
}

export default function PostForm({ onSubmit, initialData, isLoading }: PostFormProps) {
  const [post, setPost] = useState({
    title: '',
    description: '',
    content: '',
  });

  useEffect(() => {
    if (initialData) {
      setPost({
        title: initialData.title,
        description: initialData.description,
        content: initialData.content,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, ...post } : post);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          name="title"
          id="title"
          value={post.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição Curta</label>
        <input
          type="text"
          name="description"
          id="description"
          value={post.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Conteúdo</label>
        <textarea
          name="content"
          id="content"
          rows={10}
          value={post.content}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {isLoading ? 'Salvando...' : 'Salvar Publicação'}
        </button>
      </div>
    </form>
  );
}