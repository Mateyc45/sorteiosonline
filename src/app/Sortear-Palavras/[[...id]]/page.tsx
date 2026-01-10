import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente que criamos
import { WordDrawClient } from '@/components/SortearPalavrasClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vamosortear.com.br';

// Atualizado para Promise (Padrão Next.js 15+)
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

  // --- Caso 1: Página Inicial (SEO Forte) ---
  if (!id) {
    return {
      title: 'Sorteador de Nomes e Lista de Palavras | VamoSortear',
      description: 'Ferramenta grátis para sortear nomes de uma lista. Ideal para sorteios de Instagram, amigos secretos, bingo de nomes e decisões aleatórias.',
      keywords: [
        'sorteador de nomes', 'sortear lista', 'random picker', 
        'sorteio instagram', 'roleta de nomes', 'escolher nome aleatório', 
        'sorteio online', 'vamosortear'
      ],
      alternates: {
        canonical: `${BASE_URL}/sortear/nomes`,
      },
      openGraph: {
        title: 'Sorteador de Nomes e Listas Online',
        description: 'Cole sua lista de nomes e descubra o vencedor agora. Rápido, fácil e sem cadastro.',
        url: `${BASE_URL}/sortear/nomes`,
        siteName: 'VamoSortear',
        locale: 'pt_BR',
        type: 'website',
        images: [
          {
            url: `${BASE_URL}/og-nomes.jpg`, // Crie essa imagem!
            width: 1200,
            height: 630,
            alt: 'Sorteador de Nomes VamoSortear',
          },
        ],
      },
    };
  }

  // --- Caso 2: Resultado de Sorteio (Busca no Banco) ---
  const { data } = await supabase
    .from('sorteios_palavras') // Verifique se o nome da tabela está correto
    .select('palavras_sorteadas')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.palavras_sorteadas as any;
    // Tenta pegar o vencedor único ou conta quantos foram sorteados
    const vencedor = dados.resultado 
      ? (Array.isArray(dados.resultado) ? dados.resultado.join(', ') : dados.resultado) 
      : 'Sorteio Realizado';
    
    // Corta o texto se for muito longo para o título
    const tituloVencedor = vencedor.length > 50 ? `${vencedor.substring(0, 47)}...` : vencedor;

    return {
      title: `🏆 Vencedor: ${tituloVencedor} | VamoSortear`,
      description: `O sorteio foi realizado! O resultado oficial é: ${vencedor}. Clique para ver a auditoria completa.`,
      robots: {
        index: false, // Evita indexar resultados "lixo" de usuários
        follow: true,
      },
      openGraph: {
        title: `🎉 Resultado: ${tituloVencedor}`,
        description: 'Clique para conferir a validação deste sorteio.',
        url: `${BASE_URL}/sortear/nomes/${id}`,
        type: 'article',
        images: [
          {
            url: `${BASE_URL}/og-result-nomes.jpg`,
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

  // Busca Server-Side para Hydration rápida
  if (id) {
    const { data } = await supabase
      .from('sorteios_palavras')
      .select('*')
      .eq('id_curto', id)
      .single();

    initialData = data;
  }

  // Schema.org para o Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sorteador de Nomes VamoSortear',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    description: 'Ferramenta para sortear um ou mais nomes de uma lista de texto.',
    featureList: 'Sorteio de lista, filtro de duplicados, auditoria de resultado',
    url: `${BASE_URL}/sortear/nomes`,
  };

  return (
    <>
      {!id && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <WordDrawClient/>
    </>
  );
}