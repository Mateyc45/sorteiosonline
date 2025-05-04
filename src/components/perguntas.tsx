import React, { useEffect, useState } from 'react';
import perguntasData from '../lib/perguntas.json';
import { ChevronDown, ChevronUp } from 'lucide-react';


const Perguntas = () => {
  const [perguntas, setPerguntas] = useState<{ pergunta: string; resposta: string; id: string  }[]>([]);
  const [abertos, setAbertos] = useState<boolean[]>([]);
  const [filtro, setFiltro] = useState("Home");

  useEffect(() => {
    setPerguntas(perguntasData);
    setAbertos(Array(perguntasData.length).fill(false)); // inicia tudo fechado
    setFiltro(window.location.pathname.split('/')[1]); // pega o filtro da URL
  }, []);

  const toggleResposta = (index: number) => {
    setAbertos((prev) => {
      const novoEstado = [...prev];
      novoEstado[index] = !novoEstado[index];
      return novoEstado;
    });
  };

  return (
    <div className="container">
        <h2 className='text-center mb-2 font-bold'>Perguntas frequentes</h2>
      {perguntas.filter((item) => item.id === filtro || item.id == "").map((item, index) => (
        <div key={index} className="bg-gray-100 rounded-2xl flex flex-col mb-2">
          <div className="w-full flex flex-col mt-4 text-gray-800">
            <div className="ml-4 mb-4 flex items-center justify-between">
              <div className="font-bold">• {item.pergunta}</div>
              <div className="ml-auto mr-4 text-2xl font-bold">
                <button onClick={() => toggleResposta(index)}>
                    {abertos[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>

            {abertos[index] && (
              <div className="bg-gray-50 text-gray-600 w-full mt-2 p-4 rounded-b-2xl">
                {item.resposta}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Perguntas;
