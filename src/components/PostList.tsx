// import Image from "next/image";
// import Link from "next/link";
// import { formatFullDate } from "./../lib/date";
// import { IPost } from "../types/IPost";
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/lib/redux/store';
// import { fetchPosts, deletePost } from '@/lib/redux/slices/postsSlice';

// export const PostList = () => {  
// const dispatch = useDispatch<AppDispatch>();
//   const { posts, status, error } = useSelector((state: RootState) => state.posts);


//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchPosts());
//     }
//   }, [status, dispatch]);

//   const handleDelete = (id: string) => {
//     if (confirm('Tem certeza que deseja deletar este post?')) {
//       dispatch(deletePost(id));
//     }
//   };

//   if (status === 'loading') return <p>Carregando posts...</p>;
//   if (status === 'failed') return <p>Erro ao carregar posts: {error}</p>;


//   console.log("Posts recebidos:", posts.map(p => ({ id: p._id, title: p.title })));
//   return (
//     <div className="grid grid-cols-1 gap-16 md:grid-cols-2 px-4">
      
//       {posts.map((post) => (
//         <div className="break-words" key={post._id}>
//           {/* Link principal */}
//           <Link href={`/posts/${post._id}`}>
//             {/* <div className="aspect-[16/9] relative cursor-pointer">
              
//               {post.image ? (
//                 <Image 
//                   alt={post.title}
//                   className="object-cover"
//                   src={post.image}
//                   fill
//                 />
//               ) : (
//                 <Image src="https://placehold.co/600x400" alt="placeholder" fill />
//               )}            
              
//             </div> */}
//           </Link>

//           {/* Conteúdo do post */}
//           <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
//             <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
//               <Link href={`/posts/${post._id}`}>{post.title}</Link>
//             </h2>
//             <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
//               {post.content}
//             </div>
//             <Link href={`/posts/${post._id}/edit`} className="btn btn-sm btn-secondary">
//                   Editar
//                 </Link>
//             <div className="flex items-center gap-2">
//               <div className="font-medium">
//                 {/* {post.author} | Publicado em {formatFullDate(post.modified_at)} */}
//                 {post.author} | Publicado em 
//               </div>
              
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

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

  // ✅ MELHORIA 1: Lógica de exclusão aprimorada
  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      dispatch(deletePost(id)).then(() => {
        // Se este era o último post da página e não era a primeira página...
        if (posts.length === 1 && currentPage > 1) {
          // ...vá para a página anterior.
          handlePageChange(currentPage - 1);
        } else {
          // Senão, apenas recarregue a página atual.
          dispatch(fetchPosts({ page: currentPage }));
        }
      });
    }
  };

  // ✅ MELHORIA 2: Lógica de carregamento aprimorada
  // Mostra o "Carregando..." apenas na carga inicial, quando não há posts
  if (status === 'loading' && posts.length === 0) {
    return <p className="text-center">Carregando posts...</p>;
  }
  
  if (status === 'failed') {
    return <p className="text-center text-red-500">Erro ao carregar posts: {error}</p>;
  }

  return (
    <div>
      {/* ✅ MELHORIA 2.1: Feedback visual ao carregar novas páginas */}
      <div 
        className={`grid grid-cols-1 gap-16 md:grid-cols-2 px-4 transition-opacity duration-300 ${status === 'loading' ? 'opacity-50' : 'opacity-100'}`}
      >
        {posts.map((post) => (
          <div className="break-words" key={post._id}>
            <Link href={`/posts/${post._id}`}>
              <div className="aspect-[16/9] relative cursor-pointer bg-gray-200 rounded-md overflow-hidden">
                <Image 
                  alt={post.title}
                  className="object-cover"
                  src={post.image || "https://placehold.co/600x400"} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Link>
            <div className="grid grid-cols-1 gap-3 mt-4">
              <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
                <Link href={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
                {post.description}
              </div>
              <Link href={`/posts/${post._id}/edit`} className="text-blue-600 hover:underline w-fit">
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
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || status === 'loading'}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};