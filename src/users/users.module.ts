import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([User, Company]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
