import { Column, Entity } from 'typeorm';

import { CreatedSqlEntity } from 'src/shared/models/entities/created-sql.entity';

@Entity('bottle_price_history')
export class BottlePriceHistoryEntity extends CreatedSqlEntity {
  @Column({ name: 'bottle_id' })
  bottleId: number;

  @Column({ type: 'numeric' })
  price: number;
}
