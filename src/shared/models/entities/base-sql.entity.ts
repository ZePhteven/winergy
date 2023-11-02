import { PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

export class BaseSqlEntity implements BaseEntity {
  /**
   * Entity's ID
   */
  @PrimaryGeneratedColumn()
  id: number;
}
