import { BaseEntity } from '@models/shared/entities';

/**
 * Represents a DTO for entity creation
 */
export type CreateDto<TEntity extends BaseEntity> = Omit<TEntity, 'id'>;
