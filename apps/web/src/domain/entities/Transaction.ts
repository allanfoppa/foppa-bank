export interface Transaction {
  id: string;
  description: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
}
