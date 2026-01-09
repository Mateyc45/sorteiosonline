import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 1. Importando seus componentes REAIS (baseado na sua imagem)
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
// Se o AdSpace for o componente de anúncio lateral, você pode usá-lo depois
// import AdSpace from '@/components/AdSpace'; 

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
        
        {/* --- TOPO --- */}
        <Header />
          <Breadcrumbs />


          {/* CONTEÚDO PRINCIPAL */}
          <main className=' mb-4'>
            {children}
          </main>


        {/* --- RODAPÉ --- */}
        <Footer />

      </body>
    </html>
  );
}