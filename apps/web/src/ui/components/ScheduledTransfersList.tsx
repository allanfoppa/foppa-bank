import React from 'react';
import { ScheduledTransfer } from '../../core/domain/entities/ScheduledTransfer';

interface ScheduledTransfersListProps {
  accountId: string;
  transfers: ScheduledTransfer[];
  loading: boolean;
}

export const ScheduledTransfersList = ({ accountId, transfers, loading }: ScheduledTransfersListProps) => {
  if (loading) return <div className="p-4 text-gray-500">Carregando agendamentos...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 p-4">
        <h3 className="text-white font-bold">Transferências Agendadas</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {transfers.map((t) => (
          <li key={t.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">
                  Para conta: {t.toAccountId}
                </p>
                <p className="text-xs text-gray-400">
                  Agendado para: {t.date}
                </p>
              </div>
              <div className="text-right">
                <span className="font-bold text-purple-600">
                  R$ {t.amount.toFixed(2)}
                </span>
                <p className={`text-xs mt-1 ${
                  t.status === 'PENDING' ? 'text-yellow-600' : 
                  t.status === 'COMPLETED' ? 'text-green-600' : 
                  'text-red-600'
                }`}>
                  {t.status === 'PENDING' ? 'Pendente' : 
                   t.status === 'COMPLETED' ? 'Concluído' : 
                   'Cancelado'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {transfers.length === 0 && (
        <p className="p-8 text-center text-gray-400">Nenhuma transferência agendada.</p>
      )}
    </div>
  );
};
