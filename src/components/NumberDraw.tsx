import React, { useState, useEffect  } from 'react';
import Head from 'next/head'
import { Users, HomeIcon, Dice1Icon, TextIcon, ListIcon, GiftIcon, SparklesIcon, StarIcon, ShieldCheckIcon, ClockIcon, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateRandomNumber } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { AdSpace } from './AdSpace';
import { RaffleCard } from '../components/RaffleCard';
import Perguntas from './perguntas';

const raffleTypes = [
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
  }
];

export function NumberDraw() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295" crossOrigin="anonymous"></script>
  }, []);

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);
  const [minValor, setMinValor] = useState(0);
  const [maxValor, setMaxValor] = useState(0);

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
    setMinValor(min);
    setMaxValor(max);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const drawnNumber = generateRandomNumber(min, max);
    setResult(drawnNumber);
    setIsDrawing(false);
  };
  

  return (
    <div className="mx-auto max-w-2xl">
      <Head> 
        <title>Sorteio de Números Online Grátis - Vamo Sortear</title>
        <meta name="description" content="Realize sorteios de números online de forma rápida, fácil e gratuita. Escolha um intervalo e descubra o número sorteado no Vamo Sortear." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://vamosortear.com.br/Sortear-Numero" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="keywords" content="sorteio de números, sorteio online grátis, sortear número, sorteio aleatório, ferramenta de sorteio, sorteio de números online, sorteio fácil, sorteio confiável, sorteio rápido, sorteio seguro" />
        <meta name="author" content="Marcos & Matheus"></meta>
        <meta property="og:title" content="Sorteio de Números Online Grátis - Vamo Sortear" />
        <meta property="og:description" content="Sorteie números aleatórios online de forma simples e gratuita. Ideal para rifas, jogos e decisões rápidas." />
        <meta property="og:url" content="https://vamosortear.com.br/Sortear-Numero" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vamosortear.com.br/assets/sorteio-numeros.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sorteio de Números Online Grátis - Vamo Sortear" />
        <meta name="twitter:description" content="Sorteie números aleatórios online de forma simples e gratuita. Ideal para rifas, jogos e decisões rápidas." />
        <meta name="twitter:image" content="https://vamosortear.com.br/assets/sorteio-numeros.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Sorteio de Números Online Grátis - Vamo Sortear",
            "description":
              "Realize sorteios de números online de forma rápida, fácil e gratuita. Escolha um intervalo e descubra o número sorteado no Vamo Sortear.",
            "url": "https://vamosortear.com.br/Sortear-Numero",
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
            "image": "https://vamosortear.com.br/assets/sorteio-numeros.png",
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
                "name": "Sortear Números",
                "target": "https://vamosortear.com.br/Sortear-Numero",
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
            "name": "Sortear Números",
            "item": "https://vamosortear.com.br/Sortear-Numero",
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

      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 shadow-md">
              <Dice1Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sorteio de Números</h2>
              <p className="mt-1 text-gray-600">Sorteie números aleatórios de forma rápida e fácil</p>
            </div>
          </div>
          {result !== null && (
            <ShareButton 
              title="Resultado do Sorteio de Números" 
              text={`O número sorteado foi: ${result}`} 
            />
          )}
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label
              htmlFor="min"
              className="block text-sm font-medium text-gray-700"
            >
              Número Mínimo
            </label>
            <input
              type="number"
              id="min"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label
              htmlFor="max"
              className="block text-sm font-medium text-gray-700"
            >
              Número Máximo
            </label>
            <input
              type="number"
              id="max"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <button
          onClick={handleDraw}
          disabled={isDrawing}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {isDrawing && (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
            )}
          </div>
          <span className={isDrawing ? 'opacity-0' : 'opacity-100'}>
            {isDrawing ? 'Sorteando...' : 'Sortear Número'}
          </span>
        </button>

        {result !== null && (
          <div className="mt-8 overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-blue-100 p-3">
                <SparklesIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-mt font-medium text-gray-500">Resultado do Sorteio</p>
                <p className="mt-1 text-6xl font-bold text-gray-900 center">{result}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <SparklesIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        )}
        {result !== null &&(
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-full md:w-2/3 flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg gap-2">
              <p className="text-mt font-medium text-gray-500">Data do sorteio</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 center">{sorteioTime}</p>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg gap-2">
              <p className="text-mt font-medium text-gray-500">Intervalo</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 center">{minValor} a {maxValor}</p>
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
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de números?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
          O sorteio de números é uma ferramenta extremamente versátil e poderosa, desenvolvida com base em um algoritmo avançado de geração de números aleatórios que assegura resultados justos, totalmente imparciais e completamente imprevisíveis. Ao utilizar métodos sofisticados e de alta precisão, nossa plataforma proporciona uma experiência de sorteio sem qualquer viés, garantindo que cada sorteio seja realizado de maneira transparente e confiável. Foi projetada pensando na simplicidade e eficiência, com um design intuitivo que facilita o uso para qualquer pessoa, independentemente de seu nível de experiência. Com essa plataforma, você pode realizar sorteios rapidamente, sem complicações, e com total confiança de que os resultados são seguros, transparentes e não manipulados, permitindo que você compartilhe os resultados de maneira simples e rápida, sem qualquer custo ou dificuldade.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Principais características</h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Totalmente Aleatório</p>
                <p className="mt-1 text-sm text-gray-600">Utiliza um gerador de números pseudoaleatório de alta qualidade para garantir resultados imparciais.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Intervalo Personalizado</p>
                <p className="mt-1 text-sm text-gray-600">Define facilmente o intervalo mínimo e máximo para seus sorteios.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Compartilhamento Fácil</p>
                <p className="mt-1 text-sm text-gray-600">Compartilhe os resultados instantaneamente com participantes através de diferentes plataformas.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Interface Intuitiva</p>
                <p className="mt-1 text-sm text-gray-600">Design moderno e fácil de usar, sem necessidade de configurações complexas.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Aplicações práticas</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Sorteios e Rifas</h5>
              <p className="mt-2 text-sm text-gray-600">
                Perfeito para realizar sorteios de rifas, bingos e outros eventos onde é necessário escolher números aleatoriamente.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Jogos e Entretenimento</h5>
              <p className="mt-2 text-sm text-gray-600">
                Ideal para jogos que necessitam de números aleatórios, como bingo online ou sorteios em lives.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Decisões Aleatórias</h5>
              <p className="mt-2 text-sm text-gray-600">
                Útil para tomar decisões imparciais quando precisar escolher entre várias opções numeradas.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Educação</h5>
              <p className="mt-2 text-sm text-gray-600">
                Excelente para professores que precisam sortear alunos para apresentações ou atividades em sala de aula.
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