import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/user/create-user.dto';

type AuthInput = { login: string; password: string };
type SignInData = {
  userId: number;
  name: string;
  username: string;
  email: string;
  company: string;
};
type AuthResult = {
  accessToken: string;
  name: string;
  username: string;
  email: string;
  company: string;
};

@Injectable()
export class AuthService {
  constructor(
    private service: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException(
        'These credentials do not match our records',
      );
    }

    return this.signIn(user);
  }

  async register(user: CreateUserDto): Promise<AuthResult> {
    const newUser = await this.service.createUser(user);

    const tokenPayload = {
      sub: newUser.id,
      username: newUser.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      company: newUser.company.name,
    };
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      name: user.name,
      username: user.username,
      email: user.email,
      company: user.company,
    };
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.service.findByUserNameOrEmail(input.login);

    if (user && (await bcrypt.compare(input.password, user.password))) {
      return {
        userId: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        company: user.company.name,
      };
    }

    return null;
  }
}
