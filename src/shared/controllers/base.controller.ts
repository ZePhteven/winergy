import { Body, Post } from '@nestjs/common';

import { SearchRequest, SearchResponse } from '../models';
import { SearchBaseService } from '../services';

export class BaseController<TFilter, TEntity extends { id: number }> {
  constructor(protected readonly _service: SearchBaseService<TFilter, TEntity>) {}

  @Post('search')
  public search(@Body() query: SearchRequest<TFilter>): Promise<SearchResponse<TEntity>> {
    return this._service.search(query);
  }
}
