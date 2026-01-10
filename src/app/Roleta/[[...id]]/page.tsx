import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
import { RoletaDrawClient } from '@/components/RoletaClient'; // Confirme o nome do componente

type Props = {
  params: Promise<{ id?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id?.[0] || null;

  // --- CONFIGURAÇÃO PADRÃO (SEO GLOBAL) ---
  const baseKeywords = [
    'roleta online', 'roleta personalizada', 'girar roleta', 
    'sorteio aleatório', 'roda da fortuna', 'decisão aleatória', 
    'sorteador de nomes', 'vamosortear'
  ];

  // 1. CENÁRIO: PÁGINA INICIAL DA ROLETA (CRIAR)
  if (!id) {
    return {
      title: 'Roleta Online Personalizada | Gire a Roleta Grátis | VamoSortear',
      description: 'Crie sua roleta personalizada e faça sorteios aleatórios de forma divertida. Ideal para jogos, sorteios de prêmios, sala de aula e decisões em grupo.',
      applicationName: 'Vamo Sortear',
      authors: [{ name: 'Vamo Sortear Team', url: 'https://vamosortear.com.br' }],
      keywords: baseKeywords,
      alternates: {
        canonical: 'https://vamosortear.com.br/Roleta',
      },
      openGraph: {
        title: 'Crie sua Roleta Personalizada Online',
        description: 'Ferramenta gratuita para criar roletas e fazer sorteios. Gire agora!',
        url: 'https://vamosortear.com.br/Roleta',
        siteName: 'Vamo Sortear',
        images: [
          {
            url: 'https://vamosortear.com.br/assets/images/Roleta-share.png', // ⚠️ Coloque uma imagem real aqui se tiver
            width: 1200,
            height: 630,
            alt: 'Roleta Online Vamo Sortear',
          },
        ],
        locale: 'pt_BR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Roleta Online Personalizada',
        description: 'Crie roletas e faça sorteios agora mesmo.',
        // images: ['...'],
      },
    };
  }

  // 2. CENÁRIO: RESULTADO DE SORTEIO (COM ID)
  const { data } = await supabase
    .from('sorteios_roleta')
    .select('dados_roleta')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.dados_roleta as any;
    const vencedor = dados.resultado || 'Item Sorteado';
    
    return {
      title: `Vencedor: ${vencedor} | Roleta VamoSortear`,
      description: `A roleta girou e o resultado foi: ${vencedor}. Confira o sorteio oficial e auditável no Vamo Sortear.`,
      robots: {
        index: false, // Não indexar resultados individuais no Google (evita spam)
        follow: true, // Mas seguir os links da página
      },
      openGraph: {
        title: `🎡 Resultado da Roleta: ${vencedor}`,
        description: `O sorteio foi realizado! Clique para ver o resultado oficial e auditável.`,
        url: `https://vamosortear.com.br/Roleta/${id}`,
        siteName: 'Vamo Sortear',
        images: [
          {
            url: 'https://vamosortear.com.br/assets/images/resultado-roleta.png', // Imagem de "Resultado"
            width: 1200,
            height: 630,
          },
        ],
        type: 'article',
      },
    };
  }

  // 3. CENÁRIO: ID NÃO ENCONTRADO
  return {
    title: 'Roleta não encontrada | VamoSortear',
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <RoletaDrawClient />;
}