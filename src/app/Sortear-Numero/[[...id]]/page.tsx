import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente cliente
import { NumberDrawClient } from '@/components/SortearNumerosClient';

// --- CONFIGURAÇÃO DAS META TAGS DINÂMICAS (SEO) ---
type Props = {
  params: { id?: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id ? params.id[0] : null;

  // 1. Título Padrão (Sem ID)
  if (!id) {
    return {
      title: 'Sorteador de Números Online Grátis | VamoSortear',
      description: 'Ferramenta rápida e segura para sortear números aleatórios entre um intervalo. Ideal para rifas, sorteios de Instagram e bingos.',
    };
  }

  // 2. Título Dinâmico (Com ID - Busca no Banco)
  const { data } = await supabase
    .from('sorteios_realizados')
    .select('numeros_sorteados')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.numeros_sorteados as any;
    const numeroSorteado = dados.numeros; // Pegamos o número
    
    return {
      title: `Número Sorteado: ${numeroSorteado} | Resultado VamoSortear`,
      description: `O resultado oficial foi gerado! O número sorteado foi: ${numeroSorteado}. Confira a auditoria completa.`,
      openGraph: {
        title: `🏆 Resultado do Sorteio: ${numeroSorteado}`,
        description: 'Clique para ver o comprovante oficial e auditável deste sorteio.',
      },
    };
  }

  return {
    title: 'Sorteio não encontrado | VamoSortear',
  };
}

// Renderiza o componente cliente
export default function Page() {
  return <NumberDrawClient />;
}