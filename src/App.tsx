import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Dice1Icon, TextIcon, ListIcon, GiftIcon, SparklesIcon, StarIcon, ShieldCheckIcon, ClockIcon, LifeBuoy, Users } from 'lucide-react';
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
import logo from './lib/image/logo3.png';
import { Helmet } from 'react-helmet-async';
import Analytics from './Analytics';
import Breadcrumbs from './components/Breadcrumbs';
import Perguntas from './components/perguntas';
import { SortearEquipes } from './components/SortearEquipes';

// Schema markup for rich snippets
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Vamo Sortear",
  "description": "Plataforma gratuita para realizar sorteios online. Sorteie números, palavras, sequências, roletas e organize amigo secreto com envio automático por email.",
  "url": "https://vamosortear.com.br/",
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
  title: 'Vamo Sortear – Sorteios Online Grátis de Números, nomes e Mais!',
  description: 'Faça sorteios online grátis com rapidez e segurança! Sorteie números, nomes, palavras, roletas e organize amigo secreto com envio automático por e-mail. Plataforma 100% online, sem cadastro e sem limites. Confira também nosso blog com curiosidades e dicas sobre sorteios digitais.',
  keywords: 'sorteio online, sorteio grátis, sorteio de nomes, amigo secreto online, sorteio de números, sorteio de palavras, sorteio de roleta, gerador de números aleatórios, sorteio automático, plataforma de sorteios',
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
      { property: 'og:url', content: 'https://vamosortear.com.br/' },
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
      path: '/Sortear-Numero',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      title: 'Sortear Palavras',
      description: 'Sorteie palavras ou nomes de uma lista personalizada',
      icon: <TextIcon className="h-6 w-6 text-green-600" />,
      path: '/Sortear-Palavras',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      title: 'Sortear uma sequência',
      description: 'Gere sequências numéricas aleatórias para diversos fins',
      icon: <ListIcon className="h-6 w-6 text-purple-600" />,
      path: '/Sortear-Sequencia',
      gradient: 'from-purple-500 to-pink-400',
    },
    {
      title: 'Amigo Secreto',
      description: 'Organize seu amigo secreto com envio automático por email',
      icon: <GiftIcon className="h-6 w-6 text-red-600" />,
      path: '/Amigo-Secreto',
      gradient: 'from-red-500 to-orange-400',
    },
    {
      title: 'Roleta',
      description: 'Faça um sorteio utilizando uma roleta',
      icon: <LifeBuoy className="h-6 w-6 text-red-600" />,
      path: '/roleta',
      gradient: 'from-yellow-400 to-yellow-100',
    },
    {
      title: 'Sortear Equipes',
      description: 'Faça o sorteio de equipes para diversas atividades',
      icon: <Users className="h-6 w-6" style={{ color: '#0F766E' }}/>,
      path: '/Sortear-Equipes',
      gradient: 'from-teal-400 to-teal-100',
    },
  ];
  
  const isBlogPage = location.pathname.endsWith('/blog');

  return (
    <HelmetProvider>
      <Router>
        <Helmet>
            {/* Script do Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-F0M7EK8WZ9"></script>
            <script defer>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-F0M7EK8WZ9'); 
              `}
            </script>
          </Helmet>

          <Analytics/>

        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900">
                  <img src={logo} alt="Vamo Sortear - Plataforma de Sorteios Grátis(Sortear números, roleta, amigo secreto e muito mais sorteios da sorte)" title="Vamo Sortear – Sorteios Online Grátis de Números, nomes e Mais!" loading="lazy" className="h-24 w-full" /> 
                </Link>
                <nav className="flex gap-6">
                  <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
                </nav>
              </div>
            </div>
          </header>


          <main className="flex-1">

            <div className="mx-auto max-w-7xl text-gray-500 px-4 py-6 sm:px-6 lg:px-8">
              <Breadcrumbs />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<HomePage raffleTypes={raffleTypes} />} />
                <Route path="/Sortear-Numero" element={<NumberDraw />} />
                <Route path="/Sortear-Palavras" element={<WordDraw />} />
                <Route path="/Sortear-Sequencia" element={<SequenceDraw />} />
                <Route path="/Amigo-Secreto" element={<SecretSantaDraw />} />
                <Route path="/roleta" element={<RoletaSorteio />} />
                <Route path="/Sortear-Equipes" element={<SortearEquipes />} />
                <Route path="/privacidade" element={<PrivacyPolicy />} />
                <Route path="/termos" element={<TermsOfUse />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            
            </div>
          </main>



          <footer className="bg-white border-t">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <Link to="/privacidade" className="hover:text-gray-900">Política de Privacidade</Link>
                <Link to="/termos" className="hover:text-gray-900">Termos de Uso</Link>
                <Link to="/sitemap" className="hover:text-gray-900">Mapa do Site</Link>
                <Link to="/blog" className="hover:text-gray-900">Blog</Link>
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Vamo Sortear. Todos os direitos reservados.
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
      <Helmet>
        <title>VamoSortear - O Jeito Mais Fácil e Simples de sortear algo! Totalmente Gratis</title>
        <meta name="description" content="Sorteie números de forma simples e rápida no VamoSortear. Totalmente Gratis" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://vamosortear.com.br/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="keywords" content="sorteio, sorteios, vamo sortear, sorteio online, sortear numero, sortear numeros, sorteando numero, amigo secreto, sortear palavra, roleta, roleta online" />
        <meta name="author" content="Marcos & Matheus"></meta>

        <meta property="og:image" content="https://vamosortear.com.br/logo.png" />
        <meta property="og:image:alt" content="Logo Vamo Sortear - Plataforma de Sorteios Grátis" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <script type="application/ld+json">
          {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "VamoSortear - O Jeito Mais Fácil e Simples de sortear algo! Totalmente Gratis",
        "description": "Sorteie números, palavras, sequências e organize amigo secreto de forma simples, rápida e gratuita no VamoSortear.",
        "url": "https://vamosortear.com.br/",
        "publisher": {
          "@type": "Organization",
          "name": "VamoSortear",
          "logo": {
            "@type": "ImageObject",
            "url": "https://vamosortear.com.br/logo.png",
            "width": 1200,
            "height": 630
          }
        },
        "mainEntity": {
          "@type": "WebApplication",
          "name": "VamoSortear",
          "operatingSystem": "All",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://vamosortear.com.br/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
          })}
        </script>
      </Helmet>
      {/* Hero Section */}

      <div className="mt-0 pt-0">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm font-medium mb-6">
            <SparklesIcon className="h-4 w-4"  />
            <span>Mais de 10.000 sorteios realizados!</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Vamos Sortear Online  e Grátis
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-2">
            Precisa realizar sorteios de forma rápida, segura e transparente? 
            O VamoSortear é a solução ideal para você! Nossa plataforma simplifica todo o processo em apenas alguns cliques.
          </p>
        
        </div>

        
        <div className="flex flex-col-reverse lg:flex-col gap-2 items-center">
          <div className='text-center'>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-2">
              Sorteie nomes, números ou itens com resultados 100% confiáveis. 
              Perfeito para empresas, influenciadores e qualquer pessoa que busque praticidade.
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-2">
              Escolha uma das opções e comece agora mesmo, sem cadastro! 
            </p>
            <p className="text-xl text-gray-600 max-w-5xl mx-auto">
              COMECE SEU SORTEIO AGORA! Junte-se aos milhares de brasileiros que já confiam em nossa plataforma.
            </p>
          </div>
        

            {/* Features Grid */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 mb-8">
            {raffleTypes.map((raffle) => (
              <Link
                key={raffle.title}
                to={raffle.path}
                className="w-full sm:w-[550px] min-h-[100px]"
              >
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
        </div>
      </div>
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
            <p className="text-gray-600">Realize quantos sorteios quiser, sem limites de quantidade e totalmente gratuito, aproveitando a liberdade de fazer sorteios sempre que desejar, sem pagar nada por isso.</p>
          </div>
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Seguro e Confiável</h3>
            <p className="text-gray-600">Este algoritmo avançado garante resultados totalmente aleatórios, utilizando métodos sofisticados para assegurar sorteios justos, sem viés ou padrões detectáveis.</p>
          </div>
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Rápido e Fácil</h3>
            <p className="text-gray-600">Interface intuitiva, resultados rápidos e compartilhamento fácil, tudo com apenas alguns cliques.</p>
          </div>
        </div>
      </div>

      {/* <BannerAd />

      {/* Use Cases Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Ideal para Diversos Tipos de Sorteio
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-center text-gray-900 mb-2">🎯 Rifas e Bingos</h3>
            <p className="text-gray-600">
              Perfeito para sorteios de rifas, bingos e eventos beneficentes.
              Ideal para escolas, igrejas, comunidades, ONGs e qualquer iniciativa que precise arrecadar fundos ou promover entretenimento.
              Com ele, você organiza sorteios de forma prática, divertida e eficiente, garantindo transparência e engajamento entre os participantes.
              Seja em festas juninas, almoços solidários, campanhas de doações ou eventos familiares, essa é a solução ideal para tornar tudo mais especial, animado e inesquecível!
            </p>
          </div>
          <div className="rounded-lg text-center bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎓 Educação</h3>
            <p className="text-gray-600">
            Ideal para professores sortearem alunos ou formarem grupos de maneira prática e imparcial.
            Perfeito para dinamizar atividades em sala de aula, incentivar a participação e tornar as aulas mais interativas.
            Com essa ferramenta, é possível montar grupos aleatórios, escolher alunos para apresentações ou responder questões, tudo com agilidade e transparência.
            Seja no ensino fundamental, médio ou superior, ela contribui para uma gestão mais organizada da turma.
            </p>
          </div>
          <div className="rounded-lg text-center bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎁 Amigo Secreto</h3>
            <p className="text-gray-600">
            Organize amigos secretos com praticidade e envio automático por e-mail para todos os participantes.
            Perfeito para confraternizações de fim de ano, festas escolares, empresas, grupos de amigos ou reuniões familiares.
            A ferramenta garante sigilo, evita sorteios repetidos e facilita toda a dinâmica, mesmo com participantes em diferentes locais.
            Com poucos cliques, cada pessoa recebe seu amigo secreto por e-mail, de forma segura, rápida e personalizada!
            </p>
          </div>
          <div className="rounded-lg text-center bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎮 Lives e Eventos</h3>
            <p className="text-gray-600">
            Sorteie prêmios e brindes durante transmissões ao vivo de forma simples, rápida e interativa.
            Perfeito para lives em redes sociais, eventos online, webinars, workshops ou campanhas de marketing digital.
            Engaje seu público com sorteios em tempo real, aumentando a participação, a audiência e o alcance da sua transmissão.
            Com uma ferramenta prática e segura, você garante transparência nos resultados e cria momentos inesquecíveis para seus seguidores, clientes ou participantes!
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-center text-gray-900 mb-2">👥 Empresas</h3>
            <p className="text-gray-600">
            Realize sorteios para funcionários, clientes ou promoções de forma prática, segura e personalizada.
            Ideal para empresas que desejam reconhecer colaboradores, fidelizar clientes ou promover ações de marketing.
            Com essa solução, você organiza sorteios internos, premiações de metas ou campanhas promocionais de forma profissional e transparente.
            Aumente o engajamento, valorize seu público e fortaleça a imagem da sua marca com sorteios que fazem a diferença em qualquer ocasião!
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="font-semibold text-center text-gray-900 mb-2">🎲 Jogos e Diversão</h3>
            <p className="text-gray-600">
            Crie jogos e brincadeiras com sorteios aleatórios para animar qualquer ocasião de forma divertida e criativa.
            Ideal para festas, encontros familiares, dinâmicas escolares, eventos corporativos ou momentos de lazer entre amigos.
            A ferramenta permite gerar sorteios rápidos e imparciais, criando desafios, duplas, tarefas ou rodadas de perguntas com total praticidade.
            Transforme suas atividades em experiências envolventes, espontâneas e inesquecíveis.
            </p>
          </div>
        </div>
        
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
        <Perguntas />
      </div>
    </div>
  );
}

export default App;
