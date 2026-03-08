import { ScrapeRequest } from '@foppa-bank/types';

export interface IWorkersStrategy {
  supports(source: string): boolean;
  execute(data: ScrapeRequest): Promise<void>;
}
