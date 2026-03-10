import { IScheduledTransferRepository } from '../../../domain/ports/out/IScheduledTransferRepository';
import { INotificationService } from '../../../domain/ports/out/INotificationService';
import { ScheduledTransfer } from '../../../domain/entities/ScheduledTransfer';
import { IScheduleTransferUseCase } from '../../ports/in/IScheduleTransferUseCase';

export class ScheduleTransfer implements IScheduleTransferUseCase {
  constructor(
    private repository: IScheduledTransferRepository,
    private notification: INotificationService
  ) {}

  async execute(transferData: Omit<ScheduledTransfer, 'id' | 'status'>): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    if (transferData.date <= today) {
      throw new Error('A data do agendamento deve ser no futuro.');
    }
    const newTransfer: ScheduledTransfer = {
      ...transferData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'PENDING',
    };
    await this.repository.save(newTransfer);
    this.notification.notify(`Transferência agendada para ${transferData.date}`, 'info');
  }
}
