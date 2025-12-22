import React, { useState, useEffect } from 'react';
// import Head from 'next/head' // REMOVIDO
import { XIcon, HomeIcon, Dice1Icon, TextIcon, ListIcon, GiftIcon, SparklesIcon, LifeBuoy, PlusIcon, Loader2, Trash2, Users, GraduationCapIcon, UsersIcon, BrainIcon, BookOpenIcon, Save, Share2, Copy, Check, RotateCcw, TrophyIcon, ShieldCheckIcon } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { RaffleCard } from '../components/RaffleCard';
import Perguntas from './perguntas';
import { supabase } from '../lib/supabase';
import { ShareButton } from './ShareButton';

interface EquipesSalvas {
  participantes: string[];
  equipes: string[][];
  numEquipes: number;
}

const raffleTypes = [
  {
    title: 'Sortear um número',
    description: 'Sorteie números aleatórios de forma rápida e confiável',
    icon: <Dice1Icon className="h-6 w-6 text-blue-600" />,
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
    icon: <ListIcon className="h-6 w-6 text-purple-600" />,
    path: '/Sortear-Sequencia',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    title: 'Amigo Secreto',
    description: 'Organize seu amigo secreto com envio automático por email',
    icon: <GiftIcon className="h-6 w-6 text-red-600" />,
    path: '/Amigo-Secreto',
    gradient: 'from-red-500 to-orange-400',
  },
  {
    title: 'Roleta',
    description: 'Faça um sorteio utilizando uma roleta',
    icon: <LifeBuoy className="h-6 w-6 text-red-600" />,
    path: '/roleta',
    gradient: 'from-yellow-400 to-yellow-100',
  },
];

export function SortearEquipes() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // SEO Dinâmico
  useEffect(() => {
    document.title = id 
      ? "Resultado das Equipes - Vamo Sortear" 
      : "Sortear Equipes e Times Online Grátis | Vamo Sortear";
    window.scrollTo(0, 0);
  }, [id]);

  const formatarData = (date: Date) => {
    const twoDigits = (num: number) => num.toString().padStart(2, '0');
    return `${twoDigits(date.getDate())}/${twoDigits(date.getMonth() + 1)}/${date.getFullYear()} - ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;
  };

  // Carregar do Banco
  useEffect(() => {
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

    // Lógica de Embaralhamento e Divisão
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
        navigate(`/Sortear-Equipes/${novoId}`);
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
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <main className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-teal-50 via-teal-50 to-teal-50 p-8 shadow-lg">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-teal-600 to-teal-600 p-3 shadow-md">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {id ? "Resultado: Equipes Formadas" : "Sorteador de Equipes"}
                </h2>
                <p className="mt-1 text-gray-600">Divida grupos de forma justa e aleatória</p>
              </div>
            </div>
            {id && Equipes.length > 0 && (
                <ShareButton 
                    title="Minhas Equipes Sorteadas" 
                    text={`Confira as equipes que sorteei no Vamo Sortear: ${window.location.href}`} 
                />
            )}
          </div>

          {/* --- MODO CRIAÇÃO --- */}
          {!id && (
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                Adicionar Participantes
                </label>
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="text"
                    value={Nome}
                    onChange={(e) => setNome(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && adicionarNome()}
                    placeholder="Digite um nome (ex: João)"
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
                <button
                    onClick={adicionarNome}
                    className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-teal-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Adicionar
                </button>
                </div>

                <div className="mb-6">
                {Participantes.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Lista ({Participantes.length})</span>
                            <button onClick={() => setParticipantes([])} className="text-xs text-red-500 hover:underline">Limpar tudo</button>
                        </div>
                        <ul className="max-h-40 overflow-y-auto grid grid-cols-2 gap-2">
                        {Participantes.map((nome, index) => (
                            <li key={index} className="flex items-center justify-between bg-white px-3 py-1.5 rounded border border-gray-100 shadow-sm text-sm">
                            <span className="truncate mr-2">{nome}</span>
                            <button onClick={() => removerNome(index)} className="text-gray-400 hover:text-red-500">
                                <XIcon className="h-4 w-4" />
                            </button>
                            </li>
                        ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4 italic bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        Nenhum participante adicionado ainda.
                    </p>
                )}
                </div>

                <div className="mt-4 mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Número de Equipes</label>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="2"
                        max={Math.max(2, Participantes.length)}
                        value={numEquipes}
                        onChange={(e) => setNumEquipes(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="w-16 text-center font-bold text-xl text-teal-700 border-2 border-teal-100 rounded-lg py-1 bg-teal-50">
                        {numEquipes}
                    </div>
                </div>
                </div>

                {erro && <p className="mb-4 text-center text-sm font-medium text-red-500 bg-red-50 p-2 rounded">{erro}</p>}

                <div className="mb-0 text-center flex flex-col gap-3">
                <button
                    onClick={handleDraw}
                    className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-teal-600 px-6 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${
                    sorteando ? 'bg-gray-400' : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                    disabled={sorteando || Participantes.length < 2 || isSaving}
                >
                    {sorteando ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sorteando...
                    </span>
                    ) : (
                        Equipes.length > 0 ? "Sortear Novamente" : "Sortear Equipes"
                    )}
                </button>

                {Equipes.length > 0 && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-800 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:bg-gray-900 transition-all"
                    >
                        {isSaving ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Salvar e Gerar Link
                        </>
                        )}
                    </button>
                )}
                </div>
            </div>
          )}

          {/* --- RESULTADO (VISUALIZAÇÃO DE ID OU PREVIEW LOCAL) --- */}
          {Equipes.length > 0 && (
            <>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {Equipes.map((time, i) => (
                    <div
                    key={i}
                    className="rounded-xl bg-white overflow-hidden shadow-md border border-teal-100 hover:shadow-lg transition-shadow"
                    >
                    <div className="bg-teal-600 px-4 py-3 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrophyIcon className="h-4 w-4 text-yellow-300" /> Equipe {i + 1}
                        </h3>
                        <span className="text-xs bg-teal-700 text-teal-100 px-2 py-0.5 rounded-full">
                            {time.length} membros
                        </span>
                    </div>
                    <ul className="p-4 space-y-2">
                        {time.map((p, j) => (
                        <li key={j} className="flex items-center gap-2 text-gray-700 border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                            <div className="h-6 w-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-xs font-bold">
                                {p.charAt(0).toUpperCase()}
                            </div>
                            {p}
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-2">
                    <div className="w-full flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Data do sorteio</p>
                        <p className="text-lg font-bold text-gray-700">{sorteioTime}</p>
                    </div>
                </div>

                {id && (
                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            onClick={handleCopyLink}
                            className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]
                            ${copied ? 'bg-green-600' : 'bg-teal-600 hover:bg-teal-700'}`}
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copied ? "Link Copiado!" : "Copiar Link do Resultado"}
                        </button>

                        <button
                            onClick={() => {
                                setEquipes([]);
                                setParticipantes([]);
                                navigate('/Sortear-Equipes');
                            }}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Realizar Novo Sorteio
                        </button>
                    </div>
                )}
            </>
          )}
        </div>

        {/* --- LINKS RÁPIDOS --- */}
        <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Outros tipos de sorteios</h2>
          <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-2 ${raffleTypes.length % 2 !== 0 ? 'lg:grid-cols-2 lg:justify-items-center' : ''}`}>
            {raffleTypes.map((raffle, index) => (
              <Link
                key={index}
                to={raffle.path}
                className={`${
                  raffleTypes.length % 2 !== 0 && index === raffleTypes.length - 1
                    ? 'lg:col-span-2 lg:justify-self-center w-full'
                    : ''
                }`}
              >
                <RaffleCard
                  title={raffle.title}
                  description={raffle.description}
                  icon={raffle.icon}
                  gradient={raffle.gradient}
                  onClick={() => {}}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* --- CONTEÚDO SEO MASTER --- */}
        <div className="mt-8 space-y-12 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            
            {/* Introdução Rica */}
            <section>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                    O Melhor <span className="text-teal-600">Sorteador de Equipes e Times</span> Online
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Precisa dividir a turma da escola, organizar times para o futebol ou separar grupos de trabalho na empresa? 
                    O <strong>Sorteador de Equipes</strong> do Vamo Sortear é a ferramenta definitiva para criar grupos aleatórios de forma rápida, justa e imparcial.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Esqueça o "par ou ímpar" ou a escolha manual que sempre gera discussões. 
                    Com nosso algoritmo inteligente, você insere os nomes, define quantas equipes quer e nós fazemos o resto em segundos. 
                    Ideal para professores, treinadores, gestores e grupos de amigos.
                </p>
            </section>

            {/* Benefícios Estruturados */}
            <section>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <ShieldCheckIcon className="h-6 w-6 text-teal-600"/> Por que usar nossa ferramenta?
                </h4>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex gap-4">
                        <div className="bg-teal-100 p-3 rounded-lg h-fit"><SparklesIcon className="h-6 w-6 text-teal-700"/></div>
                        <div>
                            <h5 className="font-bold text-gray-800">100% Imparcial</h5>
                            <p className="text-sm text-gray-600">O sistema utiliza aleatoriedade real, garantindo que não haja "panelinhas" ou favorecimentos na divisão.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-teal-100 p-3 rounded-lg h-fit"><BrainIcon className="h-6 w-6 text-teal-700"/></div>
                        <div>
                            <h5 className="font-bold text-gray-800">Equilíbrio Automático</h5>
                            <p className="text-sm text-gray-600">Se o número de pessoas não for exato, o sistema distribui os participantes da forma mais equilibrada possível.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-teal-100 p-3 rounded-lg h-fit"><Save className="h-6 w-6 text-teal-700"/></div>
                        <div>
                            <h5 className="font-bold text-gray-800">Salve e Compartilhe</h5>
                            <p className="text-sm text-gray-600">Gere um link permanente do resultado para enviar no grupo do WhatsApp da turma ou do futebol.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-teal-100 p-3 rounded-lg h-fit"><UsersIcon className="h-6 w-6 text-teal-700"/></div>
                        <div>
                            <h5 className="font-bold text-gray-800">Sem Limites</h5>
                            <p className="text-sm text-gray-600">Crie quantas equipes quiser, com quantos participantes precisar. Totalmente grátis.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Casos de Uso */}
            <section>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Onde utilizar o Sorteio de Times?</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-teal-700 font-bold">
                            <GraduationCapIcon className="h-5 w-5"/> Educação
                        </div>
                        <p className="text-sm text-gray-600">Professores podem usar para separar grupos de seminários, feiras de ciências ou debates em sala de aula.</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-teal-700 font-bold">
                            <TrophyIcon className="h-5 w-5"/> Esportes
                        </div>
                        <p className="text-sm text-gray-600">Organize a pelada de futebol, times de vôlei ou campeonatos de e-sports (CS, LoL, Valorant) sem brigas.</p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors">
                        <div className="flex items-center gap-2 mb-3 text-teal-700 font-bold">
                            <BookOpenIcon className="h-5 w-5"/> Empresas
                        </div>
                        <p className="text-sm text-gray-600">Ideal para dinâmicas de Team Building, Hackathons e divisão de squads para projetos ágeis.</p>
                    </div>
                </div>
            </section>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
          <Perguntas />
        </div> 
        
      </main>
    </div>
  );
}