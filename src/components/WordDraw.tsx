import React, { useState } from 'react';
import { Users, Dice1Icon, TextIcon, PlusIcon, XIcon, HomeIcon, BookOpenIcon, BrainIcon, UsersIcon, GraduationCapIcon, ListIcon, GiftIcon, SparklesIcon, LifeBuoy  } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shuffleArray } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { AdSpace } from './AdSpace';
import { RaffleCard } from '../components/RaffleCard';
import { Helmet } from 'react-helmet-async';
import Perguntas from './perguntas';

export function WordDraw() {
  window.scrollTo(0, 0);
  
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);

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

      const currentTime = new Date().toLocaleString();
      setsorteioTime(currentTime);

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
            <Helmet> 
                <title>Sortear Palavras Online - Sorteios Personalizados | Vamo Sortear</title>
                <meta name="description" content="Sorteie palavras ou nomes de forma simples, rápida e personalizada. Experimente o sorteio online mais confiável e fácil no Vamo Sortear!" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vamosortear.com.br/Sortear-Palavras" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <meta name="keywords" content="sorteio de palavras, sorteio online, sortear nomes, sorteio personalizado, sorteio confiável, Vamo Sortear, ferramenta de sorteio" />
                <meta name="author" content="Vamo Sortear"></meta>
                <meta property="og:title" content="Sortear Palavras Online - Sorteios Personalizados | Vamo Sortear" />
                <meta property="og:description" content="Descubra a melhor ferramenta para sortear palavras ou nomes de forma aleatória e justa. Experimente agora no Vamo Sortear!" />
                <meta property="og:url" content="https://vamosortear.com.br/Sortear-Palavras" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://vamosortear.com.br/assets/images/sorteio-palavras.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sortear Palavras Online - Sorteios Personalizados | Vamo Sortear" />
                <meta name="twitter:description" content="Sorteie palavras ou nomes de forma simples, rápida e personalizada. Experimente o sorteio online mais confiável e fácil no Vamo Sortear!" />
                <meta name="twitter:image" content="https://vamosortear.com.br/assets/images/sorteio-palavras.png" />
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
            <div className="flex flex-col sm:flex-row gap-2">
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
                className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
              <div className="rounded-full bg-green-100 p-3">
                <SparklesIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Palavra Sorteada</p>
                <p className="mt-1 text-5xl font-bold text-gray-900">{result}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <SparklesIcon className="h-6 w-6 text-green-600" />
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
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de palavras?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
          O sorteio de palavras é uma ferramenta extremamente versátil e eficiente,
          projetada para permitir a seleção aleatória de uma palavra ou nome de uma lista predefinida,
          com total segurança e confiabilidade. Nosso sistema se baseia em um algoritmo avançado de aleatorização,
          desenvolvido para garantir total imparcialidade no processo de seleção, eliminando qualquer chance de viés ou manipulação dos resultados.
          Isso torna a ferramenta ideal para diversos tipos de sorteios, seleções aleatórias ou mesmo para momentos em que você precisa de uma escolha imparcial e justa.
          Seja em sorteios de concursos, sorteios de prêmios, ou outras aplicações que exijam seleção aleatória, nossa plataforma oferece uma solução simples, eficaz e segura.
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

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
        <Perguntas />
      </div>                 
    </div>
  );
}