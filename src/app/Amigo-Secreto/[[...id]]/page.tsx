import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente visual
import { SecretSantaClient } from '@/components/AmigoSecretoClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vamosortear.com.br';

// Atualizado para Promise (Compatibilidade Next.js 15+)
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

  // --- Caso 1: Página Principal (Landing Page) ---
  if (!id) {
    return {
      title: 'Sorteador de Amigo Secreto Online e Amigo Oculto | VamoSortear',
      description: 'Organize seu Amigo Secreto grátis, rápido e sem cadastro. Sorteio automático com envio por E-mail ou WhatsApp. Perfeito para festas de Natal e empresas.',
      keywords: [
        'amigo secreto online', 'amigo oculto', 'sorteio amigo secreto', 
        'site de amigo secreto', 'organizar amigo secreto', 'amigo secreto whatsapp', 
        'sorteio de natal', 'vamosortear', 'sem cadastro'
      ],
      alternates: {
        canonical: `${BASE_URL}/sortear/amigo-secreto`,
      },
      openGraph: {
        title: 'Organizador de Amigo Secreto Online (Grátis)',
        description: 'Faça o sorteio do seu Amigo Oculto em segundos. Sem burocracia e sem cadastro.',
        url: `${BASE_URL}/sortear/amigo-secreto`,
        siteName: 'VamoSortear',
        locale: 'pt_BR',
        type: 'website',
        images: [
          {
            url: `${BASE_URL}/og-amigo-secreto.jpg`, // Sugestão: Crie uma imagem com tema natalino/festivo
            width: 1200,
            height: 630,
            alt: 'Sorteador de Amigo Secreto VamoSortear',
          },
        ],
      },
    };
  }

  // --- Caso 2: Evento Criado (Busca no Banco) ---
  const { data } = await supabase
    .from('sorteios_amigo_secreto')
    .select('dados_evento')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.dados_evento as any;
    const qtdParticipantes = dados.participantes?.length || 0;
    const nomeEvento = dados.nomeEvento || 'Amigo Secreto';
    
    return {
      title: `Evento: ${nomeEvento} | Sorteio Realizado`,
      description: `O sorteio do Amigo Secreto "${nomeEvento}" com ${qtdParticipantes} participantes foi realizado. Verifique se os convites foram enviados.`,
      robots: {
        index: false, // Resultados de amigo secreto geralmente são privados/específicos, melhor não indexar para evitar spam
        follow: true,
      },
      openGraph: {
        title: `🎁 ${nomeEvento} - Sorteio Realizado`,
        description: `Evento com ${qtdParticipantes} participantes organizado no VamoSortear.`,
        url: `${BASE_URL}/sortear/amigo-secreto/${id}`,
        type: 'article',
        images: [
          {
            url: `${BASE_URL}/og-result-amigo-secreto.jpg`,
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

  // Busca os dados no servidor (Server-Side Fetching)
  if (id) {
    const { data } = await supabase
      .from('sorteios_amigo_secreto')
      .select('*')
      .eq('id_curto', id)
      .single();

    initialData = data;
  }

  // JSON-LD: Schema.org para Aplicação
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Organizador de Amigo Secreto VamoSortear',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    description: 'Ferramenta para organizar sorteios de Amigo Secreto e Amigo Oculto online.',
    featureList: 'Envio por e-mail, restrições de sorteio, compartilhamento WhatsApp',
    url: `${BASE_URL}/sortear/amigo-secreto`,
  };

  return (
    <>
      {!id && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <SecretSantaClient/>
    </>
  );
}