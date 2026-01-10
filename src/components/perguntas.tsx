'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import perguntasData from '../lib/Perguntas.json';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Perguntas = () => {
  const pathname = usePathname();
  
  // Tratamento seguro da rota
  const rotaAtual = pathname ? (pathname.split('/')[1] || 'Home') : 'Home';

  const perguntasFiltradas = perguntasData.filter((item) => {
    // 1. BLINDAGEM: Se o item não tiver ID ou ID não for texto, ignora
    if (!item.id || typeof item.id !== 'string') return false;

    // 2. Lógica normal
    return item.id === "0" || item.id.toLowerCase() === rotaAtual.toLowerCase();
  });

  const [abertos, setAbertos] = useState<Record<number, boolean>>({});

  const toggleResposta = (index: number) => {
    setAbertos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (perguntasFiltradas.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className='text-center mb-4 font-bold text-xl text-gray-800'>Perguntas frequentes</h2>
      
      {perguntasFiltradas.map((item, index) => {
        const estaAberto = !!abertos[index];

        return (
          <div key={index} className="bg-gray-50 rounded-xl flex flex-col mb-3 border border-gray-200 overflow-hidden">
            <button 
              onClick={() => toggleResposta(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
              aria-expanded={estaAberto}
            >
              <span className="font-bold text-gray-800 text-sm md:text-base pr-4">
                • {item.pergunta}
              </span>
              <span className="text-gray-500 shrink-0">
                {estaAberto ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>

            {estaAberto && (
              <div className="bg-white text-gray-600 p-4 border-t border-gray-100 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                {item.resposta}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Perguntas;