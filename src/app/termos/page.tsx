import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Home } from 'lucide-react';

// 1. CONFIGURAÇÃO DE SEO (SERVER SIDE)
export const metadata: Metadata = {
  title: 'Termos de Uso | Vamo Sortear',
  description: 'Confira os Termos de Uso do Vamo Sortear e saiba como utilizar nossa plataforma de sorteios online de forma segura e responsável.',
  alternates: {
    canonical: 'https://vamosortear.com.br/termos',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['sorteio', 'termos', 'termos de uso', 'regras', 'legal', 'vamo sortear'],
  authors: [{ name: 'Marcos & Matheus' }],
  other: {
    'X-UA-Compatible': 'IE=edge',
  },
};

// 2. COMPONENTE DA PÁGINA
export default function TermsPage() {
  
  // JSON-LD para Dados Estruturados
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Termos de Uso - Vamo Sortear",
    "description": "Confira os Termos de Uso do Vamo Sortear e saiba como utilizar nossa plataforma...",
    "url": "https://vamosortear.com.br/termos",
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
    "image": "https://vamosortear.com.br/assets/images/termos-de-uso.png",
    "mainEntity": {
      "@type": "WebPage",
      "name": "Termos de Uso",
      "about": "Termos e condições de uso do Vamo Sortear",
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
          "name": "Termos de Uso",
          "item": "https://vamosortear.com.br/termos",
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Termos de Uso
        </h1>
        
        <article className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-500 mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar este site, você aceita e concorda em cumprir estes termos e condições de uso de forma integral. Se você não concordar com qualquer parte destes termos, você não deve utilizar nosso serviço.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Uso do Serviço</h2>
            <p className="mb-4">Nosso serviço de Vamo Sortear deve ser usado apenas para fins legais e de acordo com estes termos.</p>
            <p className="mb-2 font-semibold">Você concorda em não:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usar o serviço para fins ilegais ou não autorizados.</li>
              <li>Tentar acessar áreas restritas do site, servidores ou bancos de dados.</li>
              <li>Interferir no funcionamento do serviço (ex: ataques DDoS, scripts automatizados excessivos).</li>
              <li>Realizar sorteios fraudulentos ou que enganem terceiros.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Conta de Usuário e Dados</h2>
            <p className="mb-4">Para algumas funcionalidades (como salvar sorteios), dados podem ser armazenados temporariamente.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Você é responsável por manter a confidencialidade dos links de administração gerados.</li>
              <li>Você é responsável por todas as atividades realizadas utilizando seus dados de acesso ou IP.</li>
              <li>Não coletamos senhas, pois nosso sistema funciona sem login obrigatório.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Limitação de Responsabilidade</h2>
            <p className="mb-4">O Vamo Sortear é uma ferramenta de utilidade pública fornecida "como está". Não nos responsabilizamos por:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Uso indevido do serviço por parte dos usuários.</li>
              <li>Problemas técnicos temporários, falhas de conexão ou indisponibilidade do site.</li>
              <li>Decisões financeiras, premiações ou consequências tomadas com base nos resultados dos sorteios.</li>
              <li>Perda de dados de sorteios não salvos corretamente.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Modificações dos Termos</h2>
            <p>
                Reservamos o direito de modificar estes termos a qualquer momento para refletir mudanças na lei ou em nossos serviços. 
                O uso continuado do site após tais alterações constitui sua aceitação dos novos termos.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}