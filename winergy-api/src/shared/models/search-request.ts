import { ApiProperty } from '@nestjs/swagger';

import { Allow, Max } from 'class-validator';

import { SortColumn } from './sort-column';

const MAX_PAGE_SIZE = 1000;

export class SearchRequest<TFilter> {
  @ApiProperty()
  @Allow()
  // @ValidateNested() // Don't seemts to work for templated types
  filter?: TFilter;

  @ApiProperty()
  @Allow()
  pageIndex: number;

  @ApiProperty()
  @Max(MAX_PAGE_SIZE)
  pageSize: number;

  @ApiProperty({ type: [SortColumn] })
  @Allow()
  sortColumns: SortColumn[];

  loadChildren: boolean;
}
