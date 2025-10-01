import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CREATE_ACCOUNT_USE_CASE } from '../../../../../application/port/out/tokens';
import type { CreateAccountUseCase } from '../../../../../application/port/in/create-account.use-case';
import type { CreateAccountDto } from './dto/create-account.dto';
import { AccountDomainExceptionFilter } from '../../../../../infrastructure/framework/nest/common/filters/account-domain-exception.filter';
import { AccountDomainSuccess } from 'src/domain/account/account.domain-success';

@UseFilters(AccountDomainExceptionFilter)
@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(CREATE_ACCOUNT_USE_CASE)
    private readonly createAccount: CreateAccountUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateAccountDto) {
    const account = await this.createAccount.execute(body);
    return AccountDomainSuccess.accountCreated(account.email, account);
  }
}
