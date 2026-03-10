import { useState, useCallback, useEffect } from 'react';
import { useDependencies } from '../contexts/DependenciesContext';
import { Account } from '../../core/domain/entities/Account';

export const useAccount = (accountId: string) => {
  const { accountRepo } = useDependencies();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAccount = useCallback(async () => {
    setLoading(true);
    try {
      const acc = await accountRepo.getAccount(accountId);
      setAccount(acc);
    } finally {
      setLoading(false);
    }
  }, [accountId, accountRepo]);

  // Fetch on mount or accountId change
  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return { account, loading, refreshAccount: fetchAccount };
};
