import { Controller, Get } from '@nestjs/common';
import { WorkersService } from './workers..service';
import { DataSource } from '@foppa-bank/types';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get('etf/etfs-brasil')
  async etfsBrasil(): Promise<void> {
    await this.workersService.execute(DataSource.ETFS_BRASIL);
  }

  @Get('stocks/stocks-brasil')
  async stocksBrasil(): Promise<void> {
    await this.workersService.execute(DataSource.STOCKS_BRASIL);
  }
}
