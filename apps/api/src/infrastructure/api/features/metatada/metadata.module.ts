import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { GET_METADATA_USE_CASE } from '../../../../application/port/in/tokens';
import { MetadataService } from '../../../../application/port/out/metadata-get.service';

@Module({
  controllers: [MetadataController],
  providers: [
    {
      provide: GET_METADATA_USE_CASE,
      useClass: MetadataService,
    },
  ],
})
export class MetadataModule {}
