'use client';

import { useState, useEffect } from 'react';
import { 
  Users, HomeIcon, Dice1, Type, ListOrdered, Gift, Sparkles, 
  LifeBuoy, Save, RotateCcw, CheckCircle2, Plus, X, Trash2, Copy, Check 
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { shuffleArray } from '@/lib/utils';
import { ShareButton } from '@/components/ShareButton';
import { RaffleCard } from '@/components/RaffleCard';
import Perguntas from '@/components/perguntas';
import { supabase } from '@/lib/supabase';

// Interface
interface SorteioSalvo {
  resultado: string;
  palavras: string[];
}

const raffleTypes = [
  {
    title: 'Sortear um número',
    description: 'Sorteie números aleatórios de forma rápida e confiável',
    icon: <Dice1 className="h-6 w-6 text-blue-600" />,
    path: '/Sortear-Numero',
    gradient: 'from-blue-500 to-cyan-400',
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
  },
];

export function WordDrawClient() {
  const params = useParams();
  // Garante que pegamos o ID corretamente (array ou string)
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const router = useRouter();

  // Estados
  const [error, setError] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [copied, setCopied] = useState(false);

  // SEO Schema (JSON-LD) para aparecer bonito no Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Sorteador de Nomes e Palavras - VamoSortear",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "description": "Ferramenta online gratuita para sortear nomes de uma lista.",
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
          .from('sorteios_palavras')
          .select('*')
          .eq('id_curto', id)
          .single();

        if (data && !error) {
          const dadosSalvos = data.palavras_sorteadas as SorteioSalvo;
          setResult(dadosSalvos.resultado);
          setWords(dadosSalvos.palavras);
          const dataBanco = new Date(data.created_at);
          setsorteioTime(formatarData(dataBanco));
        }
        setLoadingBanco(false);
      };
      buscarSorteioSalvo();
    }
  }, [id]);

  const handleAddWord = () => {
    const word = newWord.trim();
    if (!word) {
      setError('Você deve digitar uma palavra.');
      return;
    }
    if (words.includes(word)) {
      setError('Esta palavra já foi adicionada.');
      return;
    }
    setWords([...words, word]);
    setNewWord('');
    setError(null);
  };

  const handleRemoveWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleDraw = async () => {
    if (words.length === 0) {
        setError('Adicione pelo menos uma palavra antes de sortear.');
        return;
    }
    
    setIsDrawing(true);
    setResult(null);

    const agora = new Date();
    setsorteioTime(formatarData(agora));

    await new Promise(resolve => setTimeout(resolve, 1000));

    const drawnWord = shuffleArray(words)[0];
    setResult(drawnWord);
    setIsDrawing(false);
  };

  const handleSave = async () => {
    if (result === null) return;
    setIsSaving(true);

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const { data: recentes } = await supabase
        .from('sorteios_palavras')
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
        .from('sorteios_palavras')
        .insert([{
          id_curto: novoId,
          palavras_sorteadas: { resultado: result, palavras: words },
          user_ip: ip
        }]);

      if (!error) {
        router.push(`/Sortear-Palavras/${novoId}`);
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
          router.push('/Sortear-Palavras');
          setWords([]);
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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* JSON-LD para o Google entender que é um app */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Navegação" className="mb-6">
        <Link
          href="/"
          title="Voltar para a página inicial"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-green-600 transition-colors border border-gray-200 shadow-sm"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </nav>

      {/* BOX PRINCIPAL */}
      <main className="rounded-2xl border border-green-100 bg-white p-6 md:p-8 shadow-xl shadow-green-900/5">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-600 p-3 shadow-md shadow-green-200 shrink-0">
              <Type className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {id ? `Sorteio Salvo #${id}` : 'Sorteador de Palavras'}
              </h1>
              <p className="mt-1 text-gray-500 font-medium">
                  {id ? 'Confira a palavra sorteada abaixo.' : 'Adicione as palavras na lista e sorteie aleatoriamente.'}
              </p>
            </div>
          </div>
          
          {id && result && (
            <div className="shrink-0">
                <ShareButton
                title="Resultado do Sorteio"
                text={`A palavra sorteada foi: ${result}. Veja o resultado oficial: https://vamosortear.com.br/Sortear-Palavras/${id}`}
                />
            </div>
          )}
        </header>

        {/* MODO CRIAÇÃO: INPUT */}
        {result === null && !id && (
            <section aria-label="Adicionar palavras" className="animate-in fade-in duration-300">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                        Adicionar Nova palavra
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={newWord}
                            onChange={(e) => {
                                setNewWord(e.target.value);
                                setError(null);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
                            placeholder="Ex: João Silva"
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                        />
                        <button
                            onClick={handleAddWord}
                            className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-bold text-white shadow-md hover:bg-green-700 transition-all active:scale-95"
                        >
                            <Plus className="h-5 w-5" />
                            ADICIONAR
                        </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1"><X className="w-4 h-4"/> {error}</p>}
                </div>

                {/* Lista de Palavras */}
                {words.length > 0 && (
                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-gray-500 uppercase">
                                Lista ({words.length})
                            </h3>
                            <button onClick={() => setWords([])} className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                                <Trash2 className="w-3 h-3" /> Limpar tudo
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {words.map((word, index) => (
                                <div key={index} className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 border border-green-100 group">
                                    <span className="font-medium text-green-800">{word}</span>
                                    <button
                                        onClick={() => handleRemoveWord(index)}
                                        className="text-green-400 hover:text-red-500 transition-colors"
                                        title="Remover"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        )}

        {/* LISTA DE PALAVRAS (MODO VISUALIZAÇÃO) */}
        {id && result && words.length > 0 && (
             <div className="mb-6 animate-in fade-in">
                 <p className="text-sm font-bold text-gray-500 uppercase mb-2">Participantes do Sorteio:</p>
                 <div className="flex flex-wrap gap-2 opacity-70">
                    {words.map((word, index) => (
                        <span key={index} className={`px-2 py-1 rounded text-xs border ${word === result ? 'bg-green-100 border-green-300 text-green-800 font-bold' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                            {word}
                        </span>
                    ))}
                 </div>
             </div>
        )}

        {/* BOTÃO SORTEAR (PRINCIPAL) */}
        {result === null && !id && (
          <button
            onClick={handleDraw}
            disabled={isDrawing || words.length === 0}
            className={`mt-8 w-full overflow-hidden rounded-xl px-6 py-5 text-center text-xl font-bold shadow-lg shadow-green-600/20 transition-all 
              ${words.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]'}`}
          >
            <div className="flex items-center justify-center gap-3">
               {isDrawing ? (
                 <>
                   <div className="h-6 w-6 animate-spin rounded-full border-3 border-white/30 border-t-white"></div>
                   <span>Sorteando...</span>
                 </>
               ) : (
                 <>
                   <Sparkles className="w-6 h-6" />
                   SORTEAR PALAVRA
                 </>
               )}
            </div>
          </button>
        )}

        {/* ÁREA DE RESULTADO (VERDE) */}
        {result && (
          <section aria-label="Resultado" className="mt-2 animate-in zoom-in-95 duration-500">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-green-50 to-white p-10 shadow-inner border border-green-100 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-600"></div>
              
              <p className="text-sm font-bold text-green-500 uppercase tracking-[0.2em] mb-4">Vencedor</p>
              
              <div className="flex items-center justify-center gap-4 relative z-10">
                  <Sparkles className="h-8 w-8 text-green-500 animate-pulse hidden sm:block" />
                  <span className="text-5xl sm:text-7xl font-black text-green-900 tracking-tight break-all drop-shadow-sm">
                    {result}
                  </span>
                  <Sparkles className="h-8 w-8 text-green-500 animate-pulse hidden sm:block" />
              </div>
              
              {!id && (
                  <div className="mt-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Sorteio Realizado
                  </div>
              )}
            </div>

            <div className="mt-6 text-center">
               <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block">
                  <span className="block text-gray-400 text-xs font-bold uppercase">Data do Sorteio</span>
                  <span className="block text-gray-700 font-mono mt-1">{sorteioTime}</span>
               </div>
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="mt-8 flex flex-col gap-3">
                {/* Botão Copiar Link (só se tiver ID) */}
                {id && (
                    <button
                    onClick={handleCopyLink}
                    className={`border-2 border-gray-200 w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-green shadow-lg transition-all hover:scale-[1.01]
                        ${copied ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 hover:bg-green-50'}`}
                    >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? "Link Copiado!" : "Copiar Link do Resultado"}
                    </button>
                )}

                <button
                    onClick={handleDrawAgain}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-6 py-4 text-lg font-bold text-gray-700 hover:border-green-300 hover:bg-green-50 hover:text-green-700 transition-all"
                >
                    <RotateCcw className="w-5 h-5" />
                    {id ? 'Realizar Novo Sorteio' : 'Sortear Outro Nome'}
                </button>

                {!id && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-200 hover:bg-green-700 hover:-translate-y-0.5 transition-all disabled:opacity-70"
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
      <nav aria-label="Outras ferramentas" className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-green-600" />
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
      
      {/* CONTEÚDO SEO */}
      <article className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
         <header>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                Sorteador de Nomes ou Palavras e Lista Online
            </h2>
         </header>
         
         <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
             O <strong>Sorteador de Palavras do VamoSortear</strong> é a ferramenta perfeita para quem precisa escolher um item, nome ou palavra de uma lista personalizada. Seja para definir a ordem de apresentações, escolher o ganhador de um brinde no escritório ou realizar sorteios rápidos no Instagram.
            </p>
            <p>
             Nossa tecnologia garante que cada nome na sua lista tenha exatamente a mesma probabilidade de ser escolhido. O processo é transparente, rápido e não exige cadastro.
            </p>
         </div>

         <div className="grid gap-8 md:grid-cols-2 mt-10 not-prose">
            <section className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-3">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
                    Vantagens
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>Ilimitado:</strong> Adicione quantos nomes ou palavras quiser.</li>
                    <li>• <strong>Auditável:</strong> Gere um link permanente do resultado.</li>
                    <li>• <strong>100% Aleatório:</strong> Algoritmo livre de vícios.</li>
                </ul>
            </section>
            
             <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-3">
                    <LifeBuoy className="text-green-600 w-5 h-5" />
                    Ideal para
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Sorteio de comentários (copie e cole a lista).</li>
                    <li>• Decisões em grupo.</li>
                    <li>• Sorteio de temas para TCC ou trabalhos.</li>
                </ul>
            </section>
         </div>
      </article>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dúvidas Frequentes</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <Perguntas />
        </div>
      </section>
    </div>
  );
}