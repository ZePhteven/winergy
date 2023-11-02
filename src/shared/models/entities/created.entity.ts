import { BaseEntity } from './base.entity';

export interface CreatedEntity extends BaseEntity {
  createdAt: Date;
}
