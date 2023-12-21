import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';

import { getFilterFromSearchRequest, getOrderFromSearchRequest } from '../functions';
import { SearchRequest, SearchResponse } from '../models';

const DEFAULT_PAGE_SIZE = 1000;

export class SearchBaseService<TFilter, TEntity extends { id: number }> {
  constructor(protected readonly _repository: Repository<TEntity>) {}

  public async search(query: SearchRequest<TFilter>): Promise<SearchResponse<TEntity>> {
    const pageSize = this.getPageSize(query);

    const [data, count] = await this._repository.findAndCount({
      where: this.getFilter(query),
      take: pageSize,
      skip: pageSize * query.pageIndex,
      order: this.getOrder(query),
      loadEagerRelations: !!query.loadChildren,
    });
    return { data, total: count } as SearchResponse<TEntity>;
  }

  protected getPageSize(query: SearchRequest<TFilter>) {
    return query.pageSize > 0 ? query.pageSize : DEFAULT_PAGE_SIZE;
  }

  protected getFilter(query: SearchRequest<TFilter>): FindOptionsWhere<TEntity> {
    return getFilterFromSearchRequest(query);
  }

  protected getOrder(query: SearchRequest<TFilter>): FindOptionsOrder<TEntity> {
    return getOrderFromSearchRequest(query);
  }
}
