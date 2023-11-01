import { NotFoundException } from '@nestjs/common';

import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseEntity } from '../models/entities';
import { SearchBaseService } from './search-base.service';

export class BaseService<TFilter, TEntity extends BaseEntity> extends SearchBaseService<TFilter, TEntity> {
  constructor(protected readonly _repository: Repository<TEntity>) {
    super(_repository);
  }

  public async create(data: DeepPartial<TEntity>): Promise<TEntity> {
    const result = this._repository.create(data);
    await this._repository.save(result);

    return result;
  }

  public async get(id: any): Promise<TEntity> {
    const result = this._repository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  public async remove(id: number): Promise<void> {
    await this._repository.delete(id);
  }

  public async update(id: number, data: QueryDeepPartialEntity<TEntity>): Promise<void> {
    await this._repository.update(id, data);
  }
}
