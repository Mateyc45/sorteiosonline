import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente cliente
import { NumberDrawClient } from '@/components/SortearNumerosClient'; // Confirme se o caminho é esse mesmo

// --- 1. AJUSTE NEXT.JS 15: PARAMS AGORA É PROMISE ---
type Props = {
  params: Promise<{ id?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await obrigatório antes de ler o ID
  const resolvedParams = await params;
  const id = resolvedParams.id?.[0] || null;

  // Palavras-chave poderosas para SEO
  const baseKeywords = [
    'sortear', 'sortear numero','sortea numero','sortea',
    'sorteador de números', 'gerar número aleatório', 'sorteio online', 
    'random number generator', 'rifa online', 'bingo', 
    'sorteio instagram', 'número da sorte', 'sortear 1 a 100',
    'sortear aleatoreamente', 'sorteador online', 'sortear números', 
    'gerador de números aleatórios', 'roleta online',
    'roleta personalizada', 'sortear nomes', 'sorteador de lista',
    'amigo secreto online', 'sortear times', 'gerador de equipes',
    'dividir grupos', 'números sem repetição', 'sorteio instagram',
    'sorteio rápido', 'bingo online', 'roda da fortuna', 'tomar decisão',
    'sorteio de rifa', 'gerar sequência', 'sorteador grátis', 'vamo sortear', 
    'app de sorteio', 'sorteio auditável', 'números da mega sena', 'números da lotofácil', 
    'sorteio de brindes', 'dinâmica de grupo', 'escolher vencedor', 'randomizer', 'sorteio aleatório'
  ];

  // --- CENÁRIO 1: PÁGINA INICIAL (CRIAR SORTEIO) ---
  if (!id) {
    return {
      title: 'Sorteador de Números Aleatórios Online | Vamo Sortear',
      description: 'Ferramenta rápida, segura e imparcial para sortear números. Defina o intervalo (ex: 1 a 100) e a quantidade. Ideal para rifas, sorteios de Instagram e bingos.',
      applicationName: 'Vamo Sortear',
      authors: [{ name: 'Vamo Sortear', url: 'https://vamosortear.com.br' }],
      keywords: baseKeywords,
      alternates: {
        canonical: 'https://vamosortear.com.br/Sortear-Numero',
      },
      openGraph: {
        title: 'Sorteador de Números Online Grátis',
        description: 'Precisa sortear um número? Use nossa ferramenta rápida e sem repetições.',
        url: 'https://vamosortear.com.br/Sortear-Numero',
        siteName: 'Vamo Sortear',
        images: [
          {
            url: 'https://vamosortear.com.br/assets/images/sorteio-numeros.png', // Tente criar essa imagem depois
            width: 1200,
            height: 630,
            alt: 'Sorteador de Números Vamo Sortear',
          },
        ],
        locale: 'pt_BR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Sorteador de Números Online',
        description: 'Faça sorteios de números de forma confiável.',
      },
    };
  }

  // --- CENÁRIO 2: RESULTADO DE SORTEIO (COM ID) ---
  const { data } = await supabase
    .from('sorteios_realizados') // Confirme se a tabela é essa mesma
    .select('numeros_sorteados')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.numeros_sorteados as any;
    
    // Tratamento para garantir que exibe bonito mesmo se for array [10, 20] ou numero 10
    let resultadoDisplay = '';
    if (dados.numeros) {
       resultadoDisplay = Array.isArray(dados.numeros) 
          ? dados.numeros.join(', ') 
          : dados.numeros;
    } else {
       resultadoDisplay = 'Ver Resultado';
    }
    
    return {
      title: `Número Sorteado: ${resultadoDisplay} | Resultado VamoSortear`,
      description: `O resultado oficial foi gerado! Os números sorteados foram: ${resultadoDisplay}. Confira a auditoria completa e a data do sorteio.`,
      robots: {
        index: false, // IMPORTANTE: Não deixa o Google indexar resultados de usuários
        follow: true,
      },
      openGraph: {
        title: `🏆 Resultado do Sorteio: ${resultadoDisplay}`,
        description: 'Clique para ver o comprovante oficial e auditável deste sorteio de números.',
        url: `https://vamosortear.com.br/Sortear-Numero/${id}`,
        siteName: 'Vamo Sortear',
        images: [
          {
            url: 'https://vamosortear.com.br/assets/images/resultado-numeros.png',
            width: 1200,
            height: 630,
          },
        ],
        type: 'article',
      },
    };
  }

  // --- CENÁRIO 3: NÃO ENCONTRADO ---
  return {
    title: 'Sorteio não encontrado | VamoSortear',
    robots: { index: false, follow: false },
  };
}

// Renderiza o componente cliente com JSON-LD
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sorteador de Números VamoSortear',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    description: 'Ferramenta online gratuita para sortear números aleatórios. Defina o intervalo e a quantidade de números.',
    featureList: 'Sorteio de números, intervalo personalizado, sem repetição',
    url: 'https://vamosortear.com.br/Sortear-Numero',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NumberDrawClient />
    </>
  );
}