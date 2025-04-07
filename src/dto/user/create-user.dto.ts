import { BaseUserDto } from './base-user.dto';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
export class CreateUserDto extends BaseUserDto {
  @IsInt()
  @IsNotEmpty()
  companyId: number = 1;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date = new Date();
}
