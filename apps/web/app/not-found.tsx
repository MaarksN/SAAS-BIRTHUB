import Link from 'next/link';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 p-4">
      <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-8">
        <Search className="w-12 h-12 text-slate-500" />
      </div>
      <h1 className="text-4xl font-black mb-2">404</h1>
      <p className="text-xl text-slate-400 mb-8">Página não encontrada no radar.</p>
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-full text-white font-bold hover:bg-indigo-500 transition-colors"
      >
        <Home className="w-4 h-4" /> Voltar ao Comando
      </Link>
    </div>
  );
}
