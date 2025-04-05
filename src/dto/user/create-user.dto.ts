import { BaseUserDto } from './base-user.dto';
import { IsDate } from 'class-validator';
export class CreateUserDto extends BaseUserDto {
  @IsDate()
  createdAt: Date = new Date();
}
