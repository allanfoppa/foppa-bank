import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Get,
  UseFilters,
} from '@nestjs/common';
import {
  CREATE_ACCOUNT_USE_CASE,
  GET_ACCOUNT_USE_CASE,
} from '../../../../application/port/in/tokens';
import type { CreateAccountUseCase } from '../../../../application/port/in/create-account.use-case';
import type { GetAccountUseCase } from '../../../../application/port/in/get-account.use-case';
import type {
  CreateAccountDto,
  GetAccountDto,
} from '../../../../domain/features/account/account.domain.dto';
import { AccountDomainSuccess } from '../../../../domain/features/account/account.domain-success';
import { AccountDomainExceptionFilter } from '../../shared/filters/account-domain-exception.filter';

@UseFilters(AccountDomainExceptionFilter)
@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(CREATE_ACCOUNT_USE_CASE)
    private readonly createAccount: CreateAccountUseCase,
    @Inject(GET_ACCOUNT_USE_CASE)
    private readonly getAccount: GetAccountUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateAccountDto) {
    const account = await this.createAccount.execute(body);
    return AccountDomainSuccess.accountCreated(account.email, account);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Body() body: GetAccountDto) {
    const account = await this.getAccount.execute(body);
    return AccountDomainSuccess.accountFound(account);
  }
}
