// Script para gerar seed.sql extraindo posts do antigo blogData.ts
// Usa eval para processar o array TypeScript
const fs = require('fs');
const path = require('path');

const tempFile = path.join(process.env.TEMP || '/tmp', 'old_blogData.ts');
let content = fs.readFileSync(tempFile, 'utf-8');
// Remove BOM e null bytes
content = content.replace(/^\uFEFF/, '').replace(/\0/g, '');

// Extrai o array entre "export const blogPosts: BlogPost[] = [" e "];"
const arrayStart = content.indexOf('export const blogPosts');
// Encontra o "=" e depois o "[" que inicia o array
const equalsSign = content.indexOf('=', arrayStart);
const bracketStart = content.indexOf('[', equalsSign);

// Encontra o "];" correspondente
let depth = 0;
let bracketEnd = -1;
for (let i = bracketStart; i < content.length; i++) {
  if (content[i] === '[') depth++;
  if (content[i] === ']') {
    depth--;
    if (depth === 0) {
      bracketEnd = i;
      break;
    }
  }
}

const arrayContent = content.substring(bracketStart, bracketEnd + 1);

// Prepara o código para eval - substitui new Date(...) por strings
const evalCode = arrayContent.replace(/new Date\('([^']+)'\)/g, "'$1'");

// Avalia o array
let posts;
try {
  posts = eval(evalCode);
} catch (e) {
  console.error('Erro ao avaliar array:', e.message);
  // Tenta mostrar a área do erro
  const lines = evalCode.split('\n');
  console.error('Primeiras 5 linhas:', lines.slice(0, 5).join('\n'));
  process.exit(1);
}

console.log(`Encontrados ${posts.length} posts.`);

// Escape single quotes para PostgreSQL
function esc(s) {
  if (typeof s !== 'string') return String(s);
  return s.replace(/'/g, "''");
}

const inserts = posts.map((post) => {
  const tags = (post.tags || []).map(t => `'${esc(t)}'`).join(', ');
  const content = (post.content || '').trim();
  
  return `INSERT INTO blog_posts (slug, title, excerpt, content, category, tags, published_at, image_url, author_name, author_role) VALUES (
  '${esc(post.slug)}',
  '${esc(post.title)}',
  '${esc(post.excerpt)}',
  '${esc(content)}',
  '${esc(post.category)}',
  ARRAY[${tags}]::text[],
  '${post.publishedAt}'::timestamptz,
  '${esc(post.imageUrl)}',
  '${esc(post.author.name)}',
  '${esc(post.author.role)}'
);`;
});

const output = `-- ============================================================
-- Seed: Migração dos posts existentes para a tabela blog_posts
-- Gerado automaticamente a partir do antigo blogData.ts
-- Total: ${inserts.length} posts
-- ============================================================

${inserts.join('\n\n')}
`;

const outFile = path.join(__dirname, 'seed.sql');
fs.writeFileSync(outFile, output, 'utf-8');
console.log(`Arquivo seed.sql gerado com sucesso! (${inserts.length} posts)`);
