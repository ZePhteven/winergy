import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BaseService } from 'src/shared/services';

import { BottlesFilter } from './dto';
import { BottleEntity } from './entities';

@Injectable()
export class BottlesService extends BaseService<BottlesFilter, BottleEntity> {
  constructor(
    @InjectRepository(BottleEntity)
    repository: Repository<BottleEntity>,
  ) {
    super(repository);
  }
}
