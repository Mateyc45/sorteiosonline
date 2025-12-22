import { useState, useEffect } from 'react';
import { Users, LifeBuoy, ListIcon, TextIcon, HomeIcon, GiftIcon, SparklesIcon, Dice1Icon, Save, Copy, Check, RotateCcw } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { shuffleArray } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { RaffleCard } from '../components/RaffleCard';
import Perguntas from './perguntas';
import { supabase } from '../lib/supabase';

interface SequenciaSalva {
  start: number;
  end: number;
  count: number;
  result: number[];
}

export function SequenceDraw() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- ESTADOS ---
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(10);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<number[] | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);

  // Atualiza Título
  useEffect(() => {
    document.title = id 
      ? "Resultado da Sequência - Vamo Sortear" 
      : "Sortear Sequência de Números Online - Vamo Sortear";
    window.scrollTo(0, 0);
  }, [id]);

  const formatarData = (date: Date) => {
    const twoDigits = (num: number) => num.toString().padStart(2, '0');
    return `${twoDigits(date.getDate())}/${twoDigits(date.getMonth() + 1)}/${date.getFullYear()} - ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`;
  };

  // --- CARREGAR DADOS DO SUPABASE ---
  useEffect(() => {
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
    } else {
        setResult(null);
    }
  }, [id]);

  const handleDraw = async () => {
    if (end < start) {
        alert("O número final deve ser maior que o inicial.");
        return;
    }
    if (count > (end - start + 1)) {
        alert("A quantidade de números não pode ser maior que o intervalo.");
        return;
    }

    setIsDrawing(true);
    setResult(null);

    const agora = new Date();
    setsorteioTime(formatarData(agora));
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    const sequence = shuffleArray(numbers).slice(0, count);
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
        navigate(`/Sortear-Sequencia/${novoId}`);
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

  const raffleTypes = [
    {
      title: 'Sortear Palavras',
      description: 'Sorteie palavras ou nomes de uma lista personalizada',
      icon: <TextIcon className="h-6 w-6 text-green-600" />,
      path: '/Sortear-Palavras',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      title: 'Sortear um número',
      description: 'Sortei um número aleatório agora mesmo',
      icon: <Dice1Icon className="h-6 w-6 text-blue-600" />,
      path: '/Sortear-Numero',
      gradient: 'from-blue-500 to-blue-400',
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
    {
        title: 'Sortear Equipes',
        description: 'Faça o sorteio de equipes para diversas atividades',
        icon: <Users className="h-6 w-6" style={{ color: '#0F766E' }}/>,
        path: '/Sortear-Equipes',
        gradient: 'from-teal-400 to-teal-100',
    },
  ];

  if (loadingBanco) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
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

      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 p-3 shadow-md">
              <ListIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {id ? "Sorteio Salvo" : "Sorteio de Sequência"}
              </h2>
              <p className="mt-1 text-gray-600">Gere sequências numéricas aleatórias personalizadas</p>
            </div>
          </div>
          {id && result && (
            <ShareButton 
              title="Resultado do Sorteio de Sequência" 
              text={`A sequência sorteada é: ${result.join(', ')}. Veja: ${window.location.href}`} 
            />
          )}
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label htmlFor="start" className="block text-sm font-medium text-gray-700">
              Número Inicial
            </label>
            <input
              type="number"
              id="start"
              value={start}
              disabled={!!id} // Bloqueia se tiver ID
              onChange={(e) => setStart(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:bg-gray-100"
            />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label htmlFor="end" className="block text-sm font-medium text-gray-700">
              Número Final
            </label>
            <input
              type="number"
              id="end"
              value={end}
              disabled={!!id} 
              onChange={(e) => setEnd(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:bg-gray-100"
            />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <label htmlFor="count" className="block text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <input
              type="number"
              id="count"
              value={count}
              disabled={!!id} 
              onChange={(e) => setCount(Number(e.target.value))}
              min={1}
              max={end - start + 1}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* --- BOTÕES DE AÇÃO --- */}
        {!id ? (
            /* MODO CRIAÇÃO */
            <div className="flex flex-col gap-3">
                <button
                onClick={handleDraw}
                disabled={isDrawing || isSaving}
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                <div className="absolute inset-0 flex items-center justify-center">
                    {isDrawing && (
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
                    )}
                </div>
                <span className={isDrawing ? 'opacity-0' : 'opacity-100'}>
                    {isDrawing ? 'Sorteando...' : (result ? 'Sortear Novamente' : 'Sortear Sequência')}
                </span>
                </button>

                {result && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-800 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:bg-gray-900 transition-all"
                    >
                        {isSaving ? (
                        <div className="h-6 w-6 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
                        ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Salvar e Gerar Link
                        </>
                        )}
                    </button>
                )}
            </div>
        ) : (
            /* MODO VISUALIZAÇÃO */
            <div className="flex flex-col gap-3">
                <button
                    onClick={handleCopyLink}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02]
                    ${copied ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? "Link Copiado!" : "Copiar Link do Resultado"}
                </button>

                <button
                    onClick={() => {
                        setResult(null);
                        navigate('/Sortear-Sequencia');
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                    <RotateCcw className="w-5 h-5" />
                    Realizar Novo Sorteio
                </button>
            </div>
        )}

        {result && (
          <>
            <div className="mt-8 overflow-hidden rounded-lg bg-white p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                <div className="rounded-full bg-purple-100 p-3">
                    <SparklesIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-center w-full">
                    <p className="text-sm font-medium text-gray-500 mb-2">Sequência Sorteada</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {result.map((num, idx) => (
                            <span key={idx} className="inline-block bg-purple-50 text-purple-900 text-3xl font-bold px-3 py-1 rounded-md border border-purple-100">
                                {num}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="rounded-full bg-purple-100 p-3">
                    <SparklesIcon className="h-6 w-6 text-purple-600" />
                </div>
                </div>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="w-full flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg gap-2">
                <p className="text-mt font-medium text-gray-500">Data do sorteio</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 center">{sorteioTime}</p>
                </div>
            </div>
          </>
        )}
      </div>

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

      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de sequência?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
          O sorteio de sequência é uma ferramenta avançada...
          </p>
        </div>
        {/* ... Resto do texto ... */}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
        <Perguntas />
      </div> 
    </div>
  );
}