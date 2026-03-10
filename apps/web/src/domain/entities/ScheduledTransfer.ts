export interface ScheduledTransfer {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  date: string; // YYYY-MM-DD
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}
