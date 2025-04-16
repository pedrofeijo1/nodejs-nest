import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private moduleRef: ModuleRef) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId(request, contextId);
    const status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const exResponse = exception.getResponse();

    const finalResponse = {
      statusCode: status,
      message: exception.message,
      errors:
        exception.message != exResponse['message'] ? exResponse['message'] : [],
    };
    response.status(status).json(finalResponse);
  }
}
