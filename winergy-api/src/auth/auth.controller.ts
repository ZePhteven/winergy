import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../shared/decorators';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { TokenEntity } from './entities';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly _service: AuthService) {}

  @Public()
  @Post('login')
  public signIn(@Body() signInDto: SignInDto): Promise<TokenEntity> {
    return this._service.signIn(signInDto.username, signInDto.password);
  }
}
