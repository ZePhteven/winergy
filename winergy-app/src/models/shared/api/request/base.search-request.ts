import { SearchRequest } from './search-request';

export const BASE_SEARCH_REQUEST: Partial<SearchRequest<any>> = Object.freeze({
  pageIndex: 0,
  pageSize: 0,
  sortColumns: []
});
