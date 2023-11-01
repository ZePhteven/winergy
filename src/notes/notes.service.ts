import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BaseService } from 'src/shared/services';

import { NoteEntity } from './entities';

@Injectable()
export class NotesService extends BaseService<NoteEntity> {
  constructor(
    @InjectRepository(NoteEntity)
    repository: Repository<NoteEntity>,
  ) {
    super(repository);
  }
}
