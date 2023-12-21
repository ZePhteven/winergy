import { useEffect, useState } from "react";

import type { SortingState } from "@tanstack/react-table";
import { GenericAbortSignal } from "axios";

import {
  SearchRequest,
  SearchResponse,
  SortColumn,
} from "@app/models/shared/api";
import { BaseEntity, BaseFilter } from "@app/models/shared/entities";
import { SearchService } from "@app/services/shared";

type TableQueryProps<TEntity extends BaseEntity, TFilter extends BaseFilter> = {
  entities?: TEntity[];
  filter?: TFilter;
  service?: SearchService<TFilter, TEntity>;
  searchFn?: (
    request: SearchRequest<TFilter>,
    signal?: GenericAbortSignal
  ) => Promise<SearchResponse<TEntity>>;
  sorting: SortingState;
  loadChildren: boolean;
};

type TableQueryFn<TEntity extends BaseEntity> = (
  pageIndex: number,
  pageSize: number,
  signal?: GenericAbortSignal
) => Promise<SearchResponse<TEntity>>;

type TableQueryHook<TEntity extends BaseEntity> = {
  isLoading: boolean;
  queryFn: TableQueryFn<TEntity>;
};

export const useTableQuery = <
  TEntity extends BaseEntity,
  TFilter extends BaseFilter
>({
  entities,
  filter,
  service,
  searchFn,
  sorting,
  loadChildren,
}: TableQueryProps<TEntity, TFilter>): TableQueryHook<TEntity> => {
  const [hook, setHook] = useState<TableQueryHook<TEntity>>({
    isLoading: true,
    queryFn: searchDefault,
  });

  async function searchDefault() {
    return {
      data: [],
      total: 0,
    } as SearchResponse<TEntity>;
  }

  async function queryFromEntities(pageIndex: number, pageSize: number) {
    const data = entities?.slice(pageIndex * pageSize, pageSize) ?? [];

    return {
      data,
      total: data.length,
    } as SearchResponse<TEntity>;
  }

  async function queryFromSearch(
    pageIndex: number,
    pageSize: number,
    search: (
      request: SearchRequest<TFilter>,
      signal?: GenericAbortSignal
    ) => Promise<SearchResponse<TEntity>>,
    signal?: GenericAbortSignal
  ) {
    const sortColumns = sorting.map((x) => {
      return { name: x.id, direction: x.desc ? "desc" : "asc" } as SortColumn;
    }) as SortColumn[];

    const request: SearchRequest<TFilter> = {
      filter: filter ?? ({} as TFilter),
      pageIndex,
      pageSize,
      sortColumns,
      loadChildren,
    };

    return await search(request, signal);
  }

  useEffect(() => {
    function getQueryFn() {
      if (!!entities) {
        return queryFromEntities;
      }

      if (!!searchFn) {
        return (
          pageIndex: number,
          pageSize: number,
          signal?: GenericAbortSignal
        ) => queryFromSearch(pageIndex, pageSize, searchFn, signal);
      }

      if (!!service) {
        return (
          pageIndex: number,
          pageSize: number,
          signal?: GenericAbortSignal
        ) =>
          queryFromSearch(pageIndex, pageSize, (request) =>
            service.search(request, signal)
          );
      }

      return searchDefault;
    }

    setHook({
      isLoading: false,
      queryFn: getQueryFn(),
    });
  }, [entities, filter, service, searchFn, sorting]);

  return hook;
};
