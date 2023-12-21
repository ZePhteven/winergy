/**
 * Represents a database entity
 */
export interface BaseEntity extends Record<string, any> {
  /**
   * Entity's ID
   */
  id: number;
}
