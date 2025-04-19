import React, { useState } from 'react';
import { LifeBuoy, ListIcon, TextIcon, HomeIcon, GiftIcon, SparklesIcon, ShuffleIcon, TargetIcon, BrainIcon, UsersIcon, TrophyIcon, Dice1Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shuffleArray } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { AdSpace } from './AdSpace';
import { RaffleCard } from '../components/RaffleCard';

export function SequenceDraw() {
  window.scrollTo(0, 0);
  
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(10);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<number[] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = async () => {
    setIsDrawing(true);
    setResult(null);
    
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
      path: '/word-draw',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      title: 'Sortear um número',
      description: 'Sortei um número aleatório agora mesmo',
      icon: <Dice1Icon className="h-6 w-6 text-blue-600" />,
      path: '/number-draw',
      gradient: 'from-blue-500 to-blue-400',
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
    <div className="mx-auto max-w-2xl">
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
              <div>
                <p className="text-sm font-medium text-gray-500">Sequência Sorteada</p>
                <p className="mt-1 text-4xl font-bold text-gray-900">{result.join(' - ')}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <SparklesIcon className="h-6 w-6 text-purple-600" />
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
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de sequência?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            O sorteio de sequência é uma ferramenta avançada e versátil que permite gerar uma série de números aleatórios únicos dentro de um intervalo específico. 
            Nosso sistema utiliza um algoritmo sofisticado de aleatorização que garante que cada número seja sorteado apenas uma vez, mantendo a integridade e 
            imparcialidade do processo. Esta ferramenta é especialmente útil quando você precisa selecionar múltiplos números de forma aleatória em uma única operação.
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

      <AdSpace />
    </div>
  );
}