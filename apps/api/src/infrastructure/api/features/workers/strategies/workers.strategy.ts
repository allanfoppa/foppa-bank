// apps/api/src/sync/strategies/http-sync.strategy.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IWorkersStrategy } from './workers.interface';
import { ScrapeRequest, DataSource } from '@foppa-bank/types';

@Injectable()
export class WorkersStrategy implements IWorkersStrategy {
  constructor(private readonly httpService: HttpService) {}

  supports(source: string): boolean {
    return [DataSource.ETFS_BRASIL, DataSource.STOCKS_BRASIL].includes(
      source as DataSource,
    );
  }

  async execute(data: ScrapeRequest): Promise<void> {
    const workerUrl = process.env.WORKERS_URL;
    await this.httpService.axiosRef.post(`${workerUrl}/trigger-sync`, data);
  }
}
