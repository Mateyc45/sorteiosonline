'use client';

import Link from 'next/link';
import { BookOpen, Calendar, Home, Tag, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BlogPost, blogPosts } from '@/lib/blogData'; // Importa do arquivo central
import { useState, useEffect } from 'react';

// Componente de Sugestões (Interno)
function BlogSugerido({ currentPost }: { currentPost: BlogPost }) {
  const [sugestoes, setSugestoes] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Lógica para encontrar posts parecidos baseados nas tags
    const similares = blogPosts
      .filter(p => p.id !== currentPost.id)
      .map(p => ({
        post: p,
        pontos: p.tags.filter(tag => currentPost.tags.includes(tag)).length
      }))
      .filter(item => item.pontos > 0)
      .sort((a, b) => b.pontos - a.pontos)
      .slice(0, 3)
      .map(item => item.post);
    
    setSugestoes(similares);
  }, [currentPost]);

  if (sugestoes.length === 0) return null;

  return (
    <div className="grid gap-6 mt-8">
      {sugestoes.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all flex gap-4">
            <img src={post.imageUrl} alt={post.title} className="w-24 h-24 object-cover rounded-lg shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Componente Principal
export function BlogPostClient({ post }: { post: BlogPost }) {
  const [shareUrl, setShareUrl] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4">
        <Link href="/blog" className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
          <Home className="h-4 w-4" /> Voltar para o Blog
        </Link>
      </div>

      <article className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
              <BookOpen className="h-3 w-3" /> {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(post.publishedAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
            {post.excerpt}
          </p>

          <img src={post.imageUrl} alt={post.title} className="rounded-xl w-full h-[300px] md:h-[450px] object-cover mb-8 shadow-lg" />

          {/* Área de Compartilhamento e Autor */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-b border-gray-100 py-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-3">
                <BookOpen className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{post.author.name}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{post.author.role}</p>
              </div>
            </div>
            
            {/* Ícones de Share */}
            <div className="flex items-center gap-2">
               {/* ... (Seus ícones de compartilhamento aqui, usando shareUrl) ... */}
            </div>
          </div>
        </header>

        {/* CONTEÚDO DO POST (HTML) */}
        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: post.content || '' }} 
        />

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-8">
            <Tag className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ChevronRight className="text-blue-500" /> Leia também
            </h3>
            <BlogSugerido currentPost={post} />
          </div>
        </footer>
      </article>
    </div>
  );
}