import { ScheduledTransfer } from "../../../domain/entities/ScheduledTransfer";
import { IScheduledTransferRepository } from "../../../domain/ports/out/IScheduledTransferRepository";

export class InMemoryScheduledTransferRepository implements IScheduledTransferRepository {
  private transfers: ScheduledTransfer[] = [];

  async save(transfer: ScheduledTransfer): Promise<void> {
    this.transfers.push(transfer);
  }

  async findAllByAccount(accountId: string): Promise<ScheduledTransfer[]> {
    return this.transfers.filter((t) => t.fromAccountId === accountId);
  }

  async delete(id: string): Promise<void> {
    this.transfers = this.transfers.filter((t) => t.id !== id);
  }
}
