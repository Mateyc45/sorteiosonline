import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpenIcon, TagIcon, CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AdSpace } from '../AdSpace';
import {HomeIcon} from 'lucide-react';
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
   {
    id: '4',
    slug: 'analisando-sorteios-sucesso',
    title: 'Analisando Sorteios de Sucesso: O Que Podemos Aprender?',
    excerpt: 'Descubra os fatores que tornam um sorteio online um verdadeiro sucesso. Aprenda com exemplos práticos e implemente estratégias eficazes para maximizar engajamento e participação.',
    category: 'Estratégia',
    tags: ['Sorteios Online', 'Engajamento', 'Marketing Digital', 'Boas Práticas'],
    publishedAt: new Date('2024-03-10'),
    imageUrl: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    slug: 'como-criar-sorteio-online',
    title: 'Como Criar um Sorteio Online Passo a Passo',
    excerpt: 'Aprenda o passo a passo para criar um sorteio online de forma segura, atrativa e com alta participação. Descubra as melhores plataformas, estratégias de divulgação e como garantir a transparência do sorteio.',
    category: 'Guias',
    tags: ['Sorteios Online', 'Passo a Passo', 'Dicas', 'Marketing Digital'],
    publishedAt: new Date('2024-02-22'),
    imageUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=800&q=80'
},
  {
    id: '2',
    slug: 'evitando-fraudes-sorteios-seguros',
    title: 'Evitando Fraudes: Dicas para Fazer Sorteios Justos e Seguros',
    excerpt: 'Descubra as melhores práticas para realizar sorteios online transparentes e confiáveis. Aprenda a prevenir fraudes, estabelecer regras claras e garantir a credibilidade do seu sorteio.',
    category: 'Segurança',
    tags: ['Segurança', 'Fraudes', 'Boas Práticas', 'Sorteios Online'],
    publishedAt: new Date('2024-02-21'),
    imageUrl: 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '1',
    slug: 'lgpd-sorteios-coleta-dados-segura',
    title: 'LGPD e Sorteios: Como Coletar Dados de Participantes com Segurança?',
    excerpt: 'Aprenda as melhores práticas para realizar sorteios online em conformidade com a Lei Geral de Proteção de Dados (LGPD). Descubra como coletar, armazenar e processar dados pessoais de forma segura e legal.',
    category: 'Segurança',
    tags: ['LGPD', 'Proteção de Dados', 'Sorteios Online', 'Compliance'],
    publishedAt: new Date('2024-02-20'),
    imageUrl: 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=800&q=80'
  },
];

export function BlogList() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>
      <Helmet>
        <title>Blog - Sorteios Online | Dicas, Tutoriais e Novidades sobre Sorteios</title>
        <meta
          name="description"
          content="Confira artigos, tutoriais e dicas sobre sorteios online, organização de amigo secreto, conformidade com LGPD e muito mais. Mantenha-se atualizado com as melhores práticas!"
        />
        <meta
          name="keywords"
          content="blog sorteios, dicas sorteios online, tutorial amigo secreto, LGPD sorteios, sorteios seguros"
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Blog Sorteios Online
        </h1>
        <p className="text-lg text-gray-600">
          Dicas, tutoriais e novidades sobre sorteios online e organização de eventos
        </p>
      </div>

      <AdSpace />

      <div className="grid gap-8 mt-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex gap-6">
              <div className="w-1/3">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <div className="w-2/3">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <BookOpenIcon className="h-4 w-4" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {format(post.publishedAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-gray-400" />
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Ler mais
                    <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <AdSpace />
    </div>
  );
}