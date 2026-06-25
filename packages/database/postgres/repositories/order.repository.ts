import { AccountWriteRepository } from "../../common/interfaces";

export class PostgresOrderRepository implements AccountWriteRepository {
  async create(data: any): Promise<void> {
    // transactional logic
  }
}
