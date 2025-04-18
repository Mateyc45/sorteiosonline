import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Dice1Icon, TextIcon, ListIcon, GiftIcon, SparklesIcon, StarIcon, ShieldCheckIcon, ClockIcon, LifeBuoy } from 'lucide-react';
import { RaffleCard } from './components/RaffleCard';
import { NumberDraw } from './components/NumberDraw';
import { WordDraw } from './components/WordDraw';
import { SequenceDraw } from './components/SequenceDraw';
import { RoletaSorteio } from './components/RoletaDraw';
import { SecretSantaDraw } from './components/SecretSantaDraw';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { Sitemap } from './components/Sitemap';
import { BlogList } from './components/Blog/BlogList';
import { BlogPost } from './components/Blog/BlogPost';
import BannerAd from './components/BannerAd';
import Footer from '/components/Footer';
import logo from './lib/image/logo3.png';

// Schema markup for rich snippets
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sorteios Online",
  "description": "Plataforma gratuita para realizar sorteios online. Sorteie números, palavras, sequências e organize amigo secreto com envio automático por email.",
  "url": "https://sorteiosonline.netlify.app",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  }
};

// SEO metadata
const seoMetadata = {
  title: 'Sorteios Online - O Jeito Mais Fácil e Simples de sortear algo!',
  description: 'Plataforma gratuita para realizar sorteios online. Sorteie números, palavras, sequências e organize amigo secreto com envio automático por email.',
  keywords: 'sorteio online, sorteio grátis, amigo secreto, sorteio de números, sorteio de palavras, sorteio de sequência, gerador de números aleatórios, sorteio automático',
};

function App() {
  // Add SEO metadata and schema markup
  React.useEffect(() => {
    // Update metadata
    document.title = seoMetadata.title;
    
    const metaTags = [
      { name: 'description', content: seoMetadata.description },
      { name: 'keywords', content: seoMetadata.keywords },
      { property: 'og:title', content: seoMetadata.title },
      { property: 'og:description', content: seoMetadata.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://sorteiosonline.netlify.app' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoMetadata.title },
      { name: 'twitter:description', content: seoMetadata.description }
    ];

    metaTags.forEach(({ name, content, property }) => {
      const meta = document.querySelector(`meta[${name ? `name="${name}"` : `property="${property}"`}]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        const newMeta = document.createElement('meta');
        if (name) newMeta.name = name;
        if (property) newMeta.setAttribute('property', property);
        newMeta.content = content;
        document.head.appendChild(newMeta);
      }
    });

    // Add schema markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(websiteSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const raffleTypes = [
    {
      title: 'Sortear um número',
      description: 'Sorteie números aleatórios de forma rápida e confiável',
      icon: <Dice1Icon className="h-6 w-6 text-blue-600" />,
      path: '/number-draw',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      title: 'Sortear Palavras',
      description: 'Sorteie palavras ou nomes de uma lista personalizada',
      icon: <TextIcon className="h-6 w-6 text-green-600" />,
      path: '/word-draw',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      title: 'Sortear uma sequência',
      description: 'Gere sequências numéricas aleatórias para diversos fins',
      icon: <ListIcon className="h-6 w-6 text-purple-600" />,
      path: '/sequence-draw',
      gradient: 'from-purple-500 to-pink-400',
    },
    {
      title: 'Amigo Secreto',
      description: 'Organize seu amigo secreto com envio automático por email',
      icon: <GiftIcon className="h-6 w-6 text-red-600" />,
      path: '/secret-santa',
      gradient: 'from-red-500 to-orange-400',
    },
      {
      title: 'Roleta',
      description: 'Faça um sorteio utilizando uma roleta',
      icon: <LifeBuoy className="h-6 w-6 text-red-600" />,
      path: '/roleta',
      gradient: 'from-yellow-400 to-yellow-100',
    },
  ];
  
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900">
                  <img src={logo} alt="Logo Sorteios Online - Plataforma de Sorteios Grátis" className="h-16 w-auto" />
                </Link>
                <nav className="flex gap-6">
                  <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<HomePage raffleTypes={raffleTypes} />} />
                <Route path="/number-draw" element={<NumberDraw />} />
                <Route path="/word-draw" element={<WordDraw />} />
                <Route path="/sequence-draw" element={<SequenceDraw />} />
                <Route path="/secret-santa" element={<SecretSantaDraw />} />
                <Route path="/roleta" element={<RoletaSorteio />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfUse />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </div>
          </main>

          <footer className="bg-white border-t">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <Link to="/privacy" className="hover:text-gray-900">Política de Privacidade</Link>
                <Link to="/terms" className="hover:text-gray-900">Termos de Uso</Link>
                <Link to="/sitemap" className="hover:text-gray-900">Mapa do Site</Link>
                <Link to="/blog" className="hover:text-gray-900">Blog</Link>
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Sorteios Online. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </HelmetProvider>
  );
}

function HomePage({ raffleTypes }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm font-medium mb-6">
          <SparklesIcon className="h-4 w-4" />
          <span>Mais de 10.000 sorteios realizados!</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Sorteios Online Grátis
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A maneira mais simples, rápida e segura de realizar seus sorteios. 
          Escolha uma das opções e comece agora mesmo, sem cadastro!
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {raffleTypes.map((raffle) => (
          <Link key={raffle.title} to={raffle.path}>
            <RaffleCard
              title={raffle.title}
              description={raffle.description}
              icon={raffle.icon}
              gradient={raffle.gradient}
              onClick={() => {}}
            />
          </Link>
        ))}
      </div>

      <BannerAd />

      {/* Benefits Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Por que escolher nossos sorteios?
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <StarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">100% Gratuito</h3>
            <p className="text-gray-600">Realize quantos sorteios quiser, sem limites e sem custos</p>
          </div>
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Seguro e Confiável</h3>
            <p className="text-gray-600">Algoritmo avançado que garante resultados totalmente aleatórios</p>
          </div>
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Rápido e Fácil</h3>
            <p className="text-gray-600">Interface intuitiva, resultados instantâneos e compartilhamento simples</p>
          </div>
        </div>
      </div>

      <BannerAd />

      {/* Use Cases Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Ideal para Diversos Tipos de Sorteio
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎯 Rifas e Bingos</h3>
            <p className="text-gray-600">
              Perfeito para sorteios de rifas, bingos e eventos beneficentes
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎓 Educação</h3>
            <p className="text-gray-600">
              Ideal para professores sortearem alunos ou formar grupos
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎁 Amigo Secreto</h3>
            <p className="text-gray-600">
              Organize amigos secretos com envio automático por email
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎮 Lives e Eventos</h3>
            <p className="text-gray-600">
              Sorteie prêmios e brindes durante transmissões ao vivo
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">👥 Empresas</h3>
            <p className="text-gray-600">
              Sorteios para funcionários, clientes ou promoções
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎲 Jogos e Diversão</h3>
            <p className="text-gray-600">
              Crie jogos e brincadeiras com sorteios aleatórios
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;