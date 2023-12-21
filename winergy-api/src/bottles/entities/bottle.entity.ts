import { Column, Entity, OneToMany } from 'typeorm';

import { NoteEntity } from '../../notes/entities';
import { TimedSqlEntity } from '../../shared/models/entities';

@Entity('bottle')
export class BottleEntity extends TimedSqlEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ name: 'producer_id' })
  producerId: number;

  @Column({ name: 'retailer_id' })
  retailerId: number;

  @Column()
  type: number;

  @Column()
  year: number;

  @OneToMany(() => NoteEntity, (note) => note.bottleId, { /*cascade: true,*/ eager: true })
  notes: NoteEntity[];

  @Column({ type: 'numeric' })
  note: number;
}
