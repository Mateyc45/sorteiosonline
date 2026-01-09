import Link from 'next/link';
import Image from 'next/image';

// Certifique-se de que sua logo esteja na pasta /public
export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
            {/* O Next.js busca arquivos da pasta public automaticamente com "/" */}
            <Image 
              src="/logo4.webp"  
              alt="Vamo Sortear - Plataforma de Sorteios Grátis"
              title="Vamo Sortear"
              width={180}
              height={96}
              className="h-24 w-auto object-contain"
              priority // Carrega a logo instantaneamente
            />
          </Link>
          <nav className="flex gap-6">
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium">
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}