'use client';

import React, { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useRaffleStore } from '../store/useRaffleStore';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate, Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { AdSpace } from './AdSpace';

export function HistoryView() {
  const user = useAuthStore((state) => state.user);
  const { history, fetchHistory } = useRaffleStore();

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user, fetchHistory]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Histórico de Sorteios</h2>
        <div className="divide-y divide-gray-200">
          {history.map((item) => (
            <div key={item.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.type === 'number'
                      ? 'Sorteio de Número'
                      : item.type === 'words'
                      ? 'Sorteio de Palavra'
                      : 'Sorteio de Sequência'}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {format(parseISO(item.created_at), 'PPpp')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Resultado</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {Array.isArray(item.result)
                      ? item.result.join(' - ')
                      : item.result.toString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <p className="py-4 text-center text-sm text-gray-500">
              Nenhum sorteio realizado ainda. Comece fazendo seu primeiro sorteio!
            </p>
          )}
        </div>
      </div>

      <AdSpace />
    </div>
  );
}