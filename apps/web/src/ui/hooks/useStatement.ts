import { useState, useEffect } from 'react';
import { useDependencies } from '../contexts/DependenciesContext';
import { Transaction } from '../../core/domain/entities/Transaction';

export const useStatement = (accountId: string) => {
  const { transactionRepo } = useDependencies();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStatement = async () => {
    setLoading(true);
    try {
      const data = await transactionRepo.getAccountHistory(accountId);
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao carregar extrato', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStatement(); }, [accountId]);

  return { transactions, loading, refresh: fetchStatement };
};
