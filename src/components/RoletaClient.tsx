'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Users, HomeIcon, Dice1, TextIcon, ListOrdered, Gift, Sparkles, 
  Save, Copy, Check, RotateCcw, LifeBuoy, Plus, X, Trash2, Share2 
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ShareButton } from '@/components/ShareButton';
import { RaffleCard } from '@/components/RaffleCard';
import Perguntas from '@/components/perguntas';
import { supabase } from '@/lib/supabase';

// Interface
interface RoletaSalva {
  resultado: string;
  opcoes: string[];
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
    title: 'Sortear Equipes',
    description: 'Faça o sorteio de equipes para diversas atividades',
    icon: <Users className="h-6 w-6" style={{ color: '#0F766E' }} />,
    path: '/Sortear-Equipes',
    gradient: 'from-teal-400 to-teal-100',
  },
];

export function RoletaDrawClient() {
  const params = useParams();
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const router = useRouter();

  // Estados
  const [error, setError] = useState<string | null>(null);
  const [rotating, setRotating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>(['Bicicleta', 'Skate', 'Patins', 'Bola', 'Tênis', 'Violão']);
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
  // Cores vibrantes para a roleta
  const colors = ['#FF4500', '#32CD32', '#1E90FF', '#FF1493', '#8A2BE2', '#20B2AA', '#FFD700', '#FF6347', '#3CB371', '#6A5ACD', '#DC143C', '#00FA9A'];

  // SEO Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Roleta Online Personalizada - VamoSortear",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web",
        "description": "Crie sua roleta personalizada e faça sorteios divertidos online.",
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

  // Função de Desenho da Roleta (Canvas)
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
      
      // Fatia da Pizza
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      // Texto
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerOption / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Inter, Arial';
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;
      ctx.fillText(option.substring(0, 15), radius - 20, 5);
      ctx.restore();
    });

    // Centro Branco
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Seta Indicadora (Triângulo)
    ctx.beginPath();
    ctx.moveTo(centerX + radius + 15, centerY);
    ctx.lineTo(centerX + radius - 15, centerY - 12);
    ctx.lineTo(centerX + radius - 15, centerY + 12);
    ctx.closePath();
    ctx.fillStyle = '#1f2937'; // Cinza escuro
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Re-desenhar quando mudar opções ou ângulo
  useEffect(() => {
    drawWheel();
  }, [options, rotationDegree]);

  const spin = () => {
    if (rotating || options.length < 2) return;
    
    setRotating(true);
    setResult(null);
    
    const agora = new Date();
    setsorteioTime(formatarData(agora));

    // Lógica da Física da Roleta
    const spinDegrees = 1440 + Math.random() * 720; // Mínimo 4 voltas completas
    const currentRotation = rotationDegree % 360;
    const duration = 5000; // 5 segundos
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Função de Easing (Desaceleração suave)
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentProgress = easeOut(progress);
      
      const newRotation = currentRotation + (spinDegrees * currentProgress);
      setRotationDegree(newRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setRotating(false);
        // Calcular o vencedor baseado no ângulo final
        const anglePerOption = 360 / options.length;
        const normalizedRotation = (newRotation % 360);
        // A lógica do índice precisa considerar que o canvas desenha sentido horário e o ângulo 0 é direita
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
        router.push(`/roleta/${novoId}`);
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
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    } else {
        setError('A roleta precisa de pelo menos 2 opções.');
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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Script SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Navegação" className="mb-6">
        <Link
          href="/"
          title="Voltar para a página inicial"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-yellow-600 transition-colors border border-gray-200 shadow-sm"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </nav>
  
      <main className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-yellow-100">
        
        {/* LADO ESQUERDO: CANVAS DA ROLETA */}
        <div className="w-full lg:w-3/5 flex flex-col items-center">
            
            <header className="mb-6 text-center lg:text-left w-full flex items-center justify-center lg:justify-start gap-3">
                <div className="rounded-xl bg-yellow-500 p-2 shadow-md shadow-yellow-200">
                    <LifeBuoy className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {id ? "Resultado da Roleta" : "Sorteador de Roleta"}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {id ? 'Veja abaixo o item sorteado.' : 'Gire a roleta e deixe a sorte decidir!'}
                    </p>
                </div>
            </header>

            <div className="relative group">
                {/* Canvas com sombra e borda */}
                <canvas 
                    ref={canvasRef} 
                    width={400} 
                    height={400} 
                    className="w-full max-w-[350px] md:max-w-[400px] h-auto border-4 border-gray-100 rounded-full shadow-2xl bg-white transition-transform duration-700"
                />
                {/* Seta decorativa central fixa (opcional, já desenhada no canvas, mas pode ser HTML) */}
            </div>
            
            {/* Botão de Girar (Só aparece se não for resultado salvo) */}
            {!id && (
                <button 
                onClick={spin}
                disabled={rotating || options.length < 2 || isSaving}
                className={`mt-8 w-full max-w-xs py-4 px-8 text-xl font-black uppercase tracking-wider rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                    rotating 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:to-orange-600 hover:shadow-orange-200'
                }`}
                >
                {rotating ? (
                    <><RotateCcw className="animate-spin h-6 w-6"/> Girando...</>
                ) : (
                    'GIRAR AGORA'
                )}
                </button>
            )}
            
            {/* CARD DE RESULTADO */}
            {result && (
                <div className="mt-8 w-full max-w-md animate-in zoom-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 border-2 border-yellow-400 rounded-2xl bg-yellow-50 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                        <p className="text-xs uppercase tracking-[0.2em] text-yellow-700 font-bold mb-2">Opção Sorteada</p>
                        <p className="text-4xl md:text-5xl font-black text-gray-900 break-words drop-shadow-sm">{result}</p>
                        
                        <div className="mt-4 pt-4 border-t border-yellow-200 flex items-center justify-center gap-2 text-xs text-yellow-800">
                            <RotateCcw className="w-3 h-3" /> Sorteio realizado em {sorteioTime}
                        </div>
                    </div>
                    
                    {/* Botões pós-resultado */}
                    <div className="mt-4 grid grid-cols-1 gap-3">
                        {!id ? (
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2 shadow-lg"
                            >
                                {isSaving ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div> : <><Save className="w-5 h-5"/> SALVAR RESULTADO</>}
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleCopyLink}
                                    className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 border-2 ${copied ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    {copied ? "Link Copiado!" : "Copiar Link"}
                                </button>
                                <button
                                    onClick={() => {
                                        setResult(null);
                                        router.push('/roleta');
                                    }}
                                    className="w-full py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition flex items-center justify-center gap-2 shadow-md"
                                >
                                    <RotateCcw className="w-5 h-5" /> Criar Nova Roleta
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
        
        {/* LADO DIREITO: LISTA DE OPÇÕES */}
        <div className="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-8 pt-8 lg:pt-0">
            <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-yellow-500" /> 
                Itens da Roleta
            </h2>
            
            {!id && (
                <div className="mb-6">
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newOption}
                            onChange={(e) => {
                                setNewOption(e.target.value);
                                setError(null);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && addOption()}
                            placeholder="Adicionar item..."
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all"
                            maxLength={25}
                        />
                        <button
                            onClick={addOption}
                            disabled={!newOption.trim() || options.length >= 20}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm disabled:opacity-50 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    {error && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><X className="w-3 h-3"/> {error}</p>}
                </div>
            )}
            
            <div className="bg-gray-50 rounded-xl p-2 max-h-[400px] overflow-y-auto border border-gray-100 custom-scrollbar">
                <ul className="space-y-2">
                    {options.map((option, index) => (
                    <li key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 group hover:border-yellow-200 transition-all">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></span>
                            <span className="font-medium text-gray-700 truncate max-w-[180px]">{option}</span>
                        </div>
                        {!id && (
                            <button
                                onClick={() => removeOption(index)}
                                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                title="Remover item"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </li>
                    ))}
                </ul>
            </div>
            
            {!id && (
                <div className="mt-4 flex justify-between items-center text-xs text-gray-400 px-2">
                    <span>{options.length} / 20 itens</span>
                    <button
                        onClick={() => setOptions(['Bicicleta', 'Skate', 'Patins', 'Bola', 'Tênis', 'Violão'])}
                        className="hover:text-yellow-600 underline decoration-dotted"
                    >
                        Restaurar Padrão
                    </button>
                </div>
            )}

            {/* Histórico Recente (Só mostra se tiver histórico e não for link salvo) */}
            {!id && resultHistory.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="flex items-center justify-between w-full text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <span>Histórico de Giros</span>
                        <span>{showHistory ? 'Esconder' : 'Mostrar'}</span>
                    </button>
                    
                    {showHistory && (
                        <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2">
                            {resultHistory.map((item, index) => (
                                <div key={index} className="flex justify-between text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                    <span className="font-medium">{item.option}</span>
                                    <span className="text-gray-400">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
      </main>
 
      {/* TEXTOS SEO & LINKS */}
      <div className="mt-12 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" /> 
            Outros Sorteios
        </h2>
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-2`}>
          {raffleTypes.map((raffle, index) => (
            <Link key={index} href={raffle.path} className="block group no-underline transition-transform hover:-translate-y-1">
              <RaffleCard title={raffle.title} description={raffle.description} icon={raffle.icon} gradient={raffle.gradient} />
            </Link>
          ))}
        </div>
      </div>

      <article className="mt-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm prose prose-yellow max-w-none">
         <h3 className="text-2xl font-bold text-gray-900 mb-4">Roleta Aleatória Online Grátis</h3>
         <p className="text-gray-600 mb-4">
            A <strong>Roleta do VamoSortear</strong> é a ferramenta perfeita para decisões divertidas e imparciais. Seja para sortear um prêmio, escolher quem começa o jogo ou decidir o sabor da pizza, nossa roleta virtual garante que todas as opções tenham a mesma probabilidade matemática de serem escolhidas.
         </p>
         <div className="grid md:grid-cols-2 gap-6 mt-6 not-prose">
            <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">🎯 Para que serve?</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Sorteios de Instagram e Redes Sociais.</li>
                    <li>Gamificação em sala de aula.</li>
                    <li>Dinâmicas de quebra-gelo em reuniões.</li>
                    <li>Decisões de grupo sem brigas.</li>
                </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">⚡ Vantagens</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Sem limite de giros.</li>
                    <li>Totalmente customizável (cores e textos).</li>
                    <li>Link de resultado auditável.</li>
                    <li>Funciona no celular e PC.</li>
                </ul>
            </div>
         </div>
      </article>
      
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-8">
        <Perguntas />
      </div> 
    </div>
  );
}