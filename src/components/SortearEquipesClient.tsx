'use client';

import { useState, useEffect } from 'react';
import { 
  X, HomeIcon, TextIcon, ListOrdered, Gift, Sparkles, LifeBuoy, 
  Plus, Loader2, Trash2, Users, GraduationCap, Brain, BookOpen, 
  Save, Copy, Check, RotateCcw, Trophy, ShieldCheck, Dice1 
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { RaffleCard } from '@/components/RaffleCard';
import Perguntas from '@/components/perguntas';
import { supabase } from '@/lib/supabase';
import { ShareButton } from '@/components/ShareButton';

// Interface
interface EquipesSalvas {
  participantes: string[];
  equipes: string[][];
  numEquipes: number;
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
    title: 'Sortear Palavras',
    description: 'Sorteie palavras ou nomes de uma lista personalizada',
    icon: <TextIcon className="h-6 w-6 text-green-600" />,
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
];

export function TeamDrawClient() {
  const params = useParams();
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const router = useRouter();

  // Estados
  const [Nome, setNome] = useState('');
  const [Participantes, setParticipantes] = useState<string[]>([]);
  const [numEquipes, setNumEquipes] = useState(2);
  const [Equipes, setEquipes] = useState<string[][]>([]);
  
  const [sorteando, setSorteando] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [copied, setCopied] = useState(false);
  const [erro, setErro] = useState('');
  const [sorteioTime, setsorteioTime] = useState('');

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Sorteador de Equipes e Times - VamoSortear",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "description": "Ferramenta gratuita para dividir grupos em equipes aleatórias e balanceadas.",
      }
    ]
  };

  const formatarData = (date: Date) => {
    const twoDigits = (num: number) => num.toString().padStart(2, '0');
    return `${twoDigits(date.getDate())}/${twoDigits(date.getMonth() + 1)}/${date.getFullYear()} - ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;
  };

  // Carregar do Banco
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const buscarSorteio = async () => {
        setLoadingBanco(true);
        const { data, error } = await supabase
          .from('sorteios_equipes')
          .select('*')
          .eq('id_curto', id)
          .single();

        if (data && !error) {
          const dados = data.dados_equipes as EquipesSalvas;
          setParticipantes(dados.participantes);
          setEquipes(dados.equipes);
          setNumEquipes(dados.numEquipes);
          
          const dataBanco = new Date(data.created_at);
          setsorteioTime(formatarData(dataBanco));
        }
        setLoadingBanco(false);
      };
      buscarSorteio();
    }
  }, [id]);

  const adicionarNome = () => {
    if (Nome.trim() !== '') {
      if (Participantes.includes(Nome.trim())) {
        setErro('Este nome já foi adicionado.');
        return;
      }
      setParticipantes((prev) => [...prev, Nome.trim()]);
      setNome('');
      setErro('');
    }
  };

  const removerNome = (index: number) => {
    const novaLista = [...Participantes];
    novaLista.splice(index, 1);
    setParticipantes(novaLista);
  };

  const handleDraw = async () => {
    if (Participantes.length < numEquipes) {
      setErro('Número de participantes deve ser maior ou igual ao número de equipes.');
      return;
    }

    setSorteando(true);
    setEquipes([]);
    setErro('');

    const agora = new Date();
    setsorteioTime(formatarData(agora));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const shuffled = [...Participantes].sort(() => 0.5 - Math.random());
    const equipesTemp: string[][] = Array.from({ length: numEquipes }, () => []);
    
    shuffled.forEach((p, index) => {
      equipesTemp[index % numEquipes].push(p);
    });

    setEquipes(equipesTemp);
    setSorteando(false);
  };

  const handleSave = async () => {
    if (Equipes.length === 0) return;
    setIsSaving(true);

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const { data: recentes } = await supabase
        .from('sorteios_equipes')
        .select('created_at')
        .eq('user_ip', ip)
        .gt('created_at', new Date(Date.now() - 30000).toISOString());

      if (recentes && recentes.length > 0) {
        alert("Aguarde 30 segundos para salvar outro sorteio.");
        setIsSaving(false);
        return;
      }

      const novoId = Math.random().toString(36).substring(2, 8);

      const { error } = await supabase
        .from('sorteios_equipes')
        .insert([{
          id_curto: novoId,
          dados_equipes: { participantes: Participantes, equipes: Equipes, numEquipes },
          user_ip: ip
        }]);

      if (!error) {
        router.push(`/Sortear-Equipes/${novoId}`);
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

  if (loadingBanco) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Navegação" className="mb-6">
        <Link
          href="/"
          title="Voltar para a página inicial"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-teal-600 transition-colors border border-gray-200 shadow-sm"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </nav>

      {/* BOX PRINCIPAL */}
      <main className="rounded-2xl border border-teal-100 bg-white p-6 md:p-8 shadow-xl shadow-teal-900/5">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-teal-600 p-3 shadow-md shadow-teal-200 shrink-0">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {id ? "Resultado: Equipes Formadas" : "Sorteador de Equipes"}
              </h1>
              <p className="mt-1 text-gray-500 font-medium">
                  {id ? 'Confira a divisão dos times abaixo.' : 'Divida grupos de forma justa e aleatória.'}
              </p>
            </div>
          </div>
          
          {id && Equipes.length > 0 && (
            <div className="shrink-0">
                <ShareButton 
                    title="Minhas Equipes Sorteadas" 
                    text={`Confira as equipes que sorteei no Vamo Sortear: ${typeof window !== 'undefined' ? window.location.href : ''}`} 
                />
            </div>
          )}
        </header>

        {/* --- MODO CRIAÇÃO --- */}
        {!id && (
            <section aria-label="Configuração das Equipes" className="animate-in fade-in duration-300">
                <div className="mb-8 rounded-xl bg-gray-50 p-6 border border-gray-200">
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                        Adicionar Participantes
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <input
                            type="text"
                            value={Nome}
                            onChange={(e) => setNome(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && adicionarNome()}
                            placeholder="Ex: João, Maria..."
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        />
                        <button
                            onClick={adicionarNome}
                            className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-bold text-white shadow-md hover:bg-teal-700 transition-all active:scale-95"
                        >
                            <Plus className="h-5 w-5" />
                            ADICIONAR
                        </button>
                    </div>

                    {/* Lista de Participantes */}
                    {Participantes.length > 0 ? (
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-gray-500 uppercase">Lista ({Participantes.length})</span>
                                <button onClick={() => setParticipantes([])} className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                                    <Trash2 className="w-3 h-3" /> Limpar tudo
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                                {Participantes.map((nome, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm text-sm group hover:border-teal-200 transition-colors">
                                        <span className="font-medium text-gray-700 truncate max-w-[150px]">{nome}</span>
                                        <button onClick={() => removerNome(index)} className="text-gray-300 hover:text-red-500 transition-colors">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4 p-6 border-2 border-dashed border-gray-200 rounded-lg text-center">
                            <p className="text-gray-400 text-sm italic">Nenhum participante adicionado ainda.</p>
                        </div>
                    )}
                </div>

                <div className="mb-8 p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Número de Equipes</label>
                    <div className="flex items-center gap-6">
                        <input
                            type="range"
                            min="2"
                            max={Math.max(2, Participantes.length)}
                            value={numEquipes}
                            onChange={(e) => setNumEquipes(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        />
                        <div className="shrink-0 w-16 h-12 flex items-center justify-center font-bold text-2xl text-teal-700 border-2 border-teal-100 rounded-xl bg-teal-50">
                            {numEquipes}
                        </div>
                    </div>
                </div>

                {erro && <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium">{erro}</div>}

                {/* Botão Sortear */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleDraw}
                        disabled={sorteando || Participantes.length < 2 || isSaving}
                        className={`w-full relative overflow-hidden rounded-xl px-6 py-5 text-center text-xl font-bold text-white shadow-lg transition-all active:scale-[0.98]
                        ${sorteando ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'}`}
                    >
                        <div className="flex items-center justify-center gap-3">
                            {sorteando ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    <span>Sorteando...</span>
                                </>
                            ) : (
                                <>
                                    <Users className="h-6 w-6" />
                                    {Equipes.length > 0 ? "SORTEAR NOVAMENTE" : "SORTEAR EQUIPES"}
                                </>
                            )}
                        </div>
                    </button>

                    {Equipes.length > 0 && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-black transition-all"
                        >
                            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="w-5 h-5"/> SALVAR E GERAR LINK</>}
                        </button>
                    )}
                </div>
            </section>
        )}

        {/* --- RESULTADO (VISUALIZAÇÃO) --- */}
        {Equipes.length > 0 && (
            <section aria-label="Resultado das Equipes" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Equipes.map((time, i) => (
                        <div key={i} className="rounded-xl bg-white overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="bg-teal-600 px-5 py-3 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-yellow-300" /> Equipe {i + 1}
                                </h3>
                                <span className="text-xs font-bold bg-teal-700 text-teal-50 px-2.5 py-1 rounded-full">
                                    {time.length} membros
                                </span>
                            </div>
                            <ul className="p-5 space-y-3">
                                {time.map((p, j) => (
                                    <li key={j} className="flex items-center gap-3 text-gray-700">
                                        <div className="h-8 w-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-sm font-bold border border-teal-100">
                                            {p.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium">{p}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block text-sm">
                        <span className="block text-gray-400 text-xs font-bold uppercase">Data do Sorteio</span>
                        <span className="block text-gray-700 font-mono mt-1">{sorteioTime}</span>
                    </div>
                </div>

                {id && (
                    <div className="mt-8 flex flex-col gap-3">
                        <button
                            onClick={handleCopyLink}
                            className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-bold transition-all border-2
                            ${copied ? 'bg-green-600 text-white border-green-600' : 'bg-white text-teal-700 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copied ? "Link Copiado!" : "Copiar Link do Resultado"}
                        </button>

                        <button
                            onClick={() => {
                                setEquipes([]);
                                setParticipantes([]);
                                router.push('/Sortear-Equipes');
                            }}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-lg font-bold text-white hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Realizar Novo Sorteio
                        </button>
                    </div>
                )}
            </section>
        )}
      </main>

      {/* CROSS-LINKING */}
      <nav aria-label="Outras ferramentas" className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-gray-900">Outras ferramentas</h2>
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

      {/* CONTEÚDO SEO - Sorteador de Equipes */}
      <article className="mt-12 space-y-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
        <header>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Sorteador de Equipes e Times Online
          </h2>
          <div className="h-1 w-20 bg-teal-600 rounded-full"></div>
        </header>

        <div className="text-gray-600 leading-relaxed space-y-6 text-lg">
          <p>
            O <strong>Gerador de Equipes do VamoSortear</strong> é a ferramenta definitiva para dividir grupos grandes em times menores de forma rápida, justa e 100% aleatória. Acabe com as discussões na hora de escolher quem joga com quem ou quem faz parte de qual grupo de trabalho.
          </p>
          <p>
            Nossa tecnologia de <strong>balanceamento automático</strong> distribui os participantes para que todas as equipes tenham o mesmo número de integrantes (ou o mais próximo possível). É a solução perfeita para professores organizarem a sala de aula, treinadores montarem times de futebol ou gestores definirem squads para dinâmicas corporativas.
          </p>
        </div>

        {/* Passo a Passo */}
        <div className="bg-teal-50 p-6 md:p-8 rounded-2xl border border-teal-100">
          <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-600" />
            Como dividir times em 3 passos:
          </h3>
          <ol className="space-y-4 text-gray-700">
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-teal-200 text-teal-800 font-bold text-sm">1</span>
              <div>
                <strong>Adicione os Participantes:</strong> Digite os nomes das pessoas um por um e clique em "Adicionar" (ou tecle Enter).
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-teal-200 text-teal-800 font-bold text-sm">2</span>
              <div>
                <strong>Defina as Equipes:</strong> Use a barra deslizante para escolher quantos times ou grupos você deseja formar.
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-teal-200 text-teal-800 font-bold text-sm">3</span>
              <div>
                <strong>Sorteie e Compartilhe:</strong> Clique em sortear. O sistema divide todos instantaneamente e você pode gerar um link para enviar no grupo do WhatsApp.
              </div>
            </li>
          </ol>
        </div>

        {/* Grid de Benefícios e Exemplos */}
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
              <ShieldCheck className="text-teal-600 w-6 h-6" />
              Por que usar nosso sorteador?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Sem "Panelinhas":</strong> A aleatoriedade garante que os grupos sejam misturados de verdade.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Salvar Resultado:</strong> Gere um link permanente para provar que a divisão foi honesta.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Visualização Clara:</strong> Veja exatamente quem está em qual time com cores distintas.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-4">
              <Brain className="text-teal-600 w-6 h-6" />
              Ideias de Utilização
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0"></span>
                <span><strong>Esportes:</strong> Dividir a pelada de futebol, times de vôlei ou basquete.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0"></span>
                <span><strong>Educação:</strong> Criar grupos de trabalho escolar ou de faculdade aleatórios.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0"></span>
                <span><strong>Jogos:</strong> Formar equipes para gincanas, jogos de tabuleiro ou e-sports.</span>
              </li>
            </ul>
          </section>
        </div>
      </article>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-8">
        <Perguntas />
      </div> 
    </div>
  );
}