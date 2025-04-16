import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Company } from '../entities/company.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    user.company = { id: 1, name: 'Financial Control' } as Company;
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  findAllUser(company: Company): Promise<User[]> {
    return this.userRepository.find({ where: { company: company } });
  }

  viewUser(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['company'],
    });
  }

  findByUserName(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username: username },
      relations: ['company'],
    });
  }

  findByUserNameOrEmail(login: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [{ email: login }, { username: login }],
      relations: ['company'],
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

    user.id = id;
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number | null }> {
    return this.userRepository.delete(id);
  }
}
