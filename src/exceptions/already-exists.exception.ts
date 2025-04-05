import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor() {
    super('Register already exists!', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
