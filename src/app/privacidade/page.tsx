import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Home } from 'lucide-react';

// 1. CONFIGURAÇÃO DE SEO (SERVER SIDE)
export const metadata: Metadata = {
  title: 'Política de Privacidade | Vamo Sortear',
  description: 'Explore nossa política de privacidade e saiba como seus dados são protegidos e utilizados no VamoSortear.com.br.',
  alternates: {
    canonical: 'https://vamosortear.com.br/privacidade',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['sorteio', 'privacidade', 'LGPD', 'dados', 'segurança', 'vamo sortear'],
  authors: [{ name: 'Marcos & Matheus' }],
  other: {
    'X-UA-Compatible': 'IE=edge',
  },
};

// 2. COMPONENTE DA PÁGINA
export default function PrivacyPolicyPage() {
  
  // JSON-LD para Dados Estruturados
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Política de Privacidade - Vamo Sortear",
    "description": "Explore nossa política de privacidade e como seus dados são utilizados...",
    "url": "https://vamosortear.com.br/privacidade",
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
    "image": "https://vamosortear.com.br/assets/images/politica-privacidade.png",
    "mainEntity": {
      "@type": "WebPage",
      "name": "Política de Privacidade",
      "about": "Privacidade e proteção de dados no Vamo Sortear",
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
          "name": "Política de Privacidade",
          "item": "https://vamosortear.com.br/privacidade",
        },
      ],
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      
      {/* Script do Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Script JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Botão Voltar */}
      <nav className="mb-6">
        <Link
          href="/"
          title="Voltar para a página inicial"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors border border-gray-200 shadow-sm"
        >
          <Home className="h-4 w-4" />
          Voltar para Início
        </Link>
      </nav>

      {/* Conteúdo Principal */}
      <main className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-100">
            Política de Privacidade
        </h1>
        
        <article className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-500 mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Informações que coletamos</h2>
            <p className="mb-4">Para garantir o funcionamento das nossas ferramentas de sorteio, podemos coletar os seguintes dados:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Endereço de e-mail:</strong> Apenas quando estritamente necessário (ex: Sorteio de Amigo Secreto) para o envio dos resultados.</li>
              <li><strong>Dados de uso:</strong> Informações anônimas sobre como você interage com nosso site (páginas visitadas, tempo de permanência) para melhorias de performance.</li>
              <li><strong>Conteúdo dos Sorteios:</strong> Nomes ou itens inseridos nas listas de sorteio são processados temporariamente para gerar o resultado e, em casos de links salvos, armazenados de forma segura.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Como usamos suas informações</h2>
            <p className="mb-4">Nós valorizamos sua privacidade. Seus dados são utilizados estritamente para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Executar os sorteios solicitados (processamento algorítmico).</li>
              <li>Enviar os resultados para os participantes (no caso do Amigo Secreto).</li>
              <li>Prevenir fraudes e garantir a integridade dos sorteios realizados.</li>
              <li>Melhorar a experiência do usuário e corrigir bugs no sistema.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Proteção de dados</h2>
            <p className="mb-4">Adotamos práticas robustas de segurança da informação:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Criptografia (SSL/TLS):</strong> Todos os dados trafegados entre seu navegador e nossos servidores são criptografados.</li>
              <li><strong>Acesso Restrito:</strong> As informações dos sorteios são acessíveis apenas através dos links únicos gerados (Hash IDs).</li>
              <li><strong>Não Venda de Dados:</strong> Nós <strong>não vendemos</strong>, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Seus direitos (LGPD)</h2>
            <p className="mb-4">Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes direitos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Solicitar o acesso aos dados que temos sobre você.</li>
              <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a eliminação dos seus dados pessoais de nossa base.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contato</h2>
            <p>
                Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos, 
                entre em contato conosco através dos canais oficiais disponíveis no rodapé do site.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}