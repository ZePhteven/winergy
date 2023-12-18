import { Test, TestingModule } from '@nestjs/testing';

import { NoteEntity } from '../notes/entities';
import { SearchRequest } from '../shared/models';
import { CreatedEntity, TimedEntity } from '../shared/models/entities';
import { BottlesController } from './bottles.controller';
import { BottlesService } from './bottles.service';
import { BottlesFilter } from './dto';
import { BottleEntity, BottlePriceHistoryEntity } from './entities';

describe('BottlesController', () => {
  let controller: BottlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BottlesController],
      providers: [
        {
          provide: BottlesService,
          useValue: {
            search: jest.fn().mockReturnValue([
              {
                ...({} as TimedEntity),
                name: 'string',
                note: 0,
                notes: [new NoteEntity()],
                code: 'string',
                description: 'string',
                price: 0,
                producerId: 0,
                retailerId: 0,
                type: 0,
                year: 0,
              } as BottleEntity,
            ]),
            getPriceHistory: jest.fn().mockReturnValue([
              {
                ...({} as CreatedEntity),
                bottleId: 0,
                price: 0,
              } as BottlePriceHistoryEntity,
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<BottlesController>(BottlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should respect the BottleEntity structure', async () => {
      const searchResult = controller.search({
        filter: { id: [0] },
      } as SearchRequest<BottlesFilter>);

      expect(searchResult[0]).toMatchObject({
        ...({} as TimedEntity),
        name: 'string',
        note: 0,
        notes: [new NoteEntity()],
        code: 'string',
        description: 'string',
        price: 0,
        producerId: 0,
        retailerId: 0,
        type: 0,
        year: 0,
      });
    });
  });

  describe('getPriceHistory', () => {
    it('should respect the BottlePriceHistoryEntity structure', async () => {
      const result = controller.getPriceHistory('1');

      expect(result[0]).toMatchObject({
        ...({} as CreatedEntity),
        bottleId: 0,
        price: 0,
      });
    });
  });
});
