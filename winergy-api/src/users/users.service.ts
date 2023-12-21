import { Injectable } from '@nestjs/common';

import { User } from './entities';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'jack',
      password: 'sparrow',
    },
  ];

  public async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
