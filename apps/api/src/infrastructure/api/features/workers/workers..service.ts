import { Injectable } from '@nestjs/common';
import { DataSource } from '@foppa-bank/types';
import { WorkersStrategy } from './strategies/workers.strategy';

@Injectable()
export class WorkersService {
  constructor(private readonly workersStrategy: WorkersStrategy) {}

  async execute(source: DataSource): Promise<unknown> {
    // This calls the internal Docker URL: http://workers:3001
    return await this.workersStrategy.execute({ source });
  }
}
