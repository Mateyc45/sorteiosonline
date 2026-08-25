const fs = require('fs');

let content = fs.readFileSync('c:\\Users\\Pichau\\Desktop\\SorteiosOnline\\old_blogData.ts');

if (content[0] === 0xFF && content[1] === 0xFE) {
    content = content.toString('utf16le');
} else {
    content = content.toString('utf8');
}

// Extract only the blogPosts array by removing the type definition at the beginning
// and any helper functions at the end.
content = content.replace(/export interface BlogPost\s*\{[\s\S]*?\n\}/, '');
content = content.replace(/export const blogPosts: BlogPost\[\] =/, 'const blogPosts =');

// Remove the getPostBySlug function at the end
content = content.replace(/export function getPostBySlug[\s\S]*/, '');

content += '\nmodule.exports = blogPosts;\n';
fs.writeFileSync('c:\\Users\\Pichau\\Desktop\\SorteiosOnline\\temp_eval.js', content, 'utf8');

let blogPosts;
try {
    blogPosts = require('c:\\Users\\Pichau\\Desktop\\SorteiosOnline\\temp_eval.js');
} catch (e) {
    console.error('Error in temp_eval.js', e);
    process.exit(1);
}

// 1. Generate migration.sql
const migrationSql = `-- Migration to create blog_posts table

CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT,
    category TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    image_url TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by slug
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous SELECT
CREATE POLICY "Allow public read access on blog_posts"
ON blog_posts FOR SELECT
USING (true);

-- Allow anonymous INSERT
CREATE POLICY "Allow public insert on blog_posts"
ON blog_posts FOR INSERT
WITH CHECK (true);

COMMENT ON TABLE blog_posts IS 'Table storing blog post data';
`;

fs.writeFileSync('c:\\Users\\Pichau\\Desktop\\SorteiosOnline\\supabase\\migration.sql', migrationSql);
console.log('migration.sql created.');

// 2. Generate seed.sql
function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    // Escape single quotes by doubling them
    return "'" + String(str).replace(/'/g, "''") + "'";
}

function arrayToSql(arr) {
    if (!arr || !arr.length) return "ARRAY[]::TEXT[]";
    const escapedElements = arr.map(escapeSql).join(', ');
    return `ARRAY[${escapedElements}]`;
}

let seedSqlLines = [];

for (const post of blogPosts) {
    const slug = escapeSql(post.slug);
    const title = escapeSql(post.title);
    const excerpt = escapeSql(post.excerpt);
    const contentSql = escapeSql(post.content || '');
    const category = escapeSql(post.category);
    const tags = arrayToSql(post.tags);
    
    // publishedAt is a Date object, convert to ISO string
    const published_at = post.publishedAt ? escapeSql(post.publishedAt.toISOString()) : 'NOW()';
    const image_url = escapeSql(post.imageUrl);
    const author_name = escapeSql(post.author.name);
    const author_role = escapeSql(post.author.role);

    const insert = `INSERT INTO blog_posts (slug, title, excerpt, content, category, tags, published_at, image_url, author_name, author_role) VALUES (${slug}, ${title}, ${excerpt}, ${contentSql}, ${category}, ${tags}, ${published_at}, ${image_url}, ${author_name}, ${author_role});`;
    seedSqlLines.push(insert);
}

const seedSql = seedSqlLines.join('\n');
fs.writeFileSync('c:\\Users\\Pichau\\Desktop\\SorteiosOnline\\supabase\\seed.sql', seedSql);
console.log('seed.sql created with ' + blogPosts.length + ' posts.');
