/**
 * Represents the result of a search
 */
export interface SearchResponse<T> {
  /**
   * List of entities matching the criteria
   */
  data: T[];

  /**
   * Number of results
   */
  total: number;
}
