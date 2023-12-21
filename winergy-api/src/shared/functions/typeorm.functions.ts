import { FindOptionsOrder, FindOptionsWhere, In, IsNull, Not } from 'typeorm';

import { ComparatorFactory } from '../factories';
import { SearchRequest } from '../models';
import { BaseFilter } from '../models/dto';
import { isChildOf } from './object.functions';

export const NULL_FILTER = null;
export const NOT_NULL_FILTER = -1;

export function getFilterFromSearchRequest<TFilter, TEntity>(query: SearchRequest<TFilter>): FindOptionsWhere<TEntity> {
  const typeormFilter = {} as FindOptionsWhere<TEntity>;

  if (!query.filter) {
    return typeormFilter;
  }

  Object.entries(query.filter).forEach(([key, filterValue]) => {
    if (filterValue === NULL_FILTER) {
      typeormFilter[key] = IsNull();
    } else if (filterValue === NOT_NULL_FILTER) {
      typeormFilter[key] = Not(IsNull());
    } else if (Array.isArray(filterValue)) {
      typeormFilter[key] = In([...new Set(filterValue)]);
    } else if (ComparatorFactory.canParse(filterValue)) {
      typeormFilter[key] = ComparatorFactory.parse(filterValue).apply();
    } else if (isChildOf(filterValue, BaseFilter)) {
      typeormFilter[key] = getFilterFromSearchRequest({ filter: filterValue } as SearchRequest<TFilter>);
    } else {
      typeormFilter[key] = filterValue;
    }
  });

  return typeormFilter;
}

export function getOrderFromSearchRequest<TFilter, TEntity>(query: SearchRequest<TFilter>): FindOptionsOrder<TEntity> {
  return (
    query.sortColumns ? Object.fromEntries(query.sortColumns.map((e) => [e.name, e.direction])) : null
  ) as FindOptionsOrder<TEntity>;
}
