// Script para migrar os posts do antigo blogData.ts para o Supabase
// Executa com: node supabase/migrate-to-supabase.js

const fs = require('fs');
const envContent = fs.readFileSync('.env', 'utf-8');
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eqIndex = trimmed.indexOf('=');
  if (eqIndex > 0) {
    const key = trimmed.substring(0, eqIndex).trim();
    const val = trimmed.substring(eqIndex + 1).trim();
    process.env[key] = val;
  }
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Erro: variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não encontradas no .env');
  process.exit(1);
}

console.log('Supabase URL:', SUPABASE_URL);
console.log('Conectando ao Supabase...\n');

// Importa o antigo blogData.ts avaliando o conteúdo
// Primeiro, vamos ler do git
const { execSync } = require('child_process');
let oldContent;
try {
  oldContent = execSync('git show HEAD:src/lib/blogData.ts', { encoding: 'utf-8' });
} catch (e) {
  console.error('Erro ao ler arquivo do git:', e.message);
  process.exit(1);
}

// Extrai o array
const equalsIndex = oldContent.indexOf('blogPosts: BlogPost[] =');
const arrayStartSearch = oldContent.indexOf('[', equalsIndex + 20);

let depth = 0;
let arrayEnd = -1;
for (let i = arrayStartSearch; i < oldContent.length; i++) {
  if (oldContent[i] === '[') depth++;
  if (oldContent[i] === ']') {
    depth--;
    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }
}

const arrayStr = oldContent.substring(arrayStartSearch, arrayEnd + 1);

// Substitui new Date('...') por strings para poder usar eval
const evalReady = arrayStr.replace(/new Date\('([^']+)'\)/g, "'$1'");

let posts;
try {
  posts = eval(evalReady);
} catch (e) {
  console.error('Erro ao parsear array de posts:', e.message);
  process.exit(1);
}

console.log(`Encontrados ${posts.length} posts para migrar.\n`);

// Função para inserir via REST API do Supabase
async function insertPost(post) {
  const body = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: (post.content || '').trim(),
    category: post.category,
    tags: post.tags || [],
    published_at: post.publishedAt, // já é string ISO
    image_url: post.imageUrl,
    author_name: post.author.name,
    author_role: post.author.role,
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return true;
}

// Migra todos os posts
async function migrate() {
  let success = 0;
  let errors = 0;

  for (const post of posts) {
    try {
      await insertPost(post);
      console.log(`  ✓ [${post.id}] ${post.title}`);
      success++;
    } catch (e) {
      console.error(`  ✗ [${post.id}] ${post.title} → ${e.message}`);
      errors++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Migração concluída!`);
  console.log(`  ✓ Sucesso: ${success}`);
  console.log(`  ✗ Erros: ${errors}`);
  console.log(`  Total: ${posts.length}`);
  console.log(`========================================`);
}

migrate().catch(e => {
  console.error('Erro fatal na migração:', e);
  process.exit(1);
});
