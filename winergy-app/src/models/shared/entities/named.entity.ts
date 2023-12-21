import { BaseEntity } from './base.entity';

/**
 * Represents a database entity
 */
export interface NamedEntity extends BaseEntity {
  /**
   * Entity's name
   */
  name?: string;
}
