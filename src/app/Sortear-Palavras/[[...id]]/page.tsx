import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente que criamos acima
import { WordDrawClient } from '@/components/SortearPalavrasClient';

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
      title: 'Sorteador de Nomes e Palavras | Lista Aleatória | VamoSortear',
      description: 'Ferramenta grátis para sortear nomes ou palavras de uma lista. Ideal para sorteios de Instagram, amigos secretos e dinâmicas de grupo.',
    };
  }

  // 2. Título Dinâmico (Com ID - Busca no Banco)
  const { data } = await supabase
    .from('sorteios_palavras')
    .select('palavras_sorteadas')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.palavras_sorteadas as any;
    const vencedor = dados.resultado || 'Sorteio';
    
    return {
      title: `Vencedor: ${vencedor} | Resultado do Sorteio`,
      description: `O resultado oficial foi gerado! O vencedor do sorteio foi: ${vencedor}. Confira a auditoria completa no VamoSortear.`,
      openGraph: {
        title: `🏆 Vencedor: ${vencedor}`,
        description: 'Clique para conferir o resultado oficial e auditável deste sorteio de palavras.',
      },
    };
  }

  return {
    title: 'Sorteio não encontrado | VamoSortear',
  };
}

// Renderiza o componente cliente
export default function Page() {
  return <WordDrawClient />;
}