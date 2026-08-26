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
      <head>
        {/* Preconnect para recursos externos — acelera o carregamento */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://afebslcshsjegmecryct.supabase.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        
        {/* AdSense — lazyOnload para não bloquear Core Web Vitals */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295"
          crossOrigin="anonymous"
          strategy="lazyOnload"
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