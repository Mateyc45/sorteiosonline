import React, { useEffect, useState } from 'react';
import {blogPosts} from './BlogList';
import { Link } from 'react-router-dom';
import { BookOpenIcon, CalendarIcon, ChevronRightIcon, TagIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


interface post{
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    tags: Array<string>;
    publishedAt: Date;
    imageUrl: string;
}

interface BlogSugeridoProps {
    currentBlog: post;
}

const BlogSugerido: React.FC<BlogSugeridoProps> = ({ currentBlog }) => {
    const [suggestedBlogs, setSuggestedBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const findSimilarBlogs = () => {
            const similarBlogs = blogPosts
                .filter(blog => blog.id !== currentBlog.id)
                .map(blog => ({
                    blog,
                    commonTags: blog.tags.filter(tag => currentBlog.tags.includes(tag)).length
                }))
                .filter(({ commonTags }) => commonTags > 0)
                .sort((a, b) => b.commonTags - a.commonTags)
                .slice(1, 3)
                .map(({ blog }) => blog);

            setSuggestedBlogs(similarBlogs);
        };

        findSimilarBlogs();
    }, [currentBlog]);

    return (
       <div className="grid gap-8 mt-8">
        {suggestedBlogs.map((post) => (
          <article
            key={post.id}
            className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row gap-6 max-w-full">
              <div className="w-full sm:w-1/3">
                <img
                  src={post.imageUrl} //Aqui é onde está a meta tag da imagem
                  alt={post.title}
                  title={post.title}
                  loading="lazy" // Lazy loading habilitado
                  className="rounded-lg object-cover w-full sm:w-full h-48"
                />
              </div>
              <div className="sm:w-2/3">
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
                    <div className="flex flex-col sm:flex-row gap-2">
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
    );
};
export default BlogSugerido;