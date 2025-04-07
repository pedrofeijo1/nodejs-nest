import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class BaseCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  name: string;
}
