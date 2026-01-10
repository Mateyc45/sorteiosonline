import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente visual
import { TeamDrawClient } from '@/components/SortearEquipesClient';

// Defina a URL base do seu site (se já não estiver no layout global)
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vamosortear.com.br';

type Props = {
  params: Promise<{ id?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id ? resolvedParams.id[0] : null;

  // --- Caso 1: Título Padrão (Landing Page da Ferramenta) ---
  if (!id) {
    return {
      title: 'Sorteador de Equipes e Times Aleatórios | VamoSortear',
      description: 'Ferramenta grátis para dividir grupos e tirar times aleatoriamente. Ideal para futebol, vôlei, sala de aula, jogos e dinâmicas de grupo. Rápido e justo.',
      keywords: [
        'sorteador de equipes', 'tirar times', 'gerador de times', 
        'dividir grupos', 'sorteio de times futebol', 'randomizar equipes', 
        'formar duplas', 'separar times', 'vamosortear'
      ],
      alternates: {
        canonical: `${BASE_URL}/Sortear-Equipes`,
      },
      openGraph: {
        title: 'Sorteador de Equipes e Times Aleatórios',
        description: 'Divida a galera em times justos e aleatórios em segundos. Perfeito para esportes e jogos.',
        url: `${BASE_URL}/Sortear-Equipes`,
        siteName: 'VamoSortear',
        locale: 'pt_BR',
        type: 'website',
        images: [
          {
            url: `${BASE_URL}/og-equipes.jpg`, // Crie essa imagem se não tiver!
            width: 1200,
            height: 630,
            alt: 'Sorteador de Equipes VamoSortear',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Sorteador de Equipes Online',
        description: 'Tire times e divida grupos de forma rápida e justa.',
      },
    };
  }

  // --- Caso 2: Título Dinâmico (Resultado de Sorteio Salvo) ---
  const { data } = await supabase
    .from('sorteios_equipes')
    .select('dados_equipes')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.dados_equipes as any;
    const qtdEquipes = dados.numEquipes || 0;
    const qtdPessoas = dados.participantes?.length || 0;
    
    return {
      title: `Resultado: ${qtdEquipes} Equipes Formadas (${qtdPessoas} pessoas) | VamoSortear`,
      description: `Veja o resultado oficial do sorteio. Foram formadas ${qtdEquipes} equipes com ${qtdPessoas} participantes. Sorteio auditável e seguro.`,
      robots: {
        index: false, // Opcional: Geralmente não queremos indexar resultados específicos de usuários para não poluir o Google, mas pode deixar true se quiser tráfego.
        follow: true,
      },
      openGraph: {
        title: `🏆 Resultado: ${qtdEquipes} Equipes Sorteadas`,
        description: `Clique para ver quem caiu em qual time. Sorteio realizado no VamoSortear.`,
        url: `${BASE_URL}/sortear/equipes/${id}`,
        type: 'article',
        images: [
          {
            url: `${BASE_URL}/og-result-equipes.jpg`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }

  return {
    title: 'Sorteio não encontrado | VamoSortear',
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id ? resolvedParams.id[0] : null;
  
  let initialData = null;

  if (id) {
    const { data } = await supabase
      .from('sorteios_equipes')
      .select('*')
      .eq('id_curto', id)
      .single();
      
    initialData = data;
  }

  // JSON-LD: Schema.org para SoftwareApplication (Isso ajuda muito no SEO Técnico)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sorteador de Equipes VamoSortear',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    description: 'Ferramenta online gratuita para dividir pessoas em equipes aleatórias e tirar times para esportes e jogos.',
    featureList: 'Sorteio de times, divisão de grupos, filtro de balanceamento',
    url: `${BASE_URL}/sortear/equipes`,
  };

  return (
    <>
      {/* Injeta o Schema.org apenas se for a página principal (sem ID), ou em ambas se preferir */}
      {!id && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      
      <TeamDrawClient/>
    </>
  );
}