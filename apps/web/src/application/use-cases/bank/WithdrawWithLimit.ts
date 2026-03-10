import { IAccountRepository } from '../../../domain/ports/out/IAccountRepository';
import { ITransactionRepository } from '../../../domain/ports/out/ITransactionRepository';
import { INotificationService } from '../../../domain/ports/out/INotificationService';
import { IWithdrawMoneyUseCase } from '../../ports/in/IWithdrawMoneyUseCase';
import { Transaction } from '../../../domain/entities/Transaction';

export class WithdrawWithLimit implements IWithdrawMoneyUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private transactionRepo: ITransactionRepository,
    private notification: INotificationService
  ) {}

  async execute(accountId: string, amount: number): Promise<void> {
    const account = await this.accountRepo.getAccount(accountId);
    const today = new Date().toISOString().split('T')[0];
    if (account.balance < amount) throw new Error('Saldo insuficiente.');
    const alreadySpentToday = await this.transactionRepo.getDailySpent(accountId, today);
    if ((alreadySpentToday + amount) > account.dailyLimit) {
      const remaining = account.dailyLimit - alreadySpentToday;
      this.notification.notify(`Limite diário excedido! Você ainda pode usar R$ ${remaining.toFixed(2)} hoje.`, 'error');
      throw new Error('Limite diário excedido.');
    }
    await this.accountRepo.updateBalance(accountId, account.balance - amount);
    
    // Create transaction record
    const transaction: Transaction = {
      id: accountId,
      description: 'Saque',
      value: amount,
      type: 'EXPENSE',
      date: today
    };
    await this.transactionRepo.save(transaction);
    
    this.notification.notify('Saque realizado com segurança!', 'success');
  }
}
