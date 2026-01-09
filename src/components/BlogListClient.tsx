'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, ChevronRight, Tag, Home, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { blogPosts } from '@/lib/blogData';

export function BlogListClient() {
  const [selecionarTag, setSelecionarTag] = useState('');
  const [sugestoes, setSugestoes] = useState<string[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const postsPorPagina = 5;

  const todasAsTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setSelecionarTag(valor);
    if (valor) {
      setSugestoes(todasAsTags.filter((tag) => tag.toLowerCase().includes(valor.toLowerCase())));
    } else {
      setSugestoes([]);
    }
  };

  const selecionarSugestao = (tag: string) => {
    setSelecionarTag(tag);
    setSugestoes([]);
    setPaginaAtual(1);
  };

  const postsFiltrados = selecionarTag
    ? blogPosts.filter((post) => post.tags.some(t => t.toLowerCase().includes(selecionarTag.toLowerCase())))
    : blogPosts;

  const totalPaginas = Math.ceil(postsFiltrados.length / postsPorPagina);
  const postsAtuais = postsFiltrados.slice((paginaAtual - 1) * postsPorPagina, paginaAtual * postsPorPagina);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
          <Home className="h-4 w-4" /> Voltar para Início
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Sorteios Online</h1>
        <p className="text-lg text-gray-600">Dicas, tutoriais e novidades sobre sorteios online e organização de eventos.</p>
      </div>

      <div className="mb-8 relative">
        <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Tag:</label>
        <input
          id="tag-filter"
          type="text"
          value={selecionarTag}
          onChange={handleInputChange}
          className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite uma tag (ex: Marketing, Segurança)..."
        />
        {sugestoes.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {sugestoes.map((tag) => (
              <li key={tag} onClick={() => selecionarSugestao(tag)} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-8">
        {postsAtuais.map((post) => (
          <article key={post.id} className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/3">
                <img src={post.imageUrl} alt={post.title} className="rounded-lg object-cover w-full h-48" loading="lazy" />
              </div>
              <div className="sm:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {post.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {format(post.publishedAt, "d 'de' MMM, yyyy", { locale: ptBR })}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 text-sm">
                    Ler mais <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
            disabled={paginaAtual === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <span className="text-sm font-medium text-gray-600">Página {paginaAtual} de {totalPaginas}</span>
          <button
            onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
            disabled={paginaAtual === totalPaginas}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
          >
            Próxima <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}