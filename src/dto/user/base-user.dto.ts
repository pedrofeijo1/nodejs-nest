import {
  IsAlphanumeric,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class BaseUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match.' })
  confirmPassword: string;
}
