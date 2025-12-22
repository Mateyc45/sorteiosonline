import React, { useEffect, useState } from 'react';
// REMOVIDO: import Head from 'next/head' (Isso quebrava o site)
import { Dice1Icon, TextIcon, PlusIcon, XIcon, HomeIcon, BookOpenIcon, BrainIcon, UsersIcon, GraduationCapIcon, ListIcon, GiftIcon, SparklesIcon, LifeBuoy, RotateCcw, Save, Copy, Check, Users } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { shuffleArray } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { RaffleCard } from '../components/RaffleCard';
import Perguntas from './perguntas';
import { supabase } from '../lib/supabase';

interface SorteioSalvo {
  resultado: string;
  palavras: string[];
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
  {
    title: 'Sortear Equipes',
    description: 'Faça o sorteio de equipes para diversas atividades',
    icon: <Users className="h-6 w-6" style={{ color: '#0F766E' }} />,
    path: '/Sortear-Equipes',
    gradient: 'from-teal-400 to-teal-100',
  },
];

export function WordDraw() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- ESTADOS (Todos devem ficar aqui no topo) ---
  const [error, setError] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [copied, setCopied] = useState(false); // <--- MOVA PARA CÁ!

  // Atualiza Título da Página (Substituto do Head)
  useEffect(() => {
    document.title = id 
      ? "Resultado do Sorteio de Palavras - Vamo Sortear" 
      : "Sortear Palavras Online - Vamo Sortear";
  }, [id]);

  const formatarData = (date: Date) => {
    const twoDigits = (num: number) => num.toString().padStart(2, '0');
    return `${twoDigits(date.getDate())}/${twoDigits(date.getMonth() + 1)}/${date.getFullYear()} - ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`;
  };

  // Carregar do Banco
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
    if (words.length > 0) {
      setIsDrawing(true);
      setResult(null);

      const agora = new Date();
      setsorteioTime(formatarData(agora));

      await new Promise(resolve => setTimeout(resolve, 1500));

      const drawnWord = shuffleArray(words)[0];
      setResult(drawnWord);
      setIsDrawing(false);
    }
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
        navigate(`/Sortear-Palavras/${novoId}`);
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

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className="mx-auto max-w-2xl">
      {/* Head removido - Título controlado via useEffect */}
      
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 p-3 shadow-md">
              <TextIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {id ? `Sorteio Salvo #${id}` : 'Sorteio de Palavras'}
              </h2>
              <p className="mt-1 text-gray-600">Sorteie palavras ou nomes de forma aleatória e imparcial</p>
            </div>
          </div>
          {id && result && (
            <ShareButton
              title="Resultado do Sorteio de Palavras"
              text={`A palavra sorteada foi: ${result}. Veja: ${window.location.href}`}
            />
          )}
        </div>

        {/* INPUT DE PALAVRAS (Apenas se não tiver ID) */}
        {!id && (
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adicionar Palavra ou Nome
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
                placeholder="Digite uma palavra ou nome"
                className="block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <button
                onClick={handleAddWord}
                className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <PlusIcon className="h-5 w-5" />
                Adicionar
              </button>
            </div>
            {error && <p className="mb-1 text-sm text-red-600 mt-2">{error}</p>}
          </div>
        )}

        {/* LISTA DE PALAVRAS */}
        {words.length > 0 && (
          <div className="mb-8">
            {id ? 
            <p className="text-sm font-bold text-gray-700 mt-3 mb-3">
              Palavras participantes:
            </p>: 
            <p className="text-sm font-medium text-gray-700 mt-3 mb-3">
              Palavras adicionadas:
            </p>}
            <div className="flex flex-wrap gap-2">
              {words.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 transition-colors hover:bg-green-100"
                >
                  <span className="text-sm font-medium text-green-900">{word}</span>
                  {!id && (
                    <button
                      onClick={() => handleRemoveWord(index)}
                      className="rounded-full p-1 hover:bg-green-200"
                    >
                      <XIcon className="h-3 w-3 text-green-700" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- BOTÕES DE AÇÃO --- */}
        {!id ? (
          /* MODO CRIAÇÃO */
          <div className="flex flex-col gap-3">
            <button
              onClick={handleDraw}
              disabled={words.length === 0 || isDrawing || isSaving}
              className={`relative w-full overflow-hidden rounded-xl px-6 py-4 text-center text-lg font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70
                ${result === null 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-[1.02]' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-[1.02]'
                }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {isDrawing && (
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent"></div>
                )}
              </div>
              <span className={isDrawing ? 'opacity-0' : 'opacity-100 flex items-center justify-center gap-2'}>
                {result !== null && <RotateCcw className="w-5 h-5" />}
                {result === null ? 'Sortear Palavra' : 'Sortear Novamente'}
              </span>
            </button>
                
            
          </div>
        ) : (
          /* MODO VISUALIZAÇÃO (ID EXISTE) */
          <div></div>
          
        )}

        {/* RESULTADO (Comum a ambos) */}
        {result && (
          <>
            <div className="mt-8 overflow-hidden rounded-lg bg-white p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-green-100 p-3">
                  <SparklesIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Palavra Sorteada</p>
                  <p className="mt-1 text-5xl font-bold text-gray-900 break-all">{result}</p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <SparklesIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="w-full flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg gap-2">
                <p className="text-mt font-medium text-gray-500">Data do sorteio</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 center">{sorteioTime}</p>
              </div>
            </div>
          </>
        )}
        {id ? (
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleCopyLink}
              className={`border-2 border-gray-200 w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-green shadow-lg transition-all hover:scale-[1.02]
                ${copied ? 'bg-green-600' : 'bg-white-600 hover:bg-white-700'}`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? "Link Copiado!" : "Copiar Link do Resultado"}
            </button>

            <button
              onClick={() => {
                setResult(null);
                setWords([]);
                navigate('/Sortear-Palavras');
              }}
              className="bg-green-500 w-full flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-green px-6 py-4 text-lg font-semibold shadow-lg transition-all hover:scale-[1.02]"
            >
              <RotateCcw className="w-5 h-5" />
              Realizar Novo Sorteio
            </button>
          </div>) : (
                    <div className="flex flex-col gap-3">
                      
                      {/* Botão de Sortear (Sempre visível para tentar de novo) */}
                      
          
                      {/* Botão de SALVAR (Só aparece se tiver um resultado na tela) */}
                      {result !== null && (
                        <button
                          onClick={handleSave}
                          disabled={isSaving || isDrawing}
                          className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:bg-green-600 hover:scale-[1.02] transition-all"
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
        )}
      </div>

      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Outros tipos de sorteios</h2>
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-2 ${raffleTypes.length % 2 !== 0 ? 'lg:grid-cols-2 lg:justify-items-center' : ''}`}>
          {raffleTypes.map((raffle, index) => (
            <Link key={index} to={raffle.path} className={`${raffleTypes.length % 2 !== 0 && index === raffleTypes.length - 1 ? 'lg:col-span-2 lg:justify-self-center w-full' : ''}`}>
              <RaffleCard title={raffle.title} description={raffle.description} icon={raffle.icon} gradient={raffle.gradient} onClick={() => {}} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio de palavras?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
          O sorteio de palavras é uma ferramenta extremamente versátil e eficiente,
          projetada para permitir a seleção aleatória de uma palavra ou nome de uma lista predefinida,
          com total segurança e confiabilidade. Nosso sistema se baseia em um algoritmo avançado de aleatorização,
          desenvolvido para garantir total imparcialidade no processo de seleção, eliminando qualquer chance de viés ou manipulação dos resultados.
          Isso torna a ferramenta ideal para diversos tipos de sorteios, seleções aleatórias ou mesmo para momentos em que você precisa de uma escolha imparcial e justa.
          Seja em sorteios de concursos, sorteios de prêmios, ou outras aplicações que exijam seleção aleatória, nossa plataforma oferece uma solução simples, eficaz e segura.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Recursos e Benefícios</h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Interface Intuitiva</p>
                <p className="mt-1 text-sm text-gray-600">Adicione e remova palavras facilmente com uma interface amigável e responsiva.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-1.5">
                <BookOpenIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Lista Ilimitada</p>
                <p className="mt-1 text-sm text-gray-600">Adicione quantas palavras desejar para criar sua lista personalizada de sorteio.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-1.5">
                <BrainIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Algoritmo Inteligente</p>
                <p className="mt-1 text-sm text-gray-600">Sistema de randomização avançado que garante resultados verdadeiramente aleatórios.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-1.5">
                <UsersIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Compartilhamento</p>
                <p className="mt-1 text-sm text-gray-600">Compartilhe os resultados facilmente com todos os participantes.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Aplicações Práticas</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <GraduationCapIcon className="h-5 w-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Educação</h5>
              </div>
              <p className="text-sm text-gray-600">
                Ideal para professores sortearem alunos para apresentações, formar grupos de trabalho ou criar dinâmicas educativas interativas.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Eventos e Sorteios</h5>
              </div>
              <p className="text-sm text-gray-600">
                Perfeito para sorteios de brindes, seleção de ganhadores em promoções ou escolha aleatória de participantes em eventos.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <BrainIcon className="h-5 w-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Dinâmicas de Grupo</h5>
              </div>
              <p className="text-sm text-gray-600">
                Excelente para atividades de team building, jogos em grupo ou distribuição aleatória de tarefas em equipes.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-green-600" />
                <h5 className="font-medium text-gray-900">Decisões Imparciais</h5>
              </div>
              <p className="text-sm text-gray-600">
                Útil para tomar decisões de forma aleatória e justa quando houver múltiplas opções ou candidatos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
        <Perguntas />
      </div>                 
    </div>
  );
}