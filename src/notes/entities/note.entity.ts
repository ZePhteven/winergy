import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BottleEntity } from '../../bottles/entities';
import { TimedSqlEntity } from '../../shared/models/entities';

@Entity('note')
export class NoteEntity extends TimedSqlEntity {
  @JoinColumn({ name: 'bottle_id' })
  @ManyToOne(() => BottleEntity, (b) => b.id, { nullable: false, orphanedRowAction: 'delete' })
  @Column({ name: 'bottle_id' })
  bottleId: number;

  @Column({ name: 'expert_id' })
  expertId: number;

  @Column()
  note: number;
}
