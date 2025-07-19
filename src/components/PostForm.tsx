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
    image: '',
    description: '',
    content: '',
    published: true,
  });

  useEffect(() => {
    if (initialData) {
      setPost({
        title: initialData.title,
        image: initialData.image || '',
        description: initialData.description || '',
        content: initialData.content,
        published: initialData.published !== undefined ? initialData.published : true,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Se for um checkbox, usamos a propriedade 'checked', senão, 'value'
    if (type === 'checkbox') {
      // É preciso garantir ao TypeScript que este input tem a propriedade 'checked'
      const { checked } = e.target as HTMLInputElement;
      setPost(prev => ({ ...prev, [name]: checked }));
    } else {
      setPost(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, ...post } : post);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white-700">Título</label>
        <input
          type="text"
          name="title"
          id="title"
          value={post.title}
          onChange={handleChange}
          className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-white-700">URL da Imagem</label>
        <input
          type="url"
          name="image"
          id="image"
          value={post.image}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.png"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
        />
      </div>

      {/* <div>
        <label htmlFor="description" className="block text-sm font-medium text-white-700">Descrição Curta</label>
        <input
          type="text"
          name="description"
          id="description"
          value={post.description}
          onChange={handleChange}
          className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          required
        />
      </div> */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-white-700">Conteúdo</label>
        <textarea
          name="content"
          id="content"
          rows={10}
          value={post.content}
          onChange={handleChange}
          className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={post.published}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-white-300 rounded focus:ring-white-500"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-white-900">
          Publicado
        </label>
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