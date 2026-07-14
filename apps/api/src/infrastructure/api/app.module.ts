import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { AccountModule } from '../adapter/in/web/account.entrypoint';
import { MetadataModule } from './features/metatada/metadata.module';


@Module({
  imports: [MetadataModule, AccountModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}
