import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Home, Map } from 'lucide-react';

// 1. CONFIGURAÇÃO DE SEO (METADATA)
export const metadata: Metadata = {
  title: 'Mapa do Site | Vamo Sortear',
  description: 'Explore todas as páginas de nosso site e descubra todos os sorteios que podem te interessar, desde números até roleta e amigo secreto!',
  alternates: {
    canonical: 'https://vamosortear.com.br/sitemap',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['sorteio', 'sorteios', 'vamo sortear', 'sorteio online', 'mapa do site'],
  authors: [{ name: 'Marcos & Matheus' }],
  other: {
    'X-UA-Compatible': 'IE=edge',
  },
};

// 2. COMPONENTE (SERVER COMPONENT)
export default function SitemapPage() {
  
  // Estrutura de dados para o JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mapa do Site - Vamo Sortear",
    "description": "Explore todas as páginas de nosso site e descubra todos os sorteios...",
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
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      
      {/* Script do Google AdSense (Otimizado para Next.js) */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* JSON-LD Injetado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navegação de Voltar */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <Home className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-blue-100 p-2">
            <Map className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mapa do Site</h1>
        </div>

        <div className="space-y-8">
          
          {/* Seção Sorteios */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Sorteios</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/Sortear-Numero" className="text-blue-600 font-medium hover:underline text-lg">
                  Sorteio de Números
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Sorteie números aleatórios dentro de um intervalo específico.
                </p>
              </li>
              <li>
                <Link href="/Sortear-Palavras" className="text-blue-600 font-medium hover:underline text-lg">
                  Sorteio de Palavras
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Sorteie palavras ou nomes de uma lista personalizada.
                </p>
              </li>
              <li>
                <Link href="/Sortear-Sequencia" className="text-blue-600 font-medium hover:underline text-lg">
                  Sorteio de Sequência
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Gere sequências numéricas aleatórias sem repetição.
                </p>
              </li>
              <li>
                <Link href="/Roleta" className="text-blue-600 font-medium hover:underline text-lg">
                  Roleta
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Gire a roleta e descubra o resultado de forma veloz e personalizada!
                </p>
              </li>
              <li>
                <Link href="/Amigo-Secreto" className="text-blue-600 font-medium hover:underline text-lg">
                  Amigo Secreto Online
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Organize seu amigo secreto com sorteio automático e envio por email.
                </p>
              </li>
              <li>
                <Link href="/Sortear-Equipes" className="text-blue-600 font-medium hover:underline text-lg">
                  Sortear Equipes
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Sortear equipes online de forma simples, rápida e personalizada.
                </p>
              </li>
            </ul>
          </section>

          {/* Seção Blog */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Conteúdo</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="text-blue-600 font-medium hover:underline text-lg">
                  Blog & Curiosidades
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Um espaço dedicado a explorar curiosidades sobre sorteios e dicas.
                </p>
              </li>
            </ul>
          </section>

          {/* Seção Informações */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Informações Legais</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/privacidade" className="text-gray-700 hover:text-blue-600 hover:underline">
                  Política de Privacidade
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  Saiba como protegemos seus dados e informações pessoais.
                </p>
              </li>
              <li>
                <Link href="/termos" className="text-gray-700 hover:text-blue-600 hover:underline">
                  Termos de Uso
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  Condições e regras para utilização dos nossos serviços.
                </p>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-700 hover:text-blue-600 hover:underline">
                  Mapa do Site
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  Navegue por todas as páginas do nosso site.
                </p>
              </li>
            </ul>
          </section>

          

        </div>
      </div>
    </div>
  );
}