import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError) {
    throw new HttpException(
      this.getMessage(exception),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  getMessage(exception: QueryFailedError): string {
    let message = exception.message;

    if (message.includes('duplicate key')) {
      const details = exception.driverError['detail'];
      const regex = /\((.*)\)=\((.*)\)/gm;
      const match = regex.exec(details);

      message = match
        ? 'The ' + match[1] + ' ' + match[2] + ' already exists!'
        : 'Register already exists!';
    }
    return message ?? 'Query error!';
  }
}
