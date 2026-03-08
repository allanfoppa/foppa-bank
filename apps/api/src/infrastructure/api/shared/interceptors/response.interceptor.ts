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
          statusMessage: response.statusMessage,
          internalCode: (data as { internalCode?: string })?.internalCode,
          eventName: (data as { eventName?: string })?.eventName,
          message: (data as { message?: string })?.message,
          info: {
            path: request.url,
            timestamp: new Date().toISOString(),
          },
        },
        data: (data as { data?: unknown })?.data,
      })),
    );
  }
}
