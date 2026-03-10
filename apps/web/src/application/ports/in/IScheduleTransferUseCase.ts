import { ScheduledTransfer } from '../../../domain/entities/ScheduledTransfer';

export interface IScheduleTransferUseCase {
  execute(transferData: Omit<ScheduledTransfer, 'id' | 'status'>): Promise<void>;
}
