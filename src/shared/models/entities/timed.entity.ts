import { CreatedEntity } from './created.entity';

export interface TimedEntity extends CreatedEntity {
  updatedAt: Date;
}
