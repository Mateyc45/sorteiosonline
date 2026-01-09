import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente visual
import { SequenceDrawClient } from '@/components/SortearSquenciaClient';

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
      title: 'Sorteador de Sequência de Números | VamoSortear',
      description: 'Gere uma lista de números aleatórios sem repetição. Ideal para jogos, dinâmicas e sorteios múltiplos.',
    };
  }

  // 2. Título Dinâmico (Busca no Banco)
  const { data } = await supabase
    .from('sorteios_sequencia')
    .select('dados_sequencia')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.dados_sequencia as any;
    const resultado = dados.result ? dados.result.join(', ') : 'Sequência';
    
    return {
      title: `Sequência Sorteada: ${resultado} | Resultado`,
      description: `Confira o resultado oficial: ${resultado}. Sorteio realizado em VamoSortear.com.br`,
      openGraph: {
        title: `🏆 Resultado: ${resultado}`,
        description: 'Clique para validar esta sequência numérica.',
      },
    };
  }

  return {
    title: 'Sorteio não encontrado | VamoSortear',
  };
}

export default function Page() {
  return <SequenceDrawClient />;
}