import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
}

const users: User[] = [
  {
    userId: 1,
    username: 'pedro',
    password: 'test123', //@todo use hash
  }
]

@Injectable()
export class UsersService {
  async findByUserName(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
