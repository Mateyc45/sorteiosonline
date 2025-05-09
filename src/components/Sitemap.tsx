import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, MapIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function Sitemap() {
  window.scrollTo(0, 0);
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295" crossorigin="anonymous"></script>
  
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
            <Helmet> 
                    <title>Mapa do Site - Vamo Sortear</title>
                    <meta name="description" content="Explore todas as páginas de nosso site e descubra todos os sorteios que podem te interessar, desde números até roleta e amigo secreto! Vem sortear no vamosortear.com.br" />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://vamosortear.com.br/sitemap" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="keywords" content="sorteio, sorteios, vamo sortear, sorteio online, mapa do site" />
        <meta name="author" content="Marcos & Matheus"></meta>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Mapa do Site - Vamo Sortear",
            "description":
              "Explore todas as páginas de nosso site e descubra todos os sorteios que podem te interessar, desde números até roleta e amigo secreto! Vem sortear no vamosortear.com.br",
            "url": "https://vamosortear.com.br/sitemap",
            "publisher": {
              "@type": "Organization",
              "name": "Vamo Sortear",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vamosortear.com.br/logo.png",
                "width": 1200,
                "height": 630,
              },
            },
            "image": "https://vamosortear.com.br/assets/images/sitemap.png",
            "mainEntity": {
              "@type": "WebApplication",
              "name": "Vamo Sortear",
              "operatingSystem": "All",
              "applicationCategory": "UtilityApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "BRL",
              },
            },
            "potentialAction": [
              {
                "@type": "SearchAction",
                "target": "https://vamosortear.com.br/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              {
                "@type": "Action",
                "name": "Mapa do Site",
                "target": "https://vamosortear.com.br/sitemap",
              },
            ],
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": "https://vamosortear.com.br/",
                },
                {
            "@type": "ListItem",
            "position": 2,
            "name": "Mapa do Site",
            "item": "https://vamosortear.com.br/sitemap",
                },
              ],
            },
          })}
              </script>
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
                <Link to="/roleta" className="text-blue-600 hover:underline">
                  Roleta
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Gire a roleta e descubra o resultado de forma veloz e personalizada!
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