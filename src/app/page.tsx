import Link from 'next/link';
import { 
  Dice1Icon, TextIcon, ListIcon, GiftIcon, 
  SparklesIcon, StarIcon, ShieldCheckIcon, 
  ClockIcon, LifeBuoy, Users 
} from 'lucide-react';
import { RaffleCard } from '@/components/RaffleCard';
import Perguntas from '@/components/perguntas';
import type { Metadata } from 'next';

// 1. SEO da Página Inicial
export const metadata: Metadata = {
  title: "VamoSortear - O Jeito Mais Fácil e Simples de sortear algo! Totalmente Gratis",
  description: "Sorteie números, palavras, sequências e organize amigo secreto de forma simples, rápida e gratuita no VamoSortear.",
  keywords: ["sorteio", "sorteios", "vamo sortear", "sorteio online", "sortear numero", "amigo secreto", "roleta"],
  alternates: {
    canonical: "https://vamosortear.com.br/",
  },
  openGraph: {
    images: ['https://vamosortear.com.br/logo.png'],
  },
};

export default function Home() {
  // 2. Dados dos Cards
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
      path: '/Roleta',
      gradient: 'from-yellow-400 to-yellow-100',
    },
    {
      title: 'Sortear Equipes',
      description: 'Faça o sorteio de equipes para diversas atividades',
      icon: <Users className="h-6 w-6" style={{ color: '#0F766E' }} />,
      path: '/Sortear-Equipes',
      gradient: 'from-teal-400 to-teal-100',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="mt-0 pt-0 space-y-12">
      
      {/* 1. SEÇÃO DE TEXTO E HEADER */}
      <div className="text-center px-4 mt-8">
        
        {/* Badge "Mais de 10.000..." */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm font-medium mb-6 shadow-sm">
          <SparklesIcon className="h-4 w-4" />
          <span>Mais de 10.000 sorteios realizados!</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
          Vamos Sortear Online e Grátis
        </h1>

        {/* Textos Descritivos */}
        <div className="space-y-4">
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Precisa realizar sorteios de forma rápida, segura e transparente?
            O VamoSortear é a solução ideal para você! Nossa plataforma simplifica todo o processo em apenas alguns cliques.
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Sorteie nomes, números ou itens com resultados 100% confiáveis.
            Perfeito para empresas, influenciadores e qualquer pessoa que busque praticidade.
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Escolha uma das opções e comece agora mesmo, sem cadastro!
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            COMECE SEU SORTEIO AGORA! Junte-se aos milhares de brasileiros que já confiam em nossa plataforma.
          </p>
        </div>
      </div>

      {/* 2. GRID DOS CARDS (Transformado) */}
      <div className="flex flex-col-reverse lg:flex-col gap-2 items-center px-4">
        
        {/* Features Grid */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 mb-8">
          {raffleTypes.map((raffle) => (
            <Link
              key={raffle.title}
              href={raffle.path} /* MUDANÇA PRINCIPAL: 'to' vira 'href' */
              className="w-full sm:w-[550px] min-h-[100px] hover:no-underline group"
            >
              <RaffleCard
                title={raffle.title}
                description={raffle.description}
                icon={raffle.icon}
                gradient={raffle.gradient}
                /* onClick removido pois o Link do Next já gerencia o clique */
              />
            </Link>
          ))}
        </div>

      </div>
    

      {/* Benefits Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 ml-16 mr-16">
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

      {/* SEO Texts Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 ml-16 mr-16">
         <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
           Ideal para Diversos Tipos de Sorteio
         </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="font-semibold text-center text-gray-900 mb-2">🎯 Rifas e Bingos</h3>
                <p className="text-gray-600">Perfeito para sorteios de rifas, bingos e eventos beneficentes.
                  Ideal para escolas, igrejas, comunidades, ONGs e qualquer iniciativa que precise arrecadar fundos ou promover entretenimento.
                  Com ele, você organiza sorteios de forma prática, divertida e eficiente, garantindo transparência e engajamento entre os participantes.
                  Seja em festas juninas, almoços solidários, campanhas de doações ou eventos familiares, essa é a solução ideal para tornar tudo mais especial, animado e inesquecível!
                </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="font-semibold text-center text-gray-900 mb-2">🎓 Educação</h3>
                <p className="text-gray-600">Ideal para professores sortearem alunos ou formarem grupos de maneira prática e imparcial.
                  Perfeito para dinamizar atividades em sala de aula, incentivar a participação e tornar as aulas mais interativas.
                  Com essa ferramenta, é possível montar grupos aleatórios, escolher alunos para apresentações ou responder questões, tudo com agilidade e transparência.
                  Seja no ensino fundamental, médio ou superior, ela contribui para uma gestão mais organizada da turma.
                </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="font-semibold text-center text-gray-900 mb-2">🎁 Amigo Secreto</h3>
                <p className="text-gray-600">Organize amigos secretos com praticidade e envio automático por e-mail para todos os participantes.
                  Perfeito para confraternizações de fim de ano, festas escolares, empresas, grupos de amigos ou reuniões familiares.
                  A ferramenta garante sigilo, evita sorteios repetidos e facilita toda a dinâmica, mesmo com participantes em diferentes locais.
                  Com poucos cliques, cada pessoa recebe seu amigo secreto por e-mail, de forma segura, rápida e personalizada!
                </p>
            </div>
             <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="font-semibold text-center text-gray-900 mb-2">🎮 Lives e Eventos</h3>
                <p className="text-gray-600">Sorteie prêmios e brindes durante transmissões ao vivo de forma simples, rápida e interativa.
                  Perfeito para lives em redes sociais, eventos online, webinars, workshops ou campanhas de marketing digital.
                  Engaje seu público com sorteios em tempo real, aumentando a participação, a audiência e o alcance da sua transmissão.
                  Com uma ferramenta prática e segura, você garante transparência nos resultados e cria momentos inesquecíveis para seus seguidores, clientes ou participantes!
                </p>
            </div>
             <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="font-semibold text-center text-gray-900 mb-2">👥 Empresas</h3>
                <p className="text-gray-600">Realize sorteios para funcionários, clientes ou promoções de forma prática, segura e personalizada.
                  Ideal para empresas que desejam reconhecer colaboradores, fidelizar clientes ou promover ações de marketing.
                  Com essa solução, você organiza sorteios internos, premiações de metas ou campanhas promocionais de forma profissional e transparente.
                  Aumente o engajamento, valorize seu público e fortaleça a imagem da sua marca com sorteios que fazem a diferença em qualquer ocasião!
                </p>
            </div>
             <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="font-semibold text-center text-gray-900 mb-2">🎲 Jogos e Diversão</h3>
                <p className="text-gray-600">Crie jogos e brincadeiras com sorteios aleatórios para animar qualquer ocasião de forma divertida e criativa.
                  Ideal para festas, encontros familiares, dinâmicas escolares, eventos corporativos ou momentos de lazer entre amigos.
                  A ferramenta permite gerar sorteios rápidos e imparciais, criando desafios, duplas, tarefas ou rodadas de perguntas com total praticidade.
                  Transforme suas atividades em experiências envolventes, espontâneas e inesquecíveis.
                </p>
              </div>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4 ml-16 mr-16">
          <Perguntas />
        </div>
      </div>
    </div>
  );
}