import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter';
import { AccountModule } from '../../adapter/in/web/account/account.module';

@Module({
  imports: [AccountModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: DomainExceptionFilter },
  ],
})
export class AppModule {}
