import React, { useState, useEffect } from 'react';
import { Users, Dice1Icon, LifeBuoy, TextIcon, ListIcon, GiftIcon, HomeIcon, PlusIcon, XIcon, SparklesIcon, HeartIcon, UsersIcon, CalendarIcon, TrophyIcon, StarIcon, CheckCircle, Share2, Copy, Check, Mail, ShieldCheckIcon, ZapIcon, Smartphone, LockIcon } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { shuffleArray } from '../lib/utils';
import { sendEmail } from '../lib/email';
import { RaffleCard } from '../components/RaffleCard';
import Perguntas from './perguntas';
import { supabase } from '../lib/supabase';

interface Participant {
  name: string;
  email: string;
}

interface EventoSalvo {
  participantes: Participant[];
  sugestao: string;
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
    title: 'Roleta',
    description: 'Rode a roleta e descubra o resultado de forma divertida',
    icon: <LifeBuoy className="h-6 w-6 text-red-600" />,
    path: '/roleta',
    gradient: 'from-orange-500 to-yellow-400',
  },
  {
      title: 'Sortear Equipes',
      description: 'Faça o sorteio de equipes para diversas atividades',
      icon: <Users className="h-6 w-6" style={{ color: '#0F766E' }}/>,
      path: '/Sortear-Equipes',
      gradient: 'from-teal-400 to-teal-100',
  },
];

export function SecretSantaDraw() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '' });
  const [giftSuggestion, setGiftSuggestion] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailProgress, setEmailProgress] = useState<number>(0);
  
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [savedEvent, setSavedEvent] = useState<EventoSalvo | null>(null);
  const [eventDate, setEventDate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = id 
      ? "Resultado do Sorteio Amigo Secreto - Vamo Sortear" 
      : "Sorteio de Amigo Secreto Online Grátis e Automático | Vamo Sortear";
    window.scrollTo(0, 0);
  }, [id]);

  const formatarData = (date: Date) => {
    const twoDigits = (num: number) => num.toString().padStart(2, '0');
    return `${twoDigits(date.getDate())}/${twoDigits(date.getMonth() + 1)}/${date.getFullYear()} às ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;
  };

  useEffect(() => {
    if (id) {
      const buscarEvento = async () => {
        setLoadingBanco(true);
        const { data, error } = await supabase
          .from('sorteios_amigo_secreto')
          .select('*')
          .eq('id_curto', id)
          .single();

        if (data && !error) {
          const dados = data.dados_evento as EventoSalvo;
          setSavedEvent(dados);
          const dataBanco = new Date(data.created_at);
          setEventDate(formatarData(dataBanco));
        }
        setLoadingBanco(false);
      };
      buscarEvento();
    }
  }, [id]);

  const handleAddParticipant = () => {
    if (newParticipant.name.trim() && newParticipant.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newParticipant.email.trim())) {
        setError('Por favor, insira um email válido');
        return;
      }

      if (participants.some(p => p.email.toLowerCase() === newParticipant.email.trim().toLowerCase())) {
        setError('Este email já foi adicionado');
        return;
      }

      setParticipants([...participants, {
        name: newParticipant.name.trim(),
        email: newParticipant.email.trim().toLowerCase()
      }]);
      setNewParticipant({ name: '', email: '' });
      setError(null);
      setSuccess(null);
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
    setError(null);
    setSuccess(null);
  };

  const handleDrawAndSave = async () => {
    if (participants.length < 2) {
      setError('Recomendamos pelo menos 2 participantes para que o sorteio seja divertido!');
      return;
    }

    setIsDrawing(true);
    setError(null);
    setSuccess(null);
    setEmailProgress(0);
    
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const { data: recentes } = await supabase
        .from('sorteios_amigo_secreto')
        .select('created_at')
        .eq('user_ip', ip)
        .gt('created_at', new Date(Date.now() - 60000).toISOString());

      if (recentes && recentes.length > 0) {
        throw new Error("Por segurança, aguarde 1 minuto para realizar outro sorteio.");
      }

      let validDraw = false;
      let pairs: [Participant, Participant][] = [];
      let attempts = 0;
      const maxAttempts = 200;

      while (!validDraw && attempts < maxAttempts) {
        attempts++;
        const shuffled = shuffleArray([...participants]);
        validDraw = true;
        pairs = [];

        for (let i = 0; i < participants.length; i++) {
          const giver = participants[i];
          const receiver = shuffled[i];

          if (giver.email === receiver.email) {
            validDraw = false;
            break;
          }
          pairs.push([giver, receiver]);
        }
      }

      if (!validDraw) {
        throw new Error('Não foi possível gerar uma combinação válida. Tente adicionar mais participantes.');
      }

      let successCount = 0;
      const failedEmails: string[] = [];

      for (const [giver, receiver] of pairs) {
        try {
          await sendEmail({
            to: giver.email,
            subject: '🎁 Sorteio Realizado: Seu Amigo Secreto!',
            templateParams: {
              to_email: giver.email,
              to_name: giver.name,
              subject: '🎁 Sorteio Realizado: Seu Amigo Secreto!',
              drawn_person: receiver.name,
              gift_suggestion: giftSuggestion || 'Sem sugestão definida.'
            }
          });
          successCount++;
        } catch (err) {
          console.error(`Erro ao enviar para ${giver.email}:`, err);
          failedEmails.push(giver.email);
        }
        setEmailProgress(Math.round(((successCount + failedEmails.length) / pairs.length) * 100));
      }

      if (failedEmails.length === pairs.length) {
        throw new Error('Falha crítica no envio de emails. Verifique sua conexão.');
      }

      const novoId = Math.random().toString(36).substring(2, 8);
      
      const { error: dbError } = await supabase
        .from('sorteios_amigo_secreto')
        .insert([{
          id_curto: novoId,
          dados_evento: { 
            participantes: participants,
            sugestao: giftSuggestion 
          },
          user_ip: ip
        }]);

      if (!dbError) {
        navigate(`/Amigo-Secreto/${novoId}`);
      } else {
        setSuccess(`Sorteio concluído! ${successCount} emails enviados.`);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    } finally {
      setIsDrawing(false);
      setEmailProgress(0);
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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {id ? "Confirmação do Evento 🎁" : "Sorteador de Amigo Secreto Online"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {id 
            ? "O sorteio foi realizado e os segredos foram enviados por e-mail." 
            : "A ferramenta mais segura e fácil para organizar seu Amigo Oculto. Sem cadastro, rápido e gratuito."}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 p-6 md:p-8 shadow-lg mb-12">
        
        {id && savedEvent ? (
            <div className="text-center animate-in fade-in duration-700">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-green-100 p-4 shadow-sm animate-bounce">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sorteio Realizado com Sucesso!</h2>
                <p className="text-gray-500 mb-8">Evento registrado em: <span className="font-semibold">{eventDate}</span></p>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left max-w-2xl mx-auto">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                        <UsersIcon className="h-5 w-5 text-red-500"/>
                        Lista de Participantes ({savedEvent.participantes.length})
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {savedEvent.participantes.map((participante, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-2 rounded border border-gray-100">
                                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                                    {participante.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-medium truncate">{participante.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{participante.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    {savedEvent.sugestao && (
                        <div className="mt-4 pt-4 border-t border-gray-100 bg-yellow-50 p-3 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 mb-1 text-sm flex items-center gap-2">
                                <GiftIcon className="h-4 w-4"/> Regras/Sugestões:
                            </h3>
                            <p className="text-gray-700 text-sm italic">"{savedEvent.sugestao}"</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={handleCopyLink}
                        className={`px-6 py-3 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 ${copied ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                        {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                        {copied ? "Link Copiado!" : "Compartilhar com o Grupo"}
                    </button>
                    
                    <button
                        onClick={() => navigate('/Amigo-Secreto')}
                        className="px-6 py-3 border-2 border-gray-200 bg-white rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition"
                    >
                        Organizar Novo Sorteio
                    </button>
                </div>
            </div>
        ) : (
        <>
            <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-red-600 to-pink-600 p-3 shadow-md">
                <GiftIcon className="h-8 w-8 text-white" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Configuração do Evento</h2>
                <p className="text-gray-600 mt-1 text-sm">Preencha os dados abaixo para começar</p>
            </div>
            </div>

            <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <SparklesIcon className="h-4 w-4 text-yellow-500" />
                Regras ou Sugestão de Presente (Opcional)
                </label>
                <input
                type="text"
                value={giftSuggestion}
                onChange={(e) => setGiftSuggestion(e.target.value)}
                placeholder="Ex: Valor entre R$50 e R$100. Tema: Canecas Divertidas."
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
            </div>

            <div className="border-t border-red-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-gray-500" />
                    Adicionar Participantes
                </h3>
                
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1">
                            <label className="sr-only">Nome</label>
                            <input
                            type="text"
                            value={newParticipant.name}
                            onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                            placeholder="Nome do amigo"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="sr-only">Email</label>
                            <input
                            type="email"
                            value={newParticipant.email}
                            onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                            placeholder="Email para receber o sorteio"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            />
                        </div>
                        <button
                        onClick={handleAddParticipant}
                        className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                        >
                        <PlusIcon className="h-5 w-5" />
                        <span className="hidden md:inline">Adicionar</span>
                        </button>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">
                        <XIcon className="h-4 w-4" /> {error}
                        </div>
                    )}
                </div>
            </div>

            {participants.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-3 flex justify-between items-center">
                    <span>Lista de Participantes</span>
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">{participants.length} pessoas</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {participants.map((participant, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 border border-gray-100 hover:border-red-200 transition-colors"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                {participant.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="truncate">
                                <p className="text-sm font-medium text-gray-800 truncate">{participant.name}</p>
                                <p className="text-xs text-gray-500 truncate">{participant.email}</p>
                            </div>
                        </div>
                        <button
                        onClick={() => handleRemoveParticipant(index)}
                        className="rounded-full p-1.5 text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                        title="Remover"
                        >
                        <XIcon className="h-4 w-4" />
                        </button>
                    </div>
                    ))}
                </div>
                </div>
            )}

            <button
                onClick={handleDrawAndSave}
                disabled={participants.length < 2 || isDrawing}
                className={`relative w-full overflow-hidden rounded-xl px-6 py-4 text-center text-lg font-bold text-white shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none
                ${isDrawing ? 'bg-gray-400' : 'bg-gradient-to-r from-red-600 to-pink-600 hover:scale-[1.01] hover:shadow-xl'}`}
            >
                {isDrawing ? (
                <div className="flex items-center justify-center gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
                    <span>Sorteando e Enviando ({emailProgress}%)...</span>
                </div>
                ) : (
                <span className="flex items-center justify-center gap-2">
                    <SparklesIcon className="h-5 w-5" />
                    Realizar Sorteio Agora
                </span>
                )}
            </button>

            {isDrawing && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-red-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${emailProgress}%` }}></div>
                </div>
            )}
            </div>
        </>
        )}
      </div>

      <div className="mt-12 space-y-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Explore Outras Ferramentas</h2>
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-2 ${raffleTypes.length % 2 !== 0 ? 'lg:grid-cols-2 lg:justify-items-center' : ''}`}>
                {raffleTypes.map((raffle, index) => (
                <Link
                    key={index}
                    to={raffle.path}
                    className={`${raffleTypes.length % 2 !== 0 && index === raffleTypes.length - 1 ? 'lg:col-span-2 lg:justify-self-center w-full' : ''}`}
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

        {/* --- CONTEÚDO SEO MASTER (Sem o FAQ duplicado) --- */}
        <section className="space-y-12 text-gray-700">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                        O Melhor Organizador de <span className="text-red-600">Amigo Secreto Online</span>
                    </h2>
                    <p className="text-lg leading-relaxed mb-6">
                        Chega de papeizinhos! O <strong>Vamo Sortear</strong> é a solução moderna, gratuita e segura para organizar a tradicional brincadeira de fim de ano. 
                        Nossa ferramenta de <em>Amigo Oculto</em> automatiza todo o processo: desde o cadastro dos participantes até o envio sigiloso dos resultados por e-mail.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span>100% Gratuito e sem limite de participantes.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span>Não precisa de cadastro ou login.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span>Compatível com Celular, Tablet e PC.</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                    <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                        <ShieldCheckIcon className="h-6 w-6"/> Privacidade Garantida
                    </h3>
                    <p className="mb-4 text-sm text-red-900">
                        Levamos sua privacidade a sério. Diferente de outros sites, nós não vendemos seus dados. Os e-mails são utilizados <strong>apenas</strong> para enviar o resultado do sorteio.
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-medium text-gray-800 text-sm">🔒 Algoritmo Anti-Repetição</p>
                        <p className="text-xs text-gray-500 mt-1">Nosso sistema garante matematicamente que ninguém tire a si mesmo no sorteio.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Como Funciona o Sorteio de Amigo Oculto?</h2>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div className="p-4">
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                        <h3 className="font-bold text-gray-900 mb-2">Cadastre</h3>
                        <p className="text-sm text-gray-600">Insira o nome e o e-mail de todos os participantes do grupo (família, trabalho ou amigos).</p>
                    </div>
                    <div className="p-4">
                        <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                        <h3 className="font-bold text-gray-900 mb-2">Personalize</h3>
                        <p className="text-sm text-gray-600">Defina valor do presente, data da revelação ou local da festa nas observações.</p>
                    </div>
                    <div className="p-4">
                        <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                        <h3 className="font-bold text-gray-900 mb-2">Sorteie</h3>
                        <p className="text-sm text-gray-600">Clique em sortear. Nosso algoritmo embaralha tudo em segundos e gera os pares.</p>
                    </div>
                    <div className="p-4">
                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                        <h3 className="font-bold text-gray-900 mb-2">Pronto!</h3>
                        <p className="text-sm text-gray-600">Cada um recebe seu amigo secreto no e-mail discretamente. Ninguém sabe quem tirou quem!</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Dicas para um Amigo Secreto Perfeito</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <ZapIcon className="h-4 w-4 text-yellow-500" /> Defina um Tema
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">Torne a brincadeira mais divertida definindo temas como "Caneca Divertida", "Havaianas", "Livros", "Chocolate" ou "Inimigo Secreto".</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <ZapIcon className="h-4 w-4 text-yellow-500" /> Estipule um Valor
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">Para ser justo com todos, sempre defina um valor mínimo e máximo para os presentes no campo de sugestões da nossa ferramenta.</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <ZapIcon className="h-4 w-4 text-yellow-500" /> Use Apelidos
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">Se houver pessoas com o mesmo nome na família, use sobrenomes ou apelidos para evitar confusão na hora de receber o e-mail.</p>
                        </div>
                    </div>
                </div>
                
                <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <Smartphone className="h-6 w-6"/> Mobile Friendly
                    </h3>
                    <p className="text-indigo-800 mb-4">
                        Nosso site funciona perfeitamente no celular! Você pode organizar o sorteio na hora do almoço, no transporte ou na reunião de família usando apenas o smartphone.
                    </p>
                    <div className="bg-white/60 p-4 rounded-lg">
                        <p className="text-sm text-indigo-700 italic">
                            "A melhor ferramenta de amigo secreto que já usei. Simples, direta e sem propagandas chatas atrapalhando o processo."
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
        <Perguntas />
      </div> 
    </div>
  );
}