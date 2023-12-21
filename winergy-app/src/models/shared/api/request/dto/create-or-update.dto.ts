import { BaseEntity } from '@models/shared/entities';

import { CreateDto } from './create.dto';

/**
 * Represents a DTO for entity creation / update
 */
export type CreateOrUpdateDto<TEntity extends BaseEntity> = TEntity | CreateDto<TEntity>;
