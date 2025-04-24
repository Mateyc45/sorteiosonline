import React, { useState } from 'react';
import { Dice1Icon, TextIcon, PlusIcon, XIcon, HomeIcon, BookOpenIcon, BrainIcon, UsersIcon, GraduationCapIcon, ListIcon, GiftIcon, SparklesIcon, LifeBuoy  } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shuffleArray } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { AdSpace } from './AdSpace';
import { RaffleCard } from '../components/RaffleCard';
import { Helmet } from 'react-helmet-async';

export function WordDraw() {
  window.scrollTo(0, 0);
  
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleAddWord = () => {
    if (newWord.trim()) {
      setWords([...words, newWord.trim()]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleDraw = async () => {
    if (words.length > 0) {
      setIsDrawing(true);
      setResult(null);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const drawnWord = shuffleArray(words)[0];
      setResult(drawnWord);
      setIsDrawing(false);
    }
  };


  const raffleTypes = [
    {
      title: 'Sortear um número',
      description: 'Sorteie números aleatórios de forma rápida e confiável',
      icon: <Dice1Icon className="h-6 w-6 text-blue-600" />,
      path: '/Sortear-Numero',
      gradient: 'from-blue-500 to-cyan-400',
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


  return (
    <div className="mx-auto max-w-2xl">
            <Helmet> 
                    <title>Sortear Palavras - Vamo Sortear</title>
                    <meta name="description" content="Sorteie palavras de forma simples, rápida e personalizada no Vamo Sortear." />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="http://vamosortear.com.br/Sortear-Palavras" />
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

      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 p-3 shadow-md">
              <TextIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sorteio de Palavras</h2>
              <p className="mt-1 text-gray-600">Sorteie palavras ou nomes de forma aleatória e imparcial</p>
            </div>
          </div>
          {result && (
            <ShareButton 
              title="Resultado do Sorteio de Palavras" 
              text={`A palavra sorteada foi: ${result}`} 
            />
          )}
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adicionar Palavra ou Nome
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddWord();
                  }
                }}
                placeholder="Digite uma palavra ou nome"
                className="block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <button
                onClick={handleAddWord}
                className="flex items-center gap-2 rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <PlusIcon className="h-5 w-5" />
                Adicionar
              </button>
            </div>
          </div>

          {words.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Palavras adicionadas:</p>
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 transition-colors hover:bg-green-100"
                  >
                    <span className="text-sm font-medium text-green-900">{word}</span>
                    <button
                      onClick={() => handleRemoveWord(index)}
                      className="rounded-full p-1 hover:bg-green-200"
                    >
                      <XIcon className="h-3 w-3 text-green-700" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleDraw}
          disabled={words.length === 0 || isDrawing}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {isDrawing && (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
            )}
          </div>
          <span className={isDrawing ? 'opacity-0' : 'opacity-100'}>
            {isDrawing ? 'Sorteando...' : 'Sortear Palavra'}
          </span>
        </button>

        {result && (
          <div className="mt-8 overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Palavra Sorteada</p>
                <p className="mt-1 text-4xl font-bold text-gray-900">{result}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <SparklesIcon className="h-6 w-6 text-green-600" />
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
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de palavras?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            O sorteio de palavras é uma ferramenta versátil e eficiente que permite selecionar aleatoriamente uma palavra ou nome de uma lista predefinida. 
            Nosso sistema utiliza um algoritmo avançado de aleatorização que garante total imparcialidade no processo de seleção, tornando-o ideal para 
            diversos tipos de sorteios e seleções aleatórias.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Recursos e Benefícios</h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Interface Intuitiva</p>
                <p className="mt-1 text-sm text-gray-600">Adicione e remova palavras facilmente com uma interface amigável e responsiva.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-1.5">
                <BookOpenIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Lista Ilimitada</p>
                <p className="mt-1 text-sm text-gray-600">Adicione quantas palavras desejar para criar sua lista personalizada de sorteio.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-1.5">
                <BrainIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Algoritmo Inteligente</p>
                <p className="mt-1 text-sm text-gray-600">Sistema de randomização avançado que garante resultados verdadeiramente aleatórios.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-1.5">
                <UsersIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Compartilhamento</p>
                <p className="mt-1 text-sm text-gray-600">Compartilhe os resultados facilmente com todos os participantes.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Aplicações Práticas</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <GraduationCapIcon className="h-5 w-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Educação</h5>
              </div>
              <p className="text-sm text-gray-600">
                Ideal para professores sortearem alunos para apresentações, formar grupos de trabalho ou criar dinâmicas educativas interativas.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Eventos e Sorteios</h5>
              </div>
              <p className="text-sm text-gray-600">
                Perfeito para sorteios de brindes, seleção de ganhadores em promoções ou escolha aleatória de participantes em eventos.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <BrainIcon className="h-5 w-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Dinâmicas de Grupo</h5>
              </div>
              <p className="text-sm text-gray-600">
                Excelente para atividades de team building, jogos em grupo ou distribuição aleatória de tarefas em equipes.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Decisões Imparciais</h5>
              </div>
              <p className="text-sm text-gray-600">
                Útil para tomar decisões de forma aleatória e justa quando houver múltiplas opções ou candidatos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AdSpace />
    </div>
  );
}