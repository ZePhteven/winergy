import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BaseService } from '../shared/services';
import { BottlesFilter } from './dto';
import { BottleEntity, BottlePriceHistoryEntity } from './entities';

@Injectable()
export class BottlesService extends BaseService<BottlesFilter, BottleEntity> {
  constructor(
    @InjectRepository(BottleEntity)
    repository: Repository<BottleEntity>,
    @InjectRepository(BottlePriceHistoryEntity)
    private readonly _bottlePriceHistoryrepository: Repository<BottlePriceHistoryEntity>,
  ) {
    super(repository);
  }

  public async getPriceHistory(bottleId: number): Promise<BottlePriceHistoryEntity[]> {
    return await this._bottlePriceHistoryrepository.findBy({ bottleId });
  }
}
