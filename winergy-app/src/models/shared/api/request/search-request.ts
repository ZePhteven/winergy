import { SortColumn } from '../sorting/sort-column';

export const NULL_FILTER = null;
export const NOT_NULL_FILTER = -1;

/**
 * Represents a request to search for data, using a filter
 */
export interface SearchRequest<T> {
  /**
   * Filtering criteria for the search (optional)
   */
  filter?: T;

  /**
   * Page to display, for pagination
   */
  pageIndex: number;

  /**
   * Number of results per page, for pagination
   */
  pageSize: number;

  /**
   * Columns to sort results by
   */
  sortColumns: SortColumn[];

  loadChildren?: boolean;
}
