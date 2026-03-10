import { ScheduledTransfer } from '../../entities/ScheduledTransfer';

export interface IScheduledTransferRepository {
  save(transfer: ScheduledTransfer): Promise<void>;
  findAllByAccount(accountId: string): Promise<ScheduledTransfer[]>;
  delete(id: string): Promise<void>;
}
