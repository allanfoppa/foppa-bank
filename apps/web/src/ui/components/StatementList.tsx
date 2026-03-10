import React from 'react';
import { Transaction } from '../../core/domain/entities/Transaction';

interface StatementListProps {
  accountId: string;
  transactions: Transaction[];
  loading: boolean;
}

export const StatementList = ({ accountId, transactions, loading }: StatementListProps) => {
  if (loading) return <div className="p-4 text-gray-500">Carregando extrato...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 p-4">
        <h3 className="text-white font-bold">Extrato</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {transactions.map((t) => (
          <li key={t.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
            <div>
              <p className="font-medium text-gray-800">{t.description}</p>
              <p className="text-xs text-gray-400">{t.date}</p>
            </div>
            <span className={`font-bold ${t.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
              {t.type === 'INCOME' ? '+' : '-'} R$ {t.value.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      {transactions.length === 0 && (
        <p className="p-8 text-center text-gray-400">Nenhuma transação encontrada.</p>
      )}
    </div>
  );
};
