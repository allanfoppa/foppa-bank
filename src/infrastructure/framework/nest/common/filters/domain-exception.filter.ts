import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AccountAlreadyExistsException,
  DomainValidationException,
} from '../../../../../domain/account/account.domain-exception';

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal server error';

    if (exception instanceof DomainValidationException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof AccountAlreadyExistsException) {
      status = HttpStatus.CONFLICT;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.name,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
