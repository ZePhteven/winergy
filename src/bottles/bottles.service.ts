import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { getAverage, naiveRound } from 'src/shared/functions';
import { BaseService } from 'src/shared/services';

import { BottleFilter } from './dto';
import { BottleEntity } from './entities';

@Injectable()
export class BottlesService extends BaseService<BottleFilter, BottleEntity> {
  constructor(
    @InjectRepository(BottleEntity)
    repository: Repository<BottleEntity>,
  ) {
    super(repository);
  }

  public override async get(id: any): Promise<BottleEntity> {
    const result = await super.get(id);
    result.averageNote = naiveRound(getAverage(result.notes.map((x) => x.note)), 2);
    return result;
  }
}
