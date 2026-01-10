import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente visual
import { SequenceDrawClient } from '@/components/SortearSquenciaClient';

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

  // --- Caso 1: Página Principal (SEO Focado em Buscas) ---
  if (!id) {
    return {
      title: 'Gerador de Sequência Numérica e Números Aleatórios | VamoSortear',
      description: 'Gere listas de números aleatórios sem repetição. Ideal para bingo, definir ordem de apresentação, sorteios múltiplos e jogos de loteria.',
      keywords: [
        'gerador de sequência', 'números aleatórios sem repetição', 'sortear ordem', 
        'embaralhar números', 'gerador de bingo', 'sorteio de números', 
        'lista de números aleatórios', 'vamosortear'
      ],
      alternates: {
        canonical: `${BASE_URL}/sortear/sequencia`,
      },
      openGraph: {
        title: 'Gerador de Sequência de Números Online',
        description: 'Precisa de uma lista de números aleatória? Gere sequências sem repetição agora mesmo.',
        url: `${BASE_URL}/sortear/sequencia`,
        siteName: 'VamoSortear',
        locale: 'pt_BR',
        type: 'website',
        images: [
          {
            url: `${BASE_URL}/og-sequencia.jpg`, // Crie essa imagem!
            width: 1200,
            height: 630,
            alt: 'Sorteador de Sequência Numérica VamoSortear',
          },
        ],
      },
    };
  }

  // --- Caso 2: Resultado (Busca no Banco) ---
  const { data } = await supabase
    .from('sorteios_sequencia')
    .select('dados_sequencia')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.dados_sequencia as any;
    // Formata o resultado para não estourar o limite de caracteres do título
    // Se for um array, junta com vírgulas.
    const rawResult = dados.result || [];
    const resultString = Array.isArray(rawResult) ? rawResult.join(', ') : String(rawResult);
    const resultPreview = resultString.length > 40 ? `${resultString.substring(0, 37)}...` : resultString;
    
    return {
      title: `Sequência: ${resultPreview} | Resultado VamoSortear`,
      description: `Resultado oficial gerado: ${resultString}. Sorteio auditável e seguro gerado em VamoSortear.com.br`,
      robots: {
        index: false, // Não indexar resultados individuais (recomendado)
        follow: true,
      },
      openGraph: {
        title: `🔢 Resultado: ${resultPreview}`,
        description: 'Clique para validar e ver a sequência completa sorteada.',
        url: `${BASE_URL}/sortear/sequencia/${id}`,
        type: 'article',
        images: [
          {
            url: `${BASE_URL}/og-result-sequencia.jpg`,
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

  // Busca Server-Side para passar ao cliente
  if (id) {
    const { data } = await supabase
      .from('sorteios_sequencia')
      .select('*')
      .eq('id_curto', id)
      .single();

    initialData = data;
  }

  // JSON-LD: Schema.org específico
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Gerador de Sequência Numérica VamoSortear',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    description: 'Ferramenta para gerar listas de números aleatórios em sequência, sem repetição.',
    featureList: 'Gerador de sequência, números sem repetição, ordenação aleatória',
    url: `${BASE_URL}/sortear/sequencia`,
  };

  return (
    <>
      {!id && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <SequenceDrawClient/>
    </>
  );
}