'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Home, Save, ArrowLeft } from 'lucide-react';
import { createPost } from '@/lib/blogActions';
import dynamic from 'next/dynamic';

// Importa React Quill dinamicamente (SSR não suportado)
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full rounded-lg border border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
      Carregando editor...
    </div>
  ),
});

// Importa os estilos do Quill
import 'react-quill-new/dist/quill.snow.css';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ align: [] }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list',
  'blockquote', 'code-block',
  'link', 'image',
  'align',
];

export function CreatePostForm() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      formData.set('content', content); // Adiciona o conteúdo do editor
      await createPost(formData);
    } catch (err: any) {
      setError(err?.message || 'Erro ao criar o post.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para o Blog
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Post</h1>
        <p className="text-gray-600">Preencha os campos abaixo para publicar um novo artigo no blog.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
            Título *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Ex: Como Organizar um Sorteio de Sucesso"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-1">
            Resumo / Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            placeholder="Uma breve descrição do post que aparecerá na listagem..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Categoria e Tags - lado a lado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
              Categoria *
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              placeholder="Ex: Marketing, Segurança, Dicas"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-1">
              Tags (separadas por vírgula)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="Ex: Sorteios, Marketing, Redes Sociais"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* URL da Imagem */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">
            URL da Imagem de Capa
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://images.unsplash.com/..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">Deixe em branco para usar uma imagem padrão.</p>
        </div>

        {/* Autor - lado a lado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-semibold text-gray-700 mb-1">
              Nome do Autor
            </label>
            <input
              id="authorName"
              name="authorName"
              type="text"
              placeholder="Ex: Equipe Vamo Sortear"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="authorRole" className="block text-sm font-semibold text-gray-700 mb-1">
              Cargo / Função do Autor
            </label>
            <input
              id="authorRole"
              name="authorRole"
              type="text"
              placeholder="Ex: Redator, Especialista em Marketing"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conteúdo - Rich Text Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Conteúdo do Post *
          </label>
          <div className="rounded-lg border border-gray-300 overflow-hidden bg-white">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Escreva o conteúdo completo do post aqui..."
              style={{ minHeight: '300px' }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Use a barra de ferramentas para formatar o texto, adicionar links, imagens e mais.
          </p>
        </div>

        {/* Botão de Submit */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Salvando...' : 'Submeter Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

