/**
 * Represents a column to order results by
 */
export interface SortColumn {
  /**
   * Sorting direction (asc / desc)
   */
  direction: 'asc' | 'desc' | 'ASC' | 'DESC';

  /**
   * Column's name
   */
  name: string;
}
