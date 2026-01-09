import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-500">
          <Link href="/privacidade" className="hover:text-gray-900">Política de Privacidade</Link>
          <Link href="/termos" className="hover:text-gray-900">Termos de Uso</Link>
          <Link href="/sitemap" className="hover:text-gray-900">Mapa do Site</Link>
          <Link href="/blog" className="hover:text-gray-900">Blog</Link>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Vamo Sortear. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}