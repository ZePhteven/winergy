import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { Text } from "@mantine/core";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";

import { useTableData, useTableQuery } from "@app/hooks/table";
import {
  CreateOrUpdateDto,
  SearchRequest,
  SearchResponse,
} from "@app/models/shared/api";
import { BaseEntity, BaseFilter } from "@app/models/shared/entities";
import { SearchService } from "@app/services/shared";
import { classNames } from "@app/utils/helpers";

type EntitiesProps<TEntity extends BaseEntity> = {
  data: TEntity[];
  onChange(
    entities: CreateOrUpdateDto<TEntity>[],
    deletedEntities?: TEntity[]
  ): void;
};

const REFETCH_SCROLL_LIMIT = 50;

export type QueryTableProps<
  TEntity extends BaseEntity,
  TFilter extends BaseFilter
> = {
  children?: ReactNode;
  className?: string;
  defaultSorting?: SortingState;
  enableRowCount?: boolean;
  entitiesProps?: EntitiesProps<TEntity>;
  entityColumns: MRT_ColumnDef<TEntity>[];
  filter?: TFilter;
  forceRefresh?: boolean;
  label?: string;
  onGetData?(data: TEntity[]): void;
  pageSize?: number;
  queryKey: string;
  service?: SearchService<TFilter, TEntity>;
  searchFn?(request: SearchRequest<TFilter>): Promise<SearchResponse<TEntity>>;
  loadChildren?: boolean;
};

type Props<
  TEntity extends BaseEntity,
  TFilter extends BaseFilter
> = QueryTableProps<TEntity, TFilter>;

export const BaseTable = <
  TEntity extends BaseEntity,
  TFilter extends BaseFilter
>({
  children = [],
  className = "",
  defaultSorting,
  enableRowCount = true,
  entityColumns,
  entitiesProps,
  filter,
  forceRefresh = false,
  label,
  onGetData,
  pageSize,
  queryKey,
  searchFn,
  service,
  loadChildren,
}: Props<TEntity, TFilter>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize ?? 20,
  });
  const [scrollLeft, setScrollLeft] = useState<number>();
  const [sorting, setSorting] = useState<SortingState>(defaultSorting ?? []);

  //Reference to the table's container, to handle its scroll
  const containerRef = useRef<HTMLDivElement | null>(null);

  //Reference to the table, to ensure fetching all results fitting the container
  const tableRef = useRef<HTMLTableElement | null>(null);

  // Query function, to fetch data
  const { isLoading: isFnLoading, queryFn } = useTableQuery({
    entities: entitiesProps?.data,
    filter,
    service,
    searchFn,
    sorting,
    loadChildren: loadChildren ?? false,
  });

  // Query, to handle table's data
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["query-table-data", queryKey],
    queryFn: ({ pageParam }) => queryFn(pageParam, pagination.pageSize),
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    // keepPreviousData: true,
  });

  // Flat data, for display
  const { flatData, fetchedRows, totalRows } = useTableData({
    data,
    pause: isFnLoading || isLoading,
  });

  /**
   * Handle onScroll event for result table
   * @param tableElement Event's target
   */
  const handleScroll = useCallback(
    (tableElement?: HTMLDivElement | null) => {
      if (!tableElement || isFetching || !hasNextPage) {
        return;
      }

      const { scrollHeight, scrollTop, clientHeight } = tableElement;
      const newScrollLeft = scrollHeight - scrollTop - clientHeight;
      if (newScrollLeft === scrollLeft) {
        return;
      }

      setScrollLeft(newScrollLeft);
      if (newScrollLeft >= REFETCH_SCROLL_LIMIT) {
        return;
      }

      fetchNextPage();
    },
    [fetchNextPage, isFetching, fetchedRows, totalRows]
  );

  useEffect(() => {
    if (!onGetData) {
      return;
    }

    onGetData!(flatData);
  }, [flatData]);

  useEffect(() => {
    reset();
  }, [forceRefresh, queryFn]);

  useEffect(() => {
    if (
      !containerRef.current ||
      !tableRef.current ||
      !hasNextPage ||
      containerRef.current.clientHeight <= tableRef.current.clientHeight
    ) {
      return;
    }

    fetchNextPage();
  }, [tableRef.current?.clientHeight]);

  /**
   * Reset data, and fetch from scratch
   */
  function reset() {
    if (!!data?.pages) {
      data.pages = [];
    }

    containerRef.current?.scrollTo(0, 0);
    refetch();
  }

  return (
    <div
      className={classNames(
        "query-table flex-1 flex flex-col items-stretch justify-start gap-y-2",
        className
      )}
    >
      <div className="query-table__panel flex items-center justify-center gap-x-4">
        {!!label && <label>{label}</label>}

        <div className="query-table__panel-search flex-1 flex items-center justify-start gap-x-4">
          {children}
        </div>
      </div>

      <div className="query-table__table flex-1 flex flex-col items-stretch">
        <MantineReactTable
          columns={entityColumns}
          data={flatData}
          initialState={{
            density: "xs",
            showColumnFilters: true,
          }}
          manualFiltering
          enableColumnActions={false}
          enableColumnFilters={false}
          enableDensityToggle={false}
          enableFilters={false}
          enableFullScreenToggle={false}
          enableHiding={false}
          enablePagination={false}
          enableStickyFooter={true}
          enableStickyHeader={true}
          enableTopToolbar={false}
          manualPagination
          mantineBottomToolbarProps={{
            className: "query-table__table-footer",
          }}
          mantinePaperProps={{
            className: "query-table__table-paper flex-1 flex flex-col",
          }}
          mantineTableBodyCellProps={{
            className: "query-table__table-cell",
          }}
          mantineTableContainerProps={{
            className: "query-table__table-container flex-1",
            onScroll: (event) => handleScroll(event.target as HTMLDivElement),
            ref: containerRef,
          }}
          mantineTableHeadRowProps={{
            className: "query-table__table-header",
          }}
          mantineTableProps={{
            ref: tableRef,
          }}
          mantineToolbarAlertBannerProps={
            isError
              ? {
                  color: "error",
                  children: "error on data loading",
                }
              : undefined
          }
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          renderBottomToolbarCustomActions={
            !enableRowCount
              ? undefined
              : () => (
                  <Text>
                    {fetchedRows.toLocaleString()}/{totalRows.toLocaleString()}
                  </Text>
                )
          }
          localization={{
            noRecordsToDisplay:
              isLoading || isFetching ? "loading" : "noRecordsToDisplay",
            noResultsFound:
              isLoading || isFetching ? "loading" : "noResultsFound",
          }}
          state={{
            columnFilters,
            globalFilter,
            isLoading: isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting,
          }}
        />
      </div>
    </div>
  );
};

const RETRY_FACTOR = 2000;
const RETRY_MAX = 30000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: (attemptIndex: number) =>
        Math.min(RETRY_FACTOR ** attemptIndex, RETRY_MAX),
    },
  },
});

export const QueryTable = <
  TEntity extends BaseEntity,
  TFilter extends BaseFilter
>(
  props: Props<TEntity, TFilter>
) => (
  <QueryClientProvider client={queryClient}>
    <BaseTable<TEntity, TFilter> {...props} />
  </QueryClientProvider>
);
