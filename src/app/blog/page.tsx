import { Metadata } from 'next';
import { BlogListClient } from '@/components/BlogListClient';
import { getAllPosts } from '@/lib/blogData';
import { isAdminAuthenticated } from '@/lib/adminAuth';

export const metadata: Metadata = {
  title: 'Blog Sorteios Online | Dicas e Tutoriais | Vamo Sortear',
  description: 'Descubra dicas, tutoriais e novidades sobre sorteios online, amigo secreto, LGPD e muito mais. Aprenda as melhores práticas para criar sorteios seguros.',
  alternates: {
    canonical: 'https://vamosortear.com.br/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const isAdmin = await isAdminAuthenticated();

  return <BlogListClient posts={posts} isAdmin={isAdmin} />;
}