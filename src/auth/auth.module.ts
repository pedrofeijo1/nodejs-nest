import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule, UsersModule, TypeOrmModule],
  exports: [AuthService],
})
export class AuthModule {}
