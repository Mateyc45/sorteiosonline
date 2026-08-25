'use server';

import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '')   // Remove caracteres especiais
    .replace(/\s+/g, '-')           // Espaços viram hífens
    .replace(/-+/g, '-')            // Remove hífens duplicados
    .replace(/^-|-$/g, '');         // Remove hífens no início/fim
}

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const tagsRaw = formData.get('tags') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const authorName = formData.get('authorName') as string;
  const authorRole = formData.get('authorRole') as string;

  // Validação básica
  if (!title || !excerpt || !content || !category) {
    throw new Error('Campos obrigatórios não preenchidos.');
  }

  const slug = generateSlug(title);
  const tags = tagsRaw
    ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase.from('blog_posts').insert({
    slug,
    title,
    excerpt,
    content,
    category,
    tags,
    published_at: new Date().toISOString(),
    image_url: imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    author_name: authorName || 'Equipe Vamo Sortear',
    author_role: authorRole || 'Redator',
  });

  if (error) {
    console.error('Erro ao criar post:', error.message);
    throw new Error('Falha ao salvar o post. Tente novamente.');
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect('/blog');
}

