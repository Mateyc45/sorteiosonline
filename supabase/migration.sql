-- ============================================================
-- Tabela: blog_posts
-- Armazena os posts do blog do Vamo Sortear
-- ============================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  excerpt     TEXT NOT NULL,
  content     TEXT,
  category    TEXT NOT NULL,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  image_url   TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Índice no slug para buscas rápidas
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);

-- Índice na data de publicação para ordenação
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública (SELECT) para todos (incluindo anon)
CREATE POLICY "Permitir leitura pública dos posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Permitir inserção para anon e authenticated
CREATE POLICY "Permitir inserção de posts"
  ON blog_posts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Permitir atualização para authenticated
CREATE POLICY "Permitir atualização de posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

