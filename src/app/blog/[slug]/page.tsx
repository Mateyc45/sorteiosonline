import { Metadata, ResolvingMetadata } from 'next';
import { getPostBySlug } from '@/lib/blogData';
import { BlogPostClient } from '@/components/BlogPostClient';
import { notFound } from 'next/navigation';

// ATENÇÃO: No Next.js 15, params é uma Promise
type Props = {
  params: Promise<{ slug: string }>
}

// 1. Gera SEO Dinâmico
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await no params antes de usar
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: 'Post não encontrado | Vamo Sortear' };
  }

  return {
    title: `${post.title} | Blog Vamo Sortear`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
    },
  };
}

// 2. Renderiza a Página
export default async function BlogPostPage({ params }: Props) {
  // Await no params aqui também
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}