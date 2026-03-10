import React, { useState } from 'react';
import { useAccountActions } from '../hooks/useAccountActions';

export const TransactionForm = ({ accountId, onSuccess }: { accountId: string, onSuccess?: () => void }) => {
  const [amount, setAmount] = useState(0);
  const { handleDeposit, handleWithdraw, loading } = useAccountActions();

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Operações</h2>
      <input 
        type="number" 
        onChange={(e) => setAmount(Number(e.target.value))} 
        placeholder="Valor R$"
        className="border p-2 mr-2"
      />
      <button 
        onClick={async () => { await handleDeposit(accountId, amount); onSuccess && onSuccess(); }}
        disabled={loading}
        className="bg-green-500 text-white p-2 mr-2"
      >
        Depositar
      </button>
      <button 
        onClick={async () => { await handleWithdraw(accountId, amount); onSuccess && onSuccess(); }}
        disabled={loading}
        className="bg-red-500 text-white p-2"
      >
        Sacar
      </button>
      {loading && <p>Processando transação...</p>}
    </div>
  );
};
