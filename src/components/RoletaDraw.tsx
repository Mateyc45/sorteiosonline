import { useState, useRef, useEffect } from 'react';
// import Head from 'next/head'; // REMOVIDO
import { Users, HomeIcon, Dice1Icon, TextIcon, ListIcon, GiftIcon, SparklesIcon, Save, Copy, Check, RotateCcw, LifeBuoy } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ShareButton } from './ShareButton';
import { RaffleCard } from '../components/RaffleCard';
import Perguntas from './perguntas';
import { supabase } from '../lib/supabase';

interface RoletaSalva {
  resultado: string;
  opcoes: string[];
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
    title: 'Sortear Equipes',
    description: 'Faça o sorteio de equipes para diversas atividades',
    icon: <Users className="h-6 w-6" style={{ color: '#0F766E' }} />,
    path: '/Sortear-Equipes',
    gradient: 'from-teal-400 to-teal-100',
  },
];

export function RoletaSorteio() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- ESTADOS ---
  const [error, setError] = useState<string | null>(null);
  const [rotating, setRotating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>(['Bicicleta', 'Skate', 'Patins', 'Bola', 'Tenis', 'Violão']);
  const [newOption, setNewOption] = useState('');
  const [rotationDegree, setRotationDegree] = useState(0);
  const [resultHistory, setResultHistory] = useState<{option: string, time: string}[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);
  
  // Estados Supabase/UX
  const [isSaving, setIsSaving] = useState(false);
  const [loadingBanco, setLoadingBanco] = useState(false);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = ['#FF4500', '#32CD32', '#1E90FF', '#FF1493', '#8A2BE2', '#20B2AA', '#FFD700', '#FF6347', '#3CB371', '#6A5ACD', '#DC143C', '#00FA9A'];

  // Atualiza Título
  useEffect(() => {
    document.title = id 
      ? "Resultado da Roleta - Vamo Sortear" 
      : "Roleta Online Personalizada - Vamo Sortear";
    window.scrollTo(0, 0);
  }, [id]);

  const formatarData = (date: Date) => {
    const twoDigits = (num: number) => num.toString().padStart(2, '0');
    return `${twoDigits(date.getDate())}/${twoDigits(date.getMonth() + 1)}/${date.getFullYear()} - ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;
  };

  // Carregar do Banco
  useEffect(() => {
    if (id) {
      const buscarRoletaSalva = async () => {
        setLoadingBanco(true);
        const { data, error } = await supabase
          .from('sorteios_roleta')
          .select('*')
          .eq('id_curto', id)
          .single();

        if (data && !error) {
          const dados = data.dados_roleta as RoletaSalva;
          setResult(dados.resultado);
          setOptions(dados.opcoes);
          
          const dataBanco = new Date(data.created_at);
          setsorteioTime(formatarData(dataBanco));
        }
        setLoadingBanco(false);
      };
      buscarRoletaSalva();
    } else {
        setResult(null);
    }
  }, [id]);

  // Desenhar Roleta
  useEffect(() => {
    drawWheel();
  }, [options, rotationDegree]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const anglePerOption = 2 * Math.PI / options.length;
    
    options.forEach((option, index) => {
      const startAngle = index * anglePerOption + (rotationDegree * Math.PI / 180);
      const endAngle = (index + 1) * anglePerOption + (rotationDegree * Math.PI / 180);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerOption / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(option.substring(0, 15), radius - 10, 5);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + radius + 10, centerY);
    ctx.lineTo(centerX + radius - 20, centerY - 15);
    ctx.lineTo(centerX + radius - 20, centerY + 15);
    ctx.closePath();
    ctx.fillStyle = '#FF0000';
    ctx.fill();
  };

  const spin = () => {
    if (rotating || options.length < 2) return;
    
    setRotating(true);
    setResult(null);
    
    const agora = new Date();
    setsorteioTime(formatarData(agora));

    const spinDegrees = 1440 + Math.random() * 720;
    const currentRotation = rotationDegree % 360;
    const duration = 5000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentProgress = easeOut(progress);
      
      const newRotation = currentRotation + (spinDegrees * currentProgress);
      setRotationDegree(newRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setRotating(false);
        const anglePerOption = 360 / options.length;
        const normalizedRotation = (newRotation % 360);
        const resultIndex = options.length - 1 - Math.floor(normalizedRotation / anglePerOption) % options.length;
        const selectedOption = options[resultIndex];
        
        setResult(selectedOption);
        setResultHistory(prev => [
          { option: selectedOption, time: new Date().toLocaleTimeString() }, 
          ...prev.slice(0, 9)
        ]);
      }
    };
    animate();
  };

  const handleSave = async () => {
    if (!result) return;
    setIsSaving(true);

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipRes.json();

      const { data: recentes } = await supabase
        .from('sorteios_roleta')
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
        .from('sorteios_roleta')
        .insert([{
          id_curto: novoId,
          dados_roleta: { resultado: result, opcoes: options },
          user_ip: ip
        }]);

      if (!error) {
        navigate(`/roleta/${novoId}`);
      } else {
        console.error(error);
        alert("Erro ao salvar.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão.");
    } finally {
      setIsSaving(false);
    }
  };

  const addOption = () => {
    const word = newOption.trim();
    if (!word) { setError('Digite uma opção.'); return; }
    if (options.includes(word)) { setError('Opção já existe.'); return; }
    if (options.length >= 20) { setError('Máximo de 20 opções.'); return; }

    setOptions([...options, word]);
    setNewOption('');
    setError(null);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
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
  
      <div className="flex flex-col items-center max-w-4xl mx-auto p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6 flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 p-3 shadow-md">
                <LifeBuoy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-900">
                {id ? "Resultado da Roleta" : "Sorteador de Roleta"}
            </h1>
            {id && result && (
        <div className="my-6">
             <ShareButton 
                title="Resultado da Roleta" 
                text={`A roleta sorteou: ${result}. Confira: ${window.location.href}`} 
            />
        </div>
      )}
        </div>
      
        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* ESQUERDA: CANVAS */}
          <div className="w-full md:w-2/3 flex flex-col items-center">
            <div className="relative">
              <canvas 
                ref={canvasRef} 
                width={300} 
                height={300} 
                className="border border-gray-300 rounded-full shadow-lg bg-white"
              />
            </div>
            
            {!id && (
                <button 
                onClick={spin}
                disabled={rotating || options.length < 2 || isSaving}
                className={`mt-6 px-8 py-3 text-lg font-bold rounded-full shadow-lg transition-transform ${
                    rotating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                }`}
                >
                {rotating ? 'Girando...' : 'GIRAR ROLETA'}
                </button>
            )}
            
            {result && (
              <div className="mt-6 w-full animate-in zoom-in duration-300">
                <div className="p-6 border-2 border-green-500 rounded-xl bg-green-50 shadow-md text-center">
                    <p className="text-sm uppercase tracking-wide text-green-600 font-bold mb-1">Vencedor</p>
                    <p className="text-4xl font-black text-gray-800 break-words">{result}</p>
                </div>
                
                {!id && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="mt-4 w-full py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition flex items-center justify-center gap-2"
                    >
                        {isSaving ? "Salvando..." : <><Save className="w-5 h-5"/> Salvar Resultado</>}
                    </button>
                )}
              </div>
            )}

            {result && (
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">Sorteio realizado em</p>
                    <p className="text-lg font-bold text-gray-700">{sorteioTime}</p>
                </div>
            )}
          </div>
          
          {/* DIREITA: OPÇÕES */}
          <div className="w-full md:w-1/3">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Opções</h2>
              
              {!id && (
                  <div className="mb-4 flex flex-col gap-2">
                    <div className="flex gap-2">
                        <input
                        type="text"
                        value={newOption}
                        onChange={(e) => {
                            setNewOption(e.target.value);
                            setError(null);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && addOption()}
                        placeholder="Nova opção"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        maxLength={20}
                        />
                        <button
                        onClick={addOption}
                        disabled={!newOption.trim() || options.length >= 20}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md font-bold"
                        >
                        +
                        </button>
                    </div>
                    {error && <p className="text-xs text-red-600">{error}</p>}
                  </div>
              )}
              
              <div className="max-h-64 overflow-y-auto mb-4 pr-1">
                <ul className="divide-y divide-gray-100">
                  {options.map((option, index) => (
                    <li key={index} className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700 truncate">{option}</span>
                      {!id && (
                          <button
                            onClick={() => removeOption(index)}
                            disabled={options.length <= 2}
                            className="text-gray-400 hover:text-red-500 disabled:opacity-30"
                          >
                            <span className="sr-only">Remover</span>
                            ✕
                          </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              {!id && (
                  <button
                    onClick={() => setOptions(['Bicicleta', 'Skate', 'Patins', 'Bola', 'Tenis', 'Violão'])}
                    className="w-full text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Restaurar Padrão
                  </button>
              )}
            </div>
            
            {/* BOTÕES DE AÇÃO (MODO ID) */}
            {id && (
                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={handleCopyLink}
                        className={`w-full py-3 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        {copied ? "Link Copiado!" : "Copiar Link"}
                    </button>

                    <button
                        onClick={() => {
                            setResult(null);
                            navigate('/roleta');
                        }}
                        className="w-full py-3 border-2 border-gray-200 bg-white rounded-xl font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Criar Nova Roleta
                    </button>
                </div>
            )}

            {!id && resultHistory.length > 0 && (
                <div className="mt-4">
                    <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center justify-between w-full bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-sm"
                    >
                    <span className="font-bold text-gray-700">Histórico Recente</span>
                    <span>{showHistory ? '▲' : '▼'}</span>
                    </button>
                    
                    {showHistory && (
                    <div className="mt-2 bg-white p-3 rounded-lg shadow-inner border border-gray-100 max-h-40 overflow-y-auto text-sm">
                        {resultHistory.map((item, index) => (
                        <div key={index} className="py-1 flex justify-between border-b border-gray-50 last:border-0">
                            <span className="font-medium">{item.option}</span>
                            <span className="text-gray-400 text-xs">{item.time}</span>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
            )}
          </div>
        </div>
      </div>
  

      {/* --- SEO E TEXTOS FINAIS --- */}
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
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio com Roleta?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
          O sorteio de roleta é uma ferramenta versátil e poderosa, projetada para realizar sorteios aleatórios de forma divertida e eficiente entre as opções definidas, garantindo resultados totalmente justos, equilibrados e imparciais. Utilizando tecnologia de ponta, nosso sistema assegura que cada opção tenha a mesma chance de ser escolhida, sem qualquer viés ou interferência externa. A plataforma foi desenvolvida com foco na simplicidade e eficiência, oferecendo uma interface intuitiva que permite a realização de sorteios de maneira rápida, confiável e totalmente transparente. Seja para sorteios de prêmios, distribuições de tarefas ou decisões em grupo, nossa ferramenta oferece uma solução prática e eficaz, proporcionando uma experiência agradável e sem complicações. Com o sorteio de roleta, você pode garantir a imparcialidade e a diversão em qualquer tipo de evento ou atividade.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Principais características</h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Totalmente Aleatório</p>
                <p className="mt-1 text-sm text-gray-600">O resultado é determinado por um processo completamente randômico. </p>
                <p className="mt-1 text-sm text-gray-600">A imprevisibilidade é garantida pela física do movimento rotacional. </p>
                <p className="mt-1 text-sm text-gray-600">Cada opção tem uma probabilidade matemática definida de ser selecionada.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Itens Personalizado</p>
                <p className="mt-1 text-sm text-gray-600">Define facilmente os itens personalizados.</p>
                <p className="mt-1 text-sm text-gray-600">Adicione até 20 opções diferentes para personalizar seu sorteio.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Compartilhamento Fácil</p>
                <p className="mt-1 text-sm text-gray-600">Compartilhe os resultados instantaneamente com participantes através de diferentes plataformas.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-1.5">
                <SparklesIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Interface Intuitiva</p>
                <p className="mt-1 text-sm text-gray-600">Design moderno e fácil de usar, sem necessidade de configurações complexas.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-900">Aplicações práticas</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Sorteios e Rifas</h5>
              <p className="mt-2 text-sm text-gray-600">
                Perfeito para realizar sorteios de rifas, bingos e outros eventos onde é necessário escolher números aleatoriamente.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Jogos e Entretenimento</h5>
              <p className="mt-2 text-sm text-gray-600">
                Ideal para programas de televisão com dinâmicas de sorteio ou eventos de entretenimento com seleção aleatória de participantes.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Marketing e Promoções</h5>
              <p className="mt-2 text-sm text-gray-600">Útil para Sorteio de brindes.</p>
              <p className="mt-2 text-sm text-gray-600">Seleção de ganhadores em promoções.</p>
              <p className="mt-2 text-sm text-gray-600">Definição de cortesias em eventos.</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Negócios e Gestão</h5>
              <p className="mt-2 text-sm text-gray-600">
                Excelente para Distribuição de tarefas em equipes.
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