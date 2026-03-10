import { useState, useEffect } from 'react';
import { useDependencies } from '../contexts/DependenciesContext';
import { ScheduledTransfer } from '../../core/domain/entities/ScheduledTransfer';

export const useScheduledTransfers = (accountId: string) => {
  const { scheduledRepo } = useDependencies();
  const [transfers, setTransfers] = useState<ScheduledTransfer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const data = await scheduledRepo.findAllByAccount(accountId);
      setTransfers(data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, [accountId]);

  return { transfers, loading, refresh: fetchTransfers };
};
