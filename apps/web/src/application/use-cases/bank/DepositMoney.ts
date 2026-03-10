import { IAccountRepository } from '../../../domain/ports/out/IAccountRepository';
import { ITransactionRepository } from '../../../domain/ports/out/ITransactionRepository';
import { INotificationService } from '../../../domain/ports/out/INotificationService';
import { IDepositMoneyUseCase } from '../../ports/in/IDepositMoneyUseCase';
import { Transaction } from '../../../domain/entities/Transaction';

export class DepositMoney implements IDepositMoneyUseCase {
  constructor(
    private repository: IAccountRepository,
    private transactionRepo: ITransactionRepository,
    private notification: INotificationService
  ) {}

  async execute(accountId: string, amount: number): Promise<void> {
    if (amount <= 0) {
      throw new Error('O valor do depósito deve ser maior que zero.');
    }
    const account = await this.repository.getAccount(accountId);
    const newBalance = account.balance + amount;
    await this.repository.updateBalance(accountId, newBalance);
    
    // Create transaction record
    const transaction: Transaction = {
      id: accountId,
      description: 'Depósito',
      value: amount,
      type: 'INCOME',
      date: new Date().toISOString().split('T')[0]
    };
    await this.transactionRepo.save(transaction);
    
    this.notification.notify(`Depósito de R$ ${amount} realizado!`, 'success');
  }
}
