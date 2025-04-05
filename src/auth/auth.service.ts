import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

type AuthInput = { username: string, password: string };
type SignInData = { userId: number, username: string };
type AuthResult = { accessToken: string, userId: number, username: string };

@Injectable()
export class AuthService {
  constructor(
    private service: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      userId: user.userId,
      username: user.username,
    };
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.service.findByUserName(input.username);

    if (user && (await bcrypt.compare(input.password, user.password))) {
      return {
        userId: user.id,
        username: user.username,
      };
    }

    return null;
  }
}
