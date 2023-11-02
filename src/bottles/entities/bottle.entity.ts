import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { NoteEntity } from '../../notes/entities';

@Entity('bottle')
export class BottleEntity {
  /**
   * Entity's ID
   */
  @PrimaryGeneratedColumn()
  id: number;

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

  /**
   * When this entity was created at
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /**
   * When this entity was last updated at
   */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
