'use client';

import { useEffect, useRef } from 'react';

// 1. Declaração de tipos para o TypeScript não reclamar do window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSpace() {
  // O elemento <ins> é um HTMLModElement
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Verifica se está no navegador e se o anúncio ainda não foi carregado
    if (typeof window !== 'undefined' && !isAdPushed.current && adRef.current) {
      try {
        // Inicializa o array se não existir e empurra o anúncio
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch (error: any) {
        console.error('Falha ao carregar o AdSense:', error);
      }
    }
  }, []);

  return (
    <div className="my-8 flex flex-col items-center justify-center">
      <span className="mb-2 text-xs text-gray-400 uppercase tracking-wide">Publicidade</span>
      
      {/* Container com min-height para evitar layout shift (CLS) */}
      <div className="w-full min-h-[100px] rounded-lg bg-gray-50 flex justify-center overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-6732428339083295" // Corrigido para ca-pub (padrão AdSense)
          data-ad-slot="1234567890" // ⚠️ IMPORTANTE: Coloque aqui o ID do seu Bloco de Anúncio
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}