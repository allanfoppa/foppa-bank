import { useState } from 'react';
import { useDependencies } from '../contexts/DependenciesContext';

export const useAccountActions = () => {
  const { depositMoneyUseCase, withdrawMoneyUseCase } = useDependencies();
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (accountId: string, amount: number) => {
    setLoading(true);
    try {
      await depositMoneyUseCase.execute(accountId, amount);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (accountId: string, amount: number) => {
    setLoading(true);
    try {
      await withdrawMoneyUseCase.execute(accountId, amount);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeposit, handleWithdraw, loading };
};
