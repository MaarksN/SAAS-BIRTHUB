'use client';

import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Card } from '@salesos/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <Card className="max-w-md bg-slate-800 border-slate-700 p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Algo deu errado</h2>
        <p className="text-slate-400 mb-6">
          Não foi possível carregar esta página. Nossa equipe foi notificada.
        </p>
        <button
          onClick={reset}
          className="w-full py-3 bg-indigo-600 rounded-lg text-white font-bold hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" /> Tentar Novamente
        </button>
        <div className="mt-4 text-xs text-slate-600">
          Error ID: {error.digest}
        </div>
      </Card>
    </div>
  );
}
