import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente visual
import { RoletaDrawClient } from '@/components/RoletaClient';

type Props = {
  params: { id?: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id ? params.id[0] : null;

  // 1. Título Padrão
  if (!id) {
    return {
      title: 'Roleta Online Personalizada | Gire a Roleta Grátis | VamoSortear',
      description: 'Crie sua roleta personalizada e faça sorteios aleatórios de forma divertida. Ideal para jogos, sorteios de prêmios e decisões em grupo.',
    };
  }

  // 2. Título Dinâmico (Busca no Banco)
  const { data } = await supabase
    .from('sorteios_roleta')
    .select('dados_roleta')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.dados_roleta as any;
    const vencedor = dados.resultado || 'Item Sorteado';
    
    return {
      title: `Vencedor da Roleta: ${vencedor} | Resultado VamoSortear`,
      description: `A roleta girou e o resultado foi: ${vencedor}. Confira o sorteio oficial e auditável.`,
      openGraph: {
        title: `🎡 Resultado da Roleta: ${vencedor}`,
        description: 'Clique para ver o resultado deste giro de roleta.',
      },
    };
  }

  return {
    title: 'Roleta não encontrada | VamoSortear',
  };
}

export default function Page() {
  return <RoletaDrawClient />;
}