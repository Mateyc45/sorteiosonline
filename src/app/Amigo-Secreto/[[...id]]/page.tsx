import { Metadata, ResolvingMetadata } from 'next';
import { supabase } from '@/lib/supabase';
// Importa o componente visual
import { SecretSantaClient } from '@/components/AmigoSecretoClient';

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
      title: 'Sorteador de Amigo Secreto Online | Grátis e Seguro | VamoSortear',
      description: 'Organize seu Amigo Oculto fácil e rápido. Adicione os nomes, e-mails e nós fazemos o sorteio e enviamos o resultado na hora. Sem cadastro.',
    };
  }

  // 2. Título Dinâmico (Busca no Banco)
  const { data } = await supabase
    .from('sorteios_amigo_secreto')
    .select('dados_evento')
    .eq('id_curto', id)
    .single();

  if (data) {
    const dados = data.dados_evento as any;
    const qtdParticipantes = dados.participantes?.length || 0;
    
    return {
      title: `Evento de Amigo Secreto Confirmado! | VamoSortear`,
      description: `O sorteio do Amigo Secreto com ${qtdParticipantes} participantes foi realizado com sucesso. Os e-mails já foram enviados!`,
      openGraph: {
        title: `🎁 Amigo Secreto Realizado (${qtdParticipantes} pessoas)`,
        description: 'Clique para ver os detalhes do evento e as regras do sorteio.',
      },
    };
  }

  return {
    title: 'Sorteio não encontrado | VamoSortear',
  };
}

export default function Page() {
  return <SecretSantaClient />;
}