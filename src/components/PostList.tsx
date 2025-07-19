import Image from "next/image";
import Link from "next/link";
import { formatFullDate } from "./../lib/date";
import { IPost } from "../types/IPost";



interface PostsPreviewProps {
  posts: IPost[];
}



export const PostList = ({ posts }: { posts: PostsPreviewProps["posts"] }) => {
  console.log("Posts recebidos:", posts.map(p => ({ id: p._id, title: p.title })));
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 px-4">
      
      {posts.map((post) => (
        <div className="break-words" key={post._id}>
          {/* Link principal */}
          <Link href={`/posts/${post._id}`}>
            <div className="aspect-[16/9] relative cursor-pointer">
              
              {/* {post.image ? (
                <Image 
                  alt={post.title}
                  className="object-cover"
                  src={post.image}
                  fill
                />
              ) : (
                <Image src="https://placehold.co/600x400" alt="placeholder" fill />
              )} */}
              
            </div>
          </Link>

          {/* Conteúdo do post */}
          <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
            <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
              <Link href={`/posts/${post._id}`}>{post.title}</Link>
            </h2>
            <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
              {post.description}
            </div>
            <Link href={`/posts/${post._id}/edit`} className="btn btn-sm btn-secondary">
                  Editar
                </Link>
            <div className="flex items-center gap-2">
              <div className="font-medium">
                {/* {post.author} | Publicado em {formatFullDate(post.modified_at)} */}
                {post.author} | Publicado em 
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};