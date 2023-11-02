import { CreateDateColumn } from 'typeorm';

import { BaseSqlEntity } from './base-sql.entity';
import { CreatedEntity } from './created.entity';

export class CreatedSqlEntity extends BaseSqlEntity implements CreatedEntity {
  /**
   * When this entity was created at
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
