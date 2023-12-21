import { NamedEntity } from './named.entity';

/**
 * Represents a database entity, with update time tracking
 */
export interface TimedEntity extends NamedEntity {
  /**
   * When this entity was created at
   */
  createdAt?: Date;

  /**
   * When this entity was last updated at
   */
  updatedAt?: Date;
}
