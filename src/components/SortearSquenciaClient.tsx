'use client';

import { useState, useEffect } from 'react';
import { 
  Users, HomeIcon, Dice1, Type, ListOrdered, Gift, Sparkles, 
  LifeBuoy, Save, RotateCcw, CheckCircle2, Copy, Check 
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { shuffleArray } from '@/lib/utils';
import { ShareButton } from '@/components/ShareButton';
import { RaffleCard } from '@/components/RaffleCard';
import Perguntas from '@/components/perguntas';
import { supabase } from '@/lib/supabase';

// Interface do Banco de Dados
interface SequenciaSalva {
  start: number;
  end: number;
  count: number;
  result: number[];
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
    title: 'Sortear um número',
    description: 'Sorteie números aleatórios de forma rápida e confiável',
    icon: <Dice1 className="h-6 w-6 text-blue-600" />,
    path: '/Sortear-Numero',
    gradient: 'from-blue-500 to-cyan-400',
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
  },
];

export function SequenceDrawClient() {
  const params = useParams();
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const router = useRouter();

  // Estados
  const [start, setStart] = useState<number | ''>(1);
  const [end, setEnd] = useState<number | ''>(10);
  const [count, setCount] = useState<number | ''>(3);
  const [result, setResult] = useState<number[] | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Sorteador de Sequência - VamoSortear",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "description": "Ferramenta para sortear uma sequência de números aleatórios sem repetição.",
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
      const buscarSequenciaSalva = async () => {
        setLoadingBanco(true);
        const { data, error } = await supabase
          .from('sorteios_sequencia')
          .select('*')
          .eq('id_curto', id)
          .single();

        if (data && !error) {
          const dados = data.dados_sequencia as SequenciaSalva;
          setResult(dados.result);
          setStart(dados.start);
          setEnd(dados.end);
          setCount(dados.count);
          
          const dataBanco = new Date(data.created_at);
          setsorteioTime(formatarData(dataBanco));
        }
        setLoadingBanco(false);
      };
      buscarSequenciaSalva();
    }
  }, [id]);

  const handleDraw = async () => {
    const startVal = Number(start);
    const endVal = Number(end);
    const countVal = Number(count);

    if (start === '' || end === '' || count === '') {
        alert("Preencha todos os campos.");
        return;
    }

    if (endVal < startVal) {
        alert("O número final deve ser maior que o inicial.");
        return;
    }
    if (countVal > (endVal - startVal + 1)) {
        alert("A quantidade de números não pode ser maior que o intervalo disponível.");
        return;
    }

    setIsDrawing(true);
    setResult(null);

    const agora = new Date();
    setsorteioTime(formatarData(agora));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const numbers = Array.from(
      { length: endVal - startVal + 1 },
      (_, i) => startVal + i
    );
    const sequence = shuffleArray(numbers).slice(0, countVal);
    setResult(sequence);
    setIsDrawing(false);
  };

  const handleSave = async () => {
    if (!result) return;
    setIsSaving(true);

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const { data: recentes } = await supabase
        .from('sorteios_sequencia')
        .select('created_at')
        .eq('user_ip', ip)
        .gt('created_at', new Date(Date.now() - 30000).toISOString());

      if (recentes && recentes.length > 0) {
        alert("Aguarde 30 segundos entre os sorteios.");
        setIsSaving(false);
        return;
      }

      const novoId = Math.random().toString(36).substring(2, 8);

      const { error } = await supabase
        .from('sorteios_sequencia')
        .insert([{
          id_curto: novoId,
          dados_sequencia: { start, end, count, result },
          user_ip: ip
        }]);

      if (!error) {
        router.push(`/Sortear-Sequencia/${novoId}`);
      } else {
        alert("Erro ao salvar.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDrawAgain = () => {
      setResult(null);
      if (id) {
          router.push('/Sortear-Sequencia');
      }
  };

  if (loadingBanco) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Navegação" className="mb-6">
        <Link
          href="/"
          title="Voltar para a página inicial"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-purple-600 transition-colors border border-gray-200 shadow-sm"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </nav>

      {/* BOX PRINCIPAL */}
      <main className="rounded-2xl border border-purple-100 bg-white p-6 md:p-8 shadow-xl shadow-purple-900/5">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-600 p-3 shadow-md shadow-purple-200 shrink-0">
              <ListOrdered className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {id ? "Resultado da Sequência" : "Sorteio de Sequência"}
              </h1>
              <p className="mt-1 text-gray-500 font-medium">
                  {id ? 'Confira os números sorteados abaixo.' : 'Gere múltiplos números aleatórios de uma vez.'}
              </p>
            </div>
          </div>
          
          {id && result && (
            <div className="shrink-0">
                <ShareButton 
                    title="Resultado do Sorteio de Sequência" 
                    text={`A sequência sorteada foi: ${result.join(', ')}. Confira: https://vamosortear.com.br/Sortear-Sequencia/${id}`} 
                />
            </div>
          )}
        </header>

        {/* INPUTS DE CONFIGURAÇÃO (Apenas se não tiver resultado e não for visualização) */}
        {result === null && !id && (
            <section aria-label="Configuração" className="animate-in fade-in duration-300 mb-8">
                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Início</label>
                        <input
                            type="number"
                            value={start}
                            onChange={(e) => setStart(e.target.value === '' ? '' : Number(e.target.value))}
                            className="block w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-2 text-2xl font-bold text-gray-900 focus:border-purple-600 focus:ring-0"
                        />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Fim</label>
                        <input
                            type="number"
                            value={end}
                            onChange={(e) => setEnd(e.target.value === '' ? '' : Number(e.target.value))}
                            className="block w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-2 text-2xl font-bold text-gray-900 focus:border-purple-600 focus:ring-0"
                        />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Quantidade</label>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(e.target.value === '' ? '' : Number(e.target.value))}
                            className="block w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-2 text-2xl font-bold text-gray-900 focus:border-purple-600 focus:ring-0"
                        />
                    </div>
                </div>
            </section>
        )}

        {/* BOTÃO PRINCIPAL */}
        {result === null && !id && (
            <button
                onClick={handleDraw}
                disabled={isDrawing || isSaving}
                className="w-full relative overflow-hidden rounded-xl bg-purple-600 px-6 py-5 text-center text-xl font-bold text-white shadow-lg shadow-purple-600/20 transition-all hover:bg-purple-700 active:scale-[0.98]"
            >
                <div className="flex items-center justify-center gap-3">
                    {isDrawing ? (
                        <>
                            <div className="h-6 w-6 animate-spin rounded-full border-3 border-white/30 border-t-white"></div>
                            <span>Processando...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-6 h-6" />
                            SORTEAR SEQUÊNCIA
                        </>
                    )}
                </div>
            </button>
        )}

        {/* ÁREA DE RESULTADO (ROXA) */}
        {result && (
          <section aria-label="Resultado" className="mt-2 animate-in zoom-in-95 duration-500">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-purple-50 to-white p-8 shadow-inner border border-purple-100 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-600"></div>
              
              <p className="text-sm font-bold text-purple-500 uppercase tracking-[0.2em] mb-6">Números Sorteados</p>
              
              <div className="flex flex-wrap justify-center gap-3 relative z-10">
                  {result.map((num, idx) => (
                    <div key={idx} className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-md border-2 border-purple-100 text-2xl sm:text-3xl font-black text-purple-900 animate-in zoom-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                        {num}
                    </div>
                  ))}
              </div>
              
              {!id && (
                  <div className="mt-8 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Sorteio Realizado
                  </div>
              )}
            </div>

            <div className="mt-6 text-center">
               <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block text-sm">
                  <span className="block text-gray-400 text-xs font-bold uppercase">Data do Sorteio</span>
                  <span className="block text-gray-700 font-mono mt-1">{sorteioTime}</span>
               </div>
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="mt-8 flex flex-col gap-3">
                {id && (
                    <button
                        onClick={handleCopyLink}
                        className={`w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-4 text-lg font-bold transition-all
                        ${copied ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-purple-700 hover:bg-purple-50'}`}
                    >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        {copied ? "Link Copiado!" : "Copiar Link do Resultado"}
                    </button>
                )}

                <button
                    onClick={handleDrawAgain}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-6 py-4 text-lg font-bold text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 transition-all"
                >
                    <RotateCcw className="w-5 h-5" />
                    {id ? 'Realizar Novo Sorteio' : 'Sortear Outra Sequência'}
                </button>

                {!id && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-purple-200 hover:bg-purple-700 hover:-translate-y-0.5 transition-all disabled:opacity-70"
                    >
                        {isSaving ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                        ) : (
                            <>
                            <Save className="w-5 h-5" />
                            SALVAR E GERAR LINK
                            </>
                        )}
                    </button>
                )}
            </div>
          </section>
        )}
      </main>

      {/* CROSS-LINKING */}
      <nav aria-label="Outras ferramentas" className="mt-12">
        <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Veja também</h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
            {raffleTypes.map((raffle, index) => {
                const isLastAndOdd = index === raffleTypes.length - 1 && raffleTypes.length % 2 !== 0;
                return (
                    <Link
                        key={index}
                        href={raffle.path}
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
      
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dúvidas Frequentes</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <Perguntas />
        </div>
      </section>
    </div>
  );
}