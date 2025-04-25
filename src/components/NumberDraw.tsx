import React, { useState, useEffect  } from 'react';
import { HomeIcon, Dice1Icon, TextIcon, ListIcon, GiftIcon, SparklesIcon, StarIcon, ShieldCheckIcon, ClockIcon, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateRandomNumber } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { AdSpace } from './AdSpace';
import { RaffleCard } from '../components/RaffleCard';
import { Helmet } from 'react-helmet-async';

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
];

export function NumberDraw() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = async () => {
    setIsDrawing(true);
    setResult(null);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const drawnNumber = generateRandomNumber(min, max);
    setResult(drawnNumber);
    setIsDrawing(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Helmet> 
        <title>Sorteio de Números - Vamo Sortear</title>
        <meta name="description" content="Sorteie números dentro de um intervalo de forma simples e rápida no Vamo Sortear." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://vamosortear.com.br/Sortear-Numero" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="keywords" content="sorteio, sorteios, vamo sortear, sorteio online, sortear numero, sortear numeros, sorteando numero" />
        <meta name="author" content="Marcos & Matheus"></meta>
        
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
              <div>
                <p className="text-sm font-medium text-gray-500">Resultado do Sorteio</p>
                <p className="mt-1 text-4xl font-bold text-gray-900">{result}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <SparklesIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        )}
      </div>

      <AdSpace />
      
      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Outros tipos de sorteios</h2>
        <p className="mb-6 text-gray-600">Explore outros tipos de sorteios disponíveis na nossa plataforma.</p>

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
      </div>        
      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de números?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            O sorteio de números é uma ferramenta versátil e poderosa que utiliza um algoritmo avançado de geração de números aleatórios para garantir resultados justos e imparciais. Nossa plataforma foi desenvolvida pensando na simplicidade e eficiência, permitindo que você realize sorteios de forma rápida e confiável.
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

      <AdSpace />
    </div>
  );
}