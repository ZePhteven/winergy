import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BaseFilter } from 'src/shared/models/dto';
import { BaseService } from 'src/shared/services';

import { NoteEntity } from './entities';

@Injectable()
export class NotesService extends BaseService<BaseFilter, NoteEntity> {
  constructor(
    @InjectRepository(NoteEntity)
    repository: Repository<NoteEntity>,
  ) {
    super(repository);
  }

  public override async remove(id: number): Promise<void> {
    const entity = await this.get(id);
    await this._repository.remove(entity);
  }
}
