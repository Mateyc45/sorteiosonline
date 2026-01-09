'use client';

import { useState, useEffect } from 'react';
import { 
  Users, HomeIcon, Dice1, Type, ListOrdered, Gift, Sparkles, 
  LifeBuoy, Save, RotateCcw, CheckCircle2, Share2, Copy, Check 
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { generateRandomNumber } from '@/lib/utils';
import { ShareButton } from '@/components/ShareButton';
import { RaffleCard } from '@/components/RaffleCard';
import Perguntas from '@/components/perguntas';
import { supabase } from '@/lib/supabase';

// Interface
interface SorteioSalvo {
  numeros: number; // No banco salvamos como "numeros", mas é um único número aqui
  min: number;
  max: number;
}

const raffleTypes = [
  {
    title: 'Sortear Palavras',
    description: 'Sorteie palavras ou nomes de uma lista personalizada',
    icon: <Type className="h-6 w-6 text-green-600" />,
    path: '/Sortear-Palavras',
    gradient: 'from-green-500 to-emerald-400',
  },
  {
    title: 'Sortear uma sequência',
    description: 'Gere sequências numéricas aleatórias para diversos fins',
    icon: <ListOrdered className="h-6 w-6 text-purple-600" />,
    path: '/Sortear-Sequencia',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    title: 'Amigo Secreto',
    description: 'Organize seu amigo secreto com envio automático por email',
    icon: <Gift className="h-6 w-6 text-red-600" />,
    path: '/Amigo-Secreto',
    gradient: 'from-red-500 to-orange-400',
  },
  {
    title: 'Roleta',
    description: 'Faça um sorteio utilizando uma roleta',
    icon: <LifeBuoy className="h-6 w-6 text-red-600" />,
    path: '/Roleta',
    gradient: 'from-yellow-400 to-yellow-100',
  },
  {
    title: 'Sortear Equipes',
    description: 'Faça o sorteio de equipes para diversas atividades',
    icon: <Users className="h-6 w-6" style={{ color: '#0F766E' }} />,
    path: '/Sortear-Equipes',
    gradient: 'from-teal-400 to-teal-100',
  }
];

export function NumberDrawClient() {
  const params = useParams();
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const router = useRouter();

  const [min, setMin] = useState<number | ''>(1);
  const [max, setMax] = useState<number | ''>(100);
  
  const [result, setResult] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);
  const [minValor, setMinValor] = useState(0);
  const [maxValor, setMaxValor] = useState(0);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [copied, setCopied] = useState(false);

  // SEO Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Sorteador de Números - VamoSortear",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "description": "Ferramenta online gratuita para sortear números aleatórios entre um intervalo definido.",
      }
    ]
  };

  const formatarData = (date: Date) => {
    const twoDigits = (num: number) => num.toString().padStart(2, '0');
    return `${twoDigits(date.getDate())}/${twoDigits(date.getMonth() + 1)}/${date.getFullYear()} - ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      const buscarSorteioSalvo = async () => {
        setLoadingBanco(true);
        const { data, error } = await supabase
          .from('sorteios_realizados')
          .select('*')
          .eq('id_curto', id)
          .single();

        if (data && !error) {
          const dadosSalvos = data.numeros_sorteados as SorteioSalvo;
          setResult(dadosSalvos.numeros);
          setMinValor(dadosSalvos.min);
          setMaxValor(dadosSalvos.max);
          
          const dataBanco = new Date(data.created_at);
          setsorteioTime(formatarData(dataBanco));
          
          setMin(dadosSalvos.min);
          setMax(dadosSalvos.max);
        }
        setLoadingBanco(false);
      };
      buscarSorteioSalvo();
    }
  }, [id]);

  const handleDraw = async () => {
    const minVal = Number(min);
    const maxVal = Number(max);

    if (min === '' || max === '') {
        alert("Por favor, preencha os campos Mínimo e Máximo.");
        return;
    }

    if (minVal >= maxVal) {
        alert("O valor mínimo deve ser menor que o máximo.");
        return;
    }

    setIsDrawing(true);
    setResult(null);

    const agora = new Date();
    setsorteioTime(formatarData(agora));
    setMinValor(minVal);
    setMaxValor(maxVal);

    await new Promise(resolve => setTimeout(resolve, 600));

    const drawnNumber = generateRandomNumber(minVal, maxVal);
    setResult(drawnNumber);
    setIsDrawing(false);
  };

  const handleSave = async () => {
    if (result === null) return;
    setIsSaving(true);

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const { data: recentes } = await supabase
        .from('sorteios_realizados')
        .select('created_at')
        .eq('user_ip', ip)
        .gt('created_at', new Date(Date.now() - 30000).toISOString());

      if (recentes && recentes.length > 0) {
        alert("Você salvou um sorteio recentemente. Aguarde 30 segundos.");
        setIsSaving(false);
        return;
      }

      const novoId = Math.random().toString(36).substring(2, 8);

      const { error } = await supabase
        .from('sorteios_realizados')
        .insert([{
          id_curto: novoId,
          numeros_sorteados: { numeros: result, min: minValor, max: maxValor },
          user_ip: ip
        }]);

      if (!error) {
        router.push(`/Sortear-Numero/${novoId}`);
      } else {
        alert("Erro ao salvar o sorteio.");
        console.error(error);
      }

    } catch (err) {
      console.error("Erro geral:", err);
      alert("Ocorreu um erro ao conectar.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDrawAgain = () => {
      setResult(null);
      if (id) {
          router.push('/Sortear-Numero');
      }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loadingBanco) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Script SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Navegação" className="mb-6">
        <Link
          href="/"
          title="Voltar para a página inicial do VamoSortear"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors border border-gray-200 shadow-sm"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </nav>

      {/* BOX PRINCIPAL DA FERRAMENTA */}
      <main className="rounded-2xl border border-blue-100 bg-white p-6 md:p-8 shadow-xl shadow-blue-900/5">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-600 p-3 shadow-md shadow-blue-200 shrink-0">
              <Dice1 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {id ? `Resultado do Sorteio #${id}` : 'Sorteador de Números'}
              </h1>
              <p className="mt-1 text-gray-500 font-medium">
                  {id ? 'Confira abaixo o resultado oficial salvo.' : 'Ferramenta grátis para gerar números aleatórios.'}
              </p>
            </div>
          </div>
          
          {id && result !== null && (
            <div className="shrink-0">
                <ShareButton
                title="Resultado Oficial do Sorteio"
                text={`Confira o número sorteado: ${result}. Veja o resultado oficial em: https://vamosortear.com.br/Sortear-Numero/${id}`}
                />
            </div>
          )}
        </header>

        {/* INPUTS DE CONFIGURAÇÃO */}
        {result === null && (
            <section aria-label="Configuração do intervalo do sorteio" className="grid gap-6 sm:grid-cols-2 animate-in fade-in duration-300">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <label htmlFor="min" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Número Mínimo
                </label>
                <input
                type="number"
                id="min"
                value={min}
                disabled={!!id} 
                onChange={(e) => setMin(e.target.value === '' ? '' : Number(e.target.value))}
                className="block w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-2 text-3xl font-bold text-gray-900 focus:border-blue-600 focus:ring-0 placeholder-gray-300"
                placeholder="1"
                aria-label="Definir número mínimo"
                />
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <label htmlFor="max" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Número Máximo
                </label>
                <input
                type="number"
                id="max"
                value={max}
                disabled={!!id} 
                onChange={(e) => setMax(e.target.value === '' ? '' : Number(e.target.value))}
                className="block w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-2 text-3xl font-bold text-gray-900 focus:border-blue-600 focus:ring-0 placeholder-gray-300"
                placeholder="100"
                aria-label="Definir número máximo"
                />
            </div>
            </section>
        )}

        {/* BOTÃO DE AÇÃO PRINCIPAL */}
        {result === null && (
          <button
            onClick={handleDraw}
            disabled={isDrawing}
            title="Clique para gerar um número aleatório"
            className={`mt-8 relative w-full overflow-hidden rounded-xl px-6 py-5 text-center text-xl font-bold shadow-lg shadow-blue-600/20 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-[0.98]
              bg-blue-600 text-white hover:bg-blue-700`}
          >
            <div className="flex items-center justify-center gap-3">
               {isDrawing ? (
                 <>
                   <div className="h-6 w-6 animate-spin rounded-full border-3 border-white/30 border-t-white"></div>
                   <span>Processando...</span>
                 </>
               ) : (
                 <>
                   <Dice1 className="w-6 h-6" />
                   SORTEAR NÚMERO
                 </>
               )}
            </div>
          </button>
        )}

        {/* ÁREA DE RESULTADO (AZUL) */}
        {result !== null && (
          <section aria-label="Resultado do sorteio" className="mt-2 animate-in zoom-in-95 duration-500">
            
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-blue-50 to-white p-10 shadow-inner border border-blue-100 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600"></div>
              
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Número Sorteado</h2>
              
              <div className="flex items-center justify-center gap-6 relative z-10">
                  <Sparkles className="h-8 w-8 text-blue-500 animate-pulse hidden sm:block" />
                  <span className="text-8xl sm:text-9xl font-black text-blue-900 tracking-tighter drop-shadow-sm">
                    {result}
                  </span>
                  <Sparkles className="h-8 w-8 text-blue-500 animate-pulse hidden sm:block" />
              </div>
              
              {!id && (
                  <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Sorteio Autêntico
                  </div>
              )}
            </div>
            
            {/* Metadados do Sorteio */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
               <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center">
                  <span className="block text-gray-400 text-xs font-bold uppercase">Data do Sorteio</span>
                  <time className="block text-gray-700 font-mono mt-1">{sorteioTime}</time>
               </div>
               <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center">
                  <span className="block text-gray-400 text-xs font-bold uppercase">Intervalo</span>
                  <span className="block text-gray-700 font-mono mt-1">De <strong className="text-gray-900">{minValor}</strong> até <strong className="text-gray-900">{maxValor}</strong></span>
               </div>
            </div>

            {/* BOTÕES SECUNDÁRIOS */}
            <div className="mt-8 flex flex-col gap-3">
                {/* Botão Copiar Link (só se tiver ID) */}
                {id && (
                    <button
                    onClick={handleCopyLink}
                    className={`border-2 border-gray-200 w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:scale-[1.01]
                        ${copied ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
                    >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? "Link Copiado!" : "Copiar Link do Resultado"}
                    </button>
                )}

                <button
                    onClick={handleDrawAgain}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-6 py-4 text-lg font-bold text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >
                    <RotateCcw className="w-5 h-5" />
                    {id ? 'Realizar Novo Sorteio Limpo' : 'Sortear Outro Número'}
                </button>

                {!id && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                        ) : (
                            <>
                            <Save className="w-5 h-5" />
                            SALVAR E GERAR LINK PÚBLICO
                            </>
                        )}
                    </button>
                )}
            </div>

          </section>
        )}
      </main>

      {/* NAVEGAÇÃO INTERNA (Cross-linking) */}
      <nav aria-label="Ferramentas relacionadas" className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Outras ferramentas de sorteio</h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
            {raffleTypes.map((raffle, index) => {
                const isLastAndOdd = index === raffleTypes.length - 1 && raffleTypes.length % 2 !== 0;
                return (
                    <Link
                        key={index}
                        href={raffle.path}
                        title={`Ir para ${raffle.title}`}
                        className={`block group no-underline transition-transform hover:-translate-y-1 ${isLastAndOdd ? 'sm:col-span-2' : ''}`}
                    >
                        <RaffleCard
                            title={raffle.title}
                            description={raffle.description}
                            icon={raffle.icon}
                            gradient={raffle.gradient}
                        />
                    </Link>
                );
            })}
        </div>
      </nav>
      
      {/* CONTEÚDO RICO (SEO ON-PAGE) */}
      <article className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
         <header>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                Sorteador de Números Online: Rápido, Grátis e Seguro
            </h2>
         </header>
         
         <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
             O <strong>VamoSortear</strong> é a ferramenta líder para realizar <em>sorteios de números aleatórios</em> na internet. Se você está organizando uma <strong>rifa online</strong>, um concurso no Instagram ou precisa definir a ordem de uma lista, nosso algoritmo garante resultados 100% honestos e auditáveis.
            </p>
            <p>
             Utilizamos tecnologia de geração de números pseudoaleatórios (PRNG) de alta segurança. Isso significa que, ao clicar em "Sortear", o sistema gera um resultado impossível de prever, garantindo a integridade do seu evento.
            </p>
         </div>

         <div className="grid gap-8 md:grid-cols-2 mt-10 not-prose">
            <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-3">
                    <CheckCircle2 className="text-blue-600 w-5 h-5" />
                    Recursos Exclusivos
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span><strong>Link Comprovante:</strong> Salve o resultado e envie o link único para provar que não houve fraude.</span>
                    </li>
                    <li className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span><strong>Sem Limites:</strong> Sorteie entre 1 e 1.000.000 ou qualquer intervalo personalizado.</span>
                    </li>
                    <li className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span><strong>100% Gratuito:</strong> Não precisa de cadastro, nem cartão de crédito.</span>
                    </li>
                </ul>
            </section>

            <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-3">
                    <LifeBuoy className="text-gray-600 w-5 h-5" />
                    Ideal para todos os momentos
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>🎯 <strong>Rifas e Bingos:</strong> Gere os números vencedores com transparência.</li>
                    <li>📱 <strong>Sorteios no Instagram:</strong> Defina o número do comentário vencedor.</li>
                    <li>🎲 <strong>Jogos de Tabuleiro:</strong> Substitua dados perdidos.</li>
                    <li>🏫 <strong>Sala de Aula:</strong> Professores podem sortear alunos para chamadas orais.</li>
                </ul>
            </section>
         </div>
      </article>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sr-only">Dúvidas Frequentes sobre Sorteio</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <Perguntas />
        </div>
      </section>
    </div>
  );
}