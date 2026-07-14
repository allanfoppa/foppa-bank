import { Controller, Get, Inject } from '@nestjs/common';
import type { GetMetadataUseCase } from '../../../../application/port/in/get-metadata.use-case';
import { GET_METADATA_USE_CASE } from '../../../../application/port/in/tokens';
import { MetadataDomainSuccess } from '../../../../domain/features/metadata/metadata.domain-success';

@Controller()
export class MetadataController {
  constructor(
    @Inject(GET_METADATA_USE_CASE)
    private readonly getMetadata: GetMetadataUseCase,
  ) {}

  @Get('/')
  async metadata() {
    const result = await this.getMetadata.execute();
    return MetadataDomainSuccess.metadataFound(result);
  }
}