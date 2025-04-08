import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/user/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { username: string; password: string }) {
    return this.authService.authenticate(input);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() input: CreateUserDto) {
    return this.authService.register(input);
  }
}
