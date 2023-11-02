import { UpdateDateColumn } from 'typeorm';

import { CreatedSqlEntity } from './created-sql.entity';
import { TimedEntity } from './timed.entity';

export class TimedSqlEntity extends CreatedSqlEntity implements TimedEntity {
  /**
   * When this entity was updated at
   */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
