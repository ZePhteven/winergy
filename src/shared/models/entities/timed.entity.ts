import { BaseEntity } from './base.entity';

export interface TimedEntity extends BaseEntity {
  createdAt: Date;

  updatedAt: Date;
}
