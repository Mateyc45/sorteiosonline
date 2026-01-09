'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Se for a home, não mostra nada
  if (pathname === '/') {
    return null;
  }

  // Separa os caminhos e remove strings vazias
  const pathnames = pathname.split('/').filter((x) => x);

  // Função para deixar o texto bonito (ex: "amigo-secreto" vira "Amigo Secreto")
  const formatText = (text: string) => {
    return decodeURIComponent(text)
      .replace(/-/g, ' ') // Troca traço por espaço
      .replace(/\b\w/g, l => l.toUpperCase()); // Primeira letra maiúscula
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
        <nav aria-label="Breadcrumb" className="flex text-sm text-gray-500">
            <ol className="flex items-center space-x-2">
                {/* Link para Home */}
                <li>
                    <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
                        <span className="font-medium text-gray-900">Início</span>
                        <span className="sr-only">Início</span>
                    </Link>
                </li>

                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={to} className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                            {isLast ? (
                                <span className="font-medium text-gray-900" aria-current="page">
                                    {formatText(value)}
                                </span>
                            ) : (
                                <Link href={to} className="hover:text-blue-600 transition-colors">
                                    {formatText(value)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    </div>
  );
}