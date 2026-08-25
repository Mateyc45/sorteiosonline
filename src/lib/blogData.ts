import { supabase } from './supabase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // Opcional porque na lista não precisamos carregar o HTML todo
  category: string;
  tags: string[];
  publishedAt: Date;
  imageUrl: string;
  author: {
    name: string;
    role: string;
  };
}

// Tipo bruto retornado pelo Supabase (snake_case)
interface BlogPostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  tags: string[];
  published_at: string;
  image_url: string;
  author_name: string;
  author_role: string;
  created_at: string;
}

// Converte uma row do Supabase para o formato da aplicação
function mapRowToPost(row: BlogPostRow): BlogPost {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ? row.content.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') : undefined,
    category: row.category,
    tags: row.tags ?? [],
    publishedAt: new Date(row.published_at),
    imageUrl: row.image_url,
    author: {
      name: row.author_name,
      role: row.author_role,
    },
  };
}

// Busca todos os posts do Supabase, ordenados por data (mais recentes primeiro)
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar posts do Supabase:', error.message);
    return [];
  }

  return (data as BlogPostRow[]).map(mapRowToPost);
}

// Busca um post pelo slug
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Erro ao buscar post por slug:', error?.message);
    return undefined;
  }

  return mapRowToPost(data as BlogPostRow);
}