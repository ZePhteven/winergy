import { Test, TestingModule } from '@nestjs/testing';

import { NoteEntity } from 'src/notes/entities';
import { SearchRequest } from 'src/shared/models';
import { TimedEntity } from 'src/shared/models/entities';

import { BottlesController } from './bottles.controller';
import { BottlesService } from './bottles.service';
import { BottlesFilter } from './dto';
import { BottleEntity } from './entities';

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
                notes: [new NoteEntity()],
                code: 'string',
                description: 'string',
                price: 0,
                producerId: 0,
                retailerId: 0,
                type: 0,
                year: 0,
                averageNote: 0,
              } as BottleEntity,
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
    it('should respect the FeatureFlagEntity structure', async () => {
      const searchResult = controller.search({
        filter: { id: [0] },
      } as SearchRequest<BottlesFilter>);

      expect(searchResult[0]).toMatchObject({
        ...({} as TimedEntity),
        name: 'string',
        notes: [new NoteEntity()],
        code: 'string',
        description: 'string',
        price: 0,
        producerId: 0,
        retailerId: 0,
        type: 0,
        year: 0,
        averageNote: 0,
      });
    });
  });
});
