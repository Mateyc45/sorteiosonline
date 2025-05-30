import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { Users, LifeBuoy, ListIcon, TextIcon, HomeIcon, GiftIcon, SparklesIcon, ShuffleIcon, TargetIcon, BrainIcon, UsersIcon, TrophyIcon, Dice1Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shuffleArray } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { AdSpace } from './AdSpace';
import { RaffleCard } from '../components/RaffleCard';
import Perguntas from './perguntas';

export function SequenceDraw() {
  useEffect(() => {
        window.scrollTo(0, 0);
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295" crossorigin="anonymous"></script>
      }, []);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(10);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<number[] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);

  const handleDraw = async () => {
    setIsDrawing(true);
    setResult(null);

    const agora = new Date();
    const twoDigits = (num: number) => num.toString().padStart(2, '0');
    const TimeFormatado = 
      `${twoDigits(agora.getDate())}/` +
      `${twoDigits(agora.getMonth() + 1)}/` +
      `${agora.getFullYear()} - ` +
      `${twoDigits(agora.getHours())}:` +
      `${twoDigits(agora.getMinutes())}:` +
      `${twoDigits(agora.getSeconds())}`;

    setsorteioTime(TimeFormatado);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    const sequence = shuffleArray(numbers).slice(0, count);
    setResult(sequence);
    setIsDrawing(false);
  };

  const raffleTypes = [
    {
      title: 'Sortear Palavras',
      description: 'Sorteie palavras ou nomes de uma lista personalizada',
      icon: <TextIcon className="h-6 w-6 text-green-600" />,
      path: '/Sortear-Palavras',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      title: 'Sortear um número',
      description: 'Sortei um número aleatório agora mesmo',
      icon: <Dice1Icon className="h-6 w-6 text-blue-600" />,
      path: '/Sortear-Numero',
      gradient: 'from-blue-500 to-blue-400',
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


  return (
    <div className="mx-auto max-w-2xl">
            <Head> 
              <title>Sortear Sequência de Números Online - Vamo Sortear</title>
              <meta name="description" content="Sorteie sequências de números aleatórios de forma personalizada, rápida e fácil. Experimente agora no Vamo Sortear!" />
              <meta name="robots" content="index, follow" />
              <link rel="canonical" href="https://vamosortear.com.br/Sortear-Sequencia" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="keywords" content="sorteio online, sortear sequência de números, sorteio de números, ferramenta de sorteio, sorteio personalizado, Vamo Sortear" />
              <meta name="author" content="Marcos & Matheus" />
              <meta property="og:title" content="Sortear Sequência de Números Online - Vamo Sortear" />
              <meta property="og:description" content="Crie sorteios de sequência de números personalizados com facilidade. Descubra a ferramenta ideal para sorteios online!" />
              <meta property="og:url" content="https://vamosortear.com.br/Sortear-Sequencia" />
              <meta property="og:type" content="website" />
              <meta property="og:image" content="https://vamosortear.com.br/assets/images/sorteio-sequencia.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Sortear Sequência de Números Online - Vamo Sortear" />
              <meta name="twitter:description" content="Sorteie sequências de números aleatórios de forma personalizada e rápida. Experimente agora no Vamo Sortear!" />
              <meta name="twitter:image" content="https://vamosortear.com.br/assets/images/sorteio-sequencia.png" />

                <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "name": "Sortear Sequência de Números Online - Sorteios Personalizados | Vamo Sortear",
                  "description":
                  "Sorteie sequências de números aleatórios de forma personalizada, rápida e fácil. Experimente o sorteio online mais confiável e eficiente no Vamo Sortear!",
                  "url": "https://vamosortear.com.br/Sortear-Sequencia",
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
                  "image": "https://vamosortear.com.br/assets/images/sorteio-sequencia.png",
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
                    "name": "Sortear Sequência de Números",
                    "target": "https://vamosortear.com.br/Sortear-Sequencia",
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
                    "name": "Sortear Sequência de Números",
                    "item": "https://vamosortear.com.br/Sortear-Sequencia",
                    },
                  ],
                  },
                })}
                </script>
            </Head>
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 p-3 shadow-md">
              <ListIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sorteio de Sequência</h2>
              <p className="mt-1 text-gray-600">Gere sequências numéricas aleatórias personalizadas</p>
            </div>
          </div>
          {result && (
            <ShareButton 
              title="Resultado do Sorteio de Sequência" 
              text={`A sequência sorteada é: ${result.join(', ')}`} 
            />
          )}
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label
              htmlFor="start"
              className="block text-sm font-medium text-gray-700"
            >
              Número Inicial
            </label>
            <input
              type="number"
              id="start"
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label
              htmlFor="end"
              className="block text-sm font-medium text-gray-700"
            >
              Número Final
            </label>
            <input
              type="number"
              id="end"
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label
              htmlFor="count"
              className="block text-sm font-medium text-gray-700"
            >
              Quantidade
            </label>
            <input
              type="number"
              id="count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min={1}
              max={end - start + 1}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
        </div>

        <button
          onClick={handleDraw}
          disabled={isDrawing}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {isDrawing && (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
            )}
          </div>
          <span className={isDrawing ? 'opacity-0' : 'opacity-100'}>
            {isDrawing ? 'Sorteando...' : 'Sortear Sequência'}
          </span>
        </button>

        {result && (
          <div className="mt-8 overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-purple-100 p-3">
                <SparklesIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Sequência Sorteada</p>
                <p className="mt-1 text-5xl font-bold text-gray-900">{result.join(' - ')}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <SparklesIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        )}
        {result &&(
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-full flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg gap-2">
              <p className="text-mt font-medium text-gray-500">Data do sorteio</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 center">{sorteioTime}</p>
            </div>
          </div>
        )}
      </div>



      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Outros tipos de sorteios</h2>
              <p className="mb-6 text-gray-600">Explore outros tipos de sorteios disponíveis na nossa plataforma.</p>
      
              <div
                className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-2 ${
                  raffleTypes.length % 2 !== 0 ? 'lg:grid-cols-2 lg:justify-items-center' : ''
                }`}
              >
                {raffleTypes.map((raffle, index) => (
                  <Link
                    key={index}
                    to={raffle.path}
                    className={`${
                raffleTypes.length % 2 !== 0 && index === raffleTypes.length - 1
                  ? 'lg:col-span-2 lg:justify-self-center w-full'
                  : ''
                    }`}
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


      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de sequência?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
          O sorteio de sequência é uma ferramenta avançada, 
          extremamente versátil e precisa, projetada para gerar uma série de números aleatórios únicos dentro de um intervalo específico, 
          atendendo a uma ampla variedade de necessidades e aplicações. 
          Nosso sistema utiliza um algoritmo sofisticado de aleatorização, 
          desenvolvido com a mais alta tecnologia para garantir que cada número sorteado seja único e que não haja repetições no processo de seleção. 
          Isso mantém a total integridade e imparcialidade do sorteio, 
          assegurando que os resultados sejam verdadeiramente aleatórios, 
          sem qualquer tipo de viés ou manipulação. 
          A ferramenta foi pensada para ser altamente eficaz, 
          especialmente em situações onde você precisa selecionar múltiplos números de forma aleatória e rápida, 
          em uma única operação, seja para sorteios, sorteios de prêmios, distribuição de vagas ou qualquer outro tipo de seleção que exija confiabilidade, 
          precisão e total transparência. Com ela, é possível garantir resultados seguros e justos em todas as suas operações.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Recursos e Benefícios</h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-purple-100 p-1.5">
                <ShuffleIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Aleatoriedade Garantida</p>
                <p className="mt-1 text-sm text-gray-600">Sistema de randomização avançado que garante resultados verdadeiramente aleatórios e únicos.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-purple-100 p-1.5">
                <TargetIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Personalização Total</p>
                <p className="mt-1 text-sm text-gray-600">Defina o intervalo e a quantidade de números que deseja sortear com total flexibilidade.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-purple-100 p-1.5">
                <BrainIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Processo Inteligente</p>
                <p className="mt-1 text-sm text-gray-600">Evita duplicatas automaticamente e garante uma distribuição equilibrada dos números.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-purple-100 p-1.5">
                <UsersIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Compartilhamento Simples</p>
                <p className="mt-1 text-sm text-gray-600">Compartilhe os resultados instantaneamente com todos os participantes.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Aplicações Práticas</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-purple-600" />
                <h5 className="font-medium text-gray-900">Sorteios Múltiplos</h5>
              </div>
              <p className="text-sm text-gray-600">
                Perfeito para sorteios que necessitam de múltiplos ganhadores, como rifas, bingos ou premiações com vários contemplados.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-purple-600" />
                <h5 className="font-medium text-gray-900">Competições</h5>
              </div>
              <p className="text-sm text-gray-600">
                Ideal para definir ordem de apresentações, determinar posições em competições ou criar chaves de torneios.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <BrainIcon className="h-5 w-5 text-purple-600" />
                <h5 className="font-medium text-gray-900">Atividades Educativas</h5>
              </div>
              <p className="text-sm text-gray-600">
                Excelente para professores criarem grupos de trabalho, definirem ordem de apresentações ou realizarem atividades pedagógicas.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <ShuffleIcon className="h-5 w-5 text-purple-600" />
                <h5 className="font-medium text-gray-900">Distribuição Aleatória</h5>
              </div>
              <p className="text-sm text-gray-600">
                Útil para distribuir tarefas, alocar recursos ou criar escalas de trabalho de forma imparcial e eficiente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
        <Perguntas />
      </div> 
    </div>
  );
}