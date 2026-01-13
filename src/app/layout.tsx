import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // 1. Importe o Script aqui
import './globals.css';

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'VamoSortear',
    template: '%s | VamoSortear',
  },
  description: 'Sorteios online, amigo secreto e muito mais.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        
        {/* 2. Adicione este bloco Script. Ele carrega o AdSense globalmente uma única vez. */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* --- TOPO --- */}
        <Header />
        <Breadcrumbs />

        {/* CONTEÚDO PRINCIPAL */}
        <main className='mb-4'>
          {children}
        </main>

        {/* --- RODAPÉ --- */}
        <Footer />

      </body>
    </html>
  );
}