import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];
    console.log(token, 123);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      const user = await this.userService.viewUser(tokenPayload.sub);
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
        company: user?.company,
      };

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
