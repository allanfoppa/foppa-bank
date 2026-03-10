import React, { useState } from 'react';
import { useDependencies } from '../contexts/DependenciesContext';

export const ScheduleForm = ({ accountId, onSuccess }: { accountId: string; onSuccess?: () => void }) => {
  const { scheduleTransferUseCase, notificationService } = useDependencies();
  const [formData, setFormData] = useState({ to: '', amount: 0, date: '' });

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await scheduleTransferUseCase.execute({
        fromAccountId: accountId,
        toAccountId: formData.to,
        amount: formData.amount,
        date: formData.date
      });
      // Clear form after success
      setFormData({ to: '', amount: 0, date: '' });
      // Trigger refresh
      onSuccess?.();
    } catch (error: any) {
      notificationService.notify(error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSchedule} className="p-4 border rounded bg-white shadow-sm">
      <h3 className="font-bold mb-4">Agendar Transferência</h3>
      <input 
        type="text" 
        placeholder="Conta destino" 
        className="border p-2 w-full mb-2"
        value={formData.to}
        onChange={e => setFormData({...formData, to: e.target.value})} 
      />
      <input 
        type="number" 
        placeholder="Valor" 
        className="border p-2 w-full mb-2"
        value={formData.amount || ''}
        onChange={e => setFormData({...formData, amount: Number(e.target.value)})} 
      />
      <input 
        type="date" 
        className="border p-2 w-full mb-2"
        value={formData.date}
        onChange={e => setFormData({...formData, date: e.target.value})} 
      />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Agendar</button>
    </form>
  );
};
