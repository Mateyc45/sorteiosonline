import React, { useState, useRef, useEffect } from 'react';
import { Dice1Icon, HomeIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateRandomNumber } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { AdSpace } from './AdSpace';



export function RoletaSorteio() {
  window.scrollTo(0, 0);
//const RoletaSorteio = () => {
  const [rotating, setRotating] = useState(false);
  const [result, setResult] = useState(null);
  const [options, setOptions] = useState(['Bicicleta', 'Skate', 'Patins', 'Bola', 'Tenis', 'Violão']);
  const [newOption, setNewOption] = useState('');
  const [rotationDegree, setRotationDegree] = useState(0);
  const [resultHistory, setResultHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const canvasRef = useRef(null);

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#7BC043', '#F37736', '#FFC425'];

  useEffect(() => {
    drawWheel();
  }, [options, rotationDegree]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wheel
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
      
      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerOption / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(option, radius - 10, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw arrow
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
    
    // Random rotation between 1440 and 2160 degrees (4-6 full rotations)
    const spinDegrees = 1440 + Math.random() * 720;
    const currentRotation = rotationDegree % 360;
    const finalRotation = currentRotation + spinDegrees;
    
    // Animation duration
    const duration = 5000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for deceleration
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      const currentProgress = easeOut(progress);
      
      const newRotation = currentRotation + (spinDegrees * currentProgress);
      setRotationDegree(newRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        setRotating(false);
        
        // Calculate result
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

  const addOption = () => {
    if (newOption.trim() && options.length < 12) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const resetOptions = () => {
    setOptions(['Bicicleta', 'Skate', 'Patins', 'Bola', 'Tenis', 'Violão']);
  };

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
  
      
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Sorteador de Roleta</h1>
      
      <div className="w-full flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <div className="relative">
            <canvas 
              ref={canvasRef} 
              width={300} 
              height={300} 
              className="border border-gray-300 rounded-full shadow-lg"
            />
          </div>
          
          <button 
            onClick={spin}
            disabled={rotating || options.length < 2}
            className={`mt-6 px-8 py-3 text-lg font-bold rounded-full shadow-lg transition-transform ${
              rotating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
            }`}
          >
            {rotating ? 'Girando...' : 'GIRAR ROLETA'}
          </button>
          
          {result && (
            <div className="mt-6 p-4 border-2 border-green-500 rounded-lg bg-green-100 shadow-md">
              <h2 className="text-xl font-bold text-center">Resultado:</h2>
              <p className="text-2xl font-bold text-center text-green-600">{result}</p>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Opções da Roleta</h2>
            
            <div className="mb-4 flex">
             
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                 onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddWord();
                  }
                }}
                placeholder="Nova opção"
                className="block w-full rounded-md border border-gray-300 px-4 py-3 text-lg shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                maxLength={20}
              />
              <button
                onClick={addOption}
                disabled={!newOption.trim() || options.length >= 12}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-r"
              >
                Adicionar
              </button>
            </div>
            
            <div className="max-h-64 overflow-y-auto mb-4">
              <ul className="divide-y divide-gray-200">
                {options.map((option, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    <span className="font-medium">{option}</span>
                    <button
                      onClick={() => removeOption(index)}
                      disabled={options.length <= 2}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={resetOptions}
              className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded"
            >
              Restaurar Padrão
            </button>
          </div>
          
          <div className="mt-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center justify-between w-full bg-white p-3 rounded-lg shadow-md hover:bg-gray-50"
            >
              <span className="font-bold">Histórico de Sorteios</span>
              <span>{showHistory ? '▲' : '▼'}</span>
            </button>
            
            {showHistory && resultHistory.length > 0 && (
              <div className="mt-2 bg-white p-4 rounded-lg shadow-md max-h-64 overflow-y-auto">
                <ul className="divide-y divide-gray-200">
                  {resultHistory.map((item, index) => (
                    <li key={index} className="py-2 flex justify-between">
                      <span className="font-medium">{item.option}</span>
                      <span className="text-gray-500 text-sm">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
  
   <AdSpace />

      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Como funciona o sorteio com Roleta?</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            O sorteio de roleta é uma ferramenta versátil e poderosa para realizar sorteios aleatórios entre as opções definidas garantindo resultados justos e imparciais. Nossa plataforma foi desenvolvida pensando na simplicidade e eficiência, permitindo que você realize sorteios de forma rápida e confiável.
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
                <p className="mt-1 text-sm text-gray-600">Adicione até 12 opções diferentes para personalizar seu sorteio.</p>
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
                Ideal para programas de televisão com dinâmicas de sorteio ou eventos de entretenimento com seleção aleatória de participantes
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-medium text-gray-900">Marketing e Promoções</h5>
              <p className="mt-2 text-sm text-gray-600">
                Útil para Sorteio de brindes.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Seleção de ganhadores em promoções.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Definição de cortesias em eventos.
              </p>
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

      <AdSpace />
      
    </div>
   </div>
  );
//};
//export default RoletaSorteio;
};

