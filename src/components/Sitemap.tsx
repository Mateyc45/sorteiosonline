import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, MapIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function Sitemap() {
  window.scrollTo(0, 0);
  
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
            <Helmet> 
                    <title>Mapa do Site - Vamo Sortear</title>
                    <meta name="description" content="Explore todas as páginas de nosso site!" />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://vamosortear.com.br/sitemap" />
            </Helmet>
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-blue-100 p-2">
            <MapIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mapa do Site</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sorteios</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/Sortear-Numero" className="text-blue-600 hover:underline">
                  Sorteio de Números
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Sorteie números aleatórios dentro de um intervalo específico
                </p>
              </li>
              <li>
                <Link to="/Sortear-Palavras" className="text-blue-600 hover:underline">
                  Sorteio de Palavras
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Sorteie palavras ou nomes de uma lista personalizada
                </p>
              </li>
              <li>
                <Link to="/Sortear-Sequencia" className="text-blue-600 hover:underline">
                  Sorteio de Sequência
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Gere sequências numéricas aleatórias
                </p>
              </li>
              <li>
                <Link to="/Amigo-Secreto" className="text-blue-600 hover:underline">
                  Amigo Secreto Online
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Organize seu amigo secreto com sorteio automático e envio por email
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/privacidade" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Saiba como protegemos seus dados e informações pessoais
                </p>
              </li>
              <li>
                <Link to="/termos" className="text-blue-600 hover:underline">
                  Termos de Uso
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Condições e regras para utilização dos nossos serviços
                </p>
              </li>
              <li>
                <Link to="/sitemap" className="text-blue-600 hover:underline">
                  Mapa do Site
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Navegue por todas as páginas do nosso site
                </p>
              </li>
            </ul>
          </section>


          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Portal de curiosidades</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-blue-600 hover:underline">
                  Blog
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                Um espaço dedicado a explorar curiosidades sobre sorteios.
                </p>
              </li>
            </ul>
          </section>

          
        </div>
      </div>
    </div>
  );
}