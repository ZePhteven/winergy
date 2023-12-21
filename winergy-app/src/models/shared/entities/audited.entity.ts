import { TimedEntity } from './timed.entity';

/**
 * Represents a database entity, with update user tracking
 */
export interface AuditedEntity extends TimedEntity {
  /**
   * ID of the user this entity was created by
   */
  createdBy?: number;

  /**
   * ID of the user this entity was last updated by
   */
  updatedBy?: number;
}
