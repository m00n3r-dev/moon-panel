import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { status as grpcStatus, ServiceError } from '@grpc/grpc-js';
import { Response } from 'express';

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    console.error(exception);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json(exception.getResponse());
    }

    if (exception.code !== undefined) {
      switch (exception.code) {
        case grpcStatus.NOT_FOUND:
          return response
            .status(404)
            .json({ message: exception.details, statusCode: 404 });
        case grpcStatus.UNAUTHENTICATED:
          return response
            .status(401)
            .json({ message: exception.details, statusCode: 401 });
        case grpcStatus.ALREADY_EXISTS:
          return response
            .status(409)
            .json({ message: exception.details, statusCode: 409 });
        default:
          return response
            .status(500)
            .json({ message: 'Internal server error', statusCode: 500 });
      }
    }

    return response
      .status(500)
      .json({ message: 'Internal server error', statusCode: 500 });
  }
}
