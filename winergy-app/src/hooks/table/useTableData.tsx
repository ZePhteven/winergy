import { useEffect, useState } from "react";

import { InfiniteData } from "@tanstack/react-query";

import { SearchResponse } from "@app/models/shared/api";
import { BaseEntity } from "@app/models/shared/entities";

type TableDataProps<TEntity extends BaseEntity> = {
  data?: InfiniteData<SearchResponse<TEntity>> | TEntity[];
  pause?: boolean;
};

type TableDataHook<TEntity extends BaseEntity> = {
  flatData: TEntity[];
  fetchedRows: number;
  totalRows: number;
};

export const useTableData = <TEntity extends BaseEntity>({
  data,
  pause: isLoading = false,
}: TableDataProps<TEntity>): TableDataHook<TEntity> => {
  const [hook, setHook] = useState<TableDataHook<TEntity>>({
    flatData: [],
    fetchedRows: 0,
    totalRows: 0,
  });

  useEffect(() => {
    function getTableData() {
      if (!data) {
        return {
          flatData: [],
          fetchedRows: 0,
          totalRows: 0,
        };
      }

      if (Array.isArray(data)) {
        return {
          flatData: data,
          fetchedRows: data.length,
          totalRows: data.length,
        };
      }

      const flatData: TEntity[] =
        data?.pages.flatMap((page) => page.data) ?? [];

      return {
        flatData,
        fetchedRows: flatData.length,
        totalRows: data?.pages?.[0]?.total ?? 0,
      };
    }

    if (isLoading) {
      return;
    }

    setHook(getTableData());
  }, [data, isLoading]);

  return hook;
};
