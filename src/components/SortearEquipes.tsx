import React, { useState, useEffect  } from 'react';
import Head from 'next/head'
import { HomeIcon, Dice1Icon, TextIcon, ListIcon, GiftIcon, SparklesIcon, LifeBuoy, PlusIcon, Loader2, Trash2, Users, GraduationCapIcon, UsersIcon, BrainIcon, BookOpenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RaffleCard } from './RaffleCard';
import Perguntas from './perguntas';

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
];

export function SortearEquipes() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295" crossOrigin="anonymous"></script>
  }, []);
  const [Nome, setNome] = useState('');
  const [Participantes, setParticipantes] = useState<string[]>([]);
  const [numEquipes, setNumEquipes] = useState(2);
  const [Equipes, setEquipes] = useState<string[][]>([]);
  const [sorteando, setSorteando] = useState(false);
  const [erro, setErro] = useState('');
  const [sorteioTime, setsorteioTime] = useState('');
  const [resultado, setResultado] = useState<string[]>([]);

  const adicionarNome = () => {
    if (Nome.trim() !== '') {
      setParticipantes((prev) => [...prev, Nome.trim()]);
      setNome('');
      setErro('');
    }
  };

  const removerNome = (index: number) => {
    const novaLista = [...Participantes];
    novaLista.splice(index, 1);
    setParticipantes(novaLista);
  };

  const handleDraw = async () => {
    if (Participantes.length >= numEquipes) {
      setSorteando(true);
      setResultado([]);
      setEquipes([]);

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

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const shuffled = [...Participantes].sort(() => 0.5 - Math.random());
      const equipesTemp: string[][] = Array.from({ length: numEquipes }, () => []);
      shuffled.forEach((p, index) => {
        equipesTemp[index % numEquipes].push(p);
      });

      setEquipes(equipesTemp);
      setSorteando(false);
    } else {
      setErro('Número de participantes deve ser maior ou igual ao número de equipes.');
    }
  };


  return (
    <div className="mx-auto max-w-2xl">
      <Head> 
        <title>Sortear Equipes Online - Rápido e Fácil | Vamo Sortear</title>
        <meta name="description" content="Sortear equipes online de forma simples, rápida e personalizada. Organize seus sorteios com facilidade no Vamo Sortear. Experimente agora!" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://vamosortear.com.br/Sortear-Equipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="keywords" content="sortear equipes, sorteio online, sortear times, organizar equipes, sorteio personalizado, vamo sortear, sorteio rápido" />
        <meta name="author" content="Marcos & Matheus"></meta>
        <meta property="og:title" content="Sortear Equipes Online - Rápido e Fácil | Vamo Sortear" />
        <meta property="og:description" content="Sortear equipes online de forma simples, rápida e personalizada. Organize seus sorteios com facilidade no Vamo Sortear. Experimente agora!" />
        <meta property="og:url" content="https://vamosortear.com.br/Sortear-Equipes" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vamosortear.com.br/assets/sortear-equipes-thumbnail.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sortear Equipes Online - Rápido e Fácil | Vamo Sortear" />
        <meta name="twitter:description" content="Sortear equipes online de forma simples, rápida e personalizada. Organize seus sorteios com facilidade no Vamo Sortear. Experimente agora!" />
        <meta name="twitter:image" content="https://vamosortear.com.br/assets/sortear-equipes-thumbnail.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Sortear Equipes Online - Rápido e Fácil | Vamo Sortear",
            "description": "Sortear equipes online de forma simples, rápida e personalizada. Organize seus sorteios com facilidade no Vamo Sortear. Experimente agora!",
            "url": "https://vamosortear.com.br/Sortear-Equipes",
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
              "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS"],
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
            },
            "isAccessibleForFree": true,
            "inLanguage": ["pt-BR"]
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

      <main className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-teal-50 via-teal-50 to-teal-50 p-8 shadow-lg">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-teal-600 to-teal-600 p-3 shadow-md">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
              <h2 className="text-2xl font-bold text-gray-900">Sorteador de Equipes</h2>
              <p className="mt-1 text-gray-600">Sorteie equipes de forma justa e aleatória</p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adicionar os participantes
            </label>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={Nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite um nome"
                className="block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
              <button
                onClick={adicionarNome}
                className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-teal-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <PlusIcon className="h-5 w-5" />
                Adicionar
              </button>
            </div>

            <div className="mb-6">
              {Participantes.length > 0 && (
                <ul className="mb-2 max-h-40 overflow-y-auto rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                  {Participantes.map((nome, index) => (
                    <li key={index} className="mb-2 flex items-center justify-between">
                      <span>{nome}</span>
                      <button onClick={() => removerNome(index)}>
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {Participantes.length === 0 && (
                <p className="text-center text-gray-500">Nenhum participante adicionado ainda.</p>
              )}
            </div>

            <div className="mt-4 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Número de equipes</label>
              <input
                type="number"
                min={2}
                max={Participantes.length}
                value={numEquipes}
                onChange={(e) => setNumEquipes(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-lg shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {erro && <p className="mb-4 text-center text-sm text-red-500">{erro}</p>}

            <div className="mb-6 text-center">
              <button
                onClick={handleDraw}
                className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-teal-600 px-6 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${
                  sorteando ? 'bg-gray-400' : 'bg-teal-600 hover:bg-teal-700'
                }`}
                disabled={sorteando || Participantes.length < 2}
              >
                {sorteando ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sorteando...
                  </span>
                ) : (
                  'Sortear Equipes'
                )}
              </button>
            </div>
          </div>
          {Equipes.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Equipes.map((time, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-white p-6 shadow-md border border-gray-100"
                >
                  <div><h3 className="text-xl font-bold text-teal-700 mb-2">Equipe {i + 1}</h3></div>
                  <ul className="list-disc list-inside text-gray-800">
                    {time.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {Equipes.length > 0 && (
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
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de equipes?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            O sorteio de equipes é uma ferramenta prática e poderosa, desenvolvida para organizar grupos de forma aleatória e equilibrada a partir de uma lista de nomes fornecida.
            Através de um algoritmo inteligente de distribuição aleatória, o sistema forma equipes de maneira justa, garantindo imparcialidade e equilíbrio entre os participantes.
            Essa solução é ideal para professores, organizadores de eventos, líderes de equipes ou qualquer pessoa que deseje criar grupos rapidamente e sem viés.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Recursos e Benefícios</h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-teal-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Distribuição Balanceada</p>
                <p className="mt-1 text-sm text-gray-600">Forme equipes com quantidades iguais de participantes de forma automática e equilibrada.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-teal-100 p-1.5">
                <BookOpenIcon className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Lista Personalizável</p>
                <p className="mt-1 text-sm text-gray-600">Adicione os nomes dos participantes com facilidade e edite a qualquer momento.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-teal-100 p-1.5">
                <BrainIcon className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Algoritmo Inteligente</p>
                <p className="mt-1 text-sm text-gray-600">Sorteio justo e totalmente aleatório, sem repetições ou favoritismos.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-teal-100 p-1.5">
                <UsersIcon className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Compartilhamento Fácil</p>
                <p className="mt-1 text-sm text-gray-600">Compartilhe a divisão das equipes com todos os participantes de forma rápida.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Aplicações Práticas</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <GraduationCapIcon className="h-5 w-5 text-teal-600" />
                <h5 className="font-medium text-gray-900">Sala de Aula</h5>
              </div>
              <p className="text-sm text-gray-600">
                Perfeito para dividir alunos em grupos de forma rápida e justa para trabalhos, projetos ou atividades interativas.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-teal-600" />
                <h5 className="font-medium text-gray-900">Eventos e Dinâmicas</h5>
              </div>
              <p className="text-sm text-gray-600">
                Ideal para criar equipes em jogos, desafios de grupo ou atividades colaborativas em eventos e workshops.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <BrainIcon className="h-5 w-5 text-teal-600" />
                <h5 className="font-medium text-gray-900">Team Building</h5>
              </div>
              <p className="text-sm text-gray-600">
                Excelente para dinâmicas de integração em empresas ou treinamentos corporativos, promovendo interação e cooperação.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-teal-600" />
                <h5 className="font-medium text-gray-900">Jogos e Competição</h5>
              </div>
              <p className="text-sm text-gray-600">
                Use para formar times em campeonatos, partidas amistosas ou qualquer tipo de competição em grupo.
              </p>
            </div>
          </div>
        </div>
      </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
          <Perguntas />
        </div> 
        
      </main>
    </div>
  );
}