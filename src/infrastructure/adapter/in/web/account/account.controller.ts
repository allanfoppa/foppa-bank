import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CREATE_ACCOUNT_USE_CASE } from '../../../../../application/port/out/tokens';
import type { CreateAccountUseCase } from '../../../../../application/port/in/create-account.use-case';
import type { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(CREATE_ACCOUNT_USE_CASE)
    private readonly createAccount: CreateAccountUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateAccountDto) {
    const result = await this.createAccount.execute(body);
    return { message: 'Account created', data: result };
  }
}
