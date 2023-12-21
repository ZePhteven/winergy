import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { TokenEntity } from './entities';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService, private readonly _jwtService: JwtService) {}

  public async signIn(username: string, password: string): Promise<TokenEntity> {
    const user = await this._usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const token = await this._jwtService.signAsync(payload);

    return {
      accessToken: token,
      expiresOn: new Date(this._jwtService.decode(token)['exp'] * 1000),
    } as TokenEntity;
  }
}
