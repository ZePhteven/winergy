import { Test, TestingModule } from '@nestjs/testing';

import { SearchRequest } from 'src/shared/models';
import { BaseFilter } from 'src/shared/models/dto';
import { TimedEntity } from 'src/shared/models/entities';

import { NoteEntity } from './entities';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: {
            search: jest.fn().mockReturnValue([
              {
                ...({} as TimedEntity),
                bottleId: 0,
                expertId: 0,
                note: 0,
              } as NoteEntity,
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should respect the NoteEntity structure', async () => {
      const searchResult = controller.search({
        filter: { id: [0] },
      } as SearchRequest<BaseFilter>);

      expect(searchResult[0]).toMatchObject({
        ...({} as TimedEntity),
        bottleId: 0,
        expertId: 0,
        note: 0,
      });
    });
  });
});
