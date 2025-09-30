import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        metadata: {
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          message: data?.message || 'Success',
          info: {
            path: request.url,
            timestamp: new Date().toISOString(),
          },
        },
        data: data?.data || data,
      })),
    );
  }
}
