import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenEntity } from './entities';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtService,
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockReturnValue({
              accessToken: 'string',
              expiresOn: new Date(2020, 1, 1),
            } as TokenEntity),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should respect the TokenEntity structure', async () => {
      const result = controller.signIn({ username: 'clientId', password: 'clientSecret' });

      expect(result).toMatchObject({
        accessToken: 'string',
        expiresOn: new Date(2020, 1, 1),
      });
    });
  });
});
