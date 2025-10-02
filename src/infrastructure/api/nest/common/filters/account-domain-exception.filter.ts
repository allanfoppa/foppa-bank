import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccountDomainException } from '../../../../../domain/account/account.domain-exception';

@Catch(AccountDomainException)
export class AccountDomainExceptionFilter
  implements ExceptionFilter<AccountDomainException>
{
  catch(exception: AccountDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusMap: Record<string, number> = {
      NameRequiredValidationException: HttpStatus.BAD_REQUEST,
      ValidEmailRequiredValidationException: HttpStatus.BAD_REQUEST,
      InitialDepositCannotBeNegativeValidationException: HttpStatus.BAD_REQUEST,
      AccountAlreadyExistsException: HttpStatus.CONFLICT,
    };

    const status =
      statusMap[exception.name] || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      metadata: {
        internalCode: exception.internalCode,
        eventName: exception.name,
        message: exception.message,
        info: {
          path: request.url,
          timestamp: new Date().toISOString(),
        },
      },
    });
  }
}
