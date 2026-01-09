import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente visual
import { TeamDrawClient } from '@/components/SortearEquipesClient';

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
      title: 'Sorteador de Equipes e Times Online | VamoSortear',
      description: 'Divida grupos de pessoas em times aleatórios de forma rápida e justa. Perfeito para escolas, esportes e dinâmicas de grupo.',
    };
  }

  // 2. Título Dinâmico (Busca no Banco)
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
      title: `Resultado: ${qtdEquipes} Equipes Formadas | VamoSortear`,
      description: `Confira a divisão das ${qtdEquipes} equipes formadas com ${qtdPessoas} participantes. Sorteio auditável e seguro.`,
      openGraph: {
        title: `🏆 ${qtdEquipes} Equipes Sorteadas`,
        description: 'Clique para ver quem caiu em qual time neste sorteio.',
      },
    };
  }

  return {
    title: 'Sorteio não encontrado | VamoSortear',
  };
}

export default function Page() {
  return <TeamDrawClient />;
}