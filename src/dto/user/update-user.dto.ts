import { BaseUserDto } from './base-user.dto';
import { IsDate, IsNotEmpty } from 'class-validator';
export class UpdateUserDto extends BaseUserDto {
  @IsDate()
  @IsNotEmpty()
  createdAt: Date = new Date();
}
