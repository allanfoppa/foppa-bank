import React from 'react';
import { BalanceCard } from '../components/BalanceCard';
import { TransactionForm } from '../components/TransactionForm';
import { StatementList } from '../components/StatementList';
import { ScheduleForm } from '../components/ScheduleForm';
import { ScheduledTransfersList } from '../components/ScheduledTransfersList';
import { useAccount } from '../hooks/useAccount';
import { useStatement } from '../hooks/useStatement';
import { useScheduledTransfers } from '../hooks/useScheduledTransfers';

export const DashboardPage = () => {
  const accountId = '123'; // Replace with context/auth in real app
  const { account, loading: loadingAcc, refreshAccount } = useAccount(accountId);
  const { transactions, loading: loadingStatement, refresh: refreshStatement } = useStatement(accountId);
  const { transfers, loading: loadingTransfers, refresh: refreshTransfers } = useScheduledTransfers(accountId);

  const handleUpdate = () => {
    refreshAccount();
    refreshStatement();
  };

  const handleScheduleUpdate = () => {
    refreshTransfers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-blue-900">FOPPA<span className="text-blue-500">BANK</span></h1>
          <div className="text-right">
            <p className="text-sm text-gray-500 italic">Olá, {account?.owner || 'Carregando...'}</p>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <BalanceCard balance={account?.balance || 0} loading={loadingAcc} />
            <TransactionForm accountId={accountId} onSuccess={handleUpdate} />
            <ScheduleForm accountId={accountId} onSuccess={handleScheduleUpdate} />
          </div>
          <aside className="space-y-6">
            <StatementList accountId={accountId} transactions={transactions} loading={loadingStatement} />
            <ScheduledTransfersList accountId={accountId} transfers={transfers} loading={loadingTransfers} />
          </aside>
        </section>
      </div>
    </div>
  );
};
