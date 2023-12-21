import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { mockedRepositoryFactory } from 'test/shared/functions';

import { BottlesService } from './bottles.service';
import { BottleEntity, BottlePriceHistoryEntity } from './entities';

describe('BottlesService', () => {
  let service: BottlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BottlesService,
        {
          provide: getRepositoryToken(BottleEntity),
          useValue: mockedRepositoryFactory,
        },
        {
          provide: getRepositoryToken(BottlePriceHistoryEntity),
          useValue: mockedRepositoryFactory,
        },
      ],
    }).compile();

    service = module.get<BottlesService>(BottlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
